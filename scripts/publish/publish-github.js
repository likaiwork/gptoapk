#!/usr/bin/env node

/**
 * publish-github.js — 在 GitHub Actions 上运行，自动发布文章
 * 
 * 用法（环境变量控制）:
 *   PLATFORM=blogger node publish-github.js
 *   PLATFORM=all    node publish-github.js
 * 
 * 支持的平台:
 *   - blogger:   Blogger (Google Blog)
 *   - linkedin:  LinkedIn Articles
 *   - substack:  Substack
 *   - tumblr:    Tumblr
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ============================================================
// 配置
// ============================================================

const PLATFORM = process.env.PLATFORM || 'all';
const ARTICLE_COUNT = parseInt(process.env.ARTICLE_COUNT || '5');

// 文章目录（在 GitHub workflow 中，从项目根目录定位）
const ARTICLE_DIR = path.join(__dirname, '..', '..', 'content', 'articles');

// 如果没有 content/articles，从 seo-articles 目录找
const FALLBACK_DIR = path.join(__dirname, '..', '..', 'seo-articles');

// ============================================================
// 文章加载
// ============================================================

function loadArticles() {
  // 先找 content/articles，再找 seo-articles
  let dir = ARTICLE_DIR;
  if (!fs.existsSync(dir)) dir = FALLBACK_DIR;
  if (!fs.existsSync(dir)) {
    console.error(`❌ 文章目录不存在: ${ARTICLE_DIR} 或 ${FALLBACK_DIR}`);
    // 在当前目录找 .md 文件
    const cwdFiles = fs.readdirSync(process.cwd()).filter(f => /^en-\d+.*\.md$/.test(f));
    if (cwdFiles.length > 0) {
      dir = process.cwd();
    } else {
      process.exit(1);
    }
  }

  console.log(`📂 文章目录: ${dir}`);

  const files = fs.readdirSync(dir)
    .filter(f => /^en-\d+.*\.md$/.test(f))
    .sort()
    .slice(0, ARTICLE_COUNT);

  console.log(`📄 加载 ${files.length} 篇文章`);

  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    
    // 简单解析 front matter 和正文
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    let meta = {};
    let body = raw;
    
    if (match) {
      const fmLines = match[1].split('\n');
      for (const line of fmLines) {
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0) {
          const key = line.slice(0, colonIdx).trim();
          let val = line.slice(colonIdx + 1).trim();
          // Remove surrounding quotes
          if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
          // Handle arrays
          if (val.startsWith('[') && val.endsWith(']')) {
            val = val.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
          }
          meta[key] = val;
        }
      }
      body = match[2];
    }

    return {
      file,
      title: meta.title || path.basename(file, '.md'),
      tags: Array.isArray(meta.tags) ? meta.tags.slice(0, 4) : [],
      slug: meta.slug || path.basename(file, '.md'),
      body,
    };
  });
}

// ============================================================
// Blogger 发布
// ============================================================

async function publishToBlogger(page, article) {
  console.log(`\n📤 [Blogger] ${article.title}`);
  
  await page.goto('https://www.blogger.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  // 登录检查
  if (page.url().includes('accounts.google.com')) {
    // 需要登录
    console.log('   🔑 正在登录 Blogger...');
    await page.fill('input[type="email"]', process.env.BLOGGER_EMAIL || '');
    await page.click('#identifierNext');
    await page.waitForTimeout(2000);
    await page.fill('input[type="password"]', process.env.BLOGGER_PASSWORD || '');
    await page.click('#passwordNext');
    await page.waitForTimeout(5000);
  }
  
  // 点击 New Post
  try {
    await page.click('text=New post', { timeout: 10000 });
  } catch {
    // 可能已经在新文章页了
  }
  await page.waitForTimeout(3000);
  
  // 标题
  try {
    await page.fill('input[aria-label*="Post title"i]', article.title);
  } catch {
    const input = await page.$('[contenteditable="true"]');
    if (input) await input.fill(article.title);
  }
  console.log('   ✏️ 标题');
  await page.waitForTimeout(1000);
  
  // 内容 — 粘贴 markdown 内容
  try {
    const editor = await page.$('[contenteditable="true"]');
    if (editor) {
      // 清除现有内容，用写入
      await editor.click();
      await page.keyboard.press('Meta+a');
      await page.keyboard.type(article.body, { delay: 3 });
    }
  } catch (e) {
    console.log(`   ⚠️ 写入内容失败: ${e.message}`);
  }
  console.log('   ✏️ 内容');
  await page.waitForTimeout(2000);
  
  // 发布
  try {
    await page.click('text=Publish', { timeout: 10000 });
    await page.waitForTimeout(2000);
    try { await page.click('text=Confirm', { timeout: 5000 }); } catch {}
    console.log('   ✅ 发布成功!');
    return true;
  } catch (e) {
    console.log(`   ❌ 发布按钮失败: ${e.message}`);
    return false;
  }
}

// ============================================================
// LinkedIn 发布
// ============================================================

async function publishToLinkedIn(page, article) {
  console.log(`\n📤 [LinkedIn] ${article.title}`);
  
  await page.goto('https://www.linkedin.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  // 登录
  if (page.url().includes('login')) {
    console.log('   🔑 登录 LinkedIn...');
    await page.fill('#session_key', process.env.LINKEDIN_EMAIL || '');
    await page.fill('#session_password', process.env.LINKEDIN_PASSWORD || '');
    await page.click('[type="submit"]');
    await page.waitForTimeout(5000);
  }
  
  // 发文章
  try {
    await page.goto('https://www.linkedin.com/post/new/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // 标题
    await page.fill('[data-placeholder*="Headline"i], [aria-label*="Headline"i]', article.title);
    await page.waitForTimeout(1000);
    
    // 内容
    const editor = await page.$('[data-placeholder*="Write"i], [data-placeholder*="What do you want"i], [role="textbox"]');
    if (editor) {
      await editor.click();
      await page.keyboard.type(article.body, { delay: 2 });
    }
    await page.waitForTimeout(2000);
    
    // 发布
    await page.click('button:has-text("Publish")');
    await page.waitForTimeout(3000);
    console.log('   ✅ 发布成功!');
    return true;
  } catch (e) {
    console.log(`   ❌ 失败: ${e.message}`);
    return false;
  }
}

// ============================================================
// Substack 发布
// ============================================================

async function publishToSubstack(page, article) {
  console.log(`\n📤 [Substack] ${article.title}`);
  
  await page.goto('https://substack.com/sign-in', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  console.log('   🔑 登录 Substack...');
  await page.fill('[type="email"]', process.env.SUBSTACK_EMAIL || '');
  await page.click('button:has-text("Sign in")');
  await page.waitForTimeout(2000);
  await page.fill('[type="password"]', process.env.SUBSTACK_PASSWORD || '');
  await page.click('button:has-text("Sign in")');
  await page.waitForTimeout(5000);
  
  // 写文章
  try {
    await page.goto('https://substack.com/publish/post', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // 标题
    await page.fill('[placeholder*="Title"i]', article.title);
    await page.waitForTimeout(1000);
    
    // 内容
    const editor = await page.$('[contenteditable="true"]');
    if (editor) {
      await editor.click();
      await page.keyboard.press('Meta+a');
      await page.keyboard.type(article.body, { delay: 2 });
    }
    await page.waitForTimeout(2000);
    
    // 发布
    await page.click('button:has-text("Publish")');
    await page.waitForTimeout(2000);
    await page.click('button:has-text("Publish now")');
    await page.waitForTimeout(3000);
    console.log('   ✅ 发布成功!');
    return true;
  } catch (e) {
    console.log(`   ❌ 失败: ${e.message}`);
    return false;
  }
}

// ============================================================
// Tumblr 发布
// ============================================================

async function publishToTumblr(page, article) {
  console.log(`\n📤 [Tumblr] ${article.title}`);
  
  await page.goto('https://www.tumblr.com/login', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  console.log('   🔑 登录 Tumblr...');
  await page.fill('input[name="email"]', process.env.TUMBLR_EMAIL || '');
  await page.click('button:has-text("Continue"), button:has-text("Log in")');
  await page.waitForTimeout(2000);
  await page.fill('input[name="password"]', process.env.TUMBLR_PASSWORD || '');
  await page.click('button:has-text("Log in")');
  await page.waitForTimeout(5000);
  
  // 写文章
  try {
    await page.goto('https://www.tumblr.com/new/text', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // 标题 (Tumblr 文本文章没有传统标题，用第一段)
    const editor = await page.$('[contenteditable="true"]');
    if (editor) {
      // Tumble 的 first line 是标题区
      await page.fill('[data-gramm="false"]', article.title);
    }
    await page.waitForTimeout(1000);
    
    // 正文
    await page.keyboard.type(article.body, { delay: 2 });
    await page.waitForTimeout(2000);
    
    // 发布
    await page.click('button:has-text("Post"), button:has-text("Publish")');
    await page.waitForTimeout(3000);
    console.log('   ✅ 发布成功!');
    return true;
  } catch (e) {
    console.log(`   ❌ 失败: ${e.message}`);
    return false;
  }
}

// ============================================================
// 主控制
// ============================================================

async function main() {
  console.log('╔══════════════════════════════════════╗');
  console.log('║   🌐 GitHub Actions 文章发布器      ║');
  console.log('╚══════════════════════════════════════╝');
  console.log(`   平台: ${PLATFORM}`);
  console.log(`   篇数: ${ARTICLE_COUNT}`);
  console.log(`   Node: ${process.version}\n`);

  const articles = loadArticles();
  if (articles.length === 0) {
    console.log('❌ 没有找到文章');
    process.exit(1);
  }

  // 确定目标平台
  const platforms = PLATFORM === 'all' 
    ? ['blogger', 'linkedin', 'substack', 'tumblr'] 
    : [PLATFORM];

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  const results = {};

  for (const platform of platforms) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🌐 平台: ${platform.toUpperCase()}`);
    console.log(`${'='.repeat(50)}`);

    const fn = {
      blogger: publishToBlogger,
      linkedin: publishToLinkedIn,
      substack: publishToSubstack,
      tumblr: publishToTumblr,
    }[platform];

    if (!fn) {
      console.log(`❌ 未知平台: ${platform}`);
      continue;
    }

    let success = 0;
    let fail = 0;

    for (let i = 0; i < articles.length; i++) {
      try {
        const ok = await fn(page, articles[i]);
        if (ok) success++; else fail++;
      } catch (e) {
        console.log(`   ❌ 异常: ${e.message}`);
        fail++;
      }
      await page.waitForTimeout(3000);
    }

    results[platform] = { success, fail };
  }

  // 总结
  console.log(`\n\n📊 发布总结`);
  console.log('─'.repeat(40));
  for (const [p, r] of Object.entries(results)) {
    const icon = r.fail === 0 ? '✅' : '⚠️';
    console.log(`  ${icon} ${p}: ${r.success}成功 / ${r.fail}失败`);
  }

  await browser.close();
  console.log('\n✨ 完成!');
}

main().catch(err => {
  console.error('发生错误:', err.message);
  process.exit(1);
});
