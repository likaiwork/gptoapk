#!/usr/bin/env node
/**
 * generate-translations.js
 *
 * For each English article in seo-articles/new-en-*.md, generate translation
 * stubs for all 32 languages.
 *
 * Output: scripts/translations/<slug>/<lang>.txt
 *
 * Languages (in order): zh → ja → ko → ru → es → fr → de → pt → it → vi → th
 * → id → ms → tl → hi → ar → bn → ur → fa → he → nb → da → sv → fi → ro
 * → hu → cs → pl → el → uk → nl
 *
 * Each file contains a JSON blob with:
 *   - title       (translated title)
 *   - description (translated meta_description)
 *   - tags        (translated tags)
 *   - readTime    (localized read time)
 *   - content     (full HTML body – a starting point for AI-assisted translation)
 *
 * For the first run, this script writes AI translation prompts. Human
 * translators or a downstream AI can fill in the actual translations.
 *
 * Usage: node scripts/generate-translations.js [--ai]
 *   --ai   Attempt to generate preliminary content via AI.
 *         Without --ai, only write metadata stubs.
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// Language configuration
// ============================================================
const LANGUAGES = [
  // (code, name, readTimePattern)
  // readTimePattern: use "N" as placeholder for the number
  ['zh', 'Chinese (Simplified)', 'N 分钟阅读'],
  ['ja', 'Japanese', 'N分で読める'],
  ['ko', 'Korean', 'N분 읽기'],
  ['ru', 'Russian', 'N мин чтения'],
  ['es', 'Spanish', 'N min de lectura'],
  ['fr', 'French', 'N min de lecture'],
  ['de', 'German', 'N Min. Lesezeit'],
  ['pt', 'Portuguese', 'N min de leitura'],
  ['it', 'Italian', 'N min di lettura'],
  ['vi', 'Vietnamese', 'N phút đọc'],
  ['th', 'Thai', 'N นาทีในการอ่าน'],
  ['id', 'Indonesian', 'N menit baca'],
  ['ms', 'Malay', 'N minit bacaan'],
  ['tl', 'Filipino', 'N minutong pagbasa'],
  ['hi', 'Hindi', 'N मिनट पढ़ने का समय'],
  ['ar', 'Arabic', 'N دقائق للقراءة'],
  ['bn', 'Bengali', 'N মিনিট পড়া'],
  ['ur', 'Urdu', 'N منٹ پڑھنے کا وقت'],
  ['fa', 'Persian', 'N دقیقه مطالعه'],
  ['he', 'Hebrew', 'N דקות קריאה'],
  ['nb', 'Norwegian Bokmål', 'N min lesing'],
  ['da', 'Danish', 'N min læsning'],
  ['sv', 'Swedish', 'N min läsning'],
  ['fi', 'Finnish', 'N min lukuaika'],
  ['ro', 'Romanian', 'N min de citire'],
  ['hu', 'Hungarian', 'N perc olvasás'],
  ['cs', 'Czech', 'N min čtení'],
  ['pl', 'Polish', 'N min czytania'],
  ['el', 'Greek', 'N λεπτά ανάγνωσης'],
  ['uk', 'Ukrainian', 'N хв читання'],
  ['nl', 'Dutch', 'N min leestijd'],
];

// ============================================================
// Read source articles
// ============================================================

const SEO_DIR = path.resolve(__dirname, '..', 'seo-articles');
const OUT_DIR = path.resolve(__dirname, 'translations');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const [, frontmatter, body] = match;
  const meta = {};
  for (const line of frontmatter.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) {
      const val = kv[2].replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
      if (kv[1] === 'tags') {
        try { meta.tags = JSON.parse(val); } catch { meta.tags = val.split(',').map(s => s.trim().replace(/^\["?|"?\]?$/g, '')); }
      } else {
        meta[kv[1]] = val;
      }
    }
  }
  return { meta, body };
}

/**
 * Estimate read time in minutes based on word count.
 */
function estimateReadTime(body) {
  const words = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0);
  return Math.max(1, Math.round(words.length / 200));
}

// ============================================================
// Translation prompt generator
// ============================================================

