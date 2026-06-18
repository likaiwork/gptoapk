/**
 * Paginate unresolved search failures, live-probe search-apps,
 * and PATCH resolve when results exist (or query matches junk dismiss rules).
 */

const SITE = (process.env.REPAIR_SITE_HOST || "https://www.gptoapk.com").replace(/\/$/, "");
const KEY = process.env.ADMIN_API_KEY || process.env.REPAIR_ADMIN_KEY || "gptoapk-admin-key-2026";
const PAGE_SIZE = Number(process.env.BULK_RESOLVE_PAGE_SIZE ?? 100);
const MAX_PAGES = Number(process.env.BULK_RESOLVE_MAX_PAGES ?? 25);
const DELAY_MS = Number(process.env.BULK_RESOLVE_DELAY_MS ?? 300);
const SEARCH_TIMEOUT_MS = Number(process.env.BULK_RESOLVE_SEARCH_TIMEOUT_MS ?? 15_000);
const CONCURRENCY = Number(process.env.BULK_RESOLVE_CONCURRENCY ?? 6);
const ARCHIVE_FAILED = process.env.BULK_ARCHIVE_FAILED === "1";
const PACKAGE_RE = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

const JUNK_RE =
  /^(map|jm|kmt|ph|gridnr|googleservice|uutool|tools?|apk|app|apps|android|download|video|game|games)$/i;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function withRetry(fn, label, attempts = 4) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const wait = 600 * (i + 1);
      console.warn(`[bulk-resolve] retry ${label} (${i + 1}/${attempts}) in ${wait}ms`);
      await sleep(wait);
    }
  }
  throw lastError;
}

function shouldDismiss(query, failureKind) {
  const q = query.trim();
  if (!q) return true;
  if (failureKind === "invalid_url" && q.includes("play.google.com") && !q.includes("id=")) return true;
  if (failureKind === "query_too_long") return true;
  if (/^chrome_/i.test(q) || /^[A-Za-z]+_[0-9]/.test(q)) return true;
  if (/^[A-Za-z0-9+/]{20,}={0,2}$/.test(q)) return true;
  if (/性感按摩|你就不要想起我|你离开之后/.test(q)) return true;
  if (/pronhub|pornhub|樱花|魅魔|onlyfans|deepfake/i.test(q)) return true;
  if (/^(trader|browser|purple|knows|velo|volvoonroad|u er|damm|dazmm|ainoon|zymix)$/i.test(q)) return true;
  if (/^goole\s*play|gooleplay|googieplay|goodle\s*pay$/i.test(q)) return true;
  if (/^fake\s*gps$/i.test(q)) return true;
  if (/^hiddiy$/i.test(q)) return false;
  if (q.length <= 3 && failureKind === "no_results" && !/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/i.test(q)) return true;
  if (/^downloadapk$/i.test(q)) return true;
  if (/^(smart|poly|move|mentplus|toutb|https|csgo|bundletool|omcsa|gpsurfer|xsection|wheretoknow)$/i.test(q) && failureKind === "no_results") return true;
  if (/小蓝视频|csgo\s*mobile/i.test(q)) return true;
  if (/智博|1919|工具站|cladue/i.test(q)) return true;
  return false;
}

async function fetchAdminPage(page) {
  return withRetry(async () => {
    const url = `${SITE}/api/admin?key=${encodeURIComponent(KEY)}&pageSize=${PAGE_SIZE}&searchFailurePage=${page}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`admin ${res.status}`);
    return res.json();
  }, `admin-page-${page}`);
}

async function probeSearch(query, lang, country) {
  const params = new URLSearchParams({ q: query, hl: lang || "en", gl: country || "us" });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEARCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${SITE}/api/search-apps?${params}`, {
      signal: controller.signal,
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return res.ok && Array.isArray(data.results) && data.results.length > 0;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function markResolved(queryKey) {
  return withRetry(async () => {
    const res = await fetch(`${SITE}/api/admin/search-failures?key=${encodeURIComponent(KEY)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryKey, resolved: true }),
    });
    if (!res.ok) throw new Error(`patch ${res.status}`);
    return true;
  }, `patch-${queryKey.slice(0, 24)}`);
}

async function dismissJunkOnServer() {
  const res = await fetch(`${SITE}/api/admin/search-failures/dismiss-junk?key=${encodeURIComponent(KEY)}`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) return { dismissed: 0, status: res.status };
  return res.json();
}

async function processRow(row, stats) {
  if (shouldDismiss(row.query, row.failure_kind)) {
    if (await markResolved(row.query_key)) {
      stats.dismissed += 1;
      console.log(`[dismiss] ${row.query}`);
    }
    return;
  }

  stats.probed += 1;
  const lang = row.last_lang || "en";
  const country = row.last_country || (lang.startsWith("zh") ? "cn" : "us");
  const ok = await probeSearch(row.query, lang, country);
  if (ok && (await markResolved(row.query_key))) {
    stats.resolved += 1;
    console.log(`[live] ${row.query}`);
    return;
  }

  if (
    ARCHIVE_FAILED &&
    row.failure_kind === "no_results" &&
    !PACKAGE_RE.test(row.query.trim()) &&
    row.query.trim().length <= 80
  ) {
    if (await markResolved(row.query_key)) {
      stats.archived += 1;
      console.log(`[archive] ${row.query}`);
    }
  }
}

async function runPool(items, worker, concurrency) {
  let index = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const i = index;
      index += 1;
      await worker(items[i]);
    }
  });
  await Promise.all(runners);
}

async function main() {
  console.log(`[bulk-resolve] ${SITE} concurrency=${CONCURRENCY}`);

  try {
    const junk = await dismissJunkOnServer();
    console.log("[bulk-resolve] server dismiss-junk:", JSON.stringify(junk));
  } catch (error) {
    console.warn("[bulk-resolve] dismiss-junk skipped:", error instanceof Error ? error.message : error);
  }

  const stats = { resolved: 0, dismissed: 0, archived: 0, probed: 0, pages: 0 };

  for (let page = 0; page < MAX_PAGES; page += 1) {
    await sleep(DELAY_MS);
    const data = await fetchAdminPage(page);
    const rows = (data.search_failures || []).filter((r) => !r.resolved);
    if (!rows.length) break;
    stats.pages += 1;

    await runPool(rows, (row) => processRow(row, stats), CONCURRENCY);

    if (rows.length < PAGE_SIZE) break;
  }

  const after = await fetchAdminPage(0);
  console.log(
    `[bulk-resolve] done pages=${stats.pages} live=${stats.resolved} dismiss=${stats.dismissed} archived=${stats.archived} probed=${stats.probed} remaining=${after.unresolved_search_failures}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
