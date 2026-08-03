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
      不在 Google Play 下载 APK 时，选对下载网站比什么都重要。这篇文章把主流 APK 下载网站按安全性排开对比，并教你怎么快速判断一个站点可不可信。
    </p>

    <h2>一、安全性评判的五个维度</h2>
    <p>判断一个 APK 下载站是否安全，主要看这五点：</p>
    <ol>
      <li><strong>签名验证</strong>：是否校验 APK 与官方应用的签名一致性</li>
      <li><strong>来源透明度</strong>：是否注明 APK 来自哪个官方渠道</li>
      <li><strong>文件完整性</strong>：是否提供 SHA-256/MD5 哈希供比对</li>
      <li><strong>恶意扫描</strong>：是否对接 VirusTotal 等多引擎扫描</li>
      <li><strong>人工审核</strong>：是否有专业人员（而非纯算法）把关</li>
    </ol>
    <p>用这五条标准去套，网站好坏立判。</p>

    <h2>二、第一梯队：最值得信任的站点</h2>
    <h3>APKMirror（最推荐）</h3>
    <ul>
      <li><strong>签名验证</strong>：✅ 有 Google 认证工程师审核签名</li>
      <li><strong>恶意扫描</strong>：✅ 配合 VirusTotal</li>
      <li><strong>人工审核</strong>：✅ 强</li>
    </ul>
    <p>APKMirror 是安全圈的"金标准"。它的母公司（AndroidPolice 旗下）有专业团队，每个 APK 都要核对签名与官方一致才会上架。缺点是要等更新稍慢一点，但换来的是极高的安全性。</p>
    <h3>官方 GitHub Releases</h3>
    <ul>
      <li><strong>安全性</strong>：✅ 开发者亲手签名发布</li>
      <li><strong>完整性</strong>：源码开源，可编译比对</li>
    </ul>
    <p>对于开源应用（如 Telegram、Signal、Termux 等），<strong>GitHub Releases 是唯一绝对可信的来源</strong>。</p>
    <h3>应用官网</h3>
    <p>大厂应用会在官网提供官方下载链接。但要小心——<strong>只认域名真正为官网的站点</strong>，仿冒官网的钓鱼站非常多。</p>

    <h2>三、第二梯队：可用但需谨慎</h2>
    <h3>APKPure</h3>
    <ul>
      <li><strong>签名验证</strong>：✅ 提供，但个别应用签名可能不匹配</li>
      <li><strong>扫描</strong>：✅ 有</li>
      <li><strong>风险</strong>：偶尔会有非官方签名版本</li>
    </ul>
    <p>APKPure 目录大、更新快、可下历史版本，很多地区受限的应用都有。但因为是"搬运"模式，个别包可能不是官方签名。<strong>安装前务必比对签名</strong>。</p>
    <h3>APKCombo</h3>
    <p>和 APKPure 同属一家母公司，逻辑类似：目录全、可下旧版本。安全措施到位，但同样建议下载后做签名校验。</p>

    <h2>四、第三梯队：能不用尽量不用</h2>
    <ul>
      <li>各类<strong>"APK 大全""绿色版"论坛/下载站</strong>：常捆绑推广软件或恶意代码，版本过时、被植入广告 SDK，无签名校验，APK 可能被二次打包</li>
      <li>搜索引擎结果里的<strong>"点击下载"页</strong>："Download Now"按钮成堆、跳转半天、弹窗不断的页面，<strong>99% 是恶意流量源</strong></li>
    </ul>

    <h2>五、快速判断一个陌生站是否可信</h2>
    <p>不确定某网站靠不靠谱？30 秒自检：</p>
    <ol>
      <li><strong>看域名</strong>：是不是正主官网？有没有拼写相似的山寨域名？</li>
      <li><strong>看 HTTPS</strong>：地址栏是否有小锁（无效 HTTPS 直接排除）</li>
      <li><strong>看有没有签名/Hash 信息</strong>：提供 SHA-256 的站点更专业</li>
      <li><strong>看是不是"按钮农场"</strong>：满屏下载按钮、弹窗广告=远离</li>
      <li><strong>用 VirusTotal 复核</strong>：下载后上传 <a href="https://www.virustotal.com">virustotal.com</a> 扫一遍，0 检出才安装</li>
    </ol>

    <h2>六、下载后必做的三步校验</h2>
    <pre><code>{`# 用官网公布的哈希对比
shasum -a 256 下载的app.apk     # macOS/Linux
certutil -hashfile app.apk SHA256  # Windows`}</code></pre>
    <ol>
      <li><strong>比对哈希</strong>：与官网/发布页公布的 SHA-256 一致才装</li>
      <li><strong>查签名</strong>：用 Android SDK 的 <code>apksigner verify --print-certs app.apk</code> 看签名指纹是否与官方一致</li>
      <li><strong>看权限</strong>：安装时检查申请的权限是否合理（计算器要通讯录=直接拒绝）</li>
    </ol>

    <h2>七、小结</h2>
    <blockquote><strong>官方 GitHub / 官网 &gt; APKMirror &gt; APKPure / APKCombo &gt; 其他杂站（别碰）</strong></blockquote>
    <ul>
      <li>追求极致安全：走官方来源或 APKMirror</li>
      <li>需要大陆可访问或旧版本：APKPure/APKCombo，下载后一定校验签名</li>
      <li>任何"免费""破解""绿色版"站点：<strong>直接无视</strong></li>
    </ul>
    <p>下载 APK 的安全底线就一条：<strong>来源可信 + 签名一致 + 扫描干净</strong>，做到这三步，sideload 也可以很安全。</p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "哪个APK下载网站最安全？",
    answer: "APKMirror被公认为最安全的选择，因为它的Google认证工程师会人工审核每个APK的签名。追求极致安全就走官方GitHub或官网，其次是APKMirror。",
  },
  {
    question: "APKPure安全吗？",
    answer: "整体安全，但有注意点：APKPure从多个来源搬运APK，偶尔会出现非官方签名版本。下载后务必比对签名、用VirusTotal扫描，尤其是来源不明的应用。",
  },
  {
    question: "如何快速判断一个陌生APK网站是否可信？",
    answer: "看域名是否为官网、是否有有效HTTPS、是否提供SHA-256哈希信息。满屏下载按钮和弹窗广告的'按钮农场'站点基本是恶意流量源，要远离。",
  },
  {
    question: "下载APK后装之前必须做什么？",
    answer: "三步：比对官网公布的SHA-256哈希、用apksigner校验签名是否与官方一致、检查安装时申请的权限是否合理。三者都通过才安装。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      小米手机出厂自带 GMS（谷歌移动服务）框架，只要开启相应选项、装好三件套，就能正常使用 Google Play。这篇教程针对 MIUI 和 HyperOS 系统，一步步教你装好 Google Play 商店，并解决"连不上""闪退"等常见问题。
    </p>

    <h2>一、先确认你的系统版本</h2>
    <ul>
      <li><strong>MIUI（国行版）</strong>：需要手动开启 Google 基础服务 + 安装三件套</li>
      <li><strong>MIUI（国际版/欧版）</strong>：一般自带 GMS，装个商店就行</li>
      <li><strong>HyperOS（澎湃OS，2023 后新机）</strong>：设置路径略有变化，但逻辑相同</li>
    </ul>
    <blockquote><strong>提示</strong>：国行版 MIUI/HyperOS 的 GMS 开关是隐藏的，下面教你怎么打开。</blockquote>

    <h2>二、方法一：官方内置 GMS 开启（最稳）</h2>
    <h3>第1步：开启"Google 基础服务"</h3>
    <ol>
      <li>打开 <strong>设置 → 应用设置 → 应用管理</strong></li>
      <li>点击右上角 <strong>三个点（⋮）→ 显示所有应用</strong>（部分系统叫"查看全部应用"）</li>
      <li>右上角搜索 <strong>"Google"</strong>，找到 <strong>"Google 服务框架"</strong>（或"Google Play 服务"）</li>
      <li>若提示未开启，点击 <strong>启用</strong> / <strong>允许</strong> 相关权限</li>
    </ol>
    <p>旧版 MIUI 路径：<strong>设置 → 系统应用 → 系统应用设置</strong>，或直接搜索"Google 基础服务"。</p>
    <h3>第2步：检查是否已预装三件套</h3>
    <p>在应用管理里搜索看是否有这几个：Google Play 服务、Google Play 商店、Google 服务框架。如果都齐全，直接跳到第三步登录即可；缺哪一个，看下面的"方法二"手动补齐。</p>

    <h2>三、方法二：手动安装谷歌三件套</h2>
    <p>国行机有时只内置了服务框架，缺商店和 Play 服务。需要手动补装（三件套安装有顺序，<strong>先装服务框架，再装 Play 服务，最后装商店</strong>）：</p>
    <ol>
      <li>从可信来源（官方 GitHub 或知名镜像，参考《APK下载网站安全性对比》）下载对应你 Android 版本的 APK</li>
      <li>按顺序安装：<strong>Google 服务框架 → Google Play 服务 → Google Play 商店</strong></li>
      <li>安装前在 <strong>设置 → 安全 → 更多安全设置</strong> 里，对"文件管理/浏览器"开启"允许安装未知来源应用"</li>
      <li>每装一个，先打开让它初始化，再装下一个</li>
    </ol>

    <h2>四、第3步：登录 Google 账号</h2>
    <ol>
      <li>打开 <strong>Google Play 商店</strong></li>
      <li>点击左上角 <strong>头像 → 添加账号 → Google</strong></li>
      <li>输入你的 Google 账号密码</li>
      <li>按提示完成验证即可</li>
    </ol>
    <blockquote>若一直转圈，检查是否有全局代理/网络环境支持访问 Google。</blockquote>

    <h2>五、常见问题排查</h2>
    <h3>问题1：Google Play 商店一直"正在核对信息"</h3>
    <ul>
      <li>关闭商店 → 清空 <strong>Google Play 服务</strong> 和 <strong>商店</strong> 的数据缓存（<strong>设置 → 应用管理 → 找到相应应用 → 清除数据</strong>，会重登录，属正常）</li>
      <li>重启手机后重试</li>
    </ul>
    <h3>问题2：提示"此设备未获得 Play 保护认证"</h3>
    <p>国行小米未过认证导致的。解决：确认安装了对应版本的 Play 服务、打开商店检查"Play 保护机制"状态、仍未解决可刷新设备认证（部分机型等待几天自动通过）。</p>
    <h3>问题3：装完商店还是闪退</h3>
    <p>多半是三件套版本不匹配。去 <strong>设置 → 应用管理</strong> 查看 Google Play 服务版本，下载与之匹配的商店版本，卸载商店后重装对应版本。</p>
    <h3>问题4：搜不到某些应用 / 显示地区不可用</h3>
    <p>这是 Google 账号地区限制，与手机无关。需切换到支持该应用的账号地区，或在应用官网直接下载 APK 安装。</p>

    <h2>六、安全提醒</h2>
    <ul>
      <li>Google Play 商店里也有恶意/山寨应用，<strong>只装高评分、下载量大、开发者可信</strong>的应用</li>
      <li>商店外的 APK 一律按"下载后签名校验 + VirusTotal 扫描"处理</li>
      <li>不要随意关闭 Play Protect（<strong>设置 → 安全 → Play 保护机制</strong>），它是第一道防线</li>
    </ul>

    <h2>七、小结</h2>
    <p>小米手机装 Google Play 总共就三步：</p>
    <ol>
      <li>开启系统内置的 <strong>Google 基础服务</strong></li>
      <li>按顺序装齐 <strong>三件套</strong>（服务框架 → Play 服务 → 商店）</li>
      <li>打开商店登录 Google 账号</li>
    </ol>
    <p>遇到转圈/闪退，优先清数据重启；版本不匹配就换对应版本。搞定之后，该下的应用、该用的服务就都通了。</p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "小米手机都能装Google Play吗？",
    answer: "几乎所有小米手机都内置了隐藏的谷歌服务框架，包括国行版。通常只需要开启'Google基础服务'并按顺序补装谷歌三件套即可正常使用。",
  },
  {
    question: "谷歌三件套安装顺序是什么？",
    answer: "先装Google服务框架，再装Google Play服务，最后装Google Play商店。每装一个先打开让它初始化，再装下一个，顺序错误会导致闪退或无法登录。",
  },
  {
    question: "Play商店一直'正在核对信息'怎么办？",
    answer: "清空Google Play服务和商店的数据缓存，重启手机。这会让你退出登录但属正常现象。同时确认网络能正常访问Google。",
  },
  {
    question: "小米手机提示未通过Play保护认证怎么办？",
    answer: "国行小米常见。确认安装了与Android版本匹配的Play服务、检查Play保护状态；部分机型等待几天会自动通过设备认证。",
  },
];

export const zhPosts20260803: BlogPostEntry[] = [
  {
    slug: "apk-download-site-safety-comparison",
    title: "APK下载网站安全性对比：哪些值得信任，哪些是雷区",
    description: "APKMirror、APKPure、APKCombo等主流APK下载网站安全性横向对比，附5个维度评判标准和30秒快速判断陌生站点是否可信的方法。",
    date: "2026-08-03",
    readTime: "8 分钟阅读",
    tags: ["APK下载", "APK安全", "APKMirror", "APKPure", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "xiaomi-install-google-play-guide",
    title: "小米手机安装谷歌商店：MIUI/HyperOS完整教程（含Play服务）",
    description: "小米手机怎么装Google Play？国行MIUI/HyperOS开启Google基础服务、按顺序安装谷歌三件套、登录账号，并解决'正在核对信息''闪退'等常见问题。",
    date: "2026-08-03",
    readTime: "9 分钟阅读",
    tags: ["小米手机", "Google Play", "MIUI", "HyperOS", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260803List = toList(zhPosts20260803);
