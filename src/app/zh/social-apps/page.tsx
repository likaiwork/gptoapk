import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const siteUrl = "https://gptoapk.com";
const pageUrl = `${siteUrl}/zh/social-apps`;
const updated = "2026-05-19";

const appGroups = {
  social: {
    title: "社交应用",
    apps: [
      { name: "Instagram", href: "/zh/instagram-apk", packageName: "com.instagram.android", desc: "图片和短视频社交平台，月活 20 亿+", developer: "Meta" },
      { name: "TikTok", href: "/zh/tiktok-apk", packageName: "com.zhiliaoapp.musically", desc: "全球短视频平台，覆盖 150+ 国家", developer: "字节跳动" },
    ],
  },
  messaging: {
    title: "即时通讯",
    apps: [
      { name: "Telegram", href: "/zh/telegram-apk", packageName: "org.telegram.messenger", desc: "加密即时通讯，频道和机器人生态", developer: "Telegram FZ-LLC" },
      { name: "WhatsApp", href: "/zh/whatsapp-apk", packageName: "com.whatsapp", desc: "全球最大即时通讯应用，端到端加密", developer: "Meta" },
    ],
  },
  video: {
    title: "视频与娱乐",
    apps: [
      { name: "YouTube", href: "/zh/youtube-apk", packageName: "com.google.android.youtube", desc: "全球最大视频平台", developer: "Google" },
    ],
  },
};

const installSteps = [
  "打开 gptoapk.com，搜索应用名称或包名。",
  "核对搜索结果中的应用名称、开发者、包名和图标。",
  "点击下载 APK，等待浏览器保存安装包。",
  "在 Android 设置 → 安全 → 允许安装未知来源应用。",
  "打开下载的 APK 文件，按提示完成安装。",
  "安装完成后，建议关闭未知来源安装权限以确保安全。",
];

const faqs = [
  {
    question: "国内怎么下载 Instagram/TikTok/WhatsApp 等海外社交应用 APK？",
    answer: "在 gptoapk.com 搜索应用名称或包名（如 Instagram 包名 com.instagram.android），下载 APK 后核对开发者、包名和签名信息，然后在 Android 设置中允许安装未知来源应用即可。",
  },
  {
    question: "海外社交应用 APK 安全吗？下载会被植入病毒吗？",
    answer: "gptoapk.com 直接从 Google Play 官方服务器获取 APK 文件，提供的是官方签名原版安装包。下载前核对包名和开发者与官方信息一致，不要安装来源不明或包名不同的修改版。",
  },
  {
    question: "使用这些海外社交应用需要 VPN 吗？",
    answer: "大部分海外社交应用（Instagram、TikTok、YouTube、WhatsApp、Telegram 等）在中国大陆被屏蔽，使用服务时需要开启 VPN。安装 APK 本身不需要 VPN。",
  },
  {
    question: "华为手机能否安装这些海外应用？",
    answer: "可以。华为手机虽然缺少 Google 服务，但大多数海外应用可以通过 APK 直接安装并正常使用。部分依赖 Google 登录的应用可能需要额外设置。",
  },
  {
    question: "安装 APK 后如何更新？",
    answer: "当应用有新版本时，可以在 gptoapk.com 重新搜索下载最新版 APK，直接安装覆盖旧版本即可。原有数据和登录状态通常会自动保留。",
  },
];

export const metadata: Metadata = {
  title: "国内怎么下载海外社交应用 APK？Instagram/TikTok/WhatsApp/Telegram/YouTube 安装教程",
  description: "国内用户下载 Instagram、TikTok、WhatsApp、Telegram、YouTube 等海外社交应用 APK 的完整指南。包含包名核对、安装步骤和安全说明。",
  alternates: { canonical: pageUrl },
  keywords: [
    "海外社交应用APK", "Instagram下载", "TikTok下载", "WhatsApp下载",
    "Telegram下载", "YouTube下载", "国内下载海外应用", "社交应用APK安装",
  ],
};

