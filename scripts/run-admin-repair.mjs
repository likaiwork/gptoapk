/**
 * Runs download repair + search failure reconcile against production.
 * Used by GitHub Actions every 30 minutes (see .github/workflows/hourly-repair-admin.yml).
 */

const SITE_HOST = (process.env.REPAIR_SITE_HOST || process.env.SITE_HOST || "https://www.gptoapk.com").replace(/\/$/, "");
const ADMIN_KEY = process.env.ADMIN_API_KEY || process.env.REPAIR_ADMIN_KEY || "gptoapk-admin-key-2026";
const FAILURE_THRESHOLD = Number(process.env.REPAIR_FAILURE_THRESHOLD ?? 0);
const MAX_APPS = Number(process.env.REPAIR_MAX_APPS ?? 150);
const SEARCH_MAX_CHECKS = Number(process.env.REPAIR_SEARCH_MAX_CHECKS ?? 5000);
const SEARCH_BATCH_SIZE = Number(process.env.REPAIR_SEARCH_BATCH_SIZE ?? 500);
const SEARCH_LIVE_PROBE_LIMIT = Number(process.env.REPAIR_SEARCH_LIVE_PROBE_LIMIT ?? 120);
const FEEDBACK_LIMIT = Number(process.env.REPAIR_FEEDBACK_LIMIT ?? 40);
const SEARCH_DISCOVERY_LIMIT = Number(process.env.REPAIR_SEARCH_DISCOVERY_LIMIT ?? 60);
const MIRROR_MAX_APPS = Number(process.env.REPAIR_MIRROR_MAX_APPS ?? 80);
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

async function getJson(url) {
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, json, text };
}

async function runUnifiedRepair() {
  return getJson(
    adminUrl("/api/cron/repair-failures", {
      feedbackLimit: FEEDBACK_LIMIT,
      searchFailureDiscoveryLimit: SEARCH_DISCOVERY_LIMIT,
      searchMaxChecks: SEARCH_MAX_CHECKS,
      searchLiveProbeLimit: SEARCH_LIVE_PROBE_LIMIT,
      failureThreshold: FAILURE_THRESHOLD,
      maxApps: MAX_APPS,
      mirrorMaxApps: MIRROR_MAX_APPS,
    }),
  );
}

async function runLegacyApiRepair() {
  const download = await postJson(adminUrl("/api/admin/download-failures/repair"), {
    failureThreshold: FAILURE_THRESHOLD,
    maxApps: MAX_APPS,
  });

  const search = await postJson(adminUrl("/api/admin/search-failures/reconcile"), {
    maxChecks: SEARCH_MAX_CHECKS,
    batchSize: SEARCH_BATCH_SIZE,
    liveProbeLimit: SEARCH_LIVE_PROBE_LIMIT,
  });

  return { download, search };
}

async function main() {
  const started = new Date().toISOString();
  console.log(`[admin-repair] ${started} host=${SITE_HOST}`);

  const unified = await runUnifiedRepair();
  if (unified.ok && unified.json?.success) {
    const s = unified.json.search || {};
    const d = unified.json.download || {};
    const m = unified.json.mirror || {};
    console.log(
      `[admin-repair] feedback: processed=${s.feedbackProcessed ?? 0} resolved=${s.feedbackResolved ?? 0}`,
    );
    console.log(
      `[admin-repair] search: aliases=${s.aliasesCreated ?? 0} resolved=${s.totalResolved ?? 0} discoveryMiss=${s.discoveryMisses ?? 0}`,
    );
    console.log(
      `[admin-repair] download: rechecked=${d.downloadRechecked ?? 0} resolved=${d.downloadMarkedResolved ?? 0} still=${d.stillUnresolved ?? 0}`,
    );
    console.log(
      `[admin-repair] mirror: probed=${m.probed ?? 0} found=${m.mirrorsFound ?? 0} resolved=${m.downloadMarkedResolved ?? 0}`,
    );
  } else {
    console.warn(`[admin-repair] unified repair unavailable (${unified.status}), falling back to legacy APIs`);
    const api = await runLegacyApiRepair();

    if (!api.download.ok) {
      console.error(`[admin-repair] download repair failed: ${api.download.status} ${api.download.text.slice(0, 300)}`);
      process.exitCode = 1;
    } else {
      const d = api.download.json || {};
      console.log(
        `[admin-repair] download: rechecked=${d.downloadRechecked ?? 0} resolved=${d.downloadMarkedResolved ?? 0} blocked=${d.blockedResolved ?? 0} still=${d.stillUnresolved ?? 0}`,
      );
    }

    if (!api.search.ok) {
      console.error(`[admin-repair] search reconcile failed: ${api.search.status} ${api.search.text.slice(0, 300)}`);
      process.exitCode = 1;
    } else {
      const s = api.search.json || {};
      console.log(
        `[admin-repair] search: checked=${s.checked ?? 0} resolved=${s.resolved ?? 0} live=${s.liveResolved ?? 0} dismissed=${s.dismissed ?? 0}`,
      );
    }
  }

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
