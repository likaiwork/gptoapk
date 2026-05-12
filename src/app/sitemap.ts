import type { MetadataRoute } from "next";

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
  const shellLocales = ["ja", "pt", "es", "ru", "id", "hi"] as const;

  const homepageAlternates: Record<string, string> = {
    en: `${baseUrl}/en`,
    zh: `${baseUrl}/zh`,
    ja: `${baseUrl}/ja`,
    pt: `${baseUrl}/pt`,
    es: `${baseUrl}/es`,
    ru: `${baseUrl}/ru`,
    id: `${baseUrl}/id`,
    hi: `${baseUrl}/hi`,
    "x-default": `${baseUrl}/en`,
  };

  const faqAlternates: Record<string, string> = {
    en: `${baseUrl}/en/faq`,
    zh: `${baseUrl}/zh/faq`,
    ja: `${baseUrl}/ja/faq`,
    pt: `${baseUrl}/pt/faq`,
    es: `${baseUrl}/es/faq`,
    ru: `${baseUrl}/ru/faq`,
    id: `${baseUrl}/id/faq`,
    hi: `${baseUrl}/hi/faq`,
    "x-default": `${baseUrl}/en/faq`,
  };

  const blogListAlternates: Record<string, string> = {
    en: `${baseUrl}/en/blog`,
    zh: `${baseUrl}/zh/blog`,
    ja: `${baseUrl}/ja/blog`,
    pt: `${baseUrl}/pt/blog`,
    es: `${baseUrl}/es/blog`,
    ru: `${baseUrl}/ru/blog`,
    id: `${baseUrl}/id/blog`,
    hi: `${baseUrl}/hi/blog`,
    "x-default": `${baseUrl}/en/blog`,
  };

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
