/**
 * 回填「搜索失败关键词」：用 apkcombo.com 搜索把关键词映射到真实包名，
 * 写入 search_alias_overrides 别名表，并把这些失败标记为已解决。
 *
 * 背景：生产服务器（HostPapa 数据中心 IP）访问 Google Play 搜索 RPC 被上游拦截，
 * 导致纯关键词搜索无法返回结果。apkcombo.com 从本机可正常访问，且搜索质量高，
 * 可作为不依赖 Google Play 的解析来源。
 *
 * 用法（在 VPS /var/www/gptoapk 下运行，自动读取 PM2 的 POSTGRES_URL）：
 *   node scripts/backfill-search-failures-apkcombo.mjs --dry-run --limit 20
 *   node scripts/backfill-search-failures-apkcombo.mjs --limit 500
 *   node scripts/backfill-search-failures-apkcombo.mjs --min-failures 5 --concurrency 4
 *
 * 参数：
 *   --dry-run         只打印将写入的映射，不落库
 *   --limit N         最多处理 N 个不同关键词（默认 0 = 全部）
 *   --min-failures N  只处理 failure_count >= N 的关键词（默认 1，用于优先处理高频词）
 *   --concurrency N   apkcombo 并发请求数（默认 4）
 */

import pg from "pg";
const { Client } = pg;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const PACKAGE_RE = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;
// 非 App 页面的 slug，过滤掉以免误映射到分类/文章页
const SKIP_SLUGS = new Set([
  "ar", "category", "categories", "articles", "about", "search", "download",
  "publisher", "developer", "app", "apps", "game", "games", "tag", "top",
]);

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  if (i === -1 || i + 1 >= args.length) return fallback;
  return args[i + 1];
}
const DRY_RUN = args.includes("--dry-run");
const LIMIT = Number(arg("--limit", "0")) || 0;
const MIN_FAILURES = Number(arg("--min-failures", "1")) || 1;
const CONCURRENCY = Math.max(1, Number(arg("--concurrency", "4")) || 4);
const DELAY_MS = 150;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function apkcomboSearchUrl(q) {
  const slug = q.trim().replace(/\s+/g, "-");
  return `https://apkcombo.com/search/${encodeURIComponent(slug)}`;
}

async function searchApkCombo(q) {
  const res = await fetch(apkcomboSearchUrl(q), {
    headers: { "User-Agent": UA },
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) return [];
  const html = await res.text();
  const re = /href="\/([a-z0-9][a-z0-9-]*)\/((?:[a-z][a-z0-9_]*\.)+[a-z][a-z0-9_]*)\/"/g;
  const seen = new Set();
  const out = [];
  let m;
  while ((m = re.exec(html)) && out.length < 8) {
    const slug = m[1];
    const pkg = m[2];
    if (SKIP_SLUGS.has(slug)) continue;
    if (!PACKAGE_RE.test(pkg)) continue;
    if (seen.has(pkg)) continue;
    seen.add(pkg);
    out.push({ slug, pkg });
  }
  return out;
}

function hasLatinChars(term) {
  return /[a-z0-9]/i.test(term);
}

// 停用词：全是这类词的查询（如 "top top"）不做映射，避免误配到垃圾结果
const STOPWORD_TOKENS = new Set([
  "top", "app", "apps", "game", "games", "play", "video", "videos",
  "free", "download", "apk", "android", "mobile", "best", "online",
  "official", "latest", "pro", "hd", "the", "and", "for", "new",
]);

/**
 * 相关性评分（与 src/lib/apkcombo-search.ts 的 pickApkComboAppIds 一致）：
 * 拉丁关键词按 token 命中打分；中文/非拉丁关键词信任 apkcombo 排序取前 3。
 * 额外守卫：查询词全是停用词且无整词命中时，不映射。
 */
function pickRelevantAppIds(term, hits) {
  const normalizedTerm = term.trim().replace(/\s+/g, " ").toLowerCase();
  const tokens = normalizedTerm.split(/\s+/).filter((t) => t.length >= 2);
  const contentTokens = tokens.filter((t) => !STOPWORD_TOKENS.has(t));
  const termNoSpace = normalizedTerm.replace(/\s+/g, "");

  const scored = hits
    .map((h) => {
      const title = h.slug.replace(/-/g, " ");
      const haystack = `${title} ${h.pkg}`.toLowerCase();
      let score = 0;
      if (haystack.includes(normalizedTerm)) score += 10;
      for (const token of contentTokens) if (haystack.includes(token)) score += 2;
      if (h.pkg.toLowerCase().includes(termNoSpace)) score += 4;
      return { pkg: h.pkg, score };
    })
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];

  if (!hasLatinChars(normalizedTerm)) {
    return scored.slice(0, 3).map((x) => x.pkg);
  }

  if (contentTokens.length === 0 && scored[0].score < 10) {
    return [];
  }

  const minScore = 2;
  const top = scored.filter((x) => x.score >= minScore).slice(0, 3);
  if (top.length) return top.map((x) => x.pkg);
  if (scored[0].score > 0) return [scored[0].pkg];
  return [];
}

