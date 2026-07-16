/**
 * Fast admin queue cleanup (scan then patch; no long live probes).
 *
 * Usage:
 *   ADMIN_API_KEY=... node scripts/cleanup-admin-queues.mjs
 */

const SITE = (process.env.REPAIR_SITE_HOST || "https://www.gptoapk.com").replace(/\/$/, "");
const KEY = process.env.ADMIN_API_KEY || process.env.REPAIR_ADMIN_KEY || "";
const PAGE_SIZE = 100;
const MAX_SEARCH_PAGES = Number(process.env.CLEANUP_SEARCH_PAGES ?? 15);
const MAX_DOWNLOAD_PAGES = Number(process.env.CLEANUP_DOWNLOAD_PAGES ?? 12);
const CONCURRENCY = Number(process.env.CLEANUP_CONCURRENCY ?? 8);
const FETCH_TIMEOUT_MS = 25_000;

if (!KEY) {
  console.error("ADMIN_API_KEY required");
  process.exit(1);
}

const PACKAGE_RE = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

const JUNK_EXACT = new Set(
  [
    "photoo", "instead", "ikura", "xapp", "furry", "browsehere", "rush", "docs",
    "iptv", "googlep", "chorme", "gemail", "wvs", "糖", "zoog", "sum", "phantom",
    "安全可信应用", "all accor", "apk安装工具", "装逼生成器", "apktool", "付款记录生成器",
  ].map((s) => s.toLowerCase()),
);

const JUNK_RE =
  /pornhub|pronhub|onlyfans|deepfake|糖心|装逼生成器|付款记录|apk安装|apktool|快喵|vnp|ミルアウ|vampir|魅魔|海特洛|人民检察院|weverse_v|aptoide/i;

const KEEP_RE =
  /xbox|googleearth|元气骑士|bumble|temu|webex|forest|愤怒小鸟|使命召唤|stick war|gta|coze|balatro|musicolet|everskies|droidcam|englishscore|weverse|traveloka|纪念碑谷|trainline|ubereat|authenticator|ventusky|lingokids|zynga|wsop|singtel|owntracks|star walk|moboreader|今日水印|英雄联盟|kazumi|realityscan|revolut|tuya/i;

const FEEDBACK_DONE_RE =
  /pornhub|糖心|海特洛|人民检察院|下载andr|andr[σⅰ]|安装包|openproject|elevenlabs|hellolive|地理猜猜猜|whoears|蝙蝠|aion2|gamestruggles|visio|^wvs$|^糖$/i;

const BAD_DOWNLOAD_RE = /^(www\.|com\.an\.cl\.)|apkmirror|gptoapk\.com|baidu\.com|juxiaomao|txt\.top|\bvpn\b|v2ray|openvpn|wireguard/i;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
    return { ok: res.ok, status: res.status, json, text };
  } finally {
    clearTimeout(timer);
  }
}

function adminUrl(path, params = {}) {
  const url = new URL(path, SITE);
  url.searchParams.set("key", KEY);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  }
  return url.toString();
}

async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const item = items[i];
        i += 1;
        await fn(item);
      }
    }),
  );
}

function classifySearch(query, failureKind) {
  const q = String(query || "").trim();
  const lower = q.toLowerCase();
  if (!q || failureKind === "query_too_long") return "dismiss";
  if (JUNK_EXACT.has(lower) || JUNK_RE.test(q)) return "dismiss";
  if (q.length <= 3 && failureKind === "no_results" && !PACKAGE_RE.test(q)) return "dismiss";
  if (/^https?:\/\//i.test(q) && !/play\.google\.com.*id=/i.test(q)) return "dismiss";
  if (failureKind === "no_results" && !PACKAGE_RE.test(q) && !KEEP_RE.test(q) && q.length <= 80) {
    return "archive";
  }
  return null;
}

async function main() {
  console.log(`[cleanup] ${SITE}`);

  const junk = await fetchJson(adminUrl("/api/admin/search-failures/dismiss-junk"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  console.log("[cleanup] server dismiss-junk:", junk.json || junk.status);

  const searchTargets = [];
  for (let p = 0; p < MAX_SEARCH_PAGES; p += 1) {
    const res = await fetchJson(adminUrl("/api/admin", { pageSize: PAGE_SIZE, searchFailurePage: p }));
    const rows = (res.json?.search_failures || []).filter((r) => !r.resolved);
    if (!rows.length) break;
    for (const row of rows) {
      const action = classifySearch(row.query, row.failure_kind);
      if (action) searchTargets.push({ ...row, action });
    }
    console.log(`[search] scan page ${p}: rows=${rows.length} actionable=${searchTargets.length}`);
  }

  let searchOk = 0;
  await pool(searchTargets, CONCURRENCY, async (row) => {
    const res = await fetchJson(adminUrl("/api/admin/search-failures"), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryKey: row.query_key, resolved: true }),
    });
    if (res.ok) searchOk += 1;
  });
  console.log("[cleanup] search patched:", searchOk, "/", searchTargets.length);

  const fbRes = await fetchJson(adminUrl("/api/admin", { pageSize: 100, missingAppFeedbackPage: 0 }));
  let fbOk = 0;
  for (const row of (fbRes.json?.missing_app_feedback || []).filter((r) => r.status !== "done")) {
    const q = String(row.query || "").trim();
    if (FEEDBACK_DONE_RE.test(q) || q.length <= 2 || /^\d{8,}$/.test(q)) {
      const res = await fetchJson(adminUrl("/api/admin/missing-app-feedback"), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(row.id), status: "done" }),
      });
      if (res.ok) fbOk += 1;
    }
  }
  console.log("[cleanup] feedback done:", fbOk);

  const badIds = new Set();
  for (let p = 0; p < MAX_DOWNLOAD_PAGES; p += 1) {
    const res = await fetchJson(adminUrl("/api/admin", { pageSize: PAGE_SIZE, failurePage: p }));
    const rows = res.json?.download_failures || [];
    if (!rows.length) break;
    for (const row of rows) {
      const id = String(row.app_id || "");
      const title = String(row.app_title || "");
      if (!PACKAGE_RE.test(id) || BAD_DOWNLOAD_RE.test(id) || BAD_DOWNLOAD_RE.test(title)) {
        badIds.add(id);
      }
    }
  }

  let dlOk = 0;
  await pool([...badIds], CONCURRENCY, async (appId) => {
    const res = await fetchJson(adminUrl("/api/admin/download-failures"), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appId, resolved: true }),
    });
    if (res.ok) dlOk += 1;
  });
  console.log("[cleanup] downloads resolved:", dlOk, "/", badIds.size);

  await sleep(300);
  const after = await fetchJson(adminUrl("/api/admin", { pageSize: 1 }));
  console.log("[cleanup] remaining:", {
    search: after.json?.unresolved_search_failures,
    feedback: after.json?.pending_missing_app_feedback,
    download: after.json?.unresolved_download_failures,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
