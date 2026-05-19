#!/usr/bin/env node
/**
 * inject-today-articles.js — 把今天写的4篇文章注入到 en + zh 博客页面
 * 使用：cd /Users/likai/Documents/XCodePorject/gptoapk && node inject-today-articles.js
 */

const fs = require('fs');
const path = require('path');

const PROJECT = '/Users/likai/Documents/XCodePorject/gptoapk';
const SEO_DIR = '/Users/likai/.openclaw/workspace/seo-articles';
const EN_FILE = path.join(PROJECT, 'src/app/en/blog/[slug]/page.tsx');
const ZH_FILE = path.join(PROJECT, 'src/app/zh/blog/[slug]/page.tsx');

// ============================================================
// 英文文章 JSX content（今天的热词选题）
// ============================================================
const enArticles = [
  {
    slug: "google-play-not-working-10-fixes-2026",
    title: "Google Play Not Working or Can't Connect? 10 Proven Fixes for 2026 (Huawei and Xiaomi)",
    description: "Google Play not opening or connecting? This guide covers 10 fixes for all Android phones — clear cache, reinstall Play Services, fix Google account sync, and the ultimate alternative.",
    date: "2026-05-19",
    readTime: "10 min read",
    tags: ["Google Play", "Android", "troubleshooting", "gptoapk"],
    content: `      <>
        <p className="lead">
        Nothing more frustrating than tapping the Google Play Store icon and staring at a spinning loader. Or worse — "Connection timed out." This guide covers 10 fixes that actually work.
        </p>
        <h2>Why Does Google Play Keep Crashing?</h2>
        <ul>
          <li><strong>Bad network</strong> — Google Play needs stable internet</li>
          <li><strong>Corrupted cache/data</strong> — The #1 cause</li>
          <li><strong>Wrong date/time</strong> — SSL certificates fail</li>
          <li><strong>Disabled Google Play Services</strong></li>
          <li><strong>No Google framework</strong> — Huawei phones lack it</li>
          <li><strong>Account sync issues</strong></li>
        </ul>
        <h2>Fix 1: Check Your Network</h2>
        <p>Toggle WiFi off/on. Switch to mobile data. If you're in mainland China, Google Play requires a network proxy. If abroad, try restarting your router.</p>
        <h2>Fix 2: Check Date & Time</h2>
        <p>Go to Settings → Date & Time. Enable auto-set. Wrong time causes SSL handshake failure.</p>
        <h2>Fix 3: Clear Google Play Cache & Data</h2>
        <p>Most effective fix. Settings → Apps → Google Play Store → Storage → Clear Cache → Clear Data. Repeat for Google Play Services. Restart phone.</p>
        <h2>Fix 4: Uninstall Google Play Updates</h2>
        <p>Settings → Apps → Google Play Store → three-dot menu → Uninstall Updates. Opens factory version, auto-updates.</p>
        <h2>Fix 5: Re-Login Your Google Account</h2>
        <p>Settings → Accounts → Remove Google account. Restart. Add account back.</p>
        <h2>Fix 6: Enable All Permissions</h2>
        <p>Settings → Apps → Google Play Store → Permissions. Enable everything: Storage, Phone, Notifications. Set battery to Unrestricted.</p>
        <h2>Fix 7: Reinstall Google Play Services</h2>
        <p>Download latest Google Play Services APK. Choose nodpi version. Install and restart. Use <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a> to get a clean APK.</p>
        <h2>Fix 8: Huawei Phones</h2>
        <p>Huawei (HarmonyOS) lacks Google Services. Use Gspace, GBox, or MicroG.</p>
        <h2>Fix 9: Xiaomi Phones</h2>
        <p>Settings → Accounts & Sync → Google Basic Services → toggle ON.</p>
        <h2>Fix 10: Clear Download Manager Cache</h2>
        <p>Settings → Apps → Download Manager → Clear Cache & Data. Restart.</p>
        <h2>Still Stuck? Just Download APKs Directly</h2>
        <p><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a> lets you paste any Google Play link and download the APK directly. No Google account required. Works worldwide.</p>
      </>`
  },
  {
    slug: "apk-install-failed-error-code-guide",
    title: "APK Installation Failed — Complete Error Code Guide",
    description: "Every APK installation error explained. From Parse Error and App Not Installed to error codes like -11, -28, -29. Find your error and fix it in 2 minutes.",
    date: "2026-05-19",
    readTime: "10 min read",
    tags: ["APK Install", "Android Errors", "troubleshooting", "gptoapk"],
    content: `      <>
        <p className="lead">
        You downloaded an APK, tapped "Install," and got an error. This guide covers every common APK installation error.
        </p>
        <h2>Error 1: "Parse Error"</h2>
        <p>The #1 most common error. Caused by incomplete download, corrupted file, or Android version too low. Fix: redownload the APK and check file size.</p>
        <h2>Error 2: Installation Failed (-11)</h2>
        <p>Not enough storage. Free up at least 2GB. APK install needs space ≈ APK size × 3.</p>
        <h2>Error 3: Installation Failed (-28)</h2>
        <p>Signature conflict. Uninstall the existing version of the app, then install the new APK.</p>
        <h2>Error 4: Installation Failed (-29)</h2>
        <p>APK uses only v1 signature (too old). Get an updated APK or re-sign with v1+v2.</p>
        <h2>Error 5: "Invalid Package"</h2>
        <p>File is not a real APK. Redownload from a trusted source like <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a>.</p>
        <h2>Error 6: "App Not Installed" (No Code)</h2>
        <p>Package name conflict. Uninstall existing version, restart phone, try again.</p>
        <h2>Error 7: Install Failed After Full Progress</h2>
        <p>System-level restriction on MIUI/ColorOS. Enable "Install Unknown Apps" permission or use ADB: <code>adb install your-app.apk</code>.</p>
        <h2>Error 8: "INSTALL_FAILED_UPDATE_INCOMPATIBLE"</h2>
        <p>Uninstall current version first, then install new APK.</p>
        <h2>Error 9: "Newer Version Already Installed"</h2>
        <p>You're trying to downgrade. Uninstall current version, install older APK, disable auto-updates.</p>
        <h2>Error 10: Installs but Crashes</h2>
        <p>Wrong CPU architecture or missing Google Play Services. Match architecture when downloading. Use <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a> for the right version.</p>
        <h2>Quick Reference Table</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead><tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 text-left border border-gray-200 dark:border-gray-700">Error</th>
              <th className="p-3 text-left border border-gray-200 dark:border-gray-700">Likely Cause</th>
              <th className="p-3 text-left border border-gray-200 dark:border-gray-700">Quick Fix</th>
            </tr></thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Parse Error</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Corrupted APK</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Redownload</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">(-11)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">No storage</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Free space</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">(-28)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Signature conflict</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Uninstall old version</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">(-29)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Old v1 signature</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Re-sign APK</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><strong>90% of the time it's a corrupted download.</strong> Delete the APK, get a fresh one from <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a>, and try again.</p>
      </>`
  }
];

