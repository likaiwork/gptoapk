import { enBlogCatalog, type EnBlogCatalogEntry } from "@/lib/blog/en-blog-catalog";
import { enSeoGeoPostList } from "@/lib/blog/en-seo-geo-posts";
import { enPosts20260601List } from "@/lib/blog/posts-2026-06-01";
import { enPosts20260602List } from "@/lib/blog/posts-2026-06-02";
import { enPosts20260603List } from "@/lib/blog/posts-2026-06-03";
import { enPosts20260605List } from "@/lib/blog/posts-2026-06-05";
import { enPosts20260606List } from "@/lib/blog/posts-2026-06-06";
import { enPosts20260606Batch2List } from "@/lib/blog/posts-2026-06-06-en-2";
import { enPosts20260608GEOList } from "@/lib/blog/posts-2026-06-08-geo-en";
import { enPosts20260609GEOList } from "@/lib/blog/posts-2026-06-09-geo-en";
import { enPosts20260609SchemaList } from "@/lib/blog/posts-2026-06-09-schema-en";
import { enPosts20260609V4List } from "@/lib/blog/posts-2026-06-09-v4-en";
import { enPosts20260612IndiaList } from "@/lib/blog/posts-2026-06-12-india-en";
import { enPosts20260612ApptekaList } from "@/lib/blog/posts-2026-06-12-appteka-en";
import { enPosts20260618List } from "@/lib/blog/posts-2026-06-18-en";
import { enPosts20260623List } from "@/lib/blog/posts-2026-06-23-en";
import { enPosts20260710List } from "@/lib/blog/posts-2026-07-10-en";

export type EnBlogMeta = EnBlogCatalogEntry;

const MODULE_LISTS: EnBlogMeta[][] = [
  enSeoGeoPostList,
  enPosts20260601List,
  enPosts20260602List,
  enPosts20260603List,
  enPosts20260605List,
  enPosts20260606List,
  enPosts20260606Batch2List,
  enPosts20260608GEOList,
  enPosts20260609GEOList,
  enPosts20260609SchemaList,
  enPosts20260609V4List,
  enPosts20260612IndiaList,
  enPosts20260612ApptekaList,
  enPosts20260618List,
  enPosts20260623List,
  enPosts20260710List,

];
/** Single source of truth for en blog metadata (sitemap, hreflang). */
export function getEnBlogIndex(): EnBlogMeta[] {
  const bySlug = new Map<string, EnBlogMeta>();

  const ingest = (entry: EnBlogMeta) => {
    const prev = bySlug.get(entry.slug);
    if (!prev || entry.date.localeCompare(prev.date) > 0) {
      bySlug.set(entry.slug, entry);
    }
  };

  for (const list of MODULE_LISTS) {
    for (const entry of list) ingest(entry);
  }
  for (const entry of enBlogCatalog) ingest(entry);

  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export function getEnBlogSlugs(): string[] {
  return getEnBlogIndex().map((p) => p.slug);
}

export function getEnBlogBySlug(slug: string): EnBlogMeta | undefined {
  return getEnBlogIndex().find((p) => p.slug === slug);
}

export function isEnGeoBlogPost(post: Pick<EnBlogMeta, "slug" | "tags">): boolean {
  return post.slug.includes("seo-geo") || post.tags.some((t) => t.toUpperCase() === "GEO");
}

export const EN_BLOG_SLUG_SET = new Set(getEnBlogSlugs());
