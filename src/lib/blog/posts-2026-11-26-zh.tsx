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

const ARTICLE = (
  <>
      <p># APK 覆盖升级后数据全没了？账号、聊天、存档丢失的完整保留方案</p>
      <p>很多人都有过这种经历：手机上装着一个自己下载的 APK，聊天记录、游戏存档、登录状态都在里面，用得好好的。某天提示有新版本，你兴冲冲下载了新包覆盖安装——打开一看，<strong>账登不上了，聊天记录空了，游戏从第一章开始</strong>。</p>
      <p>更绝望的是：旧包已经被覆盖掉了，回收站里也没有。</p>
      <p>这不是运气问题，也不是「安卓不靠谱」，绝大多数情况下是<strong>升级路径错了</strong>。覆盖安装本身是安全的，但有几个前提条件必须先满足。这篇把「升级为什么会导致数据丢失」「升级前 10 分钟怎么把数据稳定留住」「已经丢了还能不能救」三件事讲清楚，全部是可以在普通手机上操作的步骤，不需要 root。</p>
      <p>---</p>
      <h2>一、先搞清楚：数据到底存在哪</h2>
      <p>安卓的应用数据分成三个位置，它们的命运完全不同：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">位置</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">典型路径</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">覆盖升级时会发生什么</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用私有数据</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/data/data/<包名>/"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>正常升级会保留</strong>，卸载才会删除</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">外部私有目录</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/sdcard/Android/data/<包名>/"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">正常升级保留，卸载时部分机型会一并清空</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">系统公共目录</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/sdcard/DCIM"}</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/sdcard/Download"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">与 App 无关，不受影响</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">云端 / 服务器</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">账号体系</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">取决于 App 有没有登录、有没有同步</td></tr></tbody>
      </table></div>
      <p>关键结论只有一句：<strong>「覆盖安装」保留数据，「卸载再装」不保留。</strong> 所以真正导致数据丢失的，是下面这五种「看起来像升级、实际是卸载重装」的情况。</p>
      <p>---</p>
      <h2>二、五种会让数据消失的「假升级」</h2>
      <h3>1. 包名（applicationId）变了</h3>
      <p>同一个 App 的不同渠道包、不同版本分支，包名可能不一致。系统眼里它们是两个完全不同的应用：旧的不动，新的另装一个。你以为升级了，其实是装了第二份。</p>
      <p><strong>判断方法</strong>：安装前比较两个 APK 的包名。PC 上可以用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"aapt dump badging app.apk | grep package"}</code>，手机上用 APK 分析类工具查看。包名必须<strong>逐字符一致</strong>。</p>
      <h3>2. 签名不一致</h3>
      <p>这是最常见的一种。开发者换了签名密钥、不同渠道用了不同签名、或者你从 A 站下载原版、从 B 站下载修改版，都会触发：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"INSTALL_FAILED_UPDATE_INCOMPATIBLE"}</code></pre>
      <p>系统的处理是<strong>拒绝安装</strong>——这一般不会丢数据。但很多人看到报错后，下一步动作是「那我先卸载旧的吧」。<strong>卸载的那一刻数据就没了。</strong> 所以签名冲突的真正危险不在报错，在你解决报错的方式。</p>
      <h3>3. versionCode 降低（降级）</h3>
      <p>新包版本号比已装的低，系统拒绝安装（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"INSTALL_FAILED_VERSION_DOWNGRADE"}</code>），同样会诱导你去卸载。而部分第三方安装器/沙盒会在后台自行卸载再装，这个过程没有提示。</p>
      <h3>4. 用「清理」「加速」「换机」类工具代装</h3>
      <p>各种手机管家、换机助手、APK 安装器，为了「确保安装成功」，底层常常执行的是 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"pm uninstall"}</code> + <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"pm install"}</code>。表面上是一样的安装动画，实质上数据已被清空。<strong>这是普通用户数据丢失最隐蔽的原因。</strong></p>
      <h3>5. 安装到不同的用户空间或存储位置</h3>
      <p>工作资料（工作空间）、手机分身、双开环境里的 App，数据归属不同的 Android 用户（user 0 / user 10 / user 999）。在一个空间里卸载、在另一个空间里安装，数据自然对不上。另外早期把应用装到 SD 卡、后来改回内部存储，也可能触发重装流程。</p>
      <p>---</p>
      <h2>三、升级前 10 分钟的数据保险流程</h2>
      <p>按顺序做，每一步都很短。</p>
      <h3>第 1 步：查包名和版本号（2 分钟）</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# PC 上，需要 aapt（Android SDK build-tools 自带）\naapt dump badging new.apk | grep -E \"^package|versionCode\"\naapt dump badging old.apk | grep -E \"^package|versionCode\""}</code></pre>
      <p>不看工具的话，手机设置 → 应用 → 该应用 → 关于/版本信息，也能看到已装版本的包名与版本号。</p>
      <p><strong>要求</strong>：包名完全一致；新包 versionCode ≥ 旧包；签名一致（见下一步）。</p>
      <h3>第 2 步：比对签名指纹（2 分钟）</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 取 APK 的签名证书摘要\nkeytool -printcert -jarfile new.apk   # 或 apksigner verify --print-certs new.apk\n\n# 取已装应用的签名摘要（需 adb）\nadb shell dumpsys package <包名> | grep -A3 \"signatures\""}</code></pre>
      <p>两边的 SHA-256 必须一致。不一致就别硬来，先回到来源处找<strong>同一签名的包</strong>（同官网、同渠道），而不是卸载重装。</p>
      <h3>第 3 步：先备份，再升级（3 分钟）</h3>
      <p>三种备份方式，按可靠性排序：</p>
      <ul className="list-disc pl-6 space-y-1"><li><strong>App 自带导出</strong>：设置里的「导出聊天记录」「备份存档」「导出配置」。这是最靠谱的，因为格式由开发者保证。微信、Telegram、多数游戏都有。</li><li><strong>系统备份</strong>：设置 → 系统 → 备份，或各家厂商的「手机搬家/云备份」。注意它备份的是「允许备份」的应用，很多 App 默认关闭。</li><li><strong>ADB 全量备份（最完整，但有限制）</strong>：</li></ul>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb backup -apk -shared -all -f backup.ab"}</code></pre>
      <p>这个命令在 Android 12 之后对多数应用已经失效（应用可声明 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"android:allowBackup=\"false\""}</code>），不要把它当唯一保险。</p>
      <h3>第 4 步：确认账号已登录、有云端同步（1 分钟）</h3>
      <p>如果 App 有账号体系，先确认已登录并且云端数据是最新的。有云同步的 App，本地数据丢失只是麻烦，不是灾难——<strong>这是最省事的保险</strong>。</p>
      <h3>第 5 步：用系统安装器覆盖安装（2 分钟）</h3>
      <p>直接点开 APK，用系统「软件包安装程序」安装。<strong>不要</strong>用第三方安装器、不要用清理类工具的「一键安装」。安装完成前不要点「卸载旧版本」。</p>
      <p>---</p>
      <h2>四、已经丢了，还能救吗</h2>
      <p>按顺序尝试，越靠前成功率越高：</p>
      <ol className="list-decimal pl-6 space-y-1"><li><strong>App 内重新登录</strong>：先登账号，看云端是否回拉数据。很多「数据没了」只是本地登出。</li><li><strong>检查是否装成了两份应用</strong>：桌面/应用列表里有没有两个同名图标，或设置里有两条同名记录。旧的那条可能数据还在。</li><li><strong>检查外部私有目录</strong>：用文件管理器进 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"Android/data/<包名>/"}</code>，看看有没有残留的数据库、存档、缓存文件。有的话可尝试复制出来，重装后放回（需文件管理器支持访问该目录）。</li><li><strong>多用户空间找回</strong>：设置里搜索「工作资料 / 手机分身 / 双开」，切进去看看旧数据是否在另一个空间。</li><li><strong>厂商云备份恢复</strong>：设置 → 备份与恢复，看最近一次备份的时间点。</li><li><strong>电脑端 / 云盘残留</strong>：以前用 ADB 备份过、或用换机助手导出过的话，找一下 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"backup.ab"}</code>、导出文件夹。</li><li><strong>root 设备专用</strong>：未卸载前的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/data/data"}</code> 快照、TWRP 分区备份。普通用户不建议为了这个去 root。</li></ol>
      <p>现实一点说：<strong>没有备份、没有云同步、又已经卸载，恢复成功率很低。</strong> 所以重点永远在第三节。</p>
      <p>---</p>
      <h2>五、常见问题</h2>
      <p><strong>Q：覆盖安装会清掉缓存吗？</strong></p>
      <p>不会主动清，但新版本可能自行重建缓存目录。缓存的丢失一般不影响账号和核心数据。</p>
      <p><strong>Q：从 Play 商店的版本换成第三方签名版，数据能保留吗？</strong></p>
      <p>通常不能。签名不同，系统会拒绝覆盖安装。只能卸载重装，数据会丢——除非该 App 支持用账号云端同步，或者你能导出后导入。</p>
      <p><strong>Q：开发者更新了签名怎么办？</strong></p>
      <p>正规做法是开发者用同一份密钥链（APK Signature Scheme v3 密钥轮换）。如果开发者直接换了密钥，只能卸载重装。这种情况升级前务必先导出数据。</p>
      <p><strong>Q：升级失败显示「应用未安装」，数据会丢吗？</strong></p>
      <p>不会。安装失败不改变已装应用的任何数据。只要你别在失败后手动卸载，就安全。</p>
      <p><strong>Q：游戏存档存在哪？卸载后还能找回吗？</strong></p>
      <p>多数联网手游存在服务器（绑账号即可找回）；单机游戏存在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/data/data"}</code> 或 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"Android/data"}</code>，卸载即删。升级前确认游戏有没有「云存档」开关并打开。</p>
      <p><strong>Q：双开/分身里的 App 怎么升级？</strong></p>
      <p>必须在同一个分身空间内升级，不能拿主空间的包去覆盖分身里的。最稳的做法是先在分身里导出数据，再升级。</p>
      <p>---</p>
      <h2>六、一张卡片记住所有要点</h2>
      <ul className="list-disc pl-6 space-y-1"><li><strong>包名一致、签名一致、版本不降</strong>：三个条件同时满足，覆盖安装才安全。</li><li><strong>永远不要为了绕开报错而卸载重装</strong>，先找同签名的新包，或者先备份。</li><li><strong>备份优先顺序</strong>：App 内导出 &gt; 系统/厂商云备份 &gt; ADB 备份。</li><li><strong>别用第三方安装器代装</strong>，它可能在你不知情时执行卸载。</li><li><strong>有账号就先登录</strong>，云端同步是最便宜的保险。</li></ul>
      <p>如果你还没下载、想问怎么在来源层面降低风险，可以看 <Link href="/zh/blog/apk-download-security-verification-workflow" className="text-blue-600 dark:text-blue-400 hover:underline">APK 下载安全检测全流程</Link> 和 <Link href="/zh/blog/apk-download-safety-source-trust-tiers" className="text-blue-600 dark:text-blue-400 hover:underline">APK 来源可信度分级判断</Link>；升级完成后想确认新包行为是否正常，配合 <Link href="/zh/blog/apk-post-install-48-hour-audit" className="text-blue-600 dark:text-blue-400 hover:underline">安装后 48 小时审计</Link> 一起做。</p>
  </>
);

export const zhPosts20261126 = [
  {
    slug: "apk-upgrade-data-preservation",
    title: "APK 覆盖升级后数据全没了？账号、聊天、存档丢失的完整保留方案",
    description: "自己下载的 APK 更新完，账号登不上、聊天记录空了、游戏回到第一章——这几乎不是运气问题，而是升级路径错了。本文讲清安卓应用数据的四个存放位置及其在覆盖安装、卸载重装下的不同命运，拆解五种『看起来像升级、实际是卸载重装』的坑（包名变化、签名不一致、版本降级、第三方安装器代装、用户空间错位），给出升级前 10 分钟的包名/签名校验与备份流程、数据已丢后的七级抢救顺序，以及 6 条常见问答。",
    date: "2026-11-26",
    readTime: "10 min read",
    tags: ["APK更新","数据丢失","安卓备份","侧载APK","排查"],
    content: ARTICLE,
  },
];

export const zhPosts20261126List = toList(zhPosts20261126);
