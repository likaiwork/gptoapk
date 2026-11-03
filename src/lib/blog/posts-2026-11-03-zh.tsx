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
    question: "APK 解压后 classes2.dex、classes3.dex 是什么？正常吗？",
    answer:
      "正常。Android 单个 DEX 文件的方法数上限是 65535，超过就要用 multidex 拆成多个文件。但如果应用本身很小却带了多个 dex，就值得警惕——这可能是被塞进了额外模块。",
  },
  {
    question: "META-INF 目录里的文件能证明 APK 是正版吗？",
    answer:
      "不能直接证明，但它是判断的关键入口。META-INF 里是签名与摘要信息，任何对内容的修改都会让摘要失效。真正可靠的判断要用 apksigner verify --print-certs 看证书指纹，与官方公布的指纹比对。",
  },
  {
    question: "lib 目录里只有 armeabi-v7a，没有 arm64-v8a，会怎样？",
    answer:
      "在大多数新设备上会装得上但一打开就崩。Android 14 之后不少旗舰机只保留 64 位内核，纯 32 位应用要么被拦截安装，要么启动即闪退。这种包优先找 arm64 版本。",
  },
  {
    question: "把 APK 解压改个文件再压回去，还能安装吗？",
    answer:
      "装不上。改任何文件都会破坏签名，必须重新签名才能安装，而重签后证书指纹就变了。所以「能装」本身不能证明包是安全的，只说明它有合法或伪造的签名。",
  },
  {
    question: "resources.arsc 和 res 目录有什么区别？",
    answer:
      "resources.arsc 是编译后的资源索引，保存字符串、尺寸、颜色等值的映射；res 目录是具体的图片、布局和 XML 资源。改文案改颜色往往要动 arsc，换图标则动 res。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "国内应用商店搜不到 Zoom，该怎么办？",
    answer:
      "优先去 zoom.us 官网下载 APK，签名与 Google Play 版本一致，是最可信的替代来源。官网有时会按浏览器类型引导到商店，用桌面浏览器打开并滚动到 Download from Zoom 区域能看到 APK 入口。",
  },
  {
    question: "装完打开就闪退，是什么原因？",
    answer:
      "最常见有三个：版本要求高于你的系统版本、WebView 组件过旧、以及下载的包架构不匹配。先更新 Android System WebView，再确认版本的系统要求，最后检查是不是只带了 32 位库。",
  },
  {
    question: "Zoom 更新后要求重新登录，是账号被盗了吗？",
    answer:
      "不是。Zoom 在部分大版本更新后会失效登录态，企业账号尤其常见。提前记好公司 SSO 登录入口，比事后找回密码快得多。",
  },
  {
    question: "能进会议但别人听不到我说话，从哪查？",
    answer:
      "先看会议左下角的音频设置，那里有实时输入电平条——条不动就说明麦克风没通。依次检查麦克风权限、是否被蓝牙耳机占用、以及系统是否把输入设备切到了错误的麦克风。",
  },
  {
    question: "公司配的设备应该装普通版还是 Intune 版？",
    answer:
      "如果公司用 MDM 管理，通常必须装 Intune 版本（包名带 .intune 后缀），普通版会被策略拦截。而且这类环境一般不允许自行升级版本，装错既浪费时间也可能违反设备使用规定，不确定先问 IT。",
  },
];

