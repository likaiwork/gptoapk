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

const CODE = "bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono";
const PRE = "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm";
const TH = "border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900";
const TD = "border border-gray-200 dark:border-gray-700 px-3 py-2";

const RESUME_ARTICLE = (
  <>
    <p>一个 200MB 的 APK，下到 150MB 时切出去接了通电话，回来一看：进度条清零，从头再来。更气人的是——重下到同样的位置，又断了。</p>
    <p>这类问题的关键只有一个：<strong>续传是服务端和客户端双方配合的结果</strong>。服务器要支持 <code className={CODE}>Range</code> 请求，下载器要真的去用；任何一方缺失，剩下的路只能从头走。</p>

    <h2>续传的技术前提：HTTP Range</h2>
    <p>正常下载是「把整个文件给我」。续传是「从第 N 个字节开始给我」：</p>
    <pre className={PRE}><code>{`GET /app-release.apk HTTP/1.1
Host: example.com
Range: bytes=157286400-`}</code></pre>
    <p>服务器如果支持，返回：</p>
    <pre className={PRE}><code>{`HTTP/1.1 206 Partial Content
Content-Range: bytes 157286400-209715199/209715200
Content-Length: 52428800`}</code></pre>
    <p>三个信号必须同时满足才能续：</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li>状态码是 <code className={CODE}>206</code>，不是 <code className={CODE}>200</code>。返回 200 表示「我不管你要哪一段，整份重发」。</li>
      <li>响应头带 <code className={CODE}>Content-Range</code>，且其中的总大小和本地记录一致。</li>
      <li>文件内容没变。下载器应在续传请求里带 <code className={CODE}>If-Range</code>：</li>
    </ol>
    <pre className={PRE}><code>{`If-Range: "a3f5c9e2-19d8b1c"
Range: bytes=157286400-`}</code></pre>
    <p><strong>如果文件在这期间更新了</strong>，服务器会忽略 Range 直接返回 200 全量，这是正确行为——拼一份旧头新尾的文件只会得到损坏的包。</p>
    <p>怎么快速判断一个站点支不支持：</p>
    <pre className={PRE}><code>{`curl -sI -H "Range: bytes=0-1023" https://example.com/app-release.apk | head -5`}</code></pre>
    <p>看到 <code className={CODE}>206 Partial Content</code> 就是支持；看到 <code className={CODE}>200 OK</code> 且 <code className={CODE}>Content-Length</code> 是完整大小，就是不支持，只能用「多线程分块」但无法跨会话续传的下载器，或者干脆换网络重下。</p>

    <h2>手机端为什么总是断</h2>
    <p>APK 体积大、耗时长，恰好踩在安卓的几个默认策略上：</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr><th className={TH}>断流原因</th><th className={TH}>表现</th><th className={TH}>处理方式</th></tr></thead>
      <tbody>
        <tr><td className={TD}>后台进程被冻结</td><td className={TD}>切到微信/电话回来进度归零</td><td className={TD}>下载期间保持 App 前台，或允许后台运行</td></tr>
        <tr><td className={TD}>省电策略杀网络</td><td className={TD}>息屏后进度不动</td><td className={TD}>关闭该 App 的电池优化</td></tr>
        <tr><td className={TD}>Wi-Fi 与移动数据切换</td><td className={TD}>连接被重置</td><td className={TD}>关闭「WLAN 助手 / 自动切换」</td></tr>
        <tr><td className={TD}>代理或 VPN 断线</td><td className={TD}>卡在某个百分比，重试也卡同一点</td><td className={TD}>不用分片代理；换稳定直连节点</td></tr>
        <tr><td className={TD}>存储空间不足</td><td className={TD}>下完提示写入失败</td><td className={TD}>预留 APK 体积的 2 倍空间</td></tr>
        <tr><td className={TD}>服务端限速/限连接</td><td className={TD}>开始很快，后段极慢直至超时</td><td className={TD}>等待限流解除，别连续重试</td></tr>
      </tbody>
    </table></div>
    <p>其中<strong>「重试仍断在同一点」</strong>最有诊断价值：说明文件前面的字节是可访问的，断点附近的服务端行为异常（分片缓存缺失、连接超时设置过短）。这种情况优先换源，而不是反复重试。</p>

    <h3>给下载器权限的具体位置</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>原生/类原生 Android</strong>：设置 → 应用 → 下载器 → 电池 → 「不受限制」</li>
      <li><strong>MIUI/HyperOS</strong>：应用设置 → 应用管理 → 下载器 → 省电策略 → 无限制</li>
      <li><strong>ColorOS/OriginOS</strong>：电池 → 应用耗电管理 → 允许后台活动</li>
      <li><strong>One UI</strong>：电池 → 后台使用限制 → 从「休眠应用」中移出</li>
    </ul>
    <p>设置完再测一次：息屏 10 分钟，回来进度应该继续走。</p>

    <h2>三种可靠的续传做法</h2>
    <h3>方法一：用支持续传的下载器（最省事）</h3>
    <p>ADM、IDM 类下载器、以及多数浏览器内置下载器都支持 Range。判断标准只有一条——<strong>中断后点「重试」，进度是从原处继续，还是从 0% 重新开始</strong>。</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li>下载链接用<strong>直接文件地址</strong>，不要用跳转页或带一次性 token 的签名链接（签名过期后续传会 403）。</li>
      <li>下载中途不要清浏览器缓存，不要清下载器任务记录——分片文件就在那里。</li>
      <li>断网后重新连上，等 10~30 秒再点重试，避免撞上服务端限流。</li>
    </ol>
    <h3>方法二：浏览器 + 无痕窗口重启（适合链接过期）</h3>
    <p>浏览器下载失败常伴随「链接已失效」。此时任务虽然还在，但 URL 已经无用了。<strong>不要点「恢复」</strong>，而是回原页面重新点下载，再在下载管理里删掉旧任务。多数浏览器的下载器支持同名文件续传，但更稳的做法是直接用方法一。</p>
    <h3>方法三：命令行精确续传（适合电脑上转发到手机）</h3>
    <p>在电脑上下完再传到手机，是最可控的路径：</p>
    <pre className={PRE}><code>{`# -C - 自动从已有文件末尾续传，可反复执行
curl -L -C - -o app-release.apk "https://example.com/app-release.apk"

# wget 等价写法，-c 同样支持续传
wget -c "https://example.com/app-release.apk"`}</code></pre>
    <p>用 <code className={CODE}>curl -C -</code> 的好处是幂等：网络断了就再执行一次，它自己算断点。注意 <code className={CODE}>-L</code> 要加，否则遇到 302 跳转不会跟。</p>
    <p>如果站点不支持 Range，可以用分块下载绕过单连接不稳定：</p>
    <pre className={PRE}><code>{`SIZE=$(curl -sI "https://example.com/app-release.apk" | awk '/Content-Length/{print $2}' | tr -d '\\r')
for i in $(seq 0 7); do
  START=$(( SIZE / 8 * i ))
  END=$(( SIZE / 8 * (i+1) - 1 ))
  [ $i -eq 7 ] && END=$(( SIZE - 1 ))
  curl -s -r \${START}-\${END} -o part.\$i "https://example.com/app-release.apk" &
done
wait
cat part.* > app-release.apk`}</code></pre>
    <p>分块下载的核心风险是<strong>合并后文件损坏</strong>。务必在合并后校验哈希（见下节），不要直接安装。</p>

    <h2>续传完成后的三件事</h2>
    <p>续传最容易出问题的地方不是断流，而是「看起来下完了，其实拼错了」。</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>核对大小</strong>：和页面标注的字节数一致，差几 KB 都可能是尾块没写完。</li>
      <li><strong>校验哈希</strong>：站点若提供 SHA-256，一条命令即可：</li>
    </ol>
    <pre className={PRE}><code>{`shasum -a 256 app-release.apk      # macOS
sha256sum app-release.apk          # Linux`}</code></pre>
    <ol className="list-decimal pl-6 space-y-1" start={3}>
      <li><strong>验证包结构</strong>：<code className={CODE}>unzip -t app-release.apk</code> 能过，说明 ZIP 中央目录完整——APK 本质是 ZIP，目录损坏会导致「解析包时出现问题」。</li>
    </ol>
    <p>如果三项有任意一项不过，<strong>唯一正确的动作是重新完整下载</strong>。拼接过或校验不过的包不要装，尤其是银行、支付类应用，一个被污染的字节就可能被利用。</p>

    <h2>一句话决策</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>服务器返回 <code className={CODE}>206</code> → 用支持续传的下载器，断点会自己接上。</li>
      <li>服务器返回 <code className={CODE}>200</code> → 续传无解，用 <code className={CODE}>curl -C -</code> 反复跑，或分块下载后校验合并。</li>
      <li>反复断在同一个百分比 → 换源，别重试。</li>
      <li>下完装不上 → 先测 <code className={CODE}>unzip -t</code> 和哈希，坏包重下。</li>
    </ul>
    <p>把这几条记住，下一次进度条清零时你就知道该点哪里、该删什么、什么时候该放弃这个源。更多排查思路可参考 <Link href="/zh/blog/apk-link-403-404-retry-checklist" className="text-blue-600 dark:text-blue-400 hover:underline">APK 下载链接 403、404 与中途失效排查</Link>，以及 <a href="https://www.gptoapk.com/zh" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk 在线 APK 下载工具</a>。</p>
  </>
);

