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

const code = (t: string) => (
  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{t}</code>
);

const th = (t: string) => (
  <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">{t}</th>
);
const td = (t: React.ReactNode) => (
  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">{t}</td>
);

const ARTICLE_469 = (
  <>
    <p>同一个「APK 下载安全检测」，有人理解成装个杀毒软件，有人理解成查一下签名，有人干脆等手机弹出「有风险」再说。三种理解对应三种安全水位，也对应三种被坑的方式。</p>
    <p>这篇给一套完整、能当天做完的流程：<strong>选站前 5 分钟、下载后 10 分钟、安装时 5 分钟、装完后 10 分钟</strong>。全部是手机上或一台电脑就能做的事，不需要 Root，不需要专业工具。</p>
    <h2>一、先建一个心智模型</h2>
    <p>APK 的风险不在于「文件在哪」，而在于这四件事有没有被破坏：</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("维度")}{th("正常状态")}{th("被破坏后")}</tr></thead>
      <tbody>
        <tr>{td("来源")}{td("来自开发者账号或可信镜像")}{td("被二次打包挂在野鸡站")}</tr>
        <tr>{td("签名")}{td("与官方包同一证书指纹")}{td("重签后塞进广告/木马")}</tr>
        <tr>{td("完整性")}{td("哈希与官方一致")}{td("传输中被替换或注入")}</tr>
        <tr>{td("权限")}{td("与功能匹配")}{td("多要短信、无障碍、设备管理")}</tr>
      </tbody>
    </table></div>
    <p>安全检测的本质，就是<strong>逐项确认这四件事</strong>。任何一项确认不了，就不要装。</p>

    <h2>二、第 0-5 分钟：选站阶段就能筛掉 80% 的坑</h2>
    <p>在下载之前，先看一眼页面。以下任意一条命中，直接换站：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>强制跳转第三方下载器</strong>（「请先安装我们的极速下载器」），这是最典型的捆绑入口；</li>
      <li><strong>下载按钮有 3 个以上、且都长得像主按钮</strong>，正常的站只有一个主下载；</li>
      <li><strong>文件名带版本串但不是标准格式</strong>，例如 {code("微信_最新版_破解.apk")}、{code("WhatsApp_Plus_v9.apk")}；</li>
      <li><strong>包体积明显偏小</strong>，主流应用正常 80–200MB，出现 12MB 的「精简版」基本是重打包；</li>
      <li><strong>页面要求关闭安全防护</strong>、「请忽略系统警告继续安装」；</li>
      <li><strong>没有任何版本信息、更新日志、SHA 校验值</strong>。</li>
    </ul>
    <p>一个靠谱的站点会明确告诉你：包名、版本号、targetSdk、文件大小、SHA-256、更新时间。这些东西存在，说明运营方知道自己在做什么。</p>

    <h2>三、第 5-15 分钟：下载后、安装前的五项检查</h2>
    <h3>1. 看文件基本信息</h3>
    <p>正规的镜像站文件名通常带包名，例如 {code("com.tencent.mm_8.0.50.apk")}。纯中文名或纯营销词的文件名，先扣分。</p>

    <h3>2. 计算哈希并与官方比对（最关键的一步）</h3>
    <p>电脑上执行：</p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# macOS\nshasum -a 256 com.tencent.mm_8.0.50.apk\n\n# Windows PowerShell\nGet-FileHash .\\com.tencent.mm_8.0.50.apk -Algorithm SHA256"}</code></pre>
    <p>拿到的值去和官方渠道公布的值（或可信镜像的历史值）比对。<strong>比对不上就到此为止，不要往下走。</strong> 这一步能挡住绝大多数「传输中被替换」和「镜像站被投毒」。</p>

    <h3>3. 查签名指纹</h3>
    <p>有两个办法，任选其一。</p>
    <p><strong>办法 A：用 aapt / apksigner（电脑上有 Android SDK 时）</strong></p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump badging app.apk | head -5        # 看 package、versionCode、sdkVersion\napksigner verify --print-certs app.apk     # 打印证书指纹"}</code></pre>
    <p><strong>办法 B：手机上用一个轻量查看器</strong></p>
    <p>装一个「APK 信息查看」类应用（如 APK Info），打开 APK 就能看到包名、签名指纹、权限列表。<strong>不需要先安装它</strong>，只是读文件。</p>
    <p>同一个应用的正式版，签名指纹是固定的。指纹变了，就一定是重签包——不管页面吹得多好听。</p>

    <h3>4. 读权限列表</h3>
    <p>只做一件事：<strong>把权限和功能对一遍</strong>。</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("权限")}{th("这个应用需要它合理吗")}</tr></thead>
      <tbody>
        <tr>{td("网络、存储")}{td("几乎所有应用都需要，正常")}</tr>
        <tr>{td("相机、麦克风")}{td("拍照、语音类应用需要；纯工具类不需要")}</tr>
        <tr>{td("读取短信 / 通话记录")}{td("只有短信、验证码、通讯类才合理")}</tr>
        <tr>{td("无障碍服务")}{td("输入法、自动化工具合理；其他应用要就要警惕")}</tr>
        <tr>{td("设备管理器")}{td("企业管控、反盗用需要；普通应用几乎不需要")}</tr>
        <tr>{td("安装未知应用")}{td("应用商店、更新器需要；工具类不应该有")}</tr>
      </tbody>
    </table></div>
    <p>一个手电筒应用要短信权限，答案不用问。</p>

    <h3>5. 用 VirusTotal 扫一次</h3>
    <p>把 APK 传到 virustotal.com（免费，单文件上限 650MB）。看两点：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>命中数</strong>：0-2 家报毒通常是小厂引擎误报；超过 5 家，直接放弃；</li>
      <li><strong>首次提交时间</strong>：如果同一哈希几个月前就被很多人提交过，且文件名各异，说明它在被大量传播，需要更谨慎。</li>
    </ul>
    <p>注意：VirusTotal 是把文件上传到云端，涉及隐私的应用（银行、企业内网）不要传。</p>

    <h2>四、第 15-20 分钟：安装阶段</h2>
    <p>安装时只需要注意三件事：</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>只给这一次的来源授权</strong>。Android 的「安装未知应用」是按应用授权的，装完记得去设置里收回（设置 → 应用 → 特殊权限 → 安装未知应用）。</li>
      <li><strong>留意系统的额外警告</strong>。Android 13+ 对侧载应用会弹「此应用未经 Play 商店验证」，这是常态，不是威胁；但如果系统提示「此应用包含有害代码」或直接拦截，不要绕过。</li>
      <li><strong>Play Protect 扫描结果</strong>。安装界面下方会显示扫描结果。显示「未发现有害行为」是正常的；显示「无法扫描」说明设备连接不畅，装完后手动补一次扫描。</li>
    </ol>

    <h2>五、第 20-30 分钟：装完后的收尾自查</h2>
    <p>装完不代表结束。花十分钟做四件事：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>看它申请了什么实际权限</strong>：设置 → 应用 → 该应用 → 权限，和安装前看到的对一遍；</li>
      <li><strong>关掉不必要的后台与自启动</strong>：设置 → 应用 → 自启动管理；</li>
      <li><strong>观察 24 小时的电量与流量</strong>：异常耗电、后台跑流量是恶意行为最直观的信号；</li>
      <li><strong>不要在装完当天就授予敏感权限</strong>。先正常用两三天，确认功能与描述一致，再开短信/无障碍这类高权限。</li>
    </ul>
    <p>如果出现以下情况，立刻卸载并改密码：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>突然出现大量弹窗广告、锁屏广告；</li>
      <li>桌面多出没装过的应用；</li>
      <li>收到「你的账号在异地登录」类短信；</li>
      <li>无障碍设置里多了一个你没开过的服务。</li>
    </ul>

    <h2>六、常见疑问</h2>
    <p><strong>Q：手机自带的安全检测够不够？</strong><br />够做第一层，能拦住已知样本。但它不校验签名、不比哈希，对「官方证书重签」这种手法基本无感。所以第一步的哈希 + 指纹比对比系统扫描更重要。</p>
    <p><strong>Q：「精简版」「去广告版」能不能用？</strong><br />不能。这类包一定是第三方重打包的，签名必然和官方不同。去掉广告的同时，往往也塞进了别的东西。</p>
    <p><strong>Q：镜像站下载的包永远不会自动更新怎么办？</strong><br />这是正常现象，代理安装的应用不在 Play 商店的更新范围内。建议每 1-2 个月回同一个可信站手动检查一次更新，并且<strong>每次更新都重做第二节的哈希检查</strong>。</p>
    <p><strong>Q：把 APK 传到云盘扫毒，安全吗？</strong><br />大多数在线扫描服务会保留文件。银行、政务、企业类应用不要上传，改成本地检查签名与权限。</p>
    <p><strong>Q：从官方 Google Play 链接提取的 APK 还需要检测吗？</strong><br />需要，但可以简化：确认提取工具没有替换文件（比对哈希），确认签名是官方证书，其余可以跳过。</p>

    <h2>七、一页速查</h2>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"选站：单一下载按钮 / 有版本与哈希 / 不要求关防护\n ↓\n下载后：看文件名 → 算 SHA-256 → 比官方 → 查签名指纹 → 读权限 → VirusTotal\n ↓\n安装：仅本次授权 → 留意系统警告 → 看 Play Protect 结果\n ↓\n装完：核对实际权限 → 关自启动 → 观察电量流量 → 三天后再给高权限"}</code></pre>
    <p>这套流程熟练之后，单次耗时能压到十分钟以内。它挡不住所有攻击，但能挡掉目前 APK 侧载场景里最常见的那几类——重打包、投毒镜像、权限越界。对一个普通用户来说，这已经足够。</p>
    <p>延伸阅读：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><Link href="/zh/blog/apk-download-safety-myths" className="text-blue-600 dark:text-blue-400 hover:underline">APK 下载安全检测的 7 个误区</Link>：你以为在检查，其实什么都没查</li>
      <li><Link href="/zh/blog/scan-apk-for-malware-without-antivirus" className="text-blue-600 dark:text-blue-400 hover:underline">安卓 APK 本机安全扫描方法</Link>：用 aapt / apksigner 核对包内容</li>
      <li><Link href="/zh/blog/apk-signature-verification-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名验证失败怎么修</Link></li>
    </ul>
  </>
);

