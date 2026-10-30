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
    question: "Facebook 的安卓包名是哪个？",
    answer:
      "主应用是 com.facebook.katana，独立的聊天应用 Messenger 是 com.facebook.orca，轻量版是 com.facebook.lite。想装信息流主应用，认准 katana；装错包名会出现「装上了但没有你要的功能」的情况。",
  },
  {
    question: "下载 Facebook APK 应该选哪个架构？",
    answer:
      "选 arm64-v8a。2019 年后的手机几乎都是 64 位，新版 Facebook 对 32 位（armeabi-v7a）的支持正在收缩，装了 32 位包在部分新机型上会直接「应用未安装」或装完闪退。",
  },
  {
    question: "安装时提示「与已安装的应用签名不一致」怎么办？",
    answer:
      "说明手机里已经有一个改包版本，只能先卸载再装，应用数据会丢失。卸载前确认账号密码可用。想避免这个问题，安装后用文件管理器备份包的来源，下次更新走同一个渠道。",
  },
  {
    question: "装上了但打开闪退是为什么？",
    answer:
      "大多是因为缺少 Google Play Services 的支持（推送、定位、账号相关能力）。没有 GMS 的设备上，Facebook Lite 明显更稳。装完能打开但登录卡住属于网络环境问题，反复重装解决不了。",
  },
  {
    question: "怎么快速判断下载到的 Facebook APK 是不是官方包？",
    answer:
      "用 keytool -printcert -jarfile facebook.apk 看签名证书，官方包的证书信息里应包含 Facebook 相关主体；如果是一个陌生公司名，或者证书有效期只有几天，基本可以确定是重签名过的改包。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "模拟器装 APK 一直提示「应用未安装」怎么办？",
    answer:
      "先查两个属性：用 unzip -l app.apk | grep 'lib/' 看 APK 里有哪些架构，再看模拟器的 Android 版本是否满足 minSdkVersion。x86 模拟器装只有 arm 库的包，需要开启 ARM 兼容层或换 arm64 系统镜像。",
  },
  {
    question: "装上了点开就闪退，怎么快速定位？",
    answer:
      "用 adb logcat -c 清空日志后再点开应用，grep AndroidRuntime 看第一条 FATAL 异常。ClassNotFoundException 指向缺 GMS，UnsatisfiedLinkError 指向架构不匹配，SecurityException 是权限没给。",
  },
  {
    question: "模拟器里应用提示「当前设备存在风险」是为什么？",
    answer:
      "这是应用主动检测到了模拟器环境（可通过 ro.kernel.qemu、传感器数量、GPU 型号等特征判断）。不建议为此做读写绕过：这类检测通常写在应用条款里，账号受影响的风险比换设备的成本更高。",
  },
  {
    question: "怎么在模拟器里同时登两个账号？",
    answer:
      "建两个独立实例，各自安装一份，不要在同一实例里反复卸载重装（登录态会全部丢失）。用 adb -s emulator-5554 install -r app.apk 指定实例安装，权限也要在每个实例里单独授予。",
  },
];

