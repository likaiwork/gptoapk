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
      有时候你需要的 APK 只在手机商店里，却想先存到电脑留档、做分析、或者转给别的设备装&mdash;&mdash;
      但 Play 商店压根没有&ldquo;下载到电脑&rdquo;这个按钮。
      <strong>
        把 Google Play 的 APK 弄到电脑上，核心思路只有两条：要么用能直连 Play 的第三方站抓包，要么在你的电脑上模拟一个安卓环境。
      </strong>
      这篇给你 4 种从简单到进阶的方法，附带坑点。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>
          Play 商店本身不提供导出功能，所谓&ldquo;下载 APK&rdquo;都是借助第三方镜像站或安卓环境间接实现。
        </strong>
        选方法时先想清楚：你是要&ldquo;快速拿一个包&rdquo;，还是&ldquo;要某个地区、某个版本的特定包&rdquo;。
      </p>
    </blockquote>

    <h2>方法一：用靠谱的 APK 镜像站（最快，适合单次下载）</h2>
    <p>这是普通用户的首选，不用装任何东西：</p>
    <ol>
      <li>在电脑浏览器打开一个 APK 镜像站（如 APKMirror、APKPure）。</li>
      <li>
        搜索应用名，注意核对 <strong>包名（package name）</strong> 和开发者，避免下到山寨应用。
      </li>
      <li>
        选择合适的<strong>版本号</strong>和<strong>架构</strong>（arm64-v8a 通常是主流），点击下载。
      </li>
    </ol>
    <p>
      <strong>优点：</strong>零门槛，支持选版本、选架构。
    </p>
    <p>
      <strong>坑点：</strong>
    </p>
    <ul>
      <li>镜像站更新有延迟，刚发布的新版可能没有。</li>
      <li>
        有些应用做了<strong>地区限制或签名校验</strong>，镜像站的包可能装不上。
      </li>
      <li>
        一定要开<strong>杀毒软件扫描</strong>，别在乱七八糟的小站下载。
      </li>
    </ul>

    <h2>方法二：用 Aurora Store / APK 提取类 App 在手机上导出，再传电脑</h2>
    <p>如果你手上就有装了目标应用的手机：</p>
    <ol>
      <li>
        安装 <strong>Aurora Store</strong>（Play 的第三方客户端）或 APK 提取工具。
      </li>
      <li>在应用里搜索目标应用，选择下载 / 导出。</li>
      <li>
        导出后得到 APK 文件，用<strong>数据线、文件传输应用、或局域网工具</strong>发到电脑。
      </li>
    </ol>
    <p>
      <strong>优点：</strong>拿到的是接近 Play 官方签名的包，兼容性好。
    </p>
    <p>
      <strong>坑点：</strong>部分应用会对非官方客户端做校验；导出的可能是 split APK（多个包），需要一起传。
    </p>

    <h2>方法三：用模拟器 + Play 商店导出（电脑上直接操作）</h2>
    <p>想在电脑上完整还原&ldquo;从 Play 下载&rdquo;的体验，用安卓模拟器：</p>
    <ol>
      <li>
        在电脑装 <strong>Google 官方 Android Studio 的模拟器</strong>（或带 Play 服务的模拟器）。
      </li>
      <li>
        启动镜像（选带 Google Play 的 system image），登录 Google 账号。
      </li>
      <li>在模拟器里打开 Play 商店装目标应用。</li>
      <li>
        用 <strong>adb 命令</strong>把应用拉出来：
      </li>
    </ol>
    <pre>
      <code>{`# 查看已安装应用的包名
adb shell pm list packages | grep 关键词

# 获取 APK 路径
adb shell pm path com.example.app

# 拉取到电脑
adb pull /data/app/~~xxxx/com.example.app-xxxx/base.apk ./app.apk`}</code>
    </pre>
    <p>
      <strong>优点：</strong>能拿到真实 Play 版本，支持指定地区和账号。
    </p>
    <p>
      <strong>坑点：</strong>新版 Android 多为 split APK，<code>base.apk</code> 只是主体，还要把{" "}
      <code>split_*.apk</code> 一起拉出来；模拟器占资源。
    </p>

    <h2>方法四：自建代理抓包（进阶，能解地区限制）</h2>
    <p>
      当应用有<strong>地区限制</strong>、镜像站没有你需要的版本时：
    </p>
    <ol>
      <li>
        搭建一个处于<strong>目标地区</strong>的代理（云服务器 + 代理软件）。
      </li>
      <li>让模拟器或手机走这条线路，用带 Google Play 的镜像出包。</li>
      <li>抓取下载链接或直接从设备导出。</li>
    </ol>
    <p>
      <strong>优点：</strong>能突破地区限制，拿到最&ldquo;正宗&rdquo;的包。
    </p>
    <p>
      <strong>坑点：</strong>门槛高，需要一定的网络配置能力；注意遵守当地法律法规与开发者条款。
    </p>

    <h2>关键提醒：split APK 与签名</h2>
    <ul>
      <li>
        现在很多应用是 <strong>App Bundle 拆出来的 split APK</strong>，单独一个 <code>base.apk</code> 装不完整，必须用{" "}
        <code>adb install-multiple</code> 或多个包一起安装。
      </li>
      <li>
        从 Play 导出的包与镜像站的包<strong>签名可能不同</strong>，混装会报&ldquo;签名冲突&rdquo;，升级前先卸载旧版。
      </li>
      <li>
        别用来做破解、去广告、绕过付费等侵权用途&mdash;&mdash;
        <strong>仅供学习备份和合法迁移</strong>。
      </li>
    </ul>

    <h2>方法对比一览</h2>
    <table>
      <thead>
        <tr>
          <th>方法</th>
          <th>适合场景</th>
          <th>门槛 / 限制</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>镜像站</td>
          <td>最快，适合单次下载</td>
          <td>有地区 / 版本限制</td>
        </tr>
        <tr>
          <td>手机导出</td>
          <td>兼容性好</td>
          <td>需手头有设备</td>
        </tr>
        <tr>
          <td>模拟器 + adb</td>
          <td>要特定版本 / 地区</td>
          <td>需配置，占资源</td>
        </tr>
        <tr>
          <td>自建代理抓包</td>
          <td>突破地区限制</td>
          <td>门槛最高</td>
        </tr>
      </tbody>
    </table>

    <h2>常见问题</h2>
    <p>
      <strong>Google Play 能直接下载 APK 到电脑吗？</strong>
      <br />
      不能。Play 没有导出按钮。上面每种方法都是绕开这一点&mdash;&mdash;要么借助第三方镜像站，要么在你可控的安卓环境里把包提取出来。
    </p>
    <p>
      <strong>想拿到官方原版包，最安全的方式是什么？</strong>
      <br />
      用 <Link href="/">gptoapk.com</Link> 从应用的 Play 链接直接拉原包，或走&ldquo;模拟器 + adb&rdquo;这条线。拿到的是与商店签名一致的官方包，比镜像站的二次上传包更可靠。
    </p>
    <p>
      <strong>为什么单独的 base.apk 装不上？</strong>
      <br />
      因为现在多数应用是 split APK（App Bundle）。<code>base.apk</code> 只是主体，还需要与你设备 ABI、DPI 匹配的{" "}
      <code>split_*.apk</code> 配置文件，或者改用 universal 完整包。
    </p>
    <p>
      <strong>地区限制的应用能拿到 APK 吗？</strong>
      <br />
      可以。让模拟器或手机走目标地区的代理，在当地 Play 安装即可。请遵守当地法律法规与开发者条款。
    </p>
    <p>
      <strong>从 Play 提取 APK 合法吗？</strong>
      <br />
      对自己合法使用的应用做个人备份和迁移，一般没问题；但用于盗版、破解、去广告、绕过付费等用途，则违反大多数应用条款，且可能违法。请仅限于合法备份与迁移。
    </p>

    <p>
      一句话总结：
      <strong>
        把 Play 的 APK 弄到电脑，本质是&ldquo;绕过 Play 没有导出按钮&rdquo;这件事。要快就用镜像站，要准就用模拟器导，要突破地区就上代理。
      </strong>
      下载后记得扫毒、核对包名和签名，split APK 要连带一起装。需要最干净的原包时，可用{" "}
      <Link href="/">gptoapk.com</Link> 从 Play 链接直接提取。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Google Play 能直接把 APK 下载到电脑吗？",
    answer:
      "不能。Google Play 没有「下载到电脑」或导出按钮。你只能间接把 APK 弄到电脑：通过有口碑的镜像站、用 Aurora Store 等工具从手机导出、在安卓模拟器里安装后用 adb 拉取，或让设备走目标地区代理后抓取下载链接。",
  },
  {
    question: "把官方原版 APK 弄到电脑最安全的方式是什么？",
    answer:
      "用 gptoapk.com 这类提取工具从应用的 Play 链接直接拉原包，或走「模拟器 + adb」路线。两者拿到的都是与商店签名一致的官方包，而不是镜像站二次上传的副本，能降低拿到被篡改或地区不匹配包的风险。",
  },
  {
    question: "为什么单独的 base.apk 装不上？",
    answer:
      "因为现在多数应用以 split APK（App Bundle）形式分发。base.apk 只是主体部分，还需要与你设备 CPU 架构和屏幕密度匹配的 split_*.apk 配置文件。要用 adb install-multiple 把所有部分一起安装，或改用 universal/完整包。",
  },
  {
    question: "地区限制的应用能下载到 APK 吗？",
    answer:
      "可以。让安卓模拟器或手机走目标地区的代理，在当地登录 Google Play 并安装该应用，就能拿到该地区的构建版本。但务必遵守当地法律法规和开发者的服务条款。",
  },
  {
    question: "从 Google Play 提取 APK 合法吗？",
    answer:
      "对自己合法使用的应用做个人备份和迁移，一般可以接受，但各地规定不同。用于盗版、破解、去广告或绕过付费功能，则违反多数应用的条款，甚至可能违法。请仅限合法备份与迁移用途。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      你天天装 APK，但有没有拆开看过它里面是什么？
      <strong>APK 本质就是一个 ZIP 压缩包，只是改了后缀。</strong>
      把它解压开，你能看到代码、资源、签名、清单文件&mdash;&mdash;看懂结构，排查&ldquo;装不上&rdquo;&ldquo;闪退&rdquo;&ldquo;被报毒&rdquo;就有了底气。这篇带你从外到内拆一遍。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>
          APK = ZIP 容器 + 目录约定。搞清楚 <code>AndroidManifest.xml</code>、<code>classes.dex</code>、
          <code>lib/</code>、<code>res/</code>、<code>META-INF/</code> 这几块各管什么，你就能判断一个包是不是完整、是不是原版、跑不跑得起来。
        </strong>
      </p>
    </blockquote>

    <h2>一、先记住：APK 就是 ZIP</h2>
    <p>
      把 <code>app.apk</code> 改名成 <code>app.zip</code> 就能用解压工具打开。也可以用命令行：
    </p>
    <pre>
      <code>{`unzip -l app.apk        # 列出内部文件
unzip app.apk -d out/   # 解压到 out 目录`}</code>
    </pre>

    <h2>二、核心文件逐个拆</h2>

    <h3>1. AndroidManifest.xml（清单文件）</h3>
    <p>应用的&ldquo;身份证&rdquo;，声明了：</p>
    <ul>
      <li>
        <strong>包名（package）</strong>、<strong>版本号（versionCode / versionName）</strong>
      </li>
      <li>
        <strong>minSdkVersion / targetSdkVersion</strong>（最低和目标的安卓版本）
      </li>
      <li>
        <strong>申请的权限（uses-permission）</strong>&mdash;&mdash;这就是为什么安装时会弹权限请求
      </li>
      <li>四大组件：Activity、Service、BroadcastReceiver、ContentProvider</li>
    </ul>
    <p>
      注意：APK 里的 <code>AndroidManifest.xml</code> 是<strong>编译过的二进制格式</strong>，直接打开是乱码，要用{" "}
      <strong>APK Analyzer、aapt2 或 MT 管理器</strong>才能读。
    </p>
    <pre>
      <code>{`# 用 aapt2 查看清单信息（需安装 Android SDK build-tools）
aapt2 dump badging app.apk`}</code>
    </pre>

    <h3>2. classes.dex（代码）</h3>
    <p>
      Java/Kotlin 代码编译后打包成的 <strong>DEX 文件</strong>。一个 APK 可以有多个 <code>classes.dex</code>、
      <code>classes2.dex</code>&hellip;&hellip;
    </p>
    <ul>
      <li>DEX 是安卓虚拟机（Dalvik/ART）执行的格式。</li>
      <li>
        想反编译看代码，用 <strong>jadx</strong> 或 <strong>dex2jar + JD-GUI</strong>。
      </li>
    </ul>
    <pre>
      <code>{`jadx -d out_src app.apk   # 反编译出近似 Java 源码`}</code>
    </pre>

    <h3>3. lib/（原生库）</h3>
    <p>
      存放 C/C++ 编译出的 <code>.so</code> 文件，按 <strong>CPU 架构</strong>分目录：
    </p>
    <ul>
      <li>
        <code>lib/arm64-v8a/</code> &mdash;&mdash; 64 位 ARM，现代手机主流
      </li>
      <li>
        <code>lib/armeabi-v7a/</code> &mdash;&mdash; 32 位 ARM，老设备
      </li>
      <li>
        <code>lib/x86_64/</code> &mdash;&mdash; 模拟器 / 部分平板
      </li>
    </ul>
    <p>
      <strong>没有对应你设备架构的目录，应用就跑不起来</strong>&mdash;&mdash;这是&ldquo;装上了但闪退&rdquo;的常见原因。
    </p>

    <h3>4. res/ 与 assets/</h3>
    <ul>
      <li>
        <strong>
          <code>res/</code>
        </strong>
        ：编译后的资源，图片、布局、字符串等（很多也被编译成二进制）。
      </li>
      <li>
        <strong>
          <code>assets/</code>
        </strong>
        ：原样打包的原始资源，游戏素材、字体、配置文件常放这里。
      </li>
    </ul>

    <h3>5. META-INF/（签名信息）</h3>
    <p>
      存放<strong>签名文件</strong>：<code>MANIFEST.MF</code>、<code>CERT.SF</code>、<code>CERT.RSA</code>（或{" "}
      <code>.DSA</code> / <code>.EC</code>）。
    </p>
    <ul>
      <li>
        安卓靠这里的签名校验应用<strong>是否被篡改、来源是否一致</strong>。
      </li>
      <li>
        用 <code>keytool</code> 或 <code>apksigner</code> 可以查看签名指纹：
      </li>
    </ul>
    <pre>
      <code>{`apksigner verify --print-certs app.apk`}</code>
    </pre>
    <p>
      签名不一致 &rarr; 覆盖安装失败；签名对不上官方 &rarr; 可能是二次打包。
    </p>

    <h2>三、还有几个你会遇到的东西</h2>
    <ul>
      <li>
        <strong>resources.arsc</strong>：字符串、样式的索引表，配合 <code>res/</code> 使用。
      </li>
      <li>
        <strong>split APK</strong>：App Bundle 拆出来的多个包，除 <code>base.apk</code> 外还有{" "}
        <code>config.arm64_v8a.apk</code> 等，要一起装。
      </li>
      <li>
        <strong>OBB 文件</strong>：大游戏的额外数据，<strong>不在 APK 内</strong>，需单独放到{" "}
        <code>Android/obb/</code>。
      </li>
    </ul>

    <h2>四、结构看懂了能干嘛？</h2>
    <ol>
      <li>
        <strong>判断包是否完整</strong>：缺 <code>classes.dex</code> 或缺对应 <code>lib/</code> 目录 &rarr;
        装了也白装。
      </li>
      <li>
        <strong>判断是否原版</strong>：比对签名指纹，跟官方对不上就是被改过。
      </li>
      <li>
        <strong>排查兼容问题</strong>：看 <code>minSdkVersion</code> 和 <code>lib/</code> 架构，就知道为什么装不上/闪退。
      </li>
      <li>
        <strong>做安全初筛</strong>：清单里申请了一堆不相干权限（短信、通讯录、定位），就要警惕。
      </li>
    </ol>

    <h2>五、动手小结</h2>
    <p>记住这个结构图就够用了：</p>
    <pre>
      <code>{`app.apk
├── AndroidManifest.xml   # 身份 + 权限 + 版本
├── classes.dex           # 代码
├── lib/<架构>/           # 原生库，决定能不能跑
├── res/ + assets/        # 资源
├── resources.arsc        # 资源索引
└── META-INF/             # 签名，决定能不能信`}</code>
    </pre>

    <h2>常见问题</h2>
    <p>
      <strong>APK 就是一个 ZIP 文件吗？</strong>
      <br />
      基本上是的。APK 是改了后缀、遵循固定目录约定的 ZIP 压缩包。把它改名成 .zip，就能用任意解压工具打开，查看清单、代码、库、资源和签名。
    </p>
    <p>
      <strong>在安卓手机上怎么看 APK 内部？</strong>
      <br />
      用 MT 管理器，可以在手机上浏览 ZIP 内容、读取（二进制）清单、直接查看签名。在电脑上则用 Android Studio 的 APK Analyzer、jadx 或 apksigner。
    </p>
    <p>
      <strong>为什么 AndroidManifest.xml 打开是乱码？</strong>
      <br />
      因为它在 APK 里被编译成了安卓的二进制 XML 格式。要用 aapt2、APK Analyzer 或 MT 管理器，它们会把二进制清单解码成可读的 XML。用普通文本编辑器打开就只会看到乱码。
    </p>
    <p>
      <strong>lib/ 目录说明了什么？</strong>
      <br />
      它存放按 CPU 架构分组的原生 C/C++ 库（arm64-v8a、armeabi-v7a、x86_64 等）。如果没有匹配你设备 ABI 的文件夹，应用就跑不起来&mdash;&mdash;这是启动即闪退的常见原因。
    </p>
    <p>
      <strong>怎么判断 APK 是不是原版、有没有被二次打包？</strong>
      <br />
      用 apksigner verify --print-certs 或 keytool 查看签名指纹，与官方包对比。指纹不同就说明被重新签名（二次打包）了。用{" "}
      <Link href="/">gptoapk.com</Link> 从 Play 链接拉一份原包，可作为对照基准。
    </p>

    <p>
      一句话总结：
      <strong>
        看懂 APK = 看懂 ZIP 里的目录约定。
      </strong>
      下次遇到&ldquo;装不上、闪退、被报毒&rdquo;，先解压看一眼这几块，问题往往自己就浮出来了。工具推荐起步用{" "}
      <strong>MT 管理器</strong>（手机端）或 <strong>jadx + apksigner</strong>（电脑端）。想拿到干净的原包来分析，可用{" "}
      <Link href="/">gptoapk.com</Link>。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 就是一个 ZIP 文件吗？",
    answer:
      "基本上是的。APK 是改了后缀、带固定目录约定的 ZIP 压缩包。把 app.apk 改名成 app.zip，就能用任意解压工具打开，查看 AndroidManifest.xml、classes.dex、lib/、res/ 和 META-INF/ 签名文件。",
  },
  {
    question: "在安卓手机上怎么看 APK 文件内部？",
    answer:
      "用 MT 管理器，可以直接在手机上浏览 ZIP 内容、读取二进制清单、查看签名指纹。在电脑上则用 Android Studio 的 APK Analyzer、jadx（反编译代码）或 apksigner（查看签名）。",
  },
  {
    question: "为什么打开 AndroidManifest.xml 是乱码？",
    answer:
      "因为它在 APK 内被编译成安卓的二进制 XML 格式，不是纯文本。用 aapt2、APK Analyzer 或 MT 管理器会把它解码成可读的 XML；用普通文本编辑器打开只会看到无法阅读的字节。",
  },
  {
    question: "APK 里的 lib/ 目录说明了什么？",
    answer:
      "它存放按 CPU 架构分组的原生 C/C++ 库（.so 文件），如 arm64-v8a、armeabi-v7a、x86_64。如果没有匹配你设备 ABI 的文件夹，应用就无法运行——这是「装上了但启动闪退」的常见原因。",
  },
  {
    question: "怎么判断 APK 是否原版、有没有被二次打包？",
    answer:
      "用 apksigner verify --print-certs 或 keytool 查看签名证书指纹，与官方包对比。指纹不一致就说明被重新签名（即二次打包或篡改）。用 gptoapk.com 从 Play 链接拉一份原包，可作为已知可靠的对照基准。",
  },
];

