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
      <p>「手机空间不够了，把 App 挪到 SD 卡上行不行？」</p>
      <p>这个问题的答案在过去十年里变了三次。Android 2.x 时代 App 默认装内部存储，空间不够要手动移；Android 6.0 之后系统开始管；到了 Android 11 以上，<strong>「移动到 SD 卡」这个功能在多数机型上已经消失了</strong>。</p>
      <p>这篇文章讲清楚三件事：App 到底装在哪、怎么改、以及空间不够时真正该做什么。</p>
      <p><strong>核心观点：现代安卓的系统分区已经不是你能随便挪的了。</strong>与其纠结「装哪」，不如搞清楚「什么在占空间」。</p>
      <h2>一、先搞清楚安卓的存储分区</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>/system</strong>：系统固件、预装 App，不能动，除非 root。</li>
        <li><strong>/data</strong>：用户安装的 App、App 数据、照片、下载文件，就是「内部存储」，<strong>用户能看到的全部空间</strong>。</li>
        <li><strong>/data/app</strong>：用户安装的 APK 本体，系统管理，不可手动指定。</li>
        <li><strong>外置 SD 卡 / adoptable storage</strong>：可扩展存储，Android 6+ 可合并为内部存储。</li>
        <li><strong>/sdcard</strong>：其实是 /data/media 的映射，就是文件管理器里看到的「内部存储」。</li>
      </ul>
      <p>关键认知：你在「设置 → 存储」里看到的「内部存储 128GB」，大部分就是 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data</code> 分区。App 装在这里，不是装在什么「系统区」。</p>
      <h2>二、APK 到底「安装」到了哪里</h2>
      <p>安装一个 APK 时，系统做的事是：</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>把 APK 文件解包、校验签名。</li>
        <li>把 dex 优化成 oat/vdex（AOT 或 JIT 预编译），存到 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/dalvik-cache</code> 或 App 的 oat 目录。</li>
        <li>把 APK 本体放到 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/&lt;包名&gt;-&lt;随机串&gt;/base.apk</code>。</li>
        <li>在 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/data/&lt;包名&gt;/</code> 创建应用私有数据目录。</li>
      </ol>
      <p>所以「APK 安装位置」实际上有两个含义：<strong>APK 本体存在哪</strong>，和 <strong>App 数据存在哪</strong>。这两个在 Android 8+ 之后基本绑在一起，都由系统决定。</p>
      <h2>三、怎么改安装位置（分版本说）</h2>
      <h3>Android 6.0 – 10：可以「移动到 SD 卡」</h3>
      <p>路径：设置 → 应用 → 选择 App → 存储 → 「更改」→ 选择 SD 卡。只有<strong>声明了允许外部存储</strong>的 App 才能移动，很多 App 直接显示灰色不可点。移动后 App 数据仍在内部存储，只是 APK 本体搬走了，<strong>省的空间远小于预期</strong>。</p>
      <h3>Android 6.0+ 的 adoptable storage</h3>
      <p>把 SD 卡格式化为内部存储的一部分，App 可以直接装在上面。代价：SD 卡被加密绑定到这台设备，拔出来在电脑上读不了；SD 卡速度远低于内置闪存，App 启动明显变慢；卡坏 = 数据全丢。<strong>只建议在低端机 + 高质量 A2 卡的情况下用</strong>。</p>
      <h3>Android 11 及以上：官方已移除该功能</h3>
      <p>App 一律安装在内部存储。想强制装到 SD 卡，只能用 adb（需开发者选项 + USB 调试）：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell pm install --install-location 2 /path/to/app.apk`}</code></pre>
      <p>参数含义：0=自动，1=内部，2=外部。部分厂商 ROM 仍保留「默认存储位置」设置（如某些三星、小米机型）。<strong>绝大多数用户到这里就该放弃了</strong>——收益极小，风险不小。</p>
      <h2>四、pm set-install-location 到底是什么</h2>
      <p>老教程里常见的这条命令：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell pm set-install-location 2`}</code></pre>
      <p>它设置的是<strong>新安装 App 的默认位置</strong>（2 = 外部存储），只对<strong>声明了 <code className="font-mono">android:installLocation=&quot;auto&quot;</code> 或 <code className="font-mono">&quot;preferExternal&quot;</code></strong> 的 APK 生效。而现代 App 几乎全部声明为 internalOnly（因为要保证性能和安全），所以这条命令在 2026 年<strong>对绝大多数 App 无效</strong>。看到这类教程，先别急着照做。</p>
      <h2>五、空间不够时，真正有效的 6 件事</h2>
      <p>按收益排序，比「移到 SD 卡」有用得多：</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li><strong>找出真正的空间大户</strong>：设置 → 存储，重点看 <strong>App 数据</strong>（不是 App 本体）——微信、抖音、相册缓存往往各占 10GB 以上。</li>
        <li><strong>清 App 缓存，不是清数据</strong>：清除缓存安全；<strong>清除数据</strong>会删掉登录状态和本地文件，慎用。</li>
        <li><strong>微信专项清理</strong>：我 → 设置 → 通用 → 存储空间 → 管理，通常能清出 5–20GB。</li>
        <li><strong>卸载不用的 App</strong>：一年没打开过的，留着也是占空间，卸载前先导出重要数据。</li>
        <li><strong>照片视频转存</strong>：云盘或电脑备份后删除本地副本，单次收益最大。</li>
        <li><strong>清理下载目录里的 APK</strong>：<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Download/</code> 下安装完的 APK 每个 50–200MB，装完就该删，安卓用户几乎都会忘。</li>
      </ol>
      <p>顺便一提：从可信来源下载 APK 并<strong>核对签名</strong>比纠结装在哪重要得多。安装位置错了顶多是空间问题，来源错了是安全问题。</p>
      <h2>六、几个常见误解</h2>
      <p><strong>「App 装在 SD 卡上会拖慢手机」</strong>——对，但只在 SD 卡速度差时明显。A2 级别的卡影响很小，不过系统已经不给你这个选择了。</p>
      <p><strong>「把 App 移到 SD 卡能省很多空间」</strong>——只移动 APK 本体（通常几十 MB），数据目录留原地，省下的空间很有限。</p>
      <p><strong>「root 之后可以随便挪」</strong>——可以，但银行类 App 会检测 root 直接拒绝运行，得不偿失。</p>
      <p><strong>「安装 APK 时需要选择安装位置」</strong>——原生 Android 不会让你选，只有部分国产 ROM 在安装界面提供「优先安装到 SD 卡」选项，而且通常只在 App 声明支持时才有意义。</p>
      <h2>七、结论</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>Android 11+ 用户</strong>：安装位置不是你能选的，别折腾，空间不够就清理。</li>
        <li><strong>Android 6–10 用户</strong>：系统提供「移动到 SD 卡」，但收益有限，且影响性能。</li>
        <li><strong>低端机 + 大容量 A2 卡</strong>：可以考虑 adoptable storage，其他情况不推荐。</li>
        <li><strong>真正该做的</strong>：定期清缓存、清微信、清 Download 里的旧 APK、备份照片。</li>
      </ul>
      <p>搞清楚空间被什么占了，比研究怎么挪 App 有用一百倍。</p>
      <h2>常见问题</h2>
      <p><strong>Q：Android 12 还能把 App 移到 SD 卡吗？</strong><br />系统界面已经移除了这个功能。理论上可用 adb 的 <code className="font-mono">pm install --install-location 2</code> 强制安装到外部存储，但只对声明支持外部存储的 APK 有效，现代 App 基本不支持。</p>
      <p><strong>Q：adoptable storage 值得用吗？</strong><br />只在低端机 + A2 级别高速卡时值得。代价是卡被加密绑定、无法在电脑上直读、卡损坏即数据全丢。</p>
      <p><strong>Q：清除缓存和清除数据有什么区别？</strong><br />缓存是临时文件，清除后 App 重新生成，不影响登录状态。数据包含账号、聊天记录、本地文件，清除后需要重新登录并可能丢失内容。</p>
      <p><strong>Q：为什么安装 APK 时找不到「安装到 SD 卡」选项？</strong><br />因为该 APK 声明为 internalOnly，Android 8 之后绝大多数应用都是如此，这是为了保证性能和存储安全。</p>
  </>
);

export const zhPosts20261120B = [
  {
    slug: "android-app-install-location-guide",
    title: "安卓 App 装在内部存储还是 SD 卡？安装位置选择完整指南（2026）",
    description: "「移动到 SD 卡」在 Android 11 之后已基本消失，老教程里的 pm set-install-location 也早已失效。本文按版本讲清安卓存储分区、APK 实际安装路径、adoptable storage 的代价，并给出 6 个真正能腾出空间的做法。",
    date: "2026-11-20",
    readTime: "7 min read",
    tags: ["Android存储","SD卡","安装位置","adoptable storage","APK","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261120BList = toList(zhPosts20261120B);
