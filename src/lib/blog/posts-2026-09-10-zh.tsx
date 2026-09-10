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
      装更新包时最让人抓狂的一幕：<strong>&quot;应用未安装&quot;、&quot;签名不一致&quot;、&quot;与已安装的应用签名冲突&quot;、&quot;App not
      installed&quot;</strong>。尤其是从第三方渠道下了一个新版 APK，想覆盖手机上旧版，结果死活装不上——这不是包坏了，绝大多数情况下就一个原因：{" "}
      <strong>新旧两个 APK 的签名（开发者印章）不是同一把钥匙。</strong>
    </p>
    <p>
      结论先讲：<strong>安卓允许&quot;覆盖安装&quot;的前提是——新旧 APK 用同一开发者签名。</strong>{" "}
      官方新版和官方旧版指纹一致，能直接覆盖；但你从别处下的&quot;改包/破解/汉化版&quot;换了签名，就和你已经装的官方版
      <strong>冲突</strong>，系统一律拒绝覆盖。<strong>要么装官方同源新版，要么先卸载旧版</strong>——这是唯一的两个出路。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>&quot;签名不匹配&quot;不是故障，是安卓在保护你。</strong>{" "}
        它在提醒你：&quot;这两个包不是同一个开发者签的，可能有一个被改过。&quot; 看到这个提示，第一反应不该是&quot;怎么绕过&quot;，而是&quot;我这第二个包的来源靠谱吗&quot;。
      </p>
    </blockquote>

    <h2>一、为什么会报&quot;签名不匹配&quot;</h2>
    <p>
      安卓识别&quot;是不是同一个 App 的合法更新&quot;，靠的不是名字、不是包名，而是<strong>签名证书</strong>：
    </p>
    <ul>
      <li>
        <strong>同一开发者</strong>发布的所有版本，签名指纹<strong>永远相同</strong> →
        系统认定&quot;这是老 App 的更新&quot;，允许<strong>直接覆盖</strong>。
      </li>
      <li>
        你下载的新包若<strong>换了签名</strong>（哪怕是同一个 App 的&quot;破解版/汉化版/去广告版&quot;，或某个第三方市场重新打包上传的版本）
        → 指纹不同 → 系统认定&quot;这不是它的合法更新&quot; → <strong>拒绝安装并报错</strong>。
      </li>
    </ul>
    <p>
      所以这个错误的本质是：<strong>包名对上了，但签名对不上</strong>。包名相同的两支签名不同的包，安卓绝不允许共存，也不允许覆盖。
    </p>

    <h2>二、先分清你是哪种情况（对症才好下药）</h2>
    <table>
      <thead>
        <tr>
          <th>你的场景</th>
          <th>典型成因</th>
          <th>处置方向</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>装了官方版，想覆盖&quot;破解/汉化/改过&quot;的包</td>
          <td>两个包签名不同</td>
          <td>要么放弃改包用官方，要么先卸载</td>
        </tr>
        <tr>
          <td>换了应用商店（如从 A 市场装的，改用 B 市场版）</td>
          <td>各市场重签，指纹不同</td>
          <td>先卸载旧版再装</td>
        </tr>
        <tr>
          <td>官方名义的新版却报签名冲突</td>
          <td>下到了<strong>二次打包</strong>的假官方</td>
          <td><strong>立刻停手，别装</strong>，回官方源</td>
        </tr>
        <tr>
          <td>之前用&quot;测试签名&quot;装过，现在换正式版</td>
          <td>测试版与正式版签名不同</td>
          <td>先卸载测试版</td>
        </tr>
        <tr>
          <td>跨品牌/跨设备迁移，用备份包覆盖</td>
          <td>备份来自不同签名来源</td>
          <td>卸载后全新安装</td>
        </tr>
      </tbody>
    </table>
    <p>
      看到没有：<strong>只有&quot;装官方同源新版&quot;这一条路能&quot;无痛覆盖&quot;</strong>，其它一律要&quot;先卸后装&quot;。
    </p>

    <h2>三、解决办法（从最推荐到最省事）</h2>
    <h3>方案 1：换成官方同源的新版（最推荐）</h3>
    <p>
      你想覆盖官方版，就该去<strong>官方渠道</strong>下同源新版——<Link href="/">官方渠道</Link>
      、Google Play、或应用官网。<strong>同一开发者签名一致，直接覆盖安装，数据保留。</strong>{" "}
      这是唯一既能升级、又不丢数据的正路。
    </p>
    <blockquote>
      <p>
        判断&quot;是不是官方同源&quot;：把两个 APK 的签名指纹一比即可（见第四节）。一致就能覆盖，不一致就说明至少有一个不是官方。
      </p>
    </blockquote>

    <h3>方案 2：先卸载旧版，再装新版（最直接）</h3>
    <p>如果新包来源不同源（比如你确实要用某个特定渠道版本），安卓不允许覆盖，那就只能：</p>
    <ol>
      <li><strong>备份该 App 内的重要数据</strong>（很多 App 卸载会清数据，先确认是否需要导出）。</li>
      <li><strong>卸载旧版</strong>（设置 → 应用 → 找到它 → 卸载）。</li>
      <li><strong>安装新版</strong>。</li>
      <li>重新登录/恢复数据。</li>
    </ol>
    <p>
      代价是<strong>应用数据通常清空</strong>，所以只在你确定新包可信、且能接受重来时用。
    </p>

    <h3>方案 3：清除残留后再装</h3>
    <p>偶尔是卸载不干净（残留了旧签名记录），表现为明明卸了还报冲突。可尝试：</p>
    <ul>
      <li>
        设置 → 应用 → 找到该应用 → <strong>清除数据 / 清除缓存</strong>，再卸载后重装。
      </li>
      <li>
        若系统有&quot;多用户/工作资料/分身&quot;里也装了同名 App，<strong>每个空间都卸干净</strong>，否则仍会冲突。
      </li>
      <li>重启手机后再装，排除临时状态。</li>
    </ul>

    <h3>方案 4：确认是不是下到了&quot;假官方&quot;</h3>
    <p>
      如果<strong>手机里明明是干净的官方版</strong>，你下的&quot;新版&quot;却报签名冲突，那几乎可以断定：<strong>你下到的那个包不是官方签的</strong>
      ——典型二次打包/盗版。此时<strong>不要为了装上它而卸载官方版</strong>，正确动作是<strong>删掉这个可疑包，回官方源</strong>。
    </p>

    <h2>四、自己动手验一次签名（3 分钟，一劳永逸）</h2>
    <p>与其反复试装，不如先把两个包的指纹解出来比一比，一眼看穿。</p>
    <pre><code>{`# 用 keytool（JDK 自带）
keytool -printcert -jarfile 你的app.apk
# 输出末尾的 SHA256: A5:6F:...:9C 就是签名指纹`}</code></pre>
    <pre><code>{`# 或用 apksigner（Android SDK build-tools，安卓官方口径）
apksigner verify --print-certs 你的app.apk`}</code></pre>
    <p><strong>判读：</strong></p>
    <ul>
      <li>手机已装版本的指纹 <strong>=</strong> 新包指纹 → <strong>同源</strong>，可覆盖安装。</li>
      <li>
        指纹 <strong>≠</strong> → <strong>不同源</strong>，覆盖必然失败；先搞清楚新包来路，再决定卸旧装新还是干脆放弃它。
      </li>
    </ul>

    <h2>五、几个高频疑问</h2>
    <ul>
      <li>
        <strong>&quot;签名不匹配能不能强制装？&quot;</strong> 不能，也<strong>不建议</strong>。除非卸载旧版，没有正规办法；能强装的工具往往要求
        Root，风险更高。
      </li>
      <li>
        <strong>&quot;卸载重装会不会丢数据？&quot;</strong> 多数 App 会。重要数据请先备份，能登录账号云同步的先同步。
      </li>
      <li>
        <strong>&quot;为什么同一个 App 换个市场装就说签名冲突？&quot;</strong> 因为不同市场可能对同一 App 重新签名，指纹就不再一致。
      </li>
      <li>
        <strong>&quot;更新后从 Play 装的还是从官网装的能混用吗？&quot;</strong> 只要是<strong>同一开发者</strong>
        （同一签名），就能互相覆盖；不同开发者签名，则不能。
      </li>
    </ul>

    <h2>小结</h2>
    <p>
      &quot;签名不匹配/无法安装&quot;这句话，翻译过来就是：<strong>这两个包不是同一个开发者签的。</strong>{" "}
      解决逻辑很简单——<strong>想升级就用官方同源新版直接覆盖；想用别的渠道版就先卸载旧版再装；若手机里是官方版、下的包却报冲突，那几乎就是碰上了改包，赶紧删掉回官方源。</strong>{" "}
      花三分钟用 <code>keytool</code> 比对一次指纹，比反复试装十次都管用。记住那条铁律：
      <strong>同源能覆盖，异源必冲突</strong>——守住它，就不会再在这个提示上浪费时间。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么安装 APK 时提示\"应用未安装\"或\"签名不一致\"？",
    answer:
      "安卓只允许两个用同一开发者证书签名的 APK 互相覆盖。签名不一致，说明两个文件包名相同但签名者不同——通常其中一个是被二次打包、破解、汉化或第三方重新签名的版本。安卓拦截安装是为了防止一个应用劫持另一个应用。这不是下载损坏，而是签名冲突。",
  },
  {
    question: "怎么解决签名不匹配、把更新装上？",
    answer:
      "三种安全做法：(1) 最推荐——从官方同源渠道（官方渠道、Google Play 或应用官网）下载新版，同一开发者签名可直接覆盖且保留数据；(2) 若确实要用别的来源的包，先备份重要数据，卸载旧版再安装新版（数据通常被清空）；(3) 清除残留数据/缓存，并在每个用户空间或分身里都卸载干净后重装。切勿 Root 强装不匹配的签名。",
  },
  {
    question: "怎么判断两个 APK 的签名是否一致？",
    answer:
      "分别解出两个文件的签名证书指纹再比对。用 JDK：`keytool -printcert -jarfile 你的app.apk`，看 SHA256 值；或用 Android SDK build-tools：`apksigner verify --print-certs 你的app.apk`。若手机已装版本的指纹等于新文件，说明同源可覆盖；若不同，说明来源不同，覆盖必然失败。",
  },
  {
    question: "签名不匹配一定是恶意软件吗？",
    answer:
      "不一定——合法更新被别的渠道重新签名也会触发它。但如果手机里已经是正版官方版，而你下载的文件仍报签名冲突，那就是很强的不详信号：该文件被第三方重新打包并重签了，这正是\"破解版 APK 木马\"的传播方式。应将该文件视为不可信并删除。",
  },
  {
    question: "为了修复冲突而卸载重装，会丢应用数据吗？",
    answer:
      "通常会。卸载安卓应用一般会清除其本地数据。请先备份重要内容，并登录支持云同步的账号以便恢复设置。若数据重要，优先走\"官方同源更新\"路线——它原地覆盖并能保留数据。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      &quot;文件发到手机了，点它却提示<strong>无法打开、未知文件类型、没有可打开的应用</strong>&quot;——这是把 APK
      从电脑/微信/网盘传到手机后最常撞的墙。包本身没坏，坏的是<strong>手机的打开方式</strong>
      ：安卓默认不知道拿什么程序去&quot;打开&quot;一个 <code>.apk</code>，或者把安装权限给拦了。
    </p>
    <p>
      结论先讲：<strong>APK 不是&quot;双击就开&quot;的普通文件，它要靠系统安装器去处理。</strong>{" "}
      打不开通常只有三类原因：<strong>① 文件后缀被改/被吞（变成 .txt、.zip、无后缀）；② 你没允许&quot;未知来源安装&quot;，系统直接拦；③
      传过去的根本不是 APK（是压缩包、是链接、是分片）。</strong> 对症处理，基本都能装。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>&quot;打不开&quot;十有八九不是包的问题，是&quot;传送方式&quot;和&quot;安装开关&quot;的问题。</strong>{" "}
        先确认它到底是不是一个完整的 <code>.apk</code>，再打开安装权限，最后用对的方式点它。
      </p>
    </blockquote>

    <h2>一、先看它到底是不是一个 APK（最先做的一步）</h2>
    <p>很多&quot;打不开&quot;的根子在<strong>文件根本不是 APK</strong>，或者<strong>后缀丢了</strong>。逐条核对：</p>
    <ul>
      <li>
        <strong>看后缀名</strong>：文件名必须以 <code>.apk</code> 结尾。常见坑：
        <ul>
          <li>
            网盘/邮箱把后缀<strong>吞了</strong>，变成 <code>应用名</code> 无后缀 → 手动重命名补上 <code>.apk</code>。
          </li>
          <li>
            微信传输被改成了 <code>.txt</code>/<code>.apk.1</code>/<code>.bin</code> 之类 → 重命名回 <code>.apk</code>。
          </li>
          <li>
            本该是 APK，却下成了 <strong><code>.zip</code>/<code>.xapk</code>/<code>.apks</code></strong>
            （这些是打包/分片格式，不是直接可装 APK，见第四节）。
          </li>
        </ul>
      </li>
      <li>
        <strong>看大小是否合理</strong>：几百 KB 的&quot;APK&quot;多半是<strong>下载中断的残片</strong>或
        <strong>错误页面</strong>。正常 App 通常几 MB 到上百 MB。
      </li>
      <li>
        <strong>看是不是链接</strong>：传过来的是个网页链接或 <code>.html</code>，那当然&quot;打不开&quot;——要回源头下载真正的包。
      </li>
    </ul>
    <p>
      <strong>一句话：先确认手上这个文件，是一个完整、后缀正确、大小正常的 <code>.apk</code>。</strong>
    </p>

    <h2>二、打开&quot;未知来源应用安装&quot;权限（第二常见原因）</h2>
    <p>
      就算文件没问题，安卓也会因为<strong>没开安装权限</strong>而拦你——表现常是&quot;无法打开/被阻止/出于安全考虑已禁止安装&quot;。
    </p>
    <ul>
      <li>
        <strong>新系统（Android 8+）是&quot;按来源授权&quot;</strong>：不是全局开关，而是<strong>给&quot;发起安装的那个
        App&quot;授权</strong>。比如你用&quot;文件管理&quot;点开的，就要给<strong>文件管理</strong>
        开&quot;允许安装未知应用&quot;；用浏览器点的，就给浏览器开。
        <ul>
          <li>路径：设置 → 应用 → 找到&quot;文件管理/浏览器&quot; → <strong>安装未知应用</strong> → 允许。</li>
        </ul>
      </li>
      <li>
        <strong>旧系统（Android 7 及以下）是全局开关</strong>：设置 → 安全 → <strong>未知来源</strong> → 勾选。
      </li>
    </ul>
    <blockquote>
      <p>
        注意：从<strong>微信</strong>里点开 APK，微信往往不允许直接装（会跳到&quot;用其他应用打开&quot;）。
        <strong>更稳的做法：先在文件管理里找到这个 APK 文件，再点它安装</strong>，别在聊天窗口里点。
      </p>
    </blockquote>

    <h2>三、用对&quot;打开方式&quot;（别用错的 App 去开）</h2>
    <p>APK 要用<strong>系统的&quot;软件包安装程序&quot;</strong>打开，不是用看图、看文档、看视频的 App 去开。</p>
    <ul>
      <li>
        在<strong>文件管理器</strong>里长按该 APK → 选择&quot;打开方式&quot; → 选{" "}
        <strong>软件包安装程序 / 安装器</strong>。
      </li>
      <li>
        若弹出&quot;没有可打开的应用&quot;：多半是<strong>系统安装器被禁用/精简</strong>
        （部分定制系统）或文件后缀不对。补后缀后重试；仍不行则换一台设备或换个传输方式再试。
      </li>
      <li>
        若被某个 App&quot;抢&quot;了默认打开方式，去 设置 → 应用 → 该 App → 清除默认设置，再重新点。
      </li>
    </ul>

    <h2>四、特殊情况：.xapk / .apks / 分片包不是双击就能装</h2>
    <p>
      如果你传过去的是 <code>.xapk</code>（常来自 APKPure 等）或 <code>.apks</code>
      （AAB 拆分出来的分片集），<strong>它们不是普通 APK，直接点当然&quot;打不开&quot;</strong>。
    </p>
    <ul>
      <li>
        <strong><code>.xapk</code></strong>：需要一个支持它的安装器（如 APKPure 客户端 / XAPK Installer）来解开安装。
      </li>
      <li>
        <strong><code>.apks</code> / split 分片</strong>：需要 <code>adb install-multiple</code> 或专业安装器安装。
      </li>
      <li>
        <strong>最省事的办法</strong>：如果目标是普通离线安装，<strong>优先找&quot;通用 APK（universal APK）&quot;单文件</strong>
        ，它一个文件就能装，避开所有分片麻烦。
      </li>
    </ul>

    <h2>五、传输方式也可能&quot;弄坏&quot;文件</h2>
    <p>
      有时候不是打不开，是<strong>传的过程把文件弄坏了</strong>，表现为安装报&quot;解析包错误/包已损坏&quot;：
    </p>
    <ul>
      <li>
        <strong>微信/QQ 传输</strong>：可能改后缀、限大小、甚至拒绝传输。→ 用
        <strong>文件管理/USB/网盘直链/局域网快传</strong>更稳。
      </li>
      <li>
        <strong>USB 拷贝</strong>：确认拷贝完成再拔线，别中途拔导致截断。
      </li>
      <li>
        <strong>网盘</strong>：注意别&quot;在线预览&quot;就以为下好了，要<strong>下载到本地</strong>。
      </li>
      <li>
        <strong>换个方式验证</strong>：同一文件用另一种方式再传一次，若这次能装，说明就是传输问题。
      </li>
    </ul>

    <h2>六、一张表快速定位</h2>
    <table>
      <thead>
        <tr>
          <th>现象</th>
          <th>最可能原因</th>
          <th>处理</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>&quot;无法打开/未知文件类型&quot;</td>
          <td>后缀被改或丢失</td>
          <td>重命名补 <code>.apk</code></td>
        </tr>
        <tr>
          <td>&quot;没有可打开的应用&quot;</td>
          <td>安装器被禁用 / 打开方式错</td>
          <td>文件管理里选&quot;软件包安装程序&quot;</td>
        </tr>
        <tr>
          <td>&quot;禁止安装/被阻止&quot;</td>
          <td>未知来源权限没开</td>
          <td>给发起安装的 App 授权</td>
        </tr>
        <tr>
          <td>&quot;解析包错误/已损坏&quot;</td>
          <td>传输中断或残片</td>
          <td>重新完整下载/换传输方式</td>
        </tr>
        <tr>
          <td>点 <code>.xapk/.apks</code> 打不开</td>
          <td>不是普通 APK</td>
          <td>用对应安装器或改用通用 APK</td>
        </tr>
        <tr>
          <td>明明像 APK 却几十 KB</td>
          <td>下到错误页/残片</td>
          <td>回源头重新下载</td>
        </tr>
      </tbody>
    </table>

    <h2>七、最稳的一条龙流程</h2>
    <p>把顺序理清，一次成功：</p>
    <ol>
      <li>
        <strong>源头</strong>：从<Link href="/">官方渠道</Link>或正规市场下<strong>完整、后缀为 <code>.apk</code></strong> 的包。
      </li>
      <li>
        <strong>传输</strong>：用<strong>文件管理/USB/局域网快传</strong>，避免聊天软件改后缀；传完核对
        <strong>文件大小</strong>是否与源头一致。
      </li>
      <li>
        <strong>权限</strong>：给&quot;文件管理&quot;开<strong>安装未知应用</strong>权限。
      </li>
      <li>
        <strong>安装</strong>：在<strong>文件管理</strong>里找到 APK → 点它 → 选<strong>软件包安装程序</strong>。
      </li>
      <li>
        <strong>校验</strong>：若来源非官方，装前<strong>比对签名指纹</strong>，确认是原版再装。
      </li>
    </ol>

    <h2>小结</h2>
    <p>
      APK 传到手机&quot;打不开&quot;，<strong>锅基本不在包本身</strong>，而在三件事：
      <strong>后缀对不对、权限开没开、打开方式对不对</strong>。先确认它是
      <strong>完整且以 <code>.apk</code> 结尾</strong>的文件，再给文件管理开
      <strong>未知来源安装</strong>，然后在<strong>文件管理里</strong>用
      <strong>软件包安装程序</strong>打开它——九成问题当场解决。碰到 <code>.xapk/.apks</code>
      别硬点，那压根不是普通 APK。养成&quot;从官方源头拿、用可靠方式传、装前瞄一眼指纹&quot;的习惯，你几乎再也不会遇到这个提示。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "为什么我的 APK 在手机上提示\"无法打开文件\"或\"未知文件类型\"？",
    answer:
      "安卓不会像打开照片那样\"打开\"APK——它会把文件交给系统软件包安装程序，且只有满足三个条件才行：文件是完整的 .apk、发起安装的那个 App 已被授予\"安装未知应用\"权限、并且用对了打开方式。常见原因是后缀被吞或改掉（网盘和聊天软件会重命名文件）、未知来源安装权限没开、或文件其实是 .xapk/.apks 打包而非普通 APK。",
  },
  {
    question: "APK 传到手机后打不开，怎么才能装上？",
    answer:
      "先确认文件名以 .apk 结尾、大小正常（只有几十 KB 说明是残片或错误页）。然后在 设置 → 应用 中，给你点开的那个 App（通常是文件管理）授予\"安装未知应用\"权限。最后在文件管理器里打开该文件并选择\"软件包安装程序\"作为打开方式。不要在聊天 App 里直接点 APK，要回到文件管理器里操作。",
  },
  {
    question: "为什么 .xapk 或 .apks 文件点了装不上？",
    answer:
      "因为 .xapk 和 .apks 不是普通 APK，而是打包或分片格式。.xapk 需要一个兼容的安装器（如 APKPure 客户端或 XAPK 安装器）来解开安装；.apks 分片集需要 `adb install-multiple` 或专用安装器。若要简单离线安装，请找单个\"通用 APK（universal APK）\"文件，它几乎能在所有兼容安卓设备上直接安装，无需处理分片。",
  },
  {
    question: "如果 APK 提示\"解析包错误\"或\"包似乎无效\"怎么办？",
    answer:
      "这通常说明文件在传输中被损坏，而不是打开方式的问题。微信/QQ 可能重命名或截断 APK，USB 拷贝中途拔线会截断文件，网盘可能只给了在线预览而非真正下载。用可靠方式（文件管理、USB、局域网快传）重新传输，核对文件大小与源头一致，再重试安装。",
  },
  {
    question: "现代手机上装 APK 需要打开\"未知来源\"吗？",
    answer:
      "Android 8 及以后没有单一的全局开关，权限按来源 App 单独授予。你需要在 设置 → 应用 → [要发起安装的那个 App] → 安装未知应用 中允许它。Android 7 及以下则在 设置 → 安全 里有一个全局\"未知来源\"开关。",
  },
];

