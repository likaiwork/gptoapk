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
      从浏览器、论坛、第三方站点下载 APK，最怕的就是包里有毒、有后门、偷流量。很多人拿到一个 APK 只会「双击安装」，装完才发现通知栏被广告刷屏、流量莫名其妙跑掉。
    </p>
    <p>
      其实，<strong>判断一个 APK 安不安全，不一定非要装到手机上才知道。</strong> 下面这套方法，按「从轻到重」的顺序，帮你在下载前、中、后三个阶段做完整检测，把风险挡在安装之前。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>安全检测不是单看某一个指标，而是「来源 + 文件本身 + 安装后行为」三层交叉验证。</strong>{" "}
        任何一层明显异常，都值得高度警惕。
      </p>
    </blockquote>

    <h2>一、第一层：看来源（最省事，也最重要）</h2>
    <p>很多危险根本不用查文件，看一眼来源就能筛掉大半。</p>
    <p>
      <strong>可信来源（风险低）：</strong>
    </p>
    <ul>
      <li>
        <strong>Google Play / 官方应用商店</strong>——有 Play Protect 扫描。
      </li>
      <li>
        <strong>开发者官网</strong>——签名通常稳定，更新规范。
      </li>
      <li>
        <strong>APKMirror、APKPure 等知名聚合站</strong>——有签名校验和上传审核。
      </li>
    </ul>
    <p>
      <strong>高风险来源（务必检测）：</strong>
    </p>
    <ul>
      <li>论坛附件、网盘分享、群里的「破解版」「内购版」「去广告版」。</li>
      <li>弹窗广告跳转的下载页、域名奇怪的马甲站。</li>
      <li>声称「加速器」「清理大师」「免费 VIP」的来路不明安装包。</li>
    </ul>
    <p>
      <strong>判断技巧：</strong>
    </p>
    <ol>
      <li>看域名——正规站点域名通常工整，马甲站常有拼写错误、连字符堆砌。</li>
      <li>看下载按钮——一次跳好几个页面、疯狂弹窗的，直接关掉。</li>
      <li>看文件是否「独家」——只在这一个冷门站点出现、全网找不到的包，风险极高。</li>
    </ol>
    <p>来源没问题，再往下一层看文件本身。</p>

    <h2>二、第二层：看文件本身（不装也能查）</h2>
    <p>拿到 APK 文件后，先别急着装，做几个静态检查。</p>

    <h3>1. 核对文件大小和哈希值</h3>
    <p>正规站点、官网往往会公布 APK 的 <strong>SHA-256</strong> 哈希。</p>
    <p>
      <strong>电脑上算哈希：</strong>
    </p>
    <ul>
      <li>
        Windows：<code>certutil -hashfile 文件名.apk SHA256</code>
      </li>
      <li>
        macOS / Linux：<code>shasum -a 256 文件名.apk</code>
      </li>
    </ul>
    <p>
      把结果和你下载页面公布的哈希对比。<strong>不一致 = 文件被改过或被中间人替换，直接删。</strong>
    </p>

    <h3>2. 看数字签名</h3>
    <p>APK 必须签名才能安装，签名里藏着关键信息。</p>
    <p>
      <strong>方法 A（最简单）：</strong> 用手机上的 APK 分析工具打开，查看「签名」信息，重点看：
    </p>
    <ul>
      <li>
        <strong>签名证书是「自签名」还是知名厂商？</strong> 官方 App 一般用厂商证书。
      </li>
      <li>
        <strong>包名是否和官方一致？</strong> 例如伪装成微信的包，包名却不是 <code>com.tencent.mm</code>，必是李鬼。
      </li>
    </ul>
    <p>
      <strong>方法 B（电脑）：</strong>
    </p>
    <pre>
      <code>apksigner verify --print-certs 文件名.apk</code>
    </pre>
    <p>关注签名者和证书指纹，和你预期的官方签名是否一致。</p>

    <h3>3. 看申请的权限</h3>
    <p>权限是「意图」的直接暴露。</p>
    <p>
      <strong>红色警报权限组合：</strong>
    </p>
    <ul>
      <li>
        <strong>短信读取 + 发送短信</strong>——可能偷偷发扣费短信。
      </li>
      <li>
        <strong>无障碍服务（Accessibility）</strong>——可模拟点击、读取屏幕，是很多木马的核心手段。
      </li>
      <li>
        <strong>悬浮窗 + 后台弹广告</strong>——典型流氓行为。
      </li>
      <li>
        <strong>通讯录 + 定位 + 设备信息一起要</strong>——可能用于贩卖数据。
      </li>
    </ul>
    <blockquote>
      <p>一个「手电筒」要读取短信，一个「记事本」要无障碍服务——权限和功能严重不匹配，就是危险信号。</p>
    </blockquote>

    <h3>4. 用在线/本地引擎扫描</h3>
    <ul>
      <li>
        上传到 <strong>VirusTotal</strong>（可同时用几十个引擎查毒），看是否有引擎报毒。
      </li>
      <li>
        本地用 <strong>Malwarebytes、Kaspersky</strong> 之类的安全软件扫描 APK 文件。
      </li>
    </ul>

    <h2>三、第三层：看安装后的行为（最后一道防线）</h2>
    <p>如果前两层没能完全确认，装的时候和装之后要盯着。</p>
    <p>
      <strong>安装时：</strong>
    </p>
    <ol>
      <li>
        如果系统提示「来自未知来源」，说明你没开那个来源的安装权限——<strong>确认是你自己主动装的再开</strong>。
      </li>
      <li>安装时看清它要的权限，能拒绝的果断拒绝。</li>
    </ol>
    <p>
      <strong>安装后：</strong>
    </p>
    <ol>
      <li>
        <strong>看通知栏</strong>——莫名出现的广告推送，是流氓/恶意 App 的典型。
      </li>
      <li>
        <strong>看流量和耗电</strong>——设置 → 网络/电池，看它是否在后台偷偷跑。
      </li>
      <li>
        <strong>看已安装的应用列表</strong>——有没有多出你没装过的 App。
      </li>
      <li>
        <strong>看网络活动</strong>——开发者选项里可看后台连接，或用抓包工具确认它连的是不是可疑服务器。
      </li>
    </ol>
    <p>
      <strong>发现异常怎么办：</strong>
    </p>
    <ol>
      <li>
        立即<strong>卸载</strong>。
      </li>
      <li>
        <strong>改密码</strong>（尤其是你在该 App 里登录过的账号）。
      </li>
      <li>
        用安全软件做一次<strong>全盘扫描</strong>。
      </li>
      <li>
        检查<strong>银行的短信/账单</strong>，确认没有被扣费。
      </li>
    </ol>

    <h2>四、一张速查清单</h2>
    <ul>
      <li>
        <strong>来源</strong>：安全=官方商店/官网/知名站；危险=论坛附件、网盘、马甲站
      </li>
      <li>
        <strong>哈希</strong>：安全=与公布值一致；危险=对不上
      </li>
      <li>
        <strong>签名</strong>：安全=厂商证书、包名一致；危险=自签名、包名不符
      </li>
      <li>
        <strong>权限</strong>：安全=与功能匹配；危险=无障碍+短信+悬浮窗
      </li>
      <li>
        <strong>引擎扫描</strong>：安全=无报毒；危险=多个引擎报毒
      </li>
      <li>
        <strong>安装后</strong>：安全=无广告、流量正常；危险=弹广告、偷跑流量
      </li>
    </ul>

    <h2>五、养成三个好习惯</h2>
    <ol>
      <li>
        <strong>优先官方渠道</strong>——能用 Play 或官网，就别碰第三方「魔改版」。
      </li>
      <li>
        <strong>下载后先验签再安装</strong>——多花两分钟，省一堆麻烦。
      </li>
      <li>
        <strong>定期体检</strong>——每隔一段时间看看权限、流量、后台应用。
      </li>
    </ol>
    <p>安全这件事，永远是「预防成本」远低于「事后补救成本」。一个被木马控制的手机，可能连着你的银行账号、社交账号一起丢。</p>

    <h2>六、常见问题</h2>
    <p>
      <strong>问：哈希对不上一定是病毒吗？</strong> 不一定，但一定是「不是你期望的那个文件」——可能被篡改，也可能下载出错。两者都不该装。
    </p>
    <p>
      <strong>问：只验签名不验哈希行不行？</strong> 大多情况够用，但两者都验最稳妥：签名证明「谁签的」，哈希证明「是不是这一份」。
    </p>
    <p>
      <strong>问：手机上没有电脑怎么验签？</strong> 用 APK 签名检查类 App，看看证书指纹和包名是否与官方一致即可。
    </p>

    <p>
      <strong>总结：</strong> APK 安全检测的核心就三步——<strong>查来源 → 验文件 → 盯行为</strong>。
      来源不明直接放弃；文件哈希对不上、签名包名可疑、权限不合理，果断删；装完后多看通知栏、流量和已装应用列表，发现异常马上卸载并改密码。把这三层做成习惯，你手机里的 APK 就基本不会出大问题。相关方法可参考{" "}
      <Link href="/zh/blog/apk-安装后被篡改怎么验证">APK 安装后被篡改怎么验证</Link>。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "APK 下载安全检测有哪些方法？",
    answer:
      "按三层检测：(1) 来源——优先 Google Play、官网、APKMirror 等可信站点，避开论坛附件、网盘分享和魔改版；(2) 文件本身——核对 SHA-256 哈希、用 apksigner 查看签名证书和包名、检查申请权限是否与功能匹配、上传 VirusTotal 扫描；(3) 安装后行为——看通知栏是否弹广告、后台是否偷跑流量和耗电、应用列表是否多出陌生 App。任何一层明显异常都应警惕。",
  },
  {
    question: "怎么判断一个 APK 是不是被篡改过？",
    answer:
      "关键看两点：哈希和签名。先在电脑上算 SHA-256（Windows 用 certutil -hashfile 文件名.apk SHA256，macOS 用 shasum -a 256），和官方公布的哈希对比，不一致说明文件被改过。再用 apksigner verify --print-certs 查看签名证书指纹，和官方 App 的证书对比，指纹不同说明被重新签名过。两项任一不符，就不要安装。",
  },
  {
    question: "APK 要了可疑权限怎么办？",
    answer:
      "权限和功能不匹配就是危险信号。重点警惕：短信读取+发送（可能扣费）、无障碍服务（可模拟点击读屏，木马常用）、悬浮窗+后台弹广告（典型流氓）、通讯录+定位+设备信息一起要（可能贩卖数据）。一个手电筒要读短信、一个记事本要无障碍权限，都应果断放弃或安装后立即收回权限并观察。",
  },
  {
    question: "下载的 APK 用 VirusTotal 扫描没报毒就安全吗？",
    answer:
      "不一定。VirusTotal 用的是静态特征匹配，能发现已知恶意样本，但新变种、加壳、免杀的木马可能不被检出。所以它只是辅助手段，不能替代来源判断、哈希校验和签名检查。安全的做法是三层交叉验证，而不是只依赖某一个工具的扫描结果。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      点下「安装」，然后——「应用未安装」「解析程序包时出现问题」「安装失败」……屏幕一闪，什么都没发生。你已经重启过手机，也重新下过一遍包，问题依旧。
    </p>
    <p>
      好消息是：<strong>Android 安装失败的报错其实各自指向不同原因。</strong> 读懂那句话，修复就有了方向。这篇按「最常见到最冷门」的顺序，把每种失败逐一对号入座。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong> <strong>先抄下完整报错原文。</strong> 「解析失败」「签名冲突」「存储不足」是三个完全不同的问题，别用一个办法硬套。
      </p>
    </blockquote>

    <h2>一、先认清你的报错属于哪一类</h2>
    <p>安装失败大致分四类，对号入座：</p>
    <ul>
      <li>
        <strong>「解析程序包时出现问题」</strong> → 文件本身坏了，或下载不完整。
      </li>
      <li>
        <strong>「应用未安装」</strong> → 笼统报错，通常是残留旧版、存储、签名问题。
      </li>
      <li>
        <strong>「应用与现有软件包冲突」/「签名不一致」</strong> → 签名不匹配，最常见。
      </li>
      <li>
        <strong>「安装被拦截 / 未知来源禁止」</strong> → 权限或系统策略问题。
      </li>
    </ul>
    <p>再看是「下载阶段失败」还是「安装阶段失败」，两者排查方向不同。</p>

    <h2>二、原因一：安装包损坏或下载不完整</h2>
    <p>
      <strong>症状：</strong> 「解析程序包时出现问题」「无法打开文件」。
    </p>
    <p>
      <strong>原因：</strong> 下载中断、网络抖动、磁盘写入出错，都会导致 APK 文件残缺。
    </p>
    <p>
      <strong>排查：</strong>
    </p>
    <ol>
      <li>
        <strong>重新下载</strong>，尽量用<strong>稳定的 WiFi</strong>，别在信号差的移动网络下重试。
      </li>
      <li>
        <strong>对比文件大小</strong>——和你预期的大小差很多，就是没下完。
      </li>
      <li>
        <strong>看扩展名</strong>——文件是 <code>.apk</code> 而不是 <code>.apk.crdownload</code>、<code>.tmp</code>、<code>.zip</code>。
      </li>
      <li>
        <strong>别用下载器分片</strong>——部分多线程下载器会把大文件拼错。
      </li>
    </ol>
    <p>重下后仍报解析错误，换一个来源或换一个浏览器再试。</p>

    <h2>三、原因二：签名不一致（最典型）</h2>
    <p>
      <strong>症状：</strong> 「应用与现有软件包冲突」「签名不一致」。
    </p>
    <p>
      <strong>原因：</strong> Android 只允许<strong>用同一个证书签名</strong>的 APK 覆盖安装。如果你原本从 Google Play 装的，现在用别处下的包去更新，证书不同，系统就拒绝。
    </p>
    <p>
      <strong>排查与修复：</strong>
    </p>
    <ol>
      <li>
        <strong>从同一来源更新</strong>——Play 装的走 Play，侧载的要找同签名的新版。
      </li>
      <li>
        <strong>先卸载旧版再装新版</strong>——注意会<strong>清空应用数据，先备份</strong>。
      </li>
      <li>
        <strong>若必须保数据</strong>——没有 root 无法跨签名保留数据，只能先迁移数据再干净安装。
      </li>
    </ol>
    <blockquote>
      <p>提示：很多「破解版/魔改版」无法覆盖更新官方 App，正是因为它签了不同的名。</p>
    </blockquote>

    <h2>四、原因三：存储空间不足</h2>
    <p>
      <strong>症状：</strong> 「存储空间不足」「应用未安装」。
    </p>
    <p>
      <strong>原因：</strong> 不是「还剩几百 MB 就够」——安装时需要<strong>解压、优化、生成缓存</strong>，临时空间需求往往是 APK 的 2~3 倍。
    </p>
    <p>
      <strong>修复：</strong>
    </p>
    <ol>
      <li>
        预留<strong>至少 2GB 以上</strong>可用空间再装大型游戏。
      </li>
      <li>
        <strong>清理</strong>：设置 → 存储，清掉缓存、大视频、旧下载。
      </li>
      <li>卸载不用的 App，尤其是那几个吃空间的游戏。</li>
      <li>若可扩展，把部分数据移到 SD 卡。</li>
    </ol>

    <h2>五、原因四：残留旧版本 / 数据冲突</h2>
    <p>
      <strong>症状：</strong> 反复「应用未安装」，来源也对、空间也够。
    </p>
    <p>
      <strong>原因：</strong> 之前卸载不干净，残留了数据或残包；或装了同一 App 的另一个版本（如不同渠道版）。
    </p>
    <p>
      <strong>修复：</strong>
    </p>
    <ol>
      <li>设置 → 应用管理 → 找到同名 App → <strong>清除数据并卸载</strong>。</li>
      <li>
        用 <strong>ADB 卸载残留</strong>：
        <pre>
          <code>adb uninstall 包名</code>
        </pre>
        <pre>
          <code>adb uninstall --user 0 包名</code>
        </pre>
      </li>
      <li>重启手机后再装。</li>
      <li>
        检查是否开了<strong>应用双开/克隆</strong>，克隆出来的副本也会冲突。
      </li>
    </ol>

    <h2>六、原因五：未知来源 / 系统策略拦截</h2>
    <p>
      <strong>症状：</strong> 装到一半被拦，或提示「不允许安装」。
    </p>
    <p>
      <strong>原因：</strong> 没给当前来源「安装未知应用」的权限；企业设备有 MDM 策略；部分国产系统自带安全中心拦截。
    </p>
    <p>
      <strong>修复：</strong>
    </p>
    <ol>
      <li>
        设置 → 应用 → 特殊权限 → <strong>「安装未知应用」</strong>，给你正在用的浏览器/文件管理器授权。
      </li>
      <li>
        关掉<strong>安全中心的「应用安装拦截/纯净模式」</strong>（如小米、华为的相关选项）。
      </li>
      <li>
        <strong>工作资料/企业手机</strong>受管控，可能无法侧载，需联系管理员。
      </li>
      <li>系统版本过低装不了 targetSdk 太高的包，只能降低 App 版本。</li>
    </ol>

    <h2>七、原因六：架构与系统版本不匹配</h2>
    <p>
      <strong>症状：</strong> 「应用未安装」「设备不兼容」。
    </p>
    <p>
      <strong>原因：</strong>
    </p>
    <ul>
      <li>
        <strong>CPU 架构不符</strong>——x86 设备装只含 arm64 库的包。
      </li>
      <li>
        <strong>最低系统版本不够</strong>——App 要求 Android 10，你的手机是 Android 8。
      </li>
      <li>
        <strong>Split APK 只装了一部分</strong>——现在很多 App 拆成 base + split，单独装 base 会失败。
      </li>
    </ul>
    <p>
      <strong>修复：</strong>
    </p>
    <ol>
      <li>
        下载<strong>通用（universal）</strong> 版本，或对应你 CPU 架构的包。
      </li>
      <li>
        升级系统，或找<strong>兼容的旧版本 App</strong>。
      </li>
      <li>
        拆分包要用 <strong>SAI（Split APKs Installer）</strong> 这类工具整体安装，别单独点某个 split。
      </li>
    </ol>

    <h2>八、原因七：ADB 安装时的常见坑</h2>
    <p>用 <code>adb install</code> 也失败的话，看这里：</p>
    <ul>
      <li>
        <code>INSTALL_FAILED_VERSION_DOWNGRADE</code> → 装的是低版本号。加 <code>-d</code> 允许降级。
      </li>
      <li>
        <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> → 签名冲突，先 <code>adb uninstall 包名</code>。
      </li>
      <li>
        <code>INSTALL_FAILED_INSUFFICIENT_STORAGE</code> → 空间不足。
      </li>
      <li>
        <code>INSTALL_FAILED_TEST_ONLY</code> → 测试包，加 <code>-t</code>。
      </li>
      <li>
        多设备时用 <code>adb -s 序列号 install ...</code> 指定设备。
      </li>
    </ul>

    <h2>九、一张速查表</h2>
    <ul>
      <li>
        <strong>解析程序包时出现问题</strong> → 文件损坏/未下完 → 重下、核对大小
      </li>
      <li>
        <strong>应用与现有软件包冲突</strong> → 签名不一致 → 卸载旧版或同源更新
      </li>
      <li>
        <strong>存储空间不足</strong> → 空间不够 → 预留 2GB+、清理
      </li>
      <li>
        <strong>应用未安装（反复）</strong> → 残留/数据冲突 → 清数据卸载、ADB 卸载
      </li>
      <li>
        <strong>不允许安装</strong> → 未知来源被禁 → 授权安装权限、关纯净模式
      </li>
      <li>
        <strong>设备不兼容</strong> → 架构/版本不符 → 用通用版或旧版本
      </li>
    </ul>

    <h2>十、通用排查顺序（照这个走就行）</h2>
    <ol>
      <li>
        <strong>抄下完整报错</strong>，对照上表定位。
      </li>
      <li>
        <strong>重下安装包</strong>，确认完整、扩展名正确。
      </li>
      <li>
        <strong>留足空间</strong>，清理缓存。
      </li>
      <li>
        <strong>卸载旧版</strong>，清数据，重启。
      </li>
      <li>
        <strong>检查来源权限</strong>，关掉系统拦截。
      </li>
      <li>
        <strong>换安装工具</strong>（SAI、ADB）或<strong>换包版本</strong>。
      </li>
    </ol>

    <h2>十一、常见问题</h2>
    <p>
      <strong>问：卸载旧版会丢数据吗？</strong> 会。卸载会清空应用数据，先做好备份（应用内导出、云同步）再操作。
    </p>
    <p>
      <strong>问：不同签名的包能保留数据升级吗？</strong> 没有 root 不行。Android 从设计上就不允许跨签名覆盖安装。
    </p>
    <p>
      <strong>问：重启后能装、过一会儿又失败？</strong> 多半是后台的包管理或克隆服务在重新制造冲突，检查双开/工作资料里的副本。
    </p>

    <p>
      <strong>总结：</strong> APK 安装失败不可怕，可怕的是盲目重复操作。记住主线：<strong>报错原文 → 对号入座 → 从「文件→签名→空间→残留→权限→兼容」依次排查。</strong>{" "}
      九成的安装失败都能在前五步内解决，剩下的基本都是架构或系统版本这类「硬性不兼容」，换个对应版本的包就好。相关排查可参考{" "}
      <Link href="/zh/blog/apk-下载被安全软件拦截怎么办">APK 下载被安全软件拦截怎么办</Link>。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 安装失败提示「应用未安装」怎么办？",
    answer:
      "最常见三个原因：(1) 签名不一致——新 APK 和已安装版本的证书不同，通常是混用了 Google Play 和第三方下载来源；(2) 存储空间不足——安装需要同时容纳新包和旧版，占用量是 APK 的 2~3 倍；(3) 残留或冲突版本——如半安装的残包、工作资料副本、应用双开克隆。对照完整报错原文，找到对应原因再修复。",
  },
  {
    question: "APK 提示「解析程序包时出现问题」是什么原因？",
    answer:
      "通常是文件损坏或下载不完整，或下载了拆分包中的单个文件。先重新下载，用稳定 WiFi，核对文件大小和扩展名（应为 .apk 而非 .apk.crdownload/.tmp）。如果是 App Bundle 拆分应用，需要下载 XAPK/APKS 完整包，用 SAI 或 adb install-multiple 整体安装，单独装 base 会失败。",
  },
  {
    question: "签名冲突导致装不上，怎么保留数据升级？",
    answer:
      "Android 只允许同证书签名的 APK 覆盖安装，跨签名无法在保留数据的情况下升级（除非有 root）。解决办法：要么从原来源更新（Play 装的走 Play），要么先备份数据、卸载旧版、再干净安装新包。很多破解版/魔改版无法覆盖官方 App，正是因为它用了不同的签名。",
  },
  {
    question: "安装 APK 时提示存储空间不足，但实际还有空间？",
    answer:
      "安装时需要的临时空间远超 APK 本身——要解压、优化并同时保留旧版本，通常是安装包体积的 2~3 倍。装大型游戏建议预留至少 2GB 以上可用空间。清理缓存、大视频、旧下载包，卸载不用的 App 后再试。若失败总卡在 90% 左右，基本可以确定是空间问题。",
  },
];

