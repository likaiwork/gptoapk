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

const ARTICLE1 = (
  <>
    <p className="lead">
      好不容易下载好一个 APK，点安装却弹出一句&ldquo;解析包时出现问题&rdquo;或&ldquo;Parse
      error&rdquo;，然后就没下文了&mdash;&mdash;这大概是安卓用户最窝火的一类报错。
      <strong>「解析错误」的本质是：系统在安装前读不懂、或读不完这个包。</strong>
      原因可能出在文件本身、系统版本、存储权限，甚至只是下载没下完。这篇按从易到难的顺序，带你把 7 个常见原因查一遍。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>
          先别急着重下。80% 的「解析错误」是文件不完整或版本不兼容，两步就能定位。按下面顺序排查，绝大多数十分钟内能解决。
        </strong>
      </p>
    </blockquote>

    <h2>一、先做最快的判断：文件是不是坏的？</h2>

    <h3>1. 重新下载，别用断点续传</h3>
    <p>
      最常见的元凶就是<strong>下载不完整</strong>。网络抖动、后台被系统杀掉、浏览器缓存出错，都会让 APK
      只下一半就停了，后缀却还是 <code>.apk</code>。
    </p>
    <ul>
      <li>
        删掉旧文件，<strong>换个网络</strong>（比如从 Wi-Fi 换成流量）重新完整下载。
      </li>
      <li>关掉浏览器的&ldquo;断点续传&rdquo;，有些工具续传后会拼接出错。</li>
      <li>
        下完先看<strong>文件大小</strong>：和官网标注的一对比，明显偏小就是没下完。
      </li>
    </ul>

    <h3>2. 检查文件后缀有没有被偷偷改掉</h3>
    <p>
      有些下载器或聊天软件会把文件存成 <code>xxx.apk.zip</code>、<code>xxx.apk.1</code> 甚至{" "}
      <code>xxx.apk.txt</code>。系统不认识这种后缀，自然报解析错误。
    </p>
    <ul>
      <li>
        用文件管理器看<strong>完整文件名</strong>，把多余的后缀删掉，只保留 <code>.apk</code>。
      </li>
      <li>如果只有一份，改名后重试。</li>
    </ul>

    <h2>二、再看系统与包的兼容性</h2>

    <h3>3. 系统版本太低，够不着应用的门槛</h3>
    <p>
      每个 APK 在清单里都写了 <code>minSdkVersion</code>&mdash;&mdash;它要求的最低安卓版本。
      <strong>你的手机系统比这个版本低，就会直接报解析错误。</strong>
    </p>
    <ul>
      <li>查手机系统版本：设置 &rarr; 关于手机 &rarr; 安卓版本。</li>
      <li>
        查 APK 要求：用 <strong>MT 管理器</strong>或电脑上的 <strong>APK Analyzer</strong> 打开，看{" "}
        <code>minSdkVersion</code>。
      </li>
      <li>
        对不上就只能换一个<strong>支持你系统版本的旧版本 APK</strong>。
      </li>
    </ul>

    <h3>4. 包是针对新系统编译的（targetSdk 过高）</h3>
    <p>反过来，某些为 Android 14/15 编译、且用了新特性的包，在太老的系统上也可能装不上。思路同上，找兼容版本。</p>

    <h3>5. CPU 架构不对</h3>
    <p>
      现在应用常按架构分包（arm64-v8a / armeabi-v7a）。
      <strong>装错了架构的包，某些机型在解析阶段就会失败。</strong>
    </p>
    <ul>
      <li>
        老手机多为 <code>armeabi-v7a</code>，近年主流是 <code>arm64-v8a</code>。
      </li>
      <li>
        拿不准就下载<strong>通用版（universal）</strong>的 APK，兼容性最好。
      </li>
    </ul>

    <h2>三、容易被忽略的系统层原因</h2>

    <h3>6. 存储空间不足或权限没给</h3>
    <p>写临时文件失败也会伪装成&ldquo;解析错误&rdquo;。</p>
    <ul>
      <li>
        设置里看<strong>剩余存储</strong>，留出至少 2 倍 APK 大小的空间。
      </li>
      <li>
        用第三方文件管理器打开 APK 时，确认它拿到了<strong>存储权限</strong>。
      </li>
    </ul>

    <h3>7. 来源限制与包冲突</h3>
    <ul>
      <li>安卓 8.0 以后，非官方商店来源需要手动允许&ldquo;安装未知应用&rdquo;，否则安装会被拦。</li>
      <li>
        <strong>已装了同包名但签名不同的版本</strong>（比如官方版 vs 修改版），覆盖安装会失败，报错里常带
        &ldquo;app not installed&rdquo;。先卸载旧版再装。
      </li>
    </ul>

    <h2>四、一分钟排查流程</h2>
    <pre>
      <code>{`解析错误
 ├─ 重新完整下载（换网络）          ← 最常见
 ├─ 检查后缀是否变成 .zip/.1
 ├─ 对比文件大小和官网
 ├─ 看 minSdkVersion vs 系统版本
 ├─ 看 lib/ 架构是否匹配机型
 ├─ 清理空间 + 给存储权限
 └─ 卸载同包名旧版 / 允许未知来源`}</code>
    </pre>

    <h2>五、还是不行怎么办？</h2>
    <ul>
      <li>
        换一个<strong>可信的下载源</strong>重下（源站文件损坏也很常见）。
      </li>
      <li>
        用 <strong>APK Analyzer / MT 管理器</strong>打开包，确认 <code>AndroidManifest.xml</code>{" "}
        能正常读取&mdash;&mdash;读不出来就是文件结构坏了。
      </li>
      <li>实在搞不定，直接装官方渠道版本，别在来源不明的包上死磕。</li>
    </ul>

    <h2>常见问题</h2>

    <p>
      <strong>为什么 APK 会提示「解析包时出现问题」？</strong>
      <br />
      最常见的原因是文件下载不完整（只下了一半），其次是用错了后缀名（比如存成了 .apk.zip）、系统版本低于 APK
      的 minSdkVersion、CPU 架构不匹配，或存储空间不足。按本文顺序逐一排查即可定位。
    </p>
    <p>
      <strong>解析错误和「应用未安装」有什么区别？</strong>
      <br />
      「解析错误」通常是系统在读取包阶段就失败了&mdash;&mdash;文件损坏、不完整或版本不兼容；「应用未安装」多见于包签名冲突（覆盖安装不同签名的同包名应用）或安装被系统/安全软件拦截。两者排查方向不同。
    </p>
    <p>
      <strong>系统版本太低装不上怎么办？</strong>
      <br />
      去找支持你当前系统版本的旧版 APK。可以用 APKMirror、APKPure 等镜像站查看版本历史，挑一个 minSdkVersion
      低于你手机安卓版本的包。用 <Link href="/">gptoapk.com</Link> 从 Play 链接拉原包更可靠。
    </p>
    <p>
      <strong>怎么确认 APK 文件有没有下完？</strong>
      <br />
      对比文件大小和官网/镜像站标注的大小是否一致；再用 MT 管理器或电脑的 APK Analyzer 打开，确认能正常读取
      AndroidManifest.xml。读不出来或大小明显偏小，就是没下完或文件损坏，重新下载即可。
    </p>
    <p>
      <strong>换一个下载源就能解决吗？</strong>
      <br />
      如果问题出在文件损坏或不完整，换个可信来源重下通常能解决。但如果是系统版本或架构不兼容，换源也没用，需要找匹配你设备的版本或通用版 APK。
    </p>

    <p>
      结论：
      <strong>
        解析错误不可怕，怕的是盲目重下。先分清是「文件坏」还是「版本不兼容」，对症下手，基本都能解决。
      </strong>
      要拿一份干净的原包，先从 <Link href="/">gptoapk.com</Link> 从 Play 链接提取，再动手排查。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么 APK 会提示「解析包时出现问题」？",
    answer:
      "最常见的原因是文件下载不完整（只下了一半），其次是用错了后缀名（比如被存成 .apk.zip 或 .apk.1）、系统版本低于 APK 的 minSdkVersion、CPU 架构不匹配，或存储空间不足、没有存储权限。按文中从易到难的顺序逐一排查即可定位原因。",
  },
  {
    question: "解析错误和「应用未安装」有什么区别？",
    answer:
      "「解析错误」通常是系统在读取安装包阶段就失败了，原因多为文件损坏、下载不完整或版本/架构不兼容；「应用未安装」多见于包签名冲突（覆盖安装不同签名的同包名应用）或安装被系统、安全软件拦截。两者的排查方向不同。",
  },
  {
    question: "系统版本太低装不上怎么办？",
    answer:
      "去找支持你当前系统版本的旧版 APK。可以用 APKMirror、APKPure 等镜像站查看版本历史，挑一个 minSdkVersion 低于你手机安卓版本的包。用 gptoapk.com 从 Play 链接提取原包更可靠，兼容性更有保障。",
  },
  {
    question: "怎么确认 APK 文件有没有下完？",
    answer:
      "对比文件大小和官网或镜像站标注的大小是否一致；再用 MT 管理器或电脑上的 APK Analyzer 打开，确认能正常读取 AndroidManifest.xml。如果读不出来，或文件大小明显偏小，就是没下完或文件损坏，重新完整下载即可。",
  },
  {
    question: "换一个下载源就能解决问题吗？",
    answer:
      "如果问题出在文件损坏或不完整，换个可信来源重新下载通常能解决。但如果根因是系统版本或 CPU 架构不兼容，换源也没用，需要找到匹配你设备版本的 APK 或通用版（universal）安装包。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      从第三方网站下载 APK，最怕的就是下到&ldquo;套壳木马&rdquo;&mdash;&mdash;表面是某个热门应用，装完却偷偷读短信、开摄像头、狂弹广告。
      <strong>要防住这一类，靠的不是运气，而是一套&ldquo;上传多引擎扫描 + 手机本地复核&rdquo;的组合拳。</strong>
      这篇推荐 6 款真正好用的 APK 病毒扫描工具，并告诉你每款适合什么场景。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>
          没有哪一个引擎能查全所有威胁。先用在线多引擎（VirusTotal）广撒网，再用手机端实时防护兜底，最后人工看权限，三层过滤最靠谱。
        </strong>
      </p>
    </blockquote>

    <h2>一、先搞清楚：APK 病毒有哪几种</h2>
    <p>知道敌人长什么样，才知道工具够不够用：</p>
    <ul>
      <li>
        <strong>木马（Trojan）</strong>：伪装成正常 App，后台偷账号、短信、通讯录。
      </li>
      <li>
        <strong>广告软件（Adware）</strong>：疯狂弹广告、偷偷耗流量。
      </li>
      <li>
        <strong>间谍软件（Spyware）</strong>：长期记录位置、通话、输入内容。
      </li>
      <li>
        <strong>勒索 / 扣费（Ransom / SMS Fraud）</strong>：锁文件或暗自发付费短信。
      </li>
      <li>
        <strong>二次打包（Repackaged）</strong>：把正版 APK 拆开塞进恶意代码再签一个假名。
      </li>
    </ul>
    <p>
      <strong>二次打包最阴险</strong>&mdash;&mdash;功能看着都一样，只是签名变了、多了一段代码。所以光看&ldquo;能不能用&rdquo;根本不够。
    </p>

    <h2>二、在线多引擎：第一道防线</h2>

    <h3>1. VirusTotal（首推）</h3>
    <p>
      谷歌旗下，<strong>同时用 70+ 个杀毒引擎扫描</strong>一个文件，是查 APK 的行业标准。
    </p>
    <ul>
      <li>
        用法：电脑或手机浏览器打开 virustotal.com &rarr; 上传 APK（免费版限 650MB 内）。
      </li>
      <li>
        看什么：<strong>Detection 命中数</strong>。1-2 个引擎报毒可能是误报，5 个以上基本就是真有问题。
      </li>
      <li>
        进阶：还能看它给出的<strong>行为分析、权限、关联域名</strong>，判断有没有可疑外联。
      </li>
    </ul>
    <p>
      &#9888;&#65039; 注意：上传文件等于把包给了第三方，
      <strong>涉及隐私或企业内包别传到公共引擎</strong>。
    </p>

    <h3>2. Hybrid Analysis / MetaDefender</h3>
    <p>
      同为多引擎沙箱，会把 APK 丢进虚拟环境跑一遍，记录它<strong>实际干了什么</strong>（联网、读写文件、调用敏感
      API）。适合想深挖行为的人。
    </p>

    <h2>三、手机本地扫描：日常主力</h2>

    <h3>3. Malwarebytes for Android</h3>
    <p>
      老牌安全厂商，手机端<strong>实时防护 + 按需扫描</strong>都强，对 Adware 和 PUA（潜在有害程序）识别率好。免费版够用，付费版有实时网页防护。
    </p>

    <h3>4. Bitdefender Mobile Security</h3>
    <p>
      病毒库更新快、误报率低，<strong>耗电控制得好</strong>，适合当长期常驻的防护。安装新 APK 时会自动扫一遍。
    </p>

    <h3>5. Avast / AVG Mobile Security</h3>
    <p>
      界面友好、免费功能多，适合普通用户。<strong>装第三方 APK 前先用它扫一遍</strong>，简单直接。
    </p>

    <h3>6. 腾讯手机管家 / 360 手机卫士（国内场景）</h3>
    <p>
      如果你主要从国内渠道下应用，这两款对<strong>国内灰产样本</strong>的识别更接地气。适合搭配在线引擎一起用。
    </p>

    <h2>四、最优组合怎么用？</h2>
    <pre>
      <code>{`下载 APK（来源未知）
   │
   ├─ ① VirusTotal 上传扫描 → 看命中数
   │
   ├─ ② 手机端安全软件扫一遍 → 本地二次确认
   │
   └─ ③ 人工看权限：短信/通讯录/悬浮窗等不该有的权限 → 直接弃用`}</code>
    </pre>
    <p>
      <strong>三层都过了再装。</strong>只信一个工具，迟早会翻车。
    </p>

    <h2>五、比扫描更重要的 5 条习惯</h2>
    <p>工具是补救，习惯才是根本：</p>
    <ol>
      <li>
        <strong>优先官方渠道</strong>：Google Play、厂商应用商店、应用官网。
      </li>
      <li>
        <strong>核对签名</strong>：用 MT 管理器或 apksigner 看签名指纹，和官方对不上就是被改过。
      </li>
      <li>
        <strong>警惕&ldquo;破解版&rdquo;&ldquo;无限金币版&rdquo;</strong>：这类包是木马重灾区。
      </li>
      <li>
        <strong>看权限清单</strong>：一个手电筒 App 要读短信？立刻删。
      </li>
      <li>
        <strong>装完观察行为</strong>：弹广告、后台跑流量、莫名发短信，马上卸载并全盘扫描。
      </li>
    </ol>

    <h2>常见问题</h2>

    <p>
      <strong>哪个 APK 病毒扫描工具最好用？</strong>
      <br />
      没有单一最好的工具。推荐组合使用：用 VirusTotal 做多引擎在线扫描（70+ 引擎一次过），用 Malwarebytes 或
      Bitdefender 做手机端实时防护，国内用户可加装腾讯手机管家或 360 对本土样本做补充。多层过滤比单一工具可靠得多。
    </p>
    <p>
      <strong>VirusTotal 免费吗？能查多大文件？</strong>
      <br />
      VirusTotal 免费版可上传最大 650MB 的文件，对绝大多数 APK 够用。上传后它会用 70 多个杀毒引擎同时扫描并给出命中数。注意：上传等于把文件交给第三方，涉及隐私或企业内部的包不要上传到公共引擎。
    </p>
    <p>
      <strong>扫描没报毒就一定是安全的吗？</strong>
      <br />
      不一定。多引擎扫描能拦住绝大多数已知威胁，但对新出现的、或做了免杀处理的木马可能漏报。所以扫描只是三层防御中的一层，还要结合签名指纹核对和权限审查。装完后观察 48 小时行为，出现弹广告、异常流量立即卸载。
    </p>
    <p>
      <strong>手机需要一直开着安全软件的实时防护吗？</strong>
      <br />
      建议常开。Malwarebytes、Bitdefender 这类应用的实时防护会在你安装新 APK 时自动扫描，能拦截已知的恶意包。实时防护的耗电和性能开销通常很小，换来的是持续的兜底保护。
    </p>
    <p>
      <strong>怎么判断下载的 APK 是不是被二次打包过？</strong>
      <br />
      核对签名指纹。用 MT 管理器或电脑上的 apksigner 查看 APK 的签名证书指纹，与官方发布的指纹对比，不一致就说明被重新签名过，很可能是二次打包。用 <Link href="/">gptoapk.com</Link> 从 Play 链接提取原包可作为可靠的对照基准。
    </p>

    <p>
      结论：
      <strong>
        查一遍用 VirusTotal；日常防用 Malwarebytes 或 Bitdefender；国内料加腾讯 / 360；最后人工看权限和签名。
      </strong>
      记住那句话：下载来源不明时，&ldquo;先扫后装&rdquo;永远比&ldquo;装出事再补救&rdquo;省心得多。要拿一份干净的原包，
      先从 <Link href="/">gptoapk.com</Link> 提取。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "哪个 APK 病毒扫描工具最好用？",
    answer:
      "没有单一最好的工具，推荐组合使用：用 VirusTotal 做多引擎在线扫描（70+ 引擎一次过），用 Malwarebytes 或 Bitdefender 做手机端实时防护，国内用户可加装腾讯手机管家或 360 对本土样本做补充。多层过滤比依赖单一工具可靠得多。",
  },
  {
    question: "VirusTotal 免费吗？能查多大文件？",
    answer:
      "VirusTotal 免费版可上传最大 650MB 的文件，对绝大多数 APK 够用。上传后它会用 70 多个杀毒引擎同时扫描并返回命中数。注意：上传等于把文件交给第三方，涉及隐私或企业内部的包不要上传到公共引擎。",
  },
  {
    question: "扫描没报毒就一定是安全的吗？",
    answer:
      "不一定。多引擎扫描能拦住绝大多数已知威胁，但对新出现或做了免杀处理的木马可能漏报。扫描只是三层防御中的一层，还要结合签名指纹核对和权限审查，并在安装后观察 48 小时行为，出现弹广告、异常流量立即卸载。",
  },
  {
    question: "手机需要一直开着安全软件的实时防护吗？",
    answer:
      "建议常开。Malwarebytes、Bitdefender 这类应用的实时防护会在你安装新 APK 时自动扫描，能拦截已知的恶意包。实时防护的耗电和性能开销通常很小，换来的是持续兜底保护，收益大于成本。",
  },
  {
    question: "怎么判断下载的 APK 是不是被二次打包过？",
    answer:
      "核对签名指纹。用 MT 管理器或电脑上的 apksigner 查看 APK 的签名证书指纹，与官方发布的指纹对比，不一致就说明被重新签名过，很可能是二次打包。用 gptoapk.com 从 Play 链接提取原包可作为可靠的对照基准。",
  },
];

