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
    question: "不用电脑能降级 APK 吗？",
    answer:
      "多数情况可以，前提是新旧包的签名一致，且系统没有拦截。用支持「覆盖安装」的文件管理器（MiXplorer、部分厂商文件管理器）点安装，系统弹出降级确认时点允许即可。成功率因机型和 ROM 版本而异，adb install -d 是最稳的方式。",
  },
  {
    question: "降级安装会丢失应用数据吗？",
    answer:
      "用 adb install -d -r 覆盖安装不会丢数据，前提是签名一致；卸载重装一定丢数据。但即使走覆盖安装，也存在隐性风险：旧版读不懂新版迁移过的数据库结构时，可能启动即闪退，那时仍需清数据。",
  },
  {
    question: "降级后还能升回新版本吗？",
    answer:
      "可以，正常安装新版本 APK 即可，前提是降级过程中没有把数据库写坏。如果不确定，先在旧版里确认功能正常，再升级，并提前导出一份数据。",
  },
  {
    question: "哪里能下载到旧版本的 APK？",
    answer:
      "APKMirror、APKPure 这类站点按版本存档比较全。下载后务必核对签名指纹，第三方站点被重签的情况不少。当前版本可以通过 gptoapk.com 解析 Google Play 链接直接拿到商店原始包。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "签名一致就一定安全吗？",
    answer:
      "基本是。签名一致意味着包出自开发者之手（或私钥泄露），被第三方塞入恶意代码的可能性极低。但开发者自己集成广告 SDK 的情况确实存在，那属于官方行为，只能靠权限检查和口碑判断。",
  },
  {
    question: "为什么同一个应用从不同站点下载，签名不一样？",
    answer:
      "三个常见原因，按频率排序：① 站点自己重签以便注入广告；② 应用启用了 Google Play App Signing，非 Play 渠道的包使用的是另一套密钥；③ 不同分发渠道使用不同签名（少见但存在）。第一种占绝大多数。",
  },
  {
    question: "从 Play 商店安装的应用需要校验吗？",
    answer:
      "不需要。Play 商店有服务端签名校验，篡改过的包会被拒绝安装，更新时也会校验。真正需要校验的是从第三方站点下载的 APK。",
  },
  {
    question: "怎么找到官方公布的签名指纹？",
    answer:
      "开发者官网的安全页面、GitHub 仓库的 Release 说明、部分应用的「关于」页面都会公布。找不到时，可以让系统帮你验证：先用官方渠道装一次，再用下载到的包做覆盖安装，签名不一致系统会直接拒绝。",
  },
];

