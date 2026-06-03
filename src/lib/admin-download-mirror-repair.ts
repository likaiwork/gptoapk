import {
  getDownloadFailureApps,
  getManualDownloadSource,
  initDatabase,
  updateDownloadFailureResolved,
  upsertManualDownloadSource,
  deleteManualDownloadSource,
} from "@/lib/db";
import { resolveApkComboAppDownloadUrl } from "@/lib/apkcombo-app-download";
import { resolveUptodownDownloadUrl } from "@/lib/uptodown-download";
import { fetchApkPureCmsDownloadUrl } from "@/lib/apkpure-cms-download";
import { extractApkComboDownloadUrl } from "@/lib/apkcombo-download-url";
import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";
import { fetchDispatcher } from "@/lib/proxy";
import { sanitizeAppId } from "@/lib/sanitize-app-id";
import { getUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import { getUnsupportedPaidApp } from "@/lib/unsupported-paid-apps";
import { autoResolveBlockedDownloadFailures } from "@/lib/admin-download-repair";

const SOURCE_TIMEOUT_MS = 30_000;
const APKCOMBO_TIMEOUT_MS = 25_000;
const USER_AGENT = "gptoapk-mirror-repair/1.0";

function fetchWithProxy(input: string, init: RequestInit = {}): Promise<Response> {
  if (!fetchDispatcher) return fetch(input, init);
  return fetch(input, { ...init, // @ts-expect-error undici dispatcher
    dispatcher: fetchDispatcher });
}

export type MirrorRepairReport = {
  probed: number;
  mirrorsFound: number;
  downloadMarkedResolved: number;
  stillUnresolved: number;
};

function isPublicHttpsUrl(value: string): boolean {
  return isAllowedDownloadUrl(value);
}

function siteOrigin(): string {
  const host =
    process.env.REPAIR_SITE_HOST ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.gptoapk.com";
  return host.replace(/\/$/, "");
}

async function probeAptoide(appId: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);
  try {
    const res = await fetchWithProxy(
      `https://ws75.aptoide.com/api/7/app/getMeta?package_name=${encodeURIComponent(appId)}`,
      { headers: { "User-Agent": USER_AGENT }, signal: controller.signal, cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: { file?: { path?: string; path_alt?: string } } };
    const url = json?.data?.file?.path || json?.data?.file?.path_alt || "";
    return isPublicHttpsUrl(url) ? url : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function probeApkPure(appId: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);
  try {
    for (const host of ["https://d.apkpure.net", "https://d.apkpure.com"]) {
      const res = await fetchWithProxy(
        `${host}/b/APK/${encodeURIComponent(appId)}?version=latest`,
        { method: "GET", redirect: "manual", headers: { "User-Agent": USER_AGENT }, signal: controller.signal },
      );
      const location = res.headers.get("location") || "";
      if (isPublicHttpsUrl(location)) return location;
    }

    const cmsUrl = await fetchApkPureCmsDownloadUrl(
      appId,
      (input, init) => fetchWithProxy(String(input), init),
      controller.signal,
    );
    if (!cmsUrl) return null;
    if (isPublicHttpsUrl(cmsUrl)) return cmsUrl;
    if (cmsUrl.includes("/b/APK/")) {
      const res = await fetchWithProxy(cmsUrl, {
        method: "GET",
        redirect: "manual",
        headers: { "User-Agent": USER_AGENT },
        signal: controller.signal,
      });
      const location = res.headers.get("location") || "";
      return isPublicHttpsUrl(location) ? location : null;
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function probeOnlineApkDownloader(appId: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);
  try {
    const res = await fetchWithProxy(
      `https://online-apk-downloader.com/apk-ajax&packageDownload&id=${encodeURIComponent(appId)}`,
      {
        headers: {
          Accept: "application/json,text/plain;q=0.8,*/*;q=0.7",
          Referer: "https://online-apk-downloader.com/",
          "User-Agent": USER_AGENT,
        },
        signal: controller.signal,
      },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { success?: boolean; downloadUrl?: string };
    const url = json.downloadUrl?.replace(/\\\//g, "/") || "";
    return json.success && isPublicHttpsUrl(url) ? url : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function probeApkComboDownloader(appId: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), APKCOMBO_TIMEOUT_MS);
  const downloaderUrl = `https://apkcombo.com/downloader/?package=${encodeURIComponent(appId)}&lang=en`;
  const pageUrls = [downloaderUrl, `https://r.jina.ai/${downloaderUrl}`];

  try {
    for (const pageUrl of pageUrls) {
      const res = await fetchWithProxy(pageUrl, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          Referer: "https://apkcombo.com/",
        },
        cache: "no-store",
        signal: controller.signal,
      });
      if (!res.ok) continue;
      const content = await res.text();
      const directUrl = extractApkComboDownloadUrl(content);
      if (directUrl) return directUrl;
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function probeUptodown(appId: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), APKCOMBO_TIMEOUT_MS);
  try {
    const url = await resolveUptodownDownloadUrl(
      appId,
      (input, init) => fetchWithProxy(String(input), init),
      controller.signal,
    );
    return url && isPublicHttpsUrl(url) ? url : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function findMirrorDownloadUrl(appId: string): Promise<{ url: string; source: string } | null> {
  const uptodown = await probeUptodown(appId);
  if (uptodown) return { url: uptodown, source: "uptodown" };

  const aptoide = await probeAptoide(appId);
  if (aptoide) return { url: aptoide, source: "aptoide" };

  const apkpure = await probeApkPure(appId);
  if (apkpure) return { url: apkpure, source: "apkpure" };

  const apkcombo = await probeApkComboDownloader(appId);
  if (apkcombo) return { url: apkcombo, source: "apkcombo-r2" };

  const apkcomboApp = await resolveApkComboAppDownloadUrl(
    appId,
    (input, init) => fetchWithProxy(String(input), init),
  );
  if (apkcomboApp && isPublicHttpsUrl(apkcomboApp)) {
    return { url: apkcomboApp, source: "apkcombo-app" };
  }

  const online = await probeOnlineApkDownloader(appId);
  if (online) return { url: online, source: "online-apk-downloader" };

  return null;
}

async function prepareDownload(appId: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    const res = await fetch(`${siteOrigin()}/api/download-apk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appId }),
      signal: controller.signal,
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && Boolean(data.success);
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function runDownloadMirrorRepair(options?: {
  maxApps?: number;
}): Promise<MirrorRepairReport> {
  const maxApps = Math.min(Math.max(options?.maxApps ?? 80, 1), 150);
  await initDatabase();
  await autoResolveBlockedDownloadFailures();

  const candidates: Array<{ app_id: string; app_title: string }> = [];
  let page = 0;
  const pageSize = 100;

  while (candidates.length < maxApps) {
    const { rows } = await getDownloadFailureApps(pageSize, page * pageSize);
    for (const row of rows) {
      if (row.resolved) continue;
      const appId = sanitizeAppId(row.app_id);
      if (!appId || getUnsupportedPaidApp(appId) || getUnsupportedNoMirrorApp(appId)) continue;
      candidates.push({ app_id: appId, app_title: row.app_title || appId });
      if (candidates.length >= maxApps) break;
    }
    if (rows.length < pageSize) break;
    page += 1;
  }

  let mirrorsFound = 0;
  let downloadMarkedResolved = 0;

  const markResolved = async (rawAppId: string) => {
    const cleanId = sanitizeAppId(rawAppId);
    let ok = await updateDownloadFailureResolved(cleanId, true);
    if (!ok && cleanId !== rawAppId.trim()) {
      ok = await updateDownloadFailureResolved(rawAppId.trim(), true);
    }
    return ok;
  };

  for (const item of candidates) {
    const appId = item.app_id;
    const existingManual = await getManualDownloadSource(appId);
    if (existingManual && !isAllowedDownloadUrl(existingManual.download_url)) {
      await deleteManualDownloadSource(appId);
    }

    if (await prepareDownload(appId)) {
      if (await markResolved(appId)) downloadMarkedResolved += 1;
      continue;
    }

    const mirror = await findMirrorDownloadUrl(appId);
    if (!mirror) continue;

    mirrorsFound += 1;
    await upsertManualDownloadSource({
      appId,
      appTitle: item.app_title,
      downloadUrl: mirror.url,
      fileName: `${appId}.apk`,
      sourceLabel: mirror.source,
      active: true,
    });

    if (await prepareDownload(appId)) {
      if (await markResolved(appId)) downloadMarkedResolved += 1;
    }
  }

  const { unresolved: stillUnresolved } = await getDownloadFailureApps(1, 0);

  return {
    probed: candidates.length,
    mirrorsFound,
    downloadMarkedResolved,
    stillUnresolved,
  };
}
