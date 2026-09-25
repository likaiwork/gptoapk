/**
 * 检查 / 回滚 apkcombo 回填写入的「低置信度」别名映射。
 *
 * 背景：回填脚本对纯非拉丁关键词（中文/日文/韩文等，即 alias_key 不含任何
 * ASCII 字母/数字）是盲信 apkcombo 排序取前 3，误配率高；拉丁关键词有
 * token 打分，准确率高。本脚本可只回滚非拉丁那批，把误配的别名删掉并
 * 恢复对应关键词为「未解决」，让已上线的 apkcombo 实时兜底去服务它们。
 *
 * 用法（在 VPS /var/www/gptoapk 下运行，自动读取 PM2 的 POSTGRES_URL）：
 *   node scripts/backfill-revert-lowconfidence.mjs            # 只读报告，不落库
 *   node scripts/backfill-revert-lowconfidence.mjs --apply    # 真正删除+恢复
 *   node scripts/backfill-revert-lowconfidence.mjs --scope all --apply  # 回滚全部回填
 */

import pg from "pg";
import fs from "node:fs";
import path from "node:path";
const { Client } = pg;

// 若环境里没有 POSTGRES_URL，尝试从 .env.production / .env 读取（Next.js 用的正是 .env.production）
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
function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i === -1 || i + 1 >= process.argv.length ? fallback : process.argv[i + 1];
}
const SCOPE = arg("--scope", "nonlatin");
const SAMPLE = Number(arg("--sample", "80"));

const LABEL = "apkcombo-backfill";
// 低置信度条件：alias_key 不含任何 ASCII 字母或数字（纯中文/日文/韩文等）
const LOWCONF = "alias_key !~ '[A-Za-z0-9]'";

const client = new Client({ connectionString: process.env.POSTGRES_URL });
await client.connect();

try {
  const total = await client.query(
    `SELECT COUNT(*)::int AS n FROM search_alias_overrides WHERE source_label = $1`,
    [LABEL],
  );
  const low = await client.query(
    `SELECT COUNT(*)::int AS n FROM search_alias_overrides WHERE source_label = $1 AND ${LOWCONF}`,
    [LABEL],
  );

  const totalN = total.rows[0].n;
  const lowN = low.rows[0].n;
  const highN = totalN - lowN;

  console.log(`[revert] 回填别名总数: ${totalN}`);
  console.log(`[revert] 拉丁关键词（高置信，保留）: ${highN}`);
  console.log(`[revert] 非拉丁关键词（低置信，${SCOPE === "all" ? "回滚范围含全部" : "回滚范围"}）: ${lowN}`);

  // 抽样展示非拉丁映射，供人工核对
  const where = SCOPE === "all"
    ? `source_label = $1`
    : `source_label = $1 AND ${LOWCONF}`;
  const samples = await client.query(
    `SELECT alias_key, app_ids FROM search_alias_overrides
     WHERE ${where}
     ORDER BY alias_key
     LIMIT $2`,
    [LABEL, SAMPLE],
  );
  console.log(`\n[revert] 抽样 ${samples.rows.length} 条（${SCOPE === "all" ? "全部" : "非拉丁"}）:`);
  for (const r of samples.rows) {
    console.log(`  ${r.alias_key}  =>  ${r.app_ids}`);
  }

  if (!APPLY) {
    console.log("\n[revert] 只读报告（未落库）。加 --apply 才会真正删除并恢复未解决。");
  } else {
    await client.query("BEGIN");
    try {
      const targets = await client.query(
        `SELECT alias_key FROM search_alias_overrides WHERE ${where}`,
        [LABEL],
      );
      const keys = targets.rows.map((r) => r.alias_key);

      const del = await client.query(
        `DELETE FROM search_alias_overrides WHERE ${where}`,
        [LABEL],
      );

      let upd = { rowCount: 0 };
      if (keys.length) {
        upd = await client.query(
          `UPDATE search_failure_queries
           SET resolved = FALSE, resolved_at = NULL, updated_at = NOW()
           WHERE resolved = TRUE AND normalized_query = ANY($1)`,
          [keys],
        );
      }

      await client.query("COMMIT");
      console.log(`\n[revert] 完成：删除别名 ${del.rowCount} 条，恢复未解决 ${upd.rowCount} 条关键词。`);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    }
  }
} finally {
  await client.end();
}
