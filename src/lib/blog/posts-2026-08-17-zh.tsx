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
      很多华为用户在升级系统后突然发现：<strong>以前能装的 .apk 现在装不了了</strong>。这不是手机坏了，而是
      &ldquo;纯血鸿蒙&rdquo;（HarmonyOS NEXT）彻底不再兼容安卓 APK 了。这篇文章用大白话讲清楚：你现在用的是哪种鸿蒙、
      能不能装 APK、装不了该怎么应对，以及未来方向。
    </p>

    <blockquote>
      <p>
        <strong>一句话结论：</strong>鸿蒙 4.x 及更老版本都能正常装安卓 APK；纯血鸿蒙 HarmonyOS NEXT 原生不支持
        APK，只能装鸿蒙原生应用。先搞清楚你的系统版本，再往下看。
      </p>
    </blockquote>

    <h2>一、先分清你的华为是哪种系统</h2>
    <p>华为手机现在系统分三大类，装 APK 的能力天差地别：</p>
    <table>
      <thead>
        <tr>
          <th>系统</th>
          <th>常见机型</th>
          <th>能装安卓 APK 吗</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>EMUI 12 及更早</strong></td>
          <td>老机型（Mate 30 之前的旧款）</td>
          <td>✅ 完全支持</td>
        </tr>
        <tr>
          <td><strong>鸿蒙 HarmonyOS 2/3/4</strong></td>
          <td>Mate 40/50/60、P 系列、nova 部分</td>
          <td>✅ 支持，需开启&ldquo;未知来源&rdquo;</td>
        </tr>
        <tr>
          <td><strong>纯血鸿蒙 HarmonyOS NEXT</strong></td>
          <td>Mate 70、Pura 70 部分、nova 13 新一代</td>
          <td>❌ 不支持 APK，只装鸿蒙原生应用</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>怎么查你的系统版本</strong>：<code>设置 → 关于手机 → 鸿蒙OS版本</code>。如果版本号是 <code>5.0.0.x</code>
      （或者系统设置里只提&ldquo;HarmonyOS&rdquo;不带&ldquo;Android兼容&rdquo;），基本就是 NEXT。
    </p>

    <h2>二、鸿蒙 2/3/4 装 APK：照常装，注意 3 个细节</h2>
    <p>如果你是鸿蒙 2/3/4，装 APK 跟普通安卓差别不大，但有三处经常卡住：</p>
    <ol>
      <li>
        <strong>纯净模式默认开启，会拦截未知来源应用</strong>：去 <code>设置 → 系统和更新 → 纯净模式</code>，
        把它<strong>关掉</strong>（或点&ldquo;仍要安装&rdquo;）。这是华为装机顶拦截&ldquo;来源不明 App&rdquo;
        的保护，关掉后才能装第三方 APK。
      </li>
      <li>
        <strong>没开&ldquo;允许安装未知应用&rdquo;</strong>：用哪个 App 去安装（文件管理、浏览器），就要给哪个
        App 授权：<code>设置 → 应用和服务 → 应用管理 → 找到那个App → 权限/允许安装其他应用</code>。
      </li>
      <li>
        <strong>某些银行/工具类 App 检测到&ldquo;非官方渠道&rdquo;直接拒绝</strong>：这类 App 有时需要 APK 从
        Google Play 版或官方版获取，跟系统无关。可去官网渠道下载对应版本。
      </li>
    </ol>
    <blockquote>
      <p>
        如果按上面还装不上，参考排查思路：看报错是&ldquo;应用未安装&rdquo;（多为签名/覆盖安装问题，卸载旧的再装）、
        &ldquo;解析软件包时出现问题&rdquo;（文件损坏，重新下载）、还是&ldquo;与此设备不兼容&rdquo;（架构或
        targetSdk 问题，找对应机型版本）。
      </p>
    </blockquote>

    <h2>三、纯血鸿蒙 NEXT：装不了 APK，怎么办？</h2>
    <p>
      如果你升级到了 <strong>HarmonyOS NEXT</strong>，很遗憾：它从底层去掉了 AOSP（安卓开源项目）代码，
      <strong>彻底不兼容安卓 APK</strong>。这是架构性改变，任何&ldquo;破解/兼容层&rdquo;都无济于事。你的出路有三条：
    </p>
    <ol>
      <li>
        <strong>等鸿蒙原生的&ldquo;纯血版&rdquo; App</strong>：常用 App（微信、支付宝、抖音、WPS、各大银行）
        都已有或正在适配鸿蒙原生版，直接去 <strong>华为应用市场</strong>（AppGallery）搜名字，装鸿蒙版即可，
        体验和功能近年已接近安卓版。
      </li>
      <li>
        <strong>用「卓易通」等兼容方案（有限支持）</strong>：华为在部分设备上提供 <strong>卓易通（兼容层方案）</strong>，
        可以运行部分安卓应用。但它是&ldquo;虚拟机/兼容&rdquo;思路，<strong>不是所有 APK 都支持</strong>，性能有损耗，
        系统级功能（如推送）可能不完整。以官方应用市场里的「卓易通」实际支持列表为准。
      </li>
      <li>
        <strong>保留/换一台安卓或鸿蒙兼容设备</strong>：如果你有某个 APK 一定要用（比如只在 Google Play 上架的
        海外应用），现实的选择是：<strong>不升级 NEXT</strong>（旧机型按住不升），或<strong>再用一台安卓/鸿蒙 4
        设备</strong>专门跑这个应用。
      </li>
    </ol>

    <h2>四、关键问题答疑</h2>
    <h3>Q1：升级 NEXT 后能不能&ldquo;降级&rdquo;回去装 APK？</h3>
    <p>
      部分机型在升级后 14 天/30 天内可以通过华为手机助手（HiSuite）回退到鸿蒙 4 兼容版（会清空数据，需提前备份）。
      窗口期过后一般无法自助降级，建议去官方售后确认你机型是否支持。
    </p>
    <h3>Q2：网上说的&ldquo;兼容层/补丁&rdquo;能让 NEXT 装 APK 吗？</h3>
    <p>
      市面上流传的大多是<strong>针对老鸿蒙的低版本兼容方案</strong>，对 NEXT 无效。NEXT 是架构级剥离 AOSP，
      不是靠打补丁能恢复的。<strong>别为此刷机或装来路不明的&ldquo;破解包&rdquo;</strong>——既不安全也大概率失败。
    </p>
    <h3>Q3：我不升级 NEXT，能用安卓 APK 到什么时候？</h3>
    <p>
      只要你的机型还停留在鸿蒙 2/3/4 或 EMUI，就可以继续正常安装 APK。华为对老机型的新系统推送是可以
      <strong>手动选择不升级</strong>的。注意别在&ldquo;设置更新&rdquo;里误触升级即可。
    </p>

    <h2>五、给你的实操建议</h2>
    <ul>
      <li>
        <strong>先用一句话判断</strong>：查 <code>关于手机</code>，看系统是不是鸿蒙 NEXT（5.x）。→ 不是 → 按第二节
        正常装 APK；是 → 按第三节处理。
      </li>
      <li>
        <strong>别急着升 NEXT</strong>：如果你重度依赖 Google Play、侧载 APK 或某些海外 App，升级前务必想清楚——
        升上去就回不来了（窗口期有限）。
      </li>
      <li>
        <strong>App 能装原生版就装原生版</strong>：鸿蒙原生应用更省电、推送更稳，优先用应用商店里的官方版本。
      </li>
      <li>
        <strong>装第三方 APK 只走可信渠道</strong>：官网、APKPure/APKMirror 等知名源，并在安装时留意权限，别乱授权。
      </li>
    </ul>

    <p>
      <strong>总结</strong>：华为装 APK 这事儿，<strong>老鸿蒙基本没问题，纯血 NEXT 是根本装不了</strong>。先确认
      系统版本，再决定是调整设置装机还是改用鸿蒙原生版。搞清这一点，90% 的&ldquo;装不上&rdquo;问题都能当场解决。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      APK 看着是个&ldquo;.zip&rdquo;，其实是安卓应用的&ldquo;集装箱&rdquo;。<strong>想了解一个 App 到底要了哪些
      权限、会不会偷偷联网、包里的资源长什么样</strong>——不需要任何专业背景，用几个免费小工具就能&ldquo;拆开&rdquo;它。
      这篇文章手把手带你解包一个 APK，看懂里面的结构。
    </p>

    <blockquote>
      <p>
        <strong>先说结论：</strong>APK 本质就是一个 ZIP 压缩包，你可以把它当成压缩文件解压（能看到大部分内容），
        但真正有价值的是看懂里面的 <code>AndroidManifest.xml</code>（权限清单）、<code>classes.dex</code>（代码）、
        <code>res/</code>（资源）。下面一步步来。
      </p>
    </blockquote>

    <h2>一、APK 里到底有什么？关键文件速览</h2>
    <p>解包后你会看到这几个核心部分：</p>
    <table>
      <thead>
        <tr>
          <th>文件/目录</th>
          <th>作用</th>
          <th>你关心的点</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>AndroidManifest.xml</code></td>
          <td><strong>权限与组件清单</strong>，App 的&ldquo;身份证&rdquo;</td>
          <td>它申请了哪些权限，这是安全重点</td>
        </tr>
        <tr>
          <td><code>classes.dex</code></td>
          <td>App 的<strong>程序代码</strong>（编译后的字节码）</td>
          <td>有没有被塞进奇怪代码（需要反编译工具看）</td>
        </tr>
        <tr>
          <td><code>res/</code></td>
          <td>图片、布局、语言资源</td>
          <td>换图标、改界面、汉化都在这</td>
        </tr>
        <tr>
          <td><code>assets/</code></td>
          <td>额外的打包资源（字体、视频、内置数据）</td>
          <td>可能藏着额外内容，值得翻翻</td>
        </tr>
        <tr>
          <td><code>META-INF/</code></td>
          <td><strong>签名信息</strong></td>
          <td>判断 APK 是否被篡改的关键</td>
        </tr>
        <tr>
          <td><code>lib/</code></td>
          <td>各 CPU 架构（arm64-v8a 等）的底层库</td>
          <td>说明 App 为哪些芯片编译</td>
        </tr>
      </tbody>
    </table>
    <blockquote>
      <p>
        ⚠️ 注意：原版 <code>AndroidManifest.xml</code> 和 <code>resources.arsc</code> 是<strong>二进制格式</strong>，
        直接用解压工具看是乱码，要用下面的专用工具才能&ldquo;翻译&rdquo;成人能读的文本。
      </p>
    </blockquote>

    <h2>二、工具准备：3 个免费开源工具</h2>
    <p>不需要安装一堆东西，下面按用途挑 1-2 个就够：</p>
    <ol>
      <li>
        <strong><a href="https://ibotpeaches.github.io/Apktool/" rel="noopener noreferrer" target="_blank">apktool</a></strong>
        （Java 工具，最全能）：解包 + 反编译资源 + 还原成可读的 AndroidManifest.xml。最推荐。
      </li>
      <li>
        <strong><a href="https://github.com/skylot/jadx" rel="noopener noreferrer" target="_blank">jadx</a></strong>
        （Java 工具）：把 <code>classes.dex</code> 反编译成<strong>接近源码的 Java 代码</strong>，看代码逻辑用它。
      </li>
      <li>
        <strong>aapt2</strong>（Android SDK 自带）：轻量查看 APK 的权限、包名、版本，命令行一条搞定。
      </li>
    </ol>
    <blockquote>
      <p>
        三者都要装 Java（JRE）。Windows/Mac/Linux 都能用。如果你只要快速看权限，<code>aapt2 dump permissions</code>{" "}
        一行就够，不用装太重的东西。
      </p>
    </blockquote>

    <h2>三、实战第 1 步：解包整个 APK</h2>
    <p>以 <code>apktool</code> 为例，命令行进入 APK 所在目录：</p>
    <pre><code>{`apktool d 你的应用.apk -o 输出目录`}</code></pre>
    <p>执行后你会发现一个目录，里面有：</p>
    <ul>
      <li><strong>解码后的 <code>AndroidManifest.xml</code></strong> —— 不再是乱码，直接用文本编辑器就能打开看权限。</li>
      <li><strong><code>res/</code></strong> —— 资源文件已经变成人类可读（图标、布局 XML、字符串都能直接看）。</li>
      <li><strong><code>smali/</code></strong> —— 反编译出的&ldquo;低层代码&rdquo;（可读性差，看逻辑请用 jadx 处理 classes.dex）。</li>
    </ul>
    <pre><code>{`# 如果想连代码一起反编译得更彻底，用 jadx
jadx 你的应用.apk -d 输出目录`}</code></pre>
    <p>
      jadx 会直接给你一个 <code>sources/</code> 文件夹，里面是<strong>近似原始 Java 的源码</strong>，配合搜索功能
      就能定位某个功能点在哪。
    </p>

    <h2>四、实战第 2 步：查看 App 申请了哪些权限（安全重点）</h2>
    <p>解包后打开解码的 <code>AndroidManifest.xml</code>，搜索 <code>&lt;uses-permission&gt;</code>，你会看到一串权限。比如：</p>
    <pre><code>{`<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.READ_CONTACTS"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>`}</code></pre>
    <p><strong>怎么判断正常不正常</strong>：</p>
    <ul>
      <li>
        <strong>正常</strong>：一个&ldquo;手电筒&rdquo;要 <code>CALL_PHONE</code>、一个&ldquo;计算器&rdquo;要{" "}
        <code>READ_CONTACTS</code> —— 权限和功能严重不匹配 = <strong>高危信号</strong>，多半有鬼。
      </li>
      <li><strong>合理</strong>：地图要位置、输入法要网络，这些符合预期。</li>
      <li>
        <strong>重点警惕</strong>：<code>RECORD_AUDIO</code>（录音）、<code>READ_SMS</code>（读短信）、
        <code>SYSTEM_ALERT_WINDOW</code>（悬浮窗）、<code>QUERY_ALL_PACKAGES</code>（扫描你装了啥）。
      </li>
    </ul>
    <blockquote>
      <p>
        不想装工具？手机端可以直接看安装前的权限提示，或用 APKPure/APKMirror 网页版的&ldquo;Permissions&rdquo;栏目，
        也能快速核对该 App 申请了哪些权限。
      </p>
    </blockquote>

    <h2>五、实战第 3 步：验证 APK 有没有被篡改（防病毒关键）</h2>
    <p>
      APK 里的 <code>META-INF/</code> 文件夹存着<strong>签名信息</strong>。对比 APK 的签名和官方原版是否一致，
      能判断你下载的文件有没有被人动过手脚。
    </p>
    <p><strong>方法 A：命令行看签名哈希</strong></p>
    <pre><code>{`# 用 keytool 打印 APK 签名证书指纹
keytool -printcert -jarfile 你的应用.apk`}</code></pre>
    <p>对比官方公布的 SHA-256 指纹即可。</p>
    <p><strong>方法 B：对比文件哈希（最直观）</strong></p>
    <ol>
      <li>在官方源（Google Play / 官方商店 / 官网）下载一个版本，记为&ldquo;基准&rdquo;。</li>
      <li>在第三方站点下载同样的 App，用下面命令算哈希：</li>
    </ol>
    <pre><code>{`# macOS / Linux
shasum -a 256 你的应用.apk
# Windows PowerShell
Get-FileHash 你的应用.apk -Algorithm SHA256`}</code></pre>
    <ol start={3}>
      <li><strong>两个哈希一致 = 文件没被改过</strong>；不一致 = 被二次打包过，直接别装。</li>
    </ol>

    <h2>六、安全提醒：别把&ldquo;会解包&rdquo;用歪了</h2>
    <ul>
      <li>
        <strong>合法用途</strong>：安全分析、查权限、汉化/换主题（个人学习）、给不支持的应用找架构匹配版、
        了解 App 是否植入了广告 SDK。
      </li>
      <li>
        <strong>别做的</strong>：拿来&ldquo;破解&rdquo;付费 App、盗取他人代码改头换面上架、用反编译结果做灰产。
        <strong>学习可以，侵权违法不可取。</strong>
      </li>
      <li>
        <strong>不认识的 APK 别靠解包&ldquo;赌&rdquo;安全</strong>：真正专业判断还需要行为监控，普通用户更稳妥的是
        <strong>只用可信渠道 + 官方签名对比</strong>，解包就当快速体检。
      </li>
    </ul>

    <p>
      <strong>总结</strong>：APK 就是一个 ZIP，里面的 <code>AndroidManifest.xml</code>、<code>classes.dex</code>、
      <code>META-INF</code> 分别告诉你&ldquo;它要啥权限、代码是啥样、有没有被改过&rdquo;。用 <code>apktool</code>{" "}
      解包 + <code>jadx</code> 看代码 + 哈希对比验真，三步就能把任意一个 APK 摸个底朝天。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "纯血鸿蒙 HarmonyOS NEXT 真的完全不能装 APK 吗？",
    answer: "是的。NEXT 从底层去掉了 AOSP（安卓开源项目）代码，架构上不再兼容安卓 APK，任何破解或兼容补丁都无法恢复。只能安装鸿蒙原生应用，或通过华为提供的有限兼容方案（如卓易通）运行部分安卓应用，但不保证所有 APK 都支持。",
  },
  {
    question: "华为鸿蒙装 APK 提示'无法安装'但纯净模式已关，怎么办？",
    answer: "常见原因还有：没给安装来源 App 开启'允许安装未知应用'权限、APK 与系统架构或版本不兼容、文件损坏、或覆盖安装时签名不一致。建议重新从可信渠道下载匹配机型架构的新版本，并逐个排查权限和报错类型。",
  },
  {
    question: "普通鸿蒙（HarmonyOS 2/3/4）能一直用安卓 APK 吗？",
    answer: "能。只要你的机型停留在鸿蒙 2/3/4 或 EMUI，就可以继续正常安装安卓 APK。华为会推送新系统更新，但你也可以手动选择不升级，以避免升级到 NEXT 后无法安装 APK。",
  },
  {
    question: "升级到鸿蒙 NEXT 之后还能降级回原来能装 APK 的版本吗？",
    answer: "部分机型在升级后 14 天或 30 天的窗口期内可以通过华为手机助手（HiSuite）回退到鸿蒙 4 兼容版，但会清空数据需先备份。窗口期过后一般无法自助降级，建议先向官方售后确认机型支持情况再操作。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "解包 APK 需要什么基础？普通用户学得会吗？",
    answer: "只需要基本的命令行操作（进入到文件目录、运行一条命令）。apktool 解包、jadx 反编译都是现成工具，照着文章步骤输入命令即可，不需要编程基础。",
  },
  {
    question: "怎么用解包快速判断一个 APK 安不安全？",
    answer: "重点看两处：一是解码后的 AndroidManifest.xml 中 uses-permission 权限是否与功能匹配（手电筒要通讯录、计算器要定位就是危险信号）；二是对比 META-INF 的签名指纹或文件 SHA-256 是否与官方一致，不一致说明被二次打包过。",
  },
  {
    question: "apktool 解包乱码怎么办？",
    answer: "原版 AndroidManifest.xml 和 resources.arsc 是二进制格式，直接解压是乱码，这是正常的。要用 apktool 这类专用工具执行 d 命令，它会自动解码成可读的 XML 和资源文件，而不是用普通压缩工具去解压。",
  },
  {
    question: "解包、反编译 APK 合法吗？",
    answer: "用于个人学习、安全分析、汉化/换主题等合法用途是允许的。但用反编译结果破解付费应用、盗取代码上架或做灰产则属于侵权违法行为，不推荐也可能面临法律风险。",
  },
];

export const zhPosts20260817: BlogPostEntry[] = [
  {
    slug: "huawei-harmonyos-next-apk-compatibility-guide",
    title: "华为鸿蒙OS还能装安卓APK吗？纯血鸿蒙(NEXT)与老鸿蒙的兼容性完整指南",
    description: "华为手机升级后突然装不了APK？本文讲清鸿蒙2/3/4与纯血鸿蒙NEXT的APK兼容性区别，给出纯净模式/未知来源设置、NEXT无法安装的3条出路与降级方案，华为用户必看。",
    date: "2026-08-17",
    readTime: "8 min read",
    tags: ["华为", "鸿蒙", "HarmonyOS NEXT", "APK安装", "兼容性"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-internal-structure-unpack-guide",
    title: "安卓APK文件内部结构详解：用工具解包、查看权限与资源（实战教程）",
    description: "APK到底是什么？本文手把手教你用apktool和jadx解包任意APK，读懂AndroidManifest.xml权限清单、classes.dex代码与签名信息，学会快速判断一个APK是否安全。",
    date: "2026-08-17",
    readTime: "9 min read",
    tags: ["APK", "安卓", "解包", "apktool", "权限", "Android"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260817List = toList(zhPosts20260817);
