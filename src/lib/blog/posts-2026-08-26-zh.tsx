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
      联网就能装应用，为什么还要"离线安装包"？很多人觉得 APK 离线包是老古董，其实在今天这个场景反而更刚需：
      <strong>没网的时候、跨设备传应用、绕过某些地区限制、或想装一个"精确版本"的应用</strong>。但"离线安装包"也是乱象重灾区——搜出来的下载站一半是广告农场，一半可能夹带私货。
    </p>
    <p>这篇文章讲透三件事：<strong>什么时候真需要离线 APK、去哪拿才是安全的、以及拿到手后怎么验证它没被动过手脚。</strong></p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>离线安装包的价值在于"一次下载、处处可用"，但它的风险也在"脱离官方渠道"。{" "}
        <strong>来源 + 校验</strong>才是离线包的正确打开方式。
      </p>
    </blockquote>

    <h2>一、什么时候你才真的需要离线安装包？</h2>
    <p>先别急着下载，问自己几个问题。以下几种场景确实需要，其他情况建议直接走官方商店：</p>
    <ol>
      <li>
        <strong>无网或弱网环境</strong>：飞行模式、出差限量流量、办公内网。提前备好常用 App 的离线包，随装随用。
      </li>
      <li>
        <strong>跨设备迁移</strong>：把应用从旧手机搬到新手机/平板，不想每个都重新联网下。
      </li>
      <li>
        <strong>需要特定旧版本</strong>：某些应用新版本反而不好用（广告变多、功能改版），你想保留体验稳定的老版本。
      </li>
      <li>
        <strong>地区限制</strong>：某些应用在你所在地区的商店里搜不到，需要自己装 APK。
      </li>
      <li>
        <strong>企业/内部部署</strong>：给多台设备批量安装同一个应用。
      </li>
    </ol>
    <p>
      <strong>如果你只是图方便、想跳过商店</strong>——劝你三思。官方商店有自动更新、安全检查、隐私说明，离线包这些都没有。只有在上面 5 种场景，离线包的收益才明显大于风险。
    </p>

    <h2>二、安全的离线 APK 从哪里拿？</h2>
    <p>这是最关键的一步。按可信度从高到低排：</p>
    <h3>✅ 第一梯队：官方出品</h3>
    <ul>
      <li>
        <strong>APKMirror</strong>：公认信誉最好，所有文件都做签名校验，提供 SHA-256 哈希，分国家/版本清晰。
      </li>
      <li>
        <strong>APKPure</strong>：老牌，覆盖广，但个别文件是重打包的（签名与原版不同），要格外核对签名。
      </li>
      <li>
        <strong>F-Droid</strong>：开源应用专属，纯开源无广告，最干净。
      </li>
    </ul>
    <h3>✅ 第二梯队：自己提取 + 开发者官网</h3>
    <ul>
      <li>
        <strong>从自己的手机提取</strong>：用 <code>adb</code> 把已安装应用导出来（安全级别最高，就是"官方发给你的那份文件"）。
      </li>
      <li>
        <strong>开发者官网</strong>：很多应用（尤其大厂）官网提供 APK 直链，这是开发者自己发布的，可信。
      </li>
    </ul>
    <h3>❌ 一律避开</h3>
    <ul>
      <li>搜索引擎前几名的"高速下载站"</li>
      <li>弹广告"需要验证码/关注公众号"才能下载的站</li>
      <li>标题写着"Crack/破解/无限金币版"的</li>
      <li>让你先装它自己的"下载器"才能下载的站</li>
    </ul>
    <blockquote>
      <p>判断口诀：<strong>"让我先装个东西才能下载"的，直接走人。</strong></p>
    </blockquote>

    <h2>三、拿到离线包后，装之前必须做的 3 步校验</h2>
    <p>离线包脱离了商店审核，装之前花 2 分钟验证，能避开 95% 的坑：</p>
    <h3>第 1 步：核对包名和版本号</h3>
    <ul>
      <li>安装前看包名（<code>com.xxx.xxx</code>）是否与你想要的应用一致。</li>
      <li>核对版本号是不是你要的那个，别被"最新版"噱头骗了——黑客最爱拿伪装的"最新版"做文章。</li>
    </ul>
    <h3>第 2 步：验证文件签名（SHA-256 / 签名指纹）</h3>
    <ul>
      <li><strong>APKMirror</strong> 等正规站会给 SHA-256 哈希，下载后用工具比对。</li>
      <li>用 <code>apksigner</code>（Android SDK 自带）看签名是否与官方一致，<strong>签名不同 = 文件被改过，直接弃用</strong>。</li>
    </ul>
    <pre><code># 查看 APK 签名指纹
