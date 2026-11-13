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
      <p>「应用未安装」的报错好解决，真正让人困惑的是另一种情况：<strong>APK 装得顺顺利利，图标点开也不闪退，但就是登不进去、收不到消息、地图一片空白，或者一进支付页就退出</strong>。</p>
      <p>这类问题几乎都指向同一个根因：<strong>设备上没有 Google Play 服务（GMS）</strong>。安装器只负责把包装进去，它不会检查这个包运行时依赖什么。华为新机、鸿蒙设备、AOSP 类定制 ROM、部分国行机型、安卓平板和车机，都可能处在这个状态。</p>
      <p>网上常见的回答是「装个谷歌服务三件套」，但这既不一定可行，也不总是安全。下面按依赖分层拆，先判断哪些能修、哪些是硬边界。</p>
      <h2>第一步：确认是不是真的缺 GMS</h2>
      <p>先别急着改系统，用两个只读方法确认：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages | grep -E 'gms|gsf|vending'"}</code></pre>
      <p>有 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.google.android.gms</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.android.vending</code> 才算完整。也可以直接在应用列表里搜「Google Play 服务」，或在设置里看有没有「Google 账号」入口。</p>
      <p>注意区分三种状态：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">状态</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">表现</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">处理方向</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">完整 GMS</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">账号、推送、地图都正常</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">问题不在 GMS，去查网络、版本、地区</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">有框架但 Play 服务被禁用/版本过旧</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">部分应用报「需要更新 Play 服务」</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">更新或启用现有组件</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">完全没有 GMS</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">依赖 Google 的功能静默失效</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">按下面的分层处理</td></tr></tbody>
      </table></div>
      <h2>依赖分层：哪些功能会坏，为什么</h2>
      <p>把「用不了」拆成具体功能，才知道有没有救：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">失效功能</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">背后依赖</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">可解程度</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Google 账号登录、一键登录</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">AccountManager / Play 服务</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">通常可用网页版登录或邮箱注册替代</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">消息推送收不到</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">FCM（Firebase Cloud Messaging）</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用常自带轮询兜底，可能有延迟；纯 FCM 应用基本无解</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">地图空白、定位漂移</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Google Maps SDK / Location Services</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">可换成不依赖 GMS 的地图类应用；应用内嵌地图多数无解</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用内支付、订阅</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Google Play Billing</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">无解，服务端校验</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">银行/流媒体拒绝运行</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Play Integrity / SafetyNet / Widevine L1</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">无解，属于服务端策略</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">图片加载、崩溃日志、AB 测试</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Firebase 全家桶</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">多数只是功能降级，主流程仍可用</td></tr></tbody>
      </table></div>
      <p>关键判断：<strong>凡是校验发生在服务器端的，本地怎么折腾都绕不过去</strong>；凡是纯客户端能力，通常有替代路径。</p>
      <h2>可解的三条路径（按推荐顺序）</h2>
      <h3>1. 换入口，而不是换系统</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>优先试 <strong>Web 版 / PWA</strong>：多数内容类、工具类服务在浏览器里功能完整，还能避开推送依赖。</li>
        <li>找 <strong>不依赖 GMS 的同类应用</strong>：开源客户端、Lite 版、国内发行版往往把 FCM 换成自有推送通道。</li>
        <li>登录时用 <strong>邮箱 + 密码</strong> 而不是「使用 Google 账号继续」，很多应用只是登录入口绑了 GMS，主功能并不依赖。</li>
      </ul>
      <h3>2. 让应用自带的兜底机制生效</h3>
      <p>不少应用检测到 FCM 不可用时会自动降级为定时轮询，但前提是后台不被杀。需要在系统里做三件事：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>把该应用加入<strong>电池优化白名单</strong>；</li>
        <li>在厂商的「后台高耗电」「自启动」管理里放行；</li>
        <li>关闭针对该应用的<strong>数据省电 / 后台流量限制</strong>。</li>
      </ul>
      <p>这一步经常被忽略：推送「收不到」有时不是缺 GMS，而是降级后的轮询也被省电策略掐了。</p>
      <h3>3. microG 之类的替代实现（谨慎评估）</h3>
      <p>microG 提供部分 Play 服务 API 的开源实现，能覆盖一部分 FCM 与定位需求。但要清楚代价：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>通常需要系统支持<strong>签名欺骗（signature spoofing）</strong>，多数官方 ROM 不支持，意味着要刷第三方 ROM；</li>
        <li>涉及账号凭证与推送通道，等于把敏感数据交给一层额外实现；</li>
        <li>Play Integrity、应用内支付、DRM 类校验依然无法通过。</li>
      </ul>
      <p><strong>不要为了跑一个应用去刷来路不明的「谷歌服务安装包」或完整 GMS 包</strong>。这类包常需要系统级权限、来源不可验证，风险远大于收益。如果确实需要，优先选择设备厂商官方提供的方案或换设备。</p>
      <h2>明确不可解的情况</h2>
      <p>遇到下面几类，建议直接止损，不要反复换版本试：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>银行、支付、政务类应用提示「设备环境不安全」；</li>
        <li>流媒体提示不支持该设备 / 无法播放高清；</li>
        <li>应用强制要求 Play 商店校验许可（License Verification）；</li>
        <li>游戏依赖 Google Play 游戏服务存档与成就。</li>
      </ul>
      <p>这些校验运行在服务端，客户端伪装容易被识别，也常伴随账号风险。</p>
      <h2>排查清单（按顺序做）</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>确认 GMS 是否真的缺失（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages</code>）</li>
        <li>确认 APK 版本与设备架构匹配（ABI、minSdk、签名）</li>
        <li>换邮箱/网页登录，验证主功能是否可用</li>
        <li>打开电池优化白名单、自启动、后台流量</li>
        <li>检查系统 WebView 版本（很多登录页空白是 WebView 过旧）</li>
        <li>判断是否属于服务端强校验 → 是则停止折腾</li>
        <li>需要干净原版包时，从 <a href="https://www.gptoapk.com/zh" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk</a> 取官方源 APK 并校验签名</li>
      </ul>
      <p>最后一条值得展开：<strong>排查依赖问题之前，先排除「包本身不对」</strong>。下错架构、拿到被修改过的包，症状和缺 GMS 高度相似。取包时确认版本、ABI 与签名，能省掉大半无效尝试。</p>
      <h2>常见问题</h2>
      <h3>应用能装能开，是不是说明不缺 GMS？</h3>
      <p>不是。安装器只校验签名和清单里的声明，不校验运行时依赖。很多应用把 Google 相关依赖做成可选，启动时才按需调用，所以「能开」和「能用」是两回事。</p>
      <h3>装了 GMS 框架包，为什么还是登不上？</h3>
      <p>大多数组件需要系统签名与对应权限，靠普通 APK 侧载装进去只是多了几个图标。另外版本必须与 Android 版本、架构匹配，缺一个都不行。</p>
      <h3>推送延迟十分钟以上算正常吗？</h3>
      <p>在纯轮询兜底的应用里很常见。把应用加入电池白名单、允许后台数据后通常会改善到分钟级，但不会达到 FCM 的实时性。</p>
      <h3>同一台设备，为什么有的应用正常有的不行？</h3>
      <p>取决于开发者把多少 Google 依赖设为「必需」。只用了 Firebase Analytics 的应用基本无感；把 FCM 当唯一推送通道、或强依赖 Play 账单的应用就直接失效。</p>
      <h2>小结</h2>
      <p>缺 GMS 的问题要按<strong>依赖层</strong>而不是按「装没装谷歌服务」来判断：客户端能力有替代路径，服务端校验没有硬解。先确认包本身正确、再放行后台策略、最后才考虑替代实现，能避开绝大多数无效操作，也避免为了一个应用把整机安全边界拆掉。</p>
  </>
);

export const zhPosts20261113E = [
  {
    slug: "apk-no-gms-login-push-fix",
    title: "没有谷歌服务的手机装完 APK 却用不了：登录、推送、地图失效的分层排查",
    description: "APK 装得上不代表跑得起来。华为、鸿蒙、AOSP ROM、国行设备缺少 Google Play 服务时，登录、推送、地图、支付会各自失效。本文按依赖分层给出可解与不可解的边界。",
    date: "2026-11-13",
    readTime: "6 min read",
    tags: ["无GMS","侧载APK","推送","故障排查","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261113EList = toList(zhPosts20261113E);
