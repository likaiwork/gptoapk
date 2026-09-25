/**
 * 把明确无意义的「搜索失败关键词」批量标记为已忽略（ignored=TRUE, resolved=TRUE）。
 *
 * 覆盖两类：
 *   1) 精确清单 NOISE_KEYS —— 乱拼/垃圾词、成人词、破解/灰产词、纯品类词；
 *   2) 模式规则 NOISE_PATTERNS —— 含「链接」/「咋办」/ 内嵌 URL 的结构性噪音整句。
 *
 * 与「已解决」区分：忽略用独立的 ignored 列标记，resolved 同步置 TRUE，
 * 这样后台不再反复报警，同时统计上能与「真正映射到 app 的已解决」分开。
 *
 * 用法（在 VPS /var/www/gptoapk 下运行）：
 *   node scripts/ignore-noise-keywords.mjs --dry-run    # 只读预览命中数（默认）
 *   node scripts/ignore-noise-keywords.mjs --apply      # 真正标记
 *   node scripts/ignore-noise-keywords.mjs --revert     # 回滚本脚本标记过的全部行
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

const APPLY = process.argv.includes("--apply");
const REVERT = process.argv.includes("--revert");
const DRY = !APPLY && !REVERT;

// 精确清单：逐条核对过的无意义词（normalized_query 精确匹配）
const NOISE_KEYS = [
  "gptoapk",                       // 非本站 app（噪音，失败 3298）
  "xvideos", "xvideo",             // 成人
  "e hentai", "porn", "1024回家",  // 成人
  "催眠app",                        // 成人
  "googlegaly",                    // 乱拼
  "sex_rp_v2",                     // 垃圾
  "修改水印相机_v2.7.7_vip",        // 带版本后缀，无法精确命中
  "top top",                       // 停用词
  "91破解版",                       // 破解
  "免费接码",                       // 灰产接码
  "btoilt", "neigmo", "osink", "edsng", // 乱拼
  "百事aa",                         // 垃圾
  "spc+", "shutdown",              // 无意义
  "yun.139",                       // 云盘域名片段
  "galgame",                       // 纯品类词，无具体 app
];

// 模式规则（SQL 片段，作用于 normalized_query，命中即为结构性噪音）
const NOISE_PATTERNS = [
  "normalized_query ILIKE '%链接%'",   // 云盘分享文案整句
  "normalized_query ILIKE '%咋办%'",   // 整句求助
  "normalized_query ~ 'https?://'",    // 内嵌 URL
];

const client = new Client({ connectionString: process.env.POSTGRES_URL });
await client.connect();

try {
  // 幂等加列，区分「忽略」与「解决」
  await client.query(
    `ALTER TABLE search_failure_queries ADD COLUMN IF NOT EXISTS ignored BOOLEAN NOT NULL DEFAULT FALSE`,
  );

  if (REVERT) {
    const res = await client.query(
      `UPDATE search_failure_queries
       SET resolved = FALSE, resolved_at = NULL, ignored = FALSE, updated_at = NOW()
       WHERE ignored = TRUE
       RETURNING query_key`,
    );
    console.log(`[ignore] 回滚 ${res.rowCount} 行（恢复为未解决）。`);
  } else {
    const conds = [`normalized_query = ANY($1)`];
    if (NOISE_PATTERNS.length) conds.push(`(${NOISE_PATTERNS.join(" OR ")})`);
    const where = conds.join(" OR ");

    const preview = await client.query(
      `SELECT normalized_query,
              SUM(failure_count)::int AS failure_count,
              COUNT(*)::int AS row_count
       FROM search_failure_queries
       WHERE resolved = FALSE
         AND query_type = 'keyword'
         AND (${where})
       GROUP BY normalized_query
       ORDER BY SUM(failure_count) DESC, normalized_query ASC`,
      [NOISE_KEYS],
    );

    const totalFails = preview.rows.reduce((s, r) => s + r.failure_count, 0);
    console.log(`[ignore] 命中 ${preview.rows.length} 个关键词（累计失败 ${totalFails} 次）：`);
    for (const r of preview.rows) {
      console.log(`  ${String(r.failure_count).padStart(4)}  ${r.normalized_query}`);
    }

    if (APPLY) {
      await client.query("BEGIN");
      try {
        const upd = await client.query(
          `UPDATE search_failure_queries
           SET resolved = TRUE, resolved_at = NOW(), ignored = TRUE, updated_at = NOW()
           WHERE resolved = FALSE
             AND query_type = 'keyword'
             AND (${where})`,
          [NOISE_KEYS],
        );
        await client.query("COMMIT");
        console.log(`\n[ignore] 完成：标记忽略 ${upd.rowCount} 行。`);
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      }
    } else {
      console.log("\n[ignore] 只读预览（未落库）。加 --apply 才会写入，--revert 回滚。");
    }
  }
} finally {
  await client.end();
}