export const zhPosts20260910: BlogPostEntry[] = [
  {
    slug: "apk-signature-mismatch-install-failed-fix",
    title: "APK 提示\"签名不匹配/无法安装\"怎么办？覆盖安装失败的完整排查（2026 实操）",
    description:
      "想用新版 APK 覆盖手机上的旧版，却反复提示\"应用未安装/签名不一致/与已安装的应用签名冲突\"？这不是包坏了，而是安卓只允许同一开发者签名的 APK 互相覆盖——你下的\"改包/破解/汉化版\"换了签名，就与官方旧版冲突。这篇讲清报错原理、按场景对号入座的处置表、三种安全解法（官方同源覆盖 / 先卸后装 / 清理残留），并教你用 keytool/apksigner 三分钟比对签名指纹，一眼判断该覆盖还是该删。",
    date: "2026-09-10",
    readTime: "8 min read",
    tags: ["android", "apk", "签名", "安装失败", "覆盖安装", "更新", "安全", "keytool", "apksigner", "排查"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-transferred-to-phone-wont-open-install",
    title: "APK 传到手机上\"打不开/无法识别\"？从电脑传过去装不上怎么办（2026 实操）",
    description:
      "把 APK 从电脑/微信/网盘传到手机，点它却提示\"无法打开/未知文件类型/没有可打开的应用\"？问题多半不在包，而在三件事：后缀被改或丢失、\"未知来源安装\"权限没开、用了错的 App 去打开。这篇教你先确认是不是完整的 .apk（网盘/聊天软件常吞后缀）、按来源给文件管理授权、在文件管理器里用\"软件包安装程序\"打开，并讲清 .xapk/.apks 分片包为何点了装不上、传输方式如何弄坏文件，附速查表与一条龙流程。",
    date: "2026-09-10",
    readTime: "8 min read",
    tags: ["android", "apk", "侧载", "文件传输", "未知来源", "xapk", "安装", "排查", "微信传输", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260910List = toList(zhPosts20260910);
