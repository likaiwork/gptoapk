import type { MetadataRoute } from "next";

type SitemapEntry = MetadataRoute.Sitemap[number];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatLastModified(value: SitemapEntry["lastModified"]) {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString();
  return new Date(value).toISOString();
}

function renderEntry(entry: SitemapEntry) {
  const alternates = entry.alternates?.languages ?? {};
  const alternateLinks = Object.entries(alternates)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .map(
      ([lang, href]) =>
        `<xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`,
    )
    .join("\n");

  const lastModified = formatLastModified(entry.lastModified);

  return [
    "<url>",
    `<loc>${escapeXml(entry.url)}</loc>`,
    alternateLinks,
    lastModified ? `<lastmod>${lastModified}</lastmod>` : "",
    entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : "",
    typeof entry.priority === "number" ? `<priority>${entry.priority}</priority>` : "",
    "</url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export function renderSitemapEntries(entries: MetadataRoute.Sitemap) {
  const hasAlternates = entries.some((entry) => entry.alternates?.languages);
  const namespaces = hasAlternates
    ? ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    : ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset${namespaces}>`,
    entries.map(renderEntry).join("\n"),
    "</urlset>",
  ].join("\n");
}

export function sitemapResponse(entries: MetadataRoute.Sitemap) {
  return new Response(renderSitemapEntries(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
