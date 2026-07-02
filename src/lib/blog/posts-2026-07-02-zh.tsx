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
    <p>下载 APK 文件安装时，经常遇到 Google Play Protect 弹出「已禁止安装」或「该应用可能存在风险」的警告。很多用户第一反应是直接关闭保护，但这样做真的安全吗？本文将详细讲解 Play Protect 的工作原理、如何安全地绕过检测安装所需应用，以及安装后的安全检查步骤。</p>

    <h2>什么是 Google Play Protect？</h2>
    <p>Google Play Protect 是 Google 内置在 Android 系统中的安全防护功能，主要有四个作用：</p>
    <ul>
      <li><strong>应用扫描</strong>：安装前自动扫描 APK 文件，检测已知恶意软件、间谍软件和木马</li>
      <li><strong>定期设备检查</strong>：即使安装完成后，也会定期扫描设备上的所有应用</li>
      <li><strong>有害应用拦截</strong>：如果安装的应用被确认为有害，会自动禁用或移除</li>
      <li><strong>安全浏览提醒</strong>：通过 Chrome 浏览网页时，拦截已知危险网站</li>
    </ul>
    <p>Play Protect 的数据源来自 Google 的安全团队和全球数亿设备的实时反馈，对已知恶意包的识别率非常高。</p>

    <h2>为什么 Play Protect 会拦截 APK 安装？</h2>
    <p>当您遇到拦截提示时，有以下几种常见原因：</p>
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">原因</th>
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">说明</th>
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">风险等级</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 border border-gray-200 dark:border-gray-700">应用来源不明</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">从未知网站下载的 APK，Google 无法确认来源可信</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">⚠️ 中等</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <td className="p-3 border border-gray-200 dark:border-gray-700">签名信息缺失</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">APK 使用自签名证书或签名不完整</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">⚠️ 较低</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 border border-gray-200 dark:border-gray-700">权限过度申请</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">应用请求与其功能不匹配的敏感权限</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">🔴 较高</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <td className="p-3 border border-gray-200 dark:border-gray-700">已知恶意特征</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">代码特征与已知恶意软件库匹配</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">🔴 极高</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 border border-gray-200 dark:border-gray-700">新应用无历史数据</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">新开发的应用尚未被大量用户安装验证</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">⚪ 较低</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>安全绕过 Play Protect 的步骤</h2>
    <h3>第一步：确认 APK 来源可靠</h3>
    <p>在继续之前，请务必确认 APK 来源安全：</p>
    <ul>
      <li>只从知名网站下载，如 gptoapk.com、APKMirror、APKPure 等</li>
      <li>核对应用的包名、版本号和签名哈希值</li>
      <li>查看其他用户的下载评论和反馈</li>
    </ul>

    <h3>第二步：临时关闭 Play Protect</h3>
    <p>如果您确认 APK 安全，可以临时关闭 Play Protect：</p>
    <pre><code>{`设置 → 安全与隐私 → 应用安全 → Google Play Protect
→ 点击右上角齿轮图标 → 关闭「扫描应用以检测安全威胁」`}</code></pre>
    <p>或者通过 Google Play 应用操作：</p>
    <pre><code>{`Google Play → 点击个人头像 → Play Protect → 设置图标 → 关闭扫描开关`}</code></pre>
    <p><strong>重要：安装完成后建议立即重新开启！</strong></p>

    <h3>第三步：安装并验证应用</h3>
    <p>关闭保护后重新运行 APK 安装：</p>
    <ol>
      <li>在文件管理器中找到 APK 文件</li>
      <li>点击安装，如果系统提示「未知来源安装」，点击「设置」允许来自该文件管理器的安装</li>
      <li>安装完成后，<strong>立即重新开启 Play Protect</strong></li>
    </ol>

    <h3>第四步：安装后的安全检查</h3>
    <ul>
      <li><strong>云端检测</strong>：Play Protect 重新开启后会在后台扫描新安装的应用</li>
      <li><strong>手动触发扫描</strong>：进入 Play Protect 页面，点击「扫描」按钮手动执行一次</li>
      <li><strong>观察应用行为</strong>：如同应用请求非预期的权限（如读取联系人、发送短信等），及时卸载</li>
    </ul>

    <h2>Google Play Protect 的常见误区</h2>
    <h3>❌ 「关闭 Play Protect 后手机会变不安全」</h3>
    <p>Play Protect 只是安全体系中的一层。只要您只从可信来源下载、注意权限申请、保持系统更新，即使临时关闭也不会造成安全问题。但长期关闭会降低防护能力。</p>

    <h3>❌ 「Play Protect 说危险就一定危险」</h3>
    <p>不一定。Play Protect 对某些正规应用（如第三方应用商店、系统工具类应用）可能误报，因为这些应用申请的权限超出了 Google 的预期范围。但如果您不确定应用来源，建议以 Play Protect 的警告为准。</p>

    <h3>❌ 「安装完成后 Play Protect 就不再扫描了」</h3>
    <p>这个理解不准确。Play Protect 会定期对设备上所有应用进行后台扫描，包括侧载的 APK。如果发现应用后续行为异常，会及时通知您。</p>

    <h2>如果不能直接安装的替代方案</h2>
    <p>如果关闭 Play Protect 后仍然无法安装，可以尝试：</p>
    <ol>
      <li><strong>检查 Android 版本兼容性</strong>：确保 APK 的 minSdkVersion 低于或等于您的系统版本。使用 APK 分析工具查看目标 API 级别，下载对应您系统版本的 APK 变体（如 armeabi-v7a、arm64-v8a）</li>
      <li><strong>使用 ADB 命令安装</strong>：
        <pre><code>{`adb install app.apk`}</code></pre>
        ADB 安装会跳过部分系统限制，但 Play Protect 仍会在后台扫描。
      </li>
      <li><strong>更新系统 WebView</strong>：部分应用依赖 WebView 组件
        <pre><code>{`Google Play → 搜索 Android System WebView → 更新到最新版本`}</code></pre>
      </li>
    </ol>

    <h2>总结</h2>
    <p>Google Play Protect 是 Android 安全的重要防线，但不是唯一标准。正确的做法是：</p>
    <ul>
      <li>✅ <strong>信任但验证</strong>：相信知名来源的同时关闭保护</li>
      <li>✅ <strong>安装后立即开启</strong>：不要让设备长期处于无防护状态</li>
      <li>✅ <strong>定期手动扫描</strong>：主动检查设备安全状态</li>
      <li>✅ <strong>关注应用行为</strong>：发现异常及时处理</li>
    </ul>
    <p>记住：安全是一个过程，不是一个开关。灵活使用 Play Protect 的设置，既不影响安装需要的应用，又不降低整体安全水平。</p>
    <p>如果您在安装 APK 过程中遇到其他问题，欢迎查看我们的 <Link href="/zh/blog/apk-install-failed-error-codes-guide">APK 安装错误代码解决指南</Link> 获取更多帮助。</p>
  </>
);

