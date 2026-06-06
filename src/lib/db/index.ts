import { createPool } from "@vercel/postgres";
import type { QueryResultRow } from "@vercel/postgres";
import {
  canResolveSearchQueryNow,
  canResolveSearchQueryNowAsync,
  probeLiveSearchHasResults,
} from "@/lib/search-failure-reconcile";
import { normalizeUserSearchQuery } from "@/lib/normalize-user-search-query";
import { getAliasLookupKeys, stripSearchQueryNoise, applySearchTypoCorrection } from "@/lib/search-query-normalize";
import { normalizeSearchQuery } from "@/lib/search-failure-key";
import { extractPlayStorePackageId } from "@/lib/search-query-normalize";

type Primitive = string | number | boolean | undefined | null;

// Types
export interface VisitorRow {
  id: number;
  visitor_id: string;
  first_visit: string;
  last_visit: string;
  visit_count: number;
  ip_country: string;
  ip_city: string;
  ip_region: string;
  user_agent: string;
  device_brand: string;
  device_model: string;
  device_os: string;
  device_browser: string;
  is_mobile: boolean;
}

export interface SearchLogRow {
  id: number;
  visitor_id: string;
  query: string;
  query_type: string;
  app_id: string;
  app_title: string;
  timestamp: string;
  ip_hash: string;
}

export interface DownloadLogRow {
  id: number;
  visitor_id: string;
  app_id: string;
  app_title: string;
  source: string;
  download_url: string;
  version: string;
  file_size: string;
  timestamp: string;
  ip_hash: string;
}

export interface DownloadFailureApp {
  app_id: string;
  app_title: string;
  failure_count: number;
  first_failed_at: string;
  last_failed_at: string;
  last_error: string;
  last_source: string;
  resolved: boolean;
  resolved_at: string | null;
  updated_at: string;
  manual_download_url: string;
  manual_file_name: string;
  manual_source_label: string;
  manual_source_active: boolean;
}

export interface ManualDownloadSource {
  app_id: string;
  app_title: string;
  download_url: string;
  file_name: string;
  source_label: string;
  active: boolean;
  updated_at: string;
}

export interface SearchFailureQuery {
  query_key: string;
  query: string;
  normalized_query: string;
  query_type: string;
  failure_kind: string;
  last_lang: string;
  last_country: string;
  failure_count: number;
  last_error: string;
  first_failed_at: string;
  last_failed_at: string;
  resolved: boolean;
  resolved_at: string | null;
  updated_at: string;
}

export interface MissingAppFeedback {
  id: number;
  query: string;
  normalized_query: string;
  query_type: string;
  error_message: string;
  locale: string;
  country: string;
  page_path: string;
  visitor_id: string;
  ip_country: string;
  is_mobile: boolean;
  status: "pending" | "done";
  created_at: string;
  handled_at: string | null;
}

export interface MissingAppFeedbackParams {
  query: string;
  queryType?: string;
  errorMessage?: string;
  locale?: string;
  country?: string;
  pagePath?: string;
  visitorId?: string;
}

export interface SearchFailureLogParams {
  query: string;
  queryType: string;
  failureKind: string;
  queryKey: string;
  normalizedQuery: string;
  lastError?: string;
  lang?: string;
  country?: string;
}

export interface SearchLogParams {
  visitorId: string;
  query: string;
  queryType: string;
  appId: string;
  appTitle: string;
  ipHash?: string;
}

export interface DownloadLogParams {
  visitorId: string;
  appId: string;
  appTitle: string;
  source: string;
  downloadUrl: string;
  version: string;
  fileSize: string;
  success: boolean;
  error?: string;
  ipHash?: string;
}

export interface SearchStat {
  app_id: string;
  app_title: string;
  count: number;
}

export interface DownloadStat {
  app_id: string;
  app_title: string;
  count: number;
}

export interface ActivityItem {
  type: "search" | "download";
  visitor_id: string;
  app_id: string;
  app_title: string;
  query?: string;
  file_size?: string;
  version?: string;
  success?: boolean;
  timestamp: string;
  ip_country: string;
  ip_city: string;
  device_brand: string;
  device_os: string;
  device_browser: string;
  is_mobile: boolean;
}

export interface VisitorDeviceBreakdown {
  total: number;
  mobile: number;
  desktop: number;
  mobile_pct: number;
  desktop_pct: number;
}

export interface DailyVisitorDeviceStat extends VisitorDeviceBreakdown {
  date: string;
}

export interface VisitorInfo {
  visitor_id: string;
  first_visit: string;
  last_visit: string;
  visit_count: number;
  search_count: number;
  download_count: number;
  ip_country: string;
  ip_city: string;
  ip_region: string;
  user_agent: string;
  device_brand: string;
  device_model: string;
  device_os: string;
  device_browser: string;
  is_mobile: boolean;
}

export interface VisitorDetailLog {
  id: number;
  type: "search" | "download";
  app_id: string;
  app_title: string;
  query?: string;
  query_type?: string;
  file_size: string;
  version: string;
  success: boolean;
  timestamp: string;
}

function getAdminApiKey(): string {
  return process.env.ADMIN_API_KEY || "gptoapk-admin-key-2026";
}
export { getAdminApiKey };

let pool: ReturnType<typeof createPool> | null = null;
let initialized = false;
const DOWNLOAD_LOG_DEDUPE_SECONDS = Number(process.env.DOWNLOAD_LOG_DEDUPE_SECONDS ?? 120);

function getPool() {
  if (!pool) {
    pool = createPool();
  }
  return pool;
}

async function sql<T extends QueryResultRow = QueryResultRow>(
  strings: TemplateStringsArray,
  ...values: Primitive[]
) {
  const p = getPool();
  const client = await p.connect();
  try {
    return await client.sql<T>(strings, ...values);
  } finally {
    client.release();
  }
}

