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
      <p>先说一个常见的误判：打开测速软件，跑出 300 Mbps，于是断定「我网速没问题，是对方网站太烂」。这个推理有一半是对的，但跳过了最关键的一步——<strong>测速软件测的是到最近测速节点的速度，不是到 APK 托管服务器的速度</strong>。这两条路径可能走的完全是不同的路由、不同的 CDN、不同的限速策略。</p>
      <p>真正有效的做法是把「你的网络」和「下载链路」拆开测，一段一段排除。这篇文章给的就是这套顺序。</p>
      <h2>先分三类限速来源</h2>
      <p>APK 下载慢，绝大多数落在下面三类之一：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">类型</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">典型表现</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">责任方</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">能否绕过</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">本地/运营商限速</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">所有下载都慢，测速也不达标</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">ISP、路由器 QoS、移动网络降速</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换网络或改路由器设置</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">CDN 节点慢</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">只有某个域名慢，换镜像后变快</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">托管方 CDN 节点调度</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换镜像源、换 DNS</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">服务端限速</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">单个连接被封顶，多线程却能叠加</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">下载站、Play 的并发/带宽策略</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">多线程工具、分片下载</td></tr></tbody>
      </table></div>
      <p>三类的解法完全不同，所以顺序很重要：<strong>先确认是不是本地问题，再确认是不是节点问题，最后才考虑多线程</strong>。跳过前两步直接上多线程工具，往往是把一个 200 KB/s 的单线程变成四个 50 KB/s 的线程。</p>
      <h2>第一步：把本地网络排除掉</h2>
      <p>不要在手机浏览器里随便找网站测。用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">iperf3</code> 测到你自己可控的节点，才排除得干净：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 局域网内有另一台机器时，一边跑服务端\niperf3 -s\n\n# 手机或电脑这边测局域网吞吐\niperf3 -c 192.168.1.50 -t 10 -P 4"}</code></pre>
      <p>局域网能跑满、外网下载却慢，说明瓶颈不在 Wi-Fi 本身。接着只测到公网单点的速度：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"curl -o /dev/null -w \"speed: %{speed_download} B/s\\ntime: %{time_total}s\\n\" \\\n  \"https://speed.cloudflare.com/__down?bytes=50000000\""}</code></pre>
      <p>返回的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">speed_download</code> 除以 125000 就是 MB/s。如果这个数明显低于你套餐带宽的六成，问题在你这一侧——这时候查路由器 QoS、有没有别的设备在跑上传、是不是用着移动网络或国际漫游。</p>
      <p>如果这一步就接近满速，往下走。</p>
      <h2>第二步：确认是不是 CDN 节点的问题</h2>
      <p>同一个 APK，用不同镜像源各下载前 5 MB，比速度。用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--range</code> 只取开头一部分，避免等整包：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"for url in \\\n  \"https://d.apkpure.com/b/APK/com.example.app\" \\\n  \"https://apkpure.net/com.example.app/download\" \\\n  \"https://www.gptoapk.com/dl/com.example.app\"; do\n  echo \"== $url\"\n  curl -L -r 0-5242880 -o /dev/null \\\n    -w \"  speed: %{speed_download} B/s  connect: %{time_connect}s\\n\" \"$url\"\ndone"}</code></pre>
      <p>看两个数：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">time_connect</code> 高说明 DNS 解析或路由绕远，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">speed_download</code> 低说明节点本身在限速或拥堵。同一个域名下，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">time_connect</code> 稳定但速度很低，基本就是服务端侧的带宽策略，换镜像源最有效。</p>
      <p>顺带提一个细节：<strong>DNS 会把不同用户解析到不同 CDN 节点</strong>。同城不同运营商测出来的结果能差三倍，所以别拿别人的测速截图当基准。想验证这点，用公共 DNS 分别解析一下：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"dig +short apkpure.com @223.5.5.5\ndig +short apkpure.com @8.8.8.8"}</code></pre>
      <p>返回的 IP 分属不同段，就说明走的是不同边缘节点。</p>
      <h2>第三步：判断单连接是否被封顶</h2>
      <p>服务端限速的识别方法是看「速度上限是否恒定」。单线程稳定卡在某个整数附近（比如 50 KB/s、200 KB/s 一直不变），多线程总和却能超过它，那就是单连接限制。</p>
      <p>用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">curl</code> 的并行能力验证一下：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 单线程\ncurl -L -o /tmp/a.apk -w \"single: %{speed_download} B/s\\n\" \"$URL\"\n\n# 8 个分片并行下载\nseq 0 7 | xargs -P 8 -I{} curl -L -r {}0000000-$(( {} + 1 ))9999999 \\\n  -o /tmp/part{} \"$URL\""}</code></pre>
      <p>如果八片加起来明显快于单线程，用支持多连接的下载器（aria2、ADM）是合理的；如果八片加起来和单线程差不多，说明带宽被整体限住了，换工具没用，得换源。</p>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aria2c</code> 一条命令就能看效果：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aria2c -x 8 -s 8 -k 1M -d /tmp -o app.apk \"$URL\""}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-x 8</code> 是每服务器连接数，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-s 8</code> 是分片数。注意别开太大，某些站会直接返回 403 或 429。</p>
      <h2>第四步：验证下载出来的包是完整的</h2>
      <p>提速之后再谈完整性，顺序不能反——分片下载、中断续传最容易出的问题就是包不完整却装着「成功」。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 有官方 SHA-256 时\nshasum -a 256 app.apk\n\n# 至少确认 APK 结构完好\nunzip -t app.apk | tail -3"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">unzip -t</code> 报 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">No errors detected</code>，并且能看到 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">AndroidManifest.xml</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">classes.dex</code> 在列表里，基本可以认为包没坏。装之前再确认包名对得上：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump badging app.apk | head -2"}</code></pre>
      <h2>一套可以直接照做的判断顺序</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li>用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">iperf3</code> 排局域网，用单点 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">curl</code> 排 ISP，确认本地不是瓶颈；</li>
        <li>用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--range</code> 对比三到四个镜像源的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">speed_download</code> 与 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">time_connect</code>，锁定慢的是不是某个域名；</li>
        <li>单线程速度恒定卡在某个值，用并行分片验证是否单连接限速；</li>
        <li>换源或开多线程后，重新校验哈希和包结构。</li>
      </ol>
      <p>这个顺序的价值在于：每一步都能把嫌疑范围砍掉一截，而不是一股脑换工具、换浏览器、换手机。大多数「APK 下载慢」最后落在第二步——换个镜像源就好了，压根用不上多线程。</p>
  </>
);

export const zhPosts20261117A = [
  {
    slug: "apk-download-speed-throttling-diagnosis",
    title: "带宽明明够快，APK 下载却卡在几十 KB/s：三种限速来源与逐层测速法",
    description: "家里千兆宽带、手机测速满格，下载 APK 却只有几十 KB/s。问题通常不在你的网速，而在 CDN 节点、镜像源节点或 Play 服务端的限速。本文用 iperf3、curl 分片测速和镜像源对比三种手段，把「谁在限速」定位到具体一环。",
    date: "2026-11-17",
    readTime: "5 min read",
    tags: ["APK下载","网速慢","CDN限速","镜像源","故障排查","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261117AList = toList(zhPosts20261117A);