function generateTranslationPrompt(article, langCode, langName) {
  return `
Translate the following English blog article into ${langName}.

## Metadata
- **Original title:** ${article.meta.title}
- **Original description:** ${article.meta.meta_description || article.meta.description}
- **Original tags:** ${JSON.stringify(article.meta.tags)}

## Translation Requirements
1. **Title** — Translate naturally for ${langName} readers. Keep similar length.
2. **Description** — Accurately convey the SEO meta description.
3. **Tags** — Translate or localize each tag for ${langName} search intent.
4. **Content** — Full article body in ${langName}. Preserve HTML structure (h2, h3, p, ul, ol, pre, code, blockquote, table, etc.).
5. **Code blocks** — Do NOT translate code blocks. Keep code content exactly as-is.
6. **Brand/product names** — Do NOT translate "gptoapk.com", "Google Play", "APK", "ADB", "SHA-256", etc.
7. **Links** — Keep URLs as-is.

Output format (JSON only, no extra text):
\`\`\`json
{
  "title": "Translated title",
  "description": "Translated meta description",
  "tags": ["tag1", "tag2", ...],
  "content": "Translated HTML body content (without the outer <></> wrapper)"
}
\`\`\`

## Original Content
${article.body}
`.trim();
}

// ============================================================
// Main
// ============================================================

async function main() {
  // Find all English articles
  const files = fs.readdirSync(SEO_DIR)
    .filter(f => f.startsWith('new-en-') && f.endsWith('.md'))
    .sort();

  if (files.length === 0) {
    console.error('No files found matching seo-articles/new-en-*.md');
    process.exit(1);
  }

  console.log(`Found ${files.length} article(s):`);
  files.forEach(f => console.log(`  - ${f}`));

  const useAI = process.argv.includes('--ai');

  for (const file of files) {
    const content = fs.readFileSync(path.join(SEO_DIR, file), 'utf-8');
    const parsed = parseFrontmatter(content);
    if (!parsed) {
      console.error(`  ✗ Failed to parse ${file}`);
      continue;
    }

    const { meta, body } = parsed;
    const slug = meta.slug;
    const readTime = estimateReadTime(body);

    console.log(`\nProcessing: ${meta.title} (slug: ${slug}, ~${readTime} min read)`);

    // Create output directory
    const articleDir = path.join(OUT_DIR, slug);
    fs.mkdirSync(articleDir, { recursive: true });

    for (const [code, name, rtPattern] of LANGUAGES) {
      const localizedReadTime = rtPattern.replace('N', String(readTime));
      const output = {
        title: '',
        description: '',
        tags: [],
        readTime: localizedReadTime,
        content: '',
        // Keep English for reference
        en_title: meta.title,
        en_description: meta.meta_description || meta.description,
        en_tags: meta.tags,
        en_content: body,
      };

      const outPath = path.join(articleDir, `${code}.txt`);

      if (useAI) {
        output.translation_prompt = generateTranslationPrompt(parsed, code, name);
        fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
        console.log(`  ✎ ${code}.txt (AI prompt)`);
      } else {
        // Stub mode — just the English reference + read time
        // User/AI fills in translations later
        fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
        console.log(`  ✎ ${code}.txt (stub)`);
      }
    }

    // Also create a README for this article
    const readmePath = path.join(articleDir, 'README.md');
    const readmeContent = `# Translation Files for "${meta.title}"

| Language | File | Status |
|----------|------|--------|
${LANGUAGES.map(([code, name]) => `| ${name} (${code}) | \`${code}.txt\` | ⏳ Pending |`).join('\n')}

**Slug:** \`${slug}\`  
**Read time (English):** ${readTime} min

## How to fill translations

Each \`<lang>.txt\` file contains a JSON blob with:
- \`title\` — Translated title
- \`description\` — Translated description
- \`tags\` — Translated tags array
- \`readTime\` — Localized read time
- \`content\` — Full HTML body in the target language
- \`en_title\`, \`en_description\`, \`en_tags\`, \`en_content\` — English reference

Edit the \`title\`, \`description\`, \`tags\`, and \`content\` fields. Keep the JSON structure intact.
`;
    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log(`  ✎ README.md`);
  }

  console.log('\n✅ Done!');
  const total = files.length * LANGUAGES.length;
  console.log(`Generated ${total} translation stubs across ${files.length} articles.`);
  console.log('\nNext step: Fill in translations (manually or with --ai flag)');
  console.log('Then run: node scripts/deploy-articles.js');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
