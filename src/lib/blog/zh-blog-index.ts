import { zhBlogCatalog, type ZhBlogCatalogEntry } from "@/lib/blog/zh-blog-catalog";
import { zhSeoGeoPostList } from "@/lib/blog/zh-seo-geo-posts";
import { zhPosts20260601List } from "@/lib/blog/posts-2026-06-01";
import { zhPosts20260602ApkList } from "@/lib/blog/posts-2026-06-02-apk";
import { zhPosts20260603List } from "@/lib/blog/posts-2026-06-03";
import { zhPosts20260604List } from "@/lib/blog/posts-2026-06-04";
import { zhPosts20260605List } from "@/lib/blog/posts-2026-06-05";
import { zhPosts20260606List } from "@/lib/blog/posts-2026-06-06-zh";
import { zhPosts20260608GEOList } from "@/lib/blog/posts-2026-06-08-geo-zh";
import { zhPosts20260609GEOList } from "@/lib/blog/posts-2026-06-09-geo-zh";
import { zhPosts20260609SchemaList } from "@/lib/blog/posts-2026-06-09-schema-zh";
import { zhPosts20260609V4List } from "@/lib/blog/posts-2026-06-09-v4-zh";
import { zhPosts20260609List } from "@/lib/blog/posts-2026-06-09-zh";
import { zhPosts20260610List } from "@/lib/blog/posts-2026-06-10-zh";
import { zhPosts20260612ApptekaList } from "@/lib/blog/posts-2026-06-12-appteka-zh";
import { zhPosts20260612VpnList } from "@/lib/blog/posts-2026-06-12-vpn-zh";
import { zhPosts20260618List } from "@/lib/blog/posts-2026-06-18-zh";
import { zhPosts20260623List } from "@/lib/blog/posts-2026-06-23-zh";
import { zhPosts20260629List } from "@/lib/blog/posts-2026-06-29-zh";
import { zhPosts20260702List } from "@/lib/blog/posts-2026-07-02-zh";
import { zhPosts20260710List } from "@/lib/blog/posts-2026-07-10-zh";
import { zhPosts20260713List } from "@/lib/blog/posts-2026-07-13-zh";
import { zhPosts20260716List } from "@/lib/blog/posts-2026-07-16-zh";
import { zhPosts20260717List } from "@/lib/blog/posts-2026-07-17-zh";

export type ZhBlogMeta = ZhBlogCatalogEntry;

const MODULE_LISTS: ZhBlogMeta[][] = [
  zhSeoGeoPostList,
  zhPosts20260601List,
  zhPosts20260602ApkList,
  zhPosts20260603List,
  zhPosts20260604List,
  zhPosts20260605List,
  zhPosts20260606List,
  zhPosts20260608GEOList,
  zhPosts20260609GEOList,
  zhPosts20260609SchemaList,
  zhPosts20260609V4List,
  zhPosts20260609List,
  zhPosts20260610List,
  zhPosts20260612ApptekaList,
  zhPosts20260612VpnList,
  zhPosts20260618List,
  zhPosts20260623List,
  zhPosts20260629List,
  zhPosts20260702List,
  zhPosts20260710List,
  zhPosts20260713List,
  zhPosts20260716List,
  zhPosts20260717List,
];

