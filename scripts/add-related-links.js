#!/usr/bin/env node
/**
 * add-related-links.js
 *
 * Adds a "Related Guides" / related articles block to every SEO page's page.tsx
 * across all 17 target languages. The block is inserted between the FAQ section
 * and the CTA block.
 *
 * Usage: node scripts/add-related-links.js
 */

const fs = require("fs");
const path = require("path");

// ── Target languages (the 17 we care about) ──────────────────────────
const LANGUAGES = [
  "ru", "fa", "zh", "id", "tl", "hi", "ur", "vi", "tr", "th",
  "ar", "pt", "fr", "ja", "ko", "de", "en",
];

const BASE = path.resolve(__dirname, "../src/app");

// ── Link templates per language ──────────────────────────────────────
// Each entry: { title, links: [{ href, label }] }
const RELATED_BLOCKS = {
  en: {
    title: "Related Guides",
    fallback: { href: "/en/how-to/install-chatgpt-apk", label: "How to Install ChatGPT APK" },
    chatgpt_link: { href: "/en/ai-apps", label: "Best AI Apps for Android" },
    gpnw_fallback_link: { href: "/en/how-to", label: "APK Installation Guides" },
    telegram_link: { href: "/en/how-to/install-chatgpt-apk", label: "How to Install ChatGPT APK" },
    what_link: { href: "/en/ai-apps", label: "Best AI Apps for Android" },
    tiktok_link: { href: "/en/how-to", label: "APK Installation Guides" },
    vpn_link: { href: "/en/how-to/install-chatgpt-apk", label: "How to Install ChatGPT APK" },
    links: [
      { href: "/en/how-to/install-chatgpt-apk", label: "How to Install ChatGPT APK" },
      { href: "/en/ai-apps", label: "Best AI Apps for Android" },
      { href: "/en/how-to", label: "APK Installation Guides" },
    ],
  },
  ru: {
    title: "Полезные руководства",
    chatgpt_link: { href: "/ru/chatgpt-apk", label: "ChatGPT APK скачать" },
    gpnw_fallback_link: { href: "/ru/google-play-not-working", label: "Google Play не работает в России" },
    install_guide: { href: "/ru/install-apk-without-google-play", label: "Как установить APK без Google Play" },
    telegram_link: { href: "/ru/telegram-apk", label: "Telegram APK скачать" },
    what_link: { href: "/ru/whatsapp-apk", label: "WhatsApp APK скачать" },
    tiktok_link: { href: "/ru/tiktok-apk", label: "TikTok APK скачать" },
    vpn_link: { href: "/ru/vpn-apk", label: "VPN APK скачать" },
    links: [
      { href: "/ru/chatgpt-apk", label: "ChatGPT APK скачать" },
      { href: "/ru/vpn-apk", label: "VPN APK скачать" },
      { href: "/ru/install-apk-without-google-play", label: "Как установить APK без Google Play" },
    ],
  },
  fa: {
    title: "راهنماهای مرتبط",
    chatgpt_link: { href: "/fa/chatgpt-apk", label: "دانلود ChatGPT APK" },
    gpnw_fallback_link: { href: "/fa/google-play-not-working", label: "Google Play کار نمی‌کند" },
    telegram_link: { href: "/fa/telegram-apk", label: "دانلود Telegram APK" },
    what_link: { href: "/fa/whatsapp-apk", label: "دانلود WhatsApp APK" },
    tiktok_link: { href: "/fa/tiktok-apk", label: "دانلود TikTok APK" },
    vpn_link: { href: "/fa/vpn-apk", label: "دانلود VPN APK" },
    links: [
      { href: "/fa/chatgpt-apk", label: "دانلود ChatGPT APK" },
      { href: "/fa/vpn-apk", label: "دانلود VPN APK" },
      { href: "/fa/google-play-not-working", label: "Google Play کار نمی‌کند" },
    ],
  },
  zh: {
    title: "相关教程",
    chatgpt_link: { href: "/zh/chatgpt-apk", label: "ChatGPT APK 下载教程" },
    gpnw_fallback_link: { href: "/zh/google-play-not-working", label: "Google Play 无法使用" },
    install_guide: { href: "/zh/install-apk-guide", label: "APK安装指南" },
    telegram_link: { href: "/zh/telegram-apk", label: "Telegram APK下载" },
    what_link: { href: "/zh/youtube-apk", label: "YouTube APK下载" },
    tiktok_link: { href: "/zh/claude-apk", label: "Claude APK下载" },
    huawei_link: { href: "/zh/huawei-install-google", label: "华为安装Google服务" },
    links: [
      { href: "/zh/chatgpt-apk", label: "ChatGPT APK 下载教程" },
      { href: "/zh/huawei-install-google", label: "华为安装Google服务" },
      { href: "/zh/install-apk-guide", label: "APK安装指南" },
    ],
  },
  id: {
    title: "Panduan Terkait",
    chatgpt_link: { href: "/id/chatgpt-apk", label: "Download ChatGPT APK" },
    gpnw_fallback_link: { href: "/id/google-play-not-working", label: "Google Play Tidak Berfungsi" },
    telegram_link: { href: "/id/telegram-apk", label: "Download Telegram APK" },
    what_link: { href: "/id/whatsapp-apk", label: "Download WhatsApp APK" },
    tiktok_link: { href: "/id/tiktok-apk", label: "Download TikTok APK" },
    vpn_link: { href: "/id/vpn-apk", label: "Download VPN APK" },
    links: [
      { href: "/id/chatgpt-apk", label: "Download ChatGPT APK" },
      { href: "/id/vpn-apk", label: "Download VPN APK" },
      { href: "/id/google-play-not-working", label: "Google Play Tidak Berfungsi" },
    ],
  },
  tl: {
    title: "Mga Kaugnay na Gabay",
    chatgpt_link: { href: "/tl/chatgpt-apk", label: "Mag-download ng ChatGPT APK" },
    gpnw_fallback_link: { href: "/tl/google-play-not-working", label: "Hindi Gumagana ang Google Play" },
    telegram_link: { href: "/tl/telegram-apk", label: "Mag-download ng Telegram APK" },
    tiktok_link: { href: "/tl/tiktok-apk", label: "Mag-download ng TikTok APK" },
    links: [
      { href: "/tl/chatgpt-apk", label: "Mag-download ng ChatGPT APK" },
      { href: "/tl/tiktok-apk", label: "Mag-download ng TikTok APK" },
      { href: "/tl/google-play-not-working", label: "Hindi Gumagana ang Google Play" },
    ],
  },
  hi: {
    title: "संबंधित गाइड",
    chatgpt_link: { href: "/hi/chatgpt-apk", label: "ChatGPT APK डाउनलोड" },
    gpnw_fallback_link: { href: "/hi/google-play-not-working", label: "Google Play काम नहीं कर रहा" },
    telegram_link: { href: "/hi/telegram-apk", label: "Telegram APK डाउनलोड" },
    what_link: { href: "/hi/whatsapp-apk", label: "WhatsApp APK डाउनलोड" },
    tiktok_link: { href: "/hi/tiktok-apk", label: "TikTok APK डाउनलोड" },
    vpn_link: { href: "/hi/vpn-apk", label: "VPN APK डाउनलोड" },
    links: [
      { href: "/hi/whatsapp-apk", label: "WhatsApp APK डाउनलोड" },
      { href: "/hi/telegram-apk", label: "Telegram APK डाउनलोड" },
      { href: "/hi/google-play-not-working", label: "Google Play काम नहीं कर रहा" },
    ],
  },
  ur: {
    title: "متعلقہ گائیڈز",
    chatgpt_link: { href: "/ur/chatgpt-apk", label: "ChatGPT APK ڈاؤن لوڈ" },
    gpnw_fallback_link: { href: "/ur/google-play-not-working", label: "Google Play کام نہیں کر رہا" },
    telegram_link: { href: "/ur/telegram-apk", label: "Telegram APK ڈاؤن لوڈ" },
    what_link: { href: "/ur/whatsapp-apk", label: "WhatsApp APK ڈاؤن لوڈ" },
    tiktok_link: { href: "/ur/tiktok-apk", label: "TikTok APK ڈاؤن لوڈ" },
    links: [
      { href: "/ur/whatsapp-apk", label: "WhatsApp APK ڈاؤن لوڈ" },
      { href: "/ur/telegram-apk", label: "Telegram APK ڈاؤن لوڈ" },
      { href: "/ur/google-play-not-working", label: "Google Play کام نہیں کر رہا" },
    ],
  },
  vi: {
    title: "Hướng dẫn Liên quan",
    chatgpt_link: { href: "/vi/chatgpt-apk", label: "Tải ChatGPT APK" },
    gpnw_fallback_link: { href: "/vi/google-play-not-working", label: "Google Play không hoạt động" },
    telegram_link: { href: "/vi/telegram-apk", label: "Tải Telegram APK" },
    what_link: { href: "/vi/whatsapp-apk", label: "Tải WhatsApp APK" },
    tiktok_link: { href: "/vi/tiktok-apk", label: "Tải TikTok APK" },
    links: [
      { href: "/vi/chatgpt-apk", label: "Tải ChatGPT APK" },
      { href: "/vi/telegram-apk", label: "Tải Telegram APK" },
      { href: "/vi/google-play-not-working", label: "Google Play không hoạt động" },
    ],
  },
  tr: {
    title: "İlgili Rehberler",
    chatgpt_link: { href: "/tr/chatgpt-apk", label: "ChatGPT APK İndir" },
    gpnw_fallback_link: { href: "/tr/google-play-not-working", label: "Google Play Çalışmıyor" },
    telegram_link: { href: "/tr/telegram-apk", label: "Telegram APK İndir" },
    what_link: { href: "/tr/whatsapp-apk", label: "WhatsApp APK İndir" },
    tiktok_link: { href: "/tr/tiktok-apk", label: "TikTok APK İndir" },
    links: [
      { href: "/tr/chatgpt-apk", label: "ChatGPT APK İndir" },
      { href: "/tr/telegram-apk", label: "Telegram APK İndir" },
      { href: "/tr/google-play-not-working", label: "Google Play Çalışmıyor" },
    ],
  },
  th: {
    title: "คำแนะนำที่เกี่ยวข้อง",
    chatgpt_link: { href: "/th/chatgpt-apk", label: "ดาวน์โหลด ChatGPT APK" },
    gpnw_fallback_link: { href: "/th/google-play-not-working", label: "Google Play ไม่ทำงาน" },
    telegram_link: { href: "/th/telegram-apk", label: "ดาวน์โหลด Telegram APK" },
    what_link: { href: "/th/whatsapp-apk", label: "ดาวน์โหลด WhatsApp APK" },
    tiktok_link: { href: "/th/tiktok-apk", label: "ดาวน์โหลด TikTok APK" },
    links: [
      { href: "/th/chatgpt-apk", label: "ดาวน์โหลด ChatGPT APK" },
      { href: "/th/telegram-apk", label: "ดาวน์โหลด Telegram APK" },
      { href: "/th/google-play-not-working", label: "Google Play ไม่ทำงาน" },
    ],
  },
  ar: {
    title: "أدلة ذات صلة",
    chatgpt_link: { href: "/ar/chatgpt-apk", label: "تحميل ChatGPT APK" },
    gpnw_fallback_link: { href: "/ar/google-play-not-working", label: "Google Play لا يعمل" },
    telegram_link: { href: "/ar/telegram-apk", label: "تحميل Telegram APK" },
    what_link: { href: "/ar/whatsapp-apk", label: "تحميل WhatsApp APK" },
    tiktok_link: { href: "/ar/tiktok-apk", label: "تحميل TikTok APK" },
    links: [
      { href: "/ar/chatgpt-apk", label: "تحميل ChatGPT APK" },
      { href: "/ar/telegram-apk", label: "تحميل Telegram APK" },
      { href: "/ar/google-play-not-working", label: "Google Play لا يعمل" },
    ],
  },
  pt: {
    title: "Guias Relacionados",
    chatgpt_link: { href: "/pt/chatgpt-apk", label: "Baixar ChatGPT APK" },
    gpnw_fallback_link: { href: "/pt/google-play-not-working", label: "Google Play não funciona" },
    telegram_link: { href: "/pt/telegram-apk", label: "Baixar Telegram APK" },
    what_link: { href: "/pt/whatsapp-apk", label: "Baixar WhatsApp APK" },
    tiktok_link: { href: "/pt/tiktok-apk", label: "Baixar TikTok APK" },
    links: [
      { href: "/pt/chatgpt-apk", label: "Baixar ChatGPT APK" },
      { href: "/pt/whatsapp-apk", label: "Baixar WhatsApp APK" },
      { href: "/pt/google-play-not-working", label: "Google Play não funciona" },
    ],
  },
  fr: {
    title: "Guides Connexes",
    chatgpt_link: { href: "/fr/chatgpt-apk", label: "Télécharger ChatGPT APK" },
    gpnw_fallback_link: { href: "/fr/google-play-not-working", label: "Google Play ne fonctionne pas" },
    telegram_link: { href: "/fr/telegram-apk", label: "Télécharger Telegram APK" },
    what_link: { href: "/fr/whatsapp-apk", label: "Télécharger WhatsApp APK" },
    tiktok_link: { href: "/fr/tiktok-apk", label: "Télécharger TikTok APK" },
    links: [
      { href: "/fr/chatgpt-apk", label: "Télécharger ChatGPT APK" },
      { href: "/fr/telegram-apk", label: "Télécharger Telegram APK" },
      { href: "/fr/google-play-not-working", label: "Google Play ne fonctionne pas" },
    ],
  },
  ja: {
    title: "関連ガイド",
    chatgpt_link: { href: "/ja/chatgpt-apk", label: "ChatGPT APK ダウンロード" },
    gpnw_fallback_link: { href: "/ja/google-play-not-working", label: "Google Playが機能しない" },
    telegram_link: { href: "/ja/telegram-apk", label: "Telegram APK ダウンロード" },
    what_link: { href: "/ja/whatsapp-apk", label: "WhatsApp APK ダウンロード" },
    tiktok_link: { href: "/ja/tiktok-apk", label: "TikTok APK ダウンロード" },
    links: [
      { href: "/ja/chatgpt-apk", label: "ChatGPT APK ダウンロード" },
      { href: "/ja/tiktok-apk", label: "TikTok APK ダウンロード" },
      { href: "/ja/google-play-not-working", label: "Google Playが機能しない" },
    ],
  },
  ko: {
    title: "관련 가이드",
    chatgpt_link: { href: "/ko/chatgpt-apk", label: "ChatGPT APK 다운로드" },
    gpnw_fallback_link: { href: "/ko/google-play-not-working", label: "Google Play가 작동하지 않음" },
    telegram_link: { href: "/ko/telegram-apk", label: "Telegram APK 다운로드" },
    what_link: { href: "/ko/whatsapp-apk", label: "WhatsApp APK 다운로드" },
    tiktok_link: { href: "/ko/tiktok-apk", label: "TikTok APK 다운로드" },
    links: [
      { href: "/ko/chatgpt-apk", label: "ChatGPT APK 다운로드" },
      { href: "/ko/tiktok-apk", label: "TikTok APK 다운로드" },
      { href: "/ko/google-play-not-working", label: "Google Play가 작동하지 않음" },
    ],
  },
  de: {
    title: "Verwandte Anleitungen",
    chatgpt_link: { href: "/de/chatgpt-apk", label: "ChatGPT APK Herunterladen" },
    gpnw_fallback_link: { href: "/de/google-play-not-working", label: "Google Play funktioniert nicht" },
    telegram_link: { href: "/de/telegram-apk", label: "Telegram APK Herunterladen" },
    what_link: { href: "/de/whatsapp-apk", label: "WhatsApp APK Herunterladen" },
    tiktok_link: { href: "/de/tiktok-apk", label: "TikTok APK Herunterladen" },
    links: [
      { href: "/de/chatgpt-apk", label: "ChatGPT APK Herunterladen" },
      { href: "/de/telegram-apk", label: "Telegram APK Herunterladen" },
      { href: "/de/google-play-not-working", label: "Google Play funktioniert nicht" },
    ],
  },
};

