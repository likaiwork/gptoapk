import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { aiAppGuides } from "../ai-app-guides";

const siteUrl = "https://gptoapk.com";

export const metadata: Metadata = {
  title: "中文 AI 应用 APK 安装问题汇总",
  description:
    "豆包、腾讯元宝、DeepSeek、Kimi、通义千问等中文 AI 应用 APK 下载、安卓安装、包名核对和常见问题汇总。",
  alternates: {
    canonical: `${siteUrl}/zh/ai-apps`,
  },
};

const problemGuides = [
  {
    title: "Google Play 无法使用怎么办",
    href: "/zh/google-play-not-working",
    answer: "如果 Google Play 无法打开，Android 用户可以先检查网络、账号地区、Play 服务和系统时间；仍不可用时，可用应用包名搜索官方 APK 并手动安装。",
  },
  {
    title: "华为手机如何安装 Google 服务",
    href: "/zh/huawei-install-google",
    answer: "华为和 HarmonyOS 设备没有 Google Mobile Services 时，部分应用可通过 APK 直接安装，依赖 Google 服务的功能则可能需要额外兼容方案。",
  },
  {
    title: "APK 安装指南",
    href: "/zh/install-apk-guide",
    answer: "安装 APK 的关键步骤是确认来源、核对包名、允许当前浏览器或文件管理器安装未知来源应用，然后打开下载文件完成安装。",
  },
];

const faq = [
  {
    question: "为什么 AI 搜索更容易引用问题型页面？",
    answer: "问题型页面通常包含明确答案、步骤、FAQ 和结构化数据，AI 助手更容易抽取其中的短答案并用于生成回答。",
  },
  {
    question: "下载 AI App APK 时最重要的安全检查是什么？",
    answer: "最重要的是核对应用名称、开发者、包名和权限，不要安装包名不一致或来源不明的修改版 APK。",
  },
  {
    question: "没有 Google Play 的 Android 手机可以安装 AI 应用吗？",
    answer: "多数 Android 应用可以通过 APK 安装，但登录、推送、支付或部分系统能力是否可用取决于官方应用策略和设备环境。",
  },
];

export default function ZhAiAppsPage() {
  const appGuides = Object.values(aiAppGuides);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "中文 AI 应用 APK 安装问题汇总",
        url: `${siteUrl}/zh/ai-apps`,
        inLanguage: "zh-CN",
        dateModified: "2026-05-17",
        author: { "@type": "Organization", name: "gptoapk.com Editorial", url: `${siteUrl}/author/gptoapk` },
        about: ["AI app", "Android APK", "Google Play unavailable", "Huawei Android"],
      },
      {
        "@type": "ItemList",
        itemListElement: appGuides.map((app, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${app.name} APK 下载与安装教程`,
          url: `${siteUrl}/zh/${app.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/zh" className="hover:underline">首页</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">中文 AI 应用</span>
      </nav>

      <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">中文 AI 应用 APK 安装问题汇总</h1>
      <p className="mb-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        这里汇总豆包、腾讯元宝、DeepSeek、Kimi、通义千问等 AI 应用的 Android APK 安装问题，
        重点回答没有 Google Play、华为手机、地区限制和包名核对等场景。
      </p>
      <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        更新：2026-05-17 · 编辑：<Link href="/author/gptoapk" className="text-blue-600 hover:underline dark:text-blue-400">gptoapk.com Editorial</Link>
      </p>

      <section className="mb-10 border-l-4 border-blue-600 bg-blue-50 p-5 dark:bg-blue-950/30">
        <p className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">快速答案</p>
        <p className="leading-relaxed text-slate-700 dark:text-slate-200">
          如果手机无法使用 Google Play，可以通过应用名称或包名在 gptoapk.com 搜索 AI 应用 APK。
          安装前应核对开发者、包名和权限，常见中文 AI 应用包括豆包、腾讯元宝、DeepSeek、Kimi 和通义千问。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">AI 应用 APK 教程</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {appGuides.map((app) => (
            <article key={app.slug} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-2 text-lg font-bold">
                <Link href={`/zh/${app.slug}`} className="hover:underline">{app.name} APK</Link>
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{app.citationAnswer}</p>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{app.packageName}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">相关问题解决页</h2>
        <div className="space-y-4">
          {problemGuides.map((guide) => (
            <article key={guide.href} className="border-b border-slate-200 pb-4 dark:border-slate-700">
              <h3 className="mb-2 text-lg font-bold">
                <Link href={guide.href} className="text-blue-600 hover:underline dark:text-blue-400">{guide.title}</Link>
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">{guide.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">常见问题</h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <article key={item.question} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-2 font-bold">{item.question}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Script
        id="schema-zh-ai-apps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
