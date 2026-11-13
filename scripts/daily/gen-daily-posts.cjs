#!/usr/bin/env node
/**
 * Daily SEO batch generator for gptoapk.com
 *
 *   node scripts/daily/gen-daily-posts.cjs [path/to/manifest.json]
 *
 * Reads a manifest describing N groups of {zh, en} markdown articles,
 * generates posts-<date><key>-<lang>.tsx modules, and idempotently
 * registers them in the five places the blog needs. Safe to re-run.
 *
 * Source markdown lives in SEO_DIR (default ~/.openclaw/workspace/seo-articles).
 * Each markdown file should start with front matter containing at least
 * `description`, and have a single H1 as the article title.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const SEO = process.env.SEO_DIR || "/Users/likai/.openclaw/workspace/seo-articles";
const OUT = path.join(ROOT, "src", "lib", "blog");
const MANIFEST = process.argv[2] || path.join(__dirname, "manifest.json");

const cfg = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
if (!cfg.date || !Array.isArray(cfg.groups) || cfg.groups.length === 0) {
  console.error("Invalid manifest: expected { date: YYYY-MM-DD, groups: [...] }");
  process.exit(1);
}

/* ---------------------------------------------------------------- markdown */
const enc = (s) =>
  s
    .replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const HOMEPAGE = { zh: "/zh", en: "/en" };

function inline(text, lang) {
  const parts = [];
  let rest = text;
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`|\[\[([^\]]+)\]\]|\[([^\]]+)\]\(([^)]+)\))/;
  let m;
  while ((m = rest.match(re))) {
    const idx = m.index;
    if (idx > 0) parts.push(enc(rest.slice(0, idx)));
    if (m[2] !== undefined) parts.push(`<strong>${enc(m[2])}</strong>`);
    else if (m[3] !== undefined)
      parts.push(
        `<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">${enc(m[3])}</code>`
      );
    else if (m[4] !== undefined)
      parts.push(
        `<Link href="${HOMEPAGE[lang]}" className="text-blue-600 dark:text-blue-400 hover:underline">${enc(m[4])}</Link>`
      );
    else if (m[5] !== undefined) {
      const href = m[6];
      const label = m[5];
      parts.push(
        /^https?:\/\//.test(href)
          ? `<a href="${href}" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">${enc(label)}</a>`
          : `<Link href="${href}" className="text-blue-600 dark:text-blue-400 hover:underline">${enc(label)}</Link>`
      );
    }
    rest = rest.slice(idx + m[0].length);
  }
  if (rest) parts.push(enc(rest));
  return parts.join("");
}

