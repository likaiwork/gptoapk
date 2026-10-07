import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ReactNode;
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
    <p className="lead">
      从第三方站点下载 APK，最让人不放心的就是：「这个包和官方原版一模一样吗？」文件名一样、图标一样、版本号一样，不代表内容一样——
      中途被替换、被重打包、被塞私货的包，肉眼几乎看不出来。
    </p>
    <p>
      先给结论：
      <strong>每个 APK 都带有可验证的「指纹」，只要你会用三个简单方法，就能确认它有没有被动过手脚。</strong>
      这篇教你在手机上、电脑上、命令行里分别怎么做。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>哈希值（SHA-256）比对「文件本身有没有变」，签名校验比对「是不是官方开发者签的」。两者结合，基本能锁定一个包的真伪。</strong>
      </p>
    </blockquote>

    <h2>一、先搞懂：完整性校验到底在校验什么</h2>
    <p>APK 的「完整」有两层含义，很多人混为一谈：</p>
    <ol>
      <li>
        <strong>文件完整性</strong>：下载过程中有没有损坏、有没有被中间人替换。→ 用<strong>哈希值（SHA-256/MD5）</strong>验证。
      </li>
      <li>
        <strong>来源真实性</strong>：这个包是不是开发者本人签发的、有没有被二次重打包。→ 用<strong>数字签名（证书指纹）</strong>验证。
      </li>
    </ol>
    <p>
      <strong>只做哈希校验是不够的</strong>：如果你从恶意站点下载，它给你的哈希值本身也是假的。所以哈希必须和
      <strong>官方公布的哈希</strong>对比；而签名指纹则可以直接和已知官方签名对比，更可靠。
    </p>

    <h2>二、方法一：哈希值校验（最快，适合核对官方发布）</h2>
    <p>如果开发者或可信站点公布了 SHA-256，你只需要算出本地文件的哈希再对比。</p>
    <pre>
      <code>{`# Windows（PowerShell）
Get-FileHash .\\app.apk -Algorithm SHA256

# macOS / Linux
shasum -a 256 app.apk
sha256sum app.apk`}</code>
    </pre>
    <p>
      把输出和一串 64 位的十六进制官方值逐字对比。<strong>只要有一个字符不同，文件就不完整或被人改过。</strong>
    </p>

    <h2>三、方法二：签名指纹校验（最可靠，防重打包）</h2>
    <p>
      哈希只能证明「文件没变」，但如果你根本没有官方哈希怎么办？这时用<strong>签名证书指纹</strong>——它由开发者的私钥决定，重打包的人换了密钥，指纹必然不同。
    </p>
    <pre>
      <code>apksigner verify --print-certs app.apk</code>
    </pre>
    <p>
      输出里会有一行 <code>Signer #1 certificate SHA-256 digest: 8a3f...（64位十六进制）</code>。把这个 SHA-256 digest
      和<strong>官方版本的同名 app</strong>（比如从 Google Play 提取的包）比对。一致 → 同一个开发者签发；不一致 → 几乎可以肯定被重打包了。
    </p>
    <p>
      <strong>手机上的替代方案：</strong>安装 <strong>SAI（Split APKs Installer）</strong> 或{" "}
      <strong>APK Info</strong> 这类工具，选中 APK 后能直接看到签名证书的 SHA-256 指纹，无需电脑。
    </p>

    <h2>四、方法三：装前用 VirusTotal 交叉验证（防恶意）</h2>
    <p>完整性校验能防「文件不一致」，但防不住「官方包本身就带了不干净的东西」（少见但要防）。这时用多引擎在线扫描做交叉验证：</p>
    <ol>
      <li>
        打开 <strong>VirusTotal</strong>，上传 APK（或粘贴它的 SHA-256，后者更快且保护隐私）。
      </li>
      <li>看 60+ 引擎的检测结果：全绿最理想；多个主流引擎报毒就要警惕。</li>
      <li>结合前面的签名指纹：<strong>签名对得上 + 多引擎无恶意 = 基本可以放心装。</strong></li>
    </ol>

    <h2>五、一张表选对方法</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>你的目标</th>
            <th>用哪个方法</th>
            <th>工具</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>确认下载没损坏</td>
            <td>哈希对比</td>
            <td>sha256sum / PowerShell</td>
          </tr>
          <tr>
            <td>确认是官方原版、没被重打包</td>
            <td>签名指纹</td>
            <td>apksigner / SAI</td>
          </tr>
          <tr>
            <td>确认没有恶意代码</td>
            <td>多引擎扫描</td>
            <td>VirusTotal</td>
          </tr>
          <tr>
            <td>全套保险</td>
            <td>三个一起做</td>
            <td>组合使用</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>六、为什么「同样版本号」还是可能不同</h2>
    <p>
      同一款应用同一个版本号，可能因为来源不同而<strong>签名不同</strong>：官方包用官方私钥，第三方站如果对包做过任何修改（去广告、改语言、内嵌渠道），就必须重新签名——
      指纹立刻变了。这就是为什么「版本号一样却装不上覆盖安装」，也是为什么<strong>签名校验比版本号可靠得多</strong>。
    </p>

    <h2>七、动手清单（装前 60 秒）</h2>
    <ol>
      <li>从下载页拿到官方 SHA-256（有的话）。</li>
      <li>本地算出哈希并逐字对比。</li>
      <li>用 apksigner 或 SAI 看签名 SHA-256，和官方比对。</li>
      <li>丢进 VirusTotal 扫一遍 SHA-256。</li>
      <li>全部通过 → 安装；任一项不符 → 换来源重下。</li>
    </ol>
    <p>
      做到这几步，你基本可以对自己的每一个 APK 负责。<strong>完整性和签名，是普通用户手里最有力的两道防线。</strong>
    </p>
    <p>
      如果你想要一个懒人方案，可以直接用 <Link href="/">gptoapk.com</Link> 从 Google Play
      提取原始 APK 并附带校验信息，省去自己到处找官方哈希的麻烦。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "怎么判断下载的 APK 有没有被人动过手脚？",
    answer:
      "用两个互补的方法：一是把文件的 SHA-256 哈希与开发者公布的官方值逐字对比；二是用 apksigner（电脑）或 SAI（手机）查看签名证书的 SHA-256 指纹，与已知官方指纹比对。哈希能发现传输中损坏或替换，签名指纹能发现二次重打包。再用 VirusTotal 做恶意代码交叉验证。",
  },
  {
    question: "只校验 SHA-256 哈希就足够信任一个 APK 吗？",
    answer:
      "不够。哈希只能证明文件自哈希生成后没有变化，但若你从恶意站点下载，它提供的哈希本身也是假的。务必与开发者官方公布的哈希对比，并优先依赖由开发者私钥决定的签名证书指纹——这是最强的真伪校验手段。",
  },
  {
    question: "为什么同一个版本号的两个 APK 签名会不同？",
    answer:
      "因为对 APK 的任何修改都会强制用不同的密钥重新签名。如果第三方站点去广告、改语言或内嵌渠道号，就必须重新签名，证书指纹随之改变。这就是同一版本的应用在不同来源签名不同的原因，也是签名校验比版本号更可靠的原因。",
  },
  {
    question: "不用电脑，手机上怎么验证 APK？",
    answer:
      "用 SAI（Split APKs Installer）或 APK Info：打开 APK 后查看「签名/证书」一栏，能看到签名者名称与 SHA-256 指纹，与官方参考值比对即可。想额外做恶意代码交叉验证，可把文件的 SHA-256 粘贴到 VirusTotal 查询。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      你有没有遇到过这种情况：一个应用在旧手机上好好的，换到新手机或升级到 Android 15 之后，突然闪退、通知不弹、权限被拒、甚至提示「此应用不支持此设备」？
    </p>
    <p>
      先讲结论：
      <strong>十有八九，问题的根源在 targetSdkVersion。</strong>
      这个藏在 AndroidManifest.xml 里的数字，决定了应用「以哪个 Android 版本的规则运行」，是 2026 年安卓兼容性问题的核心开关。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>targetSdkVersion 告诉系统「我这个应用是按哪个版本的规矩写的」。它越高，越能享受新系统特性；但它一旦低于 Google Play 或系统的要求，就会面临安装、上架、行为警告等各种限制。</strong>
      </p>
    </blockquote>

    <h2>一、三个 Sdk 版本号，别搞混</h2>
    <p>新手最容易把这三个搞混，它们完全不是一回事：</p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>含义</th>
            <th>谁关心</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>minSdkVersion</td>
            <td>应用最低支持到哪个 Android 版本</td>
            <td>用户设备是否够新</td>
          </tr>
          <tr>
            <td>targetSdkVersion</td>
            <td>应用面向哪个版本编写（运行时采用该版本的兼容行为）</td>
            <td>系统、商店、行为一致性</td>
          </tr>
          <tr>
            <td>compileSdkVersion</td>
            <td>编译时用哪个 Android SDK 编译</td>
            <td>开发者、能否用新 API</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      一句话区分：<strong>min 决定「能不能装」，target 决定「怎么运行」，compile 决定「能用哪些 API 写」。</strong>
    </p>

    <h2>二、targetSdkVersion 到底影响什么？</h2>
    <p>它最容易被忽视，却影响最大，因为它触发的是<strong>系统行为变更</strong>。举几个经典例子：</p>
    <ul>
      <li>
        <strong>Android 6.0（target 23）</strong>：开始要求运行时权限。应用 target ≥ 23，弹权限申请框；target &lt;
        23，系统自动授权。
      </li>
      <li>
        <strong>Android 10（target 29）</strong>：开始限制后台定位、强制分区存储（Scoped Storage）。
      </li>
      <li>
        <strong>Android 13（target 33）</strong>：通知权限 POST_NOTIFICATIONS 变成运行时权限——
        <strong>target ≥ 33 的应用不主动申请就收不到通知。</strong>
      </li>
      <li>
        <strong>Android 14（target 34）</strong>：前台服务类型必须声明，否则直接崩溃。
      </li>
    </ul>
    <p>
      也就是说，<strong>同样一段代码，target 设成 33 和设成 31，在 Android 14 设备上的表现可能完全不同。</strong>
    </p>

    <h2>三、为什么「target 太低」会导致装不上 / 更新失败</h2>
    <p>这是普通用户最常踩的坑。近几年 Android 和 Google Play 不断提高门槛：</p>
    <ol>
      <li>
        <strong>Google Play 上架要求</strong>：新应用和更新必须达到较高的 targetSdkVersion，否则拒绝上架/更新。
      </li>
      <li>
        <strong>侧载（sideload）限制</strong>：从 Android 14 开始，安装 targetSdkVersion 低于 23
        的应用会被系统直接拦截，提示「此应用专为旧版 Android 打造」。
      </li>
      <li>
        <strong>降级安装</strong>：从高 target 版本降到低 target 版本，可能触发签名或版本冲突。
      </li>
    </ol>
    <p>
      所以，「装不上」有时不是签名问题，而是<strong>这个包的 targetSdkVersion 太低，被新系统拒收了。</strong>
    </p>

    <h2>四、怎么查看一个 APK 的 targetSdkVersion</h2>
    <pre>
      <code>{`# 方法一：aapt（Android SDK Build-Tools）
aapt dump badging app.apk | grep sdkVersion

# 输出类似：
# sdkVersion:'24'
# targetSdkVersion:'33'

# 方法二：apkanalyzer
apkanalyzer manifest target-sdk app.apk`}</code>
    </pre>
    <p>
      <strong>方法三（无需电脑）：</strong>用 <strong>APK Info</strong>、<strong>SAI</strong>{" "}
      等工具，选中 APK 后即可看到 min/target/compile SDK 三个值，一目了然。
    </p>

    <h2>五、常见问题速查</h2>
    <p>
      <strong>Q：target 越高越好吗？</strong>不一定。target 高意味着要遵守更多新规则，如果应用没适配，反而会出现通知不弹、后台被杀等问题。
      <strong>理想状态是「target 紧跟主流版本且已完成适配」。</strong>
    </p>
    <p>
      <strong>Q：为什么同一个应用在旧手机正常，新手机异常？</strong>很可能应用 target 偏低，新系统对低 target
      应用启用了更强的兼容限制（如后台限制、权限收紧）。
    </p>
    <p>
      <strong>Q：我下载的包 target 太低被系统拦了怎么办？</strong>没有官方解。只能：① 找该应用的新版包（target
      已升级）；② 用支持降级限制的定制系统或工具（不推荐，有安全风险）。<strong>最稳妥的是等待开发者更新。</strong>
    </p>

    <h2>六、给不同角色的建议</h2>
    <p>
      <strong>普通用户：</strong>
    </p>
    <ul>
      <li>装包前用 APK Info 看一眼 targetSdkVersion；</li>
      <li>太低（尤其 &lt;23）的包在新手机上大概率装不上，别硬折腾；</li>
      <li>遇到「通知不弹」，优先怀疑是应用 target 低导致的权限行为差异。</li>
    </ul>
    <p>
      <strong>开发者：</strong>
    </p>
    <ul>
      <li>每次系统大版本更新后，及时把 target 提上去并完成适配；</li>
      <li>关注 Google Play 每年提高的上架 target 门槛；</li>
      <li>min / target / compile 三者分开管理，别一刀切。</li>
    </ul>

    <h2>七、动手清单</h2>
    <ol>
      <li>用 aapt dump badging 或 APK Info 查出目标 APK 的 targetSdkVersion。</li>
      <li>对照设备 Android 版本，判断是否存在行为/安装风险。</li>
      <li>装不上时，先分清是签名问题还是 target 太低。</li>
      <li>开发者：把 target 升级纳入每次系统更新的例行任务。</li>
    </ol>
    <p>
      搞懂 targetSdkVersion，你就掌握了安卓兼容性问题的一把钥匙。<strong>很多「玄学闪退」和「装不上」，查到这一行数字就真相大白了。</strong>
    </p>
    <p>
      需要从 Google Play 提取带完整版本信息的 APK 做分析？可以试试 <Link href="/">gptoapk.com</Link>
      ，提取的包会附带 SDK 相关元数据。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "targetSdkVersion 是什么意思？",
    answer:
      "targetSdkVersion 告诉系统应用是按哪个 Android 版本的规则编写的，运行时会采用该版本的兼容行为。它不同于 minSdkVersion（应用能安装的最低版本）和 compileSdkVersion（编译所用的 SDK 版本）。target 值越高越能使用新特性，但也要求应用遵守更多新规则。",
  },
  {
    question: "为什么应用在旧手机上正常，换新手机就装不上或闪退？",
    answer:
      "常见原因是 targetSdkVersion 太低。自 Android 14 起，安装 targetSdkVersion 低于 23 的应用会被系统直接拦截；新系统也会对低 target 应用施加更强的兼容限制。可用 aapt dump badging 或 APK Info 查看 targetSdkVersion，并寻找 target 已升级的新版安装包。",
  },
  {
    question: "minSdkVersion、targetSdkVersion、compileSdkVersion 有什么区别？",
    answer:
      "minSdkVersion 是应用支持的最低 Android 版本，决定能否安装；targetSdkVersion 是应用面向编写的版本，决定运行时的兼容行为；compileSdkVersion 是编译所用的 SDK，决定开发者能使用哪些 API。三者相关但用途完全不同。",
  },
  {
    question: "安卓更新后应用通知不弹了是什么原因？",
    answer:
      "自 Android 13 起，通知权限 POST_NOTIFICATIONS 变成运行时权限。targetSdkVersion 为 33 及以上的应用若不主动申请，就不会显示任何通知。若应用未及时适配，通知可能静默失败。可检查应用的 target、手动授予通知权限，或寻找已更新的应用版本。",
  },
];