const ARTICLE2 = (
  <>
    <p>安装 APK 时经常遇到「安装失败」或「解析错误」，但更烦人的是——失败后手机里多了一堆残留文件，既占空间又可能导致后续安装版本出错。本文将系统讲解如何清理 APK 安装残留，以及如何避免重复出现同样问题。</p>

    <h2>APK 安装失败会产生哪些残留？</h2>
    <p>即使安装失败，Android 系统也可能在以下位置留下文件：</p>
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">残留类型</th>
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">位置</th>
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">占用空间</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 border border-gray-200 dark:border-gray-700">临时安装包</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">/data/local/tmp/*.apk 或下载文件夹</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">几 MB 到数百 MB</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <td className="p-3 border border-gray-200 dark:border-gray-700">缓存数据</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">/data/data/&lt;包名&gt;/cache/</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">通常在 50MB 以下</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 border border-gray-200 dark:border-gray-700">失败的 dexopt 文件</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">/data/dalvik-cache/&lt;包名&gt;@*</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">几 MB</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <td className="p-3 border border-gray-200 dark:border-gray-700">不完整的 app 目录</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">/data/app/&lt;包名&gt;-*/</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">几十 MB</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>如果这些残留文件不清除，下次安装同个应用时可能触发「INSTALL_FAILED_UPDATE_INCOMPATIBLE」错误。</p>

    <h2>手动清理 APK 安装残留</h2>
    <h3>方法一：通过应用管理器清理（不需要 Root）</h3>
    <pre><code>{`设置 → 应用管理 → 显示系统应用 → 搜索应用包名
→ 如果出现不完整条目 → 点击「清除数据」→「卸载」`}</code></pre>
    <p>对于完全看不见条目的情况：</p>
    <pre><code>{`设置 → 存储 → 其他应用 → 缓存数据 → 清除所有缓存`}</code></pre>

    <h3>方法二：使用文件管理器删除临时 APK</h3>
    <ol>
      <li>打开文件管理器，进入「下载」或「Download」文件夹</li>
      <li>删除之前下载但安装失败的 APK 文件（.apk 后缀）</li>
      <li>进入 Android/obb/ 目录，查找对应包名的文件夹，删除</li>
    </ol>

    <h3>方法三：重启手机释放系统临时文件</h3>
    <p>一个简单但有效的方法——重启手机。重启会清空临时分区（/tmp）和部分缓存数据，系统会自动清理安装残留。</p>

    <h2>使用 ADB 命令深度清理</h2>
    <p>对于技术用户，ADB 命令是最彻底的清理方式：</p>

    <h3>1. 查看安装失败的包名残留</h3>
    <pre><code>{`adb shell pm list packages | grep <应用关键词>`}</code></pre>
    <p>如果返回空，但仍怀疑有残留：</p>
    <pre><code>{`adb shell ls /data/app/ | grep <包名关键词>`}</code></pre>

    <h3>2. 强制卸载不完整的包</h3>
    <pre><code>{`adb uninstall <完整包名>
adb uninstall --user 0 <完整包名>`}</code></pre>

    <h3>3. 清除安装缓存的临时文件</h3>
    <pre><code>{`adb shell pm clear <包名>
adb shell ls /data/local/tmp/
adb shell rm /data/local/tmp/*.apk`}</code></pre>

    <h3>4. 清理完整的残留目录</h3>
    <pre><code>{`adb shell ls /data/app/ | grep <包名>
adb shell su -c "rm -rf /data/app/<包名>-*/"`}</code></pre>

    <h2>利用工具类 App 自动清理</h2>
    <p>市面上也有专门清理安装残留的应用：</p>
    <ul>
      <li><strong>SD Maid</strong>：经典的 Android 清理工具，可扫描并删除安装残留目录</li>
      <li><strong>CCleaner</strong>：提供临时文件清理功能</li>
      <li><strong>Files by Google</strong>：内置的智能清理可识别并删除无效 APK 文件</li>
    </ul>
    <p>⚠️ 注意：从 Google Play 下载此类工具较为安全，从第三方网站下载的清理工具本身可能携带广告或恶意代码。</p>

    <h2>如何避免安装失败产生残留</h2>

    <h3>1. 下载前确认包名不冲突</h3>
    <p>安装前检查设备上是否已有同名应用：</p>
    <pre><code>{`设置 → 应用管理 → 搜索应用名`}</code></pre>
    <p>如果存在，要么先卸载旧版，要么确保新 APK 的签名与旧版一致。</p>

    <h3>2. 确保有足够存储空间</h3>
    <p>安装大型 APK（游戏、OBB 文件）前，至少保留 2-3GB 的可用空间。</p>

    <h3>3. 避免中断安装过程</h3>
    <p>安装过程中不要：锁屏后立刻离开、卸载 SD 卡、同时进行多个安装操作。系统在安装过程中创建临时目录，如果中断就会留下空目录或部分文件。</p>

    <h3>4. 使用兼容的 APK 版本</h3>
    <ul>
      <li>32 位应用在仅支持 64 位的系统上无法安装</li>
      <li>Android 14+ 对 targetSdkVersion 低于 23 的应用有安装限制</li>
      <li>部分旧应用可能需要兼容模式</li>
    </ul>

    <h2>总结与建议</h2>
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">清理方式</th>
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">难度</th>
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">效果</th>
            <th className="p-3 text-left border border-gray-200 dark:border-gray-700">适合用户</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 border border-gray-200 dark:border-gray-700">应用管理器</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">⭐</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">基础清理</td><td className="p-3 border border-gray-200 dark:border-gray-700">所有用户</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <td className="p-3 border border-gray-200 dark:border-gray-700">文件管理器</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">⭐⭐</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">中等</td><td className="p-3 border border-gray-200 dark:border-gray-700">普通用户</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 border border-gray-200 dark:border-gray-700">ADB 命令</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">⭐⭐⭐⭐</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">彻底</td><td className="p-3 border border-gray-200 dark:border-gray-700">技术用户</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <td className="p-3 border border-gray-200 dark:border-gray-700">清理工具 App</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">⭐</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">自动便捷</td><td className="p-3 border border-gray-200 dark:border-gray-700">非技术用户</td>
          </tr>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3 border border-gray-200 dark:border-gray-700">重启手机</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">⭐</td>
            <td className="p-3 border border-gray-200 dark:border-gray-700">临时清理</td><td className="p-3 border border-gray-200 dark:border-gray-700">所有用户</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>实用建议：普通用户遇到安装失败残留问题，先重启手机 + 删除下载目录的 APK 文件通常就能解决。如果还不行，再用应用管理器查找不完整的应用条目删除。ADB 命令是最后的王牌。</p>
    <p>如有其他安装问题，欢迎查看 <Link href="/zh/blog/apk-install-failed-common-errors-solutions">APK 安装常见报错及解决方法</Link> 获取更多帮助。</p>
  </>
);

export const zhPosts20260702: BlogPostEntry[] = [
  {
    slug: "google-play-protect-apk-bypass-guide",
    title: "Google Play 安全检测拦截APK安装怎么办？完整绕过指南与安全须知",
    description:
      "Google Play Protect 拦截 APK 安装怎么办？本文详细讲解 Play Protect 的工作原理、如何安全绕过检测安装所需应用，以及安装后的安全检查步骤。",
    date: "2026-07-02",
    readTime: "8 分钟阅读",
    tags: ["Google Play Protect", "APK安装", "安全绕过", "Android安全", "gptoapk"],
    content: ARTICLE1,
  },
  {
    slug: "android-apk-clean-residual-files-guide",
    title: "Android APK 安装失败后残留文件清理完整指南",
    description:
      "APK 安装失败后手机里残留文件怎么清理？本文系统讲解如何清理临时安装包、缓存数据和失败目录，以及避免安装失败的最佳实践。",
    date: "2026-07-02",
    readTime: "9 分钟阅读",
    tags: ["APK安装失败", "残留文件清理", "Android", "ADB清理", "gptoapk"],
    content: ARTICLE2,
  },
];

export const zhPosts20260702List = toList(zhPosts20260702);
