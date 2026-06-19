import {
  getDownloadFailureApps,
  getManualDownloadSource,
  initDatabase,
  updateDownloadFailureMetadata,
  updateDownloadFailureResolved,
} from "@/lib/db";
import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";
import {
  MIRROR_UNAVAILABLE_ADMIN_ERROR,
  PAID_APP_UNSUPPORTED_ADMIN_ERROR,
} from "@/lib/download-errors";
import { sanitizeAppId } from "@/lib/sanitize-app-id";
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

const ANDROID_PACKAGE_ID_RE = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

function isPlausibleAndroidPackageId(appId: string): boolean {
  return ANDROID_PACKAGE_ID_RE.test(appId.trim());
}

/** Resolve download failures logged with filenames or other non-package ids. */
export async function autoResolveInvalidDownloadAppIds(): Promise<number> {
  await initDatabase();

  let page = 0;
  const pageSize = 200;
  let resolved = 0;

  while (true) {
    const { rows } = await getDownloadFailureApps(pageSize, page * pageSize);
    const unresolved = rows.filter((row) => !row.resolved);
    if (!unresolved.length) break;

    for (const item of unresolved) {
      const appId = sanitizeAppId(item.app_id);
      if (isPlausibleAndroidPackageId(appId)) continue;

      const ok = await updateDownloadFailureResolved(item.app_id.trim(), true);
      if (!ok && item.app_id.trim() !== appId) {
        await updateDownloadFailureResolved(appId, true);
      }
      resolved += 1;
    }

    if (rows.length < pageSize) break;
    page += 1;
  }

  return resolved;
}

async function prepareDownload(appId: string): Promise<{ ok: boolean; success: boolean }> {
  const origin = siteOrigin();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 90_000);
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
      const appId = sanitizeAppId(item.app_id);
      const paid = getUnsupportedPaidApp(appId);
      const noMirror = getUnsupportedNoMirrorApp(appId);
      if (!paid && !noMirror) continue;

      const error = paid ? PAID_APP_UNSUPPORTED_ADMIN_ERROR : MIRROR_UNAVAILABLE_ADMIN_ERROR;
      const source = paid ? "paid-app" : "no-mirror";
      await updateDownloadFailureMetadata({ appId, lastError: error, lastSource: source });
      const ok = await updateDownloadFailureResolved(appId, true);
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
  const failureThreshold = options?.failureThreshold ?? 0;
  const maxApps = Math.min(Math.max(options?.maxApps ?? 150, 1), 200);
  const errors: string[] = [];

  await initDatabase();
  const invalidResolved = await autoResolveInvalidDownloadAppIds();
  const blockedResolved = await autoResolveBlockedDownloadFailures();

  const markResolved = async (rawAppId: string, resolvedAppId?: string) => {
    const cleanId = sanitizeAppId(resolvedAppId ?? rawAppId);
    let ok = await updateDownloadFailureResolved(cleanId, true);
    if (!ok && cleanId !== rawAppId.trim()) {
      ok = await updateDownloadFailureResolved(rawAppId.trim(), true);
    }
    return ok;
  };

  const candidates: Array<{ raw_app_id: string; app_id: string; failure_count: number }> = [];
  let page = 0;
  const pageSize = 100;
  let downloadMarkedResolved = 0;

  while (candidates.length < maxApps) {
    const { rows } = await getDownloadFailureApps(pageSize, page * pageSize);
    for (const row of rows) {
      if (row.resolved) continue;
      if (Number(row.failure_count) <= failureThreshold) continue;
      const appId = sanitizeAppId(row.app_id);
      if (!appId || getUnsupportedPaidApp(appId) || getUnsupportedNoMirrorApp(appId)) continue;

      const manual = await getManualDownloadSource(appId);
      if (manual?.active && isAllowedDownloadUrl(manual.download_url)) {
        if (await markResolved(row.app_id, appId)) downloadMarkedResolved += 1;
        continue;
      }

      candidates.push({ raw_app_id: row.app_id, app_id: appId, failure_count: row.failure_count });
      if (candidates.length >= maxApps) break;
    }
    if (rows.length < pageSize) break;
    page += 1;
  }

  for (const item of candidates) {
    const result = await prepareDownload(item.app_id);
    if (result.success) {
      const ok = await markResolved(item.raw_app_id, item.app_id);
      if (ok) downloadMarkedResolved += 1;
      else errors.push(`mark resolved failed: ${item.app_id}`);
    }
  }

  const { unresolved: stillUnresolved } = await getDownloadFailureApps(1, 0);

  return {
    blockedResolved: blockedResolved + invalidResolved,
    downloadRechecked: candidates.length,
    downloadMarkedResolved,
    stillUnresolved,
    errors,
  };
}
