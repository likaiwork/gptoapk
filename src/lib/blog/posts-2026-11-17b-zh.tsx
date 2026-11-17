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
      <p>先给一个反直觉的结论：<strong>APK 文件通常是所有文件里最不该慌的一种</strong>。照片删了没法重新生成，APK 删了，只要那个应用还在线、版本还没被下架，理论上你永远能再拿到一份字节完全相同的包。</p>
      <p>真正麻烦的不是「包没了」，而是两种情况：包被删了但<strong>应用还没装</strong>，或者你要恢复的是<strong>某个特定旧版本</strong>，官方早就下线了。这两种才是需要动脑子的时候。下面按场景拆。</p>
      <h2>三种场景，先对号入座</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">场景</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">你的真实需求</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">推荐路径</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用已安装，只是想留个安装包备份</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">从设备里把已装的包提取出来</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb pull</code>（100% 可用）</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">应用没装，包被删了</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">重新拿一份同版本或新版本</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">官方源/镜像站重下 + 校验</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">需要某个特定旧版本（已下线）</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">找回历史版本</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">第三方历史版本库 + 签名校验</td></tr></tbody>
      </table></div>
      <p>很多人第一反应是去装数据恢复软件，扫描手机存储找被删的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apk</code>。这条路在当前 Android 上基本走不通：手机闪存普遍开启 TRIM/丢弃指令，文件删除后物理块会被主动回收，恢复软件扫到的往往是零。<strong>第三方恢复只值得在 SD 卡或电脑硬盘上试</strong>，手机内部存储基本别抱希望。</p>
      <h2>路径一：从已安装的应用里提包（最可靠）</h2>
      <p>这是唯一不依赖任何外部资源的恢复方式。前提是应用还装在设备上，即使你删掉了安装包，系统里仍留着 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/.../base.apk</code>。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 1. 确认包名\nadb shell pm list packages | grep 关键词\n\n# 2. 拿到实际路径\nadb shell pm path com.example.app\n# 输出示例：package:/data/app/~~aBcD==/com.example.app-xYz==/base.apk\n\n# 3. 拉回电脑\nadb pull /data/app/~~aBcD==/com.example.app-xYz==/base.apk ./example.apk"}</code></pre>
      <p>分片安装的应用（Split APK / App Bundle）会有多个路径，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm path</code> 会输出多行 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">package:</code>。这种要整目录拉：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb pull /data/app/~~aBcD==/com.example.app-xYz==/ ./example-splits/"}</code></pre>
      <p>拉出来的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">base.apk</code> 加 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">split_*.apk</code> 一起，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install-multiple</code> 才能重新装上：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb install-multiple ./example-splits/*.apk"}</code></pre>
      <p>提取之前最好先看一眼这个包是不是真包，别把一个被篡改的包当宝贝备份起来：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump badging example.apk | head -3\napksigner verify --print-certs example.apk | head -5"}</code></pre>
      <h2>路径二：重下，然后和「已知指纹」比对</h2>
      <p>如果你之前记过版本号，或者能从另一台设备上看出装的是哪个版本，重下是最快的方式。关键是<strong>下完要校验</strong>，不然「恢复」回来的可能是个魔改包。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 从已装机的另一台设备读出真实版本号\nadb shell dumpsys package com.example.app | grep versionName\n\n# 重下后校验\nshasum -a 256 example.apk\napksigner verify example.apk && echo \"签名有效\""}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner verify</code> 通过只说明包自签名闭环，不代表是官方签发的。要判断官方与否，比签名证书摘要：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify --print-certs example.apk | grep SHA-256"}</code></pre>
      <p>把这个摘要和你在好设备上提取出来的包对比，一致才敢用。这一步很多人省掉了，结果是装了个同包名、同版本号、但签名不同的包——轻则无法覆盖安装，重则它就是恶意样本。</p>
      <h2>路径三：找历史版本，注意三个坑</h2>
      <p>旧版本下线之后，能拿到的地方只剩两类：官方的旧版本归档（少见），和第三方历史版本库（常见但需谨慎）。挑的时候盯三件事：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>版本号要与需求严格匹配</strong>，别被「最新版」标签糊弄；</li>
        <li><strong>文件大小量级合理</strong>，同一个包突然大了 3 倍或小了 90% 都不正常；</li>
        <li><strong>签名指纹与官方一致</strong>，这是唯一硬指标。</li>
      </ol>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 验签名是不是官方的那一个\napksigner verify --print-certs old-version.apk | grep -i \"SHA-256\""}</code></pre>
      <p>如果这个版本根本没有官方来源可对比，那就退一步：至少确认它能正常安装、装完在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell dumpsys package</code> 里权限清单与预期一致，不在启动时索取与功能无关的权限。</p>
      <h2>路径四：SD 卡/电脑端的文件恢复（仅限可移动介质）</h2>
      <p>只有当你删的是手机 SD 卡、U 盘、电脑硬盘上的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apk</code>，数据恢复软件才有意义。原则是<strong>立即停止写入</strong>，然后扫描：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# macOS 上先用 dd 做一份镜像，再在镜像上扫描，避免二次破坏\nsudo dd if=/dev/disk4 of=./sdcard.img bs=4m"}</code></pre>
      <p>扫描镜像而不是扫原盘，是为了保留原始状态可重试。如果原盘还在持续写入，恢复成功率会随时间快速下降。</p>
      <h2>防下一次：把备份做成习惯</h2>
      <p>APK 丢了再找，总归是补救。更省事的做法是建立一个可检索的安装包目录：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"mkdir -p ~/apk-backup\n# 每次拉到包后顺手记录来源和时间\necho \"$(date +%F) com.example.app 1.2.3 gptoapk\" >> ~/apk-backup/index.txt"}</code></pre>
      <p>配合定期把已装应用的包批量提取出来，就再也不用担心「清理软件把安装包删了」这种事了：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"for p in $(adb shell pm list packages -3 | sed 's/package://'); do\n  adb shell pm path \"$p\" | sed 's/package://' | while read -r f; do\n    adb pull \"$f\" ~/apk-backup/ 2>/dev/null\n  done\ndone"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-3</code> 只列第三方应用，避开了系统包，省时间也省空间。</p>
      <h2>一句话总结</h2>
      <p>APK 误删的恢复优先级是：<strong>先从设备提包，再从可信源重下并校验签名，最后才考虑历史版本库和文件恢复软件</strong>。手机上直接扫被删文件基本无效，别在第一步就把时间浪费在不可能的地方。</p>
  </>
);

export const zhPosts20261117B = [
  {
    slug: "apk-file-deleted-recovery-methods",
    title: "APK 文件被误删了还能找回吗：三种场景、四条恢复路径",
    description: "清理工具把安装包删了、电脑重装前忘了备份、U 盘里的包不见了。APK 文件和普通照片删掉的恢复逻辑完全不同——它是可再生的。本文按「已装 vs 未装」「本机 vs 外部存储」分开讲，给出 adb pull、Play 重下、校验比对三条真正可行的路径。",
    date: "2026-11-17",
    readTime: "5 min read",
    tags: ["APK文件","误删恢复","adb pull","安装包备份","数据恢复","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261117BList = toList(zhPosts20261117B);
