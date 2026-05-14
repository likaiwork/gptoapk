#!/usr/bin/env node
/**
 * Batch script to add Schema.org JSON-LD structured data to SEO pages.
 * Adds TechArticle, FAQPage (if FAQ found), and BreadcrumbList schemas.
 *
 * Usage: node scripts/add-schema.js
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const SRC_APP = path.join(PROJECT_ROOT, "src/app");

// All SEO page files to process
const ALL_PAGES = [
  // ru - 10 pages
  { locale: "ru", slug: "telegram-apk", lang: "ru" },
  { locale: "ru", slug: "vpn-apk", lang: "ru" },
  { locale: "ru", slug: "chatgpt-apk", lang: "ru" },
  { locale: "ru", slug: "youtube-apk", lang: "ru" },
  { locale: "ru", slug: "tiktok-apk", lang: "ru" },
  { locale: "ru", slug: "whatsapp-apk", lang: "ru" },
  { locale: "ru", slug: "google-play-not-working", lang: "ru" },
  { locale: "ru", slug: "install-apk-without-google-play", lang: "ru" },
  { locale: "ru", slug: "claude-apk", lang: "ru" },
  { locale: "ru", slug: "gemini-apk", lang: "ru" },
  // fa - 8 pages
  { locale: "fa", slug: "telegram-apk", lang: "fa" },
  { locale: "fa", slug: "vpn-apk", lang: "fa" },
  { locale: "fa", slug: "chatgpt-apk", lang: "fa" },
  { locale: "fa", slug: "youtube-apk", lang: "fa" },
  { locale: "fa", slug: "tiktok-apk", lang: "fa" },
  { locale: "fa", slug: "whatsapp-apk", lang: "fa" },
  { locale: "fa", slug: "google-play-not-working", lang: "fa" },
  { locale: "fa", slug: "claude-apk", lang: "fa" },
  // zh - 8 pages
  { locale: "zh", slug: "huawei-install-google", lang: "zh" },
  { locale: "zh", slug: "chatgpt-apk", lang: "zh" },
  { locale: "zh", slug: "claude-apk", lang: "zh" },
  { locale: "zh", slug: "google-play-not-working", lang: "zh" },
  { locale: "zh", slug: "telegram-apk", lang: "zh" },
  { locale: "zh", slug: "youtube-apk", lang: "zh" },
  { locale: "zh", slug: "install-apk-guide", lang: "zh" },
  { locale: "zh", slug: "gemini-apk", lang: "zh" },
  // id - 6 pages
  { locale: "id", slug: "telegram-apk", lang: "id" },
  { locale: "id", slug: "chatgpt-apk", lang: "id" },
  { locale: "id", slug: "vpn-apk", lang: "id" },
  { locale: "id", slug: "tiktok-apk", lang: "id" },
  { locale: "id", slug: "whatsapp-apk", lang: "id" },
  { locale: "id", slug: "google-play-not-working", lang: "id" },
  // tl - 4 pages
  { locale: "tl", slug: "telegram-apk", lang: "tl" },
  { locale: "tl", slug: "chatgpt-apk", lang: "tl" },
  { locale: "tl", slug: "tiktok-apk", lang: "tl" },
  { locale: "tl", slug: "google-play-not-working", lang: "tl" },
  // hi - 6 pages
  { locale: "hi", slug: "whatsapp-apk", lang: "hi" },
  { locale: "hi", slug: "chatgpt-apk", lang: "hi" },
  { locale: "hi", slug: "telegram-apk", lang: "hi" },
  { locale: "hi", slug: "tiktok-apk", lang: "hi" },
  { locale: "hi", slug: "google-play-not-working", lang: "hi" },
  { locale: "hi", slug: "vpn-apk", lang: "hi" },
  // ur - 5 pages
  { locale: "ur", slug: "whatsapp-apk", lang: "ur" },
  { locale: "ur", slug: "chatgpt-apk", lang: "ur" },
  { locale: "ur", slug: "telegram-apk", lang: "ur" },
  { locale: "ur", slug: "tiktok-apk", lang: "ur" },
  { locale: "ur", slug: "google-play-not-working", lang: "ur" },
  // vi - 5 pages
  { locale: "vi", slug: "chatgpt-apk", lang: "vi" },
  { locale: "vi", slug: "telegram-apk", lang: "vi" },
  { locale: "vi", slug: "tiktok-apk", lang: "vi" },
  { locale: "vi", slug: "whatsapp-apk", lang: "vi" },
  { locale: "vi", slug: "google-play-not-working", lang: "vi" },
  // tr - 6 pages
  { locale: "tr", slug: "chatgpt-apk", lang: "tr" },
  { locale: "tr", slug: "telegram-apk", lang: "tr" },
  { locale: "tr", slug: "whatsapp-apk", lang: "tr" },
  { locale: "tr", slug: "tiktok-apk", lang: "tr" },
  { locale: "tr", slug: "youtube-apk", lang: "tr" },
  { locale: "tr", slug: "google-play-not-working", lang: "tr" },
  // th - 5 pages
  { locale: "th", slug: "chatgpt-apk", lang: "th" },
  { locale: "th", slug: "telegram-apk", lang: "th" },
  { locale: "th", slug: "tiktok-apk", lang: "th" },
  { locale: "th", slug: "whatsapp-apk", lang: "th" },
  { locale: "th", slug: "google-play-not-working", lang: "th" },
  // ar - 5 pages
  { locale: "ar", slug: "chatgpt-apk", lang: "ar" },
  { locale: "ar", slug: "telegram-apk", lang: "ar" },
  { locale: "ar", slug: "whatsapp-apk", lang: "ar" },
  { locale: "ar", slug: "tiktok-apk", lang: "ar" },
  { locale: "ar", slug: "google-play-not-working", lang: "ar" },
  // pt - 5 pages
  { locale: "pt", slug: "chatgpt-apk", lang: "pt" },
  { locale: "pt", slug: "whatsapp-apk", lang: "pt" },
  { locale: "pt", slug: "telegram-apk", lang: "pt" },
  { locale: "pt", slug: "tiktok-apk", lang: "pt" },
  { locale: "pt", slug: "google-play-not-working", lang: "pt" },
  // fr - 5 pages
  { locale: "fr", slug: "chatgpt-apk", lang: "fr" },
  { locale: "fr", slug: "whatsapp-apk", lang: "fr" },
  { locale: "fr", slug: "telegram-apk", lang: "fr" },
  { locale: "fr", slug: "tiktok-apk", lang: "fr" },
  { locale: "fr", slug: "google-play-not-working", lang: "fr" },
  // ja - 5 pages
  { locale: "ja", slug: "chatgpt-apk", lang: "ja" },
  { locale: "ja", slug: "tiktok-apk", lang: "ja" },
  { locale: "ja", slug: "whatsapp-apk", lang: "ja" },
  { locale: "ja", slug: "telegram-apk", lang: "ja" },
  { locale: "ja", slug: "google-play-not-working", lang: "ja" },
  // ko - 5 pages
  { locale: "ko", slug: "chatgpt-apk", lang: "ko" },
  { locale: "ko", slug: "tiktok-apk", lang: "ko" },
  { locale: "ko", slug: "whatsapp-apk", lang: "ko" },
  { locale: "ko", slug: "telegram-apk", lang: "ko" },
  { locale: "ko", slug: "google-play-not-working", lang: "ko" },
  // de - 5 pages
  { locale: "de", slug: "chatgpt-apk", lang: "de" },
  { locale: "de", slug: "whatsapp-apk", lang: "de" },
  { locale: "de", slug: "telegram-apk", lang: "de" },
  { locale: "de", slug: "tiktok-apk", lang: "de" },
  { locale: "de", slug: "google-play-not-working", lang: "de" },
  // en pages + zh/russia
  { locale: "en", slug: "ai-apps", lang: "en" },
  { locale: "en", slug: "how-to", lang: "en" },
  { locale: "en", slug: "russia", lang: "en" },
  { locale: "zh", slug: "russia", lang: "zh" },
  { locale: "en", slug: "how-to/install-chatgpt-apk", lang: "en", dirSlug: "how-to/install-chatgpt-apk" },
  { locale: "en", slug: "how-to/install-claude-apk", lang: "en", dirSlug: "how-to/install-claude-apk" },
  { locale: "en", slug: "how-to/install-deepseek-apk", lang: "en", dirSlug: "how-to/install-deepseek-apk" },
  { locale: "en", slug: "how-to/install-gemini-apk", lang: "en", dirSlug: "how-to/install-gemini-apk" },
  { locale: "en", slug: "how-to/install-grok-apk", lang: "en", dirSlug: "how-to/install-grok-apk" },
  { locale: "en", slug: "how-to/install-perplexity-apk", lang: "en", dirSlug: "how-to/install-perplexity-apk" },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Extract FAQ items from a page.tsx file content.
 * Works with <details>/<summary> and <h3>/<p> patterns.
 */
