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
      华为手机（尤其没装 GMS、或纯鸿蒙 HarmonyOS）装 APK 时最常见三种崩溃现场：<strong>点安装直接提示"不允许"/"该应用与
      系统不兼容"</strong>、<strong>在"更多应用建议"里翻半天找不到入口</strong>、<strong>装完了打不开或闪退</strong>。这篇按
      HarmonyOS 4/5、EMUI 12 两个主流系统版本，把"怎么装"和"装不上怎么破"一次说清。
    </p>
    <p>
      华为装 APK 卡住，九成不是手机的问题，而是系统默认 <strong>"纯净模式/应用市场管控"在拦截</strong>。你差的是两个开关：
      <strong>"纯净模式"（外部来源应用）</strong> + <strong>"外部来源应用安装授权"</strong>。把它们按本篇步骤打开，绝大多数 APK
      都能正常装。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>先把纯净模式和外部来源授权打开，再分清"被系统拦截"和"因缺 GMS 闪退"两种症状，华为装 APK
        就没那么玄学了。
      </p>
    </blockquote>

    <h2>一、先分清你的系统：鸿蒙还是 EMUI，操作位置不一样</h2>
    <ul>
      <li>
        <strong>HarmonyOS（鸿蒙）4.0 / 5.0</strong>（近年新机、Mate/P 系列升级后）：设置入口在{" "}
        <strong>设置 → 系统 → 纯净模式</strong>，以及 <strong>设置 → 应用 → 应用管理</strong>。
      </li>
      <li>
        <strong>EMUI 12 及以下</strong>（较老机型）：入口在 <strong>设置 → 安全 → 更多安全设置</strong>，以及{" "}
        <strong>设置 → 应用 → 应用管理</strong>。
      </li>
      <li>
        部分出厂默认的"应用市场"为华为应用市场（AppGallery），未装 Google Play 的机型<strong>默认会拦非市场应用</strong>
        ——这正是很多人"点 APK 没反应/被拦"的根源。
      </li>
    </ul>
    <p>
      <strong>小提示：</strong>鸿蒙 5.0 之后部分机型的"纯净模式"迁移到 <strong>设置 → 系统和更新 → 纯净模式</strong>，找不到就按
      上面"设置 → 系统 → 纯净模式"搜一下。
    </p>

    <h2>二、标准安装流程（鸿蒙 4/5 为例）</h2>
    <ol>
      <li>
        <strong>打开"纯净模式"开关</strong>：设置 → 系统（或系统和更新）→ 纯净模式 → <strong>将"增强防护"关闭 /
        "纯净模式"设为允许安装外部来源应用</strong>。关闭后系统才不再一键拦掉非应用市场的 APK。
      </li>
      <li>
        <strong>授予"外部来源应用安装"权限</strong>：当你从文件管理 / 浏览器 / 微信里点一个 APK 时，系统会弹出
        "是否允许『XX应用』安装未知来源应用？" → 选择 <strong>"允许"</strong>（或"仍要安装"）。这是每次安装都会走的授权，
        别选成"仅此一次"以免下次又拦。
      </li>
      <li>
        <strong>找到并执行 APK</strong>：用文件管理打开 APK 所在目录 → 点 APK 文件 → 弹安装确认界面。若点文件没反应：长按文件 →
        更多 → <strong>"打开方式" → 选"软件包安装程序"</strong>。
      </li>
      <li>
        <strong>处理"未知来源"/"Play 保护"提示</strong>：厂家提示"此应用未经华为应用市场检测" → 选 <strong>"仍然安装"</strong>
        （前提是你确认来源可靠）。若弹出"检测到风险"且没有"仍要安装"按钮，说明 <strong>"纯净模式/增强防护"没关干净</strong>，回
        第 1 步彻底关闭。
      </li>
      <li>
        <strong>安装完成后，到"应用管理"里手动打开</strong>：部分 APK 装完桌面没图标，去 <strong>设置 → 应用 → 应用管理</strong>{" "}
        找到该应用 → 启用并点击打开。
      </li>
    </ol>

    <h2>三、没 GMS（谷歌服务）的华为，装依赖 GMS 的 APK 会怎样</h2>
    <p>
      这是华为用户最大的坑：<strong>很多海外 APK 表面装上了，打开就闪退或一直转圈</strong>，原因不是安装失败，而是它{" "}
      <strong>依赖 Google Play 服务（GMS）</strong>。华为新机默认没 GMS，处理办法有三档：
    </p>
    <ul>
      <li>
        <strong>装"华为应用市场"里的国际版应用</strong>：AppGallery 里能搜到的（如 TikTok、部分游戏），优先用它装，自动适配无
        GMS。
      </li>
      <li>
        <strong>用支持"华为 GMS 替代"的壳（如 GBox、microG）</strong>：在壳内运行依赖 Google 的应用，有一定兼容性成本，适合轻量使用。
      </li>
      <li>
        <strong>判断该应用是否强依赖 GMS</strong>：装完打开若白屏/闪退，去 <strong>设置 → 应用 → 应用管理 → 该应用 → 权限</strong>{" "}
        看是否缺"谷歌服务"类权限。实在跑不了，就换该应用的官方网页版或免 GMS 版本。
      </li>
    </ul>
    <p>
      <strong>一句话：</strong>APK 装不上≠手机坏了，很可能是"缺 GMS"这个隐形依赖在作怪。先分清"没授权被拦"和"缺服务闪退"，再对症下药。
    </p>

    <h2>四、"无法安装"七连排查清单</h2>
    <ol>
      <li>纯净模式是否关闭 → 最常被忽略，先开回来。</li>
      <li>外部来源授权 → 点 APK 时是否弹过"允许 XX 安装未知来源"。</li>
      <li>版本兼容 → 老鸿蒙装 Android 13+ 才支持的 App 会报"兼容性"；下 APK 时看它标的最低 Android/鸿蒙版本。</li>
      <li>APK 是否完整 → 重新下载，或换官方源（很多"无法解析/解析失败"= 文件损坏）。</li>
      <li>系统存储不足 → 应用管理看一下剩余空间，留足几百 MB。</li>
      <li>第三方应用安装被企业/教育版策略锁定 → 部分定制 ROM 需联系管理员解除。</li>
      <li>重启手机 → 授权状态有时候要重启才刷新。</li>
    </ol>

    <h2>五、安全提醒：华为上尤其别乱装"破解版"</h2>
    <p>
      华为的纯净模式虽然烦，但它实际是一道防"全家桶"和恶意 APK 的屏障。一旦关掉，请只从可信来源（官方站、AppGallery、开发者官网）
      装。尤其警惕：
    </p>
    <ul>
      <li>带"破解 / 无限 / 去广告 / 华为可用"字样的第三方包——很多会申请无障碍、通讯录、短信权限。</li>
      <li>装完突然要求"开启无障碍服务"的 App，基本可判定有猫腻。</li>
    </ul>
    <p>
      <strong>判断 APK 是否可信，可先看它要求的权限清单</strong>：一个手电筒 App 要通讯录，直接删。
    </p>

    <p>
      <strong>总结：</strong>跟着上面五步走，华为装 APK 基本一次成功。装不上就按"四、排查清单"逐条对，八成能定位到是授权、版本还是缺
      GMS。核心记住一句话：先把纯净模式和外部来源授权打开，再分清"被拦"和"闪退"两种症状。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      很多安卓用户天天装 APK，但被问一句"APK 到底是什么"又说不上来。它像电脑上的 <code>.exe</code>，但又有本质区别：
      <strong>APK 不能"双击就跑"，它是一份需要"安装"的资源包</strong>。搞懂 APK 的结构和安装原理，能让你的手机更安全、少踩无数坑。
    </p>
    <p>
      APK 本质是一个 <strong>ZIP 压缩包</strong>，里面装的是应用的代码、资源和签名信息。安装 APK 的过程，就是"系统解压它并把里面的
      东西登记注册到系统里"——这也是为什么<strong>随便修改过的 APK 往往装不上或异常</strong>（签名对不上）。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>APK = 带数字签名的应用安装包，本质是个 ZIP。理解它的结构和签名原理，你就能一眼判断哪些下载站、哪些
        "破解版"值得怀疑。
      </p>
    </blockquote>

    <h2>一、APK 到底是什么</h2>
    <ul>
      <li>
        <strong>APK 全称</strong>：Android Application Package（安卓应用程序包），是 Android 系统的应用安装文件格式。
      </li>
      <li>
        <strong>本质</strong>：一个标准 ZIP 压缩包（改了扩展名），你可以把它后缀改成 <code>.zip</code> 用解压软件打开看内容。
      </li>
      <li>
        <strong>平台</strong>：只用于 Android（以及部分国产系统如鸿蒙的兼容场景）。iOS 用的是 <code>.ipa</code>，电脑 Windows 是{" "}
        <code>.exe</code>，Mac 是 <code>.dmg</code>——<strong>千万别混着传</strong>。
      </li>
    </ul>
    <p>
      <strong>判断一个文件是不是 APK</strong>：看扩展名是否是 <code>.apk</code>，且文件大小通常从几 MB 到几百 MB。一个只有几十 KB 的
      "APK"十有八九是损坏或伪装的。
    </p>

    <h2>二、APK 里面到底装了什么（拆开看）</h2>
    <p>把一个 APK 后缀改成 <code>.zip</code> 解压，你会看到几类关键内容：</p>
    <ul>
      <li>
        <strong><code>AndroidManifest.xml</code></strong>：应用的"身份证"，声明包名、权限、入口 Activity、所需系统版本。
      </li>
      <li>
        <strong><code>classes.dex</code></strong>：编译后的代码，安卓的 Dalvik/ART 字节码，应用逻辑所在。
      </li>
      <li>
        <strong><code>res/</code></strong>：资源文件，图片、布局、字符串等。
      </li>
      <li>
        <strong><code>assets/</code></strong>：原始资源，不参与资源编译的附加文件（如内置字体、模型）。
      </li>
      <li>
        <strong><code>META-INF/</code></strong>：签名信息，开发者数字签名，<strong>防篡改的关键</strong>。
      </li>
    </ul>
    <p>
      <strong>签名最关键</strong>：APK 携带开发者私钥做的数字签名。系统安装时校验签名，<strong>签名不匹配就拒绝安装</strong>。这也是
      "破解版/改版 APK 容易装不上"的根本原因——改动代码后签名就对不上了。
    </p>

    <h2>三、APK 是怎么"安装"的：三步原理</h2>
    <ol>
      <li>
        <strong>系统校验签名</strong>：确认 APK 由合法开发者签名、未被篡改。
      </li>
      <li>
        <strong>解压并分配应用 ID</strong>：系统给该应用分配一个独立的用户 ID（沙箱）。
      </li>
      <li>
        <strong>登记资源与入口</strong>：把应用图标注册进桌面、资源和组件登记到系统服务。
      </li>
    </ol>
    <p>
      所以"安装"不是"复制文件"，而是<strong>注册进系统</strong>的过程。APK 删除后原文件可以删（安装已登记），
      <strong>但你无法通过"把 APK 拖进某个目录"来安装</strong>——必须走系统安装器。
    </p>

    <h2>四、APK 常见误区，一次澄清</h2>
    <ul>
      <li>
        <strong>误区 1："APK 就是要放到特定文件夹才能装"</strong> → 不用。APK 放哪都能装，关键是要用系统安装器执行，不是复制就行。
      </li>
      <li>
        <strong>误区 2："从手机里删了 APK 文件应用就没了"</strong> → 不会。已安装的应用是独立的，删 APK 源文件不影响已装 App。
      </li>
      <li>
        <strong>误区 3："APK 版本越高越好"</strong> → 不一定。部分设备用新版会闪退，有时需要回退旧版本（回退也要先卸载高版本）。
      </li>
      <li>
        <strong>误区 4："从应用商店下的才是 APK"</strong> → 商店装的应用也是 APK（安装包会缓存或可导出），只是你平时不直接接触它。
      </li>
      <li>
        <strong>误区 5："APK 是病毒文件"</strong> → APK 本身不是病毒，但它<strong>可以</strong>携带恶意代码。真正要防的不是"APK 这个格式"，
        而是<strong>来源不可信的 APK</strong>。
      </li>
    </ul>

    <h2>五、APK 与 XAPK/AAB/安装包派生格式的区别</h2>
    <p>下载站偶尔会看到其他后缀，别搞混：</p>
    <ul>
      <li>
        <strong>XAPK / APKS / AAB</strong>：要么是拆分安装包合集（多 APK 打包），要么是 Google Play 的发布格式（AAB 是给商店打包用的，
        不能直接装）。名字带"XAPK 拆分"的通常需要专门的安装器或用手机上的合包工具处理。
      </li>
      <li>
        <strong>APK 普通安装</strong>：手机上直接用系统安装器装即可。
      </li>
    </ul>
    <p>
      遇到 XAPK/APKS，可以在应用商店搜支持"XAPK 安装"的安装器；但<strong>优先建议直接用官方站或商店的普通 APK</strong>，省去这些麻烦，
      也更安全。
    </p>

    <h2>六、新手安全装 APK 的 3 条铁律</h2>
    <ol>
      <li>
        <strong>只从可信来源装</strong>：官方站、应用商店、开发者官网。镜像站、论坛"热心分享"优先怀疑。
      </li>
      <li>
        <strong>装前看权限</strong>：APK 索要的权限是否合理——手电筒要通讯录，直接放弃。
      </li>
      <li>
        <strong>装完不要急着授权"无障碍/设备管理"</strong>：这两类权限是高危区，给出去之前想清楚。
      </li>
    </ol>
    <p>
      <strong>一句话总结：</strong>APK = 带数字签名的应用安装包，本质是个 ZIP。理解它的结构和签名原理，你就能一眼判断哪些下载站、哪些
      "破解版"值得怀疑，装 APK 自然更安心。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "华为手机装 APK 总提示'不允许安装'该怎么办？",
    answer:
      "九成是系统的'纯净模式/增强防护'在拦截。去 设置 → 系统 → 纯净模式 关闭'增强防护'，然后在点 APK 时选择'允许'该应用安装未知来源应用。两步都做了绝大多数 APK 就能正常装。",
  },
  {
    question: "华为手机上 APK 装好了但打开就闪退/白屏？",
    answer:
      "很可能是该应用依赖 Google Play 服务（GMS）而华为新机默认没有。优先从华为应用市场（AppGallery）装国际版应用，或用 GBox/microG 在壳内运行，实在不行换该应用的官方网页版或免 GMS 版本。",
  },
  {
    question: "鸿蒙和 EMUI 装 APK 的入口一样吗？",
    answer:
      "不完全一样。鸿蒙 4/5 在 设置 → 系统 → 纯净模式；EMUI 12 及以下在 设置 → 安全 → 更多安全设置。找不到就用系统的搜索框搜'纯净模式'，一般能直接跳到对应入口。",
  },
  {
    question: "华为上能装依赖 GMS 的海外应用吗？",
    answer:
      "可以，但有兼容性成本。建议做法是优先用华为应用市场里适配无 GMS 的国际版，其次用 GBox/microG 这类'GMS 替代壳'，最后才考虑改装类方案。纯鸿蒙机型对 GMS 依赖强的 App 兼容性最差。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 到底是什么格式？",
    answer:
      "APK 是 Android 应用安装包（Application Package），本质是一个改了扩展名的 ZIP 压缩包。可以把后缀改成 .zip 用解压软件打开，里面是代码（classes.dex）、资源（res）、清单（AndroidManifest.xml）和防篡改的数字签名（META-INF）。",
  },
  {
    question: "为什么修改版的 APK 常常装不上？",
    answer:
      "因为 APK 带有开发者的数字签名，系统安装时会校验签名。破解/改版把代码改动了，签名就对不上原开发者，系统就会拒绝安装。这也是为什么'打不开的破解版'往往直接报签名错误。",
  },
  {
    question: "删掉手机里的 APK 文件，已安装的应用会消失吗？",
    answer:
      "不会。安装过程是把 APK 解压并注册进系统，完成后 APK 源文件就不再被需要。删除源文件不影响已安装的应用；要卸载必须去系统设置的应用管理里操作。",
  },
  {
    question: "APK、XAPK、AAB 有什么区别？",
    answer:
      "普通 APK 可直接用系统安装器装。XAPK/APKS 是拆分安装包合集，需要专门安装器。AAB 是给 Google Play 商店打包的发布格式，不能直接安装。对普通用户，优先用官方普通 APK 最省事也更安全。",
  },
];