apksigner verify --print-certs app.apk</code></pre>
    <h3>第 3 步：交给 Play Protect / 多引擎扫描</h3>
    <ul>
      <li>装之前在手机里手动触发一次 Google Play Protect 扫描。</li>
      <li>实在不放心，把文件丢到 VirusTotal 上做多引擎检测。</li>
    </ul>
    <p><strong>三条全过再装。</strong> 如果第 2 步签名就不对，后面都不用看了。</p>

    <h2>四、离线包的安装姿势</h2>
    <p>拿到安全的离线包，安装时注意几点：</p>
    <ol>
      <li>
        <strong>开启"允许安装未知来源应用"</strong>：在 设置 → 安全 → 安装未知应用 里，给文件管理器或浏览器单独授权。
      </li>
      <li>
        <strong>安装时看清提示</strong>：系统会显示应用申请的权限，权限明显离谱的（比如一个手电筒要读写通讯录）直接取消。
      </li>
      <li>
        <strong>装完记得收尾</strong>：如果之前为了装包临时放宽了权限，建议装完恢复默认。
      </li>
      <li>
        <strong>分片包（Split APK / XAPK / APKS）</strong>：这类离线包常包含多个文件，安装时要用 <code>adb install-multiple</code> 或对应的安装器，普通双击装不上。APKMirror 和 APKPure 都提供配套安装工具。
      </li>
    </ol>

    <h2>五、离线包的取舍，一句话总结</h2>
    <p>
      <strong>离线安装包是"工具"，不是"捷径"。</strong> 它的正确用法是：在明确需求下，从可信来源拿包，装前做签名+哈希校验，装时看清权限。做到这三点，离线包就是你的随身应用库；做不到，它就是恶意软件的最佳入口。
    </p>
    <p>
      最后记住这条安全铁律：<strong>凡是需要绕过验证、提供"破解版"、或让你先装别的软件才能下载的，都离远点。</strong>{" "}
      正规离线包永远不需要你在"下载"这一步付出额外代价。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      想让手机能装第三方 APK，很多人的第一反应是去设置里"允许未知来源"。但安卓的"安装来源"设置其实比你想的精细得多——{" "}
      <strong>它不是全局开关，而是可以按"来源应用"单独授权</strong>。用对了，你能既方便地装 APK，又不至于把整台手机的安全大门彻底敞开。
    </p>
    <p>
      这篇文章带你彻底搞懂安卓的安装来源机制：<strong>它到底管什么、不同安卓版本在哪设置、怎么按需授权而不是一刀切、以及装完怎么收尾。</strong>
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>安装来源设置的本质是"按来源授权"，不是"全局放开"。{" "}
        <strong>精确授权 + 装完收尾</strong>，才是又方便又安全的正解。
      </p>
    </blockquote>

    <h2>一、"未知来源"到底管的是什么？</h2>
    <p>
      安卓系统默认只允许从 Google Play 商店安装应用。从其他任何渠道（浏览器、文件管理器、聊天软件）装 APK，都需要系统授权。这个"授权"就是<strong>安装来源设置</strong>。
    </p>
    <p>
      <strong>关键认知：它不是全局开关。</strong> 安卓允许你只给"某个应用"（比如 Chrome、文件管理器）放开安装权限，其他应用仍然不能装。这样即使某个来源应用出问题，风险也被限制在它自己身上，而不是整台机器。
    </p>
    <ul>
      <li><strong>未知来源</strong>：非 Play 商店的安装渠道</li>
      <li><strong>来源应用</strong>：发起安装的那个应用（浏览器/文件管理器等）</li>
      <li><strong>按来源授权</strong>：只允许指定的来源应用安装 APK</li>
      <li><strong>全局开关</strong>（旧版）：放开所有非商店来源</li>
    </ul>

    <h2>二、不同安卓版本的设置入口</h2>
    <p>设置路径随安卓版本有差异，但思路一致：</p>
    <h3>Android 8–13（主流）</h3>
    <pre><code>设置 → 应用 → 特殊应用权限 → 安装未知应用</code></pre>
    <p>进去后你会看到一个<strong>应用列表</strong>，每个来源应用旁边都有独立开关。想从 Chrome 装，就给 Chrome 开；想从文件管理器装，就给文件管理器开。</p>
    <h3>Android 7 及以下（旧版）</h3>
    <pre><code>设置 → 安全 → 未知来源（全局开关）</code></pre>
    <p>旧版本是全局开关，开了就等于全放开。<strong>如果你还在用这么老的系统，建议尽快升级</strong>——这套机制太粗糙，安全性差很多。</p>

    <h2>三、正确做法：按需授权，别一刀切</h2>
    <p>这是全文最重要的一节。很多人图省事，直接把所有来源应用全开，等于把安全大门敞开了。正确姿势是<strong>最小授权</strong>：</p>
    <h3>✅ 推荐的授权方式</h3>
    <ol>
      <li>
        <strong>只开你用得到的那一两个来源应用</strong>，比如只给 Chrome 开，其他都保持关闭。
      </li>
      <li>
        <strong>装完立刻关回去</strong>。授权是临时的，不是长期的——装完那个 APK，就把对应来源的开关关掉。
      </li>
      <li>
        <strong>定期检查</strong>。进入"安装未知应用"页面，把不认识的、很久没用的来源应用全部关掉。
      </li>
    </ol>
    <h3>❌ 要避免的错误做法</h3>
    <ul>
      <li>为了装一次包，把<strong>文件管理器 + 浏览器 + 微信 + QQ 全开</strong>。</li>
      <li>开了以后再也不管，让它长期处于放开状态。</li>
      <li>看到"是否允许此应用安装未知应用"弹窗时，不看就直接点允许。</li>
    </ul>
    <blockquote>
      <p>原则一句话：<strong>只在你确实需要的那一刻、给确实用得上的那个来源授权，用完即关。</strong></p>
    </blockquote>

    <h2>四、关于"允许此应用安装未知应用"弹窗</h2>
    <p>当你第一次从某个来源装 APK 时，系统会弹出类似"<strong>是否允许 文件管理器 安装未知应用？</strong>"的提示。这时怎么点？</p>
    <ul>
      <li>
        <strong>确认来源可信</strong>：该来源是你主动用来下载 APK 的工具 → 可以允许（并在装完后回去关掉）。
      </li>
      <li>
        <strong>来源可疑</strong>：比如某个应用想"授权自己安装东西"，但你根本不靠它装 APK → <strong>拒绝</strong>，这往往是恶意软件的试探。
      </li>
    </ul>
    <p>别看到弹窗就条件反射地点"允许"。<strong>这个弹窗是安全边界，不是骚扰。</strong></p>

    <h2>五、装完 APK 后的收尾清单</h2>
    <p>安全不是装完就结束。每次从第三方装完 APK，建议过一遍这 4 步：</p>
    <ol>
      <li>
        <strong>关掉临时开放的安装来源</strong>：回到 设置 → 安装未知应用，把刚才开的开关关回。
      </li>
      <li>
        <strong>手动触发一次 Play Protect 扫描</strong>：应用商店 → Play Protect → 扫描，给刚装的包再做一次体检。
      </li>
      <li>
        <strong>审查权限</strong>：到 设置 → 应用 → 刚装的应用，过一遍它申请的权限，不合理的关掉。
      </li>
      <li>
        <strong>辨认真假图标</strong>：留意桌面是否多了"看起来像系统应用"的陌生图标，那可能是捆绑安装的流氓软件。
      </li>
    </ol>

    <h2>六、进阶：借助 adb 更精准地控制</h2>
    <p>如果你懂一点命令行，<code>adb</code> 能给你更细的控制。比如：</p>
    <pre><code># 只允许 com.chrome 安装未知应用
