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
      华为手机因为没有预装Google Play，很多人习惯直接下载APK安装。但华为用的是HarmonyOS系统，安装APK和普通安卓略有不同。这篇教程手把手教你在华为手机上安全安装APK，并解决常见报错。
    </p>

    <h2>一、安装前的准备工作</h2>
    <p>在开始之前，先确认三件事：</p>
    <ul>
      <li><strong>网络来源</strong>：只从官网、GitHub Releases、知名应用商店下载APK，避免恶意软件</li>
      <li><strong>应用兼容性</strong>：华为新机多为HarmonyOS 4.x或5.x，部分旧安卓应用可能不兼容</li>
      <li><strong>手机存储</strong>：确保有足够空间，APK解压后体积通常翻倍</li>
    </ul>
    <p>不要在不明网站点"高速下载"。优先选择应用官方GitHub Releases、APKMirror、APKPure等有签名验证的知名站点，或者到 <a href="https://gptoapk.com">gptoapk.com</a> 这样的可靠平台获取。</p>

    <h2>二、方法一：开启"未知来源"后直接安装</h2>
    <p>这是最常见的安装流程。</p>

    <h3>第1步：开启允许安装未知应用</h3>
    <p>打开 <strong>设置 → 安全 → 更多安全设置</strong>，找到"允许安装未知来源应用"。</p>
    <blockquote><strong>注意</strong>：HarmonyOS 4及以上版本，这里不能一键全局开启，需要针对具体应用（如文件管理、浏览器）单独授权。</blockquote>
    <ol>
      <li>进入 <strong>设置 → 安全 → 更多安全设置 → 外部来源应用安装</strong></li>
      <li>找到"文件管理"或你下载APK用的浏览器</li>
      <li>打开对应的"允许此来源安装应用"开关</li>
    </ol>

    <h3>第2步：找到APK文件并安装</h3>
    <ol>
      <li>打开 <strong>文件管理</strong> App</li>
      <li>进入 <strong>下载</strong> 文件夹，找到刚才下载的APK</li>
      <li>点击APK文件</li>
      <li>若提示风险警告，点击 <strong>仍然安装</strong></li>
      <li>等待安装完成，点击 <strong>完成</strong> 或 <strong>打开</strong></li>
    </ol>

    <h2>三、方法二：使用华为应用市场安装</h2>
    <p>部分非华为上架的应用，华为应用市场也收录了，安装更安全：</p>
    <ol>
      <li>打开 <strong>华为应用市场</strong></li>
      <li>搜索应用名称</li>
      <li>若第三方APK已提供，会显示 <strong>"华为应用市场安全安装"</strong> 的入口</li>
      <li>点击安装即可，无需手动开启未知来源</li>
    </ol>

    <h2>四、常见报错及解决办法</h2>

    <h3>报错1：无法安装 / 应用未安装</h3>
    <p><strong>原因</strong>：APK损坏、签名不一致、或系统版本不兼容。</p>
    <p><strong>解决办法</strong>：重新下载APK并对比哈希值；卸载旧版本后重装；检查应用是否支持当前HarmonyOS版本。</p>

    <h3>报错2：与已安装应用签名冲突</h3>
    <p><strong>原因</strong>：手机上已有一个签名不同的同包名应用。</p>
    <p><strong>解决办法</strong>：卸载旧应用后再安装新APK。</p>

    <h3>报错3：不允许安装 / 被安全中心拦截</h3>
    <p><strong>原因</strong>：未对来源应用授权，或安全中心拦截了风险应用。</p>
    <p><strong>解决办法</strong>：回到"外部来源应用安装"确认授权；若被拦截，在 <strong>手机管家 → 应用管控</strong> 中查看是否被阻止。</p>

    <h3>报错4：需要Google服务</h3>
    <p><strong>原因</strong>：该应用强依赖Google Play Services。</p>
    <p><strong>解决办法</strong>：这类应用通常无法在华为新机直接使用，建议找替代方案或通过GBox等虚拟环境运行。</p>

    <h2>五、安装后的安全检查</h2>
    <ol>
      <li><strong>手机管家</strong>：运行一次"病毒查杀"</li>
      <li><strong>查看权限</strong>：<strong>设置 → 应用 → 应用管理</strong>，检查该应用申请的权限是否合理（一个计算器要读通讯录就要警惕）</li>
      <li><strong>更新来源</strong>：非应用市场App不会自动更新，记得定期回来源站点手动更新</li>
    </ol>

    <h2>六、小结</h2>
    <p>在华为手机上安装APK的核心就三步：</p>
    <ol>
      <li>下载正规来源的APK文件</li>
      <li>在 <strong>设置 → 安全</strong> 中按应用授权"外部来源安装"</li>
      <li>用文件管理打开APK安装，遇到报错按上文排查</li>
    </ol>
    <p>记住：<strong>能走华为应用市场就走市场，第三方APK一定要确认来源可信</strong>。安全永远比方便更重要。</p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "华为手机怎么开启安装未知来源应用？",
    answer: "进入设置 → 安全 → 更多安全设置 → 外部来源应用安装，找到文件管理或浏览器，打开对应的允许开关。HarmonyOS 4及以上版本需要按应用单独授权。",
  },
  {
    question: "华为手机安装APK提示无法安装怎么办？",
    answer: "可能是APK损坏、签名不一致或系统版本不兼容。建议重新下载并对比哈希值，卸载旧版本后重装，或确认应用是否支持当前HarmonyOS版本。",
  },
  {
    question: "HarmonyOS能安装Google Play的APK吗？",
    answer: "可以安装APK文件，但如果应用强依赖Google Play Services，通常无法在华为新机直接使用，需要找替代方案或通过GBox等虚拟环境运行。",
  },
  {
    question: "在华为手机上安装APK安全吗？",
    answer: "只要从正规来源下载（官网、GitHub、知名站点或gptoapk.com），安装后做病毒查杀、检查权限是否合理，就是安全的。关键是要确认来源可信。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      很多安卓用户每天都在装App，却未必清楚自己安装的"APK文件"到底是什么。这篇文章用大白话讲清楚APK的本质、内部结构、安装原理，以及下载APK时要注意的安全常识。
    </p>

    <h2>一、APK到底是什么？</h2>
    <p>
      APK全称 <strong>Android Application Package</strong>（安卓应用程序包），是安卓系统用来安装应用的安装包文件，后缀名是 <code>.apk</code>。
    </p>
    <p><strong>一句话理解</strong>：APK就像一个压缩包（类似ZIP），里面打包了应用运行所需的全部"零件"。系统拿到APK后，解包、校验、注册，就能让应用在你的手机上跑起来。</p>

    <h3>APK和ZIP的关系</h3>
    <p>APK本质上就是一个ZIP压缩包，你甚至可以用解压软件直接打开它看内容。但APK比普通ZIP多了<strong>签名机制</strong>，用来保证文件的真实性和完整性。</p>

    <h2>二、APK内部有什么？</h2>
    <p>解开一个APK，通常能看到这些目录和文件：</p>
    <table>
      <thead>
        <tr>
          <th>内容</th>
          <th>作用</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>AndroidManifest.xml</code></td><td>应用的"身份证"，声明权限、组件、入口</td></tr>
        <tr><td><code>classes.dex</code></td><td>应用的"代码本体"，编译后的程序指令</td></tr>
        <tr><td><code>res/</code></td><td>图片、布局、字符串等资源文件</td></tr>
        <tr><td><code>assets/</code></td><td>额外资源（音效、字体、离线数据等）</td></tr>
        <tr><td><code>lib/</code></td><td>原生库（so文件），针对不同CPU架构</td></tr>
        <tr><td><code>META-INF/</code></td><td>签名信息，用于安全校验</td></tr>
        <tr><td><code>resources.arsc</code></td><td>资源索引表</td></tr>
      </tbody>
    </table>
    <p>其中 <strong>AndroidManifest.xml</strong> 最关键，它决定了应用能使用哪些权限（读写存储、通讯录、相机等）。</p>

    <h2>三、安装APK时系统做了什么？</h2>
    <p>当你点击一个APK安装时，安卓系统主要做这几步：</p>
    <ol>
      <li><strong>校验签名</strong>：确认APK未被篡改</li>
      <li><strong>读取清单</strong>：解析权限和组件声明</li>
      <li><strong>安装文件</strong>：把APK解包到系统应用目录</li>
      <li><strong>注册应用</strong>：让应用出现在桌面、能响应系统事件</li>
      <li><strong>弹窗询问权限</strong>：让你确认授权</li>
    </ol>
    <p>这也是为什么安装时系统会提示"此应用将获得以下权限"。</p>

    <h2>四、APK从哪里来？</h2>
    <p>安卓应用主要有两种安装来源：</p>
    <ul>
      <li><strong>应用商店</strong>（Google Play、华为应用市场、小米应用商店等）：优点是安全、自动更新、经过审核</li>
      <li><strong>APK文件（侧载）</strong>：从网站直接下载APK安装。优点是可以安装商店没有的应用、绕过地区限制；缺点是<strong>安全性完全靠你自己把关</strong></li>
    </ul>
    <blockquote><strong>重要提醒</strong>：Android默认不允许安装"未知来源"应用。安装非商店APK前需要手动开启对应授权，这是系统在保护你。</blockquote>

    <h2>五、下载APK的安全常识</h2>
    <p>判断APK是否安全，可以看这几点：</p>
    <ol>
      <li><strong>只看官方来源</strong>：官网、GitHub Releases、知名镜像站（APKMirror有签名验证），或 <a href="https://gptoapk.com">gptoapk.com</a></li>
      <li><strong>对比哈希值</strong>：官方公布MD5/SHA-256就核对一下</li>
      <li><strong>看包名</strong>：正规应用包名通常符合 <code>com.开发商.产品</code> 格式，仿冒包会乱起名</li>
      <li><strong>扫码检测</strong>：装前可丢到VirusTotal在线扫毒</li>
      <li><strong>警惕要权限</strong>：一个手电筒要"读取通讯录"肯定有问题</li>
    </ol>

    <h2>六、APK常见问题解答</h2>
    <ul>
      <li><strong>Q：APK和App有什么区别？</strong> APK是安装文件，App是安装运行后的应用。你可以把APK理解成"安装包"，App是"装好的软件"。</li>
      <li><strong>Q：删除APK文件会影响已安装的应用吗？</strong> 不会。APK安装完成后就完成使命，删除它应用照常运行。</li>
      <li><strong>Q：APK能安装在iOS（苹果）上吗？</strong> 不能。APK是安卓专用格式，苹果用IPA格式，两者不兼容。</li>
      <li><strong>Q：为什么有的App不提供APK下载？</strong> 很多主流应用为了安全只走应用商店分发，不提供APK；或只在特定地区提供。</li>
    </ul>

    <h2>七、小结</h2>
    <p>APK就是安卓应用的安装包，本质是个带签名的压缩包，里面装着应用的全部代码和资源。它灵活但需谨慎——<strong>从正规渠道下载、留意签名和权限</strong>，就能既方便又安全地用上各种应用。</p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK文件删除了会影响已安装的应用吗？",
    answer: "不会。APK是安装包文件，安装完成后就完成使命。删除APK文件不影响已经安装好的应用正常运行。",
  },
  {
    question: "APK能在苹果手机上安装吗？",
    answer: "不能。APK是安卓专用的应用安装格式，苹果iOS使用IPA格式，两者完全不兼容。",
  },
  {
    question: "为什么安装APK时系统会提示权限？",
    answer: "安装时系统会解析APK的AndroidManifest.xml，列出应用申请的权限并要求你确认。这也是判断应用是否安全的重要时机——权限不合理就该警惕。",
  },
  {
    question: "从哪些渠道下载APK最安全？",
    answer: "优先选应用商店；需要侧载时选官网、GitHub Releases、APKMirror等有签名验证的站点，或像gptoapk.com这样的可靠平台，并对比哈希值、检查权限。",
  },
];

export const zhPosts20260731: BlogPostEntry[] = [
  {
    slug: "huawei-phone-install-apk-guide",
    title: "华为手机安装APK方法：HarmonyOS完整安装教程（含权限设置）",
    description: "华为手机怎么安装APK？HarmonyOS开启未知来源、解决无法安装报错、安全安装第三方应用的完整图文教程。",
    date: "2026-07-31",
    readTime: "8 分钟阅读",
    tags: ["华为手机", "HarmonyOS", "APK安装", "华为安装APK", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "what-is-apk-file-explained",
    title: "安卓APK文件是什么？一文搞懂APK的构成、安装原理与安全",
    description: "APK到底是什么？详解APK内部结构、安卓安装原理、下载来源区别，以及判断APK是否安全的关键常识。",
    date: "2026-07-31",
    readTime: "7 分钟阅读",
    tags: ["APK是什么", "安卓APK", "APK安全", "APK安装原理", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260731List = toList(zhPosts20260731);
