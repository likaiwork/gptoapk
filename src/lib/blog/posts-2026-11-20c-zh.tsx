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
      <p>有一类问题特别容易让人怀疑自己装了个假的 APK：应用明明装上了，图标在桌面上，手动点开一切正常，登录、刷新、推送都对，可只要从微信、短信或者浏览器里点一条 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">https://</code> 链接，系统要么直接扔给浏览器，要么弹出「打开方式」选择框，而框里压根没有这个刚装好的应用。</p>
      <p>于是很多人开始重复卸载重装、清缓存、换下载源，甚至去找「修复版」重装一遍。但这类操作和问题的根因基本无关。应用能启动，说明安装环节是成功的；链接不跳转，说明<strong>另一条完全独立的链路没有打通</strong>——Android 的 App Links 域名验证。</p>
      <p>&gt; 核心判断：<strong>「安装成功」和「链接归属」是两套机制</strong>。前者由 PackageManager 负责，装完就结束；后者由系统在后台向应用官网发起一次 HTTPS 请求，比对包名和签名证书指纹，验证通过才把该域名判给这个应用。只要中间任何一环对不上，链接就永远轮不到你的 App。</p>
      <p>这篇文章把这条链路拆开，给出每一步可以自己验证的命令，最后再说明哪些情况其实不是你的设备能修的。</p>
      <h2>一、先分清三个概念：Deep Link、App Link、以及系统「默认打开」</h2>
      <p>很多人把这几个词混着用，导致排查方向一开始就偏了。它们的区别决定了你会看到哪一种现象。</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">类型</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">系统如何判定</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">点链接时的现象</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">谁来决定</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">普通 Deep Link</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">只匹配 manifest 里声明的 scheme / host，不校验网站所有权</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">弹出「打开方式」选择框，App 与浏览器并列</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用自己声明即可</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Android App Link</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">intent-filter 带 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android:autoVerify=&quot;true&quot;</code>，系统去站点拉 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">assetlinks.json</code> 比对包名与签名指纹</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">验证通过后直接进 App，不弹选择框</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">网站 + 应用签名 + 系统共同决定</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">用户「默认打开」开关</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">设置里的「打开支持的链接」被关闭或域名未勾选</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">即使验证通过，也直接交给浏览器</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">用户手动设置</td></tr></tbody>
      </table></div>
      <p>关键在中间那一行：<strong>App Link 的验证需要应用方网站配合</strong>。它不是一个纯本地设置，你在手机上怎么清数据都改不了服务器上的文件。这也是为什么侧载安装的场景格外容易踩坑——你手里的 APK 和官网声明的证书，未必是同一份签名。</p>
      <p>还有一个容易误判的现象：如果点链接时<strong>弹出了选择框且能看到你的 App</strong>，那说明 intent-filter 是正常的，只是没有拿到「已验证」状态，属于 App Link 降级成了普通 Deep Link。如果<strong>选择框里完全没有你的 App</strong>，那问题更靠前，是 intent-filter 压根没匹配上，或者根本没声明 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BROWSABLE</code>。这两种情况的排查起点完全不同，先花十秒确认一下属于哪种。</p>
      <h2>二、验证链路到底发生了什么</h2>
      <p>从 Android 6.0（API 23）开始，一次 App Links 验证大致按下面的顺序走。理解顺序比背命令重要，因为每一步失败都对应一个不同的可观测信号。</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">阶段</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">触发时机</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">系统做什么</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">失败时的表现</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">可观测位置</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">1. 解析声明</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">安装 / 更新时</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">读取 manifest，找出带 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">autoVerify=&quot;true&quot;</code> 且含 VIEW、BROWSABLE、DEFAULT 的 intent-filter</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">选择框里没有该 App</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apkanalyzer manifest print</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2. 收集域名</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">紧接上一步</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">提取所有 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android:host</code>，过滤掉 http 之外的 scheme</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">部分域名生效、部分不生效</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm get-app-links</code> 的域名列表</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">3. 发起验证</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">联网后异步执行</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">对每个 host 请求 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">https://&lt;host&gt;/.well-known/assetlinks.json</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">长时间停留未验证状态</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">服务端访问日志、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm get-app-links</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">4. 校验声明</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">拿到响应后</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">检查 HTTP 200、Content-Type、无重定向、JSON 合法、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">relation</code> 与 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">package_name</code> 匹配</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">legacy_failure</code> 或验证失败</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">curl -sSI</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">5. 比对指纹</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">紧接上一步</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">把 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">sha256_cert_fingerprints</code> 与设备上已装应用的签名证书比对</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">前四步全过，仍显示未验证</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner verify --print-certs</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">6. 落库生效</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">验证完成</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">把域名标记为 verified，写入域名首选表</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">需要重新触发才更新</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm get-app-links</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dumpsys package</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">7. 用户开关</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">点击链接时</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Android 12 之后还要看「打开支持的链接」是否允许</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">验证通过却仍跳浏览器</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用详情页设置</td></tr></tbody>
      </table></div>
      <p>第 3 步有个常被忽略的前提：<strong>验证是系统后台发起的，不是你的浏览器</strong>。如果设备当时没联网、处于省电限制、或者域名解析被拦截，验证会静默失败并保持旧状态，不会给你任何提示。这也是「装完当时不行，过一会儿重启又好了」这类玄学现象的来源。</p>
      <p>第 5 步是本站读者最该留意的一环。<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">sha256_cert_fingerprints</code> 比的是<strong>签名证书的 SHA-256 指纹</strong>，不是 APK 文件的 SHA-256，也不是应用版本号。很多人拿下载页标注的文件校验值去对，当然永远对不上。</p>
      <h2>三、assetlinks.json 长什么样，以及 Play App Signing 为什么是最大的坑</h2>
      <p>标准的声明文件放在站点根目录下的固定路径，内容是一个 JSON 数组：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"[\n  {\n    \"relation\": [\"delegate_permission/common.handle_all_urls\"],\n    \"target\": {\n      \"namespace\": \"android_app\",\n      \"package_name\": \"com.example.app\",\n      \"sha256_cert_fingerprints\": [\n        \"AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77\"\n      ]\n    }\n  }\n]"}</code></pre>
      <p>对它的要求比看上去严格，任何一条不满足都会让验证直接判失败：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>必须通过 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">https://</code> 提供，TLS 证书链完整有效，自签名证书不行；</li>
        <li>必须返回 HTTP 200，<strong>不能有任何重定向</strong>（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">http → https</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">不带 www → 带 www</code> 的重定向同样算失败）；</li>
        <li>建议 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Content-Type: application/json</code>；</li>
        <li>不能被 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">robots.txt</code> 屏蔽，不能要求登录、Cookie 或客户端证书；</li>
        <li>必须是合法 JSON 数组，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">relation</code> 用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">delegate_permission/common.handle_all_urls</code>；</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">namespace</code> 为 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android_app</code>，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">package_name</code> 必须与设备上包名<strong>逐字一致</strong>；</li>
        <li>文件要在合理时间内返回，体积不宜过大（系统对验证请求有超时预算）。</li>
      </ul>
      <p>现在说最隐蔽的坑。绝大多数上架 Google Play 的应用都启用了 <strong>Play App Signing</strong>：开发者用「上传密钥」签名后传上去，Google 会用另一把「应用签名密钥」重新签名再分发。因此官网 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">assetlinks.json</code> 里填的，往往是 Google 那把应用签名密钥的指纹。</p>
      <p>这意味着：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>如果你从应用商店渠道装的是官方分发包，指纹一致，验证能过；</li>
        <li>如果你侧载的是<strong>开发者内测包、调试包、旧版本、被重新签名的修改包，或来自不同分发渠道的包</strong>，签名证书不同，指纹必然不匹配；</li>
        <li>结果是前面四步全部正常、文件也能拉到、包名也对，唯独第 5 步静默失败。</li>
      </ul>
      <p>而且这个失败<strong>不会导致安装报错</strong>。签名不匹配只影响「更新同名应用」和「App Links 归属」，前者会报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>，后者则是完全无声的降级。所以你会看到.App 一切正常、只有链接不跳——这正是本文开头那个现象的典型成因。</p>
      <p>如果你在对比不同来源的安装包，可以顺带读一下 <Link href="/zh/blog/apk-signature-mismatch-install-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名不一致导致安装失败的排查</Link>，那里讲的是同一套证书机制在安装阶段的另一种表现。</p>
      <h2>四、九步排查路径（每步都有可执行命令）</h2>
      <p>下面按顺序做，不要跳步。前四步在电脑上做，后五步需要 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb</code> 连接设备（开启开发者选项与 USB 调试，或用无线调试）。所有命令里的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.example.app</code> 与 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">example.com</code> 请替换成实际应用包名和域名。</p>
      <h3>第 1 步：确认 intent-filter 到底怎么声明的</h3>
      <p>先从 APK 里读 manifest，看有没有 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">autoVerify</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BROWSABLE</code> 和 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">DEFAULT</code>：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apkanalyzer manifest print app.apk | grep -A 12 -i \"intent-filter\"\n# 需要看到 android:autoVerify=\"true\"、android.intent.category.BROWSABLE\n# 以及 <data android:scheme=\"https\" android:host=\"example.com\" />"}</code></pre>
      <p>如果没有 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apkanalyzer</code>，用 aapt 直接解二进制 XML：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump xmltree app.apk AndroidManifest.xml | grep -A 20 -i \"autoVerify\\|BROWSABLE\\|android:host\""}</code></pre>
      <p><strong>判定</strong>：完全没有 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">autoVerify</code> → 这应用本来就不打算做 App Link，点链接弹选择框是设计如此，不是故障。有声明再往下走。</p>
      <h3>第 2 步：确认设备上的实际包名</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages | grep -i example\nadb shell pm path com.example.app"}</code></pre>
      <p>包名带 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.debug</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.beta</code> 后缀，或者和你以为的不一样，都会让第 4 步的文件比对失效。顺带记下 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm path</code> 返回的路径，第 5 步要用到。</p>
      <h3>第 3 步：从服务端拉取声明文件</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"curl -sSI https://example.com/.well-known/assetlinks.json\ncurl -sS -o /dev/null -w \"code=%{http_code} type=%{content_type} redirect=%{redirect_url}\\n\" https://example.com/.well-known/assetlinks.json\ncurl -sS https://example.com/.well-known/assetlinks.json | jq ."}</code></pre>
      <p>第一条看响应头，第二条把状态码、类型和重定向一次性打出来，第三条确认 JSON 能解析。<strong>任何 301 / 302、非 200、`text/html` 类型、`jq` 报错都直接判失败</strong>，不用再往设备侧查了。</p>
      <h3>第 4 步：取出你手里 APK 的签名证书指纹</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify --print-certs app.apk\n# 输出示例：Signer #1 certificate SHA-256 digest: aabbccdd...\nkeytool -printcert -jarfile app.apk   # 仅对 v1 签名有效的旧办法"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> 输出的是不带冒号的连续十六进制；<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">assetlinks.json</code> 里通常写成带冒号、大写的分组形式。比对时统一转成同一种格式：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify --print-certs app.apk | grep \"SHA-256\" | awk '{print $NF}' \\\n  | tr 'a-f' 'A-F' | sed 's/../&:/g;s/:$//'"}</code></pre>
      <p>拿这串和 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">jq -r '.[].target.sha256_cert_fingerprints[]'</code> 的输出逐字对比。<strong>不一致就是根因</strong>，不必再折腾设备。</p>
      <h3>第 5 步：读取系统记录的域名验证状态</h3>
      <p>Android 12（API 31）及以上：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm get-app-links com.example.app"}</code></pre>
      <p>输出里每个域名后面会跟状态，常见值含义如下：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">状态</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">含义</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">下一步</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">verified</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">验证通过，域名已判给该应用</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">去第 8 步查用户开关</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">none</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">1024</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">尚未验证或验证未完成</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">去第 6 步重新触发</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">legacy_failure</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">服务端文件或声明不满足要求</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">回第 3、4 步</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">denied</code> / 未列出</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">用户或系统显式不允许</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">去第 8 步</td></tr></tbody>
      </table></div>
      <p>Android 11 及更早版本没有 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm get-app-links</code>，用域名首选表：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell dumpsys package domain-preferred-apps\nadb shell dumpsys package com.example.app | grep -i -A 10 \"domain\\|verification\""}</code></pre>
      <h3>第 6 步：重新触发验证</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm verify-app-links --re-verify com.example.app\nsleep 5\nadb shell pm get-app-links com.example.app"}</code></pre>
      <p>触发前确认设备联网、未开启极端省电、DNS 正常。验证是异步的，等几秒再读状态。如果始终停留在未验证，且第 3、4 步都正常，那基本可以断定是<strong>指纹不匹配</strong>（服务端声明的是另一把签名密钥），这是侧载分发包的固有结果，本地改不了。</p>
      <h3>第 7 步：实测系统会把链接解析给谁</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell cmd package resolve-activity --brief -a android.intent.action.VIEW -d https://example.com/some/path\nadb shell am start -W -a android.intent.action.VIEW -d https://example.com/some/path"}</code></pre>
      <p>第一条只查询不启动，输出被选中的组件；第二条真正启动并打印 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Activity</code> 与耗时。如果第一条返回的是浏览器组件，说明域名归属没建立；如果返回你的 App 但界面仍走浏览器，多半是第 8 步的用户开关。</p>
      <h3>第 8 步：检查 Android 12+ 的「打开支持的链接」开关</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell am start -a android.settings.APPLICATION_DETAILS_SETTINGS -d package:com.example.app"}</code></pre>
      <p>在打开的详情页里找「默认打开 / 打开支持的链接 / 添加链接」，确认开关已启用、目标域名已勾选。Android 12 之后这一步是<strong>独立于验证的用户授权</strong>：验证通过但用户没允许，系统依然把链接交给浏览器。这也是很多人升级系统后突然失效的原因。</p>
      <h3>第 9 步：排除环境与多用户干扰</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell am get-current-user\nadb shell pm list users\nadb shell cmd package resolve-activity --brief --user 0 -a android.intent.action.VIEW -d https://example.com/x"}</code></pre>
      <p>工作资料、分身、多用户各自有独立的链接偏好；国内定制系统还可能把「默认打开」放在不同的菜单层级。若在主用户与工作资料下表现不同，按用户分别检查开关即可。</p>
      <h2>五、版本差异速查</h2>
      <p>同一份 APK 在不同 Android 版本上表现可能完全不同，排查时先确认系统版本：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell getprop ro.build.version.release\nadb shell getprop ro.build.version.sdk"}</code></pre>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Android 版本</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">API</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">验证模型</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">对排查的影响</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">6.0 – 7.x</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">23–25</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">首次引入 App Links，安装时一次性验证</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">重装可触发重验</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">8.0 – 10</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">26–29</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">验证结果持久化，失败后长期保持</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">需要 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">verify-app-links</code> 或重装</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">11 及以前</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">≤30</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">全有或全无：所有 host 都过才算通过</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">一个域名写错拖垮全部</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">12</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">31</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">引入 DomainVerificationManager，按域名独立判定</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">改用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm get-app-links</code> 读状态</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">12+</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">≥31</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">新增用户「打开支持的链接」授权环节</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">验证通过也可能不跳</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">13 – 15</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">33–35</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">状态细分更明确，用户选择优先级更高</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">优先查用户开关</td></tr></tbody>
      </table></div>
      <p>特别注意 11 与 12 的分界：在 Android 11 上，manifest 里只要有一个 host 的声明文件不可达，整个应用的所有域名都会降级；Android 12 之后改成逐域名判定，所以会出现「主站链接能跳、活动页链接不跳」这种部分生效的情况。别急着下结论说配置错了，先看系统版本。</p>
      <h2>六、命令速查表</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">目的</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">命令</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">读 manifest 里的 autoVerify</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apkanalyzer manifest print app.apk | grep -A 12 intent-filter</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">查包名</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list packages | grep -i example</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">查声明文件响应头</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">curl -sSI https://example.com/.well-known/assetlinks.json</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">查状态码与重定向</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">curl -sS -o /dev/null -w &quot;%&#123;http_code&#125; %&#123;redirect_url&#125;\n&quot; https://example.com/.well-known/assetlinks.json</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">取 APK 签名指纹</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner verify --print-certs app.apk</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">取文件里的指纹</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">jq -r '.[].target.sha256_cert_fingerprints[]' assetlinks.json</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">读域名验证状态</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm get-app-links com.example.app</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">重新触发验证</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm verify-app-links --re-verify com.example.app</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">查链接解析结果</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell cmd package resolve-activity --brief -a android.intent.action.VIEW -d https://example.com/x</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">查旧版域名首选表</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell dumpsys package domain-preferred-apps</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">打开应用详情页设置</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell am start -a android.settings.APPLICATION_DETAILS_SETTINGS -d package:com.example.app</code></td></tr></tbody>
      </table></div>
      <h2>七、常见问题（FAQ）</h2>
      <p><strong>Q1：卸载重装之后链接就能跳了，是不是说明原来装坏了？</strong></p>
      <p>不一定。重装会重新触发一次域名验证，如果上次失败只是因为安装时设备离线或省电限制，重装恰好给了它第二次机会。真正修好的是「验证时机」，不是安装包本身。用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm verify-app-links --re-verify</code> 可以达到同样效果，不用反复卸载。</p>
      <p><strong>Q2：选择框里能看到我的 App，但每次都要手选，能设成默认吗？</strong></p>
      <p>可以，在应用详情页的「默认打开」里开启。但要清楚这是把普通 Deep Link 设成默认，和 App Link 的自动验证不是一回事：它只对已匹配的链接生效，网站所有权依然没有被校验。</p>
      <p><strong>Q3：`assetlinks.json` 返回 200、Content-Type 也对，为什么还是未验证？</strong></p>
      <p>按概率排：签名证书指纹不匹配（侧载包最常见）、发生了 301/302 重定向、JSON 里的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">package_name</code> 与设备包名不一致、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">relation</code> 写错、被 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">robots.txt</code> 屏蔽。用第 3、4 步的命令逐条排除。</p>
      <p><strong>Q4：我从第三方站点下载的 APK，链接不跳，是不是下载到修改版了？</strong></p>
      <p>不能仅凭这一现象下结论。任何与官网声明证书不同的分发包都会导致验证失败，包括官方的调试版、内测版和旧渠道包。但如果你同时遇到安装时提示签名冲突，那就值得核对来源了，可参考 <Link href="/zh/blog/apk-signature-mismatch-install-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名不一致导致安装失败的排查</Link>。</p>
      <p><strong>Q5：清缓存、清数据、强制停止有没有用？</strong></p>
      <p>对 App Links 验证基本没用。验证结果存在系统侧（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">DomainVerificationManager</code> / 域名首选表），不在应用自己的数据目录里。清应用数据反而会清掉登录态。正确的重来方式是第 6 步的重新触发验证。</p>
      <p><strong>Q6：为什么升级到 Android 12 之后突然不跳了？</strong></p>
      <p>因为 12 增加了用户授权环节，且验证模型改成按域名独立判定。升级后部分域名需要重新勾选「打开支持的链接」，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm get-app-links</code> 看状态、到应用详情页补勾选即可。</p>
      <p><strong>Q7：只有 `http://` 链接不跳，`https://` 正常，正常吗？</strong></p>
      <p>正常。App Links 要求 https，且 Android 9 起默认禁用明文流量。manifest 里只声明 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">https</code> scheme 时，http 链接本来就不该匹配。</p>
      <p><strong>Q8：我是站长，改完 `assetlinks.json` 要多久生效？</strong></p>
      <p>服务端改完立即对新验证请求生效，但设备端有缓存。让用户执行重新触发验证，或者重装应用，通常几秒到几分钟内刷新。不要指望用户自己等它自动恢复。</p>
      <p><strong>Q9：这问题能靠换一个 APK 版本解决吗？</strong></p>
      <p>只有当你换成与官网声明证书一致的那一份签名时才有用。版本号高低不决定指纹，换版本前先用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner verify --print-certs</code> 比对，能省下大量无效尝试。挑版本前可以先读 <Link href="/zh/blog/android-targetsdkversion-shuo-ming" className="text-blue-600 dark:text-blue-400 hover:underline">targetSdkVersion 说明</Link> 理解版本标记的含义，但要注意旧版本的证书可能与现行声明不同。</p>
      <h2>八、什么时候不是你的设备能修的</h2>
      <p>把上面九步走完，如果结论落在下面三类，就别在手机上继续折腾了：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>官网 `assetlinks.json` 本身缺失、重定向或配置错误</strong>——只有站点管理员能改；</li>
        <li><strong>签名证书指纹不匹配</strong>（侧载非官方分发包）——需要换成与声明一致的签名，或者接受链接不自动跳转；</li>
        <li><strong>应用压根没声明 `autoVerify`</strong>——这是设计选择，弹选择框属于预期行为。</li>
      </ol>
      <p>前两类情况下，可行的替代只有：把链接手动复制进 App、在应用内用自带的打开方式、或在「默认打开」里把它设成普通 Deep Link 的默认处理器。花时间反复重装、换下载源、清数据不会改变服务端的文件和证书。</p>
      <p>顺带一提，这个现象和另一些「装完之后的怪事」很容易混淆，但成因完全不同：装完找不到图标属于启动器注册问题，见 <Link href="/zh/blog/apk-installed-no-app-icon-launcher" className="text-blue-600 dark:text-blue-400 hover:underline">装完 APK 桌面无图标排查</Link>；点开就闪退属于运行时崩溃，见 <Link href="/zh/blog/apk-installs-but-crashes-on-launch-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 装完启动即闪退</Link>；安装过程卡住则属于安装会话问题，见 <Link href="/zh/blog/apk-install-stuck-session-troubleshooting" className="text-blue-600 dark:text-blue-400 hover:underline">APK 卡在正在安装的会话排查</Link>。先分清现象再选文章，能少走很多弯路。</p>
      <h2>九、延伸阅读</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><Link href="/zh/blog/android-install-unknown-sources-modern" className="text-blue-600 dark:text-blue-400 hover:underline">Android 未知来源安装的现代设置</Link>：侧载前先把权限链路理清</li>
        <li><Link href="/zh/blog/apk-wen-jian-jie-gou-jie-xi" className="text-blue-600 dark:text-blue-400 hover:underline">APK 文件结构解析</Link>：理解 manifest 与签名块在 APK 里的位置</li>
        <li><Link href="/zh/blog/apk-install-stuck-session-troubleshooting" className="text-blue-600 dark:text-blue-400 hover:underline">APK 卡在正在安装的会话排查</Link>：安装阶段失败的另一套机制</li>
        <li><Link href="/zh/blog/apk-signature-mismatch-install-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名不一致导致安装失败</Link>：同一证书机制在安装阶段的体现</li>
        <li><Link href="/zh/blog/android-targetsdkversion-shuo-ming" className="text-blue-600 dark:text-blue-400 hover:underline">targetSdkVersion 说明</Link>：理解版本差异对系统行为的影响</li>
        <li><Link href="/zh/blog/apk-downloaded-file-not-found-scoped-storage" className="text-blue-600 dark:text-blue-400 hover:underline">下载完 APK 找不到文件</Link>：分区存储下的定位方法</li>
        <li><Link href="/zh/blog/android-apk-notifications-not-showing-fix" className="text-blue-600 dark:text-blue-400 hover:underline">安装后通知不显示</Link>：另一类装完之后的权限问题</li>
        <li><Link href="/zh/blog/android-storage-full-apk-cleanup" className="text-blue-600 dark:text-blue-400 hover:underline">卸载后空间仍然不足</Link>：残留文件清理思路</li>
        <li><Link href="/zh/blog/apk-installs-but-crashes-on-launch-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 装完启动即闪退</Link>：启动阶段崩溃的 logcat 排查</li>
      </ul>
      <h2>小结</h2>
      <p>链接不跳 App 从来不是「没装好」，而是域名归属没建立。按这个顺序定位即可：先用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apkanalyzer</code> 确认 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">autoVerify</code> 声明，再用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">curl</code> 确认 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">assetlinks.json</code> 可达且无重定向，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> 比对签名证书指纹，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm get-app-links</code> 读系统状态，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">verify-app-links</code> 重触发，最后检查 Android 12+ 的用户开关。九步之内一定能定位到具体是哪一环，而不是靠反复重装碰运气。</p>
      <p>对侧载用户来说，最值得记住的一条是：<strong>签名证书指纹由分发包决定，不由版本号决定</strong>。官网声明的是哪把证书，你手里的 APK 就得是哪把证书签的，否则这条链路在第 5 步就会安静地停下来，不报错、不提示，只是把链接留给浏览器。</p>
  </>
);

export const zhPosts20261120C = [
  {
    slug: "apk-app-links-not-opening-after-sideload",
    title: "装完 APK 点链接还是跳浏览器：Android App Links 验证机制与 assetlinks.json 逐层排查",
    description: "APK 装好了、App 也能手动打开，但点网页链接还是被浏览器接管，或者弹出「打开方式」里根本找不到刚装的应用。这类问题几乎都出在 App Links 的域名验证链路上：intent-filter 声明、assetlinks.json 可达性、签名证书 SHA-256 指纹是否匹配，以及 Android 12 之后新增的用户开关。本文给出完整的验证机制表格、可直接执行的 adb 与 curl 命令、九步排查路径、版本差异速查、FAQ 与站内延伸阅读。",
    date: "2026-11-20",
    readTime: "17 min read",
    tags: ["App Links","assetlinks.json","adb","签名证书","故障排查","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261120CList = toList(zhPosts20261120C);
