/**
 * One-off / emergency: paginate unresolved search failures, live-probe search-apps,
 * and PATCH resolve when results exist (or query matches junk dismiss rules).
 */

const SITE = (process.env.REPAIR_SITE_HOST || "https://www.gptoapk.com").replace(/\/$/, "");
const KEY = process.env.ADMIN_API_KEY || process.env.REPAIR_ADMIN_KEY || "gptoapk-admin-key-2026";
const PAGE_SIZE = Number(process.env.BULK_RESOLVE_PAGE_SIZE ?? 50);
const MAX_PAGES = Number(process.env.BULK_RESOLVE_MAX_PAGES ?? 20);
const DELAY_MS = Number(process.env.BULK_RESOLVE_DELAY_MS ?? 400);
const SEARCH_TIMEOUT_MS = Number(process.env.BULK_RESOLVE_SEARCH_TIMEOUT_MS ?? 18_000);

const JUNK_RE =
  /^(map|jm|kmt|ph|gridnr|googleservice|uutool|tools?|apk|app|apps|android|download|video|game|games)$/i;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldDismiss(query, failureKind) {
  const q = query.trim();
  if (!q) return true;
  if (failureKind === "invalid_url" && q.includes("play.google.com") && !q.includes("id=")) return true;
  if (failureKind === "query_too_long") return true;
  if (q.length <= 3 && failureKind === "no_results" && !/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/i.test(q)) return true;
  if (JUNK_RE.test(q)) return true;
  if (/智博|1919|工具站|cladue/i.test(q)) return true;
  return false;
}

async function fetchAdminPage(page) {
  const url = `${SITE}/api/admin?key=${encodeURIComponent(KEY)}&pageSize=${PAGE_SIZE}&searchFailurePage=${page}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`admin ${res.status}`);
  return res.json();
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
  const res = await fetch(`${SITE}/api/admin/search-failures?key=${encodeURIComponent(KEY)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ queryKey, resolved: true }),
  });
  return res.ok;
}

async function runReconcileDeep() {
  const res = await fetch(`${SITE}/api/admin/search-failures/reconcile?key=${encodeURIComponent(KEY)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      maxChecks: 10000,
      liveProbeLimit: 500,
      liveProbeTimeoutMs: 12_000,
      feedbackLimit: 1,
      searchFailureDiscoveryLimit: 0,
      skipDiscovery: true,
      skipFeedback: true,
      skipStaticSync: false,
    }),
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 300), status: res.status };
  }
}

async function main() {
  console.log(`[bulk-resolve] ${SITE} starting…`);

  console.log("[bulk-resolve] running server reconcile first…");
  const reconcile = await runReconcileDeep();
  console.log("[bulk-resolve] reconcile:", JSON.stringify(reconcile));

  let resolved = 0;
  let dismissed = 0;
  let probed = 0;
  let pages = 0;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    await sleep(DELAY_MS);
    const data = await fetchAdminPage(page);
    const rows = (data.search_failures || []).filter((r) => !r.resolved);
    if (!rows.length) break;
    pages += 1;

    for (const row of rows) {
      if (shouldDismiss(row.query, row.failure_kind)) {
        if (await markResolved(row.query_key)) {
          dismissed += 1;
          console.log(`[dismiss] ${row.query}`);
        }
        continue;
      }

      probed += 1;
      const lang = row.last_lang || "en";
      const country = row.last_country || (lang.startsWith("zh") ? "cn" : "us");
      const ok = await probeSearch(row.query, lang, country);
      if (ok && (await markResolved(row.query_key))) {
        resolved += 1;
        console.log(`[live] ${row.query}`);
      }
      await sleep(80);
    }

    if (rows.length < PAGE_SIZE) break;
  }

  const after = await fetchAdminPage(0);
  console.log(
    `[bulk-resolve] done pages=${pages} live=${resolved} dismiss=${dismissed} probed=${probed} remaining=${after.unresolved_search_failures}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