export const zhPosts20261007: BlogPostEntry[] = [
  {
    slug: "apk-wen-jian-wan-zheng-xing-jiao-yan-fang-fa",
    title: "APK 文件完整性校验方法：3 种方式确认下载的包没被动手脚（2026）",
    description:
      "文件名、图标、版本号一样，不代表 APK 干净。本文教你三种实用方法在装前验证 APK 的完整性与签名：哈希值比对、签名指纹校验（apksigner/SAI）以及 VirusTotal 交叉验证，附装前 60 秒动手清单。",
    date: "2026-10-07",
    readTime: "8 分钟阅读",
    tags: ["APK 完整性", "SHA-256", "签名校验", "安全性", "sideloading"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-targetsdkversion-shuo-ming",
    title: "Android targetSdkVersion 到底是什么意思？为什么它决定应用能不能装、能不能更新（2026）",
    description:
      "应用在旧手机好好的，升级到 Android 15 后却闪退、通知不弹、装不上？根源常是 targetSdkVersion。本文讲清它的含义、与 min/compile SDK 的区别、为什么 target 太低会导致安装失败，并教你如何查看任意 APK 的 targetSdkVersion。",
    date: "2026-10-07",
    readTime: "8 分钟阅读",
    tags: ["targetSdkVersion", "Android 兼容性", "APK 安装失败", "开发者", "SDK 版本"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261007List = toList(zhPosts20261007);
