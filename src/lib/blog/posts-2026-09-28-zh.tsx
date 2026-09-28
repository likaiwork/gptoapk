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
      如果你在 2026 年还在手动下载 APK 安装应用，
      <strong>Android 15 带来的一批底层改动，会直接影响你能不能装、装完能不能正常跑。</strong>{" "}
      很多人升级系统后发现「以前能装的包现在装不上」「装完就闪退」，其实大多不是文件坏了，而是撞上了 Android 15
      的新规则。
    </p>
    <p>
      先给结论：
      <strong>
        Android 15 对 APK
        的核心影响集中在四点——16KB 内存页要求、前台服务类型收紧、受限设置（Restricted Settings）更强、以及更严格的旧应用兼容基线。
      </strong>{" "}
      本文逐条说清楚「是什么、会影响什么、怎么应对」。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>Android 15 不是禁止侧载，而是提高了「合规门槛」。</strong>{" "}
        官方渠道、完整签名的包基本无感；来源混乱、长期不更新的老包才容易出问题。
      </p>
    </blockquote>

    <h2>一、16KB 内存页：最容易引发「装完闪退」的坑</h2>

    <h3>是什么</h3>
    <p>
      Android 从 Android 15 起，在支持的设备上可以运行 <strong>16KB 页大小（page size）</strong>{" "}
      的内核。传统 Android 一直用 4KB 页，16KB 能提升内存访问效率、省电、加快启动。
    </p>

    <h3>影响什么</h3>
    <ul>
      <li>
        应用里如果包含 <strong>不兼容 16KB 的 native 库（.so 文件）</strong>
        ，在 16KB 设备上可能<strong>启动崩溃或直接装不上</strong>。
      </li>
      <li>常见于老版本游戏引擎、老插件、第三方加固/壳包。</li>
    </ul>

    <h3>怎么应对</h3>
    <ol>
      <li>
        <strong>优先装新版本</strong>：开发者近两年更新的包通常已适配。
      </li>
      <li>
        <strong>看崩溃日志</strong>：如果闪退且堆栈里出现 .so 加载失败，基本就是页大小或 ABI 不匹配。
      </li>
      <li>
        <strong>别用来源不明的「修改版/破解包」</strong>：这类包往往基于老构建，最容易踩这个坑。
      </li>
    </ol>

    <h2>二、前台服务类型收紧：后台任务变「娇气」</h2>

    <h3>是什么</h3>
    <p>
      Android 14 起就要求 <strong>前台服务必须声明类型（foreground service type）</strong>
      ，Android 15 进一步收紧权限校验。
    </p>

    <h3>影响什么</h3>
    <ul>
      <li>
        一些老包的「常驻后台」「自动同步」功能，装是能装，但<strong>运行时被系统限制，表现为功能失效或直接崩</strong>。
      </li>
      <li>下载类、定位类、媒体类应用最明显。</li>
    </ul>

    <h3>怎么应对</h3>
    <ul>
      <li>
        装完后如遇功能异常，去 <strong>设置 → 应用 → 该应用 → 权限</strong>
        ，把「位置」「通知」「后台活动」等按需放行。
      </li>
      <li>若应用本身没适配，只能等开发者更新，用户侧无法绕过。</li>
    </ul>

    <h2>三、受限设置（Restricted Settings）更强：侧载更「难打开开关」</h2>
    <p>这是<strong>侧载用户最直接的痛点</strong>。</p>

    <h3>是什么</h3>
    <p>
      Android 13 引入「受限设置」，对从<strong>未知来源</strong>
      安装的应用默认锁定部分敏感权限。Android 15 上，这一机制覆盖更广。
    </p>

    <h3>典型表现</h3>
    <p>
      装着装着弹窗：<strong>「出于安全考虑，此设置当前不可用」</strong>
      ——你想给侧载应用开「无障碍」「通知访问」「默认输入法」「安装其他应用」等权限，系统不让。
    </p>

    <h3>解决方法</h3>
    <ol>
      <li>
        <strong>先确认来源</strong>：只对可信应用操作。
      </li>
      <li>
        <strong>解除限制</strong>：设置 → 应用 → 找到该应用 → 右上角菜单 →{" "}
        <strong>「允许受限设置」</strong>（部分机型在权限页里点「允许」）。
      </li>
      <li>
        <strong>不行就重装</strong>：卸载后通过官方渠道或较新的包重新安装，重申一次来源。
      </li>
    </ol>
    <blockquote>
      <p>
        提示：这一步在国产 ROM（MIUI/HyperOS、ColorOS、OriginOS 等）里位置不同，关键词是「受限设置」「未知来源」「安装未知应用」。
      </p>
    </blockquote>

    <h2>四、旧应用兼容基线：太老的包直接装不上</h2>
    <p>
      Android 15 会阻止安装 <strong>targetSdkVersion 过低</strong>的极老应用（这条规则近年逐步收紧）。
    </p>
    <ul>
      <li>
        表现：提示「<strong>此应用与你的手机不兼容</strong>」或「应用未安装」。
      </li>
      <li>
        应对：
        <ul>
          <li>找该应用的<strong>新版</strong>；</li>
          <li>找不到就换官方替代应用；</li>
          <li>真需要老版本，考虑在旧设备或模拟器里运行。</li>
        </ul>
      </li>
    </ul>
    <blockquote>
      <p>提醒：Android 15 的 target SDK 门槛主要卡「新安装」，已安装的旧应用通常仍可运行，但升级安装会受限。</p>
    </blockquote>

    <h2>五、一张表看懂：Android 15 下 APK 常见问题归类</h2>
    <table>
      <thead>
        <tr>
          <th>症状</th>
          <th>最可能原因</th>
          <th>用户可做的处理</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>装完立刻闪退</td>
          <td>16KB 页 / .so 不兼容</td>
          <td>换新版，别用修改包</td>
        </tr>
        <tr>
          <td>提示「不兼容」</td>
          <td>target SDK 过低</td>
          <td>找新版或替代应用</td>
        </tr>
        <tr>
          <td>「设置当前不可用」</td>
          <td>受限设置</td>
          <td>手动「允许受限设置」</td>
        </tr>
        <tr>
          <td>后台功能失效</td>
          <td>前台服务类型限制</td>
          <td>放行权限，等开发者适配</td>
        </tr>
        <tr>
          <td>仍无法安装</td>
          <td>签名冲突/系统拦截</td>
          <td>卸载旧版、关纯净模式/未知来源设置</td>
        </tr>
      </tbody>
    </table>

    <h2>六、安全下载的底线（Android 15 时代更要守）</h2>
    <p>
      新规则下，<strong>来源质量比以往更关键</strong>：
    </p>
    <ol>
      <li>
        <strong>优先官方渠道</strong>：Google Play、开发者官网、GitHub Releases。
      </li>
      <li>
        <strong>核对签名与哈希</strong>：即使装不上，也能判断包有没有被动过。
      </li>
      <li>
        <strong>看更新时间</strong>：两年没更新的包在 Android 15 上风险明显升高。
      </li>
      <li>
        <strong>不确定就别装</strong>：闪退、要异常权限、诱导付费的包，直接放弃。
      </li>
    </ol>

    <h2>总结</h2>
    <p>
      Android 15 对 APK 的影响可以记成一句话：
      <strong>平台在收紧「能不能装」和「装了能不能放开跑」这两道门。</strong>{" "}
      对普通用户，最实用的三招是——<strong>装新版本、认准官方来源、学会放开「受限设置」</strong>
      。做到这三点，绝大多数「新系统装不上 APK」的问题都能定位到具体原因，而不是盲目重装系统或换手机。
    </p>
    <p>
      需要下载 APK 并核对兼容性？可以试试 <Link href="/">gptoapk.com</Link>
      ，支持 Google Play 链接直下，提供版本与兼容性信息。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么同一个 APK 在 Android 15 上装完就闪退，以前却没事？",
    answer:
      "最可能是 16KB 内存页。部分运行 Android 15 的设备使用 16KB 页大小的内核，应用里若打包了不兼容 16KB 的 native .so 库，就会在启动时崩溃。解决办法是安装应用的新版本，并避免使用修改版/重打包的 APK，因为这类包通常基于旧构建。",
  },
  {
    question: "「受限设置」是什么，怎么允许？",
    answer:
      "受限设置会锁定从未知来源安装的应用的敏感权限（无障碍、通知访问、默认输入法、安装其他应用等）。想放开：设置 → 应用 → 该应用 → 右上角菜单 → 允许受限设置。操作前请先确认来源可信。",
  },
  {
    question: "Android 15 是不是完全禁止侧载 APK 了？",
    answer:
      "不是。Android 15 并未禁止侧载，而是提高了合规门槛。来自官方渠道、签名完整的应用可以正常安装。出问题的主要是 target SDK 过低的极老应用、不兼容 16KB 页的 native 代码，以及未适配前台服务新规的应用。",
  },
  {
    question: "Android 15 提示应用与设备不兼容怎么办？",
    answer:
      "该提示通常表示应用的 targetSdkVersion 低于 Android 15 对新安装的最低要求。解决方法是找应用的新版本、改用官方替代应用，或在旧设备/模拟器上运行老版本。已安装的旧应用一般仍可继续使用。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      「我在旧手机上一直用得好好的 APK，换到新手机 / 升到新系统，怎么就装不上了？」——这类问题几乎每天都会被问到。
      <strong>跨版本升级（无论是系统版本还是应用版本）时，兼容性断裂的表现五花八门，但原因往往就那么几类。</strong>{" "}
      本文给你一套从「装不上」到「能稳定跑」的排查流程。
    </p>
    <p>
      先给结论：
      <strong>跨版本兼容问题，90% 出在四处——签名、target SDK、ABI/架构、以及数据与权限迁移。</strong>{" "}
      按顺序排查，基本能锁定。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>「装不上」和「跑不动」是两类问题。</strong>{" "}
        前者多在安装校验阶段（签名、SDK 门槛、架构），后者多在运行阶段（数据、权限、后台限制）。分开定位，效率翻倍。
      </p>
    </blockquote>

    <h2>一、先分清：你遇到的是哪种「不兼容」</h2>
    <ul>
      <li>
        <strong>装不上</strong>：解析包出错、应用未安装、提示「不兼容」、签名冲突。
      </li>
      <li>
        <strong>装上跑不动</strong>：闪退、卡死、功能失效、数据丢失。
      </li>
    </ul>
    <p>两类问题的排查路径完全不同，先对号入座。</p>

    <h2>二、装不上：按这 4 步排查</h2>

    <h3>第 1 步：看是不是签名冲突</h3>
    <p>
      <strong>同一天不可能有两个签名的应用</strong>（同一包名）。
    </p>
    <ul>
      <li>
        现象：提示「<strong>应用未安装</strong>」或「<strong>签名不一致</strong>」，且你手机上已装过同名应用。
      </li>
      <li>
        原因：旧版装的来自 A 渠道，新包装的是 B 渠道，<strong>签名不同无法覆盖安装</strong>。
      </li>
      <li>
        处理：<strong>先卸载旧版再装新版</strong>。但注意——卸载会丢本地数据，重要数据先备份。
      </li>
    </ul>
    <blockquote>
      <p>判断签名是否一致，可用 APK 信息工具查看证书指纹（SHA-256），两个包指纹不同就是这条问题。</p>
    </blockquote>

    <h3>第 2 步：看 target SDK 门槛</h3>
    <p>
      新系统会阻止安装 <strong>targetSdkVersion 过低</strong>的极老应用。
    </p>
    <ul>
      <li>
        现象：提示「<strong>此应用与你的设备不兼容</strong>」。
      </li>
      <li>处理：找该应用的<strong>新版</strong>；找不到就换官方替代应用。旧包硬装通常无解。</li>
    </ul>

    <h3>第 3 步：看 CPU 架构（ABI）</h3>
    <ul>
      <li>
        现象：装上了但一打开就崩，或直接「解析包错误」。
      </li>
      <li>
        原因：应用只打包了某一种架构的原生库（如只支持 armeabi-v7a），与设备不匹配；或缺少 arm64-v8a。
      </li>
      <li>
        处理：换<strong>通用包（universal）</strong>或对应架构的包；纯 32 位老包在新 64 位设备上可能受限。
      </li>
    </ul>

    <h3>第 4 步：看系统拦截与来源设置</h3>
    <ul>
      <li>允许「未知来源/安装外部来源应用」。</li>
      <li>关闭国产 ROM 的「纯净模式」。</li>
      <li>
        若提示「受限设置不可用」，去应用详情页放开「<strong>允许受限设置</strong>」。
      </li>
    </ul>

    <h2>三、装上跑不动：按这 3 步排查</h2>

    <h3>第 1 步：数据与版本迁移</h3>
    <ul>
      <li>
        <strong>降级安装</strong>（新版本覆盖旧版本）常导致数据库不兼容而闪退。
      </li>
      <li>
        处理：<strong>卸载后全新安装</strong>，用应用内导出/云同步迁移数据。
      </li>
    </ul>

    <h3>第 2 步：权限与后台限制</h3>
    <ul>
      <li>
        新系统对<strong>前台服务、后台活动、通知</strong>管得更严，老应用可能「功能失效」。
      </li>
      <li>
        处理：设置 → 应用 → 权限，放行位置、通知、后台活动；省电策略里把该应用设为「不限制」。
      </li>
    </ul>

    <h3>第 3 步：native 库与页大小</h3>
    <ul>
      <li>
        Android 15+ 设备启用了 <strong>16KB 内存页</strong>，含不兼容 .so 的老包会<strong>启动崩溃</strong>。
      </li>
      <li>处理：换新版本或 universal 包；修改版/破解包最容易踩这个坑。</li>
    </ul>

    <h2>四、排查速查表</h2>
    <table>
      <thead>
        <tr>
          <th>现象</th>
          <th>最可能原因</th>
          <th>处理动作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>应用未安装 / 签名不一致</td>
          <td>签名冲突</td>
          <td>卸载旧版再装（先备份数据）</td>
        </tr>
        <tr>
          <td>与设备不兼容</td>
          <td>target SDK 过低</td>
          <td>装新版或换替代应用</td>
        </tr>
        <tr>
          <td>解析包错误</td>
          <td>架构/ABI 不匹配</td>
          <td>换 universal 或对应架构包</td>
        </tr>
        <tr>
          <td>装完秒闪退</td>
          <td>16KB 页 / .so 不兼容</td>
          <td>换新版，弃用修改包</td>
        </tr>
        <tr>
          <td>升级后闪退</td>
          <td>数据版本不兼容</td>
          <td>卸载重装并迁移数据</td>
        </tr>
        <tr>
          <td>功能失效</td>
          <td>后台/权限限制</td>
          <td>放行权限、关省电限制</td>
        </tr>
      </tbody>
    </table>

    <h2>五、动手前必做的两件事</h2>
    <ol>
      <li>
        <strong>备份数据</strong>：卸载重装会清空本地数据，先导出或云备份。
      </li>
      <li>
        <strong>留好旧包</strong>：把当前能用的旧版本 APK 存一份，出问题可回退。
      </li>
    </ol>

    <h2>六、写在最后</h2>
    <p>
      跨版本兼容不是玄学，而是一条<strong>固定顺序的排查链</strong>：
      <strong>先判签名，再看 SDK 门槛，然后查架构，最后处理数据与权限。</strong>{" "}
      按这个流程走，你会发现大多数「新手机装不上老 APK」「升级后应用崩了」的问题，都能在三分钟内定位到原因。真正无解的只有一种——
      <strong>应用本身太老、已停止更新且无替代</strong>，这时换应用比折腾兼容更划算。
    </p>
    <p>
      需要一次下对版本、少走弯路？可以试试 <Link href="/">gptoapk.com</Link>
      ，支持 Google Play 链接直下，附带版本、ABI 与兼容性信息。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "为什么同一个 APK 在老手机上能装，新手机装不上？",
    answer:
      "最常见的原因是：新系统有 target SDK 最低门槛、CPU 架构不匹配（32 位包装到 64 位设备）、或新手机上已有签名不同的同名应用导致冲突。先确认应用的最低 Android 版本和 ABI，再卸载已有副本后重装。",
  },
  {
    question: "「应用未安装」到底是什么意思？",
    answer:
      "通常意味着：与已装应用签名冲突（同包名不同签名）、缺少拆分 APK、或版本号低于已装版本。核对该应用的签名指纹、确认拿到了完整拆分集，并比较版本号即可定位。",
  },
  {
    question: "升级 Android 系统后应用闪退，是什么原因？",
    answer:
      "两个常见原因：一是就地升级后本地数据库不兼容（解决：卸载重装并迁移数据），二是含老 .so 库的应用不兼容 16KB 内存页（解决：安装新版或 universal 包）。",
  },
  {
    question: "新版本出问题想回退怎么办？",
    answer:
      "升级前先保存一份当前可用的 APK。回退时卸载现版本，再安装保存的旧包。注意卸载会清空本地数据，回退前先导出或云备份数据。",
  },
];