const ARTICLE_470 = (
  <>
    <p>大部分人不是不重视安全，而是<strong>用错了方法</strong>。装个杀毒软件、看页面有没有小锁、扫一下二维码，做完就觉得「检测过了」。但这些动作，对 APK 侧载最常见的几种攻击几乎无效。</p>
    <p>这篇把 7 个高频误区拆开，每个都告诉你：为什么这个动作不管用、真正该做什么。</p>

    <h2>误区 1：杀毒软件扫过就是安全的</h2>
    <p><strong>为什么不够</strong>：手机上的安全软件依赖特征库。它认识已经入库的样本，但对<strong>当天刚重打包出来的新样本</strong>毫无办法。更关键的是，它不校验签名——一个用官方证书原样重签、只改了两行代码的包，特征上几乎和正版一模一样。</p>
    <p><strong>该做什么</strong>：用 SHA-256 和官方公布值比对，再用 {code("apksigner verify --print-certs")} 看证书指纹。这两项才是「是不是同一个文件」的硬证据。</p>

    <h2>误区 2：官网的一定安全，第三方站的一定危险</h2>
    <p><strong>为什么不够</strong>：现实要复杂得多。官网的 CDN 被劫持、下载页被挂马，历史上真实发生过；而成熟的镜像站（有校验值、有版本历史、有更新时间）反而更可核验——因为你<strong>能拿到比对基准</strong>。</p>
    <p><strong>该做什么</strong>：不看「站点的身份」，看「站点给不给你核验的手段」。给哈希、给包名、给签名指纹、给更新日志的站，比一个什么都不给的大牌官网更值得信任。</p>

    <h2>误区 3：网址前面有小锁就是安全的</h2>
    <p><strong>为什么不够</strong>：HTTPS 只保证「你和这台服务器之间的传输没被中途改写」，跟服务器上的文件是不是正版毫无关系。一个专门做重打包的站点，也能轻松装上免费证书。</p>
    <p><strong>该做什么</strong>：HTTPS 是及格线，不是安全证明。真正的检查在下载之后。</p>

    <h2>误区 4：看文件大小差不多就对了</h2>
    <p><strong>为什么不够</strong>：重打包的人完全可以填充垃圾数据把体积做回原大小。体积只能发现「明显的精简版」，发现不了精心制作的重打包。</p>
    <p><strong>该做什么</strong>：体积只能当粗筛。硬指标永远是哈希和签名。</p>

    <h2>误区 5：安装时系统没报警就是安全的</h2>
    <p><strong>为什么不够</strong>：Play Protect 的扫描在安装瞬间完成，它主要拦已知恶意样本。对于「功能正常、只在后台偷偷收集数据」这类灰产包，它基本不报。而且很多人安装时看到警告，直接点「继续安装」关掉了。</p>
    <p><strong>该做什么</strong>：把系统警告当参考，不当结论。装完后自己看权限、看电量、看流量。</p>

    <h2>误区 6：权限多无所谓，反正我可以拒绝</h2>
    <p><strong>为什么不够</strong>：有三类权限一旦授予，后果不是「拒绝一下就好」：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>无障碍服务</strong>：可以读屏幕内容、模拟点击。授予后能绕过你的手动操作，代表应用能自己完成「打开银行 App → 点击转账」这一系列动作；</li>
      <li><strong>设备管理器</strong>：可以让应用无法被正常卸载、锁屏、清空数据；</li>
      <li><strong>通知使用权</strong>：可以读取所有通知，包括短信验证码类的推送。</li>
    </ul>
    <p><strong>该做什么</strong>：安装前把权限列表和功能对一遍。无关权限出现就直接放弃，而不是「装了再说、然后拒绝」。</p>

    <h2>误区 7：装完就没事了，以后不用管</h2>
    <p><strong>为什么不够</strong>：侧载应用的更新不走 Play 商店，你<strong>不会收到任何更新提醒</strong>。一个应用在官网已经修了漏洞，你手机上还是半年前的版本，这个状态能持续一整年。</p>
    <p><strong>该做什么</strong>：给自己建个简单的更新节奏——每 1-2 个月回同一个可信来源检查一次版本，更新时重做哈希比对。把「检查更新」当成安全检查的一部分，而不是想起来才做的事。</p>

    <h2>附：一张对照表</h2>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("你以为的检测")}{th("实际能挡住")}{th("真正的补充手段")}</tr></thead>
      <tbody>
        <tr>{td("杀毒软件扫描")}{td("已知样本")}{td("哈希比对 + 证书指纹")}</tr>
        <tr>{td("看站点名气")}{td("低质量站点")}{td("看是否提供核验信息")}</tr>
        <tr>{td("看 HTTPS 小锁")}{td("传输层篡改")}{td("下载后本地校验")}</tr>
        <tr>{td("看文件大小")}{td("粗暴的精简版")}{td("SHA-256 比对")}</tr>
        <tr>{td("系统安装警告")}{td("已知恶意包")}{td("装后权限与行为观察")}</tr>
        <tr>{td("装完就不再管")}{td("无")}{td("定期回源查更新")}</tr>
      </tbody>
    </table></div>

    <h2>怎么把误区换成习惯</h2>
    <p>不用记住上面全部内容，只需要把三个动作变成肌肉记忆：</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>下完先算哈希</strong>，和官方或可信镜像的公布值对一下；</li>
      <li><strong>装前扫一眼权限</strong>，出现与功能无关的敏感权限就换包；</li>
      <li><strong>装完观察 24 小时</strong>，看电量、流量、有没有多出你没装的应用。</li>
    </ol>
    <p>三个动作加起来不到十分钟，但覆盖了 90% 的实际风险。剩下 10% 属于国家级定向攻击，那不在个人用户的防护范围里，也不必焦虑。</p>
    <p>延伸阅读：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><Link href="/zh/blog/apk-download-safety-full-workflow" className="text-blue-600 dark:text-blue-400 hover:underline">APK 下载安全检测全流程</Link>：从选站到装完后的 30 分钟自查</li>
      <li><Link href="/zh/blog/apk-signature-verification-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名验证失败怎么修</Link></li>
      <li><Link href="/zh/blog/scan-apk-for-malware-without-antivirus" className="text-blue-600 dark:text-blue-400 hover:underline">安卓 APK 本机安全扫描方法</Link></li>
    </ul>
  </>
);

