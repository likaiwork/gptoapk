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
      辛辛苦苦下载、安装成功，点开图标——<strong>闪一下就退回桌面</strong>，或者刚进界面就崩。这种&quot;装得上、用不了&quot;的情况比安装失败更让人抓狂，因为系统没给任何提示。
    </p>
    <p>
      结论先讲：<strong>闪退不是&quot;这个 App 坏了&quot;这么简单，90% 的情况能归到 5 类原因</strong>——① 架构不匹配、②
      系统版本不符、③ 缺少依赖库、④ 数据/缓存损坏、⑤ 权限或签名问题。下面按&quot;最可能→最不常见&quot;逐条排查，每一条都告诉你怎么验证、怎么修。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>闪退是果，不是因。</strong>
        你要找的不是&quot;为什么崩&quot;，而是&quot;哪个前置条件没满足&quot;。
      </p>
    </blockquote>

    <h2>一、架构不匹配（第三方下载包最常见的坑）</h2>
    <p>
      安卓手机 CPU 主要有 <strong>arm64-v8a、armeabi-v7a、x86_64</strong> 几种架构。如果一个 APK 只打包了{" "}
      <strong>x86</strong>（给模拟器用的），装到 arm64 真机上，能装上但一运行就崩。
    </p>
    <ul>
      <li>
        <strong>怎么确认：</strong>看 APK 里 <code>lib/</code> 目录包含哪些架构文件夹。用电脑解压 APK，或手机端用包分析工具查看。
      </li>
      <li>
        <strong>怎么修：</strong>换成含 <strong>arm64-v8a</strong> 的版本。很多站点会提供&quot;通用包（universal）&quot;，包含全部架构，最保险。
      </li>
    </ul>
    <p>
      实用原则：<strong>第三方站下载的包，优先选 universal 版本。</strong>单一架构包如果挑错，闪退率极高。
    </p>

    <h2>二、系统版本不符（minSdk 拦不住的部分）</h2>
    <p>
      APK 的 <code>minSdkVersion</code> 会阻止低于要求的系统安装，但<strong>上限（targetSdk）问题不会拦</strong>
      ——新 App 用了旧系统没有的 API，装上了也可能启动即崩。
    </p>
    <ul>
      <li>
        <strong>怎么确认：</strong>对比 App 官方要求的安卓版本和你手机的版本（设置 → 关于手机 → Android 版本）。
      </li>
      <li>
        <strong>怎么修：</strong>找适配你系统版本的旧版本 APK，或升级手机系统。
      </li>
    </ul>

    <h2>三、缺少依赖库 / 数据包（游戏、大型 App 高发）</h2>
    <p>
      很多游戏和大型 App 是&quot;<strong>主 APK + OBB 扩展包 / 拆分数据</strong>&quot;结构。你只装了主包，数据没到位，启动就崩。
    </p>
    <ul>
      <li>
        <strong>怎么确认：</strong>看下载页说明，是否要求额外下载 <code>obb</code> 数据包或放置到指定目录。
      </li>
      <li>
        <strong>怎么修：</strong>把 <code>obb</code> 文件放到 <code>Android/obb/&lt;包名&gt;/</code> 目录下；如果是{" "}
        <strong>split APK（App Bundle 拆分）</strong>，需要把所有 split 一起装（用 SAI / Split APKs Installer
        类工具），只装 base 会崩。
      </li>
    </ul>
    <blockquote>
      <p>
        <strong>重点：</strong>
        <strong>手装拆分包 ≠ 装一个 APK。</strong>
        base + config 系列包必须成套安装。
      </p>
    </blockquote>

    <h2>四、数据或缓存损坏（&quot;以前能用，现在崩&quot;）</h2>
    <p>
      如果之前用得好好的，突然闪退，多半是<strong>本地数据出问题</strong>：配置损坏、缓存冲突、升级残留。
    </p>
    <ul>
      <li>
        <strong>怎么修（按顺序试）：</strong>
        <strong>设置 → 应用 → 找到该 App → 清除缓存</strong>（先清缓存，不动数据）。
      </li>
      <li>
        还不行 → <strong>清除数据</strong>（会重置 App，账号需重新登录）。
      </li>
      <li>
        再不行 → 卸载重装（用<strong>同来源</strong>的原包，不要混用不同商店的包）。
      </li>
    </ul>
    <p>
      <strong>注意：</strong>跨商店升级（比如先装了某第三方版，又从官方商店更新）常导致签名冲突→闪退，务必用同一来源。
    </p>

    <h2>五、权限 / 签名 / Root 检测</h2>
    <ul>
      <li>
        <strong>权限：</strong>少数 App 在启动时若无关键权限（存储、位置）会直接崩。去<strong>设置 → 应用 → 权限</strong>
        补上再试。
      </li>
      <li>
        <strong>签名冲突：</strong>同一包名但签名不同的两个包，不能共存也不能互相覆盖，装错会异常。
      </li>
      <li>
        <strong>Root / 模拟器检测：</strong>银行、支付、部分游戏会检测 Root 或模拟器环境，检测到直接退出。这类是
        <strong>主动退出</strong>，不是 bug，只能换设备环境。
      </li>
    </ul>

    <h2>六、快速自查流程图（收藏）</h2>
    <ol>
      <li>打开就闪退 → 先怀疑<strong>架构</strong>（换 universal 包）。</li>
      <li>玩游戏崩 → 怀疑<strong>数据包 / 拆分包</strong>没装全。</li>
      <li>以前能用突然崩 → <strong>清缓存 → 清数据 → 重装</strong>。</li>
      <li>界面加载后崩 → 补<strong>权限</strong>。</li>
      <li>银行/游戏登录后退出 → <strong>Root/模拟器检测</strong>，换环境。</li>
    </ol>

    <h2>七、收集崩溃日志（给开发者/求助用）</h2>
    <p>想精准定位，可以拿日志：</p>
    <ul>
      <li>
        开启<strong>开发者选项 → USB 调试</strong>，连电脑用 <code>adb logcat</code> 抓崩溃堆栈，重点看{" "}
        <code>FATAL EXCEPTION</code> 那几行。
      </li>
      <li>
        普通用户也可用系统自带&quot;<strong>崩溃报告</strong>&quot;或第三方日志 App 导出。
      </li>
    </ul>
    <p>
      把堆栈里的<strong>包名 + 异常类型</strong>发给开发者，比&quot;闪退&quot;两个字有用一百倍。
    </p>

    <p>
      <strong>一句话总结：</strong>
      闪退先分场景——<strong>装第三方包闪退查架构，游戏闪退查数据包，老 App 闪退清数据，检测类闪退换环境。</strong>
      按上面流程走一遍，八成问题自己就能解决。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "APK 明明装好了，为什么一打开就闪退？",
    answer:
      "最常见的原因是 CPU 架构不匹配：这个 APK 只打包了别的架构（比如给模拟器用的 x86），而你手机是 arm64，装得上但一运行就崩。其他常见原因还有系统版本不符、缺少 OBB/拆分数据包、App 数据损坏。换 universal 包、装全拆分包、或清缓存清数据，基本能解决大多数情况。",
  },
  {
    question: "怎么查一个 APK 支持哪些 CPU 架构？",
    answer:
      "用电脑解压 APK，看 lib/ 目录里有哪些子文件夹，每个文件夹就是一个架构（arm64-v8a、armeabi-v7a、x86、x86_64）。如果没有 arm64-v8a 而你的手机是 arm64，就很可能闪退。universal 通用包含全部架构，能避免这个问题。",
  },
  {
    question: "游戏 APK 一打开就崩，是缺了什么？",
    answer:
      "游戏通常不只需要主 APK。检查下载说明是否要求 obb 数据包（放到 Android/obb/<包名>/ 下），或这个 App 是不是拆分 APK。只装拆分包里的 base 是闪退的典型原因，要用 SAI 之类的工具把所有 split 一起装。",
  },
  {
    question: "怎么拿到崩溃日志发给开发者？",
    answer:
      "开启开发者选项和 USB 调试，连电脑后运行 adb logcat，找 FATAL EXCEPTION 那几行。把堆栈里的包名和异常类型发给开发者，比只描述“闪退”有用得多。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      现在的 App 越做越大：一个社交软件 400 MB、一个游戏 2 GB 起步。手机存储告急时，<strong>APK 和相关数据是占用大头</strong>
      。但&quot;精简&quot;不等于乱删——删错了 App 直接崩。这篇讲清楚：<strong>哪些能省、怎么省、哪些千万别碰。</strong>
    </p>
    <p>
      结论先讲：<strong>省空间要分三层下手——① 清残留安装包、② 只装需要的架构、③ 清理 App 缓存与数据。</strong>
      从最安全到最激进排序，前两层几乎零风险。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>&quot;瘦身&quot;的关键不是删文件，而是减少重复。</strong>
        手机里最占地方、又最没用的，是那些装完就没用的安装包和重复架构。
      </p>
    </blockquote>

    <h2>一、先清掉&quot;装完就没用&quot;的安装包</h2>
    <p>
      你每次下载 APK 安装后，<strong>原始 APK 文件默认还留在下载目录里</strong>，等于同一份内容在手机里存了两遍。
    </p>
    <ul>
      <li>
        <strong>怎么找：</strong>打开<strong>文件管理器 → 下载（Download）目录</strong>，或浏览器的下载记录，按大小排序。
      </li>
      <li>
        <strong>怎么处理：</strong>APK 已成功安装且能用 → 直接删掉安装包。省的是<strong>几百 MB 到几 GB</strong>。
      </li>
      <li>
        <strong>注意：</strong>删之前确认 App 已经装好并能正常打开，别删了才发现装的是坏包。
      </li>
    </ul>
    <p>
      实用原则：<strong>&quot;已安装&quot;的 App，其安装包 99% 可以删。</strong>需要重装时再下即可。
    </p>

    <h2>二、只保留你手机需要的架构（拆分包的价值）</h2>
    <p>
      现代 App 常用 <strong>App Bundle</strong> 分发，安装时只下载<strong>匹配你手机架构</strong>的那份，这就是为什么官方商店装的比第三方&quot;universal
      通用包&quot;小很多。
    </p>
    <ul>
      <li>
        <strong>通用包（universal）：</strong>包含 arm64、armv7、x86 等<strong>所有架构</strong>，体积最大，但哪台手机都能装。
      </li>
      <li>
        <strong>单架构包：</strong>只含一种架构，体积小，但要选对（见闪退排查那篇——选错会闪退）。
      </li>
    </ul>
    <p>
      <strong>如果你空间紧张：</strong>优先从官方商店装（自动只下所需架构），比第三方下载通用包更省地方。
    </p>

    <h2>三、清理 App 缓存（最安全，不丢数据）</h2>
    <p>
      缓存是 App 临时存的文件，<strong>删了不影响账号和数据</strong>，App 下次用会重新生成。
    </p>
    <ul>
      <li>
        <strong>路径：</strong>设置 → 应用 → 选择 App → <strong>存储 → 清除缓存</strong>。
      </li>
      <li>
        <strong>效果：</strong>微信、浏览器、视频类 App 的缓存常达<strong>几百 MB 到数 GB</strong>。
      </li>
      <li>
        <strong>建议：</strong>每月清一次大 App 的缓存。<strong>先清缓存，别急着一上来就&quot;清除数据&quot;。</strong>
      </li>
    </ul>
    <blockquote>
      <p>
        <strong>重点：</strong>
        <strong>缓存 ≠ 数据。</strong>
        清缓存安全，清数据会重置 App（需重新登录），两者别搞混。
      </p>
    </blockquote>

    <h2>四、删 App 的&quot;数据/文件&quot;（会重置，谨慎）</h2>
    <p>如果清缓存不够，且这个 App 的本地数据你不介意丢：</p>
    <ul>
      <li>
        设置 → 应用 → <strong>存储 → 清除数据 / 清除存储</strong>。
      </li>
      <li>
        效果通常比清缓存大得多，但<strong>会清空登录状态和本地设置</strong>。
      </li>
      <li>
        <strong>适合：</strong>不常用但又不想卸载的 App；或本地存了大量文件（如离线视频）。
      </li>
    </ul>

    <h2>五、卸载后手动清残留目录</h2>
    <p>
      安卓卸载 App 时，<strong>有些数据目录不会被自动删干净</strong>，尤其是放在公共存储里的文件夹（如{" "}
      <code>Android/data</code>、<code>Android/obb</code>）。
    </p>
    <ul>
      <li>
        <strong>检查：</strong>文件管理器进 <code>Android/obb/</code> 和 <code>Android/data/</code>
        ，看有没有<strong>已卸载 App 的包名目录</strong>，有就删。
      </li>
      <li>
        <strong>注意：</strong>只删你能确认<strong>已经卸载</strong>的 App 目录，别碰还在用的。Android 11+ 对{" "}
        <code>Android/data</code> 访问有限制，属正常现象。
      </li>
    </ul>

    <h2>六、用系统&quot;存储管理&quot;做整体体检</h2>
    <p>不用自己到处翻，系统自带的存储管理最省事：</p>
    <ul>
      <li>
        <strong>设置 → 存储</strong>：看哪类文件占最多（应用、图片、视频、其他）。
      </li>
      <li>
        多数系统提供<strong>&quot;清理建议&quot;</strong>：一键清缓存、重复文件、大文件、残留包。
      </li>
      <li>
        对&quot;其他/系统数据&quot;占用异常大的情况，清缓存 + 重启常能释放一部分。
      </li>
    </ul>

    <h2>七、这些千万别乱删（避坑清单）</h2>
    <ul>
      <li>
        ❌ <strong>正在用的 App 的 <code>Android/obb</code> 数据</strong>：删了大型游戏直接打不开。
      </li>
      <li>
        ❌ <strong><code>/system</code> 下的文件</strong>：属于系统，删了可能开不了机。
      </li>
      <li>
        ❌ <strong>不认识的 <code>.apk</code> 随便装</strong>：空间没省到，反而中了招（见安全检测那篇）。
      </li>
      <li>
        ❌ <strong>微信/QQ 的&quot;聊天文件&quot;用第三方清理工具强删</strong>：可能删到你还需要的文件，用 App
        内自带的清理更稳。
      </li>
    </ul>

    <p>
      <strong>一句话总结：</strong>
      想给手机腾空间，顺序是——<strong>先删残留安装包（最省最安全）→ 再清 App 缓存 → 再考虑清数据 →
      最后处理卸载残留。</strong>按这个顺序做，既省出大量空间，又不会把能用的 App 弄崩。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 占空间太大，最安全的清理方法是什么？",
    answer:
      "先删下载目录里那些已经安装完的 APK 安装包，这是最安全、收益最大的一步，通常能省几百 MB 到几 GB。然后再清 App 缓存（不会丢账号和数据），最后才考虑清数据这类更激进的操作。",
  },
  {
    question: "安卓清缓存安全吗？",
    answer:
      "安全。缓存是 App 临时存的文件，App 下次用会重新生成，不影响账号、登录和已保存的数据。可以在设置 → 应用 → 选择 App → 存储 → 清除缓存里随时清理。而“清除数据”会重置 App 并退出登录，两者不一样。",
  },
  {
    question: "为什么第三方下载的 APK 比应用商店里的大？",
    answer:
      "商店常以 App Bundle 分发，你的设备只下载匹配自身 CPU 架构和屏幕密度的那份。第三方 universal 通用包包含了所有架构，所以体积大得多。从官方商店装，只拿你手机真正用到的部分，更省空间。",
  },
  {
    question: "安卓腾空间时哪些文件绝对不能删？",
    answer:
      "绝不能删还在用的 App 的 Android/obb 数据（大型游戏会打不开）、/system 下的系统文件（可能导致开不了机），以及不认识的 .apk 文件（可能带毒）。也不要用第三方清理工具强删聊天 App 的文件，用 App 自带的清理更稳。",
  },
];

