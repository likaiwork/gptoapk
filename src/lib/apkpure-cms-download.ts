import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";

const APKPURE_CMS_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; gptoapk/1.0; +https://www.gptoapk.com)",
  "x-sv": "29",
  "x-abis": "arm64-v8a,armeabi-v7a,armeabi",
  "x-gp": "1",
  Accept: "*/*",
} as const;

/** Extract a winudf / APKPure CDN URL from CMS API binary-ish response. */
export function extractApkPureCmsDownloadUrl(payload: string): string | null {
  const direct = payload.match(/https:\/\/d-\d+\.winudf\.com\/[^\s"'<>)\x00]+/i);
  if (direct?.[0] && isAllowedDownloadUrl(direct[0])) return direct[0];

  const apkpureCdn = payload.match(/https:\/\/download\.apkpure\.com\/[^\s"'<>)\x00]+/i);
  if (apkpureCdn?.[0] && isAllowedDownloadUrl(apkpureCdn[0])) return apkpureCdn[0];

  const path = payload.match(/\/b\/APK\/[A-Za-z0-9._-]+(?:\?[^\s"'<>)\x00]*)?/);
  if (path?.[0]) {
    for (const host of ["https://d.apkpure.com", "https://d.apkpure.net"]) {
      const candidate = `${host}${path[0]}`;
      if (isAllowedDownloadUrl(candidate) || path[0].includes("?")) {
        return candidate;
      }
    }
  }

  return null;
}

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export async function fetchApkPureCmsDownloadUrl(
  appId: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
): Promise<string | null> {
  const apiUrl = `https://api.pureapk.com/m/v3/cms/app_version?hl=en-US&package_name=${encodeURIComponent(appId)}`;
  const res = await fetchImpl(apiUrl, {
    headers: APKPURE_CMS_HEADERS,
    cache: "no-store",
    signal,
  });
  if (!res.ok) return null;

  const buf = Buffer.from(await res.arrayBuffer());
  const payload = buf.toString("latin1");
  return extractApkPureCmsDownloadUrl(payload);
}
