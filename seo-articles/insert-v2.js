const fs = require('fs');
const path = require('path');

// Read all 10 markdown files
const articles = [
  { file: 'new-en-01-apk-download-manager-pc.md', slug: 'apk-download-manager-pc' },
  { file: 'new-en-02-apk-parse-error-fix.md', slug: 'apk-parse-error-fix' },
  { file: 'new-en-03-apk-sideloading-vs-google-play.md', slug: 'apk-sideloading-vs-google-play-store' },
  { file: 'new-en-04-apk-obb-download-guide.md', slug: 'apk-obb-download-guide' },
  { file: 'new-en-05-apk-mod-safety-guide.md', slug: 'apk-mod-safety-guide' },
  { file: 'new-en-06-apk-file-location-android.md', slug: 'apk-file-location-on-android' },
  { file: 'new-en-07-download-old-apk-versions.md', slug: 'download-old-apk-versions' },
  { file: 'new-en-08-best-apkmirror-alternatives.md', slug: 'best-apkmirror-alternatives' },
  { file: 'new-en-09-transfer-apk-phone-to-pc.md', slug: 'transfer-apk-phone-to-pc' },
  { file: 'new-en-10-batch-apk-installer.md', slug: 'batch-apk-installer' },
];

const dir = __dirname;

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('No frontmatter found');
  
  const frontmatter = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length > 0) {
      let val = rest.join(':').trim();
      if (val.startsWith('[')) {
        val = val.replace(/[\[\]]/g, '').split(',').map(v => v.trim().replace(/"/g, ''));
      } else {
        val = val.replace(/^"|"$/g, '');
      }
      frontmatter[key.trim()] = val;
    }
  });
  
  if (frontmatter.tags) {
    frontmatter.tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : 
      frontmatter.tags.split(',').map(t => t.trim().replace(/"/g, ''));
  }
  
  return { frontmatter, body: match[2].trim() };
}

function escapeForPre(str) {
  return str.replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

function convertTableToJsx(tableContent) {
  const lines = tableContent.trim().split('\n');
  const result = [];
  result.push('<div className="overflow-x-auto my-6">');
  result.push('<table className="w-full border-collapse">');
  result.push('<thead>');
  result.push('<tr className="bg-gray-100 dark:bg-gray-800">');
  
  const headerCells = lines[0].split('|').filter(c => c.trim());
  headerCells.forEach(cell => {
    const cellContent = convertInlineFormatting(cell.trim());
    result.push(`<th className="p-3 text-left border border-gray-200 dark:border-gray-700">${cellContent}</th>`);
  });
  result.push('</tr>');
  result.push('</thead>');
  result.push('<tbody>');
  
  let rowIndex = 0;
  for (let i = 2; i < lines.length; i++) {
    const row = lines[i].trim();
    if (!row) continue;
    if (row.match(/^\|[-:\s|]+\|$/)) continue;
    const cells = row.split('|').filter(c => c.trim());
    if (cells.length === 0) continue;
    
    const isEven = rowIndex % 2 === 1;
    rowIndex++;
    
    let rowClass = 'border-b border-gray-200 dark:border-gray-700';
    if (isEven) {
      rowClass += ' bg-gray-50 dark:bg-gray-800/50';
    }
    result.push(`<tr className="${rowClass}">`);
    cells.forEach(cell => {
      const cellContent = convertInlineFormatting(cell.trim());
    result.push(`<td className="p-3 border border-gray-200 dark:border-gray-700">${cellContent}</td>`);
    });
    result.push('</tr>');
  }
  
  result.push('</tbody>');
  result.push('</table>');
  result.push('</div>');
  return result.join('\n');
}

function convertInlineFormatting(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/`([^`]+)`/g, (match, code) => {
    // If code contains angle brackets or curly braces, use template literal to avoid JSX parsing issues
    if (/[<>{}]/.test(code)) {
      const escaped = escapeForPre(code);
      return `<code>{\`${escaped}\`}</code>`;
    }
    return `<code>${code}</code>`;
  });
  
  // Escape bare angle brackets in text that aren't part of HTML/JSX tags
  // < followed by anything other than /a-zA-Z is likely text content
  // This handles "<25 MB)" and similar cases
  text = text.replace(/<(?![\/a-zA-Z!?])/g, '&lt;');
  
  return text;
}

