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
      从第三方站点下载 APK，最大的顾虑不是&quot;能不能装&quot;，而是&quot;<strong>装了会不会出事</strong>&quot;。一个被篡改过的安装包，轻则弹广告、偷流量，重则窃取短信、盗刷账号。问题是——病毒不会在文件名上写&quot;我是病毒&quot;。
    </p>
    <p>
      结论先讲：<strong>安全检测不是看一个指标，而是过 6 道防线</strong>——① 来源可信度、② 文件哈希比对、③ 签名一致性、④
      权限清单、⑤ 在线多引擎扫描、⑥ 安装后行为监控。每多过一道，风险就低一档。下面逐条讲清楚&quot;查什么、怎么查、什么结果算异常&quot;。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>没有绝对安全的 APK，只有把风险压到最低的流程。</strong>
        你能做的是让&quot;有明显问题的包&quot;进不来。
      </p>
    </blockquote>

    <h2>一、来源可信度：第一道也是最重要的一道</h2>
    <p>90% 的恶意包，问题出在&quot;你从哪下的&quot;。</p>
    <ul>
      <li>
        <strong>优先顺序：</strong>官方应用商店 &gt; 应用官网 &gt; 知名第三方站（APKMirror、APKPure 等）&gt; 论坛/网盘/群分享。
      </li>
      <li>
        <strong>警惕信号：</strong>站点页面大量诱导性弹窗（&quot;点击立即下载&quot;按钮有 3 个以上）；下载链接跳转到陌生的 CDN
        短链；搜索引擎广告位买来的&quot;XX官网&quot;（很可能是钓鱼站）。
      </li>
      <li>
        <strong>怎么做：</strong>认准域名。官网域名通常和 App 名称一致，且用 HTTPS。第三方站优先选有<strong>哈希值公示</strong>
        的。
      </li>
    </ul>
    <p>
      实用原则：<strong>越&quot;方便&quot;的下载入口，越可疑。</strong>正规站点不会用&quot;高速下载器&quot;逼你装一堆东西。
    </p>

    <h2>二、文件哈希比对：确认文件没被中途替换</h2>
    <p>哈希（MD5/SHA-256）是文件的&quot;指纹&quot;。只要内容改一个字节，哈希值就完全不同。</p>
    <ul>
      <li>
        <strong>怎么查：</strong>Windows 用 <code>certutil -hashfile 文件名.apk SHA256</code>；macOS/Linux 用{" "}
        <code>shasum -a 256 文件名.apk</code>。
      </li>
      <li>
        <strong>怎么比对：</strong>拿算出的值和<strong>官方或可信站点公示的 SHA-256</strong>对照。一致 → 文件完整未改；不一致 →
        直接删掉重下。
      </li>
      <li>
        <strong>注意：</strong>只信<strong>下载源页面本身</strong>公示的哈希，别信第三方论坛帖子里贴的。
      </li>
    </ul>

    <h2>三、签名一致性：揪出&quot;换皮重打包&quot;</h2>
    <p>
      安卓要求所有 APK 必须签名。<strong>同一个 App 的官方签名是固定的</strong>，重打包的恶意版本签名一定不同。
    </p>
    <ul>
      <li>
        <strong>怎么查：</strong>手机端用包分析工具查看签名指纹（SHA-256）；电脑端用{" "}
        <code>apksigner verify --print-certs 文件名.apk</code>。
      </li>
      <li>
        <strong>怎么比对：</strong>和该 App <strong>其他版本/官方来源</strong>的签名指纹对比。同一个开发者签名应当一致。
      </li>
    </ul>
    <blockquote>
      <p>
        <strong>重点：</strong>
        同一个 App 不同版本签名不同，说明至少有一个是假的。
        <strong>果断弃用可疑的那个。</strong>
        游戏和金融类 App 尤其要查。
      </p>
    </blockquote>

    <h2>四、权限清单：看它&quot;要什么不合理的东西&quot;</h2>
    <p>权限是恶意行为的入口。一个手电筒 App 要读取通讯录，这不是需求，是图谋。</p>
    <ul>
      <li>
        <strong>怎么查（安装前）：</strong>用包分析工具看 <code>AndroidManifest</code> 里的权限列表。
      </li>
      <li>
        <strong>高危权限组合，出现要警觉：</strong>读取短信 + 读取通讯录 + 联网（典型的短信窃取组合）；无障碍服务
        （Accessibility）+ 悬浮窗：可模拟点击、盗刷；设备管理器 + 后台常驻：难以卸载、锁机勒索。
      </li>
      <li>
        <strong>判断方法：</strong>问自己——<strong>这个功能真的需要这个权限吗？</strong>不需要就是可疑。
      </li>
    </ul>

    <h2>五、在线多引擎扫描：让几十家引擎帮你看</h2>
    <ul>
      <li>
        <strong>怎么做：</strong>优先<strong>用哈希值</strong>在 VirusTotal 等平台查询（不用上传文件，更快更私密）；若哈希查不到，再考虑上传
        APK 扫描。
      </li>
      <li>
        <strong>怎么看结果：</strong>0 命中：相对安全，不代表绝对安全（新病毒可能还没入库）；1–2
        命中：可能是误报，但需谨慎核对报毒名称；多家命中：<strong>立即删除</strong>。
      </li>
    </ul>
    <p>
      <strong>注意：</strong>扫描平台结果有滞后性，<strong>别把它当成唯一依据</strong>，要结合前四道防线。
    </p>

    <h2>六、安装后行为监控：最后的安全网</h2>
    <ul>
      <li>
        <strong>观察信号：</strong>莫名多出应用、桌面出现新图标；流量、电量异常消耗；频繁弹出广告，尤其是锁屏/桌面；银行、支付类
        App 提示&quot;环境异常&quot;。
      </li>
      <li>
        <strong>怎么处理：</strong>发现异常立即卸载，检查是否装了&quot;设备管理器&quot;权限（需先取消激活才能卸载），必要时恢复出厂设置并改密码。
      </li>
    </ul>

    <h2>七、3 分钟快速自查清单（收藏）</h2>
    <ul>
      <li>✅ 下载源是不是可信站点 / 官网？</li>
      <li>✅ 有没有官方公示的 SHA-256？对得上吗？</li>
      <li>✅ 签名指纹和官方版本一致吗？</li>
      <li>✅ 权限和功能对得上吗？有没有高危组合？</li>
      <li>✅ 多引擎扫描有没有命中？</li>
      <li>✅ 装完有没有异常弹窗、耗电、陌生应用？</li>
    </ul>
    <p>
      <strong>六道全过，风险已经很低。</strong>任何一道明显异常，都值得重新考虑这个包要不要用。
    </p>

    <p>
      <strong>一句话总结：</strong>
      安全检测的本质是<strong>&quot;多层验证、交叉印证&quot;</strong>：来源决定起点，哈希确认完整，签名识别真伪，权限暴露意图，扫描补充线索，行为做最终兜底。把这条流程固定下来，你就能在享受第三方
      APK 便利的同时，把绝大多数坑挡在门外。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "怎么判断一个第三方下载的 APK 安不安全？",
    answer:
      "要过 6 道防线：来源可信度、文件哈希比对、签名一致性、权限清单、在线多引擎扫描、安装后行为监控。先看下载源是否可信、是否公示 SHA-256，再对比签名指纹和官方是否一致，检查权限是否和功能匹配、有无高危组合，用哈希去 VirusTotal 类平台查一下，装完再观察有无异常弹窗和耗电。",
  },
  {
    question: "怎么查 APK 的 SHA-256 哈希值？",
    answer:
      "Windows 用 certutil -hashfile 文件名.apk SHA256，macOS 或 Linux 用 shasum -a 256 文件名.apk。算出的值要和官方或可信下载站页面本身公示的 SHA-256 对照，一致说明文件完整未改，不一致就直接删掉重下。",
  },
  {
    question: "APK 签名不同意味着什么？",
    answer:
      "安卓要求所有 APK 必须签名，同一个 App 的官方签名是固定的。如果同一个 App 的不同版本签名指纹不同，说明至少有一个是重打包的假版本。用 apksigner verify --print-certs 或包分析工具查看签名，和官方来源比对，不一致就果断弃用。",
  },
  {
    question: "APK 要哪些权限算危险？",
    answer:
      "看权限和功能是否匹配。高危组合包括：读取短信 + 读取通讯录 + 联网（短信窃取）、无障碍服务 + 悬浮窗（模拟点击盗刷）、设备管理器 + 后台常驻（难以卸载）。一个功能简单的 App 索要这些权限，就非常可疑。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      &quot;这个 APK 到底从哪下才安全？&quot;——这是每个绕过应用商店装应用的人都会问的问题。答案不是&quot;某个万能网站&quot;，而是一套
      <strong>按可信度分层的下载策略</strong>：能走官方的走官方，需要第三方时选对站点，再用简单的核验把风险兜住。
    </p>
    <p>
      结论先讲：<strong>下载源的可信度决定 80% 的安全。</strong>官方商店和应用官网是首选，知名第三方站是备选，论坛/网盘/群分享是最后选项，且必须核验。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>不要追求&quot;唯一安全站&quot;，而要建立&quot;分层信任&quot;。</strong>
        越靠前的来源，越值得优先。
      </p>
    </blockquote>

    <h2>一、为什么有时候必须用第三方下载</h2>
    <ul>
      <li>应用只在 Google Play 上架，但你所在地区无法访问。</li>
      <li>需要旧版本（新版有你不想要的改动，或旧手机装不了新版）。</li>
      <li>应用已下架，但你有正当用途需要。</li>
      <li>想在没有 Google 服务的设备上安装（如部分国产 ROM 或华为设备）。</li>
      <li>需要把 APK 下载到电脑再传到手机。</li>
    </ul>

    <h2>二、可信度分层：五类下载源</h2>
    <h3>第 1 层：官方应用商店（最安全）</h3>
    <p>
      Google Play、三星 Galaxy Store、各厂商自带商店。优点：自动签名验证、恶意软件扫描、自动更新、权限透明。做法：
      <strong>能用商店就用商店。</strong>
    </p>
    <h3>第 2 层：应用官方网站</h3>
    <p>
      有些应用官网直接提供 APK 下载。优点：来源正宗，通常是官方签名。做法：<strong>认准域名</strong>，确认是
      HTTPS，且域名与产品名匹配，注意区分&quot;官网&quot;和&quot;搜索引擎广告位的山寨站&quot;。
    </p>
    <h3>第 3 层：知名第三方镜像站</h3>
    <p>
      指那些长期运营、公开哈希、不做诱导下载的镜像站（如 APKMirror、APKPure 这类）。做法：优先选<strong>带哈希公示</strong>
      的页面，自己算一遍比对；看<strong>签名指纹</strong>是否与官方一致；别点页面上多余的&quot;下载加速器&quot;&quot;推荐软件&quot;。
    </p>
    <h3>第 4 层：论坛 / 社区分享</h3>
    <p>
      质量参差，但有时能淘到冷门或历史版本。做法：<strong>必须核验。</strong>至少比对哈希（如果帖子里有）、查签名、查权限、多引擎扫描。
      <strong>没有核验条件就别装。</strong>
    </p>
    <h3>第 5 层：网盘 / 群文件 / 短链（最高风险）</h3>
    <p>
      来源不明、无法追溯、极易被替换。做法：<strong>能不用就不用。</strong>如果非用不可，当作&quot;完全不可信文件&quot;处理，走完整的核验流程。
    </p>

    <h2>三、选第三方站时看这 5 个信号</h2>
    <ol>
      <li>
        <strong>有没有 HTTPS</strong> —— 没有的直接跳过。
      </li>
      <li>
        <strong>有没有哈希值</strong> —— 正规站会公示 SHA-256。没有的，多一分警惕。
      </li>
      <li>
        <strong>有没有诱导下载</strong> —— 满屏&quot;高速下载&quot;&quot;立即下载&quot;按钮、强制装下载器的，减分。
      </li>
      <li>
        <strong>页面是否干净</strong> —— 大量弹窗、色情/赌博广告的，多半不靠谱。
      </li>
      <li>
        <strong>版本信息是否透明</strong> —— 能清楚标注版本号、更新日期、架构、签名的更可信。
      </li>
    </ol>

    <h2>四、下载到电脑（PC）时的额外注意</h2>
    <ul>
      <li>
        <strong>&quot;高速下载器&quot;陷阱：</strong>某些站点只给你一个 exe 下载器，装完附带一堆垃圾软件。只认直接的
        .apk 链接，别装所谓的加速器。
      </li>
      <li>
        <strong>下到电脑后仍要核验：</strong>电脑上下完，先算哈希比对，再传手机安装。电脑上的文件也可能被中间替换。
      </li>
    </ul>

    <h2>五、装之前 30 秒快速核验</h2>
    <ul>
      <li>✅ 文件大小是否和页面标注一致？</li>
      <li>
        ✅ 哈希值是否和公示值一致？（<code>certutil -hashfile x.apk SHA256</code> 或{" "}
        <code>shasum -a 256 x.apk</code>）
      </li>
      <li>✅ 安装时系统有没有弹出&quot;未知来源&quot;之外的可疑提示？</li>
      <li>✅ 安装时展示的权限是否合理？（对照 App 功能）</li>
      <li>✅ 有顾虑的话，用哈希去多引擎平台查一下。</li>
    </ul>
    <blockquote>
      <p>
        <strong>记住：</strong>
        <strong>核验成本是 30 秒，中招成本可能是账号和钱财。</strong>
        这笔账很好算。
      </p>
    </blockquote>

    <h2>六、装完之后怎么确认没问题</h2>
    <ul>
      <li>用几天，观察是否有异常弹窗、耗电、流量。</li>
      <li>在设置里检查有没有被装上&quot;设备管理器&quot;权限。</li>
      <li>银行/支付类应用如果提示环境异常，要警惕。</li>
      <li>
        确认没问题后，记得<strong>关闭&quot;未知来源&quot;安装权限</strong>，减少后续风险。
      </li>
    </ul>

    <p>
      <strong>一句话总结：</strong>
      安卓 APK 下载的安全公式是：<strong>官方优先 → 第三方选站 → 全程核验 → 装后观察。</strong>
      别迷信某个&quot;万能安全站&quot;，掌握分层信任和核验方法，才是真正把安全握在自己手里。工具会变、站点会换代，但&quot;来源 +
      哈希 + 签名 + 权限&quot;这套逻辑一直有效。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "安卓 APK 从哪里下载最安全？",
    answer:
      "按可信度分层：第一选官方应用商店（Google Play、厂商商店），自动做签名验证和恶意软件扫描；第二选应用官网，注意认准域名和 HTTPS；第三选公开哈希的知名第三方镜像站；论坛和网盘来源必须核验后再用。越接近官方的来源越省心。",
  },
  {
    question: "除了 Google Play，还有哪些安全的 APK 下载渠道？",
    answer:
      "应用官方网站通常直接提供官方签名包；知名第三方镜像站如 APKMirror、APKPure 会公示文件哈希、标注签名信息，可核验后使用。判断标准是：有 HTTPS、有哈希公示、页面干净无诱导下载、版本信息透明。",
  },
  {
    question: "从网盘或群里下载的 APK 能直接装吗？",
    answer:
      "不建议直接装。网盘、群文件、短链来源不明、无法追溯，是恶意包高发区。如果非用不可，要当作完全不可信文件，走完整核验：比对哈希、查签名指纹、检查权限、用多引擎平台扫描，全过再考虑安装。",
  },
  {
    question: "把 APK 下载到电脑再传手机有什么风险？",
    answer:
      "主要两个坑：一是某些站点只给一个 exe 下载器，装完附带一堆垃圾软件，只认直接的 .apk 链接；二是文件在传输过程中可能被替换，所以下到电脑后要先算哈希比对，再传到手机安装，不能跳过核验。",
  },
];

