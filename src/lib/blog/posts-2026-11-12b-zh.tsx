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
      同一台手机上登录两个微信、两个游戏号、两个工作账号——这是国内安卓用户最普遍的需求之一，也是最容易被&ldquo;多开器&rdquo;这类第三方 App
      薅羊毛的地方：它们把一个本来系统就能做的事，包装成&ldquo;黑科技&rdquo;，代价是你的账号密码和数据全过一遍别人的手。
    </p>
    <p>
      这篇按<strong>风险从低到高</strong>给出四层方案，你先看前两层，99%
      的场景用不着后面两层。
    </p>

    <h2>先搞清楚：多开到底是什么原理</h2>
    <p>
      一个安卓应用的身份由<strong>包名（package name）</strong>唯一确定，系统按包名隔离数据目录
      <code>/data/data/&lt;包名&gt;/</code>。所以&ldquo;多开&rdquo;的本质只有一条路：
    </p>
    <blockquote>
      <p>
        <strong>让第二份应用拥有一个不同的包名，或者拥有一个不同的用户身份（UID）。</strong>
      </p>
    </blockquote>
    <p>
      所有多开方案都是这两条路的不同实现，没有例外。理解这一点，你就能判断一个&ldquo;多开器&rdquo;是在做什么、靠不靠谱。
    </p>

    <h2>方案一：系统自带的应用分身（首选）</h2>
    <p>主流国产 ROM 都已经内置，不需要装任何东西：</p>
    <table>
      <thead>
        <tr>
          <th>品牌</th>
          <th>入口</th>
          <th>最多分身数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>小米 / Redmi</td>
          <td>设置 → 应用设置 → 应用双开</td>
          <td>每应用 1 个</td>
        </tr>
        <tr>
          <td>华为 / 荣耀（部分机型）</td>
          <td>设置 → 应用 → 应用分身</td>
          <td>每应用 1 个</td>
        </tr>
        <tr>
          <td>OPPO / 一加 / realme</td>
          <td>设置 → 应用 → 应用分身</td>
          <td>每应用 1 个</td>
        </tr>
        <tr>
          <td>vivo / iQOO</td>
          <td>设置 → 应用与权限 → 应用分身</td>
          <td>每应用 1 个</td>
        </tr>
        <tr>
          <td>三星</td>
          <td>设置 → 高级功能 → 双 Messenger 或 Secure Folder</td>
          <td>1~2 个</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>优点：</strong>系统级实现，走的是 Android 原生的多用户（<code>UserManager</code>）或 work
      profile 通道，数据隔离是内核级的，第三方无法窥探。
    </p>
    <p>
      <strong>注意：</strong>分身出来的应用图标右下角通常有个角标，别当成病毒。部分应用（尤其是金融类、支付类）会主动检测分身环境并拒绝启动
      —— 这是应用方的风控，不是你手机的问题。
    </p>

    <h2>方案二：系统工作资料 / 隔离空间</h2>
    <p>
      Android 5.0 起原生支持 <strong>work profile（工作资料）</strong>，本质是第二个
      <code>UserManager.UserHandle</code>，拥有独立的 UID 段、独立的数据目录、独立的联系人存储。
    </p>
    <ul>
      <li>小米：设置 → 特色功能 → 手机分身</li>
      <li>三星：Secure Folder（安全文件夹）</li>
      <li>
        原生 / Pixel / 类原生：用 <strong>Island</strong>（开源，基于 work profile，GitHub
        上可查源码）
      </li>
    </ul>
    <p>
      <strong>优势：</strong>隔离强度比应用分身更高，可以给工作资料单独设锁屏密码、单独禁用相机、单独冻结。适合&ldquo;一个手机装公司监控 App +
      私人应用&rdquo;的场景。
    </p>
    <p>
      <strong>代价：</strong>工作资料里的 Google 服务、通知推送有时需要单独配置；部分银行 App 在 work
      profile 下会认为环境异常。
    </p>

    <h2>方案三：同一应用安装多个不同签名的 APK（高风险）</h2>
    <p>
      有人会去网上找&ldquo;XX 应用多开版 APK&rdquo;，这类包通常是<strong>重打包（repackaged）</strong>版本：反编译官方
      APK → 改包名 → 重新签名。
    </p>
    <p>问题在于：</p>
    <ol>
      <li>
        <strong>重新签名意味着签名证书变了</strong>，Google Play Protect
        会标记为&ldquo;未通过验证&rdquo;，部分系统直接拒绝安装
      </li>
      <li>
        <strong>重打包的包可以任意注入代码</strong> ——
        你以为装的是微信，实际上里面多了一段把你聊天记录上传到某台服务器的逻辑，而普通用户没有任何手段分辨
      </li>
      <li>
        <strong>原应用的完整性校验会失败</strong>，登录时可能被风控要求人脸/短信二次验证，甚至直接封号
      </li>
    </ol>
    <p>
      如果你确实需要这种方式（比如某个老游戏没有分身支持），<strong>唯一相对可控的做法是自己重打包 +
      自己签名</strong>：用 <code>apktool</code> 解包、<code>manifest</code> 里改
      <code>package</code> 属性和 <code>applicationId</code>、重新用你自己的 keystore 签名。这样至少注入的是你知道的代码。
    </p>
    <pre>
      <code>{`# 仅演示流程，实际使用需自行承担合规风险
apktool d app.apk -o app_decoded
# 编辑 app_decoded/apktool.yml 和 AndroidManifest.xml 中的包名
apktool b app_decoded -o app_rebuilt.apk
apksigner sign --ks my.keystore --out app_clone.apk app_rebuilt.apk`}</code>
    </pre>
    <p>
      <strong>红线：</strong>涉及支付、社交、企业办公的应用，不要用重打包版本。账号里有钱、有聊天记录、有工作数据，不值得为省一台备用机冒这个险。
    </p>

    <h2>方案四：第三方&ldquo;多开器&rdquo;App（不建议）</h2>
    <p>应用商店里那些叫&ldquo;应用双开助手&rdquo;&ldquo;多开分身大师&rdquo;&ldquo;平行空间&rdquo;的 App，本质有两种：</p>
    <ul>
      <li>
        <strong>基于 VirtualApp / VirtualXposed 类的容器方案</strong> ——
        把目标 App 跑在它自己的进程里，拦截系统调用做重定向。技术上有意思，但<strong>目标应用的账号密码、Token、全部数据都在容器的进程内存里</strong>，容器开发者理论上完全可读。
      </li>
      <li>
        <strong>只是个壳，实际调用系统分身 API</strong> —— 那就更没必要装它了，直接用方案一。
      </li>
    </ul>
    <p>
      判断方法很简单：如果这个 App 要求<strong>无障碍服务权限</strong>或者<strong>悬浮窗 + 设备管理员权限</strong>，直接卸载。做多开不需要这些权限，要了就是另有所图。
    </p>

    <h2>常见问题</h2>
    <h3>双开后两个账号能同时接收推送吗？</h3>
    <p>能，但系统分身和 work profile 的推送通道不同，部分应用只给主实例发推送。</p>
    <h3>双开的应用怎么迁移到新手机？</h3>
    <p>
      分身数据同样在 <code>/data/data/</code> 下但属于不同 UID，普通迁移工具搬不过去。要么重新登录，要么用
      <code>adb</code> 导出（需要 root 或 <code>allowBackup=true</code>）。
    </p>
    <h3>iOS 能多开吗？</h3>
    <p>
      不能，iOS 的沙盒模型没有多用户概念，所谓&ldquo;iOS 多开&rdquo;全部是企业证书签名或描述文件方案，动不动就掉签、泄露数据，别碰。
    </p>
    <h3>一个应用最多能开几个？</h3>
    <p>系统分身一般限制 1 个额外实例；work profile 1 个；理论上多用户模式下每个 user 都能装一份，但切换麻烦，实际不超过 3 个。</p>

    <h2>一句话总结</h2>
    <p>
      <strong>
        先用系统自带的&ldquo;应用分身&rdquo;，不够就用&ldquo;工作资料/手机分身&rdquo;，再不够就老老实实买台备用机。
      </strong>{' '}
      别为了多开一个账号，把主账号的密码交给一个来源不明的容器 App。
    </p>
    <p>
      想下载官方原版 APK 而不是来路不明的&ldquo;多开版&rdquo;？可以用{' '}
      <Link href="/">gptoapk.com</Link>{' '}
      直接拉取 Google Play 上的原包，签名为官方签名，装完再用系统分身开第二个实例，这条路最干净。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "安卓双开会影响手机性能和耗电吗？",
    answer:
      "会有额外开销，但主要来自多出的实例本身，而不是这个机制。每个分身是独立进程，内存占用约等于再装一份应用；后台保活、推送也各走一套。一般社交类应用双开影响很小，大型游戏双开则会明显吃内存和电量。",
  },
  {
    question: "为什么有些应用在分身里打不开或者提示环境异常？",
    answer:
      "这是应用方的风控在检测运行环境，常见于银行、支付、部分社交和游戏。判断依据包括是否运行在 work profile、是否有多个同包名实例、设备指纹是否异常。这不是手机故障，除了换机或改用系统原生分身，没有可靠绕过方式。",
  },
  {
    question: "双开的应用和主应用数据互通吗？",
    answer:
      "不互通。分身拥有不同的 UID 和独立的 /data/data 目录，登录态、数据库、缓存都是分开的。这也是双开能同时登录两个账号的原因，但也意味着主应用里的数据不会自动出现在分身里。",
  },
  {
    question: "卸载分身会连带删除主应用吗？",
    answer:
      "不会。系统分身和主应用是两个独立的安装实例，在设置里关闭应用分身只会移除分身及其数据，主应用和它的数据保持原样。建议操作前确认一遍应用列表，避免误删。",
  },
];

