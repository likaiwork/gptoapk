import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ReactNode;
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

const ARTICLE1 = (
  <>
    <p className="lead">
      "手机里装的 APK 应用想在大屏上用"，这个需求大致分三种：<strong>看片（把视频投到电视）、玩游戏（镜像操控）、演示（把任意 App 界面投到
      电视）</strong>。很多人上来就搜"投屏软件"，结果装一堆串流 App 反而卡顿、连不上。真正的问题是<strong>没分清"投屏（Cast）"和"镜像（Mirror）"，
      也没搞懂电视端到底支持什么协议。</strong>
    </p>
    <p>
      结论先给：<strong>看视频用系统自带的"投射/Cast"最流畅；游戏和演示任意界面才需要"屏幕镜像"；老电视或盒子不支持无线时，一根 HDMI 线是最稳的
      兜底。</strong> 下面给你一套能照着做的流程，并排掉"投不上、花屏、没声音"这些坑。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong><strong>别先选软件，先选协议。</strong> 电视/盒子决定了能走哪条路：<code>Cast/投射（最流畅）</code> →{" "}
        <code>Miracast 无线镜像（吃性能、有延迟）</code> → <code>DLNA（看片老方案）</code> → <code>HDMI 有线（终极兜底）</code>。先把这条路摸对，
        成功率立刻翻倍。
      </p>
    </blockquote>

    <h2>一、先分清"投屏"还是"镜像"（90% 卡顿的根源）</h2>
    <table>
      <thead>
        <tr>
          <th>你的需求</th>
          <th>本质</th>
          <th>推荐方式</th>
          <th>场景</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>视频甩到电视播，手机可去干别的</td>
          <td>投射/Cast（电视自己拉流，几乎不占手机）</td>
          <td>App 自带投屏按钮 / 系统 Cast / DLNA</td>
          <td>看片、看直播</td>
        </tr>
        <tr>
          <td>手机屏幕<strong>原样</strong>上电视</td>
          <td>镜像/串流（手机持续编码，吃 CPU、有延迟）</td>
          <td>Miracast 无线显示 / 第三方串流 / HDMI</td>
          <td>游戏、演示 App</td>
        </tr>
        <tr>
          <td>手机+电视都动起来操控</td>
          <td>——</td>
          <td>厂商"多屏协同"</td>
          <td>办公投文档</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>口诀：</strong>内容能"投过去自己播"就选 Cast；必须"手机画面跟着动"才用镜像。
    </p>

    <h2>二、按你的设备对号入座选"路"</h2>
    <p><strong>A. 智能电视（小米/华为/索尼/TCL/海信等）</strong></p>
    <ul>
      <li>看片：视频 App 点「TV/投屏」→ 选电视，走 DLNA/专属协议，最流畅。</li>
      <li>镜像游戏/任意 App：手机「设置→连接/无线显示」搜电视；或电视端开「无线投屏」待接收（Miracast）。</li>
    </ul>
    <p><strong>B. 普通电视 + 电视盒子（小米盒子/当贝/天猫魔盒）</strong></p>
    <ul>
      <li>看片：App 投到盒子（与手机同 Wi‑Fi）。</li>
      <li>镜像：盒子端装接收软件（<strong>乐播/当贝投屏 TV 版</strong>），手机端用同品牌发送端镜像。</li>
    </ul>
    <p><strong>C. 老电视 / 非智能 / 酒店电视</strong></p>
    <ul>
      <li>别折腾无线，直接 <strong>HDMI 线 + Type‑C 转 HDMI 转接头</strong>，即插即用、零延迟。</li>
    </ul>
    <blockquote>
      <p>
        <strong>投屏前先确认：手机和电视在同一局域网（2.4G 往往比 5G 更稳）。</strong> 连不上八成先查这个。
      </p>
    </blockquote>

    <h2>三、看视频：先用系统自带投屏（不用装 App）</h2>
    <ol>
      <li>手机、电视连<strong>同一 Wi‑Fi</strong>。</li>
      <li>视频 App 全屏播放 → 点「TV/投」→ 选中电视/盒子。</li>
      <li>成功后由电视自己播放（Cast），手机可锁屏，最省电不卡。</li>
    </ol>
    <p>
      <strong>搜不到电视：</strong>电视端手动打开「无线显示/乐播投屏」接收页；再不行重启路由器和电视，换 2.4G 频段。
    </p>

    <h2>四、镜像任意 APK / 打游戏：怎么弄</h2>
    <ol>
      <li>电视/盒子端打开「无线投屏/屏幕镜像」待接收。</li>
      <li>手机端「设置 → 连接/更多连接 → 无线投屏」→ 选电视。</li>
      <li>连上即镜像，声音默认跟到电视。</li>
    </ol>
    <p>
      <strong>想要低延迟：</strong>电视开「游戏模式」，并优先<strong>有线 HDMI</strong>。无线镜像普遍有 80–200ms 延迟，竞技类不合适。
    </p>
    <p>
      手机系统被裁剪掉自带镜像时，用第三方：<strong>乐播投屏、当贝投屏、傲软投屏、ApowerMirror、幕享</strong> 等。注意多数要求手机+电视
      <strong>都装同一家</strong>，且高清/去水印需付费。
    </p>

    <h2>五、"投不上"一次性排雷</h2>
    <table>
      <thead>
        <tr>
          <th>症状</th>
          <th>原因</th>
          <th>解决</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>搜不到电视</td>
          <td>不在同一 Wi‑Fi / AP 隔离</td>
          <td>同网；关「AP/访客隔离」；换 2.4G</td>
        </tr>
        <tr>
          <td>连上就断</td>
          <td>5G 覆盖差</td>
          <td>换 2.4G 或靠近路由</td>
        </tr>
        <tr>
          <td>花屏/发灰</td>
          <td>HDR→SDR 转换问题</td>
          <td>关手机 HDR/杜比视界；换好 HDMI 线</td>
        </tr>
        <tr>
          <td>没声音/对不上</td>
          <td>音频没切</td>
          <td>电视切回电视扬声器</td>
        </tr>
        <tr>
          <td>内容投不了</td>
          <td>App 禁投（版权/DRM/金融类）</td>
          <td>换<strong>屏幕镜像</strong>（非投屏）；再不行走有线</td>
        </tr>
        <tr>
          <td>卡顿延迟高</td>
          <td>无线镜像吃性能</td>
          <td>关后台；优先有线；开游戏模式</td>
        </tr>
      </tbody>
    </table>
    <blockquote>
      <p>
        <strong>特别提醒：</strong>很多视频 / 金融 / 理财类 APK 在代码里<strong>禁投屏/镜像</strong>（防录屏、版权保护），这是 App 自己设的，
        不是电视的问题。无线投不动就上 HDMI 有线。
      </p>
    </blockquote>

    <h2>六、连接方式速查</h2>
    <table>
      <thead>
        <tr>
          <th>方式</th>
          <th>场景</th>
          <th>延迟</th>
          <th>软件</th>
          <th>稳定性</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>系统 Cast/投屏</td>
          <td>看片</td>
          <td>极低</td>
          <td>几乎不用</td>
          <td>★★★★★</td>
        </tr>
        <tr>
          <td>Miracast 镜像</td>
          <td>演示/普通镜像</td>
          <td>中</td>
          <td>系统自带</td>
          <td>★★★★</td>
        </tr>
        <tr>
          <td>第三方串流镜像</td>
          <td>手机不认自带</td>
          <td>偏高</td>
          <td>两端都装</td>
          <td>★★★</td>
        </tr>
        <tr>
          <td>HDMI 有线</td>
          <td>老电视/游戏/办公</td>
          <td>极低</td>
          <td>无</td>
          <td>★★★★★</td>
        </tr>
      </tbody>
    </table>

    <h2>小结</h2>
    <p>
      <strong>按下单顺序记：</strong>智能电视看片 → 用 App 投屏按钮；要镜像玩 APK 游戏/演示 → 系统无线投屏；都不行或电视老 →{" "}
      <strong>HDMI 有线兜底</strong>，别纠结第三方软件。先固定"协议/线路"再谈"软件"，投屏难题基本一次解决。想在 gptoapk.com 下载的小工具投屏演示，
      多数用系统自带投屏就够了。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      网上下的 APK，你最该防的不是"它是不是病毒"，而是更阴的一手：<strong>"它还是不是官方那个原版。"</strong> 很多恶意软件走"二次打包"——把官方
      正版 App 拆开、塞进广告和木马、再用<strong>攻击者自己的密钥</strong>重新签名上传，伪装成"原版/破解/汉化版"骗你装。这类"改包"表面和官方功能
      一模一样，杀毒未必报，但<strong>只要核对它的"签名指纹"，立刻露出马脚。</strong>
    </p>
    <p>
      结论先讲：<strong>官方正版 APK 的"签名指纹（证书 SHA-256）"是一串固定值 —— 同一开发者发的所有版本，指纹永远不变。</strong> 你要做的不是
      肉眼判断，而是：<strong>解出下载文件的指纹 → 和官方公布/官方正版比对 → 不一致就是被改包 → 直接删。</strong> 免费、不装 App、命令行 3 分钟，
      比单纯扫毒更能识别"改包"。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong><strong>杀毒软件只查"已知木马特征"，防不住"官方干净代码 + 后门载荷"的二次打包；识别改包的硬证据是签名指纹的
        一致性。</strong> APK 的签名 = 文件的"官方印章"，被重新打包就必然换印。
      </p>
    </blockquote>

    <h2>一、为什么"签名指纹"能识破二次打包</h2>
    <p>
      开发者发布 APK 前会用<strong>自己的私钥</strong>签名，签名里含一张<strong>证书</strong>，证书上有一串可打印的<strong>指纹</strong>
      （如 SHA-256：<code>A5:6F:…:9C</code>）。
    </p>
    <ul>
      <li><strong>同一开发者</strong>发布的所有版本 + 更新，<strong>签名指纹永远相同</strong>（安卓靠它识别"这是同一 App 的更新"）。</li>
      <li><strong>被二次打包</strong>的 APK，因攻击者没有官方私钥，只能<strong>换自己密钥重签</strong> → 新指纹必然 ≠ 官方指纹。</li>
      <li>签名不一致也是安卓装"覆盖更新"时报"签名不匹配/无法安装"的原因之一。</li>
    </ul>
    <p>
      所以<strong>指纹比对 = 直接回答"这文件是不是官方签的"</strong>。两个版本指纹并排一比，是否改包一目了然。
    </p>

    <h2>二、三种拿到"官方指纹"的来源（先有标的才能比）</h2>
    <ol>
      <li><strong>可信 APK 档案站（APKMirror/APKPure）或官网"关于/安全"页</strong>公示的 SHA-256 指纹——最省事，直接核对出版本。</li>
      <li><strong>你手上确认为官方的那一版</strong>：从 Play 商店或官网装的 APK，解出指纹当"基准"，再比对新下载的。</li>
      <li><strong>开发者文档 / GitHub Releases</strong>：面向技术用户的应用常给签名指纹。</li>
    </ol>
    <blockquote>
      <p>
        连官方指纹都拿不到？用<strong>多源交叉核对</strong>：从两个独立来源下载同一 App，指纹一致说明源头一致；不一致说明<strong>至少一个是改包</strong>
        ——都别装，回官方渠道。
      </p>
    </blockquote>

    <h2>三、怎么解出签名指纹（两种方式）</h2>
    <p>不用在手机上装任何东西，电脑上搞定。</p>
    <p><strong>方法 1：命令行（推荐，跨平台）</strong></p>
    <pre><code># keytool（JDK 自带）
keytool -printcert -jarfile 下载的app.apk
# 看输出末尾：SHA256:  A5:6F:...:9C   ← 复制这串指纹</code></pre>
    <pre><code># apksigner（Android SDK build-tools，安卓官方口径，可看 v1/v2/v3）
apksigner verify --print-certs 下载的app.apk
# → 签名者证书的 SHA-256 指纹</code></pre>
    <p>把输出的 <code>SHA256:</code> 与官方公布值逐段核对。<strong>一致 = 官方原版；不一致 = 被重签/改包。</strong></p>
    <p><strong>方法 2：零命令行</strong></p>
    <p>
      部分市场"关于/证书"页会公示签名；也可用在线 APK 信息查看器显示指纹用于比对。<strong>注意：别把刚下的、来源不明的 APK 随手传去不熟悉的网站
      "扫描"</strong>——优先用 VirusTotal 的哈希查询等可信能力。
    </p>

    <h2>四、怎么"判读"（一张表）</h2>
    <table>
      <thead>
        <tr>
          <th>比对结果</th>
          <th>结论</th>
          <th>处置</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>下载版指纹 = 官方指纹</td>
          <td>官方签名，正常</td>
          <td>可安装（仍看下权限）</td>
        </tr>
        <tr>
          <td>下载版指纹 ≠ 官方指纹</td>
          <td>被重签/改包</td>
          <td><strong>删除，不要装</strong></td>
        </tr>
        <tr>
          <td>多源 A、B 指纹一致</td>
          <td>源头一致，较可靠</td>
          <td>可安装</td>
        </tr>
        <tr>
          <td>多源 A、B 指纹不一致</td>
          <td>至少一个是改包</td>
          <td>都别装，回官方</td>
        </tr>
      </tbody>
    </table>
    <p><strong>附加信号：</strong></p>
    <ul>
      <li>自称"官方 App"却<strong>没有官方签名</strong> → 红色信号（典型破解/盗版壳）。</li>
      <li><strong>破解/无限金币/去广告/汉化版</strong> → 几乎必然被重签，指纹必然对不上官方，风险最高，别装。</li>
      <li>同一 App 官网版与某市场版指纹不同 → 以<strong>官网为准</strong>，其它渠道存疑。</li>
    </ul>

    <h2>五、放进完整"安全下载检验"流程</h2>
    <p>把指纹比对当<strong>最硬的一道闸</strong>：</p>
    <pre><code>① 核对来源 → ② 对照 SHA-256 与大小
③【重点】解出签名指纹，与官方比对 → ④ 有必要时 VirusTotal 在线扫
⑤ 安装时审视权限 → ⑥ 运行观察有无异常</code></pre>
    <p>
      <strong>最该用这套的时刻：</strong>从第三方网站、网盘、群文件里拿到"官方 App 安装包"时——这是改包重灾区，测一次指纹几秒钟就能定装不装。
    </p>

    <h2>六、常见疑问速答</h2>
    <ul>
      <li><strong>"杀毒没报 = 安全？"</strong> 不一定。干净官方代码 + 后门的改包，杀毒未必报，只有指纹比对能戳穿。</li>
      <li><strong>"官网版和第三方版指纹不同，能用官网版吗？"</strong> 通常以官网为准；同源同开发者本应同指纹，不同就有鬼。</li>
      <li><strong>"改过签名就一定带毒？"</strong> 不一定恶意，但<strong>你完全无法确认它被谁改过、改了什么</strong>——对要装进手机的东西，
      这种不确定性就足够让你别装。</li>
      <li><strong>"手机上能看已装 App 签名吗？"</strong> 部分系统在"应用信息 → 更多/签名"可看；查第三方文件用命令行更方便。</li>
    </ul>

    <h2>小结</h2>
    <p>
      二次打包和盗版是"看着是官方、其实是别人改的"陷阱，杀毒管不住，<strong>数字签名指纹才是硬证据</strong>——同源必同印，异印即改包。花三分钟解出{" "}
      <code>SHA-256</code> 证书指纹和官方一比，就能避开后面所有麻烦。最省心的判断：<strong>"破解/汉化/去广告版"指纹几乎必然对不上官方——看到就直接
      绕开</strong>，要正版就去官方渠道（如 gptoapk.com）或正规市场取。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "手机投屏到电视，为什么老是搜不到电视？",
    answer:
      "最常见原因是手机和电视不在同一个局域网（或路由器开了 AP 隔离/访客网络）。对策：把手机、电视接到同一个路由器；到路由器后台关掉「AP 隔离/访客网络」；网络覆盖差时切到 2.4G 频段（比 5G 穿透更好更稳），再重启路由器和电视。电视端也建议手动打开「无线显示/乐播投屏」的接收页再搜。",
  },
  {
    question: "看视频用\"投屏\"，打游戏用\"镜像\"，两者什么区别？",
    answer:
      "投屏（Cast）是电视自己联网拉流播放，手机几乎不耗性能、可锁屏干别的，只适合视频类内容；镜像（Mirror/串流）是手机持续把屏幕画面编码推给电视，所有 App 界面都能上屏（适合打游戏、演示任意 APK），但吃 CPU、会发热且有约 80–200ms 延迟。判断口诀：内容能'投过去自己播'就选 Cast，必须'手机画面跟着动'才用镜像。",
  },
  {
    question: "有些 App 投屏总是提示不支持/被禁，是电视的问题吗？",
    answer:
      "不是电视问题。很多视频、金融、理财类 APK 在代码里主动禁用了投屏/镜像（防录屏、版权保护）。遇到这种情况，无线'投屏'多半不可用，可以改试'屏幕镜像'（如果也只是禁投镜像则仍不行），最稳妥的兜底是 HDMI 有线连接（手机 Type‑C 转 HDMI）。",
  },
  {
    question: "老电视或普通电视（非智能）能看手机画面的 APK 内容吗？",
    answer:
      "能，最稳的是有线：买一根 HDMI 线 + 支持视频输出的 Type‑C 转 HDMI 转接头，手机插上即自动镜像到电视，零延迟、不受网络影响，最适合 PPT 演示和打游戏。若想无线，需电视外接一个电视盒子/投屏器做接收端，配合手机系统自带或第三方投屏/镜像来实现。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "下载的 APK 杀毒软件没报毒，是不是就安全？",
    answer:
      "不一定。杀毒软件查的是'已知木马特征'，而对'官方干净代码 + 悄悄塞进去的后门载荷'这种二次打包方式检出有限。识别改包更硬的证据是对比数字签名指纹：解出下载文件的 SHA-256 证书指纹，与官方公布/官方正版比对，不一致就说明被重新签名过、不是官方原版，直接别装。",
  },
  {
    question: "怎么用命令行查看 APK 的签名指纹？",
    answer:
      "用 keytool（JDK 自带）：`keytool -printcert -jarfile 下载的app.apk`，看输出末尾的 SHA256 一长串；或更偏安卓官方口径用 apksigner（Android SDK build-tools）：`apksigner verify --print-certs 下载的app.apk`，它会列出签名者证书的 SHA-256 指纹。把那串值与官方公布值逐段核对，一致即是官方签名。",
  },
  {
    question: "破解版 / 无限金币 / 去广告版 APK 靠谱吗？",
    answer:
      "风险最高，强烈不建议装。这类'破解/汉化/去广告'版本几乎必然被第三方重新打包并用自己的密钥重新签名，所以它的签名指纹必然对不上官方——你无法确认里面被塞了什么（广告、木马、后台收集）。要正版就去官方渠道或正规应用市场（如 gptoapk.com）下载，别为了免费冒这个险。",
  },
  {
    question: "同一款 App 从官网下的和从某个应用市场下的，指纹不一样，能用吗？",
    answer:
      "以官网/官方公布值为准，其它渠道的版本存疑。同一个开发者发布的所有版本签名指纹应当永远一致；如果两个来源解出的指纹不同，说明至少其中一个是被人重新签名的改包——这种情况下两个都先别装，回到开发者官网或官方应用市场重新下载并再比对一次指纹。",
  },
];

