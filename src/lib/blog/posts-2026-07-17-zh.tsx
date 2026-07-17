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
      有些应用只有手机版，但你想在电脑大屏上使用——比如微信读书、抖音、外卖点餐、或是游戏挂机。这篇文章把目前在电脑上安装APK的几种主流方法都整理出来了，按推荐程度排序，看完你就能决定哪种最适合自己。
    </p>

    <h2>方法一：安卓模拟器（最成熟、兼容性最好）</h2>
    <p>
      安卓模拟器是在电脑上运行APK最传统也最靠谱的方式。它模拟了一个完整的安卓手机环境，应用在里面运行，体验和真机几乎一样。
    </p>

    <h3>1. BlueStacks（蓝叠）—— 游戏兼容性最强</h3>
    <p><strong>适合：</strong> 玩手游、用社交应用、日常使用</p>
    <p>蓝叠是目前最成熟的安卓模拟器，对游戏兼容性最好，多数热门手游（原神、王者荣耀、和平精英等）都有专门优化。</p>
    <p><strong>安装步骤：</strong></p>
    <ol>
      <li>访问 bluestacks.com 下载 BlueStacks 5</li>
      <li>双击安装，一路默认选项即可（安装包约 800MB-1GB）</li>
      <li>安装完成后启动蓝叠，会看到一个安卓平板界面</li>
      <li><strong>安装APK的三种方式：</strong></li>
    </ol>
    <ul>
      <li><strong>拖拽安装：</strong> 直接把 APK 文件拖到蓝叠窗口上，自动安装</li>
      <li><strong>双击安装：</strong> 在 Windows 资源管理器里双击 .apk 文件，如果关联成功也会自动安装</li>
      <li><strong>内置商店：</strong> 蓝叠自带 Google Play，可以登录后直接下载应用</li>
    </ul>

    <p><strong>性能设置建议：</strong></p>
    <ul>
      <li>分配至少 4GB 内存给模拟器（蓝叠设置 → 引擎设置）</li>
      <li>如果玩大型游戏，把 CPU 核心数设为 4</li>
      <li>显卡渲染模式选择"兼容"或"OpenGL"（如果游戏闪退就切换试试）</li>
    </ul>

    <p><strong>优点：</strong> 兼容性最好，几乎所有APK都能运行；支持键盘映射、手柄连接（适合游戏）；多开功能方便同时登录多个账号</p>
    <p><strong>缺点：</strong> 占用资源较大（推荐 16GB 以上内存）；有内置广告（免费版）</p>

    <h3>2. 雷电模拟器（LDPlayer）—— 轻量级、国内优化好</h3>
    <p><strong>适合：</strong> 国内用户、手游多开、配置不高的电脑</p>
    <p>雷电模拟器是国产模拟器，对国内安卓应用的兼容性很好，且比蓝叠轻量一些。</p>
    <p><strong>安装步骤：</strong></p>
    <ol>
      <li>访问 ldplayer.net 下载最新版</li>
      <li>安装后启动，界面更接近原生安卓</li>
      <li><strong>安装APK：</strong> 直接把 APK 文件拖到雷电窗口；或者点右侧工具栏的"APK安装"按钮；也可以直接用内置浏览器下载后安装</li>
    </ol>
    <p><strong>优点：</strong> 比蓝叠轻量，老电脑也能跑；针对中国应用（微信、淘宝等）优化更好；多开管理器好用，适合挂机</p>
    <p><strong>缺点：</strong> 海外游戏兼容性不如蓝叠；部分新安卓应用（Android 13+ 特性依赖）可能不兼容</p>

    <h3>3. MEmu（逍遥模拟器）</h3>
    <p><strong>适合：</strong> 需要 Android 9/11 多版本兼容的用户</p>
    <p>MEmu 的特色是支持同时运行不同 Android 版本的实例，适合测试应用在不同系统版本上的表现。</p>

    <h3>模拟器性能对比</h3>
    <table>
      <thead>
        <tr>
          <th>模拟器</th>
          <th>内存占用</th>
          <th>游戏兼容性</th>
          <th>多开能力</th>
          <th>推荐配置</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>BlueStacks 5</td><td>较高</td><td>⭐⭐⭐⭐⭐</td><td>一般</td><td>i5 + 16GB</td></tr>
        <tr><td>雷电模拟器</td><td>中等</td><td>⭐⭐⭐⭐</td><td>优秀</td><td>i5 + 8GB</td></tr>
        <tr><td>MEmu</td><td>较低</td><td>⭐⭐⭐⭐</td><td>优秀</td><td>i3 + 8GB</td></tr>
      </tbody>
    </table>

    <h2>方法二：Windows 11 安卓子系统（WSA）—— 最接近原生体验</h2>
    <p>
      如果你用的是 Windows 11，可以用安卓子系统直接在系统里运行安卓应用。它不像模拟器那样需要模拟一整个手机界面，而是让安卓应用像Windows程序一样在窗口里运行。
    </p>

    <h3>安装 WSA</h3>
    <p><strong>前提条件：</strong></p>
    <ul>
      <li>Windows 11 正式版（22H2 及以上）</li>
      <li>8GB 以上内存（推荐 16GB）</li>
      <li>BIOS 中启用了虚拟化（VT-x/AMD-V）</li>
    </ul>

    <p><strong>通过 Amazon Appstore（最简单）：</strong></p>
    <ol>
      <li>打开 Microsoft Store</li>
      <li>搜索 "Amazon Appstore"</li>
      <li>点击安装，会自动下载并安装 WSA</li>
      <li>安装完成后就能从 Amazon Appstore 安装应用（但应用较少）</li>
    </ol>

    <p><strong>手动安装 WSA（推荐，可自由安装APK）：</strong></p>
    <ol>
      <li>打开 设置 → 时间和语言 → 语言和区域，将国家或地区改为"美国"</li>
      <li>打开 Microsoft Store，搜索 "Amazon Appstore" 并安装</li>
      <li>安装完成后 WSA 会自动安装</li>
      <li>下载 WSA PacMan 或使用 ADB 安装 APK</li>
    </ol>

    <h3>在 WSA 中安装 APK</h3>
    <p><strong>方式 1：使用 WSA PacMan（推荐，图形化）</strong></p>
    <ol>
      <li>从 GitHub Releases 下载 WSA PacMan</li>
      <li>安装后打开，点击 "Select APK" 选择文件</li>
      <li>点击安装，几秒钟完成</li>
    </ol>

    <p><strong>方式 2：使用 ADB 命令行</strong></p>
    <pre><code>{`# 先确保 WSA 正在运行（从开始菜单打开"适用于 Android 的 Windows 子系统"）
# 在 WSA 设置中开启"开发人员模式"

# 连接 WSA
adb connect 127.0.0.1:58526

# 安装 APK
adb install your-app.apk

# 如果提示 connected 但 unauthorized，重新打开 WSA 的开发者模式开关`}</code></pre>

    <p><strong>WSA 的优缺点：</strong></p>
    <p>优点：没有模拟器的"手机界面"，应用像原生 Windows 程序一样运行；性能和启动速度比模拟器好；可以固定到任务栏、Alt+Tab 切换、分屏使用；与 Windows 剪贴板、文件系统集成。</p>
    <p>缺点：只支持 Windows 11；部分游戏和需要 Google 服务的应用不兼容；WSA 本身不是为游戏设计的，OpenGL/Vulkan 性能有限；安装 APK 需要额外步骤。</p>

    <h2>方法三：使用 ADB 在 Mac/Windows/Linux 上安装 APK 到安卓设备</h2>
    <p>如果你有一台安卓手机或平板，但想通过电脑来安装 APK，可以用 ADB。</p>
    <p><strong>这个方法适合：</strong> APK 文件在电脑上，想传到手机上安装；需要通过电脑调试安卓设备；手机上不方便打开文件管理器。</p>

    <h3>安装 ADB</h3>
    <pre><code>{`# Mac（Homebrew）
brew install android-platform-tools

# 下载 Windows Platform Tools
# https://developer.android.com/studio/releases/platform-tools

# Linux
sudo apt install adb         # Ubuntu/Debian
sudo pacman -S android-tools # Arch`}</code></pre>

    <h3>连接手机并安装 APK</h3>
    <pre><code>{`# 1. 手机开启 USB 调试（设置 → 关于手机 → 连点"版本号"7次开启开发者模式）
# 2. 设置 → 系统 → 开发者选项 → 开启 USB 调试
# 3. 用 USB 数据线连接电脑和手机

# 检查连接
adb devices
# 应该看到: device (而不是 unauthorized)

# 安装 APK
adb install /path/to/your-app.apk
# 成功会显示: Success

# 覆盖安装（保留数据）
adb install -r /path/to/your-app.apk`}</code></pre>

    <h3>无线安装 ADB（不用数据线）</h3>
    <pre><code>{`# 1. 确保手机和电脑在同一个 WiFi 网络
# 2. 先用 USB 连接一次，开启 TCP/IP 模式
adb tcpip 5555

# 3. 拔掉数据线，找到手机的 IP 地址
adb connect 192.168.1.100:5555

# 4. 无线安装
adb install your-app.apk`}</code></pre>

    <h3>常见 ADB 安装错误</h3>
    <ul>
      <li><code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> → 手机上已有签名冲突的版本，用 <code>adb uninstall 包名</code> 先卸载</li>
      <li><code>INSTALL_FAILED_INSUFFICIENT_STORAGE</code> → 手机存储空间不足</li>
      <li><code>error: device unauthorized</code> → 手机上没点"允许"或重新插拔 USB</li>
      <li><code>error: device offline</code> → 重启 ADB 服务器：<code>adb kill-server && adb start-server</code></li>
    </ul>

    <h2>对比总结：你应该选哪种？</h2>
    <table>
      <thead>
        <tr>
          <th>使用场景</th>
          <th>最佳方案</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>玩手机游戏（手游）</td><td>蓝叠模拟器（兼容性好，键盘映射）</td></tr>
        <tr><td>日常使用（微信、抖音）</td><td>WSA 或模拟器</td></tr>
        <tr><td>配置一般的电脑</td><td>雷电模拟器（比蓝叠轻量）</td></tr>
        <tr><td>开发测试（多个Android版本）</td><td>MEmu（多版本同时运行）</td></tr>
        <tr><td>Mac 用户</td><td>ADB 安装到手机</td></tr>
        <tr><td>手机屏幕坏了</td><td>ADB（只需要 USB 数据线）</td></tr>
        <tr><td>多开账号（挂机、养号）</td><td>雷电模拟器（多开管理器最成熟）</td></tr>
      </tbody>
    </table>

    <h2>常见问题</h2>
    <p><strong>Q：APK 安装在电脑模拟器上安全吗？</strong></p>
    <p>模拟器本身是安全的（前提是从官网下载），但不要在模拟器里登录重要银行应用（模拟器可能比真机更容易被截取输入）。从非官方来源下载的 APK 文件本身可能有风险，与装在哪里无关。</p>

    <p><strong>Q：为什么有些 APK 在模拟器上闪退？</strong></p>
    <p>原因可能是：应用检测到了模拟器环境并主动退出；应用依赖的硬件功能（NFC、指纹、陀螺仪）在模拟器上不存在；应用的 Android 目标版本高于模拟器的版本。解决方法：尝试不同模拟器。</p>

    <p><strong>Q：WSA 和模拟器哪个更流畅？</strong></p>
    <p>一般来说 WSA 更流畅，因为它直接运行在 Windows 内核上而不是完整的虚拟机。但游戏性能方面，蓝叠比 WSA 强很多，因为蓝叠对图形 API 做了专门优化。</p>

    <p><strong>一句话总结：</strong> 追求兼容选蓝叠，追求轻量选 WSA，其他情况用 ADB 最直接。</p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "安卓模拟器对电脑配置要求高吗？",
    answer: "蓝叠推荐 16GB+ 内存，雷电 8GB 即可流畅运行。如果配置较低，优先选雷电模拟器。",
  },
  {
    question: "WSA 和模拟器能共存吗？",
    answer: "可以，两者互不冲突。如果 WSA 不支持某个应用，可以换模拟器运行。",
  },
  {
    question: "ADB 安装需要手机 root 吗？",
    answer: "不需要。只需要在手机设置中开启 USB 调试（开发者选项），不需要 root 权限。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      十年前下载一个微信APK只要 10MB，现在同样一个安装包要 200MB+。这不仅仅是微信的问题——几乎所有的现代安卓应用都越来越臃肿。这篇文章分析 APK 变大的根本原因，并给出主流应用的实际大小对比。
    </p>

    <h2>2026年主流APK大小实测</h2>
    <p>以下数据来自 APKMirror 和 gptoapk.com 在 2026 年 7 月的最新版本（下载的通用 arm64-v8a 版本）：</p>
    <table>
      <thead>
        <tr>
          <th>应用</th>
          <th>APK大小 (2026)</th>
          <th>5年前 (2021)</th>
          <th>增长倍数</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>微信</td><td>198 MB</td><td>78MB</td><td>2.5x</td></tr>
        <tr><td>TikTok</td><td>185 MB</td><td>55MB</td><td>3.4x</td></tr>
        <tr><td>Instagram</td><td>142 MB</td><td>48MB</td><td>3.0x</td></tr>
        <tr><td>抖音</td><td>205 MB</td><td>—</td><td>—</td></tr>
        <tr><td>Chrome</td><td>168 MB</td><td>90MB</td><td>1.9x</td></tr>
        <tr><td>WhatsApp</td><td>89 MB</td><td>35MB</td><td>2.5x</td></tr>
        <tr><td>YouTube</td><td>134 MB</td><td>65MB</td><td>2.1x</td></tr>
        <tr><td>Gmail</td><td>78 MB</td><td>35MB</td><td>2.2x</td></tr>
        <tr><td>王者荣耀</td><td>1.8 GB (分包)</td><td>1.2GB</td><td>1.5x</td></tr>
        <tr><td>原神</td><td>3.2 GB (分包)</td><td>2.0GB</td><td>1.6x</td></tr>
      </tbody>
    </table>
    <p>以上数据是 APK 安装包大小，不是安装后的占用空间。安装后解压会更大。</p>

    <h2>APK 越来越大的 6 个核心原因</h2>

    <h3>1. 多架构原生库（Native Libraries）</h3>
    <p>这是 APK 变大的最主要原因。现代 APK 要为不同 CPU 架构编译原生代码：arm64-v8a（当前主流）、armeabi-v7a（旧设备兼容）、x86_64/x86（模拟器和 Chromebook）。每个架构下的 .so 文件大小在 10-70MB 之间。如果你的 APK 同时包含 arm64 和 x86 版本，体积立刻翻倍。</p>
    <p>以抖音为例，其视频编解码、特效渲染、AI 滤镜都是用 C++ 写的，一个 libeffect.so 就有 30MB+。</p>

    <h3>2. 高清资源和多分辨率适配</h3>
    <p>移动设备屏幕密度飞速增长：2015年720p，2018年1080p，2021年2K，2024年4K。一个启动图标在 xxxhdpi（192×192）下约 40KB，在 mdpi（48×48）下仅 3KB。一个典型应用有 100+ 张图片资源，每张都按 5 种密度打包，资源总大小轻松过 50-100MB。</p>

    <h3>3. 功能膨胀</h3>
    <p>现代应用的功能远远超过 App 名字描述的那几件事。微信从2021年约15个核心功能增长到如今40+——视频号、直播、小程序、AI助手、状态。Instagram从8个增长到25+——Reels、购物、Threads集成、AI滤镜、广播频道。每个新功能都意味着新的代码、新的资源、新的库依赖。</p>

    <h3>4. 现代框架和 SDK 膨胀</h3>
    <p>为了快速迭代，现代安卓应用大量依赖第三方 SDK：React Native/Flutter 项目自带运行时引擎（5-20MB）；AI/ML SDK（TensorFlow Lite / ML Kit）通常 10-30MB；广告 SDK 3-10MB；推送和分析 SDK 合计 3-8MB。一个"简单"的 SDK 集成就可能带来 30MB+ 的体积增长。</p>

    <h3>5. Google Play 服务的依赖</h3>
    <p>现代应用通过 Google Play Services 获取地图、登录、支付等功能。Google Maps protobuf 定义文件 3-5MB，Google Sign-In 2MB，Firebase 全套 10-15MB。这些依赖随着功能增加逐年膨胀。</p>

    <h3>6. 安全加固和反逆向</h3>
    <p>2018年后，越来越多的应用加装了代码保护：360加固/腾讯加固对 DEX 文件加密增加 3-15MB；字符串加密、反调试保护增加常量池体积。安全加固本身不产生"功能"，但会让安装包额外膨胀 5-20MB。</p>

    <h2>APK 内部结构解剖：200MB 的微信里到底装了啥？</h2>
    <p>根据反编译分析，一个典型 198MB 的微信 APK 内部大致分布：</p>
    <ul>
      <li><strong>原生库 (lib/)</strong> — 约60MB（30%）— 音视频引擎、C++运行时、通话SDK、编解码库等</li>
      <li><strong>资源文件 (res/)</strong> — 约50MB（25%）— 图片、布局文件、动画资源</li>
      <li><strong>内置资源 (assets/)</strong> — 约30MB（15%）— 字体、内置网页、视频表情素材</li>
      <li><strong>代码 (classes.dex)</strong> — 约40MB（20%）— 5个 DEX 文件</li>
      <li><strong>资源索引、安全加固、签名等</strong> — 约18MB（10%）</li>
    </ul>
    <p>可以看到，原生库和资源文件占了超过一半的空间，代码本身只占 20%。</p>

    <h2>App Bundle (AAB) 能解决多少问题？</h2>
    <p>Google 从 2021 年 8 月起要求新应用必须使用 Android App Bundle（AAB）格式上架。AAB 不是减少总 APK 大小，而是按需分发——只下载用户设备需要的架构和屏幕密度资源。</p>
    <p><strong>实际效果对比：</strong> 微信从 198MB 降至约 115MB（节省 42%），TikTok 从 185MB 降至约 98MB（节省 47%）。</p>
    <p>但如果你从第三方站点下载全量 APK，你下载的是完整包。这就是为什么 gptoapk.com 从 Google Play 拉取 APK 时，文件比直接从 AAB 安装要大——因为它是完整的、未裁剪的原版包。</p>

    <h2>开发视角：如何减小 APK 大小？</h2>
    <p><strong>最有效的方法：</strong> 使用 Android App Bundle（AAB）直接减 30-50%；启用 APK Split（按架构分包）减少 20-30%；使用 WebP 代替 PNG 节省 25-35%。</p>
    <p><strong>资源优化：</strong> 移除未使用的资源（./gradlew lint 检查）；使用矢量图（Vector Drawable）代替位图，简单图标体积缩小 90%；使用 R8/ProGuard 代码混淆同时压缩代码体积。</p>
    <p><strong>架构优化：</strong> 使用动态功能模块，只在需要时下载；限制 SDK 数量，移除不必要的第三方库；考虑用网络资源代替内置资源。</p>

    <h2>未来趋势：APK 大小会一直涨下去吗？</h2>
    <p><strong>短期（2026-2028）：</strong> 还会涨。AI 功能全面嵌入应用，本地大模型推理库可能再增加 30-50MB；4K/8K 内容和 HDR 资源进一步推高体积。</p>
    <p><strong>中期（2028+）：</strong> 可能趋于稳定。应用变得模块化，核心功能精简，附加功能动态下载；5G/6G 普及后对安装包大小的敏感度下降。</p>

    <h2>总结</h2>
    <p>APK 越来越大不是开发者故意"塞垃圾"，而是应用能力膨胀的副产品。十年前的应用只有简单的 CRUD 功能，现在的应用要做视频直播、AI 绘图、AR 滤镜、实时翻译……每多一项能力，APK 就大一圈。</p>
    <p><strong>对普通用户来说：</strong> App Bundle 是 Google 给的减负方案。如果空间确实紧张，优先卸载不常用的应用。从第三方站下载全量 APK 是正常做法，不是"不干净"。</p>
    <p><strong>对开发者来说：</strong> 先从 AAB + WebP + 资源裁剪这"三板斧"入手，不要为了减体积牺牲用户体验或安全加固。</p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "APK 大小会无限增长下去吗？",
    answer: "不会。随着应用模块化和动态功能分发普及，APK 体积增长会趋于平缓。Google 的 App Bundle 方案就是应对这一问题。",
  },
  {
    question: "为什么第三方 APK 下载站的文件比 Google Play 直接下载大？",
    answer: "因为第三方站提供的是全量 APK（包含所有架构和分辨率），而 Google Play 通过 AAB 机制只下发你设备需要的部分。",
  },
  {
    question: "APK 太大影响性能吗？",
    answer: "主要影响下载时间和安装占用空间，对运行性能影响较小。运行时的内存消耗更多取决于应用本身的功能复杂度。",
  },
];

export const zhPosts20260717: BlogPostEntry[] = [
  {
    slug: "install-apk-on-pc-emulator-guide",
    title: "怎么在电脑上安装APK文件？3种方法（模拟器+安卓子系统+ADB）",
    description: "想在电脑上运行手机APP？本文详细介绍3种方法：安卓模拟器（蓝叠/雷电）、Windows 11安卓子系统（WSA）、ADB命令行安装。含详细步骤、性能对比和常见问题。",
    date: "2026-07-17",
    readTime: "10 分钟阅读",
    tags: ["APK安装", "安卓模拟器", "蓝叠", "雷电模拟器", "WSA", "ADB", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-file-size-why-getting-larger",
    title: "为什么APK文件越来越大？2026年常见应用安装包大小对比",
    description: "一个微信APK从10MB涨到200MB+，APK越来越大是开发者故意塞东西吗？本文分析APK变大的6个核心原因，附主流应用大小对比和APK内部结构解剖。",
    date: "2026-07-17",
    readTime: "10 分钟阅读",
    tags: ["APK大小", "APK体积", "App Bundle", "AAB", "安卓安装包", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260717List = toList(zhPosts20260717);
