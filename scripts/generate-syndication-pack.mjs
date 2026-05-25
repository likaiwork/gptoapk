#!/usr/bin/env node
/**
 * Build Zhihu/CSDN copy-paste packs from today's draft or queue entry.
 * Usage: node scripts/generate-syndication-pack.mjs [YYYY-MM-DD]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function shanghaiToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function loadTodayFromQueue(date) {
  const raw = fs.readFileSync(path.join(ROOT, "content/queue/2026-Q2.json"), "utf8");
  const queue = JSON.parse(raw);
  return queue.items.find((i) => i.date === date);
}

function findDraft(date, locale, slug) {
  const exact = path.join(ROOT, "content/drafts", `${date}-${locale}-${slug}.md`);
  if (fs.existsSync(exact)) return fs.readFileSync(exact, "utf8");
  const dir = path.join(ROOT, "content/drafts");
  if (!fs.existsSync(dir)) return null;
  const hit = fs.readdirSync(dir).find((f) => f.startsWith(`${date}-`) && f.endsWith(".md"));
  return hit ? fs.readFileSync(path.join(dir, hit), "utf8") : null;
}

function stripMarkdown(md) {
  return md
    .replace(/^---[\s\S]*?---\n/, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

function summarize(md, max = 480) {
  const text = stripMarkdown(md).replace(/\s+/g, " ");
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

const date = process.argv[2] || shanghaiToday();
const item = loadTodayFromQueue(date);
if (!item) {
  console.error(`[syndication] No queue item for ${date}`);
  process.exit(1);
}

const draft = findDraft(date, item.locale, item.slug);
const siteUrl = `https://www.gptoapk.com${item.canonicalPath}`;
const summary = draft ? summarize(draft) : item.title;

const outDir = path.join(ROOT, "content/syndication", item.locale);
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `${date}.md`);

const body = `# 外链分发包 · ${date} · ${item.locale}

> 原文（canonical）：${siteUrl}  
> 你手动发布到：${item.syndication.manual.join("、")}

## 标题备选

1. ${item.title}
2. ${item.title.replace(/2026/g, "").trim()}（完整版）
3. 【教程】${item.keywords[0] || "APK"} 实操指南

## 摘要（复制到知乎/CSDN 开头）

${summary}

…（全文见站内，避免各平台重复全文搬运）

**工具入口：** [gptoapk APK 下载器](https://www.gptoapk.com/zh)

## 文末固定引流

本文首发于 gptoapk.com，使用 APK 下载器可搜索应用名或粘贴 Google Play 链接生成下载入口：  
${siteUrl}

## 标签

${item.keywords.map((k) => `#${k.replace(/\s+/g, "")}`).join(" ")}

## Checklist

- [ ] 知乎专栏（粘贴摘要 + 链接）
- [ ] CSDN（技术向，加代码块可从站内复制）
- [ ] 掘金（二选一，轮换）
`;

fs.writeFileSync(outFile, body);
console.log(`[syndication] Wrote ${outFile}`);

try {
  execSync(`node scripts/content-queue.mjs mark drafted ${date}`, { cwd: ROOT, stdio: "inherit" });
} catch {
  // ignore
}
