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
      在华为 / 荣耀手机上装 APK（安卓安装包），跟小米、OPPO 不太一样：华为多了<strong>"纯净模式"</strong>这道安全拦截，
      鸿蒙系统对"未知来源"的授权入口也藏得比较深。很多人在这一步卡住——不是文件下载有问题，而是<strong>权限根本没配好</strong>。
      本文把从下载到安装的完整实操流程走一遍，告诉你每个开关在哪、为什么要开、装完要不要关。
    </p>

    <blockquote>
      <p>
        <strong>先给你结论：</strong>华为装 APK 的完整链路 = <strong>关闭纯净模式 → 授权"外部来源应用" → 下载 → 安装 →
        （可选）装完把纯净模式关回</strong>。下面每一步都给你讲清入口和注意事项。
      </p>
    </blockquote>

    <h2>一、先分清你的系统：EMUI / HarmonyOS / 鸿蒙NEXT</h2>
    <p>华为手机系统分几代，设置入口略有不同，先对号入座：</p>
    <ul>
      <li><strong>EMUI</strong>（较早机型，安卓底子）：设置入口最传统，"纯净模式"可能在"安全"里。</li>
      <li><strong>HarmonyOS 2 / 3 / 4</strong>（多数在役机型，仍兼容安卓 APK）：主线机型，绝大多数 APK 都能正常装。</li>
      <li><strong>HarmonyOS NEXT（纯血鸿蒙，原生鸿蒙）</strong>：<strong>不再兼容安卓 APK</strong>，普通 APK 直接装不了，只能装鸿蒙原生应用。如果你用的是 NEXT，下面的步骤基本用不上，先确认这点。</li>
    </ul>
    <blockquote>
      <p>自查方法：设置 → 关于手机 → 看"HarmonyOS 版本"。如果版本号里有"NEXT"字样，就是纯血鸿蒙；没有则是兼容安卓的版本。</p>
    </blockquote>

    <h2>二、关闭"纯净模式"（华为独有拦截）</h2>
    <p>纯净模式是华为默认开启的安全功能，会拦截"非应用市场来源"的安装。装第三方 APK 前必须把它关掉。</p>
    <p><strong>入口（HarmonyOS）：</strong></p>
    <ol>
      <li>设置 → <strong>系统和更新</strong> → <strong>纯净模式</strong></li>
      <li>点击"退出"，系统会让你<strong>选择退出时长</strong>（常见选项如："始终允许"/"仅本次"等）</li>
      <li>确认并输入验证（部分机型要再次确认）</li>
    </ol>
    <p><strong>入口（EMUI 老版本）：</strong> 设置 → 安全 → 纯净模式/更多安全设置。</p>
    <blockquote>
      <p>装完 APK 后，建议回到这里把纯净模式<strong>重新开启</strong>，日常防误装更安心。它不是"关了就永远关"，随时能开回来。</p>
    </blockquote>

    <h2>三、授权"安装外部来源应用"</h2>
    <p>
      关掉纯净模式后，还要给"能打开 APK 的那个应用"授权。<strong>注意：授权是跟着应用走的</strong>——你是用"文件管理"
      打开 APK，就要给"文件管理"授权；用浏览器下载后打开，可能要给浏览器授权。
    </p>
    <p><strong>入口（HarmonyOS）：</strong></p>
    <ol>
      <li>设置 → <strong>应用</strong> → <strong>应用管理</strong></li>
      <li>找到"<strong>文件管理</strong>"（或你用来打开 APK 的应用）</li>
      <li>进入 → <strong>权限</strong> → 打开"<strong>安装外部来源应用</strong>"（或"允许安装未知应用"）</li>
      <li>弹窗确认即可</li>
    </ol>
    <blockquote>
      <p>不同版本菜单名称可能叫"允许安装其他应用"或"外部来源应用"，本质同一个开关。找不到就往"应用 → 应用管理 → 右上角更多"里翻。</p>
    </blockquote>

    <h2>四、下载 APK（来源必须可靠）</h2>
    <p>
      权限配好后，下载就顺利了。但<strong>来源比权限更重要</strong>——从乱站点下载的 APK，即使装上了也可能是改过的。推荐顺序：
    </p>
    <ol>
      <li><strong>官方渠道</strong>（验证过的开发者官网 / 官方 GitHub Release）</li>
      <li><strong>审核过的镜像站</strong>：APKMirror、APKPure，以及会做签名校验的站点</li>
      <li>避免：群文件、弹窗"一键下载"、破解/去广告版——这类是恶意 APK 重灾区</li>
    </ol>
    <p>下载时留意两点：</p>
    <ul>
      <li><strong>文件名/版本</strong>是否和真实应用一致，警惕淘宝、Whatsaap 这类拼写克隆。</li>
      <li><strong>文件大小别太离谱</strong>，正常 App 至少几 MB，几 KB 的"APK"基本是坏文件或木马壳。</li>
    </ul>

    <h2>五、安装（包含"安装失败"的常见临时原因）</h2>
    <p>用文件管理找到 .apk 文件 → 点击 → 按提示"仍要安装"。如果这步还是失败，多半是这几类原因：</p>
    <ul>
      <li><strong>签名冲突</strong>：之前装过同包名的旧版/破解版 → 先卸载旧版再装（会清数据，先备份）。</li>
      <li><strong>版本比系统新</strong>：App 要求更高系统版本 → 找旧版本装。</li>
      <li><strong>存储不足</strong>：清理空间。</li>
      <li><strong>"应用未安装/解析包出现问题"</strong>：文件下载损坏 → 删掉换可靠来源重下。</li>
    </ul>
    <blockquote>
      <p>按"重启 → 清存储 → 卸载重装 → 换来源重下"的顺序排查，九成都能解决。</p>
    </blockquote>

    <h2>六、装完收尾：把防护开回来</h2>
    <p>装好、确认能用之后：</p>
    <ol>
      <li>回到<strong>设置 → 系统和更新 → 纯净模式</strong> → 重新开启。</li>
      <li>不常用的"外部来源授权"可以留着，但纯净模式建议开回。</li>
    </ol>
    <p>这样既完成了你的需求，又不至于长期把安全门槛放到底。</p>

    <p>
      <strong>总结：</strong>华为装 APK 没你想的难，核心就三步——<strong>关纯净模式 → 授权外部来源 → 可靠来源下载安装</strong>。
      前提是先确认你的不是鸿蒙NEXT（那种装不了安卓APK）。装完记得把纯净模式开回来，安全整洁两不误。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      "APK"这个词，每个用安卓手机的人几乎都听过，但真要问"它到底是什么、从哪来、装上去又发生了什么"，很多人其实说不清楚。
      这篇文章不讲高深技术，用最直白的方式，把 APK 的来龙去脉、常见误区、和那些"不清不楚但很重要"的安全常识一次讲明白。
    </p>

    <blockquote>
      <p>
        <strong>一句话版本：</strong>APK 就是安卓应用的"安装包"，相当于电脑上的 .exe 安装程序。你从应用商店或网站下载安装
        App，本质就是下载并安装这个包。
      </p>
    </blockquote>

    <h2>一、APK 到底是什么？</h2>
    <p>
      APK 的全称是 <strong>Android Application Package（安卓应用程序包）</strong>。它本质上是一个<strong>压缩文件</strong>
      （类似 .zip），里面打包了一个 App 所需的所有东西：
    </p>
    <ul>
      <li><strong>代码</strong>（App 实际运行的逻辑）</li>
      <li><strong>资源</strong>（图片、图标、界面布局）</li>
      <li><strong>配置文件</strong>（清单文件，声明这个 App 需要哪些权限、支持哪些手机）</li>
      <li><strong>签名</strong>（开发者的身份凭证，保证文件没被篡改）</li>
    </ul>
    <p>
      所以"下载一个 APK"就是"下载一个完整 App 的安装包"，而"安装"就是系统把这个包解压、校验、放到它该待的位置。
    </p>

    <h2>二、应用商店和"装 APK"有什么区别？</h2>
    <p>你用 Google Play、华为应用市场下载 App，和手动装 APK，<strong>底层是同一件事</strong>——都是安装 APK。区别在于：</p>
    <ul>
      <li><strong>应用商店</strong>：帮你自动完成"下载 + 安装 + 更新 + 安全检查"。商店上架前会审核，来源相对可信。</li>
      <li><strong>手动装 APK</strong>：你自己下载文件、自己点安装，系统会提示"未知来源"风险。因为来源不受商店审核，所以<strong>安全性要靠你自己把关</strong>。</li>
    </ul>
    <blockquote>
      <p>简单记：商店 = 把把关 + 帮你装；手动 APK = 自己把关 + 自己装。</p>
    </blockquote>

    <h2>三、5 个最常见的 APK 误区</h2>
    <h3>误区 1：APK 都是病毒</h3>
    <p>
      <strong>错。</strong> APK 只是文件格式，本身不分好坏，好坏在于<strong>来源和内容</strong>。官方发布的 APK 和商店版一模一样、安全可靠；
      只有从不可信站点下载的"破解版/修改版"才更可能夹带风险。
    </p>
    <h3>误区 2：手机"不允许安装未知来源"就是坏了</h3>
    <p><strong>不是。</strong> 这是安卓默认的安全保护。你可以在设置里针对某个应用（如文件管理、浏览器）开启"允许安装外部来源应用"，这是正常操作。</p>
    <h3>误区 3：APK 只能在电脑上装</h3>
    <p><strong>不是。</strong> 绝大多数 APK 直接在手机上就能装，电脑装只是另一种方式（通过数据线/网盘传到手机再装）。</p>
    <h3>误区 4：下载就能装，不用管别的</h3>
    <p><strong>错。</strong> 还要看签名是否冲突、系统版本是否兼容、存储是否足够。装不上往往不是文件坏了，而是这些没对上。</p>
    <h3>误区 5：APK 来源随便哪个站都行</h3>
    <p><strong>错。</strong> 这是最重要的一条。来源决定 80% 的安全性，详见下文安全常识。</p>

    <h2>四、装 APK 前要懂的 3 个安全常识</h2>
    <h3>1. 来源可信度排序</h3>
    <ul>
      <li>✅ <strong>最可信</strong>：开发者官网、官方 GitHub Release、你手机的应用商店。</li>
      <li>✅ <strong>较可信</strong>：做审核和签名校验的镜像站（APKMirror、APKPure 等）。</li>
      <li>⚠️ <strong>高风险</strong>：陌生网站、群文件、弹窗"一键下载"、破解/去广告版。</li>
    </ul>
    <h3>2. 看权限</h3>
    <p>安装时系统会列出权限。一个手电筒，却要读你的联系人、短信、定位——<strong>直接放弃</strong>，这几乎就是恶意软件。</p>
    <h3>3. 警惕"太好的事"</h3>
    <p>"免费破解VIP""去广告版""无限金币版"——越是这种诱惑，越可能是木马和广告软件的温床。真想用，去找官方版或用正规订阅。</p>

    <h2>五、装 APK 的正常流程（几分钟的事）</h2>
    <ol>
      <li><strong>选对来源</strong>下载 APK 文件。</li>
      <li>用文件管理打开 .apk。</li>
      <li>首次会提示开启"允许外部来源应用"，按引导打开。</li>
      <li>点"仍要安装"，等待完成。</li>
      <li>打开使用；确认没问题，可以把"外部来源"权限收回去更稳妥。</li>
    </ol>

    <h2>六、装不上怎么办？（快速排查）</h2>
    <ul>
      <li><strong>"应用未安装"</strong>：签名冲突 / 版本过新 / 存储不足 → 先卸载旧版、清空间、换可靠来源重下。</li>
      <li><strong>"解析包出现问题"</strong>：文件下载损坏 → 删掉，换来源重下。</li>
      <li><strong>点安装没反应</strong>：纯净模式/未知来源没开 → 按上文开启相应权限。</li>
      <li><strong>装完秒闪退</strong>：架构或系统版本不兼容 → 找匹配 arm64 和系统版本的版本。</li>
    </ul>

    <p>
      <strong>总结：</strong>APK 就是安卓应用的安装包，本质是个压缩文件，好坏看<strong>来源</strong>。记住三条就行：<strong>优先官方或审核站、
      安装前看权限、警惕"免费破解"陷阱</strong>。掌握了这几点，装 APK 就能既方便又安心。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "华为手机为什么装 APK 前要先关“纯净模式”？",
    answer: "纯净模式是华为默认开启的安全功能，会拦截所有非应用市场来源的安装。不关它，即使文件下好了、点安装也没反应或直接被拒。进 设置 → 系统和更新 → 纯净模式 退出即可，装完再开回来更安全。",
  },
  {
    question: "HarmonyOS NEXT 能装安卓 APK 吗？",
    answer: "不能。纯血鸿蒙（HarmonyOS NEXT，版本号带 NEXT 字样）不再兼容安卓 APK，只能装鸿蒙原生应用。如果你的手机是 NEXT，普通 APK 的安装方法和本指南里的权限设置都不适用，需要找鸿蒙原生版本。",
  },
  {
    question: "给华为手机装 APK 需要开哪些权限？",
    answer: "主要两个：一是关闭纯净模式（设置 → 系统和更新 → 纯净模式）；二是给用来打开 APK 的应用（通常是“文件管理”）开启“安装外部来源应用”（设置 → 应用 → 应用管理 → 文件管理 → 权限）。授权是跟着应用走的，用哪个应用打开 APK 就给哪个应用开。",
  },
  {
    question: "华为手机装 APK 提示“解析包出现问题”怎么办？",
    answer: "通常是文件下载损坏或来源有问题。删掉这个 APK，换一个可靠来源（官方站点、APKMirror、APKPure 等）重新下载，确认文件大小正常后再安装。也要留意下载的是 arm64 架构版本，与华为手机匹配。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 和电脑上的 .exe 安装程序一样吗？",
    answer: "概念上一样：都是安装包。但技术上 APK 本质是一个压缩文件（类 .zip），打包了代码、资源、配置和签名。安卓系统下载应用商店或网站的 App，底层其实都是在安装 APK，区别只在于来源是否经过商店审核。",
  },
  {
    question: "装 APK 会不会有病毒？",
    answer: "APK 文件格式本身没有好坏，好坏在来源和内容。官方发布或审核过的镜像站（APKMirror、APKPure）下载的 APK 安全可靠；风险主要来自陌生网站、群文件、破解/去广告版。装之前看下权限，一个正常 App 要无关权限就该警惕。",
  },
  {
    question: "为什么手机提示'不允许安装未知来源'？",
    answer: "这是安卓默认的安全保护，不是故障。你需要在设置里针对某个应用（比如文件管理、浏览器）开启'允许安装外部来源应用'。它只是对你的一个提醒机制，按需开启即可，装完再关掉更稳妥。",
  },
  {
    question: "APK 装不上一般是什么原因？",
    answer: "常见四种：签名冲突（之前装过同包名旧版/破解版）、系统版本过低（App 要求更高版本）、存储不足、文件下载损坏。按 先卸载旧版 → 清理存储 → 换可靠来源重下 的顺序排查，九成都能解决。",
  },
];

export const zhPosts20260820: BlogPostEntry[] = [
  {
    slug: "huawei-phone-install-apk-full-walkthrough-pure-mode",
    title: "华为手机装APK全流程实操：纯净模式、权限授权一次配好（含鸿蒙NEXT说明）",
    description: "华为/荣耀手机装APK总是卡在纯净模式和权限上？本文从下载到安装完整走一遍：怎么关纯净模式、怎么给外部来源应用授权、装完要不要关回，并说清鸿蒙NEXT为何装不了安卓APK。",
    date: "2026-08-20",
    readTime: "8 min read",
    tags: ["APK", "华为", "纯净模式", "鸿蒙", "安装教程"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "what-is-android-apk-file-guide-beginners",
    title: "安卓APK是什么？一文讲清安装原理、常见误区与安全常识",
    description: "APK到底是个什么文件？跟应用商店有什么区别？怎么装才安全？一文用大白话讲清APK的安装原理、5个常见误区、3条安全常识，以及装不上时的快速排查表。",
    date: "2026-08-20",
    readTime: "6 min read",
    tags: ["APK", "安卓", "APK是什么", "安装教程", "Android"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260820List = toList(zhPosts20260820);