const BATTERY_ARTICLE = (
  <>
    <p>装了一个非应用商店的 APK，第二天早上发现待机掉电 25%，而以前一整夜只掉 3%。这种情况很常见，但结论往往被带偏成「侧载应用都费电」——实际上<strong>费电的是特定行为，而不是安装来源本身</strong>。</p>
    <p>关键是把它归到下面五类里的某一类，每类的验证方法和处置方式都不一样。</p>

    <h2>先做一次基线测量</h2>
    <p>凭感觉判断不可靠。用系统自带数据建立基线：<strong>设置 → 电池 → 电池用量</strong>。</p>
    <p>重点看两列：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>前台时间</strong> vs <strong>后台时间</strong>：后台时间远大于你的实际使用，几乎可以确定是后台唤醒问题。</li>
      <li><strong>移动网络 / Wi-Fi 数据用量</strong>：异常耗电常伴随持续的上行流量（心跳、上传日志）。</li>
    </ul>
    <p>连续观察两个完整的「充满→剩 20%」周期再看结论，单次数据波动很大。</p>
    <p>更精确的做法是用 adb 拿系统电池统计（需开启开发者选项 → USB 调试）：</p>
    <pre className={PRE}><code>{`# 系统层面的耗电归因，含每项的 mAh 估算
adb shell dumpsys batterystats --charged com.example.app | head -60

# 只解决「谁在唤醒」的问题
adb shell dumpsys deviceidle | head -40`}</code></pre>
    <p>先按包名过滤，找 <code className={CODE}>Wake lock</code>、<code className={CODE}>Mobile radio active</code>、<code className={CODE}>Sensor</code> 三个段落。</p>

    <h2>原因一：WakeLock 没释放</h2>
    <p>应用持有一个 <code className={CODE}>PARTIAL_WAKE_LOCK</code>，让 CPU 在息屏时保持唤醒，用来做后台同步。正常应用会在任务完成后释放；写得不严谨的应用会漏掉 <code className={CODE}>release()</code>，于是 CPU 整夜不睡。</p>
    <pre className={PRE}><code>{`adb shell dumpsys power | grep -A3 "Wake Locks"`}</code></pre>
    <p><strong>处置</strong>：应用层无法直接修复，但可以限制——设置 → 应用 → 该应用 → 电池 → 选择「受限」（Android 9+ 会在后台长时间后强制停止应用）。注意：设为受限可能导致推送延迟。通讯类应用请改用下面的方法三。</p>

    <h2>原因二：后台定位与传感器常开</h2>
    <p>地图、跑步、外卖类应用常见。表现是<strong>耗电集中在户外/移动时</strong>，室内静止时正常。</p>
    <pre className={PRE}><code>{`adb shell dumpsys location | grep -i "client\\|request" | head -20`}</code></pre>
    <p><strong>处置</strong>：把位置权限从「始终允许」改成「仅在使用时允许」。这一条通常能直接砍掉一半异常耗电，且不影响主要功能。</p>

    <h2>原因三：定时唤醒太频繁</h2>
    <p>很多应用用 <code className={CODE}>AlarmManager</code> 做定时同步，间隔设成 1 分钟。每次唤醒都要拉起进程、联网、休眠——累计耗电相当可观。</p>
    <pre className={PRE}><code>{`adb shell dumpsys alarm | grep -B2 -A6 "com.example.app"`}</code></pre>
    <p>看 <code className={CODE}>RTC_WAKEUP</code> 类型的条目和它们的间隔。如果一个第三方应用平均唤醒间隔小于 15 分钟，就是明显超标。</p>
    <p><strong>处置</strong>：系统级拉长唤醒间隔（部分 ROM 叫「后台联网限制」「自启动管理」），或直接减少该应用的实时性需求。</p>

    <h2>原因四：崩溃循环</h2>
    <p>最隐蔽的一类。应用在后台启动后立即崩溃，系统重启它，再崩溃——表面上看不出任何东西，但 CPU 一直在动。</p>
    <pre className={PRE}><code>{`adb logcat -b crash -d | grep -i "com.example.app" | tail -30`}</code></pre>
    <p><strong>处置</strong>：这类多半是<strong>APK 与设备不兼容</strong>或<strong>签名不一致导致的覆盖安装残留</strong>。正确做法是卸载干净后重新安装匹配版本：</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>ABI 不匹配：装 <code className={CODE}>arm64-v8a</code> 而不是通用包时反而更稳；通用包在旧设备上可能跑到错误架构。</li>
      <li>Split APK 缺 split：只装了 base 没装 <code className={CODE}>config.arm64_v8a</code>，运行时找不到原生库。</li>
      <li>签名不一致：从不同来源装了同一应用的签名不同版本，数据目录残留导致启动即崩。</li>
    </ul>
    <p>判断 APK 的 ABI 与 minSdk 可参考 <Link href="/zh/blog/android-apk-compatibility-check-sdk-abi-density" className="text-blue-600 dark:text-blue-400 hover:underline">Android APK 兼容性检查</Link>。</p>

    <h2>原因五：来源不可信本身带来的耗电</h2>
    <p>这一类不是「优化差」，而是<strong>行为异常</strong>：后台高频联网上报、拉取广告、下载推广包。</p>
    <p><strong>判断标志</strong>：待机耗电正常，但只要亮屏就开始掉电快；流量统计里上传比下载多。</p>
    <p><strong>处置</strong>：不要再纠结省电设置，直接卸载。一个来路不明的 APK 高频联网，本身就是风险信号，不只是电量问题。</p>

    <h2>处置顺序建议（从省事到彻底）</h2>
    <ol className="list-decimal pl-6 space-y-1">
      <li>位置权限降级为「仅在使用时」——5 秒生效，命中率最高。</li>
      <li>电池策略设为「受限」——判断是否真是后台唤醒问题。</li>
      <li>系统里关闭该应用的后台联网/自启动。</li>
      <li>若仍异常，用 <code className={CODE}>adb logcat -b crash</code> 看是否崩溃循环；是则卸载重装正确版本。</li>
      <li>以上都无效且伴随异常流量 → 卸载，换可信来源重新获取。</li>
    </ol>

    <h2>一个反直觉的提醒</h2>
    <p>「关掉电池优化」经常被当成万能解，但它解决的是<strong>同步延迟</strong>，不是耗电。如果你为了解决推送延迟而把一个高频唤醒的应用设为「不受限制」，耗电只会更糟。<strong>先定位是哪一类</strong>，再动设置——这就是为什么第一步要花两个周期做基线测量。</p>
    <p>装应用之前多做一步校验（哈希、签名、权限列表），能省掉后面绝大部分排查。相关方法见 <Link href="/zh/blog/apk-signature-verification-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK 签名校验教程</Link>。</p>
  </>
);

