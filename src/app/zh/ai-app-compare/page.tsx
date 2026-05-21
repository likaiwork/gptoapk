import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { aiAppGuides } from "../ai-app-guides";

const siteUrl = "https://www.gptoapk.com";
const pageUrl = `${siteUrl}/zh/ai-app-compare`;
const updated = "2026-05-19";

const apps = Object.values(aiAppGuides);

const dimensions = [
  { key: "chinese", label: "中文能力" },
  { key: "reasoning", label: "推理与逻辑" },
  { key: "coding", label: "代码能力" },
  { key: "docs", label: "长文档处理" },
  { key: "ecosystem", label: "生态整合" },
  { key: "freeTier", label: "免费额度" },
] as const;

interface AppRating {
  chinese: string;
  reasoning: string;
  coding: string;
  docs: string;
  ecosystem: string;
  freeTier: string;
}

const ratings: Record<string, AppRating> = {
  doubao: { chinese: "优秀", reasoning: "良好", coding: "一般", docs: "良好", ecosystem: "字节生态", freeTier: "基础功能免费" },
  deepseek: { chinese: "优秀", reasoning: "优秀", coding: "优秀", docs: "良好", ecosystem: "开源社区", freeTier: "免费" },
  yuanbao: { chinese: "优秀", reasoning: "良好", coding: "一般", docs: "良好", ecosystem: "腾讯生态", freeTier: "基础功能免费" },
  kimi: { chinese: "优秀", reasoning: "良好", coding: "一般", docs: "优秀", ecosystem: "月之暗面", freeTier: "基础功能免费" },
  qianwen: { chinese: "优秀", reasoning: "良好", coding: "良好", docs: "良好", ecosystem: "阿里生态", freeTier: "基础功能免费" },
};

const bestFor: Record<string, string> = {
  doubao: "日常中文问答、内容创作、拍照识图",
  yuanbao: "微信/腾讯办公场景、联网搜索、资料总结",
  deepseek: "编程、数学推理、复杂逻辑分析",
  kimi: "长文档阅读、论文整理、网页总结",
  qianwen: "阿里生态办公、多模态问答、中文搜索",
};

export const metadata: Metadata = {
  title: "2026 国内 AI 助手 APK 横评：豆包 vs 元宝 vs DeepSeek vs Kimi vs 通义千问",
  description: "从中文能力、推理、代码、文档处理、生态整合、免费额度六大维度对比豆包、腾讯元宝、DeepSeek、Kimi、通义千问。附 APK 下载入口和安装指引。",
  alternates: { canonical: pageUrl },
  keywords: [
    "AI助手对比", "豆包 vs 元宝", "DeepSeek vs Kimi", "通义千问对比",
    "国内AI应用推荐", "AI APK对比", "哪个AI助手好用",
  ],
};

