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
      vivo / iQOO（用的是 OriginOS / OriginOS Ocean / Funtouch OS）在装 APK 时报的错，跟其他安卓手机
      <strong>看着像、修法却不太一样</strong>——它有自己的一套"纯净模式""vivo 应用商店管理""i管家安装监控"。很多人在
      vivo 上装 APK 失败，用网上的"通用方案"怎么都解决不了，就是因为<strong>没对症 OriginOS 的专属机制</strong>。这篇按
      "最常见 → 最少见"给你一套 vivo 专属排查清单，跟着走基本都能装好。
    </p>
    <p>
      这篇覆盖 vivo / iQOO 主流机型装 APK 时最常遇到的各类报错，按对症方式逐层处理，帮你用最少的操作、最快的速度搞定。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>vivo 装 APK 失败，十有八九不是 APK 文件坏了，而是<strong>OriginOS 的"未知来源放行"
        "开发者选项安装校验""纯净模式"或"单次安装授权"</strong>这几道关卡没放行。先找到 vivo 具体报的哪个字眼，再按下面的
        顺序处理，比一通乱试强得多。
      </p>
    </blockquote>

    <h2>一、先看 vivo 报的哪种错</h2>
    <p>vivo 的安装报错大致分三类，方向完全不同：</p>
    <ul>
      <li>
        <strong>"安装失败 / 无法安装 / 未安装应用"</strong> → 大多是<strong>签名冲突、空间不足、包损坏</strong>，或
        <strong>与商店里已有应用签名不一致</strong>。
      </li>
      <li>
        <strong>"不允许安装来自此来源的应用"或干脆没反应</strong> → 是<strong>未知来源 / 纯净模式没放行</strong>（vivo
        最常见）。
      </li>
      <li>
        <strong>"已安装应用存在更新冲突""与现有应用签名不一致"</strong> → 是<strong>同款应用重复安装</strong>问题。
      </li>
    </ul>
    <p>先分清是哪一类，再动手，别一上来就"清除数据恢复出厂"。</p>

    <h2>二、第一关：放行 vivo 的"未知来源 + 纯净模式"（最高频）</h2>
    <p>
      vivo 对 APK 安装管得特别严，默认只允许从<strong>vivo 应用商店</strong>和<strong>自带文件管理/浏览器</strong>装。你用
      "任意来源文件管理器、网盘、微信、QQ"打开 APK 时，经常会<strong>点击后毫无反应</strong>或提示来源不允许。
    </p>
    <p><strong>正确的放行方式（OriginOS 通用）：</strong></p>
    <ol>
      <li>
        用 <strong>vivo 自带"文件管理"App</strong> 找到 APK 再点，比用第三方管理器更顺（系统信任它）。
      </li>
      <li>
        若用第三方 App（网盘/浏览器/微信）打开 APK：点开后<strong>按提示进入"设置 → 应用与权限 → 权限管理 → 安装未知应用"</strong>
        ，给<strong>那一个</strong> App（如网盘/浏览器）打开"允许安装未知应用"。
      </li>
      <li>
        安装时会弹出 <strong>"vivo 安装验证"</strong>：会显示"官方验证未通过/非官方渠道应用"。这是纯净模式在提醒你，
        <strong>不是失败</strong>——直接点"仍要安装 / 继续 / 我已了解风险"即可，除非你真想取消。
      </li>
      <li>
        如果<strong>点了没反应</strong>：去 <strong>设置 → 系统与更新（或 安全）→ 纯净模式</strong>，确认纯净模式没有把该
        来源拦死；必要时临时关掉或把该来源加入白名单。
      </li>
    </ol>
    <blockquote>
      <p>小技巧：只给"你要用来装 APK 的那个 App"开"允许安装未知应用"，别一次性全开，更干净也更安全。</p>
    </blockquote>

    <h2>三、第二关：处理"安装失败 / 未安装应用"</h2>
    <p>放行后还是装不上，按下面顺序处理（针对 vivo 也别乱清数据）：</p>
    <ul>
      <li>
        <strong>腾空间</strong>：vivo 装 APK 需先把整包缓存落盘再校验。去 <strong>i管家 → 手机清理</strong>，确认剩余空间
        &gt; 2GB。
      </li>
      <li>
        <strong>关掉"开发者选项"里的安装拦截</strong>：去 <strong>设置 → 更多设置 → 开发者选项</strong>，关掉"不校验应用签名/
        允许模拟位置"这类调试类开关；部分机型还有"安装时校验"选项，若开着且报签名错，关掉重试。
      </li>
      <li>
        <strong>同款应用冲突（最常见于"报更新失败/签名不一致"）</strong>：若手机里已有从 <strong>vivo 应用商店</strong>装的
        同款应用，再装第三方 APK 常因签名不同冲突。解决：<strong>先卸载商店版再装 APK</strong>，或保证 APK 与商店版同源。
        银行、微信、QQ 等装不上时尤其要查这条。
      </li>
      <li>
        <strong>APK 文件损坏</strong>：用网盘/微信"传输助手"收到的 APK 极易被截断。重新从来源<strong>完整下载一次</strong>，
        别把 1KB 的 <code>.bin/.html</code> 改名成 <code>.apk</code>。
      </li>
    </ul>

    <h2>四、第三关：报特定错误码 / 特定报错</h2>
    <ul>
      <li>
        <strong>"解析包时出现问题"</strong>：文件损坏或系统版本太旧。换干净来源重下；或系统太老（Android 版本低于 APK 要求）。
        vivo 老机型系统可能停在旧版，很多新版 App 装不上，<strong>升级 OriginOS/Android 版本</strong>是根治办法。
      </li>
      <li>
        <strong>"应用未安装"(-113/-24 等)</strong>：多为签名残留。去 <strong>设置 → 应用 → 应用管理</strong> 找到同名残留
        卸载；或到 i 管家里清一次"已卸载残留"。个别顽固需<strong>重启手机</strong>再装。
      </li>
      <li>
        <strong>"与设备不兼容/此应用专为旧版"</strong>：属机型和系统适配问题，真装不上就别硬装，用对应适配版。
      </li>
      <li>
        <strong>安装到一半闪退回桌面、没任何提示</strong>：多为<strong>存储瞬时不足或系统组件异常</strong>，先清空间重启，
        再不行<strong>到应用管理里清一次"vivo 服务框架/系统桌面"缓存</strong>（不影响你数据）。
      </li>
    </ul>

    <h2>五、vivo 特有：i 管家 / 应用商店的"自动拦截"说明</h2>
    <p>好多人装 APK 失败其实是 <strong>i 管家和应用商店的"自动扫描"在后台拦截</strong>：</p>
    <ul>
      <li>
        i 管家默认开启"病毒查杀/安装监控"，识别到<strong>来自非官方渠道</strong>或<strong>检测到高风险权限</strong>的 APK
        会直接拦下或建议不装。
      </li>
      <li>
        确认是你的 APK、认为安全：<strong>i 管家 → 病毒查杀 → 在"安全白名单/信任"里把该 APK 或来源加入白名单</strong>，
        再装一次。
      </li>
      <li>
        若是<strong>公司内部 / 自己开发的测试包</strong>：可临时关闭"纯净模式"和"安装监控"（装完记得开回来），并建议用{" "}
        <code>adb install</code> 走系统级安装，绕开商店层拦截更稳。
      </li>
    </ul>

    <h2>小结：vivo 排查顺序表</h2>
    <table>
      <thead>
        <tr>
          <th>现象</th>
          <th>优先怀疑</th>
          <th>vivo 专属操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>点 APK 没反应/不允许来源</td>
          <td>未知来源 + 纯净模式</td>
          <td>给"该来源"开允许安装 + 放行纯净模式</td>
        </tr>
        <tr>
          <td>提示非官方/验证弹窗</td>
          <td>纯净模式提醒</td>
          <td>点"仍要安装/继续"即可</td>
        </tr>
        <tr>
          <td>安装失败/未安装应用</td>
          <td>签名冲突 / 空间</td>
          <td>卸载商店版冲突应用 + 清空间</td>
        </tr>
        <tr>
          <td>解析包时出现问题</td>
          <td>文件损坏</td>
          <td>重新完整下载 / 升级系统</td>
        </tr>
        <tr>
          <td>同款升级装不上</td>
          <td>签名不一致</td>
          <td>先卸商店版再装 APK</td>
        </tr>
        <tr>
          <td>adb 都装不上</td>
          <td>安装监控拦</td>
          <td>白名单 + 关纯净模式重装</td>
        </tr>
      </tbody>
    </table>
    <p>
      一句话收尾：<strong>vivo 装 APK 失败，八成卡在"放行"而非"文件坏"——先放行未知来源和纯净模式，再查签名冲突，最后才怀疑
      文件本身。</strong>按表走一遍，绝大多数 vivo / iQOO 的 APK 装不上都能在几分钟内解决。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      说到"应用迁移"，很多人只会想到<strong>品牌换机助手</strong>（小米换机、手机克隆那套）——把整机数据一键搬过去。但现实里
      有一大批人需要的其实是<strong>"单拎一个/几个 APK 应用搬家"</strong>：厂商是 A、新机是 B，用不了自家克隆；或者旧机的
      游戏/工具<strong>只在海外 Google Play 有</strong>，换到国内没 Google 服务的新机根本下不回来。这篇给你一套
      <strong>不依赖品牌工具</strong>的 APK 应用迁移方案，跨品牌、跨地区、跨安卓版本都能用，比"整机换机"轻量得多、可控得多。
    </p>
    <p>
      这篇按"文件 vs 数据 → 跨品牌 → 跨地区 → 跨版本"的顺序，把各种"搬 APK 应用"的场景讲透。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>所谓 "APK 应用迁移"，本质就三件事——<strong>①把 APK 文件本身弄出来（导出），②把应用的
        登录/数据带过去（数据迁移），③在新机装好并放行（安装）</strong>。品牌换机助手只是把这三步帮你全自动化了；当你跨品牌、
        跨地区、或只想搬个别 App 时，手动走这三步反而更干净。
      </p>
    </blockquote>

    <h2>一、先想清：你要搬的是"APK 文件"还是"应用数据"？</h2>
    <p>这是最容易搞混的一步，决定方案完全不同：</p>
    <ul>
      <li>
        <strong>只要 App 本体</strong>（比如这个工具国内下不到）：你只需<strong>导出 APK 文件</strong>，装到新机即可，登录
        重来一次无所谓。<strong>最简单。</strong>
      </li>
      <li>
        <strong>还要登录态、聊天记录、游戏进度</strong>：那就得连<strong>应用数据</strong>一起搬，方案复杂好几倍。
      </li>
      <li>
        <strong>两者都要且应用很多</strong>：那才值得用完整备份/换机方案（见文末"何时才用整机克隆"）。
      </li>
    </ul>
    <p>先想清楚，别为"一个能重新下载的 App"去搬一堆数据白费功夫。</p>

    <h2>二、跨品牌迁移：不靠厂商助手，用最通用的"导出 APK + 导入安装"</h2>
    <p>品牌换机助手通常<strong>只支持同品牌或少数合作品牌</strong>。要跨任意品牌（小米→三星、OPPO→vivo……），最通用的是：</p>
    <p><strong>导出 APK（从旧机/或直接找安装包来源）：</strong></p>
    <ul>
      <li>
        <strong>从已装应用导出</strong>（手机上有、但商店下不到了）：用能"备份 APK"的工具，把应用导出为 <code>.apk</code>{" "}
        文件（很多"应用备份/提取 APK"类工具可做，但注意选正规的）。
      </li>
      <li>
        <strong>或从你当初的下载来源重新拿</strong>：gptoapk.com 这类正规源直接下载对应 APK，永远比翻旧文件省事。
      </li>
    </ul>
    <p><strong>导入新机安装：</strong></p>
    <ul>
      <li>
        用<strong>新机自带文件管理</strong>打开 APK，按提示放行"安装未知来源"即可（各品牌路径不同，通用都是"设置 → 应用/安全
        → 允许安装未知应用"）。
      </li>
      <li>跨品牌装好后<strong>登录数据通常要重登</strong>——除非你做了第三步的数据迁移。</li>
    </ul>

    <h2>三、连数据一起搬：跨品牌也能保留登录/进度</h2>
    <p>
      如果你要的 App 是<strong>第三方登录体系</strong>（微信、QQ、Google 账号那种），<strong>在新机重登一次往往就是最干净的
      做法</strong>——数据本来就在云端，迁来迁去反而容易出问题。真正的难点是<strong>不走云、纯本地的数据</strong>（单机游戏
      进度、某些离线工具配置）：
    </p>
    <ul>
      <li>
        <strong>游戏进度</strong>：多数能云同步（先在新机登录同一账号同步回来），不能云同步的，看该游戏是否支持本地存档导出。
      </li>
      <li>
        <strong>聊天/本地数据</strong>：优先考虑 App 自带导出，或 App 内部"备份到本地"。
      </li>
      <li>
        <strong>系统级方法（进阶）</strong>：旧机开"USB 调试"，用 <code>adb backup</code>（旧安卓）或某些 root/免 root 工具
        打包应用数据目录，再在新机恢复。这条路<strong>对没有 root、没开放的部分应用不适用</strong>，只建议能折腾的用户。
      </li>
    </ul>
    <blockquote>
      <p>
        <strong>判断标准：</strong>凡是能用账号云同步的 App，就别手动迁数据——重登一遍最省事也最不容易丢。手动迁数据只留给
        "纯本地、无云"的那几个。
      </p>
    </blockquote>

    <h2>四、跨地区迁移：把"海外 Play 才有"的 App 搬进国内机</h2>
    <p>很多 App 只在<strong>海外 Google Play</strong> 上架，国内应用商店没有。想搬到手里的中国机型/没 GMS 的新机上：</p>
    <ol>
      <li>
        <strong>拿到正版 APK</strong>：从可信来源获取（开发者官网、或信誉良好的正规下载站如 gptoapk，别用来路不明的"破解镜像"
        ——这类往往带篡改）。
      </li>
      <li>
        <strong>确认签名/完整性</strong>：安装前看一眼大小、包名，必要时比对官方 hash。
      </li>
      <li>
        <strong>安装到无 GMS 的国产机</strong>：国产系统可能不给权限，走"未知来源放行"即可；但<strong>部分依赖 Google 服务的
        App 需要手机有 GMS/Play 服务</strong>才能正常运行——这类 App 装上了也会闪退，属于"设备层面不支持"，不是你能靠迁移解决的。
      </li>
    </ol>

    <h2>五、跨版本：把"新系统装不了"的旧 APK 用对方法</h2>
    <p>老应用在新安卓上常报"版本不兼容/解析错误"。真要迁移旧 APK：</p>
    <ul>
      <li><strong>优先找该应用的兼容更新版或适配国内版的正式版本</strong>，而不是硬扛老版本。</li>
      <li>
        个别要靠旧版功能的，可在<strong>开发者选项</strong>里开启"允许降级安装/安装旧版本"（能顶一时）。
      </li>
      <li>
        实在不行用<strong>应用共存/旧系统容器</strong>类工具，但这只在极少数折腾场景值得，普通用户不建议。
      </li>
    </ul>

    <h2>何时才值得用"整机换机助手"</h2>
    <p>
      如果你<strong>几乎所有应用 + 数据都要搬</strong>，且新旧机<strong>同品牌或都支持</strong>某克隆工具——用品牌换机助手/
      Google 备份最省心，别手动一个个搬。手动 APK 迁移的适用场景是：<strong>只搬少数几个 App、跨品牌、或要搬海外才有而商店
      下不到的 App</strong>。
    </p>

    <h2>小结：一张"怎么搬"决策表</h2>
    <table>
      <thead>
        <tr>
          <th>你的情况</th>
          <th>推荐做法</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>只要 App 本体，登录可重登</td>
          <td>导/下载 APK → 新机放行安装</td>
        </tr>
        <tr>
          <td>第三方登录 App（微信/游戏等）</td>
          <td>新机重登一次最干净（云端同步）</td>
        </tr>
        <tr>
          <td>纯本地且无云的数据</td>
          <td>App 自带备份 / 进阶 adb 备份</td>
        </tr>
        <tr>
          <td>搬海外 Play 才有的 App</td>
          <td>可信源拿 APK + 确认需不需 GMS</td>
        </tr>
        <tr>
          <td>几乎所有应用都要搬</td>
          <td>用品牌换机助手 / Google 备份</td>
        </tr>
      </tbody>
    </table>
    <p>
      一句话收尾：<strong>APK 应用迁移的核心不是"工具"，而是"想清楚搬文件还是搬数据"——能云同步的重登一次，纯本地的才手动
      处理，跨品牌/跨地区就用通用的"导出 APK + 放行安装"三步，比死磕品牌换机助手高效得多。</strong>
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "vivo 手机点 APK 没反应、装不了，最常见原因是什么？",
    answer:
      "九成是未知来源或纯净模式没放行。用 vivo 自带'文件管理'打开 APK，若用第三方 App 则到'设置 → 应用与权限 → 安装未知应用'里给那一个 App 放行；出现'非官方渠道'验证弹窗点'仍要安装'即可。放行后再装通常就好了。",
  },
  {
    question: "vivo 装第三方 APK 时报'与现有应用签名不一致'怎么解决？",
    answer:
      "多半是手机里已装了从 vive 应用商店下载的同款应用，与你要装的第三方 APK 签名不同。先卸载商店版再装你的 APK，或保证 APK 与商店版同源。银行、微信、QQ 等应用装不上时尤其要查这条。",
  },
  {
    question: "vivo 提示'解析包时出现问题'怎么办？",
    answer:
      "通常是 APK 文件损坏，或系统版本低于应用要求。重新从可信来源完整下载一次；若 vivo 机型系统太旧，升级 OriginOS/Android 版本是根治办法，很多新版 App 在旧系统上装不上。",
  },
  {
    question: "不开 i 管家会更容易装 APK 吗？",
    answer:
      "不要把 i 管家常关——那是 vivo 的安全防线。更稳妥的做法是：确认是自己信任的 APK 后，在 i 管家的病毒查杀里把该文件或来源加入白名单，再安装。自己开发/公司内部测试包可临时关闭纯净模式和安装监控，装完记得开回来，或用 adb install 绕开。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "我要搬的 App 只是换个品牌手机，需要备份数据吗？",
    answer:
      "先看 App 是不是第三方账号登录（微信、QQ、Google 等）。是的话新机重登一次最干净，因为数据在云端；只有'纯本地、无云'的数据（如单机游戏进度、离线工具配置）才需要手动迁移，可用 App 自带备份或进阶的 adb 备份。",
  },
  {
    question: "跨品牌手机能直接用厂商换机助手吗？",
    answer:
      "通常不能。厂商换机助手（小米换机、手机克隆等）大多只支持同品牌或少数合作品牌。跨任意品牌建议用通用的'导出 APK + 新机放行安装'三步，或用支持第三方应用的通用换机工具。",
  },
  {
    question: "海外 Google Play 才有的 App 怎么装到国内没 GMS 的手机上？",
    answer:
      "先从开发者官网或可信下载站拿到正版 APK，确认签名/大小后走未知来源安装。但注意：部分依赖 Google 服务的 App 需要手机有 GMS/Play 服务才能运行，否则装上了也会闪退，这不是迁移能解决的。有些 App 有国内版，用国内版往往更合适。",
  },
  {
    question: "旧系统手机装新版 APK 提示版本不兼容怎么办？",
    answer:
      "现代 APK 有最低安卓版本要求，系统太旧就装不上。优先找该应用的旧兼容版本，或升级手机系统；个别需要旧版功能的可临时开启开发者选项里的'允许安装旧版本'，但最省心的是用适配当前系统的版本。",
  },
];

