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
      <p>出国前最常见的翻车不是签证，而是手机：落地发现地图打不开、打车 App 没有、银行 App 发不了验证码、支付要二次验证却收不到短信。这些都可以在国内提前 30 分钟解决。下面是一份按时间顺序排的清单，从出发前 7 天到落地后 10 分钟。</p>
      <p><strong>核心观点：安卓出国的核心矛盾是「应用生态 ≠ 网络环境」。</strong>你需要应用能装、能登录、能在当地网络下正常联网——这三件事要分别验证，不能只验证其中一件。</p>
      <h2>出发前 7 天：应用盘点</h2>
      <h3>第 1 步：按场景列必备 App 清单</h3>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>通讯</strong>：WhatsApp / Telegram / 微信 / 邮件客户端</li>
        <li><strong>导航</strong>：Google Maps（支持离线地图）/ Apple Maps</li>
        <li><strong>打车</strong>：Uber / Grab（东南亚）/ Bolt（欧洲）</li>
        <li><strong>住宿</strong>：Booking / Airbnb</li>
        <li><strong>交通</strong>：Trainline（欧洲）、日本换乘案内等当地铁路 App</li>
        <li><strong>支付</strong>：信用卡 App / PayPal</li>
        <li><strong>翻译</strong>：Google 翻译（可下载离线语言包）</li>
      </ul>
      <p>关键动作：每个 App 都至少打开一次并完成登录。很多 App 首次登录需要手机验证码，在国内网络下更容易收到。</p>
      <h3>第 2 步：提前确认 Google Play 服务</h3>
      <p>大部分出国必备 App 依赖 Google Play 服务（GMS）。国行手机如果没预装，需要提前装好框架，否则 App 会出现闪退、白屏、无法定位。确认「设置 → 应用 → 显示系统应用」里能看到 Google Play 服务；没有的话提前安装对应机型的 GMS 安装包，并在国内网络下完成首次初始化，然后登录 Play 商店下载一个免费 App 验证。</p>
      <h3>第 3 步：准备离线 APK 作为备份</h3>
      <p>出国后最怕「应用商店打不开，但急需某个 App」。做法：在国内把必装 App 的最新 APK 下载好放在手机 Download 目录或 U 盘；记录版本号和来源；安装前在「设置 → 安全」里开启「允许来自此来源的应用」，装完再关掉。只从官网或可信镜像站下载，装后核对应用签名指纹。</p>
      <h2>出发前 3 天：网络与账号</h2>
      <h3>第 4 步：选好数据方案</h3>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">方案</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">适合</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">注意</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">国际漫游包</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">短途、商务</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">部分运营商限制应用商店访问</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">当地 SIM 卡</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">停留超过 5 天</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">机场购买，常需护照实名</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">eSIM</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">多国行程</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">出发前在线购买并安装，落地即用</td></tr></tbody>
      </table></div>
      <p>先确认手机支持 eSIM（设置里搜索「eSIM」），国行部分机型不支持。</p>
      <h3>第 5 步：把验证码切到能收到的通道</h3>
      <p>银行、支付、航司几乎所有「异地登录」都会触发短信验证。出发前确认银行预留手机号能国际漫游收短信，装好对应的安全认证 App 并提前验证一次境外登录，准备好备用验证方式（邮箱验证码或人脸识别）。</p>
      <h3>第 6 步：关掉可能出问题的自动功能</h3>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li>应用商店改为手动更新，避免商店异常时拖住你</li>
        <li>系统时间改为手动，跨时区后自动时区有时会造成日历和闹钟错乱</li>
        <li>确认「漫游数据」默认不是禁用状态——这是落地后「没网」最常见的原因</li>
      </ul>
      <h2>出发前 1 天：下载与备份</h2>
      <h3>第 7 步：离线地图与离线翻译包</h3>
      <p>Google Maps 搜索城市名 → 下拉菜单 → 下载离线地图（每个城市约 200–500MB）；Google 翻译下载目标语言离线包；截图保存当地紧急电话。</p>
      <h3>第 8 步：备份一次，并把证件存本地</h3>
      <p>照片和聊天记录备份到云端或电脑。护照、签证、机票、酒店确认单拍照存到本地文件夹，不要只存云盘——无网时打不开。</p>
      <h2>落地后 10 分钟</h2>
      <h3>第 9 步：装卡并验证网络</h3>
      <p>插卡 → 等待运营商注册 → 打开浏览器访问任意网页 → 打开 Google Maps 确认定位。</p>
      <h3>第 10 步：按顺序测试关键 App</h3>
      <p>通讯 → 导航 → 打车 → 支付，各打开一次。首次打开报错通常是网络还没通，或 Google 服务版本过旧，先解决这两项再考虑重装。</p>
      <h3>第 11 步：定位与权限</h3>
      <p>给地图、打车 App 授予精确位置，确认「Google 位置精确度」已开启（多数安卓机依赖它定位），关闭省电模式——省电模式常限制后台定位导致打车定位漂移。</p>
      <h3>第 12 步：设一个本地应急方案</h3>
      <p>截图酒店地址的当地语言版本给司机看；存一个可用的国际漫游拨号方式；记住紧急电话（欧洲 112、美国 911、英国 999）。</p>
      <h2>常见坑点速查</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>App 显示「此地不可用」</strong>：多为账号地区与 IP 地区不匹配。用当地网络重新登录一次即可，不要频繁切换。</li>
        <li><strong>Play 商店一直转圈</strong>：先查网络，再清 Play 商店缓存（设置 → 应用 → Google Play 商店 → 存储 → 清除缓存），最后才考虑清除数据。</li>
        <li><strong>提示「不兼容」</strong>：设备型号/系统版本不满足要求，或账号地区限制。优先在国内网络下完成安装。</li>
        <li><strong>定位准但没路线</strong>：该区域道路数据未下载，联网加载一次即可。</li>
      </ul>
      <p>出国前的准备只需三步：国内先装好、国内先登录、离线先备份。落地后按「网络 → 定位 → App」的顺序逐层排查，绝大多数问题都能在两分钟内定位。</p>
  </>
);

export const zhPosts20261119B = [
  {
    slug: "android-travel-abroad-app-checklist",
    title: "出国旅行前，安卓手机应用该做哪些准备？12 步完整清单（2026）",
    description: "出国翻车多半在手机上：地图打不开、打车 App 缺失、银行验证码收不到。本文按出发前 7 天到落地后 10 分钟给出 12 步清单，覆盖 GMS 准备、离线 APK 备份、eSIM 与当地卡选择、漫游数据开关、离线地图与落地后排查顺序。",
    date: "2026-11-19",
    readTime: "7 min read",
    tags: ["出国必备","Android","eSIM","离线APK","Google服务","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261119BList = toList(zhPosts20261119B);
