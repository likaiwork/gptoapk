/**
 * 导出「仍未解决」的搜索失败关键词清单（只读，不落库）。
 *
 * 输出：总数、拉丁/非拉丁占比、累计失败次数，并把完整清单写到
 * /tmp/unresolved-keywords.txt，终端打印失败次数 Top N 供快速核对。
 *
 * 用法（在 VPS /var/www/gptoapk 下运行）：
 *   node scripts/list-unresolved-keywords.mjs
 *   node scripts/list-unresolved-keywords.mjs --top 100
 */

import pg from "pg";
import fs from "node:fs";
import path from "node:path";
const { Client } = pg;

function loadEnvFile() {
  for (const name of [".env.production", ".env"]) {
    const p = path.resolve(process.cwd(), name);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  }
}
loadEnvFile();

if (!process.env.POSTGRES_URL) {
  console.error("缺少 POSTGRES_URL 环境变量（也未在 .env.production 中找到）");
  process.exit(1);
}

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i === -1 || i + 1 >= process.argv.length ? fallback : process.argv[i + 1];
}
const TOP = Number(arg("--top", "80"));

const client = new Client({ connectionString: process.env.POSTGRES_URL });
await client.connect();

try {
  const { rows } = await client.query(
    `SELECT normalized_query,
            MAX(query) AS query,
            SUM(failure_count)::int AS failure_count,
            COUNT(*)::int AS row_count
     FROM search_failure_queries
     WHERE resolved = FALSE
       AND query_type = 'keyword'
       AND normalized_query <> ''
     GROUP BY normalized_query
     ORDER BY SUM(failure_count) DESC, normalized_query ASC`,
  );

  const hasLatin = (s) => /[a-z0-9]/i.test(s);
  let latin = 0;
  let nonlatin = 0;
  for (const r of rows) hasLatin(r.normalized_query) ? latin++ : nonlatin++;
  const totalFails = rows.reduce((s, r) => s + r.failure_count, 0);

  console.log(`[list] 未解决关键词总数: ${rows.length}`);
  console.log(`[list] 拉丁: ${latin}，非拉丁: ${nonlatin}`);
  console.log(`[list] 累计失败次数: ${totalFails}`);

  const outPath = "/tmp/unresolved-keywords.txt";
  const lines = rows.map((r) => `${r.normalized_query}\t${r.failure_count}\t${r.query}`);
  fs.writeFileSync(outPath, lines.join("\n") + "\n");
  console.log(`[list] 完整清单已写入 ${outPath}（${rows.length} 行，格式：词\t失败次数\t原始query）`);

  console.log(`\n[list] 失败次数 Top ${TOP}:`);
  for (const r of rows.slice(0, TOP)) {
    console.log(`  ${String(r.failure_count).padStart(4)}  ${r.normalized_query}  (${r.query})`);
  }
} finally {
  await client.end();
}
