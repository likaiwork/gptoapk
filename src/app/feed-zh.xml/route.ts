import { siteUrl } from "@/lib/china-seo";

const aiAppPages = [
  { path: "/zh/doubao-apk", title: "豆包 APK 下载安装教程", pkg: "com.larus.nova", dev: "字节跳动" },
  { path: "/zh/yuanbao-apk", title: "腾讯元宝 APK 下载安装教程", pkg: "com.tencent.hunyuan.app.chat", dev: "Tencent" },
  { path: "/zh/deepseek-apk", title: "DeepSeek APK 下载安装教程", pkg: "com.deepseek.chat", dev: "DeepSeek" },
  { path: "/zh/kimi-apk", title: "Kimi APK 下载安装教程", pkg: "com.moonshot.kimichat", dev: "Moonshot AI" },
  { path: "/zh/qianwen-apk", title: "通义千问 APK 下载安装教程", pkg: "ai.qwenlm.chat.android", dev: "Alibaba" },
  { path: "/zh/chatgpt-apk", title: "ChatGPT APK 下载安装教程", pkg: "com.openai.chatgpt", dev: "OpenAI" },
  { path: "/zh/claude-apk", title: "Claude APK 下载安装教程", pkg: "com.anthropic.claude", dev: "Anthropic" },
  { path: "/zh/gemini-apk", title: "Gemini APK 下载安装教程", pkg: "com.google.android.apps.bard", dev: "Google" },
  { path: "/zh/instagram-apk", title: "Instagram APK 下载安装教程", pkg: "com.instagram.android", dev: "Meta" },
  { path: "/zh/tiktok-apk", title: "TikTok APK 下载安装教程", pkg: "com.zhiliaoapp.musically", dev: "字节跳动" },
  { path: "/zh/whatsapp-apk", title: "WhatsApp APK 下载安装教程", pkg: "com.whatsapp", dev: "Meta" },
  { path: "/zh/telegram-apk", title: "Telegram APK 下载安装教程", pkg: "org.telegram.messenger", dev: "Telegram FZ-LLC" },
  { path: "/zh/youtube-apk", title: "YouTube APK 下载安装教程", pkg: "com.google.android.youtube", dev: "Google" },
];

const hubPages = [
  { path: "/zh/china-apk-ai-search", title: "国内安卓 APK 下载与 AI 应用安装指南" },
  { path: "/zh/social-apps", title: "海外社交应用 APK 下载安装指南" },
  { path: "/zh/ai-apps", title: "中文 AI 应用 APK 安装问题汇总" },
  { path: "/zh/ai-app-compare", title: "2026 国内 AI 助手 APK 横评" },
  { path: "/zh/faq", title: "常见问题 FAQ" },
  { path: "/zh/about", title: "关于 gptoapk.com" },
];

const blogPages = [
  { path: "/zh/blog/google-play-cannot-open-fixes-2026", title: "Google Play 打不开/无法连接/进不去？2026 最新解决方法" },
  { path: "/zh/blog/apk-install-failed-error-codes-guide", title: "APK 安装失败错误代码大全：解析错误、无效包、(-11)(-28)(-29)" },
];

function escapeXml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export async function GET() {
  const now = new Date().toUTCString();

  const items = [...blogPages, ...aiAppPages, ...hubPages]
    .map((p) => {
      const url = `${siteUrl}${p.path}`;
      const pkg = ("pkg" in p && "dev" in p) ? ` | 包名：${escapeXml(String(p.pkg))} | 开发者：${escapeXml(String(p.dev))}` : "";
      const title = escapeXml(p.title);
      return `    <item>
      <title>${title}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <description>${title}${pkg}</description>
      <pubDate>Mon, 19 May 2026 08:00:00 GMT</pubDate>
      <category>APK 下载指南</category>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>gptoapk.com — 中文 APK 下载与安装指南</title>
    <link>${escapeXml(siteUrl)}/zh</link>
    <description>gptoapk.com 中文 APK 下载指南更新。覆盖 AI 应用、社交应用、视频应用和安卓安装教程。</description>
    <language>zh-CN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl)}/feed-zh.xml" rel="self" type="application/rss+xml"/>
    <generator>gptoapk.com</generator>
    <ttl>1440</ttl>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
