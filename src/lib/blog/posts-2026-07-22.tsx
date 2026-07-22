import type { BlogPostEntry } from "./posts-2026-07-21-en";
import Link from "next/link";

export const zhPosts20260722: BlogPostEntry[] = [
  {
    slug: "apk-cross-version-upgrade-guide-2026",
    title: "安卓大版本升级后APK不兼容怎么办？2026跨版本更新指南",
    description:
      "手机从Android 14升到15甚至16后，原来装的APK打不开了？新版APK怎么下载？本文详解安卓大版本升级后的APK兼容性解决方案，从目标API级别检查到Split APK安装，一次讲透。",
    date: "2026-07-22",
    readTime: "10 min read",
    tags: ["APK教程", "Android", "APK兼容", "跨版本升级"],
    content: (
      <>
        <p className="lead">
          手机系统从 Android 14 升级到 15、甚至直接跳到 Android 16 后，你有没有遇到过——原来用得挺好的应用突然打不开了，或者直接提示"此应用专为旧版 Android 设计"？
        </p>
        <p>
          这不是你手机坏了，也不是应用开发商跑路了，而是安卓系统<strong>大版本升级带来的兼容性问题</strong>。今天这篇文章就帮你把这个问题彻底搞清楚。
        </p>

        <h2>为什么大版本升级后APK会不兼容？</h2>
        <p>
          Google 每年发布一个安卓大版本，每个版本都会引入新的安全策略、API 变更和权限限制。<strong>关键概念是 Target API Level（目标 API 级别）</strong>：
        </p>
        <ul>
          <li>每个 APK 都有 <code>targetSdkVersion</code> 和 <code>minSdkVersion</code></li>
          <li>Android 15+ 强制要求新应用 <code>targetSdkVersion</code> ≥ 35</li>
          <li>Android 16 进一步收紧后台限制和权限管理</li>
        </ul>
        <p>如果你的 APK 是几年前编译的，<code>targetSdkVersion</code> 太低，系统为了安全会直接拒绝运行。</p>

        <h2>第一步：先确定是哪种不兼容</h2>
        <table>
          <thead>
            <tr>
              <th>症状</th>
              <th>原因</th>
              <th>解决方案</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>安装时提示"版本不兼容"</td>
              <td>minSdkVersion 高于当前系统</td>
              <td>ADB 或兼容模式安装</td>
            </tr>
            <tr>
              <td>运行时直接闪退</td>
              <td>targetSdkVersion 太低</td>
              <td>找新版 APK</td>
            </tr>
            <tr>
              <td>提示"此应用为旧版设计"</td>
              <td>Android 15+ 兼容性提示</td>
              <td>一般可忽略</td>
            </tr>
            <tr>
              <td>功能异常（如存储权限失效）</td>
              <td>权限策略变更</td>
              <td>手动开启新权限</td>
            </tr>
          </tbody>
        </table>

        <h2>第二步：检查APK目标API级别</h2>
        <p>
          <strong>方法一：</strong>去 <a href="https://gptoapk.com">gptoapk.com</a> 搜索应用后看详细信息，大部分 APK 会显示 targetSdkVersion。
        </p>
        <p>
          <strong>方法二：</strong>用 AAPT 命令检查
        </p>
        <pre><code>{`aapt dump badging your-app.apk | grep sdkVersion`}</code></pre>
        <p>
          <strong>方法三：</strong>在手机上用 App Inspector 查看
        </p>
        <p>如果 <code>targetSdkVersion &lt; 33</code>（Android 13），那么<strong>必须升级 APK 版本</strong>。</p>

        <h2>第三步：对症下药的解决方案</h2>

        <h3>方案1：找到兼容新版系统的APK（最推荐）</h3>
        <p>
          去 <a href="https://gptoapk.com">gptoapk.com</a> 搜索你想用的应用，尽量找最近更新过的版本。主流应用（微信、抖音等）都会及时更新 target SDK。
        </p>

        <h3>方案2：使用ADB强制安装</h3>
        <pre><code>{`adb install --bypass-low-target-sdk-block your-app.apk`}</code></pre>
        <p>注意：<code>--bypass-low-target-sdk-block</code> 是 Android 14+ 新增的参数。</p>

        <h3>方案3：用 Split APK 方式安装</h3>
        <pre><code>{`adb install-multiple base.apk config.arm64_v8a.apk config.zh.apk`}</code></pre>

        <h3>方案4：降级安卓系统版本（不推荐）</h3>
        <p>
          降级会清除所有数据，面临安全风险，<strong>不推荐普通用户尝试</strong>。
        </p>

        <h3>方案5：使用虚拟机运行旧版APK</h3>
        <p>
          安装 VMOS 或 VirtualXposed，在虚拟机里跑旧系统镜像。虽然性能有损耗（约 15-30%），但<strong>所有旧版 APK 基本都能用</strong>。
        </p>

        <h2>各品牌手机的特殊处理</h2>
        <p>
          <strong>小米/MIUI（澎湃OS）：</strong>Android 15 升级后"分身"功能可能失效，需在安全中心重新授权。
        </p>
        <p>
          <strong>华为/HarmonyOS：</strong>鸿蒙对旧版 APK 兼容性更好，但 HarmonyOS NEXT 已不再支持安卓 APK。
        </p>
        <p>
          <strong>三星 One UI：</strong>Android 15 后 Knox 安全策略更严格，建议先备份再升级。
        </p>
        <p>
          <strong>OPPO/ColorOS：</strong>开启"允许安装未知来源应用"后重试。
        </p>

        <h2>提前预防：大版本升级前的准备</h2>
        <ol>
          <li>备份 APK 数据</li>
          <li>记录正在使用的 APK 版本号</li>
          <li>延迟升级 1-2 周，等主流应用发布兼容包</li>
        </ol>

        <h2>总结</h2>
        <p>
          如果你是重度第三方 APK 用户，最稳妥的策略是：<strong>优先用主流应用最新版，小众应用做快照备份，必须用旧版 APK 就备一台旧手机</strong>。
        </p>
        <p>
          遇到具体某个 APK 装不上，欢迎去 <a href="https://gptoapk.com">gptoapk.com</a> 搜索，看看有没有兼容你系统的新版本。
        </p>
      </>
    ),
  },
  {
    slug: "apk-extract-icon-resource-files-guide",
    title: "从APK文件提取应用图标和资源文件完全教程",
    description:
      "怎么从APK文件里提取图标、图片、音频、布局文件？本文分享5种方法：在线工具、APK工具包、MT管理器、APKTool反编译、ADB提取已安装应用。不用Root也能提取。",
    date: "2026-07-22",
    readTime: "8 min read",
    tags: ["APK教程", "Android", "APK资源提取", "APK反编译"],
    content: (
      <>
        <p className="lead">
          你是不是也遇到过——看到一个 App 的图标很好看，想拿来做头像或壁纸？APK 本质上是一个 ZIP 压缩包，里面包含了应用所有的资源文件。今天手把手教你把它拆开。
        </p>

        <h2>APK 文件结构速览</h2>
        <pre><code>{`app.apk/
├── res/                 ← 资源文件（图标、图片、布局）
│   ├── mipmap-hdpi/     ← 各种密度的图标
│   ├── drawable-xxhdpi/ ← 高清图片
│   ├── layout/          ← 界面布局（XML）
│   └── raw/             ← 原始音频文件
├── lib/                 ← 原生库（.so 文件）
├── assets/              ← 游戏资源等大文件
└── META-INF/            ← 签名信息`}</code></pre>

        <h2>方法1：在线工具提取（最方便）</h2>
        <p>
          打开 <a href="https://gptoapk.com">gptoapk.com</a>，搜索应用名字，在应用详情页就能看到<strong>高清图标直接预览</strong>，右键保存即可。直接从 Google Play 数据源获取，质量最高。
        </p>

        <h2>方法2：用 APK 工具包提取（Windows）</h2>
        <p><strong>APK Icon Editor：</strong>点击 Select an APK → 所有图标直接显示 → 导出 PNG/JPG。</p>
        <p><strong>APK Easy Tool：</strong>拖入 APK → 点击"Pull App From APK" → 提取到 Extracted_RES/。</p>

        <h2>方法3：手机端用 MT 管理器（无需 Root）</h2>
        <ol>
          <li>下载 MT 管理器</li>
          <li>找到 APK 文件，点击 → 选择"查看"</li>
          <li>进入 <code>res/mipmap-xxxhdpi/</code> 目录</li>
          <li>长按图标文件 → 复制到其他文件夹</li>
        </ol>
        <p>提示：启动图标在 <code>mipmap-xxxhdpi</code>，启动页图片在 <code>drawable-xxhdpi</code>。</p>

        <h2>方法4：专业级反编译（APKTool + 命令行）</h2>
        <pre><code>{`# 安装（需要 Java）
brew install apktool

# 反编译
apktool d your-app.apk -o output_folder

# 查看资源
ls res/`}</code></pre>
        <p><strong>注意：</strong>大部分图片是 PNG/WebP，音频在 <code>res/raw/</code>，游戏资源需专用解包工具。</p>

        <h2>方法5：从已安装的应用提取</h2>
        <p>在 <a href="https://gptoapk.com">gptoapk.com</a> 搜索包名下载对应版本，再用上述方法提取。</p>
        <p>或用 ADB：</p>
        <pre><code>{`adb shell pm list packages | grep <app-name>
adb shell pm path com.example.app
adb pull /data/app/com.example.app-xxx/base.apk app.apk`}</code></pre>

        <h2>提取后的常见用途</h2>
        <ul>
          <li><strong>应用图标</strong> → 头像、壁纸、图标包制作</li>
          <li><strong>启动图片</strong> → 手机壁纸</li>
          <li><strong>提示音效</strong> → 手机铃声、通知音</li>
          <li><strong>UI 组件</strong> → 原型设计参考</li>
        </ul>

        <h2>注意事项</h2>
        <ol>
          <li><strong>版权问题：</strong>资源版权归原开发者，不要用于商业用途</li>
          <li><strong>资源混淆：</strong>越来越多应用混淆资源文件名</li>
          <li><strong>WebP 格式：</strong>Android 9+ 大量使用 WebP 图片</li>
        </ol>

        <h2>总结</h2>
        <p>
          如果你只是偶尔需要提取一两个图标，去 <a href="https://gptoapk.com">gptoapk.com</a> 搜索应用就能直接获取高清图标，完全不需要动手折腾。
        </p>
      </>
    ),
  },
];