export const zhPosts20261014: BlogPostEntry[] = [
  {
    slug: "apk-jie-xi-cuo-wu-jie-jue",
    title: "APK 安装时提示「解析错误」？按这 7 步挨个排查",
    description:
      "安装 APK 报「解析包时出现问题」？本文按从易到难的顺序，带你排查 7 个常见原因：下载不完整、后缀名不对、系统版本过低、CPU 架构不匹配、存储空间不足、签名冲突等，附一分钟排查流程图。",
    date: "2026-10-14",
    readTime: "7 分钟阅读",
    tags: ["APK 安装", "解析错误", "安卓教程", "安装失败", "APK 排查"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "an-zhuo-apk-bing-du-sao-miao-tui-jian",
    title: "安卓 APK 病毒扫描怎么选？6 款检测工具实测推荐",
    description:
      "从第三方网站下载 APK 怕中木马？本文推荐 6 款真正好用的 APK 病毒扫描工具（VirusTotal、Malwarebytes、Bitdefender、腾讯手机管家等），并给出「在线多引擎 + 本地实时防护 + 权限审查」的三层防御组合。",
    date: "2026-10-14",
    readTime: "7 分钟阅读",
    tags: ["APK 安全", "病毒扫描", "VirusTotal", "Malwarebytes", "安卓教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261014List = toList(zhPosts20261014);
