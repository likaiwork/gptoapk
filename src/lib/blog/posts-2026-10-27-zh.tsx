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
    question: "APK 和从应用商店下载的应用是两种东西吗？",
    answer:
      "不是。安卓上所有应用本质上都是以 APK（或按设备拆分的多个 APK）形式安装的，商店装的也是 APK。真正的区别在于渠道：商店会预先扫描、保证是开发者上传的原包，并且帮你做版本更新；而手动下载 APK 时，这些保障都需要你自己补上。",
  },
  {
    question: "把 APK 改成 .zip 能打开，说明文件有问题吗？",
    answer:
      "不能说明。APK 本身就是一种 ZIP 格式，改名解压能看到 AndroidManifest.xml、classes.dex、res/、lib/、META-INF/ 等目录，这是完全正常的。能解压只证明文件没损坏，不证明它安全。",
  },
  {
    question: "为什么修改过的 APK 无法覆盖安装原版？",
    answer:
      "因为安卓要求覆盖安装时包名相同且签名一致。任何人重新打包后都必须用新密钥签名，签名不同就会提示「应用未安装」。这个机制既是安全防线，也意味着想装改包必须先卸载原版——而卸载会清空应用数据，所以务必先备份。",
  },
  {
    question: "下载的 APK 装完后能删掉吗？",
    answer:
      "可以，而且应该删。安装完成后 APK 文件已经不再被系统使用，留在下载目录只会占用几百 MB 空间，攒多了还会让人分不清哪个是什么版本。删除 APK 不影响已安装的应用和数据。",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "targetSdkVersion 越高越省电、越流畅吗？",
    answer:
      "不直接相关。它影响的是系统用哪一套行为规则对待应用——后台策略、通知权限、存储访问、前台服务等，间接会影响耗电表现。流畅度主要取决于代码质量和机型适配，不是这个字段决定的。",
  },
  {
    question: "targetSdkVersion 和应用版本号是一回事吗？",
    answer:
      "不是。版本号（versionCode / versionName）是应用自己的迭代编号，targetSdkVersion 是对系统声明的行为规范代际，两者完全独立。同一个 targetSdk 可以对应很多个版本，同一个版本号也可以对应不同的 targetSdk。",
  },
  {
    question: "为什么有些老应用 targetSdk 很低还能在新系统上跑？",
    answer:
      "因为只要 minSdkVersion 满足要求就能安装，系统会按它声明的旧规则对待它。但新系统会持续提示「此应用专为旧版 Android 打造」，部分机型会限制其运行，而且它无法享受新系统的安全加固，实际体验和安全性都很勉强。",
  },
  {
    question: "为了兼容性问题，装个 targetSdk 更低的老版本 APK 行吗？",
    answer:
      "技术上可行，但代价不小：低 targetSdk 意味着应用继续享有更宽松的存储、后台、权限规则，风险敞口更大；系统会反复提示旧版应用；等你依赖的老版本彻底不能用了，迁移成本比当初解决问题更高。更稳妥的做法是先定位是哪个行为变更导致了问题，再用对应设置或替代应用解决。",
  },
];

