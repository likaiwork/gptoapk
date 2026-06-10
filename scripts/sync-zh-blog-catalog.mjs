#!/usr/bin/env node
/**
 * Extracts inline zh blog metadata from [slug]/page.tsx into zh-blog-catalog.ts.
 * Module-based posts (posts-2026-*.tsx) are merged in zh-blog-index.ts.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const srcPath = path.join(root, "src/app/zh/blog/[slug]/page.tsx");
const outPath = path.join(root, "src/lib/blog/zh-blog-catalog.ts");

const src = fs.readFileSync(srcPath, "utf8");
const posts = [];
const objRegex =
  /\{\s*slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"[\s\S]*?readTime:\s*"([^"]+)"[\s\S]*?tags:\s*\[([^\]]+)\]/g;

let m;
while ((m = objRegex.exec(src)) !== null) {
  const tags = [...m[6].matchAll(/"([^"]+)"/g)].map((t) => t[1]);
  posts.push({
    slug: m[1],
    title: m[2],
    description: m[3],
    date: m[4],
    readTime: m[5],
    tags,
  });
}

if (posts.length < 40) {
  console.error(`[sync-zh-blog-catalog] Expected 40+ inline posts, got ${posts.length}`);
  process.exit(1);
}

const out = `// Auto-generated — run: node scripts/sync-zh-blog-catalog.mjs
export type ZhBlogCatalogEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
};

export const zhBlogCatalog: ZhBlogCatalogEntry[] = ${JSON.stringify(posts, null, 2)};
`;

fs.writeFileSync(outPath, out);
console.log(`[sync-zh-blog-catalog] Wrote ${posts.length} inline entries → ${outPath}`);
