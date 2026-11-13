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
      <p>大部分人下载 APK 的流程是：搜索 → 点下载 → 点安装 → 出问题 → 上网搜报错。<strong>问题从来不是安装本身有多难，而是中间有四五个环节可以让它失败，而每个环节的报错信息都长得不一样。</strong></p>
      <p>这篇按顺序把整条链路走一遍，标注每一步该看什么、哪里最容易翻车。不用背，出问题时对照着定位就行。</p>
      <h2>链路总览</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"找到安装包 → 下载完成 → 校验 → 安装 → 首次启动\n   (来源)      (完整性)    (签名)  (系统放行)  (数据/权限)"}</code></pre>
      <p>五段，每一段的失败表现完全不同。<strong>先确定自己卡在哪一段，比盲试管用十倍。</strong></p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">卡在哪</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">典型表现</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">看本文哪节</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">第 1 段</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">下载不到、跳广告、要求装其他软件</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">来源环节</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">第 2 段</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">文件很小、装的时候提示&quot;解析包出错&quot;</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">完整性环节</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">第 3 段</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">提示&quot;应用未安装&quot;、&quot;签名冲突&quot;</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">签名环节</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">第 4 段</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">提示&quot;未知来源&quot;、&quot;已被阻止&quot;、&quot;版本不兼容&quot;</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">系统放行环节</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">第 5 段</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">装上后闪退、白屏、提示缺少组件</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">首次启动环节</td></tr></tbody>
      </table></div>
      <h2>第一段：来源</h2>
      <h3>判断标准</h3>
      <p>一个可信的 APK 来源，至少要满足两条：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>明确标注包名和版本号</strong>（不是只写&quot;最新版&quot;）</li>
        <li><strong>提供校验信息</strong>或至少能对上开发者名称</li>
      </ol>
      <p>真正的官方渠道只有三个：Google Play、开发者官网、应用自身的 GitHub Release。其余所有站点本质上都是<strong>镜像</strong>，质量参差。</p>
      <h3>最常见的三个坑</h3>
      <p><strong>坑一：下载按钮是广告。</strong> 页面上有 5 个&quot;下载&quot;按钮，4 个是广告联盟的。点击后跳到另一个页面，要求你装一个&quot;下载助手&quot;。<strong>真正的下载按钮通常最不起眼</strong>，位置在中部或页面底部。</p>
      <p><strong>坑二：包被重打包。</strong> 镜像站为了加广告或替换渠道号，会重新签名打包。表现是安装体积比官方大、启动时多一个广告页、权限申请多出一堆无关的。</p>
      <p><strong>坑三：版本号造假。</strong> 网页写 v9.8，装完发现是 v3.2。<strong>装完第一件事就是去系统设置里确认版本号</strong>，别信网页。</p>
      <h3>怎么判断包是不是原版</h3>
      <p>见第三段的签名校验，这是唯一可靠的方法。</p>
      <h2>第二段：完整性</h2>
      <h3>下载完先看大小</h3>
      <p>一个 100MB 的应用下载成 12MB，那肯定是失败了。<strong>下载中断的常见原因是网络切换</strong>（WiFi 切 4G），浏览器不会提示你，你只会看到一个不完整的文件。</p>
      <h3>用哈希校验（有条件就做）</h3>
      <p>正规站点会提供 SHA-256。电脑上：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# macOS\nshasum -a 256 app.apk\n\n# Linux\nsha256sum app.apk\n\n# Windows PowerShell\nGet-FileHash app.apk -Algorithm SHA256"}</code></pre>
      <p>和网站上标注的值逐字符对比。不一致就别装了，文件在传输中损坏或被人换过。</p>
      <h3>&quot;解析包出错&quot;是怎么来的</h3>
      <p>这个提示几乎只有一个原因：<strong>文件不完整或不是有效的 APK</strong>。可能是：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>下载中断（最常见）</li>
        <li>下载到的是网页而不是 APK（.htm 后缀）</li>
        <li>分卷包只下了一部分（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apk.1</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apk.2</code> 这种）</li>
        <li>站点返回了错误页</li>
      </ul>
      <p><strong>处理方式就一条：删掉，重新下载。</strong> 不要尝试修复。</p>
      <h2>第三段：签名</h2>
      <h3>为什么必须查</h3>
      <p>签名决定了两件事：<strong>这个包是不是官方出的</strong>，以及<strong>能不能覆盖安装</strong>。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"keytool -printcert -jarfile app.apk | grep -A2 SHA256"}</code></pre>
      <p>对比官方公布的指纹。不一致的三种可能：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>官方换了签名密钥（极少见，一般是迁移到 Play App Signing 时）</li>
        <li>这是重打包版本</li>
        <li>这是另一个应用改名的</li>
      </ol>
      <p><strong>第 2 种最常见，也是最危险的。</strong></p>
      <h3>&quot;应用未安装&quot;的六种原因</h3>
      <p>这个提示信息量几乎为零，需要靠日志区分：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb install app.apk   # 用 adb 装，会直接给出具体错误码"}</code></pre>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">错误码</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">真实原因</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">签名与已装版本冲突</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_VERSION_DOWNGRADE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">版本号比已装的低</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_INSUFFICIENT_STORAGE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">空间不够（需要约 2.5 倍包体积）</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_OLDER_SDK</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用要求的系统版本高于你的</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_NO_MATCHING_ABIS</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">CPU 架构不匹配</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_PARSE_FAILED_NO_CERTIFICATES</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">安装包没有签名（未签名的调试包）</td></tr></tbody>
      </table></div>
      <p><strong>用 adb 装一次，比在手机上点十次更有用</strong>——手机上只给你一句&quot;应用未安装&quot;，adb 直接告诉你原因。</p>
      <h2>第四段：系统放行</h2>
      <h3>未知来源权限（Android 8 起按应用授权）</h3>
      <p>你用的是哪个应用打开的 APK，就要给<strong>那个应用</strong>授权。用微信打开，授权微信；用浏览器打开，授权浏览器。这是最高频的误判来源。</p>
      <p>路径：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">设置 → 应用 → 特殊应用权限 → 安装未知应用</code></p>
      <p>从 Android 14 起，新装应用默认<strong>没有</strong>这个权限，且首次安装会额外弹一次&quot;不允许安装&quot;的确认，需要手动点。</p>
      <h3>Play Protect 拦截</h3>
      <p>&quot;此应用未经审核，可能存在风险&quot;——这是 Google Play Protect 在拦截。它依据的不是签名，而是<strong>应用的检出记录和权限组合</strong>。</p>
      <p>判断方式：如果这个包是你从官网下的原版，可以点&quot;仍然安装&quot;；如果来源不明，别点。</p>
      <p>关闭路径：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Play 商店 → 头像 → Play Protect → 设置 → 关闭扫描</code>（不建议常关）。</p>
      <h3>版本兼容</h3>
      <p>三个独立条件同时满足才能装：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>minSdkVersion</strong> ≤ 你的系统版本</li>
        <li><strong>ABI</strong> 匹配（arm64-v8a 是现在的主流）</li>
        <li><strong>屏幕密度</strong>（一般不影响安装，影响显示）</li>
      </ul>
      <p>查法：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt2 dump badging app.apk | grep -E \"sdkVersion|native-code\""}</code></pre>
      <h2>第五段：首次启动</h2>
      <h3>闪退的四个常见原因</h3>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>数据目录权限问题</strong>（侧载应用常见）——清除数据后重试</li>
        <li><strong>缺少 Google 服务框架</strong>——国外应用在国产 ROM 上常见，表现是启动即崩或卡在登录</li>
        <li><strong>targetSdk 太低</strong>——Android 14+ 对 targetSdk &lt; 23 的应用有额外限制</li>
        <li><strong>分区存储不兼容</strong>——应用还在用旧的文件访问方式</li>
      </ol>
      <p>日志定位：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb logcat -c && adb logcat | grep -E \"FATAL|AndroidRuntime\""}</code></pre>
      <p>闪退前的那段堆栈就是原因。<strong>`ClassNotFoundException` 通常是缺少依赖库；`SecurityException` 是权限或 SELinux；`UnsatisfiedLinkError` 是 CPU 架构不匹配。</strong></p>
      <h3>权限首次申请的时机</h3>
      <p>从 Android 13 起<strong>通知权限</strong>变成运行时权限，新装应用默认没有，必须启动后主动申请。如果应用没做这个适配，表现就是&quot;通知完全不响&quot;，用户以为是应用坏了。</p>
      <h2>一份可以照着走的检查清单</h2>
      <p>装之前：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>来源页面能对上<strong>包名 + 版本号</strong></li>
        <li>文件大小与标注一致</li>
        <li>有条件的话核对 SHA-256</li>
        <li>用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">keytool</code> 或 App 查签名指纹</li>
      </ul>
      <p>装的时候：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>已给<strong>打开 APK 的那个应用</strong>安装权限</li>
        <li>存储空间 ≥ 包体积的 2.5 倍</li>
        <li>系统版本 ≥ minSdkVersion</li>
        <li>Play Protect 提示时确认来源可信再放行</li>
      </ul>
      <p>装完之后：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>系统设置里确认版本号与预期一致</li>
        <li>通知权限是否已授予</li>
        <li>关键权限（存储/相机/定位）按需授予，不给无关权限</li>
        <li>后台省电策略设为&quot;无限制&quot;（如果是后台类应用）</li>
      </ul>
      <h2>最后一点</h2>
      <p>这套流程听起来繁琐，但真正需要每次都做的只有<strong>来源核对</strong>和<strong>签名校验</strong>两步，其他都是出问题时才查。养成习惯之后，能挡掉绝大多数&quot;装了垃圾包&quot;&quot;装完闪退&quot;的情况。</p>
      <p>如果要省事，直接用 <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk.com</a> 这类会标注包名、版本号和校验信息的站点，比在搜索结果里挨个试要稳得多。</p>
  </>
);

export const zhPosts20261113C = [
  {
    slug: "apk-download-install-checklist",
    title: "安卓APK下载后安装全流程：从点击下载到第一次启动，每一步的检查点",
    description: "大部分人下载 APK 的流程是：搜索 → 点下载 → 点安装 → 出问题 → 上网搜报错。问题从来不是安装本身有多难，而是中间有四五个环节可以让它失败，而每个环节的报错信息都长得不一样。",
    date: "2026-11-13",
    readTime: "6 min read",
    tags: ["android","apk","安装","校验"],
    content: ARTICLE,
  },
];

export const zhPosts20261113CList = toList(zhPosts20261113C);
