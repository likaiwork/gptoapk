export interface SeoUrlEntry {
  path: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}

export const siteUrl = "https://gptoapk.com";

export const chinaCoreSeoUrls: SeoUrlEntry[] = [
  { path: "/zh", lastModified: "2026-05-19", changeFrequency: "daily", priority: 1 },
  { path: "/zh/ai-apps", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.9 },
  { path: "/zh/china-apk-ai-search", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.9 },
  { path: "/zh/install-apk-guide", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.75 },
  { path: "/zh/google-play-not-working", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.75 },
  { path: "/zh/huawei-install-google", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.75 },
];

export const chinaAiAppSeoUrls: SeoUrlEntry[] = [
  { path: "/zh/doubao-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.85 },
  { path: "/zh/yuanbao-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.85 },
  { path: "/zh/deepseek-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.85 },
  { path: "/zh/kimi-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.85 },
  { path: "/zh/qianwen-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.85 },
  { path: "/zh/chatgpt-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.8 },
  { path: "/zh/claude-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.7 },
  { path: "/zh/gemini-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.7 },
];

export const chinaProblemSeoUrls: SeoUrlEntry[] = [
  { path: "/zh/chatgpt-apk-without-google-play", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.8 },
  { path: "/zh/huawei-install-chatgpt", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.8 },
  { path: "/zh/google-play-unavailable", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.8 },
  { path: "/zh/ai-apps-without-play-store", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.8 },
  { path: "/zh/android-apk-safe-install", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.8 },
  { path: "/zh/telegram-russia-apk", lastModified: "2026-05-19", changeFrequency: "weekly", priority: 0.7 },
];

export const chinaSeoUrls: SeoUrlEntry[] = [
  ...chinaCoreSeoUrls,
  ...chinaAiAppSeoUrls,
  ...chinaProblemSeoUrls,
];

export const chinaAiSitemapUrls: SeoUrlEntry[] = [
  chinaCoreSeoUrls[1],
  chinaCoreSeoUrls[2],
  ...chinaAiAppSeoUrls,
  ...chinaProblemSeoUrls,
].filter(Boolean);

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export function renderSitemapXml(entries: SeoUrlEntry[]) {
  const urls = entries
    .map((entry) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>`,
        `    <lastmod>${entry.lastModified}</lastmod>`,
        `    <changefreq>${entry.changeFrequency}</changefreq>`,
        `    <priority>${entry.priority.toFixed(2)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}
