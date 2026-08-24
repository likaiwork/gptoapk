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
      用华为手机装 APK，很多人卡在"点开没反应""提示有风险""装到一半失败"这几关上。其实华为（包括荣耀）装 APK
      的坑，绝大多数跟<strong>鸿蒙系统的纯净模式</strong>和<strong>应用来源校验</strong>有关，而不是你下载的文件本身坏了。
      本文把华为手机装 APK 的完整流程讲透：先讲在<strong>哪几步会被卡住</strong>，再给出<strong>一步不错的实操路径</strong>和
      每个报错的解法。
    </p>

    <blockquote>
      <p>
        <strong>先给结论：</strong>华为手机装 APK = <strong>关掉/放行纯净模式 → 用系统文件管理器找到 APK → 选择"仍要安装"
        → 按需授权安装未知应用</strong>。90% 的失败都出在"纯净模式拦截"和"没给来源 App 授权"这两处。
      </p>
    </blockquote>

    <h2>一、先搞懂：华为手机装了哪些"拦截层"</h2>
    <p>跟其他安卓手机不同，鸿蒙（HarmonyOS）在安装未知来源 APK 时叠加了两层额外校验：</p>
    <ol>
      <li>
        <strong>纯净模式（对未知应用的安全拦截）</strong>：这是华为的特色，会在你安装"未经华为应用市场审核"的 APK 时弹提示。
        它<strong>默认开启</strong>。
      </li>
      <li><strong>未知来源授权</strong>：安卓通用机制，首次安装前要允许某个 App"安装未知应用"。</li>
      <li><strong>应用可行性检测 / 恶意应用检测</strong>：华为内置的安全引擎，会扫描安装包。</li>
    </ol>
    <p>
      <strong>关键认知</strong>：这些拦截是<strong>保护机制</strong>，不是"华为不让装 APK"。只要走对流程，非华为商店的 APK
      一样能装上。
    </p>

    <h2>二、实操全流程：7 步装好任意 APK</h2>
    <p><strong>第 1 步：关闭/放行纯净模式（遇到拦截再做）</strong></p>
    <p>
      打开 <strong>设置 → 系统和更新 → 纯净模式</strong>，如果提示拦截了"未知来源应用"，点 <strong>"仍然安装"</strong> 即可，
      不必完全关闭。
    </p>
    <blockquote>
      <p>也可以在这里把"允许安装未知应用"打开，或者干脆关掉纯净模式开关。装完觉得自己不需要了，可以再开回来。</p>
    </blockquote>
    <p><strong>第 2 步：把 APK 传到手机</strong></p>
    <ul>
      <li>电脑传：USB 连电脑，或微信/QQ 文件传输助手。</li>
      <li>
        手机上下载：用浏览器直接下载（注意：<strong>别点网页里花花绿绿的"下载 APK"按钮</strong>，那是广告位，要选浏览器自己弹的
        真正文件下载）。
      </li>
    </ul>
    <p><strong>第 3 步：用系统"文件管理"找 APK（不要直接点浏览器下载通知里的文件）</strong></p>
    <p>
      打开 <strong>文件管理 → 内部存储 / Download 目录</strong>，找到那个 <code>.apk</code> 文件。直接点浏览器的下载通知有时会
      绕过授权流程，导致静默失败。
    </p>
    <p><strong>第 4 步：点击 APK，选择"仍要安装"</strong></p>
    <p>点开后，系统会提示"安装纯净模式的未知应用？"之类的话——选 <strong>"仍要安装 / 继续安装"</strong>。</p>
    <p><strong>第 5 步：给来源 App 授权"安装未知应用"</strong></p>
    <p>系统会引导你到"允许安装未知应用"页面，<strong>把当前来源（文件管理 或 浏览器）的开关打开</strong>。</p>
    <p><strong>第 6 步：等待"应用可行性检测"通过</strong></p>
    <p>
      华为会做扫描，正常应用几秒就能过。若提示"检测到风险"，看下是<strong>签名问题</strong>（风险，别装）还是<strong>未上架提示</strong>
      （可继续）。
    </p>
    <p><strong>第 7 步：点"安装"→ 完成</strong></p>
    <p>装完如果提示"该应用未经安全检测"之类，直接点完成即可。到桌面找图标打开。</p>
    <blockquote>
      <p>
        ⚠️ 荣耀手机（MagicOS，脱胎于鸿蒙）流程基本一致，只是菜单可能叫"设置 → 安全 → 更多安全设置 → 允许安装未知应用"。
      </p>
    </blockquote>

    <h2>三、最常用的两种装法总结</h2>
    <ul>
      <li><strong>手机里已有 APK 文件</strong>：文件管理 → 找到 .apk → 点击 → 仍要安装 → 允许来源 → 安装。</li>
      <li><strong>APK 在电脑上</strong>：传到手机（USB/微信）→ 同上。</li>
      <li>
        <strong>想在 Telegram / 微信里直接装</strong>：点文件 → 右上"用其他应用打开"→ 选文件管理 → 再走安装流程。
      </li>
    </ul>

    <h2>四、常见报错逐个击破</h2>
    <ul>
      <li><strong>"安装纯净模式的未知应用？"</strong>：纯净模式拦截 → 选"仍要安装"，或到设置里关纯净模式。</li>
      <li>
        <strong>"未获得安装未知应用的授权"</strong>：来源 App 没开权限 → 设置 → 应用 → 该来源 → 允许安装未知应用。
      </li>
      <li><strong>"应用与设备不兼容"</strong>：系统版本/架构不符 → 下适配版本，或装含 arm64 的通用包。</li>
      <li>
        <strong>"应用未安装" / "已停止安装"</strong>：包损坏或签名冲突 → 删掉换可靠来源重下；同包名旧版先卸载。
      </li>
      <li><strong>"检测到风险应用"</strong>：可能被篡改 → 别装！核对 SHA-256 签名，重下官方版。</li>
      <li><strong>闪退</strong>：缺 Google 服务/GMS → 装 GMS 安装器，或换无 GMS 依赖的版本。</li>
    </ul>

    <h2>五、装华为之外的服务：一个常见误区</h2>
    <p>
      很多人的目标是装 <strong>Google 系应用（谷歌商店、Gmail、YouTube）</strong>。注意：<strong>纯净模式解决的是"能不能装"，
      而 Google 应用能不能用，取决于你的机型是否预装 GMS（谷歌移动服务）</strong>——海外版/部分机型自带，国行大多需要单独装
      GMS 包。
    </p>
    <ul>
      <li>
        国行华为（HarmonyOS 3/4）：装 Google 服务需要额外刷 GMS 框架，门槛较高，动手前先确认你的机型和方法是兼容的。
      </li>
      <li>只是装普通国产 APK（微信国际版、工具类等）：走上面的 7 步就能装，不需要 GMS。</li>
    </ul>
    <p>
      <strong>判断标准</strong>：如果你装的是<strong>国内开发者应用</strong>，那纯粹是"安装流程"问题，走本文流程即可；如果是
      <strong>依赖 Google 服务的海外应用</strong>，装不上大概率不是安装的事，而是 GMS 缺失，别死磕安装步骤。
    </p>

    <p>
      <strong>总结：</strong>华为手机完全能装第三方 APK，核心就三步——<strong>放行纯净模式 + 允许来源 App 安装未知应用 +
      从文件管理器走正规流程</strong>。装不上先看是"纯净模式拦截"（放行即可）还是"GMS 缺失"（海外应用才需要折腾 Google 框架）。
      把这两点分清楚，华为装 APK 就没有解不开的结。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      APK 这个词，装过非商店应用的人基本都见过。但"APK 到底是什么""它跟 <code>.xapk</code>、<code>.apks</code>、
      <code>.aab</code> 有什么区别""为什么有人让我别乱下 APK"——这些才是真正能帮你避坑的知识。本文不跟你讲太深的技术，
      而是用<strong>普通用户能上手的方式</strong>，把 APK 的本质、常见文件格式、以及"怎么判断手里这个 APK 干不干净"讲清楚。
    </p>

    <blockquote>
      <p>
        <strong>一句话版本：</strong>APK 就是安卓应用的"安装包"，等于电脑上的 .exe，把代码、资源、权限说明打包成一个文件。
        你装 App，本质就是在"解压并注册"这个包。下面重点讲清楚它装着什么，以及你该怎么看它可不可信。
      </p>
    </blockquote>

    <h2>一、APK 里面到底装着什么？</h2>
    <p>APK 本质上是个<strong>压缩包</strong>（zip 格式），里面装着让一个 App 能跑起来的全部东西，主要就 4 类：</p>
    <ul>
      <li><strong>代码（classes.dex）</strong>：App 的"程序指令"。</li>
      <li><strong>资源（res/、assets/）</strong>：图片、图标、界面布局、音频等。</li>
      <li>
        <strong>清单（AndroidManifest.xml）</strong>：App 的"身份证"——<strong>它申请了哪些权限、能访问你什么数据，都写在这</strong>。
      </li>
      <li><strong>签名（META-INF/）</strong>：这个 App 由谁发布、有没有被别人改过，靠它验证。</li>
    </ul>
    <p>
      <strong>对你最有用的认知</strong>：你判断一个 APK 危不危险，重点不是代码（你也看不懂），而是<strong>清单里的权限</strong>和
      <strong>签名是否完整</strong>——这两样普通用户也能看懂一点。
    </p>

    <h2>二、别搞混：.apk、.apks、.xapk、.aab 都是什么？</h2>
    <p>下载站上经常同时出现好几种后缀，很多人直接懵：</p>
    <ul>
      <li><strong>.apk</strong>：标准安装包，手机直接装 ✅</li>
      <li><strong>.apks</strong>：拆分包（按架构/语言拆开打包）⚠️ 需用 SAI 等工具或模拟器装</li>
      <li><strong>.xapk</strong>：APKPure 的封装格式（含多个 APK+数据文件）⚠️ 需 APKPure 客户端或解压后装</li>
      <li><strong>.aab</strong>：谷歌商店的"源包"，不是安装包 ❌ 不能直接装（需转换成 APK/由商店生成）</li>
    </ul>
    <blockquote>
      <p>
        <strong>记住结论：</strong>想省事就下 <strong>.apk</strong>。看到 .apks/.xapk 且不会装，就换一个 .apk 版本；看到 .aab
        就直接忽略，它根本不是给你装的。
      </p>
    </blockquote>

    <h2>三、动手验真：怎么用"改名大法"看一个 APK 干不干净</h2>
    <p>不需要任何专业工具，你就能给 APK"验个身"：</p>
    <ol>
      <li><strong>把 .apk 后缀改成 .zip</strong>（比如 <code>app.apk</code> → <code>app.zip</code>）。</li>
      <li>
        <strong>解压</strong>，看里面的文件结构是否正常。正常的 APK 应该有 <code>AndroidManifest.xml</code>、
        <code>classes.dex</code>、<code>res/</code>、<code>META-INF/</code> 这些。
      </li>
      <li><strong>重点看 META-INF</strong> 里有没有证书文件。<strong>篡改过的 APK，签名常被替换或缺失</strong>，这是明显疑点。</li>
      <li>
        （关键）装之前到 <strong>VirusTotal（virustotal.com）</strong>上传这个 APK 扫一下——<strong>只要有 2 个以上引擎报毒，
        直接删</strong>，别冒险。
      </li>
    </ol>
    <blockquote>
      <p>
        ⚠️ 注意："改名大法"只能帮你<strong>看结构是否正常</strong>，不能证明 100% 安全。真要验证合法性，最靠谱的还是
        <strong>对照官方发布的 SHA-256 哈希</strong>，或干脆<strong>只从可信渠道下载</strong>。正经站点（如 gptoapk、APKMirror）会标注校验值。
      </p>
    </blockquote>

    <h2>四、为什么老有人劝你"别乱下 APK"？</h2>
    <p>因为<strong>大部分安卓木马，就藏在你随手下的 APK 里</strong>。常见套路：</p>
    <ol>
      <li><strong>伪装 APK</strong>：图标和名字做成微信、支付宝的样子，实际是盗号程序。</li>
      <li><strong>捆绑安装</strong>：装 A 的同时偷偷给你装上广告 SDK / 推广应用。</li>
      <li><strong>权限滥用</strong>：一个手电筒 App 却要"读取联系人、发短信"——明显不对劲。</li>
      <li><strong>破解版陷阱</strong>：很多"VIP 破解版"夹带恶意代码，图的就是你的账号和数据。</li>
    </ol>
    <p><strong>你只需要记住 3 条防身规则</strong>：</p>
    <ul>
      <li><strong>只从可信来源下</strong>：官方商店、开发者官网、APKMirror/APKPure 这类有审核的站点。</li>
      <li><strong>安装时扫一眼权限</strong>：跟功能无关的权限请求 = 提高警惕或放弃。</li>
      <li><strong>装前用 VirusTotal 扫一下</strong>：尤其从不知名站点下来的时候。</li>
    </ul>

    <h2>五、一张表看懂：什么时候该下 APK、什么时候别折腾</h2>
    <ul>
      <li><strong>装普通 App</strong>：直接走官方商店，别下 APK。</li>
      <li><strong>商店没有 / 地区限制</strong>：从开发者为 APKMirror/官网下。</li>
      <li><strong>想要旧版本</strong>：APKMirror 可按版本下。</li>
      <li><strong>想要"破解版"</strong>：❌ 风险极高，不建议。</li>
      <li><strong>不知道自己下的靠不靠谱</strong>：VirusTotal 先扫 + 看签名文件。</li>
    </ul>

    <p>
      <strong>总结：</strong>APK 就是安卓应用的安装包，装着代码、资源和最重要的"权限清单 + 签名"。学会三件事——
      <strong>分清 .apk/.apks/.xapk/.aab、用改名大法看结构、装前扫 VirusTotal</strong>——你就能既享受 APK 的自由，又避开
      绝大多数坑。记住：<strong>APK 本身不可怕，可怕的是来源不明还让你闭眼装。</strong>
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "华为手机到底能不能装第三方 APK？",
    answer: "能。华为的纯净模式只是对未知来源应用的安全拦截，不是禁止安装。只要走对流程——放行纯净模式、允许来源 App 安装未知应用、从文件管理器点开 APK 选“仍要安装”——非华为商店的 APK 一样能装上。",
  },
  {
    question: "华为手机装 Google 系应用装不上是为什么？",
    answer: "如果装的是依赖 Google 服务（GMS）的海外应用，装不上大概率不是安装流程的问题，而是国行机型没有预装 GMS 框架。这类应用需要额外刷 GMS 包才能用。如果只是装国内开发者应用，走本文 7 步流程即可，不需要 GMS。",
  },
  {
    question: "纯净模式是什么？一定要关掉才能装 APK 吗？",
    answer: "纯净模式是华为在安装未经应用市场审核的 APK 时做的安全拦截。你通常不需要完全关闭它——遇到提示时点“仍然安装”即可，或者只在设置里把“允许安装未知应用”打开。装完觉得自己不需要，可以再开回来。",
  },
  {
    question: "华为手机提示“检测到风险应用”还能装吗？",
    answer: "要分情况。如果是“未上架提示”，说明只是这个 App 没进华为应用市场，来源可靠的话可以继续。如果是签名问题或明确提示风险（可能被篡改），不要装——先核对 SHA-256 签名，重新下载官方版本。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 和 App 是什么关系？",
    answer: "APK 是安卓应用的安装包文件，相当于电脑上的 .exe。你从商店或网站下载安装 App，本质就是下载并安装这个 APK 包。App 是装好后的形态，APK 是安装前的文件。",
  },
  {
    question: ".apks、.xapk 和 .apk 有什么区别？能直接装吗？",
    answer: ".apk 是最标准、手机直接能装的格式。.apks 是拆分包（按架构/语言拆开）需要 SAI 等工具或模拟器装；.xapk 是 APKPure 的封装格式，需要 APKPure 客户端或解压后装。.aab 是谷歌商店的源包，不是安装包，不能直接装。想省事就记住：下 .apk。",
  },
  {
    question: "怎么用“改名大法”给 APK 验真？",
    answer: "把 .apk 后缀改成 .zip，然后解压。正常 APK 应该有 AndroidManifest.xml、classes.dex、res/、META-INF/ 这些文件。重点看 META-INF 里有没有证书文件——篡改过的 APK 签名常被替换或缺失。再用 VirusTotal 扫一下，有 2 个以上引擎报毒就删。",
  },
  {
    question: "从哪下 APK 最安全？",
    answer: "只从可信来源下：官方商店、开发者官网、APKMirror/APKPure 这类有签名审核的站点，或 gptoapk 这类预验证文件的精选门户。安装时扫一眼权限，跟功能无关的权限请求要提高警惕。破解版 APK 风险极高，不建议碰。",
  },
];

export const zhPosts20260824: BlogPostEntry[] = [
  {
    slug: "huawei-phone-install-apk-harmonyos-full-guide",
    title: "华为手机安装APK方法：鸿蒙系统全流程（含纯净模式、报错排查）",
    description: "华为手机装APK卡在“点开没反应”“提示有风险”？本文讲透鸿蒙系统装APK的完整流程：纯净模式放行、未知来源授权、应用可行性检测，以及每个报错的解法，荣耀手机通用。",
    date: "2026-08-24",
    readTime: "8 min read",
    tags: ["华为", "APK", "鸿蒙", "HarmonyOS", "安装教程"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "what-is-an-apk-file-verify-field-guide",
    title: "安卓APK文件是什么？从“装着什么”到“怎么验真”一份实战手册",
    description: "APK就是安卓应用安装包，等于电脑上的.exe。本文用普通用户能上手的方式讲清APK装着什么、.apk/.apks/.xapk/.aab的区别，以及怎么用改名大法和VirusTotal判断APK干不干净。",
    date: "2026-08-24",
    readTime: "7 min read",
    tags: ["APK", "安卓", "文件", "安全", "验真"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260824List = toList(zhPosts20260824);
