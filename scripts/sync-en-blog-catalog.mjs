#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const srcPath = path.join(root, "src/app/en/blog/[slug]/page.tsx");
const outPath = path.join(root, "src/lib/blog/en-blog-catalog.ts");

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

if (posts.length < 20) {
  console.error(`[sync-en-blog-catalog] Expected 20+ inline posts, got ${posts.length}`);
  process.exit(1);
}

const out = `// Auto-generated — run: node scripts/sync-en-blog-catalog.mjs
export type EnBlogCatalogEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
};

export const enBlogCatalog: EnBlogCatalogEntry[] = ${JSON.stringify(posts, null, 2)};
`;

fs.writeFileSync(outPath, out);
console.log(`[sync-en-blog-catalog] Wrote ${posts.length} inline entries → ${outPath}`);
