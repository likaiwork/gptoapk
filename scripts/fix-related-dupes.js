#!/usr/bin/env node
/**
 * fix-related-dupes.js
 * Removes duplicate Related Guides blocks, keeping only the last occurrence
 * (which should be just before the CTA block).
 */
const fs = require("fs");
const path = require("path");

const LANGUAGES = [
  "ru", "fa", "zh", "id", "tl", "hi", "ur", "vi", "tr", "th",
  "ar", "pt", "fr", "ja", "ko", "de", "en",
];

const BASE = path.resolve(__dirname, "../src/app");

// Title markers to detect Related Guides blocks
const TITLE_MARKERS = [
  "Related Guides",
  "Полезные руководства",
  "راهنماهای مرتبط",
  "相关教程",
  "Panduan Terkait",
  "Mga Kaugnay na Gabay",
  "संबंधित गाइड",
  "متعلقہ گائیڈز",
  "Hướng dẫn Liên quan",
  "İlgili Rehberler",
  "คำแนะนำที่เกี่ยวข้อง",
  "أدلة ذات صلة",
  "Guias Relacionados",
  "Guides Connexes",
  "関連ガイド",
  "관련 가이드",
  "Verwandte Anleitungen",
];

function removeDuplicateBlocks(content) {
  // Build a regex to match the entire Related Guides block (from the div opening to </div>)
  // Pattern: {/* Related Guides */}\n      <div className="mt-8...">...</div>
  const titlePattern = TITLE_MARKERS.join("|");
  const blockRegex = new RegExp(
    `\\s*\\{\\/\\*\\s*(?:${titlePattern})\\s*\\*\\/\\}\\s*<div[^>]*>\\s*<h2[^>]*>(?:${titlePattern})<\\/h2>\\s*<ul[^>]*>[\\s\\S]*?<\\/ul>\\s*<\\/div>`,
    "g"
  );
  
  const matches = content.match(blockRegex);
  if (!matches || matches.length <= 1) return content;
  
  // Keep only the last occurrence
  const lastMatch = matches[matches.length - 1];
  const allButLast = matches.slice(0, -1);
  
  let result = content;
  for (const m of allButLast) {
    result = result.replace(m, "");
  }
  
  return result;
}

function main() {
  let fixedCount = 0;
  
  for (const lang of LANGUAGES) {
    const langDir = path.join(BASE, lang);
    if (!fs.existsSync(langDir)) continue;
    
    // Process top-level subdirectories
    const entries = fs.readdirSync(langDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (["blog", "faq", "app"].includes(entry.name)) continue;
      
      processFile(path.join(langDir, entry.name, "page.tsx"), lang);
      
      // For directories like 'en/how-to/', check sub-subdirectories
      const subDir = path.join(langDir, entry.name);
      if (fs.existsSync(subDir)) {
        const subEntries = fs.readdirSync(subDir, { withFileTypes: true });
        for (const subEntry of subEntries) {
          if (!subEntry.isDirectory()) continue;
          processFile(path.join(subDir, subEntry.name, "page.tsx"), lang);
        }
      }
    }
  }
  
  function processFile(filePath, lang) {
    if (!fs.existsSync(filePath)) return;
    try {
      let content = fs.readFileSync(filePath, "utf-8");
      const newContent = removeDuplicateBlocks(content);
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, "utf-8");
        fixedCount++;
        console.log(`✓ Fixed: ${path.relative(BASE, filePath)}`);
      }
    } catch (err) {
      console.error(`✗ Error: ${filePath}: ${err.message}`);
    }
  }
  
  console.log(`\n✅ Fixed ${fixedCount} files with duplicate blocks.`);
}

main();