function extractFAQs(content) {
  const faqs = [];

  // Pattern 1: faqs = [...] array with { q: "...", a: "..." } objects
  const faqArrayRegex = /faqs\s*=\s*\[([\s\S]*?)\];/;
  const faqMatch = content.match(faqArrayRegex);
  if (faqMatch) {
    const qRegex = /q:\s*"((?:\\.|[^"\\])*)"/g;
    const aRegex = /a:\s*"((?:\\.|[^"\\])*)"/g;
    const qTexts = [];
    const aTexts = [];
    let m;
    while ((m = qRegex.exec(faqMatch[1])) !== null) {
      qTexts.push(m[1]);
    }
    while ((m = aRegex.exec(faqMatch[1])) !== null) {
      aTexts.push(m[1]);
    }
    const count = Math.min(qTexts.length, aTexts.length);
    for (let i = 0; i < count && i < 5; i++) {
      faqs.push({ q: escapeHtml(qTexts[i]), a: escapeHtml(aTexts[i]) });
    }
    if (faqs.length >= 2) return faqs;
  }

  // Pattern 2: Russian-style inline FAQ - <h3> text inside div.space-y-4
  const faqSectionRegex = /<h2[^>]*>(?:Часто задаваемые вопросы|FAQ|Frequently Asked Questions|Preguntas frecuentes|Foire aux questions|Häufig gestellte Fragen|よくある質問|자주 묻는 질문|Câu hỏi thường gặp|سوالات متداول|常見問題|常见问题|Pertanyaan Umum|Mga Madalas Itanong|अक्सर पूछे जाने वाले प्रश्न|اکثر پوچھے گئے سوالات|Sıkça Sorulan Sorular|คำถามที่พบบ่อย|Perguntas Frequentes)[^<]*<\/h2>/;
  const faqSection = content.match(faqSectionRegex);
  if (faqSection) {
    const afterHeading = content.substring(faqSection.index);
    // Find the FAQ content container - try different div patterns
    const divMatch = afterHeading.match(
      /<div[^>]*class="[^"]*space-y-4[^"]*"[^>]*>([\s\S]*?)<\/div>/
    );
    if (divMatch) {
      const h3Regex = /<h3[^>]*>([^<]+)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
      let m;
      while ((m = h3Regex.exec(divMatch[1])) !== null && faqs.length < 5) {
        const q = m[1].trim();
        const a = m[2].replace(/<[^>]*>/g, "").trim();
        if (q && a) {
          faqs.push({ q: escapeHtml(q), a: escapeHtml(a) });
        }
      }
    }
  }

  return faqs.slice(0, 5);
}

