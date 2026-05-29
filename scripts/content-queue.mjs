#!/usr/bin/env node
/**
 * Content queue utilities for daily reminders and agent workflows.
 * Usage:
 *   node scripts/content-queue.mjs today
 *   node scripts/content-queue.mjs reminder
 *   node scripts/content-queue.mjs mark published 2026-05-25
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const QUEUE_PATH = path.join(ROOT, "content/queue/2026-Q2.json");
const STATUS_PATH = path.join(ROOT, "content/queue/status.json");
const TZ = "Asia/Shanghai";

const ZH_TOPICS = [
  ["google-play-not-open-2026", "Google Play 打不开/无法连接？2026 华为小米通用解法", ["Google Play 打不开", "华为", "小米", "APK"]],
  ["chatgpt-apk-without-play-store", "ChatGPT APK 无法从 Google Play 下载怎么办（2026）", ["ChatGPT APK", "Google Play", "安装"]],
  ["apk-install-error-codes-2026", "APK 安装失败错误代码大全：解析错误与 INSTALL_FAILED", ["APK 安装失败", "解析错误", "安卓"]],
  ["china-ai-apk-package-names", "豆包/元宝/DeepSeek/Kimi/通义千问 APK 包名核对指南", ["豆包", "DeepSeek", "APK 包名"]],
  ["social-apk-safe-install-2026", "Instagram/TikTok/WhatsApp/Telegram APK 安全安装清单", ["TikTok APK", "WhatsApp", "安全"]],
  ["install-telegram-without-gms", "无 GMS 安卓手机安装 Telegram 完整步骤", ["Telegram APK", "无 GMS", "华为"]],
  ["tiktok-apk-china-install", "TikTok APK 国内安卓安装与更新指南 2026", ["TikTok APK", "下载", "安装"]],
  ["claude-apk-install-guide-zh", "Claude APK 安卓安装教程与常见问题", ["Claude APK", "安装教程"]],
  ["apk-signature-verify-practical", "如何验证 APK 签名：防止下载到假包", ["APK 签名", "安全"]],
  ["gptoapk-how-to-use", "gptoapk 使用教程：从 Play 链接到 APK 下载", ["gptoapk", "APK 下载器"]],
  ["xiaomi-sideload-settings", "小米手机允许安装未知应用与侧载设置", ["小米", "侧载", "APK"]],
  ["huawei-overseas-ai-apps", "华为手机安装海外 AI 应用（ChatGPT/Gemini）", ["华为", "ChatGPT", "APK"]],
  ["apk-vs-aab-explained-zh", "APK 和 AAB 有什么区别？普通用户该下哪种", ["APK", "AAB", "Android"]],
  ["extract-apk-from-play-link", "从 Google Play 分享链接提取 APK 的步骤", ["Google Play", "APK 提取"]],
  ["vpn-apk-risk-notice-zh", "VPN 类 APK 下载风险提示与合规说明", ["VPN APK", "安全"]],
  ["china-ai-assistant-compare-2026", "2026 国内 AI 助手 APK 横评：豆包 vs 元宝 vs DeepSeek", ["AI 助手", "APK 对比"]],
  ["instagram-apk-install-zh", "Instagram APK 安装与无法登录排查", ["Instagram APK"]],
  ["whatsapp-apk-update-failed", "WhatsApp APK 更新失败/无法安装的解决办法", ["WhatsApp APK"]],
  ["clear-play-cache-not-working", "清理 Google Play 缓存无效时还能怎么做", ["Google Play", "故障"]],
  ["fake-apk-how-to-spot", "如何识别假 APK：签名、包名与来源核对", ["假 APK", "安全"]],
];

const EN_TOPICS = [
  ["chatgpt-apk-without-google-play", "How to Install ChatGPT APK Without Google Play (2026)", ["ChatGPT APK", "Google Play"]],
  ["apk-parse-error-fix-2026", "APK Parse Error Fix: There Was a Problem Parsing the Package", ["APK parse error", "Android"]],
  ["telegram-apk-safe-install", "Install Telegram APK on Android: Safe Step-by-Step Guide", ["Telegram APK"]],
  ["tiktok-apk-download-guide-en", "TikTok APK Download Guide for Android (2026)", ["TikTok APK"]],
  ["unknown-sources-samsung-xiaomi", "Enable Unknown Sources on Samsung and Xiaomi", ["unknown sources", "APK"]],
  ["best-apk-downloader-tools-2026", "Best APK Downloader Tools Compared (2026)", ["APK downloader"]],
  ["verify-apk-signature-guide", "How to Verify APK Signature Before Installing", ["APK signature"]],
  ["transfer-apk-phone-to-pc", "Transfer APK Files from Phone to PC (2026)", ["transfer APK"]],
  ["gemini-apk-install-without-play", "Install Gemini APK Without Google Play Store", ["Gemini APK"]],
  ["claude-apk-android-install", "Claude APK for Android: Download and Install Guide", ["Claude APK"]],
  ["whatsapp-apk-update-android", "WhatsApp APK Update Failed? 7 Fixes That Work", ["WhatsApp APK"]],
  ["youtube-apk-region-restrictions", "YouTube APK When Google Play Is Limited in Your Region", ["YouTube APK"]],
  ["instagram-apk-install-troubleshoot", "Instagram APK Install Troubleshooting on Android", ["Instagram APK"]],
  ["install-apk-samsung-guide", "How to Install APK Files on Samsung Galaxy", ["Samsung", "APK"]],
  ["google-play-not-working-fixes", "Google Play Not Working? 7 Fixes Before Using APK", ["Google Play"]],
  ["apk-obb-games-install", "How to Install APK with OBB Files for Large Games", ["APK OBB"]],
  ["old-apk-version-download", "How to Download Older APK Versions Safely", ["old APK"]],
  ["apkmirror-alternatives-safe", "Safe APKMirror Alternatives in 2026", ["APKMirror"]],
];

function shanghaiDateString(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function buildQueueItems() {
  const start = new Date("2026-05-25T12:00:00+08:00");
  const items = [];
  let zhIdx = 0;
  let enIdx = 0;

  for (let d = 0; d < 90; d++) {
    const day = new Date(start);
    day.setDate(start.getDate() + d);
    const date = shanghaiDateString(day);
    const dow = day.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const locale = isWeekend ? "en" : "zh";
    const pool = isWeekend ? EN_TOPICS : ZH_TOPICS;
    const idx = isWeekend ? enIdx++ % EN_TOPICS.length : zhIdx++ % ZH_TOPICS.length;
    const [slug, title, keywords] = pool[idx];

    items.push({
      date,
      locale,
      slug,
      title,
      keywords,
      syndication: {
        auto: locale === "zh"
          ? ["indexnow", "baidu"]
          : ["indexnow", "blogger", "substack", "tumblr"],
        manual: locale === "zh" ? ["zhihu", "csdn", "juejin"] : ["linkedin"],
      },
      canonicalPath: `/${locale}/blog/${slug}`,
      status: "pending",
    });
  }

  return items;
}

function loadQueue() {
  if (!fs.existsSync(QUEUE_PATH)) {
    const queue = {
      version: 1,
      timezone: TZ,
      collaboration: ["A", "B"],
      startDate: "2026-05-25",
      endDate: "2026-08-22",
      items: buildQueueItems(),
    };
    fs.mkdirSync(path.dirname(QUEUE_PATH), { recursive: true });
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
  }
  return JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
}

function loadStatus() {
  if (!fs.existsSync(STATUS_PATH)) {
    fs.writeFileSync(STATUS_PATH, JSON.stringify({ updatedAt: null, byDate: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(STATUS_PATH, "utf8"));
}

function saveStatus(status) {
  status.updatedAt = new Date().toISOString();
  fs.writeFileSync(STATUS_PATH, JSON.stringify(status, null, 2));
}

function getTodayItem(queue, dateStr = shanghaiDateString()) {
  return queue.items.find((item) => item.date === dateStr) ?? null;
}

function mergeStatus(item, status) {
  const s = status.byDate[item.date];
  if (s) return { ...item, status: s.status, note: s.note, publishedUrl: s.publishedUrl };
  return item;
}

function formatReminder(item) {
  const site = "https://www.gptoapk.com";
  const auto = item.syndication.auto.map((x) => `- [ ] 自动：${x}`).join("\n");
  const manual = item.syndication.manual.map((x) => `- [ ] 你发：${x}`).join("\n");
  return `## 📅 ${item.date} · ${item.locale.toUpperCase()}

**标题：** ${item.title}

**Slug：** \`${item.slug}\`

**关键词：** ${item.keywords.join(", ")}

**站内路径：** ${site}${item.canonicalPath}

**状态：** ${item.status}

### Agent（方式 A · 建议自动执行）

在 Cursor 说：\`写今天的\`、\`写今天的 ${item.locale}\` 或 \`发今天的\`

> 每日 **北京时间 09:00** 本 Issue 自动创建。Agent 应完成：母版 → 入站博客 → 外链包 → 短视频脚本 → push（commit 可含 \`[syndicate]\`）。

### 待办

- [ ] 母版：\`content/drafts/${item.date}-${item.locale}-${item.slug}.md\`
- [ ] 入站博客并 push
${auto}
${manual}
- [ ] 短视频：\`content/video-scripts/${item.date}-${item.slug}.md\`
- [ ] 国内草稿：\`content/syndication/${item.locale}/${item.date}.md\`（zh 时生成）
- [ ] 更新 \`public/llms.txt\`（如有新 GEO 页）

### 完成后

\`\`\`bash
node scripts/content-queue.mjs mark published ${item.date}
\`\`\`
`;
}

const cmd = process.argv[2];

if (cmd === "init") {
  loadQueue();
  console.log(`[queue] Wrote ${QUEUE_PATH}`);
  process.exit(0);
}

const queue = loadQueue();
const status = loadStatus();
const today = shanghaiDateString();
const todayItem = getTodayItem(queue, today);

if (!todayItem) {
  console.error(`[queue] No item for ${today}`);
  process.exit(1);
}

const merged = mergeStatus(todayItem, status);

if (cmd === "today") {
  console.log(JSON.stringify(merged, null, 2));
  process.exit(0);
}

if (cmd === "reminder") {
  console.log(formatReminder(merged));
  process.exit(0);
}

if (cmd === "mark") {
  const state = process.argv[3] || "published";
  const date = process.argv[4] || today;
  const itemForDate = queue.items.find((i) => i.date === date);
  status.byDate[date] = {
    status: state,
    note: process.argv[5] || "",
    publishedUrl:
      process.argv[6] ||
      (itemForDate ? `https://www.gptoapk.com${itemForDate.canonicalPath}` : ""),
    at: new Date().toISOString(),
  };
  saveStatus(status);
  console.log(`[queue] ${date} → ${state}`);
  process.exit(0);
}

console.log(`Usage:
  node scripts/content-queue.mjs init
  node scripts/content-queue.mjs today
  node scripts/content-queue.mjs reminder
  node scripts/content-queue.mjs mark published [date]`);
process.exit(1);
