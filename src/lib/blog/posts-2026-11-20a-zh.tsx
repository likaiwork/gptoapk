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
      <p>把手机画面投到电视上看，看起来是件小事，实际踩坑率极高：有人投上去只有画面没声音，有人搜不到设备，有人画面卡成幻灯片，还有人投屏成功后手机一锁屏就断了。</p>
      <p>这篇文章按「你手上有什么设备」来分方案，最后给你一套失败排查顺序——先确认自己在哪一步卡住，再去对号入座。</p>
      <p><strong>核心观点：投屏不是一种技术，是五种。</strong>协议不同，兼容性、延迟、能不能投受版权保护的内容，全都不一样。选错方案，怎么调都调不好。</p>
      <h2>一、先搞清楚三种主流协议</h2>
      <p>投屏工具五花八门，底层其实就三类：</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>Miracast（Wi-Fi Display）</strong>：安卓原生「无线投屏」、Windows 在用。点对点直连，不需要路由器，延迟 100–300ms，部分机型不支持。</li>
        <li><strong>Google Cast</strong>：Chromecast、Google TV、部分智能电视。走路由器，App 内「投屏按钮」用它，最省电、画质最好。</li>
        <li><strong>DLNA / UPnP</strong>：大部分国产电视、机顶盒。只能「推送媒体文件」，不能镜像整个屏幕。</li>
      </ul>
      <p>除此之外还有两条「物理」路线：<strong>HDMI 有线投屏</strong>和<strong>电视端装 App 做接收端</strong>。</p>
      <p>选方案之前先做一件事：确认电视支持哪些协议。打开电视设置，找「投屏 / Screen Share / Miracast / Chromecast built-in」字样；电视端打开「无线显示」等待接收；手机下拉通知栏看有没有「投屏 / Cast / 无线显示」快捷开关。两边协议对不上，后面怎么折腾都是白费。</p>
      <h2>二、方法一：安卓原生无线投屏（Miracast）</h2>
      <p>系统自带的投屏功能，不需要装任何 App。</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>手机和电视连接<strong>同一个 Wi-Fi</strong>（Miracast 部分机型要求同一网络，部分可直连）。</li>
        <li>电视端进入「屏幕共享 / 无线显示」等待连接界面。</li>
        <li>手机下拉通知栏 → 找到「投屏 / 无线显示 / Cast」→ 点击。</li>
        <li>列表中出现电视名称 → 点击连接，首次连接可能弹出配对码。</li>
      </ol>
      <p>常见问题：<strong>列表里找不到电视</strong>——电视的等待接收界面超时了（很多只有 2 分钟），重新打开再搜；<strong>只有画面没有声音</strong>——Miracast 音频走电视端解码，部分机型把音频留在手机，检查媒体音量或在投屏设置里勾选「传输音频」；<strong>卡顿花屏</strong>——2.4GHz 带宽不够，改用 5GHz 并靠近路由器。</p>
      <h2>三、方法二：Chromecast / Google TV 投屏</h2>
      <p>画质和稳定性最好的一种，但需要电视支持或插一个 Chromecast / Google TV 设备。</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>电视和设备连同一 Wi-Fi。</li>
        <li>手机装 <strong>Google Home</strong>，确认能看到电视设备。</li>
        <li>分两种用法：<strong>App 内投屏</strong>——YouTube、Netflix 等播放页右上角有投屏图标，点一下即可，手机可以锁屏甚至离开家；<strong>整屏镜像</strong>——Google Home → 点电视卡片 → 「Cast my screen」。</li>
      </ol>
      <p>关键差异：App 内投屏是「告诉电视自己去拉流」，所以<strong>不耗手机电、不掉帧</strong>。整屏镜像是把手机画面实时编码发过去，手机发热、耗电快。<strong>能投 App 内就尽量用 App 内投屏</strong>，这是体验分水岭。</p>
      <h2>四、方法三：电视端装接收 App</h2>
      <p>很多国产电视 / 机顶盒不带 Miracast，但可以从应用商店（或侧载 APK）装一个接收端。装好后电视端会出现二维码或设备名，手机端用对应 App 或系统投屏功能搜索。</p>
      <p>侧载注意：电视端安装第三方 APK 需要先在「设置 → 安全」里允许未知来源安装。安装包务必从官方渠道获取并核对签名——电视端恶意软件比手机端更难清理。</p>
      <h2>五、方法四：HDMI 有线投屏</h2>
      <p>电视有 HDMI 口的话，买一个 <strong>Type-C 转 HDMI 适配器</strong>直接插上。优点：零延迟、不看 Wi-Fi 脸色、能打游戏。</p>
      <p><strong>先确认机型是否支持 DP Alt Mode</strong>——多数中低端机的 Type-C 口只有 USB 2.0 数据，不输出视频信号，否则买了适配器也用不了。支持有线输出的典型是三星 DeX 和部分小米 / 一加 / 华为机型。</p>
      <h2>六、方法五：DLNA 推文件</h2>
      <p>手机装支持 DLNA 的播放器（如 VLC），电视端开启 DLNA 接收，就能把本地视频「推」到电视播放。这种方式<strong>不能镜像屏幕</strong>，但推送后手机可以随便用，且画质是原片直通，不经过二次编码。适合看下载好的电影。</p>
      <h2>七、方法六：视频 App 的 TV 版</h2>
      <p>国内主流视频 App 都有 TV 版客户端，直接装在电视上，比投屏体验好得多——不占手机、不卡顿、支持 4K。</p>
      <p>通用做法：手机下载 TV 版 APK → U 盘拷到电视安装，或用电视的「远程推送 / 文件互传」功能。下载时注意选 <strong>arm64-v8a</strong> 架构的 TV 版包，否则会装不上或闪退。</p>
      <h2>八、投屏失败排查顺序</h2>
      <p>按这个顺序，绝大多数问题能在 3 分钟内定位：</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li><strong>查网络</strong>：手机和电视是否在同一个 Wi-Fi？很多路由器的「访客网络」是隔离的，设备互相不可见。</li>
        <li><strong>查协议</strong>：电视支持 Miracast 还是 Cast？对不上就换方案。</li>
        <li><strong>查等待状态</strong>：电视端接收界面是否已超时退出？重新打开。</li>
        <li><strong>查路由器隔离</strong>：路由器是否开启了「AP 隔离 / 客户端隔离」？这个选项会让所有设备互相看不见，关掉它。</li>
        <li><strong>查版权限制</strong>：Netflix、Disney+ 等受 DRM 保护的 App 不允许镜像投屏，画面会变黑只有声音。这不是故障，是设计，必须用 App 内投屏。</li>
        <li><strong>重启两端</strong>：电视的投屏服务进程经常假死，拔电重启一次比什么都快。</li>
      </ol>
      <h2>九、一张表总结怎么选</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li>电视有 Chromecast / Google TV → <strong>App 内投屏</strong>（首选）</li>
        <li>电视支持 Miracast，偶尔投一下 → <strong>系统原生无线投屏</strong></li>
        <li>国产电视什么都不支持 → 电视端<strong>装接收 App</strong>，或 <strong>HDMI 有线</strong></li>
        <li>要玩游戏、要最低延迟 → <strong>HDMI 有线</strong></li>
        <li>只看下载好的电影 → <strong>DLNA 推送</strong>或电视装 <strong>TV 版 App</strong></li>
      </ul>
      <p>投屏这件事，90% 的挫败感来自「用错了协议」。先花两分钟确认电视支持什么，比事后折腾两小时有用得多。</p>
      <h2>常见问题</h2>
      <p><strong>Q：投屏时手机能锁屏吗？</strong><br />App 内投屏（Cast 协议）可以，锁屏甚至离开家都不影响播放；整屏镜像锁屏后通常会断开，需在投屏设置里关闭「锁屏断开」类选项，或保持屏幕常亮。</p>
      <p><strong>Q：为什么 Netflix 投屏只有声音、画面全黑？</strong><br />DRM 保护机制阻止屏幕镜像。请使用 App 内的投屏按钮（走 Cast 协议并支持 DRM），而不是系统级的整屏镜像。</p>
      <p><strong>Q：投屏一定要连同一个 Wi-Fi 吗？</strong><br />Cast 协议必须同网；Miracast 部分机型支持 Wi-Fi Direct 直连，不需要路由器，但手机和电视要在可视范围内。</p>
      <p><strong>Q：投屏会不会消耗手机流量？</strong><br />不会。投屏走局域网，App 内投屏由电视自己拉流，消耗的是电视的带宽。</p>
  </>
);

export const zhPosts20261120A = [
  {
    slug: "cast-android-to-tv-methods",
    title: "安卓手机投屏到电视的 6 种方法，附常见失败原因排查（2026）",
    description: "投屏失败大多源于协议选错或网络隔离。本文对比 Miracast、Google Cast、DLNA、HDMI 有线、电视接收 App、TV 版客户端 6 种方案，并给出一套 6 步排查顺序，覆盖搜不到设备、只有画面没声音、DRM 黑屏、锁屏断开等典型问题。",
    date: "2026-11-20",
    readTime: "7 min read",
    tags: ["投屏","Android","Chromecast","Miracast","DLNA","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261120AList = toList(zhPosts20261120A);