export const zhPosts20260921: BlogPostEntry[] = [
  {
    slug: "apk-下载安全检测方法",
    title: "APK 下载安全检测方法：2026 完整自查指南",
    description:
      "从第三方站点下载 APK，最怕包里有毒、有后门。本文给出三层交叉验证方法：(1) 看来源——区分可信与高风险站点；(2) 验文件——核对 SHA-256 哈希、apksigner 查签名证书和包名、检查权限是否匹配功能、VirusTotal 扫描；(3) 盯行为——安装后看通知栏广告、后台流量耗电、陌生 App。附速查清单和发现异常后的处理步骤。",
    date: "2026-09-21",
    readTime: "8 min read",
    tags: ["android", "apk", "安全检测", "哈希校验", "签名", "权限", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-安装失败原因排查",
    title: "APK 安装失败的原因与排查方法：2026 全场景解决指南",
    description:
      "「应用未安装」「解析程序包时出现问题」「签名不一致」……每种报错都指向不同的原因。本文按最常见到最冷门的顺序逐一讲清：安装包损坏、签名不一致、存储空间不足、残留旧版本、未知来源拦截、架构与系统版本不匹配，以及 ADB 安装的常见坑。附速查表和标准排查顺序，九成安装失败都能在前五步解决。",
    date: "2026-09-21",
    readTime: "8 min read",
    tags: ["android", "apk", "安装失败", "排查", "签名冲突", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260921List = toList(zhPosts20260921);
