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
      <p>迁移旧手机到新手机，很多人卡在一个误区：以为「装回来就完事了」。装回来确实简单，但登录状态、聊天记录、离线地图、下载好的歌单和游戏进度全没了，代价往往是重新登录十几次、丢一批本地文件。</p>
      <p>关键认知是：<strong>App 本体和数据是两回事</strong>。APK 是可以随便重下的（甚至同一个包在旧机上还能直接导出来），数据才是唯一的、丢不起的部分。所以迁移的正确顺序是先定数据怎么走，再决定 APK 怎么装。</p>
      <p>下面是三条路线，按「通用程度」从高到低排。</p>
      <h2>路线一：厂商换机工具（最省事，适合同品牌）</h2>
      <p>小米的换机、华为的手机克隆、三星的 Smart Switch、OPPO/vivo 自带的互传，本质都是同一套东西：通过 Wi-Fi Direct 或数据线把 App 包 + Android 允许备份的数据整体搬过去。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`旧机：设置 → 系统 → 手机克隆 / 换机
新机：同样入口，选择「我是新手机」
两者靠近，走 5GHz Wi-Fi 直连，速度能到 30–80 MB/s`}</code></pre>
      <p>优点是不用电脑、不用 root。局限有三个：</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>跨品牌成功率低</strong>：能搬 IM 的聊天记录（因为微信、QQ 自己有迁移协议），但很多国产 App 的登录态会失效；</li>
        <li><strong>系统版本差距大时会被拒绝</strong>：旧机 Android 9 搬到新机 Android 15，部分 App 直接不还原；</li>
        <li><strong>加密数据搬不动</strong>：厂商工具只能搬 allowBackup=true 的那部分。</li>
      </ul>
      <h2>路线二：Google 云备份还原（最通用，依赖网络）</h2>
      <p>Android 从 9 开始支持端到端加密的云备份，备份内容包括已安装应用列表、Wi-Fi 密码、短信通话记录和 App 数据（限 allowBackup 开启的）。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# 在旧机上触发立即备份（需要能进拨号盘）
# 或者：设置 → 系统 → 备份 → 立即备份
adb shell bmgr backupnow --all`}</code></pre>
      <p>恢复时在新机首次引导里选「从旧设备恢复」，登录同一 Google 账号即可。注意几个现实限制：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">限制</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">说明</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">每个 App 上限 25 MB</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">超过的部分（游戏存档、离线视频）不会进云备份</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">allowBackup=false</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">银行、支付、部分 IM 类应用会主动关掉，只能重新登录</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">备份周期</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">通常每天一次且只在充电+Wi-Fi 时执行，最后一次备份可能很旧</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">需要 Play 服务</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">国产无 GMS 机型用不了这条路</td></tr></tbody>
      </table></div>
      <h2>路线三：adb backup / 手动导出（最可控，需要电脑）</h2>
      <p>想精确控制搬什么，就用 adb。先导出 App 的 APK 本体，再单独处理数据。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# 1) 列出已安装的第三方包
adb shell pm list packages -3

# 2) 导出 APK 本体（不需要 root）
adb shell pm path com.example.app
adb pull /data/app/com.example.app-xxxx/base.apk ./com.example.app.apk

# 3) 导出一个 App 的私有数据（会弹窗要求设密码，需要 App 自身 allowBackup=true）
adb backup -apk -shared -f backup.ab com.example.app`}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">backup.ab</code> 是特殊格式，还原时用：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb restore backup.ab`}</code></pre>
      <p>几个必须知道的坑：</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb backup</code> 在 Android 12 之后对很多包已经失效，Google 逐步限制了这个通道，新机型上大概率只备份到很少的内容；</li>
        <li>还原到新机要求包名与签名一致，<strong>这也是为什么直接拿别人发的 APK 覆盖安装，数据一定不会接上</strong>；</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-shared</code> 会带上相册、下载目录等公共文件，文件大的话备份包会非常夸张。</li>
      </ul>
      <h2>被拒绝还原的那批 App 怎么办</h2>
      <p>这些只能走 App 自己的官方迁移通道，绕不过去：</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>微信</strong>：旧机「我 → 设置 → 聊天 → 聊天记录迁移与备份 → 迁移到另一台设备」，走同一 Wi-Fi，别用云备份（云备份只保 7 天且不含全部聊天）；</li>
        <li><strong>支付宝/银行类</strong>：必须重新登录并可能要求换机验证，这是安全设计，不是 bug；</li>
        <li><strong>游戏</strong>：优先用账号绑定（Google Play 游戏、Facebook、厂商账号），别指望备份存档；</li>
        <li><strong>企业微信/钉钉</strong>：公司后台可能有设备绑定，需要管理员解绑。</li>
      </ul>
      <h2>一份可以直接照做的顺序</h2>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>旧机上先看存储用量，把相册和下载目录同步到云端或拷到电脑，别混在 App 数据里搬；</li>
        <li>记录旧机已安装的第三方包名列表（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list packages -3</code>），新机上不会漏装；</li>
        <li>用厂商换机工具做第一轮整体搬运，这是覆盖率最高的起点；</li>
        <li>对搬完打不开或要求重新登录的重要 App，逐个用 App 内自带的迁移功能补一遍；</li>
        <li>新机上用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell dumpsys package &lt;包名&gt; | grep versionName</code> 对比旧机版本号，版本对不上就先把旧版 APK 装上再恢复数据；</li>
        <li>确认新机一切正常后，再恢复旧机出厂或回收。</li>
      </ol>
      <p>这套顺序的核心是：<strong>先用覆盖面最广的工具打底，再针对性地补洞</strong>。反过来先折腾 adb 单点迁移，往往花几个小时还不如换机工具点两下。想知道某个 App 到底是什么在阻止数据迁移，可以用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump badging app.apk | grep -i backup</code> 看它的可备份标记，基本能一眼判断该走哪条路。</p>
  </>
);

export const zhPosts20261118A = [
  {
    slug: "android-apk-app-migration-guide",
    title: "换新手机不用重新下：把整个 App 连同数据搬过去的三条路线",
    description: "换机时 App 能重装，数据丢不了才是难点。本文对比云备份还原、本地备份与 adb 全量迁移三条路线，说明各自的适用边界（哪些 App 会拒绝还原、为什么微信/银行类应用必须换机码），并给出 APK 本体与数据分开处理的实操顺序。",
    date: "2026-11-18",
    readTime: "6 min read",
    tags: ["应用迁移","换机","Android备份","adb","APK","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261118AList = toList(zhPosts20261118A);
