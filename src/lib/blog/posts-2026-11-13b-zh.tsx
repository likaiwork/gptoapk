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
      <p>升级之后后悔了——新版砍掉了功能、改了界面、电池掉得飞快。想装回旧版本，网上一搜全是&quot;卸载再装旧版&quot;，然后你的聊天记录、游戏存档、登录状态全没了。</p>
      <p>实际情况没那么绝对。<strong>降级能不能保住数据，取决于一个技术细节：新旧两个安装包是不是同一个签名。</strong> 这一条决定了你是&quot;三分钟搞定、数据完整&quot;，还是&quot;必须先卸载、数据必然清空&quot;。</p>
      <p>这篇把判断方法、两种路径的完整操作，以及每个场景下的真实取舍讲清楚。</p>
      <h2>第一步：先判断签名是否一致</h2>
      <p>不要直接动手装。先花两分钟做这一步，能避免后面 90% 的麻烦。</p>
      <h3>手机上判断（不需要电脑）</h3>
      <p>装一个能读取签名信息的工具（如 ApkInfo、LibChecker），分别看新旧两个 APK 的<strong>签名证书指纹（SHA-256）</strong>。</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>指纹一致</strong> → 走路径 A，数据能完整保留</li>
        <li><strong>指纹不一致</strong> → 走路径 B，必须先卸载，数据一定丢</li>
      </ul>
      <h3>电脑上判断（更准确）</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 看包名和版本号\naapt2 dump badging old.apk | head -2\naapt2 dump badging new.apk | head -2\n\n# 看签名证书指纹\nkeytool -printcert -jarfile old.apk | grep -A2 \"SHA256\"\nkeytool -printcert -jarfile new.apk | grep -A2 \"SHA256\""}</code></pre>
      <p>两个 SHA256 完全一致，才能原地覆盖安装。</p>
      <h3>为什么签名这么重要</h3>
      <p>Android 用签名来做<strong>应用身份认证</strong>。同包名、不同签名的两个 APK，系统视为两个不同身份的软件，不可能共存在一个 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/data/&lt;包名&gt;</code> 目录上。这是安全设计，不是 bug——否则任何人都能做个伪装包覆盖掉你的银行 App。</p>
      <p>所以那些&quot;从第三方网站下的修改版、去广告版、破解版&quot;，<strong>签名百分之百和官方不一致</strong>。装这类包必然要卸载原版，等于放弃所有数据。这一点在降级场景里尤其要警惕。</p>
      <h2>路径 A：同签名原地降级（数据完整保留）</h2>
      <p>前提：新旧包签名一致。这是唯一能保住数据的路径。</p>
      <h3>前提条件：系统必须允许 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> 参数</h3>
      <p>从 Android 9 起，<strong>系统不允许通过普通安装界面降级</strong>——你在文件管理器里点旧版 APK，会直接提示&quot;应用未安装&quot;。必须走 adb：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb devices                    # 确认设备已授权\nadb install -d -r old.apk"}</code></pre>
      <p>两个参数都不能省：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code> = 覆盖安装到已有包上</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> = 允许更低版本号（downgrade）</li>
      </ul>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">报错</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">原因</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">解决</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_VERSION_DOWNGRADE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">漏了 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">加上 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">签名不一致</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">无解，转路径 B</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_ALREADY_EXISTS</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">漏了 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">加上 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_TEST_ONLY</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包带 testOnly 标记</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">加 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-t</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_USER_RESTRICTED</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">手机上需要二次确认</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">在手机上点&quot;允许&quot;</td></tr></tbody>
      </table></div>
      <h3>一个必须注意的坑：数据库版本</h3>
      <p>原地降级保住了数据，但<strong>新版本可能已经把数据库结构升级过了</strong>。旧版程序读取新版数据库，可能三种结果：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>正常读取（兼容，最理想）</li>
        <li>读取失败 → 应用启动闪退</li>
        <li>读到脏数据 → 显示错乱、账号异常</li>
      </ol>
      <p>遇到第 2、3 种，说明<strong>降级不可行</strong>，只能清数据后重来：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm clear com.example.app"}</code></pre>
      <p>执行后所有本地数据清空，但应用保持已装状态。<strong>执行前务必确认自己没有未导出的重要数据</strong>。</p>
      <h3>降级后立刻做的事</h3>
      <p>降级后如果不关自动更新，商店会在一两天内把应用推回最新版，白干。</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Google Play</strong>：应用页 → 右上角三点 → 取消勾选&quot;启用自动更新&quot;</li>
        <li><strong>国内商店</strong>（华为/小米/OPPO/vivo）：在商店设置里关闭自动更新；部分机型还要在应用管理里锁定版本</li>
        <li>关掉自动更新<strong>不能阻止</strong>手动更新提示，部分商店还会定期弹窗骚扰，这是正常现象</li>
      </ul>
      <h2>路径 B：签名不一致，先卸载再装（数据必然丢）</h2>
      <p>没有捷径。但可以尽量减少损失。</p>
      <h3>卸载前能抢救的东西</h3>
      <p><strong>1. 应用自带的导出功能（最可靠）</strong></p>
      <p>打开应用设置，找&quot;导出&quot;、&quot;备份&quot;、&quot;数据迁移&quot;、&quot;同步到云端&quot;。这是成功率最高的方式，尤其对聊天类、笔记类、记账类应用。</p>
      <p><strong>2. 外部存储里的文件</strong></p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb pull /sdcard/Android/data/com.example.app/files ./backup-files\nadb pull /sdcard/Android/media/com.example.app ./backup-media"}</code></pre>
      <p>应用存在共享存储里的文件（照片、下载、缓存），卸载不会删除 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/media/</code> 下的内容，但 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Android/data/</code> 在新版 Android 上会被清理。</p>
      <p><strong>3. `adb backup`（基本已失效，别指望）</strong></p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb backup -apk -all -f backup.ab"}</code></pre>
      <p>从 Android 12 起，绝大多数应用不再支持 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb backup</code>，导出的文件是空的。<strong>这条路已经不通了</strong>，不要把它当备份手段。</p>
      <p><strong>4. 账号同步（最省心）</strong></p>
      <p>如果应用有云端账号体系，卸载前确认数据已同步到服务器，重装旧版后登录即可恢复。这是唯一&quot;无痛&quot;的方案。</p>
      <h3>执行</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb uninstall com.example.app\nadb install old.apk"}</code></pre>
      <p>注意顺序：<strong>先备份、再卸载、最后装旧版</strong>。中间不要插入其他操作。</p>
      <h3>卸载后的二次风险</h3>
      <p>旧版装上了，但登录旧版时服务器可能要求&quot;必须升级到最新版才能继续使用&quot;。这不是客户端能绕过的——服务端做了版本门禁。</p>
      <p>遇到这种情况，降级这条路彻底堵死。<strong>金融、支付、社交、部分工具类应用</strong>经常这么做，本质是安全合规要求。</p>
      <h2>各场景的真实取舍</h2>
      <h3>社交/通讯类</h3>
      <p>数据几乎全在服务器，客户端只是壳。降级风险最低，但也最容易被服务端版本门禁拦截。<strong>优先考虑用官方提供的&quot;聊天记录迁移&quot;功能，而不是靠本地文件。</strong></p>
      <h3>游戏</h3>
      <p>存档分两种：<strong>服务器存档</strong>（不影响）和<strong>本地存档</strong>（卸载即丢）。单机游戏、部分手游的本地存档，卸载前必须找到存档目录手动复制：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell run-as com.example.game ls /data/data/com.example.game/files\nadb exec-out run-as com.example.game tar -c files > save.tar"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">run-as</code> 需要应用是 debuggable 版本，正式版通常不能用。所以更实际的做法是：<strong>看游戏有没有&quot;备份到云&quot;的选项</strong>。</p>
      <h3>银行/支付类</h3>
      <p>不建议降级。旧版的 API 接口大概率已被服务端下线，装上也无法使用；而且旧版缺少安全补丁，属于主动扩大风险。</p>
      <h3>系统预装应用</h3>
      <p>系统应用降级需要 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--user 0</code> 或者特权权限，普通 adb 会报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_INVALID_APK</code> 或权限错误。这类操作风险高（可能导致系统不稳定），不建议折腾。</p>
      <h2>常见问题</h2>
      <p><strong>Q：为什么文件管理器里点旧版 APK 装不上，用 adb 就可以？</strong></p>
      <p>因为系统安装器默认拒绝降级，adb 的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> 参数是显式声明&quot;我知道我在降级&quot;。</p>
      <p><strong>Q：能不能保留数据又换掉签名？</strong></p>
      <p>不能。换签名等于换应用身份，必须走卸载。唯一的例外是使用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> 重新签名并要求设备已 root、且能绕过签名校验（需要 Xposed/LSPosed 模块），复杂度和风险都很高，普通用户不要碰。</p>
      <p><strong>Q：降级后应用闪退，除了清数据还有别的办法吗？</strong></p>
      <p>如果应用本身有&quot;数据库降级&quot;逻辑，可能自动处理。否则只能清数据。先试 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm clear</code>，如果还是闪退，说明旧版与当前系统版本不兼容。</p>
      <p><strong>Q：能不能用 `-d` 降级到很老的版本？</strong></p>
      <p>能，但要考虑 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">minSdkVersion</code>。旧包要求的系统版本如果高于你当前系统，会报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_OLDER_SDK</code>。以及跨多个大版本降级时，数据库和缓存格式差异过大，闪退概率极高。</p>
      <h2>一句话总结</h2>
      <p><strong>签名一致 → adb 加 `-d -r` 原地降级，数据全保留；签名不一致 → 先备份再卸载，数据必有损失。</strong> 动手前先查签名，能省掉一半的反复折腾。</p>
      <p>需要干净的原始安装包时，<a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk.com</a> 上的版本都标注了包名与版本号，方便你对照校验，避免下到签名不符的修改版——那才是降级翻车的头号原因。</p>
  </>
);

export const zhPosts20261113B = [
  {
    slug: "apk-rollback-keep-data",
    title: "APK版本回滚数据保留技巧：降级装回旧版，哪些数据能留下、哪些一定丢",
    description: "升级之后后悔了——新版砍掉了功能、改了界面、电池掉得飞快。想装回旧版本，网上一搜全是\"卸载再装旧版\"，然后你的聊天记录、游戏存档、登录状态全没了。",
    date: "2026-11-13",
    readTime: "6 min read",
    tags: ["android","apk","降级","数据备份"],
    content: ARTICLE,
  },
];

export const zhPosts20261113BList = toList(zhPosts20261113B);