const ARTICLE1 = (
  <>
    <h1>APK 里到底装了什么？解包后每个目录的作用与排查用途</h1>

    <p>
      把 APK 后缀改成 <code>.zip</code> 就能解开，很多人解过，但看到 <code>classes.dex</code>、<code>lib/</code>、
      <code>res/</code>、<code>META-INF/</code> 一堆目录还是不知道在看什么。这篇按「这个目录是干什么的、改它会不会出事、
      排查问题时看它能得到什么结论」三层来讲，看完你打开任意一个 APK 都能快速判断它是正规包、改包，还是被塞了东西。
    </p>

    <h2>一、整体结构：APK 就是个 ZIP</h2>

    <p>APK 本质是 ZIP 容器，标准结构大致如下（顺序不固定）：</p>

    <pre>
      <code>{`AndroidManifest.xml
classes.dex（可能还有 classes2.dex、classes3.dex…）
resources.arsc
res/
lib/<abi>/
assets/
META-INF/
kotlin/（用了 Kotlin 的项目）`}</code>
    </pre>

    <p>
      判断一个包是否被「二次加工」过，最快的办法就是对比这份清单：
      <strong>多出来的、命名不常见的目录，就是重点怀疑对象</strong>。
    </p>

    <h2>二、逐个目录说明</h2>

    <h3>1. AndroidManifest.xml</h3>

    <p>
      二进制的应用清单，声明包名、版本号、权限、四大组件、<code>minSdkVersion</code> /
      <code>targetSdkVersion</code>、签名方案。它决定了系统怎么「看待」这个应用。
    </p>

    <ul>
      <li>确认包名是否与你以为的一致——山寨包最常见的差异就是包名多一个字母。</li>
      <li>检查权限：一个手电筒应用申请读通讯录、发短信、悬浮窗，直接可以放弃。</li>
      <li>看 <code>targetSdkVersion</code>：太低（比如低于 23）意味着它绕过了很多现代 Android 的安全限制。</li>
    </ul>

    <p>
      Manifest 是二进制 AXML，需要 <code>apktool d</code> 或 <code>androguard</code> 才能读成文本，直接看是乱码。
    </p>

    <h3>2. classes.dex</h3>

    <p>
      Dalvik 字节码，真正的业务代码。多个 dex 说明方法数超过 65535，做了 multidex 分包。
    </p>

    <ul>
      <li>有没有 <code>classes2.dex</code> 但应用本身很小——可能是塞了额外模块。</li>
      <li>
        用 <code>strings classes.dex | grep -i http</code> 能看到硬编码的域名、SDK 标识，这是快速识别「这个包往哪里回传数据」的土办法。
      </li>
      <li>正规应用一般会加固或混淆，看到明文的可疑域名反而更值得警惕。</li>
    </ul>

    <h3>3. resources.arsc + res/</h3>

    <p>
      <code>resources.arsc</code> 是编译后的资源索引（字符串、尺寸、颜色、样式），<code>res/</code>
      是具体的图片、布局、XML 资源。多语言字符串在 <code>res/values-xx/</code> 下。
    </p>

    <ul>
      <li>看 <code>res/</code> 里有没有大量异常图标、引导页，改包常在这里插广告素材。</li>
      <li>商店页显示的图标、名称可被第三方封装层替换，实际 <code>res/mipmap-*/</code> 里的图标未必一致。</li>
    </ul>

    <h3>4. lib/&lt;abi&gt;/</h3>

    <p>
      原生库（.so），按 CPU 架构分目录：<code>arm64-v8a</code>、<code>armeabi-v7a</code>、<code>x86</code>、
      <code>x86_64</code>。
    </p>

    <ul>
      <li>
        这是体积和兼容性问题的关键目录。同时带四种架构体积会翻倍；只有
        <code>armeabi-v7a</code> 的老包在新旗舰机上仍能跑（靠 32 位兼容层），但性能差，且部分 Android 14+
        设备已移除 32 位支持。
      </li>
      <li>检查有没有不认识的 <code>.so</code>，广告或注入 SDK 常以原生库形式存在。</li>
      <li>用 <code>file lib/arm64-v8a/*.so</code> 看 ELF 头，能确认架构是否匹配。</li>
    </ul>

    <h3>5. assets/</h3>

    <p>
      不打进资源索引的原始文件：数据库、网页、字体、模型、配置 JSON。开发者可以自由组织，所以这里「什么都有可能出现」。
    </p>

    <ul>
      <li>网页套壳类应用（WebView + 本地 H5）的整个前端都在这里。</li>
      <li>内置离线包、预置数据库也在这。</li>
      <li>发现体积异常但 <code>lib/</code> 和 <code>res/</code> 都不大的，重点看 <code>assets/</code>。</li>
    </ul>

    <h3>6. META-INF/</h3>

    <p>签名与校验信息：<code>MANIFEST.MF</code>、<code>CERT.SF</code>、<code>CERT.RSA</code>（或 .EC）。</p>

    <ul>
      <li>能看出包用的是 v1 签名还是仅 v2/v3 签名。</li>
      <li>
        <strong>最重要的判断</strong>：任何对 APK 内容的修改都会让这里的摘要失效。用
        <code>apksigner verify --print-certs app.apk</code> 直接看证书指纹，与官方公布的指纹比对，是最可靠的验真方式。
      </li>
      <li>目录本身缺失或不规范，是改包的一个常见痕迹。</li>
    </ul>

    <h3>7. kotlin/ 与其它新兴目录</h3>

    <p>
      Kotlin 项目会带 <code>kotlin/</code> 元数据。此外常见的还有 <code>stamp-cert-sha256</code>（Android 11+ 签名方案 v4
      相关）、<code>BundleConfig.pb</code>（来自 AAB 转换）。这些本身无害，但能帮你判断这个 APK 是官方直接发布的 APK，
      还是从 AAB 转出来的通用包。
    </p>

    <h2>三、一个 5 分钟的快速体检流程</h2>

    <p>拿到一个来源不明的 APK，按这个顺序走：</p>

    <ol>
      <li>改名解压，看顶层目录清单，对照标准结构找多余项。</li>
      <li>看 AndroidManifest（apktool 或 aapt2 dump），核对包名、权限、targetSdk。</li>
      <li>看 lib/ 的架构集合，判断是否与你的设备匹配，是否有陌生 so。</li>
      <li>用 strings 扫 classes.dex，看它连哪些域名。</li>
      <li>用 apksigner 核对证书指纹，与官方比对。</li>
    </ol>

    <p>五步下来，正规包和改包基本能区分开。</p>

    <h2>四、常见误区</h2>

    <p>
      <strong>「解压后重打包还能装」——其实装不上。</strong>
      改任何文件都会破坏签名，除非重新签名，而重签后证书指纹就变了。所以「能装」这件事本身不能证明包是安全的。
    </p>

    <p>
      <strong>「目录多就是病毒」——不是。</strong>
      现代应用（尤其带 Flutter、React Native、Unity 的）目录结构本来就复杂，<code>assets/</code> 里有几万个文件很正常。
      判断依据永远是「有没有异常项」，而不是「项数多少」。
    </p>

    <p>
      <strong>「只信应用商店」——不完全。</strong>
      商店审核也会漏，但它至少能保证签名一致和应用来源可追溯。从第三方站下载时，务必自己验证书，这一步花不了 30 秒。
    </p>

    <h2>小结</h2>

    <p>
      APK 的目录结构是一份「应用自述」：<code>AndroidManifest.xml</code> 说它是谁、<code>classes.dex</code>
      说它做什么、<code>lib/</code> 说它跑在哪、<code>META-INF/</code> 说它由谁签发。理解这四层，比记住工具命令名有用得多。
      日常使用中真正需要你动手的只有一件事——
      <strong>核对签名证书</strong>。
    </p>

    <p>
      需要下载应用时，可以在 <Link href="/zh">gptoapk.com 中文站</Link> 找到经过签名核对的安装包，
      也可以直接看我们的 <Link href="/zh/blog">Android 使用与排错专栏</Link>。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>Zoom 安卓版怎么装最省事：官方渠道、版本选择与常见故障</h1>

    <p>
      Zoom 在国内的使用场景挺分裂：工作用企业账号、上课用学校账号、临时开会用链接。安装环节踩的坑也集中——商店里搜不到、
      装上了打不开、能进会议但没声音、更新后要重新登录。这篇按「从哪装、装哪个版本、装完出问题怎么办」的顺序讲清楚。
    </p>

    <h2>一、先确定你要装的是哪个 Zoom</h2>

    <p>Zoom 在 Android 上有几个不同东西，别装错：</p>

    <ul>
      <li>
        <strong>Zoom Workplace</strong>（原 Zoom Cloud Meetings）：主客户端，开会用，包名
        <code>us.zoom.videomeetings</code>。
      </li>
      <li>
        <strong>Zoom Rooms Controller</strong>：会议室硬件控制器，普通用户用不上。
      </li>
      <li>
        <strong>Zoom for Intune</strong>：企业 MDM 管理版本，包名带 <code>.intune</code> 后缀，普通设备装了可能受限。
      </li>
    </ul>

    <p>
      绝大多数人需要的是第一个。判断办法很简单：装完之后看应用名是「Zoom Workplace」，不是「Zoom Rooms」。
    </p>

    <h2>二、安装渠道的三个选项</h2>

    <h3>1. Google Play（首选，但国内常不可用）</h3>

    <p>
      能正常访问 Play 的设备，直接装 Play 版本。好处是自动更新、签名可信、Play Protect 会做基础扫描。
      常见失败：搜索到但提示「此应用与您的设备不兼容」，这通常是设备区域、账号区域或系统版本限制，不是设备坏了。
    </p>

    <h3>2. Zoom 官网 APK</h3>

    <p>
      zoom.us 的下载页提供 Android APK 直链，这是除 Play 之外最可信的来源，签名与 Play 版本一致。
    </p>

    <ul>
      <li>官网有时会按浏览器类型把页面引导到应用商店，用桌面浏览器打开、滚动到 Download from Zoom 区域能看到 APK 入口。</li>
      <li>下载后务必校验：查看签名证书指纹，与已安装版本应完全一致。</li>
    </ul>

    <h3>3. 第三方 APK 站点</h3>

    <p>前两条路都走不通时的兜底。原则是：</p>

    <ul>
      <li>只下载官方发布过的版本号，不要贪新——新版本未必适配你的系统。</li>
      <li>下载后对照签名证书，和官方版本比对。</li>
      <li>优先选提供 SHA-256 校验值的站点，自己算一遍。</li>
    </ul>

    <p>
      不要从聊天群、网盘链接直接装 APK——这类来源没有任何验证手段，是最常见的钓鱼渠道。
    </p>

    <h2>三、版本怎么选：别盲目追新</h2>

    <p>Zoom 客户端对系统的要求会随版本提高。实际情况是：</p>

    <ul>
      <li>
        <strong>Android 10+</strong>：装最新稳定版，没风险。
      </li>
      <li>
        <strong>Android 8–9</strong>：装当前大版本前一到两个小版本，兼容性更好。
      </li>
      <li>
        <strong>Android 7 及更老</strong>：需要旧版本（大致 5.x 系列），新版会直接拒绝安装。
      </li>
      <li>
        <strong>内存 3GB 以下的旧机</strong>：选旧版本，新版的虚拟背景和降噪很吃资源。
      </li>
    </ul>

    <p>
      判断能不能装的硬指标是 <code>minSdkVersion</code>。装之前看应用信息页的系统要求，比装完报「应用未安装」再折腾省事。
    </p>

    <h2>四、装完常见问题</h2>

    <h3>打开就闪退或停在启动画面</h3>

    <p>
      先重启一次，无效再按顺序：设置 → 应用 → Zoom → 存储 → 清除缓存（
      <strong>不要先清数据</strong>，清了要重新登录）。仍无效则卸载重装。
    </p>

    <p>
      闪退的另一个常见原因是 WebView 组件过旧。Zoom 的部分界面依赖系统 WebView，更新「Android System WebView」往往能解决。
    </p>

    <h3>能进会议但没声音</h3>

    <p>分两种情况区分：</p>

    <ul>
      <li>
        <strong>别人听不到你</strong>：检查麦克风权限是否被拒，以及是否被蓝牙耳机占用。会议中左下角有音频设置，
        能实时看到输入电平条，条不动就是麦克风没通。
      </li>
      <li>
        <strong>你听不到别人</strong>：检查媒体音量（不是通话音量），以及是否插着耳机但系统以为没插。
      </li>
    </ul>

    <h3>视频黑屏</h3>

    <p>
      先确认相机权限。Android 11+ 还有「仅本次允许」的情况，下次开会要注意重新授权。另外部分国产 ROM 有隐私保护开关，
      会屏蔽相机给非系统应用。
    </p>

    <h3>更新后要求重新登录</h3>

    <p>
      正常现象。Zoom 在部分大版本更新后会失效登录态，特别是企业账号。提前记好 SSO 登录入口（公司域名），
      比事后找回密码快。
    </p>

    <h2>五、企业环境特别注意</h2>

    <p>如果公司配发设备或学校统一账号，通常有两条额外要求：</p>

    <ol>
      <li>
        <strong>必须用 Intune 版本</strong>：装了普通版会被 MDM 策略拦。
      </li>
      <li>
        <strong>不能自行升级</strong>：统一版本是为了会议互通，自行升级可能触发客户端版本不匹配的警告。
      </li>
    </ol>

    <p>不确定就问 IT，别自己找安装包——这类环境里装错版本既浪费时间，也可能违反设备使用规定。</p>

    <h2>六、更新策略</h2>

    <ul>
      <li>
        <strong>自动更新开着</strong>，但每月瞄一眼版本号。Zoom 偶发更新会引入问题，出问题能回滚到上一版。
      </li>
      <li>
        <strong>保留上一版的安装包</strong>。APK 最实用的价值就在这里：新版本出问题时能立刻装回旧版。
      </li>
      <li>
        <strong>重大版本更新前先看一次会议</strong>。别在重要会议开始前 5 分钟更新。
      </li>
    </ul>

    <h2>小结</h2>

    <p>
      装 Zoom 这件事本身不复杂，复杂的是渠道和版本的选择。记住三点就够：
      <strong>优先 Play 或官网、装前核对签名、旧设备别追新版本</strong>。
      剩下的故障九成是权限和音视频设备选择的问题，按顺序查一遍就能定位。
    </p>

    <p>
      更多应用安装与排错内容，可以看 <Link href="/zh/blog">gptoapk 中文博客</Link>，或在
      <Link href="/zh">首页</Link> 搜索你要的应用。
    </p>
  </>
);

export const zhPosts20261103 = [
  {
    slug: "apk-inside-directories-explained",
    title: "APK 里到底装了什么？解包后每个目录的作用与排查用途",
    description:
      "解包 APK 后 classes.dex、lib/、res/、META-INF/ 各自是什么？这篇按「作用、改它会不会出事、排查时看它能得到什么结论」三层讲清每个目录，并给出 5 分钟快速体检流程和三个常见误区。",
    date: "2026-11-03",
    readTime: "9 min read",
    tags: ["android", "apk", "安全"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "zoom-android-install-guide",
    title: "Zoom 安卓版怎么装最省事：官方渠道、版本选择与常见故障",
    description:
      "商店搜不到、装上打不开、进会议没声音、更新后要重新登录——Zoom 安装环节的坑很集中。这篇讲清三个安装渠道的可信度排序、按设备状态选版本的对照原则，以及闪退、无声、黑屏四类故障的定位顺序。",
    date: "2026-11-03",
    readTime: "8 min read",
    tags: ["android", "应用推荐", "安装"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261103List = toList(zhPosts20261103);
