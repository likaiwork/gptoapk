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

const ARTICLE = (
  <>
      <p>&quot;我明明给了定位权限，用了两天又不行了&quot;、&quot;后台老是杀我的下载任务&quot;、&quot;通知开了但又收不到&quot;——这三句话背后是<strong>四个完全不同的机制</strong>在起作用，它们的共同点是：<strong>看起来都像&quot;权限被自动关掉了&quot;，但解决方案毫无交集</strong>。</p>
      <p>网上大量教程把这几件事混成一件事，给出的答案往往是&quot;去设置里重新打开&quot;，治标不治本。这篇按机制拆开讲，每种情况给出可验证的判断方法和根治方案。</p>
      <h2>先分清是四种里的哪一种</h2>
      <p>在动手之前，先用下面这张表定位自己属于哪一类。<strong>误判机制是最常见的时间浪费</strong>。</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">现象</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">真实机制</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">根治难度</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">定位/麦克风/相机授权几天后失效</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Android 11+ 的<strong>权限自动重置</strong></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">一行设置即可关闭</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">后台任务被杀，下载中断</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">厂商省电策略 + 电池优化</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">中等，需逐个白名单</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">通知开关开着但收不到</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">通知渠道被单独关闭 / 免打扰</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">简单，但入口难找</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用被强制下线，要求重新登录</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">OAuth 令牌过期，与权限无关</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">不是权限问题</td></tr></tbody>
      </table></div>
      <p>判断关键：<strong>如果是&quot;完全没反应&quot;，看系统权限；如果是&quot;用着用着断了&quot;，看权限自动重置；如果是&quot;后台任务中断&quot;，看省电策略。</strong></p>
      <h2>第一种：权限自动重置（Android 11 起的系统行为）</h2>
      <p>这是最容易被误认为&quot;手机有 bug&quot;的一种。</p>
      <h3>机制</h3>
      <p>Android 11（API 30）引入了 <strong>permission auto-reset</strong>：对于<strong>长时间未使用</strong>的应用，系统会自动撤销其运行时权限（定位、相机、麦克风、通讯录等），并把权限状态回到&quot;未决定&quot;。</p>
      <p>触发条件（默认值）：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>应用<strong>数月未启动</strong>（Google 官方口径是&quot;几个月&quot;，各 ROM 实际阈值不同，通常在 2–4 个月）</li>
        <li>该权限属于<strong>运行时权限</strong>类别</li>
        <li>用户<strong>没有</strong>将该应用标记为&quot;不自动重置&quot;</li>
      </ul>
      <p>从 Android 13 起，这个行为进一步扩展：<strong>新安装的应用默认关闭通知权限</strong>，且长时间未使用会被自动撤销已授予的权限。</p>
      <h3>为什么感觉像&quot;突然失效&quot;</h3>
      <p>因为触发是静默的。系统不会弹窗告诉你&quot;我已撤销 XX 的定位权限&quot;，你只会在下次打开应用时发现要重新授权——如果应用没有处理&quot;权限丢失&quot;的情况，表现就是<strong>卡在启动页、或者功能模块直接空白</strong>，而不是弹出授权框。</p>
      <h3>怎么验证</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"设置 → 应用 → 特殊应用权限（或\"隐私\"）→ 权限管理 / 自动撤销权限"}</code></pre>
      <p>不同厂商入口名不同：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>原生 / Pixel</strong>：设置 → 应用 → 特殊应用权限 → 暂停未使用的应用活动（Pause app activity if unused）</li>
        <li><strong>小米 MIUI / HyperOS</strong>：设置 → 应用设置 → 应用管理 → 选中应用 → 权限 → 底部&quot;权限自动回收&quot;</li>
        <li><strong>OPPO / 一加 ColorOS</strong>：设置 → 权限与隐私 → 权限管理 → 右上角&quot;自动重置权限&quot;</li>
        <li><strong>vivo OriginOS</strong>：设置 → 应用与权限 → 权限管理 → 自动撤销权限</li>
        <li><strong>华为 HarmonyOS</strong>：设置 → 隐私 → 权限管理 → 右上角设置图标 → 自动撤销授权</li>
      </ul>
      <p>在这里能看到<strong>哪些应用已被自动撤销权限</strong>，这是最直接的证据。</p>
      <h3>根治</h3>
      <p>在同一个页面，把需要的应用加入&quot;<strong>不自动重置</strong>&quot;名单（有的叫&quot;允许一直保留权限&quot;）。一旦加入，系统不再对该应用做权限回收。</p>
      <p>代价很直白：<strong>你放弃了一层安全保护</strong>。建议只对确实需要长期授权的应用（如后台同步类、家庭定位类）放开，其余保持默认。</p>
      <h3>开发侧的正确做法</h3>
      <p>如果你是这个应用的开发者，正确姿态不是让用户去关自动重置，而是<strong>处理权限被撤销的情况</strong>：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"// 启动时检查关键权限是否还在\nif (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)\n        != PackageManager.PERMISSION_GRANTED) {\n    // 不要直接崩溃或空白，引导用户重新授权\n    showPermissionRationale(R.string.need_location_again);\n}"}</code></pre>
      <p>从 Android 11 起，应用还可以主动请求&quot;豁免自动重置&quot;，但<strong>该能力仅对设备管理员、企业配置的应用开放</strong>，普通应用申请会被系统忽略——这一点很多文章写错了。</p>
      <h2>第二种：后台被省电策略杀掉</h2>
      <p>这一类跟权限毫无关系，但用户感知完全一样：<strong>&quot;以前能用，现在用不了了&quot;</strong>。</p>
      <h3>机制</h3>
      <p>国产 ROM 对后台的限制远严于原生 Android。三层限制叠加：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>电池优化（Doze）</strong>：原生机制，长期后台的应用被冻结网络与唤醒</li>
        <li><strong>厂商自启动管理</strong>：应用不被允许自启动，重启手机后不会恢复</li>
        <li><strong>后台弹出界面 / 关联启动限制</strong>：某些 ROM 默认禁止应用间相互唤醒</li>
      </ol>
      <p>对于下载工具、同步工具、VPN 类应用，这三条任意一条生效都足以造成&quot;任务中断&quot;。</p>
      <h3>判断</h3>
      <p>看<strong>电池使用统计</strong>：设置 → 电池 → 耗电排行 → 选中应用，如果显示&quot;<strong>已限制后台活动</strong>&quot;或&quot;<strong>深度睡眠</strong>&quot;，就是这一类。</p>
      <h3>根治（以小米为例，其余品牌逻辑一致）</h3>
      <p>需要同时处理三个地方，缺一个都会复发：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>应用信息 → 省电策略 → 无限制</strong></li>
        <li><strong>应用信息 → 自启动 → 打开</strong></li>
        <li><strong>最近任务 → 卡片下拉 → 锁定</strong>（部分 ROM 需要，防止一键清理时被杀）</li>
      </ol>
      <p>另外，<strong>不要开&quot;省电模式&quot;或&quot;超级省电&quot;</strong>——这两个模式下系统会强制恢复严格限制，你前面所有的白名单都会被临时覆盖。这是&quot;设了又失效&quot;的高频原因。</p>
      <h3>通用排查命令（有 adb 时）</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 查看应用当前的待机分桶（数值越小限制越松）\nadb shell am get-standby-bucket com.example.app\n\n# 把应用加入永不限制的白名单\nadb shell cmd deviceidle whitelist +com.example.app\n\n# 确认白名单已生效\nadb shell dumpsys deviceidle whitelist | grep com.example.app"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">am get-standby-bucket</code> 返回值含义：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">10</code> = active，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">20</code> = working set，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">30</code> = frequent，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">40</code> = rare，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">45</code> = restricted。如果是 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">40</code> 或 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">45</code>，那就是被系统判定为&quot;不常用&quot;，后台必然受限。</p>
      <h2>第三种：通知开关开着但收不到</h2>
      <p>这是用户投诉最多的&quot;伪权限问题&quot;。</p>
      <h3>机制</h3>
      <p>Android 8.0（API 26）起，通知被拆成<strong>通知渠道（Notification Channel）</strong>。应用可以创建多个渠道：消息、推广、后台服务、下载进度……每个渠道可以<strong>独立开关</strong>。</p>
      <p>所以&quot;通知权限已允许&quot;只代表<strong>总闸开着</strong>，具体渠道可能是关的。国产应用常见做法是：默认关闭&quot;营销&quot;类渠道，而用户以为是主通知被关了。</p>
      <p>从 Android 13 起，通知权限本身也变成了运行时权限（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">POST_NOTIFICATIONS</code>），新装应用默认<strong>没有</strong>通知权限，必须显式授予。</p>
      <h3>判断</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"设置 → 应用 → 选中应用 → 通知"}</code></pre>
      <p>这一页会列出<strong>所有渠道及其独立开关状态</strong>。看有没有渠道是关闭的、或者某个渠道被设为&quot;静默&quot;。</p>
      <p>还要检查三个全局开关：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>免打扰（Do Not Disturb）</strong>是否开启</li>
        <li><strong>通知历史</strong>里能否看到这条通知（能看到 = 已发出但被静默；看不到 = 压根没发）</li>
        <li>电池优化是否阻止了应用产生通知（后台被冻结时通知不会产生）</li>
      </ul>
      <h3>根治</h3>
      <p>先确认渠道级开关全开，再看免打扰。如果以上都对但依然收不到，用 adb 直接查系统通知日志：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 查看指定应用的通知记录（需要 Android 11+）\nadb shell dumpsys notification --noredact | grep -A5 com.example.app"}</code></pre>
      <p>如果日志里<strong>完全没有</strong>该应用的通知记录，问题在应用侧（没发），不在系统侧；如果有记录但用户看不到，那就是渠道或免打扰的问题。</p>
      <h3>一个高频陷阱</h3>
      <p>国产 ROM 有&quot;<strong>通知过滤 / 智能通知</strong>&quot;功能，会把判定为&quot;不重要&quot;的通知折叠或直接丢弃。这个开关通常在<strong>通知管理页的底部</strong>，默认开启。关掉它再测一次。</p>
      <h2>第四种：被误认为权限问题的其他原因</h2>
      <h3>令牌过期</h3>
      <p>&quot;应用每隔一段时间就要求重新登录&quot;——这不是权限，是 OAuth access token 到期，刷新令牌也能失效（改密码、异地登录、服务端策略）。表现是<strong>打开应用提示登录页</strong>，而不是某个功能不可用。</p>
      <p>判断方法：看是不是<strong>只有需要登录的模块</strong>失效，本地功能正常。如果是，与系统权限无关。</p>
      <h3>存储权限的作用域变更</h3>
      <p>Android 10 起启用<strong>分区存储（Scoped Storage）</strong>，Android 11 起 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">MANAGE_EXTERNAL_STORAGE</code> 需要上架审核。老应用如果还在用旧的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">READ_EXTERNAL_STORAGE</code> 写法访问任意路径，会表现为&quot;<strong>以前能选的文件夹现在选不了</strong>&quot;。这同样不是&quot;权限被关闭&quot;，而是权限模型换了。</p>
      <h3>双开/分身环境不共享权限</h3>
      <p>用系统分身或第三方双开工具打开的应用，<strong>权限是独立的一套</strong>。主应用授权了，分身往往没有。如果你在分身里遇到&quot;权限丢失&quot;，去分身的管理入口单独授权，而不是在主设置里翻。</p>
      <h2>一张决策流程图</h2>
      <p>按顺序问自己三个问题：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>打开应用时，有没有弹出权限申请框？</strong></li>
      </ol>
      <p>- 有 → 检查是否被自动重置，加白名单</p>
      <p>- 没有 → 进第 2 步</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>功能是&quot;完全没反应&quot;还是&quot;用着用着中断&quot;？</strong></li>
      </ol>
      <p>- 完全没反应 → 检查通知渠道 / 令牌 / 分区存储</p>
      <p>- 用着用着中断 → 检查电池优化与自启动</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>换一台手机 / 换一个账号是否正常？</strong></li>
      </ol>
      <p>- 正常 → 你这台机器的 ROM 策略问题</p>
      <p>- 不正常 → 应用自身或服务端问题</p>
      <h2>最后</h2>
      <p>&quot;权限自动关闭&quot;这四个字，在 90% 的情况下是用户对机制的误读。真正需要动的设置往往只有一处，但因为入口藏在三四层菜单里，用户会在错误的地方反复尝试。</p>
      <p>记一条原则就够：<strong>权限类问题看系统设置，后台类问题看电池策略，通知类问题看渠道开关，登录类问题看令牌。</strong> 四类问题不要混着排查。</p>
      <p>如果你只是想找一个可靠的 APK 下载源，避免从乱七八糟的站点拿到被二次打包的安装包，可以看 <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk.com</a> 上的版本信息与校验方式——很多&quot;权限异常&quot;其实是装错了包，而不是权限真的丢了。</p>
  </>
);

export const zhPosts20261113A = [
  {
    slug: "android-apk-permission-auto-revoked-fix",
    title: "安卓APK权限自动被关闭：为什么授权了还是会失效，以及四种根治方式",
    description: "\"我明明给了定位权限，用了两天又不行了\"、\"后台老是杀我的下载任务\"、\"通知开了但又收不到\"——这三句话背后是四个完全不同的机制在起作用，它们的共同点是：看起来都像\"权限被自动关掉了\"，但解决方案毫无交集。",
    date: "2026-11-13",
    readTime: "8 min read",
    tags: ["android","apk","权限","故障排查"],
    content: ARTICLE,
  },
];

export const zhPosts20261113AList = toList(zhPosts20261113A);
