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
    question: "「应用无响应」弹窗是什么意思？",
    answer:
      "这是 ANR（Application Not Responding）。触发条件很明确：主线程超过 5 秒没有响应输入，或前台广播超过 10 秒没处理完。弹了就说明主线程真的被卡住了，不是系统误报。",
  },
  {
    question: "点「等待」能继续用，还需要处理吗？",
    answer:
      "需要。偶发一次可以观察，但如果同一场景反复出现，说明有稳定的阻塞点，只是还没严重到必须关闭。反复点「等待」只会让使用体验越来越差。",
  },
  {
    question: "清缓存和清数据有什么区别？",
    answer:
      "清缓存只删缓存目录，登录状态和本地内容都在；清数据等于恢复出厂设置，账号、聊天记录、设置全部丢失。排查时先清缓存，清数据是最后手段，且必须先备份。",
  },
  {
    question: "怎么确认是不是装错了 CPU 架构的包？",
    answer:
      "设备架构用 adb shell getprop ro.product.cpu.abi 查，一般是 arm64-v8a；APK 里的架构用 unzip -l 看 lib/ 下的目录名。只有 armeabi-v7a 的包装在 arm64 设备上能跑但很慢，容易 ANR。",
  },
  {
    question: "ANR 日志里看到 nativePollOnce 说明什么？",
    answer:
      "说明主线程其实在空闲等待消息，卡顿不在应用自己的代码里。这时候去查系统层面：省电模式、后台应用过多、存储空间告急，或者这台设备本身就带不动这个版本。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "渠道包和普通 APK 有什么区别？",
    answer:
      "功能完全一样，只是多埋了一个渠道标识。应用启动时读出来上报给统计平台，用来区分用户是从哪个渠道装上的。",
  },
  {
    question: "为什么往 META-INF 里加空文件的老办法不能用了？",
    answer:
      "Android 11 起对 APK 签名块做了严格校验，往 META-INF 加文件会破坏 v2/v3 签名，安装直接失败。这个方案在新系统上已经失效。",
  },
  {
    question: "往 APK Signing Block 写渠道信息为什么不会破坏签名？",
    answer:
      "因为 v2 签名覆盖的是 ZIP 条目的内容，Signing Block 本身被排除在签名范围之外，所以可以往里追加自定义数据。VasDolly、walle 都用这个思路，一个渠道包只需写几十字节，速度极快。",
  },
  {
    question: "渠道包之间可以互相覆盖安装吗？",
    answer:
      "必须可以，前提是所有渠道包用同一个签名，打包时只写 Signing Block 不重新签名。如果打包工具重签了，用户就无法从应用市场版覆盖安装到推广渠道版。",
  },
  {
    question: "做增量更新之后渠道号丢了怎么办？",
    answer:
      "因为差分出来的新包会替换 Signing Block。解决办法是把渠道注入固定为更新流程的最后一步，每次生成最终包之后再写渠道信息。",
  },
];