const ARTICLE1 = (
  <>
    <p>
      很多人第一次接触 APK，是在某个网盘链接或论坛帖子里看到一句「下载后安装即可」。点下去，手机就开始装一个应用。但如果不清楚 APK
      到底是什么，这个「点一下」就变成了盲操作——装了什么、有没有风险、装错了怎么办，全都不知道。
    </p>
    <p>
      这篇用最直白的方式把 APK 讲清楚：它的结构、和从商店安装的真正区别、什么时候该用，以及怎么判断一个 APK 是不是安全的。
    </p>
    <blockquote>
      <p>
        <strong>一句话结论：</strong>
        APK 是安卓应用的安装包，本质上是一个带特殊目录结构的 ZIP 压缩包，里面装着程序代码、资源文件、签名信息和一份声明配置。
        它不是「破解版专属」——安卓上所有应用，包括 Google Play 上的那些，最终都是以 APK 形式装进手机的。
      </p>
    </blockquote>

    <h2>一、APK 里到底有什么</h2>
    <p>
      把任意一个 APK 后缀改名为 <code>.zip</code>，用解压工具打开，会看到这样的结构：
    </p>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">文件 / 目录</th>
            <th className="text-left py-2">作用</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>AndroidManifest.xml</code>
            </td>
            <td className="py-2">应用「身份证」：包名、版本、需要哪些权限、最低支持系统版本、入口在哪</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>classes.dex</code>
            </td>
            <td className="py-2">编译后的程序代码</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>res/</code>
            </td>
            <td className="py-2">界面布局、图片、字符串等资源</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>lib/</code>
            </td>
            <td className="py-2">原生库（.so 文件），按 CPU 架构分包存放，如 arm64-v8a</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>assets/</code>
            </td>
            <td className="py-2">应用自带的原始文件，如字体、离线数据</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>META-INF/</code>
            </td>
            <td className="py-2">签名信息，决定这个包装不装得上、能不能覆盖旧版本</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">
              <code>resources.arsc</code>
            </td>
            <td className="py-2">资源索引表</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>其中两个最关键：</p>
    <ul>
      <li>
        <strong>
          <code>AndroidManifest.xml</code>
        </strong>{" "}
        决定了应用要什么权限。一个「手电筒」要读通讯录和短信，答案就写在里面。
      </li>
      <li>
        <strong>
          <code>META-INF/</code>
        </strong>{" "}
        里的签名决定了它有没有被改过。原版开发者签名的包和第三方重新打包的包，签名完全不同——这也是改包无法覆盖安装原版的原因。
      </li>
    </ul>

    <h2>二、为什么会有「下载 APK」这个需求</h2>
    <p>如果所有应用都能从官方商店装，这个话题根本不会存在。现实中需要手动装 APK 的场景主要有四种：</p>
    <ol>
      <li>
        <strong>所在地区商店里没有</strong>：应用没有上架你所在地区的商店，或者上架了但显示「不兼容」。
      </li>
      <li>
        <strong>需要旧版本</strong>：新版本砍掉了某个功能、改了界面，或者在你手机上更卡。
      </li>
      <li>
        <strong>应用下架或停止维护</strong>：商店里搜不到了，但你还得用。
      </li>
      <li>
        <strong>测试或开发</strong>：需要安装未上架的构建版本。
      </li>
    </ol>
    <p>
      这四种里，只有最后一种是「专业人员做专业事」，前三种都是普通用户会遇到的真实需求。所以问题不是「该不该下
      APK」，而是<strong>怎么下得对、下得安全</strong>。
    </p>

    <h2>三、APK 和「从商店安装」的真正区别</h2>
    <p>很多人以为商店装的是另一种东西，其实不是。真正的区别在于渠道带来的额外保障：</p>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">维度</th>
            <th className="text-left py-2 pr-4">应用商店安装</th>
            <th className="text-left py-2">手动安装 APK</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">安装文件</td>
            <td className="py-2 pr-4">同一个 APK（或按需下发的拆分 APK）</td>
            <td className="py-2">你自己找到的 APK</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">签名校验</td>
            <td className="py-2 pr-4">系统一样会校验</td>
            <td className="py-2">系统一样会校验</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">恶意软件扫描</td>
            <td className="py-2 pr-4">商店侧预先扫描</td>
            <td className="py-2">无，只能自己判断</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">版本更新</td>
            <td className="py-2 pr-4">自动</td>
            <td className="py-2">手动，或靠应用内更新</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">完整性保障</td>
            <td className="py-2 pr-4">商店保证是开发者上传的原包</td>
            <td className="py-2">取决于下载源是否可信</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      关键结论：<strong>安卓系统对所有安装都做签名校验，但不判断「这个包是不是开发者本人做的」</strong>
      。这就是风险的全部来源——系统只保证包没坏，不保证包是好的。
    </p>

    <h2>四、怎么判断一个 APK 靠不靠谱</h2>
    <p>不需要任何工具，按顺序问自己四个问题：</p>
    <p>
      <strong>1. 下载源是谁？</strong>
    </p>
    <ul>
      <li>✅ 官方开发者网站、官方 GitHub Releases、有签名指纹记录的大型镜像站</li>
      <li>⚠️ 网盘分享、论坛附件、群文件、「代下服务」</li>
      <li>❌ 「破解版」「去广告版」「VIP 解锁版」——这类包必然被重新签名，也必然被改过代码</li>
    </ul>
    <p>
      <strong>2. 文件名和体积正常吗？</strong>
    </p>
    <p>
      名字里带「破解版」「修改版」本身就是红旗。另外注意体积：一个正常上百 MB
      的应用，如果下到只有几 MB，多半是「下载器」外壳或广告壳。
    </p>
    <p>
      <strong>3. 权限合理吗？</strong>
    </p>
    <p>安装时会显示权限列表。一个计算器要「读取短信」「拨打电话」，直接放弃。这一步免费且最有效。</p>
    <p>
      <strong>4. 版本号对得上吗？</strong>
    </p>
    <p>
      装之前在应用内看下当前版本，下载的包版本号应该在合理范围内。Android 默认不允许降级覆盖安装，如果它「成功降级」了，说明有异常，这本身就是危险信号。
    </p>

    <h2>五、安装时的几个技术细节</h2>
    <p>
      <strong>允许安装未知来源</strong>：Android 8 之后是按应用授权，要给「发起安装的那个 App」（浏览器、文件管理器）授权，而不是一个全局开关。装完建议立刻关掉。
    </p>
    <p>
      <strong>覆盖安装 vs 全新安装</strong>：包名相同、签名相同才能覆盖安装并保留数据。签名不同会提示「应用未安装」，需要先卸载——注意
      <strong>卸载会清空应用数据</strong>，重要数据先备份。
    </p>
    <p>
      <strong>拆分 APK（APKS / XAPK）</strong>：很多应用拆成 base 加多个配置分包，不能单独安装，需要用专门的安装器合并安装。这类包从非官方渠道拿到时风险更高，因为分包可以被单独替换。
    </p>
    <p>
      <strong>「应用未安装」的常见原因</strong>：签名冲突、版本降级、存储空间不足、安装包损坏、系统禁止该来源安装。按这个顺序排查，八成能定位。
    </p>

    <h2>六、装完之后该做什么</h2>
    <ol>
      <li>
        <strong>关掉未知来源授权</strong>，避免下次误装。
      </li>
      <li>
        <strong>删除下载的 APK 文件</strong>。安装完成后它已经不被使用，留在下载目录只会越攒越多。
      </li>
      <li>
        <strong>留意异常行为</strong>：突然多出的通知、后台耗电、流量异常、桌面多出快捷方式——这些都是需要立刻检查的信号。
      </li>
      <li>
        <strong>不要给可疑应用授予「无障碍服务」和「设备管理员」权限</strong>。这两个权限一旦给出，应用能做几乎任何事，且很难卸载。
      </li>
    </ol>

    <h2>七、一句话总结</h2>
    <p>
      APK 就是安卓应用的安装包，和商店装的东西本质相同，区别只在于「谁替你做了安全检查」。理解这一点，注意力就该放在：不是找「最好的
      APK 下载站」，而是每次安装前花 30 秒判断来源、权限和需求是否匹配。
    </p>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      上的每个 APK 都直接取自 Google Play 原始文件，签名证书与官方发布者一致，不需要你自己判断来源是否可信。
    </p>
    <p>
      需求真实的场景下，从官方渠道或信誉良好的镜像站拿到原签名包，手动安装解决问题，是完全正常的操作。真正要避免的是「为了一个用不上的功能，去装一个来路不明的改包」——这才是绝大多数安卓中毒事件的起点。
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p>
      在排查「装得上但一用就崩」「升级系统后就不对劲」「权限申请没反应」这类问题时，
      <code>targetSdkVersion</code> 出现的频率比很多人想的高。但它经常被误解成「最新的就是最好的」或者「随便填个高的就行」。
    </p>
    <p>
      这篇讲清楚三件事：它到底控制什么、对普通用户和开发者分别意味着什么、为什么「为了兼容而降低它」是危险操作。
    </p>
    <blockquote>
      <p>
        <strong>一句话结论：</strong>
        <code>targetSdkVersion</code> 是应用向系统声明的「我按哪个安卓版本的行为规范来写」。系统会
        <strong>按这个版本的行为规则对待该应用</strong>，而不是按手机实际的系统版本。填低，系统就允许它继续用老的宽松规则；填高，就必须遵守新的严格规则。
      </p>
    </blockquote>

    <h2>一、三个 SDK 字段，别再搞混</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">字段</th>
            <th className="text-left py-2 pr-4">谁定义</th>
            <th className="text-left py-2 pr-4">作用</th>
            <th className="text-left py-2">不满足时</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>minSdkVersion</code>
            </td>
            <td className="py-2 pr-4">开发者</td>
            <td className="py-2 pr-4">最低支持的系统版本</td>
            <td className="py-2">直接装不上：设备不兼容</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>targetSdkVersion</code>
            </td>
            <td className="py-2 pr-4">开发者</td>
            <td className="py-2 pr-4">按哪个版本的行为规范运行</td>
            <td className="py-2">装得上，行为按旧规则</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">
              <code>compileSdkVersion</code>
            </td>
            <td className="py-2 pr-4">仅编译期</td>
            <td className="py-2 pr-4">用哪个 SDK 编译（不进 APK）</td>
            <td className="py-2">编译失败，与运行无关</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      只有前两个会写进 APK、影响设备上的实际表现。<code>compileSdkVersion</code> 只影响开发者本地编译，跟用户没关系——但它经常被误当成「给用户看的版本号」。
    </p>

    <h2>二、targetSdkVersion 到底改变了什么「行为」</h2>
    <p>
      它不是一句抽象声明，而是<strong>逐版本引入的一长串行为变更的开关</strong>。举几个真正影响体验的例子：
    </p>
    <p>
      <strong>存储（targetSdk 30 / Android 11）</strong>
    </p>
    <ul>
      <li>target ≤ 29：可以自由读写共享存储里的任意文件</li>
      <li>target ≥ 30：强制分区存储，只能访问自己的目录和媒体集合，访问 Android/data 受限</li>
    </ul>
    <p>这就是「老版本应用能直接改 /sdcard 下的文件，新版不行」的原因。</p>
    <p>
      <strong>通知（targetSdk 33 / Android 13）</strong>
    </p>
    <ul>
      <li>低于 33：装完就有通知权限</li>
      <li>33 及以上：必须运行时申请 POST_NOTIFICATIONS，用户拒绝就是没有</li>
    </ul>
    <p>
      <strong>后台位置与蓝牙（targetSdk 31 / Android 12）</strong>
    </p>
    <ul>
      <li>申请位置必须区分前台和后台，后台位置单独申请</li>
      <li>蓝牙权限被拆分，旧的 BLUETOOTH 权限在 31+ 上行为改变</li>
    </ul>
    <p>
      <strong>前台服务类型（targetSdk 34 / Android 14）</strong>
    </p>
    <ul>
      <li>必须声明服务类型（如 dataSync、location），否则启动前台服务直接抛异常</li>
    </ul>
    <p>
      <strong>组件导出声明（targetSdk 31+）</strong>
    </p>
    <ul>
      <li>未声明 android:exported 的组件在 Android 12+ 上直接安装失败或崩溃</li>
      <li>这是「老应用在 Android 12 上闪退」最常见的原因之一</li>
    </ul>
    <p>
      规律很清晰：<strong>targetSdkVersion 越高，系统对应用的限制越严，应用能「偷偷做」的事越少</strong>
      。这也解释了为什么很多应用长期不提升 targetSdk——提升意味着要重写代码、补一堆权限申请流程。
    </p>

    <h2>三、从用户角度：它决定你能不能用</h2>
    <p>
      <strong>装不上或闪退。</strong>
      android:exported 缺失导致的崩溃是 Android 12 之后老应用最常见的死法，表现是「点开就闪退」，看起来像应用坏了，其实是系统规则变了。
    </p>
    <p>
      <strong>权限突然要弹窗了。</strong>
      应用升级 targetSdk 后，原本「装完就有」的权限变成运行时申请。很多人以为是应用变流氓了，其实它终于遵守新规则了——从隐私角度这是好事。
    </p>
    <p>
      <strong>某些「黑科技」功能消失。</strong>
      文件管理器没法随意访问其他应用目录、录屏工具没法后台启动、自动化工具没法精确闹钟——大多是 targetSdk 提升后系统收紧所致。
    </p>
    <p>
      <strong>商店上架硬性要求。</strong>
      Google Play 要求新上架和更新的应用达到一定 targetSdk，所以商店里的应用不会太旧；而非商店渠道的同款 APK 有可能还是老
      targetSdk，两者行为不同——这才出现了「商店版不能用某个功能，第三方版能用」的怪现象。
    </p>

    <h2>四、从开发者角度：升级是必须的，但别一次跳</h2>
    <ol>
      <li>
        <strong>逐版本升级</strong>：29 → 30 → 31 → 32 → 33 → 34，每跳一级，逐条处理对应的行为变更。
      </li>
      <li>
        <strong>重点检查清单</strong>：存储访问、权限申请、前台服务、广播接收器、exported 声明、剪贴板访问、通知渠道、精确闹钟、照片选择器。
      </li>
      <li>
        <strong>真机验证</strong>：模拟器很难复现厂商 ROM 的差异，尤其是国产 ROM 对后台和权限的额外限制。
      </li>
      <li>
        <strong>保留兼容分支</strong>：用 Build.VERSION.SDK_INT 判断运行时系统版本，老系统走老逻辑。
      </li>
    </ol>
    <p>
      一条实用经验：targetSdk 提升后出现的问题，绝大多数不是「系统有 bug」，而是应用之前一直在享受旧规则的宽容，现在被收回了。
    </p>

    <h2>五、为什么「为了兼容而降低 targetSdk」是危险操作</h2>
    <p>网上流传一种做法：某个应用在新系统上不好用，就找个 targetSdk 更低的老版本 APK 装上。短期看能解决问题，但代价不小：</p>
    <ul>
      <li>
        <strong>安全代价</strong>：低 targetSdk 意味着应用继续享有宽松的存储、后台、权限规则。一旦这个包有问题或被替换过，它能做的事比新版本多得多。
      </li>
      <li>
        <strong>功能代价</strong>：系统会一直提示「此应用专为旧版 Android 打造」，部分机型直接限制其运行，甚至在新系统上无法安装。
      </li>
      <li>
        <strong>维护代价</strong>：等你依赖的老版本彻底不能用时，迁移成本比当初解决问题更高，因为数据和习惯都已经绑在旧版本上。
      </li>
    </ul>
    <p>
      <strong>更稳妥的替代方案</strong>：优先找官方新版本；确实需要老版本时，从可信镜像站（带签名哈希记录）下载并核对签名一致；在隔离环境（备用机、工作资料）里运行。
    </p>

    <h2>六、怎么快速查一个 APK 的 targetSdk</h2>
    <p>
      <strong>方法一：用 aapt（最直接）</strong>
    </p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
      <code>aapt dump badging app.apk | grep -E &quot;sdkVersion|targetSdkVersion&quot;</code>
    </pre>
    <p>输出会给出 sdkVersion（min）和 targetSdkVersion 两行。</p>
    <p>
      <strong>方法二：装好后在手机上查</strong>
    </p>
    <p>系统设置 → 应用 → 该应用 → 拉到底看版本信息。部分机型不显示 targetSdk，可借助应用信息类工具查看。</p>
    <p>
      <strong>方法三：反编译看 Manifest</strong>
    </p>
    <p>
      用 apktool 解包后查看 AndroidManifest.xml，uses-sdk 标签里就有 android:targetSdkVersion。适合需要同时检查权限和组件声明的情况。
    </p>

    <h2>七、常见疑问速答</h2>
    <ul>
      <li>
        <strong>targetSdk 越高越省电越流畅吗？</strong>
        不直接相关。它影响后台策略、通知、任务调度等行为，间接影响耗电。流畅度主要看代码和机型适配。
      </li>
      <li>
        <strong>系统版本比 targetSdk 低会怎样？</strong>
        只要满足 minSdk 就能装，应用按自己声明的规则运行，系统不认识的新特性被忽略。
      </li>
      <li>
        <strong>它和「应用版本号」是一回事吗？</strong>
        不是。版本号是应用自己的迭代编号，和目标 SDK 完全独立。
      </li>
      <li>
        <strong>为什么有的应用 targetSdk 很低还能在新系统跑？</strong>
        技术上可行，但系统会持续提示旧版应用，很多新 API 行为不保证，体验和安全性都很勉强。
      </li>
    </ul>

    <h2>八、总结</h2>
    <p>
      <code>targetSdkVersion</code> 是安卓权限与行为模型的「代际开关」：它决定系统用哪一套规则来对待这个应用。只需要记住三条：
    </p>
    <ol>
      <li>
        <strong>它解释了大量「新系统上老应用出问题」的现象</strong>，而不是简单的「应用坏了」。
      </li>
      <li>
        <strong>它和安全性直接挂钩</strong>：越低，应用能做的越自由，风险敞口越大。
      </li>
      <li>
        <strong>不要用降级 targetSdk 的方式解决问题</strong>，那是在用安全性换兼容性，而且换来的兼容会越来越短命。
      </li>
    </ol>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      提供的 APK 均来自 Google Play 原包，版本信息与官方一致，可以对照官方版本核对 SDK 声明，不必依赖来源不明的改包。
    </p>
    <p>真正合理的做法是：优先用官方更新版本，遇到兼容问题先定位是哪个行为变更导致的，再用对应设置或替代应用解决。</p>
  </>
);

export const zhPosts20261027: BlogPostEntry[] = [
  {
    slug: "what-is-an-apk-file-android-explained",
    title: "安卓 APK 文件是什么：它到底是什么、有什么用、怎么安全用",
    description:
      "APK 是安卓应用的安装包，本质是带特殊目录结构的 ZIP。本文拆解 APK 内部结构、与从应用商店安装的真正区别、四种需要手动装 APK 的真实场景，以及不装任何工具就能判断 APK 是否安全的四个问题。",
    date: "2026-10-27",
    readTime: "9 min read",
    tags: ["android", "apk", "入门", "安全"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-targetsdkversion-explained",
    title: "Android targetSdkVersion 说明：它到底影响什么，为什么降级会出事",
    description:
      "targetSdkVersion 决定系统按哪一套规则对待应用，而不是按手机实际系统版本。本文逐版本拆解它带来的行为变更（存储、通知、前台服务、组件导出），说明它和 minSdk 的区别、如何用 aapt 快速查看，以及为什么「降 targetSdk 换兼容」是危险操作。",
    date: "2026-10-27",
    readTime: "10 min read",
    tags: ["android", "apk", "开发", "兼容性"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261027List = toList(zhPosts20261027);
