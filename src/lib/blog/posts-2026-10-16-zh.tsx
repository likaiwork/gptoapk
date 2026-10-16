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
      有时候你需要把一个已经从 Google Play 装好的应用，导出成 APK 安装包留档或分享——换机前备份、给旧手机装、或者单纯想存一份离线安装包。问题是：Google Play
      装完之后并不给你留下一个 <code>xxx.apk</code>，尤其是新版安卓的「应用包」（App
      Bundle）机制，装到手机里的其实是一个<strong>拆分后的分片结构</strong>，直接拷贝是拷不出完整安装包的。
    </p>
    <blockquote>
      <p>
        <strong>核心观点：</strong>
        现代安卓上「提取 APK」= 找到应用的安装路径 + 把 base.apk 和 split
        分片一起导出。免 Root 用专门的提取工具即可，根本不用折腾 ADB。
      </p>
    </blockquote>

    <h2>一、先搞懂：Google Play 装的应用，文件在哪</h2>
    <p>安卓应用的安装目录固定在：</p>
    <pre>
      <code>{`/data/app/            ← 用户安装的应用主目录
/data/app/~~随机串~~/包名-随机串/`}</code>
    </pre>
    <p>在这个目录里你会看到：</p>
    <ul>
      <li>
        <strong>base.apk</strong> —— 主安装包（核心代码和资源）
      </li>
      <li>
        <strong>split_config.xxx.apk</strong> —— 分片包（按 CPU 架构、语言、屏幕密度拆出来的资源）
      </li>
      <li>
        <strong>lib/</strong> —— 解压出来的 native 库
      </li>
    </ul>
    <p>
      新版安卓（Android 5.0+）用 <strong>Split APK</strong> 机制，一个应用可能是 <code>base + 若干 split</code>
      。所以「提取」的关键，是把 <strong>base 和所有 split 一起拿走</strong>
      ，而不是只拷 base.apk——否则很多应用装上会闪退或提示「应用未安装」。
    </p>

    <h2>二、方法一：用提取工具（免 Root，最推荐）</h2>
    <p>这是最省事的路径，全程不用 Root，也不用接电脑。</p>
    <p>
      <strong>推荐工具：</strong>
    </p>
    <ul>
      <li>
        <strong>MT 管理器</strong> —— 国内用得最多，能直接浏览 <code>/data/app</code> 并导出应用。
      </li>
      <li>
        <strong>APK Extractor / App Backup &amp; Restore</strong> —— 应用商店里直接搜，界面傻瓜式。
      </li>
      <li>
        <strong>SAI（Split APKs Installer）</strong> —— 虽然主打安装，但也能提取和打包 Split APK。
      </li>
    </ul>
    <p>
      <strong>以 MT 管理器为例的步骤：</strong>
    </p>
    <ol>
      <li>
        打开 MT 管理器，切换到<strong>根目录</strong>视图（它申请的是「所有文件访问权限」，无需 Root）。
      </li>
      <li>
        进入 <code>/data/app/</code>，找到目标应用对应的文件夹（文件夹名带包名，比如{" "}
        <code>com.example.app-xxxx</code>）。
      </li>
      <li>
        进入该文件夹，长按选中 <strong>base.apk</strong> 和所有 <strong>split_config*.apk</strong>。
      </li>
      <li>
        点击「复制」，粘贴到 <code>/sdcard/Download/xxx/</code> 目录下。
      </li>
      <li>如果目标是单文件 APK（方便分享），再用 MT 管理器的「APK 打包/合并」功能，把 base 和 split 合成一个 APK。</li>
    </ol>
    <blockquote>
      <p>小技巧：有些提取工具会自动把多个分片打包成一个标准 APK，省去手动合并。商店里搜「APK 提取」评分高的那几款大多支持。</p>
    </blockquote>

    <h2>三、方法二：用 ADB 命令行（接电脑，无需 Root）</h2>
    <p>如果你习惯用电脑，ADB 也能提取，而且更干净。</p>
    <p>
      <strong>前置：</strong>电脑装好 ADB，手机开启「USB 调试」。
    </p>
    <pre>
      <code>{`# 1. 找到应用的包名（如果你不确定）
adb shell pm list packages | grep 关键词

# 2. 查看该应用所有安装路径（base + split 都会列出来）
adb shell pm path com.example.app

# 输出示例：
# package:/data/app/~~abc~~/com.example.app-xyz/base.apk
# package:/data/app/~~abc~~/com.example.app-xyz/split_config.arm64_v8a.apk
# package:/data/app/~~abc~~/com.example.app-xyz/split_config.zh.apk

# 3. 逐条 pull 到电脑
adb pull /data/app/~~abc~~/com.example.app-xyz/base.apk
adb pull /data/app/~~abc~~/com.example.app-xyz/split_config.arm64_v8a.apk
adb pull /data/app/~~abc~~/com.example.app-xyz/split_config.zh.apk`}</code>
    </pre>
    <p>
      <strong>关键点：</strong> <code>pm path</code> 会把<strong>所有</strong>
      分片都列出来，一条都不要漏。全部 pull 下来后，安装时用 SAI 或{" "}
      <code>adb install-multiple</code> 一起装：
    </p>
    <pre>
      <code>{`adb install-multiple base.apk split_config.arm64_v8a.apk split_config.zh.apk`}</code>
    </pre>
    <p>这样装出来的应用才是完整、不会闪退的。</p>

    <h2>四、方法三：Root 用户直接拷（最快但有门槛）</h2>
    <p>如果你手机已 Root，提取就是纯粹的复制粘合：</p>
    <ol>
      <li>
        用 Root 文件管理器（MT 管理器开 Root 模式、Solid Explorer 等）进入 <code>/data/app/</code>。
      </li>
      <li>
        找到目标文件夹，把 base.apk 和 split 全选复制到 <code>/sdcard/</code>。
      </li>
      <li>完事。</li>
    </ol>
    <p>
      Root 的好处是能访问<strong>所有</strong>应用目录；免 Root
      工具在个别系统上可能读不到某些系统应用或受保护应用，这时 Root 是最稳的兜底。
    </p>

    <h2>五、提取出来的包，怎么变成「能独立安装」的正常 APK</h2>
    <p>Split APK 直接分享给别人，对方如果不知道要一起装分片，就会失败。两种处理思路：</p>
    <ul>
      <li>
        <strong>打成单 APK</strong>：用 MT 管理器或 APK 编辑器合并 base + split，生成标准
        APK。注意：合并后<strong>签名会变</strong>，如果应用有签名校验可能打不开，属于正常现象。
      </li>
      <li>
        <strong>保留包结构，用 Split 安装器</strong>：直接把所有分片一起发给对方，让对方用 SAI
        手动选择安装。适合开发测试场景。
      </li>
    </ul>

    <h2>六、常见问题速查</h2>
    <table>
      <thead>
        <tr>
          <th>问题</th>
          <th>原因</th>
          <th>解决</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>提取后安装提示「解析错误」</td>
          <td>只拷了 base，缺 split</td>
          <td>补齐所有 split_config 分片</td>
        </tr>
        <tr>
          <td>安装后打开闪退</td>
          <td>架构不匹配（拿了 arm 的包装 x86）</td>
          <td>提取对应 CPU 架构的分片</td>
        </tr>
        <tr>
          <td>
            找不到 <code>/data/app</code> 内容
          </td>
          <td>免 Root 权限不足</td>
          <td>换 MT 管理器/开 Root</td>
        </tr>
        <tr>
          <td>分享后对方装不上</td>
          <td>分片没一起给</td>
          <td>合并成单 APK 或让对方用 SAI</td>
        </tr>
        <tr>
          <td>合并后应用打不开</td>
          <td>签名被改，触发校验</td>
          <td>属正常，能装但受校验的应用会拒开</td>
        </tr>
      </tbody>
    </table>

    <h2>七、总结</h2>
    <p>
      提取 Google Play 应用 APK 的完整逻辑就是三步：<strong>定位 <code>/data/app</code> 目录 → 把 base.apk
      和所有 split 分片一起导出 → 视需要合并成单 APK</strong>。免 Root 用户用 MT 管理器最顺手，进阶用户用 ADB{" "}
      <code>pm path</code> + <code>install-multiple</code> 最干净，Root 用户直接拷最快。
    </p>
    <p>
      记住那条铁律：<strong>新版安卓是 Split APK，只拷 base 一定装不全。</strong>
      把分片当一家人整整齐齐地搬走，问题就解决了一大半。急着要某个应用的话，直接在{" "}
      <Link href="/">gptoapk.com</Link> 按包名下载匹配的安装包往往更快。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么我从 Google Play 提取出来的 APK 装不上？",
    answer:
      "多半是只拷了 base.apk，漏了 split 分片。现代安卓用 Split APK 机制，一个应用由 base 加若干 split（架构、语言、密度）组成，必须一次性全部一起安装，缺一块就会提示「应用未安装」或「解析失败」。请把 base.apk 和所有 split_config*.apk 一起导出、一起安装。",
  },
  {
    question: "提取 Google Play 的 APK 需要 Root 吗？",
    answer:
      "不一定。用 MT 管理器、APK Extractor 这类工具，申请「所有文件访问权限」后无需 Root 就能读取 /data/app 并导出应用。只有个别受保护或系统应用在免 Root 下读不到，这时才需要 Root 或 ADB 兜底。",
  },
  {
    question: "提取出来的应用为什么打开会闪退？",
    answer:
      "通常是 CPU 架构分片不匹配。比如手机是 arm64-v8a，你却只拿了 arm 或 x86 的分片，Native 库加载失败就会闪退。提取时务必包含与手机 ABI 对应的 split_config.<架构>.apk。",
  },
  {
    question: "把分片合并成单个 APK 后为什么打不开？",
    answer:
      "因为合并会改变 APK 的签名，触发应用自身的签名校验。能装不代表能跑——部分游戏、金融类应用会检测签名并拒绝启动，这是正常代价。如果只是自己留档或测试，直接用 SAI 安装原始分片更稳妥。",
  },
  {
    question: "没有 Root 也没有电脑，能提取 APK 吗？",
    answer:
      "可以。用手机上的 APK 提取类应用，授权所有文件访问权限后，直接在手机上浏览已安装应用并导出。想要单文件的话，选带「打包/合并分片」功能的提取器即可。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      如果你从第三方渠道下载过安卓应用，大概率遇到过这种文件：一堆名字奇怪的小文件，什么 <code>base.apk</code>、
      <code>split_config.arm64_v8a.apk</code>、<code>split_config.en.apk</code>
      ……单独点哪一个都装不上，点 base.apk 装到一半提示<strong>「应用未安装」</strong>或<strong>「解析失败」</strong>。
    </p>
    <p>
      这就是 <strong>Split APK</strong>（拆分安装包）。它是 Android 5.0 引入、Google Play 从 2021
      年起强推的打包机制。这篇指南把 Split APK 讲透，并给出<strong>从零到装成功的完整操作步骤</strong>
      ，重点是那几种真正好用的安装方式。
    </p>
    <blockquote>
      <p>
        <strong>核心观点：</strong> Split APK 不能逐个安装，必须一次性把所有分片一起提交给系统。用 SAI 或{" "}
        <code>adb install-multiple</code>，一步到位。
      </p>
    </blockquote>

    <h2>一、Split APK 到底是什么，为什么要拆</h2>
    <p>
      传统的 APK 是一个大文件，里面塞了所有 CPU 架构的原生库、所有语言的字符串、所有屏幕密度的图片。结果是：
      <strong>你手机根本用不到的资源，全被下载了。</strong>
    </p>
    <p>Google 的解法是「拆包」：</p>
    <ul>
      <li>
        <strong>base.apk</strong> —— 所有设备都需要的核心代码和资源，<strong>必须有</strong>。
      </li>
      <li>
        <strong>split_config.&lt;架构&gt;.apk</strong> —— 按 CPU 架构拆，比如 <code>arm64_v8a</code>、
        <code>x86_64</code>，只装你手机需要的那个。
      </li>
      <li>
        <strong>split_config.&lt;语言&gt;.apk</strong> —— 按语言拆，比如 <code>en</code>、<code>zh</code>。
      </li>
      <li>
        <strong>split_config.&lt;密度&gt;.apk</strong> —— 按屏幕密度拆，比如 <code>xxhdpi</code>。
      </li>
    </ul>
    <p>
      好处是安装包大幅变小、下载更快。<strong>代价是：安装时系统要把这些分片一次性「拼」到一起</strong>
      ，缺一块就拼不起来。
    </p>
    <p>
      关键理解：<strong>base + 所有 split 必须属于同一个应用、同一版本、同一签名</strong>，混搭版本会直接失败。
    </p>

    <h2>二、装之前：确认你手里的分片是齐的</h2>
    <p>下载目录里应该是一组文件，而不是单个：</p>
    <pre>
      <code>{`com.example.app/
├── base.apk                    ← 核心，必需
├── split_config.arm64_v8a.apk  ← 你的 CPU 架构
├── split_config.xxhdpi.apk     ← 屏幕密度
└── split_config.zh.apk         ← 语言（可选）`}</code>
    </pre>
    <p>
      <strong>判断自己手机 CPU 架构</strong>（决定要哪个架构分片）：设置 → 关于手机 → 处理器信息里通常能看到；或用「CPU-Z」「AIDA64」等工具查看
      ABI。2020 年后绝大多数手机是 <strong>arm64-v8a</strong>。
    </p>
    <p>
      <strong>最少需要：</strong>base + 对应架构分片。密度和语言分片多数情况下可以省略（系统会用 base
      里的默认资源兜底），但<strong>架构分片不能省</strong>，缺了必闪退。
    </p>

    <h2>三、方法一：SAI（Split APKs Installer）—— 最推荐，免电脑</h2>
    <p>SAI 是专门为 Split APK 而生的安装器，图形界面，手机上直接操作。</p>
    <p>
      <strong>步骤：</strong>
    </p>
    <ol>
      <li>
        从可信来源安装 <strong>SAI</strong>（开源项目，GitHub 可下）。
      </li>
      <li>把下载好的分片文件夹放在手机存储里。</li>
      <li>
        打开 SAI → 点「安装 APK」→ 选择<strong>整个文件夹</strong>（或把所有分片一起选中）。
      </li>
      <li>SAI 会自动识别 base 和 split，点「安装」。</li>
      <li>装上后如果提示签名冲突，先卸载旧版本再装。</li>
    </ol>
    <p>
      <strong>注意：</strong>SAI 需要「安装未知应用」权限。部分系统（如 MIUI）还需在「开发者选项」里允许 SAI 安装。
    </p>

    <h2>四、方法二：ADB install-multiple —— 电脑党最干净</h2>
    <p>一行命令装一组，不装任何手机端 App。</p>
    <pre>
      <code>{`# 把所有分片放进同一个文件夹，cd 进去
cd /path/to/com.example.app/

# 一次性提交 base + 所有 split
adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk split_config.zh.apk`}</code>
    </pre>
    <p>如果文件多，懒得手打，可以通配：</p>
    <pre>
      <code>{`adb install-multiple base.apk split_config.*.apk`}</code>
    </pre>
    <p>
      <strong>常见报错对照：</strong>
    </p>
    <table>
      <thead>
        <tr>
          <th>ADB 报错</th>
          <th>含义</th>
          <th>解决</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>INSTALL_FAILED_INVALID_APK</td>
          <td>分片不完整或版本不一致</td>
          <td>确认 base 与 split 同版本</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_UPDATE_INCOMPATIBLE</td>
          <td>签名冲突（装了别的版本）</td>
          <td>
            <code>adb uninstall 包名</code> 后重装
          </td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_NO_MATCHING_ABIS</td>
          <td>架构分片与手机不符</td>
          <td>换成 arm64-v8a 或对应架构</td>
        </tr>
        <tr>
          <td>INSTALL_PARSE_FAILED_UNEXPECTED_EXCEPTION</td>
          <td>文件损坏</td>
          <td>重新下载</td>
        </tr>
      </tbody>
    </table>

    <h2>五、方法三：合并成单 APK，再当普通 APK 装</h2>
    <p>如果你更习惯「一个文件走天下」，可以把分片合并成一个标准 APK：</p>
    <ul>
      <li>
        <strong>MT 管理器</strong>：长按 base.apk → 用 APK 编辑器加载 → 通过「合并拆分包 / 加载外部包」把 split
        并入 → 保存。
      </li>
      <li>
        <strong>APKEditor</strong>（开源）：命令行为主，适合批量。
      </li>
    </ul>
    <pre>
      <code>{`java -jar APKEditor.jar m -i ./com.example.app/ -o merged.apk`}</code>
    </pre>
    <p>
      合并后就是一个能直接点击安装的单文件了。<strong>但注意：合并会改变签名</strong>
      ，如果原应用有签名校验（部分游戏、金融类），合并版可能打不开——这是正常代价，能装 ≠ 能跑。
    </p>

    <h2>六、装不上时，按这个顺序排查</h2>
    <ol>
      <li>
        <strong>分片齐不齐？</strong>是不是只拿了 base，漏了架构分片？
      </li>
      <li>
        <strong>架构对不对？</strong>arm64 手机装了 x86 分片 → 必失败。换 arm64_v8a。
      </li>
      <li>
        <strong>版本一不一致？</strong>分片别混不同版本，全用同一批下载的。
      </li>
      <li>
        <strong>签名冲突？</strong>先彻底卸载旧版（含分身/工作资料里的那份），重启再装。
      </li>
      <li>
        <strong>下载损坏？</strong>校验文件大小，重新下。
      </li>
    </ol>

    <h2>七、总结</h2>
    <p>
      Split APK 的安装逻辑一句话就能概括：<strong>把所有分片（base + 架构 + 密度 + 语言）一次性交给系统，不能一个一个装。</strong>
    </p>
    <ul>
      <li>
        手机上操作：<strong>用 SAI</strong>，选整个文件夹，一步到位。
      </li>
      <li>
        电脑上操作：<strong>
          <code>adb install-multiple</code>
        </strong>
        ，一行命令，最干净。
      </li>
      <li>
        想要单文件：用 <strong>MT 管理器 / APKEditor 合并</strong>，但签名会变。
      </li>
    </ul>
    <p>
      记住那条最容易踩的坑——<strong>缺架构分片必闪退，混版本必失败</strong>
      。把这几点记牢，Split APK 从「看不懂的一堆文件」变成「三步装好」。急着要某个应用？在{" "}
      <Link href="/">gptoapk.com</Link> 按包名直接下载匹配的安装包更省事。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Split APK 能一个一个单独安装吗？",
    answer:
      "不能。Split APK 由 base.apk 加若干 split 分片组成，系统必须在一次安装事务里把所有分片一起拼装，缺任何一块都会失败。请用 SAI 选择整个文件夹安装，或用 adb install-multiple 一次性提交所有文件。",
  },
  {
    question: "安装 Split APK 时提示「应用未安装」怎么办？",
    answer:
      "先检查分片是否齐全（尤其架构分片）、版本是否一致、签名是否冲突。常见原因是只装了 base 漏了 split，或手机里已存在签名不同的同包名应用。彻底卸载旧版（含分身/工作资料）后，用 SAI 把整套分片一起装。",
  },
  {
    question: "怎么知道我该用哪个架构的分片？",
    answer:
      "看手机的 CPU 架构（ABI）。设置 → 关于手机 → 处理器信息，或用 CPU-Z、AIDA64 查看。2020 年后的手机绝大多数是 arm64-v8a，对应 split_config.arm64_v8a.apk。装错架构会直接报 INSTALL_FAILED_NO_MATCHING_ABIS 或启动闪退。",
  },
  {
    question: "Split APK 和普通 APK 有什么区别？",
    answer:
      "普通 APK 把所有架构、语言、密度的资源打成一个包，体积大但安装简单。Split APK 按设备实际需要拆分资源，下载更小、安装更省空间，但安装时必须把 base 和所有相关 split 一起提交，不能单点某个文件安装。",
  },
  {
    question: "合并 Split APK 成单文件后应用打不开？",
    answer:
      "合并过程会重新签名，触发应用自带的签名校验。能安装成功不代表能运行，部分游戏和金融类应用会因签名不符拒绝启动，属于正常现象。若只是自用或测试，直接用 SAI 安装原始分片更可靠。",
  },
];

