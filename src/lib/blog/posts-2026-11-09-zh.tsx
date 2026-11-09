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

const ARTICLE1 = (
  <>
    <p>
      同一个网络，别人的手机下载 APK 三分钟搞定，你这边卡在「12% · 预计剩余 4 小时」一动不动。换浏览器、换时间段、重启手机都试过，还是慢。
    </p>
    <p>
      APK 下载慢这件事很有意思：<strong>它几乎从来不是「网速不够」</strong>。测一下网速经常能看到 300Mbps，可下载速度就是上不去。原因通常藏在下面五个地方，按顺序查，基本一次定位。
    </p>

    <h2>第一步：先分清是「整体慢」还是「单个源慢」</h2>
    <p>用同一个文件做对照：</p>
    <ul>
      <li>从 Google Play 装个几十 MB 的应用试试</li>
      <li>再从你要下载 APK 的那个站点下一个大文件</li>
    </ul>
    <p>
      如果 Play 很快、这个站点很慢 → <strong>是源的问题</strong>，继续第二步，别在手机上折腾了。
      如果两边都慢 → <strong>是本机或本地网络的问题</strong>，跳到第三步。
    </p>
    <p>
      这个分型能省掉大量时间。很多人上来就清缓存、换 DNS，结果源本身限速在 200KB/s，怎么调都没用。
    </p>

    <h2>第二步：源的三种限速，以及怎么绕过</h2>
    <p>公共 APK 镜像站的限速方式主要有三种：</p>
    <p>
      <strong>1. 单连接限速</strong>
    </p>
    <p>
      最常见。服务器对每个 TCP 连接限速 200-500KB/s，但允许多连接。这时用支持多线程下载的工具直接起飞：电脑端用{" "}
      <code>aria2c -x16 -s16 &lt;url&gt;</code>，16 线程并行；手机端用 ADM（Advanced Download Manager）或 1DM，把线程数调到
      16。实测一个 500KB/s 限速的源，16 线程能跑到 6-8MB/s。
    </p>
    <p>
      <strong>2. 按 IP / 按时间限速</strong>
    </p>
    <p>
      免费站常见。高峰时段（晚 8 点到 11 点）慢得离谱，凌晨又正常。这种情况只能换时间段，或者换源。
    </p>
    <p>
      <strong>3. 需要登录才给满速</strong>
    </p>
    <p>
      不少站点匿名下载走限速通道，登录后走 CDN。如果你常用某个站，注册个账号往往立刻见效。
    </p>
    <p>
      另外注意：<strong>有些下载站的前端会走自己的中转</strong>，速度被卡在中间服务器上。右键复制真实下载链接，直接丢给
      aria2 或 ADM，经常能跳过这一层。
    </p>

    <h2>第三步：检查是不是在走代理</h2>
    <p>这一条在国内环境里命中率极高。代理软件通常有两种模式：</p>
    <ul>
      <li>
        <strong>全局模式</strong>：所有流量走代理节点。下载 APK 时，你的流量绕到国外再回来，速度取决于节点带宽，经常只有
        1Mbps。
      </li>
      <li>
        <strong>规则模式（PAC）</strong>：国内域名直连，国外域名走代理。APK 站如果是国内 CDN，应该直连才对——但很多规则集把{" "}
        <code>apk</code> 关键词误判成国外资源。
      </li>
    </ul>
    <p>
      <strong>做法</strong>：下载时临时切到直连模式（或者关掉代理）测一次。如果速度立刻从 300KB/s 变成 10MB/s，问题就找到了。
      反过来也有：如果你要下的是 Google Play 上的应用，不走代理反而下不动。<strong>关键是让流量走最短的那条路</strong>。
    </p>

    <h2>第四步：手机端的几个隐形瓶颈</h2>
    <p>
      <strong>存储写入速度。</strong>低端机的 eMMC 闪存在剩余空间很少时写入速度会断崖式下跌。可用空间低于 10% 时，下载速度可能被拖到
      1MB/s 以下——因为下载的同时还在写盘。
    </p>
    <p>
      <strong>省电模式。</strong>安卓的省电模式会限制后台网络和 CPU 频率，下载时容易掉速甚至断流。
      <strong>下载大文件前先关掉省电模式</strong>，这是最容易被忽略的一条。
    </p>
    <p>
      <strong>下载器的并发限制。</strong>手机浏览器内置下载器普遍是单线程，而且会在息屏后降频。换 ADM 这类专业下载器，并且给它
      关闭电池优化的权限：设置 → 应用 → ADM → 电池 → 不受限制。
    </p>
    <p>
      <strong>Wi-Fi 的 2.4G / 5G 选择。</strong>2.4G 频段在公寓楼里干扰严重，实测经常只有 2-5MB/s，而 5G 频段能跑 30MB/s
      以上。连 2.4G 的话，再快的宽带也救不了。
    </p>

    <h2>第五步：换个 DNS，但别指望太多</h2>
    <p>
      DNS 只影响<strong>解析阶段</strong>，不影响传输速度。它能解决的场景很具体：域名解析到了很远的 CDN 节点，或者运营商 DNS
      污染解析到了限速镜像。换公共 DNS（如 223.5.5.5、119.29.29.29）可以改善，但如果你已经能连上、只是慢，DNS
      基本没用。<strong>先测速再决定要不要花时间在这上面。</strong>
    </p>

    <h2>一个可复用的排查清单</h2>
    <ol>
      <li>对照测试：Play 快不快？→ 分型</li>
      <li>源慢 → 多线程下载器 / 换时间段 / 登录账号 / 抓真实链接</li>
      <li>都慢 → 关代理测一次，再开代理测一次，比较结果</li>
      <li>手机端：关省电模式、清出 10% 以上空间、换 5G Wi-Fi、下载器关电池优化</li>
      <li>最后才动 DNS</li>
    </ol>
    <p>
      大多数情况下答案在<strong>第 2 步或第 3 步</strong>，也就是「源限速」和「代理绕路」。这两条占了真实案例的一大半。在我们站内
      的 <Link href="/">APK 下载页</Link> 上，每个页面都会标出文件大小和 SHA-256 校验值，文件大时可以先确认体积再决定用哪种方式下载。
    </p>

    <h2>顺带一句：速度和安全要平衡</h2>
    <p>
      为了提速去用来路不明的「高速下载器」或者破解版加速工具，风险比慢几分钟大得多。<strong>下载器本身也可能被植入。</strong>
      安全的做法是：用开源、口碑明确的工具（aria2、ADM、1DM），APK 下载完<strong>核对签名哈希</strong>再安装。速度是可以省的，签名校验别省。
      具体校验方法可以看我们的{" "}
      <Link href="/blog/how-to-safely-download-apk-files-on-android">APK 安全下载指南</Link>。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么网速测出来很快，下载 APK 却只有几百 KB/s？",
    answer:
      "测速工具连的是本地运营商节点，而 APK 下载取决于对端服务器的限速和链路。常见原因有三个：下载站对单个连接限速（用 16 线程的多线程下载器可以绕过）、代理软件把流量绕到国外节点、以及下载器本身是单线程且息屏后降频。",
  },
  {
    question: "用多线程下载器真的能让 APK 下载变快吗？",
    answer:
      "当源站采用单连接限速时，多线程效果非常明显，16 线程通常能把 500KB/s 提到 6-8MB/s。但如果瓶颈在你的宽带、Wi-Fi 信号或代理节点带宽，多线程帮助有限。建议先做对照测试，确认瓶颈在源站再用这个手段。",
  },
  {
    question: "下载 APK 时要不要关闭代理？",
    answer:
      "要按情况判断。如果 APK 站点在你所在地区可以直连，关掉代理或切到规则模式通常更快。如果你要下载的是 Google Play 上的应用，或者站点在海外，代理反而是必须的。原则是让流量走物理上最短的那条路径，而不是一直开或一直关。",
  },
  {
    question: "手机下载 APK 老是断流，是什么原因？",
    answer:
      "最常见的是省电模式限制了后台网络，其次是浏览器内置下载器息屏后降频。做法：关闭省电模式、给下载器关闭电池优化权限、连接 5G 频段的 Wi-Fi，并确认可用存储空间超过 10%。空间不足时写入速度会断崖式下跌，表现为下载卡住。",
  },
  {
    question: "换 DNS 能提升 APK 下载速度吗？",
    answer:
      "一般不能。DNS 只影响域名解析阶段，不影响文件传输速度。它只在两种场景有效：解析到了很远的 CDN 节点，或运营商 DNS 污染导致解析到限速镜像。如果你已经能连上、只是速度慢，问题几乎一定不在 DNS，不要在这上面浪费时间。",
  },
];

