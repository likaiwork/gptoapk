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
      很多人一遇到 Google Play「无法连接」「一直转圈」，第一反应就是清除缓存。有效时确实秒好；
      <strong>无效时</strong>说明问题不在临时缓存，而在账号、网络、GMS 或机型限制。下面按优先级排查。
    </p>

    <h2>一、先确认清的是哪几个组件</h2>
    <ol>
      <li>
        <strong>Google Play 商店</strong>：先清缓存；仍不行再清数据（会退出登录）
      </li>
      <li>
        <strong>Google Play 服务</strong>（<code>com.google.android.gms</code>）：优先清缓存
      </li>
      <li>
        <strong>Google 服务框架</strong>（部分机型）：清缓存后重启
      </li>
      <li>
        <strong>下载管理器</strong>：半截安装包也会拖死商店
      </li>
    </ol>
    <p>全部处理完后<strong>重启手机</strong>，开关一次飞行模式再试。</p>

    <h2>二、清缓存无效时的高频原因</h2>
    <table>
      <thead>
        <tr>
          <th>现象</th>
          <th>更可能原因</th>
          <th>下一步</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>转圈很久后超时</td>
          <td>DNS / 运营商拦截 / 公司网</td>
          <td>换 4G、换 DNS、关代理</td>
        </tr>
        <tr>
          <td>无法连接服务器</td>
          <td>地区网络或时间错误</td>
          <td>核对系统时间、时区</td>
        </tr>
        <tr>
          <td>登录后白屏</td>
          <td>账号地区限制</td>
          <td>换账号验证</td>
        </tr>
        <tr>
          <td>能打开但不能下载</td>
          <td>存储权限或空间不足</td>
          <td>腾出 ≥2GB，重授权限</td>
        </tr>
        <tr>
          <td>华为等国行机</td>
          <td>GMS 缺失或精简</td>
          <td>确认是否具备完整 GMS</td>
        </tr>
      </tbody>
    </table>

    <h2>三、网络与账号层（约 5 分钟）</h2>
    <ul>
      <li>换移动数据；公司 Wi‑Fi 常拦 Google CDN</li>
      <li>系统时间必须自动同步，否则 TLS 直接失败</li>
      <li>退出 Google 账号再登录，或换能正常用 Play 的账号做对照</li>
      <li>关闭私人 DNS / 广告拦截类 VPN 再测</li>
    </ul>
    <p>
      更系统的步骤见：
      <Link href="/zh/google-play-not-working">Google Play 无法使用排查</Link>。
    </p>

    <h2>四、更新 Play 商店与 Play 服务</h2>
    <ol>
      <li>设置 → 应用 → Google Play 商店 → 卸载更新，再让其自动更新</li>
      <li>检查 Google Play 服务是否被停用或省电策略杀掉</li>
    </ol>

    <h2>五、存储、权限与安全软件</h2>
    <ul>
      <li>剩余空间建议 &gt; 2GB</li>
      <li>给 Play 商店开启存储与通知权限</li>
      <li>临时关闭第三方清理/杀毒对 <code>com.android.vending</code> 的拦截</li>
    </ul>

    <h2>六、仍无效：官方包名 APK 备份</h2>
    <p>商店短期修不好，不等于应用没法装：</p>
    <ol>
      <li>
        打开 <Link href="/zh">gptoapk 中文站</Link>，搜索应用名或粘贴 Play 链接
      </li>
      <li>核对开发者与包名（例如 WhatsApp 为 <code>com.whatsapp</code>）</li>
      <li>
        按 <Link href="/zh/install-apk-guide">安装 APK 指南</Link> 开启「安装未知应用」
      </li>
    </ol>
    <p>
      社交类可走：
      <Link href="/zh/whatsapp-apk">WhatsApp APK</Link>、
      <Link href="/zh/telegram-apk">Telegram APK</Link>。AI 应用见
      <Link href="/zh/china-apk-ai-search">国内 AI APK 检索</Link>。
    </p>
    <p>侧载只解决下载与安装；推送/登录仍可能依赖 GMS，这是预期限制。</p>

    <h2>七、何时该放弃修商店</h2>
    <ul>
      <li>机型官方从未提供 GMS</li>
      <li>公司管控机禁止安装商店</li>
      <li>账号风控，换号仍失败</li>
    </ul>
    <p>此时优先官方渠道 APK，把「修商店」降为次要目标。</p>

    <h2>总结</h2>
    <p>
      清缓存无效时，按<strong>组件范围 → 网络账号 → 商店/服务版本 → 存储权限 → 官方 APK
      备份</strong>排查最高效。需要立刻安装时，在{" "}
      <Link href="/zh">gptoapk</Link> 搜索应用名或粘贴 Google Play 链接即可。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "清数据后应用更新记录会丢吗？",
    answer: "会退出登录；已安装应用一般还在，待更新列表需重新同步。",
  },
  {
    question: "只清缓存和清数据有什么区别？",
    answer: "清缓存更安全；清数据等于重置该应用，需重新登录。",
  },
  {
    question: "侧载和从 Play 更新会冲突吗？",
    answer: "同一签名、同一包名可覆盖安装；签名不一致需先卸载并注意备份。",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      「图标一样」不等于官方应用。假 APK 常见手段：仿冒图标、二次打包、相似开发者名。安装前用
      <strong>包名、签名、来源、哈希</strong>交叉核对。
    </p>

    <h2>一、假 APK 通常长什么样</h2>
    <ul>
      <li>文件名带「解锁版 / 高级版 / 免更新」</li>
      <li>权限异常多（短信、辅助功能、设备管理器）</li>
      <li>包名多一段随机字符，或完全不同却图标一样</li>
      <li>来自短链、网盘、陌生人私信</li>
    </ul>

    <h2>二、第一关：包名必须对得上</h2>
    <table>
      <thead>
        <tr>
          <th>应用</th>
          <th>官方包名</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>WhatsApp</td>
          <td>
            <code>com.whatsapp</code>
          </td>
        </tr>
        <tr>
          <td>Telegram</td>
          <td>
            <code>org.telegram.messenger</code>
          </td>
        </tr>
        <tr>
          <td>Instagram</td>
          <td>
            <code>com.instagram.android</code>
          </td>
        </tr>
        <tr>
          <td>ChatGPT</td>
          <td>
            <code>com.openai.chatgpt</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      在 <Link href="/zh">gptoapk</Link> 搜索时对照包名与开发者。工具页：
      <Link href="/zh/whatsapp-apk">WhatsApp</Link>、
      <Link href="/zh/instagram-apk">Instagram</Link>、
      <Link href="/zh/chatgpt-apk">ChatGPT</Link>。
    </p>

    <h2>三、第二关：签名证书（最关键）</h2>
    <p>正版更新依赖同一签名。假包往往重新签名：</p>
    <ol>
      <li>
        用 <code>apksigner verify --print-certs your.apk</code> 查看证书 SHA-256
      </li>
      <li>与官网/可信镜像或手机里已装正版对比</li>
      <li>不一致则不要覆盖安装</li>
    </ol>
    <p>任何「必须先卸载官方才能装」的增强版都高度可疑。</p>

    <h2>四、第三关：开发者与版本</h2>
    <ul>
      <li>开发者名、网站是否与 Play 一致</li>
      <li>
        <code>versionCode</code> 是否异常偏高（骗覆盖）
      </li>
      <li>是否索要设备管理员 / 无障碍「永久开启」</li>
    </ul>
    <p>银行、钱包、验证器：只信官网或 Play。</p>

    <h2>五、第四关：来源</h2>
    <ol>
      <li>Google Play（可用时）</li>
      <li>开发者官网</li>
      <li>信誉镜像（核对哈希）</li>
      <li>
        <Link href="/zh">gptoapk</Link> 等按 Play 包名检索的工具
      </li>
    </ol>
    <p>
      安装流程见 <Link href="/zh/install-apk-guide">安装 APK 指南</Link>；社交入口见{" "}
      <Link href="/zh/social-apps">社交应用合集</Link>。
    </p>

    <h2>六、已经装上假包怎么办</h2>
    <ol>
      <li>飞行模式断网</li>
      <li>撤销设备管理员 / 无障碍</li>
      <li>卸载该应用</li>
      <li>改密码并开两步验证</li>
      <li>银行类联系客服</li>
    </ol>

    <h2>七、安装前 30 秒清单</h2>
    <ul>
      <li>包名与官方一致</li>
      <li>开发者名称一致</li>
      <li>无异常权限索取</li>
      <li>来源可追溯</li>
      <li>有条件时核对签名/哈希</li>
    </ul>

    <h2>总结</h2>
    <p>
      识别假 APK 靠交叉验证，不是靠图标。签名冲突与来源不明是最高危信号。需要按官方包名找安装包时，打开{" "}
      <Link href="/zh">gptoapk</Link> 搜索应用名或粘贴 Google Play 链接即可。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "包名一样就一定是正版吗？",
    answer: "不一定。签名才是区分二次打包的核心；包名对且签名对才相对安全。",
  },
  {
    question: "Play Protect 提示有害一定是假包吗？",
    answer: "多数值得警惕；偶发误报可换官方源复测，不要为继续安装而关掉保护乱点确认。",
  },
  {
    question: "XAPK / APKS 更容易是假的吗？",
    answer: "格式本身无辜，但分流站点更杂，更要核包名与签名。",
  },
];

export const zhPosts20260716: BlogPostEntry[] = [
  {
    slug: "clear-play-cache-not-working",
    title: "清理 Google Play 缓存无效时还能怎么做",
    description:
      "清过 Play 商店和应用商店服务缓存仍打不开、一直转圈？按网络、账号、GMS、系统更新与 APK 侧载备份方案逐步排查。",
    date: "2026-07-16",
    readTime: "8 分钟阅读",
    tags: ["Google Play", "清缓存", "故障排查", "GMS", "APK", "gptoapk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "fake-apk-how-to-spot",
    title: "如何识别假 APK：签名、包名与来源核对",
    description:
      "假 APK、改包、马甲包怎么认？用包名、签名证书、开发者信息与文件哈希交叉核对，避免装到窃号木马。",
    date: "2026-07-17",
    readTime: "8 分钟阅读",
    tags: ["假 APK", "签名验证", "包名", "安全", "侧载", "gptoapk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20260716List = toList(zhPosts20260716);
