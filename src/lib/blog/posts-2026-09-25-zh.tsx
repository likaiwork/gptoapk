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
      随便在网上搜「XX 应用 APK 下载」，能跳出几十个网站。
      <strong>下载来源越杂，中招概率越高</strong>
      ——被二次打包、塞广告、埋后门的 APK，外观和正版没区别，装上去才出问题。
    </p>
    <p>
      先给结论：
      <strong>APK 安全检测不是装一个杀毒软件就完事，而是一套「下载前查网站、下载后验文件、安装前看权限、安装后盯行为」的流程。</strong>{" "}
      本文给你一套不用 root、几步就能做完的自检方法。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>安全的重点不在「事后杀毒」，而在「事前筛源 + 事中验真」。</strong>{" "}
        大部分恶意 APK 只要认真核对签名和权限，就能提前拦下。
      </p>
    </blockquote>

    <h2>一、下载前：先看网站靠不靠谱</h2>
    <p>在点「下载」按钮之前，先花 10 秒判断这个站点。</p>
    <ol>
      <li>
        <strong>看域名是否正规</strong>：官方站通常是产品名 + .com，出现拼写错误、奇怪后缀（.xyz、.top、随机字母）要警惕。
      </li>
      <li>
        <strong>看有没有 HTTPS</strong>：地址栏有锁图标不代表安全，但连 HTTPS 都没有的站直接关掉。
      </li>
      <li>
        <strong>看下载按钮</strong>：如果页面布满「高速下载」「点击加速」以及大量弹窗广告，多半是靠推广下载量赚钱的聚合站，风险高。
      </li>
      <li>
        <strong>看有没有版本信息和更新日志</strong>：正规站会给出应用版本号、更新日期、包名，无法对应的往往是转发别人文件。
      </li>
      <li>
        <strong>优先选择：官方应用商店、开发者官网、知名开源仓库（如 GitHub Releases）。</strong>{" "}
        第三方站只作为「官方渠道下不到」时的备选。
      </li>
    </ol>

    <h2>二、下载后：核对文件「指纹」</h2>
    <p>文件下到手机或电脑后，别急着装，先做三件事。</p>

    <h3>1. 看文件大小和名称</h3>
    <ul>
      <li>
        正版应用体积和各渠道标注基本一致。<strong>一个几十 KB 的「微信」一定是假的。</strong>
      </li>
      <li>文件名异常（如 setup_final_v3_ok.apk、带乱码）通常来自打包工具。</li>
    </ul>

    <h3>2. 校验哈希值（最硬核的一步）</h3>
    <p>
      正规渠道会公布文件的 <strong>SHA-256 或 MD5</strong>。把它和你本地算出来的对比，一致才说明文件没被改过。
    </p>
    <ul>
      <li>
        <strong>Windows</strong>：certutil -hashfile 文件名.apk SHA256
      </li>
      <li>
        <strong>macOS / Linux</strong>：shasum -a 256 文件名.apk
      </li>
      <li>
        <strong>手机端</strong>：用「文件管理器 + 哈希校验」类工具，或支持校验和计算的 APP。
      </li>
    </ul>
    <p>哈希对不上 = 文件被篡改，直接删除。</p>

    <h3>3. 校验签名</h3>
    <p>安卓用签名来判断「这个包是不是原开发者发布的」。</p>
    <ul>
      <li>
        <strong>手机工具</strong>：用支持查看签名的应用，看 <strong>签名证书指纹</strong>。
      </li>
      <li>
        <strong>电脑工具</strong>：apksigner verify --print-certs 文件名.apk（需 Android SDK）。
      </li>
    </ul>
    <p>
      <strong>关键判断</strong>
      ：如果你之前装过正版，新旧两个包的签名指纹必须一致。签名不一致时安装会报「应用未安装」或「签名冲突」——这本身就说明来源可疑。
    </p>

    <h2>三、安装前：读一遍权限</h2>
    <p>权限是恶意行为最直接的暴露点。</p>
    <ol>
      <li>在安装界面或应用信息页，看它申请的权限。</li>
      <li>
        <strong>对照功能判断是否合理</strong>：
        <ul>
          <li>计算器要「通讯录」「短信」→ 不合理；</li>
          <li>手电筒要「定位」→ 不合理；</li>
          <li>一个单机小游戏要「读取所有文件 + 后台弹窗」→ 高度可疑。</li>
        </ul>
      </li>
      <li>
        特别警惕这几类高敏感权限：<strong>短信、通话记录、通讯录、无障碍服务、设备管理器、悬浮窗、后台弹出界面。</strong>
      </li>
      <li>
        <strong>装完还应去 设置 → 应用 → 权限管理 复查一遍</strong>，把不给就影响使用的无关权限关掉。
      </li>
    </ol>

    <h2>四、安装后：观察行为</h2>
    <p>装上去不代表安全到手，前 24 小时留意这些信号：</p>
    <ul>
      <li>没操作时手机异常发热、掉电快；</li>
      <li>频繁弹出广告或通知（尤其锁屏时）；</li>
      <li>后台偷偷联网、跑流量；</li>
      <li>出现你没装过的应用（可能是它下载的推广）；</li>
      <li>桌面图标消失或应用名变回默认英文（常见于流氓包）。</li>
    </ul>
    <p>
      出现以上情况，立刻：<strong>卸载 → 用安全工具全盘扫描 → 检查是否残留其他应用。</strong>
    </p>

    <h2>五、给普通用户的最省心流程</h2>
    <p>不想学工具命令？照这个顺序做就够：</p>
    <ol>
      <li>
        <strong>先试官方渠道</strong>：Google Play、厂商商店、开发者官网。
      </li>
      <li>
        <strong>官方下不到，再选有名气的第三方站</strong>，避开满屏广告的聚合下载页。
      </li>
      <li>
        <strong>下载后看包大小 + 权限</strong>，明显不对就换来源。
      </li>
      <li>
        <strong>安装时系统提示「此应用可能有害」要认真看</strong>，别一路点允许。
      </li>
      <li>
        <strong>装完用手机自带「安全检测 / 病毒扫描」扫一次</strong>（各家手机管家基本都有）。
      </li>
    </ol>

    <h2>六、几个常见误区</h2>
    <ul>
      <li>
        <strong>「文件小 = 没病毒」</strong>：错。几 KB 的下载器就能在后台拉取真正的恶意包。
      </li>
      <li>
        <strong>「没报毒 = 安全」</strong>：错。杀毒库对新样本有滞后，签名和权限核对更可靠。
      </li>
      <li>
        <strong>「root 后装什么都行」</strong>：错。root 后恶意应用能拿到更高权限，风险反而更大。
      </li>
      <li>
        <strong>「装了它给的杀毒软件就放心」</strong>：错。下载站捆绑的「安全卫士」本身可能就是推广软件。
      </li>
    </ul>

    <h2>结语</h2>
    <p>
      APK 安全检测的本质，是<strong>在每个环节都多问一句「这合理吗」</strong>
      ：网站靠谱吗？文件对得上吗？权限说得通吗？行为正常吗？
    </p>
    <p>
      把这四步做成习惯，你踩雷的概率会下降一大截。
      <strong>安全不是买来的，是每一步核对出来的。</strong>
    </p>
    <p>
      需要安全的 APK 下载与验签工具？可以试试{" "}
      <Link href="/">gptoapk.com</Link>，提供 Google Play 链接直下 APK 与文件校验能力。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "下载 APK 后杀毒软件没报毒，就说明安全吗？",
    answer:
      "不一定。杀毒依赖特征库，对刚出现的新样本有滞后。更可靠的判断是核对文件哈希（SHA-256）与签名指纹，并检查权限是否与功能匹配。三者都通过，风险才真正低。",
  },
  {
    question: "普通用户必须去做哈希校验和签名验证吗？",
    answer:
      "不强制，但强烈建议。如果嫌命令行麻烦，可以只做三件事：从可信来源下载、看文件大小是否合理、安装时读一遍权限。这三步就能拦下大部分有问题的包。",
  },
  {
    question: "怎么判断一个 APK 下载网站是否可信？",
    answer:
      "看域名是否正规、是否有 HTTPS、页面是否布满诱导下载广告、是否提供版本号和更新日志。优先官方商店、开发者官网和知名开源仓库；第三方聚合站只作备选。",
  },
  {
    question: "签名不一致为什么会安装失败？",
    answer:
      "安卓用签名标识应用来源。若设备上已有同包名应用但签名不同，系统会判定来源冲突，报「应用未安装」或签名冲突。这往往说明新包不是原开发者发布，来源存疑。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      「华为手机安装 APK 方法」是搜索量常年居高的问题。原因很简单：
      <strong>华为这一代手机同时存在纯血鸿蒙（HarmonyOS NEXT）和仍兼容安卓应用的老版本，两条路径完全不同。</strong>{" "}
      加上「纯净模式」拦截，很多人下载完就是装不上去。
    </p>
    <p>
      先给结论：
      <strong>能不能装，取决于你的系统版本，以及是否走对了「允许来源 + 关闭纯净模式拦截」这两步。</strong>{" "}
      本文按版本分类，给你一套对号入座的实操流程。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>装不上 90% 不是文件问题，而是权限和拦截设置没打开。</strong>{" "}
        先确认系统版本，再按对应步骤放行，基本都能解决。
      </p>
    </blockquote>

    <h2>一、先确认：你的华为是哪种系统</h2>
    <p>
      打开 <strong>设置 → 关于手机</strong>，看「系统版本」：
    </p>
    <ul>
      <li>
        <strong>HarmonyOS / EMUI（老版本）</strong>：仍基于安卓内核，
        <strong>可以直接安装 APK</strong>，流程和普通安卓一致。
      </li>
      <li>
        <strong>HarmonyOS NEXT（纯血鸿蒙，5.0 起）</strong>：
        <strong>不再支持安卓 APK</strong>，只能装 .hap 格式的鸿蒙原生应用。
      </li>
    </ul>
    <p>
      这一步最关键：
      <strong>如果是纯血鸿蒙，你下载的任何 APK 都装不了</strong>，不是方法问题，是系统不再兼容。下面分两种情况说。
    </p>

    <h2>二、情况 A：EMUI / HarmonyOS 老版本（可装 APK）</h2>

    <h3>第 1 步：允许「未知来源」</h3>
    <ol>
      <li>设置 → 安全 → 更多安全设置。</li>
      <li>
        找到 <strong>「安装外部来源应用」</strong>（部分版本叫「未知来源应用」）。
      </li>
      <li>
        在列表里找到你用来打开 APK 的应用（如文件管理、浏览器、QQ、微信），把它对应的开关打开。
      </li>
    </ol>
    <blockquote>
      <p>
        注意：华为是按「哪个应用去安装」来授权的。你从浏览器下载，就要给浏览器开权限；从文件管理打开，就给文件管理开。
      </p>
    </blockquote>

    <h3>第 2 步：处理「纯净模式」拦截</h3>
    <p>这是华为最常见的拦截来源。开启纯净模式时，系统只允许安装来自华为应用市场的应用。</p>
    <ul>
      <li>
        <strong>关闭纯净模式</strong>：设置 → 系统和更新 → 纯净模式 → 关闭。
      </li>
      <li>
        <strong>临时放行</strong>：安装时被拦截会弹提示，点「继续安装 / 允许本次安装」（部分版本需先点「了解风险」）。
      </li>
    </ul>
    <p>装完想恢复安全，可以再把纯净模式打开。</p>

    <h3>第 3 步：安装并放行风险提示</h3>
    <ol>
      <li>用文件管理找到 APK，点击安装。</li>
      <li>
        系统若提示 <strong>「该应用未经华为安全检测」</strong>，确认来源可信后点「继续安装」。
      </li>
      <li>若提示「应用存在风险」，核对来源后决定是否安装（不确定就放弃，换官方渠道）。</li>
    </ol>

    <h3>第 4 步：安装失败时的排查</h3>
    <table>
      <thead>
        <tr>
          <th>提示</th>
          <th>原因</th>
          <th>处理</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>应用未安装 / 解析包错误</td>
          <td>文件损坏或版本不兼容</td>
          <td>重新下载，核对系统版本</td>
        </tr>
        <tr>
          <td>签名冲突</td>
          <td>已装同名应用签名不同</td>
          <td>卸载旧版再装</td>
        </tr>
        <tr>
          <td>已存在更高版本</td>
          <td>版本号更低</td>
          <td>先卸载或装更高版本</td>
        </tr>
        <tr>
          <td>被纯净模式拦截</td>
          <td>未关闭纯净模式</td>
          <td>按上面第 2 步放行</td>
        </tr>
      </tbody>
    </table>

    <h2>三、情况 B：HarmonyOS NEXT（纯血鸿蒙）</h2>
    <p>
      <strong>关键事实：纯血鸿蒙不再支持安装安卓 APK。</strong>{" "}
      任何让你「下载 APK 就能装」的教程，在 NEXT 上都是无效的。
    </p>
    <p>你能做的：</p>
    <ol>
      <li>用华为应用市场下载鸿蒙原生版应用（.hap）。</li>
      <li>
        需要某个 App 时，<strong>先搜它有没有鸿蒙原生版本</strong>——2024 年后主流应用基本都已适配。
      </li>
      <li>
        没有原生版的应用，<strong>在鸿蒙上确实用不了</strong>
        ，不要轻信所谓「鸿蒙装安卓 APK 工具」，多半是骗安装量或植入推广。
      </li>
    </ol>
    <blockquote>
      <p>
        如果你非常依赖某个只有安卓版的应用，务实的做法是：保留一台安卓备用机，或使用网页版 / 云端方案。
      </p>
    </blockquote>

    <h2>四、通用安全建议</h2>
    <p>不管哪种系统，装外部应用时都该注意：</p>
    <ol>
      <li>
        <strong>只从可信来源下载</strong>：官方站、应用商店、开发者官网优先。
      </li>
      <li>
        <strong>看权限是否合理</strong>：计算器要短信权限、小游戏要通讯录，直接放弃。
      </li>
      <li>
        <strong>核对签名和文件大小</strong>：异常小或异常的包要警惕。
      </li>
      <li>
        <strong>装完用手机管家扫一遍</strong>：华为自带「手机管家 → 病毒查杀」，装完扫一次。
      </li>
      <li>
        <strong>不定期清理残留安装包</strong>：文件管理里搜 .apk，删掉装完的旧包，省空间也更安全。
      </li>
    </ol>

    <h2>五、常见问题快答</h2>
    <p>
      <strong>Q：关了纯净模式安全吗？</strong>
      <br />A：关了之后系统不再自动拦截，你自己就要承担来源判断的责任。所以关之前请确认来源可信，装完可再打开。
    </p>
    <p>
      <strong>Q：华为平板、荣耀手机一样吗？</strong>
      <br />
      A：荣耀已独立于华为，用 MagicOS，路径类似但菜单名可能不同；平板逻辑和手机一致。纯血鸿蒙的限制同样适用于华为平板。
    </p>
    <p>
      <strong>Q：为什么以前能装，现在不能了？</strong>
      <br />A：系统升级到 HarmonyOS NEXT 后，安卓运行层被移除，这是系统层面的变化，无法通过设置绕过。
    </p>

    <h2>结语</h2>
    <p>
      华为装 APK 的核心就一句话：<strong>先看系统，再放权限。</strong>
    </p>
    <ul>
      <li>
        老版本（EMUI / HarmonyOS）：<strong>开未知来源 + 关纯净模式，就能装。</strong>
      </li>
      <li>
        纯血鸿蒙 NEXT：<strong>安卓 APK 装不了，只用原生 .hap。</strong>
      </li>
    </ul>
    <p>
      对号入座，别在错误的系统上白费功夫，也别为了「强行安装」去用来源不明的工具——安全和可用之间，安全永远优先。
    </p>
    <p>
      需要下载 APK 或校验文件？可以试试 <Link href="/">gptoapk.com</Link>，支持 Google Play 链接直下与安全校验。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "华为 HarmonyOS NEXT 还能安装安卓 APK 吗？",
    answer:
      "不能。纯血鸿蒙（HarmonyOS NEXT，5.0 起）移除了安卓运行层，只支持 .hap 格式的鸿蒙原生应用。任何 APK 都无法安装，这不是设置问题，无法通过关闭纯净模式等操作绕过。",
  },
  {
    question: "华为手机安装 APK 提示被拦截怎么办？",
    answer:
      "多数是「纯净模式」在拦截。到 设置 → 系统和更新 → 纯净模式 关闭它，或在安装提示时点「继续安装 / 允许本次安装」。同时确认已为打开 APK 的应用（文件管理、浏览器等）开启「安装外部来源应用」权限。",
  },
  {
    question: "开了未知来源权限还是装不上是什么原因？",
    answer:
      "常见原因：文件损坏或解析错误（重新下载）、签名冲突（先卸载旧版）、版本低于已装版本（装更高版本）、或系统为纯血鸿蒙（不支持 APK）。逐一排查即可。",
  },
  {
    question: "关闭纯净模式会带来安全风险吗？",
    answer:
      "会降低系统自动防护。关闭后系统不再拦截非官方市场来源的安装，需要你自己判断来源是否可信。建议只在安装可信应用时临时关闭，装完后再重新开启纯净模式。",
  },
];

