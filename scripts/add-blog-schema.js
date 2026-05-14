#!/usr/bin/env node
/**
 * add-blog-schema.js
 *
 * Automatically enhances all blog pages with:
 * 1. Enhanced BlogPosting JSON-LD (publisher.logo, keywords, about)
 * 2. CollectionPage Schema for blog listing pages (blog/page.tsx)
 * 3. "Related Posts" block at the bottom of each blog detail page
 *
 * Usage: node scripts/add-blog-schema.js
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const SRC_APP = path.join(PROJECT_ROOT, "src/app");

// All 33 locales from site-locales.ts
const LOCALES = [
  "ar", "bn", "cs", "da", "de", "el", "en", "es", "fa", "fi", "fr",
  "he", "hi", "hu", "id", "it", "ja", "ko", "ms", "nb", "nl", "pl",
  "pt", "ro", "ru", "sv", "th", "tl", "tr", "uk", "ur", "vi", "zh",
];

// hreflang mapping for canonical URLs
const HREFLANG_MAP = {
  "zh": "zh-Hans",
  "tl": "tl",
  "nb": "nb",
};

function getHreflang(locale) {
  return HREFLANG_MAP[locale] || locale;
}

// ── Related Posts definitions ───────────────────────────────────────

function getRelatedPosts(locale) {
  if (locale === "zh") {
    return {
      title: "相关文章",
      posts: [
        { href: "/zh/blog/top-10-apk-websites", label: "十大APK下载网站推荐" },
        { href: "/zh/blog/best-apk-sites-for-android", label: "APK下载站推荐" },
        { href: "/zh/blog/apkpure-alternatives", label: "APKPure 平替推荐" },
      ],
    };
  }
  return {
    title: "Related Articles",
    posts: [
      { href: "/en/blog/top-10-apk-websites", label: "Top 10 APK Download Websites" },
      { href: "/en/blog/best-apk-sites-for-android", label: "Best APK Download Sites for Android" },
      { href: "/en/blog/apkpure-alternatives", label: "Best APKPure Alternatives" },
    ],
  };
}

// ── Code generators (output JSX/TSX) ────────────────────────────────

/**
 * Enhanced BlogPosting jsonLd JS snippet using the `post` variable.
 * This generates JS code (not a static JSON string) so that slug is dynamic.
 */
function generateBlogPostingSchemaCode(locale) {
  const hreflang = getHreflang(locale);
  return `  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "gptoapk.com",
      "url": "https://gptoapk.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "gptoapk.com",
      "url": "https://gptoapk.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gptoapk.com/favicon.ico",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": \`https://gptoapk.com/${locale}/blog/\${slug}\`,
    },
    "inLanguage": "${hreflang}",
    "keywords": post.tags ? post.tags.join(", ") : "",
    "about": post.tags ? post.tags.map((t) => ({ "@type": "Thing", name: t })) : [],
  };`;
}

/**
 * Generate CollectionPage Script JSX element.
 */
function generateCollectionPageCode(locale) {
  const hreflang = getHreflang(locale);
  return `      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog - gptoapk.com",
            "description": "Latest articles about APK downloads, Android apps, and installation guides",
            "url": "https://gptoapk.com/${locale}/blog",
            "inLanguage": "${hreflang}",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com",
            },
          }),
        }}
      />`;
}

// ── Injection helpers ───────────────────────────────────────────────

/**
 * Replace the jsonLd definition in blog [slug]/page.tsx with enhanced version.
 * Pattern: find `const jsonLd = { ... };` and replace.
 */
function replaceJsonLd(content, locale) {
  const newSchema = generateBlogPostingSchemaCode(locale);

  // Find the existing jsonLd block - match from "const jsonLd" to ";"
  // We want to match `const jsonLd = { ... };`
  const jsonLdPattern = /const jsonLd\s*=\s*\{[\s\S]*?\};/;
  const match = content.match(jsonLdPattern);

  if (match) {
    // Check if it already has wasabi logo (our enhancement)
    if (match[0].includes("favicon.ico")) {
      return content; // already enhanced
    }
    return content.replace(jsonLdPattern, newSchema);
  }

  return content;
}

/**
 * Inject related posts block into a blog [slug]/page.tsx file.
 * Inserts before the Navigation section.
 */
