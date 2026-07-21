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
      "应用未安装"、"安装包与现有应用签名不一致"、"INSTALL_FAILED_UPDATE_INCOMPATIBLE"——这些报错很让人抓狂。APK签名校验是安卓的安全机制。这篇文章帮你搞懂签名校验是什么、为什么你会碰到、以及怎么解决。
    </p>

    <h2>什么是APK签名校验？</h2>
    <p>
      每个APK在发布时，开发者都会用<strong>私钥</strong>对其签名，安卓系统用对应的<strong>公钥</strong>来验证。核心目的：
    </p>
    <ol>
      <li><strong>验证来源</strong> — 确保APK确实来自声称的开发者</li>
      <li><strong>防篡改</strong> — 确保APK发布后没被修改过</li>
      <li><strong>防止替换</strong> — 确保更新包来自同一个开发者</li>
    </ol>
    <p>当你安装一个已存在应用的更新版时，系统会比对新旧APK的签名——<strong>不一致就直接拒绝安装</strong>。</p>

    <h2>签名校验失败的5大原因</h2>

    <table>
      <thead>
        <tr>
          <th>错误信息</th>
          <th>原因</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code></td><td>已有签名不同的版本</td></tr>
        <tr><td><code>INSTALL_FAILED_INVALID_APK</code></td><td>APK文件损坏或签名格式异常</td></tr>
        <tr><td><code>App not installed</code></td><td>通用错误，最常见原因是签名冲突</td></tr>
        <tr><td>安装按钮灰色不可点击</td><td>Google Play保护机制拦截</td></tr>
        <tr><td><code>Signature verification failed</code></td><td>签名被篡改或校验消息摘要错误</td></tr>
      </tbody>
    </table>

    <h3>原因一：卸载后装了不同签名的版本</h3>
    <p>最常见的场景：从Google Play安装了微信 → 删除 → 从第三方网站下载了修改版微信 → 安装失败。即使卸载了原版，安卓系统仍然会有<strong>残留签名记录</strong>。</p>

    <h3>原因二：Google Play保护机制拦截</h3>
    <p>Google Play Protect会检查APK签名。如果发现签名与已知的官方签名不符，会直接拦截安装。</p>

    <h3>原因三：使用了不兼容的修改版</h3>
    <p>修改版APK（去广告版、解锁版、功能增强版）通常使用修改者的签名，与原版签名不同。如果你之前装的是原版，修改版就无法覆盖安装。</p>

    <h3>原因四：APK文件本身损坏</h3>
    <p>下载过程中文件损坏也会导致校验失败——但不是签名问题，而是文件完整性被破坏。</p>

    <h3>原因五：系统签名（System App）冲突</h3>
    <p>如果应用是系统预装的（比如系统级应用），尝试安装用户签名的版本也会失败。</p>

    <h2>完整的修复方法</h2>

    <h3>方法一：彻底卸载旧应用 + 清理残留</h3>
    <p>1. 手机设置 → 应用 → 找到该应用 → 卸载<br />
    2. <strong>重启手机</strong>（关键步骤，很多残留在重启后才会清除）<br />
    3. 如果重启后还不行，尝试用ADB强制卸载：</p>
    <pre><code>{`adb uninstall 包名
adb shell pm list packages | grep 应用名  # 先查包名

# 更彻底的方式
adb shell
pm uninstall 包名
pm uninstall --user 0 包名  # 对所有用户卸载
exit`}</code></pre>

    <h3>方法二：安装原版APK再覆盖</h3>
    <p>如果你坚持要用某个修改版，但签名不一致：除非修改版保留了原版签名，否则<strong>不可能覆盖原版</strong>。</p>

    <h3>方法三：关闭Google Play保护</h3>
    <p>1. 打开Google Play → 点右上角头像 → Play保护<br />
    2. 关闭"扫描应用以检测安全威胁"<br />
    3. 重启安装</p>
    <p>⚠️ <strong>注意：</strong> 关闭后手机的安全性会有所降低。安装完记得重新开启。</p>

    <h3>方法四：使用同一签名的版本</h3>
    <p>确保手机上从来没装过官方的原版（包括通过Google Play自动恢复的）：设置 → Google → 备份 → 关闭"自动恢复" → 重启设备 → 再安装。</p>

    <h3>方法五：多开/双开方案（推荐）</h3>
    <p>如果因为签名冲突装不上修改版，用<strong>工作资料（Work Profile）</strong>方案：使用Island或Shelter创建Work Profile → 在工作资料中安装修改版APK → 主用户空间的官方版不受影响。这样你可以同时使用<strong>官方版</strong>和<strong>修改版</strong>，互不干扰。</p>

    <h3>方法六：重新下载APK</h3>
    <p>删除损坏的APK文件，从可靠来源重新下载（推荐 <a href="https://gptoapk.com">gptoapk.com</a>）。</p>

    <h2>验证APK签名的方法</h2>
    <pre><code>{`# 在APK所在目录执行（电脑端）
unzip -q 应用名.apk -d /tmp/apk_extract
keytool -printcert -jarfile 应用名.apk`}</code></pre>

    <h2>如何预防签名冲突？</h2>
    <ul>
      <li><strong>从单一来源安装应用</strong> — 要么一直从Google Play更新，要么一直用同一个第三方渠道</li>
      <li><strong>备份原版APK</strong> — 在安装修改版之前，保存好官方原版的APK</li>
      <li><strong>使用应用双开</strong> — 工作资料可以安装不同签名的相同应用</li>
      <li><strong>不要混装</strong> — 避免同时从Google Play和第三方安装同一个应用</li>
    </ul>

    <h2>常见问题</h2>

    <h3>Q：同一个开发者发布的不同版本的APK签名会不同吗？</h3>
    <p><strong>不会。</strong> 开发者的私钥应该是固定的，同一个开发者的所有APK签名一致。但有一种特殊情况——<strong>调试签名</strong> vs <strong>发布签名</strong>。开发中用的调试签名和正式发布的签名不同，所以debug版和release版不能互相覆盖。</p>

    <h3>Q：如何确认APK签名正确没有被篡改？</h3>
    <p>使用电脑终端验证：<code>keytool -printcert -jarfile 文件名.apk</code>，将显示的SHA-256指纹与官方公布的指纹对比。</p>

    <h3>Q：APKPure下载的APK签名和Google Play的一样吗？</h3>
    <p>APKPure声称提供的是原版未修改APK，签名和Google Play一致。但为了安全，建议下载后自行验证签名。</p>

    <h2>总结</h2>
    <table>
      <thead>
        <tr>
          <th>你的情况</th>
          <th>推荐方案</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>正常更新报签名错误</td><td>方法一（清理残留 + 重启）</td></tr>
        <tr><td>想装修改版但装了官方版</td><td>方法五（多开方案）</td></tr>
        <tr><td>下载后安装失败</td><td>方法六（重新下载）</td></tr>
        <tr><td>Google Play保护拦截</td><td>方法三（关闭保护）</td></tr>
        <tr><td>系统预装应用</td><td>方法五（工作资料安装）</td></tr>
      </tbody>
    </table>
    <p>签名校验是安卓的安全底线——碰上校验失败说明系统在正常保护你。不必硬来，换个思路（比如多开）往往更省事。</p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "安装mod版APK为什么总报签名错误？",
    answer: "因为mod版使用了修改者的签名，与原版不同。如果之前安装过官方版，需要彻底卸载（含清理残留）或使用工作资料方案。",
  },
  {
    question: "同款应用能否同时运行两个不同签名版本？",
    answer: "可以。使用Island或Shelter创建Work Profile，在工作资料中安装修改版，主空间保留官方版，互不干扰。",
  },
  {
    question: "APK签名校验失败和解析错误有什么区别？",
    answer: "签名校验失败是系统能读取APK但签名不一致；解析错误是系统根本无法读取APK文件。两者原因和解决方法完全不同。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      "新版本太卡了。""更新后广告变多了。""最新版砍掉了某某功能。"——你是不是也有过这样的经历？应用一更新，反而更难用了。好消息是——你完全可以<strong>降级安装回旧版本</strong>。
    </p>

    <h2>基础概念：为什么降级默认被禁止？</h2>
    <p>Android系统默认不允许应用降级（downgrade）。这是安全机制：新版本通常会修复漏洞，降级可能让手机暴露在已知风险中。但别担心，我们有办法绕过去。</p>

    <h2>准备工作</h2>

    <h3>下载旧版APK</h3>
    <p>推荐来源：<a href="https://gptoapk.com">gptoapk.com</a>（从Google Play链接直接下载原始APK）、APKMirror / APKPure（有版本历史）、自己手动备份。</p>

    <h3>备份当前数据</h3>
    <p>降级会清掉应用的数据。建议先备份：如果有聊天记录（微信/WhatsApp），先导出备份。使用Swift Backup或Titanium Backup（需root）备份应用数据。</p>

    <h2>方法一：卸载重装（最简单，适合非关键应用）</h2>
    <p><strong>步骤：</strong> 设置 → 应用 → 找到目标应用 → 卸载 → 安装旧版APK → 登录使用。</p>
    <p><strong>适合：</strong> 应用没有重要数据（游戏、工具类）或数据可以云端同步（笔记类、云盘类）。</p>

    <h2>方法二：ADB命令强制降级（推荐，保留数据）</h2>
    <p>ADB（Android Debug Bridge）可以直接在电脑上向手机发送指令，其中 <code>adb install -d</code> 参数允许降级安装。</p>

    <h3>步骤</h3>
    <p><strong>1. 开启USB调试</strong></p>
    <p>设置 → 关于手机 → 连续点"版本号"7次 → 进入开发者模式 → 开启USB调试。</p>

    <p><strong>2. 连接电脑</strong></p>
    <pre><code>{`# 查看设备是否连接
adb devices
# 应该看到: 1234567890ABCDEF   device`}</code></pre>
    <p>如果显示 <code>unauthorized</code>，手机上确认授权即可。</p>

    <p><strong>3. 安装旧版APK（核心命令）</strong></p>
    <pre><code>{`adb install -d 旧版.apk   # -d 参数允许降级`}</code></pre>
    <p>系统会保留应用的原数据不变，只替换应用文件。</p>

    <p><strong>4. 如果提示版本冲突</strong></p>
    <pre><code>{`adb uninstall 包名     # 先卸载（会清数据）
adb install 旧版.apk   # 重新安装旧版`}</code></pre>

    <h3><code>-d</code> 参数原理</h3>
    <p><code>-d</code> 即 <code>--downgrade</code>，它告诉系统："我知道这是降级，我确定要这么做。"使用 <code>-d</code> 参数时，ADB会强制覆盖安装比当前版本号更低的APK，而不需要先卸载。</p>

    <h2>方法三：卸载更新（仅限系统预装应用）</h2>
    <p>如果你的应用是手机出厂自带的（比如系统应用、小米商店、华为钱包等），可能连卸载都不行。但你仍然有机会——<strong>卸载更新</strong>。</p>
    <p><strong>步骤：</strong> 设置 → 应用 → 找到系统应用 → 点右上角 ⋮ → 点击"卸载更新" → 系统应用会回到出厂版本。</p>
    <p>注意：部分厂商隐藏了"卸载更新"按钮（如华为/荣耀的一些系统应用）。卸载更新后会自动启用<strong>禁用自动更新</strong>。</p>

    <h2>方法四：第三方工具（不推荐）</h2>
    <p>市面上有一些声称可以一键降级的工具，但最安全的方式还是方法二（ADB），不需要root，不会安装额外工具。</p>

    <h2>各大厂商系统的特殊处理</h2>

    <h3>MIUI / HyperOS（小米/红米）</h3>
    <p>建议关闭"MIUI优化"（开发者选项 → 关闭MIUI优化），降级成功后重新开启。部分系统应用需要先关闭"纯净模式"。</p>

    <h3>HarmonyOS（华为/荣耀）</h3>
    <p>启用开发者选项 → USB调试，关闭"增强安全模式"。部分系统应用无法降级，即使通过ADB也不行。建议使用方法一（卸载重装）给非系统应用降级。</p>

    <h3>ColorOS / Realme UI（OPPO/真我）</h3>
    <p>开发者选项 → 开启"禁止权限监控"和"不锁定系统更新"。ColorOS 14及以后版本对ADB降级的限制增加。</p>

    <h3>One UI（三星）</h3>
    <p>三星对ADB降级的限制最少，一般直接 <code>adb install -d</code> 即可。唯一的坑是部分三星系统应用在降级后可能触发<strong>Knox安全机制</strong>，导致某些功能（如Samsung Pay）不可用。</p>

    <h2>降级后如何防止自动更新？</h2>
    <p><strong>Google Play：</strong> 点头像 → 设置 → 网络偏好设置 → 关闭"自动更新应用"。</p>
    <p><strong>厂商商店：</strong></p>
    <ul>
      <li>小米：应用商店 → 设置 → 关闭自动更新</li>
      <li>华为：应用市场 → 设置 → 自动更新应用 → 关闭</li>
      <li>OPPO：软件商店 → 设置 → 自动更新 → 关闭</li>
      <li>三星：Galaxy Store → 设置 → 自动更新应用 → 关闭</li>
    </ul>

    <p><strong>终极方案：用ADB禁用更新组件</strong></p>
    <pre><code>{`# 禁用 Google Play 的自动更新服务（慎用）
adb shell pm disable-user --user 0 com.android.vending

# 恢复
adb shell pm enable com.android.vending`}</code></pre>
    <p>⚠️ 禁用Google Play后，你将无法使用Play商店功能。要使用时再启用即可。</p>

    <h2>常见问题</h2>
    <h3>Q：降级后应用闪退怎么办？</h3>
    <p>旧版应用可能依赖新版的数据格式。尝试设置 → 应用 → 找到应用 → 存储 → <strong>清除数据</strong> → 重新登录。</p>

    <h3>Q：降级后会不会有安全风险？</h3>
    <p>可能。旧版应用可能有已知的漏洞。建议只降级非敏感应用（如工具类、媒体播放器），尽量避免降级银行、支付类应用。</p>

    <h3>Q：微信可以降级吗？</h3>
    <p>可以，但要注意：降级前在微信内备份聊天记录到电脑。如果旧版无法识别新版数据库，可能需要清除微信数据再恢复备份。</p>

    <h3>Q：有没有不需要电脑的降级方法？</h3>
    <p>部分手机支持通过文件管理器点击旧版APK直接安装，系统会让你确认。如果不支持，弹窗会提示"无法降级安装"——此时只能用ADB。</p>

    <h2>总结</h2>
    <table>
      <thead>
        <tr>
          <th>你的情况</th>
          <th>推荐方法</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>想保留数据降级</td><td>方法二（ADB <code>-d</code> 参数）</td></tr>
        <tr><td>系统和重要应用</td><td>方法三（卸载更新）</td></tr>
        <tr><td>小应用、不关数据</td><td>方法一（卸载重装）</td></tr>
        <tr><td>小米/华为特殊系统</td><td>先关自带安全选项，再尝试ADB</td></tr>
        <tr><td>防止下次再更新</td><td>关闭应用商店自动更新 + 禁用更新组件</td></tr>
      </tbody>
    </table>
    <p><strong>最佳实践：</strong> 找到满意的版本后，把APK文件保存到云盘或电脑上。下次想降级就不用到处找旧版本了。</p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "降级应用会不会导致数据丢失？",
    answer: "使用ADB -d参数降级通常保留数据，但不同应用的数据格式可能有兼容问题。建议降级前先备份重要数据。",
  },
  {
    question: "安卓系统应用能降级吗？",
    answer: "部分系统应用可以通过"卸载更新"回到出厂版本。但华为等厂商对此限制较严，可能无法降级。",
  },
  {
    question: "降级后还能收到新版本更新吗？",
    answer: "会的。应用商店会继续推送新版本，你需要关闭自动更新来防止它再次升级。",
  },
];

export const zhPosts20260721: BlogPostEntry[] = [
  {
    slug: "apk-signature-verification-failed-fix",
    title: "APK安装包签名校验失败怎么解决？2026完整指南",
    description: "安装APK提示'签名不一致'、'INSTALL_FAILED_UPDATE_INCOMPATIBLE' 或 '证书冲突'？本文详解签名校验失败的5大原因和对应的修复方法。",
    date: "2026-07-21",
    readTime: "8 分钟阅读",
    tags: ["APK签名", "签名校验", "安装失败", "Android", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-downgrade-installation-guide",
    title: "Android APK怎么降级安装到旧版本？2026完整教程",
    description: "应用更新后悔了？新版越改越难用？本文教你安卓APK降级的4种方法：备份还原法、ADB强制安装、卸载更新法，涵盖MIUI/HarmonyOS/ColorOS等厂商特殊处理。",
    date: "2026-07-21",
    readTime: "9 分钟阅读",
    tags: ["APK降级", "Android降级", "ADB", "安装旧版本", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260721List = toList(zhPosts20260721);
