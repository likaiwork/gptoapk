import { NextRequest, NextResponse } from "next/server";
import { getAdminApiKey } from "@/lib/db";
import { resolveApkComboAppDownloadUrl } from "@/lib/apkcombo-app-download";
import { fetchApkPureCmsDownloadUrl } from "@/lib/apkpure-cms-download";
import { extractApkComboDownloadUrl } from "@/lib/apkcombo-download-url";
import { resolveUptodownDownloadUrl } from "@/lib/uptodown-download";
import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";
import { fetchDispatcher } from "@/lib/proxy";
import { sanitizeAppId } from "@/lib/sanitize-app-id";

export const runtime = "nodejs";
export const maxDuration = 300;

const TIMEOUT_MS = 50_000;
const USER_AGENT = "gptoapk-probe/1.0";

function fetchWithProxy(input: string, init: RequestInit = {}) {
  return fetch(input, {
    ...init,
    ...(fetchDispatcher ? { dispatcher: fetchDispatcher } : {}),
  } as RequestInit & { dispatcher?: typeof fetchDispatcher });
}

function signalWithTimeout() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const key = request.nextUrl.searchParams.get("key");
  if (!key || key !== getAdminApiKey()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appId = sanitizeAppId(request.nextUrl.searchParams.get("appId") ?? "");
  if (!appId) {
    return NextResponse.json({ error: "Missing appId" }, { status: 400 });
  }

  const timeout = signalWithTimeout();
  const fetchImpl = (input: RequestInfo | URL, init?: RequestInit) =>
    fetchWithProxy(String(input), { ...init, signal: timeout.signal });

  const results: Record<string, string | null> = {};

  try {
    results.uptodown = await resolveUptodownDownloadUrl(appId, fetchImpl, timeout.signal);
    results.apkcomboApp = await resolveApkComboAppDownloadUrl(appId, fetchImpl, timeout.signal);

    for (const pageUrl of [
      `https://apkcombo.com/downloader/?package=${encodeURIComponent(appId)}&lang=en`,
      `https://r.jina.ai/https://apkcombo.com/downloader/?package=${encodeURIComponent(appId)}&lang=en`,
    ]) {
      try {
        const res = await fetchImpl(pageUrl, {
          headers: { "User-Agent": USER_AGENT, Accept: "text/html,text/plain,*/*" },
          cache: "no-store",
        });
        if (res.ok) {
          const url = extractApkComboDownloadUrl(await res.text());
          if (url) {
            results.apkcomboPage = url;
            break;
          }
        }
      } catch {
        results.apkcomboPage = null;
      }
    }
    if (!results.apkcomboPage) results.apkcomboPage = null;

    try {
      const aptRes = await fetchImpl(
        `https://ws75.aptoide.com/api/7/app/getMeta?package_name=${encodeURIComponent(appId)}`,
        { headers: { "User-Agent": USER_AGENT }, cache: "no-store" },
      );
      if (aptRes.ok) {
        const json = (await aptRes.json()) as { data?: { file?: { path?: string; path_alt?: string } } };
        const path = json?.data?.file?.path || json?.data?.file?.path_alt || null;
        results.aptoide = path && isAllowedDownloadUrl(path) ? path : null;
      } else {
        results.aptoide = null;
      }
    } catch {
      results.aptoide = null;
    }

    results.apkpureCms = await fetchApkPureCmsDownloadUrl(appId, fetchImpl, timeout.signal);

    const winner = Object.entries(results).find(([, url]) => url && isAllowedDownloadUrl(url));
    return NextResponse.json({
      appId,
      results,
      winner: winner ? { source: winner[0], url: winner[1] } : null,
    });
  } finally {
    timeout.clear();
  }
}