const ARTICLE1 = (
  <>
    <p>
      装上一个 APK，点了图标，屏幕卡住几秒，然后弹出&ldquo;应用无响应&rdquo;&mdash;&mdash;下面是&ldquo;等待&rdquo;和&ldquo;关闭应用&rdquo;两个按钮。点&ldquo;等待&rdquo;过一会儿又能用，点&ldquo;关闭&rdquo;下次开还是这样。
    </p>

    <p>
      这个弹窗的正式名字叫 <strong>ANR（Application Not Responding）</strong>，触发条件很明确：
      <strong>应用的主线程超过 5 秒没有响应输入事件，或者前台广播超过 10 秒没处理完</strong>。系统不会无缘无故冤枉一个应用，弹了就说明主线程真的被卡住了。
    </p>

    <p>关键是分清是&ldquo;偶发&rdquo;还是&ldquo;必现&rdquo;，两者的排查路径完全不同。</p>

    <h2>先做一次分型</h2>

    <p>动手之前先回答三个问题，答案决定了后面查哪里：</p>

    <ol>
      <li>
        <strong>是所有场景都卡，还是只在某个页面卡？</strong> 只在进入某个功能时卡，说明那个功能里有阻塞操作；一启动就卡，说明初始化阶段有问题。
      </li>
      <li>
        <strong>是刚装完就卡，还是用了一段时间才卡？</strong> 刚装就卡，多半是包体与设备不匹配；用久了卡，则是数据、缓存或存储空间的问题。
      </li>
      <li>
        <strong>同一版本在别的设备上正常吗？</strong> 别的设备正常，问题出在这台机器的环境上（存储、内存、系统版本）。
      </li>
    </ol>

    <p>分完型再往下走，能省掉一大半无效操作。</p>

    <h2>第一步：清缓存，不动数据</h2>

    <p>
      最常见的成因是缓存损坏或者缓存目录读不出来。侧载版本尤其容易出问题，因为它的数据目录是新建的，如果外部存储权限没给全，应用读写缓存时就会阻塞等待。
    </p>

    <p>
      操作：设置 → 应用 → 目标应用 → 存储 → <strong>清除缓存</strong>（注意不是&ldquo;清除数据&rdquo;）。
    </p>

    <p>
      清完立刻测试。如果好了，大概率是这个原因，但要看会不会复发。<strong>24 小时内复发</strong>说明根因没解决，继续往下走；过几周才复发，基本可以接受，定期清一下就行。
    </p>

    <h2>第二步：确认存储空间</h2>

    <p>
      这条被严重低估。安卓在可用空间低于某个阈值时会<strong>限制应用写入</strong>，而写入失败在某些应用里表现为无限重试，主线程就卡住了。
    </p>

    <p>看两个数字：</p>

    <ul>
      <li>系统总可用空间：低于 <strong>10%</strong> 就该清理了，低于 2GB 基本必出问题</li>
      <li>应用自身的缓存占用：超过 2GB 的应用值得单独清一次</li>
    </ul>

    <p>
      清理优先级：聊天软件的图片视频缓存 &gt; 视频类应用的离线内容 &gt; 系统相册缩略图 &gt; 下载目录里残留的 APK。
    </p>

    <p>
      顺带一提，<strong>残留的安装包</strong>是最容易被忽略的一块。手机里经常躺着十几个几百 MB 的旧 APK，装完就没用了。
    </p>

    <h2>第三步：看是不是版本不匹配</h2>

    <p>
      侧载的 APK 有个典型陷阱：<strong>下载了错误架构的包</strong>。现在安卓设备主流是 <code>arm64-v8a</code>，但网上仍有大量 <code>armeabi-v7a</code> 甚至 <code>x86</code> 的包。装错架构的 APK 通常能装上，但运行时要通过一层翻译层执行，性能极差，启动直接 ANR。
    </p>

    <pre>
      <code>{`adb shell getprop ro.product.cpu.abi
# 正常输出: arm64-v8a

unzip -l your-app.apk | grep "lib/"
# 如果只有 lib/armeabi-v7a/，而设备是 arm64，这就是根因`}</code>
    </pre>

    <p>
      <strong>换一个 arm64 的包重新装</strong>即可。这类问题不修包本身，只修&ldquo;下哪个包&rdquo;。
    </p>

    <h2>第四步：抓一次 ANR 日志</h2>

    <p>
      前几步没解决，就别猜了，直接看系统说了什么。ANR 发生时系统会把主线程的堆栈写进日志，这是唯一能直接看到&ldquo;卡在哪一行&rdquo;的证据。不用 root，用 adb 就能抓：
    </p>

    <pre>
      <code>{`adb logcat -c          # 清空缓冲
# 然后操作应用直到弹出 ANR，再执行:
adb logcat -d | grep -A 50 "ANR in"`}</code>
    </pre>

    <p>
      输出里重点看两块：<strong>Reason:</strong> 一行写着触发原因，比如 <code>Input dispatching timed out</code>；后面的主线程堆栈，最顶上几行就是阻塞位置。
    </p>

    <p>常见堆栈与含义对照：</p>

    <ul>
      <li>
        <strong>nativePollOnce</strong>：主线程空闲，问题在别处，多半是渲染或系统卡顿，不是应用问题
      </li>
      <li>
        <strong>File / SQLite 相关</strong>：磁盘 IO 阻塞，清理存储、检查存储是否满或损坏
      </li>
      <li>
        <strong>okhttp / HttpURLConnection</strong>：网络请求跑在主线程，这是应用自身的 bug，只能等更新或换版本
      </li>
      <li>
        <strong>synchronized / wait</strong>：死锁，重启进程可临时缓解
      </li>
      <li>
        <strong>GC 相关反复出现</strong>：内存不足频繁回收，加内存、降低画质设置或换轻量版本
      </li>
    </ul>

    <p>
      看到 <code>nativePollOnce</code> 而应用仍然卡，通常说明不是这个应用自身的问题，而是系统层面在拖慢&mdash;&mdash;检查是不是开了省电模式、后台应用太多、或者这台设备本身已经跑不动这个版本了。
    </p>

    <h2>第五步：杀进程、重启、降级</h2>

    <p>到这一步说明单次修复无效，只能靠环境重置：</p>

    <ol>
      <li>
        <strong>强制停止</strong>再启动。比清缓存更彻底，能清掉进程内的坏状态。
      </li>
      <li>
        <strong>重启手机</strong>。清掉系统服务里的残留，也让存储的写入队列清空。很多&ldquo;用久了就卡&rdquo;的问题重启就消失，说明是系统层面的资源耗尽。
      </li>
      <li>
        <strong>卸载重装</strong>，这次带上数据清除。注意重装会丢登录状态和本地数据，先备份。
      </li>
      <li>
        <strong>降级到上一个版本</strong>。如果新版本才出现 ANR，这是最有效的临时方案。降级需要先卸载（受签名和版本号约束），所以备份是前提。
      </li>
    </ol>

    <h2>什么时候该放弃</h2>

    <p>有些情况不值得继续折腾：</p>

    <ul>
      <li>
        <strong>设备太老，应用的最低要求已超过设备能力。</strong>看应用的 <code>minSdkVersion</code> 和官方标注的系统要求。一台 Android 8 的机器跑 2026 年的应用，ANR 是正常的，不是 bug。
      </li>
      <li>
        <strong>应用本身有已知缺陷。</strong>查一下开发者的问题反馈区，如果大量同型号设备都在报，那就是等修复。
      </li>
      <li>
        <strong>应用需要谷歌服务而设备没有。</strong>很多海外应用启动时会同步等 GMS 初始化，没有 GMS 的设备会卡在这个等待上直到超时。
      </li>
    </ul>

    <h2>一个预防习惯</h2>

    <p>
      ANR 大多数不是&ldquo;突然坏的&rdquo;，而是<strong>存储越来越满 + 缓存越积越大 + 后台进程越来越多</strong>三者叠加的结果。养成两个习惯能挡掉大部分：每月看一次存储占用，低于 15% 就清理；装完 APK 立刻删掉安装包本身，别留在下载目录里。
    </p>

    <p>
      这两件事加起来用不了五分钟，但能省下后面大量的排查时间。更多装机与排障指南可以看{" "}
      <Link href="/blog">gptoapk 博客</Link>。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p>
      同一个 App，从官网下的、从应用市场下的、从运营推广链接下的，装到手机上功能一样，但打开后统计到的渠道不同、推送到达的对象不同、部分配置也不同。这背后就是<strong>渠道包</strong>机制。
    </p>

    <p>这篇讲清三件事：渠道信息怎么塞进 APK、打包工具改了什么、以及为什么老办法在 Android 11 之后会失效。</p>

    <h2>一句话原理</h2>

    <p>
      渠道信息的本质是<strong>在 APK 里埋一个可读的标记</strong>，应用启动时读出来，上报给统计平台。标记埋在哪儿，决定了打包方式。历史上出现过四代做法，前两代已经不能用了。
    </p>

    <h2>第一代：META-INF 空文件（已失效）</h2>

    <p>
      最古老也最省事的方式：在 APK 的 <code>META-INF/</code> 目录下放一个空文件，文件名就是渠道号。
    </p>

    <pre>
      <code>{`META-INF/
├── MANIFEST.MF
├── CERT.SF
├── CERT.RSA
└── channel_googleplay        ← 空文件，0 字节`}</code>
    </pre>

    <p>
      打包速度极快&mdash;&mdash;<strong>不用重新签名</strong>，几秒钟能出一个渠道包，所以美团早期的 <code>packer-ng</code> 就是这么干的。应用启动时遍历 <code>META-INF/</code> 找 <code>channel_</code> 前缀的文件，把后缀当渠道号。
    </p>

    <p>
      <strong>为什么失效：</strong>Android 11 开始，系统对 APK 签名块做了严格校验，往 <code>META-INF/</code> 里加文件会破坏 v2/v3 签名校验，安装直接失败。而且这种方式对加固后的 APK 也不适用。
    </p>

    <h2>第二代：修改 AndroidManifest 的 meta-data</h2>

    <pre>
      <code>{`<meta-data
    android:name="UMENG_CHANNEL"
    android:value="channel_googleplay" />`}</code>
    </pre>

    <p>
      应用里用 <code>PackageManager</code> 读出来：<code>getApplicationInfo(pkg, GET_META_DATA).metaData.getString(&quot;UMENG_CHANNEL&quot;)</code>。
    </p>

    <p>
      这种方式最正统，友盟等统计 SDK 至今仍支持。缺点是<strong>每改一次都要重新编译、重新签名</strong>，一个渠道包一分多钟，几百个渠道就是几个小时。所以现在基本不用了：太慢，而且无法做增量。
    </p>

    <h2>第三代：往 APK Signing Block 写（主流方案）</h2>

    <p>
      Android 7.0 引入了 APK Signature Scheme v2。v2 签名会在 ZIP 的中央目录之前插入一个 <strong>APK Signing Block</strong>，里面除了签名数据，还有一块 ID-value 区域，允许写入自定义数据。
    </p>

    <p>
      关键点：<strong>v2 签名校验时，签名覆盖的是&ldquo;ZIP 条目内容&rdquo;，这个 Signing Block 本身被排除在签名范围之外</strong>。所以可以往里面加东西而不破坏签名。
    </p>

    <pre>
      <code>{`[ ZIP 条目区 ]
[ APK Signing Block
    ├─ 长度 + Magic "APK Sig Block 42"
    ├─ v2 签名块 (ID 0x7109871a)
    ├─ v3 签名块 (ID 0xf05368c0)
    └─ 自定义块  (ID 0x71777777)  ← 渠道信息写在这里
]
[ ZIP 中央目录 ]
[ EOCD ]`}</code>
    </pre>

    <p>
      腾讯的 <strong>VasDolly</strong>、美团的 <strong>walle</strong> 都是这个思路。速度非常快&mdash;&mdash;出一个渠道包只需要往 Signing Block 里写几十字节，不重新压缩、不重新签名，<strong>一秒能出几十个包</strong>。应用侧读取需要 native 代码，因为要解析 ZIP 结构，Java 层的 <code>ZipFile</code> 不方便定位 Signing Block，主流实现都是通过 JNI 读再缓存结果。
    </p>

    <p>
      <strong>注意 v3：</strong>v3 签名为了支持密钥轮换，对整个 APK（含 Signing Block）加了额外的完整性保护。VasDolly 等工具已适配，但<strong>自研的脚本直接照搬 v2 时代的偏移量计算会失败</strong>。判断依据是 APK 里有没有 ID 为 <code>0xf05368c0</code> 的块。
    </p>

    <h2>第四代：应用外的渠道归因（新趋势）</h2>

    <p>近两年越来越多团队干脆<strong>不在包里埋渠道</strong>，而是走归因：</p>

    <ul>
      <li>
        <strong>Google Play Install Referrer</strong>：从商店安装时，商店会把来源信息写进 referrer，首次启动时由 Play 服务返回。缺点是对 Google Play 之外的渠道无效。
      </li>
      <li>
        <strong>国内应用市场的渠道回调</strong>：华为、小米、OPPO 等市场的安装接口会带回渠道标识。
      </li>
      <li>
        <strong>推广链接 + 服务端归因</strong>：点击链接时先落到落地页，拿到设备指纹或写入 id，安装后首次启动与服务端比对。
      </li>
    </ul>

    <p>
      好处是<strong>只出一个包</strong>，不用打包，也不用维护几十个渠道包文件。坏处是归因有精度损失，而且强依赖平台配合。
    </p>

    <h2>实际怎么选</h2>

    <ul>
      <li>
        <strong>国内分发，渠道几十到几百个</strong>：APK Signing Block 方案（VasDolly / walle）
      </li>
      <li>
        <strong>既要上架商店也要走自有渠道</strong>：Signing Block + 商店 Install Referrer 组合
      </li>
      <li>
        <strong>加固过的 APK</strong>：必须用支持加固的打包工具，或改用归因方案
      </li>
      <li>
        <strong>渠道数很少（小于 10 个）</strong>：直接改 manifest 重新编译，维护成本最低
      </li>
      <li>
        <strong>海外为主</strong>：优先考虑 Install Referrer 归因，减少包管理成本
      </li>
    </ul>

    <h2>三个容易踩的坑</h2>

    <p>
      <strong>坑一：渠道信息在卸载重装后会读错。</strong>某些打包工具会把渠道写进设备的外部存储缓存，重装后读到旧的。渠道值必须在每次冷启动时从 APK 本体读取，不要跨安装持久化。
    </p>

    <p>
      <strong>坑二：增量更新后渠道丢失。</strong>做 APK 差分更新时，新包如果是从官方包差出来的，Signing Block 会被替换，渠道信息就没了。渠道注入必须作为更新流程的最后一步。
    </p>

    <p>
      <strong>坑三：不同渠道包签名不一致。</strong>如果打包工具在写 Signing Block 时重新签名了，会导致渠道包之间签名不同，用户无法从应用市场版本互相覆盖安装。必须用同一个签名，只写块不重签。
    </p>

    <h2>验证渠道是否写对了</h2>

    <pre>
      <code>{`# 查看签名方案
apksigner verify --print-certs -v your-app.apk

# 确认 APK 里存在 Signing Block
python3 - <<'EOF'
data = open("your-app.apk","rb").read()
print("magic at", data.rfind(b"APK Sig Block 42"))
EOF`}</code>
    </pre>

    <p>
      再配合 <code>unzip -l</code> 确认没有往 <code>META-INF/</code> 里塞东西，基本就能判断渠道方案是否健康。
    </p>

    <p>
      渠道打包这件事，技术本身不难，<strong>难的是在多渠道、多商店、加固、增量更新的约束下保持一致性</strong>。选一个成熟工具（VasDolly 是目前维护最勤的），把渠道注入固定成构建流水线的最后一个确定性步骤，比自研脚本省心得多。更多安卓打包与分发的资料在{" "}
      <Link href="/blog">gptoapk 博客</Link>。
    </p>
  </>
);

export const zhPosts20261105 = [
  {
    slug: "android-apk-app-not-responding-fix",
    title: "APK 应用无响应怎么处理：从弹窗到彻底解决的排查顺序",
    description:
      "「应用无响应」是 ANR，触发条件是主线程 5 秒没响应输入。本文按分型、清缓存、查存储、核架构、抓 ANR 日志、降级的顺序给出可执行步骤，并说明什么情况下应该放弃而不是继续折腾。",
    date: "2026-11-05",
    readTime: "9 min read",
    tags: ["android", "apk", "troubleshooting"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-multi-channel-packaging",
    title: "APK 多渠道打包原理：四代方案与 Signing Block 工作机制",
    description:
      "渠道包的本质是在 APK 里埋一个可读标记。从 META-INF 空文件到 AndroidManifest meta-data，再到 APK Signing Block 和 Install Referrer 归因，讲清四代做法的原理、失效原因与选型依据。",
    date: "2026-11-05",
    readTime: "10 min read",
    tags: ["android", "apk", "build"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261105List = toList(zhPosts20261105);
