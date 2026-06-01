import {
  getDownloadFailureApps,
  initDatabase,
  updateDownloadFailureMetadata,
  updateDownloadFailureResolved,
} from "@/lib/db";
import {
  MIRROR_UNAVAILABLE_ADMIN_ERROR,
  PAID_APP_UNSUPPORTED_ADMIN_ERROR,
} from "@/lib/download-errors";
import { getUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import { getUnsupportedPaidApp } from "@/lib/unsupported-paid-apps";

export type DownloadRepairReport = {
  blockedResolved: number;
  downloadRechecked: number;
  downloadMarkedResolved: number;
  stillUnresolved: number;
  errors: string[];
};

function siteOrigin(): string {
  const host =
    process.env.REPAIR_SITE_HOST ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.gptoapk.com";
  return host.replace(/\/$/, "");
}

async function prepareDownload(appId: string): Promise<{ ok: boolean; success: boolean }> {
  const origin = siteOrigin();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    const res = await fetch(`${origin}/api/download-apk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appId }),
      signal: controller.signal,
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    return { ok: res.ok, success: Boolean(data.success) };
  } catch {
    return { ok: false, success: false };
  } finally {
    clearTimeout(timer);
  }
}

export async function autoResolveBlockedDownloadFailures(): Promise<number> {
  await initDatabase();

  let page = 0;
  const pageSize = 200;
  let resolved = 0;

  while (true) {
    const { rows } = await getDownloadFailureApps(pageSize, page * pageSize);
    const unresolved = rows.filter((row) => !row.resolved);
    if (!unresolved.length) break;

    for (const item of unresolved) {
      const paid = getUnsupportedPaidApp(item.app_id);
      const noMirror = getUnsupportedNoMirrorApp(item.app_id);
      if (!paid && !noMirror) continue;

      const error = paid ? PAID_APP_UNSUPPORTED_ADMIN_ERROR : MIRROR_UNAVAILABLE_ADMIN_ERROR;
      const source = paid ? "paid-app" : "no-mirror";
      await updateDownloadFailureMetadata({ appId: item.app_id, lastError: error, lastSource: source });
      const ok = await updateDownloadFailureResolved(item.app_id, true);
      if (ok) resolved += 1;
    }

    if (rows.length < pageSize) break;
    page += 1;
  }

  return resolved;
}

export async function runAdminDownloadFailureRepair(options?: {
  failureThreshold?: number;
  maxApps?: number;
}): Promise<DownloadRepairReport> {
  const failureThreshold = options?.failureThreshold ?? 2;
  const maxApps = Math.min(Math.max(options?.maxApps ?? 80, 1), 200);
  const errors: string[] = [];

  await initDatabase();
  const blockedResolved = await autoResolveBlockedDownloadFailures();

  const candidates: Array<{ app_id: string; failure_count: number }> = [];
  let page = 0;
  const pageSize = 100;

  while (candidates.length < maxApps) {
    const { rows } = await getDownloadFailureApps(pageSize, page * pageSize);
    for (const row of rows) {
      if (row.resolved) continue;
      if (Number(row.failure_count) <= failureThreshold) continue;
      candidates.push({ app_id: row.app_id, failure_count: row.failure_count });
      if (candidates.length >= maxApps) break;
    }
    if (rows.length < pageSize) break;
    page += 1;
  }

  let downloadMarkedResolved = 0;
  for (const item of candidates) {
    const result = await prepareDownload(item.app_id);
    if (result.success) {
      const ok = await updateDownloadFailureResolved(item.app_id, true);
      if (ok) downloadMarkedResolved += 1;
      else errors.push(`mark resolved failed: ${item.app_id}`);
    }
  }

  const { unresolved: stillUnresolved } = await getDownloadFailureApps(1, 0);

  return {
    blockedResolved,
    downloadRechecked: candidates.length,
    downloadMarkedResolved,
    stillUnresolved,
    errors,
  };
}