/** Single source of truth for zh blog metadata (sitemap, hubs, related posts). */
export function getZhBlogIndex(): ZhBlogMeta[] {
  const bySlug = new Map<string, ZhBlogMeta>();

  const ingest = (entry: ZhBlogMeta) => {
    const prev = bySlug.get(entry.slug);
    if (!prev || entry.date.localeCompare(prev.date) > 0) {
      bySlug.set(entry.slug, entry);
    }
  };

  for (const list of MODULE_LISTS) {
    for (const entry of list) ingest(entry);
  }
  for (const entry of zhBlogCatalog) ingest(entry);

  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export function getZhBlogSlugs(): string[] {
  return getZhBlogIndex().map((p) => p.slug);
}

/** For client components (language switcher). */
export const ZH_BLOG_SLUG_SET = new Set(
  (() => {
    const bySlug = new Map<string, ZhBlogMeta>();
    const ingest = (entry: ZhBlogMeta) => {
      const prev = bySlug.get(entry.slug);
      if (!prev || entry.date.localeCompare(prev.date) > 0) bySlug.set(entry.slug, entry);
    };
    for (const list of MODULE_LISTS) for (const entry of list) ingest(entry);
    for (const entry of zhBlogCatalog) ingest(entry);
    return [...bySlug.keys()];
  })(),
);

export function getZhBlogBySlug(slug: string): ZhBlogMeta | undefined {
  return getZhBlogIndex().find((p) => p.slug === slug);
}

export function isZhGeoBlogPost(post: Pick<ZhBlogMeta, "slug" | "tags">): boolean {
  return post.slug.includes("seo-geo") || post.tags.some((t) => t.toUpperCase() === "GEO");
}

export function getZhGeoBlogPosts(): ZhBlogMeta[] {
  return getZhBlogIndex().filter(isZhGeoBlogPost);
}

export type ZhBlogTopicCluster = {
  id: string;
  title: string;
  description: string;
  hubHref?: string;
  slugs: string[];
};

/** Topical clusters for hub pages, blog index, and internal linking. */
export const ZH_BLOG_TOPIC_CLUSTERS: ZhBlogTopicCluster[] = [
  {
    id: "apk-format",
    title: "APK 格式与安全",
    description: "APK/AAB/XAPK 区别、签名验证、安全下载",
    hubHref: "/zh/china-apk-ai-search",
    slugs: [
      "apk-vs-aab-explained-zh",
      "apk-vs-aab-seo-geo-2026",
      "apk-vs-aab-complete-comparison",
      "apk-signature-verify-practical",
      "apk-signature-verify-seo-geo-2026",
      "apk-download-security-seo-geo-2026",
      "xapk-apks-apkm-install-guide-2026",
      "vpn-apk-risk-notice-zh",
    ],
  },
  {
    id: "install-errors",
    title: "安装故障排查",
    description: "安装失败、解析错误、Play 打不开",
    hubHref: "/zh/google-play-not-working",
    slugs: [
      "apk-install-errors-seo-geo-2026",
      "apk-install-error-codes-2026",
      "android-apk-install-error-fix-2026",
      "google-play-not-opening-fix",
      "google-play-compatibility-seo-geo-2026",
    ],
  },
  {
    id: "social-apps",
    title: "海外社交应用",
    description: "Telegram、TikTok、WhatsApp 等下载 GEO",
    hubHref: "/zh/social-apps",
    slugs: [
      "telegram-download-seo-geo-2026",
      "tiktok-download-seo-geo-2026",
      "whatsapp-download-seo-geo-2026",
      "instagram-download-seo-geo-2026",
      "social-apk-safe-install-2026",
    ],
  },
  {
    id: "broker",
    title: "券商 APP",
    description: "老虎、富途、长桥等同花顺包名",
    hubHref: "/zh/broker-apps",
    slugs: [
      "china-broker-apk-seo-geo-2026",
      "longbridge-download-seo-geo-2026",
      "tiger-futu-longbridge-broker-seo-geo-2026",
      "ibkr-broker-seo-geo-2026",
    ],
  },
  {
    id: "huawei-gms",
    title: "华为 / 无 GMS",
    description: "无 Play 商店安装海外应用",
    hubHref: "/zh/huawei-install-google",
    slugs: [
      "install-telegram-without-gms",
      "tiktok-apk-china-install",
      "chatgpt-download-seo-geo-2026",
    ],
  },
];

export function getRelatedZhBlogPosts(
  slug: string,
  tags: string[] = [],
  limit = 4,
): ZhBlogMeta[] {
  const index = getZhBlogIndex();
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  const cluster = ZH_BLOG_TOPIC_CLUSTERS.find((c) => c.slugs.includes(slug));
  const clusterSlugs = new Set(cluster?.slugs.filter((s) => s !== slug) ?? []);

  const scored = index
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (clusterSlugs.has(p.slug)) score += 10;
      for (const t of p.tags) {
        if (tagSet.has(t.toLowerCase())) score += 2;
      }
      if (isZhGeoBlogPost(p) && isZhGeoBlogPost({ slug, tags })) score += 1;
      return { post: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date));

  if (scored.length >= limit) {
    return scored.slice(0, limit).map((x) => x.post);
  }

  return index.filter((p) => p.slug !== slug).slice(0, limit);
}
