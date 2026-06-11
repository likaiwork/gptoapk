#!/usr/bin/env node
/**
 * Submit India/ID APK cluster URLs to IndexNow.
 * Usage: node scripts/indexnow-india-cluster.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(ROOT, "content/seo/india-cluster-urls.json");
const SITE_HOST = process.env.INDEXNOW_HOST || "https://www.gptoapk.com";

function loadUrls() {
  const raw = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const paths = raw.paths ?? [];
  return paths.map((p) => `${SITE_HOST.replace(/\/$/, "")}${p.startsWith("/") ? p : `/${p}`}`);
}

const urls = loadUrls();
console.log(`[indexnow-india] Submitting ${urls.length} cluster URLs…`);

const result = spawnSync("node", ["scripts/indexnow-submit.mjs", ...urls], {
  cwd: ROOT,
  stdio: "inherit",
  env: process.env,
});

process.exit(result.status ?? 1);
