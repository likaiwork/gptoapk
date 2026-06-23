#!/usr/bin/env node
/**
 * Copy gptoapk Postgres data from Neon (or any source) into local VPS Postgres.
 *
 * On VPS:
 *   set -a && source .env.production && set +a
 *   export NEON_SOURCE_URL='postgresql://...@ep-xxx.c-8...neon.tech/neondb?sslmode=require'
 *   node scripts/migrate-neon-to-local.mjs
 *
 * Use the *direct* (non-pooler) Neon URL for NEON_SOURCE_URL.
 */
import { Pool } from "pg";

const TABLES = [
  "visitors",
  "search_logs",
  "download_logs",
  "download_failure_apps",
  "manual_download_sources",
  "search_failure_queries",
  "search_alias_overrides",
  "missing_app_feedback",
];

const SERIAL_TABLES = {
  search_logs: "id",
  download_logs: "id",
  missing_app_feedback: "id",
};

const BATCH = 200;

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing ${name}. Set Neon direct URL, e.g. ep-xxx.c-8....neon.tech (not -pooler).`);
    process.exit(1);
  }
  return value;
}

function quoteIdent(name) {
  return `"${name.replace(/"/g, '""')}"`;
}

async function tableExists(pool, table) {
  const { rows } = await pool.query(
    `SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1`,
    [table]
  );
  return rows.length > 0;
}

async function fetchColumns(pool, table) {
  const { rows } = await pool.query(
    `SELECT column_name FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = $1
     ORDER BY ordinal_position`,
    [table]
  );
  return rows.map((r) => r.column_name);
}

async function migrateTable(source, dest, table) {
  if (!(await tableExists(source, table))) {
    console.log(`[skip] ${table}: not on source`);
    return 0;
  }
  if (!(await tableExists(dest, table))) {
    console.log(`[skip] ${table}: not on destination (run app once to init schema)`);
    return 0;
  }

  const sourceCols = await fetchColumns(source, table);
  const destCols = await fetchColumns(dest, table);
  const cols = sourceCols.filter((c) => destCols.includes(c));
  if (cols.length === 0) {
    console.log(`[skip] ${table}: no shared columns`);
    return 0;
  }

  const { rows: countRows } = await source.query(`SELECT COUNT(*)::int AS n FROM ${quoteIdent(table)}`);
  const total = countRows[0]?.n ?? 0;
  if (total === 0) {
    console.log(`[ok] ${table}: 0 rows`);
    return 0;
  }

  await dest.query(`TRUNCATE ${quoteIdent(table)} RESTART IDENTITY CASCADE`);

  const colList = cols.map(quoteIdent).join(", ");
  let copied = 0;

  for (let offset = 0; offset < total; offset += BATCH) {
    const { rows } = await source.query(
      `SELECT ${colList} FROM ${quoteIdent(table)} ORDER BY 1 LIMIT $1 OFFSET $2`,
      [BATCH, offset]
    );
    if (rows.length === 0) break;

    const values = [];
    const placeholders = rows
      .map((row, rowIndex) => {
        const start = rowIndex * cols.length + 1;
        cols.forEach((col) => values.push(row[col] ?? null));
        return `(${cols.map((_, colIndex) => `$${start + colIndex}`).join(", ")})`;
      })
      .join(", ");

    await dest.query(
      `INSERT INTO ${quoteIdent(table)} (${colList}) VALUES ${placeholders}`,
      values
    );
    copied += rows.length;
    process.stdout.write(`\r[copy] ${table}: ${copied}/${total}`);
  }
  process.stdout.write("\n");

  const serialCol = SERIAL_TABLES[table];
  if (serialCol) {
    await dest.query(
      `SELECT setval(
         pg_get_serial_sequence($1, $2),
         COALESCE((SELECT MAX(${quoteIdent(serialCol)}) FROM ${quoteIdent(table)}), 1),
         (SELECT MAX(${quoteIdent(serialCol)}) IS NOT NULL FROM ${quoteIdent(table)})
       )`,
      [table, serialCol]
    );
  }

  return copied;
}

async function main() {
  const sourceUrl = requireEnv("NEON_SOURCE_URL");
  const destUrl = requireEnv("POSTGRES_URL");

  if (sourceUrl === destUrl) {
    console.error("NEON_SOURCE_URL and POSTGRES_URL are the same — aborting.");
    process.exit(1);
  }

  const source = new Pool({ connectionString: sourceUrl, ssl: { rejectUnauthorized: false } });
  const dest = new Pool({ connectionString: destUrl });

  try {
    await source.query("SELECT 1");
    console.log("[source] connected");
    await dest.query("SELECT 1");
    console.log("[dest] connected");

    let grandTotal = 0;
    for (const table of TABLES) {
      grandTotal += await migrateTable(source, dest, table);
    }

    console.log(`\nDone. ${grandTotal} rows copied across ${TABLES.length} tables.`);
    console.log("Verify: curl -s \"http://127.0.0.1:3000/api/admin?key=$ADMIN_API_KEY&pageSize=3\" | head -c 200");
  } finally {
    await source.end();
    await dest.end();
  }
}

main().catch((err) => {
  console.error("Migration failed:", err.message);
  if (/compute time|402|suspended|quota/i.test(String(err.message))) {
    console.error("Neon may be over quota. Try Neon console → restore project, or export a backup if you have one.");
  }
  process.exit(1);
});