const ARTICLE1 = (
  <>
    <h1>Facebook APK 下载与安装：官方渠道、安装失败的排查顺序</h1>

    <p>
      Facebook 在国内应用商店基本搜不到，很多人是拿到一个 APK 文件后一步步踩坑：装上了打不开、打开一直转圈、登录被拦截，
      或者装完发现是几年前的旧版本。这篇把<strong>渠道选择、安装、启动</strong>三段分开讲，每一步给可验证的判断方法。
    </p>

    <p>
      <strong>一句话结论：</strong>优先用标注了 Facebook 官方签名的版本，认准包名 <code>com.facebook.katana</code>，
      装完先验签再登录——渠道不对，后面全是白费。
    </p>

    <h2>一、先确认你要装的是哪个 Facebook</h2>

    <p>Facebook 的安卓包名不止一个，装错是最常见的问题之一：</p>

    <ul>
      <li>
        <code>com.facebook.katana</code> — 主应用，绝大多数人要的是这个
      </li>
      <li>
        <code>com.facebook.orca</code> — 独立的聊天应用 Messenger，不含信息流
      </li>
      <li>
        <code>com.facebook.lite</code> — 轻量版，包小、耗电低，功能有删减
      </li>
    </ul>

    <p>
      在「设置 → 应用 → 应用信息」里可以看包名。装了 orca 却去找信息流，永远找不到。另外要留意架构：新版 Facebook 对 32 位的支持正在收缩，
      老机型装新包会直接「应用未安装」或者装完闪退。绝大多数 2019 年后的手机是 64 位，下载时选 <code>arm64-v8a</code>。
    </p>

    <h2>二、什么样的渠道算「官方」</h2>

    <p>
      Facebook 没有在国内上架 Google Play，也没有官方 APK 下载站。所以「官方」指的是<strong>签名是官方的</strong>，
      而不是「网页上有 Facebook logo」。按可信度排序：
    </p>

    <ol>
      <li>Google Play——自带签名校验，最省事</li>
      <li>APKMirror——公开原厂签名证书指纹，可以自行比对</li>
      <li>APKPure——版本全、有历史版本</li>
      <li>国内应用商店——有审核，但版本常滞后</li>
      <li>随便一个网盘链接——不要</li>
    </ol>

    <p>判断站点是否可靠看两点：<strong>是否公开签名指纹或哈希</strong>；<strong>是否提供历史版本</strong>。两个都没有的站点，拿到的包无法验证来源。</p>

    <h2>三、安装前验签（30 秒）</h2>

    <p>这一步能过滤掉绝大多数改包/夹带版本：</p>

    <pre>
      <code>{`keytool -printcert -jarfile facebook.apk | grep SHA256
apksigner verify --print-certs facebook.apk`}</code>
    </pre>

    <p>
      官方包的证书应包含 Facebook 相关主体信息。如果是一个陌生公司名，或者证书有效期只有几天（重签名工具的典型特征），直接删掉。
      再快速看一眼权限：
    </p>

    <pre>
      <code>{`aapt2 dump permissions facebook.apk`}</code>
    </pre>

    <p>
      主应用申请通讯录、定位属于正常，但出现「发送短信」这类权限要警惕——那是恶意样本更常见的特征。
    </p>

    <h2>四、安装失败的五种情况</h2>

    <p>
      <strong>1.「应用未安装」，无其他提示</strong> —— 最常见。原因排序：架构不匹配 &gt; 已有更高版本 &gt; 存储空间不足。
      先看手机 CPU 位数，再卸载旧版本重试。
    </p>
    <p>
      <strong>2.「解析包时出现问题」</strong> —— 文件不完整或被截断。重新下载；如果通过微信/QQ 传输，改用浏览器或数据线。
    </p>
    <p>
      <strong>3.「与已安装的应用签名不一致」</strong> —— 手机里已有改包版本，只能先卸载，数据会丢失。
    </p>
    <p>
      <strong>4. 安装成功但闪退</strong> —— 多半是依赖 Google Play Services 的能力。没有 GMS 的设备换 Lite 版通常更稳。
    </p>
    <p>
      <strong>5. 登录卡住 / 提示无法连接</strong> —— 这是网络环境问题，不是安装问题，别反复重装。
    </p>

    <h2>五、装完之后的必要设置</h2>

    <ul>
      <li>关闭应用商店的自动更新，手动更新更可控</li>
      <li>允许后台运行，否则收不到推送</li>
      <li>通讯录权限先拒后给，进应用后再按需授予</li>
    </ul>

    <h2>六、不推荐的做法</h2>

    <ul>
      <li>在模拟器里日常使用 Facebook——账号风控极严，新设备登录经常直接要求验证</li>
      <li>用所谓「免翻墙版」「国内可用版」——全部来自非官方渠道，账号安全没有保障</li>
      <li>用 XAPK 安装器装——Facebook 目前是单 APK，出现 XAPK 版本基本可以确定不是官方包</li>
    </ul>

    <p>
      如果你只是想拿官方包，通过 <Link href="/">gptoapk.com</Link> 解析 Google Play 链接可以直接得到商店的原始安装包，
      省掉来源判断这一步。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>安卓模拟器安装 APK：拖进去闪退怎么办（实测排查清单）</h1>

    <p>
      在模拟器里装 APK 按理说最简单——把文件拖进窗口，30 秒搞定。但实际踩的坑不少：装上了点开黑屏、提示「应用未安装」、
      或者提示「设备不兼容」。原因往往不在 APK 本身，而在<strong>模拟器的 Android 版本、CPU 架构、以及应用的反模拟器检测</strong>。
    </p>

    <p>这篇按「装不上」和「装上了打不开」两种情况分开讲，每条都有可验证的排查动作。</p>

    <h2>一、先搞清楚模拟器的三个关键属性</h2>

    <p>同一个 APK 在 BlueStacks 上能跑、在 Android Studio 模拟器上闪退，通常就是这三个属性之一不同：</p>

    <ul>
      <li>
        <strong>Android 版本</strong>（7.1 / 9 / 11 / 13 / 14）—— 应用设了 <code>minSdkVersion</code>，低于就拒装
      </li>
      <li>
        <strong>CPU 架构</strong>（x86_64 / arm64）—— 纯 arm 的 APK 在 x86 模拟器上装不上或极慢
      </li>
      <li>
        <strong>是否带 GMS</strong> —— 依赖 Google 服务的应用会闪退或登录失败
      </li>
    </ul>

    <p>这三点后面九成的判断都基于它。</p>

    <h2>二、装不上的三种情况</h2>

    <p>
      <strong>1.「应用未安装」或直接没反应</strong> —— 先看 APK 的架构要求：
    </p>

    <pre>
      <code>{`unzip -l app.apk | grep 'lib/'`}</code>
    </pre>

    <p>
      输出里只有 <code>lib/arm64-v8a/</code> 或 <code>lib/armeabi-v7a/</code>，说明是 ARM 包。x86 模拟器需要指令翻译层：
      BlueStacks 5 在「ABI 设置」里选 ARM 兼容；Android Studio 模拟器则要下载 <code>arm64</code> 系统镜像。
    </p>

    <p>
      <strong>2.「解析包时出现问题」</strong> —— 文件不完整、文件名带中文/特殊字符，或者其实是 XAPK / APKS（分包包体）。
      分包包体不能直接拖，要用 APKPure 客户端或 SAI 这类安装器。
    </p>

    <p>
      <strong>3. 提示 minSdkVersion 需要更高版本</strong> —— 模拟器 Android 版本太低。新建一个高版本实例（三分钟），
      或者找应用的历史版本。
    </p>

    <h2>三、装上了打不开：闪退排查顺序</h2>

    <p>
      <strong>第一步：看 logcat，别猜。</strong>
    </p>

    <pre>
      <code>{`adb logcat -c && adb logcat | grep -iE "AndroidRuntime|FATAL"`}</code>
    </pre>

    <p>然后点开应用，看第一条 FATAL 后面的异常名：</p>

    <ul>
      <li>
        <code>ClassNotFoundException: com.google.android.gms…</code> → 缺 GMS，换带 Google Play 的实例
      </li>
      <li>
        <code>UnsatisfiedLinkError: dlopen failed</code> → 架构不匹配，换 arm 镜像或装对应 ABI 的包
      </li>
      <li>
        <code>SecurityException: permission denied</code> → 权限未授予，用 adb 手动补
      </li>
      <li>无异常直接退出 → 应用主动检测到模拟器，见下文</li>
    </ul>

    <p>
      <strong>第二步：手动补权限并关闭电池优化。</strong>模拟器不会自动弹窗确认权限，应用可能直接退出：
    </p>

    <pre>
      <code>{`adb shell pm grant com.example.app android.permission.READ_EXTERNAL_STORAGE
adb shell pm grant com.example.app android.permission.ACCESS_FINE_LOCATION
adb shell dumpsys deviceidle whitelist +com.example.app`}</code>
    </pre>

    <p>
      <strong>第三步：确认是不是反模拟器检测。</strong>典型信号：启动画面一闪回到桌面、logcat 无异常；或者应用里提示
      「当前设备存在风险」。这类检测看的是 <code>ro.kernel.qemu</code>、传感器数量、电池状态、GPU 型号等硬件特征。
      <strong>不建议为此做读写绕过</strong>：绕过检测往往违反应用条款，账号受影响的概率比换设备更高。
    </p>

    <h2>四、几种常见搭配的实际效果</h2>

    <ul>
      <li>
        <strong>BlueStacks 5</strong> —— ARM 兼容层做得好，绝大多数 APK 能装；包大、占内存，部分应用能识别
      </li>
      <li>
        <strong>Android Studio AVD</strong> —— 最接近真机，排查开发问题用它；x86 镜像跑 arm 应用慢
      </li>
      <li>
        <strong>MuMu / 雷电</strong> —— 偏游戏优化，非游戏应用偶尔有权限问题
      </li>
      <li>
        <strong>Windows Subsystem for Android</strong> —— 已停止官方支持，不建议新上
      </li>
    </ul>

    <h2>五、多开场景的正确姿势</h2>

    <p>需要同时登两个账号时，别在同一实例里反复卸载重装（登录态全丢）。用独立实例 + adb 精确控制：</p>

    <pre>
      <code>{`adb -s emulator-5554 install -r app.apk
adb -s emulator-5556 install -r app.apk`}</code>
    </pre>

    <p>多开实例各自独立，数据互不影响。注意每个实例都要单独授予权限。</p>

    <h2>小结</h2>

    <ol>
      <li>装不上：先查 APK 架构（<code>unzip -l | grep lib/</code>）和模拟器 Android 版本</li>
      <li>装上了闪退：先看 logcat 的 FATAL 首行，八成能直接定位</li>
      <li>缺 GMS → 换 Google Play 镜像；架构不符 → 换 arm 镜像</li>
      <li>无异常退出且提示设备风险 → 反模拟器检测，别硬绕</li>
      <li>多开场景用独立实例 + adb install，不要反复覆盖安装</li>
    </ol>

    <p>
      模拟器排障的核心就一句：<strong>先拿到日志，再动手改配置</strong>。凭感觉换模拟器，往往换到第三个才发现问题是 APK 架构。
      如果你需要的是某个应用在真实设备上跑的官方包，通过 <Link href="/">gptoapk.com</Link> 解析 Google Play 链接比在模拟器里折腾更快。
    </p>
  </>
);

export const zhPosts20261030 = [
  {
    slug: "facebook-apk-download-install",
    title: "Facebook APK 下载与安装：官方渠道、安装失败的排查顺序",
    description:
      "Facebook 的包名不止一个，装错比装不上更常见。这篇讲清 katana / orca / lite 的区别、如何判断渠道是否可验证、安装前 30 秒验签，以及五种安装失败提示的对应解法。",
    date: "2026-10-30",
    readTime: "9 min read",
    tags: ["android", "apk", "facebook"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-emulator-apk-install",
    title: "安卓模拟器安装 APK：拖进去闪退怎么办（实测排查清单）",
    description:
      "模拟器里 APK 装不上或装上了闪退，原因往往不在 APK，而在 Android 版本、CPU 架构和反模拟器检测。附 logcat 定位表、补权限命令、多开安装方式，以及四种模拟器的实际效果对比。",
    date: "2026-10-30",
    readTime: "9 min read",
    tags: ["android", "apk", "模拟器", "排错"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261030List = toList(zhPosts20261030);