// ============================================================
// 中文文章 JSX content
// ============================================================
const zhArticles = [
  {
    slug: "google-play-cannot-open-fixes-2026",
    title: "Google Play 打不开/无法连接/进不去？2026 最新解决方法（华为/小米通用）",
    description: "Google Play 打不开怎么办？本文汇总了华为、小米、OPPO 等手机 Google Play 无法连接的 10 种解决方法，从清除缓存到 APK 直装。",
    date: "2026-05-19",
    readTime: "10 分钟阅读",
    tags: ["Google Play", "安卓", "故障解决", "gptoapk"],
    content: `      <>
        <p className="lead">
        Google Play 打不开？转圈、闪退、连不上？这篇文章总结了 10 种最有效的解决方法。
        </p>
        <h2>为什么 Google Play 打不开？</h2>
        <p>常见原因：网络问题、Google Play 服务损坏、系统日期时间不对、权限被禁用、华为手机缺少谷歌服务框架、账号同步问题。</p>
        <h2>方法 1：检查网络连接</h2>
        <p>切换 Wi-Fi 开关，试试移动数据。在中国大陆需要科学上网。海外地区试试重启路由器。</p>
        <h2>方法 2：检查日期和时间</h2>
        <p>设置 → 日期和时间 → 开启自动设置。时间不对会导致 SSL 验证失败。</p>
        <h2>方法 3：清除 Google Play 缓存和数据</h2>
        <p>设置 → 应用管理 → Google Play 商店 → 存储 → 清除缓存 → 清除数据。对 Google Play 服务同样操作。重启手机。</p>
        <h2>方法 4：卸载 Google Play 商店更新</h2>
        <p>设置 → 应用管理 → Google Play 商店 → 右上角三点 → 卸载更新。</p>
        <h2>方法 5：重新登录 Google 账号</h2>
        <p>设置 → 账号与同步 → 移除 Google 账号 → 重启 → 重新添加。</p>
        <h2>方法 6：开启所有权限</h2>
        <p>设置 → 应用管理 → Google Play 商店 → 权限 → 开启存储、电话、通知。关闭省电策略。</p>
        <h2>方法 7：重装 Google Play 服务</h2>
        <p>下载最新 Google Play 服务 APK，选 nodpi 版本。用 <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a> 下载。</p>
        <h2>方法 8：华为手机专用</h2>
        <p>鸿蒙系统没有谷歌服务。使用 Gspace、GBox 或 MicroG 解决。</p>
        <h2>方法 9：小米手机专用</h2>
        <p>设置 → 账号与同步 → Google 基础服务 → 开启。</p>
        <h2>方法 10：清除下载管理器数据</h2>
        <p>设置 → 应用管理 → 下载管理器 → 清除缓存和数据 → 重启。</p>
        <h2>所有方法都不行？直接用 APK 下载</h2>
        <p>去 <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a>，输入 Google Play 链接，直接下载 APK。不需要 Google 账号，不需要 Google Play 服务。</p>
      </>`
  },
  {
    slug: "apk-install-failed-error-codes-guide",
    title: "APK 安装失败错误代码大全：解析错误、无效包、(-11)(-28)(-29) 2026 完整解决指南",
    description: "APK 安装失败各种错误代码是什么意思？本文整理最常见的 APK 安装失败原因和解决方法，包含解析错误、无效安装包、INSTALL_FAILED 错误代码。",
    date: "2026-05-19",
    readTime: "10 分钟阅读",
    tags: ["APK安装", "安卓错误", "故障解决", "gptoapk"],
    content: `      <>
        <p className="lead">
        下载好 APK 一点安装就弹出红字？"解析软件包时出现问题"、"安装失败"、"无效的安装包"？本文整理了 10 种最常见错误及其解决方法。
        </p>
        <h2>错误 1：解析软件包时出现问题</h2>
        <p>最常见错误。APK 文件下载不完整或损坏、安卓版本太低。解决方法：重新下载，检查文件大小。</p>
        <h2>错误 2：安装失败 (-11)</h2>
        <p>存储空间不足。至少留出 2GB 空间。APK 安装所需空间 ≈ 文件大小 × 3。</p>
        <h2>错误 3：安装失败 (-28)</h2>
        <p>签名冲突。先卸载已安装的同名应用，再装新 APK。</p>
        <h2>错误 4：安装失败 (-29)</h2>
        <p>APK 签名太旧（v1）。获取新版 APK 或用 APK 签名工具重新签名。</p>
        <h2>错误 5：无效的安装包</h2>
        <p>文件不是真正的 APK。从正规来源重新下载，推荐 <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a>。</p>
        <h2>错误 6：未安装应用（无错误码）</h2>
        <p>包名冲突。卸载现有版本、重启手机、重新安装。</p>
        <h2>错误 7：进度条走完但安装失败</h2>
        <p>系统级限制。MIUI/ColorOS 常见。开启"安装未知来源应用"权限，或用 ADB 命令安装。</p>
        <h2>错误 8：INSTALL_FAILED_UPDATE_INCOMPATIBLE</h2>
        <p>先卸载当前版本，再安装新 APK。</p>
        <h2>错误 9：有更高版本已安装</h2>
        <p>想装旧版但新版已装。卸载当前版本，安装旧版 APK，关闭自动更新。</p>
        <h2>错误 10：安装完闪退</h2>
        <p>CPU 架构不对或缺少 Google Play 服务。下载时注意选择正确架构。用 <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a> 下载正确的版本。</p>
        <h2>快速排查表</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead><tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 text-left border border-gray-200 dark:border-gray-700">错误</th>
              <th className="p-3 text-left border border-gray-200 dark:border-gray-700">原因</th>
              <th className="p-3 text-left border border-gray-200 dark:border-gray-700">快速解决</th>
            </tr></thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">解析错误</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">APK 损坏</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">重新下载</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">(-11)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">空间不足</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">清理空间</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><strong>90% 的问题只是下载不完整，</strong>删掉重新下就好了。用 <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a> 确保下载完整 APK。</p>
      </>`
  }
];