function injectRelatedPosts(content, locale) {
  // Check if already present
  if (content.includes("Related Posts") || content.includes("相关文章")) {
    return content;
  }

  const related = getRelatedPosts(locale);
  const postItems = related.posts
    .map((p) =>
      `            <li><a href="${p.href}" className="text-blue-600 dark:text-blue-400 hover:underline">${p.label}</a></li>`
    )
    .join("\n");

  const relatedBlock = `
        {/* Related Posts */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">${related.title}</h2>
          <ul className="space-y-2">
${postItems}
          </ul>
        </div>

`;

  // Find navigation div with border-t pattern
  const navPattern = /(<div className="mt-(?:12|16) pt-8 border-t[\s\S]*?<\/div>\s*<\/article>)/;
  const match = content.match(navPattern);
  if (match) {
    return content.replace(navPattern, relatedBlock + "$1");
  }

  // Fallback: before </article>
  const articleClose = content.lastIndexOf("</article>");
  if (articleClose !== -1) {
    return content.slice(0, articleClose) + relatedBlock + content.slice(articleClose);
  }

  return content;
}

/**
 * Inject CollectionPage Schema + Script import for blog listing pages.
 */
function injectCollectionPageSchema(content, locale) {
  // Check if already injected
  if (content.includes('"CollectionPage"') && content.includes("collection-page")) {
    return content;
  }

  const schema = generateCollectionPageCode(locale);

  // Inject Script import if missing
  if (!content.includes('from "next/script"') && !content.includes("from 'next/script'")) {
    const lastImport = content.lastIndexOf("import ");
    const importEnd = content.indexOf(";", lastImport);
    if (importEnd !== -1) {
      content = content.slice(0, importEnd + 1) + '\nimport Script from "next/script";' + content.slice(importEnd + 1);
    }
  }

  // Find "export default function" and insert after
  const exportMatch = content.match(/export default function[\s\S]*?\{\n/);
  if (exportMatch) {
    const insertPos = exportMatch.index + exportMatch[0].length;
    return content.slice(0, insertPos) + "\n" + schema + "\n" + content.slice(insertPos);
  }

  return content;
}

// ── Main processing ─────────────────────────────────────────────────

function processBlogDetailPage(filePath, locale) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  let content = fs.readFileSync(filePath, "utf-8");

  // 1. Enhance BlogPosting JSON-LD
  const newContent = replaceJsonLd(content, locale);
  if (newContent !== content) {
    content = newContent;
  } else {
    // Check if it already had the enhanced schema
    if (content.includes("favicon.ico")) {
      return { file: path.relative(SRC_APP, filePath), action: "already-enhanced" };
    }
  }

  // 2. Inject Related Posts
  const withRelated = injectRelatedPosts(content, locale);
  if (withRelated !== content) {
    content = withRelated;
  }

  if (content !== fs.readFileSync(filePath, "utf-8")) {
    fs.writeFileSync(filePath, content, "utf-8");
    return { file: path.relative(SRC_APP, filePath), action: "updated" };
  }

  return { file: path.relative(SRC_APP, filePath), action: "no-change" };
}

function processBlogListPage(filePath, locale) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  const newContent = injectCollectionPageSchema(content, locale);

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, "utf-8");
    return true;
  }
  return false;
}

function main() {
  console.log("🔍 Enhancing blog schema and adding related posts...\n");

  let detailStats = { updated: 0, enhanced: 0, skipped: 0 };
  let listStats = { updated: 0, skipped: 0 };

  for (const locale of LOCALES) {
    // --- Blog detail pages ---
    const detailPath = path.join(SRC_APP, locale, "blog", "[slug]", "page.tsx");
    if (fs.existsSync(detailPath)) {
      const result = processBlogDetailPage(detailPath, locale);
      if (result) {
        if (result.action === "updated") {
          console.log(`  ✅ ${locale}/blog/[slug] - enhanced + related posts`);
          detailStats.updated++;
        } else if (result.action === "already-enhanced") {
          console.log(`  ⏭️  ${locale}/blog/[slug] - already enhanced`);
          detailStats.skipped++;
        } else {
          console.log(`  ⏭️  ${locale}/blog/[slug] - no change needed`);
          detailStats.skipped++;
        }
      } else {
        console.log(`  ❌ ${locale}/blog/[slug] - error`);
        detailStats.skipped++;
      }
    } else {
      console.log(`  ⚠️  ${locale}/blog/[slug] - no file`);
    }

    // --- Blog listing pages ---
    const listPath = path.join(SRC_APP, locale, "blog", "page.tsx");
    if (fs.existsSync(listPath)) {
      if (processBlogListPage(listPath, locale)) {
        console.log(`  ✅ ${locale}/blog/list - added CollectionPage`);
        listStats.updated++;
      } else {
        console.log(`  ⏭️  ${locale}/blog/list - already has CollectionPage or unchanged`);
        listStats.skipped++;
      }
    } else {
      console.log(`  ⚠️  ${locale}/blog/list - no file`);
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`  Detail pages: ${detailStats.updated} updated, ${detailStats.skipped} skipped`);
  console.log(`  List pages: ${listStats.updated} updated, ${listStats.skipped} skipped`);
}

main();
