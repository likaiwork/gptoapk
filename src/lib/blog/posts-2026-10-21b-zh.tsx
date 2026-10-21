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
    question: "反编译 APK 违法吗？",
    answer:
      "反编译本身通常不违法，违法与否取决于你怎么使用结果。分析自己购买或下载的 App、学习实现思路、检查可疑安装包、分析恶意样本都属于正当用途；把反编译得到的代码搬进自己项目、去掉付费限制、修改他人 App 后重新分发或上架，则构成侵权或违反用户协议。",
  },
  {
    question: "判断一个下载来的 APK 是否被改过，最快的方法是什么？",
    answer:
      "用 apksigner verify --print-certs 查看签名证书的 SHA-256 指纹，和官方版本对比。同一开发者的所有版本签名指纹完全一致，不一致就说明被重新打包过。这一步只需要十秒，能挡掉绝大多数恶意包。",
  },
  {
    question: "jadx 反编译不出来代码是什么原因？",
    answer:
      "常见于两种情况：一是遇到复杂控制流或字节码优化，可以加 --show-bad-code 参数查看原始 smali；二是 App 做了加固（如 360 加固、梆梆、腾讯乐固），真正的代码被加密在 .so 里运行时才解密，静态分析只能看到壳，需要动态分析工具才能继续。",
  },
  {
    question: "反编译出来的代码能直接编译运行吗？",
    answer:
      "基本不能。反编译是有损的，控制流可以读懂，但类型信息、泛型、资源引用和原始标识符都会丢失或变形。如果要改功能，通常在 apktool 拆出的 smali 层面修改后重新打包签名，而不是指望还原成可编译的 Gradle 工程。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "老安卓手机变慢，清理软件有用吗？",
    answer:
      "作用很有限。老手机真正的瓶颈是内存压力（应用常驻过多）和 eMMC 闪存随机读写老化，清理软件只能删缓存和垃圾文件，碰不到这两个瓶颈。真正有效的做法是关闭非必要应用的自启动和关联启动、关闭三个动画缩放、并把关键应用锁定在旧版本。",
  },
  {
    question: "关闭动画缩放真的能让手机变快吗？",
    answer:
      "会。老 GPU 渲染一帧过渡动画耗时是新机的三到五倍，这部分延迟是真实存在的。在开发者选项里把窗口动画缩放、过渡动画缩放、动画程序时长缩放全部关闭后，每次页面切换都省下这段时间，体感提升非常明显，代价只是视觉上不再有滑动效果。",
  },
  {
    question: "开不了机的安卓手机还能救吗？",
    answer:
      "分情况。卡在开机 Logo 或反复重启，可以先尝试进 Recovery 清缓存，再不行就双清恢复出厂；系统损坏的可以用官方固件和官方刷机工具重刷；完全黑屏且插电无反应通常是电池或主板问题，先换电池测试，不行基本就报废了。刷机必然清数据，有重要资料要先想办法导出来。",
  },
  {
    question: "老手机长期插电当监控机会有什么问题？",
    answer:
      "主要风险是电池鼓包。锂电池长期处于满电高温状态会加速老化并产生膨胀，一年左右就可能出现明显鼓包。建议使用充电上限功能把充电限制在 80% 左右，或者干脆改用可拆卸供电方案，不要密封着长期插电。",
  },
];

