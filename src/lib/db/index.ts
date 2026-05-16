import { createPool } from "@vercel/postgres";
import type { QueryResultRow } from "@vercel/postgres";

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
  timestamp: string;
  ip_country: string;
  ip_city: string;
  device_brand: string;
  device_os: string;
  device_browser: string;
  is_mobile: boolean;
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

  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_visitor ON search_logs(visitor_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_app ON search_logs(app_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_timestamp ON search_logs(timestamp)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_visitor ON download_logs(visitor_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_app ON download_logs(app_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_timestamp ON download_logs(timestamp)`; } catch {}

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
  ];
  for (const q of migrationQueries) {
    try { await sqlRaw(q); } catch {}
  }

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
    await sql`
      UPDATE visitors SET last_visit = NOW(), visit_count = visit_count + 1 WHERE visitor_id = ${visitorId}
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
  return true;
}

export async function getVisitorStats(): Promise<{ total: number }> {
  const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM visitors`;
  return { total: result.rows[0]?.total ?? 0 };
}

export async function getTotalSearches(startDate?: string, endDate?: string): Promise<number> {
  if (!startDate && !endDate) {
    const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM search_logs`;
    return result.rows[0]?.total ?? 0;
  }
  const rows = await sqlRaw<{ total: number }>(
    "SELECT COUNT(*)::int as total FROM search_logs WHERE timestamp >= $1 AND timestamp < $2",
    [startDate ? `${startDate} 00:00:00` : "2000-01-01", endDate ? `${endDate} 23:59:59` : "2099-12-31"]
  );
  return rows[0]?.total ?? 0;
}

export async function getTotalDownloads(startDate?: string, endDate?: string): Promise<number> {
  if (!startDate && !endDate) {
    const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM download_logs`;
    return result.rows[0]?.total ?? 0;
  }
  const rows = await sqlRaw<{ total: number }>(
    "SELECT COUNT(*)::int as total FROM download_logs WHERE timestamp >= $1 AND timestamp < $2",
    [startDate ? `${startDate} 00:00:00` : "2000-01-01", endDate ? `${endDate} 23:59:59` : "2099-12-31"]
  );
  return rows[0]?.total ?? 0;
}

export async function getSearchStats(limit = 20, startDate?: string, endDate?: string): Promise<SearchStat[]> {
  if (!startDate && !endDate) {
    const result = await sql<SearchStat>`
      SELECT app_id, app_title, COUNT(*)::int as count
      FROM search_logs WHERE app_id != ''
      GROUP BY app_id, app_title ORDER BY count DESC LIMIT ${limit}
    `;
    return result.rows;
  }
  return await sqlRaw<SearchStat>(
    `SELECT app_id, app_title, COUNT(*)::int as count FROM search_logs 
     WHERE app_id != '' AND timestamp >= $1 AND timestamp < $2
     GROUP BY app_id, app_title ORDER BY count DESC LIMIT $3`,
    [startDate ? `${startDate} 00:00:00` : "2000-01-01", endDate ? `${endDate} 23:59:59` : "2099-12-31", limit]
  );
}

export async function getDownloadStats(limit = 20, startDate?: string, endDate?: string): Promise<DownloadStat[]> {
  if (!startDate && !endDate) {
    const result = await sql<DownloadStat>`
      SELECT app_id, app_title, COUNT(*)::int as count
      FROM download_logs WHERE app_id != ''
      GROUP BY app_id, app_title ORDER BY count DESC LIMIT ${limit}
    `;
    return result.rows;
  }
  return await sqlRaw<DownloadStat>(
    `SELECT app_id, app_title, COUNT(*)::int as count FROM download_logs 
     WHERE app_id != '' AND timestamp >= $1 AND timestamp < $2
     GROUP BY app_id, app_title ORDER BY count DESC LIMIT $3`,
    [startDate ? `${startDate} 00:00:00` : "2000-01-01", endDate ? `${endDate} 23:59:59` : "2099-12-31", limit]
  );
}

export async function getRecentActivity(limit = 50, startDate?: string, endDate?: string): Promise<ActivityItem[]> {
  const timeClause = (prefix: string) => {
    if (!startDate && !endDate) return "";
    return `WHERE ${prefix}.timestamp >= '${startDate || "2000-01-01"} 00:00:00' AND ${prefix}.timestamp < '${endDate || "2099-12-31"} 23:59:59'`;
  };

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
       ORDER BY s.timestamp DESC LIMIT $1`,
      [limit]
    ),
    sqlRaw<{ type: "download"; visitor_id: string; app_id: string; app_title: string; timestamp: string;
      ip_country: string; ip_city: string; device_brand: string; device_os: string; device_browser: string; is_mobile: boolean }>(
      `SELECT 'download'::text as type, d.visitor_id, d.app_id, d.app_title, d.timestamp,
              COALESCE(v.ip_country, '') as ip_country, COALESCE(v.ip_city, '') as ip_city,
              COALESCE(v.device_brand, '') as device_brand, COALESCE(v.device_os, '') as device_os,
              COALESCE(v.device_browser, '') as device_browser, COALESCE(v.is_mobile, false) as is_mobile
       FROM download_logs d
       LEFT JOIN visitors v ON v.visitor_id = d.visitor_id
       ${timeClause("d")}
       ORDER BY d.timestamp DESC LIMIT $1`,
      [limit]
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
  return activities.slice(0, limit);
}

export async function getVisitorList(startDate?: string, endDate?: string): Promise<VisitorInfo[]> {
  if (!startDate && !endDate) {
    const rows = await sqlRaw<VisitorInfo>(
      `SELECT v.visitor_id, v.first_visit::text, v.last_visit::text, v.visit_count,
              v.ip_country, v.ip_city, v.ip_region, v.user_agent,
              v.device_brand, v.device_model, v.device_os, v.device_browser, v.is_mobile,
              COALESCE(s.cnt, 0)::int as search_count, COALESCE(d.cnt, 0)::int as download_count
       FROM visitors v
       LEFT JOIN (SELECT visitor_id, COUNT(*)::int as cnt FROM search_logs GROUP BY visitor_id) s ON s.visitor_id = v.visitor_id
       LEFT JOIN (SELECT visitor_id, COUNT(*)::int as cnt FROM download_logs GROUP BY visitor_id) d ON d.visitor_id = v.visitor_id
       ORDER BY v.last_visit DESC LIMIT 100`
    );
    return rows;
  }

  return await sqlRaw<VisitorInfo>(
    `SELECT v.visitor_id, v.first_visit::text, v.last_visit::text, v.visit_count,
            v.ip_country, v.ip_city, v.ip_region, v.user_agent,
            v.device_brand, v.device_model, v.device_os, v.device_browser, v.is_mobile,
            COALESCE(s.cnt, 0)::int as search_count, COALESCE(d.cnt, 0)::int as download_count
     FROM visitors v
     LEFT JOIN (SELECT visitor_id, COUNT(*)::int as cnt FROM search_logs WHERE timestamp >= $1 AND timestamp < $2 GROUP BY visitor_id) s ON s.visitor_id = v.visitor_id
     LEFT JOIN (SELECT visitor_id, COUNT(*)::int as cnt FROM download_logs WHERE timestamp >= $1 AND timestamp < $2 GROUP BY visitor_id) d ON d.visitor_id = v.visitor_id
     ORDER BY v.last_visit DESC LIMIT 100`,
    [startDate ? `${startDate} 00:00:00` : "2000-01-01", endDate ? `${endDate} 23:59:59` : "2099-12-31"]
  );
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
