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
      从第三方网站、论坛、网盘下载 APK，最怕的就是<strong>装了带毒/带后门的包</strong>。安卓不像 iOS
      有严格审核，谁都能打包一个 APK 传上去。好消息是：<strong>在安装之前，你完全可以自己动手把风险查个七七八八</strong>
      ——不用专业工具，用系统自带功能 + 几个免费在线服务就够了。
    </p>
    <p>
      结论先讲：<strong>安全的 APK 检测分三步——① 查来源、② 验签名、③ 扫内容。</strong>
      下面 5 项检查按&quot;从易到难&quot;排列，前 3 项 2 分钟就能做完，建议每次装第三方包都过一遍。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>&quot;能不能装&quot;和&quot;该不该装&quot;是两回事。</strong>
        系统只拦明显不匹配的包，真正判断它安不安全，得靠你自己确认来源和签名。
      </p>
    </blockquote>

    <h2>一、先查来源（最重要，也最快）</h2>
    <p>90% 的恶意 APK 问题出在<strong>来源不可信</strong>。装之前先问自己三个问题：</p>
    <ul>
      <li>
        <strong>这个网站靠谱吗？</strong>官方应用商店（Google Play、华为/小米/OPPO
        应用商店）下载的最省心。第三方站优先选知名度高的（APKMirror、APKPure 等），避开弹窗满天飞的小站。
      </li>
      <li>
        <strong>文件名和版本对得上吗？</strong>比如你要装&quot;某银行&quot;，包名却不认识，或版本号比官方还高一大截，警惕。
      </li>
      <li>
        <strong>有没有被&quot;二次打包&quot;的痕迹？</strong>很多人下载的不是原始包，而是别人
        <strong>改过的重打包版本</strong>（加了广告 SDK、去广告、改签名）。这类包风险最高。
      </li>
    </ul>
    <p>
      一个实用原则：<strong>如果这个 App 官方能直接下到，就别从第三方下。</strong>
      只有官方渠道下不到（比如区域限制、已下架）时，才走第三方——这时第 2、3 项检查就更要认真做。
    </p>

    <h2>二、核对签名（判断是不是原厂包）</h2>
    <p>
      APK 的<strong>数字签名</strong>就像出厂封条：官方包用开发者的私钥签名，重打包的包签名一定不一样。核对签名是
      <strong>识别&quot;李鬼包&quot;最准的方法</strong>。
    </p>
    <p>
      <strong>手机端（最方便）：</strong>
    </p>
    <ul>
      <li>
        用 <strong>APK 分析类 App</strong>（如 APK Signer Checker、AppChecker 类工具）打开这个 APK，读取它的
        <strong>签名指纹（SHA-256）</strong>。
      </li>
      <li>
        再去官方页/权威站点查询该 App 的官方签名指纹，<strong>对比是否一致</strong>。不一致 →
        极可能被改过。
      </li>
    </ul>
    <p>
      <strong>电脑端（更严谨）：</strong>
    </p>
    <ul>
      <li>
        用 <code>apksigner</code>（Android SDK 自带）或 <code>keytool</code> 查看签名：
        <ul>
          <li>
            <code>apksigner verify --print-certs app.apk</code>
          </li>
          <li>
            <code>keytool -printcert -jarfile app.apk</code>
          </li>
        </ul>
      </li>
      <li>记录输出的证书 SHA-256，和官方公布的对比。</li>
    </ul>
    <blockquote>
      <p>
        <strong>重点：</strong>同一 App 的正版包，签名永远一致。只要签名对不上，不管它宣传得多好，都别装。
      </p>
    </blockquote>

    <h2>三、看权限请求（是否&quot;要得太多&quot;）</h2>
    <p>
      装的时候系统会列出这个 App 申请的所有权限。<strong>权限和功能不匹配，就是危险信号。</strong>
    </p>
    <ul>
      <li>
        <strong>计算器要&quot;读取通讯录 + 发短信 + 定位&quot;？</strong>直接放弃。
      </li>
      <li>
        <strong>手电筒 App 要&quot;读取文件和媒体&quot;？</strong>可疑。
      </li>
      <li>
        <strong>正常工具类 App 要&quot;无障碍服务 / 设备管理员 / 安装其他应用&quot;？</strong>这三类是
        <strong>恶意软件的常见索权</strong>，除非你 100% 信任来源，否则拒绝。
      </li>
    </ul>
    <p>
      <strong>判断口诀：这个功能，真的需要这个权限吗？</strong>按功能最小化原则，想不明白为什么需要，就别给。
    </p>

    <h2>四、上传扫描（多引擎查毒）</h2>
    <p>
      如果还是不放心，把 APK 传到<strong>在线多引擎扫描服务</strong>过一遍。它们会用几十个杀毒引擎同时查这个文件。
    </p>
    <ul>
      <li>
        <strong>怎么读结果：</strong>
        <ul>
          <li>0 报毒 → 基本没问题（但不代表 100% 安全，签名和来源仍要看）。</li>
          <li>1~2 个引擎报毒 → 可能是<strong>误报</strong>，看报的是什么名字，结合来源判断。</li>
          <li>
            多个主流引擎都报毒 → <strong>直接别装</strong>。
          </li>
        </ul>
      </li>
      <li>
        注意：<strong>上传有隐私成本</strong>，包里如果含你的账号信息，谨慎上传到公共平台。
      </li>
    </ul>

    <h2>五、装前隔离观察（最后一道保险）</h2>
    <p>即便前面都过了，第一次运行也保持警惕：</p>
    <ul>
      <li>
        <strong>先看它要联网要干什么。</strong>一个离线小工具却疯狂联网上传数据，可疑。
      </li>
      <li>
        <strong>用&quot;应用权限管理&quot;随时收回权限</strong>，观察它是否还能正常工作。
      </li>
      <li>
        <strong>重要设备（有网银、工作资料）别装来源不明的包</strong>，拿备用机试更稳。
      </li>
      <li>
        <strong>装完对一下安装包的哈希值（SHA-256）</strong>，和下载页公布的一致才是完整未被篡改的包。
      </li>
    </ul>

    <h2>六、一张表快速自查</h2>
    <ul>
      <li>
        <strong>来源</strong> — 优先官方商店/知名站点；危险信号：弹窗小站、重打包版。
      </li>
      <li>
        <strong>签名</strong> — 对比官方签名指纹；危险信号：签名对不上。
      </li>
      <li>
        <strong>权限</strong> — 看申请列表；危险信号：权限与功能不符。
      </li>
      <li>
        <strong>查毒</strong> — 多引擎在线扫描；危险信号：多个引擎报毒。
      </li>
      <li>
        <strong>哈希</strong> — 对比官方 SHA-256；危险信号：哈希不一致。
      </li>
    </ul>

    <h2>七、几个常见误区</h2>
    <ul>
      <li>
        <strong>&quot;我装了很多年都没事&quot;</strong> → 恶意软件不一定马上发作，可能先潜伏收集数据。
      </li>
      <li>
        <strong>&quot;文件小就没毒&quot;</strong> → 病毒可以只有几十 KB，大小不是安全指标。
      </li>
      <li>
        <strong>&quot;手机管家说是安全的&quot;</strong> → 单引擎可能漏报，多引擎+签名核对才更稳。
      </li>
      <li>
        <strong>&quot;官网下的就一定安全&quot;</strong> → 官网也可能被劫持镜像，装前顺手对下签名更保险。
      </li>
    </ul>

    <h2>结语</h2>
    <p>
      APK 安全检测没那么玄乎，核心就一句话：<strong>来源要正、签名要对、权限要合理、内容要扫过。</strong>
      前三项花 2 分钟，能挡掉绝大多数坑。记住：<strong>系统只管&quot;能不能装&quot;，&quot;该不该装&quot;得你自己把关。</strong>
      养成装前查一遍的习惯，比装任何&quot;安全软件&quot;都管用。
    </p>
    <p>
      想直接拿到官方的正版签名包、而不是在下载站里赌运气？看这篇：
      <Link href="/blog/google-play-apk-downloader-to-pc">从 Google Play 把官方 APK 拉到电脑</Link>。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "下载的 APK 装之前怎么判断它安不安全？",
    answer:
      "做五项检查：(1) 确认来源可信——优先官方商店或知名镜像；(2) 核对签名证书指纹是否与官方一致；(3) 检查权限列表，凡是与功能不符的一律拒绝；(4) 上传到多引擎在线查毒平台扫一遍；(5) 首次运行在隔离环境里观察。前两项几分钟就能做完，能挡住绝大多数问题。",
  },
  {
    question: "不用电脑能查 APK 的签名吗？",
    answer:
      "可以。在手机上装一个 APK 分析类 App（如 APK Signer Checker），用它打开这个 APK，读取签名指纹（SHA-256），再和该 App 官方公布的指纹对比。不一致说明这个包被重新签过名，几乎可以确定是被重打包或篡改了。",
  },
  {
    question: "APK 里哪些权限算是危险信号？",
    answer:
      "凡是与 App 用途不符的权限都是警告信号，比如计算器却申请通讯录、短信和定位。风险最高的是无障碍服务、设备管理员、安装其他应用这三类权限，恶意软件最爱滥用。按最小化原则：想不明白功能为何需要，就拒绝。",
  },
  {
    question: "文件小的 APK 是不是更不容易是病毒？",
    answer:
      "不是。恶意代码可能只有几十 KB，所以文件大小不能作为安全指标。异常小的文件更可能是下载中断的残片或错误页面，异常大的则可能被塞进了额外载荷。判断要看来源、签名和扫描结果，而不是体积。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      下载安卓 App 时遇到&quot;官方商店没有&quot;，就得去第三方站点找 APK。但第三方站点鱼龙混杂：
      <strong>有的只是搬运原包，有的却专门做&quot;重打包投毒&quot;</strong>
      ——把正版 App 解包，塞进广告 SDK 或后门，再用同一个名字发出去。这篇教你
      <strong>怎么判断一个下载站靠不靠谱</strong>，以及下载时具体怎么操作。
    </p>
    <p>
      结论先讲：<strong>判断第三方站靠不靠谱，看四点——是否公开签名指纹、是否提供哈希校验、是否标明包版本/包名、是否有大量正常用户口碑。</strong>
      四点都不满足的站，别用来装重要 App。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>好的下载站会主动让你&quot;验货&quot;（给签名、给哈希），差的下载站只让你&quot;快点下载&quot;。</strong>
        一个站点愿不愿意让你核对，本身就是信号。
      </p>
    </blockquote>

    <h2>一、什么叫&quot;重打包投毒&quot;</h2>
    <p>理解这个，才知道为什么必须核对。</p>
    <ul>
      <li>
        <strong>重打包（repackaging）</strong>：用工具把官方 APK 解包 → 改代码（插广告/后门）→ 重新打包 →
        用自己的签名签一遍。
      </li>
      <li>
        <strong>投毒</strong>：改过的包会偷偷<strong>后台联网、偷通讯录/短信/相册、弹广告、甚至盗号</strong>。
      </li>
      <li>
        <strong>关键破绽</strong>：<strong>它改不了原开发者的签名</strong>。所以你只要核对签名，就能识破它。
      </li>
    </ul>
    <blockquote>
      <p>
        <strong>一句话：名字可以复制，图标可以复制，但签名复制不了。</strong>这就是签名核对的全部意义。
      </p>
    </blockquote>

    <h2>二、四点判断一个下载站</h2>
    <p>
      <strong>① 是否公开&quot;签名指纹/校验信息&quot;</strong>
      <br />
      靠谱站点往往会标注该 App 的官方签名指纹（SHA-256）或提供校验值。愿者公开，说明不怕你查。
    </p>
    <p>
      <strong>② 是否提供文件哈希（SHA-256/MD5）</strong>
      <br />
      下载页给出哈希，你下完后自己算一遍对比——一致才是完整未被篡改的包。
    </p>
    <p>
      <strong>③ 是否标明包名、版本、更新日期</strong>
    </p>
    <ul>
      <li>
        包名（如 <code>com.xxx.yyy</code>）要和官方一致。
      </li>
      <li>版本号、更新日期不能&quot;超前&quot;或长期不更新。</li>
      <li>只写&quot;最新版&quot;&quot;破解版&quot;却不说版本号的，警惕。</li>
    </ul>
    <p>
      <strong>④ 是否有真实用户口碑</strong>
      <br />
      搜一下站点名 + &quot;安全/骗/毒&quot;，看看社区怎么说。口碑好的老站通常更可靠。
    </p>

    <h2>三、下载时的具体操作步骤</h2>
    <p>
      <strong>步骤 1：确认这是不是&quot;通用包&quot;</strong>
      <br />
      第三方站常见 <code>.apk</code>（标准）、<code>.xapk</code>/<code>.apks</code>（分片/打包）。想直接装优先选{" "}
      <strong>universal APK</strong>。
    </p>
    <p>
      <strong>步骤 2：下载后先别装，先验哈希</strong>
    </p>
    <ul>
      <li>
        电脑上：<code>shasum -a 256 文件名.apk</code>（macOS）或{" "}
        <code>certutil -hashfile 文件名.apk SHA256</code>（Windows）。
      </li>
      <li>
        和下载页公布的哈希<strong>逐位对比</strong>，一致才继续。
      </li>
    </ul>
    <p>
      <strong>步骤 3：核对签名</strong>
    </p>
    <ul>
      <li>
        电脑：<code>apksigner verify --print-certs app.apk</code>。
      </li>
      <li>
        把输出的 SHA-256 指纹和官方公布的对比。<strong>对不上 = 重打包，弃用。</strong>
      </li>
    </ul>
    <p>
      <strong>步骤 4：查权限、上传查毒</strong>
    </p>
    <ul>
      <li>安装时看权限列表，权限与功能不符就警惕。</li>
      <li>有疑虑就传多引擎在线查毒平台过一遍。</li>
    </ul>
    <p>
      <strong>步骤 5：装完观察</strong>
    </p>
    <ul>
      <li>首启看是否异常联网、弹广告。</li>
      <li>重要设备别装来源不明的包。</li>
    </ul>

    <h2>四、一张表：靠谱站 vs 投毒站</h2>
    <ul>
      <li>
        <strong>签名信息</strong>：靠谱站公开可核对 / 投毒站不提或含糊。
      </li>
      <li>
        <strong>文件哈希</strong>：靠谱站提供 SHA-256 / 投毒站没有。
      </li>
      <li>
        <strong>版本信息</strong>：靠谱站标明包名/版本 / 投毒站只写&quot;最新/破解&quot;。
      </li>
      <li>
        <strong>下载体验</strong>：靠谱站干净、少弹窗 / 投毒站弹窗诱导下载。
      </li>
      <li>
        <strong>用户口碑</strong>：靠谱站社区认可 / 投毒站有&quot;有毒&quot;投诉。
      </li>
      <li>
        <strong>宣传语</strong>：靠谱站老实说清 / 投毒站&quot;无限金币/去广告&quot;。
      </li>
    </ul>

    <h2>五、这些&quot;高风险信号&quot;要记牢</h2>
    <ul>
      <li>
        <strong>诱导你装&quot;下载器/加速器&quot;才能下</strong> → 常见套路，实际给你装的是别的软件。
      </li>
      <li>
        <strong>宣称&quot;破解版/无限内购&quot;</strong> → 几乎必然是重打包，风险最高。
      </li>
      <li>
        <strong>要求关闭安全软件/忽略警告</strong> → 典型恶意软件话术。
      </li>
      <li>
        <strong>短链接跳转多次才到下载页</strong> → 中间可能被替换成假包。
      </li>
      <li>
        <strong>APK 体积异常小或异常大</strong> → 小可能是残片/马，大可能被塞了东西。
      </li>
    </ul>

    <h2>六、更省事的替代方案</h2>
    <p>与其在第三方站里&quot;排雷&quot;，不如优先走这些更安全的路：</p>
    <ul>
      <li>
        <strong>官方商店 / 官方官网</strong>直接下。
      </li>
      <li>
        <strong>抓官方渠道的包</strong>：用能连官方商店的方式（如通过 Google Play 拉取官方 APK
        再传到自己手机），从源头保证是原包。
      </li>
      <li>
        <strong>只去一两个你长期信得过的镜像站</strong>，别每次随便搜。
      </li>
    </ul>

    <h2>结语</h2>
    <p>
      第三方 APK 下载站不是不能用，而是要<strong>带着&quot;验货&quot;的习惯用</strong>：看它愿不愿意公开签名和哈希，下完自己核对一遍。记住核心口诀——
      <strong>名字可复制，签名不可复制；愿让你核对的站，才值得信任。</strong>
      装前花两分钟验货，比事后中招再清理划算得多。
    </p>
    <p>
      想看完整的装前五项检测清单（含签名、权限、查毒）？看这篇：
      <Link href="/blog/apk-download-security-check">APK 下载后怎么安全检测</Link>。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "怎么判断一个第三方 APK 下载站靠不靠谱？",
    answer:
      "看四点：是否公开该 App 的官方签名指纹、是否提供文件哈希（SHA-256/MD5）供你校验、是否标明包名/版本/更新日期、是否有真实的用户口碑。四点都不满足的站点，不要用来安装重要 App。一个愿意让你核对签名和哈希的站点，比只催你'快点下载'的站点可信得多。",
  },
  {
    question: "什么是重打包投毒，怎么识破？",
    answer:
      "重打包是用工具把官方 APK 解包、改代码（插广告或后门）、重新打包并用自己的签名签一遍。它改不了原开发者的签名，所以只要你核对签名指纹，就能识破：输出的 SHA-256 和官方公布的不一致，就说明这个包被重新签过名，应当弃用。",
  },
  {
    question: "下载 APK 后怎么自己校验文件有没有被篡改？",
    answer:
      "先用 shasum -a 256（macOS）或 certutil -hashfile 文件名.apk SHA256（Windows）计算文件哈希，和下载页公布的值逐位对比；再用 apksigner verify --print-certs 读取签名指纹，和官方公布的对比。哈希一致说明文件完整，签名一致说明是原厂包，两者都通过才安全。",
  },
  {
    question: "哪些下载站信号说明风险很高？",
    answer:
      "要求先安装'下载器/加速器'才能下载、宣称'破解版/无限内购'、要求关闭安全软件或忽略警告、短链接多次跳转才到下载页、APK 体积异常小或异常大——这些都是高风险信号。遇到这类站点，优先换官方商店或可信镜像，别冒险安装。",
  },
];

