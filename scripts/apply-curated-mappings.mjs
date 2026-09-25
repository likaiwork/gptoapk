/**
 * 写入人工核对过的高置信关键词映射（读 curated-mappings.json）。
 * 每个关键词：upsert 到 search_alias_overrides（source_label='curated-manual'），
 * 并把对应的 search_failure_queries 标记为已解决。
 *
 * 用法（在 VPS /var/www/gptoapk 下运行）：
 *   node scripts/apply-curated-mappings.mjs            # 只读预览，不落库
 *   node scripts/apply-curated-mappings.mjs --apply    # 真正写入
 */

import pg from "pg";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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

const APPLY = process.argv.includes("--apply");

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(scriptDir, "curated-mappings.json");
const mappings = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const entries = Object.entries(mappings);

const PACKAGE_RE = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

const client = new Client({ connectionString: process.env.POSTGRES_URL });
await client.connect();

try {
  console.log(`[curated] 待写入映射 ${entries.length} 条`);

  // 校验包名格式
  let bad = 0;
  for (const [k, v] of entries) {
    for (const pkg of v.split(",")) {
      if (!PACKAGE_RE.test(pkg.trim())) {
        console.warn(`[curated] 非法包名：${k} => ${pkg}`);
        bad++;
      }
    }
  }
  if (bad > 0) {
    console.error(`[curated] 有 ${bad} 个非法包名，中止。`);
    process.exit(1);
  }

  if (!APPLY) {
    for (const [k, v] of entries) {
      console.log(`  ${k}  =>  ${v}`);
    }
    console.log("\n[curated] 只读预览（未落库）。加 --apply 才会写入。");
  } else {
    await client.query("BEGIN");
    try {
      let aliasWritten = 0;
      let resolvedRows = 0;
      for (const [k, v] of entries) {
        await client.query(
          `INSERT INTO search_alias_overrides (alias_key, app_ids, source_query, source_label, updated_at)
           VALUES ($1, $2, $1, 'curated-manual', NOW())
           ON CONFLICT (alias_key) DO UPDATE SET
             app_ids = EXCLUDED.app_ids,
             source_query = EXCLUDED.source_query,
             source_label = EXCLUDED.source_label,
             updated_at = NOW()`,
          [k, v],
        );
        aliasWritten++;

        const upd = await client.query(
          `UPDATE search_failure_queries
           SET resolved = TRUE, resolved_at = NOW(), updated_at = NOW()
           WHERE resolved = FALSE AND normalized_query = $1`,
          [k],
        );
        resolvedRows += upd.rowCount;
        console.log(`  [ok] ${k}  =>  ${v}（恢复 ${upd.rowCount} 条）`);
      }

      await client.query("COMMIT");
      console.log(`\n[curated] 完成：写入别名 ${aliasWritten} 条，恢复已解决 ${resolvedRows} 条。`);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    }
  }
} finally {
  await client.end();
}
