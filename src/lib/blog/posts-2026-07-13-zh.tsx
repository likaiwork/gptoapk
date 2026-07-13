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
    <h2>一、为什么Android要收紧APK安装？</h2>
    <p>
      一句话：<strong>安全</strong>。
    </p>
    <p>
      Google的目标是减少恶意软件通过侧载（sideloading）进入用户手机。每代新系统都在强化两点：
    </p>
    <ol>
      <li><strong>阻止非官方安装</strong> — 让侧载APK不那么方便</li>
      <li><strong>扫描已安装的APK</strong> — 即使装了也跑不掉</li>
    </ol>
    <p>
      这不是针对普通用户，而是针对恶意软件。但对正常使用APK的用户来说，确实多了几步操作。
    </p>

    <h2>二、Android 14 → 15 → 16 变化速览</h2>
    <table>
      <thead>
        <tr>
          <th>功能</th>
          <th>Android 14</th>
          <th>Android 15</th>
          <th>Android 16</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Google Play Protect强制扫描</td>
          <td>✅ 默认开启</td>
          <td>✅ 不可关闭</td>
          <td>✅ 不可关闭</td>
        </tr>
        <tr>
          <td>安装来源权限细分</td>
          <td>✅ 按应用单独授权</td>
          <td>✅ 同上</td>
          <td>✅ 同上</td>
        </tr>
        <tr>
          <td>实时扫描（代码级）</td>
          <td>❌</td>
          <td>✅ 新增</td>
          <td>✅ 强化</td>
        </tr>
        <tr>
          <td>安装拦截弹窗</td>
          <td>⚠️ 仅旧target应用</td>
          <td>✅ 所有侧载APK</td>
          <td>✅ 不可跳过等待</td>
        </tr>
        <tr>
          <td>Split APK安装限制</td>
          <td>⚠️ 需SAI</td>
          <td>✅ 内置支持</td>
          <td>✅ 支持+自动合并</td>
        </tr>
        <tr>
          <td>后台下载屏蔽</td>
          <td>❌</td>
          <td>⚠️ 部分</td>
          <td>✅ 默认开启</td>
        </tr>
        <tr>
          <td>文件管理器安装指引</td>
          <td>⚠️ 基础提示</td>
          <td>✅ 详细步骤</td>
          <td>✅ 一键引导</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>关键变化解读：</strong> Android 15是个转折点——拦截弹窗变得不可绕过。Android 16则更进一步，连等待时间都没法跳过了。
    </p>

    <h2>三、各版本详细安装指南</h2>

    <h3>Android 14（API 34）</h3>
    <p><strong>主要变化：</strong></p>
    <ul>
      <li>安装旧版target API的APK会弹窗警告</li>
      <li>Google Play Protect默认开启</li>
      <li>每个文件管理器都需要单独授权"安装未知应用"</li>
    </ul>
    <p><strong>安装步骤：</strong></p>
    <ol>
      <li>设置 → 安全 → Google Play Protect → 确认开启</li>
      <li>打开文件管理器 → 点击APK文件</li>
      <li>如果弹出授权提示，点击"设置" → 开启"允许安装未知应用"</li>
      <li>返回文件管理器 → 再次点击APK → 确认安装</li>
    </ol>
    <p><strong>注意事项：</strong></p>
    <ul>
      <li>targetSdkVersion &lt; 31 的APK会收到"旧版应用"警告</li>
      <li>部分APK需要点击"仍要安装"（2次确认）</li>
      <li>微信传输的APK可能被微信拦截，建议用文件管理器或浏览器直接下</li>
    </ul>

    <h3>Android 15（API 35）</h3>
    <p><strong>主要变化：</strong></p>
    <ul>
      <li>新增<strong>实时扫描</strong>功能（代码级分析，不只是签名校验）</li>
      <li>侧载APK安装弹窗强制显示5秒等待</li>
      <li>取消按钮不再可跳过</li>
      <li>Google Play Protect不可关闭</li>
    </ul>
    <p><strong>安装步骤：</strong></p>
    <ol>
      <li>设置 → 安全与隐私 → 更多安全设置</li>
      <li>开启"允许安装来自此来源的应用"（给文件管理器授权）</li>
      <li>打开文件管理器 → 找到APK → 点安装</li>
      <li>⚠️ 等待倒计时5秒 → 点击"仍要安装"</li>
      <li>Google Play Protect扫描完成 → 确认安装</li>
    </ol>
    <p><strong>Android 15注意事项：</strong></p>
    <ul>
      <li>第一次安装APK时，系统会强制检查Google Play Protect，安装速度比14慢</li>
      <li>如果提示"无法安装此应用"，检查APK的targetSdkVersion是否 ≥ 24（Android 7.0+）</li>
      <li>部分旧APK（targetSdk &lt; 24）在15上完全无法安装</li>
    </ul>

    <h3>Android 16（API 36）— 2026最新</h3>
    <p><strong>测试版关键变化：</strong></p>
    <ul>
      <li><strong>强制性代码扫描</strong>：Google Play Protect在安装前会对APK做完整代码分析</li>
      <li><strong>安装等待时间不可跳过</strong>：15的5秒等待被保留且无法绕过</li>
      <li><strong>后台下载管理</strong>：应用在后台下载APK时，系统会弹窗询问用户是否授权</li>
      <li><strong>Split APK原生支持</strong>：系统文件管理器可直接安装 .apks 和 .apkm 文件</li>
      <li><strong>恶意软件实时阻断</strong>：扫描到疑似恶意代码时，安装流程自动终止</li>
    </ul>
    <p><strong>安装步骤：</strong></p>
    <ol>
      <li>设置 → 安全 → Google Play Protect → 确保显示"已开启"</li>
      <li>来源授权：文件管理器第一次安装APK时会自动引导授权</li>
      <li>点击APK文件 → 系统自动扫描（5-30秒）</li>
      <li>扫描通过 → 等待6秒倒计时 → 点击"仍要安装"</li>
      <li>扫描不通过 → 系统红字提示风险 → 建议放弃安装</li>
    </ol>
    <p><strong>重点提醒：</strong></p>
    <ul>
      <li>旧APK（targetSdk &lt; 26）安装前会被标记为"安全评分低"，但仍然可装</li>
      <li>所有侧载APK都会上传到Google进行云端扫描（即使你关闭了"发送数据"）</li>
      <li><strong>不要在16上尝试安装修改版APK（破解/去广告版）</strong> — 大概率被识别拦截</li>
    </ul>

    <h2>四、常见安装失败原因及解决</h2>

    <h3>安装按钮灰色点不了？</h3>
    <p>原因：Google Play Protect正在扫描。等待扫描完成即可。</p>

    <h3>提示"安装被阻止"？</h3>
    <p>原因：Google Play Protect判定这个APK有风险。</p>
    <p><strong>解决方法：</strong></p>
    <ol>
      <li>检查APK来源是否可靠（推荐 <Link href="https://www.gptoapk.com">gptoapk.com</Link>）</li>
      <li>如果是自己信任的APK，可在设置中临时关闭Play Protect</li>
      <li>安装完后记得重新开启</li>
    </ol>

    <h3>提示"应用未安装"？</h3>
    <p>原因：多种可能——APK签名不匹配（覆盖安装时签名变了）、存储空间不足、或与已安装的应用冲突。</p>

    <h3>安装到一半自动取消？</h3>
    <p>原因（Android 16特有）：后台下载管理功能在检测到下载源变化时会取消安装。</p>
    <p><strong>建议：</strong>不要切换Wi-Fi、不要在安装过程中打开VPN、保持屏幕亮着。</p>

    <h2>五、不同品牌手机的差异</h2>
    <p>即使同是Android 15/16，不同厂商也有自己的魔改：</p>
    <table>
      <thead>
        <tr>
          <th>品牌</th>
          <th>特点</th>
          <th>注意点</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Samsung</td>
          <td>安装APK最友好</td>
          <td>One UI自带文件管理器即可安装</td>
        </tr>
        <tr>
          <td>Xiaomi/HyperOS</td>
          <td>MIUI会主动拦截高风险APK</td>
          <td>需在开发者选项中关闭"MIUI优化"</td>
        </tr>
        <tr>
          <td>Huawei/HarmonyOS</td>
          <td>无GMS，全靠侧载</td>
          <td>需关闭"纯净模式"的"增强保护"</td>
        </tr>
        <tr>
          <td>OPPO/ColorOS</td>
          <td>安全检测较严格</td>
          <td>首次安装需输入OPPO账号密码验证</td>
        </tr>
        <tr>
          <td>vivo/OriginOS</td>
          <td>拦截逻辑类似OPPO</td>
          <td>i管家会扫描每个APK文件</td>
        </tr>
        <tr>
          <td>Pixel</td>
          <td>原汁原味Android</td>
          <td>最干净，拦截最少</td>
        </tr>
      </tbody>
    </table>
    <blockquote>
      <p><strong>华为/荣耀用户注意：</strong>由于没有Google Play Protect，APK安装不受Google限制，但需要处理GMS兼容性问题。</p>
    </blockquote>

    <h2>六、未来趋势：Android APK侧载会越来越难吗？</h2>
    <p><strong>会，但不会"封死"。</strong></p>
    <p>Google的目的是提升安全门槛，不是禁止侧载。从趋势看：</p>
    <ul>
      <li>✅ 拦截会越来越多</li>
      <li>✅ 扫描会越来越深入（代码级分析）</li>
      <li>✅ 等待时间只会增加不会减少</li>
      <li>❌ 但不会彻底封死侧载（开发者和技术用户需要这个功能）</li>
      <li>❌ APK作为Android安装包格式不会消失</li>
    </ul>
    <p><strong>对普通用户的影响：</strong>多等10-30秒、多点一次确认。不算大麻烦，算安全成本。</p>
    <p><strong>对APK下载站的影响：</strong>需要确保提供的APK都经过签名校验和无恶意软件验证。这也是 gptoapk.com 一直在做的事情。</p>

    <h2>总结</h2>
    <table>
      <thead>
        <tr>
          <th>系统版本</th>
          <th>安装难度</th>
          <th>新增麻烦</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Android 13</td>
          <td>★☆☆☆☆</td>
          <td>基本无拦</td>
        </tr>
        <tr>
          <td>Android 14</td>
          <td>★★☆☆☆</td>
          <td>弹窗警告</td>
        </tr>
        <tr>
          <td>Android 15</td>
          <td>★★★☆☆</td>
          <td>5秒等待+实时扫描</td>
        </tr>
        <tr>
          <td>Android 16</td>
          <td>★★★★☆</td>
          <td>6秒等待+代码级扫描</td>
        </tr>
      </tbody>
    </table>
    <p>
      安装APK越来越"麻烦"，但这些麻烦背后是安全性的提升。只要从可信源下载，走正规流程花30秒，你的Android设备就能跑99%的APK应用。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h2>一、为什么会提示"APK文件损坏"？</h2>
    <p>先搞清楚原因，才能对症下药。</p>
    <table>
      <thead>
        <tr>
          <th>原因</th>
          <th>概率</th>
          <th>典型表现</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>下载不完整</td>
          <td>★★★★★</td>
          <td>安装时直接报"解析错误"</td>
        </tr>
        <tr>
          <td>网络中断导致文件残缺</td>
          <td>★★★★</td>
          <td>文件大小明显偏小</td>
        </tr>
        <tr>
          <td>浏览器/下载工具问题</td>
          <td>★★★</td>
          <td>下载进度100%但文件校验失败</td>
        </tr>
        <tr>
          <td>存储空间不足</td>
          <td>★★★</td>
          <td>系统提示"空间不足，安装失败"</td>
        </tr>
        <tr>
          <td>APK本身已损坏</td>
          <td>★★</td>
          <td>从第三方源的旧文件</td>
        </tr>
        <tr>
          <td>Android版本不兼容</td>
          <td>★★</td>
          <td>高版本API在低版本系统上运行</td>
        </tr>
        <tr>
          <td>文件传输中损坏</td>
          <td>★</td>
          <td>从电脑传手机时USB断开</td>
        </tr>
      </tbody>
    </table>

    <h2>二、快速排查：5个动作判断问题根源</h2>

    <h3>① 检查文件大小</h3>
    <p>文件管理器 → 找到APK文件 → 长按 → 属性/详情。对比开发者官网或Google Play标注的大小。</p>

    <h3>② 重新下载</h3>
    <p>重新下一次通常能解决70%的问题。</p>

    <h3>③ 检查Android版本兼容性</h3>
    <p>设置 → 关于手机 → Android版本。如果你的系统低于APK要求的minSdkVersion，会直接报解析错误。</p>

    <h3>④ 检查存储空间</h3>
    <p>安装APK需要两倍于文件大小的临时空间。确认剩余空间 &gt; 1GB。</p>

    <h3>⑤ 排查文件传输问题</h3>
    <p>如果APK是从电脑传过来的（USB、蓝牙、微信等），传输过程可能损坏文件。重新传一次或直接用手机下载。</p>

    <h2>三、6种修复方法（按推荐顺序）</h2>

    <h3>方法1：重新下载（最推荐）</h3>
    <ul>
      <li>用稳定的Wi-Fi</li>
      <li>从可靠源下载（<Link href="https://www.gptoapk.com">gptoapk.com</Link>、APKMirror、APKPure）</li>
      <li>下载过程中不要切到后台</li>
      <li>不要用下载管理器加速、不要同时下载多个大文件</li>
    </ul>

    <h3>方法2：换个浏览器/下载工具</h3>
    <p>推荐顺序：Chrome（最稳定）→ Firefox（支持断点续传）→ 系统自带 → Edge/Opera</p>

    <h3>方法3：用ADB安装绕过校验</h3>
    <pre><code>{`# 手机连接电脑，开启USB调试
adb install 文件名.apk`}</code></pre>
    <p>ADB会处理一部分兼容性问题，安装成功率比直接点APK高。</p>

    <h3>方法4：检查文件扩展名</h3>
    <p>有时候文件变成 .apk.bin 或 .apk.download，重命名为 .apk 即可。</p>

    <h3>方法5：对比MD5/SHA1校验和</h3>
    <p>用HashCheck等工具计算文件的SHA-1值，对比发布者提供的校验值。</p>

    <h3>方法6：终极方案——换个源</h3>
    <p>推荐：gptoapk.com（严格验证）、APKMirror、APKPure、应用开发商官网</p>

    <h2>四、如何预防APK文件损坏？</h2>
    <p><strong>下载前：</strong>确保Wi-Fi稳定、存储空间 &gt; 5GB、从可信源下载</p>
    <p><strong>下载中：</strong>不要切到后台、不要接电话、保持屏幕亮着</p>
    <p><strong>下载后：</strong>立即安装、不要移动或重命名文件</p>

    <h2>五、什么时候该放弃这个APK？</h2>
    <ol>
      <li>换3个不同源下载都报解析错误 → 这个APK版本有问题</li>
      <li>Android版本不兼容 → 找旧版本</li>
      <li>文件校验和对比失败 → 文件确实损坏</li>
      <li>APK来自非正规渠道且反复报错 → 可能被篡改，放弃更安全</li>
    </ol>

    <h2>六、特别提醒：Android 14/15/16的新变化</h2>
    <p>Android 14+引入了更严格的APK安装验证机制：</p>
    <ul>
      <li>Google Play Protect默认开启，会扫描每个侧载APK</li>
      <li>安装来源限制：需要授予文件管理器"安装未知应用"权限</li>
      <li>Split APK（APKS/APKM）需要专门的安装器</li>
      <li>targetSdkVersion要求变高，部分老APK无法安装在最新系统上</li>
    </ul>
    <p>这些新变化让部分老APK无法安装在最新系统上，这是正常现象，不是文件损坏。</p>

    <h2>总结</h2>
    <p>
      APK文件损坏或解析错误虽然烦人，但90%的情况通过<strong>重新下载</strong>就能搞定。剩下的10%——换源、ADB安装、检查兼容性——按本文的排查流程走一遍，基本都能解决。
    </p>
    <p>
      如果试完所有方法还是不行，建议直接到 <Link href="https://www.gptoapk.com">gptoapk.com</Link> 找对应应用的替代版本。
    </p>
  </>
);

export const zhPosts20260713: BlogPostEntry[] = [
  {
    slug: "android-16-apk-install-permission-guide",
    title: "Android 14/15/16 APK安装权限变化详解（2026最新版）",
    description: "从Android 14到Android 16，Google对APK侧载安装越来越严格。本文详解每代系统的安装流程变化、拦截机制和各品牌手机的差异。",
    date: "2026-07-12",
    readTime: "10 分钟阅读",
    tags: ["Android 14", "Android 15", "Android 16", "APK安装", "侧载", "安全", "gptoapk"],
    content: ARTICLE1,
  },
  {
    slug: "apk-corrupted-parse-error-fix-guide",
    title: "APK文件损坏或解析错误怎么办？完整修复指南（2026版）",
    description: "APK下载后提示解析错误、文件损坏？本文从文件大小检查到ADB安装，6种修复方法一步步教你解决问题，90%的APK损坏都能修复。",
    date: "2026-07-12",
    readTime: "10 分钟阅读",
    tags: ["APK损坏", "解析错误", "APK安装失败", "故障排查", "gptoapk"],
    content: ARTICLE2,
  },
];

export const zhPosts20260713List = toList(zhPosts20260713);