export const zhPosts20260914: BlogPostEntry[] = [
  {
    slug: "apk-installs-but-crashes-on-launch-fix",
    title: "APK 装好了却闪退？2026 最全闪退排查指南（从现象到原因逐条对号）",
    description:
      "辛辛苦苦下载、安装成功，点开图标却闪一下就退回桌面，或刚进界面就崩。这种“装得上、用不了”的情况比安装失败更让人抓狂，因为系统没给任何提示。好消息是：闪退几乎总能归到 5 类原因——CPU 架构不匹配、系统版本不符、缺少依赖/数据文件、App 数据损坏，或权限/签名/Root 检测问题。本文按可能性从高到低逐条排查，每条都讲清怎么确认、怎么修。",
    date: "2026-09-14",
    readTime: "8 min read",
    tags: ["android", "apk", "闪退", "排错", "侧载", "app-bundle", "logcat", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "slim-down-apk-files-free-storage",
    title: "APK 动辄几百 MB 太占空间？2026 精简瘦身的 6 个实用办法",
    description:
      "现在的 App 越做越大：一个社交软件 400 MB、一个游戏 2 GB 起步。手机存储告急时，APK 和相关数据是占用大头。但精简不等于乱删——删错了 App 直接崩。本文把省空间拆成 6 个可操作的步骤：清残留安装包、只留需要的架构、清缓存、谨慎处理 App 数据、清卸载残留、用系统存储管理，并附上一份“千万别删”清单。",
    date: "2026-09-14",
    readTime: "7 min read",
    tags: ["android", "apk", "存储", "app-bundle", "缓存", "清理", "技巧", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260914List = toList(zhPosts20260914);
