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
      你下载好了一个 APK，点开准备安装，系统却弹出一句冷冰冰的提示——&quot;已阻止安装&quot;&quot;为了安全，你的手机不允许安装此应用&quot;&quot;此应用存在风险&quot;。文件就在眼前，却怎么都装不上。
    </p>
    <p>
      结论先讲：<strong>绝大多数拦截不是病毒，而是系统的安全策略在起作用。</strong>安卓近年把&quot;未知来源安装&quot;的闸门越收越紧，厂商（华为、小米、OPPO、vivo、三星）又各自加了一层拦截。搞清是哪一层在拦你，就能对症放行。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>先分清&quot;策略拦截&quot;还是&quot;真的危险&quot;，再决定是放行还是放弃。</strong>
        恶意软件的拦截不要硬解。
      </p>
    </blockquote>

    <h2>一、先判断：这是&quot;策略拦截&quot;还是&quot;真的危险&quot;</h2>
    <p>不是所有拦截都该解除。看到提示先做判断：</p>
    <ul>
      <li>
        <strong>提示&quot;未知来源/为了安全&quot;</strong> → 这是策略拦截，可按需放行。
      </li>
      <li>
        <strong>提示&quot;检测到恶意软件/病毒/木马&quot;</strong> → 这是安全扫描拦截。
        <strong>除非你 100% 确信来源，否则不要放行。</strong>
      </li>
      <li>
        <strong>提示&quot;来源不明应用/未上架应用&quot;</strong> → 厂商风控，通常可放行。
      </li>
      <li>
        <strong>提示&quot;安装被 Google Play Protect 阻止&quot;</strong> → 扫描引擎判定，可临时关扫描，但先想清楚这文件哪来的。
      </li>
    </ul>
    <p>
      一个简单原则：<strong>如果你说不出这个 APK 的官方出处，拦截就是帮你的，别去解。</strong>
    </p>

    <h2>二、第 1 层：安卓系统本身的&quot;未知来源&quot;开关</h2>
    <p>
      这是最基础、也最常被忽略的一层。从 Android 8 开始，谷歌把开关从&quot;全局&quot;改成了<strong>按应用授权</strong>——不是&quot;允许安装未知应用&quot;，而是&quot;允许某个 App 去安装别的 App&quot;。
    </p>
    <p>
      <strong>操作路径（通用）：</strong>
    </p>
    <ol>
      <li>
        打开 <strong>设置 → 应用（或应用管理）</strong>。
      </li>
      <li>
        找到你用来打开 APK 的那个应用，通常是：
        <ul>
          <li>
            <strong>文件管理 / 文件</strong>
          </li>
          <li>
            <strong>浏览器</strong>（如果用浏览器直接点下载安装）
          </li>
          <li>
            <strong>微信 / QQ</strong>（如果从聊天里点开）
          </li>
        </ul>
      </li>
      <li>
        进入该应用的详情页，找到 <strong>&quot;安装未知应用&quot;</strong> 或{" "}
        <strong>&quot;允许安装应用&quot;</strong>。
      </li>
      <li>打开开关。</li>
    </ol>
    <p>
      <strong>关键点：</strong>你要授权的是&quot;哪个 App 去装&quot;，不是笼统的全局开关。如果 A 应用被拦，你却给 B 应用开了权限，当然没用。
    </p>
    <blockquote>
      <p>
        实用技巧：不确定是哪个 App 在装，就把 <strong>文件管理</strong> 和 <strong>浏览器</strong> 两个都授权一遍，覆盖 90% 的场景。
      </p>
    </blockquote>

    <h2>三、第 2 层：厂商安全中心的拦截（华为/小米/OPPO/vivo）</h2>
    <p>国产 ROM 在系统开关之上，还有一道&quot;安全中心&quot;。这是&quot;我明明开了未知来源还是装不上&quot;的头号原因。</p>
    <h3>华为 / 荣耀（鸿蒙）</h3>
    <ul>
      <li>
        路径：<strong>设置 → 安全 → 更多安全设置 → 安装外部来源应用</strong>。
      </li>
      <li>
        鸿蒙会额外提示&quot;纯净模式&quot;。若开启，会拦截非应用市场来源的安装。关闭方法：设置 → 系统和更新 → 纯净模式 → 退出。
      </li>
      <li>华为的&quot;应用市场安全检测&quot;也会拦，可在应用市场 → 我的 → 设置里调整检测等级。</li>
    </ul>
    <h3>小米 / 红米（MIUI / HyperOS）</h3>
    <ul>
      <li>
        小米会提示&quot;该应用未经安全检测&quot;，并有 <strong>&quot;继续安装&quot;</strong> 的倒计时按钮（有时藏在下拉里）。
      </li>
      <li>若被&quot;安全模式&quot;拦截，去 设置 → 应用设置 → 应用管理 → 权限 检查。</li>
      <li>安装前会做&quot;安全扫描&quot;，可点&quot;继续安装&quot;跳过，但请确认来源可信。</li>
    </ul>
    <h3>OPPO / 一加 / realme（ColorOS）</h3>
    <ul>
      <li>
        路径：<strong>设置 → 应用管理 → 特殊应用权限 → 安装未知应用</strong>。
      </li>
      <li>
        ColorOS 还有&quot;外部来源应用下载&quot;开关，在 设置 → 安全 → 安装外部来源应用。
      </li>
      <li>会弹出&quot;未经 OPPO 安全检测&quot;，点&quot;仍要安装&quot;。</li>
    </ul>
    <h3>vivo / iQOO（OriginOS）</h3>
    <ul>
      <li>
        路径：<strong>设置 → 更多设置 → 权限管理 → 安装未知应用</strong>。
      </li>
      <li>vivo 有&quot;应用安装验证&quot;，在 i管家 → 安全检测 里可调整。</li>
    </ul>
    <p>
      <strong>共同点：</strong>每家都有一句&quot;继续安装/仍要安装&quot;的按钮，它可能被折叠、被倒计时、或藏在提示下方。找不到就往下滚动。
    </p>

    <h2>四、第 3 层：Google Play Protect 的扫描拦截</h2>
    <p>如果设备装了 Google 服务，Play Protect 会在安装前扫描 APK。</p>
    <p>
      <strong>临时关闭（装完建议再打开）：</strong>
    </p>
    <ol>
      <li>打开 Google Play 商店。</li>
      <li>
        点右上角头像 → <strong>Play Protect</strong> → 齿轮设置。
      </li>
      <li>
        关闭 <strong>&quot;使用 Play Protect 扫描应用&quot;</strong>。
      </li>
    </ol>
    <p>装完后<strong>务必重新打开</strong>。它是你日常防护的重要一环，只是为了装这一个文件临时关一下。</p>

    <h2>五、第 4 层：特殊情况的硬拦截</h2>
    <p>有些拦截不是开关能解决的：</p>
    <ul>
      <li>
        <strong>targetSdk 过低：</strong>新系统（Android 14/15/16）会拒绝安装 targetSdk 太老的应用，提示&quot;此应用与你的手机不兼容&quot;。这是硬拦，没有官方开关可解，除非换旧设备或用模拟器。
      </li>
      <li>
        <strong>签名冲突：</strong>手机里已装了同包名但签名不同的应用，会提示&quot;应用未安装/签名不一致&quot;。需先卸载旧版。
      </li>
      <li>
        <strong>ABI 不匹配：</strong>下载了 x86 版本，装在 arm64 手机上。需换对应架构的包。
      </li>
      <li>
        <strong>Split APK 未合并：</strong>下载的是拆分包（.apks/.xapk），直接装会失败。需用工具合并安装。
      </li>
    </ul>
    <p>
      这几类属于&quot;文件本身的问题&quot;，不是&quot;策略拦截&quot;，去关开关是没用的，要回到文件层面解决。
    </p>

    <h2>六、安全提示：放行前请务必确认</h2>
    <p>解除拦截 = 你在替系统做判断。所以请先确认：</p>
    <ol>
      <li>
        <strong>来源可靠：</strong>来自官方官网或知名镜像站，不是群文件、短链、陌生网盘。
      </li>
      <li>
        <strong>哈希/签名对得上：</strong>有公示哈希就算一遍，签名指纹与官方一致。
      </li>
      <li>
        <strong>权限合理：</strong>一个手电筒应用要通讯录权限，直接放弃。
      </li>
      <li>
        <strong>多引擎扫描通过：</strong>上传 VirusTotal 看一眼，≥3 家报毒就别装。
      </li>
    </ol>
    <p>
      <strong>记住：安全扫描报毒时的拦截，99% 不该解除。</strong>
    </p>

    <h2>七、快速自查清单</h2>
    <p>按顺序排查，基本能覆盖所有&quot;装不上&quot;：</p>
    <ul>
      <li>✅ 文件在不在？路径对不对？（别把文件放进了受限目录）</li>
      <li>✅ 打开 APK 的那个 App，有没有&quot;安装未知应用&quot;权限？</li>
      <li>✅ 厂商安全中心/纯净模式关了吗？</li>
      <li>✅ Play Protect 是否拦了？（临时关）</li>
      <li>✅ 提示是不是恶意软件报毒？（报毒就别装）</li>
      <li>✅ 是不是签名冲突/版本不兼容/架构不对？（文件层面问题）</li>
      <li>✅ 重启手机再试一次（有些 ROM 改权限后要重启才生效）</li>
    </ul>

    <p>
      <strong>一句话总结：</strong>
      &quot;APK 安装被拦截&quot;的解法，本质是<strong>沿着系统 → 厂商 → 扫描引擎这三层，逐层确认是哪一层在拦你</strong>，然后只放行该放行的。能装官方商店就装官方商店，实在需要侧载，就选对来源、核验清楚。拦截不是敌人，它是提醒你&quot;这个文件值得多看一眼&quot;。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "APK 安装被系统拦截了怎么解除？",
    answer:
      "先分清是策略拦截还是恶意软件拦截。策略拦截（提示未知来源/为了安全）可放行：在设置 → 应用里给打开 APK 的那个 App（如文件管理、浏览器）开\"安装未知应用\"权限；再检查厂商安全中心（华为纯净模式、小米安全检测、OPPO/vivo 安装验证）并点\"继续安装\"；若被 Play Protect 拦，可临时关闭其扫描。恶意软件报毒的拦截不要解除。",
  },
  {
    question: "为什么开了未知来源还是装不上 APK？",
    answer:
      "因为国产 ROM 在系统开关之上还有一道厂商安全中心（如华为纯净模式、小米安全检测、ColorOS 外部来源下载、vivo 应用安装验证）。此外还有硬拦截：targetSdk 过低、签名冲突、ABI 架构不匹配、Split APK 未合并。前者点\"继续安装\"放行，后者需在文件层面解决。",
  },
  {
    question: "targetSdk 过低导致装不上怎么办？",
    answer:
      "这是硬拦截，没有官方开关可解。Android 14/15/16 会拒绝安装 targetSdk 太老的应用，提示\"此应用与你的手机不兼容\"。可行的办法是换一台旧设备安装，或在支持低 targetSdk 的模拟器里运行，也可以联系开发者提供更新版本。",
  },
  {
    question: "解除 APK 安装拦截安全吗？",
    answer:
      "要看情况。如果来源可信（官方官网或知名镜像站）、哈希和签名与官方一致、权限合理、多引擎扫描通过，放行是安全的。但如果安全扫描已经报毒，或你说不清文件来源，拦截就是在保护你，不应解除。放行前务必核验来源、哈希、签名和权限。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      你刚下载完一个 APK，通知栏还留着&quot;下载完成&quot;的痕迹，可等你去文件管理里找，
      <strong>文件不见了</strong>。或者点了安装，装到一半提示&quot;文件已删除&quot;。这种情况让人抓狂——明明下载了，东西却蒸发了。
    </p>
    <p>
      结论先说：<strong>APK 不会无缘无故消失，它通常是被&quot;某个程序&quot;或&quot;某条规则&quot;删掉了。</strong>找到那个&quot;凶手&quot;，问题就解决了一大半。下面按最常见到最罕见逐层排查。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>安卓上没有&quot;幽灵删除&quot;，只有你没注意到的清理规则、安全策略或路径误会。</strong>
      </p>
    </blockquote>

    <h2>一、先排除最简单的：你可能只是&quot;找不到&quot;，而不是&quot;被删除&quot;</h2>
    <p>在怀疑被删之前，先确认文件到底在不在。</p>
    <ol>
      <li>
        <strong>用系统搜索：</strong>文件管理里搜 <code>.apk</code>，别只在一个文件夹里翻。
      </li>
      <li>
        <strong>看下载记录：</strong>打开 文件管理 → 下载（或&quot;最近&quot;），找下载历史。
      </li>
      <li>
        <strong>浏览器下载记录：</strong>如果用浏览器下载，进浏览器下载内容里点&quot;打开所在文件夹&quot;。
      </li>
      <li>
        <strong>检查存储位置：</strong>下载可能默认存到了内部共享存储/Download，而你在翻的是 SD 卡（或反之）。
      </li>
    </ol>
    <p>
      <strong>很多&quot;被删除&quot;其实是文件躺在另一个地方，或者被改了名。</strong>先搜，再下结论。
    </p>

    <h2>二、原因 1：浏览器的&quot;下载后自动删除&quot;</h2>
    <p>部分浏览器（含隐私模式，或开启了&quot;下载完成自动清理&quot;）会在下载后删除文件。</p>
    <ul>
      <li>
        <strong>Chrome：</strong>正常不自动删，但&quot;隐身标签&quot;下载的文件可能被清理。
      </li>
      <li>
        <strong>第三方浏览器/下载器：</strong>常带&quot;下载后删除&quot;&quot;清理临时文件&quot;选项，默认可能开着。
      </li>
      <li>
        <strong>下载器类 App：</strong>某些&quot;高速下载器&quot;会把临时文件删掉，只留安装。
      </li>
    </ul>
    <p>
      <strong>对策：</strong>进浏览器设置 → 下载项，关闭&quot;下载后自动清理&quot;，或改用系统自带下载。
    </p>

    <h2>三、原因 2：安全软件 / 厂商安全中心的&quot;自动清理&quot;</h2>
    <p>这是最常见的原因之一。安全类 App 会把&quot;未安装的安装包&quot;当作<strong>垃圾文件</strong>清理。</p>
    <ul>
      <li>
        <strong>手机自带安全中心/管家：</strong>有&quot;垃圾清理&quot;&quot;安装包清理&quot;功能，扫描时会把 APK 当垃圾删掉。
      </li>
      <li>
        <strong>第三方清理 App：</strong>更激进，可能后台自动清。
      </li>
      <li>
        <strong>华为/小米等：</strong>安全中心有&quot;清理安装包&quot;的定时任务。
      </li>
    </ul>
    <p>
      <strong>对策：</strong>
    </p>
    <ol>
      <li>
        打开 安全中心 / 手机管家 → 清理加速 → 安装包，看是否被列入了清理项。
      </li>
      <li>
        到清理设置里<strong>关闭&quot;自动清理安装包&quot;</strong>。
      </li>
      <li>
        下载 APK 后，<strong>放到一个专门的文件夹</strong>（如 <code>Download/apk</code>），并尽量先把该文件夹设为&quot;排除清理&quot;。
      </li>
    </ol>

    <h2>四、原因 3：安装完成后系统主动删除源文件</h2>
    <p>有些情况下，<strong>安装成功后系统会删掉安装包</strong>——这其实是正常设计，只是你没意识到。</p>
    <ul>
      <li>
        部分 ROM 在&quot;安装完成后删除安装包&quot;选项开启时会这么做。
      </li>
      <li>华为/小米的安装器可能有&quot;安装后自动清理&quot;。</li>
    </ul>
    <p>
      <strong>对策：</strong>只要安装成功了，文件删了就删了。如果你想留着备用（比如给别的手机装、或备份），就把 APK 先复制一份到电脑或另一个文件夹，再安装。
    </p>

    <h2>五、原因 4：存储空间不足触发的自动清理</h2>
    <p>当手机空间告急，系统或清理工具会优先删&quot;大文件/安装包&quot;来腾地方。</p>
    <ul>
      <li>
        <strong>表现：</strong>下载时正常，过一会儿消失。
      </li>
      <li>
        <strong>逻辑：</strong>系统认为&quot;未安装的 APK = 可清理的临时文件&quot;。
      </li>
    </ul>
    <p>
      <strong>对策：</strong>清理出足够空间再下载；或者下载后立刻安装，不要拖。
    </p>

    <h2>六、原因 5：被误判为病毒的隔离/删除</h2>
    <p>安全扫描如果判定 APK 有风险，可能<strong>静默删除或隔离</strong>文件。</p>
    <ul>
      <li>
        <strong>常见于：</strong>从非官方来源下载、文件名可疑、或误报。
      </li>
      <li>
        <strong>表现：</strong>下载后通知里闪过&quot;已删除风险文件&quot;。
      </li>
    </ul>
    <p>
      <strong>对策：</strong>
    </p>
    <ol>
      <li>
        查看 安全中心 → 病毒查杀 → 隔离区/处理记录，看能否恢复。
      </li>
      <li>若确认真是误报且来源可信，可临时调整扫描策略。</li>
      <li>
        <strong>但如果它真的报毒，别恢复。</strong>换一个干净来源重新下载。
      </li>
    </ol>

    <h2>七、原因 6：下载被中断 / 存到了临时目录</h2>
    <ul>
      <li>
        下载没真正完成，文件只是&quot;临时文件&quot;，重启后临时目录被清空。
      </li>
      <li>
        有些 App 先下到 <code>/cache</code>，完成才移到正式目录；中途失败就没了。
      </li>
    </ul>
    <p>
      <strong>对策：</strong>确认下载进度到 100%；换网络重下；用系统浏览器。
    </p>

    <h2>八、一劳永逸的做法</h2>
    <p>想彻底避免&quot;下载后消失&quot;，养成这三个习惯：</p>
    <ol>
      <li>
        <strong>固定存放目录：</strong>在 <code>Download</code> 下建一个 <code>apk</code> 子文件夹，所有安装包都放这。
      </li>
      <li>
        <strong>排除清理：</strong>在安全中心/管家清理设置里，把该文件夹加入&quot;白名单/不清理&quot;。
      </li>
      <li>
        <strong>备份再安装：</strong>重要 APK 先复制到电脑或云盘，再动手装。
      </li>
    </ol>

    <h2>九、快速排查流程</h2>
    <p>按顺序走一遍，基本都能定位：</p>
    <ol>
      <li>
        ➡️ 先<strong>搜 <code>.apk</code></strong>，确认是真丢还是找错地方。
      </li>
      <li>
        ➡️ 看<strong>浏览器下载设置</strong>，是否开了自动清理。
      </li>
      <li>
        ➡️ 查<strong>安全中心清理记录/隔离区</strong>，是否被清或隔离。
      </li>
      <li>
        ➡️ 检查<strong>&quot;安装后删除安装包&quot;</strong>设置。
      </li>
      <li>
        ➡️ 确认<strong>存储空间</strong>是否充足。
      </li>
      <li>
        ➡️ 检查<strong>下载是否真的完成</strong>。
      </li>
      <li>
        ➡️ 固定目录 + 加白名单，防止复发。
      </li>
    </ol>

    <p>
      <strong>一句话总结：</strong>
      APK&quot;下载后自动删除&quot;几乎都能归到三类：<strong>被清理工具当垃圾删了、被安全策略拦了、或你只是没找对地方。</strong>
      逐个排查，再配合&quot;固定目录 + 白名单 + 先备份&quot;，这个问题就不会再烦你。记住关键一步：
      <strong>重要安装包，下载完先复制一份再装。</strong>
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 下载后自动删除怎么办？",
    answer:
      "先搜 .apk 确认是真丢还是找错地方，再逐层排查：浏览器是否开了下载后自动清理；安全中心/管家是否把安装包当垃圾清掉了；是否开启了安装后删除安装包；存储空间是否不足触发清理；是否被安全扫描隔离；下载是否真的完成。最后用固定目录 + 白名单 + 先备份来防止复发。",
  },
  {
    question: "为什么下载好的 APK 文件不见了？",
    answer:
      "常见原因有六个：浏览器下载后自动删除、安全软件或厂商安全中心把安装包当垃圾清理、安装完成后系统主动删除源文件、存储空间不足触发自动清理、被安全扫描误判隔离或删除、下载未真正完成只存了临时文件。大多是清理规则或安全策略导致，不是文件凭空消失。",
  },
  {
    question: "怎么防止安全软件删掉我下载的 APK？",
    answer:
      "在 Download 下建一个专门的 apk 子文件夹，把安装包都放进去；再到安全中心/手机管家的清理设置里把该文件夹加入白名单，关闭\"自动清理安装包\"。重要文件另外复制一份到电脑或云盘。这样清理时就不会扫到你的安装包。",
  },
  {
    question: "安装 APK 后文件被删除了正常吗？",
    answer:
      "正常。部分 ROM 和厂商安装器默认开启\"安装完成后删除安装包\"，安装成功后会自动清理源文件，这是设计行为不是故障。如果你想保留安装包备用，应该在安装前先把 APK 复制到电脑或另一个文件夹，再执行安装。",
  },
];

