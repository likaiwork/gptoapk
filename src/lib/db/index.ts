import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

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

// Configuration
function getAdminApiKey(): string {
  return process.env.ADMIN_API_KEY || "gptoapk-admin-key-2026";
}

export { getAdminApiKey };

// Database singleton
let db: Database.Database | null = null;

const DB_PATH = path.resolve(process.cwd(), "data", "gptoapk.db");

export function getDb(): Database.Database {
  if (!db) {
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export function initDatabase(): void {
  const database = getDb();

  database.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id TEXT UNIQUE NOT NULL,
      first_visit TEXT NOT NULL,
      last_visit TEXT NOT NULL,
      visit_count INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS search_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id TEXT NOT NULL,
      query TEXT NOT NULL,
      query_type TEXT DEFAULT '',
      app_id TEXT DEFAULT '',
      app_title TEXT DEFAULT '',
      timestamp TEXT NOT NULL,
      ip_hash TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS download_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id TEXT NOT NULL,
      app_id TEXT DEFAULT '',
      app_title TEXT DEFAULT '',
      source TEXT DEFAULT '',
      download_url TEXT DEFAULT '',
      version TEXT DEFAULT '',
      file_size TEXT DEFAULT '',
      timestamp TEXT NOT NULL,
      ip_hash TEXT DEFAULT ''
    );

    CREATE INDEX IF NOT EXISTS idx_search_visitor ON search_logs(visitor_id);
    CREATE INDEX IF NOT EXISTS idx_search_app ON search_logs(app_id);
    CREATE INDEX IF NOT EXISTS idx_search_timestamp ON search_logs(timestamp);
    CREATE INDEX IF NOT EXISTS idx_download_visitor ON download_logs(visitor_id);
    CREATE INDEX IF NOT EXISTS idx_download_app ON download_logs(app_id);
    CREATE INDEX IF NOT EXISTS idx_download_timestamp ON download_logs(timestamp);
  `);
}

export function registerVisitor(visitorId: string): {
  visitor_id: string;
  first_visit: string;
  visit_count: number;
} {
  const database = getDb();
  const now = new Date().toISOString();

  const existing = database
    .prepare("SELECT * FROM visitors WHERE visitor_id = ?")
    .get(visitorId) as VisitorRow | undefined;

  if (existing) {
    database
      .prepare(
        "UPDATE visitors SET last_visit = ?, visit_count = visit_count + 1 WHERE visitor_id = ?"
      )
      .run(now, visitorId);
    return {
      visitor_id: existing.visitor_id,
      first_visit: existing.first_visit,
      visit_count: existing.visit_count + 1,
    };
  }

  database
    .prepare(
      "INSERT INTO visitors (visitor_id, first_visit, last_visit, visit_count) VALUES (?, ?, ?, 1)"
    )
    .run(visitorId, now, now);
  return {
    visitor_id: visitorId,
    first_visit: now,
    visit_count: 1,
  };
}

export function logSearch(params: SearchLogParams): void {
  const database = getDb();
  database
    .prepare(
      "INSERT INTO search_logs (visitor_id, query, query_type, app_id, app_title, timestamp, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      params.visitorId,
      params.query,
      params.queryType,
      params.appId,
      params.appTitle,
      new Date().toISOString(),
      params.ipHash || ""
    );
}

export function logDownload(params: DownloadLogParams): void {
  const database = getDb();
  database
    .prepare(
      "INSERT INTO download_logs (visitor_id, app_id, app_title, source, download_url, version, file_size, timestamp, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      params.visitorId,
      params.appId,
      params.appTitle,
      params.source,
      params.downloadUrl,
      params.version,
      params.fileSize,
      new Date().toISOString(),
      params.ipHash || ""
    );
}

export function getVisitorStats(): { total: number } {
  const database = getDb();
  const row = database
    .prepare("SELECT COUNT(*) as total FROM visitors")
    .get() as { total: number };
  return { total: row.total };
}

export function getSearchStats(limit: number = 20): SearchStat[] {
  const database = getDb();
  const rows = database
    .prepare(
      `SELECT app_id, app_title, COUNT(*) as count 
       FROM search_logs 
       WHERE app_id != '' 
       GROUP BY app_id 
       ORDER BY count DESC 
       LIMIT ?`
    )
    .all(limit) as SearchStat[];
  return rows;
}

export function getDownloadStats(limit: number = 20): DownloadStat[] {
  const database = getDb();
  const rows = database
    .prepare(
      `SELECT app_id, app_title, COUNT(*) as count 
       FROM download_logs 
       WHERE app_id != '' 
       GROUP BY app_id 
       ORDER BY count DESC 
       LIMIT ?`
    )
    .all(limit) as DownloadStat[];
  return rows;
}

export function getRecentActivity(limit: number = 50): ActivityItem[] {
  const database = getDb();
  const searches = database
    .prepare(
      `SELECT visitor_id, app_id, app_title, query, timestamp FROM search_logs ORDER BY timestamp DESC LIMIT ?`
    )
    .all(limit) as (SearchLogRow & { query: string })[];
  const downloads = database
    .prepare(
      `SELECT visitor_id, app_id, app_title, timestamp FROM download_logs ORDER BY timestamp DESC LIMIT ?`
    )
    .all(limit) as DownloadLogRow[];

  const activities: ActivityItem[] = [
    ...searches.map((s) => ({
      type: "search" as const,
      visitor_id: s.visitor_id,
      app_id: s.app_id,
      app_title: s.app_title,
      query: s.query,
      timestamp: s.timestamp,
    })),
    ...downloads.map((d) => ({
      type: "download" as const,
      visitor_id: d.visitor_id,
      app_id: d.app_id,
      app_title: d.app_title,
      timestamp: d.timestamp,
    })),
  ];

  activities.sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return activities.slice(0, limit);
}

// Get total count of searches
export function getTotalSearches(): number {
  const database = getDb();
  const row = database
    .prepare("SELECT COUNT(*) as total FROM search_logs")
    .get() as { total: number };
  return row.total;
}

// Get total count of downloads
export function getTotalDownloads(): number {
  const database = getDb();
  const row = database
    .prepare("SELECT COUNT(*) as total FROM download_logs")
    .get() as { total: number };
  return row.total;
}