adb shell appops set com.android.chrome REQUEST_INSTALL_PACKAGES allow

# 查看当前哪些应用有此权限
adb shell cmd appops query-op REQUEST_INSTALL_PACKAGES allow</code></pre>
    <p>这是给进阶用户的选项。普通用户<strong>做好"按需授权 + 用完即关"就够了</strong>，不一定需要 adb。</p>

    <h2>总结</h2>
    <p>安卓安装来源设置，核心就三句话：</p>
    <ul>
      <li><strong>理解本质</strong>：它是"按来源授权"，不是全局开关</li>
      <li><strong>最小授权</strong>：只给用得上的来源开，用完立刻关回</li>
      <li><strong>收尾习惯</strong>：装完关权限 + 触发扫描 + 审查权限</li>
    </ul>
    <p>
      别再"一刀切关闭"了。学会精细授权，你既保留了装第三方 APK 的自由，也守住了手机的安全底线——这才是安卓系统的正确打开方式。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "离线 APK 安装包真的有必要吗？什么时候才需要？",
    answer: "在无网/弱网环境、跨设备迁移、需要特定旧版本、绕过地区限制、或批量内部部署时，离线包确实更有优势。但如果只是图方便想跳过商店，建议还是走官方商店——商店有自动更新、安全检查、隐私说明，离线包这些都没有。",
  },
  {
    question: "从哪些渠道拿离线 APK 最安全？",
    answer: "按可信度排序：APKMirror（签名校验+SHA-256）、APKPure（老牌，但个别文件是重打包的，要核对签名）、F-Droid（纯开源）、开发者官网直链，以及从自己手机上用 adb 提取（最安全）。搜索引擎前几名的“高速下载站”和带破解/无限金币字样的基本都要避开。",
  },
  {
    question: "离线 APK 装之前一定要做哪些校验？",
    answer: "三步：①核对包名和版本号是否一致；②验证签名——用 apksigner 看签名指纹，签名跟官方不一致就说明文件被改过，直接弃用；③交给 Play Protect 或 VirusTotal 多引擎扫描。三条全过再装。",
  },
  {
    question: ".apks / .xapk 这种分片离线包怎么装？",
    answer: "这类离线包常包含多个文件，普通双击装不上。需要用 adb install-multiple 或对应的安装器。APKMirror 和 APKPure 都提供配套的安装工具，按说明操作即可。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "安卓的“安装未知应用”是全局开关吗？",
    answer: "不是。安卓（尤其 Android 8+）把“安装未知应用”做成了按来源应用的精细授权——你可以只给 Chrome 或文件管理器开，其他应用仍然不能装。这样即便某个来源出问题，风险也被限制在它自己身上。",
  },
  {
    question: "为了装 APK，把浏览器、文件管理器、微信全开允许行不行？",
    answer: "不建议。一次性把所有来源应用全开，等于把安全大门彻底敞开。正确做法是最小授权：只开你确实用得到的那一两个来源应用，装完立刻关回去，并定期检查清理不认识的来源。",
  },
  {
    question: "弹窗“是否允许 文件管理器 安装未知应用”该点允许吗？",
    answer: "取决于来源是否可信。如果是你主动用来下载 APK 的工具，可以允许，但装完要回去关掉。如果是一个你没用过、却突然想“授权自己安装东西”的应用，拒绝——这往往是恶意软件的试探。这个弹窗是安全边界，不是骚扰。",
  },
  {
    question: "装完第三方 APK 后还需要做什么收尾？",
    answer: "四步：①关掉临时开放的安装来源开关；②手动触发一次 Play Protect 扫描；③审查刚装应用的权限，不合理的关掉；④留意桌面是否多了“看起来像系统应用”的陌生图标，那可能是捆绑安装的流氓软件。",
  },
];

export const zhPosts20260826: BlogPostEntry[] = [
  {
    slug: "android-apk-offline-install-package-guide",
    title: "安卓APK离线安装包完全攻略：为什么你需要它，以及怎么安全拿到",
    description: "没网、跨设备、要特定旧版本时，离线 APK 安装包很有用。本文讲透什么时候真需要离线包、从哪拿才安全、以及装前怎么用签名+哈希+扫描三步校验，避开广告农场和夹带私货的坑。",
    date: "2026-08-26",
    readTime: "7 min read",
    tags: ["APK", "安卓", "离线安装", "安全下载", "安装教程"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-install-source-settings-guide",
    title: "安卓APK安装来源设置完全指南：别再“一刀切关闭”了",
    description: "安卓的“安装未知应用”不是全局开关，而是按来源应用单独授权。本文讲透它管什么、不同安卓版本在哪设置、怎么按需授权而不是一刀切，以及装完如何收尾，守护手机安全底线。",
    date: "2026-08-26",
    readTime: "8 min read",
    tags: ["APK", "安卓", "安装来源", "权限", "安全"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260826List = toList(zhPosts20260826);
