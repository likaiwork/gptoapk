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

const ARTICLE = (
  <>
      <p>从第三方渠道装好的游戏，插上蓝牙手柄后能连上、系统里也能看到手柄图标，但一进游戏按键全乱：摇杆推了人物不动，AB 键反着来，扳机没反应，或者干脆只能用屏幕虚拟按键。换了个手柄还是一样，于是以为是「APK 是盗版/阉割版」。</p>
      <p>多数情况下和 APK 正版与否无关。Android 的手柄链路是分层的：蓝牙/USB 连接 → HID 描述符解析 → 输入事件上报（<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">MotionEvent</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">KeyEvent</code>） → 游戏自己的映射表。任何一层断了，表现出来都是「手柄没反应」。而侧载场景特别容易踩到的坑是：<strong>游戏内映射表是按包名 + 签名绑定的</strong>，换了安装来源，映射配置默认不继承；再加上从应用商店外拿到的包可能是独显版（无手柄支持）或缺失游戏手柄库。</p>
      <p>下面按四层拆开，每层给可以直接照做的检查动作。</p>
      <h2>一、先分清四种「手柄不生效」</h2>
      <p>不同的现象对应不同的层，别一上来就重装游戏：</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">现象</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">最可能出问题的层</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">首个检查动作</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">手柄连上了，但游戏里完全无反应</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">输入上报 / 游戏支持</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">getevent</code> 看有没有事件</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">按键有反应但错乱（AB 互换、摇杆方向反）</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">HID 描述符 / 映射表</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dumpsys input</code> 看手柄类型</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">只有部分键（扳机、十字键）失效</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">HID 描述符解析</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">厂商模式切换（XInput/DInput）</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">能玩但只能用虚拟按键界面</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">游戏主动检测手柄</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">游戏设置里开启手柄</td></tr></tbody>
      </table></div>
      <h2>二、第一步：确认系统层面收到了输入</h2>
      <p>把手柄连上后，在电脑上用 adb 抓原始输入事件：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell getevent -lt"}</code></pre>
      <p>然后按手柄上的键。如果终端刷出一行行 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">EV_KEY</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">EV_ABS</code>，说明<strong>系统已经收到输入</strong>，问题在游戏侧；如果毫无输出，问题在连接层（蓝牙配对、OTG 供电、手柄没进对模式）。</p>
      <p>再看系统把这台设备识别成了什么：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell dumpsys input | grep -A 20 -i \"gamepad\\|joystick\""}</code></pre>
      <p>重点看两件事：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Source 是否含 `SOURCE_JOYSTICK` 或 `SOURCE_GAMEPAD`</strong>。如果显示成 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SOURCE_KEYBOARD</code>，说明系统把它当键盘了——这时游戏只能用「键盘映射」的方式接，很多手游根本不认。</li>
        <li><strong>设备名与 VendorID/ProductID</strong>。同一个手柄在不同配对方式下（蓝牙 vs USB 线）可能被识别成两个不同设备，而游戏的映射表按设备名保存，换了名字就套不上旧映射。</li>
      </ul>
      <h2>三、第二步：手柄模式要切对</h2>
      <p>绝大多数第三方手柄有两种模式：<strong>XInput（安卓/PC 标准）</strong> 和 <strong>DInput（老式直连）</strong>，通常靠长按某个组合键（如 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">X + Home</code>）切换。XInput 模式下系统给出的是标准的手柄布局，DInput 模式下部分按键会被映射成普通键值。</p>
      <p>判断方法：在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dumpsys input</code> 里如果看到大量 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">KEYCODE_BUTTON_1..16</code> 之外的普通键值（如 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">KEYCODE_A</code>、<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">KEYCODE_ENTER</code>），基本就是 DInput 模式。切到 XInput 后重新配对，往往一次性解决「扳机没反应」「十字键当摇杆」这类问题。</p>
      <h2>四、第三步：映射表不会跟着 APK 走</h2>
      <p>这是侧载最容易被忽略的一点。很多游戏（尤其带官方映射或支持外设的游戏）把映射配置存在：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"/sdcard/Android/data/<包名>/files/"}</code></pre>
      <p>或者内部存储的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">shared_prefs</code> 里。而这个目录是<strong>按包名 + 签名隔离</strong>的。也就是说：</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>从应用商店装的、和从第三方站下的，如果是同包名但<strong>签名不同</strong>，系统会当成两个不同应用，映射配置自然不共享；</li>
        <li>卸载重装、或者换了一个签名不一致的版本覆盖安装，配置目录会被清空或新建。</li>
      </ul>
      <p>验证包名与签名是否和原来的一致：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages | grep -i 关键字\nadb shell pm path <包名>"}</code></pre>
      <p>如果确实是换了渠道，最省事的办法是<strong>在游戏内重新走一遍手柄映射向导</strong>，而不是去移植配置文件（签名不一致时移植还可能触发校验失败）。</p>
      <p>还要确认游戏的存储权限没被挡：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell dumpsys package <包名> | grep -i \"storage\\|MANAGE_EXTERNAL\""}</code></pre>
      <p>部分游戏把映射文件写到外部存储，如果没有 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">MANAGE_EXTERNAL_STORAGE</code> 或对应分区权限，写入失败会让映射「看起来保存了，实际没生效」。</p>
      <h2>五、第四步：确认这版包真的支持手柄</h2>
      <p>最后才轮到怀疑这个 APK 本身。检查包里有没有手柄相关库或配置：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"unzip -l app.apk | grep -iE \"gamepad|joystick|controller|input\"\naapt dump badging app.apk | grep -i \"feature\\|uses-permission\""}</code></pre>
      <p>常见情况是下了「精简版」「去广告版」「渠道定制版」，这类包的 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">lib/</code> 里可能删掉了手柄支持相关的 so，或者 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">AndroidManifest.xml</code> 里少了 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">&lt;uses-feature android:name=&quot;android.hardware.gamepad&quot;&gt;</code>。这种缺失没法靠设置补回来，只能换回官方完整包。</p>
      <p>另外注意 ABI 是否匹配：如果手机是 arm64，而包里只带了 armv7 的 so，游戏可能整体能跑但外设相关模块加载失败。</p>
      <h2>六、状态速查</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">检查结果</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">结论</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">下一步</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">getevent</code> 无任何输出</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">连接层问题</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">重配蓝牙 / 换成 OTG 直连</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">有输出但 Source=KEYBOARD</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">手柄在 DInput 模式</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">切 XInput 后重配</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Source 正常、游戏无反应</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">映射表或游戏支持问题</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">游戏内重新映射</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">部分按键失效</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">描述符解析不全</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换模式或换手柄</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包内无手柄相关库</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">包被精简</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">换官方完整包</td></tr></tbody>
      </table></div>
      <h2>七、常见问题</h2>
      <p><strong>Q1：手柄在系统设置里能校准，游戏里却不动？</strong></p>
      <p>系统校准走的是标准输入通道，游戏用的是自己的读取逻辑。能校准说明底层没问题，重点看游戏设置里是否开了「手柄」开关，以及映射表是否为空。</p>
      <p><strong>Q2：同一个手柄，别的游戏能用，这个游戏不行？</strong></p>
      <p>这就是典型的「游戏支持」问题，而不是手柄问题。看该游戏是否在设置里提供了外设选项，或者它是否只支持特定型号。</p>
      <p><strong>Q3：换了一个渠道的安装包后映射全丢了？</strong></p>
      <p>签名不同会被系统当成另一个应用，配置目录隔离。重新在游戏内映射一次即可，不要试图直接拷贝旧配置文件。</p>
      <p><strong>Q4：摇杆漂移 / 轻微移动就触发？</strong></p>
      <p>这是硬件死区问题，不是映射问题。多数游戏设置里有死区（deadzone）调节，调大即可；系统层面也可以在手柄固件里校准。</p>
      <h2>总结</h2>
      <p>「侧载游戏用手柄没反应」不是单一故障，而是连接层、模式层、映射层、包内容四层里某一层断了。排查顺序固定：<strong>先用 `getevent` 证明系统收到了输入，再用 `dumpsys input` 看它被识别成什么设备，接着确认手柄模式、再到游戏内重建映射，最后才检查这个 APK 是否被精简</strong>。这四步走完，绝大多数「手柄不生效」都能定位到具体原因。</p>
  </>
);

export const zhPosts20261123A = [
  {
    slug: "sideloaded-game-controller-buttons-not-mapped",
    title: "侧载 APK 游戏手柄按键映射不生效：从输入上报到游戏内映射的四层排查",
    description: "从第三方渠道装好的游戏，插上蓝牙手柄后能连上、系统里也能看到手柄图标，但一进游戏按键全乱：摇杆推了人物不动，AB 键反着来，扳机没反应，或者干脆只能用屏幕虚拟按键。换了个手柄还是一样，于是以为是「APK 是盗版/阉割版」。",
    date: "2026-11-23",
    readTime: "6 min read",
    tags: ["游戏手柄","HID描述符","getevent","adb","故障排查"],
    content: ARTICLE,
  },
];

export const zhPosts20261123AList = toList(zhPosts20261123A);
