import { extractApkComboDownloadUrl } from "@/lib/apkcombo-download-url";
import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

/** Known APKCombo org slugs (apkcombo.app/{org}/{repo}/...). */
const APKCOMBO_ORG_BY_APP_ID: Readonly<Record<string, string>> = {
  "com.taobao.taobao": "taobao",
  "com.xunmeng.pinduoduo": "pinduoduo",
  "com.jingdong.app.mall": "jd-com-jingdong",
  "com.openai.chatgpt": "chatgpt",
  "com.anthropic.claude": "claude-by-anthropic",
  "org.telegram.messenger": "telegram",
  "com.instagram.android": "instagram",
  "com.google.android.youtube": "youtube",
  "com.whatsapp": "whatsapp",
  "com.smile.gifmaker": "kuaishou",
  "com.kwai.video": "kwai",
};

function apkComboOrgForAppId(appId: string): string {
  const key = appId.trim().toLowerCase();
  if (APKCOMBO_ORG_BY_APP_ID[key]) return APKCOMBO_ORG_BY_APP_ID[key];
  const parts = key.split(".").filter(Boolean);
  return parts[parts.length - 2] || parts[0] || key;
}

async function apkComboCheckinToken(fetchImpl: FetchLike, signal?: AbortSignal): Promise<string> {
  const res = await fetchImpl("https://apkcombo.app/checkin", { cache: "no-store", signal });
  if (!res.ok) return "";
  return (await res.text()).trim();
}

function withCheckinQuery(url: string, checkin: string): string {
  if (!checkin) return url;
  return url.includes("?") ? `${url}&${checkin}` : `${url}?${checkin}`;
}

function pickVariantDownloadPath(oldVersionsHtml: string, appId: string): string | null {
  const escaped = appId.replace(/\./g, "\\.");
  const patterns = [
    new RegExp(`href="(/[^"]*${escaped}[^"]*/download/[^"]+)"`, "i"),
    /href="(\/[^"]+\/download\/[^"]+-apk)"/i,
    /href="(\/[^"]+\/download\/apk[^"]*)"/i,
  ];
  for (const pattern of patterns) {
    const match = oldVersionsHtml.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

/**
 * Resolves a direct APK URL via apkcombo.app (checkin + variant page), used when apkpure/aptoid fail.
 */
export async function resolveApkComboAppDownloadUrl(
  appId: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
): Promise<string | null> {
  const repo = appId.trim();
  if (!repo) return null;

  const org = apkComboOrgForAppId(repo);
  const checkin = await apkComboCheckinToken(fetchImpl, signal);

  const oldVersionsUrl = withCheckinQuery(
    `https://apkcombo.app/${org}/${repo}/old-versions`,
    checkin,
  );

  let oldRes: Response;
  try {
    oldRes = await fetchImpl(oldVersionsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; gptoapk/1.0)",
        Accept: "text/html",
      },
      cache: "no-store",
      signal,
    });
  } catch {
    return null;
  }
  if (!oldRes.ok) return null;

  const oldHtml = await oldRes.text();
  const variantPath = pickVariantDownloadPath(oldHtml, repo);
  if (!variantPath) {
    const fromOld = extractApkComboDownloadUrl(oldHtml);
    if (fromOld) return fromOld;
    return null;
  }

  const variantUrl = withCheckinQuery(`https://apkcombo.app${variantPath}`, checkin);

  try {
    const variantRes = await fetchImpl(variantUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; gptoapk/1.0)" },
      redirect: "manual",
      cache: "no-store",
      signal,
    });

    const location = variantRes.headers.get("location");
    if (location && isAllowedDownloadUrl(location)) return location;

    if (variantRes.ok) {
      const variantHtml = await variantRes.text();
      const direct = extractApkComboDownloadUrl(variantHtml);
      if (direct) return direct;
    }

    const signedRes = await fetchImpl(variantUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; gptoapk/1.0)" },
      redirect: "follow",
      cache: "no-store",
      signal,
    });
    if (signedRes.redirected && isAllowedDownloadUrl(signedRes.url)) {
      return signedRes.url;
    }
  } catch {
    return null;
  }

  return null;
}