const ARTICLE2 = (
  <>
    <p>
      一个本来只有几十 MB 的应用，打包出来 120MB；用户看到下载提示里的体积，直接放弃安装。
      <strong>APK 体积是转化率的一部分</strong>，尤其在弱网和低端机市场，这个影响非常直接。
    </p>
    <p>
      但「减小体积」经常被理解成「删资源」，其实收益最大的几个手段跟资源关系不大。下面按
      <strong>性价比从高到低</strong>排，每一条都写了能省多少、以及坑在哪里。
    </p>

    <h2>先做一次体积分析，别凭感觉删</h2>
    <p>动手前先看清楚体积花在哪。把 APK 拆成几类看：</p>
    <ul>
      <li>
        <code>lib/</code> — native 库（通常是最大头）
      </li>
      <li>
        <code>res/</code> — 图片、布局、动画
      </li>
      <li>
        <code>assets/</code> — 字体、模型、离线数据
      </li>
      <li>
        <code>classes*.dex</code> — 代码
      </li>
    </ul>
    <p>
      用 <code>unzip -l app-release.apk | sort -k1 -n -r | head -30</code> 快速看占用最大的文件。
      <strong>90% 的情况，lib/ 和 res/ 占了七成以上。</strong>先看这两个目录，方向就清楚了。
    </p>

    <h2>1. 只保留 arm64-v8a（省 30-40%）</h2>
    <p>这是单条收益最大的手段，而且零风险。</p>
    <p>
      一个同时打包了 <code>armeabi-v7a</code>、<code>arm64-v8a</code>、<code>x86</code>、<code>x86_64</code> 的应用，native
      库会被复制四份。而现在 Google Play 要求 64 位，国内应用商店也基本只认 arm64。
    </p>
    <pre>
      <code>{`android {
  defaultConfig {
    ndk {
      abiFilters 'arm64-v8a'
    }
  }
}`}</code>
    </pre>
    <p>
      如果你的用户里确实还有 32 位设备，正确做法不是全打进去，而是<strong>用 App Bundle（AAB）让商店按设备下发</strong>，或者用
      ABI split 出多个 APK。
    </p>

    <h2>2. 用 WebP 替换 PNG/JPG（省 15-25% 的图片体积）</h2>
    <p>
      WebP 在同等画质下比 PNG 小 25-35%，比 JPG 小 25% 左右。Android Studio 里可以直接批量转：右键 <code>res</code> 目录 →
      Convert to WebP → 选择有损质量 80-85%。注意三个坑：
    </p>
    <ul>
      <li>
        <strong>9-patch 图</strong>（<code>.9.png</code>）转换后容易拉伸错位，建议保留原图
      </li>
      <li>
        <strong>低版本兼容</strong>：Android 4.2 以下不支持 WebP，但现在的 minSdk 基本都在 21 以上，不用担心
      </li>
      <li>
        <strong>位图密度冗余</strong>：同一张图放在 <code>drawable-xhdpi</code> 和 <code>drawable-xxhdpi</code>，低密度设备根本用不上
      </li>
    </ul>

    <h2>3. 开启资源压缩与代码压缩（省 10-20%）</h2>
    <pre>
      <code>{`android {
  buildTypes {
    release {
      minifyEnabled true
      shrinkResources true
      proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
  }
}`}</code>
    </pre>
    <p>
      <code>shrinkResources</code> 会移除没有被引用的资源，<code>minifyEnabled</code> 会混淆并删除无用代码。两者必须一起开——只开
      shrinkResources 容易误删通过反射引用的资源。
    </p>
    <p>
      <strong>坑</strong>：开了之后一定要跑完整的回归测试，重点是反射调用的类、通过 <code>getIdentifier()</code>{" "}
      动态获取的资源、第三方 SDK 的入口，在 <code>proguard-rules.pro</code> 里 keep 住。
    </p>

    <h2>4. 移除冗余的 native 库（省 5-15%）</h2>
    <p>
      很多 SDK 自带完整版本的 native 库（完整的 OpenSSL、完整的 FFmpeg），而你的应用可能只用到其中一小块。常见冗余：多个 SDK
      各自带一份 <code>libc++_shared.so</code>、同时存在 <code>libflutter.so</code> 和 <code>libapp.so</code>、地图 SDK
      把不需要的省份离线包也打进来了。
    </p>
    <pre>
      <code>{`packagingOptions {
  jniLibs {
    pickFirsts += ['lib/arm64-v8a/libc++_shared.so']
  }
}`}</code>
    </pre>

    <h2>5. 字体子集化（省 3-10%）</h2>
    <p>
      中文字体是体积杀手。一个完整的中文字体（如思源黑体）<strong>单个字重就有 8-10MB</strong>。如果应用里内置了三四个字重，加起来就是
      30MB+。三种处理方式：只用系统字体（最彻底但丢失品牌字体）、字体子集化（只保留用到的字符）、动态下发（体积最小但复杂）。
    </p>
    <pre>
      <code>{`pip install fonttools
pyftsubset SourceHanSans.ttf --text-file=used_chars.txt \\
  --flavor=woff2 --output-file=font_subset.woff2`}</code>
    </pre>
    <p>
      中文字体子集化后通常只剩 300-800KB，<strong>收益非常明显</strong>。
    </p>

    <h2>6. 检查 assets 目录里的「遗忘物」</h2>
    <p>
      <code>assets/</code> 是重灾区：调试用的视频音频样例、早期版本的离线数据包、忘记删除的机器学习模型（一个{" "}
      <code>.tflite</code> 动辄几十 MB）、内置的 PDF 用户手册。<strong>打包前用脚本扫一遍 assets/ 里大于 1MB 的文件</strong>，逐个确认是否真的需要。
    </p>

    <h2>7. 代码层面：去掉重复的依赖</h2>
    <p>用 <code>./gradlew app:dependencies &gt; deps.txt</code> 导出依赖树。常见的体积浪费：</p>
    <ul>
      <li>
        同时引入了 <code>okhttp</code> 和 <code>Volley</code>
      </li>
      <li>
        引入了完整版 <code>play-services</code>（几十 MB），但只用了其中一两个模块
      </li>
      <li>
        测试库（如 <code>mockito</code>、<code>junit</code>）误用了 <code>implementation</code> 而不是{" "}
        <code>testImplementation</code>
      </li>
    </ul>

    <h2>8. 考虑用 AAB 代替 APK</h2>
    <p>
      如果你的分发渠道支持（Google Play 强制要求 AAB），这是「一劳永逸」的方案。AAB 由商店按设备配置生成最优 APK，
      <strong>平均能省 15-35%</strong>：按 ABI 拆分 native 库、按屏幕密度拆分图片、按语言拆分字符串资源。用户下载到的体积往往比通用
      APK 小一半。注意国内很多应用商店不支持 AAB，这时用 ABI split + density split 手动打出多个 APK 也能达到类似效果。
    </p>

    <h2>一个真实的优化案例</h2>
    <p>某工具类应用，优化前 118MB：</p>
    <table>
      <thead>
        <tr>
          <th>手段</th>
          <th>优化后</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>初始</td>
          <td>118MB</td>
        </tr>
        <tr>
          <td>只保留 arm64</td>
          <td>84MB</td>
        </tr>
        <tr>
          <td>WebP 转换 + 删冗余密度</td>
          <td>68MB</td>
        </tr>
        <tr>
          <td>开 R8 + shrinkResources</td>
          <td>55MB</td>
        </tr>
        <tr>
          <td>字体子集化</td>
          <td>46MB</td>
        </tr>
        <tr>
          <td>清理 assets 残留</td>
          <td>41MB</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>没有删任何功能，体积降到 35%。</strong>
    </p>

    <h2>最后提醒：别压缩过度</h2>
    <p>
      体积优化的边界是<strong>用户体验</strong>。不要把关键图片压到明显失真，不要为了小体积放弃签名完整性校验，也不要引入来路不明的「APK
      压缩器」——它们经常破坏签名或植入代码。体积是手段，不是目的。<strong>用户能顺利装上并且用得舒服，才算真的优化成功。</strong>
    </p>
    <p>
      体积变小之后，下载和安装的坑会更少。如果安装时遇到兼容性问题，可以参考我们的{" "}
      <Link href="/blog/android-apk-compatibility-check">APK 兼容性检查指南</Link>。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 体积一般多少算合理？",
    answer:
      "取决于类型：工具类 15-40MB，社交类 40-80MB，游戏 100MB 以上都很常见。判断标准不是绝对值，而是「有没有明显浪费」。先做体积分析，如果 lib/ 里有多套 ABI、assets/ 里有大于 10MB 的闲置文件、或者内置了完整中文字体，那就还有很大优化空间。",
  },
  {
    question: "只保留 arm64-v8a 会不会导致部分用户装不上？",
    answer:
      "会。2016 年之前的 32 位设备以及部分低端机只支持 armeabi-v7a，去掉它这些设备就装不了。正确的做法是用 App Bundle 让商店按设备下发，或使用 ABI split 分别打出 arm64 和 v7a 两个包，而不是牺牲兼容性去换体积。",
  },
  {
    question: "开启 R8/R8 混淆会删掉我需要的代码吗？",
    answer:
      "可能会。反射调用的类、通过 getIdentifier() 动态引用的资源、第三方 SDK 的入口都容易被误删。必须在 proguard-rules.pro 里 keep 住，并在开启后跑完整的回归测试，重点验证登录、支付、分享和推送这几条链路。",
  },
  {
    question: "为什么内置中文字体会让 APK 变大几十 MB？",
    answer:
      "完整的中文字体包含数万个字形，单个字重通常就有 8-10MB，包含多个字重和多个语言版本后轻松超过 30MB。而应用实际用到的字通常只有几百到几千个，用 fonttools 的 pyftsubset 做子集化后一般只剩 300-800KB。",
  },
  {
    question: "用 AAB 代替 APK 后，用户还能直接下载安装吗？",
    answer:
      "不能直接安装。AAB 是发布格式，由应用商店（如 Google Play）按设备配置生成最优 APK 再下发。如果用户需要直接下载安装包（例如从网站下载），仍需提供 APK，这时可以用 ABI split 和 density split 手动生成多个分包 APK。",
  },
];

export const zhPosts20261109 = [
  {
    slug: "apk-download-slow-fix",
    title: "APK 下载速度慢的解决技巧：从几百 KB/s 到跑满带宽的排查顺序",
    description:
      "下载慢几乎从来不是网速不够。按对照测试分型，再逐一排查源站限速、代理绕路、手机端瓶颈和 DNS——五步定位，附可复用的排查清单。",
    date: "2026-11-09",
    readTime: "9 min read",
    tags: ["android", "apk", "troubleshoot"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "reduce-apk-size",
    title: "APK 体积太大怎么缩小：从 120MB 到 40MB 的八个有效手段",
    description:
      "按性价比排序的八个体积优化手段：只保留 arm64、WebP 转换、R8 与资源压缩、移除冗余 native 库、字体子集化、清理 assets、精简依赖、改用 AAB。附真实优化案例。",
    date: "2026-11-09",
    readTime: "10 min read",
    tags: ["android", "apk", "build"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261109List = toList(zhPosts20261109);