export default function SocialAppsPage() {
  const schemaGraph = [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "海外社交应用 APK 下载安装指南",
      description: metadata.description,
      inLanguage: "zh-CN",
      datePublished: updated,
      dateModified: updated,
      isAccessibleForFree: true,
      publisher: { "@type": "Organization", name: "gptoapk.com", url: siteUrl },
    },
    {
      "@type": "ItemList",
      name: "海外社交应用 APK 安装指南列表",
      itemListElement: Object.values(appGroups).flatMap((group) =>
        group.apps.map((app, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}${app.href}`,
          name: app.name,
          description: `${app.name} Android APK 安装指南，包名：${app.packageName}，开发者：${app.developer}`,
        }))
      ),
    },
    {
      "@type": "HowTo",
      name: "海外社交应用 APK 通用安装步骤",
      step: installSteps.map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: `步骤 ${index + 1}`,
        text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${siteUrl}/zh` },
        { "@type": "ListItem", position: 2, name: "海外社交应用 APK", item: pageUrl },
      ],
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/zh" className="hover:underline">首页</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">海外社交应用 APK 下载</span>
      </nav>

      <section className="mb-10">
        <p className="mb-3 text-sm font-semibold text-blue-600 dark:text-blue-400">海外社交应用 APK 安装指南</p>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-4xl">
          国内怎么下载海外社交应用 APK？
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Instagram、TikTok、WhatsApp、Telegram、YouTube 等海外社交应用在国内应用商店无法下载。
          本文整理了这些应用的官方 APK 下载入口、包名核对和安装教程，帮助国内 Android 用户安全安装海外应用。
        </p>
      </section>

      {/* 快速答案 */}
      <section className="mb-8 border-l-4 border-blue-600 bg-blue-50 p-5 dark:bg-blue-950/30">
        <p className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">快速答案</p>
        <p className="leading-relaxed text-slate-700 dark:text-slate-200">
          国内 Android 用户可以通过 gptoapk.com 搜索应用名或包名下载海外社交应用 APK。下载前核对应用名、开发者和包名是否与官方信息一致，安装前在系统设置中允许安装未知来源应用。安装 APK 本身不需要 VPN，但使用这些应用通常需要网络工具。
        </p>
      </section>

      {/* 应用列表按分类 */}
      {Object.entries(appGroups).map(([key, group]) => (
        <section key={key} className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{group.title}</h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full min-w-[640px] border-collapse bg-white text-left dark:bg-slate-950">
              <thead className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                <tr>
                  <th className="border-b border-slate-200 p-4 dark:border-slate-700">应用</th>
                  <th className="border-b border-slate-200 p-4 dark:border-slate-700">包名</th>
                  <th className="border-b border-slate-200 p-4 dark:border-slate-700">开发者</th>
                  <th className="border-b border-slate-200 p-4 dark:border-slate-700">简介</th>
                </tr>
              </thead>
              <tbody>
                {group.apps.map((app) => (
                  <tr key={app.href} className="align-top">
                    <td className="border-b border-slate-100 p-4 dark:border-slate-800">
                      <Link href={app.href} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                        {app.name}
                      </Link>
                    </td>
                    <td className="border-b border-slate-100 p-4 font-mono text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300">
                      {app.packageName}
                    </td>
                    <td className="border-b border-slate-100 p-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      {app.developer}
                    </td>
                    <td className="border-b border-slate-100 p-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      {app.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* 通用安装步骤 */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">海外应用 APK 通用安装步骤</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          以下是适用于所有海外社交应用的通用安装流程。每款应用的具体教程请点击上方表格中的应用名称查看。
        </p>
        <ol className="list-inside list-decimal space-y-3 text-slate-700 dark:text-slate-300">
          {installSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      {/* 安全提醒 */}
      <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
        <h2 className="mb-3 text-xl font-bold text-amber-800 dark:text-amber-200">安全安装提醒</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-amber-700 dark:text-amber-300">
          <li>只从可信来源下载 APK，核对包名和开发者与官方一致。</li>
          <li>不要安装要求异常权限（如读取短信、访问通讯录）的修改版 APK。</li>
          <li>安装完成后关闭"允许安装未知来源应用"以保持设备安全。</li>
          <li>gptoapk.com 提供的是 Google Play 来源的官方原版 APK，不包含修改或破解。</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">常见问题 FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-2 font-bold">{faq.question}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 相关页面 */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="mb-4 text-xl font-bold">相关指南</h2>
        <ul className="space-y-2">
          <li><Link href="/zh/china-apk-ai-search" className="text-blue-600 hover:underline dark:text-blue-400">国内 APK 下载与 AI 应用安装指南</Link></li>
          <li><Link href="/zh/ai-apps" className="text-blue-600 hover:underline dark:text-blue-400">中文 AI 应用 APK 安装问题汇总</Link></li>
          <li><Link href="/zh/ai-app-compare" className="text-blue-600 hover:underline dark:text-blue-400">国内 AI 助手 APK 横评对比</Link></li>
          <li><Link href="/zh/google-play-not-working" className="text-blue-600 hover:underline dark:text-blue-400">Google Play 无法使用怎么办</Link></li>
          <li><Link href="/zh/install-apk-guide" className="text-blue-600 hover:underline dark:text-blue-400">APK 安装通用指南</Link></li>
        </ul>
      </section>

      <Script
        id="social-apps-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": schemaGraph,
          }),
        }}
      />
    </main>
  );
}
