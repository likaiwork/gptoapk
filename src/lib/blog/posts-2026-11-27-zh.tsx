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

const ARTICLE_A = (
  <>
      <p>安装器弹出「应用已安装」，你切回桌面，翻了两页、拉出应用抽屉搜索、进设置里按字母顺序找了一遍——没有。重启手机后还是没有。</p>
      <p>第一反应通常是「没装上吧」，于是再点一次 APK，安装器又说「已安装」。这个循环很折磨人，但结论其实很清楚：<strong>包确实在系统里，只是你在找的位置不对，或者系统不认为它有一个可点击的入口</strong>。</p>
      <p>「看不见」只有三种可能：应用身份被覆盖了、桌面/启动器不给你显示、或者这个包根本没有可启动的 Activity。三者的排查路径完全不同，先分清楚再动手。</p>
      <p>&gt; 如果安装器根本没提示成功，而是报「应用未安装」或「与现有应用冲突」，那是安装侧的问题，看 <Link href="/zh/blog/apk-signature-mismatch-install-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名不匹配无法安装的解决</Link>。如果你连安装器都没看到，请先确认文件本身是完整的 APK：<Link href="/zh/blog/apk-downloaded-file-is-html-not-apk-diagnosis" className="text-blue-600 dark:text-blue-400 hover:underline">下载到的其实不是 APK 的取证排查</Link>。</p>
      <h2>一、先分清「找不到」的四种形态</h2>
      <p>同样是「找不到」，症状细节差别很大，对应根因也完全不同：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">你看到的</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">实际情况</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">最可能的原因</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">第一条验证命令</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">安装器说「应用已安装」，但桌面没有新图标</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">同名包被覆盖，版本或签名不同</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包里包名与你已装的某应用相同</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">`adb shell pm list packages -f \\</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">grep -i 关键词`</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">桌面有图标，点了没反应 / 闪一下就退</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">入口存在但启动失败</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">缺启动 Activity 或组件被禁用</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">`adb logcat -d \\</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">grep -i ActivityTaskManager`</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用抽屉里有，桌面主屏没有</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">只添加到抽屉，未放主屏</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">启动器设置 / 自动添加权限关闭</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">长按抽屉图标 → 添加到主屏</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">设置 → 应用里能看到，桌面和抽屉都搜不到</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">入口被隐藏或组件被禁用</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">启动器隐藏、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm disable</code>、工作资料隔离</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell dumpsys package &lt;包名&gt;</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">只在「工作资料 / 分身 / 第二空间」里</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">装在另一个用户空间</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">user 10/999</code> 等多用户隔离</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list users</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">装完过几小时自己消失了</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">被系统清理或卸载</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">国产 ROM 清理、Play Protect 卸载、存储空间不足</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">`adb shell pm list packages \\</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">grep 包名` 复查</td></tr></tbody>
      </table></div>
      <p>先把现象落到某一行，后面的九步流程才不会白跑。</p>
      <p>一个很实用的直觉：<strong>如果输入法搜索、设置里的应用列表都找不到它，那它大概率是被覆盖装到了别的包上</strong>。因为系统级的应用列表是按包名列的，只要包存在就一定列得出来，找不到说明你以为的那个「新应用」并不存在。</p>
      <h2>二、机制：Android 怎么决定「桌面要显示哪些图标」</h2>
      <p>理解这条链路，所有「找不到」都能自己推出来。</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>安装时</strong>，系统把 APK 解包，在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/</code> 下建立以包名 + 随机后缀为目录的安装位置，并在 PackageManager 里注册一个 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">PackageSetting</code>。此时「装没装」已经确定了。</li>
        <li><strong>应用身份的唯一键是包名</strong>（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">package=&quot;com.example.app&quot;</code>）。同一个包名在同一个用户空间里<strong>只能存在一个版本</strong>。再次安装同名包时，系统按「升级」处理：包名不变、数据保留、入口地址被新包覆盖。</li>
        <li><strong>桌面显示的条目不是「包」，而是「Activity」</strong>。启动器只列出那些声明了 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android.intent.category.LAUNCHER</code>（以及 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">MONKEY</code>）的 Activity。一个包可能有 20 个 Activity，但只有声明了 LAUNCHER 的那个会出现在桌面。</li>
        <li><strong>组件可以被单独禁用</strong>。<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm disable</code> / 启动器的「隐藏应用」/ 企业管控策略都只影响组件可见性，不影响包本身是否已安装。</li>
      </ol>
      <p>关键差别就是第 2、3 条：<strong>装得上 ≠ 有图标</strong>。很多人以为「装了就会出现在桌面」，实际上系统只保证包注册成功，图标是启动器根据 Activity 声明自己拼出来的。</p>
      <p>想知道一个包到底有没有桌面入口，看清单里的这一行就够了：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"<activity android:name=\".MainActivity\" android:exported=\"true\">\n    <intent-filter>\n        <action android:name=\"android.intent.action.MAIN\" />\n        <category android:name=\"android.intent.category.LAUNCHER\" />\n    </intent-filter>\n</activity>"}</code></pre>
      <p>没有这段，包再完整也不会出现在桌面——这是「装了但看不见」最常见也最无辜的原因。</p>
      <h2>三、包名冲突：你以为的「新应用」其实覆盖了旧应用</h2>
      <p>这是「安装器说已安装、桌面却没变化」的头号原因，而且它的表现非常迷惑人。</p>
      <p>场景很典型：你从 [[gptoapk]] 下载了一个工具类应用的新版本，包名是 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.vendor.toolkit</code>；而你手机上早就装过同一个包名的旧版本（哪怕是很久以前从别的渠道装的）。安装时系统判定为「升级」，于是：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>包名不变，所以桌面上原图标位置<strong>不会新增</strong>，只是内容被换掉了；</li>
        <li>如果新包的签名和旧包不同，系统会直接拒绝，报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>；</li>
        <li>如果签名相同但新版本把 LAUNCHER Activity 改了名字或去掉了，<strong>旧图标就消失了，新图标也不会出现</strong>——于是你得到一个「装了但什么都没有」的应用。</li>
      </ul>
      <p>验证方法只有一条：找到包名，看安装路径和时间。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 1) 按应用名 / 关键词找包名（-f 会显示 APK 路径，能看出装在哪）\nadb shell pm list packages -f | grep -i -E 'keyword|vendor'\n\n# 2) 看这个包的详细信息：版本号、签名、安装时间、入口组件\nadb shell dumpsys package com.vendor.toolkit | head -40\n\n# 3) 找出它真实包含的启动入口（最关键的一步）\nadb shell cmd package resolve-activity --brief \\\n  -a android.intent.action.MAIN \\\n  -c android.intent.category.LAUNCHER \\\n  com.vendor.toolkit"}</code></pre>
      <p>第 3 条命令如果返回 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">No activity found</code>，基本可以结案：这个包没有任何 launchable 入口，桌面当然不会显示它。此时你可能装的是一个库包、一个配套插件包，或者是把多个模块拆成多个 APK 的「分体式」应用。</p>
      <p>如果第 1 条命令返回两个都叫 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.vendor.toolkit</code> 的路径（例如一个在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/</code>、一个在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/~~xxx==/</code>），说明有残留的旧安装目录，属于升级过程中的残留，卸载后重装即可清理。</p>
      <p><strong>一个必须提醒的风险</strong>：覆盖安装同名包时，新包会<strong>继承旧包的权限和登录态</strong>。如果你从不可信来源下载了一个与你已装应用同名的包，覆盖安装后它就能直接拿到旧应用的账号数据。所以凡是「装完没有新图标」的情况，先确认包名和签名与原来一致，再考虑继续用。</p>
      <h2>四、桌面与启动器：图标被藏在了哪里</h2>
      <p>如果确认包存在、也确认它有 LAUNCHER Activity，但你还是看不见，问题就在展示层。按常见程度排序：</p>
      <h3>1. 启动器的「隐藏应用」功能</h3>
      <p>不少第三方启动器（Nova、Microsoft Launcher、部分国产桌面）支持长按应用 → 隐藏，或提供「隐藏应用」开关。国产 ROM 的桌面更是普遍自带「隐藏应用」功能，被隐藏的应用：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>不出现在桌面和抽屉；</li>
        <li>但<strong>在设置 → 应用里照常存在</strong>；</li>
        <li>通常需要双指下滑、拨号盘输入密码、或在设置里关闭隐藏才能恢复。</li>
      </ul>
      <h3>2. 桌面缓存未刷新</h3>
      <p>安装后系统会发 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">PACKAGE_ADDED</code> 广播，启动器收到后重新拉一次列表。这个广播偶尔会被系统的省电策略延后，或启动器进程被干掉后没有重建索引。表现是：应用抽屉里有，桌面的「所有应用」网格里没有，或者要重启桌面才出现。</p>
      <p>快速验证：桌面下拉搜索应用名。<strong>系统搜索走的是 PackageManager 直接查询，不依赖启动器缓存</strong>。搜索能搜到 = 包和入口都正常，纯粹是桌面显示问题。</p>
      <h3>3. 「抽屉模式」与「主屏放满」</h3>
      <p>部分国产 ROM 关掉了应用抽屉，所有应用必须手动放到桌面。如果主屏已满，新装的图标会被追加到最后一页或者干脆不自动添加。检查启动器设置里是否有「新应用自动添加到主屏」的开关。</p>
      <h3>4. 应用被装进了「工作资料 / 应用分身」</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list users\n# 常见输出：UserInfo{0:Owner:...} UserInfo{10:Work profile:...} UserInfo{999:...}"}</code></pre>
      <p>如果应用装在了 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">user 10</code>（工作资料）或厂商的「第二空间」里，主用户的桌面是看不到的。切换用户空间才能看到它。同理，某些「应用分身 / 双开」工具会把克隆出来的副本放在另一个 userId 下，两个副本同名但互不作数。</p>
      <h3>5. 桌面图标被折叠进文件夹</h3>
      <p>这个听起来很傻，但确实常见：新图标自动落进了某个文件夹里，你以为没装，其实被塞在「工具」文件夹第二页。</p>
      <h2>五、组件被禁用：包在，入口被关</h2>
      <p>系统允许单独禁用某个组件，而不影响整个包。下面两条命令可以确认：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 1) 查看包内所有组件的启用状态（disabled 行会明确写出来）\nadb shell dumpsys package com.vendor.toolkit | grep -E 'Activity|Service|enabled|disabled' | head -30\n\n# 2) 直接问系统：这个包有没有可启动入口\nadb shell cmd package resolve-activity --brief \\\n  -a android.intent.action.MAIN -c android.intent.category.LAUNCHER \\\n  com.vendor.toolkit"}</code></pre>
      <p>如果第 2 条返回了入口名（形如 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.vendor.toolkit/.MainActivity</code>），但桌面依然没有，那 100% 是启动器层面的问题，不是包的问题。你可以直接绕过桌面启动它：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 用一个明确的 intent 拉起（相当于从桌面点图标）\nadb shell monkey -p com.vendor.toolkit -c android.intent.category.LAUNCHER 1\n\n# 或者直接指定组件\nadb shell am start -n com.vendor.toolkit/.MainActivity"}</code></pre>
      <p><strong>能用 monkey / am start 拉起来，就一定不是「没装上」</strong>。这条判断能省下大量反复卸载重装的时间。</p>
      <p>如果第 2 条返回 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">No activity found</code>，又确认包里确实应该有个启动入口，那可能是被系统「优化」掉了：某些系统会禁用从未启动过的第三方应用的部分组件。此时可以用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm enable</code> 手动恢复：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm enable com.vendor.toolkit/.MainActivity"}</code></pre>
      <p>如果 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm enable</code> 报权限错误，说明没有 root 权限改不了，只能靠桌面手动「显示隐藏应用」或者换一个启动器验证。</p>
      <h2>六、九步定位流程</h2>
      <p>按顺序走，每一步排除一类可能：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>确认包真的装上了</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list packages | grep 包名</code>。没有 = 安装其实失败了，回到安装侧排查。</li>
        <li><strong>确认包名与版本</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages -f | grep 关键词</code> 拿到包名和路径、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dumpsys package</code> 看 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionName</code> 和 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">lastUpdateTime</code>。如果 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">lastUpdateTime</code> 是今天，说明你刚装的就是这个包。</li>
        <li><strong>确认有没有桌面入口</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">cmd package resolve-activity --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER &lt;包名&gt;</code>。没有 = 包本身不带图标。</li>
        <li><strong>试着直接启动</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell monkey -p &lt;包名&gt; -c android.intent.category.LAUNCHER 1</code>。能启动说明只差一个图标。</li>
        <li><strong>系统搜索验证</strong>：在桌面下拉搜索应用名。搜到了 = 启动器缓存或隐藏问题；搜不到 = 组件被禁用或装在别的用户空间。</li>
        <li><strong>检查多用户</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list users</code>，看是否有工作资料 / 第二空间。</li>
        <li><strong>检查启动器隐藏与自动添加设置</strong>：长按桌面空白 → 桌面设置，逐项看「隐藏应用」「新应用添加到主屏」。</li>
        <li><strong>看日志确认有无启动失败</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb logcat -d -t 500 | grep -iE 'ActivityTaskManager|ActivityNotFound|Permission Denial'</code>。</li>
        <li><strong>兜底方案</strong>：以上都排查完仍无图标，就用工具包里的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm enable</code> 恢复组件，或者在桌面上手动新建快捷方式指向 Activities（部分启动器支持）。</li>
      </ol>
      <p>第 3 步是最节省时间的一步。90% 的「装了找不到」在第 3 步就能定性：要么入口不存在（包本身问题），要么入口存在（展示层问题）。</p>
      <h2>七、常见疑难：分体式应用与「库包装成主应用」</h2>
      <p>有一类情况特别容易让人误判：<strong>下载到的包根本不是主应用，而是它的一个组成部分</strong>。</p>
      <p>典型的例子：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Split APK</strong>（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apks</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apkm</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.xapk</code>）：一个应用被拆成 base + config，只有一个文件时可能只有配置包，没有 base。这种情况系统连包名都不会注册，通常报安装失败而不是「装了看不见」。</li>
        <li><strong>配套插件包</strong>：某些工具类应用把主界面放在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.vendor.toolkit.main</code>，把权限与后台服务放在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.vendor.toolkit</code>。后者没有 LAUNCHER Activity，装上后确实不会有图标，但主应用会检测到它并启用功能。</li>
        <li><strong>被改名或改包的「精简版」</strong>：部分第三方重打包版本为了不与官方版冲突，会把包名改成 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.vendor.toolkit.mod</code>，此时它会作为一个独立应用装在系统里——但桌面图标可能被故意去掉，只能通过其他应用唤起。</li>
      </ul>
      <p>判断方法很直接：看包的信息。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell dumpsys package com.vendor.toolkit | grep -E 'versionName|versionCode|firstInstallTime|lastUpdateTime|flags'\n# 如果能看到 \"[ ] hasCode=true\" 但没有 launchable activity，就属于「有代码无入口」"}</code></pre>
      <p>更省事的办法是从一开始就下对包。在 [[gptoapk]] 的应用页面，通常能看到每个版本对应的包名、体积和是否为完整包；下之前核对一下包名，能避免八成「装了看不见」的困惑。</p>
      <h2>八、卸载重装与数据保留的正确姿势</h2>
      <p>确认要重装时，注意两件事：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>卸载会清空应用数据</strong>。如果里面有登录态或本地内容，先用系统备份或 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb backup</code> 保留（注意：Android 12 起 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb backup</code> 对大部分应用已不可用，实际能备份的很少，更多应用需要靠自身的云同步）。</li>
        <li><strong>同名包残留会导致再装失败</strong>。卸载后用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages | grep 包名</code> 确认真的干净了，再装：</li>
      </ol>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb uninstall com.vendor.toolkit\nadb shell pm list packages | grep com.vendor.toolkit   # 应该没有输出\nadb install -r app.apk\nadb shell cmd package resolve-activity --brief \\\n  -a android.intent.action.MAIN -c android.intent.category.LAUNCHER com.vendor.toolkit"}</code></pre>
      <p>第三条命令有输出，就说明这次装上后有可以点的入口了。</p>
      <h2>九、FAQ</h2>
      <p><strong>Q1：安装器提示「应用已安装」，为什么桌面什么都没有？</strong> 最可能是包名与你已装的某个应用相同，系统把它当升级处理了，而新版本没有 LAUNCHER 入口或改了入口名称。用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages -f</code> 确认包名，再用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">resolve-activity</code> 确认有没有启动组件。</p>
      <p><strong>Q2：设置里的应用列表能看到，桌面和抽屉却搜不到？</strong> 说明包和入口都正常，是启动器的显示层问题：被「隐藏应用」、缓存没刷新，或者装在了别的用户空间。</p>
      <p><strong>Q3：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">resolve-activity</code> 返回 No activity found 是不是包坏了？</strong> 不一定。很多配套包、插件包、库包本来就没有桌面入口。它们是给主应用用的，不会出现在桌面。</p>
      <p><strong>Q4：能直接启动就说明装好了吗？</strong> 是的。<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">am start</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">monkey</code> 能拉起，说明包、入口、权限都完整，只是你在桌面上找不到入口而已。</p>
      <p><strong>Q5：重启手机后图标出现了，是什么原理？</strong> 启动器在开机时重建索引，会重新扫描所有包并生成图标。这说明你遇到的是启动器缓存问题，不是安装问题。</p>
      <p><strong>Q6：工作资料里的应用，主桌面一定看不到吗？</strong> 默认看不到。工作资料是独立用户空间（通常 userId=10），主用户的桌面只会列出主空间的应用。</p>
      <p><strong>Q7：为什么装了两个同名应用，只有一个图标？</strong> 同名包在同一个用户空间只能存在一个。如果你看到两个图标，通常是包名不同（例如 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.app</code> 和 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.app.pro</code>），或者是分身工具克隆的副本。</p>
      <p><strong>Q8：卸载重装能解决吗？</strong> 能解决大多数「覆盖残留」和「组件被禁用」的情况，但会丢数据。重装前先确认包名，重装后用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">resolve-activity</code> 再验一次。</p>
      <p><strong>Q9：有没有办法手动创建桌面快捷方式？</strong> 部分启动器 / 桌面支持「添加小组件 → 活动」入口，可以直接指向某个 Activity。也可以用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">am start</code> 配合第三方快捷方式工具。</p>
      <p><strong>Q10：怎么从一开始就避免这类问题？</strong> 从标注了包名、版本、体积的页面下载完整包（例如 gptoapk.com 的应用页），安装前用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump badging</code> 或页面信息核对包名，安装后用一次 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">resolve-activity</code> 验收。</p>
      <h2>十、相关阅读</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><Link href="/zh/blog/apk-signature-mismatch-install-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名不匹配无法安装的解决</Link> — 覆盖安装被拒的另一条路</li>
        <li><Link href="/zh/blog/apk-downloaded-file-is-html-not-apk-diagnosis" className="text-blue-600 dark:text-blue-400 hover:underline">下载到的其实不是 APK 的取证排查</Link> — 从魔数与响应头判断文件真假</li>
        <li><Link href="/zh/blog/apk-post-install-48-hour-audit" className="text-blue-600 dark:text-blue-400 hover:underline">APK 安装后 48 小时审计</Link> — 装上之后的观察清单</li>
        <li><Link href="/zh/blog/android-apk-app-migration-guide" className="text-blue-600 dark:text-blue-400 hover:underline">APK 应用迁移：把数据一起搬过去</Link> — 卸载重装前先把数据安排好</li>
        <li><Link href="/zh/blog/how-to-install-split-apks-on-android" className="text-blue-600 dark:text-blue-400 hover:underline">Split APK 安装指南</Link> — 分体式应用为什么只有一部分</li>
        <li>[[gptoapk]] — 按包名、版本与体积核对后再下载</li>
      </ul>
  </>
);

