import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export interface PopularAppGuide {
  slug: string;
  name: string;
  titleName: string;
  developer: string;
  packageName: string;
  searchTerms: string[];
  summary: string;
  citationAnswer: string;
  whyNeedApk: string;
  highlights: string[];
  installNotes: string[];
  faqs: Array<{ question: string; answer: string }>;
  category: "social" | "messaging" | "video" | "tools" | "ai-overseas";
}

const siteUrl = "https://www.gptoapk.com";
const publishedDate = "2026-05-19";
const authorUrl = `${siteUrl}/author/gptoapk`;

export const popularAppGuides: Record<string, PopularAppGuide> = {
  instagram: {
    slug: "instagram-apk",
    name: "Instagram",
    titleName: "Instagram",
    developer: "Meta",
    packageName: "com.instagram.android",
    searchTerms: ["Instagram", "ins", "com.instagram.android"],
    category: "social",
    summary: "Instagram 是全球最受欢迎的图片和短视频社交平台，月活用户超过 20 亿。用户可以分享照片、短视频 Reels、快拍 Stories，以及通过私信与朋友交流。",
    citationAnswer: "国内用户可以通过 gptoapk.com 搜索 Instagram 或包名 com.instagram.android 下载官方 APK。安装前核对开发者 Meta 和包名，在 Android 设置中允许安装未知来源应用后即可安装。",
    whyNeedApk: "Google Play 在中国大陆无法直接访问，且部分国产手机（华为、荣耀等）没有预装 Google 服务。通过 APK 下载是最直接的安装方式。",
    highlights: ["图片和短视频分享", "Reels 短视频", "快拍 Stories（24小时消失）", "私信 Direct Message", "探索和发现新内容"],
    installNotes: ["在 gptoapk.com 搜索 Instagram 或 ins。", "核对应用名 Instagram、开发者 Meta 和包名 com.instagram.android。", "下载 APK 后，在手机设置中允许浏览器安装未知来源应用。", "安装完成后，用手机号、邮箱或 Facebook 账号注册/登录。"],
    faqs: [
      { question: "Instagram APK 的包名是什么？", answer: "Instagram Android 应用的官方包名是 com.instagram.android，开发者为 Meta。下载前应核对包名和开发者信息，避免安装修改版。" },
      { question: "国内使用 Instagram 需要 VPN 吗？", answer: "Instagram 在中国大陆被屏蔽，浏览内容和发布需要开启 VPN。安装 APK 本身不需要 VPN，但注册和使用需要网络工具。" },
      { question: "华为手机如何安装 Instagram APK？", answer: "在 gptoapk.com 下载 Instagram APK 后，前往设置 → 安全 → 允许安装未知来源应用。华为手机不需要 Google 服务也能安装和运行 Instagram。" },
      { question: "Instagram APK 安全吗？", answer: "gptoapk.com 提供的是 Google Play 来源的官方原版 APK，由 Meta 签名。只要核对包名和开发者一致，就是安全的。" },
    ],
  },
  tiktok: {
    slug: "tiktok-apk",
    name: "TikTok",
    titleName: "TikTok",
    developer: "ByteDance (字节跳动)",
    packageName: "com.zhiliaoapp.musically",
    searchTerms: ["TikTok", "tiktok", "com.zhiliaoapp.musically"],
    category: "video",
    summary: "TikTok 是字节跳动旗下的全球短视频平台，覆盖 150+ 国家和地区。用户可以观看、创作和分享 15 秒到 10 分钟的短视频，拥有强大的推荐算法和创意工具。",
    citationAnswer: "可以通过 gptoapk.com 搜索 TikTok 或包名 com.zhiliaoapp.musically 下载国际版官方 APK。注意国际版 TikTok 和国内抖音是不同的应用，包名和功能都有区别。",
    whyNeedApk: "国际版 TikTok 在国内应用商店不可用，Google Play 也无法直接访问。中国用户如需使用国际版 TikTok，APK 安装是主要途径。",
    highlights: ["短视频推荐和浏览", "视频拍摄和编辑工具", "特效滤镜和音乐库", "直播功能", "创作者变现"],
    installNotes: ["在 gptoapk.com 搜索 TikTok。", "确认包名为 com.zhiliaoapp.musically（这是国际版 TikTok，不是国内抖音）。", "下载 APK 后允许安装未知来源应用。", "安装完成后注册账号即可使用。"],
    faqs: [
      { question: "TikTok 国际版和抖音有什么区别？", answer: "TikTok 是面向海外市场的国际版，包名为 com.zhiliaoapp.musically。抖音是国内版，包名为 com.ss.android.ugc.aweme。两者数据不互通，内容和功能也有所不同。" },
      { question: "国内怎么下载 TikTok 国际版 APK？", answer: "在 gptoapk.com 搜索 TikTok 并核对包名 com.zhiliaoapp.musically，下载后手动安装即可。安装前需要在手机设置中允许安装未知来源应用。" },
      { question: "TikTok 在国内能直接用吗？", answer: "TikTok 国际版在中国大陆通常无法直接访问。浏览内容和发布需要使用网络工具。安装 APK 本身不需要特殊网络环境。" },
      { question: "TikTok APK 安全吗？", answer: "从 Google Play 来源下载的 TikTok 官方 APK 是安全的。gptoapk.com 提供的是字节跳动官方签名的原版安装包，不含修改或恶意代码。" },
    ],
  },
  facebook: {
    slug: "facebook-apk",
    name: "Facebook",
    titleName: "Facebook",
    developer: "Meta",
    packageName: "com.facebook.katana",
    searchTerms: ["Facebook", "facebook", "脸书", "com.facebook.katana"],
    category: "social",
    summary:
      "Facebook（脸书）是 Meta 旗下全球最大的社交网络，支持动态、好友、群组、Reels 与 Marketplace。Android 官方包名为 com.facebook.katana。",
    citationAnswer:
      "在 gptoapk.com/zh 搜索 Facebook 或包名 com.facebook.katana，核对开发者 Meta 后下载 APK。官网入口为 facebook.com；即时通讯需另装 Messenger（com.facebook.orca）。",
    whyNeedApk:
      "中国大陆无法稳定使用 Google Play，Facebook 亦无法从国内主流应用商店获取官方最新版。通过 APK 安装是获取 facebook 安卓下载、facebook 官方下载 的常见方式。",
    highlights: ["好友动态与互动", "Reels 短视频", "群组 Groups", "Marketplace 二手交易", "直播与 Watch 视频"],
    installNotes: [
      "在 gptoapk.com 搜索 Facebook 或 facebook下载。",
      "核对应用名 Facebook、开发者 Meta、包名 com.facebook.katana。",
      "下载 APK 后在设置中允许安装未知来源应用。",
      "安装完成后可用邮箱/手机号注册或 facebook 登录；聊天建议另装 Messenger。",
    ],
    faqs: [
      {
        question: "facebook下载 / facebook安卓下载最新版 怎么操作？",
        answer:
          "在 gptoapk.com 搜索 Facebook，确认包名 com.facebook.katana 与开发者 Meta 后下载安装。也可参考站内《Facebook下载完整指南》获取分步说明。",
      },
      {
        question: "facebook是什么？facebook是什么意思？",
        answer:
          "Facebook 是全球社交网络，中文常称脸书，用于加好友、发动态、看视频等。母公司已更名为 Meta，但应用仍叫 Facebook。",
      },
      {
        question: "facebook官网与 facebook.com 登录入口在哪？",
        answer: "官网为 facebook.com，登录页常见路径为 facebook.com/login。安卓用户也可安装官方 App 后直接登录。",
      },
      {
        question: "facebook怎么注册？",
        answer:
          "打开 App 或官网，点击「创建新账户」，填写姓名、邮箱或手机号、密码与生日等信息并完成验证。须年满 13 岁。",
      },
      {
        question: "facebook messenger 要单独下载吗？",
        answer: "是的。Messenger 为独立应用，包名 com.facebook.orca，在 gptoapk 搜索 Messenger 下载，用 Facebook 账号登录即可。",
      },
      {
        question: "facebook股票、facebook股价、facebook市值 和下载有关吗？",
        answer:
          "无关。Facebook 母公司已在纳斯达克以股票代码 META 上市。本文站仅提供 Android APK 安装说明，不提供证券投资建议。",
      },
    ],
  },
  whatsapp: {
    slug: "whatsapp-apk",
    name: "WhatsApp",
    titleName: "WhatsApp Messenger",
    developer: "Meta",
    packageName: "com.whatsapp",
    searchTerms: ["WhatsApp", "whatsapp", "com.whatsapp"],
    category: "messaging",
    summary: "WhatsApp 是全球用户量最大的即时通讯应用，月活用户超过 20 亿。支持端到端加密的文字消息、语音通话、视频通话、文件分享和群组聊天。",
    citationAnswer: "国内用户可以通过 gptoapk.com 搜索 WhatsApp 或包名 com.whatsapp 下载官方 APK。安装前核对开发者 Meta 和包名，允许安装未知来源应用后即可安装。",
    whyNeedApk: "WhatsApp 虽然在国内应用商店可以找到，但版本可能较旧。通过 Google Play 来源的 APK 可以获得最新版本和安全更新。对于没有 Google Play 的华为设备来说，APK 安装更是必要途径。",
    highlights: ["端到端加密消息", "语音和视频通话", "群组聊天（最多 1024 人）", "文件分享和位置共享", "WhatsApp Web 电脑端同步"],
    installNotes: ["在 gptoapk.com 搜索 WhatsApp。", "核对包名 com.whatsapp 和开发者 Meta。", "下载 APK 后允许安装未知来源应用。", "安装完成后用手机号验证并登录。"],
    faqs: [
      { question: "WhatsApp APK 的包名是什么？", answer: "WhatsApp 官方 Android 应用的包名是 com.whatsapp，开发者是 Meta。下载前应确认包名一致。" },
      { question: "国内使用 WhatsApp 需要 VPN 吗？", answer: "WhatsApp 在中国大陆通常被屏蔽，发送消息和通话需要开启 VPN。安装 APK 本身不需要特殊网络环境。" },
      { question: "WhatsApp 和微信有什么区别？", answer: "WhatsApp 更注重隐私和简洁通讯，支持端到端加密。微信是集成了支付、小程序、朋友圈等功能的超级 App。WhatsApp 在国际上更通用。" },
      { question: "华为手机能用 WhatsApp 吗？", answer: "可以。华为手机下载 WhatsApp APK 后手动安装即可。WhatsApp 不需要 Google Play 服务也能运行，但消息推送可能受华为后台管理影响。" },
    ],
  },
};

