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
      <p># 侧载 APK 更新后频繁闪退？新版本翻车的回滚与止损手册</p>
      <p>自己维护的侧载应用最怕的不是「装不上」，而是<strong>用了一段时间感觉挺好，某次更新完开始闪退、卡死、耗电暴涨</strong>。这时候你面对一个很别扭的局面：想退回旧版，系统说版本不能降级；想留在新版，用起来实在难受；想卸载重装，数据全没了。</p>
      <p>这篇给一套完整的止损流程：<strong>先判断是「新版本身有问题」还是「升级过程出了岔子」，再在不丢数据的前提下回滚，最后决定这个版本该不该继续用。</strong></p>
      <p>&gt; 关于更新为什么会导致数据丢失（签名、包名、卸载重装的坑），先看 <Link href="/zh/blog/apk-upgrade-data-preservation" className="text-blue-600 dark:text-blue-400 hover:underline">APK 覆盖升级数据丢失完整保留方案</Link>。这篇聚焦「已经装上新版、现在开始出问题」的场景。</p>
      <p>---</p>
      <h2>一、先分清三种「更新后出问题」</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">现象</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">常见根因</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">该往哪个方向处理</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">打开就闪退，从未成功启动过</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">架构不匹配、minSdk 不足、新版本依赖的 system 组件缺失</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">大概率要回滚，见第三节</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">能用，但某些页面/功能一进就崩</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">新版引入的 bug、旧数据库结构未迁移成功</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">先清缓存、导出数据，再决定回滚</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">不崩但变卡、发热、掉电快</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">新版后台策略变化、广告/统计 SDK 加重</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">先按耗电排查，再决定是否回滚</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">闪退且日志里出现 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"SQLiteException"}</code> / migration 相关</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">数据库升级脚本失败</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>先备份数据库文件</strong>，再回滚，否则回滚后旧版读不了新库</td></tr></tbody>
      </table></div>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"SQLiteException"}</code> 那一行最重要。新版可能已经把数据库结构升级了，旧版读不懂新结构，会出现「回滚成功但一打开还是崩」。遇到这类，第一步永远是<strong>先把数据导出来</strong>。</p>
      <p>---</p>
      <h2>二、抓日志定位真因（5 分钟）</h2>
      <p>不用 root，用 logcat 就能拿到崩溃栈：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 清空日志，复现一次闪退，然后抓取\nadb logcat -c\n# ...在手机上点开应用，等它崩...\nadb logcat -d -v time > crash.txt"}</code></pre>
      <p>然后在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"crash.txt"}</code> 里搜这几个关键词：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"grep -nE \"FATAL EXCEPTION|AndroidRuntime|Caused by|SQLiteException|Could not find class|UnsatisfiedLinkError|minSdk|SecurityException\" crash.txt"}</code></pre>
      <p>对照表：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">日志特征</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">含义</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">处理</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"UnsatisfiedLinkError: dlopen failed ... \"lib/arm64\""}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">缺少对应 CPU 架构的 so 库</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">找 universal 包或 arm64 专用包</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"ClassNotFoundException"}</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"NoClassDefFoundError"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">依赖拆分（App Bundle 拆包）未带全</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换完整 APK</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"SQLiteException: no such column"}</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"can't downgrade database"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">数据库结构已升级</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">导出数据后回滚</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"SecurityException"}</code> + 权限名</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">新版新增权限但系统未授予</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">手动授予对应权限</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"java.lang.OutOfMemoryError"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">新版内存占用偏高</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">先清缓存/换低配版本</td></tr></tbody>
      </table></div>
      <p>如果没有 adb，也可以用手机自带的「开发者选项 → 错误报告」，或机型自带的日志抓取工具。</p>
      <p>---</p>
      <h2>三、不丢数据地回滚到旧版</h2>
      <p>系统默认不允许降级（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"INSTALL_FAILED_VERSION_DOWNGRADE"}</code>），所以「回滚」需要一点技巧。按安全性从高到低：</p>
      <h3>方案 A：覆盖安装同版本号的重签名包（最安全）</h3>
      <p>如果旧包的 versionCode 与新版相同，直接覆盖安装即可，系统不会触发降级拦截。部分渠道会发布「同版本号不同构建」的修正包，这是最干净的回滚方式。</p>
      <h3>方案 B：adb 允许降级安装（推荐）</h3>
      <p>Android 11 起支持：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb install -r -d -g old_version.apk"}</code></pre>
      <ul className="list-disc pl-6 space-y-1"><li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"-r"}</code> 覆盖安装，保留数据</li><li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"-d"}</code> 允许 versionCode 降级</li><li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"-g"}</code> 授予所有运行时权限，避免回滚后权限弹窗</li></ul>
      <p>前提：签名必须一致。签名不一致时仍会报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"INSTALL_FAILED_UPDATE_INCOMPATIBLE"}</code>，此时无法保留数据降级，只能走方案 D。</p>
      <h3>方案 C：先导出数据，再卸载安装旧版</h3>
      <p>适用于签名冲突、或数据库已被升级的情况。</p>
      <ol className="list-decimal pl-6 space-y-1"><li>在新版里用 App 自带功能导出（聊天记录、存档、配置）。</li><li>若 App 没有导出功能，尝试访问 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"Android/data/<包名>/"}</code>，把数据库、配置文件复制到电脑。</li><li>卸载，安装旧版。</li><li>再尝试把文件放回对应目录（部分应用启动时会读取）。</li></ol>
      <h3>方案 D：放弃本地数据，确认云端</h3>
      <p>如果 App 有账号体系，卸载重装旧版后登录账号，让云端回拉数据，这是最省事也最可靠的路径。</p>
      <p>---</p>
      <h2>四、回滚成功后必须做的三件事</h2>
      <ol className="list-decimal pl-6 space-y-1"><li><strong>关闭自动更新</strong>：新版如果会自己提示更新、或渠道会自动推包，尽快关掉，否则一夜回到解放前。参考 <Link href="/zh/blog/disable-apk-auto-update" className="text-blue-600 dark:text-blue-400 hover:underline">关闭 APK 自动更新的方法</Link>。</li><li><strong>记录当前可用版本号</strong>：把旧包文件改名加上版本号留档，下次再出问题可以立刻恢复。</li><li><strong>观察 48 小时</strong>：回滚后确认推送、通知、后台、耗电是否恢复。可配合 <Link href="/zh/blog/apk-post-install-48-hour-audit" className="text-blue-600 dark:text-blue-400 hover:underline">安装后 48 小时审计</Link>。</li></ol>
      <p>---</p>
      <h2>五、这个新版还要不要跟</h2>
      <p>判断标准很简单，看三点：</p>
      <ul className="list-disc pl-6 space-y-1"><li><strong>是否影响核心功能</strong>：能用的功能和不能用的功能占比。核心功能崩，回滚；边缘功能崩，可以等下一版。</li><li><strong>是否有已知修复时间</strong>：渠道/社区有没有说明是新版 bug、下一版何时发。</li><li><strong>安全更新是否包含在内</strong>：如果新版修了严重安全问题，长期停留在旧版有风险，需要权衡。</li></ul>
      <p>一个实用做法：<strong>保留「能用的旧版」+「新版的安装包」，不急着彻底断绝。</strong> 等下一个版本出来，先在备用机或分身里试装一天，稳定了再上主力机。</p>
      <p>---</p>
      <h2>六、防止下次再踩坑的操作习惯</h2>
      <ul className="list-disc pl-6 space-y-1"><li>升级前记下当前 versionCode，并把旧包留档（很多人事后想找旧版却找不到）。</li><li>升级前确认云同步已开启、账号已登录。</li><li>下载时优先选 universal 包，减少架构不匹配导致的闪退。</li><li>不用第三方安装器代装，避免被静默卸载重装。</li><li>大版本更新先在非主力设备上试。</li></ul>
      <p>---</p>
      <h2>七、常见问题</h2>
      <p><strong>Q：降级安装会不会把数据弄坏？</strong></p>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"adb install -r -d"}</code> 保留数据，但如果新版已经升级了数据库结构，旧版可能无法读取。所以有数据库类应用（笔记、聊天、记账）先导出。</p>
      <p><strong>Q：回滚后提示「数据来自更高版本」怎么办？</strong></p>
      <p>说明数据库版本号高于旧版能识别的范围。只能清应用数据（会丢本地数据），或恢复之前导出的备份。</p>
      <p><strong>Q：为什么有的应用卸载重装数据还在？</strong></p>
      <p>它有云端账号。本地数据确实被删了，是重新从服务器同步下来的。</p>
      <p><strong>Q：新版本杀后台更狠了，算 bug 吗？</strong></p>
      <p>不一定，可能是新版适配了新系统的后台限制。可以在系统设置里给该应用「允许后台活动」「不限制耗电」再观察。</p>
      <p><strong>Q：能不能只降级不重装，保留新版的部分功能？</strong></p>
      <p>不能。版本是整体切换的，没有「混装」。</p>
      <p><strong>Q：旧包找不到怎么办？</strong></p>
      <p>优先找官方渠道的历史版本页；其次是可信的 APK 归档站，但务必核对签名与版本号，避免拿到被改过的包。参考 <Link href="/zh/blog/apk-download-safety-source-trust-tiers" className="text-blue-600 dark:text-blue-400 hover:underline">APK 来源可信度分级判断</Link>。</p>
  </>
);

export const zhPosts20261126B = [
  {
    slug: "sideloaded-apk-crash-after-update-rollback",
    title: "侧载 APK 更新后频繁闪退？新版本翻车的回滚与止损手册",
    description: "用得好好的侧载应用，某次更新后开始闪退、卡死、耗电暴涨。想退回旧版，系统说不能降级；想卸载重装，数据全没了。本文给出完整的止损流程：先用现象归类和 logcat 日志（无需 root）判断是『新版本本身有问题』还是『升级过程出了岔子』，重点防住数据库结构已被升级导致回滚后仍崩溃的陷阱，再按数据保留程度从高到低给出四种回滚方法（同版本号打包覆盖、adb install -r -d -g、导出后卸载装旧版、依赖云端），回滚后该做的三件事、是否继续跟进新版的判断标准，以及防复发的操作习惯与 6 条 FAQ。",
    date: "2026-11-26",
    readTime: "9 min read",
    tags: ["APK更新","版本回滚","闪退排查","logcat","侧载APK"],
    content: ARTICLE,
  },
];

export const zhPosts20261126BList = toList(zhPosts20261126B);
