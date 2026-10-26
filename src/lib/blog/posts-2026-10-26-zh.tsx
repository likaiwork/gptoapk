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
    question: "APK 的签名指纹怎么查？手机上能查吗？",
    answer:
      "电脑上用 keytool -printcert -jarfile app.apk，输出里找 SHA256 那一行。手机端可以装一个 APK 签名查看工具，长按文件即可看到证书指纹。注意：工具只能告诉你「谁签的」，能不能信任要你自己拿官方包的指纹去比对。",
  },
  {
    question: "包名和官方一样，是不是就可以放心装了？",
    answer:
      "不行。包名是打包的人自己填的，可以随便抄；签名密钥伪造不了。所以判断「是不是同一个开发者」，看签名指纹，不看包名，也不看应用图标和名称。",
  },
  {
    question: "哪些权限组合是明确的危险信号？",
    answer:
      "四组：短信读写 + 联网（截验证码、静默订阅扣费）、无障碍服务 + 联网（读屏模拟点击，可操控银行 App）、设备管理器 + 开机自启（阻止卸载）、悬浮窗 + 后台弹广告 + 自启动（破解版常见的变现套路）。",
  },
  {
    question: "先装上，出问题再卸载不行吗？",
    answer:
      "风险很高。带设备管理器权限的应用可以阻止卸载，开了无障碍的应用能自己重新授权、隐藏自己的设置入口。装前花五分钟验证成本极低，装后被恶意应用扎根，轻则折腾，重则只能恢复出厂。",
  },
];

