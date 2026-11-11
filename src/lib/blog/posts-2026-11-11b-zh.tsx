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
    <p>
      手机下载了 APK，想在电脑上看、存档或者用安卓模拟器安装，结果卡在「怎么传过去」这一步。五种方式，按场景选最快的那种。
    </p>

    <h2>为什么这个需求突然变多了</h2>
    <p>在过去，给电脑装软件用 <code>.exe</code>，给手机装应用直接在应用商店点安装，两边几乎不产生交集。但现在情况变了：</p>
    <ul>
      <li>
        <strong>应用存档</strong>：很多应用在商店里悄悄下架、更新或换版本，用户想把特定版本的 APK 留一份在电脑上
      </li>
      <li>
        <strong>备用机不常开机</strong>：手机版应用只在备用机上登录过，想把安装包挪到主力机
      </li>
      <li>
        <strong>电脑模拟器</strong>：想在 MuMu、BlueStacks 里跑同一个应用，模拟器只认 APK 文件，不认手机
      </li>
      <li>
        <strong>公司内网分发</strong>：运维写文档、给同事发安装包，一份 APK 文件比一个应用商店链接更直接
      </li>
    </ul>
    <p>
      不同场景对传输方式的要求完全不同：偶尔传一次，微信发给自己就够；每周都要传几十个包，就得用 ADB 脚本。
    </p>

    <h2>先搞清楚：你要传的是「安装包」还是「应用数据」</h2>
    <p>这是最容易混淆的一点，很多教程没讲清楚。</p>
    <p>
      <strong>APK 文件只包含代码和资源</strong>，不包含账号、设置、聊天记录、游戏进度。这些数据在手机里位于{" "}
      <code>/data/data/&lt;包名&gt;/</code>，只有 root 或者系统级备份权限才能读。
    </p>
    <p>
      所以你传完 APK 在电脑上装好，登录状态、聊天记录、游戏等级
      <strong>都不会跟过去</strong>。需要迁移数据的话，要用应用自带的备份/恢复功能，或者 <code>adb backup</code>
      （对 Android 12 以上的应用基本失效），或者 root 后直接复制目录。
    </p>
    <p>明白这一点，就不会出现「传过去装了但登录不进去，以为文件传坏了」的情况。</p>

    <h2>方式一：USB 数据线 + 文件管理器</h2>
    <p>最原始也最可靠的方式，同时是最不需要网络条件的方式。</p>
    <p>
      <strong>具体步骤：</strong>
    </p>
    <ol>
      <li>用数据线连接手机和电脑</li>
      <li>手机通知栏下拉，点击「正在通过 USB 充电」这个通知</li>
      <li>选择「文件传输 / MTP」（不要选「仅充电」）</li>
      <li>Windows 打开「此电脑」，手机会作为一个设备出现；macOS 需要安装 OpenMTP 或 Android File Transfer</li>
      <li>找到 APK 所在的目录，复制到电脑</li>
    </ol>
    <p>APK 常见位置：</p>
    <pre>
      <code>{`/storage/emulated/0/Download/
/storage/emulated/0/Android/data/<包名>/
/storage/emulated/0/tencent/MicroMsg/Download/`}</code>
    </pre>
    <p>
      <strong>优点</strong>：不依赖网络、速度快（USB 3.0 能到 100MB/s 以上）、文件完整性最有保障。
    </p>
    <p>
      <strong>缺点</strong>：需要线、macOS 上 MTP 支持一般、部分国产 ROM 的 MTP 只能读不能写。
    </p>
    <p>
      <strong>坑</strong>：Windows 上如果手机显示不出来，多半是 MTP 驱动没装好，或者线是「只能充电」的劣质线。换一根原装线试试，比装驱动快。
    </p>

    <h2>方式二：ADB pull（程序员最爱）</h2>
    <p>如果电脑上已经有 Android SDK，一条命令解决，还能批量处理。</p>
    <pre>
      <code>{`# 确认设备已连接
adb devices

# 拉取单个文件
adb pull /storage/emulated/0/Download/wechat.apk ./wechat.apk

# 批量拉取目录下所有 APK
adb shell ls /storage/emulated/0/Download/*.apk | xargs -I {} adb pull {} ./apk-backup/`}</code>
    </pre>
    <p>
      <strong>优点</strong>：可脚本化、可批量、速度稳定、不依赖 MTP 的图形界面。
    </p>
    <p>
      <strong>缺点</strong>：需要装 ADB、需要开启 USB 调试（设置 → 关于手机 → 连点版本号 7 次 → 开发者选项 → USB 调试）。
    </p>
    <p>
      <strong>坑</strong>：Android 11 之后，<code>/Android/data/</code> 目录通过 ADB pull 也会权限受限，需要改用{" "}
      <code>adb shell</code> 配合 <code>run-as</code> 或者应用自身导出功能。系统分区里的 APK（
      <code>/system/app/</code>）没有 root 也读不出来。
    </p>

    <h2>方式三：无线传输（LocalSend / 局域网）</h2>
    <p>不想插线，两台设备又在同一个 Wi-Fi 下，这是 2026 年最舒服的方案。</p>
    <p>
      <strong>LocalSend</strong> 是开源跨平台工具，手机和电脑各装一份，同一局域网内自动发现，点一下就能传文件，不经过任何服务器，速度取决于 Wi-Fi 带宽。
    </p>
    <p>在 5GHz Wi-Fi 下实测能到 30-60MB/s，一个 80MB 的 APK 大概 2-3 秒传完。</p>
    <p>
      <strong>优点</strong>：不用线、不用账号、不经过云、跨平台。
    </p>
    <p>
      <strong>缺点</strong>：要求同一局域网；公司/校园网络如果开了 AP 隔离会互相发现不了。
    </p>
    <p>
      <strong>替代方案</strong>：<code>python3 -m http.server 8000</code> 在电脑上开一个临时服务器，手机浏览器访问电脑 IP
      下载，反向也行。这个土办法在跨系统、跨网络时最通用。
    </p>

    <h2>方式四：云盘中转</h2>
    <p>微信文件传输助手、QQ、百度网盘、Google Drive、iCloud 都行。</p>
    <p>
      <strong>优点</strong>：随时可用、跨网络、有历史记录。
    </p>
    <p>
      <strong>缺点</strong>：微信对 APK 文件有拦截（可能被识别为「不安全文件」不让直接存）、网盘有上传下载时限速、隐私数据经过第三方服务器。
    </p>
    <p>
      <strong>如果坚持用微信</strong>：把 <code>.apk</code> 后缀改成 <code>.apk1</code> 或加个{" "}
      <code>.zip</code> 后缀再发，电脑端收到后改回来。这只是绕过文件名检测，不是加密，敏感文件别用这个办法。
    </p>

    <h2>方式五：直接电脑上下（绕开手机）</h2>
    <p>
      很多时候大家绕远路了。如果目标是「电脑上要有一个 APK 文件」，而手机上的那个 APK 本身也是从网上下载的，那直接在电脑上从{" "}
      <Link href="/">gptoapk.com</Link> 下载同一个应用的同一个版本，比传文件更干净。
    </p>
    <p>
      在 gptoapk.com 输入应用的 Google Play 链接或包名，选择版本，直接下载到电脑。省掉了「手机下载 → 传电脑」中间环节，也避免了传输过程中可能出现的文件损坏。
    </p>

    <h2>五种方式对比表</h2>
    <table>
      <thead>
        <tr>
          <th>方式</th>
          <th>速度</th>
          <th>是否需要网络</th>
          <th>是否需要线</th>
          <th>适合场景</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>USB 数据线</td>
          <td>最快（100MB/s+）</td>
          <td>否</td>
          <td>是</td>
          <td>大文件、批量、最可靠</td>
        </tr>
        <tr>
          <td>ADB pull</td>
          <td>快</td>
          <td>否</td>
          <td>是</td>
          <td>批量、可脚本化</td>
        </tr>
        <tr>
          <td>LocalSend 局域网</td>
          <td>中（30-60MB/s）</td>
          <td>是（局域网）</td>
          <td>否</td>
          <td>偶尔传、不想插线</td>
        </tr>
        <tr>
          <td>云盘中转</td>
          <td>慢（受限于上行）</td>
          <td>是（公网）</td>
          <td>否</td>
          <td>跨网络、不方便同时在线</td>
        </tr>
        <tr>
          <td>电脑直接下载</td>
          <td>取决于宽带</td>
          <td>是</td>
          <td>否</td>
          <td>目标是存档某个版本</td>
        </tr>
      </tbody>
    </table>

    <h2>传输后必须做的一步：校验完整性</h2>
    <p>不管用哪种方式传过来，装之前花 10 秒钟确认文件没坏：</p>
    <pre>
      <code>{`# macOS / Linux
shasum -a 256 wechat.apk

# Windows PowerShell
Get-FileHash wechat.apk -Algorithm SHA256`}</code>
    </pre>
    <p>
      如果知道源文件的 SHA256 值（部分下载站会提供），对比一下就行。不知道的话，至少确认文件大小和源站显示的一致——差几 KB
      也说明传输中断了。
    </p>
    <p>传坏的 APK 安装时通常报「解析包时出现问题」，很多人以为是应用本身的问题，其实是传输环节丢包。</p>

    <h2>常见问题</h2>
    <p>
      <strong>Q：传过去能直接双击安装吗？</strong>
    </p>
    <p>
      电脑上双击 APK 是打不开的，除非装了安卓模拟器（MuMu、BlueStacks、Windows Subsystem for Android）或者用 Android Studio
      的 AVD。APK 不是 Windows 的可执行文件。
    </p>
    <p>
      <strong>Q：苹果电脑也能这么传吗？</strong>
    </p>
    <p>
      需要 OpenMTP 或 Android File Transfer 这两个应用来挂载 MTP。ADB 方式 macOS 上完全一样，反而比 MTP 更好用，推荐。
    </p>
    <p>
      <strong>Q：传过去的 APK 装到电脑后，手机上的应用会被影响吗？</strong>
    </p>
    <p>
      不会。APK 只是一个文件，复制文件不影响源设备。但注意：同一账号在两台设备上同时登录某些应用（比如微信）会导致其中一端被踢下线。
    </p>
    <p>
      <strong>Q：为什么我从手机导出的 APK 比商店显示的小很多？</strong>
    </p>
    <p>
      多半是导出的只有 base APK，跳过了配置分包（split APK，常见的 <code>config.arm64_v8a.apk</code>、
      <code>config.zh.apk</code>）。完整安装需要主包 + 对应分包的集合，单独一个 base 包装上去可能闪退或者功能缺失。这类应用要在
      gptoapk.com 下载完整包，而不是从手机导出。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "手机上的APK怎么传到电脑最简单？",
    answer:
      "如果只是偶尔传一次，用 USB 数据线选 MTP 文件传输模式最可靠，速度也是最快的。不想插线就用 LocalSend 这类局域网工具，同一 Wi-Fi 下点一下就能传。如果电脑上本来就要这个 APK，直接在 gptoapk.com 上下载同一个版本更省事。",
  },
  {
    question: "传过去的APK能在电脑上直接安装吗？",
    answer:
      "不能直接双击安装。APK 是安卓安装包，Windows 和 macOS 都无法原生执行。需要安装安卓模拟器（MuMu、BlueStacks、Windows Subsystem for Android）或者用 Android Studio 的虚拟机才能安装运行。",
  },
  {
    question: "为什么APK传到电脑后安装提示解析包出错？",
    answer:
      "通常是传输过程中文件损坏或不完整。先对比文件大小是否和源站一致，用 shasum -a 256（macOS）或 Get-FileHash（Windows）算哈希对比。云盘中转和微信传输最容易出现截断，USB 直连最有保障。",
  },
  {
    question: "从手机导出的APK比商店里的小很多是怎么回事？",
    answer:
      "一般是因为只导出了 base APK，漏掉了配置分包（config.arm64_v8a.apk、config.zh.apk 等）。这类分包应用需要主包加对应分包一起安装才能正常使用，单独装 base 会闪退或缺少功能。这类应用建议直接从 gptoapk.com 下载完整包。",
  },
  {
    question: "传输APK会丢失应用数据吗？",
    answer:
      "APK 文件本身不包含任何应用数据，账号、聊天记录、游戏进度都在设备本地的 /data/data/ 目录下，不会跟着 APK 走。所以传到新设备装好后需要重新登录。要迁移数据得用应用自带的备份恢复功能，或者 root 后手动复制数据目录。",
  },
];

