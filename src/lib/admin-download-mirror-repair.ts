import {
  getDownloadFailureApps,
  getManualDownloadSource,
  initDatabase,
  updateDownloadFailureResolved,
  upsertManualDownloadSource,
  deleteManualDownloadSource,
} from "@/lib/db";
import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";
import { getUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import { getUnsupportedPaidApp } from "@/lib/unsupported-paid-apps";
import { autoResolveBlockedDownloadFailures } from "@/lib/admin-download-repair";

const SOURCE_TIMEOUT_MS = 30_000;
const USER_AGENT = "gptoapk-mirror-repair/1.0";

export type MirrorRepairReport = {
  probed: number;
  mirrorsFound: number;
  downloadMarkedResolved: number;
  stillUnresolved: number;
};

function isPublicHttpsUrl(value: string): boolean {
  return isAllowedDownloadUrl(value);
}

function siteOrigin(): string {
  const host =
    process.env.REPAIR_SITE_HOST ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.gptoapk.com";
  return host.replace(/\/$/, "");
}

async function probeAptoide(appId: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://ws75.aptoide.com/api/7/app/getMeta?package_name=${encodeURIComponent(appId)}`,
      { headers: { "User-Agent": USER_AGENT }, signal: controller.signal, cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: { file?: { path?: string; path_alt?: string } } };
    const url = json?.data?.file?.path || json?.data?.file?.path_alt || "";
    return isPublicHttpsUrl(url) ? url : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function probeApkPure(appId: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://d.apkpure.net/b/APK/${encodeURIComponent(appId)}?version=latest`,
      { method: "GET", redirect: "manual", headers: { "User-Agent": USER_AGENT }, signal: controller.signal },
    );
    const location = res.headers.get("location") || "";
    return isPublicHttpsUrl(location) ? location : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function probeOnlineApkDownloader(appId: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://online-apk-downloader.com/apk-ajax&packageDownload&id=${encodeURIComponent(appId)}`,
      {
        headers: {
          Accept: "application/json,text/plain;q=0.8,*/*;q=0.7",
          Referer: "https://online-apk-downloader.com/",
          "User-Agent": USER_AGENT,
        },
        signal: controller.signal,
      },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { success?: boolean; downloadUrl?: string };
    const url = json.downloadUrl?.replace(/\\\//g, "/") || "";
    return json.success && isPublicHttpsUrl(url) ? url : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function findMirrorDownloadUrl(appId: string): Promise<{ url: string; source: string } | null> {
  const aptoide = await probeAptoide(appId);
  if (aptoide) return { url: aptoide, source: "aptoide" };

  const apkpure = await probeApkPure(appId);
  if (apkpure) return { url: apkpure, source: "apkpure" };

  const online = await probeOnlineApkDownloader(appId);
  if (online) return { url: online, source: "online-apk-downloader" };

  return null;
}

async function prepareDownload(appId: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    const res = await fetch(`${siteOrigin()}/api/download-apk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appId }),
      signal: controller.signal,
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && Boolean(data.success);
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function runDownloadMirrorRepair(options?: {
  maxApps?: number;
}): Promise<MirrorRepairReport> {
  const maxApps = Math.min(Math.max(options?.maxApps ?? 80, 1), 150);
  await initDatabase();
  await autoResolveBlockedDownloadFailures();

  const candidates: Array<{ app_id: string; app_title: string }> = [];
  let page = 0;
  const pageSize = 100;

  while (candidates.length < maxApps) {
    const { rows } = await getDownloadFailureApps(pageSize, page * pageSize);
    for (const row of rows) {
      if (row.resolved) continue;
      if (getUnsupportedPaidApp(row.app_id) || getUnsupportedNoMirrorApp(row.app_id)) continue;
      candidates.push({ app_id: row.app_id, app_title: row.app_title });
      if (candidates.length >= maxApps) break;
    }
    if (rows.length < pageSize) break;
    page += 1;
  }

  let mirrorsFound = 0;
  let downloadMarkedResolved = 0;

  for (const item of candidates) {
    const existingManual = await getManualDownloadSource(item.app_id);
    if (existingManual && !isAllowedDownloadUrl(existingManual.download_url)) {
      await deleteManualDownloadSource(item.app_id);
    }

    if (await prepareDownload(item.app_id)) {
      const ok = await updateDownloadFailureResolved(item.app_id, true);
      if (ok) downloadMarkedResolved += 1;
      continue;
    }

    const mirror = await findMirrorDownloadUrl(item.app_id);
    if (!mirror) continue;

    mirrorsFound += 1;
    await upsertManualDownloadSource({
      appId: item.app_id,
      appTitle: item.app_title,
      downloadUrl: mirror.url,
      fileName: `${item.app_id}.apk`,
      sourceLabel: mirror.source,
      active: true,
    });

    if (await prepareDownload(item.app_id)) {
      const ok = await updateDownloadFailureResolved(item.app_id, true);
      if (ok) downloadMarkedResolved += 1;
    }
  }

  const { unresolved: stillUnresolved } = await getDownloadFailureApps(1, 0);

  return {
    probed: candidates.length,
    mirrorsFound,
    downloadMarkedResolved,
    stillUnresolved,
  };
}
