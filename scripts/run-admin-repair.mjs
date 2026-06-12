/**
 * Runs download repair + search failure reconcile against production.
 * Used by GitHub Actions every 30 minutes (see .github/workflows/hourly-repair-admin.yml).
 *
 * Uses batched reconcile POSTs to avoid Cloudflare/Vercel 524 timeouts on the monolithic cron route.
 */

const SITE_HOST = (process.env.REPAIR_SITE_HOST || process.env.SITE_HOST || "https://www.gptoapk.com").replace(/\/$/, "");
const ADMIN_KEY = process.env.ADMIN_API_KEY || process.env.REPAIR_ADMIN_KEY || "gptoapk-admin-key-2026";
const FAILURE_THRESHOLD = Number(process.env.REPAIR_FAILURE_THRESHOLD ?? 0);
const MAX_APPS = Number(process.env.REPAIR_MAX_APPS ?? 150);
const SEARCH_MAX_CHECKS = Number(process.env.REPAIR_SEARCH_MAX_CHECKS ?? 600);
const SEARCH_LIVE_PROBE_LIMIT = Number(process.env.REPAIR_SEARCH_LIVE_PROBE_LIMIT ?? 60);
const FEEDBACK_LIMIT = Number(process.env.REPAIR_FEEDBACK_LIMIT ?? 40);
const SEARCH_DISCOVERY_LIMIT = Number(process.env.REPAIR_SEARCH_DISCOVERY_LIMIT ?? 40);
const MIRROR_MAX_APPS = Number(process.env.REPAIR_MIRROR_MAX_APPS ?? 60);
const RECONCILE_ROUNDS = Number(process.env.REPAIR_RECONCILE_ROUNDS ?? 8);
const RUN_DEEP_DOWNLOAD_SCRIPT = process.env.REPAIR_RUN_DEEP_SCRIPT !== "0";

function adminUrl(path, params = {}) {
  const url = new URL(path, SITE_HOST);
  url.searchParams.set("key", ADMIN_KEY);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  }
  return url.toString();
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, json, text };
}

async function runSearchReconcileRound(body) {
  return postJson(adminUrl("/api/admin/search-failures/reconcile"), body);
}

async function runBatchedSearchRepair() {
  let totalResolved = 0;
  let totalDismissed = 0;
  let totalFeedbackResolved = 0;
  let totalAliases = 0;
  let totalDiscoveryMiss = 0;

  const first = await runSearchReconcileRound({
    maxChecks: SEARCH_MAX_CHECKS,
    liveProbeLimit: SEARCH_LIVE_PROBE_LIMIT,
    feedbackLimit: FEEDBACK_LIMIT,
    searchFailureDiscoveryLimit: SEARCH_DISCOVERY_LIMIT,
    skipStaticSync: false,
    skipDiscovery: false,
    skipFeedback: false,
  });

  if (!first.ok || !first.json?.success) {
    console.warn(
      `[admin-repair] search reconcile round 1 failed: ${first.status} ${first.text.slice(0, 300)}`,
    );
    return { ok: false, totalResolved, totalDismissed, totalFeedbackResolved };
  }

  const accumulate = (s, round) => {
    const resolved = Number(s.totalResolved ?? s.searchFailuresResolved ?? 0);
    totalResolved += resolved;
    totalDismissed += Number(s.dismissed ?? 0);
    totalFeedbackResolved += Number(s.feedbackResolved ?? 0);
    totalAliases += Number(s.aliasesCreated ?? 0);
    totalDiscoveryMiss += Number(s.discoveryMisses ?? 0);
    console.log(
      `[admin-repair] search round ${round}: resolved=${resolved} dismissed=${s.dismissed ?? 0} feedback=${s.feedbackResolved ?? 0} aliases=${s.aliasesCreated ?? 0} discoveryMiss=${s.discoveryMisses ?? 0}`,
    );
    return resolved;
  };

  let lastResolved = accumulate(first.json, 1);

  for (let round = 2; round <= RECONCILE_ROUNDS; round += 1) {
    if (lastResolved === 0 && round > 3) break;

    const res = await runSearchReconcileRound({
      maxChecks: SEARCH_MAX_CHECKS,
      liveProbeLimit: SEARCH_LIVE_PROBE_LIMIT,
      feedbackLimit: Math.min(FEEDBACK_LIMIT, 25),
      searchFailureDiscoveryLimit: round <= 4 ? SEARCH_DISCOVERY_LIMIT : 0,
      skipStaticSync: true,
      skipDiscovery: round > 4,
      skipFeedback: round > 6,
    });

    if (!res.ok || !res.json?.success) {
      console.warn(
        `[admin-repair] search reconcile round ${round} failed: ${res.status} ${res.text.slice(0, 200)}`,
      );
      break;
    }

    lastResolved = accumulate(res.json, round);
  }

  console.log(
    `[admin-repair] search totals: resolved=${totalResolved} dismissed=${totalDismissed} feedback=${totalFeedbackResolved} aliases=${totalAliases} discoveryMiss=${totalDiscoveryMiss}`,
  );
  return { ok: true, totalResolved, totalDismissed, totalFeedbackResolved };
}

async function runDownloadRepair() {
  const download = await postJson(adminUrl("/api/admin/download-failures/repair"), {
    failureThreshold: FAILURE_THRESHOLD,
    maxApps: MAX_APPS,
  });
  if (!download.ok) {
    console.error(
      `[admin-repair] download repair failed: ${download.status} ${download.text.slice(0, 300)}`,
    );
    return { ok: false };
  }
  const d = download.json || {};
  console.log(
    `[admin-repair] download: rechecked=${d.downloadRechecked ?? 0} resolved=${d.downloadMarkedResolved ?? 0} blocked=${d.blockedResolved ?? 0} still=${d.stillUnresolved ?? 0}`,
  );
  return { ok: true };
}

async function main() {
  const started = new Date().toISOString();
  console.log(`[admin-repair] ${started} host=${SITE_HOST}`);

  const search = await runBatchedSearchRepair();
  if (!search.ok) process.exitCode = 1;

  const download = await runDownloadRepair();
  if (!download.ok) process.exitCode = 1;

  if (RUN_DEEP_DOWNLOAD_SCRIPT) {
    const { spawnSync } = await import("node:child_process");
    const deep = spawnSync(
      process.execPath,
      ["scripts/repair-download-failures.mjs", "--json"],
      {
        env: {
          ...process.env,
          REPAIR_SITE_HOST: SITE_HOST,
          ADMIN_API_KEY: ADMIN_KEY,
          REPAIR_FAILURE_THRESHOLD: String(FAILURE_THRESHOLD),
          REPAIR_MARK_RESOLVED: "1",
          REPAIR_MAX_CANDIDATES: String(Math.min(MAX_APPS, 80)),
        },
        stdio: "inherit",
      },
    );
    if (deep.status !== 0 && deep.status !== 2) {
      process.exitCode = deep.status || 1;
    }
  }

  console.log(`[admin-repair] done ${new Date().toISOString()}`);
}

main().catch((error) => {
  console.error(`[admin-repair] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