/**
 * Get the page title from metadata or h1
 */
function getTitle(content) {
  const titleRegex = /title:\s*(?:"([^"]*)"|`([^`]*)`)/;
  const m = content.match(titleRegex);
  if (m) return (m[1] || m[2] || "gptoapk.com").trim();
  return "gptoapk.com";
}

/**
 * Get the description from metadata
 */
function getDescription(content) {
  const descRegex = /description:\s*(?:"([^"]*)"|`([^`]*)`)/;
  const m = content.match(descRegex);
  if (m) return (m[1] || m[2] || "").trim();
  return "";
}

/**
 * Get the h1 text from the page
 */
function getH1(content) {
  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/;
  const m = content.match(h1Regex);
  if (m) return m[1].replace(/<[^>]*>/g, "").trim();
  return getTitle(content);
}

/**
 * Generate schema JSON-LD Script tags
 */
function generateSchemaScripts(page, content) {
  const h1 = escapeHtml(getH1(content));
  const description = escapeHtml(getDescription(content));
  const title = escapeHtml(getTitle(content));
  const slug = page.slug;
  const locale = page.locale;
  const lang = page.lang;
  const localePath = locale ? `/${locale}` : "";

  // Extract FAQs
  const faqs = extractFAQs(content);

  // Determine breadcrumb name
  let breadcrumbName;
  const lastSlugPart = slug.split("/").pop();
  if (slug === "google-play-not-working") {
    breadcrumbName = locale === "zh" ? "Google Play 无法使用" : "Google Play Not Working";
  } else if (lastSlugPart === "telegram-apk") breadcrumbName = "Telegram APK";
  else if (lastSlugPart === "chatgpt-apk") breadcrumbName = "ChatGPT APK";
  else if (lastSlugPart === "whatsapp-apk") breadcrumbName = "WhatsApp APK";
  else if (lastSlugPart === "tiktok-apk") breadcrumbName = "TikTok APK";
  else if (lastSlugPart === "youtube-apk") breadcrumbName = "YouTube APK";
  else if (lastSlugPart === "vpn-apk") breadcrumbName = "VPN APK";
  else if (lastSlugPart === "claude-apk") breadcrumbName = "Claude APK";
  else if (lastSlugPart === "gemini-apk") breadcrumbName = "Gemini APK";
  else if (lastSlugPart === "huawei-install-google") breadcrumbName = locale === "zh" ? "华为安装谷歌" : "Huawei Install Google";
  else if (lastSlugPart === "install-apk-without-google-play") breadcrumbName = locale === "ru" ? "Установка APK без Google Play" : "Install APK Without Google Play";
  else if (lastSlugPart === "install-apk-guide") breadcrumbName = locale === "zh" ? "APK 安装指南" : "APK Install Guide";
  else if (slug === "ai-apps") breadcrumbName = "AI Apps";
  else if (slug === "how-to") breadcrumbName = "How To";
  else if (slug === "russia") breadcrumbName = locale === "zh" ? "俄罗斯" : "Russia";
  else if (slug.startsWith("how-to/install-")) breadcrumbName = `Install ${lastSlugPart.replace("install-", "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}`;
  else breadcrumbName = lastSlugPart.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  const scripts = [];

  // TechArticle Schema
  scripts.push(`      <Script
        id="schema-tech-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": ${JSON.stringify(h1)},
            "description": ${JSON.stringify(description || h1)},
            "datePublished": "2026-05-14",
            "author": {
              "@type": "Organization",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://gptoapk.com${localePath}/${slug}"
            },
            "inLanguage": "${lang}"
          })
        }}
      />`);

  // FAQPage Schema
  if (faqs.length >= 2) {
    const faqEntities = faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    }));
    scripts.push(`      <Script
        id="schema-faq-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": ${JSON.stringify(faqEntities)}
          })
        }}
      />`);
  }

  // BreadcrumbList Schema
  scripts.push(`      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "gptoapk.com",
                "item": "https://gptoapk.com${localePath || ""}"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": ${JSON.stringify(breadcrumbName)},
                "item": "https://gptoapk.com${localePath}/${slug}"
              }
            ]
          })
        }}
      />`);

  return scripts.join("\n");
}

