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
      <p>安装进度条走完、系统弹了「应用已安装」，回到桌面却怎么也找不到图标——这类反馈很容易被当成安装失败，于是反复重下、重装。其实包大概率已经躺在系统里了，真正的问题往往出在<strong>启动入口</strong>或者<strong>安装所在的空间</strong>：应用没有可供桌面启动的 Activity，或者它被装进了工作资料、多用户、双开空间这类平时看不见的分区。</p>
      <p>先把几种情况分开再动手，能省掉大量无效重装。</p>
      <h2>先分清四种「找不到」</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">现象</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">实际状态</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">最快的判断方式</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">设置里的应用管理也搜不到</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包根本没装进去</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm path 包名</code> 无输出</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用管理能搜到，桌面和抽屉里没有</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">装好了，但没有可见的启动入口</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell cmd package resolve-activity --brief 包名</code> 无结果</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用管理能搜到，切到另一个空间才看得到</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">装到了别的用户或资料下</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list users</code> 有多个用户，或系统里有「工作资料」「私人空间」标签</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">之前有图标，某次更新后消失</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">被禁用、被隐藏，或桌面缓存没刷新</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list packages -d</code> 里出现该包名</td></tr></tbody>
      </table></div>
      <p>这四种里，只有第一种需要重新下载安装。剩下三种，重装十次也不会长出图标。</p>
      <h2>第一层：确认包到底在不在</h2>
      <p>别用肉眼找，先问系统。电脑上连上 adb 后：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm path com.example.app"}</code></pre>
      <p>返回一串 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/.../base.apk</code> 就说明安装成功，包名也确认了；没有任何输出或报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Error: package not found</code>，才是真的没装进去。</p>
      <p>如果包名不确定，先列出来再肉眼扫：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages -3"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-3</code> 只列第三方应用，比全量列表短得多。系统设置里也可以走「应用管理 → 显示全部 / 显示系统应用」，搜索应用名或版本号。</p>
      <p><strong>只有这一层失败时，才回头看下载环节</strong>：包是否完整、签名是否一致、有没有装到一半被系统回滚。这类问题的排查顺序见 <a href="https://www.gptoapk.com/zh/blog/apk-link-403-404-retry-checklist" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">APK 下载链接 403、404 与中途失效排查</a> 和 <a href="https://www.gptoapk.com/zh/blog/zhuang-anzhuo-apk-xiazai-hou-an-zhuang-quan-liucheng-jiancha-qingdan" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">安装全流程检查清单</a>。</p>
      <h2>第二层：这个包有没有桌面入口</h2>
      <p>Android 的桌面图标不是「装了应用就自动生成」的。系统靠 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">AndroidManifest.xml</code> 里带 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android.intent.action.MAIN</code> 和 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android.intent.category.LAUNCHER</code> 的 Activity 来决定要不要给一个应用画图标。少了这个声明，应用装得再成功也不会出现在应用抽屉里。</p>
      <p>用系统自己的解析器验证：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell cmd package resolve-activity --brief com.example.app"}</code></pre>
      <p>有结果会打印出包名加 Activity 类名；返回 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">no result</code> 或为空，就是这个包没有可启动的主 Activity。</p>
      <p>常见的「本来就没有图标」的应用类型：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>输入法、壁纸服务、无障碍服务、通知监听器等<strong>纯服务型应用</strong>，入口藏在系统设置里；</li>
        <li>插件、扩展包、字体包、数据表，必须依附宿主应用才能用；</li>
        <li>某些只提供 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">content provider</code> 或广播接收器的组件包；</li>
        <li>被拆分的 split APK 中只装了 base、缺了承载界面的 feature 模块，此时设置里能搜到，但启动即失败。</li>
      </ul>
      <p>这类情况去「设置 → 键盘与输入法」「无障碍」「壁纸」里找开关，而不是继续找图标。输入法装完不显示图标是完全正常的行为。</p>
      <p>顺带说一句：<strong>侧载 APK 后无障碍权限开关置灰</strong>是另一回事，那是 Android 13 起的受限设置策略，属于权限层面而不是入口层面，解法见 <a href="https://www.gptoapk.com/zh/blog/apk-accessibility-grayed-out-fix" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">侧载 APK 无障碍权限置灰</a>。</p>
      <h2>第三层：装到哪个空间去了</h2>
      <p>同一台手机上可以同时存在多个「用户」，每个用户有独立的应用列表和桌面。工作资料、访客模式、私人空间、应用双开，本质上都是这个机制的封装。装在主用户里的包，在工作资料的抽屉里当然看不到，反之亦然。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list users\nadb shell pm list packages --user 0\nadb shell pm list packages --user 10"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--user 10</code> 这种数字 ID 通常对应工作资料。如果包只出现在某一个 user 下，切到对应空间去找即可。</p>
      <p>各品牌的入口名字不统一，按下面这张表对号入座：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">品牌 / 系统</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">可能藏起应用的功能</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">检查路径</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">小米 / HyperOS</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用锁、隐藏应用、双开空间、隐私空间</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">设置 → 应用设置 → 应用锁 / 隐私保护</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">OPPO / ColorOS、一加</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用隐藏、私密保险箱、应用分身</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">设置 → 权限与隐私 → 应用隐藏</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">vivo / OriginOS</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">原子隐私系统、应用分身</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">设置 → 原子隐私系统</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">三星 One UI</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">安全文件夹、隐藏应用程序</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">主屏幕设置 → 隐藏应用；或安全文件夹内查找</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">原生 Android / Pixel</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">工作资料、私人空间（Android 15+）、访客</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用抽屉顶部的「工作」标签；设置 → 系统 → 多用户</td></tr></tbody>
      </table></div>
      <p>一个很常见的场景是：用「工作资料」里的文件管理器点开了 APK，安装就发生在工作资料里，回到个人桌面自然找不到。这时不需要重装，只需要在正确的空间里打开它，或者把 APK 复制回主用户再装一次。</p>
      <h2>第四层：桌面自己把它藏了</h2>
      <p>包在、入口在、用户也对，那就是桌面（Launcher）这一层的问题：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>抽屉搜索试一次</strong>：在应用抽屉顶部搜索应用名。搜得到但图标没显示，说明图标缓存或图标包出了问题；</li>
        <li><strong>换一个桌面验证</strong>：临时装一个第三方 Launcher 或切回系统默认桌面，图标出现就说明是原桌面的数据问题；</li>
        <li><strong>清桌面数据</strong>：设置 → 应用管理 → 桌面应用 → 清除缓存（注意清除数据会重置桌面布局，先截图留档）；</li>
        <li><strong>检查隐藏应用列表</strong>：很多桌面有「隐藏应用」白名单，手滑勾上就会从抽屉消失；</li>
        <li><strong>图标包</strong>：换了图标包后对新装应用没有对应图标资源，有些桌面会直接不显示，停用图标包即可。</li>
      </ul>
      <h2>第五层：被禁用或策略隐藏</h2>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages -d</code> 列出的是被禁用的包：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages -d"}</code></pre>
      <p>如果目标包在列表里，用下面这条恢复：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm enable com.example.app"}</code></pre>
      <p>常见触发原因有：设备管理器 / 企业 MDM 策略、家长控制、系统「深度休眠」或「自动禁用长期未使用应用」（Android 12+ 部分厂商）、以及之前手动停用后忘了。恢复之后再回桌面看一眼，图标通常会立刻回来。</p>
      <h2>什么时候该警惕，而不是继续找</h2>
      <p>找不到图标，却伴随下面这些迹象，就不要再折腾入口了：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>手机耗电明显异常、后台流量持续产生，但应用管理里这个包名你没印象；</li>
        <li>它申请了无障碍、通知读取、短信、悬浮窗等高危权限；</li>
        <li>安装来源不是你主动选择的可信站点。</li>
      </ul>
      <p>无图标 + 后台常驻，正是恶意包最典型的形态之一——它本来就不需要让你点开。此时直接卸载：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm uninstall com.example.app"}</code></pre>
      <p>装之前做一次签名和权限核对，比事后排查便宜得多，方法见 <a href="https://www.gptoapk.com/zh/blog/apk-signature-verification-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">APK 签名校验</a>。如果已经出现装完就掉电、后台唤醒不断的情况，可以按 <a href="https://www.gptoapk.com/zh/blog/apk-install-battery-drain-diagnosis" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">安装后耗电异常排查</a> 定位具体是哪一类行为。</p>
      <h2>一句话决策清单</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm path</code> 无输出 → 真没装，回到下载与校验环节。</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">resolve-activity</code> 无结果 → 应用本来就没有桌面入口，去系统设置里找开关。</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list users</code> 有多个用户 → 切到工作资料 / 私人空间 / 分身里找。</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages -d</code> 里有它 → <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm enable</code> 恢复。</li>
        <li>抽屉搜得到、图标不显示 → 清桌面缓存或换图标包。</li>
        <li>以上都正常却伴随异常耗电和流量 → 直接卸载，别再找图标。</li>
      </ul>
      <p><strong>顺序很重要</strong>：从「包在不在」开始，而不是从「重装一遍」开始。绝大多数「装完没图标」都不是安装失败，而是入口、空间或桌面显示这三层里的某一层出了偏差。</p>
  </>
);

export const zhPosts20261116G = [
  {
    slug: "apk-installed-no-app-icon-launcher",
    title: "APK 装完了桌面却找不到图标：从 Launcher 入口到工作资料的逐层排查",
    description: "安装提示「应用已安装」，桌面和应用抽屉里却找不到图标，不等于没装成功。本文用 pm path、resolve-activity 等命令区分「没装」「装了但没有启动入口」「装到了另一个用户空间」三种情况，并给出各品牌隐藏应用、应用锁、双开空间的检查路径。",
    date: "2026-11-16",
    readTime: "7 min read",
    tags: ["APK安装","桌面图标","Launcher","工作资料","故障排查","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261116GList = toList(zhPosts20261116G);