export const zhPosts20260911: BlogPostEntry[] = [
  {
    slug: "apk-download-security-check",
    title: "APK 下载后怎么安全检测？装前必做的 5 项检查（2026 实操指南）",
    description:
      "从第三方网站、论坛、网盘下载 APK，最怕装了带毒/带后门的包。安卓没有严格审核，谁都能上传 APK，但你在安装前完全可以自己把风险查清楚：查来源、验签名、看权限、多引擎查毒、装前隔离观察。这篇按从易到难给出 5 项装前检查，前 3 项 2 分钟就能做完，附速查表与常见误区（'装了很多年都没事''文件小就没毒'），帮你把第三方 APK 的风险降到最低。",
    date: "2026-09-11",
    readTime: "8 min read",
    tags: ["android", "apk", "安全", "侧载", "签名", "权限", "查毒", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "how-to-vet-third-party-apk-download-sites",
    title: "第三方 APK 下载站怎么选？避开\"重打包投毒\"站点的实操方法（2026）",
    description:
      "官方商店没有的 App 就得去第三方站找 APK，但有的站专门做\"重打包投毒\"——解包正版、塞进广告或后门、用同一个名字发出去。这篇教你四招判断下载站是否靠谱（是否公开签名指纹、是否给哈希、是否标明包名版本、是否有口碑），下载后如何用 shasum 对哈希、用 apksigner 对签名，附\"靠谱站 vs 投毒站\"对照表、高风险信号清单与更安全的替代方案。记住：名字可复制，签名不可复制。",
    date: "2026-09-11",
    readTime: "8 min read",
    tags: ["android", "apk", "下载站", "重打包", "签名", "哈希校验", "安全", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260911List = toList(zhPosts20260911);