const ARTICLE2 = (
  <>
    <p>
      下载的 APK 是不是原厂包？签名一验就知道。这篇讲清楚 Android 签名的原理、三种校验方式，以及为什么「签名不一样」通常是最大的危险信号。
    </p>

    <h2>签名在 Android 里到底是什么</h2>
    <p>
      Android 要求每个 APK 都必须签名才能安装。签名的作用不是加密文件，而是
      <strong>证明这个安装包确实由持有对应私钥的人发布</strong>。
    </p>
    <p>
      签名过程可以对整个 APK 做哈希，用私钥对哈希值签名，把签名结果打进 APK 的 <code>META-INF/</code>{" "}
      目录。安装时系统用公钥验证签名和内容是否匹配，不匹配就不让装。
    </p>
    <p>
      关键点在于：<strong>Android 不验证证书是不是「官方」的，只验证签名和内容是否一致</strong>。所以：
    </p>
    <ul>
      <li>官方包：签名证书由开发者自己生成（App Store 上架的通常由 Google Play App Signing 托管）</li>
      <li>被改过的包：改包的人必须用<strong>自己的私钥</strong>重新签名，因为原始私钥只有开发者有</li>
      <li>结果：<strong>包名一样，但签名证书的指纹完全不同</strong></li>
    </ul>
    <p>这就是为什么「两个同名应用的签名对不上」几乎可以直接判定为其中之一被改过。</p>

    <h2>三种签名版本，别搞混</h2>
    <p>Android 的签名方案演进过三代，现在还在混用：</p>
    <table>
      <thead>
        <tr>
          <th>方案</th>
          <th>引入版本</th>
          <th>校验范围</th>
          <th>代表</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>v1 (JAR Signing)</td>
          <td>Android 1.0</td>
          <td>每个文件单独校验</td>
          <td>老 APK</td>
        </tr>
        <tr>
          <td>v2 (APK Signature Scheme v2)</td>
          <td>Android 7.0</td>
          <td>整个 APK 分块哈希</td>
          <td>主流</td>
        </tr>
        <tr>
          <td>v3</td>
          <td>Android 9</td>
          <td>增加密钥轮换支持</td>
          <td>新版</td>
        </tr>
        <tr>
          <td>v4</td>
          <td>Android 11</td>
          <td>增量安装支持</td>
          <td>极少</td>
        </tr>
      </tbody>
    </table>
    <p>
      现代应用通常同时签 v1 + v2（兼容老系统）+ v3。校验时优先看 v2/v3，因为它覆盖整个文件包括 ZIP
      目录结构，比 v1 更难绕过。
    </p>
    <p>
      <strong>v1 有个历史漏洞</strong>：v1 只校验 ZIP 条目内容，不校验目录。攻击者可以在已签名的 APK 里
      <strong>追加</strong>新的文件（比如一个恶意 dex），v1 签名依然有效。这就是为什么只签 v1
      的老应用风险更高。v2 修复了这个问题——它对整个文件做哈希，追加任何字节都会导致校验失败。
    </p>

    <h2>校验方式一：apksigner（最权威）</h2>
    <p>Android SDK 自带，Google 官方推荐，输出最清晰。</p>
    <pre>
      <code>{`# 查看签名信息（含证书指纹）
apksigner verify --print-certs app.apk`}</code>
    </pre>
    <p>输出类似：</p>
    <pre>
      <code>{`Signer #1 certificate DN: CN=WeChat, O=Tencent, C=CN
Signer #1 certificate SHA-256 digest: 8a0c5d8f...e3b7
Signer #1 certificate SHA-1 digest: 1a2b3c4d...
Signer #1 certificate MD5 digest: 3f2e1d0c...
Signer #1 key algorithm: RSA
Signer #1 key size (bits): 2048`}</code>
    </pre>
    <p>
      重点看 <code>SHA-256 digest</code>。这个值就是应用的「身份指纹」，社区里流传的官方包指纹表都是拿这个值对比。
    </p>
    <p>如果还想知道签名用的哪个方案：</p>
    <pre>
      <code>{`apksigner verify -v app.apk`}</code>
    </pre>
    <p>会列出 v1/v2/v3 各自的校验结果，全部 pass 才正常。</p>

    <h2>校验方式二：keytool（无需 SDK）</h2>
    <p>电脑上有 JDK 就能用，适合快速看证书信息：</p>
    <pre>
      <code>{`keytool -printcert -jarfile app.apk`}</code>
    </pre>
    <p>
      这条命令读的是 v1 签名（<code>META-INF/*.RSA</code>），<strong>只签了 v2/v3 的应用会报错「未签名」</strong>
      ，这时候必须用 apksigner。
    </p>
    <p>所以：老应用用 keytool 快，新应用用 apksigner 准。</p>

    <h2>校验方式三：手机上直接看</h2>
    <p>
      不想折腾电脑，装个 <strong>App Manager</strong>（开源）或 <strong>APK Analyzer</strong>
      这类应用，导入 APK 后直接显示签名证书、指纹、使用的签名方案，还能对比两个 APK 的签名是否一致。
    </p>
    <p>这个方法适合「临时验证一下」，不适合批量。</p>

    <h2>判断标准：怎么算「签名没问题」</h2>
    <p>拿到指纹后怎么判断？分三种情况：</p>
    <p>
      <strong>1. 和官方公布的指纹一致</strong> → 放心装。
    </p>
    <p>
      Google Play 上架的应用，如果开发者启用了 Play App Signing，官方实际签名指纹在 Play Console
      里能看到。微信、支付宝、抖音这类大厂应用，指纹在开发者文档或应用官网上通常能查到。
    </p>
    <p>
      <strong>2. 和手机上已装版本的指纹一致</strong> → 版本来源相同，可以覆盖安装。
    </p>
    <p>这是最实用的判断方式：</p>
    <pre>
      <code>{`# 手机上已安装应用的签名
adb shell pm list packages -f | grep com.example.app
adb shell pm path com.example.app
adb pull /data/app/.../base.apk /tmp/installed.apk
apksigner verify --print-certs /tmp/installed.apk`}</code>
    </pre>
    <p>
      两个指纹一致 = 同一个发布者，可以直接更新；不一致 = 改了签名的版本，系统会报{" "}
      <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>，装上去只能先卸载原版（数据全丢）。
    </p>
    <p>
      <strong>3. 拿不到官方指纹，也没有已知版本</strong> → 至少确认签名方案合理：
    </p>
    <ul>
      <li>v2 或 v3 至少有一个存在</li>
      <li>证书域名（DN）看起来像正经开发者</li>
      <li>证书有效期没过去太久（很多官方证书签了 25-30 年）</li>
    </ul>

    <h2>签名对不上意味着什么</h2>
    <p>出现「签名不一致」只有三种可能，没有第四种：</p>
    <p>
      <strong>A. 正常情况：应用换了签名密钥</strong>
    </p>
    <p>
      开发者在迁移签名方案（比如从自有密钥切到 Play App Signing）。这种情况 Google
      会单独处理，普通用户下载到的包签名会跟老版本不同——但这只发生在官方渠道。
    </p>
    <p>
      <strong>B. 改包：第三方重打包</strong>
    </p>
    <p>
      有人解包、改了代码（塞广告、注入 SDK、改权限），然后用自己的证书重签。这是危害最大的一类，也是「去广告版」「破解版」的典型特征。
    </p>
    <p>
      <strong>C. 山寨：完全不同的应用</strong>
    </p>
    <p>包名碰巧一样，实际是完全不同的应用。这种往往来自不良下载站。</p>
    <p>
      后两种，指纹一定和官方不同。<strong>所以签名校验是判断「这个包能不能信」最直接、最便宜的手段</strong>。
    </p>

    <h2>签名校验的边界：它能证明什么，不能证明什么</h2>
    <p>
      <strong>能证明的：</strong>
    </p>
    <ul>
      <li>这个 APK 的内容没被第三方篡改过（v2/v3 签名）</li>
      <li>它由持有对应私钥的人签名</li>
    </ul>
    <p>
      <strong>不能证明的：</strong>
    </p>
    <ul>
      <li>包里没有恶意代码（官方开发者自己放广告 SDK 也算合法签名）</li>
      <li>签名证书的私钥没泄露（证书被偷的情况真实存在）</li>
      <li>这是最新版本</li>
    </ul>
    <p>
      所以签名校验是<strong>必要条件不是充分条件</strong>。它排除的是「被人塞了东西」这一类风险，不排除「本身就有问题」。
    </p>
    <p>配合下面几项一起看更全面：</p>
    <pre>
      <code>{`# 看申请的权限（有没有异常的短信/通讯录权限）
aapt dump permissions app.apk

# 看签名后是否被二次修改（v2 校验通过表示没有）
apksigner verify app.apk

# 看包名和版本号是否和官方一致
aapt dump badging app.apk | head -5`}</code>
    </pre>

    <h2>从不可信来源下载时的完整校验流程</h2>
    <p>
      如果你的 APK 来自第三方站点（比如从 <Link href="/">gptoapk.com</Link>{" "}
      这类从 Google Play 直接提取的服务，或者别的镜像站），建议按这个顺序走一遍，五分钟能完成：
    </p>
    <ol>
      <li>
        <strong>下载完整</strong>：确认文件大小和源站一致，<code>shasum -a 256</code> 对比（如果有提供）
      </li>
      <li>
        <strong>验签名</strong>：<code>apksigner verify --print-certs</code>，确认 v2/v3 通过
      </li>
      <li>
        <strong>看证书</strong>：SHA-256 指纹和官方/已知版本对比
      </li>
      <li>
        <strong>看权限</strong>：有没有明显不合理的权限（计算器要读短信这类）
      </li>
      <li>
        <strong>看包名版本</strong>：<code>aapt dump badging</code> 确认包名、versionCode 符合预期
      </li>
    </ol>
    <p>
      gptoapk.com 的包直接从 Google Play 服务器拉取原始 APK，签名和 Play
      上架版本一致，前三步基本不用额外担心；但养成校验习惯，比信任任何单一来源都可靠。
    </p>

    <h2>常见问题</h2>
    <p>
      <strong>Q：只是更新应用，还需要验签名吗？</strong>
    </p>
    <p>
      需要。更新时系统会自动比对签名，不一致会直接拒绝安装。如果你从第三方下了一个包结果「应用未安装」，很可能就是签名对不上——用{" "}
      <code>apksigner</code> 一看就明白。
    </p>
    <p>
      <strong>Q：签名校验通过就一定能放心安装吗？</strong>
    </p>
    <p>
      不够。签名只能说明内容没被第三方改过。签名证书本身是开发者自己控制的，开发者打包了坏东西签名一样有效。还要看权限、看来源、看应用口碑。
    </p>
    <p>
      <strong>Q：为什么同一个应用，我在两个网站下载的 APK 签名不一样？</strong>
    </p>
    <p>
      至少一个是改过包的。去官方渠道或者从 Google Play 直接提取的渠道（比如
      gptoapk.com）重新下一份，验一下指纹就清楚了。
    </p>
    <p>
      <strong>Q：用 keytool 报「JAR 未签名」，是不是文件坏了？</strong>
    </p>
    <p>
      大概率不是。新版应用只签了 v2/v3，keytool 读不了 v2 签名，会报这个错。改用{" "}
      <code>apksigner verify --print-certs app.apk</code> 即可。
    </p>
    <p>
      <strong>Q：能自己改签名吗？</strong>
    </p>
    <p>
      技术上可以（解包 → 改内容 → 重签），但改签名的应用无法从应用商店更新，依赖 Google
      登录/支付/微信授权的功能大概率失效，还可能被应用自身的完整性校验判定为篡改直接闪退。除了自己开发的测试包，不建议。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "怎么验证APK有没有被修改过？",
    answer:
      "用 apksigner verify --print-certs app.apk 查看签名证书的 SHA-256 指纹，和官方公布的或者手机上已装版本的指纹对比。一致说明是同一个人签的包，不一致就说明这个包被重新签过名，基本可以判定被改过。",
  },
  {
    question: "apksigner 和 keytool 有什么区别？",
    answer:
      "apksigner 是 Android SDK 自带的官方工具，能校验 v1/v2/v3 全部签名方案，判断最准确。keytool 是 JDK 自带工具，只能读 v1 的 JAR 签名，对只签了 v2/v3 的新版应用会报未签名错误。验证现代 APK 一律用 apksigner。",
  },
  {
    question: "签名不一致的应用能装吗？",
    answer:
      "如果手机上已经装了正式版，签名不一致的包会安装失败并报 INSTALL_FAILED_UPDATE_INCOMPATIBLE。要装只能先卸载原版，但卸载会清除所有应用数据。除非确定是正规的签名迁移，否则签名不一致就是改包的明确信号，不建议安装。",
  },
  {
    question: "只签了 v1 的APK为什么风险更高？",
    answer:
      "v1 签名只校验 ZIP 内每个文件的内容，不校验目录结构，攻击者可以向已签名的 APK 里追加新文件而签名依然有效。v2 签名对整个文件做哈希，追加任何字节都会校验失败。所以只签 v1 的老应用更容易被植入额外代码。",
  },
  {
    question: "签名校验能保证APK安全吗？",
    answer:
      "不能完全保证。签名只能证明文件内容没有被第三方修改，但签名证书是开发者自己控制的，开发者本身也可以在包里打包广告 SDK 或恶意代码。签名校验是必要条件而非充分条件，还要配合检查权限、来源可信度和应用口碑。",
  },
];

const ARTICLE3 = (
  <>
    <p>
      应用装上了，点开就退，连个错误提示都没有——这是安卓上最让人抓狂的故障之一。闪退不是玄学，日志里有确切原因，这篇教你怎么把它挖出来。
    </p>

    <h2>先分清三种「打不开」</h2>
    <p>用户口中的「闪退」其实包含三种不同的故障，处理方式完全不同：</p>
    <table>
      <thead>
        <tr>
          <th>现象</th>
          <th>典型表现</th>
          <th>原因方向</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>启动崩溃</td>
          <td>点击图标，白屏或黑屏一下直接回桌面</td>
          <td>代码异常、缺少依赖、ABI 不匹配</td>
        </tr>
        <tr>
          <td>闪退后重试仍崩</td>
          <td>每次启动都在同一位置崩</td>
          <td>确定性的代码缺陷或环境缺失</td>
        </tr>
        <tr>
          <td>随机崩溃</td>
          <td>用一会儿才崩，位置不固定</td>
          <td>内存、并发、系统资源</td>
        </tr>
        <tr>
          <td>无法启动（非崩溃）</td>
          <td>提示「应用已停止」或直接无响应</td>
          <td>系统级拒绝、签名/权限问题</td>
        </tr>
      </tbody>
    </table>
    <p>第一种和第二种通常能通过日志精确定位；第三种最难，往往要复现几十次。</p>

    <h2>第一步：把真正的错误捞出来</h2>
    <p>
      界面上那句「应用屡次停止运行」没有任何信息量。真正的堆栈在 <code>logcat</code> 里。
    </p>

    <h3>方法 A：ADB（最可靠）</h3>
    <pre>
      <code>{`# 清空日志缓冲，然后手动点开应用触发崩溃
adb logcat -c
adb logcat`}</code>
    </pre>
    <p>
      崩溃发生时，日志里会出现一段以 <code>AndroidRuntime</code> 开头的异常堆栈：
    </p>
    <pre>
      <code>{`FATAL EXCEPTION: main
Process: com.example.app, PID: 12345
java.lang.NoClassDefFoundError: Failed resolution of: Lcom/google/android/gms/common/GoogleApiAvailability;
    at com.example.app.MainActivity.onCreate(MainActivity.kt:42)
    at android.app.Activity.performCreate(Activity.java:8051)
Caused by: java.lang.ClassNotFoundException: Didn't find class "com.google.android.gms.common.GoogleApiAvailability"`}</code>
    </pre>
    <p>
      这段信息量巨大：<code>NoClassDefFoundError</code> + <code>GoogleApiAvailability</code> 说明这是{" "}
      <strong>Google Play 服务（GMS）缺失导致的崩溃</strong>——在华为、部分国产 ROM 或者刷了无 GMS 系统的设备上极常见。
    </p>
    <p>只抓崩溃相关的日志更清爽：</p>
    <pre>
      <code>{`adb logcat -c
adb logcat *:E | grep -A 30 "FATAL EXCEPTION"`}</code>
    </pre>

    <h3>方法 B：手机上的日志应用</h3>
    <p>
      没有电脑就装 <strong>Logcat Reader</strong> 或 <strong>SysLog</strong>（需要 Shizuku 或 root
      权限），崩溃后打开应用找到 <code>AndroidRuntime</code> 那一行，效果和 ADB 一样。
    </p>

    <h3>方法 C：系统开发者选项</h3>
    <p>设置 → 开发者选项 → 开启「应用崩溃时显示详细错误」，部分 ROM 会直接弹出一个带堆栈的对话框。</p>

    <h2>第二步：按异常类型对号入座</h2>
    <p>拿到堆栈后，看异常类名就能判断方向。下面是实测中最常见的七种。</p>

    <h3>1. NoClassDefFoundError / ClassNotFoundException</h3>
    <p>
      <strong>含义</strong>：运行时找不到某个类。
      <br />
      <strong>最常见原因</strong>：应用依赖 Google Play 服务，但设备上没有 GMS。
    </p>
    <pre>
      <code>{`java.lang.NoClassDefFoundError: com/google/android/gms/...`}</code>
    </pre>
    <p>
      <strong>判断</strong>：华为/荣耀新机（无 GMS）、国行 ROM、部分模拟器。
      <br />
      <strong>处理</strong>：这类应用在没有 GMS 的设备上基本跑不起来，除非它有专门的「无 Google
      服务版本」。解决方法只有装 GMS（华为设备可用 Gspace、Gbox 等方案）或者换设备。
    </p>

    <h3>2. UnsatisfiedLinkError</h3>
    <p>
      <strong>含义</strong>：找不到 native 库（.so 文件）。
    </p>
    <pre>
      <code>{`java.lang.UnsatisfiedLinkError: dlopen failed: library "libfoo.so" not found`}</code>
    </pre>
    <p>
      <strong>原因</strong>：APK 里只包含了其他架构的 .so 文件。比如应用只有 <code>arm64-v8a</code> 的库，却装在{" "}
      <code>armeabi-v7a</code> 的老设备上；或者反过来，模拟器（x86_64）装了一个只有 ARM 库的包。
    </p>
    <p>
      <strong>判断</strong>：
    </p>
    <pre>
      <code>{`unzip -l app.apk | grep "lib/"`}</code>
    </pre>
    <p>看输出里有哪些 <code>lib/&lt;架构&gt;/</code> 目录。</p>
    <p>
      <strong>处理</strong>：下载匹配设备架构的版本。真机基本只看 <code>arm64-v8a</code>，模拟器要{" "}
      <code>x86_64</code>，老设备可能要 <code>armeabi-v7a</code>。这就是 split APK 存在的意义——针对不同架构分发。
    </p>

    <h3>3. OutOfMemoryError</h3>
    <p>
      <strong>含义</strong>：内存不足。
    </p>
    <pre>
      <code>{`java.lang.OutOfMemoryError: Failed to allocate a 104857612 byte allocation`}</code>
    </pre>
    <p>
      <strong>原因</strong>：应用本身内存泄漏；或者设备可用内存太小（多见于 2GB/3GB 内存的老机器跑新应用）。
      <br />
      <strong>处理</strong>：关闭后台应用后重试；如果稳定复现，就是应用自身的问题，只能等更新或换设备。加大虚拟机堆（Dalvik
      heap）需要 root 改 prop，不推荐。
    </p>

    <h3>4. SecurityException / 权限被拒</h3>
    <p>
      <strong>含义</strong>：应用请求了没有授予的权限。
    </p>
    <pre>
      <code>{`java.lang.SecurityException: Permission Denial: reading ... requires android.permission.READ_EXTERNAL_STORAGE`}</code>
    </pre>
    <p>
      <strong>原因</strong>：开发者没有正确处理权限拒绝的情况（老应用在 Android 13/14 上很常见，因为存储权限模型改成了分媒体类型）。
      <br />
      <strong>处理</strong>：手动去设置里把权限全部授予，能绕过去就用；绕不过去说明应用没适配新版 Android。
    </p>

    <h3>5. Resources$NotFoundException</h3>
    <p>
      <strong>含义</strong>：找不到资源文件。
    </p>
    <pre>
      <code>{`android.content.res.Resources$NotFoundException: Resource ID #0x7f0b0042`}</code>
    </pre>
    <p>
      <strong>原因</strong>：<strong>split APK 只装了 base 没装配置分包</strong>，或者手工修改过资源。这是从第三方站点下载「分包应用」装成单包时的高频故障。
      <br />
      <strong>处理</strong>：用 gptoapk.com 下载完整安装包，或者用 SAI（Split APKs Installer）把 base + config 一起装。
    </p>

    <h3>6. 启动就崩，堆栈指向 Unable to instantiate application</h3>
    <pre>
      <code>{`Caused by: java.lang.RuntimeException: Unable to instantiate application`}</code>
    </pre>
    <p>
      <strong>含义</strong>：Application 类初始化失败。
      <br />
      <strong>原因</strong>
      ：通常是这个包被二次修改过（去广告、去检测），Application 的初始化逻辑被改坏了，或者签名校验失败后主动抛异常。
      <br />
      <strong>处理</strong>：别修了，换官方包。
    </p>

    <h3>7. 完全没有堆栈，日志里一闪而过</h3>
    <p>
      <strong>含义</strong>：native 层崩溃（C/C++ 代码段错误）。
      <br />
      <strong>判断</strong>：logcat 里找 <code>DEBUG</code> 或 <code>libc</code> 标签，会看到{" "}
      <code>signal 11 (SIGSEGV)</code> 这类信息。
    </p>
    <pre>
      <code>{`adb logcat | grep -E "DEBUG|libc|Fatal signal"`}</code>
    </pre>
    <p>
      <strong>原因</strong>：应用的 native 代码和设备的 CPU 指令集、Android 版本不兼容；或者被修改过的包破坏了 native
      层。
      <br />
      <strong>处理</strong>：换官方版本；如果是自研应用，需要拿 tombstone 文件做符号化分析。
    </p>

    <h2>第三步：先排除「包本身有问题」</h2>
    <p>在看代码之前，先确认你装的这个包是不是干净的。顺序很重要，因为大部分第三方 APK 的闪退都源于包装错了。</p>
    <p>
      <strong>1. 校验签名</strong>（排除被改包）
    </p>
    <pre>
      <code>{`apksigner verify --print-certs app.apk`}</code>
    </pre>
    <p>
      看 <code>Signer #1 certificate SHA-256 digest</code> 是否和官方一致。签名对不上说明不是原厂包，闪退很可能就是改包导致的。
    </p>
    <p>
      <strong>2. 检查架构匹配</strong>
    </p>
    <pre>
      <code>{`# 设备架构
adb shell getprop ro.product.cpu.abi

# 包内架构
unzip -l app.apk | grep "lib/"`}</code>
    </pre>
    <p>两者对不上就是 UnsatisfiedLinkError 的来源。</p>
    <p>
      <strong>3. 检查是否缺分包</strong>
    </p>
    <pre>
      <code>{`unzip -l app.apk | grep -E "base.apk|config\\."`}</code>
    </pre>
    <p>
      如果这是一个 <code>.apks</code> 或 <code>.xapk</code> 包，说明它是分包格式，必须用 SAI
      完整安装，单独解压装 base 会崩。
    </p>
    <p>
      <strong>4. 检查 Android 版本兼容性</strong>
    </p>
    <pre>
      <code>{`aapt dump badging app.apk | grep -E "minSdkVersion|targetSdkVersion"`}</code>
    </pre>
    <p>
      <code>minSdkVersion</code> 高于设备版本就直接装不上；<code>targetSdkVersion</code> 太低（比如低于
      23）在新系统上会触发大量兼容性限制，权限一律默认拒绝。
    </p>

    <h2>第四步：还不能解决，就把它变成「能用」</h2>
    <p>有些闪退根本不属于「故障」，而是应用没有适配你的环境。这时候有两个方向：</p>
    <p>
      <strong>方向一：修环境</strong>
      <br />
      如果应用本身在别的设备/版本上能用，问题就是环境不匹配。换架构、换版本、补 GMS，比调试代码快得多。
    </p>
    <p>
      <strong>方向二：换用替代版本</strong>
      <br />
      同一个应用往往有多个发布渠道——Play 版、厂商定制版、国际版、lite
      版。华为设备上华为应用市场里的版本通常做了无 GMS 适配；海外应用的国际版可能反而更省心。从{" "}
      <Link href="/">gptoapk.com</Link> 这类从 Play 直接取包的服务下，拿到的是官方原版，但要注意它仍然依赖 GMS。
    </p>

    <h2>给开发者的补充：怎么让用户少崩</h2>
    <p>如果你是应用的开发者，闪退排查本质上是在补用户体验的坑：</p>
    <ul>
      <li>
        <strong>不要假设 GMS 存在</strong>：启动时用 <code>GoogleApiAvailability.isGooglePlayServicesAvailable()</code>{" "}
        检测，缺失时降级而不是崩
      </li>
      <li>
        <strong>权限请求要有拒绝分支</strong>：不要 <code>checkPermission</code> 失败就抛异常
      </li>
      <li>
        <strong>为所有 ABI 打 native 库</strong>：至少 arm64-v8a + armeabi-v7a，模拟器用户加 x86_64
      </li>
      <li>
        <strong>targetSdkVersion 跟上</strong>：每代 Android 的权限模型都在收紧，拖太久就是成堆的 SecurityException
      </li>
      <li>
        <strong>崩溃上报接入</strong>：Firebase Crashlytics 之类的服务能让你在用户投诉之前就看到堆栈
      </li>
    </ul>

    <h2>常见问题</h2>
    <p>
      <strong>Q：所有应用都闪退，是手机坏了吗？</strong>
    </p>
    <p>
      不是。如果连系统应用都闪，通常是系统存储满了或者系统更新残留问题。清理存储、重启、必要时恢复出厂设置。单个应用闪属于应用层面问题。
    </p>
    <p>
      <strong>Q：从应用商店下载的也闪退，还是包的问题吗？</strong>
    </p>
    <p>
      不是。商店包签名是官方的，闪退基本就是应用和环境不匹配（GMS、架构、版本）或者应用自身缺陷，直接报给开发者或等更新。
    </p>
    <p>
      <strong>Q：怎么判断是应用问题还是系统问题？</strong>
    </p>
    <p>用同版本应用在另一台设备上试。另一台正常 = 你这台设备的环境问题；另一台也崩 = 应用自身缺陷。</p>
    <p>
      <strong>Q：闪退前没有任何提示，能找回数据吗？</strong>
    </p>
    <p>
      应用崩溃一般不损坏数据，数据在 <code>/data/data/&lt;包名&gt;/</code>
      。但如果崩溃是因为数据损坏或者存储故障，就需要 root 后手动备份数据目录。
    </p>
    <p>
      <strong>Q：装上了但一直闪退，能只卸载不丢数据吗？</strong>
    </p>
    <p>
      可以试 <code>adb install -r</code> 覆盖安装不删数据；但如果是签名不一致导致的，系统会拒绝，只能卸载重装，数据会丢。所以装之前一定要验签名。
    </p>
  </>
);

const FAQS3: BlogFaqItem[] = [
  {
    question: "APK装好后一打开就闪退，怎么查原因？",
    answer:
      "用 adb logcat 抓崩溃日志。先 adb logcat -c 清空缓冲，再点开应用触发崩溃，然后在日志里找 AndroidRuntime 开头的 FATAL EXCEPTION 段落。里面的异常类名基本就能定位原因，比如 NoClassDefFoundError 指向 GMS 缺失，UnsatisfiedLinkError 指向架构不匹配。",
  },
  {
    question: "闪退日志里出现NoClassDefFoundError是什么原因？",
    answer:
      "最常见的原因是应用依赖 Google Play 服务（GMS），但设备上没有安装。华为新机、部分国行 ROM、没有 GMS 的模拟器都会出现。这类应用没有专门的适配版本就无法运行，需要安装 GMS 或者换设备。",
  },
  {
    question: "为什么APK装上后提示应用已停止但没有错误信息？",
    answer:
      "界面上的提示没有信息量，真正的原因在系统日志里。可以用 ADB 抓 logcat，或者在手机上装 Logcat Reader、SysLog 这类应用（需要 Shizuku 或 root），崩溃后查看 AndroidRuntime 的堆栈。部分 ROM 在开发者选项里能开启崩溃时显示详细错误。",
  },
  {
    question: "UnsatisfiedLinkError怎么解决？",
    answer:
      "说明 APK 里的 native 库和设备架构不匹配。先用 adb shell getprop ro.product.cpu.abi 查设备架构，再用 unzip -l app.apk | grep lib/ 查包内包含哪些架构。真机基本是 arm64-v8a，模拟器要 x86_64，老设备可能用 armeabi-v7a，下载匹配的版本即可。",
  },
  {
    question: "从第三方下载的APK老是闪退，和包有关系吗？",
    answer:
      "有很大关系。第三方包常见问题有三个：签名被改过（去广告版、破解版）、缺少 split 配置分包、架构不匹配。先用 apksigner verify --print-certs 验签名是否和官方一致，再用 unzip 检查包内是否有对应架构的 lib 目录和 config 分包，能排除大部分原因。",
  },
];

export const zhPosts20261111B = [
  {
    slug: "android-apk-file-transfer-to-pc",
    title: "手机APK怎么传到电脑？2026五种传输方式实测对比",
    description:
      "USB数据线、ADB pull、LocalSend局域网、云盘中转、电脑直接下载——五种把APK从安卓传到电脑的方式，按速度、依赖条件和适用场景对比，并说明为什么导出的APK常常缺少配置分包。",
    date: "2026-11-11",
    readTime: "11 min read",
    tags: ["android", "apk", "tips"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-signature-verification-guide",
    title: "安卓APK签名校验详解：一眼判断安装包有没有被改过",
    description:
      "用 apksigner 或 keytool 读取 APK 签名证书的 SHA-256 指纹，和官方或已装版本对比，就能判断这个包是否被第三方重新签名。讲清 v1/v2/v3 签名方案的差别、校验流程，以及签名校验能证明什么、不能证明什么。",
    date: "2026-11-11",
    readTime: "11 min read",
    tags: ["android", "apk", "security"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
  {
    slug: "android-apk-launch-crash-logcat-fix",
    title: "APK安装后闪退怎么办？从日志定位到根治的完整流程",
    description:
      "装上就闪退、连提示都没有？用 adb logcat 抓 FATAL EXCEPTION，按异常类型对号入座——NoClassDefFoundError、UnsatisfiedLinkError、OutOfMemoryError 各自意味着什么，先排除签名、架构、分包问题再谈调试。",
    date: "2026-11-11",
    readTime: "12 min read",
    tags: ["android", "apk", "troubleshoot"],
    content: ARTICLE3,
    faqs: FAQS3,
  },
];

export const zhPosts20261111BList = toList(zhPosts20261111B);
