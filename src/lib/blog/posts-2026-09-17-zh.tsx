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
      APK 和商店里的应用最大的区别是什么？<strong>商店帮你做了一道审核，而 APK 通常没有。</strong>
      你从网页、群聊、网盘拿到的 .apk，本质上是一个可以直接改、可以直接重签的压缩包。所以&quot;下载完先别急着装&quot;这句话，值得再强调一百遍。
    </p>
    <p>
      这篇给你一套<strong>到手就能用</strong>的 APK
      安全检测方法：从 30 秒快筛，到哈希、签名、权限、多引擎扫描的完整链路。学会之后，任何一个 APK 你都能自己判断&quot;能不能装&quot;。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>单看文件名和图标毫无意义，只有哈希、签名和扫描结果才是证据。</strong>
        检测顺序应该由快到慢，先筛掉明显的，再深挖可疑的。
      </p>
    </blockquote>

    <h2>一、先做 30 秒快筛：最省钱的第一道防线</h2>
    <p>在下载任何 APK 之前，先做这几件事，能过滤掉大部分垃圾：</p>
    <ul>
      <li>
        <strong>看域名</strong>：官方站、知名镜像站（APKMirror、APKPure 这类）优先级最高。陌生短链、个人网盘、群文件最危险。
      </li>
      <li>
        <strong>看文件大小是否合理</strong>：一个号称&quot;微信精简版&quot;的包只有 2MB，基本可以判定有问题。
      </li>
      <li>
        <strong>看有没有 HTTPS 和下载页说明</strong>：正规站会写包名、版本号、更新时间、哈希。
      </li>
      <li>
        <strong>别用&quot;破解/去广告/无限金币&quot;作关键词搜</strong>
        ：这类包是被植入恶意代码最集中的区域。
      </li>
    </ul>
    <p>
      <strong>30 秒筛不掉的，再进入下面的技术检测。</strong>
    </p>

    <h2>二、算文件哈希，和官方对一下</h2>
    <p>哈希（MD5 / SHA-256）是文件的&quot;指纹&quot;。哪怕改动 1 个字节，哈希都会彻底变化。</p>
    <p>
      <strong>Windows：</strong>
    </p>
    <ol>
      <li>打开 PowerShell，进到文件目录。</li>
      <li>
        执行：
        <pre>
          <code>Get-FileHash .\app.apk -Algorithm SHA256</code>
        </pre>
      </li>
      <li>
        把结果和官网公示的哈希对比，<strong>每一位都要一样</strong>。
      </li>
    </ol>
    <p>
      <strong>macOS / Linux：</strong>
    </p>
    <pre>
      <code>shasum -a 256 app.apk{`\n`}# 或{`\n`}sha256sum app.apk</code>
    </pre>
    <p>
      <strong>要点：</strong>
    </p>
    <ul>
      <li>
        优先看 <strong>SHA-256</strong>，MD5 已被认为不安全。
      </li>
      <li>官网如果只给了 MD5，也总比没有强，但要清楚它只能证明&quot;没被随手改动&quot;，防不了精心伪造。</li>
      <li>
        <strong>对不上 = 不要装</strong>。不要给自己找理由说&quot;可能是新版&quot;。
      </li>
    </ul>

    <h2>三、看 APK 的签名：判断&quot;谁发的、有没有被改&quot;</h2>
    <p>哈希只能说明文件没变过，说明不了&quot;这就是官方作者发的&quot;。签名才是身份证明。</p>
    <p>
      <strong>签名要确认两件事：</strong>
    </p>
    <ol>
      <li>
        <strong>签名者是谁</strong>：正规开发者会用固定的证书，多次发版签名一致。
      </li>
      <li>
        <strong>是否被重签</strong>：如果你拿到的包和官方包签名不同，很可能被人拆开改过再重新签名。
      </li>
    </ol>
    <p>
      <strong>怎么查（电脑端，推荐）：</strong>
    </p>
    <ul>
      <li>
        用 <strong>apksigner</strong>（Android SDK 自带）：
        <pre>
          <code>apksigner verify --print-certs app.apk</code>
        </pre>
      </li>
      <li>
        用 <strong>keytool</strong> 查看：
        <pre>
          <code>keytool -printcert -jarfile app.apk</code>
        </pre>
      </li>
      <li>
        图形化工具：<strong>APK 分析器、jadx、Apktool</strong> 都能看签名信息。
      </li>
    </ul>
    <p>
      <strong>关键提示：</strong> Android 从 7.0 起支持 <strong>APK Signature Scheme v2/v3</strong>，v3 还带密钥轮换。查签名时优先看
      v2/v3 是否通过，只通过 v1 的老包要打问号。
    </p>
    <p>
      <strong>同一应用不同来源签名不一致 → 直接放弃。</strong>
    </p>

    <h2>四、权限审查：最能暴露&quot;动机&quot;的一项</h2>
    <p>权限是 APK 的&quot;意图说明书&quot;。一个应用要什么权限，直接暴露它想干什么。</p>
    <ul>
      <li>
        <strong>手电筒</strong>：摄像头(部分)合理 → 通讯录、短信、定位是危险信号。
      </li>
      <li>
        <strong>计算器</strong>：本无需权限 → 网络+短信+读取联系人是危险信号。
      </li>
      <li>
        <strong>单机小游戏</strong>：存储(存档)合理 → 通话记录、后台定位是危险信号。
      </li>
      <li>
        <strong>输入法</strong>：网络(词库)合理 → 读取短信、无障碍服务是危险信号。
      </li>
    </ul>
    <p>
      <strong>重点看这几个高危权限：</strong>
    </p>
    <ul>
      <li>
        <strong>无障碍服务（Accessibility）</strong>：能读取屏幕内容、模拟点击，是木马最爱。
      </li>
      <li>
        <strong>读取短信 / 接收短信</strong>：常见于验证码劫持。
      </li>
      <li>
        <strong>设备管理器（Device Admin）</strong>：一旦授权难以卸载。
      </li>
      <li>
        <strong>悬浮窗 + 后台定位组合</strong>：常用于偷偷上报位置。
      </li>
      <li>
        <strong>安装其他应用（REQUEST_INSTALL_PACKAGES）</strong>：可能用来二次投放。
      </li>
    </ul>
    <p>
      <strong>方法：</strong>用 <strong>APK 分析器 / jadx / aapt2</strong> 打开，或上传到{" "}
      <strong>VirusTotal</strong>，在详情页看请求的权限列表。看到&quot;权限和功能完全对不上&quot;，就是放弃的理由。
    </p>
    <blockquote>
      <p>
        一句话：<strong>功能越简单、权限越贪，越危险。</strong>
      </p>
    </blockquote>

    <h2>五、多引擎在线扫描：VirusTotal 怎么用才靠谱</h2>
    <p>
      <strong>VirusTotal</strong> 是免费的多引擎扫描平台，几十家杀毒引擎同时验一个文件，还能给出行为标签和权限清单。
    </p>
    <p>
      <strong>正确用法：</strong>
    </p>
    <ol>
      <li>打开 virustotal.com，上传 APK（或粘贴文件的 SHA-256 查询，不上传也能查已知样本）。</li>
      <li>
        看 <strong>Detection</strong> 栏：<strong>0 报毒</strong> 最好；<strong>1-2 家报毒</strong> 偶尔是误报；
        <strong>≥3 家报毒基本可以判定有问题</strong>。
      </li>
      <li>
        切到 <strong>Behavior / Relations</strong> 标签，看它请求的权限、连接的域名、释放的文件。
      </li>
      <li>
        看 <strong>Details</strong>：包名、签名者、首次提交时间。
      </li>
    </ol>
    <p>
      <strong>注意：</strong>
    </p>
    <ul>
      <li>
        上传就是把文件交给第三方，<strong>涉密或个人数据相关的 APK 别上传</strong>，可用哈希查询代替。
      </li>
      <li>
        报毒名字里带 <code>Trojan</code>、<code>Spy</code>、<code>Dropper</code> 是高危词；带{" "}
        <code>Riskware</code>、<code>Adware</code> 也要警惕。
      </li>
      <li>
        <strong>杀软不报毒 ≠ 安全</strong>，新变种可能全都识别不了，所以前面几步同样重要。
      </li>
    </ul>

    <h2>六、动手之前：能在沙箱里跑就别在真机跑</h2>
    <p>对来源存疑但又必须试的包，可以用隔离环境先跑：</p>
    <ul>
      <li>
        <strong>Android 模拟器</strong>（Android Studio AVD、Genymotion）：隔离度高。
      </li>
      <li>
        <strong>备用旧手机</strong>：不插 SIM、不登账号、不连内网。
      </li>
      <li>
        <strong>手机端的&quot;应用沙箱/双开空间&quot;</strong>：只能算轻度隔离，<strong>不等于安全</strong>。
      </li>
    </ul>
    <p>在隔离环境里观察：是否偷偷联网、是否频繁读短信、是否自动申请无障碍、是否弹出奇怪权限请求。</p>

    <h2>七、一套完整的检测流程（照着做）</h2>
    <ol>
      <li>
        <strong>筛来源</strong> → 官网/知名镜像才继续。
      </li>
      <li>
        <strong>算 SHA-256</strong> → 和官方公示对比，不一致直接丢。
      </li>
      <li>
        <strong>验签名</strong> → 用 apksigner / keytool 确认签名者与官方一致。
      </li>
      <li>
        <strong>看权限</strong> → 用分析器或 VirusTotal 检查高危权限是否离谱。
      </li>
      <li>
        <strong>多引擎扫描</strong> → VirusTotal，≥3 家报毒放弃。
      </li>
      <li>
        <strong>隔离试跑</strong> → 存疑的包先上模拟器/备用机。
      </li>
      <li>
        <strong>装完复查</strong> → 装好后看有没有异常耗电、乱弹广告、偷跑流量。
      </li>
    </ol>

    <h2>八、常见误区</h2>
    <ul>
      <li>
        ❌ <strong>&quot;能装上就没问题&quot;</strong>：恶意软件装得比谁都顺，因为它就是奔着装上来的。
      </li>
      <li>
        ❌ <strong>&quot;名字带官方就是官方&quot;</strong>：文件名随便改。
      </li>
      <li>
        ❌ <strong>&quot;杀毒软件报毒是误报，无视掉&quot;</strong>：多家同时报毒时，几乎不是误报。
      </li>
      <li>
        ❌ <strong>&quot;我看不懂权限列表所以跳过&quot;</strong>：至少看一眼有没有短信、无障碍、设备管理器。
      </li>
      <li>
        ❌ <strong>&quot;用 XX 加固/杀毒 App 扫一遍就够了&quot;</strong>：手机端扫描是辅助，不是证据链。
      </li>
    </ul>

    <p>
      <strong>结语：</strong>APK 安全检测不是玄学，而是一条清晰的证据链：
      <strong>来源 → 哈希 → 签名 → 权限 → 多引擎扫描 → 隔离试跑</strong>。前面几项几分钟就能做完，却能挡掉绝大多数恶意包。多花 5
      分钟验证，换来的是一部干净的手机和安心的日常使用。<strong>未知来源的 APK，永远先检测、后安装。</strong>
      相关阅读：
      <Link href="/blog/apk-install-blocked-how-to-allow">安装被系统拦截怎么解除</Link>、
      <Link href="/blog/google-play-apk-下载到电脑方法">把 Play 的 APK 下到电脑</Link>。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "下载的 APK 怎么判断安不安全？",
    answer:
      "按一条证据链逐层验证：1) 筛来源，只从官网或知名镜像站下载；2) 算 SHA-256 哈希并与官方公示值对比；3) 用 apksigner 或 keytool 验证签名，确认签名者与官方一致；4) 审查权限，尤其是无障碍、短信、设备管理器等与功能不符的权限；5) 上传 VirusTotal 多引擎扫描，≥3 家报毒就放弃；6) 仍存疑的包先在模拟器或备用机隔离试跑。",
  },
  {
    question: "哈希校验和签名校验哪个更重要？",
    answer:
      "两者证明的事情不同，最好都做。哈希（SHA-256）证明文件没有被改动过，但前提是你信任那个对比用的哈希值；签名证明文件是谁发布的、有没有被重新签名。最稳妥的做法是：既把 SHA-256 和官方公示值对比，又确认签名证书与开发者官方证书一致。",
  },
  {
    question: "VirusTotal 上有几家报毒就说明 APK 有问题？",
    answer:
      "0 家报毒最理想；1 到 2 家偶尔是误报，尤其是一些启发式引擎；3 家及以上基本可以判定有问题，不要安装。同时要看报毒名称：带 Trojan、Spy、Dropper 属高危，Riskware、Adware 也应警惕。注意杀软不报毒不等于安全，新变种可能所有引擎都识别不出来。",
  },
  {
    question: "哪些 APK 权限是最大的危险信号？",
    answer:
      "无障碍服务（能读屏和模拟点击）、读取/接收短信（常用于验证码劫持）、设备管理器（授权后难以卸载）、悬浮窗配合后台定位、以及安装其他应用（REQUEST_INSTALL_PACKAGES，可能二次投放）。判断标准是权限和应用功能是否匹配——一个计算器要短信和通讯录权限就是明显危险信号。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      想在电脑上拿到某个 Google Play 应用的 APK，你可能踩过这些坑：直接复制商店链接，得到的是一串看不懂的{" "}
      <code>id=com.xxx</code>；用第三方下载器，出来的却是被重打包的版本；或者根本找不到带 Google 服务的机器去提取。
    </p>
    <p>
      这篇把&quot;从 Google Play 拿 APK 到电脑&quot;的几条路一次讲清楚：
      <strong>在线下载器、本地提取、Aurora Store 替代方案、模拟器提取</strong>，并告诉你每条路的适用场景和风险。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>官方 Play 并不提供&quot;下载 APK 到电脑&quot;的功能，所有方法本质都是绕过或提取。</strong>
        关键在于选一个不改包、不夹带的方法。
      </p>
    </blockquote>

    <h2>一、先弄清概念：Play 商店链接 ≠ APK 文件</h2>
    <p>
      Google Play 上架的其实是 <strong>AAB（Android App Bundle）</strong>
      ，谷歌会按你的设备配置动态生成对应的 APK 或 Split APK 下发。所以你网页上看到的{" "}
      <code>play.google.com/store/apps/details?id=com.xxx</code> <strong>只是一个页面地址，不是下载地址</strong>。
    </p>
    <p>想让&quot;链接变 APK&quot;，就得靠工具去 Play 的服务器拉取，或者从一台已安装的设备上把包提取出来。</p>

    <h2>二、方法一：在线 APK 下载器（最快，零设备）</h2>
    <p>这是最省事的一条路，无需 Android 设备。</p>
    <p>
      <strong>典型流程：</strong>
    </p>
    <ol>
      <li>打开 APKMirror / APKPure / APKCombo 这类站点。</li>
      <li>搜索应用名，或直接粘贴 Google Play 链接 / 包名。</li>
      <li>
        选择 <strong>版本号 + 架构（arm64 / armeabi-v7a / x86_64）+ 屏幕密度</strong> 组合。
      </li>
      <li>下载到电脑。</li>
    </ol>
    <p>
      <strong>特点：</strong>
    </p>
    <ul>
      <li>✅ 不用手机，直接在电脑浏览器完成。</li>
      <li>✅ 能选特定旧版本、特定 ABI，做兼容测试很方便。</li>
      <li>
        ⚠️ <strong>一定要核对签名</strong>：正规站会给出签名指纹，能和官方对得上才是原包。
      </li>
      <li>⚠️ 部分应用因版权/开发者要求不会收录。</li>
    </ul>
    <blockquote>
      <p>提示：优先选有&quot;上传者验证签名&quot;机制的站点，避免下到重打包的包。</p>
    </blockquote>

    <h2>三、方法二：从已安装的设备提取（最保真）</h2>
    <p>
      如果应用只有你手机上有，或者你对来源要求极高，<strong>从自己设备提取是最保真的方式</strong>
      ——包是你从 Play 装的，没经过第三方。
    </p>
    <p>
      <strong>准备：</strong>
    </p>
    <ul>
      <li>一台装有该应用的 Android 设备。</li>
      <li>
        电脑装好 <strong>ADB（Android Platform Tools）</strong>。
      </li>
      <li>
        设备开启 <strong>开发者选项 → USB 调试</strong>。
      </li>
    </ul>
    <p>
      <strong>步骤：</strong>
    </p>
    <ol>
      <li>数据线连电脑，手机确认&quot;允许 USB 调试&quot;。</li>
      <li>
        电脑终端执行，确认设备已识别：
        <pre>
          <code>adb devices</code>
        </pre>
      </li>
      <li>
        找到应用的包名（如果不知道）：
        <pre>
          <code>adb shell pm list packages | grep 关键词</code>
        </pre>
      </li>
      <li>
        定位 APK 路径：
        <pre>
          <code>adb shell pm path com.example.app</code>
        </pre>
      </li>
      <li>
        拉取到电脑：
        <pre>
          <code>adb pull /data/app/~~xxx/com.example.app-yyy/base.apk</code>
        </pre>
      </li>
    </ol>
    <p>
      <strong>如果是 Split APK（拆分包，Android 8+ 很常见）：</strong> <code>pm path</code> 会返回多个路径（base.apk +
      split_config.xxx.apk）。逐条 <code>adb pull</code> 出来，或者用 <code>adb install-multiple</code> 反向打包。更省事的做法：用{" "}
      <strong>SAI（Split APKs Installer）</strong> 或 APK 提取类工具在手机上先导出成一个 <code>.apks</code>/
      <code>.xapk</code>，再传电脑。
    </p>
    <p>
      <strong>特点：</strong>
    </p>
    <ul>
      <li>✅ 来源可信度最高，包与 Play 下发完全一致。</li>
      <li>⚠️ 需要设备 + ADB 基本操作。</li>
      <li>⚠️ Split APK 需要额外处理，直接装 base.apk 会失败。</li>
    </ul>

    <h2>四、方法三：Aurora Store（无 Google 服务的设备也能拿）</h2>
    <p>
      如果你没有带 GMS 的设备，又想装 Play 上的应用，<strong>Aurora Store</strong> 是开源替代客户端，以匿名账号访问 Play
      目录。
    </p>
    <p>
      <strong>要点：</strong>
    </p>
    <ul>
      <li>可以按包名搜索、查看版本、下载 APK / Split APK。</li>
      <li>开源、无广告，社区维护活跃。</li>
      <li>✅ 适合国产机、无 GMS 设备。</li>
      <li>⚠️ 下载下来的仍是 Play 分发的包，但仍建议核对签名。</li>
      <li>⚠️ 部分账号/地区限制的应用可能不可见。</li>
    </ul>

    <h2>五、方法四：Android 模拟器（纯电脑操作）</h2>
    <p>不想动手机？在电脑上跑个带 Google Play 的模拟器，再从中提取：</p>
    <ol>
      <li>
        装 <strong>Android Studio</strong>，用 <strong>AVD Manager</strong> 创建带 <strong>Google Play</strong> 镜像的虚拟机。
      </li>
      <li>启动模拟器，登录 Google 账号，从 Play 安装目标应用。</li>
      <li>
        用 ADB 连接模拟器（<code>adb connect</code> 或直接 <code>adb devices</code> 会看到 <code>emulator-5554</code>）。
      </li>
      <li>
        按上面&quot;方法二&quot;的 <code>pm path</code> + <code>adb pull</code> 提取。
      </li>
    </ol>
    <p>
      <strong>特点：</strong>
    </p>
    <ul>
      <li>✅ 全程在电脑完成，不需要实体手机。</li>
      <li>⚠️ 模拟器镜像体积大、吃内存。</li>
      <li>⚠️ 部分应用检测到模拟器会拒绝运行或不下发。</li>
    </ul>

    <h2>六、方法对比</h2>
    <ul>
      <li>
        <strong>在线下载器</strong> —— 不需要设备，保真度中（需核签名），难度低。适合快速拿包、下载旧版本。
      </li>
      <li>
        <strong>设备提取(ADB)</strong> —— 需要安卓机，保真度高，难度中。适合追求原包、备份自用。
      </li>
      <li>
        <strong>Aurora Store</strong> —— 不需要设备(无 GMS 也可)，保真度中高，难度低。适合国产机/无 GMS 设备。
      </li>
      <li>
        <strong>模拟器提取</strong> —— 不需要设备(用 PC)，保真度高，难度中高。适合无实机、批量提取。
      </li>
    </ul>

    <h2>七、拿到之后必须做的 3 件事</h2>
    <ol>
      <li>
        <strong>核验签名</strong>：用 <code>apksigner verify --print-certs app.apk</code> 或{" "}
        <code>keytool -printcert -jarfile app.apk</code>，确认签名者与官方一致。
      </li>
      <li>把 SHA-256 和下载站/官方公示对比。</li>
      <li>上传 VirusTotal，看报毒家数和权限清单。</li>
    </ol>
    <p>
      <strong>签名不一致、哈希对不上、多家报毒——满足任意一条，就别往设备上装。</strong>
    </p>

    <h2>八、常见问题</h2>
    <p>
      <strong>Q：为什么我下的 base.apk 装不上，提示&quot;解析包错误&quot;？</strong>{" "}
      大概率你下的是 Split APK 里的一个分片，缺少 base 或对应的 config 包。需要用 SAI/APKMirror Installer 合并安装，或把所有分片一起{" "}
      <code>adb install-multiple</code>。
    </p>
    <p>
      <strong>Q：在线下载器下的包和手机 Play 装的一样吗？</strong> 不一定，取决于站点是否改包。
      <strong>以签名为准</strong>，签名一致才是同一份。
    </p>
    <p>
      <strong>Q：能不能直接从 Play 网页点&quot;下载&quot;？</strong>{" "}
      不能。Play 网页只有&quot;安装到设备&quot;，不会给你 APK 文件。这是谷歌的设计，不是你的操作问题。
    </p>
    <p>
      <strong>Q：商用/分发合规吗？</strong> 自己备份、测试通常没问题；
      <strong>再分发受版权和开发者条款约束</strong>，请遵守当地法律与应用许可。
    </p>

    <p>
      <strong>结语：</strong>&quot;把 Google Play 的 APK 下到电脑&quot;，几条路各有取舍：
      <strong>图快用在线下载器，图真用设备/模拟器提取，无 GMS 用 Aurora Store</strong>。无论哪条，落点都是同一句——
      <strong>签名一致、哈希对上、扫描干净，才值得安装。</strong>工具只是手段，证据链才是底线。完整的验证流程见
      <Link href="/blog/apk-下载安全检测方法">APK 下载安全检测方法</Link>。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "怎么把 Google Play 的 APK 下载到电脑？",
    answer:
      "主要有四条路：1) 在线 APK 下载器（APKMirror、APKPure、APKCombo），粘贴 Play 链接或包名，选版本和架构即可；2) 用 ADB 从设备提取，执行 adb shell pm path 拿到路径后 adb pull 到电脑；3) 无 Google 服务的设备用 Aurora Store；4) 在电脑上跑带 Google Play 的模拟器再用 ADB 提取。Google Play 本身没有官方的一键下载到电脑功能。",
  },
  {
    question: "为什么不能直接从 Google Play 网页下载 APK？",
    answer:
      "因为 Google Play 上架的是 AAB（Android App Bundle），谷歌会按设备动态生成对应的 APK。你看到的 play.google.com/store/apps/details?id=... 只是展示页，只有\"安装到设备\"按钮，不会提供可下载的 APK 文件。这是谷歌的设计，不是操作错误。",
  },
  {
    question: "如何用 ADB 从手机提取 APK？",
    answer:
      "开启 USB 调试并连接手机后，执行 adb shell pm path com.example.app 获得 APK 路径，再用 adb pull <路径> 复制到电脑。Android 8 以上很多应用使用 Split APK，pm path 会返回多个文件，需要全部 pull，或先用 SAI 之类的工具在手机上导出成单个 .apks/.xapk 再传输。",
  },
  {
    question: "用在线 APK 下载器安全吗？",
    answer:
      "只要做好验证就是安全的。像 APKMirror 这类正规站会公示签名指纹，可以与官方对比。下载后务必用 apksigner 或 keytool 核验签名、把 SHA-256 与官方值对比，并上传 VirusTotal 多引擎扫描。签名不一致或多家报毒，就不应该安装。",
  },
];