export const zhPosts20261016: BlogPostEntry[] = [
  {
    slug: "google-play-ti-qu-apk-fang-fa",
    title: "Google Play 提取 APK 方法：把已安装应用导出成安装包的完整教程",
    description:
      "Google Play 装完不留 APK？本文讲清现代安卓 App Bundle 的拆分机制，给出免 Root（MT 管理器等工具）、ADB 命令行、Root 三种提取已安装应用 APK 的完整方法，并教你如何把分片整理成可独立安装的安装包。",
    date: "2026-10-16",
    readTime: "9 分钟阅读",
    tags: ["APK 提取", "Google Play", "Split APK", "安卓教程", "APK 备份"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "split-apk-an-zhuang-zhi-nan",
    title: "Split APK 安装指南：一条命令搞定分片包，告别「应用未安装」",
    description:
      "下载的应用是一堆 base.apk 加 split_config 分片，单独点任何一个都装不上？本文讲透 Split APK 的机制与分片含义，用 SAI、adb install-multiple、合并单 APK 三种方法教你从零装成功，附报错对照表与排查顺序。",
    date: "2026-10-16",
    readTime: "9 分钟阅读",
    tags: ["Split APK", "安装指南", "SAI", "ADB", "安卓教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261016List = toList(zhPosts20261016);