const ARTICLE1 = (
  <>
    <p>
      从第三方网站下 APK，最大的风险不是「装不上」，而是<strong>装上了、用着没问题，但它在后台做别的事</strong>
      。恶意 APK 的常见形态早就不是弹广告这种明显症状了，而是静默上报设备信息、订阅付费短信、后台拉起其他应用刷量——
      这些你在使用中几乎察觉不到。
    </p>
    <p>
      这篇给一份可以直接照着做的自查清单。按顺序做，全程 5 分钟，不需要 root，也不需要装任何「安全软件」。
    </p>
    <blockquote>
      <p>核心原则：看签名和权限，比看评论区和小红书推荐靠谱一万倍。</p>
    </blockquote>

    <h2>一、下载前：先看来源</h2>
    <p>在点下载按钮之前，先做三个判断。</p>
    <p>
      <strong>1. 域名对不对</strong>
    </p>
    <p>正规分发域名通常和开发者直接相关。出现下面这些情况要提高警惕：</p>
    <ul>
      <li>
        域名里堆关键词：<code>apk-download-free-fast-2026.com</code>
      </li>
      <li>
        仿冒官网：<code>whatsapp-apk.com</code>、<code>telegram-download.net</code>（官方是 whatsapp.com、
        telegram.org）
      </li>
      <li>短链跳转多次才到下载页——中间环节可以随时换包</li>
    </ul>
    <p>
      <strong>2. 下载按钮有几个</strong>
    </p>
    <p>
      页面里出现多个大小不一的「下载」按钮，其中一部分是广告位，点下去拿到的是另一个 APK 或者一个推广下载器。
      <strong>只有一个明确有效的下载入口</strong>，是正常站点的特征。
    </p>
    <p>
      <strong>3. 文件扩展名</strong>
    </p>
    <p>
      下载下来后缀是 <code>.apk</code> 才对。如果是 <code>.apk.exe</code>、<code>.zip</code>、<code>.apks</code>、
      <code>.xapk</code>，先搞清楚拿到的是什么：
    </p>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">后缀</th>
            <th className="py-2">实际是什么</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>.exe</code>
            </td>
            <td className="py-2">Windows 程序，说明你下错了平台或者站点在投毒</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>.zip</code> / <code>.xapk</code>
            </td>
            <td className="py-2">打包容器，里面有多个 apk（分架构/分包），不是给直接安装用的</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">
              <code>.apks</code>
            </td>
            <td className="py-2">App Bundle 拆分产物，需要专门的安装器</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>二、安装前：验证签名指纹</h2>
    <p>
      这是最有效的一步，也是最被忽略的一步。同一个包名可以由不同签名发布，
      <strong>包名一样不等于同一个开发者</strong>。
    </p>
    <pre>
      <code>{`keytool -printcert -jarfile app.apk`}</code>
    </pre>
    <p>
      输出里找 <code>SHA256:</code> 那一行。然后从 Google Play 或官网下载同一个应用（旧版本也行），对同样的命令跑一次，比对结果。
    </p>
    <p>
      <strong>一致 = 同一个签名者；不一致 = 不是官方包，立刻停手。</strong>
    </p>
    <p>
      如果实在拿不到官方包，至少做一次交叉验证：从两个不同来源各下一次，比对 SHA256。两个「热门第三方站」给出不同签名，说明至少有一个是改包。
    </p>
    <p>还可以和已安装的副本比对：</p>
    <pre>
      <code>{`adb shell pm list packages -f | grep com.example.app`}</code>
    </pre>
    <p>
      如果已安装副本的签名和你要装的包不一致，安装时会报签名冲突——更重要的是，这说明其中至少一个不是正品。
    </p>

    <h2>三、安装前：把权限当成「组合」来看</h2>
    <pre>
      <code>{`aapt dump permissions app.apk
# 或者
apkanalyzer manifest permissions app.apk`}</code>
    </pre>
    <p>不需要逐条看，只看组合。以下四组是恶意软件的典型特征：</p>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">危险组合</th>
            <th className="py-2">能干什么</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">短信读写 + 网络</td>
            <td className="py-2">读取验证码、静默回复订阅短信——资金损失的直接路径</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">无障碍服务 + 网络</td>
            <td className="py-2">能模拟点击、读取屏幕内容，可操控银行 App</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">设备管理器 + 开机自启动</td>
            <td className="py-2">难以卸载，可锁屏勒索</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">悬浮窗 + 后台弹广告 + 自启动</td>
            <td className="py-2">广告变现型，常见于「破解版」「去广告版」</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      然后对照功能：一个计算器要短信权限，一个壁纸应用要无障碍服务——
      <strong>功能解释不了权限，就是拒绝的理由</strong>。
    </p>

    <h2>四、安装前：核对版本与大小</h2>
    <p>
      <strong>版本号</strong>：如果你装的是破解版/解锁版，注意版本号往往和官方同期版本对不上。改包者通常基于旧版本修改，你拿到的是几个月前的代码加上新的壳。
    </p>
    <p>
      <strong>文件大小</strong>：和官方同版本对比，差异超过 20% 就要警惕。改包会加 dex、加壳、加额外资源，通常体积变大；而「精简版」删掉资源会变小。
    </p>

    <h2>五、安装后：两件事立刻做</h2>
    <p>
      <strong>1. 关掉不必要的特殊授权</strong>
    </p>
    <p>设置 → 应用 → 该应用 → 权限，以及「特殊应用权限」里的：</p>
    <ul>
      <li>无障碍 → 关</li>
      <li>设备管理 → 关（除企业级应用）</li>
      <li>显示在其他应用上层 → 关</li>
      <li>后台自启动 → 关</li>
    </ul>
    <p>
      <strong>2. 看一次网络行为</strong>
    </p>
    <p>
      不装抓包工具的话，最简方式：设置 → 网络/流量使用，看这个 App 在你没打开它的时间段有没有明显流量消耗。频繁后台联网 + 你没在用 = 有问题。
    </p>

    <h2>六、自查速查表</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">检查项</th>
            <th className="py-2">通过标准</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">下载域名</td>
            <td className="py-2">与开发者直接相关，无关键词堆砌</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">文件后缀</td>
            <td className="py-2">
              只有 <code>.apk</code>
            </td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SHA256 签名</td>
            <td className="py-2">与官方包一致</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">权限组合</td>
            <td className="py-2">没有短信/无障碍/设备管理危险组合</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">版本号</td>
            <td className="py-2">与官方同期版本可比对</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">文件大小</td>
            <td className="py-2">与官方差异小于 20%</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">安装后权限</td>
            <td className="py-2">关闭全部非必要特殊权限</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      七项里有任何一项说不清，就别装。<strong>替代方案永远存在</strong>——找官方渠道、找同功能的正规应用，成本远低于事后清理一台被订阅扣费的手机。
    </p>

    <h2>常见误区</h2>
    <ul>
      <li>
        <strong>「评论区说好用」</strong>——评论区最容易刷，也是投毒站最用心的部分。
      </li>
      <li>
        <strong>「杀毒软件没报毒」</strong>——改包加壳后绕过静态特征太容易了，没报毒不等于安全。
      </li>
      <li>
        <strong>「我先装上，出问题再卸载」</strong>——设备管理器型恶意应用会阻止卸载，先斩后奏代价很高。
      </li>
      <li>
        <strong>「包名和官方一样应该没事」</strong>——包名可以随便填，签名不能伪造。
      </li>
    </ul>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      上的每个 APK 都直接取自 Google Play 原始文件，签名证书与官方发布者完全一致。
    </p>
    <p>
      自查清单的价值不在于完美，而在于<strong>把「凭感觉」换成「有对照」</strong>。养成装前花五分钟看签名和权限的习惯，能挡掉绝大多数真实的坑。
    </p>
  </>
);

export const zhPosts20261026: BlogPostEntry[] = [
  {
    slug: "android-apk-security-self-check-list",
    title: "安卓 APK 安全风险自查清单：装之前 5 分钟，装之后少后悔",
    description:
      "从下载源判断、签名指纹比对、权限危险组合、版本与体积核对，到安装后的特殊权限收口，一套不需要 root、5 分钟能跑完的 APK 安全自查流程，附速查表。",
    date: "2026-10-26",
    readTime: "9 min read",
    tags: ["android", "apk", "安全", "下载"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
];

export const zhPosts20261026List = toList(zhPosts20261026);