/** 执行原始 SQL 参数化查询（用于动态条件拼接） */
async function sqlRaw<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: Primitive[] = []
): Promise<T[]> {
  const p = getPool();
  const client = await p.connect();
  try {
    const result = await client.query<T>(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function initDatabase(): Promise<void> {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS visitors (
      id SERIAL PRIMARY KEY,
      visitor_id TEXT UNIQUE NOT NULL,
      first_visit TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_visit TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      visit_count INTEGER DEFAULT 1,
      ip_country TEXT DEFAULT '',
      ip_city TEXT DEFAULT '',
      ip_region TEXT DEFAULT '',
      user_agent TEXT DEFAULT '',
      device_brand TEXT DEFAULT '',
      device_model TEXT DEFAULT '',
      device_os TEXT DEFAULT '',
      device_browser TEXT DEFAULT '',
      is_mobile BOOLEAN DEFAULT FALSE
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS search_logs (
      id SERIAL PRIMARY KEY,
      visitor_id TEXT NOT NULL,
      query TEXT NOT NULL,
      query_type TEXT DEFAULT '',
      app_id TEXT DEFAULT '',
      app_title TEXT DEFAULT '',
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ip_hash TEXT DEFAULT ''
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS download_logs (
      id SERIAL PRIMARY KEY,
      visitor_id TEXT NOT NULL,
      app_id TEXT DEFAULT '',
      app_title TEXT DEFAULT '',
      source TEXT DEFAULT '',
      download_url TEXT DEFAULT '',
      version TEXT DEFAULT '',
      file_size TEXT DEFAULT '',
      download_success BOOLEAN DEFAULT TRUE,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ip_hash TEXT DEFAULT ''
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS download_failure_apps (
      app_id TEXT PRIMARY KEY,
      app_title TEXT DEFAULT '',
      failure_count INTEGER NOT NULL DEFAULT 0,
      first_failed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_failed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_error TEXT DEFAULT '',
      last_source TEXT DEFAULT '',
      resolved BOOLEAN NOT NULL DEFAULT FALSE,
      resolved_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS manual_download_sources (
      app_id TEXT PRIMARY KEY,
      app_title TEXT DEFAULT '',
      download_url TEXT NOT NULL,
      file_name TEXT DEFAULT '',
      source_label TEXT DEFAULT 'manual',
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS search_failure_queries (
      query_key TEXT PRIMARY KEY,
      query TEXT NOT NULL DEFAULT '',
      normalized_query TEXT NOT NULL DEFAULT '',
      query_type TEXT DEFAULT '',
      failure_kind TEXT NOT NULL DEFAULT 'no_results',
      last_lang TEXT DEFAULT '',
      last_country TEXT DEFAULT '',
      failure_count INTEGER NOT NULL DEFAULT 0,
      last_error TEXT DEFAULT '',
      first_failed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_failed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      resolved BOOLEAN NOT NULL DEFAULT FALSE,
      resolved_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS search_alias_overrides (
      alias_key TEXT PRIMARY KEY,
      app_ids TEXT NOT NULL,
      source_query TEXT DEFAULT '',
      source_label TEXT DEFAULT 'auto-repair',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS missing_app_feedback (
      id BIGSERIAL PRIMARY KEY,
      query TEXT NOT NULL,
      normalized_query TEXT NOT NULL DEFAULT '',
      query_type TEXT DEFAULT 'keyword',
      error_message TEXT DEFAULT '',
      locale TEXT DEFAULT '',
      country TEXT DEFAULT '',
      page_path TEXT DEFAULT '',
      visitor_id TEXT DEFAULT '',
      ip_country TEXT DEFAULT '',
      is_mobile BOOLEAN DEFAULT FALSE,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      handled_at TIMESTAMPTZ
    )
  `;

  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_visitor ON search_logs(visitor_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_app ON search_logs(app_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_timestamp ON search_logs(timestamp)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_visitor ON download_logs(visitor_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_app ON download_logs(app_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_timestamp ON download_logs(timestamp)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_failure_resolved ON download_failure_apps(resolved, last_failed_at DESC)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_manual_download_active ON manual_download_sources(active, updated_at DESC)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_failure_resolved ON search_failure_queries(resolved, last_failed_at DESC)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_failure_normalized ON search_failure_queries(normalized_query, query_type)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_missing_app_feedback_status ON missing_app_feedback(status, created_at DESC)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_alias_overrides_updated ON search_alias_overrides(updated_at DESC)`; } catch {}

  // 迁移: 旧表没有的列
  const migrationQueries = [
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS ip_country TEXT DEFAULT ''",
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS ip_city TEXT DEFAULT ''",
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS ip_region TEXT DEFAULT ''",
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS user_agent TEXT DEFAULT ''",
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS device_brand TEXT DEFAULT ''",
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS device_model TEXT DEFAULT ''",
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS device_os TEXT DEFAULT ''",
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS device_browser TEXT DEFAULT ''",
    "ALTER TABLE visitors ADD COLUMN IF NOT EXISTS is_mobile BOOLEAN DEFAULT FALSE",
    "ALTER TABLE download_logs ADD COLUMN IF NOT EXISTS download_success BOOLEAN DEFAULT TRUE",
    "ALTER TABLE manual_download_sources ADD COLUMN IF NOT EXISTS app_title TEXT DEFAULT ''",
    "ALTER TABLE manual_download_sources ADD COLUMN IF NOT EXISTS file_name TEXT DEFAULT ''",
    "ALTER TABLE manual_download_sources ADD COLUMN IF NOT EXISTS source_label TEXT DEFAULT 'manual'",
    "ALTER TABLE manual_download_sources ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE",
    "ALTER TABLE manual_download_sources ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()",
    "ALTER TABLE manual_download_sources ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()",
  ];
  for (const q of migrationQueries) {
    try { await sqlRaw(q); } catch {}
  }

  try {
    await sqlRaw(`
      INSERT INTO download_failure_apps (
        app_id,
        app_title,
        failure_count,
        first_failed_at,
        last_failed_at,
        last_error,
        last_source,
        resolved,
        updated_at
      )
      SELECT
        app_id,
        COALESCE((array_agg(app_title ORDER BY timestamp DESC) FILTER (WHERE app_title != ''))[1], app_id) as app_title,
        COUNT(*)::int as failure_count,
        MIN(timestamp) as first_failed_at,
        MAX(timestamp) as last_failed_at,
        '' as last_error,
        COALESCE((array_agg(source ORDER BY timestamp DESC) FILTER (WHERE source != ''))[1], '') as last_source,
        FALSE as resolved,
        NOW() as updated_at
      FROM download_logs
      WHERE COALESCE(download_success, FALSE) = FALSE
        AND app_id != ''
      GROUP BY app_id
      ON CONFLICT (app_id) DO UPDATE SET
        app_title = COALESCE(NULLIF(EXCLUDED.app_title, ''), download_failure_apps.app_title),
        failure_count = GREATEST(download_failure_apps.failure_count, EXCLUDED.failure_count),
        first_failed_at = LEAST(download_failure_apps.first_failed_at, EXCLUDED.first_failed_at),
        last_failed_at = GREATEST(download_failure_apps.last_failed_at, EXCLUDED.last_failed_at),
        last_source = COALESCE(NULLIF(EXCLUDED.last_source, ''), download_failure_apps.last_source),
        updated_at = NOW()
    `);
  } catch {}

  initialized = true;
}

// 解析 User-Agent
function parseUA(ua: string) {
  const result = {
    brand: "",
    model: "",
    os: "",
    browser: "",
    isMobile: false,
  };

  const lower = ua.toLowerCase();

  // 设备品牌
  if (lower.includes("iphone")) result.brand = "Apple";
  else if (lower.includes("ipad")) result.brand = "Apple";
  else if (lower.includes("samsung") || lower.includes("sm-")) result.brand = "Samsung";
  else if (lower.includes("xiaomi") || lower.includes("mi ") || lower.includes("redmi")) result.brand = "Xiaomi";
  else if (lower.includes("huawei") || lower.includes("honor")) result.brand = "Huawei";
  else if (lower.includes("oppo")) result.brand = "OPPO";
  else if (lower.includes("vivo")) result.brand = "vivo";
  else if (lower.includes("oneplus")) result.brand = "OnePlus";
  else if (lower.includes("google") || lower.includes("pixel")) result.brand = "Google";
  else if (lower.includes("macintosh") || lower.includes("mac os")) result.brand = "Apple";
  else if (lower.includes("windows")) result.brand = "Microsoft";

  // 操作系统
  if (lower.includes("iphone") || lower.includes("ipad")) result.os = "iOS";
  else if (lower.includes("android")) result.os = "Android";
  else if (lower.includes("mac os") || lower.includes("macintosh")) result.os = "macOS";
  else if (lower.includes("windows")) result.os = "Windows";
  else if (lower.includes("linux")) result.os = "Linux";
  else if (lower.includes("crkey") || lower.includes("chromecast")) result.os = "ChromeOS";

  // 浏览器
  if (lower.includes("chrome") && !lower.includes("edg") && !lower.includes("opr")) result.browser = "Chrome";
  else if (lower.includes("safari") && !lower.includes("chrome")) result.browser = "Safari";
  else if (lower.includes("firefox")) result.browser = "Firefox";
  else if (lower.includes("edg")) result.browser = "Edge";
  else if (lower.includes("opr") || lower.includes("opera")) result.browser = "Opera";
  else if (lower.includes("micromessenger") || lower.includes("wechat")) result.browser = "WeChat";

  // 是否移动端
  result.isMobile = lower.includes("mobile") || lower.includes("android") && !lower.includes("tablet");

  // 型号提取
  const modelMatch = ua.match(/\(([^)]+)\)/);
  if (modelMatch) {
    const part = modelMatch[1];
    if (result.brand === "Samsung") {
      const m = part.match(/SM-[A-Za-z0-9]+/);
      if (m) result.model = m[0];
    } else if (result.brand === "Apple") {
      const m = part.match(/(iPhone|iPad|MacBook|iMac|Mac)[^,;)]*/);
      if (m) result.model = m[0].trim();
    } else if (result.brand === "Xiaomi") {
      const m = part.match(/(Mi\s+\w+|Redmi\s+\w+|Xiaomi\s+\w+)/i);
      if (m) result.model = m[0];
    }
  }

  return result;
}

export async function registerVisitor(
  visitorId: string,
  deviceInfo?: {
    ip_country: string;
    ip_city: string;
    ip_region: string;
    user_agent: string;
  }
): Promise<{
  visitor_id: string;
  first_visit: string;
  visit_count: number;
}> {
  const existing = await sql<VisitorRow>`
    SELECT * FROM visitors WHERE visitor_id = ${visitorId}
  `;

  if (existing.rows.length > 0) {
    const uaInfo = parseUA(deviceInfo?.user_agent || "");
    await sql`
      UPDATE visitors SET
        last_visit = NOW(),
        visit_count = visit_count + 1,
        ip_country = COALESCE(NULLIF(${deviceInfo?.ip_country || ""}, ''), ip_country),
        ip_city = CASE WHEN ${deviceInfo?.ip_country || ""} = '' THEN ip_city ELSE ${deviceInfo?.ip_city || ""} END,
        ip_region = CASE WHEN ${deviceInfo?.ip_country || ""} = '' THEN ip_region ELSE ${deviceInfo?.ip_region || ""} END,
        user_agent = COALESCE(NULLIF(${deviceInfo?.user_agent || ""}, ''), user_agent),
        device_brand = COALESCE(NULLIF(${uaInfo.brand}, ''), device_brand),
        device_model = COALESCE(NULLIF(${uaInfo.model}, ''), device_model),
        device_os = COALESCE(NULLIF(${uaInfo.os}, ''), device_os),
        device_browser = COALESCE(NULLIF(${uaInfo.browser}, ''), device_browser),
        is_mobile = CASE WHEN ${deviceInfo?.user_agent || ""} = '' THEN is_mobile ELSE ${uaInfo.isMobile} END
      WHERE visitor_id = ${visitorId}
    `;
    const row = existing.rows[0];
    return {
      visitor_id: row.visitor_id,
      first_visit: row.first_visit,
      visit_count: row.visit_count + 1,
    };
  }

  const uaInfo = parseUA(deviceInfo?.user_agent || "");

  const result = await sql<{ visitor_id: string; first_visit: string; visit_count: number }>`
    INSERT INTO visitors (visitor_id, first_visit, last_visit, visit_count, 
      ip_country, ip_city, ip_region, user_agent,
      device_brand, device_model, device_os, device_browser, is_mobile)
    VALUES (${visitorId}, NOW(), NOW(), 1, 
      ${deviceInfo?.ip_country || ""}, ${deviceInfo?.ip_city || ""}, ${deviceInfo?.ip_region || ""}, ${deviceInfo?.user_agent || ""},
      ${uaInfo.brand}, ${uaInfo.model}, ${uaInfo.os}, ${uaInfo.browser}, ${uaInfo.isMobile})
    RETURNING visitor_id, first_visit, visit_count
  `;

  const row = result.rows[0];
  return {
    visitor_id: row.visitor_id,
    first_visit: row.first_visit,
    visit_count: row.visit_count,
  };
}

export async function logSearch(params: SearchLogParams): Promise<void> {
  await sql`
    INSERT INTO search_logs (visitor_id, query, query_type, app_id, app_title, timestamp, ip_hash)
    VALUES (${params.visitorId}, ${params.query}, ${params.queryType}, ${params.appId}, ${params.appTitle}, NOW(), ${params.ipHash || ""})
  `;
}

export async function logDownload(params: DownloadLogParams): Promise<boolean> {
  if (params.success && DOWNLOAD_LOG_DEDUPE_SECONDS > 0) {
    const duplicate = await sql<{ id: number }>`
      SELECT id FROM download_logs
      WHERE visitor_id = ${params.visitorId}
        AND app_id = ${params.appId}
        AND download_success = TRUE
        AND timestamp >= NOW() - (${DOWNLOAD_LOG_DEDUPE_SECONDS} * INTERVAL '1 second')
      LIMIT 1
    `;

    if (duplicate.rows.length > 0) return false;
  }

  await sql`
    INSERT INTO download_logs (visitor_id, app_id, app_title, source, download_url, version, file_size, download_success, timestamp, ip_hash)
    VALUES (${params.visitorId}, ${params.appId}, ${params.appTitle}, ${params.source}, ${params.downloadUrl}, ${params.version}, ${params.fileSize}, ${params.success}, NOW(), ${params.ipHash || ""})
  `;

  const errorText = params.error || "";
  const isExpectedBlockedFailure =
    errorText.includes("PAID_APP_UNSUPPORTED") ||
    errorText.includes("MIRROR_UNAVAILABLE") ||
    errorText.includes("付费应用") ||
    errorText.includes("public APK mirrors");

  if (params.success && params.appId) {
    await sql`
      UPDATE download_failure_apps
      SET resolved = TRUE,
          resolved_at = NOW(),
          updated_at = NOW()
      WHERE app_id = ${params.appId}
        AND resolved = FALSE
    `;
  } else if (params.appId && (isExpectedBlockedFailure || params.error || params.source)) {
    await sql`
      INSERT INTO download_failure_apps (
        app_id,
        app_title,
        failure_count,
        first_failed_at,
        last_failed_at,
        last_error,
        last_source,
        resolved,
        updated_at
      )
      VALUES (
        ${params.appId},
        ${params.appTitle || params.appId},
        1,
        NOW(),
        NOW(),
        ${params.error || ""},
        ${params.source || ""},
        ${isExpectedBlockedFailure},
        NOW()
      )
      ON CONFLICT (app_id) DO UPDATE SET
        app_title = COALESCE(NULLIF(EXCLUDED.app_title, ''), download_failure_apps.app_title),
        failure_count = CASE
          WHEN ${isExpectedBlockedFailure} THEN download_failure_apps.failure_count
          ELSE download_failure_apps.failure_count + 1
        END,
        last_failed_at = NOW(),
        last_error = EXCLUDED.last_error,
        last_source = COALESCE(NULLIF(EXCLUDED.last_source, ''), download_failure_apps.last_source),
        resolved = ${isExpectedBlockedFailure},
        resolved_at = CASE WHEN ${isExpectedBlockedFailure} THEN NOW() ELSE NULL END,
        updated_at = NOW()
    `;
  } else if (!params.success && params.appId) {
    await sql`
      INSERT INTO download_failure_apps (
        app_id,
        app_title,
        failure_count,
        first_failed_at,
        last_failed_at,
        last_error,
        last_source,
        resolved,
        updated_at
      )
      VALUES (
        ${params.appId},
        ${params.appTitle || params.appId},
        1,
        NOW(),
        NOW(),
        ${params.error || ""},
        ${params.source || ""},
        FALSE,
        NOW()
      )
      ON CONFLICT (app_id) DO UPDATE SET
        app_title = COALESCE(NULLIF(EXCLUDED.app_title, ''), download_failure_apps.app_title),
        failure_count = download_failure_apps.failure_count + 1,
        last_failed_at = NOW(),
        last_error = EXCLUDED.last_error,
        last_source = COALESCE(NULLIF(EXCLUDED.last_source, ''), download_failure_apps.last_source),
        resolved = FALSE,
        resolved_at = NULL,
        updated_at = NOW()
    `;
  }

  return true;
}

function dateRangeParams(startDate?: string, endDate?: string): [string, string] {
  return [
    startDate || "2000-01-01",
    endDate || "2099-12-31",
  ];
}

const REPORT_TIME_ZONE = "Asia/Shanghai";
const dateRangeSql = (column: string) =>
  `(${column} AT TIME ZONE '${REPORT_TIME_ZONE}')::date >= $1::date AND (${column} AT TIME ZONE '${REPORT_TIME_ZONE}')::date <= $2::date`;

function withDevicePercents(row: { total: number; mobile: number; desktop: number }): VisitorDeviceBreakdown {
  const total = row.total ?? 0;
  const mobile = row.mobile ?? 0;
  const desktop = row.desktop ?? 0;
  return {
    total,
    mobile,
    desktop,
    mobile_pct: total > 0 ? Math.round((mobile / total) * 1000) / 10 : 0,
    desktop_pct: total > 0 ? Math.round((desktop / total) * 1000) / 10 : 0,
  };
}

function shanghaiTodayDate(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: REPORT_TIME_ZONE });
}

function defaultDeviceStatsRange(startDate?: string, endDate?: string): [string, string] {
  if (startDate && endDate) return [startDate, endDate];
  if (startDate && !endDate) return [startDate, startDate];
  if (!startDate && endDate) return [endDate, endDate];
  const end = shanghaiTodayDate();
  const endMs = new Date(`${end}T12:00:00+08:00`).getTime();
  const start = new Date(endMs - 29 * 86400000).toLocaleDateString("en-CA", { timeZone: REPORT_TIME_ZONE });
  return [start, end];
}

const visitorActivityUnionSql = `
  SELECT s.visitor_id, s.timestamp AS activity_at
  FROM search_logs s
  UNION ALL
  SELECT d.visitor_id, d.timestamp AS activity_at
  FROM download_logs d
  UNION ALL
  SELECT v.visitor_id, v.first_visit AS activity_at
  FROM visitors v
  UNION ALL
  SELECT v.visitor_id, v.last_visit AS activity_at
  FROM visitors v
`;

export async function getVisitorDeviceBreakdown(
  startDate?: string,
  endDate?: string,
): Promise<VisitorDeviceBreakdown> {
  const [start, end] = defaultDeviceStatsRange(startDate, endDate);
  const rows = await sqlRaw<{ total: number; mobile: number; desktop: number }>(
    `WITH activity AS (
       SELECT DISTINCT
         u.visitor_id,
         COALESCE(v.is_mobile, false) AS is_mobile
       FROM (${visitorActivityUnionSql}) u
       INNER JOIN visitors v ON v.visitor_id = u.visitor_id
       WHERE (u.activity_at AT TIME ZONE '${REPORT_TIME_ZONE}')::date >= $1::date
         AND (u.activity_at AT TIME ZONE '${REPORT_TIME_ZONE}')::date <= $2::date
     )
     SELECT
       COUNT(DISTINCT visitor_id)::int AS total,
       COUNT(DISTINCT visitor_id) FILTER (WHERE is_mobile)::int AS mobile,
       COUNT(DISTINCT visitor_id) FILTER (WHERE NOT is_mobile)::int AS desktop
     FROM activity`,
    [start, end],
  );
  return withDevicePercents(rows[0] ?? { total: 0, mobile: 0, desktop: 0 });
}

export async function getDailyVisitorDeviceStats(
  startDate?: string,
  endDate?: string,
): Promise<DailyVisitorDeviceStat[]> {
  const [start, end] = defaultDeviceStatsRange(startDate, endDate);
  const rows = await sqlRaw<{ date: string; total: number; mobile: number; desktop: number }>(
    `WITH activity AS (
       SELECT DISTINCT
         (u.activity_at AT TIME ZONE '${REPORT_TIME_ZONE}')::date AS day,
         u.visitor_id,
         COALESCE(v.is_mobile, false) AS is_mobile
       FROM (${visitorActivityUnionSql}) u
       INNER JOIN visitors v ON v.visitor_id = u.visitor_id
       WHERE (u.activity_at AT TIME ZONE '${REPORT_TIME_ZONE}')::date >= $1::date
         AND (u.activity_at AT TIME ZONE '${REPORT_TIME_ZONE}')::date <= $2::date
     )
     SELECT
       day::text AS date,
       COUNT(DISTINCT visitor_id)::int AS total,
       COUNT(DISTINCT visitor_id) FILTER (WHERE is_mobile)::int AS mobile,
       COUNT(DISTINCT visitor_id) FILTER (WHERE NOT is_mobile)::int AS desktop
     FROM activity
     GROUP BY day
     ORDER BY day DESC`,
    [start, end],
  );

  return rows.map((row) => ({
    date: row.date,
    ...withDevicePercents(row),
  }));
}

export async function getVisitorStats(startDate?: string, endDate?: string): Promise<{ total: number }> {
  if (!startDate && !endDate) {
    const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM visitors`;
    return { total: result.rows[0]?.total ?? 0 };
  }

  const rows = await sqlRaw<{ total: number }>(
    `SELECT COUNT(*)::int as total
     FROM visitors v
     WHERE ${dateRangeSql("v.first_visit")}
        OR ${dateRangeSql("v.last_visit")}
        OR EXISTS (
          SELECT 1 FROM search_logs s
          WHERE s.visitor_id = v.visitor_id AND ${dateRangeSql("s.timestamp")}
        )
        OR EXISTS (
          SELECT 1 FROM download_logs d
          WHERE d.visitor_id = v.visitor_id AND ${dateRangeSql("d.timestamp")}
        )`,
    dateRangeParams(startDate, endDate)
  );
  return { total: rows[0]?.total ?? 0 };
}

export async function getAllVisitorStats(): Promise<{ total: number }> {
  const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM visitors`;
  return { total: result.rows[0]?.total ?? 0 };
}

export async function getTodayNewVisitors(): Promise<number> {
  const result = await sql<{ total: number }>`
    SELECT COUNT(*)::int as total
    FROM visitors
    WHERE (first_visit AT TIME ZONE 'Asia/Shanghai')::date = (NOW() AT TIME ZONE 'Asia/Shanghai')::date
  `;
  return result.rows[0]?.total ?? 0;
}

export async function getTotalSearches(startDate?: string, endDate?: string): Promise<number> {
  if (!startDate && !endDate) {
    const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM search_logs`;
    return result.rows[0]?.total ?? 0;
  }
  const rows = await sqlRaw<{ total: number }>(
    `SELECT COUNT(*)::int as total FROM search_logs WHERE ${dateRangeSql("timestamp")}`,
    dateRangeParams(startDate, endDate)
  );
  return rows[0]?.total ?? 0;
}

export async function getTotalDownloads(startDate?: string, endDate?: string): Promise<number> {
  if (!startDate && !endDate) {
    const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM download_logs`;
    return result.rows[0]?.total ?? 0;
  }
  const rows = await sqlRaw<{ total: number }>(
    `SELECT COUNT(*)::int as total FROM download_logs WHERE ${dateRangeSql("timestamp")}`,
    dateRangeParams(startDate, endDate)
  );
  return rows[0]?.total ?? 0;
}

export async function getTodayDownloads(): Promise<number> {
  const result = await sql<{ total: number }>`
    SELECT COUNT(*)::int as total
    FROM download_logs
    WHERE (timestamp AT TIME ZONE 'Asia/Shanghai')::date = (NOW() AT TIME ZONE 'Asia/Shanghai')::date
  `;
  return result.rows[0]?.total ?? 0;
}

export async function getSearchStats(
  limit = 20,
  offset = 0,
  startDate?: string,
  endDate?: string
): Promise<{ rows: SearchStat[]; total: number }> {
  const params: Primitive[] = [];
  let whereClause = "WHERE app_id != ''";
  if (startDate || endDate) {
    const [s, e] = dateRangeParams(startDate, endDate);
    whereClause += ` AND ${dateRangeSql("timestamp")}`;
    params.push(s, e);
  }
  params.push(limit, offset);

  const totalResult = await sqlRaw<{ total: number }>(
    `SELECT COUNT(DISTINCT app_id)::int as total FROM search_logs ${whereClause}`,
    params.slice(0, -2)
  );

  const rows = await sqlRaw<SearchStat>(
    `SELECT
       app_id,
       COALESCE((array_agg(app_title ORDER BY timestamp DESC) FILTER (WHERE app_title != ''))[1], app_id) as app_title,
       COUNT(*)::int as count
     FROM search_logs
     ${whereClause}
     GROUP BY app_id
     ORDER BY count DESC, app_title ASC, app_id ASC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );

  return { rows, total: totalResult[0]?.total ?? 0 };
}

export async function getDownloadStats(
  limit = 20,
  offset = 0,
  startDate?: string,
  endDate?: string
): Promise<{ rows: DownloadStat[]; total: number }> {
  const params: Primitive[] = [];
  let whereClause = "WHERE app_id != ''";
  if (startDate || endDate) {
    const [s, e] = dateRangeParams(startDate, endDate);
    whereClause += ` AND ${dateRangeSql("timestamp")}`;
    params.push(s, e);
  }
  params.push(limit, offset);

  const totalResult = await sqlRaw<{ total: number }>(
    `SELECT COUNT(DISTINCT app_id)::int as total FROM download_logs ${whereClause}`,
    params.slice(0, -2)
  );

  const rows = await sqlRaw<DownloadStat>(
    `SELECT app_id, app_title, COUNT(*)::int as count FROM download_logs
     ${whereClause}
     GROUP BY app_id, app_title ORDER BY count DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );

  return { rows, total: totalResult[0]?.total ?? 0 };
}

export async function getDownloadFailureApps(
  limit = 20,
  offset = 0
): Promise<{ rows: DownloadFailureApp[]; total: number; unresolved: number }> {
  const [totalResult, unresolvedResult, rows] = await Promise.all([
    sqlRaw<{ total: number }>(`SELECT COUNT(*)::int as total FROM download_failure_apps`),
    sqlRaw<{ total: number }>(`SELECT COUNT(*)::int as total FROM download_failure_apps WHERE resolved = FALSE`),
    sqlRaw<DownloadFailureApp>(
      `SELECT
         f.app_id,
         f.app_title,
         f.failure_count,
         f.first_failed_at::text,
         f.last_failed_at::text,
         COALESCE(f.last_error, '') as last_error,
         COALESCE(f.last_source, '') as last_source,
         f.resolved,
         f.resolved_at::text,
         f.updated_at::text,
         COALESCE(m.download_url, '') as manual_download_url,
         COALESCE(m.file_name, '') as manual_file_name,
         COALESCE(m.source_label, '') as manual_source_label,
         COALESCE(m.active, false) as manual_source_active
       FROM download_failure_apps f
       LEFT JOIN manual_download_sources m ON m.app_id = f.app_id
       WHERE f.resolved = FALSE
       ORDER BY f.last_failed_at DESC, f.failure_count DESC, f.app_id ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    ),
  ]);

  return {
    rows,
    total: totalResult[0]?.total ?? 0,
    unresolved: unresolvedResult[0]?.total ?? 0,
  };
}

export async function updateDownloadFailureResolved(appId: string, resolved: boolean): Promise<boolean> {
  const rows = await sqlRaw<{ app_id: string }>(
    `UPDATE download_failure_apps
     SET resolved = $2,
         resolved_at = CASE WHEN $2 THEN NOW() ELSE NULL END,
         updated_at = NOW()
     WHERE app_id = $1
     RETURNING app_id`,
    [appId, resolved]
  );
  return rows.length > 0;
}

export async function updateDownloadFailureMetadata(params: {
  appId: string;
  lastError?: string;
  lastSource?: string;
}): Promise<boolean> {
  const rows = await sqlRaw<{ app_id: string }>(
    `UPDATE download_failure_apps
     SET last_error = COALESCE(NULLIF($2, ''), last_error),
         last_source = COALESCE(NULLIF($3, ''), last_source),
         updated_at = NOW()
     WHERE app_id = $1
     RETURNING app_id`,
    [params.appId, params.lastError || "", params.lastSource || ""]
  );
  return rows.length > 0;
}

export async function logSearchFailure(params: SearchFailureLogParams): Promise<void> {
  const query = params.query.slice(0, 500);
  const lastError = (params.lastError || "").slice(0, 1000);

  await sql`
    INSERT INTO search_failure_queries (
      query_key,
      query,
      normalized_query,
      query_type,
      failure_kind,
      last_lang,
      last_country,
      failure_count,
      last_error,
      first_failed_at,
      last_failed_at,
      resolved,
      updated_at
    )
    VALUES (
      ${params.queryKey},
      ${query},
      ${params.normalizedQuery},
      ${params.queryType},
      ${params.failureKind},
      ${params.lang || ""},
      ${params.country || ""},
      1,
      ${lastError},
      NOW(),
      NOW(),
      FALSE,
      NOW()
    )
    ON CONFLICT (query_key) DO UPDATE SET
      query = EXCLUDED.query,
      normalized_query = EXCLUDED.normalized_query,
      query_type = EXCLUDED.query_type,
      failure_kind = EXCLUDED.failure_kind,
      last_lang = COALESCE(NULLIF(EXCLUDED.last_lang, ''), search_failure_queries.last_lang),
      last_country = COALESCE(NULLIF(EXCLUDED.last_country, ''), search_failure_queries.last_country),
      failure_count = search_failure_queries.failure_count + 1,
      last_error = EXCLUDED.last_error,
      last_failed_at = NOW(),
      resolved = FALSE,
      resolved_at = NULL,
      updated_at = NOW()
  `;
}

function normalizedQueriesForSearchIntent(query: string): string[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const out = new Set<string>();
  const add = (value: string) => {
    const key = normalizeSearchQuery(value);
    if (key) out.add(key);
  };

  add(trimmed);
  const pkg = extractPlayStorePackageId(trimmed);
  if (pkg) add(pkg);
  const canonical = normalizeUserSearchQuery(trimmed);
  if (canonical !== trimmed) add(canonical);

  for (const aliasKey of getAliasLookupKeys(trimmed)) add(aliasKey);
  for (const aliasKey of getAliasLookupKeys(canonical)) add(aliasKey);

  const strippedCanonical = stripSearchQueryNoise(canonical);
  if (strippedCanonical) add(strippedCanonical);
  const strippedRaw = stripSearchQueryNoise(trimmed);
  if (strippedRaw) add(strippedRaw);

  return [...out];
}

export async function resolveSearchFailuresForQuery(query: string, queryType?: string): Promise<number> {
  void queryType;
  const normalizedQueries = normalizedQueriesForSearchIntent(query);
  if (!normalizedQueries.length) return 0;

  let resolved = 0;
  for (const normalized of normalizedQueries) {
    const rows = await sqlRaw<{ query_key: string }>(
      `UPDATE search_failure_queries
       SET resolved = TRUE,
           resolved_at = NOW(),
           updated_at = NOW()
       WHERE resolved = FALSE
         AND normalized_query = $1
       RETURNING query_key`,
      [normalized],
    );
    resolved += rows.length;
  }
  return resolved;
}

export async function autoResolveDismissibleSearchFailures(): Promise<number> {
  const rows = await sqlRaw<{ query_key: string }>(
    `UPDATE search_failure_queries
     SET resolved = TRUE,
         resolved_at = NOW(),
         updated_at = NOW()
     WHERE resolved = FALSE
       AND (
         failure_kind = 'query_too_long'
         OR (failure_kind = 'invalid_url' AND query ILIKE 'file:%')
         OR (query ILIKE 'http://%' AND query NOT ILIKE '%play.google.com%')
         OR (query ILIKE 'https://%' AND query NOT ILIKE '%play.google.com%')
         OR (
           regexp_replace(query, '[\u200B-\u200D\u2060\uFEFF]', '', 'g') ILIKE 'http://%'
           AND regexp_replace(query, '[\u200B-\u200D\u2060\uFEFF]', '', 'g') NOT ILIKE '%play.google.com%'
         )
         OR (
           regexp_replace(query, '[\u200B-\u200D\u2060\uFEFF]', '', 'g') ILIKE 'https://%'
           AND regexp_replace(query, '[\u200B-\u200D\u2060\uFEFF]', '', 'g') NOT ILIKE '%play.google.com%'
         )
         OR query ILIKE '%uptodown.com%'
         OR query ILIKE '%apps.evozi.com%'
         OR query ILIKE '%apkshki%'
         OR query ILIKE '%play.google.com/store/apps/collection%'
         OR normalized_query LIKE '%破解%'
         OR normalized_query IN ('submit', 'ph', 'bum')
         OR char_length(trim(normalized_query)) <= 2
       )
     RETURNING query_key`,
  );
  return rows.length;
}

export async function reconcileResolvableSearchFailures(options?: {
  batchSize?: number;
  maxChecks?: number;
  liveProbeLimit?: number;
}): Promise<{ checked: number; resolved: number; dismissed: number; liveResolved: number }> {
  const batchSize = Math.min(Math.max(options?.batchSize ?? 500, 50), 1000);
  const maxChecks = Math.min(Math.max(options?.maxChecks ?? 5000, batchSize), 20000);
  const liveProbeLimit = Math.min(Math.max(options?.liveProbeLimit ?? 40, 0), 200);

  await initDatabase();
  const dismissed = await autoResolveDismissibleSearchFailures();

  let checked = 0;
  let resolved = 0;
  let liveResolved = 0;
  let liveProbes = 0;
  let offset = 0;

  while (checked < maxChecks) {
    const rows = await sqlRaw<{
      query_key: string;
      query: string;
      failure_kind: string;
      last_lang: string;
      last_country: string;
    }>(
      `SELECT query_key, query, failure_kind,
              COALESCE(last_lang, '') as last_lang,
              COALESCE(last_country, '') as last_country
       FROM search_failure_queries
       WHERE resolved = FALSE
       ORDER BY last_failed_at DESC
       LIMIT $1 OFFSET $2`,
      [batchSize, offset],
    );

    if (!rows.length) break;

    let resolvedInBatch = 0;
    for (const row of rows) {
      checked += 1;
      const sanitized = normalizeUserSearchQuery(row.query);
      const candidates = [row.query, sanitized, applySearchTypoCorrection(sanitized)];
      const unique = [...new Set(candidates.map((q) => q.trim()).filter(Boolean))];
      let didResolve = false;

      const lookupKeys = unique.flatMap((q) => getAliasLookupKeys(q));
      const overrideIds = lookupKeys.length ? await getSearchAliasOverrideAppIds(lookupKeys) : null;
      if (overrideIds?.length) {
        const count = await resolveSearchFailuresForQuery(row.query);
        if (count > 0) {
          resolved += count;
          resolvedInBatch += 1;
          didResolve = true;
        }
      }

      if (!didResolve) {
        for (const q of unique) {
          if (canResolveSearchQueryNow(q) || (await canResolveSearchQueryNowAsync(q))) {
            const count = await resolveSearchFailuresForQuery(row.query);
            if (count > 0) {
              resolved += count;
              resolvedInBatch += 1;
              didResolve = true;
            }
            break;
          }
        }
      }

      if (
        !didResolve &&
        liveProbes < liveProbeLimit &&
        (row.failure_kind === "no_results" || row.failure_kind === "search_error")
      ) {
        liveProbes += 1;
        const lang = row.last_lang || "en";
        const country = row.last_country || (lang.startsWith("zh") ? "cn" : "us");
        let liveOk = false;
        for (const q of unique) {
          if (await probeLiveSearchHasResults(q, { lang, country })) {
            liveOk = true;
            break;
          }
        }
        if (liveOk) {
          const count = await resolveSearchFailuresForQuery(row.query);
          if (count > 0) {
            resolved += count;
            liveResolved += count;
            resolvedInBatch += 1;
          }
        }
      }
    }

    if (resolvedInBatch > 0) {
      continue;
    }

    offset += rows.length;
    if (rows.length < batchSize) break;
  }

  return { checked, resolved, dismissed, liveResolved };
}

export async function getSearchFailureQueries(
  limit = 20,
  offset = 0,
): Promise<{ rows: SearchFailureQuery[]; total: number; unresolved: number }> {
  const [totalResult, unresolvedResult, rows] = await Promise.all([
    sqlRaw<{ total: number }>(`SELECT COUNT(*)::int as total FROM search_failure_queries`),
    sqlRaw<{ total: number }>(`SELECT COUNT(*)::int as total FROM search_failure_queries WHERE resolved = FALSE`),
    sqlRaw<SearchFailureQuery>(
      `SELECT
         query_key,
         query,
         normalized_query,
         query_type,
         failure_kind,
         COALESCE(last_lang, '') as last_lang,
         COALESCE(last_country, '') as last_country,
         failure_count,
         COALESCE(last_error, '') as last_error,
         first_failed_at::text,
         last_failed_at::text,
         resolved,
         resolved_at::text,
         updated_at::text
       FROM search_failure_queries
       ORDER BY resolved ASC, last_failed_at DESC, failure_count DESC, query_key ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    ),
  ]);

  return {
    rows,
    total: totalResult[0]?.total ?? 0,
    unresolved: unresolvedResult[0]?.total ?? 0,
  };
}

export async function updateSearchFailureResolved(queryKey: string, resolved: boolean): Promise<boolean> {
  const rows = await sqlRaw<{ query_key: string }>(
    `UPDATE search_failure_queries
     SET resolved = $2,
         resolved_at = CASE WHEN $2 THEN NOW() ELSE NULL END,
         updated_at = NOW()
     WHERE query_key = $1
     RETURNING query_key`,
    [queryKey, resolved],
  );
  return rows.length > 0;
}

export async function logMissingAppFeedback(params: MissingAppFeedbackParams): Promise<number> {
  const query = params.query.trim().slice(0, 500);
  if (!query) return 0;

  const normalized = query.toLowerCase().replace(/\s+/g, " ");
  const visitorId = params.visitorId?.trim() || "unknown";

  let ipCountry = "";
  let isMobile = false;
  if (visitorId && visitorId !== "unknown") {
    const visitorRows = await sqlRaw<{ ip_country: string; is_mobile: boolean }>(
      `SELECT COALESCE(ip_country, '') as ip_country, COALESCE(is_mobile, false) as is_mobile
       FROM visitors WHERE visitor_id = $1 LIMIT 1`,
      [visitorId],
    );
    if (visitorRows[0]) {
      ipCountry = visitorRows[0].ip_country;
      isMobile = visitorRows[0].is_mobile;
    }
  }

  const rows = await sqlRaw<{ id: number }>(
    `INSERT INTO missing_app_feedback (
       query, normalized_query, query_type, error_message, locale, country,
       page_path, visitor_id, ip_country, is_mobile, status
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
     RETURNING id`,
    [
      query,
      normalized,
      (params.queryType || "keyword").slice(0, 40),
      (params.errorMessage || "").slice(0, 500),
      (params.locale || "").slice(0, 16),
      (params.country || "").slice(0, 8),
      (params.pagePath || "").slice(0, 300),
      visitorId.slice(0, 80),
      ipCountry.slice(0, 8),
      isMobile,
    ],
  );

  return rows[0]?.id ?? 0;
}

export async function getPendingMissingAppFeedbacks(
  limit = 20,
  offset = 0,
): Promise<{ rows: MissingAppFeedback[]; total: number }> {
  const [totalResult, rows] = await Promise.all([
    sqlRaw<{ total: number }>(
      `SELECT COUNT(*)::int as total FROM missing_app_feedback WHERE status = 'pending'`,
    ),
    sqlRaw<MissingAppFeedback>(
      `SELECT
         id,
         query,
         normalized_query,
         query_type,
         COALESCE(error_message, '') as error_message,
         COALESCE(locale, '') as locale,
         COALESCE(country, '') as country,
         COALESCE(page_path, '') as page_path,
         COALESCE(visitor_id, '') as visitor_id,
         COALESCE(ip_country, '') as ip_country,
         COALESCE(is_mobile, false) as is_mobile,
         status,
         created_at::text,
         handled_at::text
       FROM missing_app_feedback
       WHERE status = 'pending'
       ORDER BY created_at DESC, id DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    ),
  ]);

  return {
    rows,
    total: totalResult[0]?.total ?? 0,
  };
}

export async function getMissingAppFeedbacks(
  limit = 20,
  offset = 0,
): Promise<{ rows: MissingAppFeedback[]; total: number; pending: number }> {
  const [totalResult, pendingResult, rows] = await Promise.all([
    sqlRaw<{ total: number }>(`SELECT COUNT(*)::int as total FROM missing_app_feedback`),
    sqlRaw<{ total: number }>(
      `SELECT COUNT(*)::int as total FROM missing_app_feedback WHERE status = 'pending'`,
    ),
    sqlRaw<MissingAppFeedback>(
      `SELECT
         id,
         query,
         normalized_query,
         query_type,
         COALESCE(error_message, '') as error_message,
         COALESCE(locale, '') as locale,
         COALESCE(country, '') as country,
         COALESCE(page_path, '') as page_path,
         COALESCE(visitor_id, '') as visitor_id,
         COALESCE(ip_country, '') as ip_country,
         COALESCE(is_mobile, false) as is_mobile,
         status,
         created_at::text,
         handled_at::text
       FROM missing_app_feedback
       ORDER BY (status = 'pending') DESC, created_at DESC, id DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    ),
  ]);

  return {
    rows,
    total: totalResult[0]?.total ?? 0,
    pending: pendingResult[0]?.total ?? 0,
  };
}

export async function getSearchAliasOverrideAppIds(
  aliasKeys: string[],
): Promise<string[] | null> {
  if (!aliasKeys.length) return null;

  for (const aliasKey of aliasKeys) {
    const rows = await sqlRaw<{ app_ids: string }>(
      `SELECT app_ids
       FROM search_alias_overrides
       WHERE alias_key = $1
       LIMIT 1`,
      [aliasKey],
    );
    const raw = rows[0]?.app_ids?.trim();
    if (!raw) continue;
    const appIds = raw.split(",").map((id) => id.trim()).filter(Boolean);
    if (appIds.length) return appIds;
  }

  return null;
}

export async function upsertSearchAliasOverrideKeys(params: {
  aliasKeys: string[];
  appIds: string[];
  sourceQuery?: string;
  sourceLabel?: string;
}): Promise<number> {
  const appIds = [...new Set(params.appIds.map((id) => id.trim()).filter(Boolean))];
  if (!appIds.length) return 0;

  const appIdsValue = appIds.join(",");
  const sourceQuery = (params.sourceQuery || "").slice(0, 500);
  const sourceLabel = (params.sourceLabel || "auto-repair").slice(0, 40);
  let written = 0;

  for (const aliasKey of params.aliasKeys) {
    if (!aliasKey) continue;
    await sqlRaw(
      `INSERT INTO search_alias_overrides (alias_key, app_ids, source_query, source_label, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (alias_key) DO UPDATE SET
         app_ids = EXCLUDED.app_ids,
         source_query = COALESCE(NULLIF(EXCLUDED.source_query, ''), search_alias_overrides.source_query),
         source_label = EXCLUDED.source_label,
         updated_at = NOW()`,
      [aliasKey.slice(0, 200), appIdsValue, sourceQuery, sourceLabel],
    );
    written += 1;
  }

  return written;
}

export async function getUnresolvedSearchFailuresForDiscovery(
  limit = 60,
): Promise<Array<{ query: string; last_lang: string; last_country: string }>> {
  return sqlRaw(
    `SELECT query,
            COALESCE(last_lang, '') as last_lang,
            COALESCE(last_country, '') as last_country
     FROM search_failure_queries
     WHERE resolved = FALSE
     ORDER BY failure_count DESC, last_failed_at DESC
     LIMIT $1`,
    [Math.min(Math.max(limit, 1), 200)],
  );
}

export async function updateMissingAppFeedbackStatus(
  id: number,
  status: "pending" | "done",
): Promise<boolean> {
  const rows = await sqlRaw<{ id: number }>(
    `UPDATE missing_app_feedback
     SET status = $2,
         handled_at = CASE WHEN $2 = 'done' THEN NOW() ELSE NULL END
     WHERE id = $1
     RETURNING id`,
    [id, status],
  );
  return rows.length > 0;
}

export async function getManualDownloadSource(appId: string): Promise<ManualDownloadSource | null> {
  const rows = await sqlRaw<ManualDownloadSource>(
    `SELECT
       app_id,
       app_title,
       download_url,
       COALESCE(file_name, '') as file_name,
       COALESCE(source_label, 'manual') as source_label,
       active,
       updated_at::text
     FROM manual_download_sources
     WHERE app_id = $1 AND active = TRUE
     LIMIT 1`,
    [appId]
  );
  return rows[0] ?? null;
}

export async function upsertManualDownloadSource(params: {
  appId: string;
  appTitle?: string;
  downloadUrl: string;
  fileName?: string;
  sourceLabel?: string;
  active?: boolean;
}): Promise<ManualDownloadSource> {
  const rows = await sqlRaw<ManualDownloadSource>(
    `INSERT INTO manual_download_sources (
       app_id,
       app_title,
       download_url,
       file_name,
       source_label,
       active,
       updated_at
     )
     VALUES ($1, $2, $3, $4, COALESCE(NULLIF($5, ''), 'manual'), $6, NOW())
     ON CONFLICT (app_id) DO UPDATE SET
       app_title = COALESCE(NULLIF(EXCLUDED.app_title, ''), manual_download_sources.app_title),
       download_url = EXCLUDED.download_url,
       file_name = EXCLUDED.file_name,
       source_label = EXCLUDED.source_label,
       active = EXCLUDED.active,
       updated_at = NOW()
     RETURNING app_id, app_title, download_url, file_name, source_label, active, updated_at::text`,
    [
      params.appId,
      params.appTitle || "",
      params.downloadUrl,
      params.fileName || "",
      params.sourceLabel || "manual",
      params.active ?? true,
    ]
  );
  return rows[0];
}

export async function deleteManualDownloadSource(appId: string): Promise<boolean> {
  const rows = await sqlRaw<{ app_id: string }>(
    `DELETE FROM manual_download_sources WHERE app_id = $1 RETURNING app_id`,
    [appId]
  );
  return rows.length > 0;
}

export async function getRecentActivity(
  limit = 50,
  offset = 0,
  startDate?: string,
  endDate?: string
): Promise<{ rows: ActivityItem[]; total: number }> {
  const timeClause = (prefix: string) => {
    if (!startDate && !endDate) return "";
    return `WHERE ${dateRangeSql(`${prefix}.timestamp`)}`;
  };
  const baseParams = startDate || endDate ? dateRangeParams(startDate, endDate) : [];

  // Get total counts first
  const totalParams = [...baseParams];
  const [searchTotal, downloadTotal] = await Promise.all([
    sqlRaw<{ total: number }>(
      `SELECT COUNT(*)::int as total FROM search_logs s ${timeClause("s")}`,
      totalParams
    ),
    sqlRaw<{ total: number }>(
      `SELECT COUNT(*)::int as total FROM download_logs d ${timeClause("d")}`,
      totalParams
    ),
  ]);

  const total = (searchTotal[0]?.total ?? 0) + (downloadTotal[0]?.total ?? 0);

  const [searches, downloads] = await Promise.all([
    sqlRaw<{ type: "search"; visitor_id: string; app_id: string; app_title: string; query: string; timestamp: string;
      ip_country: string; ip_city: string; device_brand: string; device_os: string; device_browser: string; is_mobile: boolean }>(
      `SELECT 'search'::text as type, s.visitor_id, s.app_id, s.app_title, s.query, s.timestamp,
              COALESCE(v.ip_country, '') as ip_country, COALESCE(v.ip_city, '') as ip_city,
              COALESCE(v.device_brand, '') as device_brand, COALESCE(v.device_os, '') as device_os,
              COALESCE(v.device_browser, '') as device_browser, COALESCE(v.is_mobile, false) as is_mobile
       FROM search_logs s
       LEFT JOIN visitors v ON v.visitor_id = s.visitor_id
       ${timeClause("s")}
       ORDER BY s.timestamp DESC LIMIT $${baseParams.length + 1} OFFSET $${baseParams.length + 2}`,
      [...baseParams, limit, offset]
    ),
    sqlRaw<{ type: "download"; visitor_id: string; app_id: string; app_title: string; file_size: string; version: string; download_success: boolean; timestamp: string;
      ip_country: string; ip_city: string; device_brand: string; device_os: string; device_browser: string; is_mobile: boolean }>(
      `SELECT 'download'::text as type, d.visitor_id, d.app_id, d.app_title,
              COALESCE(d.file_size, '') as file_size, COALESCE(d.version, '') as version,
              COALESCE(d.download_success, true) as download_success, d.timestamp,
              COALESCE(v.ip_country, '') as ip_country, COALESCE(v.ip_city, '') as ip_city,
              COALESCE(v.device_brand, '') as device_brand, COALESCE(v.device_os, '') as device_os,
              COALESCE(v.device_browser, '') as device_browser, COALESCE(v.is_mobile, false) as is_mobile
       FROM download_logs d
       LEFT JOIN visitors v ON v.visitor_id = d.visitor_id
       ${timeClause("d")}
       ORDER BY d.timestamp DESC LIMIT $${baseParams.length + 1} OFFSET $${baseParams.length + 2}`,
      [...baseParams, limit, offset]
    ),
  ]);

  const activities: ActivityItem[] = [
    ...searches.map((s) => ({
      type: "search" as const,
      visitor_id: s.visitor_id,
      app_id: s.app_id,
      app_title: s.app_title,
      query: s.query,
      timestamp: s.timestamp,
      ip_country: s.ip_country,
      ip_city: s.ip_city,
      device_brand: s.device_brand,
      device_os: s.device_os,
      device_browser: s.device_browser,
      is_mobile: s.is_mobile,
    })),
    ...downloads.map((d) => ({
      type: "download" as const,
      visitor_id: d.visitor_id,
      app_id: d.app_id,
      app_title: d.app_title,
      file_size: d.file_size,
      version: d.version,
      success: d.download_success,
      timestamp: d.timestamp,
      ip_country: d.ip_country,
      ip_city: d.ip_city,
      device_brand: d.device_brand,
      device_os: d.device_os,
      device_browser: d.device_browser,
      is_mobile: d.is_mobile,
    })),
  ];

  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return { rows: activities, total };
}

export async function getVisitorList(
  limit = 100,
  offset = 0,
  startDate?: string,
  endDate?: string
): Promise<{ rows: VisitorInfo[]; total: number }> {
  if (!startDate && !endDate) {
    const [totalResult, rows] = await Promise.all([
      sqlRaw<{ total: number }>(`SELECT COUNT(*)::int as total FROM visitors`),
      sqlRaw<VisitorInfo>(
        `SELECT v.visitor_id, v.first_visit::text, v.last_visit::text, v.visit_count,
                v.ip_country, v.ip_city, v.ip_region, v.user_agent,
                v.device_brand, v.device_model, v.device_os, v.device_browser, v.is_mobile,
                COALESCE(s.cnt, 0)::int as search_count, COALESCE(d.cnt, 0)::int as download_count
         FROM visitors v
         LEFT JOIN (SELECT visitor_id, COUNT(*)::int as cnt FROM search_logs GROUP BY visitor_id) s ON s.visitor_id = v.visitor_id
         LEFT JOIN (SELECT visitor_id, COUNT(*)::int as cnt FROM download_logs GROUP BY visitor_id) d ON d.visitor_id = v.visitor_id
         ORDER BY v.last_visit DESC LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
    ]);
    return { rows, total: totalResult[0]?.total ?? 0 };
  }

  const params = dateRangeParams(startDate, endDate);
  const [totalResult, rows] = await Promise.all([
    sqlRaw<{ total: number }>(
      `SELECT COUNT(*)::int as total
       FROM visitors v
       LEFT JOIN (
         SELECT visitor_id, COUNT(*)::int as cnt
         FROM search_logs
         WHERE ${dateRangeSql("timestamp")}
         GROUP BY visitor_id
       ) s ON s.visitor_id = v.visitor_id
       LEFT JOIN (
         SELECT visitor_id, COUNT(*)::int as cnt
         FROM download_logs
         WHERE ${dateRangeSql("timestamp")}
         GROUP BY visitor_id
       ) d ON d.visitor_id = v.visitor_id
       WHERE ${dateRangeSql("v.first_visit")}
          OR ${dateRangeSql("v.last_visit")}
          OR s.visitor_id IS NOT NULL
          OR d.visitor_id IS NOT NULL`,
      params
    ),
    sqlRaw<VisitorInfo>(
      `SELECT v.visitor_id, v.first_visit::text, v.last_visit::text, v.visit_count,
              v.ip_country, v.ip_city, v.ip_region, v.user_agent,
              v.device_brand, v.device_model, v.device_os, v.device_browser, v.is_mobile,
              COALESCE(s.cnt, 0)::int as search_count, COALESCE(d.cnt, 0)::int as download_count
       FROM visitors v
       LEFT JOIN (
         SELECT visitor_id, COUNT(*)::int as cnt
         FROM search_logs
         WHERE ${dateRangeSql("timestamp")}
         GROUP BY visitor_id
       ) s ON s.visitor_id = v.visitor_id
       LEFT JOIN (
         SELECT visitor_id, COUNT(*)::int as cnt
         FROM download_logs
         WHERE ${dateRangeSql("timestamp")}
         GROUP BY visitor_id
       ) d ON d.visitor_id = v.visitor_id
       WHERE ${dateRangeSql("v.first_visit")}
          OR ${dateRangeSql("v.last_visit")}
          OR s.visitor_id IS NOT NULL
          OR d.visitor_id IS NOT NULL
       ORDER BY v.last_visit DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    ),
  ]);

  return { rows, total: totalResult[0]?.total ?? 0 };
}

// 获取某个访客的详细操作日志
export async function getVisitorLogs(visitorId: string, limit = 200): Promise<VisitorDetailLog[]> {
  const [searches, downloads] = await Promise.all([
    sqlRaw<{ id: number; type: "search"; app_id: string; app_title: string; query: string; query_type: string; timestamp: string }>(
      `SELECT id, 'search'::text as type, app_id, app_title, query, query_type, timestamp FROM search_logs WHERE visitor_id = $1 ORDER BY timestamp DESC LIMIT $2`,
      [visitorId, limit]
    ),
    sqlRaw<{ id: number; type: "download"; app_id: string; app_title: string; query: null; query_type: null; file_size: string; version: string; download_success: boolean; timestamp: string }>(
      `SELECT id, 'download'::text as type, app_id, app_title, null as query, null as query_type, 
              COALESCE(file_size, '') as file_size, COALESCE(version, '') as version, 
              COALESCE(download_success, true) as download_success, timestamp 
       FROM download_logs WHERE visitor_id = $1 ORDER BY timestamp DESC LIMIT $2`,
      [visitorId, limit]
    ),
  ]);

  const merged: VisitorDetailLog[] = [
    ...searches.map((s) => ({
      id: s.id,
      type: "search" as const,
      app_id: s.app_id,
      app_title: s.app_title,
      query: s.query,
      query_type: s.query_type,
      timestamp: s.timestamp,
      file_size: "",
      version: "",
      success: true,
    })),
    ...downloads.map((d) => ({
      id: d.id,
      type: "download" as const,
      app_id: d.app_id,
      app_title: d.app_title,
      query: undefined as string | undefined,
      query_type: undefined as string | undefined,
      timestamp: d.timestamp,
      file_size: d.file_size,
      version: d.version,
      success: d.download_success,
    })),
  ];

  merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return merged.slice(0, limit);
}

export async function isDbReady(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