const ARTICLE1 = (
  <>
    <p className="lead">
      说到&ldquo;反编译 APK&rdquo;，很多人第一反应是改游戏、去广告、破解会员。但真实工作中最高频的用法是另外三类：确认一个包是不是被改过、看懂别人 App
      的实现思路、找回自己项目丢失的源码或资源。这篇讲清楚工具链、实际操作流程，以及法律边界。
    </p>
    <blockquote>
      <p>
        <strong>核心结论：</strong>APK 就是一个 zip。反编译不是黑魔法，而是标准的静态分析流程：解包 → 反汇编 → 读结构 → 需要时再反编译成
        Java。第一步永远不是改代码，而是先看清楚里面有什么。
      </p>
    </blockquote>

    <h2>一、先理解 APK 的结构</h2>
    <p>把 <code>.apk</code> 后缀改成 <code>.zip</code> 就能解开，里面大致是这样一个骨架：</p>
    <pre>
      <code>{`app.apk
├── AndroidManifest.xml     # 二进制 XML，声明组件和权限
├── classes.dex             # Dalvik 字节码（可能有 classes2.dex 等）
├── resources.arsc          # 资源索引表（编译后）
├── res/                    # 编译后的资源（layout、drawable、values）
├── lib/
│   ├── arm64-v8a/*.so      # 原生库
│   ├── armeabi-v7a/*.so
│   └── x86_64/*.so
├── assets/                 # 原始文件，不编译
└── META-INF/               # 签名文件`}</code>
    </pre>
    <p>
      关键认知：<code>AndroidManifest.xml</code> 和 <code>res/</code> 下的 XML 不是纯文本，而是编译过的二进制格式。直接解压看到的是乱码，必须用
      apktool 这类工具处理。
    </p>

    <h2>二、工具链：装这四个就够</h2>
    <h3>1. apktool —— 反编译资源与清单</h3>
    <pre>
      <code>{`brew install apktool
apktool d app.apk -o app_src`}</code>
    </pre>
    <p>
      输出目录里有可读的 <code>AndroidManifest.xml</code>、<code>res/layout/*.xml</code>、
      <code>res/values/strings.xml</code>。这是信息量最大的一步，很多问题在这一步就解决了：想确认 App
      有没有偷申请短信权限看清单、想找硬编码的接口地址搜 <code>strings.xml</code>、想确认是不是官方包看
      <code>apktool.yml</code> 里记录的签名信息。
    </p>

    <h3>2. jadx —— dex 反编译成 Java，首选</h3>
    <pre>
      <code>{`brew install jadx
jadx -d out_java app.apk
jadx-gui app.apk   # 带界面的版本，支持全局搜索和跳转定义`}</code>
    </pre>
    <p>
      比它老的是 dex2jar 加 jd-gui 的组合，现在基本不需要了——jadx 更快、更准、还原度更高。&nbsp;
    </p>

    <h3>3. aapt2 —— 快速查看清单信息</h3>
    <pre>
      <code>{`aapt2 dump badging app.apk
aapt2 dump permissions app.apk`}</code>
    </pre>
    <p>不用整个反编译，只想看关键字段时用这个，秒级出结果，适合批量筛包。</p>

    <h3>4. apksigner —— 验证签名</h3>
    <pre>
      <code>apksigner verify --print-certs app.apk</code>
    </pre>

    <h2>三、实战：判断一个 APK 有没有被改过</h2>
    <p>这是反编译最实用的场景，流程分四步。</p>

    <h3>第 1 步：看签名指纹</h3>
    <pre>
      <code>apksigner verify --print-certs suspect.apk</code>
    </pre>
    <p>
      拿到的 SHA-256 指纹和官方 App 从 Play 商店装的做对比。同一个开发者所有版本签名一致，不一致就 100% 被重打包过。这一步能挡掉
      90% 的恶意包，而且不需要任何反编译知识。
    </p>

    <h3>第 2 步：diff 权限清单</h3>
    <pre>
      <code>{`aapt2 dump permissions suspect.apk  > suspect.txt
aapt2 dump permissions official.apk > official.txt
diff official.txt suspect.txt`}</code>
    </pre>
    <p>被塞东西的包通常会多出这几类权限：</p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>权限</th>
            <th>能做什么</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>READ_SMS</code> / <code>RECEIVE_SMS</code>
            </td>
            <td>偷验证码，正常 App 没有正当理由需要</td>
          </tr>
          <tr>
            <td>
              <code>READ_CONTACTS</code>
            </td>
            <td>批量导出通讯录</td>
          </tr>
          <tr>
            <td>
              <code>BIND_ACCESSIBILITY_SERVICE</code>
            </td>
            <td>读屏、模拟点击、键盘记录，安卓上被滥用最严重的权限</td>
          </tr>
          <tr>
            <td>
              <code>BIND_DEVICE_ADMIN</code>
            </td>
            <td>阻止卸载、锁定设备</td>
          </tr>
          <tr>
            <td>
              <code>SYSTEM_ALERT_WINDOW</code>
            </td>
            <td>悬浮窗覆盖攻击，可在真实 App 上盖假登录框</td>
          </tr>
          <tr>
            <td>
              <code>REQUEST_INSTALL_PACKAGES</code>
            </td>
            <td>静默下载并安装第二个载荷</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>一个下载来的&ldquo;改版&rdquo;包同时出现其中三个，它不是改版，是投放器。</p>

    <h3>第 3 步：找注入的代码</h3>
    <pre>
      <code>{`apktool d suspect.apk -o suspect_src
grep -rn "loadLibrary\\|DexClassLoader\\|Class.forName" suspect_src/smali | head -20
grep -rn "loadLibrary" suspect_src/smali/com/真实包名/MainActivity.smali`}</code>
    </pre>
    <p>正常 App 也会有这类调用，但如果启动入口 Activity 里加载了一个名字奇怪的 <code>libxxx.so</code>，就很可疑。</p>

    <h3>第 4 步：看 assets 里有没有奇怪的加密文件</h3>
    <pre>
      <code>{`ls -la suspect_src/assets/
file suspect_src/assets/*`}</code>
    </pre>
    <p>
      被塞的载荷常常是一个加密的 <code>.dat</code> 或 <code>.bin</code>，体积几十到几百 KB，<code>file</code> 命令识别不出来，运行时由对应的
      so 解密到内存再执行。做完这四步基本就能定性了。
    </p>

    <h2>四、实战：看懂别人 App 的一个功能是怎么做的</h2>
    <pre>
      <code>{`jadx -d out app.apk
grep -rln "SensorManager\\|TYPE_ACCELEROMETER" out/sources | head`}</code>
    </pre>
    <p>
      找到对应文件后在 jadx-gui 里直接读代码，判断逻辑、阈值、防抖策略一目了然。注意：这是学习实现思路，不是复制代码。理解原理后自己重新实现完全合法；把反编译出来的代码直接搬进自己的项目属于侵权。
    </p>

    <h2>五、实战：找回自己的源码或资源</h2>
    <pre>
      <code>{`apktool d myapp.apk -o recovered`}</code>
    </pre>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>能找回</th>
            <th>找不回</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>布局 XML、菜单、动画</td>
            <td>原始 Java / Kotlin 源码（只有反编译近似版）</td>
          </tr>
          <tr>
            <td>drawable 资源：图片、颜色、样式</td>
            <td>注释</td>
          </tr>
          <tr>
            <td>strings.xml 全部文案</td>
            <td>变量名（混淆后被改成 a、b、c）</td>
          </tr>
          <tr>
            <td>权限与组件结构</td>
            <td>第三方库的原始代码</td>
          </tr>
          <tr>
            <td>assets 里的原始文件</td>
            <td>构建配置、Gradle 文件</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>未混淆的 APK 用 jadx 反编译后可读性相当高，抢救业务逻辑基本够用，但需要预留手工整理的时间。</p>

    <h2>六、混淆与加固会让反编译难多少</h2>
    <h3>混淆（ProGuard / R8）</h3>
    <p>
      类名被改成 <code>a.b.c</code>，但逻辑结构还在，jadx 依然能读出完整流程，只是类名难认。判断方法很简单：反编译输出里出现大量单字母包名就是被混淆了。
    </p>
    <h3>加固（360 加固 / 梆梆 / 腾讯乐固）</h3>
    <p>
      加固后 <code>classes.dex</code> 几乎是空的，真正的代码加密在 <code>.so</code> 里运行时才解密到内存。特征是 dex 只有几百 KB 而
      App 有几十 MB，而且能看到 <code>libjiagu.so</code> 之类的文件。这类包静态分析只能看到壳，需要 Frida
      之类的动态工具才能继续，建议直接放弃，除非你在做专业安全分析。
    </p>

    <h2>七、法律与使用边界</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>行为</th>
            <th>定性</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>反编译自己的 App</td>
            <td>完全合法</td>
          </tr>
          <tr>
            <td>反编译学习思路，自己重写实现</td>
            <td>合法</td>
          </tr>
          <tr>
            <td>分析下载来的可疑 APK</td>
            <td>合法</td>
          </tr>
          <tr>
            <td>分析恶意样本</td>
            <td>合法且正当</td>
          </tr>
          <tr>
            <td>去广告、破解会员自己用</td>
            <td>违反用户协议，多数地区违法</td>
          </tr>
          <tr>
            <td>修改他人 App 后重新分发</td>
            <td>侵权</td>
          </tr>
          <tr>
            <td>修改后上架应用商店</td>
            <td>明确违法</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>反编译本身不违法，违不违法看你怎么用结果。工具是中性的，别把它当成免费拿别人劳动成果的通道。</p>

    <h2>八、常见问题</h2>
    <h3>反编译出来的代码能直接编译运行吗？</h3>
    <p>
      基本不能。反编译是有损的，控制流能读懂但语法细节、混淆后的引用、资源引用都会出问题。想改功能就在 smali
      层面改，改完必须重新打包签名：
    </p>
    <pre>
      <code>{`apktool b app_src -o modified.apk
keytool -genkey -v -keystore test.keystore -alias test -keyalg RSA -keysize 2048 -validity 10000
apksigner sign --ks test.keystore --ks-pass pass:123456 modified.apk`}</code>
    </pre>
    <p>
      注意重签名后和原版签名不同，无法覆盖安装，必须先卸载原版。另外手机上用 MT 管理器、NP
      管理器这类工具也能做基础的反编译和 smali 编辑，适合临时看看，正经分析还是用电脑。
    </p>

    <h2>小结</h2>
    <p>反编译 APK 的完整链条是：</p>
    <pre>
      <code>apksigner 验签 → aapt2 看权限 → apktool 拆资源 → jadx 读代码</code>
    </pre>
    <p>
      对普通用户，最有价值的是前两步：能快速判断一个下载来的包是不是原版。这比任何杀毒软件都靠谱，因为它是直接看事实，不是看黑名单。对开发者，jadx
      是最值得花时间熟悉的工具，它能在几秒内让你看懂一个 App 的技术选型和实现细节。工具就在那里，用它做什么取决于你。
    </p>
    <p>
      如果你只是需要从 Google Play 下载 APK 安装到设备上，可以用{" "}
      <Link href="/">gptoapk 的在线下载工具</Link>，走的仍然是 Play 官方分发链路，不需要额外信任任何第三方镜像站。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      抽屉里那台三年前的安卓机，扔了可惜，用又嫌卡。其实老设备的价值取决于你怎么定位它——当主力机它确实该淘汰了，但当备用机、监控机、播放器、下载机，它还有好几年寿命。这篇按&ldquo;能开机只是慢&rdquo;、&ldquo;卡到勉强能用&rdquo;、&ldquo;开不了机&rdquo;三档给方案。
    </p>
    <blockquote>
      <p>
        <strong>核心结论：</strong>老手机的瓶颈是存储速度和内存，不是 CPU。任何清理软件都碰不到真正的瓶颈，只有减少后台常驻、关掉动画、补上系统更新才有实质提升。
      </p>
    </blockquote>

    <h2>第零步：先测，再改</h2>
    <p>
      连续点击七次版本号打开开发者选项，然后开启&ldquo;显示 CPU 使用情况&rdquo;，用两天观察叠加层：
    </p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>现象</th>
            <th>真正的瓶颈</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>内存条常年 90% 以上变红</td>
            <td>内存不足，应用被反复杀掉重载</td>
          </tr>
          <tr>
            <td>滑动一顿一顿但内存正常</td>
            <td>GPU 或存储慢</td>
          </tr>
          <tr>
            <td>打开 App 要等 3&ndash;5 秒，进去了反而顺</td>
            <td>eMMC 随机读写退化，硬件问题</td>
          </tr>
          <tr>
            <td>电量掉得异常快，待机也发热</td>
            <td>电池老化触发降频</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>内存常年红是最常见也最好解决的。可以用 adb 进一步确认：</p>
    <pre>
      <code>{`adb shell dumpsys meminfo | head -20
adb shell cat /proc/meminfo | grep -E "MemTotal|MemAvailable"
adb shell dumpsys battery | grep -E "level|health"`}</code>
    </pre>
    <p>4 GB 内存的机器 MemAvailable 掉到 300 MB 以下，就是你要处理的问题。</p>

    <h2>第一档：能开机，只是慢</h2>

    <h3>方案 1：减少后台常驻（最有效）</h3>
    <p>
      老机内存只有 3&ndash;4 GB，现代 App 一个就吃 500 MB。国产 ROM 在&ldquo;设置 → 应用 → 自启动管理&rdquo;里有批量开关，一次全关，只留微信、支付宝和常用输入法。
    </p>
    <pre>
      <code>{`设置 → 应用管理 → 选择 App → 电池 → 限制后台活动
设置 → 权限管理 → 自启动 / 应用间关联启动`}</code>
    </pre>
    <p>
      重点收拾购物类、短视频类、新闻类和国产工具类。社交软件不能关（会收不到消息），但可以关掉&ldquo;应用间关联启动&rdquo;——正是这个机制让&ldquo;关掉应用&rdquo;变得毫无意义，别的应用会把它拉起来。
    </p>
    <p>
      <strong>实测效果：</strong>4 GB 设备、十几个用户应用的情况下，可用内存通常能从 250 MB 涨到 1.1 GB
      左右。这是清理软件做不到的。
    </p>

    <h3>方案 2：关掉三个动画缩放</h3>
    <pre>
      <code>{`设置 → 开发者选项 →
  窗口动画缩放      → 关闭
  过渡动画缩放      → 关闭
  动画程序时长缩放  → 关闭`}</code>
    </pre>
    <p>
      这不是心理作用。老 GPU 渲染一帧过渡动画的耗时是新机的 3&ndash;5 倍，这部分延迟是真实存在的。关掉之后每次页面切换都省下这段时间，体感提升非常明显，代价只是视觉上跳一下。
    </p>

    <h3>方案 3：把关键 App 降级</h3>
    <p>
      新版本 App 按新硬件优化，在老机上就是灾难。流程是：先导出数据（尤其是聊天备份）→ 用{" "}
      <code>apksigner verify --print-certs</code> 记下当前版本的签名指纹 → 下载目标旧版本并<strong>验证签名一致</strong>
      → 卸载当前版本 → 装旧版本 → <strong>关掉应用商店对该 App 的自动更新</strong>。最后一步最容易被漏掉，不关的话几小时内就被推回新版。
    </p>
    <p>值得降级的通常是：微信（8.0.30 左右是老机分水岭）、淘宝、抖音。往回退一到两个大版本通常就有明显差别。</p>

    <h3>方案 4：换一个轻量桌面</h3>
    <p>
      系统桌面往往是仅次于输入法的第二大常驻组件。换 Nova Launcher 7.x、KISS Launcher 或 Niagara
      这类轻量桌面，通常能回收 100&ndash;200 MB 内存，同时降低桌面滑动的重绘成本。
    </p>

    <h3>方案 5：兜底——恢复出厂设置</h3>
    <pre>
      <code>先全量备份 → 设置 → 系统 → 重置 → 恢复出厂设置</code>
    </pre>
    <p>
      长期使用后 <code>/data</code> 分区碎片化、系统缓存膨胀，恢复出厂能一次性洗掉。<strong>关键是不要恢复全部备份</strong>，只装真正需要的
      App——很多人一恢复就把所有垃圾装回来了，一周内又回到原点。
    </p>

    <h2>第二档：卡到勉强能用，转专用机</h2>
    <p>如果它已经不适合当主力机，别硬撑，换个用途价值立刻回来。</p>

    <h3>用途 1：家庭监控 / 行车记录仪</h3>
    <p>
      装 IP Webcam 或 Alfred，就变成网络摄像头。放在家里看宠物、看门口，或者装在车上当行车记录仪。要注意长期插电会让电池鼓包，建议使用充电上限功能或干脆接受定期换电池，不要让密封状态下的手机长期满电挂着。
    </p>

    <h3>用途 2：离线播放器 / 电视盒子</h3>
    <p>
      VLC 或 MX Player 加一个 USB-C 转 HDMI 转接头，就成了一台电视盒子。老手机的屏幕素质和视频解码能力往往比同价位的盒子强。
    </p>

    <h3>用途 3：下载机 / SSH 终端</h3>
    <p>
      ADM 挂机下载大文件；Termux 跑真正的脚本——Python、Node、curl 都能原生运行，配合
      termux-job-scheduler 可以做定时任务。一台三四年前的中端机跑爬虫完全够用。
    </p>

    <h3>用途 4：给孩子或长辈的简易机</h3>
    <p>删掉应用商店和浏览器，只留通讯和相册，锁住安装权限。剩下的就是一台怎么都装不进东西的安全设备。</p>

    <h2>第三档：开不了机</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>现象</th>
            <th>可能原因</th>
            <th>处理</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>完全黑屏，插电无反应</td>
            <td>电池报废 / 主板故障</td>
            <td>换电池测试，不行就放弃</td>
          </tr>
          <tr>
            <td>有充电图标，按电源无反应</td>
            <td>电源键损坏</td>
            <td>长按 30 秒强制重启</td>
          </tr>
          <tr>
            <td>卡在开机 Logo</td>
            <td>系统损坏</td>
            <td>Recovery 清缓存，再不行双清</td>
          </tr>
          <tr>
            <td>只能进 Recovery / Fastboot</td>
            <td>系统崩溃</td>
            <td>刷官方固件</td>
          </tr>
          <tr>
            <td>开机后反复重启</td>
            <td>电池老化或系统问题</td>
            <td>先换电池，再考虑刷机</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      按键组合各品牌不同：三星是电源 + 音量加 + Bixby，多数机型电源 + 音量减进 Fastboot、电源 + 音量加进
      Recovery。先试 <code>wipe cache</code>，再不行的 <code>wipe data</code>。
    </p>
    <p>
      刷机务必只用<strong>官方固件和官方工具</strong>（三星 Odin、小米 MiFlash、Pixel 用 fastboot）。第三方&ldquo;纯净版&rdquo;&ldquo;优化版&rdquo;ROM
      站是恶意固件的高发区，一个被改过的系统镜像是最深层的失陷，比装错一个 App 严重得多。
    </p>

    <h2>软件救不了的三件事</h2>
    <h3>1. 电池容量衰减</h3>
    <p>
      锂电池 500 次循环后容量掉到 80%。很多&ldquo;手机变慢&rdquo;其实是电池老化导致高负载时电压塌陷，进而触发降频。换一块电池的成本通常只有换新机的
      5%，却是本文所有措施里体感提升最大的一项。
    </p>
    <h3>2. eMMC 随机读写退化</h3>
    <p>
      闪存性能不会恢复。唯一能做的缓和措施是<strong>保持至少 20% 空闲空间</strong>——存储写满时写放大效应会让延迟成倍上升。
    </p>
    <h3>3. 散热结构</h3>
    <p>老机器的散热设计本就弱，加上电池老化，同样负载下更早降频。软件改不了机身。</p>

    <h2>该修还是该扔</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>情况</th>
            <th>建议</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>电池不行，其他正常</td>
            <td>换电池，性价比最高的一项投入</td>
          </tr>
          <tr>
            <td>存储掉速严重，日常使用卡</td>
            <td>转专用机，别当主力</td>
          </tr>
          <tr>
            <td>系统崩溃但硬件好</td>
            <td>刷官方固件（先备份）</td>
          </tr>
          <tr>
            <td>屏幕碎 + 电池差 + 存储慢</td>
            <td>放弃，当零件或回收</td>
          </tr>
          <tr>
            <td>主板故障 / 进水</td>
            <td>基本放弃，除非数据不可替代</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      <strong>数据最重要。</strong>如果里面有珍贵照片，就算机器报废也要先想办法救数据——换同型号主板、找专业数据恢复，通常比想象中便宜，也远比那些照片便宜。
    </p>

    <h2>小结</h2>
    <p>
      老安卓手机的出路，本质是重新定义它的角色：还想日常用就关后台自启动、关动画、降级 App、换电池；不想当主力就转监控机、下载机、播放器、Termux
      服务器；开不了机就 Recovery 清数据、刷官方固件；硬件崩了就看数据价值，别在没价值的东西上花钱。
    </p>
    <p>
      一台三四年前的机器，性能其实比 2018 年的旗舰还强。它变慢的原因里，一半是软件越来越重，另一半是电池和闪存老化。前者靠设置能救，后者靠换件能救，真正救不回来的很少。
    </p>
  </>
);

export const zhPosts20261021B: BlogPostEntry[] = [
  {
    slug: "reverse-engineering-apk-intro",
    title: "安卓 APK 反编译入门：从拆包到看懂代码，以及你能用它做什么",
    description:
      "APK 就是一个 zip。四次命令判断一个包是否被改过、五步流程看懂别人的实现思路、混淆与加固的区别，以及反编译的法律边界。附 apksigner、aapt2、apktool、jadx 四件套用法。",
    date: "2026-10-21",
    readTime: "10 min read",
    tags: ["android", "apk", "反编译", "安全", "jadx"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "old-android-phone-revive-guide",
    title: "老安卓手机救活指南：从能开机到还能用，分三档方案",
    description:
      "老手机的瓶颈是内存和闪存，不是 CPU。按「能开机只是慢 / 卡到勉强能用 / 开不了机」三档给出可操作方案：关自启动、关动画、降级App、转专用机、刷官方固件，以及换电池这个性价比最高的动作。",
    date: "2026-10-21",
    readTime: "9 min read",
    tags: ["android", "性能优化", "旧手机", "教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261021BList = toList(zhPosts20261021B);
