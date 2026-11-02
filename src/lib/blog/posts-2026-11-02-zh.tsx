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
    question: "Google Play 更新一直显示「等待 Wi-Fi」，是故障吗？",
    answer:
      "通常不是。这是「仅通过 Wi-Fi 下载」的偏好设置或更新队列在起作用：进 Play 商店 → 设置 → 自动更新应用，把「仅通过 Wi-Fi 自动更新」关掉或连上 Wi-Fi 即可。这种情况清缓存没有任何作用。",
  },
  {
    question: "浏览器能打开 play.google.com，但更新还是卡住，是什么原因？",
    answer:
      "下载走的是另一个域名 dl.google.com，和网页域名不是同一条链路。页面能开只证明前端可达，不代表下载 CDN 没被限速或阻断。换节点再试，这是最常见的误判点。",
  },
  {
    question: "清除 Play 商店数据和清除 Play 服务缓存有什么区别？",
    answer:
      "清 Play 服务缓存影响最小，它才是实际执行下载和鉴权的组件，应优先做。清商店数据会重置登录状态和待更新列表，只有前面几步都无效时才做，做完要重新登录 Google 账号。",
  },
  {
    question: "错误代码 -505 是什么意思？",
    answer:
      "表示手机上已存在同一包名但签名不同的应用，最常见是你以前用第三方渠道装过，现在想换成 Google Play 版本。签名不同无法覆盖安装，必须先卸载旧版，卸载前记得备份数据。",
  },
  {
    question: "不想折腾 Play，直接用 APK 更新安全吗？",
    answer:
      "安全的前提是签名一致。从 APKMirror、APKPure 这类会公布证书指纹的站点下载官方最新版，用 apksigner 核对 SHA-256 与已装应用一致，就可以覆盖安装并保留数据。提示签名冲突说明来源不对，不要硬装。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "Play Protect 提示「应用可能有害」，是不是表示这个 APK 有病毒？",
    answer:
      "不一定。最常见的真实原因是签名证书不在 Google 的预期记录里，也就是应用被二次打包过。也有误报的情况，例如使用加固壳或动态加载框架的自行开发应用。用 apksigner 核对证书身份后可以自行判断。",
  },
  {
    question: "可以永久关闭 Play Protect 吗？",
    answer:
      "技术上可以，但不建议。关闭后失去每日扫描和安装时签名校验，部分银行和支付类应用会检测 Play Protect 状态并拒绝运行。如果只是要装某一个应用，单次点「仍要安装」就够了。",
  },
  {
    question: "装完侧载应用后怎么主动检查？",
    answer:
      "进入 Play 商店 → 头像 → Play Protect → 点「扫描」，几分钟内会做一次全盘检查并以通知形式给出结果。看到「发现有害应用」时点进去看具体判定类型，再决定卸载还是放行。",
  },
  {
    question: "自己开发的 APK 老是被 Play Protect 拦截，为什么？",
    answer:
      "常见四个原因：用了 debug 签名（所有设备共享，信任度极低）、用了加固服务（DEX 特征与恶意软件高度相似）、targetSdkVersion 低于 23、以及从服务器动态加载代码。发布前换正式签名能解决大部分情况。",
  },
  {
    question: "「扫描有害应用」和「改进有害应用检测」两个开关要都开吗？",
    answer:
      "第一个必须开，它才是防护本身。第二个是上传匿名样本信息用于改进检测模型，关掉不影响防护能力，介意隐私可以关闭。",
  },
];

