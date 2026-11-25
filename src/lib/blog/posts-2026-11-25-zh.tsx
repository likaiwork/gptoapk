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

const code = (t: string) => (
  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{t}</code>
);

const th = (t: string) => (
  <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">{t}</th>
);
const td = (t: React.ReactNode) => (
  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">{t}</td>
);

const ARTICLE_472 = (
  <>
    <p>打开任何一篇 APK 安全教程，流程几乎都一样：查来源、验签名、看权限、点安装。做完这四步，很多人长出一口气——「稳了」。</p>
    <p>但真正的风险大头不在这几步里。</p>
    <p>一个被重打包的 APK，签名照样能通过校验（因为攻击者自己签的），权限列表照样看着正常（因为它就是把清单里加了一行你没注意的 {code("READ_SMS")}），安装过程照样顺滑。它的恶意行为要在<strong>装完、给了权限、开始后台运行之后</strong>才慢慢显现。</p>
    <p>所以我一般建议：<strong>安装后留一个 48 小时的观察期</strong>。这篇就是那份观察清单。</p>

    <h2>一、为什么是 48 小时</h2>
    <p>三个原因：</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>恶意逻辑常常延迟触发</strong>——避开「装上就跑」这种一眼假的模式，等到第 2 天、第 3 天才开始联网上报，或者等设备空闲时才干活。</li>
      <li><strong>你会用出问题</strong>——第一小时内你还在兴奋试功能，48 小时里你才会真正感知到「电怎么掉这么快」「怎么突然多了一堆通知」。</li>
      <li><strong>权限变更窗口</strong>——不少流氓应用会在首次启动后请求更新权限，第一次给你看的是「初始权限」，第二次才露出真面目。</li>
    </ol>
    <p>48 小时不是玄学，是一个够短到你能记住、又够长到行为能露头的窗口。</p>

    <h2>二、装完立刻做的 3 件事（0 小时）</h2>
    <h3>1. 截图留存权限清单</h3>
    <p>设置 → 应用 → 该应用 → 权限，<strong>逐项截图</strong>。不是为了现在判断，是为了 48 小时后能对比。</p>
    <h3>2. 记录初始电量基线</h3>
    <p>装之前记一下「待机 8 小时掉多少电」，装之后同一时段再对比。这是最朴素也最有效的恶意检测法。</p>
    <h3>3. 打开流量统计入口</h3>
    <p>记下「设置 → 网络 → 流量使用」里该应用当前已用流量（通常是 0 或几百 KB）。48 小时后回来对一次。</p>

    <h2>三、10 个必看指标（对照表）</h2>
    <p>48 小时内，按这张表逐项打分。<strong>任何一项命中「异常」，记为一次警告；累计 3 次警告，直接卸载。</strong></p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("#")}{th("检查项")}{th("正常表现")}{th("异常信号")}</tr></thead>
      <tbody>
        <tr>{td("1")}{td("待机耗电")}{td("8 小时掉 1–3%")}{td("掉 8% 以上且夜间无操作")}</tr>
        <tr>{td("2")}{td("后台活动")}{td("偶尔唤醒")}{td("每几分钟唤醒一次")}</tr>
        <tr>{td("3")}{td("移动数据")}{td("按使用量")}{td("你没用却在持续上传")}</tr>
        <tr>{td("4")}{td("通知栏")}{td("只有功能相关")}{td("冒出第三方广告/游戏推广")}</tr>
        <tr>{td("5")}{td("权限变更")}{td("无")}{td("出现了装的时候没有的权限")}</tr>
        <tr>{td("6")}{td("电池详情")}{td("占比个位数")}{td("冲进耗电榜前 3")}</tr>
        <tr>{td("7")}{td("发热")}{td("正常")}{td("待机也温热")}</tr>
        <tr>{td("8")}{td("桌面图标变化")}{td("不变")}{td("图标/名称被改了")}</tr>
        <tr>{td("9")}{td("自动启动项")}{td("你不给它就不要")}{td("开机自启且无法关闭")}</tr>
        <tr>{td("10")}{td("卸载测试")}{td("能卸")}{td("卸载按钮灰掉/藏起来")}</tr>
      </tbody>
    </table></div>
    <p>第 10 项尤其关键：<strong>一个能正常卸载的应用，风险至少是可控的；一个藏卸载入口的应用，无论它功能多好用，都该立刻处理。</strong></p>

    <h2>四、几个高频「假警报」，别误伤</h2>
    <p>不是所有异常都是恶意。以下情况先别急着卸载，按注记排查：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>耗电突然变高</strong>：可能是你刚装上，第一次全量同步数据、建索引，正常应用第 2 天就会回落。看第 3 天才下结论。</li>
      <li><strong>流量变大</strong>：检查是不是开了自动备份、自动下载、视频预加载这类功能，手动关掉再观察。</li>
      <li><strong>通知变多</strong>：先到设置里关通知权限，如果关掉还冒出来，那才是问题（说明它在用别的通道）。</li>
    </ul>
    <p>真正的恶意特征往往是<strong>组合出现</strong>：后台唤醒 + 陌生联网 + 通知广告 + 权限暗增，四件事凑到一起，基本可以定案。</p>

    <h2>五、发现可疑时的处置顺序</h2>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>先断网</strong>（飞行模式），切断上报通道；</li>
      <li><strong>撤销高危权限</strong>：短信、无障碍、设备管理、通知使用权，一个一个手动关；</li>
      <li><strong>看它请求了哪些权限</strong>：如果有「设备管理器」被激活，先在设置里取消激活，否则可能卸不掉；</li>
      <li><strong>卸载并清数据</strong>：卸载前先清除应用数据，避免残留配置；</li>
      <li><strong>改密码</strong>：如果它拿过短信/通知权限，把与之相关的账号密码改一遍；</li>
      <li><strong>查同类授权</strong>：去 Google 账号的「第三方授权」页面，看看有没有被顺手授权了别的东西。</li>
    </ol>

    <h2>六、把观察期变成习惯</h2>
    <p>如果你经常侧载 APK，可以把这套流程固化成一个小习惯：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>每周花 5 分钟扫一眼「耗电榜」和「流量榜」，看看有没有陌生应用冲上来；</li>
      <li>每月清一次「不认识的、很久没打开的应用」；</li>
      <li>装任何来源不明的 APK 后，都在日历里挂一个「48 小时后再看一眼」的提醒。</li>
    </ul>
    <p>安全不是一次性验收，而是一个持续的低成本习惯。装完只是开始，48 小时的观察期，才是真正把风险关在门外的那道门。</p>

    <h2>七、速查卡</h2>
    <p><strong>装完 0 小时</strong>：截图权限 → 记电量基线 → 记流量起点<br />
      <strong>装完 24 小时</strong>：对一遍耗电、流量、通知<br />
      <strong>装完 48 小时</strong>：对照 10 项打分 → ≥3 项异常就处置<br />
      <strong>处置顺序</strong>：断网 → 撤权限 → 解设备管理器 → 卸载清数据 → 改密码 → 查第三方授权
    </p>
    <p>延伸阅读：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><Link href="/zh/blog/apk-download-safety-source-trust-tiers" className="text-blue-600 dark:text-blue-400 hover:underline">APK 来源可信度分级判断</Link>：用六级模型代替凭感觉选站</li>
      <li><Link href="/zh/blog/apk-download-safety-full-workflow" className="text-blue-600 dark:text-blue-400 hover:underline">APK 下载安全检测全流程</Link>：从选站到装完的 30 分钟自查</li>
      <li><Link href="/zh/blog/apk-permission-check-malware-detection" className="text-blue-600 dark:text-blue-400 hover:underline">APK 权限检查与恶意检测</Link></li>
    </ul>
  </>
);

