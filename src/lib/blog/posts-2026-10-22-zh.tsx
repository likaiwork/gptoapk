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
    question: "安卓手机不 root 怎么看闪退日志？",
    answer:
      "用系统自带的错误报告。先在「关于手机」里连点版本号 7 次打开开发者选项，然后进入设置 → 系统 → 开发者选项 → 错误报告 → 完整报告，等一到三分钟会生成一个 zip，解压后找到 bugreport.txt，搜索自己的应用包名，往上翻就能看到 FATAL EXCEPTION 那一段。全程不需要电脑，也不需要 root。",
  },
  {
    question: "有电脑的话最快的抓日志方法是什么？",
    answer:
      "用 ADB。先 adb logcat -c 清空旧日志，然后复现闪退，再执行 adb logcat -b crash。crash 缓冲区只输出致命异常，第一屏就是 FATAL EXCEPTION。要保存就加重定向：adb logcat -b crash > crash.txt。",
  },
  {
    question: "日志里出现 UnsatisfiedLinkError 或 dlopen failed 是什么意思？",
    answer:
      "表示原生库加载失败，典型原因是 CPU 架构不匹配，或者你装的是 split APK 但只装了 base 包，lib 目录是空的。解决办法是用完整包重新安装，或使用支持 split 的安装器把 base 和 config.arm64_v8a 一起装进去。",
  },
  {
    question: "重启手机、清理内存能解决闪退吗？",
    answer:
      "只对 OutOfMemoryError 有效。如果日志里是 UnsatisfiedLinkError、ParseException 或 SecurityException，说明问题出在安装包本身或权限上，重启一百次也没用。正确顺序是先看日志判断类别，再动手处理。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "手机能上网，为什么单个 App 联网失败？",
    answer:
      "三大类原因：一是权限问题，国产 ROM 常把新装 App 的移动数据联网默认关掉，只留 WiFi；二是安装包不完整，split APK 缺少原生网络模块；三是系统时间错误，会让所有 HTTPS 请求的证书校验失败，App 通常只显示「网络错误」。",
  },
  {
    question: "怎么判断 split APK 是不是装残缺了？",
    answer:
      "执行 adb shell pm path 加上你的包名。正常应该输出多行：base.apk 加上 split_config.arm64_v8a.apk 和密度分组。如果只有 base.apk 一行，说明原生库缺失，依赖它的网络模块和渲染都会出问题。",
  },
  {
    question: "系统时间不对真的会导致 App 加载不出内容吗？",
    answer:
      "会。HTTPS 证书校验会把设备时间与证书有效期比对，时间偏差过大就会出现 SSLHandshakeException，很多 App 把它统一显示成「网络错误」。把时间设为自动获取，然后重启 App 就能验证。",
  },
  {
    question: "代理或 VPN 软件会导致其他 App 不能联网吗？",
    answer:
      "有可能。全局代理会接管 DNS 和流量，如果某个 App 的域名被规则匹配到一个不通的节点，或者该 App 被排除在代理之外但 DNS 仍然走代理，这个 App 就会单独断网。临时关掉代理软件复现一下即可确认。",
  },
];

