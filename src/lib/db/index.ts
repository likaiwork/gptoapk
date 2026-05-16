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
}

export interface VisitorInfo {
  visitor_id: string;
  first_visit: string;
  last_visit: string;
  visit_count: number;
  search_count: number;
  download_count: number;
}

function getAdminApiKey(): string {
  return process.env.ADMIN_API_KEY || "gptoapk-admin-key-2026";
}
export { getAdminApiKey };

// Database pool singleton
let pool: ReturnType<typeof createPool> | null = null;
let initialized = false;

function getPool() {
  if (!pool) {
    pool = createPool();
  }
  return pool;
}

/** Execute a safe tagged-template SQL query (parameterized). */
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

/** Execute a raw SQL string with positional parameters ($1, $2, …). */
async function sqlRaw<T extends QueryResultRow = QueryResultRow>(
  text: string,
  ...params: Primitive[]
): Promise<import("@vercel/postgres").QueryResult<T>> {
  const p = getPool();
  const client = await p.connect();
  try {
    return await client.query<T>(text, params.filter((v) => v !== undefined));
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
      visit_count INTEGER DEFAULT 1
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
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ip_hash TEXT DEFAULT ''
    )
  `;

  // Create indexes (IF NOT EXISTS for indexes requires PG 9.5+)
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_visitor ON search_logs(visitor_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_app ON search_logs(app_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_search_timestamp ON search_logs(timestamp)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_visitor ON download_logs(visitor_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_app ON download_logs(app_id)`; } catch {}
  try { await sql`CREATE INDEX IF NOT EXISTS idx_download_timestamp ON download_logs(timestamp)`; } catch {}

  initialized = true;
}

export async function registerVisitor(visitorId: string): Promise<{
  visitor_id: string;
  first_visit: string;
  visit_count: number;
}> {
  const existing = await sql<VisitorRow>`
    SELECT * FROM visitors WHERE visitor_id = ${visitorId}
  `;

  if (existing.rows.length > 0) {
    const row = existing.rows[0];
    await sql`
      UPDATE visitors SET last_visit = NOW(), visit_count = visit_count + 1 WHERE visitor_id = ${visitorId}
    `;
    return {
      visitor_id: row.visitor_id,
      first_visit: row.first_visit,
      visit_count: row.visit_count + 1,
    };
  }

  const result = await sql<{ visitor_id: string; first_visit: string; visit_count: number }>`
    INSERT INTO visitors (visitor_id, first_visit, last_visit, visit_count)
    VALUES (${visitorId}, NOW(), NOW(), 1)
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

export async function logDownload(params: DownloadLogParams): Promise<void> {
  await sql`
    INSERT INTO download_logs (visitor_id, app_id, app_title, source, download_url, version, file_size, timestamp, ip_hash)
    VALUES (${params.visitorId}, ${params.appId}, ${params.appTitle}, ${params.source}, ${params.downloadUrl}, ${params.version}, ${params.fileSize}, NOW(), ${params.ipHash || ""})
  `;
}

export async function getVisitorStats(): Promise<{ total: number }> {
  const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM visitors`;
  return { total: result.rows[0]?.total ?? 0 };
}