const ARTICLE_473 = (
  <>
    <p>「这个 APK 下载站安全吗？」</p>
    <p>这个问题我听过太多次。大家的判断依据五花八门：看界面像不像正规站、看有没有 HTTPS、看评论区好不好、看朋友圈有没有人推荐。这些都不算错，但没有一个是可靠的——<strong>骗子的网站界面往往比官方的还漂亮。</strong></p>
    <p>真正能降低风险的思路，不是「判断一个站安不安全」，而是<strong>把来源分成几个等级，每一级承担不同的使用场景和验证义务</strong>。下面这套分级，是我自己下载时一直在用的。</p>

    <h2>一、为什么「凭感觉」必然失败</h2>
    <p>凭感觉有三个致命问题：</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>界面可以伪造</strong>——一个 200 块买的模板，做得比官方商店还精致。</li>
      <li><strong>一次判断管不了下一次</strong>——你今天确认某站是好的，明天它可能被挂马。</li>
      <li><strong>没有对照标准</strong>——「看起来还行」和「看起来有点怪」，中间没有可操作的分界线。</li>
    </ol>
    <p>分级模型解决的就是这三点：它把模糊的感觉，变成<strong>「我在第几级来源、我该做哪一步验证」</strong>的明确动作。</p>

    <h2>二、六个来源等级</h2>
    <h3>L1：应用商店官方渠道</h3>
    <p>Google Play、App Store、厂商自家商店（华为、小米等）。这是唯一「不验证也能装」的一级——因为平台已做过签名、扫描、上架审核。</p>
    <p><strong>使用场景</strong>：首选。<strong>验证义务</strong>：无。<strong>注意</strong>：能用官方渠道时尽量用，这一步就能挡掉 90% 的风险。</p>

    <h3>L2：开发者官方直发</h3>
    <p>应用官网的下载链接、官方 GitHub Releases、官方 Telegram 频道。这一级可信度仅次于 L1，但要小心<strong>假冒官网</strong>。</p>
    <p><strong>验证义务</strong>：核对域名是否与开发者公开的一致（从维基、官方社媒的置顶链接进，而不是从搜索广告点）。<strong>禁用场景</strong>：无（这是正规离线安装的主渠道）。</p>

    <h3>L3：知名第三方镜像（有明确校验值）</h3>
    <p>比如 APKMirror 这类，会公开包名、版本、SHA-256、签名指纹，与官方一致者多家对比。它们的价值是<strong>提供可核验的数据</strong>。</p>
    <p><strong>验证义务</strong>：下载后必须自行核对 SHA-256 或签名指纹与官方一致。<strong>注意</strong>：镜像的可信来自「可验证」，不是来自「名字知名」。</p>

    <h3>L4：聚合下载站（有版本信息但无校验）</h3>
    <p>提供版本号、文件大小、更新日志，但不给哈希、不给签名指纹。大部分中文 APK 站属于这一级。</p>
    <p><strong>验证义务</strong>：打包比对同类 L2/L3 文件大小与版本号 + 装后 48 小时观察。<strong>禁用场景</strong>：不要用这类站装金融、社交、有支付功能的应用。</p>

    <h3>L5：论坛/网盘/群分享</h3>
    <p>贴吧、TG 群、百度网盘。文件来源不可追溯，谁上传的不知道。</p>
    <p><strong>验证义务</strong>：必须查签名指纹与官方比对，且只用于<strong>无敏感权限的娱乐类应用</strong>。<strong>禁用场景</strong>：任何要求登录、支付、短信、通讯录权限的应用，绝对不要从这里装。</p>

    <h3>L6：来路不明的弹窗/短链</h3>
    <p>「点击下载解锁版」「破解版」「VIP 版」。这类几乎 100% 是重打包。</p>
    <p><strong>验证义务</strong>：不验证，直接放弃。<strong>禁用场景</strong>：全部。</p>

    <h2>三、5 分钟判定表</h2>
    <p>拿不准一个站属于哪级时，问自己五个问题，每题对应加分：</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("问题")}{th("是")}{th("否")}</tr></thead>
      <tbody>
        <tr>{td("是官方商店/官网/官方仓库？")}{td("L1/L2")}{td("继续")}</tr>
        <tr>{td("明确列出 SHA-256 或签名指纹？")}{td("L3")}{td("继续")}</tr>
        <tr>{td("明确列出包名 + 版本号 + 更新时间？")}{td("L4")}{td("继续")}</tr>
        <tr>{td("页面有大量破坏性弹窗或强制下载器？")}{td("L6")}{td("L5")}</tr>
      </tbody>
    </table></div>
    <p>这个表不追求精确，只追求<strong>让你在 30 秒内知道「我该做多少验证」</strong>。</p>

    <h2>四、等级对应的验证动作</h2>
    <p>分级的意义在于：<strong>低一级，多一道验证</strong>。</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>L1</strong>：直接装。</li>
      <li><strong>L2</strong>：核对域名后装。</li>
      <li><strong>L3</strong>：核对哈希/签名后装。</li>
      <li><strong>L4</strong>：核对版本信息 + 装后 48 小时观察。限制：不用于敏感应用。</li>
      <li><strong>L5</strong>：比对官方签名指纹后装，只用于娱乐应用。</li>
      <li><strong>L6</strong>：不装。</li>
    </ul>
    <p>如果一道验证都做不了（没有哈希、没有签名、没有官方版本可比对），那这个文件的可信度就等同于 L6——<strong>无法验证的，就等于不可信</strong>。</p>

    <h2>五、一个常被忽略的关键点</h2>
    <p>很多人以为「HTTPS = 安全」。不对。HTTPS 只保证<strong>你和这个站之间传输没被窃听</strong>，保证不了<strong>这个站给你的文件是好的</strong>。一个用 HTTPS 的野鸡站，照样能把重打包的恶意 APK 塞给你。</p>
    <p>同样，「有几十万下载量」也不等于安全——下载量可以刷，文件可以是后来才换的。</p>
    <p>真正可靠的只有一件事：<strong>你手上有官方给出的比对基准（哈希或签名指纹），并且你实际比对过。</strong></p>

    <h2>六、把分级用在真实场景</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>想装一个国外常用 App，本地商店没有</strong> → L2 找官网，装不上再走 L3 镜像，核对哈希。</li>
      <li><strong>想要一个旧版本</strong> → 优先 L3（有历史版本 + 校验值），避免 L4/L5。</li>
      <li><strong>群里有人发了「解锁版」</strong> → 这就是 L5/L6，除非你能验证签名与官方一致，否则不用于任何登录类应用。</li>
      <li><strong>只想试试某个小众工具</strong> → L4 可以接受，但要接受「不用于支付/敏感」的边界。</li>
    </ul>

    <h2>七、一句话总结</h2>
    <p><strong>别问「这个站安全吗」，问「它属于第几级，我该做哪一步验证」。</strong> 把判断标准化，风险就从「玄学」变成了「可执行的动作」。你不需要记住一堆网站好坏，只需要记住这六级和对应的验证义务。</p>
    <p>延伸阅读：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><Link href="/zh/blog/apk-post-install-48-hour-audit" className="text-blue-600 dark:text-blue-400 hover:underline">APK 安装后 48 小时审计</Link>：装完不是终点</li>
      <li><Link href="/zh/blog/apk-download-safety-full-workflow" className="text-blue-600 dark:text-blue-400 hover:underline">APK 下载安全检测全流程</Link>：四阶段实操清单</li>
      <li><Link href="/zh/blog/apk-signature-verification-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名验证失败怎么修</Link></li>
    </ul>
  </>
);

