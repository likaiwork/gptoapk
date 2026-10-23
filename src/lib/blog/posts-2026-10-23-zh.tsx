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

const FAQS1: BlogFaqItem[] = [
  {
    question: "第三方应用商店里哪个最安全？",
    answer:
      "安全的不是商店，而是来源和签名。最稳的做法是用 APKMirror、APKPure 这类网页镜像站下载单个 APK，再用签名指纹和官方包比对，而不是长期装一个第三方商店 App。如果一定要装客户端，Aurora Store（开源、匿名访问 Play、无广告）比各类「XX 应用市场」干净得多。",
  },
  {
    question: "装第三方商店会不会影响手机安全？",
    answer:
      "商店本身也是 App，也要权限，也存在后台常驻和推广。你给它的「安装未知应用」权限是长期的，一旦这个商店被投毒或被收购后变更策略，风险会持续存在。所以建议：能不装就不装，装完用完就撤销安装权限，优先用手机自带商店管理国内 App。",
  },
  {
    question: "为什么 APKMirror 下载的应用常常需要选架构？",
    answer:
      "因为同一个应用会针对不同 CPU 架构打包不同的安装文件，比如 arm64-v8a 和 armeabi-v7a。下载正确的架构版本既省流量也少了出错的机会。近几年出的手机基本都是 arm64-v8a。选错了通常表现为安装成功但一打开就闪退。",
  },
  {
    question: "从第三方商店装的 App 能自动更新吗？",
    answer:
      "多数情况下不能稳定更新。Android 只允许签名一致的包覆盖安装，如果第三方商店给的包和官方签名不同，或者你后来换回官方渠道下载，就会提示「应用未安装」。想让更新稳定，就一直从同一个来源装新版本。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "vivo 手机提示「禁止安装未知来源应用」怎么解决？",
    answer:
      "这个权限是按来源 App 逐个授权的，不是全局开关。打开设置 → 应用与权限 → 权限管理 → 安装未知应用，找到你下载 APK 的那个 App（是浏览器就选浏览器，是微信就选微信），把开关打开。最常见的错误是去给「文件管理」授权，但安装请求其实是浏览器或微信发起的。",
  },
  {
    question: "i管家拦截了安装，提示「该应用未经安全检测」怎么办？",
    answer:
      "在拦截弹窗出现时点「仍要安装」或「继续安装」，而不是取消。如果弹窗没有这个选项，进入 i管家 → 应用管理 → 应用安全检测，把安装拦截改成仅提示。不建议长期关闭这项检测，装完确认没问题后再打开比较稳妥。",
  },
  {
    question: "vivo 提示「安装包解析错误」是什么原因？",
    answer:
      "基本是文件本身的问题，跟手机无关。常见三种：下载没完成（文件大小明显不对）、文件其实是 .xapk 或 .apks 这类打包格式、下载的是拆分包的单个 base 文件。先用文件管理器看文件大小，再确认扩展名，最后重新完整下载一次。",
  },
  {
    question: "提示「应用未安装」但是没有更多信息，怎么判断？",
    answer:
      "最常见是签名冲突（手机上已有同包名但签名不同的版本，比如官方版和修改版）或者 CPU 架构不匹配。先用电脑跑 adb install -r 看具体错误码：INSTALL_FAILED_UPDATE_INCOMPATIBLE 是签名问题，需要先卸载旧版；INSTALL_FAILED_NO_MATCHING_ABIS 是架构问题，需要换对应的包。",
  },
];

