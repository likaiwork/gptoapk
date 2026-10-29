import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
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

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么浏览器提示下载完成，但文件管理器里找不到 APK？",
    answer:
      "最常见的原因是文件落在了浏览器私有目录或 App 自己的接收目录里。Android 11 起，普通文件管理器看不到 Android/data 目录，所以文件其实还在，只是被系统隐藏了。用 MT管理器 或 Termux 进 /sdcard/Android/data/ 就能找到。",
  },
  {
    question: "下载完自动跳转安装，装完安装包就不见了，是正常的吗？",
    answer:
      "很多第三方应用市场默认「安装后自动删除安装包」来释放空间，这是设计行为，不是文件丢失。想留备份的话，在对应市场的设置里关掉该选项，装完后把 APK 复制到电脑或网盘保存。",
  },
  {
    question: "手机上没有 root，怎么全盘搜索 APK 文件？",
    answer:
      "用 Termux 执行 find /sdcard -name \"*.apk\" -mmin -60 2>/dev/null，可以按修改时间找出最近一小时的 APK。没有 Termux 就用支持全盘索引的文件管理器（Material Files、Solid Explorer、MT管理器），按时间排序看最新文件。",
  },
  {
    question: "文件确实不存在，可能是什么原因？",
    answer:
      "四个高频原因：存储空间不足导致写入被静默中止；国产 ROM 的安全中心把 APK 判定为风险文件直接删除并放进隔离区；浏览器开了「仅 Wi-Fi 下载」在切到流量后被挂起；文件落到了 SD 卡而你只翻了内部存储。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "只看权限和网络地址，不做反编译够不够判断一个 APK 安全不安全？",
    answer:
      "对绝大多数场景够用。用 aapt2 dump badging 看权限，配合 mitmproxy 看它实际连哪些域名，能覆盖大部分风险。反编译主要是想知道「它怎么实现的」时才需要，成本高很多，判断安全性用不着下那么深。",
  },
  {
    question: "jadx 反编译出来的代码为什么看起来不完整？",
    answer:
      "两个原因：一是代码被混淆（类名变成 a.b.c），二是应用带加固壳。判断有没有壳可以解压后看 lib/arm64-v8a/ 下的 .so 文件名，出现 libjiagu、libshella、libDexHelper 这类名称就是加固过的，jadx 只能解出壳的外层代码。",
  },
  {
    question: "有加固壳的 APK 是不是就是恶意软件？",
    answer:
      "不是。银行、游戏、政务类正规应用几乎都会加固。加固只说明厂商在防逆向，不代表恶意。判断恶意要看权限与功能是否匹配、有没有未声明的数据外传、签名来源能不能追溯，单看一个特征误判率很高。",
  },
  {
    question: "apktool 改完资源后打包，为什么装不上？",
    answer:
      "因为重打包会改变签名，新签名与原版不同，系统拒绝覆盖安装。需要先用自己生成的 keystore 重新签名（apksigner sign），并且必须先卸载原版才能装。改包自用可以，但无法再用官方渠道更新。",
  },
];

