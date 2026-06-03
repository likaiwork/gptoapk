import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

const UPTODOWN_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0";

/** Uptodown subdomain slug per package (https://{slug}.en.uptodown.com/android). */
const UPTODOWN_SLUG_BY_APP_ID: Readonly<Record<string, string>> = {
  "com.taobao.taobao": "taobao",
  "com.xunmeng.pinduoduo": "pinduoduo",
  "com.jingdong.app.mall": "jingdong",
  "com.eg.android.alipaygphone": "alipay",
  "com.tencent.mm": "wechat",
  "com.ss.android.ugc.aweme": "tik-tok",
  "com.baidu.searchbox": "baidu",
  "com.netease.cloudmusic": "netease-cloud-music",
};

function uptodownBaseUrl(slug: string): string {
  return `https://${slug}.en.uptodown.com/android`;
}

function extractDataFileId(html: string): string | null {
  const match = html.match(/data-file-id="(\d+)"/i);
  return match?.[1] ?? null;
}

function extractPostDownloadPath(html: string): string | null {
  const patterns = [
    /class="post-download"[^>]*\sdata-url="([^"]+)"/i,
    /data-url="([^"]+)"[^>]*class="post-download"/i,
    /data-url="([^"]+)"/i,
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].replace(/^\//, "");
  }
  return null;
}

function uptodownDownloadUrl(path: string): string | null {
  const clean = path.replace(/^\//, "").trim();
  if (!clean) return null;
  const url = clean.startsWith("http")
    ? clean
    : `https://dw.uptodown.com/dwn/${clean}`;
  return isAllowedDownloadUrl(url) ? url : null;
}

async function pageExists(
  baseUrl: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
): Promise<boolean> {
  try {
    const res = await fetchImpl(baseUrl, {
      method: "GET",
      headers: { "User-Agent": UPTODOWN_USER_AGENT, Accept: "text/html" },
      cache: "no-store",
      signal,
    });
    if (!res.ok) return false;
    const html = await res.text();
    return /data-file-id=|detail-app-name|packageName/i.test(html);
  } catch {
    return false;
  }
}

async function discoverUptodownBaseUrl(
  appId: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
): Promise<string | null> {
  const key = appId.trim().toLowerCase();
  const slugs = new Set<string>();

  const mapped = UPTODOWN_SLUG_BY_APP_ID[key];
  if (mapped) slugs.add(mapped);

  const parts = key.split(".").filter(Boolean);
  if (parts.length >= 2) {
    slugs.add(parts[parts.length - 1]);
    slugs.add(parts[parts.length - 2]);
  }

  for (const slug of slugs) {
    const base = uptodownBaseUrl(slug);
    if (await pageExists(base, fetchImpl, signal)) return base;
  }

  try {
    const searchUrl = `https://en.uptodown.com/android/search?q=${encodeURIComponent(appId)}`;
    const res = await fetchImpl(searchUrl, {
      headers: {
        "User-Agent": UPTODOWN_USER_AGENT,
        Accept: "text/html",
      },
      cache: "no-store",
      signal,
    });
    if (!res.ok) return null;
    const html = await res.text();
    const linkPattern = /href="(https:\/\/[a-z0-9-]+\.en\.uptodown\.com\/android)"/gi;
    for (const match of html.matchAll(linkPattern)) {
      const base = match[1];
      if (html.includes(appId) || html.toLowerCase().includes(key.split(".").pop() ?? "")) {
        if (await pageExists(base, fetchImpl, signal)) return base;
      }
    }
    const first = html.match(/href="(https:\/\/[a-z0-9-]+\.en\.uptodown\.com\/android)"/i);
    if (first?.[1] && (await pageExists(first[1], fetchImpl, signal))) return first[1];
  } catch {
    return null;
  }

  return null;
}

/**
 * Resolves a direct APK URL from Uptodown (dw.uptodown.com).
 */
export async function resolveUptodownDownloadUrl(
  appId: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
): Promise<string | null> {
  const baseUrl = await discoverUptodownBaseUrl(appId, fetchImpl, signal);
  if (!baseUrl) return null;

  let downloadPageHtml: string;
  try {
    const res = await fetchImpl(`${baseUrl}/download`, {
      headers: { "User-Agent": UPTODOWN_USER_AGENT, Accept: "text/html" },
      cache: "no-store",
      signal,
    });
    if (!res.ok) return null;
    downloadPageHtml = await res.text();
  } catch {
    return null;
  }

  const fileId = extractDataFileId(downloadPageHtml);
  if (!fileId) {
    const inline = extractPostDownloadPath(downloadPageHtml);
    if (inline) return uptodownDownloadUrl(inline);
    return null;
  }

  try {
    const postRes = await fetchImpl(`${baseUrl}/post-download/${fileId}`, {
      headers: { "User-Agent": UPTODOWN_USER_AGENT, Accept: "text/html" },
      cache: "no-store",
      signal,
    });
    if (!postRes.ok) return null;
    const postHtml = await postRes.text();
    const path = extractPostDownloadPath(postHtml);
    if (!path) return null;
    return uptodownDownloadUrl(path);
  } catch {
    return null;
  }
}