const ARTICLE1 = (
  <>
    <p>
      Google Play 打不开、某个 App 在国区搜不到、想装一个旧版本——这些时候你就需要第三方应用商店。但「第三方商店」是个大坑：有些是正经的
      APK 镜像站（APKMirror、APKPure），有些是带推广和捆绑的国内厂商商店，还有些干脆就是纯广告壳子。
    </p>
    <p>
      这篇不列二十个名字让你自己挑，而是<strong>按用途分类</strong>告诉你该用哪一类，以及怎么判断一个商店值不值得装。
    </p>
    <blockquote>
      <p>
        核心结论：优先用「网页版镜像站 + 系统安装器」，能不装商店就不装。商店本身也是 App，也是权限和广告的来源。
      </p>
    </blockquote>

    <h2>一、先搞清楚你要解决什么问题</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">你的需求</th>
            <th className="py-2 pr-4">推荐方案</th>
            <th className="py-2">不建议装的</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">Play 打不开，想手动装</td>
            <td className="py-2 pr-4">APKMirror / APKPure 网页版</td>
            <td className="py-2">各种「一键安装器」</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">某个 App 国区没有</td>
            <td className="py-2 pr-4">镜像站 + 官方直链</td>
            <td className="py-2">各类「海外应用商店」</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">想装旧版本 / 降级</td>
            <td className="py-2 pr-4">APKMirror（历史版本最全）</td>
            <td className="py-2">主流商店（只给最新版）</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">批量管理、更新已装 App</td>
            <td className="py-2 pr-4">Aurora Store / Obtainium</td>
            <td className="py-2">带推广的国产第三方商店</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">国内 App 图省事</td>
            <td className="py-2 pr-4">手机厂商自带商店</td>
            <td className="py-2">来路不明的「应用市场」</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>二、第一类：网页镜像站（最推荐）</h2>
    <p>
      这是最安全的一类，因为<strong>你不需要安装「商店」这个 App</strong>，只是下载一个 APK 文件。风险面从「多装一个有权限的
      App」降到「多下载一个文件」，而后者可以用校验和签名来验证。
    </p>
    <h3>APKMirror</h3>
    <ul>
      <li>历史版本最全，几乎每个版本都有</li>
      <li>上传需人工审核，重打包风险相对最低</li>
      <li>下载前有等待几秒的页面</li>
      <li>支持按架构和屏幕密度筛选，这是它最大的技术优势</li>
    </ul>
    <h3>APKPure</h3>
    <ul>
      <li>界面友好、下载快，支持一键更新已装 App</li>
      <li>部分版本提供的是 .xapk 格式，需要专门的安装器</li>
      <li>历史上出现过被植入恶意代码的版本，建议只用网页版</li>
    </ul>
    <p>
      <strong>使用建议</strong>：手机浏览器直接打开网页，选好架构和版本下载，然后用系统安装器装。想验证安全性，可以再去看 APK
      签名校验的方法。
    </p>

    <h2>三、第二类：开源客户端（极客向，但最干净）</h2>
    <h3>Aurora Store</h3>
    <p>
      匿名访问 Google Play 的开源客户端，不需要 Google 账号，也不需要 GMS 框架。界面就是 Play Store 的样子，可以下载和更新
      App。
    </p>
    <ul>
      <li>优点：无广告、无推广、匿名下载、支持设备伪装</li>
      <li>缺点：依赖 Play 服务端接口，Google 改接口时会短暂失效</li>
    </ul>
    <h3>Obtainium</h3>
    <p>
      不是传统商店，而是「从 App 自己的发布页拿更新」——GitHub Releases、F-Droid、官网直链。你给它一个来源 URL，它帮你盯更新。
    </p>
    <ul>
      <li>优点：来源永远是最上游，安全性最高</li>
      <li>缺点：只适用于开源或提供公开下载渠道的 App</li>
    </ul>
    <p>这两个都推荐从 F-Droid 或 GitHub Releases 安装，别从别处下载它们的 APK。</p>

    <h2>四、第三类：手机厂商自带商店</h2>
    <p>国内环境下，小米、华为、OPPO、vivo 的应用商店其实是最省事的：</p>
    <ul>
      <li>国内 App 覆盖最全，更新及时</li>
      <li>有安全扫描，恶意包概率低</li>
      <li>不需要任何额外安装</li>
    </ul>
    <p>
      <strong>但要注意两点</strong>：这些商店里没有海外 App，别指望用它下 Google 全家桶；部分厂商商店会推送自家生态的 App
      和广告，可以在设置里关掉推荐。
    </p>

    <h2>五、怎么判断一个第三方商店能不能信</h2>
    <p>如果你想装一个不在这几类里的商店，用这五个问题筛一遍：</p>
    <ol>
      <li>
        <strong>有没有官网和公司信息？</strong>打开「关于」页面，看有没有真实主体。纯壳站通常没有。
      </li>
      <li>
        <strong>它要求哪些权限？</strong>存储权限（下载）和安装未知应用权限（安装）是合理的。但如果它还要通讯录、短信、
        位置、无障碍服务，直接卸载——无障碍服务尤其危险，等于把手机操作权交出去。
      </li>
      <li>
        <strong>它的 APK 从哪儿来？</strong>靠谱的商店会标明文件来源和签名信息。
      </li>
      <li>
        <strong>下载的文件能不能验证？</strong>好的镜像站会显示文件大小、SHA-256 或签名指纹。
      </li>
      <li>
        <strong>安装时会不会中途弹别的安装？</strong>捆绑安装是最典型的流氓特征。
      </li>
    </ol>

    <h2>六、一个更省事的整体思路</h2>
    <ol>
      <li>
        <strong>首选</strong>：Google Play（能连上就用）
      </li>
      <li>
        <strong>次选</strong>：APKMirror 网页版 + 自己核对签名
      </li>
      <li>
        <strong>国内 App</strong>：手机自带商店
      </li>
      <li>
        <strong>开源 App</strong>：Obtainium 盯 GitHub 更新
      </li>
      <li>
        <strong>实在要装商店</strong>：Aurora Store
      </li>
    </ol>
    <p>
      这套流程的特点是<strong>尽量不增加常驻的第三方 App</strong>。每多装一个商店，就多一个后台进程、多一份权限、多一个被投毒的机会。
    </p>

    <h2>七、几个常见误区</h2>
    <p>
      <strong>「装机必备的 XX 应用市场」</strong>——多数是推广联盟的产品，里面塞满捆绑包。手机自带商店已经够用。
    </p>
    <p>
      <strong>「谷歌安装器一键搞定」</strong>——这类工具会往系统里写 GMS 框架，来源不明的版本可能导致持续弹窗、耗电甚至无法开机。
    </p>
    <p>
      <strong>「商店评分高就安全」</strong>——商店自身的评分可以刷。看的是它的代码来源和权限，不是评分。
    </p>
    <p>
      <strong>「装了商店就等于自动更新」</strong>——第三方商店的自动更新经常失效，签名一致才能覆盖安装。
    </p>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      直接对接 Google Play 官方源，下载的安装包签名与官方一致，不需要额外装任何商店客户端。
    </p>

    <h2>总结</h2>
    <p>
      2026 年第三方应用商店的合理用法是：<strong>能网页下载就不要装客户端，能官方渠道就不要用第三方</strong>。APKMirror
      管历史版本，Aurora Store 管匿名下载，手机自带商店管国内 App，Obtainium 管开源更新——这四样组合起来，基本覆盖所有场景。
    </p>
    <p>真正需要警惕的不是「没用对商店」，而是「随手装了一个来路不明的商店，然后把安装未知应用的权限永久交给了它」。</p>
  </>
);

