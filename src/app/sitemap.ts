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

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "daily" as const,
      priority: 1.0,
      alternates: {
        languages: {
          zh: `${baseUrl}/zh`,
        },
      },
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          zh: `${baseUrl}/zh/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          zh: `${baseUrl}/zh/blog`,
        },
      },
    },
    ...enBlogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}` as const,
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
    // zh-specific pages
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh/faq`,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/blog`,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...zhBlogSlugs.map((slug) => ({
      url: `${baseUrl}/zh/blog/${slug}` as const,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "monthly" as const,
      priority: 0.6 as const,
    })),
  ];

  return entries;
}