export const enPosts20260722: BlogPostEntry[] = [
  {
    slug: "fix-apk-network-issues-connectivity-guide",
    title: "APK Network Issues: Why Apps Can't Connect & 9 Fixes (2026 Guide)",
    description:
      "Installed an APK but it says 'No Internet Connection' or won't connect to the server? Here's why sideloaded apps fail to connect — from missing permissions and VPN conflicts to Android 16's new network controls.",
    date: "2026-07-22",
    readTime: "10 min read",
    tags: ["APK", "Network", "Connection", "Fix", "Android", "Guide", "Troubleshooting"],
    content: (
      <>
        <p className="lead">
          Nothing more frustrating than opening a freshly installed APK only to see "Network error" — even though your Wi-Fi is working fine.
        </p>
        <p>
          This is one of the most common complaints from sideloading users, and it's becoming even more frequent with Android 15 and 16.
        </p>

        <h2>Why Sideloaded APKs Lose Connection</h2>
        <table>
          <thead>
            <tr><th>Cause</th><th>How It Happens</th></tr>
          </thead>
          <tbody>
            <tr><td>Missing INTERNET permission</td><td>APK manifest doesn't request it</td></tr>
            <tr><td>Restricted network flag</td><td>Android 14+ blocks non-Play apps</td></tr>
            <tr><td>VPN / Proxy interference</td><td>Sideloaded apps bypass VPN routing</td></tr>
            <tr><td>DNS resolution failure</td><td>App hardcodes IPs blocked regionally</td></tr>
            <tr><td>GMS dependency</td><td>App requires Google Play Services</td></tr>
            <tr><td>Doze / Standby Bucket</td><td>Android puts app in restricted bucket</td></tr>
            <tr><td>Android 16 per-app VPN toggle</td><td>New system-level exclusion</td></tr>
          </tbody>
        </table>

        <h2>Fix 1: Check Basic Network Permissions</h2>
        <p>
          Go to <strong>Settings → Apps → [Your App] → Permissions</strong> and look for <strong>Internet / Network access</strong>. You can also check at <a href="https://gptoapk.com">gptoapk.com</a> in the Permissions section.
        </p>

        <h2>Fix 2: Disable Restricted Network Block</h2>
        <p>
          Android 14+ blocks network access for sideloaded apps by default:
        </p>
        <pre><code>{`Settings → Apps → [Your App] → "Allow restricted network access" → ON`}</code></pre>

        <h2>Fix 3: Check VPN / Proxy Routing</h2>
        <ol>
          <li>Turn off VPN and test the app</li>
          <li>If it works, go to VPN app's Split Tunneling settings</li>
          <li>Make sure your app is included in VPN routing</li>
        </ol>
        <p>On Android 16: Settings → Network → VPN → [Your VPN] → "Apps that use VPN" — toggle ON.</p>

        <h2>Fix 4: Clear App Data</h2>
        <pre><code>{`adb shell pm clear com.example.app`}</code></pre>
        <p>Or manually: Settings → Apps → [App] → Storage → Clear Data.</p>

        <h2>Fix 5: Check DNS and Regional Blocking</h2>
        <p>
          Many APKs (especially Chinese apps) perform DNS lookups for home servers. Try Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1).
        </p>

        <h2>Fix 6: Exclude from Battery Optimization</h2>
        <pre><code>{`Settings → Apps → [App] → Battery → "Don't optimize"`}</code></pre>

        <h2>Fix 7: Google Play Services Dependency</h2>
        <p>
          Install <strong>microG</strong> or the latest Google Play Services from <a href="https://gptoapk.com">gptoapk.com</a>.
        </p>

        <h2>Fix 8: Android 16's New Network Controls</h2>
        <pre><code>{`Settings → Security → Network Controls → [App] → Allow background network`}</code></pre>

        <h2>Fix 9: Re-download from a Trusted Source</h2>
        <p>
          The APK might be modified. Download from <a href="https://gptoapk.com">gptoapk.com</a> which sources directly from Google Play.
        </p>

        <h2>Quick Reference</h2>
        <table>
          <thead>
            <tr><th>Symptom</th><th>Most Likely Fix</th></tr>
          </thead>
          <tbody>
            <tr><td>"No connection" on first launch</td><td>Permissions or VPN</td></tr>
            <tr><td>Works on Wi-Fi but not mobile data</td><td>Battery optimization</td></tr>
            <tr><td>Works for 5 mins, then dies</td><td>Standby bucket</td></tr>
            <tr><td>Can't log in with Google</td><td>GMS</td></tr>
            <tr><td>Works on Android 14 but not 15/16</td><td>Restricted network / Android 16 controls</td></tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    slug: "android-16-apk-sideloading-guide-changes",
    title: "Android 16 APK Changes: What's New for Sideloading in 2026",
    description:
      "Android 16 is here — and it changes everything about APK sideloading. From per-app firewalls and three-tier install confirmation to Signature v4 and stricter background network controls.",
    date: "2026-07-22",
    readTime: "10 min read",
    tags: ["Android 16", "APK", "Sideload", "Security", "Guide", "2026"],
    content: (
      <>
        <p className="lead">
          Android 16 launched in March 2026 and brings the biggest shift to APK sideloading since Android 11's scoped storage changes.
        </p>
        <p>
          Google needs to combat the 30%+ rise in malware delivered through sideloaded APKs. Their approach? <strong>Not blocking sideloading — making it safer by default.</strong>
        </p>

        <h2>1. Three-Tier Install Confirmation</h2>
        <table>
          <thead>
            <tr><th>Source</th><th>Prompt Level</th></tr>
          </thead>
          <tbody>
            <tr><td>Google Play / Galaxy Store</td><td>None — installs silently</td></tr>
            <tr><td>Trusted source (verified dev portal)</td><td>Low — simple dialog</td></tr>
            <tr><td>Unknown source (browser download)</td><td>High — full-screen warning + 3s delay</td></tr>
          </tbody>
        </table>
        <p>
          APKs from <a href="https://gptoapk.com">gptoapk.com</a> have verified Google Play signatures and won't trigger the high-level warning.
        </p>

        <h2>2. Per-App Firewall (System Level)</h2>
        <p>Android 16 bakes firewall controls into Settings:</p>
        <pre><code>{`Settings → Network → Per-app firewall`}</code></pre>
        <p>Block any app's internet access — no root required. Install a suspicious APK? Flip network OFF.</p>

        <h2>3. APK Signature Scheme v4</h2>
        <p>
          The first major signing update since v3. Supports <strong>post-quantum cryptography</strong> (ML-DSA) and incremental verification. Old v1/v2 still work but Google Play may require v4 by late 2026.
        </p>

        <h2>4. Stricter Background Network Access</h2>
        <p>All non-Play-Store apps are in "restricted background network" by default:</p>
        <pre><code>{`Settings → Apps → [Your APK] → Background network → ALLOW`}</code></pre>
        <p>Without this: no push notifications, no background sync, no WebSocket connections.</p>

        <h2>5. Scoped Storage — Final Removal</h2>
        <p>
          Android 16 fully removes legacy <code>READ/WRITE_EXTERNAL_STORAGE</code> exemptions. Old APKs with <code>targetSdkVersion &lt; 33</code> can't access shared storage. Use the new "Temporary full file access" toggle.
        </p>

        <h2>6. "Minimal" Install Mode</h2>
        <p>New option when installing APKs:</p>
        <ul>
          <li><strong>Standard</strong> — Default permissions</li>
          <li><strong>Minimal</strong> — Network disabled + no background activity</li>
          <li><strong>Unrestricted</strong> — Full permissions</li>
        </ul>

        <h2>7. Play Integrity Changes</h2>
        <p>
          Banking apps, streaming apps (Netflix, Disney+), and DRM games refuse to run on rooted or modified devices — regardless of install method.
        </p>

        <h2>Compatibility Quick Check</h2>
        <table>
          <thead>
            <tr><th>Feature</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Installing from SD card</td><td>✅ Works</td></tr>
            <tr><td>ADB install</td><td>✅ Works</td></tr>
            <tr><td>Split APK / App Bundle</td><td>✅ Works</td></tr>
            <tr><td>APK downgrade via ADB</td><td>✅ Works</td></tr>
            <tr><td>OBB data files</td><td>✅ Works</td></tr>
            <tr><td>Old targetSdkVersion (&lt;23)</td><td>❌ Blocked</td></tr>
          </tbody>
        </table>

        <h2>The Bottom Line</h2>
        <blockquote>
          <p>Android 16 isn't harder — it just needs you to flip a few more switches. Once you know where they are, it's business as usual.</p>
        </blockquote>
        <p>
          Get Android 16 compatible APKs at <a href="https://gptoapk.com">gptoapk.com</a> — all sourced from Google Play with verified signatures.
        </p>
      </>
    ),
  },
];

export const zhPosts20260722List = zhPosts20260722.map(
  ({ slug, title, description, date, readTime, tags }) => ({ slug, title, description, date, readTime, tags })
);

export const enPosts20260722List = enPosts20260722.map(
  ({ slug, title, description, date, readTime, tags }) => ({ slug, title, description, date, readTime, tags })
);