export const zhPosts20260925: BlogPostEntry[] = [
  {
    slug: "apk-safe-download-security-check-guide",
    title: "APK 下载安全检测方法：从网站到安装的最后一道防线（2026）",
    description:
      "从乱七八糟的下载站下的 APK，外观和正版没区别，装上去才出问题。本文给出不用 root 的四阶段自检流程：下载前查网站、下载后验哈希与签名、安装前读权限、安装后盯行为，帮你提前拦下被二次打包的恶意包。",
    date: "2026-09-25",
    readTime: "8 min read",
    tags: ["android", "APK 安全", "签名校验", "权限检查", "教程"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "huawei-install-apk-harmonyos-android-guide",
    title: "华为手机安装 APK 方法：鸿蒙与安卓双版本全流程（2026）",
    description:
      "华为手机同时存在纯血鸿蒙 HarmonyOS NEXT 和兼容安卓的老版本，两条路径完全不同。本文按系统版本分类，讲清「允许未知来源 + 关闭纯净模式拦截」的完整操作、安装失败排查表，以及纯血鸿蒙为何装不了 APK 的真相。",
    date: "2026-09-25",
    readTime: "8 min read",
    tags: ["华为", "鸿蒙", "APK 安装", "纯净模式", "教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260925List = toList(zhPosts20260925);