export const zhPosts20261013: BlogPostEntry[] = [
  {
    slug: "google-play-apk-xia-zai-dao-dian-nao",
    title: "怎么把 Google Play 里的 APK 下载到电脑？2026 年最全 4 种方法",
    description:
      "Play 商店没有「下载到电脑」按钮，但你可以用四种方法把 APK 弄到电脑：镜像站、手机导出、模拟器 + adb、自建代理抓包。本文逐一讲解每种方法的优缺点、坑点，以及 split APK 与签名注意事项。",
    date: "2026-10-13",
    readTime: "8 分钟阅读",
    tags: ["APK 下载", "Google Play", "安卓教程", "adb", "APK 提取"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-wen-jian-jie-gou-jie-xi",
    title: "APK 文件结构解析：一个 APK 里到底装了什么？",
    description:
      "APK 本质就是一个改了后缀的 ZIP 压缩包。本文带你从外到内拆解 APK 结构：AndroidManifest.xml、classes.dex、lib/、res/、assets/、META-INF/ 各管什么，以及如何借此排查装不上、闪退、被报毒的问题。",
    date: "2026-10-13",
    readTime: "8 分钟阅读",
    tags: ["APK 结构", "APK 解析", "AndroidManifest", "classes.dex", "安卓教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261013List = toList(zhPosts20261013);
