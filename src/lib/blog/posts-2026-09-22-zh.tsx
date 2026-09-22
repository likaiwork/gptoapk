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
      你装完一个 APK，应用确实在，也能用——但桌面上就是找不到它的图标。翻遍所有页面、抽屉里也搜不到，甚至从「最近任务」里能拉出来，退出后又消失。图标不是被删了，是「藏起来了」或「画不出来」。
    </p>
    <p>
      先给结论：<strong>应用图标丢失，几乎不是 APK 本身坏了，而是三类问题——启动器缓存/布局、图标资源缺失、桌面被系统或厂商策略隐藏。</strong>{" "}
      按下面顺序排查，绝大多数能恢复。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>先用「应用列表」确认 App 真的装上了</strong>，再区分是「桌面没显示」还是「图标画不出来」。方向错了，越修越乱。
      </p>
    </blockquote>

    <h2>一、先确认：App 到底装没装上</h2>
    <p>不要凭桌面判断，桌面会骗你。</p>
    <ol>
      <li>
        打开 <strong>设置 → 应用 → 应用管理</strong>。
      </li>
      <li>搜索这个应用的名字，或按「最近安装」排序查看。</li>
      <li>能找到 → App 装上了，问题在桌面（继续往下看）。</li>
      <li>找不到 → 根本没装成功，那是安装问题，不是图标问题。</li>
    </ol>
    <p>
      也可以用系统搜索：桌面下滑或点搜索框，输入应用名。<strong>如果搜索能找到、能打开，说明只是桌面图标丢失。</strong>
    </p>

    <h2>二、原因一：桌面（启动器）布局与缓存问题</h2>
    <p>这是最常见的一类。启动器负责画图标，它缓存乱了、索引没刷新，图标就会「隐身」。</p>
    <p>
      <strong>修复步骤：</strong>
    </p>
    <ol>
      <li>
        <strong>先重启手机。</strong> 听起来敷衍，但重启会强制启动器重建索引，能解决相当一部分临时丢图标。
      </li>
      <li>
        <strong>下拉到应用抽屉（所有应用页）找一找。</strong> 有些 ROM 新增应用默认只进抽屉，不自动上桌面。
      </li>
      <li>
        <strong>清除启动器缓存：</strong>
        <ul>
          <li>设置 → 应用 → 显示系统应用</li>
          <li>
            找到你的 <strong>启动器</strong>（华为：「华为桌面」；小米：「系统桌面/MIUI 桌面」；原生：「Launcher3」/「Pixel Launcher」）
          </li>
          <li>
            进入 → 存储 → <strong>清除缓存</strong>（不要点「清除数据」，那会重置你的桌面布局）。
          </li>
        </ul>
      </li>
      <li>回到桌面查看是否恢复。</li>
    </ol>
    <blockquote>
      <p>
        <strong>提醒：</strong>
        <strong>只清缓存，别清数据。</strong> 清数据会把你的桌面布局、文件夹、壁纸位置全部重置，代价很大。
      </p>
    </blockquote>

    <h2>三、原因二：图标资源缺失（APK 被「精简」或打包异常）</h2>
    <p>有些第三方打包、修改版 APK 在重打包时丢了图标资源，系统只能画一个<strong>空白格或默认安卓小人</strong>，甚至干脆不画。</p>
    <p>
      <strong>判断方法：</strong>
    </p>
    <ul>
      <li>在「应用管理」里，该应用显示的是<strong>默认安卓图标</strong>或空白 → 图标资源缺失。</li>
      <li>在别处（如通知、最近任务）也没有正常图标 → 基本确认资源问题。</li>
    </ul>
    <p>
      <strong>处理：</strong>
    </p>
    <ol>
      <li>
        <strong>重新下载官方版 APK</strong>，从可信来源安装。图标资源缺失的包，通常还夹带其他修改，安全上也不建议留。
      </li>
      <li>如果只是想在桌面有个入口，可以<strong>用第三方启动器的图标替换功能</strong>手动指定一个图标（如 Nova Launcher 长按应用 → 编辑 → 更换图标）。</li>
      <li>
        用 <Link href="/">gptoapk.com</Link> 这类工具从 Google Play 官方源提取原始 APK，能避免拿到被二次打包、丢资源的包。
      </li>
    </ol>
    <blockquote>
      <p>
        <strong>关键：</strong>
        <strong>图标丢失同时伴随「来源不明」时，优先换官方包，而不是修图标。</strong>
      </p>
    </blockquote>

    <h2>四、原因三：桌面被隐藏 / 应用被冻结</h2>
    <p>有时图标没丢，是被「藏」了。</p>
    <ul>
      <li>
        <strong>厂商的「隐藏应用」功能：</strong> 小米、华为等有「隐藏应用/隐私空间」，被隐藏的 App 不显示图标。检查{" "}
        <strong>设置 → 隐私 → 隐藏应用</strong>。
      </li>
      <li>
        <strong>应用被停用（冻结）：</strong> 设置 → 应用 → 找到该应用 → 若显示「已停用」，点「启用」，图标会回来。
      </li>
      <li>
        <strong>工作资料 / 隐私空间：</strong> 应用被装在了「工作资料」或「第二空间」里，主桌面自然看不到。切换到对应空间查看。
      </li>
      <li>
        <strong>被桌面文件夹收纳：</strong> 长按桌面找一找，有些启动器会把新应用自动放进某个文件夹。
      </li>
    </ul>

    <h2>五、原因四：桌面网格 / 页面空间不足</h2>
    <p>桌面每页能放的图标有限。当一页排满，新图标可能被挤到后面或直接不显示。</p>
    <ul>
      <li>
        长按桌面 → <strong>桌面设置</strong> → 检查是否开了「自动添加到主屏」。
      </li>
      <li>
        尝试<strong>减少桌面图标缩放</strong>（调小图标比例），腾出位置。
      </li>
      <li>
        或干脆把常用应用放进 <strong>Dock / 常驻栏</strong>。
      </li>
    </ul>

    <h2>六、快速自查清单</h2>
    <p>按顺序走一遍，基本能定位：</p>
    <ol>
      <li>✅ 设置里能搜到应用 → 装上了；搜不到 → 重装。</li>
      <li>✅ 重启手机 → 看图标是否回来。</li>
      <li>✅ 应用抽屉里找 → 有则拖到桌面。</li>
      <li>
        ✅ 清启动器<strong>缓存</strong>（不清数据）→ 再看。
      </li>
      <li>✅ 检查「隐藏应用/隐私空间/工作资料」。</li>
      <li>✅ 检查应用是否被「停用/冻结」。</li>
      <li>✅ 检查桌面网格与自动添加设置。</li>
      <li>✅ 以上都不行 → 卸载，换官方 APK 重装。</li>
    </ol>

    <h2>七、常见问题</h2>
    <p>
      <strong>Q：图标是空白格，点开却能用？</strong> 图标资源缺失，多半是重打包 APK。建议换官方包，或用启动器手动替换图标临时解决。
    </p>
    <p>
      <strong>Q：清缓存后图标回来了，过几天又没了？</strong> 启动器或 ROM 有 bug，考虑换个稳定启动器（如 Nova），或更新系统补丁。
    </p>
    <p>
      <strong>Q：会不会是病毒把图标藏了？</strong> 极少见但有可能——恶意应用会隐藏自己。如果伴随耗电异常、弹广告、流量异常，
      <strong>立即卸载并用安全软件全盘扫描</strong>。
    </p>

    <h2>结语</h2>
    <p>
      APK 图标丢失，八成是桌面层的「显示问题」，不是应用坏了。
      <strong>先确认装上了，再分清是布局缓存、图标资源，还是被隐藏/停用</strong>
      ——按清单走一遍，多数几分钟就能找回。真正需要警惕的，是那种「图标丢了还夹带异常行为」的情况，那要当安全问题处理。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "APK 装好了但桌面找不到图标怎么办？",
    answer:
      "先在「设置 → 应用 → 应用管理」里搜索应用名确认它真的装上了。如果装上了但桌面没有，通常是启动器缓存问题：重启手机、在应用抽屉里找、或清除启动器缓存（只清缓存不清数据）。如果「应用管理」里显示的是空白格或默认安卓图标，则是图标资源缺失，建议换官方 APK 重装。",
  },
  {
    question: "清除启动器缓存会丢失桌面布局吗？",
    answer:
      "只清「缓存」不会，但清「数据」会重置你的桌面布局、文件夹和壁纸位置。操作路径是设置 → 应用 → 显示系统应用 → 找到启动器 → 存储 → 清除缓存。务必只点「清除缓存」。",
  },
  {
    question: "应用图标是空白格但能打开，是什么原因？",
    answer:
      "这是图标资源缺失，多半发生在被二次打包或修改过的 APK 上——重打包时丢了图标资源。安全上也建议不要留这类包，最好从官方渠道或 gptoapk.com 等可信源重新下载官方版安装。",
  },
  {
    question: "会不会是病毒把应用图标藏起来了？",
    answer:
      "有可能但很少见。恶意应用有时会隐藏自己的图标。如果图标丢失同时伴随耗电异常、频繁弹广告、流量异常等情况，应立即卸载该应用并用安全软件全盘扫描，同时检查其他可疑应用。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      新版 App 更新后，界面变丑了、功能被砍了、卡顿发热了、或者新版本直接要收费——你只想回到那个「还能用」的旧版本。但一动，安卓就拦你：「应用未安装」「签名不一致」「不允许降级」。
    </p>
    <p>
      先给结论：<strong>安卓允许降级安装，但默认策略会拦。</strong> 关键在三件事：
      <strong>同签名、清数据、绕过系统降级限制</strong>。搞清这三条，绝大多数 App 都能安全退回旧版。
    </p>

    <blockquote>
      <p>
        <strong>核心观点：</strong>
        <strong>降级＝用同签名的旧版 APK 覆盖安装；跨签名必须先卸载重装，而卸载会清空数据。</strong> 备份永远是第一步。
      </p>
    </blockquote>

    <h2>一、先搞清：为什么系统不让你降级</h2>
    <p>安卓有两条线在拦你：</p>
    <ol>
      <li>
        <strong>版本号规则</strong>：Android 默认阻止「安装比当前版本低的 APK」（除非版本号回退合法）。点安装会提示「应用未安装」或「版本低于当前版本」。
      </li>
      <li>
        <strong>签名校验</strong>：只有<strong>同一签名</strong>的 APK 才能互相覆盖安装。官方新版和你手里的旧版如果签名一致，就能覆盖；不一致，必须先卸载。
      </li>
    </ol>

    <h2>二、降级前必做：备份数据（最重要）</h2>
    <p>
      <strong>跨签名降级 = 必须先卸载 = 应用数据全丢。</strong> 同签名覆盖降级则通常能保留数据，但依然有风险。
    </p>
    <ul>
      <li>
        <strong>应用自带云同步</strong>：先登录账号、手动同步一次。
      </li>
      <li>
        <strong>系统备份</strong>：多数 ROM 支持「应用数据备份」。设置 → 系统 → 备份。
      </li>
      <li>
        <strong>重要数据手动导出</strong>：聊天记录、游戏存档、笔记类务必单独导出。
      </li>
    </ul>
    <blockquote>
      <p>
        <strong>血泪提醒：</strong>
        <strong>没备份就别降级。</strong> 游戏存档、聊天记录删了基本找不回来。
      </p>
    </blockquote>

    <h2>三、方法一：同签名覆盖降级（数据可保留）</h2>
    <p>适用：官方旧版 APK（与当前已装版本同签名）。</p>
    <ol>
      <li>
        <strong>找到同签名旧版 APK</strong>。最好从官方渠道或可信镜像下载历史版本，
        <strong>不要用重打包的修改版</strong>（签名不同，跨签就装不上）。
      </li>
      <li>
        <strong>开启未知来源安装</strong>：设置 → 应用 → 找到安装所用的应用（文件管理/浏览器）→ 允许安装未知应用。
      </li>
      <li>
        <strong>直接点安装旧版 APK</strong>。若签名一致，会提示「是否替换现有应用」→ 确认，
        <strong>数据通常保留</strong>。
      </li>
      <li>安装完成后打开，检查数据与功能。</li>
    </ol>

    <h2>四、方法二：卸载重装降级（跨签名 / 被系统拦降级）</h2>
    <ol>
      <li>
        <strong>备份数据</strong>（见第二步）。
      </li>
      <li>
        <strong>卸载当前版本</strong>：设置 → 应用 → 该应用 → 卸载。
      </li>
      <li>
        <strong>确保没有残留</strong>：有些应用卸载后仍留数据，可进「文件管理 → Android/data」手动清理残留目录（若可见）。
      </li>
      <li>
        <strong>安装旧版 APK</strong>。可能弹「此应用可能有害」——确认来源可信后继续。
      </li>
      <li>
        <strong>恢复数据</strong>：用之前的备份恢复，重新登录同步。
      </li>
    </ol>

    <h2>五、方法三：绕过「禁止降级」限制</h2>
    <p>
      <strong>用 ADB 降级安装</strong>（数据可保留）：
    </p>
    <ol>
      <li>手机开启「开发者选项 → USB 调试」，连电脑装好 ADB。</li>
      <li>
        执行：
        <pre>
          <code>adb install -r -d 你的旧版.apk</code>
        </pre>
        （<code>-r</code> 覆盖安装，<code>-d</code> 允许降级。）
      </li>
      <li>这是保留数据降级最靠谱的方式。</li>
    </ol>
    <blockquote>
      <p>
        <strong>注意：</strong>
        <code>-d</code> 降级依旧要求<strong>同签名</strong>。签名不同，ADB 也救不了，只能卸载重装。
      </p>
    </blockquote>

    <h2>六、方法四：冻结更新，防止又被自动升级</h2>
    <ul>
      <li>
        <strong>关闭应用商店自动更新</strong>：Google Play → 该应用 → 右上角 → 取消「启用自动更新」。
      </li>
      <li>
        <strong>关闭厂商商店自动更新</strong>：应用市场里单独对该应用设为「不自动更新」。
      </li>
    </ul>

    <h2>七、降级常见错误对照</h2>
    <ul>
      <li>
        <strong>应用未安装</strong> → 签名不一致 / 版本过低 → 卸载重装，或用 <code>adb install -r -d</code>。
      </li>
      <li>
        <strong>签名不一致</strong> → 新旧包签名不同 → 先卸载旧版，再装降级版。
      </li>
      <li>
        <strong>版本低于当前</strong> → 系统降级保护 → 用 ADB <code>-d</code>，或卸载重装。
      </li>
      <li>
        <strong>解析包错误</strong> → 下载损坏 / 不兼容 → 重新下载；确认 ABI/系统版本兼容。
      </li>
      <li>
        <strong>降级后闪退</strong> → 数据不兼容旧版 → 清除应用数据后重设。
      </li>
    </ul>

    <h2>八、安全提醒：降级别踩坑</h2>
    <ul>
      <li>
        <strong>来源必须可信</strong>：旧版 APK 更要当心夹带，优先官方或 <Link href="/">gptoapk.com</Link> 等可核验来源。
      </li>
      <li>
        <strong>别降太狠</strong>：跨越大版本降级，数据格式可能不兼容，尽量降到相邻的稳定版本。
      </li>
      <li>
        <strong>涉及支付/银行的 App 不要随便降级</strong>，旧版可能有已知漏洞。
      </li>
      <li>
        <strong>降级后留意权限变化</strong>，旧版可能申请更多权限。
      </li>
    </ul>

    <h2>结语</h2>
    <p>
      APK 降级不神秘，抓住两条主线：
      <strong>同签名 → ADB <code>-r -d</code> 保留数据降级；跨签名 → 备份、卸载、重装、恢复。</strong>{" "}
      全程最重要的一步永远是<strong>备份</strong>。装好后顺手关掉自动更新，才能稳稳留在那个「还能用」的版本上。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "安卓降级安装会丢失应用数据吗？",
    answer:
      "分两种情况：如果是同一签名的旧版 APK 覆盖安装，数据通常可以保留；如果签名不一致，就必须先卸载再重装，此时应用数据会全部丢失。所以降级前务必备份——聊天记录、游戏存档、笔记类尤其要单独导出。",
  },
  {
    question: "为什么安装旧版 APK 提示「应用未安装」或「签名不一致」？",
    answer:
      "这是签名校验在起作用。Android 只允许同一签名的 APK 互相覆盖安装。如果你现在装的是 Google Play 版，又拿一个第三方重打包的旧版去覆盖，签名不同就会被拦。解决办法是卸载当前版本后重装旧版，并用 ADB 的 -r -d 参数在需要时保留数据。",
  },
  {
    question: "怎么绕过系统禁止降级的限制？",
    answer:
      "最可靠的方式是用 ADB：开启 USB 调试后执行 adb install -r -d 你的旧版.apk，其中 -d 表示允许降级、-r 表示覆盖安装。这样可以在同签名的前提下保留数据降级。注意即使使用 -d，签名不同依然无法覆盖，只能卸载重装。",
  },
  {
    question: "降级后怎么防止又被自动升级回去？",
    answer:
      "在两个地方关掉自动更新：Google Play → 该应用 → 右上角菜单 → 取消「启用自动更新」；以及厂商应用市场里对该应用单独设置为「不自动更新」。否则商店会在后台悄悄把你升回新版。",
  },
];

