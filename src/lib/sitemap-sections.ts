import type { MetadataRoute } from "next";
import sitemap from "@/app/sitemap";

export type SitemapSection = "main" | "blog" | "apps" | "locales";

const localePattern = /^\/[a-z]{2}(?:\/|$)/;
const appSlugPattern =
  /(?:chatgpt|telegram|whatsapp|tiktok|twitter|youtube|claude|gemini|deepseek|qwen|kimi|doubao|yuanbao|qianwen|instagram|vpn)-apk$/;

function pathnameOf(entry: MetadataRoute.Sitemap[number]) {
  return new URL(entry.url).pathname;
}

function isBlogEntry(entry: MetadataRoute.Sitemap[number]) {
  return pathnameOf(entry).split("/").includes("blog");
}

function isAppEntry(entry: MetadataRoute.Sitemap[number]) {
  const pathname = pathnameOf(entry);
  const slug = pathname.split("/").filter(Boolean).at(-1) ?? "";

  return (
    appSlugPattern.test(slug) ||
    pathname.endsWith("/ai-apps") ||
    pathname.endsWith("/social-apps") ||
    pathname.includes("/how-to/install-") && slug.endsWith("-apk")
  );
}

function isLocaleUtilityEntry(entry: MetadataRoute.Sitemap[number]) {
  const pathname = pathnameOf(entry);
  const parts = pathname.split("/").filter(Boolean);

  if (!localePattern.test(pathname)) return false;
  if (isBlogEntry(entry) || isAppEntry(entry)) return false;

  return parts.length === 1 || parts.at(-1) === "faq";
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  return sitemap();
}

export function getSitemapSectionEntries(section: SitemapSection): MetadataRoute.Sitemap {
  const entries = getSitemapEntries();

  if (section === "blog") {
    return entries.filter(isBlogEntry);
  }

  if (section === "apps") {
    return entries.filter((entry) => isAppEntry(entry) && !isBlogEntry(entry));
  }

  if (section === "locales") {
    return entries.filter(isLocaleUtilityEntry);
  }

  return entries.filter(
    (entry) => !isBlogEntry(entry) && !isAppEntry(entry) && !isLocaleUtilityEntry(entry),
  );
}
