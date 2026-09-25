import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import { stripSearchQueryNoise } from "@/lib/search-query-normalize";

/**
 * apkcombo.com 搜索兜底：当 Google Play 搜索从数据中心 IP 被上游拦截时，
 * 用 apkcombo 的关键词搜索把关键词映射到真实包名（不依赖 Google Play）。
 *
 * 相关性评分与 search-auto-discover.ts 的 pickRelevantAppIds 保持一致：
 *   - 拉丁关键词：token 命中打分，达到阈值才算可信；
 *   - 中文/非拉丁关键词：apkcombo slug 是拉丁字母，无法 token 重叠，
 *     直接信任 apkcombo 的排序（strict 取第 1，非 strict 取前 3）。
 */

const APKCOMBO_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const PACKAGE_RE = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

// 非 App 详情页的 slug，过滤掉以免误映射到分类/文章页
const SKIP_SLUGS = new Set([
  "ar", "category", "categories", "articles", "about", "search", "download",
  "publisher", "developer", "app", "apps", "game", "games", "tag", "top",
]);

const STRICT_MIN_SCORE = 4;

export type ApkComboHit = { slug: string; appId: string };

export function apkcomboSearchUrl(term: string): string {
  const slug = term.trim().replace(/\s+/g, "-");
  return `https://apkcombo.com/search/${encodeURIComponent(slug)}`;
}

export async function searchApkComboHits(term: string, maxHits = 8): Promise<ApkComboHit[]> {
  const res = await fetch(apkcomboSearchUrl(term), {
    headers: { "User-Agent": APKCOMBO_UA },
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) return [];

  const html = await res.text();
  const re = /href="\/([a-z0-9][a-z0-9-]*)\/((?:[a-z][a-z0-9_]*\.)+[a-z][a-z0-9_]*)\/"/g;
  const seen = new Set<string>();
  const out: ApkComboHit[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && out.length < maxHits) {
    const slug = m[1];
    const appId = m[2];
    if (SKIP_SLUGS.has(slug)) continue;
    if (!PACKAGE_RE.test(appId)) continue;
    if (seen.has(appId)) continue;
    seen.add(appId);
    out.push({ slug, appId });
  }
  return out;
}

function hasLatinChars(term: string): boolean {
  return /[a-z0-9]/i.test(term);
}

export function pickApkComboAppIds(
  term: string,
  hits: ApkComboHit[],
  strict: boolean,
): string[] {
  const normalizedTerm = stripSearchQueryNoise(term) || term.trim().toLowerCase();
  const tokens = normalizedTerm.split(/\s+/).filter((t) => t.length >= 2);
  const termNoSpace = normalizedTerm.replace(/\s+/g, "");

  const scored = hits
    .filter((h) => h.appId && !isUnsupportedNoMirrorApp(h.appId))
    .map((h) => {
      const title = h.slug.replace(/-/g, " ");
      const haystack = `${title} ${h.appId}`.toLowerCase();
      let score = 0;
      if (haystack.includes(normalizedTerm)) score += 10;
      for (const token of tokens) {
        if (haystack.includes(token)) score += 2;
      }
      if (h.appId.toLowerCase().includes(termNoSpace)) score += 4;
      return { appId: h.appId, score };
    })
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];

  // 中文/日文/韩文等非拉丁关键词：apkcombo 结果 slug 均为拉丁字母，
  // token 重叠无法生效，直接信任 apkcombo 的相关性排序。
  if (!hasLatinChars(normalizedTerm)) {
    const count = strict ? 1 : 3;
    return scored.slice(0, count).map((x) => x.appId);
  }

  const minScore = strict ? STRICT_MIN_SCORE : 2;
  const top = scored.filter((x) => x.score >= minScore).slice(0, 3);
  if (top.length) return top.map((x) => x.appId);

  if (!strict && scored[0]!.score > 0) {
    return [scored[0]!.appId];
  }

  return [];
}

export async function searchApkComboAppIds(term: string, strict: boolean): Promise<string[]> {
  const clean = stripSearchQueryNoise(term) || term.trim().toLowerCase();
  if (!clean || clean.length < 2) return [];

  try {
    const hits = await searchApkComboHits(clean);
    return pickApkComboAppIds(clean, hits, strict);
  } catch {
    return [];
  }
}