const ARTICLE1 = (
  <>
    <h1>APK 版本回退失败怎么办：降级安装的完整流程与踩坑清单</h1>

    <p>
      新版 App 用着不顺手，想换回旧版——这个需求比想象中普遍。但十次里有八次会卡在同一句提示上：<strong>「应用未安装」</strong>
      或者 <strong>「较新版本已安装」</strong>。
    </p>

    <p>
      原因不是 APK 坏了，是安卓的降级保护机制在起作用。这篇把降级安装的正确流程、每个环节的失败原因，以及降级后会不会丢数据，一次讲清楚。
    </p>

    <p>
      <strong>一句话结论：</strong>同签名的包，降级需要 <code>-d</code> 参数或卸载重装；签名不同则必须卸载；卸载就会清数据，所以降级前先导出数据。
    </p>

    <h2>一、先判断你能不能降级</h2>

    <p>降级失败分四类原因，先对号入座：</p>

    <ul>
      <li>
        <strong>「较新版本已安装」/「App not installed」无其他提示</strong> —— Android 默认拒绝 versionCode
        更低的包。有救：用 <code>adb install -d</code> 或卸载重装。
      </li>
      <li>
        <strong>「应用未安装」伴随签名冲突</strong> —— 新旧 APK 签名不同（换了签名、或从别的渠道下载）。只能卸载重装，数据会丢。
      </li>
      <li>
        <strong>「解析包时出现问题」</strong> —— APK 文件损坏或不完整。重新下载，校验 SHA256。
      </li>
      <li>
        <strong>安装成功但启动闪退</strong> —— 新版留下的数据库结构旧版读不懂，属于「降级不兼容」，需要清数据。
      </li>
    </ul>

    <p>
      <strong>关键动作：</strong>装之前先用 aapt2 和 keytool 对比新旧包的 versionCode 和签名指纹，这两项决定了后面走哪条路。
    </p>

    <pre>
      <code>aapt2 dump badging old.apk | head -3{`\n`}aapt2 dump badging new.apk | head -3{`\n\n`}keytool -printcert -jarfile old.apk | grep -A1 &quot;SHA256&quot;{`\n`}keytool -printcert -jarfile new.apk | grep -A1 &quot;SHA256&quot;</code>
    </pre>

    <p>签名指纹一致 → 走方案 A（保留数据降级）。签名不同 → 只能走方案 B（卸载重装）。</p>

    <h2>二、方案 A：保留数据的降级（adb install -d）</h2>

    <p>
      这是唯一能保住应用数据的降级方式，前提是<strong>签名一致</strong>。
    </p>

    <pre>
      <code>adb devices{`\n`}adb install -d -r old-version.apk</code>
    </pre>

    <p>
      两个参数都要：<code>-r</code> 是覆盖安装，<code>-d</code> 允许 versionCode 下降。缺 <code>-d</code> 会报
      INSTALL_FAILED_VERSION_DOWNGRADE，缺 <code>-r</code> 会报 INSTALL_FAILED_ALREADY_EXISTS。
    </p>

    <ul>
      <li>
        <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> —— 签名不一致，无解，转方案 B
      </li>
      <li>
        <code>INSTALL_FAILED_INSUFFICIENT_STORAGE</code> —— 需要约 APK 大小 2.5 倍的可用空间
      </li>
      <li>
        <code>INSTALL_FAILED_USER_RESTRICTED</code> —— 手机上弹出确认框，点「允许」
      </li>
      <li>
        <code>INSTALL_FAILED_TEST_ONLY</code> —— 包带 testOnly 标记，加 <code>-t</code> 参数
      </li>
    </ul>

    <h2>三、方案 B：卸载重装（数据会丢，先备份）</h2>

    <p>
      签名不一致时没有捷径，必须卸载。<code>adb uninstall</code> 会清空应用的 <code>/data/data/包名/</code>
      ，所以先导出能导出的数据。
    </p>

    <pre>
      <code>adb backup -apk -shared -all -f backup.ab{`\n`}adb pull /sdcard/Android/data/com.example.app/files ./backup-files{`\n\n`}adb uninstall com.example.app{`\n`}adb install old-version.apk</code>
    </pre>

    <p>
      注意：<code>adb backup</code> 在 Android 12+ 上对多数应用已经返回空文件。真正可靠的是应用自带的导出或云同步功能，卸载前先在设置里找「导出」「备份」「迁移」。
    </p>

    <h2>四、别忘了关掉自动更新</h2>

    <p>不关的话，商店会在后台把应用升回去，前功尽弃。</p>

    <ul>
      <li>Play 商店：应用页 → 右上角三点 → 取消「启用自动更新」；全局设置在 设置 → 网络偏好设置 → 自动更新应用</li>
      <li>国产商店（华为/小米/OPPO/vivo）：商店设置里关闭自动更新，部分机型还要在应用管理里解除单个应用的更新绑定</li>
      <li>关闭自动更新不影响手动更新，部分商店仍会弹窗提醒</li>
    </ul>

    <h2>五、四个真实场景</h2>

    <p>
      <strong>银行/支付类 App 降级：</strong>不推荐。旧版接口通常已在服务端停用，装上也会要求升级，而且缺少安全补丁。
    </p>

    <p>
      <strong>改版难看想回旧版：</strong>社交、视频类应用最常见。流程是关自动更新 → adb 降级 → 把旧版 APK 存档（商店下架后就再也找不到了）。
    </p>

    <p>
      <strong>第三方站的包装不上：</strong>大概率是被重签注入广告。核对签名指纹，不一致直接丢弃——别为了「能用」去信任被改过的包。
    </p>

    <p>
      <strong>升级后闪退想救急：</strong>最快的不是降级，而是清数据：<code>adb shell pm clear 包名</code>
      。多数闪退是旧数据与新版本不兼容，清掉就好。清之前想清楚登录状态能不能恢复。
    </p>

    <h2>六、降级前检查清单</h2>

    <ul>
      <li>新旧 APK 的签名指纹一致吗？</li>
      <li>应用数据有没有云同步或导出？</li>
      <li>存储剩余空间 &gt; APK 大小 × 2.5？</li>
      <li>所有管着这个应用的商店都关掉自动更新了吗？</li>
      <li>旧版 APK 文件另存到电脑或网盘了吗？</li>
    </ul>

    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      需要当前版本的商店原始包时，用{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      解析 Google Play 链接直接下载，签名与官方完全一致，避免第三方站点重签带来的降级失败问题。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>安卓安装包完整性校验：怎么确认下载的 APK 没被动过手脚</h1>

    <p>
      从第三方站点下 APK，最大的不确定性不是「能不能装」，而是<strong>装上的到底是原版还是被人改过的版本</strong>
      。改过的包可能夹带广告 SDK、静默订阅，或者干脆就是个木马外壳。
    </p>

    <p>
      好消息是：验证完整的原版包不需要什么专业知识，三条命令、五个步骤就够。
    </p>

    <p>
      <strong>一句话结论：</strong>完整的 APK 包能通过三层校验——文件哈希（完整性）、签名证书（来源真实性）、包结构（有没有被塞东西）。三层全过，才值得安装。
    </p>

    <h2>一、为什么哈希值不够</h2>

    <p>
      很多人以为「对一下 SHA256 就安全了」，其实不对。哈希只能证明<strong>文件没被传坏</strong>
      ，证明不了<strong>文件是不是原版</strong>——因为改过的人会一并把新哈希公布出来。
    </p>

    <p>
      真正能证明来源的只有<strong>签名证书</strong>。Google Play 上的应用都由开发者用私钥签名，私钥不泄露，你就无法伪造一个「看起来是原版」的包。
    </p>

    <p>正确的校验顺序是：结构 → 哈希 → 签名 → 内容。每一层回答的问题不同，跳过签名那一层是最容易出事的地方。</p>

    <h2>二、第一步：结构校验（排除下载损坏）</h2>

    <p>APK 本质是 zip 包，损坏的文件必然解不开。</p>

    <pre>
      <code>unzip -t app.apk | tail -3{`\n# `}结尾出现 &quot;No errors detected&quot; 说明结构完整</code>
    </pre>

    <p>要和官方哈希对比的话：</p>

    <pre>
      <code>shasum -a 256 app.apk        {`# macOS / Linux`}{`\n`}sha256sum app.apk            {`# Linux`}{`\n`}Get-FileHash app.apk -Algorithm SHA256   {`# Windows PowerShell`}</code>
    </pre>

    <p>
      对比基准必须是<strong>开发者官网或 GitHub Release 页面公布的值</strong>。千万别拿下载站自己页面上的哈希去对比——那和文件是一起被替换的，没有意义。
    </p>

    <h2>三、第二步：签名校验（这一步才是关键）</h2>

    <p>最严谨的方式是 apksigner（Android SDK 自带）：</p>

    <pre>
      <code>apksigner verify --print-certs app.apk</code>
    </pre>

    <p>
      输出中会有 <code>Signer #1 certificate SHA-256 digest:</code>，这就是签名指纹，与官方公布值对比即可。apksigner
      能直接读取 v2/v3 签名块，能发现老工具漏掉的篡改。
    </p>

    <p>没装 SDK 可以用 keytool（Java 自带）：</p>

    <pre>
      <code>keytool -printcert -jarfile app.apk</code>
    </pre>

    <p>
      但它只读 v1 的 JAR 签名，检测不到 v2/v3 的篡改，适合快速核对，不适合做最终结论。
    </p>

    <ul>
      <li>
        <strong>SHA-256 完全一致</strong> → 官方原版，可以安装
      </li>
      <li>
        <strong>证书主题相同但指纹不同</strong> → 被重签（典型夹带行为），丢弃
      </li>
      <li>
        <strong>出现多个签名方</strong> → 被二次签名，丢弃
      </li>
      <li>
        <strong>DOES NOT VERIFY</strong> → 签名损坏或伪造，丢弃
      </li>
    </ul>

    <p>
      <strong>一个实用技巧：</strong>
      如果这个应用你手机上已经装了官方版，直接试图用新下载的 APK 覆盖安装。签名不一致时系统会拒绝并提示「应用未安装」——相当于让系统帮你做了一次签名校验。
    </p>

    <h2>四、第三步：包结构校验（有没有被塞东西）</h2>

    <pre>
      <code>unzip -l app.apk | less{`\n`}aapt2 dump badging app.apk | grep uses-permission</code>
    </pre>

    <p>需要警惕的信号：</p>

    <ul>
      <li>
        <code>assets/</code> 里出现 <code>.dex</code> 或 <code>.jar</code> 文件 —— 可能是动态加载的插件或广告代码
      </li>
      <li>
        <code>lib/</code> 下的 .so 文件与官方包差异明显 —— 核心逻辑被替换
      </li>
      <li>包内多出官方版本没有的第三方 SDK 资源目录</li>
      <li>
        <code>META-INF/</code> 里有多个签名块 —— 被重签过的痕迹
      </li>
      <li>权限与功能不匹配：手电筒应用要读短信（READ_SMS）+ 无障碍（BIND_ACCESSIBILITY_SERVICE）是教科书级恶意特征</li>
    </ul>

    <h2>五、在线验证：不想装命令行</h2>

    <p>
      VirusTotal 支持上传 APK（≤ 650MB），70+ 引擎同时扫描；Koodous 是安卓专用社区分析平台，能看行为特征。但要注意：
      <strong>上传即公开</strong>，样本会与安全研究者共享，银行、社交、企业类应用千万别上传。
    </p>

    <h2>六、完整流程</h2>

    <ol>
      <li>下载 APK</li>
      <li>unzip -t 检查结构 → 损坏则重新下载</li>
      <li>sha256 对比官方公布值 → 不符则丢弃</li>
      <li>apksigner --print-certs 对比签名 → 不符则丢弃</li>
      <li>aapt2 dump badging 看权限 → 异常则谨慎</li>
      <li>可以安装</li>
    </ol>

    <p>熟练后 3 分钟内能走完，比事后杀毒省事得多。</p>

    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      用{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      解析 Google Play 链接时，拿到的就是商店分发的原始包，本身已经绕开了多数第三方站的篡改风险。
    </p>
  </>
);

const ARTICLE3 = (
  <>
    <h1>安卓应用数据备份与迁移：换机前必须做的事</h1>

    <p>
      换新手机最尴尬的时刻：旧机还回去了，才发现某个应用的登录状态、聊天记录、本地笔记全没了。更麻烦的是有些应用的备份默认是关的，你连什么时候该开都不知道。
    </p>

    <p>
      这篇讲清楚安卓上哪些数据能备份、怎么备份、以及迁到新机后怎么恢复。不涉及 root，都是普通用户能做的。
    </p>

    <p>
      <strong>一句话结论：</strong>安卓数据分三层——系统自动备份（云）、应用自带导出（最完整）、手动 adb
      备份（限制多但可控）。三层叠起来用，才能覆盖绝大多数应用。
    </p>

    <h2>一、先搞清楚哪些数据会丢</h2>

    <ul>
      <li>
        <code>/data/data/包名/</code> —— 登录 token、数据库、偏好设置。卸载即删，普通用户无法直接访问。
      </li>
      <li>
        <code>/sdcard/Android/data/包名/</code> —— 缓存、下载的文件、应用产生的图片。部分机型卸载时保留，多数会删。
      </li>
      <li>
        <strong>应用服务器</strong> —— 云端数据（聊天记录、收藏），跟账号走，与设备无关。
      </li>
    </ul>

    <p>
      <strong>关键结论：</strong>
      真正会丢的是第一类——本地数据库和登录状态。所以备份的重点是：让应用自己把数据导出来，或者用系统机制把第一类备份走。
    </p>

    <h2>二、第一层：系统自动备份（Google 备份）</h2>

    <p>
      设置 → 系统 → 备份 → 确认「备份到 Google 云端硬盘」已开启。也可以手动触发一次：
    </p>

    <pre>
      <code>adb shell bmgr backupnow --all</code>
    </pre>

    <p>它的局限：</p>

    <ul>
      <li>只备份声明了允许备份的应用（allowBackup=&quot;true&quot;），银行、支付、部分社交应用默认关闭</li>
      <li>单个应用备份上限 25MB，大数据库会被直接跳过</li>
      <li>国内机型多数没有 Google 服务，这一层等于不存在，只能用厂商云（华为云空间、小米云、OPPO 云）替代</li>
      <li>厂商云备份通常不能跨品牌恢复，换品牌等于没用</li>
    </ul>

    <h2>三、第二层：应用自带导出（最完整，优先用）</h2>

    <p>很多应用有官方导出功能，这是唯一能保证 100% 完整的方式，因为应用自己知道哪些数据重要。</p>

    <ul>
      <li>微信：我 → 设置 → 通用 → 聊天记录迁移与备份</li>
      <li>QQ：设置 → 通用 → 聊天记录备份与迁移</li>
      <li>浏览器：登录同一账号同步书签和密码，或导出书签 HTML</li>
      <li>笔记类（Notion/印象笔记）：设置里找「导出全部」，通常导出 zip 或 Markdown</li>
      <li>密码管理器（Bitwarden/1Password）：导出加密 JSON。<strong>CSV 是明文，导完立即删除</strong></li>
      <li>待办类（Todoist/滴答清单）：设置 → 备份，导出为文件</li>
      <li>双因素验证器：确认云同步已开启，或导出 TOTP 种子二维码</li>
    </ul>

    <p>
      <strong>规则：</strong>凡是设置里能找到「导出」「备份」「迁移」字样的，一律先用它。导出的文件必须存在旧机以外的地方。
    </p>

    <h2>四、第三层：adb 手动备份（进阶，限制多）</h2>

    <pre>
      <code>adb backup -apk -shared -all -f backup.ab{`\n`}adb restore backup.ab</code>
    </pre>

    <p>为什么说它限制多：</p>

    <ul>
      <li>Android 12+ 上多数应用直接拒绝，返回空文件</li>
      <li>整体加密，无法选择性恢复，只能全量还原</li>
      <li>恢复会覆盖设备当前所有数据</li>
      <li>金融类应用通常主动禁止备份</li>
    </ul>

    <p>适用场景：Android 11 及以下的老设备，且应用本身允许备份。</p>

    <h2>五、换机迁移的推荐顺序</h2>

    <ol>
      <li>逐个检查重要应用，用自带导出功能导出数据</li>
      <li>导出文件传到电脑或加密网盘</li>
      <li>新机登录同一账号，用自带恢复/导入功能还原</li>
      <li>在新机上验证数据确实恢复了（打开应用看历史记录）</li>
      <li>在新机上重新开启系统备份</li>
      <li>最后才恢复旧机出厂设置或出售</li>
    </ol>

    <p>
      <strong>顺序很重要：</strong>一定要在新机上验证成功之后才处理旧手机。反过来做，出问题就没退路了。
    </p>

    <h2>六、五个容易踩的坑</h2>

    <ul>
      <li>
        <strong>微信迁移要在同一 WiFi 下：</strong>两台手机必须同一网络，传输中不能锁屏。几百 GB 要跑几小时，记得都插上充电。
      </li>
      <li>
        <strong>密码管理器导出文件是明文：</strong>CSV 完全不加密，导完立刻用、立刻删，优先用加密 JSON。
      </li>
      <li>
        <strong>应用数据备份不等于照片备份：</strong>照片在 <code>/sdcard/DCIM/</code>
        ，要单独拷贝。下载目录和微信文件目录也别忘了。
      </li>
      <li>
        <strong>系统版本更高导致恢复失败：</strong>Android 11 的数据导入 Android 15 的同一应用，可能因数据库版本差异失败，无解，只能接受部分丢失。
      </li>
      <li>
        <strong>双因素验证器：</strong>Google Authenticator、Microsoft Authenticator 里的种子是最容易被忽略的迁移数据，丢了等于丢所有账号。
      </li>
    </ul>

    <h2>七、换机前检查清单</h2>

    <ul>
      <li>微信/QQ 聊天记录已迁移或备份到电脑</li>
      <li>照片、视频、文件、下载目录已拷贝或云同步</li>
      <li>密码管理器已导出（加密格式），文件已存到旧机以外</li>
      <li>双因素验证器已开启云同步或导出</li>
      <li>浏览器书签/密码已同步账号</li>
      <li>笔记/待办类应用已导出</li>
      <li>重要应用的登录凭据有记录（哪些账号绑哪个手机号）</li>
      <li>已在新机上验证关键数据能恢复</li>
      <li>以上都做完，旧机才做恢复出厂设置</li>
    </ul>

    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      新机重装应用时，用{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      从 Google Play 直接取原版安装包，版本和签名与官方一致，避免版本不匹配导致数据导入失败。
    </p>
  </>
);

export const zhPosts20261029b: BlogPostEntry[] = [
  {
    slug: "apk-downgrade-install-failed-fix",
    title: "APK 版本回退失败怎么办：降级安装的完整流程与踩坑清单",
    description:
      "想装回旧版 App 却总提示「应用未安装」或「较新版本已安装」。先比签名再选方案：签名一致用 adb install -d 保留数据降级，签名不同只能卸载重装。附全部失败码对照、备份步骤、防自动更新回滚的处理。",
    date: "2026-10-29",
    readTime: "10 min read",
    tags: ["android", "apk", "降级", "排查"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-integrity-signature-verification",
    title: "安卓安装包完整性校验：怎么确认下载的 APK 没被动过手脚",
    description:
      "哈希只能证明文件没传坏，证明不了是不是原版。三层校验流程：unzip -t 查结构、sha256 对官方值、apksigner 比对签名证书指纹、aapt2 看权限。附签名不一致的四种判断表和一条借系统做校验的实用技巧。",
    date: "2026-10-29",
    readTime: "10 min read",
    tags: ["android", "apk", "安全", "签名"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
  {
    slug: "android-app-data-backup-migration",
    title: "安卓应用数据备份与迁移：换机前必须做的事",
    description:
      "换机最常丢的是本地数据库和登录状态。安卓数据分三层：系统云备份（覆盖有限）、应用自带导出（最完整）、adb 备份（Android 12 起基本失效）。附迁移顺序、五个真实踩坑、以及换机前检查清单。",
    date: "2026-10-29",
    readTime: "11 min read",
    tags: ["android", "备份", "换机", "数据迁移"],
    content: ARTICLE3,
  },
];

export const zhPosts20261029bList = toList(zhPosts20261029b);
