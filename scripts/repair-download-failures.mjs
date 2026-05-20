const SITE_HOST = process.env.REPAIR_SITE_HOST || "https://gptoapk.com";
const ADMIN_KEY = process.env.ADMIN_API_KEY || process.env.REPAIR_ADMIN_KEY || "gptoapk-admin-key-2026";
const FAILURE_THRESHOLD = Number(process.env.REPAIR_FAILURE_THRESHOLD || 5);
const PAGE_SIZE = Number(process.env.REPAIR_PAGE_SIZE || 100);
const REQUEST_TIMEOUT_MS = Number(process.env.REPAIR_REQUEST_TIMEOUT_MS || 45000);
const SOURCE_TIMEOUT_MS = Number(process.env.REPAIR_SOURCE_TIMEOUT_MS || 30000);
const MARK_RESOLVED = process.argv.includes("--mark-resolved") || process.env.REPAIR_MARK_RESOLVED === "1";
const JSON_OUTPUT = process.argv.includes("--json");
const USER_AGENT = "gptoapk-download-repair/1.0";

function withTimeout(timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timer),
  };
}

async function fetchText(url, init = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const timeout = withTimeout(timeoutMs);
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        "User-Agent": USER_AGENT,
        ...init.headers,
      },
      signal: timeout.signal,
    });
    const body = await response.text().catch(() => "");
    return { ok: response.ok, status: response.status, body, headers: response.headers, url: response.url };
  } catch (error) {
    return { ok: false, status: 0, body: error instanceof Error ? error.message : String(error), headers: new Headers(), url };
  } finally {
    timeout.clear();
  }
}

async function fetchJson(url, init = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const result = await fetchText(url, init, timeoutMs);
  try {
    return { ...result, json: JSON.parse(result.body) };
  } catch {
    return { ...result, json: null };
  }
}

function adminUrl(path, params = {}) {
  const url = new URL(path, SITE_HOST);
  url.searchParams.set("key", ADMIN_KEY);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  }
  return url.toString();
}

function downloadApiUrl(path = "/api/download-apk") {
  return new URL(path, SITE_HOST).toString();
}

function isVpnLike(item) {
  const text = `${item.app_id || ""} ${item.app_title || ""}`.toLowerCase();
  return /\bvpn\b|proxy|wireguard|openvpn|surfshark|nordvpn|expressvpn|protonvpn/.test(text);
}

async function loadFailureRows() {
  const rows = [];
  let page = 0;
  let total = Infinity;

  while (rows.length < total) {
    const result = await fetchJson(adminUrl("/api/admin", {
      pageSize: PAGE_SIZE,
      failurePage: page,
    }));
    if (!result.ok || !result.json) {
      throw new Error(`Failed to load admin failures: ${result.status} ${result.body.slice(0, 300)}`);
    }

    total = Number(result.json.download_failures_total || 0);
    rows.push(...(result.json.download_failures || []));
    if (!result.json.download_failures?.length) break;
    page += 1;
  }

  return rows;
}

async function prepareDownload(appId) {
  return fetchJson(downloadApiUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appId }),
  });
}

async function probeAptoide(appId) {
  const url = `https://ws75.aptoide.com/api/7/app/getMeta?package_name=${encodeURIComponent(appId)}`;
  const result = await fetchJson(url, {}, SOURCE_TIMEOUT_MS);
  const file = result.json?.data?.file;
  return {
    source: "aptoide",
    ok: Boolean(result.ok && (file?.path || file?.path_alt)),
    status: result.status,
    url: file?.path || file?.path_alt || "",
    note: result.json?.info?.status || result.body.slice(0, 120),
  };
}

async function probeApkPure(appId) {
  const url = `https://d.apkpure.net/b/APK/${encodeURIComponent(appId)}?version=latest`;
  const result = await fetchText(url, {
    method: "GET",
    redirect: "manual",
  }, SOURCE_TIMEOUT_MS);
  const location = result.headers.get("location") || "";
  return {
    source: "apkpure",
    ok: Boolean([301, 302, 303, 307, 308].includes(result.status) && location),
    status: result.status,
    url: location,
    note: result.body.slice(0, 120),
  };
}

