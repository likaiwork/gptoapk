#!/usr/bin/env node
/**
 * Print Phase 4 weekly SEO ops checklist (GSC keywords, GA4 events, admin failures).
 * Usage: node scripts/phase4-weekly-checklist.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(ROOT, "content/seo/india-cluster-urls.json");

const GSC_QUERIES = [
  "minecraft apk download",
  "minecraft patch download",
  "capcut apk download",
  "cocobox apk",
  "whatsapp apk download india",
  "instagram apk download",
  "pubg mobile apk",
  "free fire apk",
];

const GA4_EVENTS = [
  "download_click (param: app_id, path)",
  "play_store_click (param: app_id, landing_slug, locale)",
  "search_submit",
  "parse_failed",
];

function shanghaiToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const host = "https://www.gptoapk.com";

console.log(`
# Phase 4 weekly checklist · ${shanghaiToday()}

## IndexNow (after deploy)
  npm run indexnow:india

## GSC — Search Console → Performance → Queries (filter: India / hi pages)
${GSC_QUERIES.map((q) => `  - [ ] ${q}`).join("\n")}

## GA4 — Events (last 7 days, filter path /hi/*-apk)
${GA4_EVENTS.map((e) => `  - [ ] ${e}`).join("\n")}
  - [ ] play_store_click / download_click ratio on landing pages (target: download > 5% of CTA clicks where APK available)

## Admin — unresolved search failures (India locale)
  - [ ] /admin → Search failures → filter IN / hi queries → add alias or landing fallback
  - [ ] npm run repair-admin (if download failures spiked)

## Cluster URLs indexed (${manifest.paths.length})
${manifest.paths.map((p) => `  ${host}${p}`).join("\n")}

## Docs
  content/seo/phase4-monitoring-2026.md
  content/seo/appteka-compete-plan-2026.md
`);