export const zhPosts20260831: BlogPostEntry[] = [
  {
    slug: "huawei-phone-install-apk-method",
    title: "华为手机安装 APK 方法：鸿蒙/EMUI 全流程与'无法安装'排查（2026 实操版）",
    description:
      "华为装 APK 卡住九成是系统纯净模式在拦截。本文按鸿蒙 4/5 和 EMUI 给出完整安装流程：打开纯净模式 + 外部来源授权，并专门讲没 GMS 的华为装依赖谷歌服务的应用怎么处理，附'无法安装'七连排查清单。",
    date: "2026-08-31",
    readTime: "8 min read",
    tags: ["华为", "鸿蒙", "EMUI", "APK", "安装", "无GMS", "排障"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-file-what-is",
    title: "安卓 APK 文件是什么：结构、安装原理与常见误区一次讲透（2026 新手版）",
    description:
      "APK 本质是带数字签名的 ZIP 安装包，靠系统'安装'而不是'复制'生效。本文拆开看 APK 内部结构、讲清安装三步原理、澄清 5 大误区，并区分 XAPK/AAB——新手读懂这一个文件格式，装应用更安全。",
    date: "2026-08-31",
    readTime: "7 min read",
    tags: ["APK", "安卓", "安装包", "签名", "新手入门", "XAPK"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260831List = toList(zhPosts20260831);
