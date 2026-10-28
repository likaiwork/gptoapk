import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
  faqs?: BlogFaqItem[];
};

const toList = (posts: BlogPostEntry[]) =>
  posts.map(({ slug, title, description, date, readTime, tags }) => ({
    slug,
    title,
    description,
    date,
    readTime,
    tags,
  }));

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么从第三方网站下载的 Instagram 装完登录会提示异常？",
    answer:
      "最常见的原因是安装包被重新打包（签名与原版不同），或者包本身来自批量注册的账号环境。建议先用 apksigner 查看签名证书 SHA-256，与原版对比；不一致就说明这个包已经被人改过，必须立即卸载并修改密码。",
  },
  {
    question: "可以直接卸载后装新版 Instagram 吗？",
    answer:
      "可以，但会丢失本地数据（草稿、缓存、部分登录状态），并且需要走一遍安全验证。如果只是想升级，正确做法是覆盖安装：包名相同、签名一致、versionCode 不低于当前版本，系统会保留应用数据。",
  },
  {
    question: "关掉 Google Play 自动更新后，Instagram 还会自己更新吗？",
    answer:
      "不会通过 Play 自动更新，但也意味着安全补丁不再更新。Instagram 属于高风险目标应用，长期停留在老版本会累积已知漏洞，建议只在排查新版本问题时临时固定版本。",
  },
  {
    question: "手机上怎么快速确认 APK 是不是官方原包？",
    answer:
      "两个信号：一是安装完成后 Google Play 能正常识别这个应用（显示更新或打开，而不是「未安装」）；二是包名必须是 com.instagram.android，且没有申请短信、通话记录、无障碍等 Instagram 不该有的权限。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "哈希一致是不是就代表 APK 安全？",
    answer:
      "不是。哈希只能证明文件与发布方给出的值一致，如果发布方本身就是恶意来源，哈希一致也无济于事。哈希解决的是「传输有没有损坏、有没有被中途替换」，身份问题必须靠签名证书来确认。",
  },
  {
    question: "为什么 MD5 校验不够用？",
    answer:
      "MD5 已被证明可以构造碰撞，攻击者能生成内容不同但 MD5 相同的两个文件，因此不能用来做安全判断。但用来检测下载截断、传输损坏依然有效，看到站点只提供 MD5 时，把它当成完整性检测器而不是安全检查。",
  },
  {
    question: "apksigner 报 DOES NOT VERIFY 还能装吗？",
    answer:
      "不能。这说明 APK 在签名之后被修改过，或签名块已损坏。即使能装上，也意味着包内容不可信。唯一例外是你自己刚改过包并重新签名——此时应使用自己的密钥签名后再验证。",
  },
  {
    question: "哈希和签名都对，为什么还是装不上？",
    answer:
      "这时问题不在文件本身，而在设备侧：CPU 架构（ABI）不匹配、minSdkVersion 高于系统版本、设备上已有同包名但不同签名的旧版本、或存储空间不足以容纳约 2.5 倍 APK 大小的安装临时空间。",
  },
];

