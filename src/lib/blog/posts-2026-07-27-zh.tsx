import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ReactNode;
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

const ARTICLE1 = (
  <>
    <p className="lead">
      下载APK后如何验证文件完整性？教你通过MD5/SHA校验、签名验证、文件大小对比等方法，确保APK下载的文件完整无损坏。
    </p>

    <h2>为什么APK下载后需要做完整性校验？</h2>
    <p>
      从网上下载APK文件时，你信任的不是文件本身，而是<strong>文件的来源和传输过程</strong>。一个APK可能在下载过程中损坏，也可能被人恶意篡改——植入广告SDK、窃取信息的代码、或者后门程序。
    </p>
    <p>
      <strong>完整性校验就是解决这个问题的</strong>：它让你能够确认你拿到的APK文件，和开发者发布的是同一个文件，没有被修改过一字节。
    </p>
    <p>
      以下是在 <a href="https://gptoapk.com">gptoapk.com</a> 等APK下载站下载文件后，推荐的完整性校验方法。
    </p>

    <h2>方法一：MD5 / SHA-256 哈希校验（最常用）</h2>
    <p>
      哈希（Hash）是一段数据的"数字指纹"。只要文件有任何变化，哈希值就会完全不同。
    </p>

    <h3>什么是MD5和SHA-256？</h3>
    <ul>
      <li><strong>MD5</strong>：32位十六进制字符串，校验速度快，但有碰撞风险（不推荐作为安全校验，但日常自用足够）</li>
      <li><strong>SHA-256</strong>：64位十六进制字符串，安全性高，是目前行业推荐标准</li>
    </ul>

    <h3>如何在电脑上进行哈希校验</h3>

    <p><strong>Windows（使用 PowerShell）：</strong></p>
    <pre><code>{`Get-FileHash "你的APK文件路径" -Algorithm SHA256`}</code></pre>
    <p>例如：</p>
    <pre><code>{`Get-FileHash "C:\\Downloads\\whatsapp.apk" -Algorithm SHA256`}</code></pre>
    <p>输出类似：</p>
    <pre><code>{`SHA256哈希算法下的文件哈希：
D7A8FBB3...A5F6C1E2`}</code></pre>

    <p><strong>macOS / Linux（使用终端）：</strong></p>
    <pre><code>{`# SHA-256校验
shasum -a 256 your-app.apk
# 或
openssl dgst -sha256 your-app.apk

# MD5校验（快速但不安全）
md5 your-app.apk`}</code></pre>

    <h3>拿到哈希值后怎么用？</h3>
    <ol>
      <li>记录你本机计算出的哈希值</li>
      <li>去APK开发者的<strong>官网</strong>或<strong>官方GitHub仓库</strong>查找官方公布的哈希值</li>
      <li>对比两者是否完全一致</li>
    </ol>

    <blockquote>
      如果哈希值不匹配，<strong>绝对不要安装该APK</strong>——文件要么损坏了，要么被篡改了。
    </blockquote>

    <h2>方法二：APK签名验证（更权威的校验）</h2>
    <p>
      哈希校验只能保证文件与下载时一致，但无法证明这个文件"应该长这样"。而<strong>APK签名验证</strong>可以确认APK是由持有开发者私钥的人签名的。
    </p>

    <h3>使用 <code>jarsigner</code> 验证（JDK自带）</h3>
    <pre><code>{`jarsigner -verify -verbose -certs your-app.apk`}</code></pre>
    <p>输出包含 <code>jar verified</code> 则表示签名有效。如果出现 <code>jar is unsigned</code> 或签名验证失败，说明APK未被正常签名或签名已损坏。</p>

    <h3>使用 <code>apksigner</code> 验证（Android SDK工具，推荐）</h3>
    <pre><code>{`apksigner verify --verbose your-app.apk`}</code></pre>
    <p>这是Google官方推荐的工具，能够检查APK签名方案v1、v2、v3，并验证证书链的完整性。</p>

    <p><strong>输出示例（正常签名）：</strong></p>
    <pre><code>{`Verifies
Verified using v1 scheme (JAR signing): true
Verified using v2 scheme (APK Signature Scheme v2): true
Verified using v3 scheme (APK Signature Scheme v3): true
Number of signers: 1`}</code></pre>

    <h3>如何获取官方签名指纹</h3>
    <ol>
      <li>将APK解压，查看 <code>META-INF/CERT.RSA</code> 中的证书信息</li>
      <li>前往开发者官网对比公钥指纹（SHA-256 fingerprint）</li>
      <li>与从 Google Play 同一应用的签名做对比</li>
    </ol>

    <h2>方法三：对比文件大小（快速预检）</h2>
    <p>虽然不够严谨，但<strong>文件大小对比是最快速的初步验证方法</strong>：</p>
    <ul>
      <li>当APK下载站明确标注了文件大小（例如 "APK大小: 89.7 MB"），下载后右键属性查看大小是否匹配</li>
      <li>如果偏差超过几百KB，大概率下载过程中文件损坏，需要重新下载</li>
      <li>这种方法只能排除明显损坏，无法检测到恶意篡改</li>
    </ul>

    <h2>方法四：安装前的全量安全检查流程</h2>
    <p>对于追求极致安全的用户，推荐以下完整流程：</p>
    <table>
      <thead>
        <tr>
          <th>步骤</th>
          <th>操作</th>
          <th>工具</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>下载后立即计算SHA-256</td><td>PowerShell / shasum</td></tr>
        <tr><td>2</td><td>对比官网公布的哈希值</td><td>开发者官网 / GitHub</td></tr>
        <tr><td>3</td><td>验证APK签名</td><td>apksigner / jarsigner</td></tr>
        <tr><td>4</td><td>扫描恶意代码</td><td>VirusTotal（上传APK扫描）</td></tr>
        <tr><td>5</td><td>查看APK申请的权限</td><td>aapt dump permissions</td></tr>
        <tr><td>6</td><td>确认无误后安装</td><td>Android系统安装器</td></tr>
      </tbody>
    </table>

    <h2>手机上如何做完整性校验？</h2>
    <p>如果你没有电脑，也可以在手机上完成基础校验：</p>

    <h3>使用 Android 端的 Hash 校验 App</h3>
    <p>搜索安装 <strong>Hash Droid</strong> 或 <strong>APK Check</strong> 这类App：</p>
    <ol>
      <li>打开App，选择APK文件</li>
      <li>选择SHA-256算法</li>
      <li>记录生成的哈希值</li>
      <li>同样与官方公布值对比</li>
    </ol>

    <h3>利用 VirusTotal 验证</h3>
    <p>将APK文件上传到 <a href="https://virustotal.com">VirusTotal.com</a>，它会：</p>
    <ul>
      <li>自动计算文件的哈希值</li>
      <li>用70+款杀毒引擎扫描</li>
      <li>显示文件是否在已知恶意文件库中</li>
    </ul>

    <h2>常见问题</h2>

    <h3>Q：从 gptoapk.com 下载的APK还需要校验吗？</h3>
    <p><strong>建议校验。</strong> <a href="https://gptoapk.com">gptoapk.com</a> 尽最大努力提供安全、原始的APK文件，但没有任何网站能保证传输过程中100%不被中间人攻击。花30秒做一次哈希校验，是最低成本的安全投资。</p>

    <h3>Q：MD5和SHA-256用哪个？</h3>
    <p>日常使用<strong>SHA-256</strong>即可。MD5虽然快但存在已知碰撞漏洞，不推荐用于安全场景。如果官方只提供了MD5值，你可以临时用MD5校验，但更推荐以SHA-256为准。</p>

    <h3>Q：APK签名验证失败是什么意思？</h3>
    <p>可能的原因：</p>
    <ul>
      <li>APK文件在下载过程中损坏 → 重新下载</li>
      <li>APK被二次打包（植入了恶意代码）→ 立即删除，更换来源</li>
      <li>使用了v1以外的签名方案 → 在Android 7.0+设备上通常会正常安装</li>
    </ul>

    <h2>总结</h2>
    <p>
      APK下载后的完整性校验不是可选项，而是<strong>安全使用侧载的基础操作</strong>。养成以下习惯，能够过滤掉99%的恶意APK风险：
    </p>
    <ol>
      <li>✅ 从 <a href="https://gptoapk.com">gptoapk.com</a> 或开发者官网下载</li>
      <li>✅ 下载后做 SHA-256 哈希校验</li>
      <li>✅ 有条件的做 APK 签名验证</li>
      <li>✅ 安装前用 VirusTotal 扫描排查</li>
    </ol>
    <p>
      <strong>记住：</strong> 一个32位的SHA-256哈希值对比，可能就避免了一次设备被入侵的风险。花30秒，值得。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "从 gptoapk.com 下载的APK还需要做完整性校验吗？",
    answer: "建议校验。gptoapk.com 尽最大努力提供安全原始的APK文件，但没有任何网站能保证传输过程中100%不被中间人攻击。花30秒做一次哈希校验是最低成本的安全投资。",
  },
  {
    question: "MD5和SHA-256应该用哪个？",
    answer: "日常使用SHA-256即可。MD5虽然快但存在已知碰撞漏洞，不推荐用于安全场景。如果官方只提供了MD5值可以临时使用，但更推荐以SHA-256为准。",
  },
  {
    question: "APK签名验证失败可能是什么原因？",
    answer: "可能的原因包括：APK文件在下载过程中损坏（重新下载）、APK被二次打包植入了恶意代码（立即删除更换来源）、或使用了兼容性签名方案（Android 7.0+通常可正常安装）。",
  },
  {
    question: "没有电脑，手机上能做完整性校验吗？",
    answer: "可以。使用Hash Droid或APK Check等App可计算SHA-256哈希值，也可将APK上传到VirusTotal进行多引擎扫描。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      Android 14和15对侧载（sideload）APK引入了哪些新限制？详细解读权限变化、拦截逻辑更新，以及用户需要知道的安装调整。
    </p>

    <h2>为什么Google不断收紧侧载？</h2>
    <p>
      每次Android大版本更新，Google都会进一步收紧侧载APK的流程。Android 14和15也不例外。这不是为了妨碍普通用户——而是为了应对日益增长的恶意软件通过侧载渠道植入用户设备的问题。
    </p>
    <p>
      据Google安全团队统计，<strong>绝大多数Android恶意软件经由侧载安装进入设备</strong>。因此，从Android 14到15，侧载流程发生了以下关键变化。
    </p>
    <p>
      如果你是经常从 <a href="https://gptoapk.com">gptoapk.com</a> 等平台下载APK侧载的用户，这篇文章告诉你每个版本具体变了什么、你需要怎么应对。
    </p>

    <h2>Android 14 侧载变化（2023年发布）</h2>

    <h3>1. 限制安装权限授予</h3>
    <p><strong>核心变化：</strong> 安装来源App不能再一键授予"安装未知应用"权限。</p>
    <ul>
      <li><strong>旧行为：</strong> 文件管理器或浏览器只需申请一次"安装未知应用"权限，用户同意后即可自由安装APK</li>
      <li><strong>新行为：</strong> Android 14强制每个安装来源App只能在<strong>再次获得用户确认后</strong>安装APK</li>
    </ul>
    <p>当你在文件管理器中点击一个APK时，系统会弹出确认对话框——即使该App之前已被授权安装。你必须手动点击"允许"（甚至每次都需要）。</p>

    <h3>2. 最小权限原则强化</h3>
    <p>Android 14要求App在向用户请求位置、麦克风、摄像头等敏感权限时，必须<strong>给出明确的理由说明</strong>。这虽然是针对所有App的改动，但侧载的APK来自不可信的来源，系统会用更严格的提示来警告用户。</p>

    <h3>3. 阻止旧版APK安装</h3>
    <p>Android 14引入了一个限制：<strong>目标SDK版本低于Android 6.0 (API 23)的APK将无法安装</strong>。这主要是为了防止过时、不安全的应用被侧载到新设备上。</p>
    <blockquote>如果你的APK安装时提示 "App was built for an older Android version"，这就是原因。</blockquote>

    <h3>4. 照片和视频的部分访问权限</h3>
    <p>侧载的App在请求媒体权限时，用户可以授予<strong>部分访问权限</strong>（仅限选择的照片/视频），而不必授予整个媒体库的读取权限。这在之前的版本中只对Google Play安装的App有效。</p>

    <h2>Android 15 侧载变化（2024年发布）</h2>

    <h3>1. 实时威胁检测（Google Play Protect 增强）</h3>
    <p><strong>这是Android 15最大的一项变化。</strong> Google Play Protect现在能够在安装后<strong>实时扫描APK的运行行为</strong>，包括：</p>
    <ul>
      <li>API调用模式分析</li>
      <li>权限越级使用检测</li>
      <li>后台联网行为监控</li>
      <li>屏幕读取和按键记录检测</li>
    </ul>
    <p>如果系统检测到APK在运行后有可疑行为，会立即发出警报并提供卸载选项。</p>

    <h3>2. 隐私沙箱（Privacy Sandbox）</h3>
    <p>Android 15默认启用Privacy Sandbox，这对侧载的APK有间接影响：</p>
    <ul>
      <li>第三方广告追踪受到更严格的限制</li>
      <li>App不能自由读取设备标识符（OAID/GAID）</li>
      <li>侧载的应用如果想要使用广告功能，必须适配新的SDK</li>
    </ul>

    <h3>3. 静默安装全面封杀</h3>
    <p>Android 15加强了对<strong>通过ADB或自动化工具静默安装APK</strong>的限制：</p>
    <ul>
      <li>非用户主动操作（如通过USB调试、脚本执行）的安装需要额外确认</li>
      <li>系统会检查安装触发方式是否为用户明确的点击行为</li>
    </ul>
    <p>这意味着通过Tasker、MacroDroid之类的自动化工具侧载安装APK，现在会更困难。</p>

    <h3>4. 对侧载来源App的审核加强</h3>
    <p>Android 15要求所有能够安装APK的App（文件管理器、浏览器）拥有更好的<strong>来源安全性</strong>，否则系统会阻止它们安装APK。具体来说：</p>
    <ul>
      <li>安装来源App必须来自Google Play或可信来源</li>
      <li>系统会在安装流程中额外展示来源App的信息</li>
      <li>如果来源App本身检测到异常行为，它向用户发出的安装请求会被系统拦截</li>
    </ul>

    <h3>5. 隐私凭证API</h3>
    <p>Android 15引入了新的Credential Manager API，侧载的App如果要使用密码管理器或通行密钥（passkey），需要适配新的API才能正常工作。</p>

    <h2>Android 14 vs 15 侧载变化对比</h2>
    <table>
      <thead>
        <tr>
          <th>变化项</th>
          <th>Android 14</th>
          <th>Android 15</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>安装权限确认</td><td>每次安装需确认</td><td>同左 + 来源App审核加强</td></tr>
        <tr><td>旧版APK限制</td><td>目标SDK &lt; 23 无法安装</td><td>同左</td></tr>
        <tr><td>实时行为检测</td><td>❌ 不支持</td><td>✅ Play Protect实时扫描</td></tr>
        <tr><td>隐私沙箱</td><td>❌ 可选</td><td>✅ 默认启用</td></tr>
        <tr><td>静默安装封杀</td><td>❌ 部分</td><td>✅ 全面封杀</td></tr>
        <tr><td>媒体权限控制</td><td>部分访问</td><td>同左</td></tr>
        <tr><td>安装来源App审核</td><td>❌ 不支持</td><td>✅ 强制性</td></tr>
      </tbody>
    </table>

    <h2>在Android 14/15上侧载APK的实操指南</h2>

    <h3>Android 14 侧载步骤</h3>
    <ol>
      <li>从 <a href="https://gptoapk.com">gptoapk.com</a> 下载APK文件</li>
      <li>打开设置 → <strong>安全</strong> → <strong>安装未知应用</strong></li>
      <li>选择你的文件管理器或浏览器App</li>
      <li>打开"允许安装未知应用"开关</li>
      <li>点击APK文件时，确认弹出的系统对话框</li>
      <li>如果APK目标SDK &lt; 23，它会提示无法安装——你需要找更新版本的APK</li>
    </ol>

    <h3>Android 15 侧载步骤</h3>
    <ol>
      <li>从 <a href="https://gptoapk.com">gptoapk.com</a> 下载APK文件</li>
      <li>打开设置 → <strong>安全与隐私</strong> → <strong>更多安全设置</strong> → <strong>安装未知应用</strong></li>
      <li>授权给文件管理器或浏览器</li>
      <li>点击APK文件，确认安装</li>
      <li>此时Play Protect会在后台扫描APK并进行<strong>实时行为监控</strong></li>
      <li>如果Play Protect发出警告，请仔细阅读警告内容——它可能检测到了恶意行为</li>
    </ol>

    <h3>如果安装失败怎么办？</h3>
    <table>
      <thead>
        <tr>
          <th>错误提示</th>
          <th>原因</th>
          <th>解决</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>"App was built for an older Android version"</td><td>目标SDK低于23</td><td>找更新版本的APK</td></tr>
        <tr><td>"Install blocked"</td><td>来源App有问题</td><td>从Google Play更新文件管理器</td></tr>
        <tr><td>"Play Protect won't let you install"</td><td>实时检测到异常</td><td>上传APK到VirusTotal扫描</td></tr>
        <tr><td>"App not installed"</td><td>APK损坏或不兼容</td><td>从<a href="https://gptoapk.com">gptoapk.com</a>重新下载</td></tr>
      </tbody>
    </table>

    <h2>值得注意的趋势：Android 16+ 会怎样？</h2>
    <p>基于Android 14和15的变化趋势，可以合理预测：</p>
    <ul>
      <li><strong>完全阻断侧载？</strong> 短期内不可能——Android的开放性是其根基。但流程会越来越复杂</li>
      <li><strong>实时AI检测成为标配</strong>：Google会将Gemini整合到Play Protect中，进行更深度的代码分析</li>
      <li><strong>ADB侧载被严格限制</strong>：未来的开发者模式可能会要求验证开发者身份</li>
      <li><strong>侧载来源App白名单化</strong>：只有Google Play审核通过的文件管理器才能安装APK</li>
    </ul>

    <h2>总结</h2>
    <p>Android 14和15对侧载APK的限制是一把双刃剑：</p>
    <ul>
      <li><strong>👍 好处：</strong> 用户的设备安全大幅提升，99%的恶意侧载软件会在安装前或安装后第一时间被识别</li>
      <li><strong>👎 不便：</strong> 侧载流程从之前的"一路确定到底"变成了需要多次手动确认和等待扫描</li>
    </ul>
    <p><strong>最实用的建议：</strong></p>
    <ol>
      <li>✅ 从 <a href="https://gptoapk.com">gptoapk.com</a> 等可信来源下载APK</li>
      <li>✅ 保持Google Play Protect开启（不要关闭它）</li>
      <li>✅ 安装后留意系统的异常警告</li>
      <li>✅ 升级到Android 15后，给Play Protect多一些扫描时间</li>
    </ol>
    <p>安全永远比方便更重要。适应这些新变化，你也算半个侧载专家了。</p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Android 14和15还能侧载APK吗？",
    answer: "可以，但流程变得更严格了。Android 14要求每次安装都要手动确认，Android 15增加了实时Play Protect扫描和来源App审核。侧载并没有被禁止，只是操作步骤变多了。",
  },
  {
    question: "Android 15的Play Protect实时扫描会扫描什么？",
    answer: "Play Protect会在安装后持续监控APK的运行时行为，包括API调用模式、权限越级使用、后台联网行为、屏幕读取和按键记录检测等。发现可疑行为会立即发出警报。",
  },
  {
    question: "为什么有些旧APK在Android 14/15上无法安装？",
    answer: "Android 14开始要求APK的目标SDK版本不低于API 23（Android 6.0）。如果一个APK是为更旧的Android版本编译的，系统会直接阻止安装。你需要找到更新版本的APK。",
  },
  {
    question: "ADB侧载在Android 15上还能用吗？",
    answer: "能用，但Android 15增加了额外限制——ADB安装现在会弹出屏幕确认提示，用户必须在30秒内点击"允许"，否则安装失败。",
  },
];

export const zhPosts20260727: BlogPostEntry[] = [
  {
    slug: "apk-integrity-verification-guide",
    title: "APK下载后完整性校验指南：如何确保文件未被篡改",
    description: "下载APK后如何验证文件完整性？教你通过MD5/SHA校验、签名验证、文件大小对比等方法，确保APK下载的文件完整无损坏。",
    date: "2026-07-27",
    readTime: "8 分钟阅读",
    tags: ["APK完整性", "SHA256校验", "APK下载", "Android安全", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-14-15-sideload-changes",
    title: "Android 14/15 侧载APK新变化：最新权限限制与安装指南",
    description: "Android 14和15对侧载（sideload）APK引入了哪些新限制？详细解读权限变化、拦截逻辑更新，以及用户需要知道的安装调整。",
    date: "2026-07-27",
    readTime: "9 分钟阅读",
    tags: ["Android 14", "Android 15", "侧载APK", "APK安装", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260727List = toList(zhPosts20260727);