export const zhPosts20261125 = [
  {
    slug: "apk-post-install-48-hour-audit",
    title: "APK 安装后 48 小时审计：装完不是终点，是观察期的起点",
    description: "绝大多数 APK 安全教程到「装好了」就结束了。但真正会咬人的恶意行为——后台偷跑、悄悄联网、权限暗改、广告注入——都在安装后 48 小时才现形。本文给出一份装完之后照着做就行的观察清单：装完 0 小时必做的 3 件事、10 个必看指标对照表、高频假警报辨别，以及什么时候该立刻卸载。",
    date: "2026-11-25",
    readTime: "12 min read",
    tags: ["APK安全", "安装后审计", "恶意检测", "安卓排查"],
    content: ARTICLE_472,
  },
  {
    slug: "apk-download-safety-source-trust-tiers",
    title: "APK 下载安全检测：用「来源可信度分级」代替凭感觉判断",
    description: "「这个网站靠谱吗？」凭感觉永远答不准。更靠谱的做法是把 APK 来源做成一个可打分的分级模型：从官方直发到野鸡论坛共 6 级，每一级对应明确的验证义务和禁用场景。配上 5 分钟判定表，让你下次下载前不用纠结。",
    date: "2026-11-25",
    readTime: "11 min read",
    tags: ["APK安全", "下载来源", "可信度分级", "侧载风险"],
    content: ARTICLE_473,
  },
];

export const zhPosts20261125List = toList(zhPosts20261125);
