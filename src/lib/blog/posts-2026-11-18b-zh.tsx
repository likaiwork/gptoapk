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
      <p>「存储空间不足」是 Android 上最没信息量的提示之一。你点进设置删了七八个 App，发现只多出 1.2 GB，而系统还差 3 GB。原因是删 App 只清掉了一部分：<strong>安装包、缓存、OBB 数据包、日志和系统预留空间分散在完全不同的目录</strong>，前四类里有三类不会被「卸载」处理干净，尤其是从浏览器或第三方站点手动装过 APK 的设备。</p>
      <p>正确的做法是先按体积排序找到真凶，再按类型清理，而不是随机删 App。</p>
      <h2>先搞清楚空间被谁吃了</h2>
      <p>Android 的存储面板（设置 → 存储）会给出分类统计，但颗粒度很粗。要看真实占用，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">du</code> 按体积排序：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell du -h -d 1 /sdcard/`}</code></pre>
      <p>这个命令列出内部存储根下每个目录的大小。常见的几个大头：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">目录</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">内容</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">能否直接删</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Download</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">手动下载的 APK、安装包、文档</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">可以</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/obb</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">大型游戏的数据包</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">谨慎，删了游戏要重下</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/data</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App 的外部数据（缓存常驻此）</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">可以，但会丢离线内容</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/DCIM</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/Pictures</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">照片视频</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">先备份</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Telegram</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/WeChat</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用自己的媒体目录</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">可以，但会丢聊天图片</td></tr></tbody>
      </table></div>
      <p>再往下钻一层找「突然变大」的目录：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell du -h -d 2 /sdcard/ | sort -hr | head -20`}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">sort -hr</code> 按人类可读体积排序，前 20 行基本就是全部问题所在。</p>
      <h2>第一类：堆在那里没人管的 APK 文件</h2>
      <p>从浏览器、微信、QQ 下载过的 APK 通常静静躺在 Download 目录，一个包 80–300 MB，攒一年能到 10 GB 以上。而且<strong>安装完 APK 不会自动删除</strong>，这是 Android 一直没改的设计。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# 找出所有大于 20MB 的 apk
adb shell find /sdcard -name "*.apk" -size +20M -exec ls -lh {} \\;`}</code></pre>
      <p>清理前有个实用建议：只保留你真正需要的版本。手动装 APK 的常见场景是「Play 商店版本更新后不好用，回退旧版」，那就把这一个包挪到别处留存，其余全删。要长期管理多个版本，不如记下包名和版本号（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump badging x.apk | head -2</code>），需要时重新下载。</p>
      <h2>第二类：缓存不是越清越好</h2>
      <p>清缓存能立刻见效，但代价是下次打开变慢、离线内容消失。哪些值得清：</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>视频/音乐类</strong>：缓存可能几十 GB，清掉只是下次重新流式加载，性价比最高；</li>
        <li><strong>地图类</strong>：离线地图属于「缓存」但其实是刚需，清了等于要重新下载城市包；</li>
        <li><strong>浏览器</strong>：清了会丢登录态和标签页，除非确实占太大；</li>
        <li><strong>IM 类</strong>：清缓存会删掉聊天里的图片视频原件，聊天记录本身还在但看不到了。</li>
      </ul>
      <p>系统自带的「清理加速」功能通常是按上面的逻辑盲剪，所以更稳妥的是逐个 App 进「存储」页，看「缓存」那一行具体多大，再决定。</p>
      <p>缓存还有一类藏在卸载残留里。卸载 App 后 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/data/&lt;包名&gt;</code> 有时会留下来，特别是卸载过程中断过。查一下：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell ls /sdcard/Android/data/`}</code></pre>
      <p>对照 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list packages</code> 的输出，把已经没有对应包名的目录删掉，安全且往往能回收好几个 GB。</p>
      <h2>第三类：OBB 数据包与旧版本残留</h2>
      <p>大型游戏（原神、PUBG 之类）把资源放在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/obb/&lt;包名&gt;/</code>，一个包 3–8 GB。这些文件<strong>在卸载游戏时不一定会被清掉</strong>，是典型的「删了游戏空间没回来」的原因。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell du -h -d 1 /sdcard/Android/obb/`}</code></pre>
      <p>包名对应的游戏已经不在设备上，就可以整目录删。注意不要在游戏还在用的时候删，否则启动会报资源缺失。</p>
      <p>还有一类不容易察觉的：系统更新留下的旧包、银行类 App 的多次安装副本、调试用的 test APK。这些在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app</code> 下面，普通用户看不到，用下面这个粗略检查：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell du -h -d 1 /data/app/ | sort -hr | head -10`}</code></pre>
      <h2>一步到位的清理顺序</h2>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">du -h -d 2 /sdcard/ | sort -hr | head -20</code> 找出体积前 20 的目录；</li>
        <li>清 Download 里的大 APK（保留要回退的那一个）；</li>
        <li>删 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/data</code> 下没有对应包名的残留目录；</li>
        <li>删 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/obb</code> 下已卸载游戏的目录；</li>
        <li>逐个 App 看缓存，优先清视频/音乐/浏览器；</li>
        <li>最后再考虑照片视频搬到电脑或云盘；</li>
        <li>完成后 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell df -h /data</code> 确认可用空间。</li>
      </ol>
      <p>如果你只是偶尔手动装 APK，其实更省事的长期方案是装完就删包——<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm install</code> 完成那一刻安装包就没用了。想保留旧版本以备回退的，把版本号和下载地址记在笔记里，比留着一个 200 MB 的文件更划算。</p>
  </>
);

export const zhPosts20261118B = [
  {
    slug: "android-storage-full-apk-cleanup",
    title: "手机提示空间不足，删了 App 还是不够：APK 残留与缓存该从哪查起",
    description: "卸载十几个 App 只释放几 GB，是因为 APK 包、应用缓存和 /data/app 残留还在。本文给出用 du、adb 和系统存储面板按体积排序定位真凶的步骤，并说明 .apk 文件、OBB 数据包、微信缓存三类的正确清理顺序。",
    date: "2026-11-18",
    readTime: "6 min read",
    tags: ["存储清理","APK残留","Android优化","缓存","空间不足","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261118BList = toList(zhPosts20261118B);