export const zhPosts20260928: BlogPostEntry[] = [
  {
    slug: "android-15-apk-changes-impact",
    title: "Android 15 新变化对 APK 的影响：下载、安装、运行都会遇到什么（2026）",
    description:
      "升级到 Android 15 后，以前能装的 APK 装不上、装完就闪退？本文讲清 16KB 内存页、前台服务类型收紧、受限设置更强、旧应用兼容基线四点改动，以及每一条的具体表现和用户可做的应对，附症状—原因—处理速查表。",
    date: "2026-09-28",
    readTime: "9 分钟阅读",
    tags: ["Android 15", "APK 安装", "16KB 内存页", "受限设置", "兼容性"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-cross-version-upgrade-compatibility",
    title: "APK 跨版本升级兼容性排查：从低版本升到高版本为什么装不上、跑不动（2026）",
    description:
      "老手机能用的 APK 换到新手机就装不上？本文给出固定顺序的排查链：先判签名冲突，再看 target SDK 门槛，然后查 CPU 架构（ABI），最后处理数据与权限迁移。分「装不上」和「装上跑不动」两条路径，附速查表和回退建议。",
    date: "2026-09-28",
    readTime: "9 分钟阅读",
    tags: ["APK 兼容性", "跨版本升级", "签名冲突", "target SDK", "ABI 架构"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260928List = toList(zhPosts20260928);
