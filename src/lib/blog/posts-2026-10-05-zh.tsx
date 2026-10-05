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
      版本没更新、Play 商店装不了、第三方下的包一点就报错……很多人卡在同一个点：
      <strong>「明明下的是最新版 YouTube APK，就是装不上。」</strong>
      这篇不重复讲下载，专治「下完了却装不上」的各种坑。无论你是为更新、为去广告，还是为在无谷歌服务的设备上看视频，都能在这里找到对应解法。
    </p>
    <p>
      先给结论：
      <strong>YouTube APK 装不上，90% 出在三个地方——拆分包没装配套安装器、设备架构不匹配、跟系统自带的 YouTube 冲突。</strong>
      对症排查，比反复换下载源有用得多。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>「装不上」是安卓在告诉你哪一环不对，不是包废了。</strong>
        看清报错文案，直接定位，别瞎换源。
      </p>
    </blockquote>

    <h2>一、先看报错，对号入座</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>报错文案</th>
            <th>真正原因</th>
            <th>去哪一节</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>「解析包时出现问题」/ There was a problem parsing</td>
            <td>拆分包直接装了 / 架构不符</td>
            <td>第二、三节</td>
          </tr>
          <tr>
            <td>「应用未安装」/ App not installed</td>
            <td>与系统自带版本签名冲突</td>
            <td>第四节</td>
          </tr>
          <tr>
            <td>「应用未安装，因为此应用与现有应用冲突」</td>
            <td>同包名不同签名</td>
            <td>第四节</td>
          </tr>
          <tr>
            <td>装完点开闪退</td>
            <td>缺 Google 服务框架 / 架构不符</td>
            <td>第三、五节</td>
          </tr>
          <tr>
            <td>完全没有安装按钮</td>
            <td>文件是 .apks / .apkm 分包</td>
            <td>第二节</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>二、最大的坑：拆分包（.apks / .apkm）不能直接点</h2>
    <p>
      从 2023 年起，YouTube 主要走 <strong>AAB 分发</strong>，第三方站下到的往往是 <strong>.apks</strong> 或{" "}
      <strong>.apkm</strong> 打包文件——<strong>它不是一个能双击安装的 APK</strong>，而是「一个主包 + 各架构分支 +
      各种语言/分辨率资源」的合集。
    </p>
    <p>
      <strong>正确做法：</strong>
    </p>
    <ol>
      <li>
        认准文件后缀：<code>.apk</code> 单文件可直接装；<code>.apks</code> / <code>.apkm</code> /{" "}
        <code>.xapk</code> 必须用安装器。
      </li>
      <li>
        装一个分包安装器：
        <ul>
          <li>
            <strong>APKMirror Installer</strong>（专治 <code>.apkm</code>）
          </li>
          <li>
            <strong>SAI（Split APKs Installer）</strong>（通吃 <code>.apks</code>/<code>.xapk</code>，需授权）
          </li>
        </ul>
      </li>
      <li>用安装器打开分包文件，让它自动挑出匹配你设备架构的那一支再装。</li>
    </ol>
    <p>
      <strong>能选单文件就别用分包。</strong>下载时优先找 NOBUNDLE / universal 的 <code>.apk</code>，一步到位，省掉安装器。
    </p>

    <h2>三、架构不匹配：arm64 与 armeabi 别搞混</h2>
    <p>
      现代手机几乎都是 <strong>arm64-v8a</strong>，老设备或部分平板是 <strong>armeabi-v7a</strong>。下错了架构：
    </p>
    <ul>
      <li>装的时候报解析错误；</li>
      <li>或勉强装上，一打开秒闪退。</li>
    </ul>
    <p>
      <strong>怎么确认自己是什么架构：</strong>
    </p>
    <ul>
      <li>简单判断：2016 年后的主流手机基本都是 arm64-v8a。</li>
      <li>精确判断：装一个 AIDA64 或 CPU-Z，看 CPU Architecture 一栏。</li>
      <li>拿不准就直接下 universal（通用）包，它同时包含所有架构。</li>
    </ul>

    <h2>四、「应用未安装」：跟系统自带 YouTube 冲突</h2>
    <p>
      不少国产 ROM 或定制系统预装了 YouTube（如果装了 GMS），或者你之前用另一个源装过。这时新包如果
      <strong>签名和已装的不是同一把钥匙</strong>，系统一律拒绝覆盖。
    </p>
    <p>
      <strong>处置顺序：</strong>
    </p>
    <ol>
      <li>先确认已装版本的来源。设置 → 应用 → YouTube，看是不是系统应用。</li>
      <li>如果是可卸载的旧版：先卸载，再装新包。</li>
      <li>
        如果是系统预装、卸载按钮是灰的：只能装同源同签名的官方新版；要装修改版（ReVanced 等），得先通过官方渠道卸载原版或用
        root/Shizuku 停用。
      </li>
      <li>
        记住：<strong>同包名不同签名的两支包，安卓绝不允许共存，也不允许覆盖。</strong>这是保护机制，不是故障。
      </li>
    </ol>

    <h2>五、装上了却闪退：多半缺 Google 服务</h2>
    <p>
      YouTube 是谷歌全家桶应用，<strong>强依赖 GMS（Google Mobile Services）</strong>。没有 GMS 的国产机、或 GMS
      装得不全的机器，即使 APK 装上了也会：
    </p>
    <ul>
      <li>一打开就闪退；</li>
      <li>卡在登录，提示「此设备不支持 Google Play 服务」。</li>
    </ul>
    <p>
      <strong>解决路径：</strong>
    </p>
    <ul>
      <li>装完整的 Google 服务框架三件套（服务框架 + Play 服务 + Play 商店）；</li>
      <li>或改用 ReVanced 修改版（可脱离部分 GMS 依赖运行，且去广告、支持后台播放）；</li>
      <li>只是想看视频，也可直接用网页版 m.youtube.com 免登录观看。</li>
    </ul>

    <h2>六、标准排查流程（照着走）</h2>
    <ol>
      <li>
        <strong>看后缀</strong>：<code>.apks</code>/<code>.xapk</code> → 用 SAI 装；<code>.apk</code> → 下一步。
      </li>
      <li>
        <strong>看架构</strong>：不确定就下 universal 包。
      </li>
      <li>
        <strong>看冲突</strong>：先卸载签名不同的旧版。
      </li>
      <li>
        <strong>看 GMS</strong>：闪退就补 Google 服务框架。
      </li>
      <li>
        <strong>还不行</strong>：换一个来源（APKMirror 相对可信），确认包的完整性和版本号再试。
      </li>
    </ol>

    <h2>七、安全提醒（别跳过）</h2>
    <ul>
      <li>
        <strong>只从口碑站下</strong>：APKMirror、APKPure 相对可靠；认准域名，谨防山寨站。
      </li>
      <li>
        <strong>改版要谨慎</strong>：破解/汉化/去广告版可能夹带后门，装前先扫毒、看权限。
      </li>
      <li>
        <strong>安装前验证签名</strong>：用 SAI 或 apksigner 看签名者与官方是否一致，能挡掉大部分二次打包的假包。
      </li>
    </ul>

    <h2>八、总结</h2>
    <ul>
      <li>
        <strong>分包没配安装器</strong>：装 SAI 或 APKMirror Installer，别直接点 .apks。
      </li>
      <li>
        <strong>架构下错</strong>：不确定就下 universal 包。
      </li>
      <li>
        <strong>签名冲突</strong>：先卸载同包名异签名的旧版。
      </li>
      <li>
        <strong>缺 GMS</strong>：补谷歌服务框架，或改用 ReVanced / 网页版。
      </li>
    </ul>
    <p>
      YouTube APK 装不上，<strong>不是运气问题，是类型问题</strong>。记住一句话：看清报错、对号入座、别乱换源。先把包和设备的匹配关系搞对，再谈其他。
    </p>
    <p>
      想省去判断后缀、架构、签名的麻烦？试试 <Link href="/">gptoapk.com</Link> —— 按 Google Play
      链接下载 APK，附带版本、ABI 与兼容信息。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "YouTube APK 下载下来装不上是怎么回事？",
    answer:
      "常见三个原因：一是下到的是 .apks/.apkm 拆分包，不能直接点，需要用 SAI 或 APKMirror Installer 安装；二是设备 CPU 架构不匹配（如 arm64 与 armeabi），装错会报解析错误或闪退；三是与系统自带或旧版 YouTube 签名冲突，系统拒绝覆盖。对照报错文案逐一排查即可。",
  },
  {
    question: "下载的 YouTube 是 .apks 或 .apkm 文件怎么安装？",
    answer:
      "这类是 AAB 拆分包，不能直接点击安装。需先安装一个分包安装器，如 APKMirror Installer（.apkm）或 SAI（.apks/.xapk），用安装器打开文件，它会自动选择匹配你设备架构的分支进行安装。更省事的做法是优先寻找 universal 或 NOBUNDLE 的单文件 .apk。",
  },
  {
    question: "YouTube 装好了一打开就闪退怎么办？",
    answer:
      "多半是缺少 GMS（Google 移动服务）或架构不匹配。可以先补装完整的 Google 服务框架三件套（服务框架 + Play 服务 + Play 商店）；如果设备不便安装 GMS，可改用 ReVanced 修改版或直接使用网页版 m.youtube.com。另外确认下载的包架构与设备一致，不确定时选 universal 通用包。",
  },
  {
    question: "覆盖安装 YouTube 提示签名不一致怎么办？",
    answer:
      "这是安卓的保护机制：同包名不同签名的两个包不允许共存或互相覆盖。若要装的是官方同源新版，直接安装即可无痛覆盖；若要装的是第三方改版，需先卸载旧版再装（会清除应用数据，重要数据先备份）。切勿使用「去签名校验」工具强制安装，那正是恶意软件常见的入口。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      「签名验证失败」「签名校验错误」「INSTALL_PARSE_FAILED_NO_CERTIFICATES」「INSTALL_FAILED_UPDATE_INCOMPATIBLE」——
      这些提示看着吓人，其实<strong>绝大多数不是包坏了，而是「包与设备已有安装的关系对不上」</strong>
      。这篇把三类常见签名报错讲透，并给出对应的修复方法。
    </p>
    <p>
      先讲结论：
      <strong>签名验证失败分两种性质——一种是「包本身没签好/被改过」（危险），一种是「新旧包签名不一致导致覆盖被拒」（正常保护）。</strong>
      先分清性质，再决定是修、是换、还是停手。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>签名报错是安卓的安全底线在起作用。</strong>
        你的第一反应应该是「这个包可信吗」，而不是「怎么绕过校验」。绕过校验地装一个签名对不上的包，等于把后门请进门。
      </p>
    </blockquote>

    <h2>一、先看懂签名到底在验什么</h2>
    <p>APK 签名验证，本质是回答两个问题：</p>
    <ol>
      <li>
        <strong>这个包有没有被篡改？</strong>签名用开发者的私钥生成，改动包内任意字节都会让签名失效。
      </li>
      <li>
        <strong>这个包是不是「同一开发者」？</strong>系统用签名证书指纹判断新旧包是否同源，决定能不能覆盖安装。
      </li>
    </ol>
    <p>
      所以签名报错，要么是包被改过（问题 1 失败），要么是跟已装的不是同一把钥匙（问题 2 失败）。
    </p>

    <h2>二、三类报错，对号入座</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>报错</th>
            <th>含义</th>
            <th>性质</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>INSTALL_PARSE_FAILED_NO_CERTIFICATES</td>
            <td>包里根本没签名，或签名块损坏</td>
            <td>包的问题</td>
          </tr>
          <tr>
            <td>INSTALL_FAILED_UPDATE_INCOMPATIBLE / 签名不一致</td>
            <td>新包与已装包签名不同</td>
            <td>冲突问题</td>
          </tr>
          <tr>
            <td>签名验证失败 / 校验错误（手机管家类提示）</td>
            <td>包被二次打包或篡改</td>
            <td>安全隐患</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>三、类型一：NO_CERTIFICATES —— 包没签名或签名坏了</h2>
    <p>
      <strong>典型场景</strong>：自己编译的 APK 忘了签名、下载中断导致包损坏、用工具重打包后丢了签名。
    </p>
    <p>
      <strong>修复方法：</strong>
    </p>
    <ol>
      <li>
        <strong>换一个来源重新下载</strong>。多数情况是下载不完整或来源不可靠，重下官方包即可。
      </li>
      <li>
        <strong>校验文件完整性</strong>：对比文件大小、MD5/SHA-256 是否和来源页给出的一致。
      </li>
      <li>
        <strong>若是自己打包</strong>：用 apksigner 重新签名（生成密钥 → apksigner sign → apksigner verify），看到
        Verified using v1/v2/v3 scheme: true 才算签好。
      </li>
    </ol>

    <h2>四、类型二：签名不一致 —— 覆盖安装被拒（最常见）</h2>
    <p>
      <strong>典型场景</strong>：手机里已装了官方版，现在想覆盖装一个「第三方改版/汉化版/不同市场版」，结果报签名冲突。
    </p>
    <p>
      <strong>原因</strong>：同包名、不同签名的两支包，安卓绝不允许共存，也绝不允许互相覆盖。这是铁律。
    </p>
    <p>
      <strong>修复方法（按推荐度排序）：</strong>
    </p>
    <ol>
      <li>
        <strong>装官方同源新版</strong>——唯一能「无痛覆盖」的路。只要来源与已装版同一开发者，指纹一致，直接装。
      </li>
      <li>
        <strong>先卸载再安装</strong>——如果要装的是改版：先卸载旧版，再装新包。注意：卸载会清掉应用数据，重要数据先备份。
      </li>
      <li>
        <strong>别用「清除签名校验」的歪招</strong>。网上所谓「去签名校验工具」大多会重签包，进一步破坏可信度，且可能触发风控。
      </li>
    </ol>

    <h2>五、类型三：被篡改 —— 立刻停手</h2>
    <p>
      <strong>危险信号</strong>：官方名义的包，却提示签名校验失败；或杀毒/手机管家直接拦截。
    </p>
    <p>
      <strong>这几乎可以确定：包被二次打包，被植入了广告、劫持或后门。</strong>正确动作：
    </p>
    <ol>
      <li>
        <strong>立即删除</strong>，不要尝试安装。
      </li>
      <li>
        <strong>回官方源重下</strong>（官网 / Google Play / 官方 GitHub）。
      </li>
      <li>
        若一定要用第三方源，优先 APKMirror（它有独立的签名校验机制），并在装前自己验一遍签名。
      </li>
    </ol>

    <h2>六、自己验证签名：30 秒挡住假包</h2>
    <p>
      <strong>手机上</strong>：用 SAI 打开 APK，点「查看签名/证书」，核对签名者名称与官方是否一致。
    </p>
    <p>
      <strong>电脑上</strong>：
    </p>
    <ul>
      <li>
        <code>apksigner verify --print-certs app.apk</code> —— 查看签名信息
      </li>
      <li>
        <code>keytool -printcert -jarfile app.apk</code> —— 看证书指纹
      </li>
    </ul>
    <p>
      <strong>关键点</strong>：把指纹（SHA-256）和你已知的官方指纹对比。指纹一致 = 同源可信；不一致 = 哪怕是同一个
      App 名，也要当心。
    </p>

    <h2>七、标准排查流程</h2>
    <ol>
      <li>
        <strong>看报错文案</strong> → 判断是「没签名」「签名冲突」还是「被篡改」。
      </li>
      <li>
        <strong>没签名/损坏</strong> → 重下官方包，校验 MD5。
      </li>
      <li>
        <strong>签名冲突</strong> → 卸载旧版再装，或改用官方同源包。
      </li>
      <li>
        <strong>疑似被篡改</strong> → 立即删除，回官方源。
      </li>
      <li>
        <strong>装前自验</strong> → 用 SAI 或 apksigner 核对指纹。
      </li>
    </ol>

    <h2>八、几条要记住的底线</h2>
    <ul>
      <li>
        <strong>签名不同 ≠ 包一定坏，但一定不能和旧版共存。</strong>
      </li>
      <li>
        <strong>官方包优先，第三方源只作备选</strong>，且装前必验签名。
      </li>
      <li>
        <strong>永远不要「绕过签名校验」去装破解包</strong>——那正是恶意软件最常见的入口。
      </li>
      <li>自己打包分发，务必用固定密钥，别每次换，否则用户永远无法覆盖升级。</li>
    </ul>

    <h2>九、总结</h2>
    <p>
      APK 签名验证失败，先分性质：<strong>包没签好 → 重下或重签；签名冲突 → 卸载或换同源；疑似被篡改 → 立刻停手。</strong>
      签名是安卓给应用发的「身份证」，报错时它不是在刁难你，而是在替你挡风险。搞清这三类，你就能自己判断——是修、是换、还是干脆别装。
    </p>
    <p>
      需要下载官方签名的 APK 并核对版本与签名信息？试试 <Link href="/">gptoapk.com</Link> —— 按 Google Play
      链接下载 APK，附带版本、ABI 与兼容信息。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 签名验证失败是什么意思？",
    answer:
      "签名验证失败分两种性质：一种是包本身没签名或签名块损坏（INSTALL_PARSE_FAILED_NO_CERTIFICATES），另一种是新包与已安装包的签名不一致，导致系统拒绝覆盖安装（INSTALL_FAILED_UPDATE_INCOMPATIBLE）。前者多半是下载不完整或重打包失败，重新下载官方包即可；后者是安卓的保护机制，需先卸载旧版或改用同源官方包。",
  },
  {
    question: "覆盖安装提示签名不一致怎么办？",
    answer:
      "同包名不同签名的两个 APK 不允许共存或互相覆盖。要装官方同源新版可直接覆盖；要装第三方改版则需先卸载旧版再安装（会清除应用数据，先备份）。不要使用「去签名校验」工具强制安装，那会破坏包的可信度，也是恶意软件常见的入侵方式。",
  },
  {
    question: "怎么自己验证 APK 的签名是否与官方一致？",
    answer:
      "手机端可用 SAI（Split APKs Installer）打开 APK 查看签名者与证书；电脑端可用 apksigner verify --print-certs app.apk 或 keytool -printcert -jarfile app.apk 查看签名者与 SHA-256 指纹。将指纹与官方已知指纹对比，一致即可信，不一致则需警惕。",
  },
  {
    question: "提示签名校验失败是中毒了吗？",
    answer:
      "不一定，但需要高度警惕。若官方名义的包却报签名校验失败，或被杀毒软件/手机管家直接拦截，几乎可以确定是被二次打包并植入了广告、劫持或后门。正确处理是立即删除，不要安装，回到官方来源重新下载，并在安装前自行验证签名。",
  },
];

