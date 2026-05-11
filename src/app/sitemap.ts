import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gptoapk.com";

  const blogPosts = [
    "how-to-download-apk-from-google-play",
    "apk-downloader-tool-comparison",
    "what-is-an-apk-file",
    "how-to-install-apk-on-android",
  ];

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date("2026-05-11"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return staticPages;
}