export const zhPosts20261127A = [
  {
    slug: "apk-installed-but-no-app-icon-visible",
    title: "APK 装完了，应用列表里却找不到？从包名冲突、桌面隐藏到桌面启动器行为的完整排查",
    description: "安装器明确提示「已安装」，回到桌面却怎么都找不到图标；搜索不到、设置里也翻不出来。这不是安装失败，而是「装了但看不见」。本文按应用身份（包名 / userId / 用户空间）、桌面与启动器行为（图标被隐藏、桌面缓存、抽屉模式、国产 ROM 优化清理）、启动 Activity 缺失三条主线排查，给出 pm list / pm path / dumpsys package / cmd package resolve-activity / adb shell monkey 的具体命令，附症状对照表、九步定位流程与 10 条 FAQ。",
    date: "2026-11-27",
    readTime: "14 min read",
    tags: ["应用图标消失", "包名冲突", "启动器", "侧载APK", "adb"],
    content: ARTICLE_A,
  },
];

export const zhPosts20261127AList = toList(zhPosts20261127A);


const ARTICLE_B = (
  <>
      <p>这个场景几乎每个玩侧载的人都遇到过：手机上显示版本 8.2.1，你手上这个 APK 打开一看也是 8.2.1，但一点安装，系统弹出「是否覆盖安装」——还附带一句「可能会丢失数据」。你犹豫了：明明版本一样，为什么要覆盖？覆盖之后账号、存档、离线内容还在吗？</p>
      <p>更让人困惑的是另一种版本：装的时候直接报「应用未安装」，没有任何原因。同一个包，换台手机就能装。</p>
      <p>这两件事的答案都藏在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionCode</code> 与 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionName</code> 的区别，以及 PackageManager 的几条硬规则里。这篇把它们讲透，并给出「同版本重装」「降级安装」「保留数据」的具体做法。</p>
      <p>&gt; 如果报错是 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>（签名不一致），那是另一个分支，见 <Link href="/zh/blog/apk-signature-mismatch-install-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名不匹配无法安装的解决</Link>；如果是装完找不到图标，见 <Link href="/zh/blog/apk-installed-but-no-app-icon-visible" className="text-blue-600 dark:text-blue-400 hover:underline">装完应用列表里找不到的排查</Link>。</p>
      <h2>一、先分清四个概念，别被「版本号」骗了</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">概念</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">在清单里</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">人看得懂吗</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">谁在用</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionName</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">&lt;manifest android:versionName=&quot;8.2.1&quot;&gt;</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">是，给人看的展示串</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">用户、应用商店页面</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionCode</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">&lt;manifest android:versionCode=&quot;82014&quot;&gt;</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">否，纯整数</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>系统判定升级 / 降级的唯一依据</strong></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android:versionCodeMajor</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">少见，配合 versionCode 组成 64 位</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">否</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Android 9+ 的长版本号机制</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">签名证书</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">META-INF/*</code> 或 APK Signing Block</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">否</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">系统判定「是不是同一个应用」</td></tr></tbody>
      </table></div>
      <p>关键只有一句话：<strong>系统永不比较 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionName</code>，只比较 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionCode</code></strong>。</p>
      <p>所以你看到的「都是 8.2.1」可能对应 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">82010</code>（官方 Play 版）和 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">82014</code>（官网渠道版）——它们在商店页面上长得一模一样，在系统眼里一个是 8.2.1.0，一个是 8.2.1.4。装后者就是升级，正常；装前者就是降级，被拒。</p>
      <p>这也解释了为什么「同版本」也会触发覆盖安装提示：<strong>系统只知道 versionCode 更高或相等时可以直接覆盖，它并不关心你觉得版本号一样不一样</strong>。</p>
      <p>想确认一个包的真实版本，不要看文件名，直接问包本身：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 读 APK 的包名、versionCode、versionName、targetSdk、标签\naapt dump badging app.apk | grep -E \"package:|sdkVersion|application-label\"\n\n# 输出示例：\n# package: name='com.vendor.toolkit' versionCode='82014' versionName='8.2.1' ...\n# sdkVersion:'24' targetSdkVersion:'34'\n# application-label:'Toolkit'"}</code></pre>
      <p>一条命令就能看出「8.2.1」下面挂的是哪个 versionCode。</p>
      <h2>二、PackageManager 的四条硬规则</h2>
      <p>安装一个已经存在的包时，系统按顺序检查下面四件事，任何一条不过就失败：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>包名相同 = 同一个应用</strong>。同名包只有一个版本，装新的就是替换旧的，不存在「并存」。</li>
        <li><strong>签名必须一致</strong>。新包的签名证书必须与已装的完全一致（字节级比较），否则报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>。这是防篡改的核心机制，不存在「忽略签名」的选项。</li>
        <li><strong>versionCode 不能低于已装版本</strong>，除非显式允许降级（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install -d</code>，或 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm install --downgrade</code>）。降级被拒时的报错是 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_VERSION_DOWNGRADE</code>。</li>
        <li><strong>targetSdk / minSdk 必须与当前系统兼容</strong>。minSdk 高于系统版本时直接 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_OLDER_SDK</code>。</li>
      </ol>
      <p>另外还有一条容易被忽略的：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>降级安装默认会保留数据，但数据结构可能不兼容</strong>。这正是安装器提示「可能会丢失数据」的原因。详见第六节。</li>
      </ol>
      <p>把这五条记住，几乎所有「为什么装不上」都能立刻定性。</p>
      <h2>三、为什么会弹出「覆盖安装、可能丢失数据」</h2>
      <p>安装器弹这个提示，实质是在说两件事之一：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>这是<strong>降级</strong>（versionCode 更低），系统允许但你得自己承担数据兼容风险；</li>
        <li>这是<strong>同 versionCode 的替换</strong>，系统认为要重装，于是按「覆盖」处理。</li>
      </ul>
      <p>大部分用户看到的「同版本还要覆盖」，属于第二种。而它之所以会发生，通常是下面几种情况之一：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">情况</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">表现</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">判断方法</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">两个渠道包 versionCode 不同</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">商店里都显示 8.2.1</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump badging</code> 对比两个包的 versionCode</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">显示版本号保留位数不同</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">一个写 8.2，一个写 8.2.1</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">同上，对比完整 versionName</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">之前从别的渠道装过，本次是同版本换源</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包名一致、versionCode 一致或相近</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dumpsys package</code> 看 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">firstInstallTime</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">本身就是降级（想回到稳定版）</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">安装器明示「版本更旧」</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">对比 versionCode 大小</td></tr></tbody>
      </table></div>
      <p><strong>判断一次安装是升级、同级替换还是降级，只需要三个数字：已装 versionCode、待装 versionCode、是否同签名。</strong></p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 已装版本\nadb shell dumpsys package com.vendor.toolkit | grep -E 'versionCode|versionName|lastUpdateTime'\n\n# 待装版本\naapt dump badging app.apk | grep \"package:\""}</code></pre>
      <h2>四、同版本覆盖安装，安全吗？</h2>
      <p>安全性分两层：<strong>会不会丢数据</strong>、<strong>会不会出功能问题</strong>。</p>
      <h3>数据层</h3>
      <p>覆盖安装（同 versionCode 或升级）<strong>默认不删应用数据</strong>。<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/data/&lt;包名&gt;/</code> 下的数据库、Preferences、文件全部保留，登录态一般也在。唯一的风险是：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>旧版本写的数据库结构，新版本做了迁移，降级回去时读到「未来版本」的结构会崩；</li>
        <li>升级过程中断（空间不足、断电），可能留下半个包——但系统有回滚机制，通常不会毁数据。</li>
      </ul>
      <p>所以正常情况下的覆盖安装是安全的。<strong>真正危险的是「卸载再装」</strong>，那才会清空 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/data/</code>。</p>
      <h3>功能层</h3>
      <p>同 versionCode 换源安装，可能遇到两类小问题：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>签名不同 = 直接失败</strong>（第 2 条规则）。如果你原来装的是官方签名版，现在下的是被重打包过的版本，一定装不上，这不是 bug。</li>
        <li><strong>渠道配置被换掉</strong>。某些应用把渠道号打进包里，换源后可能变成另一个渠道的账号体系或激活状态。表现是「登录掉了」「要重新激活」。</li>
      </ol>
      <h3>什么时候「覆盖安装」是必要的</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>升级到新版本（常规场景）；</li>
        <li>修复安装损坏（包被截断、组件状态异常）；</li>
        <li>从非官方渠道切换回官方（前提是签名一致）。</li>
      </ul>
      <h3>什么时候「覆盖安装」是多余的</h3>
      <p>如果你只是想确认版本，或者只是习惯了「重装一遍」，同版本覆盖几乎是白折腾，还可能引入渠道错乱。<strong>真正需要动手的信号只有两个：功能异常且无法通过清缓存解决，或者要切换到另一个来源。</strong></p>
      <h2>五、手动装同版本的正确命令</h2>
      <p>用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install</code> 是最可控的方式，它会把具体的失败原因打出来，不像手机安装器那样只给一句「应用未安装」。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 1) 最基础的安装（同版本或升级）\nadb install -r app.apk\n\n# 2) 允许降级安装（会保留数据，但有兼容风险）\nadb install -r -d app.apk\n\n# 3) 装到指定用户空间（例如工作资料 user 10）\nadb install --user 10 -r app.apk\n\n# 4) 想彻底干净（先卸载再装，会丢数据）\nadb uninstall com.vendor.toolkit && adb install app.apk\n\n# 5) 分体式应用：多个 APK 一起装\nadb install-multi-package base.apk config.arm64_v8a.apk config.zh.apk\n\n# 6) 看安装失败的真实原因\nadb install -r app.apk 2>&1"}</code></pre>
      <p>要点说明：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code> 是「替换已有包」，同版本安装必须带上；</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> 是允许降级，只在确实要降级时才加，因为它会跳过版本检查；</li>
        <li>多个 APK 一起装用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">install-multi-package</code>（Android 9+ 的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb</code> 支持），也可以用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install-multiple</code>；</li>
        <li>报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> 时不要试图加参数绕过——签名不一致无法绕过，只能卸载旧包（会丢数据）或换回同签名的包。</li>
      </ul>
      <p>如果 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb</code> 不可用（比如手里只有手机），可以在手机上用一款支持「允许降级」的包安装器，或者在开发者选项里配合 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm</code> 命令。但最稳的还是电脑 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb</code>。</p>
      <h2>六、降级安装：什么时候能用，什么时候会炸</h2>
      <p>降级是「versionCode 更低」的安装。默认被系统拒绝，需要 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--downgrade</code> 显式允许。</p>
      <p><strong>降级安全的前提是：新版本没有升级数据结构。</strong></p>
      <p>举个具体例子：某个应用在 8.3.0 里把 SQLite 表加了一列并写了迁移脚本，你降级回 8.2.1 后，旧代码打开这个数据库，遇到不认识的列或 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">user_version</code> 不匹配，行为有两种——静默忽略，或者直接崩溃。后者就是你看到的「降级后一开就闪退」。</p>
      <p>所以降级前必须做一件事：<strong>确认这个版本之间有没有数据结构变更</strong>。这个信息通常只有开发者知道，对用户来说，最实用的经验是：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>降级<strong>相邻一个小版本</strong>（例如 8.3.0 → 8.2.1）风险中等；</li>
        <li>跨大版本降级（8.x → 7.x）风险很高，通常需要清数据才能运行；</li>
        <li>如果降级后闪退，先别急着重装，试试清应用数据的「缓存」部分，不行再清全部数据。</li>
      </ul>
      <p><strong>降级前一定要备份</strong>。Android 12 之后 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb backup</code> 对大多数应用已无效，能用的备份手段是：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 1) 应用自带的导出 / 备份功能（最可靠）\n# 2) 云同步（登录后数据在服务端）\n# 3) 如果是游戏存档，尝试 adb shell run-as <包名> 读取（仅 debuggable 包有效）\nadb shell run-as com.vendor.toolkit ls -la /data/data/com.vendor.toolkit/\n# 4) root 设备可用 tar 备份整个数据目录\nadb shell su -c \"tar czf /sdcard/app-data.tgz /data/data/com.vendor.toolkit\""}</code></pre>
      <p>对于大多数不 root 的用户，第 1、2 条才是可行的。<strong>如果应用没有导出功能、也没有云同步，那降级的代价就是「可能丢全部本地数据」</strong>——这个判断要在动手之前做完。</p>
      <h2>七、六步流程：从「装不上」到「装对了」</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>读两个包的真实身份</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump badging</code> 看待装包的包名、versionCode、versionName；<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dumpsys package</code> 看已装包的同三项。这一步决定了这是升级、同级替换还是降级。</li>
        <li><strong>比对签名</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner verify --print-certs app.apk</code> 对比两边的证书指纹。不一致的话，后面所有步骤都白做。</li>
        <li><strong>判断风险</strong>：同级或升级 → 直接装；降级 → 先确认数据备份情况。</li>
        <li><strong>用 adb 装，不要用手机安装器</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install -r</code> 或 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install -r -d</code>，把失败原因读出来。</li>
        <li><strong>验收</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell cmd package resolve-activity</code> 确认入口存在，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell am start</code> 确认能启动，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb logcat -d | grep -i crash</code> 确认没有启动崩溃。</li>
        <li><strong>判断要不要回滚</strong>：如果降级后功能异常，参考 <Link href="/zh/blog/apk-update-crash-rollback-playbook" className="text-blue-600 dark:text-blue-400 hover:underline">侧载 APK 更新后闪退的回滚手册</Link>，先试清缓存，再考虑整体回退。</li>
      </ol>
      <p>这套流程的核心思想只有一条：<strong>永远用能给出具体错误的那条路径去安装</strong>。手机安装器的「应用未安装」是一个聚合后的结果，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb</code> 的原生错误码才是线索。</p>
      <h2>八、错误码速查表</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">报错</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">原因</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">处理</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_ALREADY_EXISTS</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包已存在且没加 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">加 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">签名不一致</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换同签名包，或卸载旧包（丢数据）</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_VERSION_DOWNGRADE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">降级且未允许</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">确认备份后加 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_OLDER_SDK</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">minSdk 高于系统</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换低版本包，无法绕过</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_INSUFFICIENT_STORAGE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">空间不足</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">清理空间，注意安装需要约 2 倍包的临时空间</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_INVALID_APK</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包结构不完整</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">重新下载，参考 <Link href="/zh/blog/apk-downloaded-file-is-html-not-apk-diagnosis" className="text-blue-600 dark:text-blue-400 hover:underline">坏包取证排查</Link></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_TEST_ONLY</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包带 testOnly 标记</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install -t</code> 可以装，但不建议长期使用</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_NO_MATCHING_ABIS</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">CPU 架构不匹配</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">装对应架构的分体包</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_PARSE_FAILED_NO_CERTIFICATES</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">缺签名或签名被破坏</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换官方原包</td></tr></tbody>
      </table></div>
      <p>这张表能覆盖 90% 的侧载安装失败。剩下的 10% 请把完整输出贴出来再查。</p>
      <h2>九、FAQ</h2>
      <p><strong>Q1：版本号显示一样，为什么还要覆盖安装？</strong> 因为系统看的是 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionCode</code>，不是展示用的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionName</code>。两个渠道的 8.2.1 可能分别是 82010 和 82014，系统只知道它们不一样。</p>
      <p><strong>Q2：同版本覆盖安装会丢数据吗？</strong> 不会。覆盖安装（升级或同级替换）保留应用数据。会丢数据的是「先卸载再安装」。</p>
      <p><strong>Q3：覆盖安装失败了，会不会把原来的应用弄坏？</strong> 通常不会，失败时系统保留原安装。但极少数情况（安装中断）可能留下不完整状态，这时用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install -r</code> 再装一次通常能修复。</p>
      <p><strong>Q4：能不能强制装低版本，让数据保留？</strong> 可以用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install -r -d</code>，数据会保留，但新版本改过的数据库结构可能与旧代码不兼容，导致闪退。备份后再试。</p>
      <p><strong>Q5：为什么从官方改为第三方包会报签名冲突？</strong> 第三方包用不同证书签名，系统凭证书判断「这是不是同一个应用」。签名不一致就无法覆盖，只能卸载重装。</p>
      <p><strong>Q6：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> 和 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--allow-downgrade</code> 是一回事吗？</strong> 在不同 adb 版本里参数名有差异，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> 是通用写法。老版本 adb 用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code>，Android 9+ 的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm install</code> 用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--downgrade</code> 或 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--force-sdk</code> 等组合。</p>
      <p><strong>Q7：同一个 APK，这台手机装得上另一台装不上？</strong> 常见原因是目标设备的 Android 版本低于 minSdk、CPU 架构不匹配（分体包）、或该设备上已装同名包但签名不同。</p>
      <p><strong>Q8：安装器提示「会丢失数据」但我点了继续，为什么数据还在？</strong> 因为是同签名覆盖安装，数据目录没被触碰。提示是通用文案，不是必然发生。</p>
      <p><strong>Q9：分体式应用怎么处理版本冲突？</strong> 分体包的每个部分 versionCode 必须一致，安装时用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">install-multi-package</code> 一起装；只装其中一个 config 包会失败。</p>
      <p><strong>Q10：怎么能不折腾？</strong> 从标注了包名、versionCode、体积的页面下载（例如 gptoapk.com 应用页），装之前先用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump badging</code> 核对一次，装完用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">am start</code> 验收。</p>
      <h2>十、相关阅读</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><Link href="/zh/blog/apk-signature-mismatch-install-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名不匹配无法安装的解决</Link> — 证书不一致的完整处理</li>
        <li><Link href="/zh/blog/apk-installed-but-no-app-icon-visible" className="text-blue-600 dark:text-blue-400 hover:underline">装完应用列表里找不到的排查</Link> — 装上了但没图标</li>
        <li><Link href="/zh/blog/apk-update-crash-rollback-playbook" className="text-blue-600 dark:text-blue-400 hover:underline">侧载 APK 更新后闪退的回滚手册</Link> — 降级后的应急处理</li>
        <li><Link href="/zh/blog/apk-upgrade-data-preservation" className="text-blue-600 dark:text-blue-400 hover:underline">覆盖升级数据保留方案</Link> — 换包如何不丢账号</li>
        <li><Link href="/zh/blog/apk-downloaded-file-is-html-not-apk-diagnosis" className="text-blue-600 dark:text-blue-400 hover:underline">下载到的其实不是 APK 的取证排查</Link> — 包本身有问题时先验文件</li>
        <li>[[gptoapk]] — 按包名与 versionCode 核对版本</li>
      </ul>
  </>
);

export const zhPosts20261127B = [
  {
    slug: "apk-same-version-reinstall-versioncode-explain",
    title: "APK「已经装了」却非要覆盖安装？版本号与 versionCode 的坑与手动装同版本的完整方案",
    description: "你手机上已经是 8.2.1，手里下载的也是 8.2.1，可安装器偏要「覆盖安装」并提示可能丢数据，或者干脆报「应用未安装」。这背后是 versionCode 比较、签名校验、降级限制与渠道包差异。本文讲清 PackageManager 的版本判定规则、什么时候覆盖安装是安全的、如何在不丢数据的前提下强制装同版本或降级，附 aapt / dumpsys / adb install 参数表、六步流程与 10 条 FAQ。",
    date: "2026-11-27",
    readTime: "14 min read",
    tags: ["覆盖安装", "versionCode", "降级安装", "侧载APK", "adb"],
    content: ARTICLE_B,
  },
];

export const zhPosts20261127BList = toList(zhPosts20261127B);
