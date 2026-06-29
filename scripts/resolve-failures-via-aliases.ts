/**
 * Resolve search failures by probing alias/typo/package-id variants on production.
 */
import { resolveSearchAliasAppIds } from "../src/lib/search-aliases";
import { applySearchTypoCorrection } from "../src/lib/search-query-normalize";

const KEY = process.env.ADMIN_API_KEY || process.env.REPAIR_ADMIN_KEY || "gptoapk-admin-key-2026";
const SITE = (process.env.SITE || process.env.REPAIR_SITE_HOST || "https://www.gptoapk.com").replace(/\/$/, "");

async function probe(q: string) {
  const url = `${SITE}/api/search-apps?q=${encodeURIComponent(q)}&hl=en&gl=us`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  const j = await res.json().catch(() => ({}));
  return res.ok && Array.isArray(j.results) && j.results.length > 0;
}

async function markResolved(queryKey: string) {
  const res = await fetch(`${SITE}/api/admin/search-failures?key=${encodeURIComponent(KEY)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ queryKey, resolved: true }),
  });
  return res.ok;
}

function probeCandidates(query: string) {
  const corrected = applySearchTypoCorrection(query);
  const keys = new Set([query, corrected]);
  for (const k of [query, corrected]) {
    const ids = resolveSearchAliasAppIds(k);
    if (ids?.length) ids.forEach((id) => keys.add(id));
  }
  return [...keys];
}

function shouldDismiss(query: string) {
  const q = query.trim();
  const lower = q.toLowerCase();
  if (/^(player|blood|puzzle|piano|messages|clone|testflight|star force)$/i.test(lower)) return true;
  if (/^javascript:/i.test(q) || /^ucfp:/i.test(q)) return true;
  if (/^stop king/i.test(q) || q.includes("时停之王")) return true;
  return false;
}

async function main() {
  const adminRes = await fetch(`${SITE}/api/admin?key=${encodeURIComponent(KEY)}&pageSize=200`);
  if (!adminRes.ok) throw new Error(`admin ${adminRes.status}`);
  const admin = await adminRes.json();
  const rows = (admin.search_failures || []).filter((r: { resolved: boolean }) => !r.resolved);

  let resolved = 0;
  let dismissed = 0;

  for (const row of rows) {
    const q = row.query as string;
    if (shouldDismiss(q)) {
      if (await markResolved(row.query_key as string)) {
        dismissed += 1;
        console.log(`[dismiss] ${q}`);
      }
      continue;
    }

    let ok = false;
    for (const c of probeCandidates(q)) {
      if (await probe(c)) {
        ok = true;
        break;
      }
    }

    if (ok) {
      if (await markResolved(row.query_key as string)) {
        resolved += 1;
        console.log(`[resolved] ${q}`);
      }
    } else {
      console.log(`[pending] ${q}`);
    }
  }

  const afterRes = await fetch(`${SITE}/api/admin?key=${encodeURIComponent(KEY)}&pageSize=5`);
  const after = await afterRes.json();
  console.log(
    `[done] resolved=${resolved} dismissed=${dismissed} remaining=${after.unresolved_search_failures} feedback=${after.pending_missing_app_feedback}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