const ARTICLE1 = (
  <>
    <h1>APK 下载后找不到文件：六个真实位置和一条排查路径</h1>

    <p>
      浏览器提示「下载完成」，你去文件管理器里翻，Downloads 文件夹是空的。或者明明看到了安装界面，回头再想找那个文件，死活找不到。这个问题比想象中常见，而且原因往往不是「文件消失了」，而是文件去了你没在看的那个位置。
    </p>

    <p>
      下面按出现频率从高到低列六个真实位置，再给一条从零到定位的排查路径。核心结论：安卓上的「下载」至少有六个落点——系统
      Downloads、浏览器私有目录、微信/QQ 的接收目录、应用商店缓存、外置 SD 卡，以及「通知栏打勾但从没落盘」的临时任务。
    </p>

    <h2>一、六个真实位置，按概率排序</h2>

    <p>
      <strong>1. 系统 Downloads 目录</strong>（<code>/sdcard/Download</code>）。Chrome、Firefox 和绝大多数浏览器原生下载都往这里写。小米、OPPO、vivo
      的文件管理会把它合并成「下载」分类入口，容易误以为不存在。
    </p>

    <p>
      <strong>2. 浏览器私有目录。</strong>Chrome 的下载任务记录在 <code>Android/data/com.android.chrome/files/Download/</code>
      。问题在于 Android 11 起普通文件管理器看不到 <code>Android/data</code>，你以为文件没了，其实它在，只是被系统藏了。判断方法：打开
      Chrome → 下载内容，文件名能点开说明还在，显示「文件不存在」才是真删了。
    </p>

    <p>
      <strong>3. 微信 / QQ / 钉钉的接收目录。</strong>在 App 里点「下载」会落到各自私有目录，比如微信的{" "}
      <code>Android/data/com.tencent.mm/MicroMsg/Download/</code>。正规做法不是翻目录，而是在会话里打开「文件」列表，长按 → 用其他应用打开。
    </p>

    <p>
      <strong>4. 第三方市场或清理类的缓存区。</strong>很多市场先下载到自己的缓存目录再弹安装，装完自动删掉安装包释放空间——这是「装完就找不到」最常见的原因。
    </p>

    <p>
      <strong>5. 外置 SD 卡。</strong>插了 SD 卡时，默认下载位置可能还停在旧设置上。文件管理器的「内部存储」和「SD 卡」是两个独立入口。
    </p>

    <p>
      <strong>6. 通知栏里的「假完成」。</strong>任务打勾但实际写盘失败（空间满、权限被拒、被安全软件拦截），文件列表里有记录，磁盘上没有文件。
    </p>

    <h2>二、一分钟定位：用搜索代替翻文件夹</h2>

    <p>
      不要一个个目录点。直接用支持全盘搜索的工具。系统文件管理器搜不到时，换成能访问 <code>Android/data</code> 的：
      Material Files、Solid Explorer、MT管理器。
    </p>

    <p>有 Termux 的话一条命令就能定位，无需 root：</p>

    <pre>
      <code>find /sdcard -name &quot;*.apk&quot; -mmin -30 2&gt;/dev/null{`\n`}find /sdcard -name &quot;*.apk&quot; -size +10M 2&gt;/dev/null</code>
    </pre>

    <p>
      <code>2&gt;/dev/null</code> 用于屏蔽无权限目录的报错。这条命令基本能一次找到，比手动翻快得多。
    </p>

    <h2>三、如果确实没有文件：四个原因</h2>

    <ul>
      <li>
        <strong>存储空间不足，写入被静默中止。</strong>剩余空间低于 1GB 时，大体积 APK（游戏动辄 1.5GB 以上）极可能写入失败。
      </li>
      <li>
        <strong>安全软件拦截。</strong>国产 ROM 的「应用安全检测」判定风险时可能直接删除文件，通知很容易被忽略。去隔离区看看。
      </li>
      <li>
        <strong>浏览器没开「下载前询问保存位置」。</strong>打开后每次下载都能明确知道落到哪。
      </li>
      <li>
        <strong>「仅 Wi-Fi 下载」在切流量后被挂起。</strong>下载列表里会显示已暂停，点继续即可。
      </li>
    </ul>

    <h2>四、避免下次再找不到：三条设置</h2>

    <ol>
      <li>Chrome → 设置 → 下载，固定保存位置为 Download，并打开「下载前询问」</li>
      <li>第三方市场的设置里关掉「安装后自动删除安装包」，装完的包就是你的备份</li>
      <li>重要 APK 复制到电脑或网盘，手机清理一次垃圾几十个安装包全没的情况太常见</li>
    </ol>

    <h2>五、特殊情况：文件在但装不上</h2>

    <p>
      如果你能找到文件、点开却提示「解析包出错」或「应用未安装」，那不是「找不到文件」的问题，而是文件损坏或不兼容。「解析包出错」多半是下载不完整，重下并做一次 SHA-256
      校验；「应用未安装」通常是签名冲突、存储不足或架构不匹配（比如只有 arm64 包而设备是 armeabi-v7a）。
    </p>

    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      从源头避免这类问题：通过{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      直接从 Google Play 提取安装包，签名与官方一致、版本与架构自动匹配，不会出现「下错了包」导致的安装失败。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>APK 反编译分析工具怎么选：按你要回答的问题挑工具</h1>

    <p>
      反编译工具最大的坑不是「工具不会用」，而是拿错工具去回答错的问题。想看接口和逻辑，却打开了资源提取器；想确认有没有后门，却在读混淆过的
      Smali 代码，看了三小时一无所获。
    </p>

    <p>
      这篇按「你要回答什么问题」来组织工具选型。核心判断：反编译是四个不同层面的活——资源层、字节码层、原生层、行为层。选工具前先想清楚你在哪一层，能省掉大部分无用功。
    </p>

    <h2>一、先分清四个层面</h2>

    <ul>
      <li>
        <strong>资源层</strong>：用了什么权限、有哪些字符串、图标布局长什么样 —— apktool、jadx 资源视图
      </li>
      <li>
        <strong>字节码层</strong>：代码逻辑、调用链、网络域名、加密方式 —— jadx、apktool + Smali
      </li>
      <li>
        <strong>原生层</strong>：核心逻辑是否在 .so 里、有没有加固壳 —— Ghidra、IDA、radare2
      </li>
      <li>
        <strong>行为层</strong>：运行时实际读了什么、连了哪里 —— Frida、mitmproxy、MobSF
      </li>
    </ul>

    <p>
      绝大多数分析需求，到字节码层就够了。只有遇到自带加固壳、或核心算法用 C 实现的应用，才需要下到原生层——那已经是逆向工程的量级，不是「看看这个
      APK 安不安全」该投入的成本。
    </p>

    <h2>二、问题一：申请了什么权限、包含什么组件</h2>

    <p>这是最快的检查，不需要真正的反编译。Android SDK 自带两个命令：</p>

    <pre>
      <code>aapt2 dump badging app.apk{`\n`}apkanalyzer manifest print app.apk</code>
    </pre>

    <p>装应用前跑一次这个，比装完再用安全软件扫更有效。重点看几组组合：</p>

    <ul>
      <li>
        <code>READ_SMS</code> / <code>RECEIVE_SMS</code> 与其他权限的组合
      </li>
      <li>
        <code>SYSTEM_ALERT_WINDOW</code>（悬浮窗）加无障碍服务——这是恶意软件的经典配置
      </li>
      <li>
        <code>REQUEST_INSTALL_PACKAGES</code>——能静默装别的应用
      </li>
      <li>一个手电筒应用要 <code>READ_CONTACTS</code>，直接放弃</li>
    </ul>

    <h2>三、问题二：代码到底在干什么</h2>

    <p>jadx 是首选，直接把 DEX 反编译成近似 Java 源码，图形界面支持全文搜索：</p>

    <pre>
      <code>jadx -d out/ app.apk{`\n`}jadx -j 8 -d out/ app.apk</code>
    </pre>

    <p>几个实用的搜索词：</p>

    <ul>
      <li>
        搜 <code>http://</code> 和 <code>https://</code>，立刻看出它连哪些服务器
      </li>
      <li>
        搜 <code>getDeviceId</code>、<code>getImei</code>，看有没有采集设备标识
      </li>
      <li>
        搜 <code>DexClassLoader</code>、<code>PathClassLoader</code>，动态加载代码是重要可疑信号
      </li>
      <li>
        搜 <code>Runtime.exec</code>、<code>ProcessBuilder</code>，看有没有执行 shell 命令
      </li>
    </ul>

    <p>
      遇到强混淆或加固壳时别硬啃，换成 Bytecode Viewer 把同一个 APK 交给 jadx、Procyon、CFR 三个引擎对比——某个引擎解不出的方法，另一个往往能解出来。
    </p>

    <h2>四、问题三：是不是有壳</h2>

    <p>
      如果 jadx 出来的代码只有寥寥几个类，大量 native 方法，或者一打开就看到 <code>StubApp</code>、{" "}
      <code>libjiagu</code>、<code>libDexHelper</code> 这类字符串，那就是加固壳。解压后看 .so 文件名可以判断加固类型：{" "}
      <code>libjiagu</code> 是 360 加固，<code>libshella</code> 是腾讯乐固，<code>libDexHelper</code> 是梆梆，{" "}
      <code>libnesec</code> 是网易易盾。
    </p>

    <p>
      对安全评估这个目的来说，有壳本身是信号但不等于恶意。实用判断路径：有壳 + 来源不明 + 权限可疑 → 不要装；有壳 + 知名厂商 + 正常权限 →
      正常，不必继续拆；确实要分析逻辑 → 这已经是专业逆向范畴，需要脱壳工具链，成本和收益要重新评估。
    </p>

    <h2>五、问题四：运行时它到底做了什么</h2>

    <p>静态分析看不到动态加载的代码、解密后的字符串、运行时才拼出来的域名。这时候需要行为层观察。</p>

    <p>
      用 mitmproxy 抓网络请求，能看到它请求哪些域名、上传了什么参数；用 Frida hook 关键函数，能看加密前的明文；用 MobSF
      一体化出报告，自动分析权限、签名、硬编码密钥和证书固定检测。如果只是想快速判断一个来路不明的 APK 有没有问题，MobSF 是投入产出比最高的选择。
    </p>

    <h2>六、按目的推荐组合</h2>

    <ul>
      <li>装之前快速过一遍：aapt2 dump badging + 签名校验，2 分钟</li>
      <li>确认是不是官方包：apksigner verify --print-certs 比对指纹，1 分钟</li>
      <li>找域名/密钥/可疑 API：jadx-gui 全局搜索，15 分钟</li>
      <li>完整安全评估：MobSF 静态报告 + mitmproxy 网络行为，30 分钟</li>
      <li>改资源去广告：apktool 解包改资源 → 重打包 → 重新签名</li>
      <li>分析核心算法：jadx + Ghidra/IDA，数小时起</li>
    </ul>

    <h2>七、几条实操提醒</h2>

    <p>
      反编译出来的代码是「近似还原」，泛型、lambda、内联方法在还原中会丢失或变形，别把每个细节都当事实。重打包的 APK
      签名必然变化，无法覆盖安装官方版本，也不能用官方渠道更新。只在隔离环境分析可疑样本，不要在日常主力机上装来路不明的 APK。
    </p>

    <p>
      最重要的是结论要区分「可疑」和「恶意」。加固、动态加载、采集设备信息，在商业应用里都是常规操作。判断恶意要看权限与功能是否匹配、是否有未声明的数据外传、签名来源是否可追溯。
    </p>

    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      如果不想每次都自己做签名比对和权限审查，用{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      从 Google Play 直接提取原版安装包，签名与官方一致，省掉反编译验证那一步。
    </p>
  </>
);

export const zhPosts20261029: BlogPostEntry[] = [
  {
    slug: "apk-download-file-not-found-locations",
    title: "APK 下载后找不到文件：六个真实位置和一条排查路径",
    description:
      "浏览器提示下载完成，文件管理器里却是空的。安卓的「下载」至少有六个落点：系统 Downloads、浏览器私有目录、微信 QQ 接收目录、应用商店缓存、外置 SD 卡，以及没落盘的假完成任务。给出各位置的精确路径、Termux 全盘搜索命令、以及真找不到时的四个原因。",
    date: "2026-10-29",
    readTime: "9 min read",
    tags: ["android", "apk", "文件管理", "排查"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-decompile-analysis-tools-selection",
    title: "APK 反编译分析工具怎么选：按你要回答的问题挑工具",
    description:
      "反编译分四个层面：资源、字节码、原生、行为。按问题选工具：看权限用 aapt2，读逻辑用 jadx，判断有没有加固壳看 lib 目录的 .so 名称，看真实行为用 MobSF 加 mitmproxy。附各目的的工具组合与时间成本对照。",
    date: "2026-10-29",
    readTime: "10 min read",
    tags: ["android", "apk", "反编译", "安全"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261029List = toList(zhPosts20261029);
