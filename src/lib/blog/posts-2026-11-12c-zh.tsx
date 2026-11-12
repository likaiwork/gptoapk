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
      &ldquo;允许安装未知应用&rdquo;这句话在安卓设置里出现过十几年，但很少有人意识到：
      <strong>从 Android 8.0 开始，这个开关的语义彻底变了</strong>，而从 Android 14
      又收紧了一次。很多人按着网上 2015 年的教程找不到对应开关，不是手机有问题，是教程过期了。
    </p>
    <p>这篇把三代 Android 的安装来源机制讲清楚，顺便给出各厂商的实际路径。</p>

    <h2>机制演变：从全局开关到按来源授权</h2>

    <h3>Android 7.x 及更早：全局开关</h3>
    <p>
      一个 <code>Settings.Secure.INSTALL_NON_MARKET_APPS</code> 布尔值，开了就是开了，所有应用都能弹安装界面。
    </p>
    <p>
      <strong>安全问题很明显：</strong>你为了装一个 APK
      打开了这个开关，然后忘了关，之后任何一个恶意应用都能静默推送安装包诱导你点击——这就是早年&ldquo;点击广告就装了一堆垃圾应用&rdquo;的技术基础。
    </p>

    <h3>Android 8.0 起：按来源应用（安装器）授权</h3>
    <p>
      Google 改成了 <strong>
        <code>REQUEST_INSTALL_PACKAGES</code>
      </strong>{' '}
      权限模型：权限不再属于&ldquo;系统全局&rdquo;，而是<strong>授予某一个具体的应用</strong>。
    </p>
    <p>
      也就是说，&ldquo;Chrome 可以安装应用&rdquo;和&ldquo;文件管理器可以安装应用&rdquo;是<strong>两个独立的开关</strong>。
    </p>
    <p>
      这带来一个很实用的副作用：<strong>你可以只给正在用的浏览器授权，其他应用保持拒绝</strong>，攻击面大幅收窄。
    </p>

    <h3>Android 14 起：进一步收紧</h3>
    <ul>
      <li>
        侧载应用在首次安装时会被要求额外确认&ldquo;不允许安装&rdquo;的提示，且默认拒绝
      </li>
      <li>
        新安装的应用默认<strong>不能</strong>自动获得 <code>REQUEST_INSTALL_PACKAGES</code>，需要用户显式进入设置
      </li>
      <li>
        部分 ROM 对来自聊天软件（微信/QQ 传的 APK）的来源做了二次风控，会额外弹出风险提示
      </li>
    </ul>

    <h2>怎么看当前是谁在申请安装权限</h2>
    <p>
      最直接的办法是看<strong>安装界面上方的应用图标和名称</strong>——那才是实际的&ldquo;安装来源应用&rdquo;。
    </p>
    <p>
      比如你用微信打开一个 APK，安装界面上方显示的是微信的图标，那么需要授权的就是<strong>微信</strong>，不是文件管理器。这一点是最高频的误判来源：用户在&ldquo;文件管理&rdquo;里翻半天开关，其实应该给微信授权。
    </p>
    <p>
      <strong>系统层排查路径（通用）：</strong>
    </p>
    <pre>
      <code>{`设置 → 应用 → 特殊应用权限（或"特殊权限设置"）→ 安装未知应用`}</code>
    </pre>
    <p>里面会列出所有申请过 <code>REQUEST_INSTALL_PACKAGES</code> 的应用及当前状态。</p>

    <h2>各厂商实际路径</h2>
    <table>
      <thead>
        <tr>
          <th>品牌</th>
          <th>路径</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>原生 / Pixel / 类原生</td>
          <td>设置 → 应用 → 特殊应用权限 → 安装未知应用</td>
        </tr>
        <tr>
          <td>小米 / Redmi（HyperOS 及 MIUI）</td>
          <td>设置 → 应用设置 → 授权管理 → 特殊权限 → 安装未知应用</td>
        </tr>
        <tr>
          <td>华为 / 荣耀（HarmonyOS 4 及 EMUI）</td>
          <td>设置 → 安全 → 更多安全设置 → 安装外部来源应用</td>
        </tr>
        <tr>
          <td>OPPO / 一加 / realme（ColorOS）</td>
          <td>设置 → 安全 → 安装外部来源应用</td>
        </tr>
        <tr>
          <td>vivo / iQOO（OriginOS）</td>
          <td>设置 → 应用与权限 → 权限管理 → 安装未知应用</td>
        </tr>
        <tr>
          <td>三星（One UI）</td>
          <td>设置 → 应用 → 特殊访问权限 → 安装未知应用</td>
        </tr>
        <tr>
          <td>魅族（Flyme）</td>
          <td>设置 → 安全 → 未知来源安装</td>
        </tr>
      </tbody>
    </table>
    <p>
      如果找不到，直接在设置顶部<strong>搜索&ldquo;安装&rdquo;</strong>——绝大多数 ROM
      会直接命中这一项，比顺着菜单翻快得多。
    </p>

    <h2>常见异常与原因</h2>

    <h3>&ldquo;出于安全考虑，此应用无法安装&rdquo;</h3>
    <p>Android 14 之后出现的频率明显变高。原因通常是：</p>
    <ol>
      <li>该包来自网络下载且未经验证，系统默认拦截 —— 需要在风险提示页点&ldquo;仍要安装&rdquo;</li>
      <li>
        目标 SDK 版本低于 Android 14 要求的最低值（部分 ROM 会拦截 targetSdk &lt; 23 的老包）
      </li>
      <li>
        包内声明的 <code>REQUEST_INSTALL_PACKAGES</code> 由系统策略（MDM/企业设备）强制禁用
      </li>
    </ol>

    <h3>&ldquo;解析软件包时出现问题&rdquo;</h3>
    <p>
      这个报错<strong>和来源权限无关</strong>，是包本身的问题：下载不完整、架构不匹配（arm64
      包装到 x86 模拟器）、或者文件被截断。可以对比文件大小校验：
    </p>
    <pre>
      <code>{`# 检查 APK 完整性
unzip -t app.apk
# 查看架构和最低 SDK
aapt dump badging app.apk | grep -E "sdkVersion|native-code"`}</code>
    </pre>

    <h3>安装界面根本不弹出</h3>
    <p>
      不是权限问题，而是<strong>点击 APK 文件的动作没有被路由到安装器</strong>。常见于：
    </p>
    <ul>
      <li>文件管理器没有 application/vnd.android.package-archive 的 MIME 关联</li>
      <li>在聊天应用内预览模式下点击，被内置浏览器拦截</li>
    </ul>
    <p>
      解法：用系统的&ldquo;文件&rdquo;应用打开 APK 所在目录再点击，或改用 <code>adb install</code>。
    </p>

    <h2>ADB 安装：绕过全部来源限制</h2>
    <p>
      如果只是想快速装上，用电脑 <code>adb install</code>{' '}
      完全绕开手机上的来源授权（需要开启 USB 调试）：
    </p>
    <pre>
      <code>{`adb devices
adb install -r app.apk          # 覆盖安装保留数据
adb install -r -d app.apk       # 允许降级安装
adb install-multiple *.apk      # Split APK 多包安装`}</code>
    </pre>
    <p>
      <code>adb</code> 安装走的是 shell UID 的权限，不受{' '}
      <code>REQUEST_INSTALL_PACKAGES</code> 约束，也不会有厂商的各种&ldquo;安全提示&rdquo;弹窗。缺点是必须先开启开发者选项和 USB
      调试。
    </p>

    <h2>安全建议：把权限收回去</h2>
    <p>
      装完 APK 之后，<strong>建议把安装来源权限关掉</strong>，尤其是浏览器和聊天软件——它们是恶意安装包最主要的投放渠道。
    </p>
    <p>
      一个简单的判断标准：<strong>这个应用你一年要用它装几次 APK？</strong> 答案通常是 1~2
      次。为了 2 次安装，让它一年 365 天拥有弹安装界面的能力，不划算。
    </p>
    <p>
      更稳妥的做法是用一个专门的工具来装：比如用 <Link href="/">gptoapk.com</Link>{' '}
      这类工具下载官方签名的 APK 后，用系统文件管理器安装，装完立即收回文件管理器的安装权限，浏览器和微信永远保持&ldquo;不允许安装&rdquo;。
    </p>

    <h2>一句话总结</h2>
    <p>
      <strong>Android 8+ 的&ldquo;未知来源&rdquo;是按应用授权的</strong>
      ，看安装界面上方是哪个应用的图标，就去给谁开权限；装完记得收回，别让浏览器和聊天软件长期持有这个能力。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么我在设置里找不到允许未知来源这个开关？",
    answer:
      "因为这个开关在 Android 8.0 被拆掉了。现在没有一个全局的未知来源总开关，而是按安装器应用分别授权，路径是 设置 → 应用 → 特殊应用权限 → 安装未知应用，里面按应用逐个列出。也可以在设置搜索框直接搜安装。",
  },
  {
    question: "明明开了权限，安装时还是提示出于安全考虑无法安装怎么办？",
    answer:
      "这种拦截通常来自系统对来源和包本身的校验，而不是权限没给。常见原因有三个：包是网络下载且未经验证，需要在风险页点仍要安装；包的 targetSdk 低于系统要求的下限；包被企业设备策略（MDM）禁用。先确认包的来源和签名，再考虑换包。",
  },
  {
    question: "adb install 需要手机开什么权限？",
    answer:
      "需要在开发者选项里打开 USB 调试（部分厂商还要额外打开 USB 安装或通过 USB 安装应用），电脑端装好 platform-tools。adb 安装走 shell UID，不经过 REQUEST_INSTALL_PACKAGES 授权，因此不会有系统的未知来源提示，但仍会受到包签名、降级、targetSdk 等基础校验。",
  },
  {
    question: "装完应用后要不要把安装来源权限关掉？",
    answer:
      "建议关掉。浏览器和聊天软件是恶意安装包最主要的投放渠道，它们长期持有可安装应用权限意味着任何一次页面劫持都可能弹出安装界面。用完立即收回，只保留你确实需要一个专门的安装工具（如系统文件管理器）来装 APK。",
  },
];

export const zhPosts20261112C = [
  {
    slug: "android-install-unknown-sources-modern",
    title: "安卓APK安装来源设置详解：为什么未知来源不是一个开关，而是三个",
    description:
      "Android 8.0 把允许未知来源从全局开关改成了按安装器应用授权，Android 14 又收紧一次。这本讲清三代机制差异、各厂商实际路径、常见报错的真实原因，以及 adb 安装如何绕过全部限制。",
    date: "2026-11-12",
    readTime: "10 min read",
    tags: ["android", "apk", "security"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
];

export const zhPosts20261112CList = toList(zhPosts20261112C);
