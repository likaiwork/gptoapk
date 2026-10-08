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
      打开 Google Play 想装一个 App，结果弹出刺眼的一行字：「你的设备与此版本不兼容」。没有安装按钮，没有解释，只有一个灰色提示。
      明明手机还在用，系统也不算太旧，为什么就是装不了？
    </p>
    <p>
      先给结论：
      <strong>大多数「设备不兼容」并不是硬件真的不行，而是几个可修复的条件被卡住了。</strong>
      这篇文章带你把原因一层层剥开，五步之内基本能定位并解决。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>Google Play 的兼容性判断，取决于系统版本、设备架构、屏幕/地区、以及 Google 服务框架本身的状态。任意一项不满足，Play 就会直接隐藏安装按钮——但其中大部分是你自己能改的。</strong>
      </p>
    </blockquote>

    <h2>一、先搞清楚：Play 为什么判定「不兼容」</h2>
    <p>在动手之前，先理解 Play 的判定逻辑，才能对症下药。它主要看四项：</p>
    <ol>
      <li>
        <strong>系统版本（minSdkVersion）</strong>：App 要求的最低 Android 版本。你的系统低于它 → 不兼容。
      </li>
      <li>
        <strong>CPU 架构（ABI）</strong>：App 只提供了 <code>arm64-v8a</code>，而你的老设备是{" "}
        <code>armeabi-v7a</code>（32 位）→ 不兼容。
      </li>
      <li>
        <strong>设备特性与地区</strong>：某些 App 限定特定机型、特定国家/地区，或要求屏幕分辨率、RAM、GPS 等硬件能力。
      </li>
      <li>
        <strong>Google Play 服务本身</strong>：Play 商店、Google 服务框架（GMS）版本过旧或缺失，会误报不兼容。
      </li>
    </ol>
    <p>
      <strong>关键点：这四项里，只有第 1、2 项是硬件/系统硬门槛，第 3、4 项经常是可修复的「软件问题」。</strong>
    </p>

    <h2>二、方法一：确认到底是哪一项不满足</h2>
    <p>先别瞎试，用数据说话。有两条路：</p>
    <p>
      <strong>看 App 的官方商店页面（电脑浏览器）：</strong>在 <code>play.google.com</code> 打开该 App，页面底部会列出「要求的
      Android 版本」和「兼容设备」。如果连网页版都没有安装按钮，说明你的账号绑定的设备被判定为不兼容。
    </p>
    <p>
      <strong>直接查你自己的设备信息：</strong>
    </p>
    <pre>
      <code>{`设置 → 关于手机 → Android 版本   （看系统版本，如 9 / 11 / 14）
设置 → 关于手机 → 全部参数        （看 CPU，或查 "ABI"）`}</code>
    </pre>
    <p>
      记住这两个数字，去和 App 商店页面公布的最低要求对比。<strong>差在版本就是版本问题，差在架构就是 ABI 问题。</strong>
    </p>

    <h2>三、方法二：系统版本过低 → 三条出路</h2>
    <p>如果 App 要求 Android 10+，而你还在 Android 8：</p>
    <ul>
      <li>
        <strong>能升级就升级</strong>：设置 → 系统 → 系统更新，厂商推送的正式更新最稳妥。
      </li>
      <li>
        <strong>刷第三方 ROM</strong>：老机型可刷 LineageOS 等，把系统抬到新版本（有一定风险，需解锁 Bootloader）。
      </li>
      <li>
        <strong>用第三方 APK 站点找旧版</strong>：很多 App 保留了对老系统友好的历史版本，从可信站点下载对应版本的 APK 手动安装。
      </li>
    </ul>
    <p>
      注意：手动安装旧版本 APK 时，要确认它对你的系统版本仍然兼容，并注意安全——优先选签名与官方一致的包。
    </p>

    <h2>四、方法三：CPU 架构不匹配 → 找对应版本</h2>
    <p>
      这是最容易被忽略的一项。很多新 App 已经<strong>只发布 64 位（arm64-v8a）</strong>版本，而 2015 年前后的老设备多是 32 位。
    </p>
    <ol>
      <li>用工具查自己设备的 ABI（如 AIDA64、CPU-Z）。</li>
      <li>
        到 APK 站点下载时，选择带 <code>arm64-v8a</code> 或 <code>armeabi-v7a</code> / <code>universal</code>
        （通用版）的包。
      </li>
      <li>
        <strong>「universal」通用包</strong>包含所有架构，兼容性最好，代价是体积更大。
      </li>
    </ol>
    <pre>
      <code>{`arm64-v8a   → 现代 64 位设备（2017 年后主流）
armeabi-v7a → 老的 32 位设备
x86 / x86_64→ 模拟器、部分平板
universal   → 全架构，万能但不精简`}</code>
    </pre>

    <h2>五、方法四：Google Play 服务出问题 → 重置框架</h2>
    <p>
      如果设备和 App 都匹配，但 Play 依然报不兼容，往往是 <strong>Google 服务框架（GMS）或 Play 商店缓存损坏</strong>。按顺序试：
    </p>
    <ol>
      <li>
        <strong>清缓存</strong>：设置 → 应用 → Google Play 商店 → 存储 → 清除缓存。
      </li>
      <li>
        <strong>清数据</strong>：同上，但选「清除数据」（不会删已装 App，只是重置商店）。
      </li>
      <li>
        <strong>更新 GMS</strong>：设置 → 应用 → Google Play 服务 → 检查更新。
      </li>
      <li>
        <strong>卸载 Play 商店更新</strong>：右上角菜单 → 卸载更新，再重新打开让它自动更新。
      </li>
    </ol>
    <p>
      如果是国行手机或此前的国产 ROM，可能根本没有完整的 GMS 框架，这时需要正确安装 Google 服务框架（GMS），而非在 Play 里反复重试。
    </p>

    <h2>六、方法五：绕开 Play，直接安装 APK</h2>
    <p>
      如果上面都对，但 App 在你的地区/机型就是被 Play 判定不兼容，而你又确认硬件能跑，
      <strong>最直接的办法是手动安装 APK</strong>：
    </p>
    <ol>
      <li>从可信来源获取该 App 的 APK（官方渠道优先，其次 APKMirror/APKPure）。</li>
      <li>确保包架构、最低系统版本匹配你的设备。</li>
      <li>设置里允许「安装未知来源应用」。</li>
      <li>点击安装，完成。</li>
    </ol>
    <p>
      安全提醒：只从可信站点下载，装前核对签名指纹，避免装到重打包的恶意版本。
    </p>

    <h2>七、快速排查清单</h2>
    <ol>
      <li>系统版本 ≥ App 要求的最低版本？（方法二）</li>
      <li>CPU 架构匹配，或用了 universal 包？（方法三）</li>
      <li>Play 商店/GMS 缓存清过、更新过？（方法四）</li>
      <li>地区/机型限制是否可绕开？（方法五）</li>
      <li>都试过仍不行 → 手动装匹配的 APK。</li>
    </ol>
    <p>
      「你的设备与此版本不兼容」看起来像死刑判决，其实大多数情况是<strong>版本、架构、或 Google 服务状态</strong>
      三者之一在作怪，而这些几乎都能自己修复。先查清不满足的是哪一项，再对症处理，比盲目换设备高效得多。
    </p>
    <p>
      确认设备能跑、又不想被 Play 限制时，可以试试 <Link href="/">gptoapk.com</Link>{" "}
      从 Google Play 提取原始 APK 手动安装，往往是最省心的终局方案。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Google Play 提示「设备与此版本不兼容」是什么原因？",
    answer:
      "常见原因有四种：一是系统版本低于应用要求的最低 Android 版本（minSdkVersion）；二是 CPU 架构不匹配（比如应用只提供 arm64-v8a 而设备是 32 位）；三是设备特性或地区限制；四是 Google 服务框架（GMS）或 Play 商店缓存损坏。前两项是硬门槛，后两项通常可修复。",
  },
  {
    question: "设备不兼容但硬件其实能跑，怎么强制安装？",
    answer:
      "可以绕开 Play 手动安装 APK：从可信来源（官方或 APKMirror/APKPure）获取架构与系统版本匹配的 APK，在设置中允许安装未知来源应用后手动安装。安装前建议核对 SHA-256 哈希和签名指纹，避免装到重打包的恶意版本。",
  },
  {
    question: "怎么查我手机的 CPU 架构？",
    answer:
      "安装 CPU-Z 或 AIDA64 等工具即可查看 CPU 架构（ABI）。2017 年后的主流设备多为 arm64-v8a（64 位），更老的设备可能是 armeabi-v7a（32 位）。下载 APK 时应选择与设备 ABI 匹配的版本，或直接选择 universal 通用包。",
  },
  {
    question: "Play 商店缓存损坏会导致不兼容吗？",
    answer:
      "会。如果设备和应用都匹配却仍报不兼容，可能是 Google 服务框架或 Play 商店缓存出错。可按顺序尝试：清除 Play 商店缓存、清除数据、更新 Google Play 服务、卸载并重新更新 Play 商店。国行缺失 GMS 的设备需要正确安装谷歌服务框架。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      很多国内手机、部分定制 ROM，或者刚从海外版刷回的系统，打开一看：没有 Google Play，没有谷歌服务，装个需要谷歌账号的 App
      直接闪退。原因很简单——缺少 <strong>GMS（Google Mobile Services，谷歌移动服务框架）</strong>。
    </p>
    <p>
      网上教程五花八门，有的让你装一堆来路不明的安装包，有的步骤早就过时。这篇给你一套
      <strong>清晰、按顺序、可自检</strong>的 GMS 安装方法，帮你在安卓设备上把谷歌框架装好、装对。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>安装 GMS 的关键不是「装哪个包」，而是「顺序和配套」。谷歌服务框架、Play 服务、Play 商店、账号管理器必须成套且版本匹配，缺一个或装反顺序都会失败。</strong>
      </p>
    </blockquote>

    <h2>一、先确认：你到底缺什么</h2>
    <p>在动手前，先看设备当前状态，避免重复劳动或装错东西。</p>
    <ol>
      <li>
        <strong>有没 Google Play 商店图标？</strong>有 → 可能只是访问受限，不一定缺框架。
      </li>
      <li>
        <strong>设置 → 应用 里能否搜到「Google Play 服务」？</strong>能搜到但打不开 → 服务在但版本旧。
      </li>
      <li>
        <strong>打开需要谷歌账号的 App 是否闪退？</strong>闪退且提示找不到 Google Play 服务 → 确认缺 GMS。
      </li>
    </ol>
    <p>
      <strong>三种典型情况：</strong>完全没有 GMS（纯净系统/国行深度定制）→ 需要完整安装套件；有 GMS
      但版本过旧 → 只需更新；有 GMS 但被系统限制 → 需要保活配置。
    </p>

    <h2>二、安装前准备</h2>
    <ul>
      <li>
        <strong>确认系统版本</strong>：设置 → 关于手机 → 看 Android 版本，决定用哪个 GMS 版本。
      </li>
      <li>
        <strong>确认 CPU 架构</strong>：arm64-v8a / armeabi-v7a，用 CPU-Z 或 AIDA64 查。
      </li>
      <li>
        <strong>开启未知来源安装</strong>：设置 → 安全 → 允许安装未知应用。
      </li>
      <li>
        <strong>准备一个能用的网络环境</strong>：谷歌服务激活需要连接到 Google 服务器，否则会卡在登录。
      </li>
    </ul>
    <p>
      提醒：优先使用<strong>与你机型和系统版本匹配</strong>的 GMS 安装包。来源不明的「一键安装谷歌全家桶」风险很高。
    </p>

    <h2>三、通用安装方法（适用于多数国产机）</h2>
    <ol>
      <li>
        <strong>安装 Google 服务框架（Google Services Framework）</strong>：这是底座，负责账号与同步的基础通信。先装它，再装其他。
      </li>
      <li>
        <strong>安装 Google Play 服务（Google Play Services）</strong>：这是核心，绝大多数依赖谷歌的 App 都靠它。版本要和系统版本对应。
      </li>
      <li>
        <strong>安装 Google Play 商店（Google Play Store）</strong>：门面应用，用于下载和更新其他谷歌 App。
      </li>
      <li>
        <strong>安装 Google 账号管理程序（Google Account Manager）</strong>：用于添加/管理谷歌账号，没有它登录会失败或反复掉登录。
      </li>
    </ol>
    <p>
      <strong>顺序记住：框架 → Play 服务 → Play 商店 → 账号管理器。</strong>
    </p>

    <h2>四、让服务真正「活」起来</h2>
    <p>装完不代表能用，国产 ROM 常会<strong>杀掉谷歌服务的后台</strong>，导致装了也闪退。</p>
    <ol>
      <li>
        <strong>自启动管理</strong>：设置 → 应用启动管理，把上述四个应用全部设为「允许自启动/允许后台活动」。
      </li>
      <li>
        <strong>电池优化</strong>：设置 → 电池 → 将谷歌服务相关应用设为「不优化」。
      </li>
      <li>
        <strong>锁定后台</strong>：在多任务界面锁定谷歌服务，防止被清理。
      </li>
      <li>
        <strong>权限</strong>：给 Play 服务和商店必要的网络、存储权限。
      </li>
    </ol>

    <h2>五、登录与激活</h2>
    <ol>
      <li>打开 Play 商店，添加谷歌账号。</li>
      <li>输入账号密码，完成验证。</li>
      <li>若提示「与 Google 服务器通信出现问题」，多为网络环境问题，换一个能连通的网络重试。</li>
      <li>
        登录成功后，Play 商店会开始更新自身和 Play 服务，<strong>等它更新完再用</strong>，避免版本错配。
      </li>
    </ol>

    <h2>六、常见问题排查</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>现象</th>
            <th>可能原因</th>
            <th>处理</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>装完 Play 闪退</td>
            <td>版本不匹配 / 未设自启</td>
            <td>换成对应版本，开自启</td>
          </tr>
          <tr>
            <td>无法登录谷歌账号</td>
            <td>网络不通 / 缺账号管理器</td>
            <td>换网络，补装账号管理器</td>
          </tr>
          <tr>
            <td>提示「设备未通过认证」</td>
            <td>未注册 GSF ID</td>
            <td>用设备 ID 工具注册</td>
          </tr>
          <tr>
            <td>服务反复停止</td>
            <td>被系统杀后台</td>
            <td>电池优化 + 锁定后台</td>
          </tr>
          <tr>
            <td>商店能开但装不了 App</td>
            <td>存储权限 / 版本旧</td>
            <td>给权限，更新 Play 服务</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      「设备未通过认证」是国内安装 GMS 最常见的坑之一：拿到设备的 Google 服务框架 ID（GSF ID），到 Google 官方认证页面注册一下即可。
    </p>

    <h2>七、进阶：Magisk 模块方案</h2>
    <p>如果你会刷机、已 Root，可以用 <strong>Magisk 的 GMS 模块</strong>一键补齐框架：</p>
    <ol>
      <li>在 Magisk Manager 中安装对应模块。</li>
      <li>重启设备。</li>
      <li>模块会自动把 GMS 安装并注册好，省去手动折腾顺序。</li>
    </ol>
    <p>
      <strong>优点</strong>：一劳永逸、自动处理版本匹配。<strong>缺点</strong>：需要 Root，有一定风险，且要考虑系统更新后模块兼容。
    </p>

    <h2>八、快速自检清单</h2>
    <ol>
      <li>Google 服务框架已装？</li>
      <li>Play 服务版本与系统匹配、已更新？</li>
      <li>Play 商店、账号管理器齐全？</li>
      <li>四个应用都设了自启动 + 免电池优化？</li>
      <li>网络能连通 Google 服务器？</li>
      <li>若报「未认证」，GSF ID 已注册？</li>
    </ol>
    <p>
      装谷歌框架其实不难，难的是<strong>顺序对、版本对、保活到位</strong>这三点。按「框架 → Play 服务 → 商店 →
      账号管理器」的顺序来，再把后台保活配好，绝大多数设备都能顺利跑起来。
    </p>
    <p>
      如果卡在「设备未认证」或反复掉登录，八成不是安装问题，而是网络环境或后台被杀——回头检查这两项，往往就通了。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "安卓手机怎么安装 Google 服务框架（GMS）？",
    answer:
      "按「Google 服务框架 → Google Play 服务 → Google Play 商店 → Google 账号管理器」的顺序依次安装，四个组件缺一不可且版本要与系统匹配。装完后还需开启它们的自启动、关闭电池优化并锁定后台，防止被国产 ROM 杀掉进程。",
  },
  {
    question: "为什么装了谷歌服务还是闪退或登录不了？",
    answer:
      "常见原因有三个：一是安装顺序错误或组件缺失；二是版本与系统不匹配；三是后台被系统杀死。请检查四个核心组件是否齐全、版本是否对应系统版本，并将它们设为允许自启动、免电池优化。登录失败还可能是网络无法连通 Google 服务器。",
  },
  {
    question: "「设备未通过认证」怎么解决？",
    answer:
      "这是国内安装 GMS 最常见的坑。需要用工具读取设备的 Google 服务框架 ID（GSF ID），然后到 Google 官方认证页面（google.com/android/uncertified）注册该 ID。注册后等待一段时间让系统同步，设备即可通过认证。",
  },
  {
    question: "Magisk 模块装谷歌框架靠谱吗？",
    answer:
      "对已 Root 的设备，Magisk 的 GMS 模块可以一键补齐框架并自动处理版本匹配，比较省心。但需要 Root 权限，存在一定安全风险，且系统升级后可能出现模块不兼容，适合有刷机经验的用户。普通用户建议用手动安装四件套的方式。",
  },
];