/**
 * Build a contextual 3-link set for a given page.
 * Rules:
 *  - If page is not chatgpt-apk → include chatgpt-apk link
 *  - If page is not google-play-not-working → include gpnw link
 *  - 3rd link: if app-download page (e.g. telegram/tiktok/whatsapp/vpn etc.) → install guide (or popular app)
 *    if problem/guide page → popular app link
 */
function getLinks(lang, pageSlug) {
  const cfg = RELATED_BLOCKS[lang];
  if (!cfg) return [];

  let links = [];

  // Link 1: chatgpt-apk (unless current page is chatgpt-apk)
  if (pageSlug !== "chatgpt-apk" && cfg.chatgpt_link) {
    links.push(cfg.chatgpt_link);
  }

  // Link 2: google-play-not-working (unless current page is that)
  if (pageSlug !== "google-play-not-working" && cfg.gpnw_fallback_link) {
    links.push(cfg.gpnw_fallback_link);
  }

  // Link 3: smart third link based on page type
  const appPages = [
    "telegram-apk", "tiktok-apk", "whatsapp-apk", "vpn-apk",
    "youtube-apk", "gemini-apk", "claude-apk", "chatgpt-apk",
  ];

  if (appPages.includes(pageSlug)) {
    // App download page → link to install guide or google-play-not-working
    if (cfg.install_guide) {
      links.push(cfg.install_guide);
    } else if (cfg.what_link) {
      links.push(cfg.what_link);
    } else if (cfg.vpn_link) {
      links.push(cfg.vpn_link);
    } else {
      links.push(cfg.telegram_link);
    }
  } else {
    // Problem/guide page → link to a popular app (telegram, whatsapp, or tiktok)
    if (pageSlug === "install-apk-without-google-play" || pageSlug === "install-apk-guide" || pageSlug === "how-to") {
      links.push(cfg.telegram_link);
    } else if (pageSlug === "google-play-not-working") {
      links.push(cfg.telegram_link);
    } else if (pageSlug === "ai-apps") {
      links.push(cfg.chatgpt_link);
    } else {
      links.push(cfg.telegram_link);
    }
  }

  // Deduplicate
  const seen = new Set();
  // Also skip current page in dedup
  const skipHref = `/${lang}/${pageSlug}`;
  links = links.filter(l => {
    const key = l.href;
    if (key === skipHref) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Pad to exactly 3
  while (links.length < 3) {
    for (const l of cfg.links) {
      if (l.href === skipHref) continue;
      if (!seen.has(l.href)) {
        links.push(l);
        seen.add(l.href);
        break;
      }
    }
    if (links.length >= 3) break;
  }

  return links.slice(0, 3);
}

function buildRelatedBlock(lang, pageSlug) {
  const cfg = RELATED_BLOCKS[lang];
  if (!cfg) return null;

  const links = getLinks(lang, pageSlug);
  if (links.length === 0) return null;

  const linkItems = links
    .map(
      (l) =>
        `          <li><a href="${l.href}" className="text-blue-600 dark:text-blue-400 hover:underline">${l.label}</a></li>`
    )
    .join("\n");

  return `
      {/* Related Guides */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">${cfg.title}</h2>
        <ul className="space-y-2">
${linkItems}
        </ul>
      </div>`;
}

// Insert the related guides block right before the CTA block comment.
// The CTA block pattern contains "CTA Block" or "CTA" in a JSX comment.
// We insert before that line.
function injectRelatedBlock(content, lang, pageSlug) {
  const block = buildRelatedBlock(lang, pageSlug);
  if (!block) return content;

  // Find "      {/* CTA */}" pattern and insert block before it
  const ctaPattern1 = `      {/* CTA Block */}`;
  const ctaPattern2 = `      {/* CTA Section */}`;
  const ctaPattern3 = `      {/* CTA */}`;
  let idx = content.lastIndexOf(ctaPattern1);
  if (idx === -1) idx = content.lastIndexOf(ctaPattern2);
  if (idx === -1) idx = content.lastIndexOf(ctaPattern3);

  if (idx !== -1) {
    return content.slice(0, idx) + block + "\n\n" + content.slice(idx);
  }

  // Fallback: find last </div> before return
  const returnIdx = content.lastIndexOf("  );");
  if (returnIdx !== -1) {
    // Find the last </div> before return
    const lastDiv = content.lastIndexOf("    </div>", returnIdx);
    if (lastDiv !== -1) {
      return content.slice(0, lastDiv + 11) + "\n" + block + "\n" + content.slice(lastDiv + 11);
    }
  }

  return content;
}

function getPageSlug(filePath) {
  // e.g. /Users/.../src/app/ru/chatgpt-apk/page.tsx → "chatgpt-apk"
  // e.g. /Users/.../src/app/en/how-to/install-chatgpt-apk/page.tsx → "install-chatgpt-apk"
  const parts = filePath.replace(BASE, "").split("/").filter(Boolean);
  // Remove the language prefix and "page.tsx"
  // For nested paths like en/how-to/install-chatgpt-apk/page.tsx → "install-chatgpt-apk"
  const lastPart = parts[parts.length - 1]; // page.tsx
  const secondLast = parts[parts.length - 2]; // the directory name
  return secondLast;
}

function getLangFromPath(filePath) {
  const relative = filePath.replace(BASE, "").split("/").filter(Boolean);
  return relative[0]; // first segment is the language
}

// ── Main ────────────────────────────────────────────────────────────
function main() {
  const processed = [];

  for (const lang of LANGUAGES) {
    const langDir = path.join(BASE, lang);
    if (!fs.existsSync(langDir)) continue;

    // Find all page.tsx files excluding blog, faq, app, and root pages
    const files = fs.readdirSync(langDir, { withFileTypes: true });
    for (const entry of files) {
      if (!entry.isDirectory()) continue;
      if (["blog", "faq", "app"].includes(entry.name)) continue;

      const pageFile = path.join(langDir, entry.name, "page.tsx");
      if (!fs.existsSync(pageFile)) continue;

      // For en, also check the en/how-to/ subdirectories
      // We handle page.tsx at the subdirectory level
      try {
        const content = fs.readFileSync(pageFile, "utf-8");
        const pageSlug = entry.name;
        const newContent = injectRelatedBlock(content, lang, pageSlug);

        if (newContent !== content) {
          fs.writeFileSync(pageFile, newContent, "utf-8");
          processed.push(path.relative(BASE, pageFile));
          console.log(`✓ Updated: ${path.relative(BASE, pageFile)}`);
        } else {
          console.log(`- Skipped (already has related or no change): ${path.relative(BASE, pageFile)}`);
        }
      } catch (err) {
        console.error(`✗ Error processing ${pageFile}: ${err.message}`);
      }
    }

    // For en, also process nested how-to/* directories
    if (lang === "en") {
      const enDir = path.join(BASE, "en");
      const entries = fs.readdirSync(enDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (["blog", "faq", "app"].includes(entry.name)) continue;

        // Check subdirectories (like en/how-to/)
        const subDir = path.join(enDir, entry.name);
        const subEntries = fs.readdirSync(subDir, { withFileTypes: true });
        for (const subEntry of subEntries) {
          if (!subEntry.isDirectory()) continue;

          const pageFile = path.join(subDir, subEntry.name, "page.tsx");
          if (!fs.existsSync(pageFile)) continue;

          try {
            const content = fs.readFileSync(pageFile, "utf-8");
            const pageSlug = subEntry.name;
            const newContent = injectRelatedBlock(content, lang, pageSlug);

            if (newContent !== content) {
              fs.writeFileSync(pageFile, newContent, "utf-8");
              processed.push(path.relative(BASE, pageFile));
              console.log(`✓ Updated: ${path.relative(BASE, pageFile)}`);
            } else {
              console.log(`- Skipped (already has related): ${path.relative(BASE, pageFile)}`);
            }
          } catch (err) {
            console.error(`✗ Error processing ${pageFile}: ${err.message}`);
          }
        }
      }
    }
  }

  console.log(`\n✅ Done! Processed ${processed.length} files.`);
}

main();