const ARTICLE1 = (
  <>
    <h1>Google Play 更新一直卡住、无法下载？逐层排查清单</h1>

    <p>
      Google Play 里点「更新」后，进度条卡在 0%、卡在某个百分比不动，或者直接提示「无法下载，请稍后重试」——这事比想象中常见。
      大部分人在这一步的错误操作是：反复点更新、清缓存、再不行就恢复出厂。其实按顺序排查，八成问题在前两步就能定位。
    </p>

    <p>
      核心思路：更新失败分三类原因——<strong>网络层</strong>（连不上 Google 服务器）、<strong>存储层</strong>（没空间或索引出错）、
      <strong>账号与应用层</strong>（账号状态、Play 服务缓存、签名不匹配）。三类现象很像，但解法完全不同，用同一个办法去试只会浪费时间。
    </p>

    <h2>第一步：先分清是「下载失败」还是「安装失败」</h2>

    <p>
      打开 Google Play → 点右上角头像 → 管理应用和设备 → 管理 → 已安装 → 有可用更新，点开卡住的那个应用看提示文案：
    </p>

    <ul>
      <li>
        <strong>下载待处理 / 等待 Wi-Fi</strong> —— 网络策略或排队，不是故障
      </li>
      <li>
        <strong>正在下载… 卡住不动</strong> —— 网络层或 Play 服务缓存
      </li>
      <li>
        <strong>无法下载，请稍后重试（错误代码 …）</strong> —— 看错误代码，见后面代码表
      </li>
      <li>
        <strong>安装失败 / 应用未安装</strong> —— 存储、签名或系统策略
      </li>
    </ul>

    <p>
      不同提示别用同一个办法。「等待 Wi-Fi」这种情况关掉「仅 Wi-Fi 下载」就好，清缓存没用。
    </p>

    <h2>第二步：网络层，先确认你能连上 Google</h2>

    <p>
      国内网络环境下，Google Play 更新失败最常见的原因是到 <code>play.googleapis.com</code>、
      <code>dl.google.com</code> 这条链路不稳定。判断方法：
    </p>

    <ol>
      <li>
        打开浏览器访问 <code>https://play.google.com</code>，能正常加载说明基础连通性 OK；打不开就是网络问题，先解决这个，别的都是白折腾。
      </li>
      <li>能打开页面但更新仍卡住，可能是下载 CDN（<code>dl.google.com</code>）被限速或阻断，换一个节点或线路再试。</li>
      <li>
        有代理的情况下，检查 Play 商店、Google Play 服务、下载管理器这三个应用是否都在代理范围内——分应用代理最容易漏掉「下载管理器」。
      </li>
    </ol>

    <p>
      这一步的经验值：<strong>页面能开不等于能下载</strong>。下载走的是另一个域名，很多代理规则只放了网页域名，于是出现「网页能开、下载不动」的怪异现象。
    </p>

    <h2>第三步：存储层，空间和「幽灵占用」</h2>

    <p>Play 更新需要临时空间，通常是新 APK 体积的 2~3 倍，因为新旧包要短暂共存。</p>

    <ul>
      <li>设置 → 存储，确认剩余空间至少有 2GB，更新大型游戏建议留 5GB 以上。</li>
      <li>
        如果显示「可用空间」很少但你没装多少东西，进设置 → 存储 → 应用数据，看看「其他」类是否异常膨胀——这通常是下载管理器残留的临时文件。
      </li>
    </ul>

    <pre>
      <code>{`# 需要 adb 连接，查看下载管理器残留
adb shell du -h /data/local/tmp/*.apk 2>/dev/null
adb shell ls -lh /storage/emulated/0/Android/data/com.android.vending/files/ 2>/dev/null`}</code>
    </pre>

    <p>
      没有 adb 的话，简单办法是设置 → 应用 → 下载管理器（或「下载」）→ 存储 → 清除数据。这只清临时文件，不删你下载的文档。用 adb 的话也能精准删除残留：
    </p>

    <pre>
      <code>{`adb shell rm -f /data/local/tmp/*.apk`}</code>
    </pre>

    <h2>第四步：账号与应用层，缓存要清「对」的那个</h2>

    <p>很多人第一步就「清除 Play 商店数据」，结果把账号登录状态也清了，还得重新登录。正确顺序：</p>

    <p>
      <strong>1. 先清 Google Play 服务（不是商店）</strong>：设置 → 应用 → 显示系统应用 → Google Play 服务 → 存储 →
      清除缓存（只清缓存，先别清数据）。Play 服务是实际下载和鉴权的组件，它卡住时商店界面往往看起来正常。
    </p>

    <p>
      <strong>2. 再清商店缓存</strong>：设置 → 应用 → Google Play 商店 → 存储 → 清除缓存。
    </p>

    <p>
      <strong>3. 最后才考虑清数据</strong>：以上无效时，清除 Play 商店的数据，重新登录 Google 账号。这一步会重置「待更新」列表，有时正是列表状态坏了导致反复失败。
    </p>

    <p>
      <strong>4. 检查账号是否被限制</strong>：Play 商店 → 头像 → 设置 → 账号与设备偏好，看看是否有「家庭管控」或企业设备管理策略在阻止更新。公司发的手机、装了 MDM 的设备，这一条经常是根因。
    </p>

    <h2>常见错误代码对照</h2>

    <p>
      <code>-505</code>（与其他应用签名冲突）：卸载旧版后重装。这是最容易被误判为「Play 坏了」的一个，实际上你手机上已有一个同名但签名不同的应用，典型是以前用第三方渠道装过，现在想换成 Google Play 版本。
    </p>

    <p>
      <code>-504</code>（包名冲突）：同上处理。<code>-113</code>（下载管理器无响应）：清除下载管理器数据。
      <code>-24</code>（安装空间不足）：释放存储空间。<code>-101</code> / <code>-110</code>（下载中断或空间不足）：
      换网络重试并清空间。<code>495</code> / <code>496</code>（网络导致下载或安装失败）：换节点重试。
      <code>RH-01</code>（无法连接服务器）：清除 Play 服务和商店数据后重启手机。
    </p>

    <h2>如果只想拿到新版本，不想死磕 Play</h2>

    <p>排查超过十分钟还没搞定，更实际的做法是直接拿官方签名的 APK 更新：</p>

    <ol>
      <li>
        从 APKMirror 或 APKPure 找到同名应用的最新版本，核对签名指纹是否与 Google Play 版本一致（这类站点会展示证书 SHA-256）。
      </li>
      <li>下载后用文件管理器安装，因为签名相同，可以覆盖安装并保留数据。</li>
      <li>如果提示签名冲突，说明源不对，别硬装——这正是 Play 拒绝更新的同一个原因。</li>
    </ol>

    <p>检查已装应用的签名，可以在电脑上做：</p>

    <pre>
      <code>{`adb shell pm path com.example.app
adb pull /data/app/.../base.apk ./installed.apk
apksigner verify --print-certs installed.apk | head -5`}</code>
    </pre>

    <p>把输出的 SHA-256 和下载来源公布的指纹对比，一致就安全。</p>

    <h2>一个 60 秒的自检顺序</h2>

    <ol>
      <li>看提示文案属于哪一类（等待 Wi-Fi / 卡住 / 报错码 / 安装失败）</li>
      <li>浏览器能打开 play.google.com 吗？不能就先解决网络</li>
      <li>剩余空间 ≥ 2GB 吗？不够就清下载残留</li>
      <li>清 Google Play 服务缓存，再清商店缓存</li>
      <li>还不行，清商店数据重新登录</li>
      <li>仍失败，按错误代码查表，或用官方签名 APK 手动更新</li>
    </ol>

    <p>
      多数人在第 2、3、4 步就能解决。真正需要恢复出厂的极少，恢复出厂前一定要确认不是签名冲突这类「换个来源就能解决」的问题。
      如果你需要某个应用在别的设备上装好，用 <Link href="/">gptoapk.com</Link> 解析 Google Play 链接拿官方包，比在 Play 商店里反复重试更快。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>Google Play Protect 到底在保护什么？一次讲清楚它的拦截逻辑</h1>

    <p>
      侧载（sideload）APK 的人迟早会遇到 Play Protect 的弹窗：「此应用可能有害」「为安全起见，已阻止安装」。
      很多人第一反应是关掉它——这是一个代价被严重低估的操作。
    </p>

    <p>
      Play Protect 是 Android 上唯一默认开启、系统级的应用扫描器。它占用的资源很小，但决定了三件事：
      <strong>能不能装</strong>、<strong>装了之后会不会被停用</strong>、<strong>已装应用有没有被回收</strong>。
      理解它的判断逻辑，你就知道什么时候该信它、什么时候该绕。
    </p>

    <h2>一、Play Protect 实际做哪四件事</h2>

    <ul>
      <li>
        <strong>安装时扫描</strong>：每次装 APK 时执行，表现为「应用可能有害，是否仍要安装？」
      </li>
      <li>
        <strong>定期全盘扫描</strong>：约每天一次，趁设备空闲时进行，结果以「发现 1 个有害应用」的通知出现
      </li>
      <li>
        <strong>实时行为检测</strong>：运行时检测，命中后应用被强制停止、数据被清除
      </li>
      <li>
        <strong>卸载未使用的应用（可选）</strong>：长期不用的应用被自动移除，但数据保留
      </li>
    </ul>

    <p>
      默认状态下前三项全开。「扫描有害应用」和「改进有害应用检测」是两个不同的开关，后者是上传匿名样本信息，关掉不影响防护能力。
      查看和调整路径：Play 商店 → 头像 → Play Protect → 右上角设置图标。
    </p>

    <h2>二、为什么它会拦你的 APK——三种真实原因</h2>

    <p>
      <strong>1. 签名不在 Google 的预期记录里。</strong>这是最常见的。Play Protect 会根据签名证书判断应用来源。
      一个从第三方站下载、但签名正常的应用（比如 APKMirror 上的原版），通常会提示「来自未知来源」而不是「有害」。
      如果提示有害，往往是签名和 Google 记录的不一致——可能被二次打包了。
    </p>

    <p>
      <strong>2. 应用特征与已知恶意样本匹配。</strong>Play Protect 用的是聚类分析，不是简单哈希比对。
      一个你自己写的测试 App，如果用了常见的动态加载框架或加固壳，也可能被误判。
    </p>

    <p>
      <strong>3. 行为检测命中。</strong>装完之后被莫名停用，通常是它检测到应用在后台读取短信、无障碍服务被滥用、或者尝试静默安装其他应用。
      这类拦截值得认真看——真正的木马基本都会踩到这几条。
    </p>

    <h2>三、怎么判断「该不该强行安装」</h2>

    <p>遇到拦截弹窗，别直接点「仍要安装」，先花两分钟做这三件事：</p>

    <p>
      <strong>第一步：看是谁签的。</strong>
    </p>

    <pre>
      <code>{`# 在电脑上检查 APK 签名证书
apksigner verify --print-certs app.apk`}</code>
    </pre>

    <p>
      输出里的证书主体（Owner）和 SHA-256 指纹就是身份。把这个指纹丢到搜索引擎里查，正规应用能查到对应开发者。
      查不到、或者证书是刚签发的（有效期起始日期很近），风险很高。
    </p>

    <p>
      <strong>第二步：看权限和应用是否匹配。</strong>一个手电筒 App 请求读取联系人和短信，直接放弃。
    </p>

    <pre>
      <code>{`aapt dump permissions app.apk`}</code>
    </pre>

    <p>
      重点看这几类高危权限：<code>READ_SMS</code>、<code>RECEIVE_SMS</code>、<code>BIND_ACCESSIBILITY_SERVICE</code>、
      <code>SYSTEM_ALERT_WINDOW</code>、<code>REQUEST_INSTALL_PACKAGES</code>。
    </p>

    <p>
      <strong>第三步：核对包名和版本。</strong>被二次打包的 App 经常会改包名（<code>com.whatsapp</code> →
      <code>com.whatsapp.mobile</code>），或者在版本号上做手脚。核对官方公布的包名，不一致就别装。
    </p>

    <p>三步都过了，再点「仍要安装」。这时候你的判断依据已经比弹窗更充分了。</p>

    <h2>四、绕过拦截的正确姿势（以及代价）</h2>

    <ul>
      <li>
        弹窗中点「更多详情」→「仍要安装」。这是单次放行，不影响全局设置。
      </li>
      <li>
        如果连「仍要安装」都没有，说明被策略硬拦：进设置 → 安全 → 安装未知应用，给当前文件管理器授权，再试一次。
      </li>
    </ul>

    <p>
      <strong>不建议</strong>全局关闭 Play Protect。代价是：失去每日扫描，已装的恶意软件不会被发现；安装时的签名校验完全消失；
      某些银行、支付类 App 会检测 Play Protect 状态，可能拒绝运行。
    </p>

    <p>如果你只是为了装某一个应用，用单次放行就够了，别关全局。装完之后可以回来确认 Play Protect 仍是开启状态。</p>

    <h2>五、装完之后：主动扫一遍</h2>

    <p>
      安装完侧载应用，不要等它自己扫：Play 商店 → 头像 → Play Protect → 点「扫描」。
      手机会在几分钟内做一次全盘检查，结果以通知形式出现。
    </p>

    <ul>
      <li>
        <strong>有害应用（Harmful）</strong> —— 立刻卸载
      </li>
      <li>
        <strong>疑似有害（Potentially harmful）</strong> —— 看权限再决定，多数是误判
      </li>
      <li>
        <strong>未经审核（Unwanted software）</strong> —— 广告软件常见，直接卸载
      </li>
      <li>
        <strong>隐私风险</strong> —— 看它读了什么权限再判断
      </li>
    </ul>

    <h2>六、开发者视角：为什么你的 APK 老被拦</h2>

    <p>
      自己签的测试包频繁被 Play Protect 提示，通常是这几个原因：
    </p>

    <ol>
      <li>
        <strong>用了 debug 签名</strong>：debug keystore 是所有 Android 设备共享的，Play Protect 对它的信任度很低。发布前换成正式签名。
      </li>
      <li>
        <strong>用加固/壳服务</strong>：加固后的 Dex 特征和恶意软件高度相似。可以申请白名单，但周期长。
      </li>
      <li>
        <strong>目标 SDK 版本太低</strong>：<code>targetSdkVersion</code> 低于 23 的应用会被标记为「未针对新版本优化」，检查更严。
      </li>
      <li>
        <strong>动态加载代码</strong>：从服务器下载 Dex 并加载，是木马的经典手法，也是很多正常应用的实现方式。这类应用建议提前向谷歌提交说明用途。
      </li>
    </ol>

    <h2>七、一句话总结</h2>

    <p>
      Play Protect 拦你的时候，绝大多数情况是<strong>签名不对或行为可疑</strong>，而不是「安卓不让你装第三方应用」。
      把它当成一个免费的、有误报率的第三方质检员：它报警时自己复核一遍签名和权限；复核通过就单次放行；装完主动扫一次。
      这样你既保住了侧载能力，也没放弃系统级防护。
    </p>

    <p>
      需要从官方渠道取包时，通过 <Link href="/">gptoapk.com</Link> 解析 Google Play 链接拿到的就是商店原始包，
      签名这一项可以直接跳过复核。
    </p>
  </>
);

export const zhPosts20261102 = [
  {
    slug: "google-play-update-stuck-not-downloading",
    title: "Google Play 更新一直卡住、无法下载？逐层排查清单",
    description:
      "更新卡在 0% 或提示「无法下载」，原因分三层：网络、存储、账号与包状态。这篇按实际排查顺序分开讲，附错误代码对照表和「网页能开但下载不动」的成因解释。",
    date: "2026-11-02",
    readTime: "9 min read",
    tags: ["android", "google play", "排错"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "google-play-protect-explained",
    title: "Google Play Protect 到底在保护什么？一次讲清楚它的拦截逻辑",
    description:
      "Play Protect 拦住你的 APK，绝多数时候是签名不对或行为可疑，而不是安卓禁止侧载。这篇讲清它的四类检测、三种拦截原因、两分钟自行复核的方法，以及为什么该单次放行而不是全局关闭。",
    date: "2026-11-02",
    readTime: "9 min read",
    tags: ["android", "安全", "apk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261102List = toList(zhPosts20261102);