export const zhPosts20261124 = [
  {
    slug: "apk-download-safety-full-workflow",
    title: "APK 下载安全检测全流程：从选站到装完后的 30 分钟自查",
    description: "同一个「APK 下载安全检测」，可以只是装个杀毒软件，也可以是一套完整的四阶段流程。本文给出一份当天就能做完的实操清单：选站阶段如何筛掉 80% 的坑、下载后如何用 SHA-256 与证书指纹确认来源与完整性、安装时要注意什么、装完后 10 分钟该核对哪些权限与行为。附可直接复制的命令与七步速查卡。",
    date: "2026-11-24",
    readTime: "14 min read",
    tags: ["APK安全", "下载检测", "签名校验", "权限审查"],
    content: ARTICLE_469,
  },
  {
    slug: "apk-download-safety-myths",
    title: "APK 下载安全检测的 7 个误区：你以为在检查，其实什么都没查",
    description: "装个杀毒软件、看页面小锁、扫一下码，就觉得「检测过了」——但这些动作对 APK 侧载最常见的攻击几乎无效。本文拆解 7 个高频误区：杀毒软件够不够、官网是否必然安全、HTTPS 小锁能证明什么、文件大小为什么不可靠、系统警告为何不能当结论、权限授予后的真实后果，以及装完就不管的长期风险。每个误区都给出替代做法与一张对照表。",
    date: "2026-11-24",
    readTime: "11 min read",
    tags: ["APK安全", "下载误区", "权限审查", "风险识别"],
    content: ARTICLE_470,
  },
];

export const zhPosts20261124List = toList(zhPosts20261124);