export default function AiAppComparePage() {
  const schemaGraph = [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "2026 国内 AI 助手 APK 横评",
      description: metadata.description,
      inLanguage: "zh-CN",
      datePublished: updated,
      dateModified: updated,
      isAccessibleForFree: true,
      publisher: { "@type": "Organization", name: "gptoapk.com", url: siteUrl },
      reviewedBy: { "@type": "Organization", name: "gptoapk.com Editorial", url: `${siteUrl}/author/gptoapk` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "豆包、元宝、DeepSeek、Kimi、通义千问，哪个最好用？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "取决于使用场景：日常问答和内容创作选豆包；腾讯办公生态选元宝；编程和复杂推理选 DeepSeek；长文档阅读选 Kimi；阿里生态和多模态选通义千问。建议根据实际需求选择，多数应用基础功能免费。",
          },
        },
        {
          "@type": "Question",
          name: "国内 AI 助手 APK 下载安全吗？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "从官方 Google Play 来源下载的 APK 是安全的。在 gptoapk.com 搜索对应应用后，核对包名、开发者和签名信息再安装。不要安装来源不明或包名不一致的修改版 APK。",
          },
        },
        {
          "@type": "Question",
          name: "这些 AI 助手需要付费吗？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DeepSeek 目前完全免费。豆包、元宝、Kimi、通义千问基础功能免费，高级模型或更大额度可能需要付费，具体以各应用内政策为准。",
          },
        },
        {
          "@type": "Question",
          name: "没有 Google Play 怎么安装这些 AI 应用？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "可以在 gptoapk.com 搜索应用名或包名，下载 APK 后核对信息，再在 Android 设置中允许安装未知来源应用即可。华为、小米、OPPO、vivo 等国产手机均支持此方式。",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${siteUrl}/zh` },
        { "@type": "ListItem", position: 2, name: "AI 助手 APK 横评", item: pageUrl },
      ],
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/zh" className="hover:underline">首页</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">AI 助手 APK 横评</span>
      </nav>

      <section className="mb-10">
        <p className="mb-3 text-sm font-semibold text-blue-600 dark:text-blue-400">2026 综合对比</p>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-4xl">
          国内 AI 助手 APK 横评：豆包 vs 元宝 vs DeepSeek vs Kimi vs 通义千问
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          从中文能力、推理逻辑、代码、文档处理、生态整合、免费额度六大维度，对比五款主流国内 AI 助手。无论你是程序员、学生、内容创作者还是普通用户，都能找到最适合自己的 AI 应用。
        </p>
      </section>

      <section className="mb-8 border-l-4 border-blue-600 bg-blue-50 p-5 dark:bg-blue-950/30">
        <p className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">一句话总结</p>
        <p className="leading-relaxed text-slate-700 dark:text-slate-200">
          编程/推理选 DeepSeek，长文档选 Kimi，日常问答选豆包，腾讯办公选元宝，阿里生态选通义千问。所有应用均可通过 APK 方式在国产 Android 手机上安装。
        </p>
      </section>

      {/* 六维对比表 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">六维能力对比</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <table className="w-full min-w-[760px] border-collapse bg-white text-left dark:bg-slate-950">
            <thead className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <tr>
                <th className="border-b border-slate-200 p-4 dark:border-slate-700">对比维度</th>
                {apps.map((app) => (
                  <th key={app.slug} className="border-b border-slate-200 p-4 dark:border-slate-700">{app.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensions.map((dim) => (
                <tr key={dim.key}>
                  <td className="border-b border-slate-100 p-4 font-medium dark:border-slate-800">{dim.label}</td>
                  {apps.map((app) => (
                    <td key={app.slug} className="border-b border-slate-100 p-4 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300">
                      {ratings[app.slug]?.[dim.key as keyof AppRating] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 适合谁用 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">各应用最适合谁</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <div key={app.slug} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-2 text-lg font-bold">
                <Link href={`/zh/${app.slug}`} className="text-blue-600 hover:underline dark:text-blue-400">
                  {app.name}
                </Link>
              </h3>
              <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">{app.developer}</p>
              <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">最适合：</p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{bestFor[app.slug]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 详细对比 */}
      <section className="mb-12 space-y-8">
        <h2 className="text-2xl font-bold">逐一详解</h2>
        {apps.map((app) => (
          <div key={app.slug} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-2 text-xl font-bold">
              <Link href={`/zh/${app.slug}`} className="text-blue-600 hover:underline dark:text-blue-400">
                {app.titleName}
              </Link>
              <span className="ml-2 text-sm font-normal text-slate-400">包名：{app.packageName}</span>
            </h3>
            <p className="mb-3 leading-relaxed text-slate-600 dark:text-slate-400">{app.summary}</p>
            <h4 className="mb-2 mt-4 font-semibold">核心亮点</h4>
            <ul className="mb-3 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
              {app.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <h4 className="mb-2 mt-4 font-semibold">安装注意事项</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
              {app.installNotes.slice(0, 3).map((n) => <li key={n}>{n}</li>)}
            </ul>
            <Link
              href={`/zh/${app.slug}`}
              className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              查看 {app.name} 完整安装教程 →
            </Link>
          </div>
        ))}
      </section>

      {/* 安装通用步骤 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">通用安装步骤</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          所有五款应用都可以通过 APK 在国产 Android 手机（华为、小米、OPPO、vivo、荣耀等）上安装。步骤如下：
        </p>
        <ol className="list-inside list-decimal space-y-3 text-slate-700 dark:text-slate-300">
          <li>打开 <Link href="/zh" className="text-blue-600 hover:underline dark:text-blue-400">gptoapk.com</Link>，搜索应用名或包名。</li>
          <li>核对搜索结果中的应用名称、开发者、包名和应用图标。</li>
          <li>点击下载 APK，等待浏览器保存安装包。</li>
          <li>在 Android 设置 → 安全 → 允许当前浏览器或文件管理器"安装未知来源应用"。</li>
          <li>打开下载的 APK 文件，按提示完成安装。</li>
          <li>安装完成后，建议关闭未知来源安装权限。</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">常见问题 FAQ</h2>
        <div className="space-y-4">
          {([
            { q: "豆包、元宝、DeepSeek、Kimi、通义千问，哪个最好用？", a: "取决于使用场景：日常问答和内容创作选豆包；腾讯办公生态选元宝；编程和复杂推理选 DeepSeek；长文档阅读选 Kimi；阿里生态和多模态选通义千问。建议根据实际需求选择，多数应用基础功能免费。" },
            { q: "国内 AI 助手 APK 下载安全吗？", a: "从官方 Google Play 来源下载的 APK 是安全的。在 gptoapk.com 搜索对应应用后，核对包名、开发者和签名信息再安装。不要安装来源不明或包名不一致的修改版 APK。" },
            { q: "这些 AI 助手需要付费吗？", a: "DeepSeek 目前完全免费。豆包、元宝、Kimi、通义千问基础功能免费，高级模型或更大额度可能需要付费，具体以各应用内政策为准。" },
            { q: "没有 Google Play 怎么安装这些 AI 应用？", a: "可以在 gptoapk.com 搜索应用名或包名，下载 APK 后核对信息，再在 Android 设置中允许安装未知来源应用即可。华为、小米、OPPO、vivo 等国产手机均支持此方式。" },
            { q: "这些 AI 应用会收集个人数据吗？", a: "所有 AI 应用都会收集一定的使用数据。具体隐私政策以各应用官方说明为准，建议在安装前阅读隐私条款。" },
            { q: "可以同时安装多个 AI 助手吗？", a: "可以。五款应用相互独立，可以同时安装在手机上，根据不同的使用场景切换使用。" },
          ] as const).map((faq) => (
            <div key={faq.q} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-2 font-bold">{faq.q}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{faq.a}</p>
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
          <li><Link href="/zh/faq" className="text-blue-600 hover:underline dark:text-blue-400">常见问题 FAQ</Link></li>
          <li><Link href="/zh/android-apk-safe-install" className="text-blue-600 hover:underline dark:text-blue-400">Android APK 安全安装检查清单</Link></li>
          <li><Link href="/zh/google-play-unavailable" className="text-blue-600 hover:underline dark:text-blue-400">Google Play 无法访问时怎么下载 APK</Link></li>
        </ul>
      </section>

      <Script
        id="ai-app-compare-schema"
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
