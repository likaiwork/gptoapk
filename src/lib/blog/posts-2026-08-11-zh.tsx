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
      小米手机在国内版系统（HyperOS / MIUI）默认不带谷歌服务，想用 Google Play、Gmail、YouTube 都得自己装。这篇文章给你一套<strong>从零到能用</strong>的完整方案，分两种情况：<strong>国行机（无GMS）</strong> 和 <strong>海外版/港版机（自带GMS）</strong>，照着做一次到位。
    </p>

    <blockquote>
      <p>先确认你的情况：<strong>设置 → 我的设备 → 全部参数</strong>，看系统是 HyperOS 还是 MIUI，再看手机是国行还是海外版。不同情况做法完全不同，别搞混。</p>
    </blockquote>

    <h2>情况一：国行小米手机（无谷歌服务框架）</h2>
    <p>国行机硬件没问题，只是系统没带 GMS（谷歌移动服务）。装谷歌商店的核心顺序是：<strong>先装服务框架，再装 Play 商店</strong>，顺序不能反。</p>

    <h3>第一步：准备基础框架（三件套）</h3>
    <p>按顺序安装这三个 APK，缺一不可：</p>
    <ol>
      <li><strong>Google Services Framework</strong>（谷歌服务框架）</li>
      <li><strong>Google Account Manager</strong>（谷歌账户管理）</li>
      <li><strong>Google Play Services</strong>（谷歌 Play 服务）</li>
    </ol>
    <p>这三个文件可以到 APKMirror 或 APKPure 搜索对应名称下载，注意<strong>选 arm64-v8a 架构、与系统 Android 版本匹配</strong>的版本。</p>

    <h3>第二步：安装 Play 商店本体</h3>
    <p>框架装好后，再装：</p>
    <ul>
      <li><strong>Google Play Store</strong>（谷歌应用商店）</li>
    </ul>
    <p>装完后<strong>先重启手机</strong>，让服务框架正常注册，再打开 Play 商店。</p>

    <h3>第三步：登录谷歌账号</h3>
    <p>打开 Play 商店 → 按提示登录。<strong>这一步最容易卡壳</strong>，常见问题和解法：</p>
    <table>
      <thead>
        <tr><th>症状</th><th>原因</th><th>解法</th></tr>
      </thead>
      <tbody>
        <tr><td>一直转圈登录不上</td><td>网络问题</td><td>挂梯子（谷歌服务需要访问境外）</td></tr>
        <tr><td>提示&quot;此设备未经认证&quot;</td><td>设备未过 CTS 认证</td><td>见下方&quot;设备认证&quot;一节</td></tr>
        <tr><td>登录后闪退</td><td>框架没装对</td><td>确认三件套版本匹配，重装重启</td></tr>
      </tbody>
    </table>
    <blockquote>
      <p>⚠️ 登录谷歌必须能访问国际网络。没有梯子的话，登录界面会一直转圈——这不是手机坏了，是网络问题。</p>
    </blockquote>

    <h2>情况二：海外版 / 港版 / 刷了国际版系统的小米</h2>
    <p>这类手机<strong>自带 GMS</strong>，直接就能用 Google Play。如果 Play 商店图标不见了，去应用商店搜&quot;Google Play&quot;或到系统应用里找，没有就用上面方法补装，但<strong>不需要重装服务框架</strong>（系统已内置）。</p>

    <h2>关键难点：设备未通过认证（CTS）</h2>
    <p>国行机装上后，经常提示 <strong>&quot;This device isn&apos;t Play Protect certified&quot;</strong>。这是因为设备没通过谷歌认证，会限制部分应用安装。</p>
    <p><strong>最稳妥的解法：</strong></p>
    <ol>
      <li>先正常登录 Play 商店（能登上去）</li>
      <li>进入 <strong>设置 → 关于手机 → 谷歌认证</strong>（部分机型路径不同，搜&quot;认证&quot;）</li>
      <li>注册设备 ID</li>
      <li>等几分钟到几小时，认证状态会自动通过</li>
    </ol>
    <blockquote>
      <p>个别机型注册后仍不通过，可以刷入 <strong>Magisk</strong> 配合对应模块，但这对新手不友好，且会破坏保修/系统完整性。<strong>不折腾系统、只日常使用的话，可以先不管认证</strong>，绝大多数应用照样能装能用。</p>
    </blockquote>

    <h2>安装后必做的 3 件事</h2>
    <ol>
      <li><strong>关闭应用限制：</strong>设置 → 应用 → 管理应用 → Google Play 商店 → 允许后台数据、自启动</li>
      <li><strong>开启 Play Protect：</strong>Play 商店 → 头像 → Play Protect → 开启扫描，它能挡掉恶意 APK</li>
      <li><strong>更新问题：</strong>如果 Play 商店一直不更新应用，手动<strong>清掉 Play 商店和 Play 服务的缓存和数据</strong>再重开，通常就能恢复正常</li>
    </ol>

    <h2>常见问题速查</h2>
    <p><strong>Q：装了谷歌商店但打开闪退？</strong><br />多半是服务框架没装对或没重启。按&quot;情况一&quot;的顺序重装三件套，装完<strong>重启</strong>再试。</p>
    <p><strong>Q：Play 商店能打开但应用下载失败？</strong><br />先确认网络能访问谷歌（测一下能打开 YouTube），再看下载存储空间是否足够。</p>
    <p><strong>Q：小米应用商店能搜到谷歌商店直接装吗？</strong><br />小米应用商店也有谷歌三件套入口（部分版本），但版本可能滞后。赶时间可以试，但要更稳妥就用 APKMirror 手动装。</p>
    <p><strong>Q：装谷歌框架后系统变卡或耗电？</strong><br />正常现象，GMS 常驻后台。可在&quot;应用管理&quot;里对谷歌服务做<strong>省电策略限制</strong>，不影响使用。</p>

    <h2>总结</h2>
    <p>给国行小米装谷歌商店，核心就一句话：<strong>按&quot;服务框架 → 账户管理 → Play服务 → Play商店&quot;顺序装，装完重启，登录时挂梯子</strong>。顺序和网络，是九成失败的原因。照这个流程走，多数人 20 分钟内就能用上 Google Play。</p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      想看最新版 YouTube，但 Play 商店没有、或想装带额外功能的修改版？这篇文章讲清楚三件事：<strong>怎么下官方最新版、怎么分辨修改版安不安全、以及安装到各种设备上的具体步骤</strong>。
    </p>

    <blockquote>
      <p>⚠️ 先说最重要的常识：<strong>从非官方渠道下载 YouTube APK 有被植入恶意代码的风险</strong>（盗号、挖矿、植入广告劫持）。想省心就用官方渠道；要用修改版，务必只选口碑好、更新勤的源，且安装前做好本文第三节的验证。</p>
    </blockquote>

    <h2>一、官方最新版怎么下（最安全）</h2>
    <p><strong>电脑端</strong></p>
    <ol>
      <li>打开 <strong>APKMirror</strong>（apkmirror.com），搜索 &quot;YouTube&quot;</li>
      <li>页面会按版本从新到旧排列，<strong>最上面那条就是最新版</strong></li>
      <li>点进版本页，选匹配你设备的文件：
        <ul>
          <li>现代手机：选 <code>arm64-v8a</code></li>
          <li>老手机/平板：看自己架构，NOBUNDLE（单文件 .apk）更好装</li>
        </ul>
      </li>
      <li>下载后用你手机浏览器或电脑传到手机安装</li>
    </ol>
    <p><strong>手机端（无谷歌服务也能用）</strong></p>
    <ul>
      <li>APKMirror 会返回带 <code>.apks</code>（拆分包）的最新版，需要 <strong>APKMirror Installer</strong> 或 <strong>SAI</strong> 来安装，别直接点会失败。</li>
    </ul>
    <p><strong>开源替代：ReVanced（可去广告、解锁功能）</strong></p>
    <p>如果你要的是&quot;去广告 + 后台播放&quot;，ReVanced 是目前最主流的安全选择：</p>
    <ol>
      <li>从 <strong>ReVanced 官网</strong>（revanced.app，认准官方域名，谨防山寨站）下载 ReVanced Manager</li>
      <li>在 Manager 里<strong>先安装原版 YouTube</strong>，再通过它打补丁生成修改版</li>
      <li>生成的 APK 再安装即可</li>
    </ol>
    <blockquote>
      <p>ReVanced 是把补丁应用到<strong>你下载的正版 APK</strong> 上，比直接下&quot;打包好的修改版&quot;更可控、更不容易被夹带私货。</p>
    </blockquote>

    <h2>二、各设备安装步骤</h2>
    <p><strong>小米 / 华为 / OPPO / vivo 等国行安卓机</strong></p>
    <ol>
      <li>下载 APK 到手机</li>
      <li>用文件管理器打开，点击安装</li>
      <li>首次会提示允许&quot;从此来源安装&quot;，<strong>只对该应用的来源开启</strong></li>
      <li>安装完成后关闭该来源权限（更安全）</li>
    </ol>
    <p><strong>电视 / 盒子（Android TV）</strong></p>
    <ol>
      <li>在电视上下载 APK（用当贝市场搜，或 U盘拷贝）</li>
      <li>打开&quot;未知来源安装&quot;开关</li>
      <li>安装。注意：电视版 YouTube 需要 GMS，国行电视可能要装 SmartTube（第三方电视客户端，可去广告）</li>
    </ol>
    <p><strong>iOS（iPhone/iPad）</strong></p>
    <p>iOS 不能直接装 APK，只能用 App Store 的美区账号下载官方 YouTube。真要用第三方，风险高且会被封，不建议折腾。</p>

    <h2>三、怎么分辨 APK 安不安全（装修改版必看）</h2>
    <p>装任何非官方 YouTube 之前，花两分钟做 4 个检查：</p>
    <ol>
      <li><strong>看版本号和大小：</strong>官方最新版大小稳定（约 120-150MB）。突然很小或版本号异常高的，可疑。</li>
      <li><strong>查签名：</strong>用 <code>apksigner verify</code> 或在线分析工具，看签名证书的<strong>签发者</strong>是否与 Google 一致。注意原版签发给 Google、ReVanced 修改版签发给 ReVanced——只要是这两个已知方之一就基本可信。</li>
      <li><strong>看权限列表：</strong>正常 YouTube 要存储、网络等权限。如果它要<strong>短信、通讯录、定位</strong>（且没有合理用途），直接放弃。</li>
      <li><strong>扫 VirusTotal：</strong>把文件（或哈希）上传 virustotal.com，<strong>2 个及以上引擎报毒就别装</strong>。</li>
    </ol>

    <h2>四、安装后常见问题</h2>
    <p><strong>装完闪退？</strong></p>
    <ul>
      <li>架构选错（下了 x86 包装到 arm64 手机）→ 重新下载 arm64-v8a 版</li>
      <li>Android 版本太低 → 看 APK 的最低系统要求</li>
      <li>修改版补丁冲突 → 换成官方版测试，确认是否修改版问题</li>
    </ul>
    <p><strong>提示&quot;应用已安装&quot;，但仍打不开？</strong><br />多为<strong>签名不一致</strong>，之前装过签名不同的版本。先卸载旧版再装新版（会清掉数据）。</p>
    <p><strong>YouTube ReVanced 登录不了账号？</strong><br />ReVanced 默认不支持谷歌登录（协议受限）。可考虑用 <strong>MicroG</strong>（ReVanced 官方配套）实现登录，或者干脆不登，仅本地使用。</p>

    <h2>五、快速决策表</h2>
    <table>
      <thead>
        <tr><th>你的需求</th><th>推荐方案</th></tr>
      </thead>
      <tbody>
        <tr><td>就要最新官方版</td><td>APKMirror 下载原版</td></tr>
        <tr><td>去广告 + 后台播放</td><td>ReVanced + 官方原版打补丁</td></tr>
        <tr><td>电视上看 YouTube</td><td>SmartTube（国行盒子）或官方</td></tr>
        <tr><td>只想安全省心</td><td>Play 商店（有 GMS 的话）直接装</td></tr>
      </tbody>
    </table>

    <h2>总结</h2>
    <p>想要 YouTube 最新版，<strong>官方 APK 走 APKMirror，功能增强走 ReVanced</strong>，这两条是现阶段最靠谱的路。无论用哪种，装之前务必做签名与权限检查——这比下载渠道本身更重要。</p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "国行小米手机怎么安装谷歌商店？",
    answer: "按顺序安装谷歌服务框架、账户管理、Play服务三件套，再装Play商店，装完重启，登录时挂梯子访问国际网络即可。顺序和网络是最容易踩坑的两点。",
  },
  {
    question: "小米手机提示设备未通过Play Protect认证怎么办？",
    answer: "先正常登录Play商店，进入设置→关于手机→谷歌认证注册设备ID，等待几分钟到几小时认证会自动通过。个别机型可刷Magisk，但会破坏保修，日常使用可先不管。",
  },
  {
    question: "海外版小米手机需要装谷歌三件套吗？",
    answer: "不需要。海外版/港版手机自带GMS谷歌服务，直接就能用Google Play。如果商店图标不见了，可在应用商店搜Google Play或按需补装商店本体，无需重装框架。",
  },
  {
    question: "装谷歌框架后手机变卡耗电正常吗？",
    answer: "正常，GMS会常驻后台。可在应用管理里对谷歌服务设置省电策略限制，不影响正常使用Google Play和各谷歌应用。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "YouTube最新版APK去哪里下载最安全？",
    answer: "官方渠道用APKMirror搜索YouTube，选arm64-v8a架构的最新版。要去广告和后台播放就用ReVanced官方Manager对原版APK打补丁，比直接下打包好的修改版更安全可控。",
  },
  {
    question: "怎么判断YouTube APK安不安全？",
    answer: "做四个检查：看版本号大小是否正常（官方约120-150MB）、用apksigner查签名签发者是否为Google或ReVanced、核对权限列表无异常索取、用VirusTotal扫描，2个以上引擎报毒就别装。",
  },
  {
    question: "YouTube APK装完闪退怎么办？",
    answer: "通常是架构选错（要装arm64-v8a而非x86）、Android版本低于最低要求、或修改版补丁冲突。对症处理：重下正确架构版本、核对系统版本、换官方版测试确认。",
  },
  {
    question: "iOS能安装YouTube APK吗？",
    answer: "不能，iOS无法直接安装APK。只能通过App Store美区账号下载官方YouTube。用第三方方式风险高且易被封号，不建议折腾。",
  },
];

export const zhPosts20260811: BlogPostEntry[] = [
  {
    slug: "xiaomi-google-play-install-guide",
    title: "小米手机安装谷歌商店（Google Play）：2026 最新教程与避坑指南",
    description: "小米手机（国行/海外版）安装谷歌商店完整教程：谷歌三件套顺序安装、Play商店安装、登录卡壳处理、设备认证（CTS）解决，20分钟用上Google Play。",
    date: "2026-08-11",
    readTime: "8 分钟阅读",
    tags: ["小米手机", "谷歌商店", "Google Play", "GMS", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "youtube-apk-latest-version-guide",
    title: "YouTube APK 最新版本下载与安装完整指南（2026）",
    description: "YouTube最新版APK怎么下：官方版走APKMirror、去广告后台播放用ReVanced，附小米/华为/电视/盒子各设备安装步骤，以及APK安全性验证四步检查。",
    date: "2026-08-11",
    readTime: "8 分钟阅读",
    tags: ["YouTube", "APK", "ReVanced", "APK下载", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260811List = toList(zhPosts20260811);