export const zhPosts20260903: BlogPostEntry[] = [
  {
    slug: "vivo-phone-apk-install-failed-troubleshoot",
    title: "vivo / iQOO 手机 APK 安装失败？2026 针对 OriginOS 的完整排查指南",
    description:
      "vivo / iQOO 装 APK 失败或没反应，别按通用教程乱试——OriginOS 有自己的纯净模式、安装监控和签名校验机制。这份 vivo 专属排查清单带你放行未知来源、处理'签名不一致'、解析错误和 i 管家拦截，几分钟就能装好。",
    date: "2026-09-03",
    readTime: "7 min read",
    tags: ["vivo", "iQOO", "OriginOS", "apk", "安装失败", "安卓", "故障解决"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-app-migration-cross-brand-region",
    title: "Android APK 应用迁移全攻略：跨品牌、跨地区、跨版本搬应用就这么做",
    description:
      "不是每个换机场景都适合厂商换机助手。想跨品牌、跨地区搬一两个'商店下不到'的应用，或只想搬数据而不整机克隆？这篇给你不依赖品牌工具的'导出 APK + 放行安装'三步方案，并说清哪些该重登、哪些才值得手动备份数据。",
    date: "2026-09-03",
    readTime: "7 min read",
    tags: ["android", "apk", "应用迁移", "换机", "跨品牌", "GMS", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260903List = toList(zhPosts20260903);