export const zhPosts20260922: BlogPostEntry[] = [
  {
    slug: "apk-app-icon-missing-fix",
    title: "APK 应用图标丢失怎么修复？2026 安卓桌面图标不见的完整排查指南",
    description:
      "装完 APK 但桌面找不到图标？应用确实在，能打开，就是桌面看不见。图标丢失几乎不是 APK 坏了，而是启动器缓存/布局、图标资源缺失、或桌面被隐藏/停用三类问题。本文按顺序排查，给出从清缓存、检查隐藏应用，到换官方包重装的完整解决步骤。",
    date: "2026-09-22",
    readTime: "7 min read",
    tags: ["android", "apk", "图标", "桌面", "故障排查"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-downgrade-install",
    title: "安卓 APK 降级安装方法：2026 新版不好用？安全退回旧版本完整教程",
    description:
      "新版 App 更新后不好用，想退回旧版本却提示「应用未安装」「签名不一致」「不允许降级」？安卓其实允许降级，关键在同意签名、清数据、绕过系统降级限制。本文给出同签名覆盖降级、卸载重装、ADB -r -d 保留数据降级，以及冻结自动更新的完整方法。",
    date: "2026-09-22",
    readTime: "8 min read",
    tags: ["android", "apk", "降级", "旧版本", "教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260922List = toList(zhPosts20260922);