const ARTICLE1 = (
  <>
    <p>
      App 一点开就闪退，或者用着用着突然回到桌面——绝大多数人的第一反应是「这软件坏了」「手机不行了」。但闪退
      从来不是玄学，Android 每次崩溃都会留下一条明确的错误记录，只是没人告诉你去哪儿看。
    </p>
    <p>
      这篇讲最实用的部分：<strong>怎么在手机上（不 root、不装电脑软件）把闪退日志抓出来，然后怎么读懂它</strong>。
    </p>
    <div className="not-prose my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
      <p className="m-0 text-sm text-emerald-900 dark:text-emerald-200">
        <strong>核心结论：</strong>闪退日志里 90% 的答案集中在三行——异常类型、出错位置（<code>at ...</code>
        ）、根因（<code>Caused by</code>）。先拿到这三行，再谈解决。
      </p>
    </div>

    <h2>先分清三种「闪退」，处理方式完全不同</h2>
    <p>很多人把三件事混为一谈，所以怎么修都修不好。</p>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">现象</th>
            <th className="text-left py-2 pr-4">特征</th>
            <th className="text-left py-2">常见原因</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">启动即闪退</td>
            <td className="py-2 pr-4">白屏 0.5 秒后回桌面</td>
            <td className="py-2">缺少依赖库、架构不匹配、签名冲突</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">运行中崩溃</td>
            <td className="py-2 pr-4">用了一会儿突然退出</td>
            <td className="py-2">空指针、权限被拒、内存不足</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">无响应（ANR）</td>
            <td className="py-2 pr-4">卡住不动，弹出「应用无响应」</td>
            <td className="py-2">主线程阻塞、死锁</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      启动即闪退，多半是<strong>你装的这个 APK 不对</strong>（尤其从第三方站点下载的包）；运行中崩溃多半是数据或
      权限问题；ANR 通常是 App 自身代码质量。
    </p>

    <h2>方法一：系统自带的「错误报告」（最省事，无需任何工具）</h2>
    <p>这是最容易被忽略、但成功率最高的方法，适用于 Android 7.0 及以上所有手机。</p>
    <ol>
      <li>打开设置 → 关于手机，连续点击「版本号」7 次，开启开发者选项</li>
      <li>返回设置 → 系统 → 开发者选项</li>
      <li>找到「错误报告」，选择「完整报告」</li>
      <li>等待 1–3 分钟，系统生成通知，点击可分享或保存</li>
    </ol>
    <p>
      得到的是一个 zip，解压后找到 <code>bugreport-*.txt</code>（几十 MB，别用手机记事本打开）。在里面搜索你的
      包名，往上翻找 <code>FATAL EXCEPTION</code>。
    </p>
    <p>优点是系统级完整日志，连 ANR 的 trace 都有；缺点是文件很大。</p>

    <h2>方法二：ADB + logcat（最专业，需要电脑）</h2>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`# 1. 手机开启 USB 调试
# 2. 连接电脑，确认设备识别
adb devices

# 3. 清空旧日志，避免干扰
adb logcat -c

# 4. 只抓崩溃级别的日志（最关键的一条命令）
adb logcat -b crash

# 5. 或者抓指定应用的输出
adb logcat --pid=$(adb shell pidof -s com.example.app)`}</pre>
    <p>复现闪退时，终端会立刻打印出类似这样的内容：</p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`FATAL EXCEPTION: main
Process: com.example.app, PID: 12345
java.lang.UnsatisfiedLinkError: dlopen failed: library "libfoo.so" not found
    at java.lang.Runtime.loadLibrary0(Runtime.java:1016)
    at com.example.app.MainActivity.onCreate(MainActivity.java:42)`}</pre>
    <p>
      存文件更方便分析：<code>adb logcat -b crash &gt; crash.txt</code>。
    </p>

    <h2>方法三：手机上的日志查看 App</h2>
    <p>
      手边没电脑时，日志查看器能应付大部分场景。Android 4.1 之后这类 App 不需要 root 就能读本应用范围内的日志；
      Android 10+ 要读全部日志，一般需要一次 ADB 授权：
    </p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`adb shell pm grant com.example.logcat android.permission.READ_LOGS`}</pre>
    <p>授权一次，长期有效。</p>

    <h2>怎么读：五个关键词定位问题</h2>
    <p>拿到日志后别慌，按这个顺序扫。</p>
    <p>
      <strong>1. <code>FATAL EXCEPTION</code></strong>——崩溃的起点，往下三行就是原因。
    </p>
    <p>
      <strong>2. 异常类型</strong>——这一行直接告诉你性质：
    </p>
    <ul>
      <li>
        <code>NullPointerException</code> → App 代码 bug，用户无解
      </li>
      <li>
        <code>UnsatisfiedLinkError</code> / <code>dlopen failed</code> → <strong>架构不匹配</strong>，或缺 so 库
      </li>
      <li>
        <code>OutOfMemoryError</code> → 内存不足或内存泄漏
      </li>
      <li>
        <code>SecurityException</code> → 权限被拒
      </li>
      <li>
        <code>ParseException</code> / <code>PackageParser</code> → 包本身损坏
      </li>
    </ul>
    <p>
      <strong>3. <code>Caused by:</code></strong>——真正的根因往往在这里，前面那行只是表象。
    </p>
    <p>
      <strong>4. <code>at com.xxx.yyy</code></strong>——出错的具体类和方法。看到自己的包名说明是 App 的锅；看到{" "}
      <code>android.</code> 开头说明是系统侧的问题。
    </p>
    <p>
      <strong>5. <code>Process</code> 和 <code>PID</code></strong>——确认崩的是哪个进程。多进程 App 经常崩的是推送
      进程而不是主进程。
    </p>

    <h2>三类高频场景的对应解法</h2>
    <h3>UnsatisfiedLinkError（装了但打不开）</h3>
    <p>这是第三方渠道下载 APK 最常见的问题。原因通常是：</p>
    <ul>
      <li>只装了 split APK 的 base，没装对应的 config.arm64_v8a</li>
      <li>下载的是别的 CPU 架构的包</li>
      <li>包体被「精简」过，so 文件被删了</li>
    </ul>
    <p>
      解法：重新下载完整包，或用支持 split 的安装器一次性把 base + config 全部装上。先判断手机架构：
      <code>adb shell getprop ro.product.cpu.abi</code>。
    </p>

    <h3>SecurityException 或权限相关崩溃</h3>
    <p>
      Android 13+ 把通知、媒体、附近设备权限全部拆开，老版本 App 会直接崩。解法：设置 → 应用 → 权限 → 手动把
      相关权限全部允许。
    </p>

    <h3>升级后必崩（数据不兼容）</h3>
    <p>
      通常是新版本读取了旧版本的数据结构。先清除缓存；不行再清除数据（会丢登录态）；仍不行就卸载重装，但先在电脑上
      备份 APK 本身。
    </p>

    <h2>给非技术用户的极简判断表</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">日志里看到</th>
            <th className="text-left py-2 pr-4">结论</th>
            <th className="text-left py-2">你该做什么</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">dlopen failed</td>
            <td className="py-2 pr-4">包不完整或架构错</td>
            <td className="py-2">换完整包重装</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">PackageParser / ParseException</td>
            <td className="py-2 pr-4">包损坏</td>
            <td className="py-2">重新下载</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SecurityException</td>
            <td className="py-2 pr-4">权限缺失</td>
            <td className="py-2">手动开权限</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">OutOfMemoryError</td>
            <td className="py-2 pr-4">内存不够</td>
            <td className="py-2">清后台、关闭其他 App</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">NullPointerException</td>
            <td className="py-2 pr-4">App 自身 bug</td>
            <td className="py-2">更新版本或换旧版</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>一个容易踩的坑</h2>
    <p>
      很多人闪退后第一件事是「重启手机」「清理内存」，这只对内存类问题有效。如果日志里出现的是{" "}
      <code>UnsatisfiedLinkError</code> 或 <code>ParseException</code>，重启一百次也没用——{" "}
      <strong>问题不在手机，在你手上那个安装包</strong>。
    </p>
    <p>
      所以顺序应该是：<strong>先看日志 → 判断类别 → 再动手</strong>。这也是为什么专业排查从来不是「重装大法」，
      而是先拿证据。
    </p>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      需要一个经过校验、结构完整的 APK 包？{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      提供完整安装包与校验值，避免下载被截断。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p>
      装好的 App 一打开就转圈、提示「网络连接失败」、或者白屏加载不出内容——但手机明明连着 WiFi，微信能发消息，浏览器
      能开网页。
    </p>
    <p>
      这种情况特别让人困惑：<strong>网是通的，为什么只有这个 App 不通？</strong>
    </p>
    <p>
      答案往往不在「网络」，而在这个 App <strong>没有拿到访问网络的资格</strong>，或者拿到的资格被系统拦截了。
    </p>
    <div className="not-prose my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
      <p className="m-0 text-sm text-emerald-900 dark:text-emerald-200">
        <strong>核心结论：</strong>Android 上「App 不能联网」有三大类原因——
        <strong>权限没给</strong>、<strong>系统网络策略拦了</strong>、
        <strong>App 自己的网络配置（域名/证书/代理）不匹配</strong>。90% 的情况在前两类。
      </p>
    </div>

    <h2>第一步：确认是不是「这一个 App」的问题</h2>
    <p>先做个对照实验，避免白忙：</p>
    <ol>
      <li>打开浏览器访问任意网页 → 能开吗？</li>
      <li>打开另一个第三方 App → 能联网吗？</li>
      <li>只有你这一个 App 不行？</li>
    </ol>
    <p>
      如果前两步都不行，那是手机整体网络问题（WiFi 需认证、流量开关关了、VPN 挂了），跟 APK 无关。如果只有第三步
      不行，继续往下看。
    </p>

    <h2>第二步：检查网络权限（最常见，尤其国产 ROM）</h2>
    <p>
      Android 6.0 之后，<code>INTERNET</code> 属于「安装即授予」的普通权限，正常不会出现在权限列表里。但部分
      定制 ROM 会额外做一层网络管控。
    </p>
    <ul>
      <li>小米/红米：设置 → 应用设置 → 应用管理 → App → 联网控制（有单独的 WiFi/流量开关）</li>
      <li>华为/荣耀：手机管家 → 流量管理 → 应用联网</li>
      <li>OPPO/一加：设置 → 应用管理 → App → 流量使用</li>
      <li>vivo：i管家 → 流量监控 → 联网管理</li>
    </ul>
    <p>
      这是国产手机最常见的坑：<strong>系统默认把新装 App 的移动数据联网关掉了</strong>，只留 WiFi。出门用流量时
      立刻「断网」。
    </p>

    <h2>第三步：关闭系统的「隐私/纯净」拦截</h2>
    <p>国产 ROM 的隐私保护会拦截「可疑应用」的网络请求，表现就是 App 能打开但一直加载不出来。</p>
    <ul>
      <li>华为：设置 → 系统和更新 → 纯净模式（关闭）</li>
      <li>小米：设置 → 隐私保护 → 特殊权限设置 → 查看被限制的应用</li>
      <li>部分机型：安全中心 → 网络助手 → 查看是否被加入黑名单</li>
    </ul>

    <h2>第四步：检查是否被 VPN / 代理模块劫持</h2>
    <p>如果你装过代理类工具，它们会接管全局流量。问题在于：</p>
    <ul>
      <li>代理规则把该 App 的域名路由到一个不通的节点</li>
      <li>该 App 被排除在代理之外，同时系统 DNS 又被代理改了</li>
    </ul>
    <p>
      验证方法：临时关掉代理 App 再试。如果通了，说明是分流规则的问题，去规则里把该 App 或域名设为「直连」。
    </p>

    <h2>第五步：检查 APK 的架构与完整性（第三方包的专属问题）</h2>
    <p>
      如果你是从第三方站点下载的 APK，这一条概率很高。典型症状：App 界面能打开，但一点内容就提示网络错误，日志里
      能看到 <code>NoClassDefFoundError</code> 或 <code>UnsatisfiedLinkError</code>。
    </p>
    <p>
      原因：很多 App 把网络请求、加解密、图片解码放在原生库（.so）里。如果装的是 split APK 但只装了 base 包，
      原生库缺失，网络模块直接初始化失败。
    </p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`adb shell pm path com.example.app
# 正常应输出多行：base.apk / split_config.arm64_v8a.apk ...
# 如果只有 base.apk，说明是残缺安装`}</pre>
    <p>解法：用支持 split 的安装器把 base + config 一起装。</p>

    <h2>第六步：证书问题（Android 7.0+ 的重大变化）</h2>
    <p>
      很多人不知道：<strong>Android 7.0 起，App 默认不再信任用户安装的 CA 证书</strong>。这意味着：
    </p>
    <ul>
      <li>抓包工具（Charles、Fiddler、HttpCanary）的自签证书，只有 App 显式声明信任时才生效</li>
      <li>一些老 App 内部固定了证书链（Certificate Pinning），证书一换就整站不通</li>
      <li>
        手机系统时间错乱（刷机后、换电池后）会导致证书校验失败 → 所有 HTTPS 都失败
      </li>
    </ul>
    <p>验证：把手机时间设成「自动获取」，重启 App 再试。时间问题造成的「App 不能联网」非常常见，且极易被忽略。</p>

    <h2>第七步：DNS 与域名问题</h2>
    <p>部分海外 App 因 DNS 污染而无法解析，表现为一直转圈。在电脑上（同一 WiFi）做一次基础判断：</p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`nslookup api.example.com`}</pre>
    <p>
      如果解析不出结果，或解析到明显错误的 IP，就是 DNS 层面的问题。另外，在 APN 设置里把「IP 协议」改成 IPv4/IPv6
      也能解决一批疑难情况。
    </p>

    <h2>第八步：数据与缓存污染</h2>
    <p>如果 App 之前能用、某次之后突然不能联网：</p>
    <ol>
      <li>清除缓存（安全，不丢数据）</li>
      <li>清除数据（会丢登录态）</li>
      <li>卸载重装</li>
    </ol>
    <p>
      某些情况下，App 的本地 shared_prefs 里存了错误的 token 或旧的服务器地址，会导致所有请求返回 401 或连接超时。
    </p>

    <h2>一个判断捷径：看日志</h2>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`adb logcat | grep -iE "UnknownHost|SocketTimeout|SSLHandshake|ConnectException|Permission denied"`}</pre>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">日志关键词</th>
            <th className="text-left py-2 pr-4">含义</th>
            <th className="text-left py-2">处理</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">UnknownHostException</td>
            <td className="py-2 pr-4">域名解析失败</td>
            <td className="py-2">DNS / 网络不通 / 代理</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SocketTimeoutException</td>
            <td className="py-2 pr-4">连上了但不响应</td>
            <td className="py-2">服务器或代理节点</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SSLHandshakeException</td>
            <td className="py-2 pr-4">证书握手失败</td>
            <td className="py-2">系统时间、抓包证书、Pinning</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">ConnectException</td>
            <td className="py-2 pr-4">连接被拒绝</td>
            <td className="py-2">端口被拦、地址错</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Permission denied</td>
            <td className="py-2 pr-4">网络权限没给</td>
            <td className="py-2">回到第二步</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>按场景的速查表</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">你的情况</th>
            <th className="text-left py-2 pr-4">最可能原因</th>
            <th className="text-left py-2">先做这个</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">流量不能用、WiFi 能用</td>
            <td className="py-2 pr-4">联网控制关了移动数据</td>
            <td className="py-2">检查应用联网设置</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">界面能开、内容加载不出</td>
            <td className="py-2 pr-4">split APK 残缺</td>
            <td className="py-2">检查 pm path，用完整包重装</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">突然所有 App 都不能 HTTPS</td>
            <td className="py-2 pr-4">系统时间错乱</td>
            <td className="py-2">时间设为自动</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">装过抓包/代理工具后坏掉</td>
            <td className="py-2 pr-4">证书或分流规则</td>
            <td className="py-2">关代理、移除证书</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">之前正常，最近突然不行</td>
            <td className="py-2 pr-4">本地数据污染</td>
            <td className="py-2">清除数据重登</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>别急着做的事</h2>
    <p>
      很多人一遇到「不能联网」就立刻恢复出厂设置。其实上面八步里，八成问题都能在三分钟内验证完：先看是不是只有这一个
      App 不行，再看联网控制，再看系统时间，再看是不是残缺包。
    </p>
    <p>恢复出厂设置是最后手段，而且往往会让你丢掉真正需要保留的东西。</p>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      大多数「装完不能上网」的 APK，问题出在包不完整。{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      提供带 split 配置的完整安装包与校验值。
    </p>
  </>
);

export const zhPosts20261022: BlogPostEntry[] = [
  {
    slug: "apk-crash-log-how-to-view",
    title: "APK 应用闪退日志查看方法：不用 root，手机自己就能抓到现场",
    description:
      "闪退不是玄学，Android 每次都留了记录。三条抓日志路径（系统错误报告、adb logcat -b crash、手机日志 App），五个关键词定位原因，附非技术用户判断表。",
    date: "2026-10-22",
    readTime: "10 min read",
    tags: ["android", "apk", "闪退", "排错", "logcat"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-no-internet-after-install",
    title: "APK 下载后无法联网怎么办：从权限到证书，八步排查到底",
    description:
      "网是通的，只有这一个 App 不通。按概率排序的八步排查：联网控制、纯净模式、代理分流、split 包残缺、系统时间、证书、DNS、本地数据，每步附日志关键词。",
    date: "2026-10-22",
    readTime: "11 min read",
    tags: ["android", "apk", "网络", "排错", "教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261022List = toList(zhPosts20261022);
