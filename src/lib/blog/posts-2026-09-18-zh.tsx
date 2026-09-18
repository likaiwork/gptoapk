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
      你从官网或第三方站点下载 APK，文件下到一半就被杀毒软件、浏览器或手机安全中心&quot;咔嚓&quot;一下拦下——
      &quot;该文件包含病毒&quot;&quot;已阻止不安全下载&quot;&quot;检测到风险应用&quot;，下载直接被删，或者提示&quot;已隔离&quot;。
    </p>
    <p>
      先给结论：<strong>被拦截不等于文件是病毒。</strong>
      绝大多数拦截来自三类&quot;看不见的闸门&quot;：浏览器/下载器的安全扫描、电脑杀毒软件、手机安全中心。搞清是哪一层拦的，才能对症处理——该放行的放行，真危险的坚决别碰。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>先看拦截提示的&quot;主语&quot;是谁</strong>——是浏览器、杀毒软件，还是手机安全中心？三者处理方式完全不同。
      </p>
    </blockquote>

    <h2>一、先判断：这是&quot;误拦&quot;还是&quot;真拦&quot;</h2>
    <p>不是所有拦截都该解除。看到提示，先做一遍判断：</p>
    <ul>
      <li>
        <strong>提示&quot;可能包含病毒/木马&quot;且来源正规</strong> → 大概率误报，可放行。
      </li>
      <li>
        <strong>提示&quot;检测到恶意软件&quot;且来源不明</strong> → 相信它，删掉重下。
      </li>
      <li>
        <strong>提示&quot;证书/签名异常&quot;</strong> → 文件可能被二次打包，警惕。
      </li>
      <li>
        <strong>提示&quot;文件已损坏或下载不完整&quot;</strong> → 不是安全拦截，是下载出了问题，重下即可。
      </li>
    </ul>
    <p>
      一个简单原则：<strong>说不出这个 APK 的官方出处，拦截就是在帮你。</strong>
    </p>

    <h2>二、第 1 层：浏览器与下载器的安全扫描</h2>
    <p>Chrome、Edge、360 浏览器、迅雷、IDM 这类工具自带下载防护，这也是最常被误伤的一层。</p>
    <p>
      <strong>Chrome / Edge 放行步骤：</strong>
    </p>
    <ol>
      <li>
        打开 <strong>设置 → 隐私和安全 → 安全</strong>。
      </li>
      <li>
        找到 <strong>&quot;安全浏览&quot;</strong>，可临时选&quot;标准保护&quot;（&quot;增强保护&quot;会更严格）。
      </li>
      <li>
        若文件已被拦，进入 <strong>下载内容</strong> 页，找到被拦文件，点 <strong>&quot;保留&quot;</strong>。
      </li>
      <li>
        若提示&quot;可能会损害你的设备&quot;，选择 <strong>&quot;保留但仍可打开&quot;</strong>。
      </li>
    </ol>
    <p>
      <strong>360 浏览器 / 安全卫士：</strong>
    </p>
    <ul>
      <li>
        浏览器右下角弹拦截时，点 <strong>&quot;继续下载&quot;</strong> 或 &quot;信任并下载&quot;。
      </li>
      <li>
        360 安全卫士的&quot;下载保护&quot;可在 <strong>防护中心 → 下载保护</strong> 里临时关闭。
      </li>
      <li>
        若文件被隔离，进入 <strong>木马查杀 → 隔离区 → 恢复</strong>。
      </li>
    </ul>
    <p>
      <strong>迅雷 / IDM：</strong>
    </p>
    <ul>
      <li>迅雷：设置 → 安全设置 → 取消&quot;下载前对文件安全检查&quot;。</li>
      <li>IDM：通常不拦，但若系统杀软介入，走下一节处理。</li>
    </ul>
    <blockquote>
      <p>
        实用技巧：正规官网的 APK 被浏览器拦，多半是&quot;增强保护&quot;过度敏感。下载完成后
        <strong>先别急着放进手机</strong>，下一节的校验更重要。
      </p>
    </blockquote>

    <h2>三、第 2 层：电脑杀毒软件拦截</h2>
    <p>
      如果你是在电脑上先下载 APK 再传到手机，Windows Defender、火绒、360、卡巴斯基都可能中途拦截并删除文件。
    </p>
    <p>
      <strong>Windows Defender：</strong>
    </p>
    <ol>
      <li>
        打开 <strong>Windows 安全中心 → 病毒和威胁防护</strong>。
      </li>
      <li>
        找到 <strong>&quot;保护历史记录&quot;</strong>，定位被拦的 APK。
      </li>
      <li>
        点 <strong>&quot;操作 → 允许在设备上&quot;</strong>。
      </li>
      <li>
        若想避免再次被删，在 <strong>&quot;管理设置 → 排除项&quot;</strong> 里添加该下载文件夹。
      </li>
    </ol>
    <p>
      <strong>火绒 / 其他杀软：</strong>
    </p>
    <ul>
      <li>
        弹窗拦截时选择 <strong>&quot;信任此文件&quot;</strong>。
      </li>
      <li>
        已进隔离区：打开隔离区 → 选中 → <strong>恢复并加入信任区</strong>。
      </li>
    </ul>
    <p>
      <strong>重要提醒：</strong>放行前，<strong>务必核对文件的官方来源和哈希值</strong>（见第五节）。杀软报毒时直接放行是有风险的动作，别养成习惯。
    </p>

    <h2>四、第 3 层：手机安全中心/应用市场的拦截</h2>
    <p>如果 APK 传到手机后，在安装环节被拦，这是手机端安全中心在起作用。</p>
    <p>
      <strong>华为 / 荣耀：</strong>设置 → 安全 → 更多安全设置 → 关闭&quot;纯净模式&quot;，并调整&quot;应用市场安全检测&quot;等级。
    </p>
    <p>
      <strong>小米 / 红米：</strong>安装时弹出&quot;未通过安全检测&quot;，点 <strong>&quot;继续安装&quot;</strong>；若被&quot;安全中心&quot;直接拦，进入{" "}
      <strong>手机管家 → 病毒扫描 → 信任应用</strong>。
    </p>
    <p>
      <strong>OPPO / vivo：</strong>安装页点&quot;仍要安装&quot;；OEM 安全中心的&quot;安装监控&quot;可在设置里调整。
    </p>
    <p>
      <strong>Google Play Protect：</strong>设置 → Play 商店 → Play Protect → 关闭&quot;扫描应用&quot;（临时），装完再打开。
    </p>
    <blockquote>
      <p>
        注意：手机端拦截里，<strong>只有&quot;检测到恶意软件&quot;的提示要格外当真</strong>，其余&quot;未上架/来源不明/未通过检测&quot;多为风控，可按需放行。
      </p>
    </blockquote>

    <h2>五、放行之前：花 30 秒做校验</h2>
    <p>无论哪一层拦截，正式放行前用这招确认文件干净：</p>
    <ol>
      <li>
        <strong>核对来源</strong>：优先官网 / APKMirror / APKPure 等可信站点。
      </li>
      <li>
        <strong>对比哈希</strong>：在下载页找 SHA-256，用工具（Windows 的{" "}
        <code>certutil -hashfile 文件名 SHA256</code>）算出本地值，一致即未被篡改。
      </li>
      <li>
        <strong>查签名</strong>：用 <code>apksigner verify</code> 或手机上的签名查看器，确认签名者和官方一致。
      </li>
      <li>
        <strong>看体积</strong>：和官网标注的大小差太多，可能被塞了东西。
      </li>
    </ol>
    <p>
      <strong>只要来源可信 + 哈希一致，被误拦的 APK 基本可以放心安装。</strong>
    </p>

    <h2>六、常见问题速查</h2>
    <p>
      <strong>Q：浏览器一直重复拦截同一个文件？</strong>
      A：把该下载站点加入白名单，或换用&quot;标准保护&quot;模式；也可用 IDM 等不介入扫描的工具下载。
    </p>
    <p>
      <strong>Q：杀软删了文件，回收站也找不到？</strong>
      A：被删的文件通常在隔离区而非回收站，去杀软的&quot;隔离区/保护历史&quot;里恢复。
    </p>
    <p>
      <strong>Q：手机上关不掉拦截？</strong>
      A：部分品牌（如企业定制机）锁定了安全策略，只能换设备或用 ADB 安装。
    </p>
    <p>
      <strong>Q：放行后还是装不上？</strong>
      A：那多半不是安全拦截，而是签名冲突、系统版本不兼容等问题，需另做排查。
    </p>

    <h2>七、小结</h2>
    <p>
      APK 被安全软件拦截，核心是<strong>先定位&quot;谁在拦&quot;，再判断&quot;该不该放&quot;</strong>：
    </p>
    <ul>
      <li>浏览器/下载器拦截 → 保留文件 + 校验来源</li>
      <li>电脑杀软拦截 → 保护历史里恢复 + 加信任</li>
      <li>手机安全中心拦截 → 按 OEM 路径放行</li>
      <li>放行前永远先对哈希 / 看签名</li>
    </ul>
    <p>
      记住一句话：<strong>来源可信就放行，来源不明就删除。</strong> 拦截本身不是敌人，盲目的&quot;一键信任&quot;才是。相关验证方法可参考{" "}
      <Link href="/zh/blog/apk-下载安全检测方法">APK 下载安全检测方法</Link>。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "APK 下载被浏览器或杀毒软件拦截了怎么办？",
    answer:
      "先看拦截提示的主语是谁：如果是浏览器或下载器，进入下载内容页选择'保留'，或把安全浏览切到'标准保护'；如果是电脑杀毒软件（Windows Defender、火绒等），去'保护历史记录/隔离区'里恢复并加入信任；如果是手机安全中心，按厂商路径放行。但放行前务必核对官方来源并比对 SHA-256 哈希，来源不明就不要放行。",
  },
  {
    question: "被安全软件拦截的 APK 一定是病毒吗？",
    answer:
      "不一定。绝大多数拦截来自浏览器/下载器的安全扫描、电脑杀毒软件和手机安全中心这三类'闸门'，其中不少是误报，尤其是来源正规却提示'可能包含病毒'的情况。判断关键：能说出官方出处、哈希与官方一致，基本可放心；来源不明的就删除，不要盲目'一键信任'。",
  },
  {
    question: "放行前如何确认 APK 文件是安全的？",
    answer:
      "四步校验：(1) 核对来源，优先官网和 APKMirror/APKPure 等可信站点；(2) 对比哈希，用 certutil（Windows）或 shasum/sha256sum（Mac/Linux）算出 SHA-256，与下载页公布值逐字符比对；(3) 查签名，用 apksigner verify 或签名查看器确认签名者与官方一致；(4) 看体积，与官网标注差异过大要警惕。来源可信且哈希一致，被误拦的包基本可安全安装。",
  },
  {
    question: "手机安全中心一直拦截安装，关不掉怎么办？",
    answer:
      "手机端拦截按厂商处理：华为/荣耀关闭'纯净模式'并调整应用市场安全检测；小米在安装页点'继续安装'，或去手机管家信任；OPPO/vivo 点'仍要安装'；Play Protect 可临时关闭扫描。若提示是'检测到恶意软件'，应格外当真，不要强行放行。部分企业定制机锁定了安全策略、无法关闭，只能换设备或用 ADB 安装。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      装了个从网上下载的 APK 之后，手机突然变得又烫又费电——早上满电，中午就剩一半；放兜里也发烫；后台悄悄跑流量。
      你开始怀疑：是不是这个 APK 有猫腻？
    </p>
    <p>
      先给结论：<strong>耗电发热可能来自三处——应用本身的后台行为、权限滥用，或下载包被动了手脚。</strong>
      前两者可以调，后者必须删。下面按&quot;从轻到重&quot;的顺序帮你排查。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>先看&quot;是谁在耗电&quot;（电池用量页），再决定是关后台、收权限，还是直接卸载。</strong>
      </p>
    </blockquote>

    <h2>一、先定位：到底是哪个 App 在耗电</h2>
    <p>别凭感觉猜，用系统工具看到真相。</p>
    <p>
      <strong>安卓通用步骤：</strong>
    </p>
    <ol>
      <li>
        打开 <strong>设置 → 电池 → 电池用量 / 耗电排行</strong>。
      </li>
      <li>
        查看<strong>近 24 小时</strong>的耗电榜，找那个异常高的应用。
      </li>
      <li>
        点进去看 <strong>&quot;前台时间&quot;&quot;后台时间&quot;&quot;CPU 占用&quot;</strong>。
      </li>
      <li>
        <strong>判断标准：</strong>一个你几乎没打开过的 App，后台时间却很长、CPU 占用很高 → 就是它。
      </li>
    </ol>
    <p>
      <strong>进阶查看：</strong>
    </p>
    <ul>
      <li>
        开发者选项 → <strong>&quot;正在运行的服务&quot;</strong>，看它的内存和 CPU。
      </li>
      <li>
        若装了 <strong>AccuBattery</strong> 等工具，可看更细的唤醒次数（wake lock）。
      </li>
    </ul>
    <p>找到&quot;元凶&quot;后，再往下走。</p>

    <h2>二、第一层：这是&quot;正常&quot;还是&quot;异常&quot;耗电</h2>
    <p>有些耗电是合理的，别冤枉好人：</p>
    <ul>
      <li>
        <strong>地图/导航、视频、游戏</strong> 本来就很费电，属于正常。
      </li>
      <li>
        <strong>刚装的新应用</strong> 首次会做初始化、建索引，头一两天耗电偏高很正常，观察 48 小时再判断。
      </li>
      <li>
        <strong>信号差</strong> 时基带反复搜网也费电，和 App 无关。
      </li>
    </ul>
    <p>
      <strong>真正的异常信号：</strong>
    </p>
    <ul>
      <li>
        你<strong>根本没怎么用</strong>，它却长期霸榜后台。
      </li>
      <li>
        手机<strong>待机也发烫</strong>，屏幕关着也掉电快。
      </li>
      <li>
        伴随<strong>流量偷跑</strong>、<strong>弹广告</strong>、<strong>唤醒频繁</strong>。
      </li>
    </ul>
    <p>出现这些，进入下一节处理。</p>

    <h2>三、第二层：限制后台与自启（不卸载也能救）</h2>
    <p>对于正当应用（比如你确实在用的工具），可以先做&quot;限流&quot;。</p>
    <p>
      <strong>限制后台活动：</strong>
    </p>
    <ol>
      <li>设置 → 应用 → 该应用 → <strong>电池</strong>。</li>
      <li>
        选择 <strong>&quot;受限&quot;</strong> 或 <strong>&quot;优化&quot;</strong>，禁止它随意后台唤醒。
      </li>
    </ol>
    <p>
      <strong>关闭自启动 / 关联启动（国产 ROM）：</strong>
    </p>
    <ul>
      <li>小米：设置 → 应用设置 → 授权管理 → <strong>自启动管理</strong>。</li>
      <li>华为：设置 → 应用 → 应用启动管理 → 改为<strong>手动管理</strong>，关掉&quot;自启动&quot;&quot;关联启动&quot;。</li>
      <li>OPPO/vivo：设置 → 应用管理 → <strong>自启动 / 后台运行</strong>里关闭。</li>
    </ul>
    <p>
      <strong>限制后台数据：</strong>
    </p>
    <ul>
      <li>设置 → 应用 → 该应用 → <strong>流量使用</strong> → 关闭&quot;后台流量&quot;。</li>
    </ul>
    <p>
      <strong>卸载无用同款：</strong> 如果你装了两个功能重叠的下载器/清理工具，留一个即可，它们互相唤醒会加倍耗电。
    </p>
    <blockquote>
      <p>
        实用技巧：微信、支付宝这类&quot;刚需&quot;别乱限制，否则收不到消息。<strong>只对可疑的、偶尔用的应用下手。</strong>
      </p>
    </blockquote>

    <h2>四、第三层：收回过度权限（关键一步）</h2>
    <p>
      恶意或流氓 APK 耗电，多半是因为<strong>过度申请并滥用权限</strong>。
    </p>
    <p>
      <strong>打开权限管理逐项检查：</strong>设置 → 应用 → 该应用 → <strong>权限</strong>，重点看这几项是否被滥用：
    </p>
    <ul>
      <li>
        <strong>定位</strong>：正常用于导航、外卖；一个计算器要定位就是可疑信号。
      </li>
      <li>
        <strong>后台定位</strong>：正常用于运动/打车；长期后台定位耗电极快。
      </li>
      <li>
        <strong>读取联系人/短信</strong>：正常属于通讯类；小工具索要即可疑。
      </li>
      <li>
        <strong>悬浮窗</strong>：正常用于输入法/助手；弹广告的应用常见。
      </li>
      <li>
        <strong>无障碍</strong>：正常用于辅助功能；被用来模拟点击、偷跑就是危险。
      </li>
      <li>
        <strong>自启动/后台弹出</strong>：后台常驻耗电的主因。
      </li>
    </ul>
    <p>
      <strong>处理：</strong>把非必要权限改为 <strong>&quot;仅使用时允许&quot;</strong> 或直接<strong>拒绝</strong>。特别警惕{" "}
      <strong>&quot;无障碍&quot;</strong> 权限，这是流氓软件最爱的后门。
    </p>

    <h2>五、第四层：怀疑 APK 本身被动过手脚</h2>
    <p>
      如果上面都做了还是烫，就要考虑<strong>这个 APK 本身有问题</strong>——尤其当你从非官方渠道下载时。
    </p>
    <p>
      <strong>危险信号：</strong>
    </p>
    <ul>
      <li>应用体积明显比官网大。</li>
      <li>名称/图标和正版几乎一样，但开发者不同。</li>
      <li>装完就疯狂弹广告、偷偷装别的应用。</li>
      <li>权限申请远超功能需要。</li>
    </ul>
    <p>
      <strong>验证方法：</strong>
    </p>
    <ol>
      <li>
        <strong>对哈希</strong>：下载页的 SHA-256 与本地文件比对，不一致说明被改过。
      </li>
      <li>
        <strong>看签名</strong>：用签名查看工具，确认签名者和官方一致。
      </li>
      <li>
        <strong>换渠道重下</strong>：从 APKMirror / APKPure / 官网重新获取，替换安装。
      </li>
    </ol>
    <p>
      <strong>结论：</strong>一旦确认是山寨或篡改包，<strong>不要调设置，直接卸载</strong>。再怎么限流也治不了根。
    </p>

    <h2>六、紧急处理：先止损再排查</h2>
    <p>手机已经烫得厉害时，先做这几步：</p>
    <ol>
      <li>
        <strong>重启手机</strong>，清掉异常后台进程。
      </li>
      <li>
        长按可疑应用 → <strong>强制停止</strong>。
      </li>
      <li>
        开启<strong>省电模式</strong>应急。
      </li>
      <li>
        若怀疑是恶意软件，进入<strong>安全模式</strong>（开机时长按音量键）再卸载它。
      </li>
      <li>
        实在不行，备份数据后<strong>恢复出厂</strong>（最后手段）。
      </li>
    </ol>

    <h2>七、常见问题速查</h2>
    <p>
      <strong>Q：删了 App 还是费电？</strong>
      A：可能是残留后台服务或系统其他进程，重启后观察；仍异常就查&quot;正在运行的服务&quot;。
    </p>
    <p>
      <strong>Q：新装的 App 该给它多少天观察期？</strong>
      A：48 小时。头两天偏高正常，持续超标才是问题。
    </p>
    <p>
      <strong>Q：省电模式会不会影响正常使用？</strong>
      A：会略微降低后台刷新和性能，日常够用，关键场景可临时关闭。
    </p>
    <p>
      <strong>Q：正版 App 也耗电怎么办？</strong>
      A：属于应用优化问题，可限制后台 + 关闭自启，或向开发者反馈。
    </p>

    <h2>八、小结</h2>
    <p>APK 安装后耗电发热，按这个顺序排查，一般都能解决：</p>
    <ol>
      <li>
        <strong>电池用量页定位</strong>真正的耗电应用
      </li>
      <li>
        <strong>区分正常/异常</strong>，给新装应用 48 小时观察期
      </li>
      <li>
        <strong>限制后台、自启、后台流量</strong>（不卸载也能救）
      </li>
      <li>
        <strong>收回过度权限</strong>，尤其警惕无障碍和后台定位
      </li>
      <li>
        <strong>验证 APK 是否被篡改</strong>，是山寨包就果断卸载
      </li>
    </ol>
    <p>
      记住一句话：<strong>能调就调，调不好就卸；来路不明的包，一秒都别留。</strong> 相关方法可参考{" "}
      <Link href="/zh/blog/apk-下载安全检测方法">APK 下载安全检测方法</Link>。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 安装后手机耗电快、发热严重怎么办？",
    answer:
      "按顺序排查：(1) 打开设置→电池→电池用量，定位真正的耗电应用；(2) 区分正常与异常，给刚装的应用 48 小时观察期；(3) 限制后台活动、自启动、关联启动和后台流量（不卸载也能救）；(4) 收回过度权限，尤其警惕'无障碍'和'后台定位'；(5) 如果仍异常，验证 APK 是否被篡改，确认是山寨包就果断卸载。",
  },
  {
    question: "怎么判断是哪个 App 在偷偷耗电？",
    answer:
      "用设置→电池→电池用量（耗电排行）看近 24 小时排行，点进异常应用查看前台时间、后台时间和 CPU 占用。判断标准：一个你几乎没打开的 App 后台时间却很长、CPU 占用高，就是它。进阶可用开发者选项里的'正在运行的服务'，或 AccuBattery 查看唤醒次数。",
  },
  {
    question: "哪些权限被滥用会导致耗电和发热？",
    answer:
      "重点看：定位和后台定位（长期后台定位耗电极快）、读取联系人和短信、悬浮窗（弹广告）、以及最危险的无障碍权限（被用来模拟点击、偷跑）。此外自启动和后台弹出会导致应用常驻。处理办法是把非必要权限改为'仅使用时允许'或直接拒绝，特别警惕'无障碍'权限——这是流氓软件最爱的后门。",
  },
  {
    question: "新安装的 App 耗电偏高正常吗？要观察多久？",
    answer:
      "正常。刚装的新应用首次会做初始化、建索引，头一两天耗电偏高很常见，建议给它 48 小时观察期。如果 48 小时后仍长期霸榜后台、待机也发烫、并伴随流量偷跑或弹广告，才属于真正的异常，需要限制后台或卸载。另外信号差时基带反复搜网也会费电，和 App 无关。",
  },
];