export const zhPosts20260917: BlogPostEntry[] = [
  {
    slug: "apk-下载安全检测方法",
    title: "APK 下载安全检测方法完全指南：2026 一拿到文件就验清楚",
    description:
      "APK 和商店应用最大的区别是没人帮你审核，它只是一个谁都能改、能重签的压缩包。本文给出到手就能用的分层检测法：30 秒来源快筛、SHA-256 哈希比对、apksigner/keytool 签名验证、权限审查（无障碍/短信/设备管理器）、VirusTotal 多引擎扫描、模拟器沙箱试跑，以及完整的检测清单和常见误区。多花 5 分钟验证，胜过事后清木马。",
    date: "2026-09-17",
    readTime: "9 min read",
    tags: ["android", "apk", "安全检测", "哈希", "签名", "权限", "virustotal", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "google-play-apk-下载到电脑方法",
    title: "把 Google Play 的 APK 下载到电脑：2026 完整方法对比与实操",
    description:
      "想从 Google Play 拿 APK 到电脑却没有\"下载\"按钮？本文一次讲清四条路：在线 APK 下载器（APKMirror/APKPure/APKCombo）、用 ADB 从设备提取（pm path + adb pull）、无 GMS 设备用 Aurora Store、以及模拟器提取，并对比各自的保真度和难度，附拿到包后的签名/哈希/扫描三步验证，避免装上重打包的版本。",
    date: "2026-09-17",
    readTime: "8 min read",
    tags: ["android", "apk", "google-play", "adb", "教程", "侧载", "aurora-store"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260917List = toList(zhPosts20260917);