const ARTICLE1 = (
  <>
    <h1>Instagram APK 下载与更新：认准签名、版本号和更新通道</h1>

    <p>
      Instagram 是安卓上最容易被「重复打包 APK」盯上的应用之一。搜索结果里自称「Instagram 官方版」的下载站，相当一部分是把原包塞进广告 SDK，或者改成带悬浮窗权限的魔改版。它们能登录、能刷视频，看不出任何异常——直到某天账号被异地登录。
    </p>
    <p>
      这篇讲三件事：怎么拿到<strong>真正由 Instagram 签名的安装包</strong>、怎么判断手上的包是不是正版、以及升级时怎么不丢数据、不掉登录态。
    </p>
    <p className="not-prose my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950">
      <strong>一句话结论：</strong>Instagram 的正版 APK
      签名指纹在所有版本里必须一致。先验签名，再对比版本号，最后才是安装。跳过签名这一步，后面所有判断都没有意义。
    </p>

    <h2>一、优先顺序：能用官方渠道就别下 APK</h2>
    <p>在讨论下载之前，先说清楚什么时候<strong>不该</strong>下载 APK：</p>
    <table>
      <thead>
        <tr>
          <th>你的情况</th>
          <th>推荐做法</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>手机能正常访问 Google Play</td>
          <td>直接 Play 商店更新，不需要 APK</td>
        </tr>
        <tr>
          <td>手机没有 Google 服务（华为等）</td>
          <td>走 gptoapk 这类提取 Google Play 原包的工具</td>
        </tr>
        <tr>
          <td>需要老版本（新版本卡顿 / 兼容问题）</td>
          <td>下载历史版本，但必须验签名</td>
        </tr>
        <tr>
          <td>需要装到另一台没网的手机</td>
          <td>从自己已安装的设备提取，而不是从第三方站下载</td>
        </tr>
      </tbody>
    </table>
    <p>
      关键区别在于<strong>包从哪来</strong>。从 Google Play 提取的包由官方签名接口分发，签名链路可追溯；第三方站上传的包，来源永远是个黑箱。
    </p>

    <h2>二、验签：三步确认是不是正版</h2>
    <h3>方法 A：用 apksigner（电脑端，最可靠）</h3>
    <pre>
      <code>apksigner verify --print-certs instagram.apk</code>
    </pre>
    <p>
      输出里的 <code>SHA-256 digest</code> 就是签名证书指纹。正版 Instagram
      所有版本的证书指纹<strong>完全相同</strong>（每次发版重新签名，但用的是同一把私钥）。
    </p>
    <pre>
      <code>{`# 保存基准指纹
apksigner verify --print-certs instagram-official.apk | grep SHA-256 > insta-fingerprint.txt

# 以后每次校验
apksigner verify --print-certs new-download.apk | grep SHA-256`}</code>
    </pre>
    <p>
      <code>diff</code> 没有任何输出 = 签名一致 = 同一发布者。
    </p>

    <h3>方法 B：手机上直接看</h3>
    <p>部分文件管理器（如 MT 管理器、APK 分析类工具）能显示 APK 签名信息。看这几个字段：</p>
    <ul>
      <li>
        <strong>签名者</strong>：应为 Meta / Instagram
      </li>
      <li>
        <strong>证书 SHA-256</strong>：与基准值一致
      </li>
      <li>
        <strong>签名方案</strong>：V2 或 V3 必须存在（只有 V1 的包在现代系统上会报「签名验证失败」）
      </li>
    </ul>

    <h3>如果签名不一致</h3>
    <p>
      <strong>不要安装</strong>，无论包的功能看起来多正常。签名不同意味着：这个包由另一个人重新打包过，他可以任意修改里面的代码，包括窃取登录凭据的逻辑。
    </p>

    <h2>三、版本号怎么看：别被「最新版」骗了</h2>
    <p>APK 里有两个版本号，作用不同：</p>
    <table>
      <thead>
        <tr>
          <th>字段</th>
          <th>位置</th>
          <th>含义</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>versionName</code>
          </td>
          <td>Manifest</td>
          <td>给人看的，如 345.0.0.32.90</td>
        </tr>
        <tr>
          <td>
            <code>versionCode</code>
          </td>
          <td>Manifest</td>
          <td>给系统看的整数，单调递增</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>升级判断只看 versionCode</strong>。第三方站常见套路是把 versionName 改成 999.9
      显得「更新」，但 versionCode 比官方还低——这种包装上去后系统会拒绝覆盖安装，或者装上后 Play
      商店提示「降级」。
    </p>
    <pre>
      <code>aapt dump badging instagram.apk | grep versionCode</code>
    </pre>

    <h2>四、升级安装：保住登录态和数据</h2>
    <p>
      Instagram 的数据存放在应用私有目录，<strong>覆盖安装不会丢数据</strong>，前提是满足三条：
    </p>
    <ol>
      <li>
        <strong>签名相同</strong> —— 不同签名的包无法覆盖，只能先卸载
      </li>
      <li>
        <strong>versionCode 不小于当前</strong> —— 降级安装被系统拒绝（除非 adb install -d）
      </li>
      <li>
        <strong>包名相同</strong> —— 必须是 com.instagram.android
      </li>
    </ol>
    <pre>
      <code>{`# 正常升级（会保留数据）
adb install -r instagram-new.apk

# 降级安装（会保留数据，但需先确认旧版本兼容）
adb install -r -d instagram-old.apk`}</code>
    </pre>
    <p className="not-prose my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
      ⚠️ <strong>不要用「卸载后安装」作为升级方式。</strong>
      卸载会清空应用数据目录，Instagram 的本地缓存、草稿、部分账号状态都会消失，需要重新登录并可能触发安全验证。
    </p>
    <p>如果系统提示「应用未安装」，按这个顺序排查：</p>
    <ol>
      <li>签名是否一致（不一致 → 说明来源不同，只能用官方包）</li>
      <li>versionCode 是否低于已安装版本</li>
      <li>是否已安装同包名的其他变体（如 Instagram Beta、Instagram Lite）</li>
      <li>存储空间是否足够（安装临时空间约为 APK 的 2.5 倍）</li>
    </ol>

    <h2>五、关闭「自动更新」后的注意事项</h2>
    <p>
      如果你特意装了某个版本并想让 Play 商店别自动覆盖它，需要同时做两件事：Play 商店 → Instagram →
      关闭「自动更新」；保持 Google Play 服务正常，否则商店可能在下次检查时静默更新。
    </p>
    <p>
      但要注意：关了自动更新就意味着<strong>安全补丁也不更新</strong>。Instagram
      属于高风险目标应用，长期停留在老版本会累积已知漏洞。建议只为了短期排查临时固定版本，问题解决后恢复更新。
    </p>

    <h2>六、快速自查清单</h2>
    <ul>
      <li>包是否来自 Google Play 提取或官方渠道？</li>
      <li>
        <code>apksigner verify --print-certs</code> 的 SHA-256 是否与基准一致？
      </li>
      <li>versionCode 是否不低于当前已安装版本？</li>
      <li>包名是否为 com.instagram.android？</li>
      <li>安装时是否要求了 Instagram 不该有的权限（短信、通话记录、无障碍）？</li>
      <li>安装后 Play 商店是否把它识别为「Instagram」（而不是「未知应用」）？</li>
    </ul>
    <p>
      <strong>最后一条尤其重要</strong>：如果装完后 Play
      商店不认这个应用，说明包被改过——正常签名的正版包，Play 商店一定能识别出来。
    </p>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      的 APK 直接来自 Google Play 原包，签名与官方一致，下载后可用 apksigner
      校验指纹，确认与正版安装完全同源。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>APK 文件完整性校验：哈希、签名、ZIP 结构三层检查</h1>

    <p>
      下载好的 APK 装不上、装上了闪退、或者装完后 Play
      商店不认它——很多时候不是手机的问题，而是<strong>文件在半路坏了，或者被人换过</strong>。
    </p>
    <p>
      完整性校验解决的就是这个问题：确认你手上的字节，和发布者发出来的字节完全一致。这里讲三层检查，从快到慢、从弱到强，按需选用。
    </p>
    <p className="not-prose my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950">
      <strong>一句话结论：</strong>哈希证明「文件没被改动」，签名证明「是谁做的」，ZIP
      结构证明「文件本身是完整的」。三者各管一段，缺一层就会留下盲区。
    </p>

    <h2>一、三层检查分别防什么</h2>
    <table>
      <thead>
        <tr>
          <th>层</th>
          <th>检查对象</th>
          <th>能发现</th>
          <th>不能发现</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ZIP 结构</td>
          <td>文件格式</td>
          <td>传输截断、下载不全、压缩包损坏</td>
          <td>恶意替换</td>
        </tr>
        <tr>
          <td>哈希（SHA-256）</td>
          <td>字节内容</td>
          <td>任何一个字节被改动</td>
          <td>发布者本身就是恶意的情况</td>
        </tr>
        <tr>
          <td>签名（apksigner）</td>
          <td>发布者身份</td>
          <td>重打包、篡改后再签</td>
          <td>文件结构损坏（签名也不对）</td>
        </tr>
      </tbody>
    </table>
    <p>
      实际排查顺序建议：<strong>先哈希（最快、最常见问题）→ 签名（安全相关必须有）→
      结构（哈希过了还装不上时）</strong>。
    </p>

    <h2>二、第一层：哈希校验</h2>
    <p>发布方通常在下载页给一个 SHA-256 值。你只需要算一次对比一次。</p>
    <pre>
      <code>{`# macOS
shasum -a 256 app.apk

# Linux
sha256sum app.apk

# Windows (PowerShell)
Get-FileHash app.apk -Algorithm SHA256`}</code>
    </pre>
    <p>
      对比时注意：<strong>只有前几位相同不代表一致</strong>，必须完整 64 位全部相同。
    </p>
    <p>手机端可用 Termux 计算：</p>
    <pre>
      <code>{`pkg install coreutils
sha256sum /sdcard/Download/app.apk`}</code>
    </pre>

    <h3>一个容易被忽略的细节</h3>
    <p>
      部分下载站给的哈希是「文件大小 + MD5」。MD5
      已经被证明可以构造碰撞，用来做安全校验是不够的——但用来判断「下载是否完整」仍然有效，因为它能发现截断。看到
      MD5 时，把它当「完整性问题检测器」用，不要当「安全检查」用。
    </p>

    <h2>三、第二层：签名校验</h2>
    <pre>
      <code>apksigner verify --verbose --print-certs app.apk</code>
    </pre>
    <p>正常输出会包含：</p>
    <pre>
      <code>{`Verifies
Verified using v1 scheme (JAR signing): true/false
Verified using v2 scheme (APK Signature Scheme v2): true
Verified using v3 scheme (APK Signature Scheme v3): true
Signer #1 certificate SHA-256 digest: <64 位十六进制>`}</code>
    </pre>
    <p>三个关键判断：</p>
    <ol>
      <li>
        <strong>Verifies 必须为真</strong>。若显示 DOES NOT VERIFY，包已被篡改或签名损坏——直接丢弃。
      </li>
      <li>
        <strong>V2 或 V3 至少一个为 true</strong>。只有 V1 的包在 Android 11+ 上会被拒装。
      </li>
      <li>
        <strong>SHA-256 digest 与官方值一致</strong>。这是身份确认，也是判断「两个包是不是同一个发布者」的唯一可靠依据。
      </li>
    </ol>

    <h3>没有 apksigner 怎么办</h3>
    <p>apksigner 在 Android SDK build-tools 里。不想装整个 SDK 的话，最轻量的替代是直接读证书：</p>
    <pre>
      <code>{`unzip -p app.apk META-INF/*.RSA > cert.der
keytool -printcert -file cert.der | grep SHA256`}</code>
    </pre>
    <p>
      keytool 随 JDK 一起安装，比装 SDK
      简单。注意：这个方法读的是 V1 签名（META-INF 里的证书），如果包只有 V2/V3 签名而没有 V1，会提取不到——此时还是得用
      apksigner。
    </p>

    <h2>四、第三层：ZIP 结构检查</h2>
    <p>APK 本质是一个 ZIP。哈希对得上但装不上时，用这一步确认包内部没有缺文件。</p>
    <pre>
      <code>{`# 测试压缩包完整性
unzip -t app.apk | tail -5

# 列出关键文件是否存在
unzip -l app.apk | grep -E "AndroidManifest.xml|classes.*dex|resources.arsc"`}</code>
    </pre>
    <p>必须存在的核心文件：</p>
    <ul>
      <li>
        <code>AndroidManifest.xml</code> —— 没有它，系统根本不认这是应用
      </li>
      <li>
        <code>classes.dex</code>（或多个 classes2.dex、classes3.dex）—— 代码本体
      </li>
      <li>
        <code>resources.arsc</code> —— 资源索引
      </li>
    </ul>
    <p>缺任何一个，安装时通常表现为「解析包时出现问题」或「应用未安装」。</p>

    <h3>典型场景：ABI 库缺失导致的「能装不能跑」</h3>
    <pre>
      <code>unzip -l app.apk | grep "lib/" | awk -F/ '&#123;print $2&#125;' | sort -u</code>
    </pre>
    <p>
      输出如 arm64-v8a、armeabi-v7a、x86_64。如果包只带了 x86_64（模拟器版），装到真机上会立刻崩溃——这时哈希和签名都没问题，问题在库不匹配。这就是第三层检查的价值。
    </p>

    <h2>五、三层全过还是有问题？</h2>
    <p>如果哈希一致、签名一致、结构完整，但应用仍不正常，问题已经不在文件上。往这几个方向查：</p>
    <ol>
      <li>
        <strong>设备兼容性</strong>：minSdkVersion / ABI / 屏幕密度是否匹配（用 aapt dump badging 看）
      </li>
      <li>
        <strong>签名冲突</strong>：设备上已装了同包名但不同签名的版本（需卸载旧版）
      </li>
      <li>
        <strong>存储空间</strong>：安装需要约 2.5 倍 APK 大小的临时空间
      </li>
      <li>
        <strong>系统策略</strong>：企业设备管理策略或厂商安全中心拦截了侧载
      </li>
    </ol>

    <h2>六、把校验做成习惯</h2>
    <pre>
      <code>{`#!/bin/bash
# verify-apk.sh <apk> <expected-sha256>
APK="$1"; EXPECT="$2"
ACTUAL=$(shasum -a 256 "$APK" | cut -d' ' -f1)
if [ "$ACTUAL" != "$EXPECT" ]; then
  echo "❌ 哈希不匹配，停止安装"; exit 1
fi
echo "✅ 哈希一致"
apksigner verify --print-certs "$APK" | grep -q "^Verifies" || { echo "❌ 签名无效"; exit 1; }
echo "✅ 签名有效"
echo "可以安装"`}</code>
    </pre>
    <p>
      之后每次下载，一条命令搞定。<strong>校验成本不到 10 秒，代价是被装上一个改包应用的风险</strong>——这笔账很容易算。
    </p>

    <h2>快速清单</h2>
    <ul>
      <li>算过 SHA-256，且与发布方给出的完整值一致？</li>
      <li>apksigner verify 输出 Verifies，且 V2/V3 至少一项通过？</li>
      <li>签名证书 SHA-256 与官方基准值一致？</li>
      <li>核心文件（Manifest、dex、arsc）齐全？</li>
      <li>包内 ABI 与设备 CPU 架构匹配？</li>
    </ul>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      从{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      下载的 APK 均提取自 Google Play 原包，可直接用上述 apksigner
      流程验证签名指纹，确认与官方发布完全一致。
    </p>
  </>
);

export const zhPosts20261028: BlogPostEntry[] = [
  {
    slug: "instagram-apk-download-update-safe-guide",
    title: "Instagram APK 下载与更新：认准签名、版本号和更新通道",
    description:
      "Instagram 是被重复打包最多的安卓应用之一。本文说明官方渠道优先顺序、如何用 apksigner 比对签名证书 SHA-256 判断是否正版、versionName 与 versionCode 的区别、覆盖安装保住登录态的四个前提，以及「应用未安装」的排查顺序。",
    date: "2026-10-28",
    readTime: "9 min read",
    tags: ["android", "apk", "instagram", "安全"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-file-integrity-check-hash-signature-zip",
    title: "APK 文件完整性校验：哈希、签名、ZIP 结构三层检查",
    description:
      "哈希证明文件没被改动、签名证明是谁做的、ZIP 结构证明文件完整，三者各管一段。本文给出 sha256sum、apksigner verify、unzip -t 的完整命令与判断标准，说明 MD5 为什么不能当安全校验，以及三层全过仍装不上时的四个排查方向。",
    date: "2026-10-28",
    readTime: "10 min read",
    tags: ["android", "apk", "安全", "调试"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261028List = toList(zhPosts20261028);
