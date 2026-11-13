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
      <p>装好一个 APK，图标正常、能启动、账号也能登录，唯独去开「无障碍服务」时开关是灰的，旁边写着「出于安全考虑，无法使用此设置」。换一个文件管理器重装、清缓存、重启手机都没用——<strong>这不是安装包损坏，也不是你下错了版本</strong>，而是 Android 从 13 开始引入的一道独立门槛。</p>
      <p>网上多数教程把这件事和「未知来源」「权限被自动关闭」混在一起讲，结果给出的步骤全在错误的地方打转。这篇按机制拆开，先给判断表，再给可验证的解除路径。</p>
      <h2>先分清：你遇到的是哪一种「开不了」</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">现象</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">真实机制</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">该去哪里解决</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">安装时就提示「禁止安装未知来源应用」</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">安装来源权限（REQUEST_INSTALL_PACKAGES）</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">设置 → 特殊应用权限 → 安装未知应用</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">装完几天后定位、相机授权失效</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Android 11+ 权限自动重置</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用详情 → 权限 → 关闭「自动撤销权限」</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">通知开关开了却收不到</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">通知渠道被单独关闭 / 厂商省电策略</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用通知设置、电池优化白名单</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>无障碍、通知读取权限开关置灰，提示安全限制</strong></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>受限设置（Restricted Settings）</strong></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>应用详情 → 允许受限设置</strong></td></tr></tbody>
      </table></div>
      <p>最后一行才是本文主题。它的关键特征是：<strong>应用已经装好且能正常运行，只有高敏感权限被系统单独锁死</strong>。</p>
      <h2>受限设置到底锁的是什么</h2>
      <p>无障碍服务（AccessibilityService）能读取屏幕上的全部文字、监听每一次点击，甚至代替用户完成操作。这个能力原本是给读屏等辅助功能用的，也是恶意应用最想要的权限之一：一旦骗到授权，就能窃取验证码、自动点掉确认框、劫持支付流程。</p>
      <p>Android 13 起，系统会记录每个应用的<strong>安装来源</strong>。通过 Play 商店等受信任安装器装入的应用走正常流程；通过浏览器下载、文件管理器点击、ADB 侧载装入的 APK，则被标记为来自「非受信任来源」。对这类应用，系统默认禁用以下设置项的开关：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>无障碍服务的开启开关</li>
        <li>通知访问权限（Notification Listener）</li>
        <li>部分 ROM 上的「使用情况访问」「悬浮窗」联动授权</li>
      </ul>
      <p>界面表现就是开关灰掉、点不动，或者点击后弹出「出于安全考虑，无法使用此设置」。<strong>应用本身没有报错，日志里也看不到异常</strong>，所以很多人误以为是 APK 版本不兼容。</p>
      <p>需要强调：这个限制与 APK 有没有病毒、有没有签名验证无关。哪怕是官方原版、签名完全正确的包，只要是侧载进来的，一样会被锁。</p>
      <h2>解除步骤（通用路径）</h2>
      <p>以 Android 14/15/16 原生界面为准，国产 ROM 入口名称略有差异：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>先启动一次目标应用</strong>。部分系统在应用从未启动时不会显示「允许受限设置」菜单，这一步不能跳。</li>
        <li>打开 <strong>设置 → 应用 → 应用管理</strong>，找到该应用。</li>
        <li>点右上角 <strong>⋮（更多）</strong>，找 <strong>「允许受限设置」/ Allow restricted settings</strong>。</li>
        <li>按提示完成锁屏密码或生物识别验证。</li>
        <li>回到 <strong>设置 → 辅助功能（无障碍）→ 已下载的服务</strong>，此时目标应用的开关应当可以正常打开。</li>
      </ol>
      <p>如果第 3 步找不到菜单，按下面顺序排查：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>换用系统的「应用详情」入口，而不是第三方管家类应用提供的页面；</li>
        <li>在设置顶栏搜索「受限」或 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">restricted</code>；</li>
        <li>确认系统版本 ≥ Android 13（Android 12 及以下没有该机制，置灰是别的原因）；</li>
        <li>检查是不是<strong>工作资料 / 多用户空间</strong>里的应用，需要在对应空间的应用详情里操作。</li>
      </ul>
      <h2>常见失败原因对照表</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">现象</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">原因</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">处理</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">菜单项根本不出现</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用从未启动，或 ROM 隐藏了该入口</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">先启动一次；用设置搜索；部分品牌需在「特殊应用权限」里找</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">允许之后开关仍是灰的</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用被设备管理器 / MDM 策略约束</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">检查「设备管理器应用」；公司设备通常无法自行解除</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">打开无障碍后立即被系统关掉</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">厂商省电策略或安全软件拦截</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">加入电池优化白名单，检查手机管家</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换了个 APK 版本就不灰了</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">新版本降低了 targetSdk 或不再声明该服务</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">这属于绕开机制，不建议依赖</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">ADB 安装也灰</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">ADB 同样属于非受信任安装器</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">走同一解除流程即可</td></tr></tbody>
      </table></div>
      <p><strong>公司托管设备（MDM / 工作资料）是硬边界</strong>：策略由管理员下发，本地没有任何菜单可以覆盖，不要浪费时间尝试各种「破解」教程。</p>
      <h2>解除之前必须做的三件安全确认</h2>
      <p>把无障碍权限交给一个侧载应用，等于把屏幕内容和点击能力交给它。解除限制前建议花两分钟确认：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>来源</strong>：优先从应用官网或 Google Play 官方页面取包。用 <a href="https://www.gptoapk.com/zh" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk</a> 这类工具时，确认拿到的是与官方一致的原始文件，而不是被二次打包的修改版。</li>
        <li><strong>签名</strong>：比对开发者公开的签名证书指纹。<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner verify --print-certs app.apk</code> 可以读出签名信息，与旧版本或官方公布值对照。</li>
        <li><strong>权限清单</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump permissions app.apk</code> 看它申请了哪些权限。一个「清理加速」工具却申请读取短信、绑定设备管理器，本身就不合理。</li>
      </ol>
      <p>如果这三步里有任何一项对不上，就不要解除受限设置——这道门槛正是在保护你。</p>
      <h2>常见问题</h2>
      <h3>解除受限设置会影响系统保修或触发安全警告吗？</h3>
      <p>不会。这是系统提供给用户的正常开关，只是藏得比较深。但部分手机管家会在开启无障碍后给出风险提示，属于提醒性质。</p>
      <h3>为什么 Play 商店装的同款应用不需要这一步？</h3>
      <p>因为受信任安装器已经完成了应用来源与开发者身份的校验，系统不再额外限制高敏感权限。这也是「同一个应用，商店版能用、侧载版用不了」的根本原因。</p>
      <h3>每次更新 APK 都要重新解除吗？</h3>
      <p>覆盖安装（相同签名）通常保留该标记；卸载重装、换签名、换安装来源则需要重新操作一次。</p>
      <h3>有没有不改系统设置就能用无障碍的替代方案？</h3>
      <p>取决于需求。自动化点击类需求可以看看应用是否提供基于 ADB 授权的桌面端方案；读屏类需求建议直接使用商店版。绕过系统限制的做法往往在下次安全补丁后就失效。</p>
      <h2>小结</h2>
      <p>「无障碍开关置灰」是一个<strong>安装来源问题</strong>，不是安装包问题。判断顺序是：应用能装 → 应用能跑 → 只有高敏感权限灰掉 → 走「应用详情 → 允许受限设置」。解除之前先确认来源、签名和权限清单，把这道系统保护用在值得信任的应用上。</p>
      <p>需要重新下载一份干净的官方 APK 时，可以在 <a href="https://www.gptoapk.com/zh" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk</a> 搜索应用名或直接粘贴 Google Play 链接，拿到文件后再按上面的流程做校验。</p>
  </>
);

export const zhPosts20261113D = [
  {
    slug: "apk-accessibility-grayed-out-fix",
    title: "侧载 APK 后无障碍权限置灰：Android 受限设置是什么，怎么正确解除",
    description: "侧载安装的 APK 打开无障碍服务时开关是灰的，提示「出于安全考虑，无法使用此设置」？这是 Android 13 起的受限设置机制，不是安装包坏了。本文讲清触发条件、解除路径和各品牌差异。",
    date: "2026-11-13",
    readTime: "6 min read",
    tags: ["侧载APK","无障碍权限","受限设置","故障排查","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261113DList = toList(zhPosts20261113D);
