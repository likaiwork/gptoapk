#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const LANGUAGES = ["ru","fa","zh","id","tl","hi","ur","vi","tr","th","ar","pt","fr","ja","ko","de","en"];
const BASE = path.resolve(__dirname, "../src/app");

function dedupeFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, "utf-8");
  
  // Match ANY {/* Related Guides */} or similar block
  // Pattern: {/* SOMETHING */} ... <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 ...
  const blockRegex = /\{\/\*[^*/]*\*\/\}\s*\n\s*<div\s+className="mt-8 p-6 bg-gray-50 dark:bg-gray-800\/50 rounded-xl border border-gray-100 dark:border-gray-700">[\s\S]*?<\/div>/g;
  
  const matches = content.match(blockRegex);
  if (!matches || matches.length <= 1) return false;
  
  // Keep only the last occurrence
  const lastMatch = matches[matches.length - 1];
  let result = content.replace(blockRegex, (match) => {
    // Replace all but last with empty
    return "";
  });
  
  // Re-insert the last match at the right position (before CTA)
  const ctaPatterns = [
    "      {/* CTA Block */}",
    "      {/* CTA Section */}",
    "      {/* CTA */}",
  ];
  
  let ctaIdx = -1;
  for (const p of ctaPatterns) {
    ctaIdx = result.lastIndexOf(p);
    if (ctaIdx !== -1) break;
  }
  
  if (ctaIdx !== -1) {
    result = result.slice(0, ctaIdx) + lastMatch + "\n\n" + result.slice(ctaIdx);
  } else {
    // Append at end before closing
    const endIdx = result.lastIndexOf("  );");
    if (endIdx !== -1) {
      result = result.slice(0, endIdx) + "\n\n" + lastMatch + "\n" + result.slice(endIdx);
    } else {
      result += "\n\n" + lastMatch + "\n";
    }
  }
  
  if (result !== content) {
    fs.writeFileSync(filePath, result, "utf-8");
    return true;
  }
  return false;
}

function scanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.match(/^(blog|faq|app|node_modules)$/)) continue;
    
    const subPath = path.join(dirPath, entry.name);
    const pageFile = path.join(subPath, "page.tsx");
    if (fs.existsSync(pageFile)) {
      if (dedupeFile(pageFile)) {
        console.log(`✓ Fixed: ${path.relative(BASE, pageFile)}`);
        count++;
      }
    }
    
    // Check sub-subdirectories (e.g., en/how-to/)
    const subEntries = fs.readdirSync(subPath, { withFileTypes: true });
    for (const subEntry of subEntries) {
      if (!subEntry.isDirectory()) continue;
      const subSubFile = path.join(subPath, subEntry.name, "page.tsx");
      if (fs.existsSync(subSubFile)) {
        if (dedupeFile(subSubFile)) {
          console.log(`✓ Fixed: ${path.relative(BASE, subSubFile)}`);
          count++;
        }
      }
    }
  }
}

let count = 0;
for (const lang of LANGUAGES) {
  scanDir(path.join(BASE, lang));
}
console.log(`\n✅ Fixed ${count} files.`);