function convertMarkdownToJsx(body) {
  const lines = body.split('\n');
  const result = [];
  let i = 0;
  let inTable = false;
  let tableLines = [];
  let inCodeBlock = false;
  let codeLines = [];
  let inList = false;
  let listItems = [];
  let inOrderedList = false;
  let orderedListItems = [];

  function flushList() {
    if (inList && listItems.length > 0) {
      result.push('<ul>');
      listItems.forEach(item => result.push(`<li>${item}</li>`));
      result.push('</ul>');
      listItems = [];
      inList = false;
    }
    if (inOrderedList && orderedListItems.length > 0) {
      result.push('<ol>');
      orderedListItems.forEach(item => result.push(`<li>${item}</li>`));
      result.push('</ol>');
      orderedListItems = [];
      inOrderedList = false;
    }
  }

  function flushTable() {
    if (inTable && tableLines.length > 0) {
      result.push(convertTableToJsx(tableLines.join('\n')));
      tableLines = [];
    }
    inTable = false;
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code block
    if (trimmed.startsWith('```')) {
      flushList();
      flushTable();
      if (inCodeBlock) {
        result.push(`<pre><code>{\`${codeLines.join('\n')}\`}</code></pre>`);
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(escapeForPre(trimmed));
      i++;
      continue;
    }

    // Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      if (!inTable) {
        inTable = true;
        tableLines = [];
      }
      if (!trimmed.match(/^\|[-:\s|]+\|$/)) {
        tableLines.push(trimmed);
      }
      i++;
      continue;
    }

    if (inTable) {
      flushTable();
      // Don't continue, process this line
    }

    // Empty line
    if (trimmed === '') {
      flushList();
      flushTable();
      i++;
      continue;
    }

    flushTable();

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList();
      const content = convertInlineFormatting(trimmed.substring(4));
      result.push(`<h3>${content}</h3>`);
      i++;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      const content = convertInlineFormatting(trimmed.substring(3));
      result.push(`<h2>${content}</h2>`);
      i++;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      flushList();
      const content = convertInlineFormatting(trimmed.substring(2));
      result.push(`<h2>${content}</h2>`);
      i++;
      continue;
    }

    // List items
    if (trimmed.startsWith('- ')) {
      if (inOrderedList) { flushList(); }
      inList = true;
      listItems.push(convertInlineFormatting(trimmed.substring(2)));
      i++;
      continue;
    }

    if (trimmed.match(/^\d+\.\s/)) {
      if (inList) { flushList(); }
      inOrderedList = true;
      orderedListItems.push(convertInlineFormatting(trimmed.replace(/^\d+\.\s/, '')));
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      result.push(`<blockquote>${convertInlineFormatting(trimmed.substring(2))}</blockquote>`);
      i++;
      continue;
    }

    // Regular paragraph
    flushList();
    if (trimmed.startsWith('<p class="lead">')) {
      const content = convertInlineFormatting(trimmed.replace(/^<p class="lead">/, '').replace(/<\/p>$/, ''));
      result.push(`<p className="lead">${content}</p>`);
    } else {
      result.push(`<p>${convertInlineFormatting(trimmed)}</p>`);
    }
    i++;
  }

  flushList();
  flushTable();
  
  if (inCodeBlock && codeLines.length > 0) {
    result.push(`<pre><code>{\`${codeLines.join('\n')}\`}</code></pre>`);
  }

  return result.join('\n').split('\n').filter(l => l.trim()).join('\n');
}

function generateJsxEntry(frontmatter, body) {
  const jsxBody = convertMarkdownToJsx(body);
  
  const slug = frontmatter.slug;
  const title = frontmatter.title;
  const description = frontmatter.description;
  const date = frontmatter.date;
  const readTime = frontmatter.readTime;
  const tags = frontmatter.tags.map(t => `"${t}"`).join(', ');

  return `  {
    slug: "${slug}",
    title: "${title}",
    description:
    "${description}",
    date: "${date}",
    readTime: "${readTime}",
    tags: [${tags}],
    content: (
      <>
${jsxBody.split('\n').map(l => '        ' + l).join('\n')}
      </>
    ),
  },`;
}

function generateListEntry(frontmatter) {
  const slug = frontmatter.slug;
  const title = frontmatter.title;
  const description = frontmatter.description;
  const date = frontmatter.date;
  const readTime = frontmatter.readTime;
  const tags = frontmatter.tags.map(t => `"${t}"`).join(', ');

  return `  {
    slug: "${slug}",
    title: "${title}",
    description:
    "${description}",
    date: "${date}",
    readTime: "${readTime}",
    tags: [${tags}],
  },`;
}

// Parse all articles
let allJsxEntries = [];
let allListEntries = [];

articles.forEach(({ file, slug }) => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);
  frontmatter.slug = slug;
  
  const jsx = generateJsxEntry(frontmatter, body);
  const listEntry = generateListEntry(frontmatter);
  
  allJsxEntries.push(jsx);
  allListEntries.push(listEntry);
  
  console.log(`Generated: ${slug}`);
});

const jsxBlock = allJsxEntries.join('\n\n');
const listBlock = allListEntries.join('\n\n');

// Read existing files
const slugPagePath = '/Users/likai/Documents/XCodePorject/gptoapk/src/app/en/blog/[slug]/page.tsx';
const blogPagePath = '/Users/likai/Documents/XCodePorject/gptoapk/src/app/en/blog/page.tsx';

let slugContent = fs.readFileSync(slugPagePath, 'utf8');
let blogContent = fs.readFileSync(blogPagePath, 'utf8');

// Insert into [slug]/page.tsx - right after "const posts: BlogPost[] = ["
const markerSlug = 'const posts: BlogPost[] = [';
const idxSlug = slugContent.indexOf(markerSlug);
if (idxSlug === -1) { console.error('Marker not found in slug page'); process.exit(1); }

const insertPosSlug = idxSlug + markerSlug.length;
slugContent = slugContent.slice(0, insertPosSlug) + '\n' + jsxBlock + '\n\n' + slugContent.slice(insertPosSlug).trimStart();
fs.writeFileSync(slugPagePath, slugContent);
console.log('Inserted into [slug]/page.tsx');

// Insert into blog/page.tsx - right after "const posts: BlogPost[] = ["
const markerBlog = 'const posts: BlogPost[] = [';
const idxBlog = blogContent.indexOf(markerBlog);
if (idxBlog === -1) { console.error('Marker not found in blog page'); process.exit(1); }

const insertPosBlog = idxBlog + markerBlog.length;
blogContent = blogContent.slice(0, insertPosBlog) + '\n' + listBlock + '\n\n' + blogContent.slice(insertPosBlog).trimStart();
fs.writeFileSync(blogPagePath, blogContent);
console.log('Inserted into blog/page.tsx');

console.log('\nDone! Inserted', allJsxEntries.length, 'articles into both files.');