export const zhPosts20260918: BlogPostEntry[] = [
  {
    slug: "apk-下载被安全软件拦截怎么办",
    title: "APK 下载被安全软件拦截怎么办？2026 分层排查与放行指南",
    description:
      "APK 下载被浏览器、杀毒软件或手机安全中心拦截，不等于文件是病毒。本文按'谁在拦'分层讲清处理方式：浏览器/下载器安全扫描、电脑杀毒软件（Defender/火绒/360）、手机安全中心（华为/小米/OPPO/vivo/Play Protect），并给出放行前的来源核对与 SHA-256 哈希校验方法，帮你既不被误拦误伤，也不放行真正的危险文件。",
    date: "2026-09-18",
    readTime: "8 min read",
    tags: ["android", "apk", "安全拦截", "杀毒软件", "放行", "哈希校验", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-安装后耗电快发热怎么办",
    title: "APK 安装后耗电快、发热严重怎么办？2026 排查与省电指南",
    description:
      "装了个网上下载的 APK 后手机又烫又费电？本文按'从轻到重'教你排查：用电池用量页定位真正的耗电应用、区分正常与异常耗电、限制后台/自启/后台流量、收回过度权限（尤其无障碍和后台定位）、以及验证 APK 是否被篡改。附紧急处理步骤和常见问题速查，能调就调、调不好就卸，来路不明的包一秒别留。",
    date: "2026-09-18",
    readTime: "8 min read",
    tags: ["android", "apk", "耗电", "发热", "省电", "权限", "排查", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260918List = toList(zhPosts20260918);