export const zhPosts20260909: BlogPostEntry[] = [
  {
    slug: "android-apk-cast-to-tv-screen-mirror-guide",
    title: "安卓手机/平板 APK 内容怎么投到电视？有线、无线、投屏协议全攻略（2026）",
    description:
      "手机里装的 APK 想上电视？先选协议再谈软件：看视频用系统自带'投射/Cast'(电视自己拉流、最流畅)；打游戏和演示任意界面才需要'屏幕镜像/Miracast'(吃性能、有延迟)；老电视或盒子不支持无线时用 HDMI 有线兜底。这篇按智能电视/电视盒子/老电视三种硬件对号入座，讲清 Cast 与镜像的区别，并排掉'搜不到电视、花屏、没声音、App 禁投'等坑，附连接方式速查表。",
    date: "2026-09-09",
    readTime: "8 min read",
    tags: ["android", "apk", "投屏", "电视", "镜像", "Miracast", "Cast", "HDMI", "DLNA", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-signature-fingerprint-detect-repackaged",
    title: "下载的 APK 是\"原版\"还是\"被改过\"？用签名指纹一眼识别二次打包与盗版（2026）",
    description:
      "网上下的 APK 最怕的不是病毒，而是'看着是官方、其实被人二次打包改过'——攻击者给正版 App 塞进广告/木马后用自己密钥重签上传。识别它的硬证据是数字签名指纹：同一开发者所有版本的证书 SHA-256 永远一致，被重签必然不同。这篇教你用 keytool/apksigner 解出下载文件的指纹、和官方公布值比对，附判读表与多源交叉核对技巧，把'破解/汉化/去广告版几乎都对不上官方'讲明白。",
    date: "2026-09-09",
    readTime: "7 min read",
    tags: ["android", "apk", "签名", "指纹", "二次打包", "安全", "SHA256", "apksigner", "验证", "检测"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260909List = toList(zhPosts20260909);