function processFile(filePath, page) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, "utf-8");

    // Check if already processed
    if (content.includes('id="schema-tech-article"')) {
      console.log(`  ⏭️  Already has schema: ${filePath}`);
      return true;
    }

    // Ensure Script is imported
    if (!content.includes('from "next/script"') && !content.includes("from 'next/script'")) {
      // Add import after existing imports or at top
      if (content.startsWith("import ")) {
        const match = content.match(/^import[^;]+;/);
        if (match) {
          content = content.substring(0, match.index + match[0].length) +
            '\nimport Script from "next/script";' +
            content.substring(match.index + match[0].length);
        }
      } else {
        content = 'import Script from "next/script";\n' + content;
      }
    }

    // Generate schema scripts
    const schemaScripts = generateSchemaScripts(page, content);

    // Insert schema scripts before the final closing </div> tag
    // The pattern is: the last </div> before the closing ");" of the return statement
    // Find the last occurrence of: whitespace + </div> + whitespace + );
    const closingPattern = /(\s*)<\/div>(\s*)\);$/m;
    const match = content.match(closingPattern);

    if (match) {
      const divIndent = match[1]; // whitespace before </div>
      const insertPos = match.index;

      const schemaBlock = `${divIndent}{/* Schema.org JSON-LD */}
${schemaScripts}
${divIndent}`;

      content =
        content.substring(0, insertPos) +
        schemaBlock +
        content.substring(insertPos);

      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`  ✅ Added schema: ${filePath.slice(SRC_APP.length + 1)}`);
      return true;
    } else {
      console.log(`  ❌ Could not find insertion point (last </div> before );): ${filePath}`);
      return false;
    }
  } catch (err) {
    console.error(`  ❌ Error processing ${filePath}:`, err.message);
    return false;
  }
}