export const zhPosts20261008: BlogPostEntry[] = [
  {
    slug: "she-bei-bu-jian-rong-google-play-jie-jue-fang-fa",
    title: "设备不兼容 Google Play 解决方法：5 步搞定「你的设备与此版本不兼容」（2026）",
    description:
      "Google Play 提示「你的设备与此版本不兼容」？本文帮你定位原因并解决：区分系统版本、CPU 架构、地区/机型和 Google 服务框架四类问题，附五步排查法与手动安装 APK 的终极方案。",
    date: "2026-10-08",
    readTime: "8 分钟阅读",
    tags: ["Google Play", "设备不兼容", "APK 安装", "ABI", "安卓排查"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "an-zhuo-google-kuang-jia-an-zhuang-fang-fa",
    title: "安卓 Google 框架安装方法：国行/纯净系统装 GMS 完整教程（2026）",
    description:
      "国行手机或纯净系统没有 Google Play、装了谷歌服务也闪退？本文给出完整可用的 GMS 安装方法：从四件套的安装顺序、后台保活配置、登录激活到常见问题排查，附 Magisk 模块进阶方案与自检清单。",
    date: "2026-10-08",
    readTime: "8 分钟阅读",
    tags: ["GMS", "谷歌框架", "Google Play 服务", "国行手机", "安卓教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261008List = toList(zhPosts20261008);