// ============================================================
// 注入函数
// ============================================================
function injectArticles(filePath, newArticles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check existing slugs
  const existingSlugs = new Set();
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = slugRegex.exec(content)) !== null) {
    existingSlugs.add(m[1]);
  }
  
  // Filter out already existing
  const toAdd = newArticles.filter(a => !existingSlugs.has(a.slug));
  if (toAdd.length === 0) {
    console.log(`  No new articles to add (all slugs already exist)`);
    return;
  }
  
  // Find insertion point: after last post object (before `];`)
  const insertPoint = content.lastIndexOf('];');
  if (insertPoint === -1) {
    console.log(`  ERROR: Could not find insertion point`);
    return;
  }
  
  // Build new entries - prepend comma to ensure proper array syntax
  let newEntries = '';
  for (const a of toAdd) {
    newEntries += `,\n  {\n    slug: "${a.slug}",\n    title: "${a.title}",\n    description: "${a.description}",\n    date: "${a.date}",\n    readTime: "${a.readTime}",\n    tags: [${a.tags.map(t => `"${t}"`).join(', ')}],\n    content: (\n${a.content}\n    ),\n  }`;
  }
  newEntries += '\n';
  
  content = content.slice(0, insertPoint) + newEntries + content.slice(insertPoint);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Injected ${toAdd.length} article(s): ${toAdd.map(a => a.slug).join(', ')}`);
}

console.log("🚀 Injecting today's articles into blog pages...\n");

console.log('📗 English blog:');
injectArticles(EN_FILE, enArticles);

console.log('\\n📕 Chinese blog:');
injectArticles(ZH_FILE, zhArticles);

console.log('\\n✅ Done!');
