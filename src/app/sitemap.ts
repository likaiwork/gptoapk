import type { MetadataRoute } from "next";
import { SITE_LOCALES } from "@/lib/site-locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gptoapk.com";

  const enBlogSlugs = [
    "how-to-download-apk-from-google-play",
    "apk-downloader-tool-comparison",
    "what-is-an-apk-file",
    "how-to-install-apk-on-android",
    "google-play-link-to-apk-troubleshooting",
    "google-play-link-to-apk-tips",
    "google-play-link-to-apk-step-by-step",
    "download-apk-from-google-play-on-pc-mac",
    "best-free-apk-downloader-tools-2026-comparison",
    "install-apk-files-samsung-google-pixel-xiaomi",
    "is-downloading-apk-from-google-play-safe",
    "google-play-apk-downloader-not-working-7-fixes",
  ];

  const zhBlogSlugs = [
    "how-to-download-apk-from-google-play",
    "apk-downloader-tool-comparison",
    "what-is-an-apk-file",
    "how-to-install-apk-on-android",
    "google-play-link-to-apk-troubleshooting",
    "google-play-link-to-apk-tips",
    "google-play-link-to-apk-step-by-step",
  ];

  // 检查：除 en/zh 外，其他语言只暴露首页 / FAQ / Blog 列表，blog 详情统一指向 en
  const shellLocales = SITE_LOCALES.filter((l) => l !== "en" && l !== "zh");

  const homepageAlternates: Record<string, string> = Object.fromEntries(
    SITE_LOCALES.map((loc) => [loc, `${baseUrl}/${loc}`]),
  );
  homepageAlternates["x-default"] = `${baseUrl}/en`;

  const faqAlternates: Record<string, string> = Object.fromEntries(
    SITE_LOCALES.map((loc) => [loc, `${baseUrl}/${loc}/faq`]),
  );
  faqAlternates["x-default"] = `${baseUrl}/en/faq`;

  const blogListAlternates: Record<string, string> = Object.fromEntries(
    SITE_LOCALES.map((loc) => [loc, `${baseUrl}/${loc}/blog`]),
  );
  blogListAlternates["x-default"] = `${baseUrl}/en/blog`;

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "daily" as const,
      priority: 1.0,
      alternates: { languages: homepageAlternates },
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: { languages: faqAlternates },
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: { languages: blogListAlternates },
    },
    ...enBlogSlugs.map((slug) => ({
      url: `${baseUrl}/en/blog/${slug}` as const,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "monthly" as const,
      priority: 0.7 as const,
      ...(zhBlogSlugs.includes(slug) ? {
        alternates: {
          languages: {
            zh: `${baseUrl}/zh/blog/${slug}`,
          },
        },
      } : {}),
    })),
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh/faq`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/blog`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...zhBlogSlugs.map((slug) => ({
      url: `${baseUrl}/zh/blog/${slug}` as const,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "monthly" as const,
      priority: 0.6 as const,
    })),
    // New route: Russia guide (en/zh)
    {
      url: `${baseUrl}/en/russia`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          zh: `${baseUrl}/zh/russia`,
          "x-default": `${baseUrl}/en/russia`,
        },
      },
    },
    {
      url: `${baseUrl}/zh/russia`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    // New route: AI Apps hub (en only for now)
    {
      url: `${baseUrl}/en/ai-apps`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // New route: How-to section (en)
    {
      url: `${baseUrl}/en/how-to`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // New route: ChatGPT Install guide detail page (en)
    {
      url: `${baseUrl}/en/how-to/install-chatgpt-apk`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // AI App tutorial pages (en/how-to)
    ...([
      "install-claude-apk",
      "install-gemini-apk",
      "install-deepseek-apk",
      "install-perplexity-apk",
      "install-grok-apk",
    ]).map((slug) => ({
      url: `${baseUrl}/en/how-to/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly" as const,
      priority: 0.7 as const,
    })),
    // Russian SEO pages
    ...([
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "vpn-apk", priority: 0.7 as const },
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "youtube-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
      { slug: "install-apk-without-google-play", priority: 0.7 as const },
      { slug: "claude-apk", priority: 0.6 as const },
      { slug: "gemini-apk", priority: 0.6 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/ru/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Persian (fa) SEO pages — Iran market
    ...([
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "vpn-apk", priority: 0.7 as const },
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "youtube-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "claude-apk", priority: 0.6 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/fa/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...shellLocales.flatMap((locale) => [
      {
        url: `${baseUrl}/${locale}` as const,
        lastModified: new Date("2026-05-12"),
        changeFrequency: "weekly" as const,
        priority: 0.8 as const,
      },
      {
        url: `${baseUrl}/${locale}/faq` as const,
        lastModified: new Date("2026-05-12"),
        changeFrequency: "monthly" as const,
        priority: 0.6 as const,
      },
      {
        url: `${baseUrl}/${locale}/blog` as const,
        lastModified: new Date("2026-05-12"),
        changeFrequency: "monthly" as const,
        priority: 0.6 as const,
      },
    ]),
  ];

  return entries;
}
