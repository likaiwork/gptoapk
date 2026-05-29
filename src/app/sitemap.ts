import type { MetadataRoute } from "next";
import { SITE_LOCALES } from "@/lib/site-locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.gptoapk.com";

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
    "google-play-not-working-10-fixes-2026",
    "apk-install-failed-error-code-guide",
  ];

  const zhBlogSlugs = [
    "twitter-download-seo-geo-2026",
    "youtube-download-seo-geo-2026",
    "tiktok-download-seo-geo-2026",
    "facebook-download-seo-geo-2026",
    "chatgpt-download-seo-geo-2026",
    "apk-software-game-tv-download-2026",
    "longbridge-securities-guide",
    "longbridge-securities-advanced",
    "how-to-download-apk-from-google-play",
    "apk-downloader-tool-comparison",
    "what-is-an-apk-file",
    "how-to-install-apk-on-android",
    "google-play-link-to-apk-troubleshooting",
    "google-play-link-to-apk-tips",
    "google-play-link-to-apk-step-by-step",
    "google-play-cannot-open-fixes-2026",
    "apk-install-failed-error-codes-guide",
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

  const blogDetailAlternates = (slug: string): Record<string, string> => ({
    en: `${baseUrl}/en/blog/${slug}`,
    zh: `${baseUrl}/zh/blog/${slug}`,
    "x-default": `${baseUrl}/en/blog/${slug}`,
  });

  const russiaAlternates = {
    en: `${baseUrl}/en/russia`,
    zh: `${baseUrl}/zh/russia`,
    "x-default": `${baseUrl}/en/russia`,
  };

  const entries: MetadataRoute.Sitemap = [
    ...(["about", "privacy", "terms", "disclaimer", "dmca", "contact"] as const).map((slug) => ({
      url: `${baseUrl}/${slug}` as const,
      lastModified: new Date(slug === "dmca" ? "2026-05-21" : "2026-05-16"),
      changeFrequency: "monthly" as const,
      priority: 0.5 as const,
    })),
    {
      url: `${baseUrl}/author/gptoapk`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
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
          languages: blogDetailAlternates(slug),
        },
      } : {}),
    })),
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "daily" as const,
      priority: 0.9,
      alternates: { languages: homepageAlternates },
    },
    {
      url: `${baseUrl}/zh/faq`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: { languages: faqAlternates },
    },
    {
      url: `${baseUrl}/zh/blog`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: { languages: blogListAlternates },
    },
    {
      url: `${baseUrl}/zh/ai-apps`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...zhBlogSlugs.map((slug) => ({
      url: `${baseUrl}/zh/blog/${slug}` as const,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "monthly" as const,
      priority: 0.6 as const,
      ...(enBlogSlugs.includes(slug) ? {
        alternates: {
          languages: blogDetailAlternates(slug),
        },
      } : {}),
    })),
    // New route: Russia guide (en/zh)
    {
      url: `${baseUrl}/en/russia`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          ...russiaAlternates,
        },
      },
    },
    {
      url: `${baseUrl}/zh/russia`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: russiaAlternates,
      },
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
    // GEO problem-answer pages (en/how-to)
    ...([
      { slug: "install-chatgpt-without-google-play", priority: 0.75 as const },
      { slug: "chatgpt-not-available-in-my-country", priority: 0.75 as const },
      { slug: "install-apk-without-google-play", priority: 0.75 as const },
      { slug: "google-play-not-working", priority: 0.75 as const },
      { slug: "install-ai-apps-on-huawei", priority: 0.75 as const },
      { slug: "deepseek-apk", priority: 0.7 as const },
      { slug: "qwen-apk", priority: 0.7 as const },
      { slug: "kimi-apk", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/en/how-to/${slug}` as const,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "weekly" as const,
      priority,
    })),
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
    // Turkish (tr) SEO pages — Turkey market
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "youtube-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/tr/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Thai (th) SEO pages — Thailand market
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/th/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Arabic (ar) SEO pages — MENA market
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/ar/${slug}` as const,
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
    // Chinese SEO pages (zh) — Baidu SEO focus
    ...([
      { slug: "huawei-install-google", priority: 0.7 as const },
      { slug: "china-apk-ai-search", priority: 0.85 as const, lastModified: "2026-05-19" },
      { slug: "ai-app-compare", priority: 0.85 as const, lastModified: "2026-05-19" },
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "claude-apk", priority: 0.6 as const },
      { slug: "doubao-apk", priority: 0.7 as const, lastModified: "2026-05-17" },
      { slug: "yuanbao-apk", priority: 0.7 as const, lastModified: "2026-05-17" },
      { slug: "deepseek-apk", priority: 0.7 as const, lastModified: "2026-05-17" },
      { slug: "kimi-apk", priority: 0.7 as const, lastModified: "2026-05-17" },
      { slug: "qianwen-apk", priority: 0.7 as const, lastModified: "2026-05-17" },
      { slug: "google-play-not-working", priority: 0.7 as const },
      { slug: "chatgpt-apk-without-google-play", priority: 0.75 as const, lastModified: "2026-05-17" },
      { slug: "huawei-install-chatgpt", priority: 0.75 as const, lastModified: "2026-05-17" },
      { slug: "google-play-unavailable", priority: 0.75 as const, lastModified: "2026-05-17" },
      { slug: "ai-apps-without-play-store", priority: 0.75 as const, lastModified: "2026-05-17" },
      { slug: "telegram-russia-apk", priority: 0.7 as const, lastModified: "2026-05-17" },
      { slug: "android-apk-safe-install", priority: 0.75 as const, lastModified: "2026-05-17" },
      { slug: "twitter-apk", priority: 0.8 as const, lastModified: "2026-05-29" },
      { slug: "facebook-apk", priority: 0.8 as const, lastModified: "2026-05-29" },
      { slug: "instagram-apk", priority: 0.8 as const, lastModified: "2026-05-19" },
      { slug: "tiktok-apk", priority: 0.8 as const, lastModified: "2026-05-19" },
      { slug: "whatsapp-apk", priority: 0.8 as const, lastModified: "2026-05-19" },
      { slug: "social-apps", priority: 0.85 as const, lastModified: "2026-05-19" },
      { slug: "about", priority: 0.5 as const, lastModified: "2026-05-19" },
      { slug: "editorial-policy", priority: 0.5 as const, lastModified: "2026-05-19" },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "youtube-apk", priority: 0.7 as const },
      { slug: "install-apk-guide", priority: 0.6 as const },
      { slug: "gemini-apk", priority: 0.6 as const },
    ]).map(({ slug, priority, lastModified = "2026-05-14" }) => ({
      url: `${baseUrl}/zh/${slug}` as const,
      lastModified: new Date(lastModified),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Indonesian SEO pages (id)
    ...([
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "vpn-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/id/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Filipino SEO pages (tl)
    ...([
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/tl/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Hindi SEO pages (hi) — India market
    ...([
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
      { slug: "vpn-apk", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/hi/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Urdu SEO pages (ur) — Pakistan market
    ...([
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/ur/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Vietnamese SEO pages (vi) — Vietnam market
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/vi/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Portuguese/Brazil SEO pages (pt)
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/pt/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // French SEO pages (fr) — France, Africa
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/fr/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Japanese SEO pages (ja) — Japan market
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/ja/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // Korean SEO pages (ko) — Korea market
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/ko/${slug}` as const,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly" as const,
      priority,
    })),
    // German SEO pages (de) — Germany market
    ...([
      { slug: "chatgpt-apk", priority: 0.7 as const },
      { slug: "whatsapp-apk", priority: 0.7 as const },
      { slug: "telegram-apk", priority: 0.7 as const },
      { slug: "tiktok-apk", priority: 0.7 as const },
      { slug: "google-play-not-working", priority: 0.7 as const },
    ]).map(({ slug, priority }) => ({
      url: `${baseUrl}/de/${slug}` as const,
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
        alternates: { languages: homepageAlternates },
      },
      {
        url: `${baseUrl}/${locale}/faq` as const,
        lastModified: new Date("2026-05-12"),
        changeFrequency: "monthly" as const,
        priority: 0.6 as const,
        alternates: { languages: faqAlternates },
      },
      {
        url: `${baseUrl}/${locale}/blog` as const,
        lastModified: new Date("2026-05-12"),
        changeFrequency: "monthly" as const,
        priority: 0.6 as const,
        alternates: { languages: blogListAlternates },
      },
    ]),
  ];

  return entries;
}