const ARTICLE2 = (
  <>
    <p>
      &ldquo;应用装好了，也在跑，就是不弹通知&rdquo;——这是安卓上最高频、也最容易误判的故障。绝大多数人第一反应是重装应用，但
      <strong>通知不弹 90% 的原因在系统层，重装根本没用</strong>。
    </p>
    <p>这篇按<strong>触发概率从高到低</strong>给一条排查链，每一步都告诉你去看哪个开关、为什么。</p>

    <h2>第一层：通知渠道（Android 8.0 之后的头号元凶）</h2>
    <p>
      Android 8.0 引入了 <strong>Notification Channel（通知渠道）</strong>
      ：一个应用可以有多条独立渠道——聊天消息、系统通知、营销推送、下载进度——<strong>每条渠道有独立的开关和重要性等级，应用无法覆盖用户的设置</strong>。
    </p>
    <p>这就是经典的&ldquo;重装也没用&rdquo;：</p>
    <ul>
      <li>你在设置里把某个渠道关掉了</li>
      <li>
        应用的渠道信息跟着<strong>包名+渠道 ID</strong> 存在系统数据库里
      </li>
      <li>
        <strong>卸载重装不会清除这个数据库记录</strong>，只要渠道 ID 不变，还是关着的
      </li>
    </ul>
    <p>
      <strong>排查路径：</strong>
    </p>
    <pre>
      <code>{`设置 → 通知 → 找到该应用 → 查看下方渠道列表`}</code>
    </pre>
    <p>逐个检查每个渠道的：</p>
    <ul>
      <li>开关是否为开</li>
      <li>
        重要性是否为&ldquo;<strong>紧急/高</strong>&rdquo;（默认、低、无 都不会横幅弹出）
      </li>
      <li>是否被设为&ldquo;静音&rdquo;</li>
    </ul>
    <p>
      <strong>修复：</strong>重要性改成&ldquo;高&rdquo;，或用命令彻底重置：
    </p>
    <pre>
      <code>{`# 查看应用的所有通知渠道
adb shell dumpsys notification --noredact | grep -A 20 "com.example.app"

# 清除某个应用的渠道设置（需在应用运行时执行）
adb shell cmd notification reset com.example.app`}</code>
    </pre>

    <h2>第二层：应用层开关（最容易被忽略的&ldquo;应用内通知&rdquo;）</h2>
    <p>
      很多应用有<strong>两套通知设置</strong>：系统层的（上面第一层）和应用内部的。
    </p>
    <p>
      比如微信的&ldquo;新消息通知&rdquo;、Telegram 的&ldquo;私聊通知&rdquo;、Slack
      的频道通知，都可能在应用内部被关掉，而系统层看起来一切正常。
    </p>
    <p>
      检查顺序：<strong>应用内设置 → 设置 → 通知</strong>，不是反过来。
    </p>

    <h2>第三层：勿扰模式与专注模式</h2>
    <p>
      勿扰模式（DND）的拦截是<strong>在通道之上的</strong>，即使通道重要性是&ldquo;高&rdquo;，勿扰开着也不弹。
    </p>
    <p>容易被忽略的点：</p>
    <ul>
      <li>
        <strong>定时勿扰</strong>：23:00-07:00 自动开启，很多人忘了自己设过
      </li>
      <li>
        <strong>驾驶模式 / 睡眠模式</strong>：部分 ROM 会和勿扰联动
      </li>
      <li>
        <strong>允许例外</strong>：可以给特定联系人/应用设白名单，路径在勿扰设置里
      </li>
    </ul>
    <pre>
      <code>{`设置 → 声音与振动（或通知）→ 勿扰 → 允许例外 → 应用`}</code>
    </pre>

    <h2>第四层：电池优化与后台限制（国产 ROM 的重灾区）</h2>
    <p>
      通知能不能弹出，前提是<strong>应用的推送进程能活着</strong>。国产 ROM
      的省电策略默认会把后台进程杀得很狠，尤其是非商店渠道安装的应用——系统会把它们标记为&ldquo;未知来源&rdquo;，默认收紧后台权限。
    </p>
    <p>
      这是<strong>侧载（sideload）用户特有的大坑</strong>：从 Google Play 装的微信和从 APK
      装的微信，系统给的后台待遇可能不一样。
    </p>
    <p>
      <strong>需要逐项放开的开关：</strong>
    </p>
    <table>
      <thead>
        <tr>
          <th>设置项</th>
          <th>路径示例</th>
          <th>作用</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>自启动</td>
          <td>设置 → 应用 → 自启动管理</td>
          <td>允许开机后启动推送服务</td>
        </tr>
        <tr>
          <td>关联启动</td>
          <td>同上</td>
          <td>允许被其他应用唤起</td>
        </tr>
        <tr>
          <td>后台活动</td>
          <td>设置 → 电池 → 应用耗电管理</td>
          <td>设&ldquo;不限制/允许后台运行&rdquo;</td>
        </tr>
        <tr>
          <td>电池优化白名单</td>
          <td>设置 → 电池 → 优化 → 所有应用</td>
          <td>找到该应用设为&ldquo;不优化&rdquo;</td>
        </tr>
        <tr>
          <td>锁定后台</td>
          <td>多任务界面下拉卡片加锁</td>
          <td>防止一键清理杀掉</td>
        </tr>
      </tbody>
    </table>
    <p>
      以 <strong>FCM / HMS Push</strong> 为例：如果 Google Play 服务（FCM）被限制后台，所有依赖 FCM
      的应用（WhatsApp、Telegram、Gmail 等）的通知都会延迟甚至完全收不到。这是海外应用在国内安卓手机上&ldquo;收不到消息&rdquo;的头号原因。
    </p>
    <p>
      <strong>修复 FCM：</strong>
    </p>
    <pre>
      <code>{`设置 → 应用 → Google Play 服务 → 电池 → 不受限制`}</code>
    </pre>

    <h2>第五层：推送服务本身是否可用</h2>
    <p>如果上面四层全开还是没通知，问题可能不在手机：</p>
    <ol>
      <li>
        <strong>FCM 不可用</strong>：国内网络环境下 Google
        服务连不上，依赖 FCM 的应用自然收不到推送。需要用能稳定连通 Google 服务的网络环境。
      </li>
      <li>
        <strong>HMS（华为推送）未注册</strong>：华为手机上，非华为应用市场安装的应用可能拿不到 HMS token。
      </li>
      <li>
        <strong>应用被厂商&ldquo;冻结&rdquo;</strong>：部分 ROM 会对长期未打开的应用做自动冻结，打开一次就解冻。
      </li>
    </ol>
    <p>
      <strong>验证推送是否到达（不需要看 UI）：</strong>
    </p>
    <pre>
      <code>{`# 实时看通知系统日志
adb logcat -s NotificationService:* NotificationManager:* | grep com.example.app`}</code>
    </pre>
    <p>
      如果日志里有 <code>enqueueNotification</code> 但界面没弹，是<strong>通道/勿扰</strong>问题（第一、三层）；
      <br />
      如果日志里根本没有，是<strong>推送没到</strong>（第四、五层）。
    </p>
    <p>
      这条命令能一刀切开&ldquo;弹不出来&rdquo;和&ldquo;没收到&rdquo;两种完全不同的故障，比盲试设置高效得多。
    </p>

    <h2>快速诊断决策表</h2>
    <table>
      <thead>
        <tr>
          <th>症状</th>
          <th>最可能原因</th>
          <th>先查</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>有些消息弹，有些不弹</td>
          <td>通道分级</td>
          <td>第一层，查具体渠道重要性</td>
        </tr>
        <tr>
          <td>完全没反应，角标也没有</td>
          <td>推送未到达</td>
          <td>第五层，logcat + 检查 FCM</td>
        </tr>
        <tr>
          <td>有角标/小红点，无横幅</td>
          <td>通道重要性为低 + 勿扰</td>
          <td>第一层 + 第三层</td>
        </tr>
        <tr>
          <td>打开应用才收到一堆</td>
          <td>后台被限制</td>
          <td>第四层，电池优化白名单</td>
        </tr>
        <tr>
          <td>重装后依然没有</td>
          <td>渠道设置残留</td>
          <td>
            第一层，<code>cmd notification reset</code>
          </td>
        </tr>
        <tr>
          <td>锁屏时不弹，解锁后弹</td>
          <td>锁屏通知设置</td>
          <td>通知 → 锁屏通知 → 显示全部内容</td>
        </tr>
      </tbody>
    </table>

    <h2>最后：关于&ldquo;通知延迟&rdquo;的一点常识</h2>
    <p>
      安卓的通知延迟本质上是<strong>推送架构</strong>决定的：
    </p>
    <ul>
      <li>
        <strong>FCM 走长连接</strong>，正常情况下延迟 &lt; 1
        秒；网络切换、弱网、系统省电策略会让长连接被断，重连期间的消息就走不通
      </li>
      <li>
        <strong>国内应用多用自建长连接或厂商推送</strong>（小米推送、华为 HMS、OPPO PUSH
        等），这些通道在各自品牌手机上更稳，跨品牌就退化到轮询，延迟可能到分钟级
      </li>
      <li>
        <strong>这与 APK 从哪下载没有直接关系</strong>，但如果你的 APK
        来自非官方渠道、签名与原版不一致，可能被系统打上&ldquo;未知来源&rdquo;标记而收紧后台权限，间接导致推送不稳
      </li>
    </ul>
    <p>
      所以如果你正在遭遇&ldquo;侧载应用通知总是不稳&rdquo;，值得先确认手里的包是不是官方签名版本——用{' '}
      <Link href="/">gptoapk.com</Link>{' '}
      从 Google Play 拉原包，能排除掉&ldquo;包本身被改过或者渠道错了&rdquo;这一类问题，剩下的就好排查了。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "通知渠道关了，为什么卸载重装还是没通知？",
    answer:
      "通知渠道的设置按包名 + 渠道 ID 存在系统数据库里，卸载应用不会清除这条记录。只要应用重新安装后使用的渠道 ID 不变，之前的关闭状态就会被沿用。解决方法是进入通知设置手动打开该渠道，或执行 adb shell cmd notification reset <包名> 重置。",
  },
  {
    question: "有通知角标但锁屏和横幅都不显示，是什么原因？",
    answer:
      "通常是两个条件叠加：一是通知渠道的重要性被设为默认或低，低重要性不会触发横幅；二是勿扰模式或专注模式处于开启状态。先把渠道重要性调到高，再检查勿扰的定时计划和允许例外列表。",
  },
  {
    question: "为什么只有打开应用后才一次性收到很多消息？",
    answer:
      "说明推送消息到达了但被系统压住了，或者应用的推送进程只在应用处于前台时才能运行。典型原因是后台被限制：电池优化未加白名单、自启动和关联启动被关、或者 RAM 紧张时进程被系统回收。逐项放开后台权限后通常可以恢复实时推送。",
  },
  {
    question: "依赖 FCM 的应用在国内安卓手机上收不到通知怎么办？",
    answer:
      "先确认 Google Play 服务没有被限制后台并已加入电池优化白名单，再排查网络是否能稳定连到 FCM 服务。如果网络不通，FCM 长连接会反复重连失败，通知自然收不到。部分国内 ROM 还提供应用通知辅助或第三方推送，可以在通知设置里开启作为补充。",
  },
];

export const zhPosts20261112B = [
  {
    slug: "android-dual-app-four-approaches",
    title: "安卓APK双开多开方法：四层方案，从系统自带到来路不明的多开器",
    description:
      "多开的本质只有两条路：换包名或换用户身份。系统应用分身、工作资料隔离、自行重打包签名、第三方多开器——按风险从低到高排好，并说清那些平行空间 App 为什么能读到你的登录凭证。",
    date: "2026-11-12",
    readTime: "9 min read",
    tags: ["android", "apk", "privacy"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-app-notifications-not-showing-fix",
    title: "安卓APK通知不弹出修复：从通道设置到厂商杀后台的全链路排查",
    description:
      "应用在跑但不弹通知，重装通常一点用没有——90% 的原因在系统层。五层排查链：通知渠道、应用内开关、勿扰、电池优化与后台限制、推送服务可用性，附一条 adb 命令切开弹不出来和没收到。",
    date: "2026-11-12",
    readTime: "11 min read",
    tags: ["android", "notifications", "troubleshoot"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261112BList = toList(zhPosts20261112B);