async function probeOnlineApkDownloader(appId) {
  const url = `https://online-apk-downloader.com/apk-ajax&packageDownload&id=${encodeURIComponent(appId)}`;
  const result = await fetchJson(url, {
    headers: {
      Accept: "application/json,text/plain;q=0.8,*/*;q=0.7",
      Referer: "https://online-apk-downloader.com/",
    },
  }, SOURCE_TIMEOUT_MS);
  const downloadUrl = result.json?.downloadUrl?.replace(/\\\//g, "/") || "";
  return {
    source: "online-apk-downloader",
    ok: Boolean(result.json?.success && downloadUrl),
    status: result.status,
    url: downloadUrl,
    note: result.json?.message || result.body.slice(0, 120),
  };
}

async function markResolved(appId) {
  return fetchJson(adminUrl("/api/admin/download-failures"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appId, resolved: true }),
  });
}

async function inspectPackage(item) {
  const prepared = await prepareDownload(item.app_id);
  const download = prepared.json || {};
  const canDownload = Boolean(prepared.ok && download.success && download.downloadUrl);
  const probes = canDownload
    ? []
    : await Promise.all([
        probeAptoide(item.app_id),
        probeApkPure(item.app_id),
        probeOnlineApkDownloader(item.app_id),
      ]);

  let markedResolved = false;
  let markError = "";
  if (canDownload && MARK_RESOLVED) {
    const mark = await markResolved(item.app_id);
    markedResolved = Boolean(mark.ok && mark.json?.success);
    if (!markedResolved) markError = `${mark.status} ${mark.body.slice(0, 160)}`;
  }

  return {
    appId: item.app_id,
    title: item.app_title || item.app_id,
    failureCount: item.failure_count,
    lastFailedAt: item.last_failed_at,
    vpnLike: isVpnLike(item),
    canDownload,
    source: download.source || "",
    proxy: download.proxy || "",
    downloadUrl: download.downloadUrl || "",
    fallbackDownloadUrl: download.fallbackDownloadUrl || "",
    error: download.error || "",
    probes,
    markedResolved,
    markError,
  };
}

function printReport(report) {
  console.log(`[repair] ${new Date().toISOString()}`);
  console.log(`[repair] threshold > ${FAILURE_THRESHOLD}, candidates: ${report.candidates.length}`);
  console.log("");

  if (report.fixed.length > 0) {
    console.log("[repair] Currently downloadable:");
    for (const item of report.fixed) {
      const mark = item.markedResolved ? " marked-resolved" : item.markError ? ` mark-failed=${item.markError}` : "";
      console.log(`  + ${item.appId} (${item.failureCount}) via ${item.source}/${item.proxy}${mark}`);
    }
    console.log("");
  }

  if (report.needsWork.length > 0) {
    console.log("[repair] Still failing, source probes:");
    for (const item of report.needsWork) {
      console.log(`  - ${item.appId} (${item.failureCount}) ${item.vpnLike ? "[vpn-like]" : ""}`);
      console.log(`    api: ${item.error || "source_not_available"}`);
      for (const probe of item.probes) {
        console.log(`    ${probe.ok ? "+" : "-"} ${probe.source}: status=${probe.status} ${probe.url || probe.note || ""}`);
      }
    }
    console.log("");
  }

  if (report.skippedVpnLike.length > 0) {
    console.log("[repair] VPN-like packages included in scan:");
    for (const item of report.skippedVpnLike) console.log(`  * ${item.appId} (${item.failureCount})`);
    console.log("");
  }
}

async function main() {
  const rows = await loadFailureRows();
  const candidates = rows
    .filter((item) => !item.resolved && Number(item.failure_count || 0) > FAILURE_THRESHOLD)
    .sort((a, b) => Number(b.failure_count || 0) - Number(a.failure_count || 0));

  const inspected = [];
  for (const item of candidates) {
    inspected.push(await inspectPackage(item));
  }

  const report = {
    generatedAt: new Date().toISOString(),
    siteHost: SITE_HOST,
    threshold: FAILURE_THRESHOLD,
    markResolved: MARK_RESOLVED,
    candidates: inspected,
    fixed: inspected.filter((item) => item.canDownload),
    needsWork: inspected.filter((item) => !item.canDownload),
    skippedVpnLike: inspected.filter((item) => item.vpnLike),
  };

  if (JSON_OUTPUT) console.log(JSON.stringify(report, null, 2));
  else printReport(report);

  if (report.needsWork.length > 0) process.exitCode = 2;
}

main().catch((error) => {
  console.error(`[repair] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
