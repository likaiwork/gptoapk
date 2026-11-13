#!/usr/bin/env node
/**
 * One-off: generate src/lib/blog/posts-2026-11-13{a,b}-{zh,en}.tsx
 * from markdown files in ~/.openclaw/workspace/seo-articles.
 */
const fs = require("fs");
const path = require("path");

const SEO = "/Users/likai/.openclaw/workspace/seo-articles";
const OUT = path.join(__dirname, "..", "src", "lib", "blog");

const enc = (s) =>
  s
    .replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const HOMEPAGE = { zh: "/", en: "/en" };

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
  let codeLang = "";
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
      codeLang = line.trim().replace(/^```/, "");
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
      const level = Math.min(h[1].length, 3);
      const tag = `h${level}`;
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
        r
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());
      const header = cells(rows[0]);
      const body = rows
        .slice(1)
        .filter((r) => !/^\|[\s\-:|]+\|$/.test(r))
        .map(cells);
      out.push(
        `      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">`
      );
      out.push(`        <thead><tr>${header
        .map(
          (c) =>
            `<th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">${inline(
              c,
              lang
            )}</th>`
        )
        .join("")}</tr></thead>`);
      out.push(
        `        <tbody>${body
          .map(
            (r) =>
              `<tr>${r
                .map(
                  (c) =>
                    `<td className="border border-gray-200 dark:border-gray-700 px-3 py-2">${inline(
                      c,
                      lang
                    )}</td>`
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
  // zh markdown has no front matter: take the first non-empty paragraph as description
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

function readMins(body, lang) {
  const text = body.replace(/```[\s\S]*?```/g, "");
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const words = (text.replace(/[\u4e00-\u9fff]/g, " ").match(/\b\w+\b/g) || []).length;
  const mins = Math.max(5, Math.round((words + cjk / 1.6) / 200));
  return lang === "zh" ? `${mins} min read` : `${mins} min read`;
}

const GROUPS = {
  a: {
    zh: { file: "439-安卓APK权限自动被关闭修复.md", slug: "android-apk-permission-auto-revoked-fix", tags: ["android", "apk", "权限", "故障排查"] },
    en: { file: "en-439-safely-download-apk-files-five-gates.md", slug: "safely-download-apk-files-five-gates", tags: ["android", "apk", "security", "howto"] },
  },
  b: {
    zh: { file: "440-APK版本回滚数据保留技巧.md", slug: "apk-rollback-keep-data", tags: ["android", "apk", "降级", "数据备份"] },
    en: { file: "en-440-apk-rollback-without-losing-data.md", slug: "apk-rollback-without-losing-data", tags: ["android", "apk", "troubleshooting", "mobile"] },
  },
  c: {
    zh: { file: "441-安卓APK下载后安装全流程检查清单.md", slug: "apk-download-install-checklist", tags: ["android", "apk", "安装", "校验"] },
    en: { file: "en-441-android-apk-compatibility-check-sdk-abi-density.md", slug: "android-apk-compatibility-check-sdk-abi-density", tags: ["android", "apk", "howto", "mobile"] },
  },
};

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

for (const [key, cfg] of Object.entries(GROUPS)) {
  for (const lang of ["zh", "en"]) {
    const c = cfg[lang];
    const { fm, title, body, desc } = parse(path.join(SEO, c.file));
    const jsx = convert(body, lang);
    const varName = lang === "zh" ? `zhPosts20261113${key.toUpperCase()}` : `enPosts20261113${key.toUpperCase()}`;
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
    date: "2026-11-13",
    readTime: ${JSON.stringify(readMins(body, lang))},
    tags: ${JSON.stringify(c.tags)},
    content: ARTICLE,
  },
];

export const ${varName}List = toList(${varName});
`;
    const file = path.join(OUT, `posts-2026-11-13${key}-${lang}.tsx`);
    fs.writeFileSync(file, out);
    console.log("wrote", path.basename(file), title, desc.length + " desc chars");
  }
}