export const zhPosts20261005: BlogPostEntry[] = [
  {
    slug: "youtube-apk-an-zhuang-shi-bai-xiu-fu",
    title: "YouTube APK 装不上、装完打不开？2026 完整排查指南",
    description:
      "下载的 YouTube APK 装不上或一打开就闪退？本文按报错文案对号入座，讲清拆分包安装、CPU 架构匹配、签名冲突、缺 GMS 闪退等常见问题，附标准排查流程与安全提醒。",
    date: "2026-10-05",
    readTime: "9 分钟阅读",
    tags: ["YouTube", "APK 安装失败", "拆分包", "SAI", "GMS"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-qian-ming-yan-zheng-shi-bai-xiu-fu",
    title: "APK 签名验证失败怎么修复？3 类报错逐一排查（2026）",
    description:
      "签名验证失败、签名校验错误、INSTALL_FAILED_UPDATE_INCOMPATIBLE 怎么解决？本文把签名报错分为「没签名」「签名冲突」「被篡改」三类，逐一给出修复方法，并教你用 SAI 或 apksigner 自己验证签名。",
    date: "2026-10-05",
    readTime: "8 分钟阅读",
    tags: ["APK 签名", "签名验证失败", "安装报错", "安全性", "apksigner"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261005List = toList(zhPosts20261005);
