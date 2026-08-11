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
      同样是装 APK，别人一次成功，你却总在"解析包错误""无法安装""闪退"之间来回折腾。这篇文章不聊虚的，直接按<strong>报错现象</strong>给你排雷——每一条都给出具体原因和可操作的解法，照着做基本都能装好。
    </p>
    <blockquote>先对号入座确认系统类型：<strong>设置 → 关于手机 → 系统版本</strong>。有"基于 Android"字样可正常装 APK；纯血鸿蒙（鸿蒙 NEXT / HarmonyOS 5+）不支持安卓包，方法论见文末。</blockquote>

    <h2>一、最常见的 5 种报错与对症解法</h2>
    <h3>报错1：解析包出现问题 / 无法解析</h3>
    <p>原因几乎都出在<strong>文件本身不完整</strong>：</p>
    <ul>
      <li>下载中断留下残缺文件 → 删掉重下，别用"断点续传"接一半</li>
      <li>文件被改名（<code>.apk.1</code>、<code>.bin</code>、<code>.zip</code>）→ 确认后缀是 <code>.apk</code></li>
      <li>华为浏览器下载被压缩 → 下载完成后先长按文件"解压"，或者改用系统下载</li>
      <li>存储空间不足 → 清理后重试</li>
    </ul>
    <h3>报错2：已存在同名应用 / 安装失败</h3>
    <p>多为<strong>新旧包签名不一致</strong>，常见于覆盖安装：</p>
    <ol>
      <li>先备份旧应用数据</li>
      <li>卸载旧版本</li>
      <li>再安装新 APK</li>
    </ol>
    <blockquote>如果是"升级安装被拒绝"，多半是 Play 版换成了第三方版（或反之），签名体系不同，只能卸载重装。</blockquote>
    <h3>报错3：安装按钮是灰色 / 无法点</h3>
    <p>通常是<strong>权限没开对</strong>：</p>
    <ol>
      <li>进 <strong>设置 → 应用和服务 → 权限管理</strong></li>
      <li>找到<strong>发起安装的那个 App</strong>（文件管理或浏览器）</li>
      <li>打开 <strong>"允许安装未知来源应用"</strong></li>
    </ol>
    <blockquote>⚠️ 记住：开关开在<strong>执行安装动作的那个应用</strong>上，不在全局。用哪个应用点安装，就开哪个。</blockquote>
    <h3>报错4：装完秒闪退 / 打开就崩</h3>
    <ul>
      <li>应用依赖谷歌服务（GMS），华为不自带 → 装华为适配版、换渠道、或装 GMS 套件</li>
      <li>下载了 x86/x86_64 包，真机是 arm64 → 选 <strong>arm64-v8a</strong> 版本</li>
      <li>Android 版本太低 → 看 APK 的最低系统要求</li>
    </ul>
    <h3>报错5：提示"未找到安装程序"</h3>
    <p>一般是系统组件/触控异常 → <strong>重启手机</strong>，多数能恢复；仍不行再查是否被安全软件拦截。</p>

    <h2>二、装之前先做的 3 件小事，能避开大半坑</h2>
    <ol>
      <li><strong>确认识别架构</strong>：先查自己手机 CPU 是 arm64 还是 32 位。现在绝大多数应用都是 arm64，但老应用可能只有 32 位包，选错就"无法安装"。</li>
      <li><strong>核对最低系统要求</strong>：APKMirror/APKPure 页面会写 <code>minSdk</code>，对不上版本就不要硬装。</li>
      <li><strong>只从可信源下载</strong>：官网 &gt; 有签名校验的镜像站（APKMirror/APKPure）&gt; 备份。聊天群里传的压缩包，一律不下。</li>
    </ol>

    <h2>三、三步验证「这个 APK 安不安全」</h2>
    <h3>1. 看签名是否官方</h3>
    <p>工具：<code>apksigner verify</code>（Android SDK）或在线 APK 分析。对比包内签名证书的<strong>签发者</strong>与应用开发者的组织名，不一致就不是官方包。</p>
    <h3>2. 看权限列表</h3>
    <p>安装时弹出的权限如果出现<strong>明显不相关项</strong>（比如一个手电筒应用要"通讯录""定位"），直接放弃安装。</p>
    <h3>3. 看包名</h3>
    <p>真正的应用包名（如 <code>com.tencent.mm</code>）和网站宣称的一致。<strong>包名对不上 = 李鬼应用</strong>。</p>

    <h2>四、纯血鸿蒙（鸿蒙 NEXT）真的装不了 APK 吗？</h2>
    <p>纯血鸿蒙不兼容安卓 APK，但有务实替代：</p>
    <ol>
      <li><strong>鸿蒙原生版</strong>：大厂应用基本都有鸿蒙版，华为应用市场直接搜——最省心安全</li>
      <li><strong>元服务/快应用</strong>：轻量应用够用，不用装完整 App</li>
      <li><strong>旧安卓机方案</strong>：真非用不可的，留台旧安卓机专跑</li>
      <li><strong>别碰第三方"鸿蒙适配包"</strong>：来源不明、签名不可控</li>
    </ol>

    <h2>五、最终速查表</h2>
    <table>
      <thead>
        <tr><th>症状</th><th>首选解法</th></tr>
      </thead>
      <tbody>
        <tr><td>解析包错误</td><td>重新完整下载 + 改回 .apk 后缀</td></tr>
        <tr><td>同名应用</td><td>备份数据 → 卸载 → 重装</td></tr>
        <tr><td>安装按钮灰</td><td>开"发起安装应用"的未知来源权限</td></tr>
        <tr><td>闪退</td><td>换 arm64 版本 / 装适配版</td></tr>
        <tr><td>未找到安装程序</td><td>重启手机</td></tr>
      </tbody>
    </table>

    <h2>小结</h2>
    <p>装 APK 遇到报错先别慌，<strong>对照报错找原因</strong>比乱试快得多。90% 的问题出在"文件不完整、权限没开对、架构选错"这三类。实在卡住了，把报错原话留言，我按情况继续补方案。</p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "华为手机安装APK提示'解析包出现问题'怎么办？",
    answer: "99%是文件不完整导致。删掉重新完整下载，确认文件名后缀是.apk（不是.apk.1或.bin），必要时先解压，并清理存储空间后重试。",
  },
  {
    question: "华为手机安装APK提示'已存在同名应用'怎么解决？",
    answer: "这是新旧包签名不一致导致的。建议先备份旧应用数据，卸载旧版本，再重新安装新APK。Play版与第三方版签名体系不同，只能卸载重装。",
  },
  {
    question: "华为手机装APK装完就闪退是为什么？",
    answer: "常见原因：应用依赖谷歌服务(GMS)但华为不自带，需要装适配版或GMS；或下载了x86包而手机是arm64，需换arm64-v8a版本；也可能是Android版本过低。",
  },
  {
    question: "纯血鸿蒙（鸿蒙NEXT）能装安卓APK吗？",
    answer: "不能。鸿蒙NEXT不再兼容安卓APK，只能从华为应用市场安装鸿蒙原生应用，或用元服务替代。别用第三方'鸿蒙适配包'，来源和签名都不可控。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      很多刚用安卓手机的人都会遇到 "APK" 这个词：下载的安装包叫 APK、报错时说"解析包出现问题"、装不上时又提到"签名不一致"。APK 到底是什么？它里面装了什么？凭什么它决定了一个 App 能不能装上？这篇文章用大白话一次讲透。
    </p>

    <h2>一、APK 就是"安卓的安装包"</h2>
    <p><strong>APK（Android Package）</strong> 是安卓系统用来分发和安装应用的打包文件，类似电脑上的 <code>.exe</code> 安装程序。它的本质是一个 <strong>ZIP 压缩包</strong>，后缀改成 <code>.apk</code>，里面包含了运行一个 App 所需的全部内容。</p>
    <blockquote>打个比方：APK 就像是一个"已经打包好的行李箱"——里面装着程序的代码、资源、图标、配置文件，系统只要打开这个行李箱，就能把 App 装到手机上。</blockquote>

    <h2>二、拆开一个 APK，里面都有什么？</h2>
    <p>把 <code>.apk</code> 后缀改成 <code>.zip</code> 再解压（或用解压工具直接打开），通常能看到这些内容：</p>
    <table>
      <thead>
        <tr><th>目录/文件</th><th>作用</th></tr>
      </thead>
      <tbody>
        <tr><td><code>classes.dex</code></td><td>程序的可执行代码（Dalvik 字节码），核心</td></tr>
        <tr><td><code>AndroidManifest.xml</code></td><td>清单文件，声明权限、组件、包名等，最重要</td></tr>
        <tr><td><code>res/</code></td><td>资源文件：图片、布局、字符串</td></tr>
        <tr><td><code>assets/</code></td><td>原始资源：字体、音效、网页等</td></tr>
        <tr><td><code>lib/</code></td><td>原生库（.so 文件），分 arm64-v8a、armeabi-v7a 等架构目录</td></tr>
        <tr><td><code>META-INF/</code></td><td>签名信息和证书</td></tr>
        <tr><td><code>resources.arsc</code></td><td>资源索引表</td></tr>
      </tbody>
    </table>
    <p>这里最关键的是两个：</p>
    <ul>
      <li><strong>AndroidManifest.xml</strong> — 相当于 App 的"身份证+体检表"，写明了它要哪些权限、能干什么</li>
      <li><strong>META-INF 签名</strong> — 相当于"防伪印章"，证明这个包来自谁、没被篡改</li>
    </ul>

    <h2>三、APK 是怎么"装上"手机的过程？</h2>
    <p>当你点击安装，系统大致走这几步：</p>
    <ol>
      <li><strong>校验签名</strong> — 检查 APK 是否有合法签名，防止被篡改</li>
      <li><strong>解析清单</strong> — 读取 AndroidManifest，确认包名、权限、是否和已装应用冲突</li>
      <li><strong>请求权限</strong> — 弹出权限列表让你确认（安装时的静态权限）</li>
      <li><strong>解压部署</strong> — 把代码和资源解压到系统目录，注册应用</li>
      <li><strong>完成</strong> — 桌面出现图标，可以运行</li>
    </ol>
    <blockquote><strong>"解析包出现问题"多半就卡在第 2 步</strong>——文件不完整导致清单读不出来，或者包被改了后缀。</blockquote>

    <h2>四、跟 APK 关系最密切的 4 个概念</h2>
    <h3>1. 签名（Signature）</h3>
    <p>每个 APK 都要签名。安装时的签名校验，决定了这个包是不是"官方原版"。<strong>升级安装时新旧签名必须一致</strong>，这就是"已存在同名应用/签名不一致"报错的原因。</p>
    <h3>2. 包名（Package Name）</h3>
    <p>格式通常是 <code>com.公司名.应用名</code>。它是 App 的唯一标识，<strong>不同包名=不同应用</strong>。伪造包名是常见的李鬼手段。</p>
    <h3>3. 架构（ABI）</h3>
    <p><code>lib/</code> 下的 <code>.so</code> 库按 CPU 架构区分。arm64 手机装了 x86 的包，就会"无法安装"或闪退。</p>
    <h3>4. AAB 与 APK 的关系</h3>
    <p>现在 Google Play 用的是 <strong>AAB（Android App Bundle）</strong> 格式，它是一种"母本"，由商店按你的设备生成对应的 APK 再下发。<strong>AAB 不能直接安装</strong>，只能由商店转换。</p>

    <h2>五、怎么判断手上的 APK 安不安全？</h2>
    <ol>
      <li><strong>看来源</strong>：官网 &gt; APKMirror/APKPure 等有签名校验的镜像站 &gt; 个人备份。</li>
      <li><strong>核对包名</strong>：用解压工具打开（改 <code>.zip</code>）看 <code>AndroidManifest</code>，或装个 APK 分析工具，确认包名与宣称一致。</li>
      <li><strong>查签名者</strong>：用 <code>apksigner verify</code>（SDK 工具）看证书签发者，对比官方组织名。</li>
      <li><strong>审权限</strong>：装的时候看权限列表，出现明显不相关的高危权限（如手电筒要通讯录）就要警惕。</li>
    </ol>

    <h2>六、几个常见误区</h2>
    <ul>
      <li>❌ "APK 就是病毒" — 不是。APK 只是容器，安全性取决于<strong>来源和签名</strong>，正规 APK 和安装包一样安全</li>
      <li>❌ "AAB 也能直接装" — 不能，AAB 必须由商店转换</li>
      <li>❌ "把 .apk 改成 .zip 就是破解" — 只是方便查看内容，改回去还能装，但改了签名就装不上</li>
    </ul>

    <h2>小结</h2>
    <p><strong>一句话总结</strong>：APK 是安卓应用的安装包，本质是一个带签名校验的 ZIP 压缩包，装着代码、资源和"身份证"清单。判断它安不安全，看三件事——<strong>来源可信吗？包名对吗？签名是官方的吗？</strong> 记住这三点，用安卓就能既方便又放心。</p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK文件到底是什么？",
    answer: "APK是安卓应用安装包，本质是一个包含代码、资源、清单文件和签名的ZIP压缩包，相当于Windows的exe安装包，是安装安卓App的介质。",
  },
  {
    question: "APK里面都有什么内容？",
    answer: "主要包含classes.dex（可执行代码）、AndroidManifest.xml（清单，声明包名和权限）、res资源文件、lib原生库（区分CPU架构）、assets原始资源和META-INF签名信息。",
  },
  {
    question: "为什么有些APK装了打不开？",
    answer: "常见原因：签名不匹配、下载损坏（解析包错误）、系统版本过低、架构不匹配（需要选arm64版本）。对症处理即可，比如重新下载或换对应架构版本。",
  },
  {
    question: "AAB和APK有什么区别？",
    answer: "AAB是开发者提交给Google Play的母本格式，不能直接安装，由商店按设备生成对应APK下发。APK是可直接安装的最终格式；XAPK/APKS是多个APK打包在一起，需要特殊安装器。",
  },
];

export const zhPosts20260810: BlogPostEntry[] = [
  {
    slug: "huawei-apk-install-error-troubleshooting",
    title: "华为手机装 APK 老报错？这份「对症下药」排查手册一次解决",
    description: "华为手机安装APK报错全排查手册：解析包错误、已存在同名应用、安装按钮灰色、闪退、未找到安装程序，逐条给原因和可操作解法。",
    date: "2026-08-10",
    readTime: "7 分钟阅读",
    tags: ["华为手机", "APK报错", "APK安装", "鸿蒙", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-file-what-is-guide",
    title: "安卓 APK 文件是什么？一文搞懂它的结构、原理和安全性",
    description: "APK是什么？用大白话讲清安卓APK安装包的内部结构、安装原理、签名/包名/架构/AAB等核心概念，以及判断APK安不安全的方法。",
    date: "2026-08-10",
    readTime: "7 分钟阅读",
    tags: ["APK", "安卓", "安装包", "APK科普", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260810List = toList(zhPosts20260810);