function convert(md, lang) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  let listType = null;
  let inCode = false;
  let codeBuf = [];

  const closeList = () => {
    if (listType) {
      out.push(`      </${listType}>`);
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (inCode) {
      if (/^```/.test(line.trim())) {
        out.push(
          `      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{${JSON.stringify(
            codeBuf.join("\n")
          )}}</code></pre>`
        );
        inCode = false;
        codeBuf = [];
      } else codeBuf.push(line);
      i++;
      continue;
    }

    if (/^```/.test(line.trim())) {
      closeList();
      inCode = true;
      i++;
      continue;
    }

    if (!line.trim()) {
      closeList();
      i++;
      continue;
    }

    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      closeList();
      const tag = `h${Math.min(h[1].length, 3)}`;
      out.push(`      <${tag}>${inline(h[2], lang)}</${tag}>`);
      i++;
      continue;
    }

    if (/^\|/.test(line.trim())) {
      closeList();
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i].trim())) {
        rows.push(lines[i].trim());
        i++;
      }
      const cells = (r) =>
        r.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
      const header = cells(rows[0]);
      const body = rows
        .slice(1)
        .filter((r) => !/^\|[\s\-:|]+\|$/.test(r))
        .map(cells);
      out.push(`      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">`);
      out.push(
        `        <thead><tr>${header
          .map(
            (c) =>
              `<th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">${inline(c, lang)}</th>`
          )
          .join("")}</tr></thead>`
      );
      out.push(
        `        <tbody>${body
          .map(
            (r) =>
              `<tr>${r
                .map(
                  (c) =>
                    `<td className="border border-gray-200 dark:border-gray-700 px-3 py-2">${inline(c, lang)}</td>`
                )
                .join("")}</tr>`
          )
          .join("")}</tbody>`
      );
      out.push(`      </table></div>`);
      continue;
    }

    const cb = line.match(/^-\s+\[[ x]\]\s+(.*)$/);
    if (cb) {
      if (listType !== "ul") {
        closeList();
        out.push(`      <ul className="list-disc pl-6 space-y-1">`);
        listType = "ul";
      }
      out.push(`        <li>${inline(cb[1], lang)}</li>`);
      i++;
      continue;
    }

    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) {
      if (listType !== "ul") {
        closeList();
        out.push(`      <ul className="list-disc pl-6 space-y-1">`);
        listType = "ul";
      }
      out.push(`        <li>${inline(ul[1], lang)}</li>`);
      i++;
      continue;
    }

    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      if (listType !== "ol") {
        closeList();
        out.push(`      <ol className="list-decimal pl-6 space-y-1">`);
        listType = "ol";
      }
      out.push(`        <li>${inline(ol[1], lang)}</li>`);
      i++;
      continue;
    }

    closeList();
    out.push(`      <p>${inline(line.trim(), lang)}</p>`);
    i++;
  }
  if (inCode && codeBuf.length)
    out.push(
      `      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{${JSON.stringify(
        codeBuf.join("\n")
      )}}</code></pre>`
    );
  closeList();
  return out.join("\n");
}

function parse(file) {
  let raw = fs.readFileSync(file, "utf8");
  let fm = {};
  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    const head = raw.slice(3, end);
    raw = raw.slice(end + 4).replace(/^\s*\n/, "");
    for (const l of head.split("\n")) {
      const m = l.match(/^(\w+):\s*(.*)$/);
      if (!m) continue;
      let v = m[2].trim();
      if (/^".*"$/.test(v)) v = v.slice(1, -1);
      fm[m[1]] = v;
    }
  }
  const titleLine = raw.match(/^#\s+(.+)$/m);
  const title = titleLine ? titleLine[1].trim() : fm.title;
  const body = titleLine ? raw.replace(/^#\s+.+\n/, "") : raw;
  let desc = fm.description || "";
  if (!desc) {
    const para = body
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .find((s) => s && !s.startsWith("#") && !s.startsWith("```") && !s.startsWith("|"));
    if (para) {
      desc = para
        .replace(/\*\*/g, "")
        .replace(/`/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
      if (desc.length > 155) {
        const cut = desc.slice(0, 155);
        desc = cut.slice(0, Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("，"), 100)) + "。";
      }
    }
  }
  return { fm, title, body, desc };
}

function readMins(body) {
  const text = body.replace(/```[\s\S]*?```/g, "");
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const words = (text.replace(/[\u4e00-\u9fff]/g, " ").match(/\b\w+\b/g) || []).length;
  return `${Math.max(5, Math.round((words + cjk / 1.6) / 200))} min read`;
}

const HEADER = `import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
  faqs?: BlogFaqItem[];
};

const toList = (posts: BlogPostEntry[]) =>
  posts.map(({ slug, title, description, date, readTime, tags }) => ({
    slug,
    title,
    description,
    date,
    readTime,
    tags,
  }));
`;

/* --------------------------------------------------------------- generate */
const dateCompact = cfg.date.replace(/-/g, "");
const modules = [];

for (const group of cfg.groups) {
  const key = String(group.key || "").toLowerCase();
  if (!/^[a-z]$/.test(key)) {
    console.error(`Invalid group key: ${key} (expected single letter a-z)`);
    process.exit(1);
  }
  for (const lang of ["zh", "en"]) {
    const c = group[lang];
    if (!c || !c.file || !c.slug) {
      console.error(`Missing ${lang} config in group ${key}`);
      process.exit(1);
    }
    const src = path.join(SEO, c.file);
    if (!fs.existsSync(src)) {
      console.error(`Missing markdown: ${src}`);
      process.exit(1);
    }
    const { title, body, desc } = parse(src);
    const jsx = convert(body, lang);
    const varName = `${lang}Posts${dateCompact}${key.toUpperCase()}`;
    const moduleName = `posts-${cfg.date}${key}-${lang}`;
    const out = `${HEADER}
const ARTICLE = (
  <>
${jsx}
  </>
);

export const ${varName} = [
  {
    slug: ${JSON.stringify(c.slug)},
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(desc)},
    date: ${JSON.stringify(cfg.date)},
    readTime: ${JSON.stringify(readMins(body))},
    tags: ${JSON.stringify(c.tags || [])},
    content: ARTICLE,
  },
];