// --- Main ---
console.log("🔍 Adding Schema.org structured data to SEO pages...\n");

let totalProcessed = 0;
let totalErrors = 0;

for (const page of ALL_PAGES) {
  const dirParts = page.slug.split("/");
  const filePath = path.join(SRC_APP, page.locale, ...dirParts, "page.tsx");

  console.log(`Processing ${page.locale}/${page.slug}...`);
  const ok = processFile(filePath, page);
  if (ok) totalProcessed++;
  else totalErrors++;
}

console.log(`\n📊 Results: ${totalProcessed} files processed, ${totalErrors} errors`);

// --- Part 2: Baidu SEO optimizations ---
console.log("\n🔧 Part 2: Baidu SEO optimizations...\n");

// 2.1 Check layout.tsx for Baidu Tongji
const layoutPath = path.join(SRC_APP, "layout.tsx");
const layoutContent = fs.readFileSync(layoutPath, "utf-8");
if (layoutContent.includes("BAIDU_TONGJI_ID") || layoutContent.includes("hm.baidu.com")) {
  console.log("  ✅ Baidu Tongji already configured in layout.tsx");
} else {
  console.log("  ⚠️  Baidu Tongji NOT found in layout.tsx");
}

// 2.2 Add MIP + site verification to zh/layout.tsx
const zhLayoutPath = path.join(SRC_APP, "zh", "layout.tsx");
let zhLayout = fs.readFileSync(zhLayoutPath, "utf-8");
if (!zhLayout.includes("applicable-device")) {
  zhLayout = zhLayout.replace(
    "return <>{children}</>;",
    'return <><meta name="applicable-device" content="mobile" /><meta name="baidu-site-verification" content="codeva-aY7lRViYFC" />{children}</>;'
  );
  fs.writeFileSync(zhLayoutPath, zhLayout, "utf-8");
  console.log("  ✅ Added Baidu MIP tag and site verification to zh/layout.tsx");
} else {
  console.log("  ⏭️  Baidu tags already in zh/layout.tsx");
}

// 2.4 Add Baidu Crawl-delay to robots.txt
const robotsPath = path.join(PROJECT_ROOT, "public", "robots.txt");
let robots = fs.readFileSync(robotsPath, "utf-8");
if (!robots.includes("Baiduspider")) {
  robots = `User-agent: Baiduspider
Crawl-delay: 1

${robots}`;
  fs.writeFileSync(robotsPath, robots, "utf-8");
  console.log("  ✅ Added Baiduspider Crawl-delay to robots.txt");
} else {
  console.log("  ⏭️  Baiduspider already in robots.txt");
}

console.log("\n✅ All tasks complete!");
