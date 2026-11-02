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

const FAQS3: BlogFaqItem[] = [
  {
    question: "同一款应用，通用版和 arm64 版体积差多少？",
    answer:
      "常见差 100MB 以上。通用版（universal）会把 arm64-v8a、armeabi-v7a、x86、x86_64 四套原生库全打包，而现代手机只用得到 arm64-v8a 一套。选对架构版本，省下的通常是安装包里最大的一块。",
  },
  {
    question: "「清除缓存」和「清除数据」有什么不同？",
    answer:
      "清缓存只删系统可再生的临时文件，不影响登录状态，可以随时做。清数据会抹掉应用在本机的全部内容，包括账号登录态、聊天记录、设置、离线文件和未同步的存档，等同于重装。存储不够时应优先清缓存。",
  },
  {
    question: "卸载重装成小体积版本，原来的数据会丢吗？",
    answer:
      "会。卸载会删除应用数据目录。如果必须降级或换架构版本，先用应用自带的备份/迁移功能导出一份（例如微信的聊天记录迁移），装完再恢复，不要依赖系统自带的「保留数据」。",
  },
  {
    question: "为什么删了几百兆的安装包，可用空间还是不够？",
    answer:
      "量级不对。安装包一般只有一两百兆，而真正吃空间的是应用缓存、聊天应用里的图片视频和照片视频文件，动辄几 GB 到几十 GB。先在设置 → 存储里按大小排序看清楚，再决定清哪里。",
  },
  {
    question: "用「清理大师」这类工具能省更多空间吗？",
    answer:
      "通常不能。它们大多调用的是系统自带的清理接口，效果和手动清缓存相当，同时还要申请存储、无障碍等高权限。省下的空间不比系统工具多，却多了一份隐私成本，不建议装。",
  },
];

const FAQS4: BlogFaqItem[] = [
  {
    question: "换新手机时，第三方下载的应用会自动搬过去吗？",
    answer:
      "不一定。厂商迁移工具通常能搬应用本体，但会跳过来源不明的 APK，跨品牌迁移时还可能只搬本体不搬数据。迁移完一定要在新手机上逐项检查，缺失的应用手动补装。",
  },
  {
    question: "adb backup 在 Android 12 以后还能用吗？",
    answer:
      "很多应用已经设成不允许备份，备份包里只有 APK 本体，数据是空的；部分新系统甚至移除了该功能。而且加密备份包通常只能在同一台设备上恢复，所以它更适合「同机重装」，不适合换机。备份完务必检查文件大小。",
  },
  {
    question: "聊天记录迁移最稳的办法是什么？",
    answer:
      "用应用自带的迁移功能。微信是「我 → 设置 → 聊天 → 聊天记录迁移与备份」，两台手机连同一 Wi-Fi 直传；WhatsApp 备份到 Google Drive 后在新机恢复。官方通道成功率最高，应该最先做。",
  },
  {
    question: "旧手机迁移完能马上恢复出厂设置吗？",
    answer:
      "建议先等一等。新手机逐项验证无误后再处理旧机，并且不要急着在旧机上退出账号——退出可能触发服务器端会话清理，导致新机上的记录一起丢失。稳妥做法是关掉旧机网络放一周再恢复出厂。",
  },
  {
    question: "应用已从商店下架，新手机怎么装？",
    answer:
      "从旧手机里提取 APK 本体再安装。可以用 adb 定位后拉取（adb shell pm path 包名 → adb pull），也可以用 APK 提取工具导出，然后在新手机上允许未知来源安装。注意旧版本可能已连不上服务器。",
  },
];

