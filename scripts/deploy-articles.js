#!/usr/bin/env node
/**
 * deploy-articles.js
 *
 * Reads seo-articles/new-en-*.md files + scripts/translations/<slug>/<lang>.txt
 * and generates Python patch scripts that directly modify the TSX files.
 *
 * For each article, it creates:
 *   scripts/patches/insert-<slug>.py  — Python script to insert the post into all language files
 *
 * These patches:
 * - Insert the new post entry at the BEGINNING of the posts array
 * - Handle both listing pages (blog/page.tsx) and slug pages ([slug]/page.tsx)
 * - Work across all 32 languages + English
 *
 * Usage: node scripts/deploy-articles.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// Configuration
// ============================================================

const PROJECT = path.resolve(__dirname, '..');
const SEO_DIR = path.join(PROJECT, 'seo-articles');
const TRANSLATIONS_DIR = path.join(__dirname, 'translations');
const PATCHES_DIR = path.join(__dirname, 'patches');

// Language definitions: [code, slugVar, listingVar, readTimePattern]
const LANGUAGES = [
  ['en', 'posts',     'posts',     'N min read'],
  ['zh', 'zhPosts',   'posts',     'N \u5206\u949f\u9605\u8bfb'],
  ['ja', 'posts',     'posts',     'N\u5206\u3067\u8aad\u3081\u308b'],
  ['ko', 'posts',     'posts',     'N\ubd84 \uc77d\uae30'],
  ['ru', 'posts',     'posts',     'N \u043c\u0438\u043d \u0447\u0442\u0435\u043d\u0438\u044f'],
  ['es', 'posts',     'posts',     'N min de lectura'],
  ['fr', 'frPosts',   'posts',     'N min de lecture'],
  ['de', 'dePosts',   'posts',     'N Min. Lesezeit'],
  ['pt', 'ptPosts',   'posts',     'N min de leitura'],
  ['it', 'posts',     'posts',     'N min di lettura'],
  ['vi', 'posts',     'posts',     'N ph\u00fat \u0111\u1ecdc'],
  ['th', 'thPosts',   'posts',     'N \u0e19\u0e32\u0e17\u0e35\u0e43\u0e19\u0e01\u0e32\u0e23\u0e2d\u0e48\u0e32\u0e19'],
  ['id', 'posts',     'posts',     'N menit baca'],
  ['ms', 'msPosts',   'posts',     'N minit bacaan'],
  ['tl', 'posts',     'blogPosts', 'N minutong pagbasa'],
  ['hi', 'hiPosts',   'posts',     'N \u092e\u093f\u0928\u091f \u092a\u0922\u093c\u0928\u0947 \u0915\u093e \u0938\u092e\u092f'],
  ['ar', 'arPosts',   'posts',     'N \u062f\u0642\u0627\u0626\u0642 \u0644\u0644\u0642\u0631\u0627\u0621\u0629'],
  ['bn', 'bnPosts',   'posts',     'N \u09ae\u09bf\u09a8\u09bf\u099f \u09aa\u09a1\u09bc\u09be'],
  ['ur', 'posts',     'blogPosts', 'N \u0645\u0646\u0679 \u067e\u0691\u06be\u0646\u06d2 \u06a9\u0627 \u0648\u0642\u062a'],
  ['fa', 'posts',     'blogPosts', 'N \u062f\u0642\u06cc\u0642\u0647 \u0645\u0637\u0627\u0644\u0639\u0647'],
  ['he', 'hePosts',   'posts',     'N \u05d3\u05e7\u05d5\u05ea \u05e7\u05e8\u05d9\u05d0\u05d4'],
  ['nb', 'posts',     'posts',     'N min lesing'],
  ['da', 'posts',     'posts',     'N min l\u00e6sning'],
  ['sv', 'posts',     'posts',     'N min l\u00e4sning'],
  ['fi', 'posts',     'posts',     'N min lukuaika'],
  ['ro', 'roPosts',   'posts',     'N min de citire'],
  ['hu', 'posts',     'posts',     'N perc olvas\u00e1s'],
  ['cs', 'posts',     'posts',     'N min \u010dten\u00ed'],
  ['pl', 'posts',     'posts',     'N min czytania'],
  ['el', 'posts',     'posts',     'N \u03bb\u03b5\u03c0\u03c4\u03ac \u03b1\u03bd\u03ac\u03b3\u03bd\u03c9\u03c3\u03b7\u03c2'],
  ['uk', 'posts',     'blogPosts', 'N \u0445\u0432 \u0447\u0438\u0442\u0430\u043d\u043d\u044f'],
  ['nl', 'posts',     'posts',     'N min leestijd'],
];

// ============================================================
// Utils
// ============================================================

function log(...args) { console.log(`[deploy]`, ...args); }
function warn(...args) { console.warn(`[deploy \u26a0]`, ...args); }

function readArticle(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Cannot parse frontmatter in ${filePath}`);
  const [, fm, body] = match;
  const meta = {};
  for (const line of fm.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    let val = kv[2].replace(/^"(.*)"$/, '$1');
    if (kv[1] === 'tags') {
      try { meta.tags = JSON.parse(val); } catch { meta.tags = [val]; }
    } else {
      meta[kv[1]] = val;
    }
  }
  return { ...meta, body };
}

function estimateReadTime(body, wpm = 200) {
  const wc = body.replace(/<[^>]+>/g, ' ').replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
  return Math.max(1, Math.round(wc / wpm));
}

// ============================================================
// Markdown to JSX
// ============================================================

function mdBodyToJSX(body) {
  const lines = body.split('\n');
  const result = [];
  let inCode = false, codeBuf = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const tr = l.trimStart();
    if (tr.startsWith('```')) {
      if (inCode) {
        const ec = codeBuf.join('\n').replace(/`/g, '\\`').replace(/\${/g, '\\${');
        result.push(`        <pre><code>{\`${ec}\`}</code></pre>`);
        codeBuf = []; inCode = false;
      } else { inCode = true; }
      continue;
    }
    if (inCode) { codeBuf.push(l); continue; }
    if (tr.startsWith('> ')) { result.push(`        <blockquote>${escI(tr.slice(2))}</blockquote>`); continue; }
    if (/^-{3,}$/.test(tr)) { result.push(`        <hr />`); continue; }
    if (!tr) continue;
    if (/^## (.+)/.test(tr)) { result.push(`        <h2>${escI(tr.match(/^## (.+)/)[1])}</h2>`); continue; }
    if (/^### (.+)/.test(tr)) { result.push(`        <h3>${escI(tr.match(/^### (.+)/)[1])}</h3>`); continue; }
    if (/^#### (.+)/.test(tr)) { result.push(`        <h4>${escI(tr.match(/^#### (.+)/)[1])}</h4>`); continue; }
    // Tables
    if (tr.startsWith('|') && tr.endsWith('|')) {
      const nl = lines[i + 1] || '';
      if (/^\|[\s\-:|]+\|$/.test(nl)) {
        const tbl = [tr]; i++; i++;
        while (i < lines.length && lines[i].startsWith('|')) { tbl.push(lines[i]); i++; }
        i--;
        result.push(convertTable(tbl)); continue;
      }
    }
    // Lists
    if (/^(\s*)[-*]\s+/.test(tr)) {
      const items = [];
      items.push(tr.replace(/^(\s*)[-*]\s+/, ''));
      i++;
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i].trimStart())) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      i--;
      result.push(ul(items)); continue;
    }
    if (/^(\s*)\d+\.\s+/.test(tr)) {
      const items = [];
      items.push(tr.replace(/^\s*\d+\.\s+/, ''));
      i++;
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i].trimStart())) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      i--;
      result.push(ol(items)); continue;
    }
    result.push(`        <p>${escMD(tr)}</p>`);
  }
  return result.join('\n');
}

function escI(t) { return t.replace(/"/g, '&quot;'); }
function escMD(t) {
  return t.replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/"/g, '&quot;');
}
function ul(it) { return `        <ul>\n${it.map(i => `          <li>${escMD(i)}</li>`).join('\n')}\n        </ul>`; }
function ol(it) { return `        <ol>\n${it.map(i => `          <li>${escMD(i)}</li>`).join('\n')}\n        </ol>`; }

function convertTable(ls) {
  const rows = [];
  for (const l of ls) {
    if (/^\|[\s\-:|]+\|$/.test(l)) continue;
    rows.push(l.split('|').slice(1, -1).map(c => c.trim()));
  }
  if (!rows.length) return '';
  const hc = rows[0].map(c => `                <th className="p-3 text-left border border-gray-200 dark:border-gray-700">${escMD(c)}</th>`).join('\n');
  const hr = `              <tr className="bg-gray-100 dark:bg-gray-800">\n${hc}\n              </tr>`;
  const br = rows.slice(1).map((cells, idx) => {
    const bg = idx % 2 === 1 ? ' bg-gray-50 dark:bg-gray-800/50' : '';
    const ce = cells.map(c => `                <td className="p-3 border border-gray-200 dark:border-gray-700">${escMD(c)}</td>`).join('\n');
    return `              <tr className="border-b border-gray-200 dark:border-gray-700${bg}">\n${ce}\n              </tr>`;
  }).join('\n');
  return `        <div className="overflow-x-auto my-6">\n          <table className="w-full border-collapse">\n            <thead>\n${hr}\n            </thead>\n            <tbody>\n${br}\n            </tbody>\n          </table>\n        </div>`;
}

// ============================================================
// Entry builders
// ============================================================

function listingEntry({ slug, title, description, date, readTime, tags }) {
  const ts = tags.map(t => `"${t.replace(/"/g, '\\"')}"`).join(', ');
  return `  {\n    slug: "${slug}",\n    title: "${title.replace(/"/g, '&quot;')}",\n    description:\n      "${description.replace(/"/g, '&quot;')}",\n    date: "${date}",\n    readTime: "${readTime}",\n    tags: [${ts}],\n  },`;
}

function slugEntry({ slug, title, description, date, readTime, tags, content }) {
  const ts = tags.map(t => `"${t.replace(/"/g, '\\"')}"`).join(', ');
  return `  {\n    slug: "${slug}",\n    title: "${title.replace(/"/g, '&quot;')}",\n    description:\n      "${description.replace(/"/g, '&quot;')}",\n    date: "${date}",\n    readTime: "${readTime}",\n    tags: [${ts}],\n    content: (\n      <>\n${content}\n      </>\n    ),\n  },`;
}

// ============================================================
// Python patch generator
// ============================================================

function genPythonScript(slug, langPatches) {
  const insertions = [];
  for (const { lang, fileType, varName, entry } of langPatches) {
    if (!entry) continue;
    const baseDir = path.join(PROJECT, 'src/app', lang);
    if (fileType === 'listing') {
      insertions.push({ file: path.join(baseDir, 'blog', 'page.tsx'), varName, entry });
    } else {
      insertions.push({ file: path.join(baseDir, 'blog', '[slug]', 'page.tsx'), varName, entry });
    }
  }

  // Build the `insert_into_file` function in Python, carefully avoiding 
  // any backslash escapes that JS template literals would misinterpret.
  // Key rules for this JS template:
  //   \\\\  ->  \\  ->  \\ (Python needs \\\\ for literal backslash)
  //   \\n   ->  \\n  ->  \\n (literal backslash-n in comment)
  //   We use unicode escapes for any special chars

  // The Python function is built as an array of strings to avoid escape complexity
  const fnLines = [
    'def insert_into_file(filepath, var_name, entry_text):',
    '    if not os.path.exists(filepath):',
    '        print(f"  SKIP  {filepath} (not found)")',
    '        return False',
    '    with open(filepath, "r", encoding="utf-8") as f:',
    '        content = f.read()',
    '    # Find the posts array opening bracket',
    '    pat1 = rf"(?:^|\\n)(\\s*)(?:export\\s+)?const\\s+{re.escape(var_name)}"',
    '    pat1 += r"(?::\\s*\\w*Post\\[\\])?\\s*=\\s*\\["',
    '    arr_pat = re.compile(pat1, re.MULTILINE)',
    '    match = arr_pat.search(content)',
    '    if not match:',
    '        pat2 = rf"(?:^|\\n)(\\s*)(?:export\\s+)?const\\s+{re.escape(var_name)}\\s*=\\s*\\["',
    '        arr_pat = re.compile(pat2, re.MULTILINE)',
    '        match = arr_pat.search(content)',
    '    if not match:',
    '        print(f"  WARN  Could not find variable \'{var_name}\' in {filepath}")',
    '        return False',
    '    # Find const line for indentation reference',
    '    cs = match.start()',
    '    bol = content.rfind("\\n", 0, cs)',
    '    bol = 0 if bol == -1 else bol + 1',
    '    eol = content.find("\\n", match.end())',
    '    eol = len(content) if eol == -1 else eol',
    '    const_line = content[bol:eol]',
    '    im = re.match(r"^(\\s*)", const_line)',
    '    orig_indent = im.group(1) if im else ""',
    '    entry_indent = orig_indent + "  "',
    '    # Find position after opening bracket',
    '    bp = content.rfind("[", cs, match.end())',
    '    if bp == -1:',
    '        print(f"  WARN  Could not find bracket in {filepath}")',
    '        return False',
    '    after_bracket = bp + 1',
    '    # Reindent entry text',
    '    ri = ["\\n"]',  // leading newline
    '    for line in entry_text.split("\\n"):',
    '        if line.strip():',
    '            ri.append(entry_indent + line.lstrip())',
    '        else:',
    '            ri.append("")',
    '    fe = "\\n".join(ri)',
    '    if not fe.endswith("\\n"):',
    '        fe += "\\n"',
    '    # Insert right after the bracket',
    '    ip = after_bracket',
    '    new_content = content[:ip] + fe + content[ip:]',
    '    with open(filepath, "w", encoding="utf-8") as f:',
    '        f.write(new_content)',
    '    print(f"  OK    {os.path.relpath(filepath)}")',
    '    return True',
  ];

  // JSON serialize the entries for the ARTICLES list
  const articlesJson = JSON.stringify(insertions.map(({ file, varName, entry }) => ({
    file,
    varName,
    entry,
  })));

  const script = `#!/usr/bin/env python3
"""Insert blog post "${slug}" into all language TSX files."""

import os
import re

ARTICLES = ${articlesJson}

${fnLines.join('\n')}

def main():
    print(f"Inserting article into {len(ARTICLES)} file(s)...")
    success = 0
    for article in ARTICLES:
        if insert_into_file(article["file"], article["varName"], article["entry"]):
            success += 1
    print(f"\\nDone: {success}/{len(ARTICLES)} files updated.")

if __name__ == "__main__":
    main()
`;

  return script;
}

// ============================================================
// Main
// ============================================================

async function main() {
  fs.mkdirSync(PATCHES_DIR, { recursive: true });

  const articleFiles = fs.readdirSync(SEO_DIR)
    .filter(f => (f.startsWith('new-en-') || /^en-\d{2}-.+\.md$/.test(f)) && f.endsWith('.md'))
    .sort();

  if (articleFiles.length === 0) {
    log('No articles found. Nothing to deploy.');
    return;
  }

  log(`Processing ${articleFiles.length} article(s):`);
  articleFiles.forEach(f => log(`  - ${f}`));

  const today = new Date().toISOString().slice(0, 10);

  for (const file of articleFiles) {
    const filePath = path.join(SEO_DIR, file);
    const article = readArticle(filePath);
    const slug = article.slug;
    const readTime = estimateReadTime(article.body);
    const date = article.date || today;

    log(`\n=== ${article.title} ===`);
    log(`Slug: ${slug}, Read: ~${readTime} min`);

    const enContentJSX = mdBodyToJSX(article.body);
    const translationDir = path.join(TRANSLATIONS_DIR, slug);
    const hasTranslations = fs.existsSync(translationDir);

    const langPatches = [];

    for (const [code, slugVar, listingVar, rtPattern] of LANGUAGES) {
      let tTitle, tDesc, tTags, tContent, tReadTime;
      let useTranslation = false;

      if (hasTranslations) {
        const tfPath = path.join(translationDir, `${code}.txt`);
        if (fs.existsSync(tfPath)) {
          try {
            const data = JSON.parse(fs.readFileSync(tfPath, 'utf-8'));
            if (data.title && data.title.trim() && data.content && data.content.trim()) {
              tTitle = data.title;
              tDesc = data.description || article.description;
              tTags = data.tags && data.tags.length > 0 ? data.tags : article.tags;
              tContent = data.content;
              tReadTime = data.readTime || rtPattern.replace('N', String(readTime));
              useTranslation = true;
            }
          } catch {}
        }
      }

      const localizedReadTime = useTranslation ? tReadTime : rtPattern.replace('N', String(readTime));
      const title = useTranslation ? tTitle : article.title;
      const desc = useTranslation ? tDesc : (article.description || article.meta_description);
      const tags = useTranslation ? tTags : article.tags;
      const content = useTranslation ? tContent : enContentJSX;

      const finalContent = code === 'en' ? enContentJSX : content;
      const finalTitle = code === 'en' ? article.title : title;
      const finalDesc = code === 'en' ? (article.description || article.meta_description) : desc;
      const finalTags = code === 'en' ? article.tags : (tags || article.tags);
      const finalReadTime = code === 'en' ? `${readTime} min read` : localizedReadTime;

      const le = listingEntry({ slug, title: finalTitle, description: finalDesc, date, readTime: finalReadTime, tags: finalTags });
      const se = slugEntry({ slug, title: finalTitle, description: finalDesc, date, readTime: finalReadTime, tags: finalTags, content: finalContent });

      langPatches.push({ lang: code, fileType: 'listing', varName: listingVar, entry: le });
      langPatches.push({ lang: code, fileType: 'slug', varName: slugVar, entry: se });

      if (!useTranslation && code !== 'en') {
        log(`  ${code}: using English content (no translation available)`);
      }
    }

    const pythonScript = genPythonScript(slug, langPatches);
    const patchFile = path.join(PATCHES_DIR, `insert-${slug}.py`);
    fs.writeFileSync(patchFile, pythonScript, 'utf-8');
    fs.chmodSync(patchFile, 0o755);
    log(`  \u270e ${patchFile}`);
  }

  generateMasterPatch();
  log('\n\u2705 All patch scripts generated!');
  log(`\nTo apply all patches:`);
  log(`  bash scripts/patches/patch-apply-all.sh`);
  log(`\nOr apply a single article:`);
  log(`  python3 scripts/patches/insert-<slug>.py`);
}

function generateMasterPatch() {
  const patches = fs.readdirSync(PATCHES_DIR).filter(f => f.startsWith('insert-') && f.endsWith('.py')).sort();
  if (!patches.length) return;
  const content = [
    '#!/bin/bash',
    '# Master patch script',
    `# Generated: ${new Date().toISOString()}`,
    'set -e',
    'SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"',
    ...patches.map(f => `echo "  Applying ${f}..." && python3 "$SCRIPT_DIR/${f}"`),
    'echo ""',
    'echo "\u2705 All patches applied!"',
  ];
  fs.writeFileSync(path.join(PATCHES_DIR, 'patch-apply-all.sh'), content.join('\n'), 'utf-8');
  fs.chmodSync(path.join(PATCHES_DIR, 'patch-apply-all.sh'), 0o755);
}

main().catch(err => { console.error(err); process.exit(1); });
