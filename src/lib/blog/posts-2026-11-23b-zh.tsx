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
      <p>网上下载的 APK 到底安不安全？大部分人的做法是「传到 VirusTotal 传一遍」，或者装个手机安全软件点个「立即扫描」。这两种做法都有明显短板：在线查毒平台对侧载包（尤其是改过签名的）覆盖并不完整，很多小体积的广告插件、灰色 SDK 根本不在特征库里；而手机品牌自带的「安全中心」很多时候只检查安装来源和市场白名单，装完就说「已保护」，实际什么都没查。</p>
      <p>真正可靠的路径其实是<strong>在安装之前，用本机工具把包拆开看一眼</strong>。这条路不需要装任何第三方软件，靠的是 Android 自带的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">unzip</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> 加上几条 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb</code> 命令，大约 10 分钟就能对「这个包想干什么」有一个大概把握。</p>
      <p>本文给出一套可以照抄的本机扫描流程，重点是<strong>判断标准</strong>，而不是命令本身。</p>
      <h2>一、这套扫描能查到什么、查不到什么</h2>
      <p>先说清楚边界，免得误判：</p>
      <p><strong>能查到：</strong></p>
      <ul className="list-disc pl-6 space-y-1">
        <li>包是不是真的来自它声称的开发者（签名与证书信息）</li>
        <li>申请了哪些高危权限（读短信、无障碍、通知读取、悬浮窗、设备管理等）</li>
        <li>有没有从网络下载 dex / so 并动态加载的迹象</li>
        <li>是否内置了已知的广告或统计 SDK（按类名/资源特征）</li>
        <li>组件是否可以被外部应用随意拉起（导出组件多了，往往意味着有推送或广告行为）</li>
      </ul>
      <p><strong>查不到：</strong></p>
      <ul className="list-disc pl-6 space-y-1">
        <li>服务器端下发的行为（例如装完后才拉取恶意模块）</li>
        <li>加壳 / 混淆后的真实逻辑（只能看到「有壳」，看不到壳里是什么）</li>
        <li>零日漏洞</li>
      </ul>
      <p>所以这套流程的定位是<strong>降低风险，不是保证安全</strong>。它对「粗制滥造的山寨包」「偷偷申请短信权限的盗版包」非常有效；对精心制作的多阶段木马会失效。</p>
      <h2>二、动手前的准备</h2>
      <p>在电脑上装好 Android SDK 的 platform-tools 与 build-tools（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> 都在这两个包里），然后确认：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb version\naapt version\napksigner --version"}</code></pre>
      <p>如果不想装 SDK，Linux/macOS 上也能用系统包管理器单独装 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apktool</code> 等工具；但<strong>签名校验建议用官方 `apksigner`</strong>，第三方工具在某些 v3/v4 签名上会报误判。</p>
      <h2>三、第一步：查签名，确认来源</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify --print-certs app.apk"}</code></pre>
      <p>重点看输出的 <strong>Signer #1 certificate DN</strong> 和 <strong>SHA-256 digest</strong>。</p>
      <p>判断标准：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>证书 DN 里出现的是公司名（如 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">CN=Google Inc.</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">CN=Tencent</code>）且与官方一致 → 来源靠谱</li>
        <li>显示为 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">CN=Android Debug</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Unknown</code>、或者一串随机字符 → 要么是重打包，要么是个人开发的小工具，风险显著上升</li>
        <li><strong>同样的应用，两个渠道下载的包签名 SHA-256 不一致</strong> → 至少有一个被改过，绝不能两个都装</li>
      </ul>
      <p>一个特别有效的技巧：直接拿 Google Play 上的官方包和手上这个包做对比。签名一致，即使是从第三方站下的，内容也大概率是原版。</p>
      <p>再看是否用了 v2/v3 签名（更抗篡改）：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify -v app.apk"}</code></pre>
      <p>如果输出里只有 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">v1 scheme (JAR signing): true</code>，v2/v3 都是 false，说明这个包很老或者打包不规范，容易被中间插入内容。</p>
      <h2>四、第二步：看它申请了什么权限</h2>
      <p>这是信息量最大的一步。两种方式：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump permissions app.apk"}</code></pre>
      <p>或者对已安装的应用：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell dumpsys package <包名> | grep -i \"granted\\|requested\""}</code></pre>
      <p>判断标准是一张「请结合功能判断」的表：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">权限</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">正常用途</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">需要警惕的情形</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SEND_SMS</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">READ_SMS</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">短信应用、验证码自动填充</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">手电筒、计算器、小游戏申请</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BIND_ACCESSIBILITY_SERVICE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">无障碍辅助、部分自动化工具</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">工具类应用申请（可读屏+代点，风险最高）</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BIND_NOTIFICATION_LISTENER_SERVICE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">通知管理、手表同步</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">与副屏无关的应用</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SYSTEM_ALERT_WINDOW</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">悬浮窗、录屏工具</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">游戏助手、清理类工具</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">DEVICE_ADMIN</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">企业设备管理、找回手机</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">普通娱乐应用</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">REQUEST_INSTALL_PACKAGES</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用商店、更新器</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">单一功能的小应用</td></tr></tbody>
      </table></div>
      <p>一个特别好用的粗略判断：<strong>计算器要短信权限，一定有问题；相机应用要无障碍权限，一定有鬼。</strong> 权限与功能对不上，比什么都说明问题。</p>
      <h2>五、第三步：看组件是否对外暴露</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump xmltree app.apk AndroidManifest.xml | grep -B2 -A2 \"android:exported\""}</code></pre>
      <p>导出的 Activity / Service / Receiver 越多，被其他应用（包括恶意应用）拉起或唤醒的机会越多。典型风险：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>导出的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BroadcastReceiver</code> 监听 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BOOT_COMPLETED</code> → 开机自启，配合广告 SDK 就是常驻后台</li>
        <li>导出的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Service</code> 无权限保护 → 可被第三方绑定，做隐私数据中转</li>
        <li>导出的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Activity</code> 直接挂 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android.intent.action.VIEW</code> 且带自定义 scheme → 可能被用来钓鱼跳转</li>
      </ul>
      <p>不是说有导出组件就有问题（大部分应用都有），而是<strong>要和功能一起看</strong>：一个离线记账本，却有 5 个开机启动的导出 Receiver，就不合理。</p>
      <h2>六、第四步：找动态加载与可疑 SDK</h2>
      <p>拆开包看结构和类名：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"unzip -l app.apk | head -50\nunzip -l app.apk | grep -iE \"\\.so$|assets/|payload\""}</code></pre>
      <p>几个信号：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">assets/</code> 下有无加密的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.bin</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.dat</code> 大文件 → 可能是加壳或二次加载的 payload</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">lib/</code> 下 so 数量异常多，且名字随机（如 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">liba1b2c3.so</code>）→ 加壳特征</li>
        <li>用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">unzip -p app.apk classes.dex | strings | grep -iE &quot;http://|report|track&quot;</code> 粗略看网络地址</li>
      </ul>
      <p>想更细一步，可以用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apktool d app.apk</code> 解出 smali，搜索 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">DexClassLoader</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Runtime.exec</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">loadLibrary</code> 等关键词，看是否有运行时加载可执行代码的行为。这一步需要一点耐心，但对判断「是不是壳包」很有用。</p>
      <p>顺带可以对照已知广告 SDK 的包名前缀（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.bytedance.sdk</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.qq.e</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.google.android.gms.ads</code> 等）。有广告 SDK 不代表恶意，但<strong>权限多 + 广告 SDK + 导出组件多</strong>三件套凑齐，基本就是一个「看广告赚钱」的灰色包。</p>
      <h2>七、第五步：装完后再看一次运行时行为</h2>
      <p>安装后，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb logcat</code> 观察一段时间：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb logcat -v time | grep -iE \"permission|denied|security|avc\""}</code></pre>
      <p>出现大量 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">avc: denied</code> 说明它在尝试访问自己没权限的资源；频繁读取剪贴板、频繁请求定位的日志，也是可疑信号。最后在设置里「应用信息 → 权限 → 权限使用记录」看一眼：如果它在后台频繁访问你从没打开过的功能，就该卸载了。</p>
      <h2>八、状态速查</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">检查项</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">低风险</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">高风险</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">签名 DN</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">官方公司名</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Debug / Unknown / 与官方不一致</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">签名方案</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">v2 + v3</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">仅 v1</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">权限</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">与功能匹配</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">功能简单但权限高</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">导出组件</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">少量且与功能相关</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">多个开机自启 Receiver</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包结构</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">结构清晰、so 少量</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">大量随机 so、加密 assets</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">运行时</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">无异常 denied</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">频繁越权访问</td></tr></tbody>
      </table></div>
      <p>三条以上落在右列，建议放弃这个包，换官方渠道。</p>
      <h2>九、常见问题</h2>
      <p><strong>Q1：必须用电脑吗？手机上能不能自己查？</strong></p>
      <p>权限可以看（安装后进设置看「应用信息 → 权限」），签名也能用部分工具查，但 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> 这类精确工具目前主要在桌面端。手机上可以用 Termux 装 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt</code>，但对新手折腾成本较高。</p>
      <p><strong>Q2：VirusTotal 传上去全绿，是不是就安全了？</strong></p>
      <p>只能说明<strong>当前这个静态文件</strong>匹配不到已知特征。很多盗版包本身没病毒，只是塞了广告 SDK、改了支付渠道，这类在查毒平台上通常是干净但有害。</p>
      <p><strong>Q3：签名一致就 100% 安全吗？</strong></p>
      <p>不是。签名一致只能证明「和官方是同一个开发者/同一个密钥」。如果官方包本身就带广告 SDK（很常见），它依然有广告。签名的作用是排除「被第三方改过」，不能排除「官方本身就有的行为」。</p>
      <p><strong>Q4：查出来没权限问题，装完还是有问题怎么办？</strong></p>
      <p>那就进入运行时排查：看流量、看唤醒、看权限使用记录。静态扫描只能看「它声明的能力」，看不到「它实际做的行为」。</p>
      <h2>总结</h2>
      <p>APK 的本机安全扫描不神秘，核心就五步：<strong>`apksigner` 验签名确认来源、`aapt dump permissions` 看声明能力、检查导出组件看暴露面、拆包看动态加载痕迹、装完用 `logcat` 和权限使用记录看实际行为</strong>。这套流程最大的价值不在技术含量，而在于它把「凭感觉判断」变成「按证据判断」——尤其是<strong>权限与功能是否匹配</strong>这一条，能过滤掉绝大多数劣质包。</p>
  </>
);

export const zhPosts20261123B = [
  {
    slug: "scan-apk-for-malware-without-antivirus",
    title: "安卓 APK 本机安全扫描方法：不装第三方杀毒，用 adb 把包查一遍",
    description: "网上下载的 APK 到底安不安全？大部分人的做法是「传到 VirusTotal 传一遍」，或者装个手机安全软件点个「立即扫描」。这两种做法都有明显短板：在线查毒平台对侧载包（尤其是改过签名的）覆盖并不完整。",
    date: "2026-11-23",
    readTime: "7 min read",
    tags: ["APK安全","apksigner","权限检查","adb","安全检查"],
    content: ARTICLE,
  },
];

export const zhPosts20261123BList = toList(zhPosts20261123B);
