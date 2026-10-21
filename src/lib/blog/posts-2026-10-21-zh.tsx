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
    <p className="lead">
      OPPO 国行机默认不带 Google 服务框架（GMS），想装 Google Play 商店，要么在设置里一键开启，要么手动补装三个组件。这篇把 ColorOS
      各版本的差异讲清楚，避免你装了假包、闪退、或者登录时提示「此设备未获得 Play 保护机制认证」。
    </p>
    <blockquote>
      <p>
        <strong>核心结论：</strong>先看 ColorOS 版本。12 及以后大多有内置入口，直接开启即可；11
        及以前或部分运营商定制机需要手动装三个 APK，顺序不能错。
      </p>
    </blockquote>

    <h2>第一步：确认设备与系统版本</h2>
    <p>
      在「设置 → 关于本机 → 版本信息」里看 <code>ColorOS 版本</code> 和 <code>Android 版本</code>。ColorOS 12 / 13 / 14 /
      15 大概率有内置 GMS 开关；ColorOS 11 及以下需要手动安装框架；运营商定制机或部分海外版设置项名称不同，或本身已带 GMS。
    </p>
    <p>顺便记下机型代号和 Android 版本，后面选 APK 要用。</p>

    <h2>第二步：先找内置开关（省掉 90% 的麻烦）</h2>
    <p>路径通常是：</p>
    <pre>
      <code>设置 → 其他设置 → 系统服务 → Google</code>
    </pre>
    <p>或者：</p>
    <pre>
      <code>设置 → 应用管理 → 显示系统应用 → 搜索「Google」</code>
    </pre>
    <p>
      如果能找到「Google 基本服务」或「GMS 服务」开关，直接打开，系统会提示下载安装所需组件。等它装完，桌面上就会出现 Play
      商店图标。如果找不到这个开关，说明机型被精简了，走第三步手动安装。
    </p>

    <h2>第三步：手动安装 GMS 三件套（顺序很重要）</h2>
    <p>需要三个组件，缺一不可，且安装顺序固定：</p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>顺序</th>
            <th>组件</th>
            <th>包名</th>
            <th>作用</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Google Services Framework</td>
            <td>
              <code>com.google.android.gsf</code>
            </td>
            <td>账号与同步基础框架</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Google Play Services</td>
            <td>
              <code>com.google.android.gms</code>
            </td>
            <td>核心服务，几乎所有 Google 应用都依赖它</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Google Play Store</td>
            <td>
              <code>com.android.vending</code>
            </td>
            <td>商店本体</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      <strong>顺序装反的典型症状：</strong>Play 商店一打开就闪退，或者卡在「正在检查信息」无限转圈。
    </p>

    <h3>版本怎么选</h3>
    <p>
      Play Services 必须和 Android 版本匹配（Android 12 用 v22+，Android 13/14 用 v23+），同时匹配 CPU 架构（现在主流是{" "}
      <code>arm64-v8a</code>）。Play Store 分 <code>nodpi</code>（通用）和 DPI 版本，不确定就选 <code>nodpi</code>。
      用这个命令确认架构：
    </p>
    <pre>
      <code>adb shell getprop ro.product.cpu.abi</code>
    </pre>

    <h3>安装方法</h3>
    <p>
      <strong>方法 A：手机上直接装。</strong>按 1 → 2 → 3 的顺序逐个点击安装。如果提示「禁止安装未知来源应用」，先在「设置 →
      应用管理 → 文件管理」里允许安装未知应用。
    </p>
    <p>
      <strong>方法 B：用 adb 装（更稳，能看报错）。</strong>
    </p>
    <pre>
      <code>{`adb install -r gsf.apk
adb install -r gms.apk
adb install -r vending.apk`}</code>
    </pre>
    <p>
      如果 gms 报 <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>，说明系统里有旧版本残留，先卸载再装。⚠️ 卸载 GMS
      会导致依赖它的应用（部分银行 App、地图、推送服务）异常，操作前想清楚。
    </p>

    <h2>第四步：登录与激活</h2>
    <p>
      打开 Play 商店，点右上角头像登录 Google 账号（没有就先在浏览器里注册）。登录成功后回到「设置 → 账号」确认 Google
      账号已出现。如果登录后提示「此设备未获得 Play 保护机制认证」，说明设备 ID 没在 Google 数据库里，可以等待 24
      小时自动注册（多数情况有效），或在「应用管理 → Google Play 商店 → 存储」清除数据后重新登录。
    </p>

    <h2>第五步：验证是否真的可用</h2>
    <p>不要只看图标能不能打开，做这三个测试：</p>
    <ol>
      <li>搜索并安装一个免费小应用（比如 Google Keep），能下载完成 = 商店通路正常</li>
      <li>打开这个应用并登录，能读到账号 = GMS 账号同步正常</li>
      <li>
        在浏览器里打开 <code>play.google.com</code>，能看到「已安装」标记 = 设备认证通过
      </li>
    </ol>
    <p>三项全过，才算装好。</p>

    <h2>常见问题速查</h2>
    <ul>
      <li>
        <strong>Play 商店提示「与您的设备不兼容」：</strong>可能缺少该应用要求的 Play Services 版本，或设备认证未过。先解决认证问题。
      </li>
      <li>
        <strong>装完 GMS 后手机变卡 / 耗电：</strong>GMS 会常驻后台并频繁联网。可以在「设置 → 电池 → 应用耗电管理」里限制后台，但这会导致推送延迟。
      </li>
      <li>
        <strong>更新 GMS 后所有 Google 应用闪退：</strong>新版本 GMS 可能不支持老 Android 版本。装回匹配的旧版本，并在 Play
        商店里关掉 Play Services 的自动更新。
      </li>
      <li>
        <strong>我只想用某个 Google App，不想装整套 GMS：</strong>YouTube、Maps 等强依赖 GMS，绕不过去。少数可以用网页版替代。
      </li>
    </ul>

    <h2>安全提醒</h2>
    <p>
      GMS 三件套是高权限系统组件，被篡改的包能做的事比普通应用多得多。务必从可验证的镜像站下载，下载后核对 SHA-256，装完后用{" "}
      <code>apksigner verify --print-certs</code> 检查签名是不是 Google 的证书。不要用来源不明的「一键 GMS
      安装器」，那类工具常捆绑无关组件。
    </p>
    <p>
      装之前，先确认下载的 APK 是原版 — 这是所有后续步骤能不能成立的前提。校验方法见{" "}
      <Link href="/blog/apk-safety-check-before-install-5-steps">APK 安装前 5 步安全检查</Link>。
    </p>

    <h2>小结</h2>
    <p>
      OPPO 装 Google Play 的路径就三条：先查 ColorOS 版本 → 有内置开关就用开关 → 没有就按 GSF → GMS → Play Store
      的顺序手动装 → 最后验证账号与下载链路。全程大约 15 分钟，最容易出错的地方是组件顺序和版本不匹配，这两点对上，基本一次成功。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "OPPO 手机为什么找不到 Google Play 商店？",
    answer:
      "国行 OPPO 出厂时精简了 Google 服务框架（GMS），没有 GMS 就没有 Play 商店。ColorOS 12 及以上多在「设置 → 其他设置 → 系统服务 → Google」提供内置开关，开启后系统会自动安装所需组件；更早版本需要手动安装 GSF、GMS、Play Store 三个 APK。",
  },
  {
    question: "GMS 三件套的安装顺序可以打乱吗？",
    answer:
      "不行。必须按 Google Services Framework、Google Play Services、Google Play Store 的顺序安装。顺序错误或缺少中间组件时，Play 商店通常表现为一打开就闪退，或卡在「正在检查信息」无限转圈。",
  },
  {
    question: "装完 Google Play 提示「此设备未获得 Play 保护机制认证」怎么办？",
    answer:
      "这表示设备 ID 还没在 Google 数据库里注册。多数情况下等待 24 小时会自动完成认证；也可以在「应用管理 → Google Play 商店 → 存储」清除数据后重新登录。只要登录同一账号，认证状态会随设备 ID 绑定。",
  },
  {
    question: "安装 GMS 需要 root 吗？",
    answer:
      "不需要。GSF 和 Play Store 都是普通用户级安装，Play Services 通过常规安装即可生效。只有需要把 GMS 装成系统应用（system app）以解决部分兼容问题时才需要 root，普通使用场景不必冒险。",
  },
  {
    question: "装 GMS 会不会影响手机保修或系统更新？",
    answer:
      "不会影响 OTA 系统更新和保修，GMS 是普通第三方应用。但装后会常驻后台、增加耗电，部分依赖 Google 账号的国内应用可能出现账号冲突，建议只开启需要的 Google 服务。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      X（原 Twitter）的安卓客户端有几个特殊之处：它有 Alpha / Beta / Stable 三个通道，有分架构包，且官方不提供 APK
      直链下载，所以在国内或想锁定旧版本时，很多人会去第三方站点找包。这篇讲清楚怎么下载到没被改过的 X APK，以及版本该怎么挑。
    </p>
    <blockquote>
      <p>
        <strong>核心结论：</strong>X 官方只通过 Google Play 分发。所有第三方 APK
        都是对 Play 版本的搬运或重打包，区别只在于搬运过程中有没有被塞东西。所以流程的重点不是「从哪下」，而是「下完怎么验」。
      </p>
    </blockquote>

    <h2>一、先确认你的实际需求</h2>
    <p>在找包之前，先弄清属于哪种情况，因为每种的最优解不同：</p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>需求</th>
            <th>推荐做法</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>手机能正常用 Google Play</td>
            <td>直接在 Play 商店装，别折腾 APK</td>
          </tr>
          <tr>
            <td>想用 Beta 通道新功能</td>
            <td>加入 Play 测试计划，或下载 Beta 版 APK</td>
          </tr>
          <tr>
            <td>想锁定旧版本（界面不习惯 / 旧系统卡顿）</td>
            <td>下载指定版本 APK 并关闭自动更新</td>
          </tr>
          <tr>
            <td>设备无 GMS（国产机型）</td>
            <td>先解决 Google 服务框架，否则装了也登录不了</td>
          </tr>
          <tr>
            <td>想装到平板 / 车机 / 电视盒</td>
            <td>必须按 CPU 架构选包</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      最后一类最容易踩坑：X 的 APK 有 <code>arm64-v8a</code>、<code>armeabi-v7a</code>、<code>x86_64</code>{" "}
      等拆分。装错架构的表现是安装成功但打开就闪退。
    </p>

    <h2>二、官方渠道清单</h2>
    <p>按可信度排序：</p>
    <ol>
      <li>
        <strong>Google Play 商店</strong> —— 唯一官方来源，自动匹配架构与版本
      </li>
      <li>
        <strong>X 官方 Beta 测试计划</strong> —— Play 商店页面里的「加入测试」
      </li>
      <li>
        <strong>可信镜像站</strong>（APKMirror 这类，会对上传包做签名校验并公开证书指纹）
      </li>
      <li>
        <strong>聚合站</strong> —— 方便，但必须验签
      </li>
    </ol>
    <p>⚠️ 避开：搜索结果顶部的「高速下载」「破解版」「免登录版」广告位。X 没有「免登录版」这种东西，这类包一律是改过的。</p>

    <h2>三、选对版本与架构</h2>
    <h3>看架构</h3>
    <pre>
      <code>adb shell getprop ro.product.cpu.abi</code>
    </pre>
    <p>
      近五年手机基本都是 <code>arm64-v8a</code>；2015 年前的老设备可能是 <code>armeabi-v7a</code>；模拟器和部分平板是{" "}
      <code>x86_64</code>。不确定就下载 <code>universal</code> 包（体积大一倍，但通用）。
    </p>
    <h3>看最低系统要求</h3>
    <p>
      X 新版本通常要求 Android 8.0 及以上。如果设备是 Android 7，需要往回找 9.x 系列的老版本，下载页面的「技术要求」里能看到{" "}
      <code>minSdk</code>。
    </p>
    <h3>看包类型</h3>
    <p>
      <code>.apk</code> 是单文件，直接装；<code>.xapk</code> / <code>.apks</code>{" "}
      是拆分包集合，不能直接点安装，需要 SAI（Split APKs Installer）或 adb：
    </p>
    <pre>
      <code>adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk</code>
    </pre>

    <h2>四、下载后的必做校验</h2>
    <p>这一步决定你装的是 X 还是别的东西。</p>
    <h3>1. 算哈希，和网站公布的值比对</h3>
    <pre>
      <code>shasum -a 256 Twitter-11.0.0-release.apk</code>
    </pre>
    <p>站点公布的 SHA-256 必须完全一致。这一步能挡住下载过程中的损坏和传输劫持。</p>
    <h3>2. 验签名证书</h3>
    <pre>
      <code>apksigner verify --print-certs Twitter.apk</code>
    </pre>
    <p>
      看 <code>Signer #1 certificate SHA-256 digest</code>。同一个开发者的所有版本指纹都相同，所以可以拿一个从 Play
      装的旧版本作参照比对。不一致 = 这个包不是 X 官方签发的。
    </p>
    <h3>3. 看权限清单</h3>
    <pre>
      <code>aapt2 dump permissions Twitter.apk</code>
    </pre>
    <p>
      X 需要的权限大致是：网络、存储读写、相机（发图）、麦克风（语音）、通知、位置（可选）。如果看到 SMS 读取、通讯录全量读取、无障碍服务、设备管理员，直接删包。
    </p>

    <h2>五、安装与常见报错</h2>
    <p>
      安装命令：<code>adb install -r Twitter.apk</code>。手机上直接点也可以，但需要先在文件管理器应用里允许「安装未知应用」。
    </p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>报错</th>
            <th>原因</th>
            <th>解决</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>
            </td>
            <td>已装版本签名不同</td>
            <td>卸载原版再装（登录状态要重来）</td>
          </tr>
          <tr>
            <td>
              <code>INSTALL_FAILED_VERSION_DOWNGRADE</code>
            </td>
            <td>装的是旧版本</td>
            <td>
              加 <code>-d</code> 参数
            </td>
          </tr>
          <tr>
            <td>
              <code>INSTALL_FAILED_NO_MATCHING_ABIS</code>
            </td>
            <td>架构不对</td>
            <td>换对应架构的包</td>
          </tr>
          <tr>
            <td>
              <code>INSTALL_PARSE_FAILED_NO_CERTIFICATES</code>
            </td>
            <td>包被破坏或二次打包</td>
            <td>重新下载，换来源</td>
          </tr>
          <tr>
            <td>安装成功但打开闪退</td>
            <td>缺 GMS 或架构不对</td>
            <td>检查 Google 服务，或查架构</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      如果特意装了旧版本，一定要在 Play 商店里关掉 X 的自动更新（点 X → 右上角三点 → 取消勾选「启用自动更新」），否则几小时内就被推回新版。
    </p>

    <h2>六、没有 Google 服务的设备怎么办</h2>
    <p>
      X 的登录依赖 Google 服务框架。如果设备没有 GMS，网页版 <code>x.com</code> 可用，功能约 90%
      完整；装 GMS 后 APK 才能稳定登录。部分第三方客户端可能可用，但不建议用来源不明的客户端登录主账号。
    </p>

    <h2>七、安全底线</h2>
    <ol>
      <li>不在第三方客户端里输入主账号密码，尤其是要求「输入验证码登录」的</li>
      <li>不相信「破解版 / 去广告版」，改包过程中注入代码是最常见的手法</li>
      <li>装之前跑一遍验签，10 秒的事，能挡掉绝大部分问题</li>
      <li>优先用 Play 商店自动更新，只有确实需要锁版本时才手动装 APK</li>
    </ol>

    <h2>小结</h2>
    <p>
      X 的 APK 下载，本质是三件事：选对架构和版本、验哈希和签名、搞定 GMS 依赖。渠道反而是次要的 ——
      任何来源的包，只要签名指纹对得上官方，就是原版；对不上，再「官方」的网站也别装。
    </p>
    <p>
      如果你只是想在能联网的安卓机上用 X，别折腾 APK，Play 商店装一下就好。APK 这条路留给锁版本、无 GMS 设备、和装到非手机设备这三种场景。
      更多选源避坑要点见 <Link href="/blog/safely-download-apk-mirror-red-flag-checklist">镜像站危险信号清单</Link>。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Twitter（X）的 APK 官方在哪里下载？",
    answer:
      "X 官方只通过 Google Play 商店分发，没有官网 APK 直链。第三方站点的 APK 都是对 Play 版本的搬运或重打包，下载后必须核对 SHA-256 并用 apksigner 验证签名证书，确认签名指纹与官方一致才可安装。",
  },
  {
    question: "X 的 APK 安装成功但打开就闪退是什么原因？",
    answer:
      "最常见的是 CPU 架构不匹配：设备是 arm64-v8a 但装了 armeabi-v7a 的包，或反之。其次是设备缺少 Google 服务框架（GMS），X 登录强依赖 GMS。先用 adb shell getprop ro.product.cpu.abilist 确认架构，再检查 Google 服务是否可用。",
  },
  {
    question: "X 的 Beta 版怎么获取？",
    answer:
      "在 Play 商店的 X 页面里找到「加入测试计划」，加入后会自动收到 Beta 版更新。退出测试计划则回到稳定版。Beta 版功能新但稳定性差，日常使用建议用 Stable 通道。",
  },
  {
    question: "安装旧版本 X 会被自动更新回新版吗？",
    answer:
      "会，除非手动关闭自动更新。Play 商店里点开 X 页面，右上角三点菜单中取消勾选「启用自动更新」即可锁定版本。注意锁定的旧版本可能因 API 变更导致部分功能不可用。",
  },
  {
    question: "下载 X 的 .xapk 文件怎么安装？",
    answer:
      ".xapk 和 .apks 是拆分包集合，不能直接点击安装。手机上用 SAI（Split APKs Installer）选择整个文件安装；电脑上用 adb install-multiple 一次性把所有 split 文件装进去，避免只装 base.apk 导致启动崩溃。",
  },
];

export const zhPosts20261021: BlogPostEntry[] = [
  {
    slug: "oppo-install-google-play-guide",
    title: "OPPO 手机安装 Google Play 完整教程：从「找不到服务」到正常登录",
    description:
      "国行 OPPO 默认不带 GMS，Play 商店装不上。ColorOS 各版本的内置开关位置、GMS 三件套的安装顺序、版本与架构怎么选，以及「未获得 Play 保护机制认证」的解决办法。",
    date: "2026-10-21",
    readTime: "8 min read",
    tags: ["android", "google play", "OPPO", "GMS", "教程"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "twitter-x-apk-download-guide",
    title: "Twitter（X）APK 下载指南：官方渠道、版本选择与安装避坑",
    description:
      "X 官方只通过 Play 分发，第三方包必须验签。如何按架构和 minSdk 选对版本、下载后必做的三个校验、安装报错对照表，以及无 GMS 设备的替代方案。",
    date: "2026-10-21",
    readTime: "8 min read",
    tags: ["android", "apk", "Twitter", "X", "下载", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261021List = toList(zhPosts20261021);
