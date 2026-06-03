import { extractApkComboDownloadUrl } from "@/lib/apkcombo-download-url";
import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; gptoapk/1.0; +https://www.gptoapk.com)",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

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

function apkComboAppPath(path: string): string {
  if (path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `https://apkcombo.app${path}`;
  return `https://apkcombo.app/${path}`;
}

async function apkComboCheckinToken(fetchImpl: FetchLike, signal?: AbortSignal): Promise<string> {
  try {
    const res = await fetchImpl("https://apkcombo.app/checkin", {
      cache: "no-store",
      signal,
      headers: FETCH_HEADERS,
    });
    if (!res.ok) return "";
    return (await res.text()).trim();
  } catch {
    return "";
  }
}

function withCheckinQuery(url: string, checkin: string): string {
  if (!checkin) return url;
  return url.includes("?") ? `${url}&${checkin}` : `${url}?${checkin}`;
}

function parseVariantHrefs(html: string): string[] {
  const section =
    html.match(/id=["']best-variant-tab["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] ?? html;
  const hrefs: string[] = [];
  for (const match of section.matchAll(/href=["']([^"']+\/download\/[^"']+)["']/gi)) {
    hrefs.push(apkComboAppPath(match[1]));
  }
  return hrefs;
}

type OldVersionEntry = { name: string; url: string };

function parseOldVersionEntries(html: string): OldVersionEntry[] {
  const entries: OldVersionEntry[] = [];
  for (const block of html.matchAll(
    /class=["'][^"']*list-versions[^"']*["'][\s\S]*?<\/div>\s*<\/div>/gi,
  )) {
    const chunk = block[0];
    const name = chunk.match(/class=["'][^"']*vername[^"']*["'][^>]*>([^<]+)</i)?.[1]?.trim();
    const href = chunk.match(/href=["']([^"']+)["']/i)?.[1];
    if (name && href) entries.push({ name, url: apkComboAppPath(href) });
  }
  if (entries.length > 0) return entries;

  for (const match of html.matchAll(
    /class=["'][^"']*vername[^"']*["'][^>]*>([^<]+)<[\s\S]{0,400}?href=["']([^"']+)["']/gi,
  )) {
    entries.push({ name: match[1].trim(), url: apkComboAppPath(match[2]) });
  }
  return entries;
}

function pickStableOldVersion(entries: OldVersionEntry[]): OldVersionEntry | null {
  const stable = entries.find(
    (e) => !/alpha|beta/i.test(e.name),
  );
  return stable ?? entries[0] ?? null;
}

/**
 * APKCombo variant pages often 302 straight to cloudflarestorage when following redirects.
 */
async function resolveVariantPageDirectUrl(
  pageUrl: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
  preferredArch = "arm64-v8a",
): Promise<string | null> {
  try {
    const followed = await fetchImpl(pageUrl, {
      headers: FETCH_HEADERS,
      redirect: "follow",
      cache: "no-store",
      signal,
    });
    if (followed.redirected && isAllowedDownloadUrl(followed.url)) {
      return followed.url;
    }
    if (!followed.ok) return null;

    const html = await followed.text();
    const fromHtml = extractApkComboDownloadUrl(html);
    if (fromHtml) return fromHtml;

    const variantHrefs = parseVariantHrefs(html);
    const archMatch =
      variantHrefs.find((href) => href.includes(preferredArch)) ?? variantHrefs[0];
    if (!archMatch) return null;

    const variantRes = await fetchImpl(archMatch, {
      headers: FETCH_HEADERS,
      redirect: "follow",
      cache: "no-store",
      signal,
    });
    if (variantRes.redirected && isAllowedDownloadUrl(variantRes.url)) {
      return variantRes.url;
    }
    if (variantRes.ok) {
      return extractApkComboDownloadUrl(await variantRes.text());
    }
  } catch {
    return null;
  }
  return null;
}

export async function resolveApkComboAppDownloadUrl(
  appId: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
): Promise<string | null> {
  const repo = appId.trim();
  if (!repo) return null;

  const org = apkComboOrgForAppId(repo);
  const checkin = await apkComboCheckinToken(fetchImpl, signal);
  const base = `https://apkcombo.app/${org}/${repo}`;

  const phoneVariantUrls = [
    `${base}/download/phone-stable-apk`,
    `${base}/download/phone-latest-apk`,
    `${base}/download/apk`,
  ];
  for (const variantUrl of phoneVariantUrls) {
    const found = await resolveVariantPageDirectUrl(
      withCheckinQuery(variantUrl, checkin),
      fetchImpl,
      signal,
    );
    if (found) return found;
  }

  const jinaTargets = [
    `https://apkcombo.com/${org}/${repo}/download/apk`,
    `https://apkcombo.com/downloader/?package=${encodeURIComponent(repo)}&lang=en`,
  ];
  for (const target of jinaTargets) {
    try {
      const jinaRes = await fetchImpl(`https://r.jina.ai/${target}`, {
        cache: "no-store",
        signal,
        headers: { Accept: "text/plain,text/html,*/*" },
      });
      if (!jinaRes.ok) continue;
      const fromJina = extractApkComboDownloadUrl(await jinaRes.text());
      if (fromJina) return fromJina;
    } catch {
      // ignore
    }
  }

  try {
    const oldRes = await fetchImpl(withCheckinQuery(`${base}/old-versions`, checkin), {
      headers: FETCH_HEADERS,
      cache: "no-store",
      signal,
    });
    if (!oldRes.ok) return null;
    const oldHtml = await oldRes.text();
    const fromOld = extractApkComboDownloadUrl(oldHtml);
    if (fromOld) return fromOld;

    const stable = pickStableOldVersion(parseOldVersionEntries(oldHtml));
    if (stable) {
      const fromStable = await resolveVariantPageDirectUrl(stable.url, fetchImpl, signal);
      if (fromStable) return fromStable;
    }
  } catch {
    return null;
  }

  return null;
}