const ARTICLE2 = (
  <>
    <p>
      vivo 手机（含 iQOO）装 APK 失败，是所有安卓品牌里提示最「啰嗦」但又最容易被误读的：一会儿说「应用来源未知」，一会儿说「已被安全策略拦截」，一会儿又说「安装包解析异常」。很多人的做法是把提示关掉一个再试，结果换个提示继续失败。
    </p>
    <p>
      这篇按 vivo 的实际拦截逻辑来拆：<strong>先看懂它在拦什么，再对症下药</strong>。OriginOS / Funtouch OS 两条线都适用。
    </p>
    <blockquote>
      <p>
        核心结论：vivo 的失败 80% 集中在三处——安装未知应用权限、应用安全检查（i管家）、以及 APK 本身与设备架构不匹配。按顺序排查，别跳步。
      </p>
    </blockquote>

    <h2>一、先分清是「被拦」还是「装不上」</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">提示语</th>
            <th className="py-2 pr-4">性质</th>
            <th className="py-2">排查方向</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">禁止安装未知来源应用</td>
            <td className="py-2 pr-4">权限拦截</td>
            <td className="py-2">来源权限设置</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">该应用未经安全检测</td>
            <td className="py-2 pr-4">安全扫描拦截</td>
            <td className="py-2">i管家 / 安全检测</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">根据相关政策暂不支持安装</td>
            <td className="py-2 pr-4">策略拦截</td>
            <td className="py-2">纯净模式、未成年人保护</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">安装包解析错误</td>
            <td className="py-2 pr-4">文件问题</td>
            <td className="py-2">APK 损坏、下载不完整</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">应用未安装 / 签名不一致</td>
            <td className="py-2 pr-4">冲突</td>
            <td className="py-2">签名、版本降级</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">您的设备不兼容此应用</td>
            <td className="py-2 pr-4">兼容性</td>
            <td className="py-2">CPU 架构、minSdk</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      <strong>被拦</strong>（前三条）：手机主动阻止，改设置就能过。<strong>装不上</strong>
      （后三条）：文件或环境有问题，改设置没用，得换包或改包。
    </p>

    <h2>二、第一层：安装未知应用权限</h2>
    <p>Android 8.0 之后，这个权限不是全局开关，而是<strong>按来源 App 逐个授权</strong>。</p>
    <p>
      <strong>路径：</strong>
    </p>
    <ol>
      <li>设置 → 应用与权限 → 权限管理</li>
      <li>找「安装未知应用」</li>
      <li>列表里找到你<strong>下载 APK 的那个 App</strong>——浏览器、微信、QQ、文件管理器、下载器</li>
      <li>打开它的开关</li>
    </ol>
    <p>
      <strong>最常见的坑</strong>：你从微信里收到 APK，点开安装被拦，于是去给「文件管理」授权——没用。
      <strong>要授权的是微信</strong>，因为安装请求是微信发起的。同理，用 Chrome 下载就要给 Chrome 授权。
    </p>
    <p>如果不确定是哪个 App 发起的，看拦截弹窗上写的应用名，那就是要授权的对象。</p>

    <h2>三、第二层：i管家 / 应用安全检测</h2>
    <p>vivo 的 i管家会扫描待安装的 APK，判定「未检测」或「有风险」时直接拦下。这是很多人卡住的地方。</p>
    <ol>
      <li>打开 i管家</li>
      <li>进入应用管理 → 应用安全检测（不同版本叫法略有差异）</li>
      <li>找「安装检测」「安装拦截」相关开关，选择「仅提示」或关闭强制拦截</li>
      <li>部分版本需要在弹窗出现时点「仍要安装」，而不是「取消」</li>
    </ol>
    <p>不建议长期关闭这项检测。如果你只是装一次自己确认过的包，装完再打开比较稳妥。</p>

    <h2>四、第三层：纯净模式与安装策略</h2>
    <p>OriginOS 有「纯净模式」，开启时会拒绝所有非应用商店来源的安装。</p>
    <p>
      <strong>路径</strong>：设置 → 安全 → 纯净模式 → 关闭（需要验证锁屏密码）
    </p>
    <p>另外两种少见但真实存在的拦截：</p>
    <ul>
      <li>
        <strong>儿童模式 / 未成年人保护</strong>：开启时禁止安装新应用
      </li>
      <li>
        <strong>企业 / 学校管控（MDM）</strong>：设备被管理端策略限制，需要联系管理员
      </li>
    </ul>

    <h2>五、如果是「解析错误」：文件本身的问题</h2>
    <h3>1. 文件是不是没下完</h3>
    <p>看文件大小。浏览器下载中断过的 APK 往往只有几百 KB 或者大小明显不对。重新下载，对比网页标注的大小。</p>
    <h3>2. 是不是 .xapk / .apks / .apkm</h3>
    <p>这些不是标准 APK，是打包格式，系统安装器不认。需要专门的安装器，或者用 SAI（Split APKs Installer）。</p>
    <h3>3. 是不是 split APK 只下了一个</h3>
    <p>
      从 Google Play 提取的应用通常是拆分的（base.apk + config.arm64_v8a.apk + config.xxhdpi.apk）。单独装 base
      有时能装上但闪退，有时直接解析失败。
    </p>
    <h3>4. 架构不匹配</h3>
    <p>
      vivo 近几年的机型基本都是 arm64-v8a。如果你下的是 x86 版（模拟器版）或者只有 armeabi-v7a 的老包，可能报「解析失败」或「应用未安装」。
    </p>

    <h2>六、如果是「应用未安装」：签名与版本冲突</h2>
    <p>
      <strong>签名不一致</strong>——手机上已经装了同一个包名但签名不同的版本（比如官方版 vs 修改版、国内版 vs
      国际版）。Android 不允许覆盖安装。解决：先卸载旧版（注意备份数据），再装新版。
    </p>
    <p>
      <strong>降级安装</strong>——新装的版本号低于已装版本。系统默认不允许。解决：先卸载，或者用{" "}
      <code>adb install -r -d</code> 强制降级。
    </p>
    <p>
      <strong>残留数据冲突</strong>——卸载时数据没清干净。解决：清除数据后再卸载，或者卸载后重启再装。
    </p>

    <h2>七、用 ADB 一次看清真正原因</h2>
    <pre>
      <code>{`adb devices
adb install -r your-app.apk`}</code>
    </pre>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">错误码</th>
            <th className="py-2 pr-4">含义</th>
            <th className="py-2">处理</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">ALREADY_EXISTS</td>
            <td className="py-2 pr-4">已存在同包名应用</td>
            <td className="py-2">加 -r 或先卸载</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">UPDATE_INCOMPATIBLE</td>
            <td className="py-2 pr-4">签名不一致</td>
            <td className="py-2">卸载重装</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">VERSION_DOWNGRADE</td>
            <td className="py-2 pr-4">版本降级</td>
            <td className="py-2">加 -d</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">NO_MATCHING_ABIS</td>
            <td className="py-2 pr-4">架构不匹配</td>
            <td className="py-2">换对应架构的包</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">INSUFFICIENT_STORAGE</td>
            <td className="py-2 pr-4">空间不足</td>
            <td className="py-2">清理存储</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">INVALID_APK</td>
            <td className="py-2 pr-4">APK 损坏</td>
            <td className="py-2">重新下载</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>八、一张按顺序走的排查流程</h2>
    <ol>
      <li>看提示语，判断是「被拦」还是「装不上」</li>
      <li>被拦 → 给发起安装的那个 App 开安装未知应用权限</li>
      <li>还被拦 → 关 i管家的安装拦截 / 关纯净模式</li>
      <li>解析错误 → 检查文件大小、格式、是否完整下载</li>
      <li>应用未安装 → 查签名是否一致、是否降级、是否残留数据</li>
      <li>设备不兼容 → 查 CPU 架构和 minSdk</li>
      <li>全都不确定 → 接 ADB 看错误码，一步定位</li>
    </ol>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      很多「解析错误」其实是下载不完整。{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      提供的安装包带完整 split 配置和校验值，并标注所需安卓版本与 CPU 架构。
    </p>

    <h2>总结</h2>
    <p>
      vivo 的 APK 安装失败看着提示多，其实逻辑很清晰：<strong>权限按来源授权、安全检测可以放行、纯净模式会全禁</strong>
      。真正的技术问题（解析错误、签名冲突、架构不匹配）跟品牌无关，用 ADB 看错误码比猜快十倍。
    </p>
    <p>
      最省事的做法是养成习惯：下载后先核对文件大小和来源，装之前确认手机上有没有同包名应用，遇到「应用未安装」先想签名，不要反复重试。
    </p>
  </>
);

export const zhPosts20261023: BlogPostEntry[] = [
  {
    slug: "third-party-app-store-recommendations",
    title: "第三方应用商店推荐：2026 年还能用的只有这几类，别乱装",
    description:
      "按用途分类说清第三方应用商店怎么选：网页镜像站（APKMirror/APKPure）、开源客户端（Aurora Store/Obtainium）、厂商自带商店各自适用什么场景，附五步判断一个商店值不值得装的清单。",
    date: "2026-10-23",
    readTime: "10 min read",
    tags: ["android", "apk", "应用商店", "下载"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "vivo-apk-install-failed",
    title: "vivo 手机 APK 安装失败：从拦截提示倒推原因的排查表",
    description:
      "vivo / iQOO 装 APK 失败按提示语分三类：权限拦截、安全检测拦截、文件或兼容性问题。逐层给出设置路径、i管家放行方法、纯净模式关闭方式，以及 ADB 错误码对照表。",
    date: "2026-10-23",
    readTime: "11 min read",
    tags: ["android", "apk", "vivo", "安装失败", "排错"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261023List = toList(zhPosts20261023);