export const zhPosts20260916: BlogPostEntry[] = [
  {
    slug: "apk-install-blocked-how-to-allow",
    title: "APK 安装被系统拦截怎么解除？2026 全机型排查与放行指南",
    description:
      "下载了 APK 却提示\"已阻止安装\"\"为了安全不允许安装\"？绝大多数拦截不是病毒，而是系统的安全策略。本文按系统未知来源开关、厂商安全中心（华为纯净模式、小米安全检测、ColorOS、OriginOS）、Google Play Protect、特殊硬拦截（targetSdk/签名冲突/ABI/Split APK）四层逐层排查，讲清每层怎么放行、哪些拦截不该解除，并附快速自查清单。",
    date: "2026-09-16",
    readTime: "8 min read",
    tags: ["android", "apk", "安装", "拦截", "侧载", "排查", "华为", "小米", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-downloaded-file-disappears-fix",
    title: "APK 下载后自动删除怎么办？2026 常见原因与对策",
    description:
      "刚下载完的 APK 转眼不见了，或安装到一半提示\"文件已删除\"？APK 不会无缘无故消失，通常是被清理工具当垃圾删了、被安全策略拦了，或只是没找对地方。本文按六个原因逐层排查：浏览器自动清理、安全中心清理安装包、安装后删除源文件、存储不足触发清理、安全扫描隔离、下载未完成，并给出固定目录+白名单+先备份的一劳永逸做法。",
    date: "2026-09-16",
    readTime: "7 min read",
    tags: ["android", "apk", "下载", "文件消失", "清理", "排查", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260916List = toList(zhPosts20260916);