const ARTICLE3 = (
  <>
    <h1>APK 安装包体积暴涨：从「为什么变胖」到「我怎么应对」的完整对策</h1>

    <p>
      同一款应用，同一台手机，2021 年下载 40MB，2026 年要下 148MB。这中间多出来的 100MB 不是开发者偷懒，而是一整套工程权衡的结果。
      这篇只讲一件事：<strong>作为用户，你能怎么把这部分体积重新拿回来</strong>——以及哪些「瘦身」动作其实是白费力气。
    </p>

    <p>
      先说结论：<strong>大部分情况下你不该删文件，而该换版本。</strong>
      一个 arm64-v8a 单架构版本 + 正确的下载渠道，能省下 40%~60% 的安装包体积，而且不需要任何清理软件。
    </p>

    <h2>一、先分清三种「大小」，别做错功</h2>

    <p>绝大多数「手机内存不够」的问题，来自搞混了这三个数字：</p>

    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>在哪里看</th>
            <th>典型数值</th>
            <th>能不能省</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>APK 安装包大小</td>
            <td>下载的那个文件</td>
            <td>20MB ~ 300MB</td>
            <td>能，选对版本可省一半</td>
          </tr>
          <tr>
            <td>安装后占用空间</td>
            <td>设置 → 应用 → 应用信息</td>
            <td>1.2 ~ 3 倍于 APK</td>
            <td>能，但要卸载重装</td>
          </tr>
          <tr>
            <td>应用数据（缓存+用户数据）</td>
            <td>同上，细分选项</td>
            <td>几百 MB ~ 几十 GB</td>
            <td>能，且有增长趋势</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>关键区别：</strong>你删掉下载的 APK 文件，应用不会受影响；你清除应用数据，登录状态和历史记录会丢；你去下「更小版本」，省的是第一项。
      很多人一边抱怨 40GB 被占满，一边反复清 30MB 的下载文件夹——量级完全对不上。
    </p>

    <p>
      <strong>自查方法：</strong>设置 → 存储 → 应用列表，按大小排序。前三名的合计通常占了你总占用的 50% 以上。
    </p>

    <h2>二、APK 变胖的五个真实来源</h2>

    <h3>1. 多架构原生库：最贵的一项</h3>

    <p>一个 APK 里可能同时打包了四套 CPU 编译的原生库（.so 文件）：</p>

    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>架构</th>
            <th>使用设备</th>
            <th>是否还需要</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>arm64-v8a</td>
            <td>2016 年后几乎所有手机</td>
            <td>是，主流</td>
          </tr>
          <tr>
            <td>armeabi-v7a</td>
            <td>2015 年前的老设备、部分物联网设备</td>
            <td>新手机不需要</td>
          </tr>
          <tr>
            <td>x86_64</td>
            <td>模拟器、ChromeOS</td>
            <td>手机不需要</td>
          </tr>
          <tr>
            <td>x86</td>
            <td>老模拟器</td>
            <td>不需要</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>「通用版 / universal」的 APK 会把四套全塞进去。</strong>
      一款 arm64 版本 60MB 的应用，通用版常常 180MB 左右——多出来的 120MB，你的手机一次都用不上。
    </p>

    <p>
      判断自己的架构：设置 → 关于手机 → 处理器信息，出现 <code>arm64-v8a</code> 就是它。也可以在开发者选项里用{' '}
      <code>adb shell getprop ro.product.cpu.abi</code> 查。
    </p>

    <h3>2. 资源文件的多语言全量打包</h3>

    <p>
      国际化做得好的应用，会把几十种语言的字符串、图片、音效一起打进去。你只用中文，但英文、日文、阿拉伯文（还带 RTL 布局镜像图）都在包里。
      这项通常占 10~40MB，是「什么都不做也得背」的成本，用户端没法单独裁剪。
    </p>

    <h3>3. 未压缩的大体积素材</h3>

    <p>
      高清启动动画、4K 可缩放图标、内置示例视频、音效包。有的应用把未压缩的 PNG 直接塞进 assets 目录——同样是图，WebP 能小 60%，但改了要重新适配老机型。
    </p>

    <h3>4. 依赖框架的连锁膨胀</h3>

    <p>
      引入一个推送 SDK，往往带进来统计 SDK；统计 SDK 又依赖一个网络库；网络库再带一个图片加载器。每个都「才 3MB」，加起来 20 多个。
      这是一个很典型的连锁反应，从外部看不出来，但确实是体积增长的主力。
    </p>

    <h3>5. 功能堆叠与灰度代码</h3>

    <p>
      一个应用五年前只有聊天，现在有短视频、直播、小程序容器、支付、打车入口。这些模块的代码和资源都在同一个包里，即使用户从没打开过。
      国际版与国内版常因此差 50MB 以上——不是因为功能差这么多，而是国内版塞了更多本地化模块。
    </p>

    <h2>三、用户能做的四件实事</h2>

    <h3>做法一：选对架构版本（收益最大）</h3>

    <p>
      下载时优先找标注 <code>arm64-v8a</code> 或 <code>arm64</code> 的版本。多数正规下载站（包括{' '}
      <Link href="/">gptoapk.com</Link>）会把架构写在下拉选项里。
      <strong>同一款应用，arm64 版对比通用版，省下的体积常见在 100MB 以上。</strong>
    </p>

    <p>代价：如果下错了架构，安装会失败或打开秒退——这正好是一个判断信号，不会静默出错。</p>

    <h3>做法二：App Bundle 拆分版本优先</h3>

    <p>
      从 App Bundle（.aab）拆出来的 APK 天生就是分架构、分密度的，体积最小。这类下载通常是「base APK + 若干 split」，安装时需要一个能处理多文件的安装器。
    </p>

    <p>
      <strong>注意：</strong>单独装 base 会缺资源导致界面异常或花屏。要装就装整套，或者干脆选 universal 版本——这是体积和便利之间的取舍。
    </p>

    <h3>做法三：清正确的缓存，而不是清安装包</h3>

    <p>
      设置 → 应用 → 某应用 → 存储 → 「清除缓存」。这一步通常能回收几百 MB 到数 GB，而且不丢登录状态。
      <strong>「清除数据」要慎用</strong>，它会把账号、聊天记录、离线文件一起抹掉。
    </p>

    <p>各系统入口略有差异：</p>

    <ul>
      <li>
        <strong>小米/Redmi（HyperOS）：</strong>设置 → 应用设置 → 应用管理 → 选择应用 → 存储
      </li>
      <li>
        <strong>华为（HarmonyOS）：</strong>设置 → 应用和服务 → 应用管理 → 存储
      </li>
      <li>
        <strong>OPPO/一加（ColorOS）：</strong>设置 → 应用 → 应用管理 → 存储占用
      </li>
      <li>
        <strong>vivo（OriginOS）：</strong>设置 → 应用与权限 → 应用管理 → 存储
      </li>
      <li>
        <strong>三星（One UI）：</strong>设置 → 应用程序 → 选择应用 → 存储
      </li>
      <li>
        <strong>原生 Android / Pixel：</strong>设置 → 应用 → 查看所有应用 → 存储和缓存
      </li>
    </ul>

    <p>第三方工具（如 SD Maid）能批量清，但会申请较宽的权限，这笔账要自己算。</p>

    <h3>做法四：用旧版控制体积（有风险，要看清）</h3>

    <p>老版本应用通常小得多——一个 2025 年的版本可能比 2026 年的小 60MB。但降级有硬门槛：</p>

    <ol>
      <li>目标版本的签名必须与当前安装的一致，否则只能先卸载（数据会丢）；</li>
      <li>部分应用通过服务器侧握手拒绝旧版本，装上也用不了；</li>
      <li>安全补丁也会退回旧版本，这是实打实的风险。</li>
    </ol>

    <p>
      <strong>只有在设备存储极度紧张、且该应用对安全不敏感时，才值得走这条路。</strong>
      常用做法是：先备份数据 → 卸载 → 安装旧版本 → 关闭自动更新。
    </p>

    <h2>四、哪些「瘦身」其实没用</h2>

    <ul>
      <li>
        <strong>删 APK 安装包：</strong>装完之后安装包就是纯冗余，删了干净，但它最多只有几百 MB，且删了不影响应用。有用，但收益一次性且很小。
      </li>
      <li>
        <strong>用「清理大师」类工具：</strong>大部分所谓「深度清理」清的是缓存和空文件夹，和系统自带的清除缓存效果相当，还多装了一个应用。
      </li>
      <li>
        <strong>把应用移到 SD 卡：</strong>现代应用的代码和数据混合存放，移卡后启动变慢，且 Android 11 之后限制越来越多。
      </li>
      <li>
        <strong>杀后台进程：</strong>对存储空间毫无帮助，只影响续航和推送。
      </li>
      <li>
        <strong>装「内存优化」类应用：</strong>它们本身就是新的占用。
      </li>
    </ul>

    <h2>五、按设备状态选策略</h2>

    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>你的情况</th>
            <th>建议做法</th>
            <th>预期收益</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>新手机，空间充足</td>
            <td>什么都不用做，用通用版最稳</td>
            <td>—</td>
          </tr>
          <tr>
            <td>128GB 存储，快满了</td>
            <td>逐项清缓存 + 卸载半年没打开的</td>
            <td>5~20GB</td>
          </tr>
          <tr>
            <td>64GB 老机型</td>
            <td>卸载重装为 arm64 版本 + 删冗余应用</td>
            <td>3~10GB</td>
          </tr>
          <tr>
            <td>32GB 极老机型</td>
            <td>考虑重装系统或换机，清理只是拖延</td>
            <td>有限</td>
          </tr>
          <tr>
            <td>开发/测试用途</td>
            <td>用 AAB 拆分版本，按需装</td>
            <td>精确控制</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>优先级建议：</strong>先看「应用数据」排序（通常能回收最多）→ 再考虑换架构版本（一次性收益大）→ 最后才考虑降级。
      绝大多数人的问题在第一步就解决了。
    </p>

    <h2>六、给开发者的两句</h2>

    <ul>
      <li>
        <strong>用 App Bundle 发布</strong>，让 Play 按设备下发最小包，光这一项通常能减少 30%~50% 的下载体积。
      </li>
      <li>
        <strong>检查 res/ 和 assets/</strong>：最大的浪费往往不来自代码，而来自没人记得删的素材。
      </li>
    </ul>
  </>
);