async function main() {
  if (!process.env.POSTGRES_URL) {
    console.error("缺少 POSTGRES_URL 环境变量");
    process.exit(1);
  }

  const client = new Client({ connectionString: process.env.POSTGRES_URL });
  await client.connect();

  // 取未解决的关键词失败，按 normalized_query 去重（同一关键词多条失败只搜一次）
  const { rows } = await client.query(
    `SELECT normalized_query,
            MAX(query) AS query,
            SUM(failure_count) AS failure_count,
            COUNT(*) AS row_count
     FROM search_failure_queries
     WHERE resolved = FALSE
       AND query_type = 'keyword'
       AND normalized_query <> ''
     GROUP BY normalized_query
     HAVING SUM(failure_count) >= $1
     ORDER BY SUM(failure_count) DESC, normalized_query ASC
     LIMIT $2`,
    [MIN_FAILURES, LIMIT || null],
  );

  console.log(
    `[backfill] 待处理不同关键词: ${rows.length}（min-failures=${MIN_FAILURES}${LIMIT ? `, limit=${LIMIT}` : ""}）`,
  );

  let mapped = 0;
  let noResult = 0;
  let error = 0;
  let skipped = 0;

  let index = 0;
  async function worker() {
    while (index < rows.length) {
      const row = rows[index++];
      const q = row.normalized_query;

      let apps;
      try {
        apps = await searchApkCombo(q);
      } catch (e) {
        error += 1;
        console.warn(`[backfill] 搜索失败 ${JSON.stringify(q)}: ${e?.message || e}`);
        await sleep(DELAY_MS);
        continue;
      }

      if (!apps.length) {
        noResult += 1;
        await sleep(DELAY_MS);
        continue;
      }

      const appIds = pickRelevantAppIds(q, apps);
      if (!appIds.length) {
        noResult += 1;
        await sleep(DELAY_MS);
        continue;
      }
      const appIdsValue = appIds.join(",");

      if (DRY_RUN) {
        console.log(
          `[dry-run] ${JSON.stringify(q)} (x${row.failure_count}) => ${appIds.map((p) => p).join(", ")}`,
        );
      } else {
        try {
          await client.query(
            `INSERT INTO search_alias_overrides (alias_key, app_ids, source_query, source_label, updated_at)
             VALUES ($1, $2, $3, 'apkcombo-backfill', NOW())
             ON CONFLICT (alias_key) DO UPDATE SET
               app_ids = EXCLUDED.app_ids,
               source_query = EXCLUDED.source_query,
               source_label = EXCLUDED.source_label,
               updated_at = NOW()`,
            [q.slice(0, 200), appIdsValue, row.query.slice(0, 500)],
          );
          await client.query(
            `UPDATE search_failure_queries
             SET resolved = TRUE, resolved_at = NOW(), updated_at = NOW()
             WHERE resolved = FALSE AND normalized_query = $1`,
            [q],
          );
          console.log(
            `[mapped] ${JSON.stringify(q)} (x${row.failure_count}) => ${appIds.join(", ")}`,
          );
        } catch (e) {
          error += 1;
          console.warn(`[backfill] 写库失败 ${JSON.stringify(q)}: ${e?.message || e}`);
        }
      }

      mapped += 1;
      await sleep(DELAY_MS);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  await client.end();
  console.log(
    `\n[backfill] 完成：映射 ${mapped}，无结果 ${noResult}，错误 ${error}${DRY_RUN ? "（dry-run，未落库）" : ""}`,
  );
}

main().catch((e) => {
  console.error("[backfill] 致命错误:", e);
  process.exit(1);
});