export const ${varName}List = toList(${varName});
`;
    fs.writeFileSync(path.join(OUT, `${moduleName}.tsx`), out);
    modules.push({ lang, key, moduleName, varName, slug: c.slug, title });
    console.log(`[gen] ${moduleName}.tsx  ${title}`);
  }
}

/* ------------------------------------------------------------- registries */
const TARGETS = [
  {
    file: "src/app/blog/page.tsx",
    anchor: "const posts: BlogPost[] = [",
    langs: ["zh", "en"],
    suffix: "List",
  },
  {
    file: "src/lib/blog/zh-blog-index.ts",
    anchor: "const MODULE_LISTS: ZhBlogMeta[][] = [",
    langs: ["zh"],
    suffix: "List",
    // MODULE_LISTS is an array OF arrays — elements are list references, not spreads.
    spread: false,
  },
  {
    file: "src/lib/blog/en-blog-index.ts",
    anchor: "const MODULE_LISTS: EnBlogMeta[][] = [",
    langs: ["en"],
    suffix: "List",
    spread: false,
  },
  {
    file: "src/app/zh/blog/[slug]/page.tsx",
    anchor: "const zhPosts: BlogPost[] = [",
    langs: ["zh"],
    suffix: "",
  },
  {
    file: "src/app/en/blog/[slug]/page.tsx",
    anchor: "const posts: BlogPost[] = [",
    langs: ["en"],
    suffix: "",
  },
];

const IMPORT_RE = /^import .* from "@\/lib\/blog\/posts-[^"]+";/gm;

for (const target of TARGETS) {
  const file = path.join(ROOT, target.file);
  let content = fs.readFileSync(file, "utf8");
  const picked = modules.filter((m) => target.langs.includes(m.lang));
  const imports = picked
    .map((m) => `import { ${m.varName}${target.suffix} } from "@/lib/blog/${m.moduleName}";`)
    .filter((line) => !content.includes(line));
  const prefix = target.spread === false ? "  " : "  ...";
  const entries = picked
    .map((m) => `${prefix}${m.varName}${target.suffix},`)
    .filter((line) => !content.includes(line.trim()));

  if (!content.includes(target.anchor)) {
    console.error(`[register] anchor not found in ${target.file}: ${target.anchor}`);
    process.exit(1);
  }
  if (imports.length === 0 && entries.length === 0) {
    console.log(`[register] ${target.file}: already up to date`);
    continue;
  }

  if (entries.length) {
    const at = content.indexOf(target.anchor) + target.anchor.length;
    content = content.slice(0, at) + "\n" + entries.join("\n") + content.slice(at);
  }
  if (imports.length) {
    const matches = [...content.matchAll(IMPORT_RE)];
    if (!matches.length) {
      console.error(`[register] no import anchor found in ${target.file}`);
      process.exit(1);
    }
    const last = matches[matches.length - 1];
    const at = last.index + last[0].length;
    content = content.slice(0, at) + "\n" + imports.join("\n") + content.slice(at);
  }
  fs.writeFileSync(file, content);
  console.log(`[register] ${target.file}: +${imports.length} imports, +${entries.length} entries`);
}

console.log(`\nDone: ${modules.length} modules for ${cfg.date}. Next: npm run build → git push → VPS deploy.`);