export function createPopularAppMetadata(app: PopularAppGuide): Metadata {
  return {
    title: `国内怎么下载 ${app.name} APK？${app.name} Android 安装教程（中国大陆可用）`,
    description: `${app.summary} 本文提供 ${app.name} Android APK 下载、安装步骤、安全校验和常见问题解答。包名：${app.packageName}。`,
    alternates: {
      canonical: `${siteUrl}/zh/${app.slug}`,
    },
    keywords: [
      `${app.name} APK`,
      `${app.name} 下载`,
      `国内怎么下载${app.name}`,
      `${app.name} 安卓`,
      `安装${app.name}`,
      app.packageName,
    ],
  };
}

export function PopularAppGuidePage({ app }: { app: PopularAppGuide }) {
  const pageUrl = `${siteUrl}/zh/${app.slug}`;
  const howToSteps = [
    `打开 gptoapk.com，在搜索框输入 ${app.searchTerms.slice(0, 2).join(" 或 ")}。`,
    `核对应用名、开发者 ${app.developer} 和包名 ${app.packageName}。`,
    "点击下载 APK，等待浏览器保存安装包。",
    "在 Android 设置中允许当前浏览器或文件管理器安装未知来源应用。",
    `打开下载的 APK 文件并安装 ${app.name}。`,
  ];

  const schemaGraph = [
    {
      "@type": "SoftwareApplication",
      name: app.titleName,
      alternateName: app.searchTerms,
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Android",
      softwareVersion: "Latest",
      identifier: app.packageName,
      url: pageUrl,
      downloadUrl: siteUrl,
      author: { "@type": "Organization", name: app.developer },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "HowTo",
      name: `${app.name} APK 下载安装步骤`,
      description: `如何在 Android 手机上下载并安装 ${app.name} APK（适用于中国大陆用户）。`,
      step: howToSteps.map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: `步骤 ${index + 1}`,
        text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: app.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${siteUrl}/zh` },
        { "@type": "ListItem", position: 2, name: `${app.name} APK`, item: pageUrl },
      ],
    },
    {
      "@type": "TechArticle",
      headline: `国内怎么下载 ${app.name} APK — ${app.name} Android 安装教程`,
      description: app.summary,
      datePublished: publishedDate,
      dateModified: publishedDate,
      inLanguage: "zh-CN",
      mainEntityOfPage: pageUrl,
      publisher: { "@type": "Organization", name: "gptoapk.com", url: siteUrl },
      author: { "@type": "Organization", name: "gptoapk.com Editorial", url: authorUrl },
      reviewedBy: { "@type": "Organization", name: "gptoapk.com Editorial", url: authorUrl },
      isAccessibleForFree: true,
      about: ["Android APK", app.name, app.packageName, "中国大陆安装教程"],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/zh" className="hover:underline">首页</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">{app.name} APK 下载</span>
      </nav>

      <h1 className="mb-6 text-3xl font-extrabold sm:text-4xl">
        国内怎么下载 {app.name} APK？{app.name} Android 安装教程
      </h1>

      <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
        <span>更新：{publishedDate}</span>
        <span>编辑：<Link href="/author/gptoapk" className="text-blue-600 hover:underline dark:text-blue-400">gptoapk.com Editorial</Link></span>
      </div>

      <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        {app.summary}
      </p>

      {/* AI 快速答案块 */}
      <section className="mb-8 border-l-4 border-blue-600 bg-blue-50 p-5 dark:bg-blue-950/30">
        <p className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">快速答案</p>
        <p className="leading-relaxed text-slate-700 dark:text-slate-200">{app.citationAnswer}</p>
      </section>

      {/* 为什么需要 APK */}
      <h2 className="mb-4 mt-10 text-2xl font-bold">为什么 {app.name} 在中国需要 APK 下载？</h2>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">{app.whyNeedApk}</p>
      <ul className="mb-8 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
        <li><strong>Google Play 被屏蔽</strong> — Google Play 商店在中国大陆无法直接访问。</li>
        <li><strong>部分国产手机无 GMS</strong> — 华为、荣耀等设备没有预装 Google 服务，无法打开 Play 商店。</li>
        <li><strong>地区限制</strong> — 部分应用在 Google Play 上可能不面向中国大陆地区发布。</li>
        <li><strong>APK 是最快方案</strong> — 通过 APK 文件直接安装，无需注册 Google 账号或绑定支付方式。</li>
      </ul>

      {/* 应用信息表 */}
      <h2 className="mb-4 mt-10 text-2xl font-bold">{app.name} APK 最新信息</h2>
      <div className="mb-8 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
          <tbody>
            <tr>
              <td className="border border-slate-200 p-3 font-medium dark:border-slate-700">应用名称</td>
              <td className="border border-slate-200 p-3 dark:border-slate-700">{app.titleName}</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-3 font-medium dark:border-slate-700">开发者</td>
              <td className="border border-slate-200 p-3 dark:border-slate-700">{app.developer}</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-3 font-medium dark:border-slate-700">Google Play 包名</td>
              <td className="border border-slate-200 p-3 font-mono text-sm dark:border-slate-700">{app.packageName}</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-3 font-medium dark:border-slate-700">推荐搜索词</td>
              <td className="border border-slate-200 p-3 dark:border-slate-700">{app.searchTerms.join(" / ")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 核心功能 */}
      <h2 className="mb-4 mt-10 text-2xl font-bold">{app.name} 核心功能</h2>
      <ul className="mb-8 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
        {app.highlights.map((item) => <li key={item}>{item}</li>)}
      </ul>

      {/* 下载步骤 */}
      <h2 className="mb-4 mt-10 text-2xl font-bold">从 gptoapk.com 下载 {app.name} APK</h2>
      <ol className="mb-8 list-inside list-decimal space-y-3 text-slate-700 dark:text-slate-300">
        {app.installNotes.map((note) => <li key={note}>{note}</li>)}
      </ol>

      {/* 安装步骤 */}
      <h2 className="mb-4 mt-10 text-2xl font-bold">Android 通用安装步骤</h2>
      <ol className="mb-8 list-inside list-decimal space-y-3 text-slate-700 dark:text-slate-300">
        {howToSteps.map((step) => <li key={step}>{step}</li>)}
      </ol>
      <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        适用于华为、小米、OPPO、vivo、荣耀、三星等主流 Android 手机。不同品牌的"允许安装未知来源应用"选项位置略有不同，一般在 设置 → 安全 或 设置 → 应用 → 特殊权限 中。
      </p>

      {/* 安全说明 */}
      <h2 className="mb-4 mt-10 text-2xl font-bold">{app.name} APK 安全说明</h2>
      <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
        gptoapk.com 提供的是从 Google Play 官方服务器获取的原始 APK 文件，由 {app.developer} 官方签名。下载前请核对应用名、包名（{app.packageName}）和开发者信息。不要安装来源不明、包名不一致或要求异常权限的安装包。gptoapk.com 是独立工具站，不是 {app.developer} 的官方网站。
      </p>

      {/* FAQ */}
      <h2 className="mb-4 mt-10 text-2xl font-bold">常见问题 FAQ</h2>
      <div className="mb-8 space-y-4">
        {app.faqs.map((faq) => (
          <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-2 font-bold">{faq.question}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* 相关应用推荐 */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="mb-4 text-xl font-bold">相关应用教程</h2>
        <ul className="space-y-2">
          {Object.values(popularAppGuides)
            .filter((item) => item.slug !== app.slug)
            .map((item) => (
              <li key={item.slug}>
                <Link href={`/zh/${item.slug}`} className="text-blue-600 hover:underline dark:text-blue-400">
                  {item.name} APK 下载安装教程
                </Link>
              </li>
            ))}
          <li><Link href="/zh/chatgpt-apk" className="text-blue-600 hover:underline dark:text-blue-400">ChatGPT APK 下载教程</Link></li>
          <li><Link href="/zh/china-apk-ai-search" className="text-blue-600 hover:underline dark:text-blue-400">国内 APK 下载与 AI 应用安装指南</Link></li>
          <li><Link href="/zh/google-play-not-working" className="text-blue-600 hover:underline dark:text-blue-400">Google Play 无法访问怎么办</Link></li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="mb-2 text-lg font-semibold">需要最新版 APK？</p>
        <p className="mb-4">
          访问 <Link href="/zh" className="font-medium text-blue-600 hover:underline dark:text-blue-400">gptoapk.com</Link>，输入 {app.searchTerms[0]} 或包名 {app.packageName} 搜索官方应用。
        </p>
        <Link href="/zh" className="inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700">
          开始搜索
        </Link>
      </div>

      <Script
        id={`schema-${app.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": schemaGraph,
          }),
        }}
      />
    </div>
  );
}