export async function getTotalSearches(startDate?: string, endDate?: string): Promise<number> {
  if (startDate && endDate) {
    const result = await sqlRaw<{ total: number }>(
      `SELECT COUNT(*)::int as total FROM search_logs WHERE timestamp >= $1::timestamptz AND timestamp < $2::timestamptz + interval '1 day'`,
      startDate,
      endDate
    );
    return result.rows[0]?.total ?? 0;
  }
  const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM search_logs`;
  return result.rows[0]?.total ?? 0;
}

export async function getTotalDownloads(startDate?: string, endDate?: string): Promise<number> {
  if (startDate && endDate) {
    const result = await sqlRaw<{ total: number }>(
      `SELECT COUNT(*)::int as total FROM download_logs WHERE timestamp >= $1::timestamptz AND timestamp < $2::timestamptz + interval '1 day'`,
      startDate,
      endDate
    );
    return result.rows[0]?.total ?? 0;
  }
  const result = await sql<{ total: number }>`SELECT COUNT(*)::int as total FROM download_logs`;
  return result.rows[0]?.total ?? 0;
}

export async function getSearchStats(limit: number = 20, startDate?: string, endDate?: string): Promise<SearchStat[]> {
  if (startDate && endDate) {
    const result = await sqlRaw<SearchStat>(
      `SELECT app_id, app_title, COUNT(*)::int as count FROM search_logs WHERE app_id != '' AND timestamp >= $1::timestamptz AND timestamp < $2::timestamptz + interval '1 day' GROUP BY app_id, app_title ORDER BY count DESC LIMIT $3`,
      startDate,
      endDate,
      limit
    );
    return result.rows;
  }
  const result = await sql<SearchStat>`
    SELECT app_id, app_title, COUNT(*)::int as count
    FROM search_logs
    WHERE app_id != ''
    GROUP BY app_id, app_title
    ORDER BY count DESC
    LIMIT ${limit}
  `;
  return result.rows;
}

export async function getDownloadStats(limit: number = 20, startDate?: string, endDate?: string): Promise<DownloadStat[]> {
  if (startDate && endDate) {
    const result = await sqlRaw<DownloadStat>(
      `SELECT app_id, app_title, COUNT(*)::int as count FROM download_logs WHERE app_id != '' AND timestamp >= $1::timestamptz AND timestamp < $2::timestamptz + interval '1 day' GROUP BY app_id, app_title ORDER BY count DESC LIMIT $3`,
      startDate,
      endDate,
      limit
    );
    return result.rows;
  }
  const result = await sql<DownloadStat>`
    SELECT app_id, app_title, COUNT(*)::int as count
    FROM download_logs
    WHERE app_id != ''
    GROUP BY app_id, app_title
    ORDER BY count DESC
    LIMIT ${limit}
  `;
  return result.rows;
}

export async function getRecentActivity(limit: number = 50, startDate?: string, endDate?: string): Promise<ActivityItem[]> {
  let searchesRes: import("@vercel/postgres").QueryResult<{ type: "search"; visitor_id: string; app_id: string; app_title: string; query: string; timestamp: string }>;
  let downloadsRes: import("@vercel/postgres").QueryResult<{ type: "download"; visitor_id: string; app_id: string; app_title: string; timestamp: string }>;

  if (startDate && endDate) {
    [searchesRes, downloadsRes] = await Promise.all([
      sqlRaw<{ type: "search"; visitor_id: string; app_id: string; app_title: string; query: string; timestamp: string }>(
        `SELECT 'search' as type, visitor_id, app_id, app_title, query, timestamp FROM search_logs WHERE timestamp >= $1::timestamptz AND timestamp < $2::timestamptz + interval '1 day' ORDER BY timestamp DESC LIMIT $3`,
        startDate,
        endDate,
        limit
      ),
      sqlRaw<{ type: "download"; visitor_id: string; app_id: string; app_title: string; timestamp: string }>(
        `SELECT 'download' as type, visitor_id, app_id, app_title, timestamp FROM download_logs WHERE timestamp >= $1::timestamptz AND timestamp < $2::timestamptz + interval '1 day' ORDER BY timestamp DESC LIMIT $3`,
        startDate,
        endDate,
        limit
      ),
    ]);
  } else {
    [searchesRes, downloadsRes] = await Promise.all([
      sql<{ type: "search"; visitor_id: string; app_id: string; app_title: string; query: string; timestamp: string }>`
        SELECT 'search' as type, visitor_id, app_id, app_title, query, timestamp
        FROM search_logs
        ORDER BY timestamp DESC
        LIMIT ${limit}
      `,
      sql<{ type: "download"; visitor_id: string; app_id: string; app_title: string; timestamp: string }>`
        SELECT 'download' as type, visitor_id, app_id, app_title, timestamp
        FROM download_logs
        ORDER BY timestamp DESC
        LIMIT ${limit}
      `,
    ]);
  }

  const activities: ActivityItem[] = [
    ...searchesRes.rows.map((s) => ({
      type: "search" as const,
      visitor_id: s.visitor_id,
      app_id: s.app_id,
      app_title: s.app_title,
      query: s.query,
      timestamp: s.timestamp,
    })),
    ...downloadsRes.rows.map((d) => ({
      type: "download" as const,
      visitor_id: d.visitor_id,
      app_id: d.app_id,
      app_title: d.app_title,
      timestamp: d.timestamp,
    })),
  ];

  activities.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return activities.slice(0, limit);
}

export async function getVisitorList(startDate?: string, endDate?: string): Promise<VisitorInfo[]> {
  if (startDate && endDate) {
    const result = await sqlRaw<VisitorInfo>(
      `SELECT
        v.visitor_id,
        v.first_visit,
        v.last_visit,
        v.visit_count,
        COALESCE(s.cnt, 0)::int AS search_count,
        COALESCE(d.cnt, 0)::int AS download_count
      FROM visitors v
      LEFT JOIN (
        SELECT visitor_id, COUNT(*)::int AS cnt
        FROM search_logs
        WHERE timestamp >= $1::timestamptz AND timestamp < $2::timestamptz + interval '1 day'
        GROUP BY visitor_id
      ) s ON v.visitor_id = s.visitor_id
      LEFT JOIN (
        SELECT visitor_id, COUNT(*)::int AS cnt
        FROM download_logs
        WHERE timestamp >= $1::timestamptz AND timestamp < $2::timestamptz + interval '1 day'
        GROUP BY visitor_id
      ) d ON v.visitor_id = d.visitor_id
      ORDER BY v.last_visit DESC
      LIMIT 100`,
      startDate,
      endDate
    );
    return result.rows;
  }

  const result = await sqlRaw<VisitorInfo>(
    `SELECT
      v.visitor_id,
      v.first_visit,
      v.last_visit,
      v.visit_count,
      COALESCE(s.cnt, 0)::int AS search_count,
      COALESCE(d.cnt, 0)::int AS download_count
    FROM visitors v
    LEFT JOIN (
      SELECT visitor_id, COUNT(*)::int AS cnt
      FROM search_logs
      GROUP BY visitor_id
    ) s ON v.visitor_id = s.visitor_id
    LEFT JOIN (
      SELECT visitor_id, COUNT(*)::int AS cnt
      FROM download_logs
      GROUP BY visitor_id
    ) d ON v.visitor_id = d.visitor_id
    ORDER BY v.last_visit DESC
    LIMIT 100`
  );
  return result.rows;
}

export async function isDbReady(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
