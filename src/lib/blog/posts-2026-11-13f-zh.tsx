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
      <p>点击下载按钮，浏览器弹出一个 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">403 Forbidden</code>；或者进度条走到 80% 突然失败，重试几次又在同一个位置断掉。多数人第一反应是「这个 APK 坏了」「网站挂了」，于是换个镜像站继续试——<strong>但这类失败里，有相当一部分发生在文件开始传输之前，跟 APK 内容一点关系都没有</strong>。</p>
      <p>把失败点定位清楚，能省掉大量重复下载，也能避免误把被篡改的文件当成「换了个源就好了」。下面按现象分三类，每类给出用户能做的动作和背后的原因。</p>
      <h2>先定位失败发生在哪一层</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">现象</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">失败层</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">用户能做什么</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">点链接直接 403 / 拒绝访问</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">请求被服务端策略拦下</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换网络、换浏览器、清缓存、等待限流解除</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">点链接 404 / 文件不存在</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">资源路径或缓存</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">重新取一次链接，别复用旧链接</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">下到某个百分比断开</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">传输层</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">用支持断点续传的下载器，检查代理/省电策略</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">下完了但打不开、提示解析失败</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">文件完整性</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">校验大小与 SHA-256，重新下载</td></tr></tbody>
      </table></div>
      <p><strong>区分技巧</strong>：在浏览器开发者工具的「网络」面板里看状态码和 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Content-Length</code>。有状态码且体积很小（几百字节）通常是错误页被当成了 APK 存下来；这类文件用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">unzip -t</code> 一测就知道不是压缩包。</p>
      <h2>403：被拦下的六种常见原因</h2>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">403</code> 的含义是「服务器理解请求，但拒绝执行」。APK 下载场景里最常见的是：</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>防盗链（Referer / Origin 校验）</strong>：从聊天窗口、邮件或第三方页面直接点开下载链接，请求头里没有预期的 Referer，被判定为盗链。解决：回到原页面点下载，或在地址栏手动打开来源页后再点。</li>
        <li><strong>签名 URL 过期</strong>：下载链接里带 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">token</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">expires</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">signature</code> 等参数，有效期常只有几分钟。页面开久了再点就会 403。<strong>重新生成链接即可，刷新旧链接没用</strong>。</li>
        <li><strong>地区限制</strong>：源站按 IP 归属限制分发，某些应用只允许特定国家/地区获取。换节点只是绕开，需自行评估合规性与账号风险。</li>
        <li><strong>User-Agent / 自动化识别</strong>：部分站点拒绝命令行工具、爬虫 UA 或明显异常的客户端。</li>
        <li><strong>频率限制</strong>：短时间多次重试触发限流，表现为「一开始能下，后来全 403」。<strong>这时越点越糟</strong>，应等待数分钟再试。</li>
        <li><strong>企业网络/家长控制拦截</strong>：网关按文件类型或域名阻断，报错页常被伪装成 403。</li>
      </ol>
      <p>一条实用判断：把链接复制到<strong>无痕窗口</strong>里打开。如果能下，基本是浏览器缓存、扩展或登录态导致；如果仍 403，再看是不是链接过期或地区问题。</p>
      <h2>404：路径没了，还是节点没同步</h2>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">404</code> 不一定是「应用下架」，常见情况包括：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>版本被替换</strong>：应用发布新版后，旧 versionCode 的包被清理，之前收藏的直链自然失效；</li>
        <li><strong>文件名编码</strong>：中文、空格、特殊字符在 URL 里没有正确转义，部分客户端会截断路径；</li>
        <li><strong>CDN 边缘节点未刷新</strong>：源站已有文件，但某个边缘节点缓存了旧的 404 响应；换个网络（例如从 Wi-Fi 切到蜂窝）常常立刻恢复；</li>
        <li><strong>大小写敏感</strong>：对象存储里 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">App.apk</code> 与 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">app.apk</code> 是两个对象。</li>
      </ul>
      <p>对用户的结论很简单：<strong>不要保存和复用 APK 直链</strong>。需要时从应用页面重新取一次，这类链接本来就被设计成临时凭证。</p>
      <h2>下到一半断：Range 与续传</h2>
      <p>大体积 APK（尤其游戏主程序 + OBB）最容易出现这类问题，核心是服务端是否支持 <strong>HTTP Range 请求</strong>。</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 检查服务端是否支持分段\ncurl -I -H \"Range: bytes=0-1023\" \"https://example.com/app.apk\"\n# 关注返回 206 Partial Content 与 Content-Range 头"}</code></pre>
      <ul className="list-disc pl-6 space-y-1">
        <li>返回 <strong>206</strong>：支持断点续传，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">wget -c</code> 或下载器的续传功能接着下；</li>
        <li>返回 <strong>200</strong>：不支持，每次断开都得从头开始，建议换网络时段；</li>
        <li>返回 <strong>403/404</strong>：回到上面两节处理。</li>
      </ul>
      <p>其他常见诱因：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>手机在下载中锁屏，省电策略切断后台网络；</li>
        <li>代理或运营商缓存对大文件做了超时截断；</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Content-Length</code> 与实际字节数不一致，客户端在尾部一直等待；</li>
        <li>本地存储剩余空间不足，写入失败被误报成「网络错误」。</li>
      </ul>
      <p><strong>校验比重试重要</strong>。下完之后先做两件事，再决定要不要重下：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"unzip -t app.apk            # APK 本质是 zip，能验证结构完整\nshasum -a 256 app.apk       # 与来源公布的 SHA-256 比对"}</code></pre>
      <p>如果哈希对不上，说明下载过程中被替换或截断过，绝不安装。</p>
      <h2>如果你自己也在维护一个 APK 下载站</h2>
      <p>这部分是给运维侧的对照清单，同样适用于排查「为什么只有部分用户报错」：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">配置点</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">常见坑</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">签名 URL</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">有效期过短；缓存 key 忽略了 token 参数，导致 A 用户的链接返回 B 的内容</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">CDN 缓存</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">缓存了 403/404 错误响应；未透传 Range 请求；边缘节点回源超时过短</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">响应头</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">缺少 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Content-Length</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Accept-Ranges</code>；<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Content-Disposition</code> 文件名带中文导致部分客户端存成 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.bin</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">限流</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">按 IP 限流把 NAT 后的大量用户归为同一来源</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">回源</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">源站流式传输时提前关闭连接，表现为固定在 99% 断开</td></tr></tbody>
      </table></div>
      <p>把这些配置理顺之后，用户侧看到的「玄学失败」会少一大半。像 <a href="https://www.gptoapk.com/zh" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk</a> 这类工具采用服务端流式代理，好处是下载入口统一、不会把临时直链暴露给用户，也就避开了签名过期和盗链这两类最常见的 403。</p>
      <h2>常见问题</h2>
      <h3>换一个浏览器就能下，是网站的问题吗？</h3>
      <p>更可能是缓存、扩展（广告拦截 / 下载管理器）或旧登录态。用无痕窗口验证一次就能确认，不必重装系统或换设备。</p>
      <h3>反复重试会提高成功率吗？</h3>
      <p>对频率限制型 403 恰恰相反。连续快速重试容易触发更长的封禁窗口，建议间隔几分钟，并从来源页重新生成链接。</p>
      <h3>下下来的文件是 0 字节或扩展名变成 .bin 怎么办？</h3>
      <p>通常是错误响应被保存成了文件，或响应头里的文件名没被正确解析。先看文件大小，用 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">file</code> 或文本编辑器打开确认内容，再从来源页重新取链接。</p>
      <h3>断点续传会不会导致文件损坏？</h3>
      <p>支持 206 的服务端按字节区间拼接，正常情况下不会。但续传前后如果源站已经换了版本，可能拼出混合内容——<strong>所以续传完成后必须做一次哈希校验</strong>。</p>
      <h2>小结</h2>
      <p>遇到 APK 下载失败，先按「403 / 404 / 中途断 / 文件损坏」四层定位，再动手：403 重点看防盗链与链接过期，404 重点看直链复用与 CDN 节点，中途断重点看 Range 支持，下完一律校验哈希。绝大多数情况下，重新从应用页面取一次干净的官方包，比到处找镜像更快也更安全。</p>
  </>
);

export const zhPosts20261113F = [
  {
    slug: "apk-link-403-404-retry-checklist",
    title: "APK 下载链接 403、404 或下到一半失效：从签名 URL 到 CDN 缓存的排查",
    description: "APK 下载返回 403、404，或进度条走到一半断掉，往往不是文件本身有问题。本文按状态码拆开防盗链、签名 URL 过期、地区限制、Range 续传与 CDN 缓存，给出用户侧和站点侧两套排查清单。",
    date: "2026-11-13",
    readTime: "6 min read",
    tags: ["APK下载","403错误","CDN","校验","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261113FList = toList(zhPosts20261113F);
