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
      很多应用商店没上架、或者想装海外应用的 App，都需要通过 APK 文件手动安装。华为手机因为系统比较特别，安装 APK 时经常遇到"禁止安装""未知来源""安装失败"等问题。这篇教程按系统版本讲清楚，从哪下载、怎么装、装不上怎么办。
    </p>

    <h2>一、先搞清你的华为手机系统</h2>
    <p>华为手机目前主要分三种系统，操作路径不一样：</p>
    <ul>
      <li><strong>HarmonyOS（鸿蒙）</strong>：华为 2021 年后新机的主要系统，设置界面最"华为化"</li>
      <li><strong>EMUI 10 / 11</strong>：部分老机型，其实本质还是安卓</li>
      <li><strong>鸿蒙 NEXT / 纯血鸿蒙</strong>：不支持安卓 APK，只能装鸿蒙应用（下文重点说明）</li>
    </ul>
    <blockquote>查看方法：<strong>设置 → 关于手机</strong>，看"HarmonyOS 版本"或"EMUI 版本"。</blockquote>

    <h2>二、下载 APK 的来源（安全第一）</h2>
    <p>APK 是安装包，来源不干净容易被塞进广告甚至病毒。建议优先：</p>
    <ul>
      <li><strong>官网 / 官方应用商店</strong>（华为应用市场里没有的，优先去开发者官网）</li>
      <li><strong>知名镜像站</strong>：APKMirror、APKPure 等有签名校验</li>
      <li><strong>信任的下载渠道</strong>，下载后用手机管家/杀毒软件扫描一遍再装</li>
    </ul>
    <blockquote>⚠️ 避开各种"XX下载站""高速下载器"，十有八九捆绑垃圾软件。</blockquote>

    <h2>三、鸿蒙 / EMUI 上安装 APK 的步骤</h2>
    <h3>方法 A：直接点击 APK 安装</h3>
    <ol>
      <li>用 <strong>文件管理</strong> 找到下载好的 APK 文件</li>
      <li>点击它，系统弹出"是否允许安装此应用"</li>
      <li>若提示"为保障安全，禁止安装"，点 <strong>设置</strong> 进入权限页</li>
      <li>打开 <strong>"允许安装未知来源应用"</strong> 的开关（针对的可能是文件管理或浏览器）</li>
      <li>返回，再次点击 APK → <strong>安装</strong></li>
    </ol>
    <h3>方法 B：遇到"禁止安装"时的处理</h3>
    <ul>
      <li>华为应用市场弹出的拦截提示 → 点"仍要安装"</li>
      <li>"安装来源未开启" → 按提示去对应 App 开启"允许安装其他应用"</li>
    </ul>
    <blockquote>关键点：<strong>开启未知来源的开关要在"发起安装的那个 App"上开</strong>（用文件管理装就在文件管理上开，用浏览器装就在浏览器上开）。</blockquote>

    <h2>四、装了打不开 / 解析失败怎么办？</h2>
    <h3>1. 解析包出现问题</h3>
    <ul>
      <li>大概率 APK 下载不完整，<strong>重新下载</strong></li>
      <li>或文件后缀被改了（<code>.apk.1</code>、<code>.bin</code>），改成 <code>.apk</code> 再试</li>
    </ul>
    <h3>2. 安装成功后打不开、闪退</h3>
    <ul>
      <li>该 APK 是给 <strong>谷歌服务（GMS）</strong> 的，但华为手机没自带 GMS → 需要装 GMS 或换渠道版</li>
      <li>下载的版本不匹配你的系统架构（请下 <strong>arm64</strong> 版本）</li>
    </ul>
    <h3>3. 提示"已存在同名应用"</h3>
    <p>新旧签名不一致，参考《APK 提示已存在同名应用》解决（备份 → 卸载 → 重装）。</p>

    <h2>五、重要：纯血鸿蒙（鸿蒙 NEXT）装不了 APK</h2>
    <p>如果你用的是 <strong>鸿蒙 NEXT / HarmonyOS 5 以后的纯血版本</strong>，它<strong>不再兼容安卓 APK</strong>。这种情况下：</p>
    <ul>
      <li>从 <strong>华为应用市场</strong> 装鸿蒙原生版</li>
      <li>用 <strong>元服务 / 快应用</strong> 顶上</li>
      <li>实在需要安卓应用，只能换支持 APK 的旧机型或用安卓手机</li>
    </ul>
    <blockquote>装之前先确认系统版本，别在纯血鸿蒙上折腾 APK。</blockquote>

    <h2>六、安全建议</h2>
    <ul>
      <li><strong>来源要干净</strong>：只在官网和知名镜像站下载</li>
      <li><strong>装前扫描</strong>：用自带的手机管家或 VirusTotal 扫一遍</li>
      <li><strong>看权限</strong>：安装时留意它申请的权限，越权申请的直接换掉</li>
    </ul>

    <h2>小结</h2>
    <p>华为装 APK 的重点在于——先确认系统是不是纯血鸿蒙；用文件管理打开 APK，按提示在"发起安装的 App"上开启未知来源；遇到解析失败就重新下载、遇到打不开就换版本或补 GMS。记住安全第一，别乱装来路不明的安装包。</p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "华为手机能直接安装APK吗？",
    answer: "可以，但要看系统版本。HarmonyOS和EMUI可以安装APK，只需在'发起安装的App'上开启允许安装未知来源应用。但纯血鸿蒙（鸿蒙NEXT）不再兼容安卓APK，只能装鸿蒙原生应用。",
  },
  {
    question: "华为手机安装APK提示'禁止安装'怎么解决？",
    answer: "点设置进入权限页，在发起安装的那个App（文件管理或浏览器）上开启'允许安装未知来源应用'，然后返回重新点击APK安装即可。",
  },
  {
    question: "华为手机能装谷歌服务(GMS)吗？",
    answer: "部分老款可以，但华为新机（尤其无GMS授权的机型）装谷歌服务比较麻烦，很多应用没有GMS会闪退。建议优先用官网或应用市场的版本，或装可信的渠道版。",
  },
  {
    question: "华为纯血鸿蒙能装安卓APK吗？",
    answer: "不能。鸿蒙NEXT不再兼容安卓APK，只能从华为应用市场安装鸿蒙原生应用，或用元服务替代。实在需要安卓应用需换支持APK的机型。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      装安卓应用时总听到"APK"这个词，但很多人不明白它到底是什么、和普通文件有什么区别、为什么一个 APK 就能安装一个 App。这篇用大白话讲清楚 APK 的来龙去脉，帮你装得更明白、更安全。
    </p>

    <h2>一、APK 是什么？</h2>
    <p><strong>APK（Android Application Package，安卓应用安装包）</strong>，本质是一个<strong>打包好的压缩文件</strong>（后缀是 <code>.apk</code>），里面装着运行一个安卓 App 所需的全部内容：</p>
    <ul>
      <li><strong>代码</strong>（DEX 文件，App 的核心程序逻辑）</li>
      <li><strong>资源</strong>（图片、布局、字符串、图标、音频等）</li>
      <li><strong>清单文件</strong>（<code>AndroidManifest.xml</code>，声明包名、权限、组件）</li>
      <li><strong>签名</strong>（防篡改、标识开发者，安装时系统会校验）</li>
    </ul>
    <blockquote>一句话：<strong>APK 就是安卓 App 的"安装介质"</strong>，类似 Windows 的 <code>.exe</code> 安装包、iPhone 的 <code>.ipa</code>。</blockquote>

    <h2>二、APK 是怎么来的？</h2>
    <p>开发者用电脑写好代码后，经过编译、打包、签名，生成一个 APK 文件：</p>
    <ol>
      <li>编写代码（Java / Kotlin 等）</li>
      <li>编译成可执行代码 + 打包资源</li>
      <li><strong>签名</strong>（用开发者的私钥，防篡改，标识身份）</li>
      <li>生成 <code>.apk</code> 文件交给用户安装</li>
    </ol>
    <p>你在哪里拿到 APK：</p>
    <ul>
      <li><strong>应用商店</strong>（谷歌 Play、华为应用市场等）——最正规</li>
      <li><strong>开发者官网</strong>直接下载</li>
      <li><strong>第三方镜像站</strong>（APKMirror、APKPure 等）</li>
    </ul>

    <h2>三、怎么"安装"一个 APK？</h2>
    <p>安卓系统安装 APK 的过程，其实就是：</p>
    <ol>
      <li><strong>校验签名</strong>，确认安装包没被篡改、来源可信</li>
      <li><strong>解析清单</strong>，看它要什么权限、有哪些组件</li>
      <li><strong>复制到系统目录</strong>，注册到系统</li>
      <li>桌面出现图标，App 就能用了</li>
    </ol>
    <p>所以你会看到安装前系统弹窗列出<strong>权限申请</strong>——那就是在"看清单"的环节让你确认。</p>

    <h2>四、为什么有些 APK 装不上？</h2>
    <ul>
      <li><strong>签名不匹配</strong>（"已存在同名应用"）→ 系统校验签名发现和已装的不一致</li>
      <li><strong>解析包错误</strong> → APK 下载损坏或不完整</li>
      <li><strong>系统版本过低</strong> → App 要求的安卓版本比你手机高</li>
      <li><strong>架构不匹配</strong> → 现在多数手机是 <strong>arm64</strong>，装了 x86 的包会失败</li>
    </ul>

    <h2>五、APK、XAPK、AAB 有什么区别？</h2>
    <ul>
      <li><strong>APK</strong>：单个安装包，直接装</li>
      <li><strong>XAPK / APKS</strong>：多个 APK 打包在一起（现代 App 常被拆成"基础包 + 语言包 + 架构包"），需要特殊工具或支持的商店安装</li>
      <li><strong>AAB</strong>：开发者提交给 Google Play 的格式，手机端安装时会自动生成对应 APK</li>
    </ul>
    <blockquote>如果下载到 XAPK，别直接改后缀硬装，用支持它的安装器（如 APKPure、SAI）或解压后按基础包安装。</blockquote>

    <h2>六、安全提醒：别乱装 APK</h2>
    <ul>
      <li><strong>只从可信来源装</strong>（官网、应用商店、知名镜像站）</li>
      <li><strong>装前看权限</strong>：一个手电筒 App 要你通讯录权限，果断不装</li>
      <li><strong>扫描后再装</strong>：用 VirusTotal 或手机杀毒软件扫一遍</li>
      <li><strong>警惕"破解版"</strong>：多数捆绑广告或恶意代码</li>
    </ul>

    <h2>七、APK 能反编译吗？</h2>
    <p>懂技术的朋友可能会问：APK 能看源码吗？APK 里的代码经过编译，但可以用工具（如 Apktool、jadx）<strong>反编译</strong>查看大致逻辑和资源——这也是为什么<strong>签名校验</strong>和<strong>来源可信</strong>非常重要，因为能被拆开篡改再打包。</p>

    <h2>小结</h2>
    <p>APK 是安卓 App 的安装包，本质是一个"代码 + 资源 + 签名"的压缩文件。理解了它的原理，你就明白为什么有的装不上、为什么要看权限、为什么要认准来源。装 APK 记住一条原则——<strong>来源干净、权限合理、装前扫描</strong>。</p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK文件到底是什么？",
    answer: "APK是安卓应用安装包，本质是一个包含代码、资源、清单文件和签名的压缩文件，相当于Windows的exe安装包，是用来安装安卓App的介质。",
  },
  {
    question: "APK、XAPK、AAB有什么区别？",
    answer: "APK是单个安装包直接安装；XAPK/APKS是多个APK打包在一起的格式，需要特殊安装器；AAB是开发者提交给Google Play的格式，安装时自动生成对应APK。",
  },
  {
    question: "为什么有些APK装了打不开或装不上？",
    answer: "常见原因：签名不匹配、下载损坏（解析包错误）、系统版本过低、架构不匹配（需arm64）。对症处理即可，比如重新下载或换对应架构版本。",
  },
  {
    question: "乱装APK有什么风险？",
    answer: "APK可能被二次打包植入广告、追踪器甚至恶意代码，尤其是破解版。建议只从官方或知名镜像站下载，装前看权限、用VirusTotal扫描。",
  },
];

export const zhPosts20260804: BlogPostEntry[] = [
  {
    slug: "huawei-install-apk-guide",
    title: "华为手机安装 APK 全攻略：鸿蒙/EMUI 常见问题一次解决",
    description: "华为手机怎么安装APK？针对HarmonyOS和EMUI系统详解安装步骤、未知来源设置、解析失败的解决方法，并提醒纯血鸿蒙不支持安卓APK。",
    date: "2026-08-04",
    readTime: "8 分钟阅读",
    tags: ["华为手机", "APK安装", "鸿蒙", "EMUI", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "what-is-apk-file-explained",
    title: "安卓 APK 文件到底是什么？一篇看懂安装包原理与应用安装",
    description: "APK是什么？本文用大白话讲清安卓APK安装包的原理、来源、安装过程，以及APK/XAPK/AAB的区别和安全安装的注意事项。",
    date: "2026-08-04",
    readTime: "8 分钟阅读",
    tags: ["APK", "安卓", "安装包", "APK教程", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260804List = toList(zhPosts20260804);