const ARTICLE4 = (
  <>
    <h1>换了新手机，旧手机里的应用怎么搬过去？2026 年四条路线实测</h1>

    <p>
      换了新手机，通讯录、照片、微信聊天记录一般都能搬过去。真正麻烦的是那些<strong>不在应用商店里的应用</strong>——从第三方下载的、自己装的内测版、公司内部工具、已经下架的老应用。
      这篇把四条迁移路线拆开讲，说清楚各自能搬什么、搬不了什么。
    </p>

    <p>
      先说一句实话：<strong>Android 没有提供一种通用的「完整搬应用」的方案。</strong>
      系统迁移工具搬的是大部分数据，但应用本体往往需要重装。理解这一点，后面的选择就清楚了。
    </p>

    <h2>一、先搞清楚：到底要搬什么</h2>

    <p>把「应用」拆开，其实是四层东西，迁移难度完全不同：</p>

    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>层级</th>
            <th>内容</th>
            <th>能否直接迁移</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>应用本体</td>
            <td>APK 文件</td>
            <td>能，但通常要重装</td>
            <td>需要用第三方工具或重新下载</td>
          </tr>
          <tr>
            <td>应用数据</td>
            <td>登录态、聊天记录、离线文件</td>
            <td>部分能</td>
            <td>取决于应用是否允许备份</td>
          </tr>
          <tr>
            <td>应用设置</td>
            <td>偏好配置、主题、账号列表</td>
            <td>部分能</td>
            <td>一般在数据目录里</td>
          </tr>
          <tr>
            <td>外部数据</td>
            <td>照片、下载文件、OBB 数据包</td>
            <td>能</td>
            <td>文件层面拷贝即可</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>多数人真正痛的是第二层。</strong>
      应用重装本身五分钟能搞定，但登录态、聊天记录、游戏存档丢了才是灾难。
    </p>

    <h2>二、路线一：厂商自带迁移工具（推荐首选）</h2>

    <p>各家都有系统级换机工具，走的是本地无线或数据线直连，不经过云端——速度更快，也更安全。</p>

    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>品牌</th>
            <th>工具名称</th>
            <th>入口</th>
            <th>能搬应用本体吗</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>小米 / Redmi</td>
            <td>小米换机</td>
            <td>设置 → 更多设置 → 一键换机</td>
            <td>一般可以（含部分应用数据）</td>
          </tr>
          <tr>
            <td>华为</td>
            <td>手机克隆</td>
            <td>设置 → 系统和更新 → 手机克隆</td>
            <td>可以（含微信聊天记录，需授权）</td>
          </tr>
          <tr>
            <td>OPPO / 一加</td>
            <td>手机搬家 / 手机克隆</td>
            <td>设置 → 其他设置 → 手机搬家</td>
            <td>可以</td>
          </tr>
          <tr>
            <td>vivo</td>
            <td>互传</td>
            <td>设置 → 系统管理 → 互传</td>
            <td>可以</td>
          </tr>
          <tr>
            <td>三星</td>
            <td>Smart Switch</td>
            <td>设置 → 账户与备份 → Smart Switch</td>
            <td>可以（含应用和设置）</td>
          </tr>
          <tr>
            <td>原生 Android</td>
            <td>复制数据</td>
            <td>首次开机设置时选择</td>
            <td>只搬应用列表，本体需从 Play 重装</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>优势：</strong>一次操作、批量完成，应用本体和数据一起走，成功率最高。
    </p>

    <ul>
      <li>
        <strong>跨品牌迁移会打折。</strong>华为搬小米、三星搬 OPPO，很多应用只能搬本体，数据不带。
      </li>
      <li>
        <strong>第三方签名的应用常被跳过。</strong>系统迁移工具往往会跳过「来源不明」的 APK，理由是安全策略。
      </li>
    </ul>

    <p>
      <strong>所以：</strong>跨品牌迁移完之后，一定要自己清点一遍，把漏掉的应用补装回来。
    </p>

    <h2>三、路线二：adb 备份 + 恢复（技术流，可控性最好）</h2>

    <p>
      <code>adb backup</code> 曾经是最可靠的完整备份方式，但情况在 Android 12 之后发生了变化。
    </p>

    <h3>现状（2026 年）</h3>

    <ul>
      <li>
        <strong>Android 11 及以前：</strong><code>adb backup -apk -shared -all</code> 能打包应用本体+数据。
      </li>
      <li>
        <strong>Android 12 起：</strong>大部分应用默认设置 <code>android:allowBackup=&quot;false&quot;</code>，备份包里只有 APK 本体，数据是空的。
      </li>
      <li>
        <strong>Android 13+：</strong>部分 ROM 直接移除了 <code>adb backup</code> 支持。
      </li>
    </ul>

    <h3>实测可用的做法</h3>

    <pre>
      <code>{`# 1. 建立连接（新手机开启 USB 调试）
adb devices

# 2. 备份单个应用（含数据，若应用允许）
adb backup -f wechat.ab com.tencent.mm

# 3. 手机端会弹确认框，必须点"备份我的数据"
#    不设置密码的话，备份包不被加密，注意保管

# 4. 在新手机上恢复
adb restore wechat.ab`}</code>
    </pre>

    <p>
      <strong>关键提示：</strong>加密的备份包只在同一台设备上能恢复。换设备恢复时，签名不匹配会导致失败——所以 adb backup 更适合「同机重装」场景，而不是「换手机」场景。
    </p>

    <p>
      大量用户的惨痛经验：<strong>以为 adb backup 成功了，实际备份包只有几 MB，里面根本没数据。</strong>备份完务必检查文件大小。
    </p>

    <h2>四、路线三：应用自带的导出功能（最靠谱的那一层）</h2>

    <p>这是被严重低估的一条。主流应用其实大多提供了专门的迁移路径：</p>

    <ul>
      <li>
        <strong>微信：</strong>我 → 设置 → 聊天 → 聊天记录迁移与备份 → 迁移到另一台设备（同一 Wi-Fi 直连，官方支持，最稳）
      </li>
      <li>
        <strong>QQ：</strong>设置 → 通用 → 聊天记录备份与迁移
      </li>
      <li>
        <strong>Telegram：</strong>云端同步，换机后登录即可，无需迁移
      </li>
      <li>
        <strong>WhatsApp：</strong>设置 → 聊天 → 聊天备份 → 备份到 Google Drive，新机登录时恢复
      </li>
      <li>
        <strong>游戏（大部分）：</strong>绑定 Google Play Games / 官方账号，存档在云端
      </li>
      <li>
        <strong>浏览器：</strong>登录同一账号同步书签和密码
      </li>
    </ul>

    <p>
      <strong>这条路线成功率最高，因为它是应用官方设计的。</strong>
      顺序上也应该先做这个：<strong>先把自带迁移做完，再考虑用系统工具或第三方工具补漏。</strong>反过来的话，可能出现「旧机数据已清空、新机恢复不全」的最坏情况。
    </p>

    <h2>五、路线四：第三方工具（用得上，但要看清楚）</h2>

    <h3>A 类：需要 root 权限的完整备份工具</h3>

    <ul>
      <li>Swift Backup、Titanium Backup 一类</li>
      <li>
        <strong>能搬：</strong>应用本体 + 完整数据（含不允许备份的应用）
      </li>
      <li>
        <strong>代价：</strong>需要 root。2026 年主流机型 root 门槛很高，且会破坏部分金融应用和系统更新
      </li>
    </ul>

    <h3>B 类：不需要 root 的迁移工具</h3>

    <ul>
      <li>各类手机助手（某些厂商的电脑端软件）、通用传输工具</li>
      <li>
        <strong>能搬：</strong>文件、照片、部分应用 APK 本体
      </li>
      <li>
        <strong>搬不了：</strong>应用私有数据
      </li>
      <li>
        <strong>风险：</strong>这类工具需要较高的系统权限或电脑端驱动，来源不明的工具有数据外泄风险
      </li>
    </ul>

    <p>
      <strong>判断标准很简单：</strong>声称「不需要 root 就能搬应用数据」的工具，通常是在用无障碍服务或投屏协议模拟点击——它搬不走真正的数据目录。合理预期是「搬文件和 APK」，不要相信「完整迁移」的宣传。
    </p>

    <h2>六、旧手机怎么处理才不丢东西</h2>

    <p>这是最容易出错的一步。正确顺序是：</p>

    <ol>
      <li>
        <strong>新手机先完成所有迁移，并逐项验证</strong>——打开每个重要应用，确认能登录、内容完整。
      </li>
      <li>
        <strong>旧手机先别联网卸载</strong>——先关掉 Wi-Fi 和移动数据，验证一周，避免「云端同步被覆盖」。
      </li>
      <li>
        <strong>确认两次备份</strong>——应用内备份 + 系统迁移，双保险。
      </li>
      <li>
        <strong>最后才恢复出厂设置。</strong>在此之前，任何一步「反正新手机都有了」的判断都值得再确认一次。
      </li>
    </ol>

    <p>
      <strong>最典型的翻车场景：</strong>旧手机上退了微信账号，触发了服务器端的会话清理，新手机的会话也没了。所以在旧手机上<strong>不要急着登出</strong>，让它先放着。
    </p>

    <p>
      <strong>旧手机的下岗用途：</strong>当作备份机（定期通电能收消息）、行车记录仪、监控摄像头、离线播放器、给孩子用的设备。一部能开机的旧手机，价值远高于抽屉里的废品。
    </p>

    <h2>七、特殊场景补充</h2>

    <p>
      <strong>已下架 / 不再更新的应用怎么办？</strong>{' '}
      系统迁移工具通常会跳过这类应用，商店里也搜不到。办法是从旧手机里提取 APK 本体，再装到新机。提取可以用{' '}
      <Link href="/">gptoapk.com</Link> 的 APK 提取功能，或用 <code>adb shell pm path 包名</code> 定位后{' '}
      <code>adb pull</code>。
    </p>

    <p>
      <strong>公司内部应用怎么办？</strong>{' '}
      一般走 MDM（移动设备管理）或内部下发渠道。联系 IT 部门获取最新安装包，不要从旧手机里拷——旧版本可能已经连不上服务器了。
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
  {
    slug: "apk-size-bloat-what-users-can-do",
    title: "APK 安装包体积暴涨：从「为什么变胖」到「我怎么应对」的完整对策",
    description:
      "同一款应用五年从 40MB 涨到 148MB，多出来的不是垃圾而是多架构库和本地化资源。这篇只讲用户侧怎么省：换 arm64 版本、分清缓存和数据的差别、哪些清理动作纯属白费，以及按设备状态选择策略的对照表。",
    date: "2026-11-02",
    readTime: "9 min read",
    tags: ["android", "apk", "存储"],
    content: ARTICLE3,
    faqs: FAQS3,
  },
  {
    slug: "new-phone-app-migration-guide",
    title: "换了新手机，旧手机里的应用怎么搬过去？2026 年四条路线实测",
    description:
      "厂商换机工具、adb backup、应用自带迁移、第三方工具——四条路能搬的东西完全不同。这篇讲清应用本体、数据、设置、外部文件四层的迁移难度，各品牌工具的现实局限，以及旧手机什么时候才能安全恢复出厂。",
    date: "2026-11-02",
    readTime: "10 min read",
    tags: ["android", "数据迁移", "备份"],
    content: ARTICLE4,
    faqs: FAQS4,
  },
];

export const zhPosts20261102List = toList(zhPosts20261102);