export const zhPosts20261116 = [
  {
    slug: "android-apk-resume-interrupted-download",
    title: "安卓 APK 下载中断怎么续传：从 HTTP Range 到下载器的完整方案",
    description: "下载 APK 走到一半断网、切到后台被杀、进度归零，都是「服务端支不支持断点续传」和「下载器有没有用好」两件事。本文讲清 Range 请求机制、手机端常见断流原因，给出浏览器、下载器和命令行的续传做法与校验清单。",
    date: "2026-11-16",
    readTime: "8 min read",
    tags: ["APK下载", "断点续传", "HTTP Range", "下载失败", "gptoapk"],
    content: RESUME_ARTICLE,
    faqs: [
      { question: "怎么判断下载站点支不支持断点续传？", answer: "用 curl -sI -H \"Range: bytes=0-1023\" 请求文件，返回 206 Partial Content 就是支持；返回 200 且 Content-Length 是完整大小就是不支持。" },
      { question: "为什么重试总是断在同一个百分比？", answer: "说明断点之前的字节可访问，问题在断点附近的服务端行为，常见于边缘缓存缺失该分片或上游连接超时设置过短。这种情况应该换源，而不是反复重试。" },
      { question: "续传完成后文件会不会损坏？", answer: "服务端按字节区间拼接正常情况下不会，但如果续传前后源站换了版本，可能拼出混合内容。所以续传后必须做一次 SHA-256 校验，并用 unzip -t 验证包结构。" },
      { question: "手机上下载 APK 总在息屏后中断怎么办？", answer: "把下载器的电池策略设为「不受限制」或「允许后台活动」，关闭 Wi-Fi 自动切换到移动数据，并在下载期间保持应用在前台。" },
    ],
  },
  {
    slug: "apk-install-battery-drain-diagnosis",
    title: "APK 装完以后手机突然费电：五类原因与逐步排查法",
    description: "同一个 App，装完当天就掉电翻倍，往往不是「新版本优化差」这么简单。本文从 wakelock、后台定位、定时唤醒、崩溃循环和来源不可信五类原因入手，给出用系统电池统计加 adb 命令的排查步骤。",
    date: "2026-11-16",
    readTime: "7 min read",
    tags: ["APK", "耗电", "电池优化", "wakelock", "gptoapk"],
    content: BATTERY_ARTICLE,
    faqs: [
      { question: "装完 APK 待机掉电很快，第一步该做什么？", answer: "先看设置 → 电池 → 电池用量里该应用的前台时间与后台时间之比。后台时间远大于实际使用时间，基本可以确定是后台唤醒问题，再往下查 wakelock 和 alarm。" },
      { question: "把应用设为「受限」会收不到消息吗？", answer: "可能会。受限模式会延迟甚至阻止后台推送。通讯类应用建议改为关闭后台定位、限制后台联网，而不是直接受限。" },
      { question: "为什么应用在后台时间显示很短但耗电很高？", answer: "典型是崩溃循环：应用启动后立即崩溃、被系统反复重启。用 adb logcat -b crash 查看是否有重复堆栈，常见原因是 ABI 不匹配、缺少 split APK 或签名不一致。" },
      { question: "关闭电池优化能解决耗电吗？", answer: "通常不能，反而可能更糟。关闭电池优化解决的是通知延迟问题，会让高频唤醒的应用在后台更加活跃。" },
    ],
  },
];

export const zhPosts20261116List = toList(zhPosts20261116);