export const zhPosts20260915: BlogPostEntry[] = [
  {
    slug: "apk-safety-check-methods",
    title: "APK 下载安全检测方法：从源头到安装后的 6 道防线（2026 实操版）",
    description:
      "从第三方站点下载 APK，最大的顾虑不是能不能装，而是装了会不会出事。被篡改的安装包轻则弹广告偷流量，重则窃取短信盗刷账号。本文给出 6 道可操作的防线：来源可信度、文件哈希比对、签名一致性、权限清单、在线多引擎扫描、安装后行为监控，每条都讲清怎么查、什么结果算异常，并附 3 分钟自查清单。",
    date: "2026-09-15",
    readTime: "8 min read",
    tags: ["android", "apk", "安全", "侧载", "恶意软件", "权限", "virustotal", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "where-to-download-apk-safely",
    title: "安卓 APK 从哪里下载最安全？2026 官方与第三方站点挑选指南",
    description:
      "下载 APK 到底从哪下才安全？答案不是某个万能网站，而是一套按可信度分层的下载策略。本文把下载源分成五层：官方商店、应用官网、知名第三方镜像站、论坛社区、网盘群分享，讲清每层什么情况用、怎么用最稳，并给出挑选第三方站的 5 个判断信号、PC 下载的额外注意和装前 30 秒核验清单。",
    date: "2026-09-15",
    readTime: "7 min read",
    tags: ["android", "apk", "下载", "安全", "第三方站点", "侧载", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260915List = toList(zhPosts20260915);
