import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export interface AiAppGuide {
  slug: string;
  name: string;
  titleName: string;
  developer: string;
  packageName: string;
  searchTerms: string[];
  summary: string;
  featureIntro: string;
  highlights: string[];
  installNotes: string[];
  faqs: Array<{ question: string; answer: string }>;
}

const siteUrl = "https://gptoapk.com";
const publishedDate = "2026-05-17";

export const aiAppGuides: Record<string, AiAppGuide> = {
  doubao: {
    slug: "doubao-apk",
    name: "豆包",
    titleName: "豆包 Doubao",
    developer: "北京春田知韵科技有限公司 / 字节跳动",
    packageName: "com.larus.nova",
    searchTerms: ["豆包", "Doubao", "com.larus.nova"],
    summary: "豆包是字节跳动推出的 AI 助手，支持中文问答、写作、翻译、图片理解和学习办公场景。",
    featureIntro: "豆包适合中文用户做日常搜索、内容创作、文档总结、拍照识图和语音对话。Android 用户如果无法直接打开 Google Play，可以通过 APK 安装包完成安装。",
    highlights: ["中文问答和 AI 搜索", "写作润色、摘要和翻译", "拍照识图与多模态理解", "语音对话和学习辅助"],
    installNotes: ["在 gptoapk.com 搜索豆包或 Doubao。", "核对应用名称、开发者和包名后下载 APK。", "安装前允许浏览器或文件管理器安装未知来源应用。", "安装完成后用手机号、抖音或其他官方支持方式登录。"],
    faqs: [
      { question: "豆包 APK 的包名是什么？", answer: "Google Play 上常见的豆包应用包名是 com.larus.nova。下载前建议核对包名、应用图标和开发者信息。" },
      { question: "豆包在国内可以直接使用吗？", answer: "豆包主要面向中文用户，通常可以直接使用。具体登录方式和功能开放范围以官方应用内提示为准。" },
      { question: "华为手机能安装豆包 APK 吗？", answer: "可以。华为、荣耀、小米、OPPO、vivo 等 Android 设备一般都可以通过 APK 安装，前提是系统允许安装外部来源应用。" },
      { question: "豆包 APK 安全吗？", answer: "应优先下载官方来源的原始 APK，并在安装前核对签名和包名。gptoapk.com 的目标是帮助用户获取 Google Play 来源的原始安装包。" },
    ],
  },
  yuanbao: {
    slug: "yuanbao-apk",
    name: "腾讯元宝",
    titleName: "腾讯元宝 Yuanbao",
    developer: "Tencent",
    packageName: "com.tencent.hunyuan.app.chat",
    searchTerms: ["腾讯元宝", "元宝", "Yuanbao", "com.tencent.hunyuan.app.chat"],
    summary: "腾讯元宝是腾讯混元能力驱动的 AI 助手，适合联网搜索、写作、阅读总结、办公问答和腾讯生态内容查询。",
    featureIntro: "元宝强调中文场景和腾讯生态内容，适合搜索资料、总结网页、生成文案和处理日常办公问题。无法使用应用商店时，可以用 APK 安装。",
    highlights: ["腾讯混元 AI 助手", "联网搜索和信息整理", "文档阅读、总结与改写", "适合微信、腾讯文档等办公场景"],
    installNotes: ["在 gptoapk.com 搜索腾讯元宝或 Yuanbao。", "优先选择包名为 com.tencent.hunyuan.app.chat 的结果。", "下载 APK 后打开系统安装权限。", "安装完成后使用微信、QQ 或官方支持的账号方式登录。"],
    faqs: [
      { question: "腾讯元宝 APK 的包名是什么？", answer: "常见包名是 com.tencent.hunyuan.app.chat。下载前建议确认应用名为腾讯元宝，并核对开发者信息。" },
      { question: "腾讯元宝和豆包有什么区别？", answer: "元宝更偏腾讯混元和腾讯生态内容，豆包更偏字节系中文 AI 助手。两者都适合中文搜索、写作和问答。" },
      { question: "元宝 APK 可以在海外安卓手机安装吗？", answer: "通常可以安装，但登录方式、手机号验证和部分联网内容可能受地区或账号策略影响。" },
      { question: "安装元宝需要 Google Play 服务吗？", answer: "多数基础功能不依赖 Google Play 商店本身。部分推送、登录或系统能力是否可用，以官方应用实际表现为准。" },
    ],
  },
  deepseek: {
    slug: "deepseek-apk",
    name: "DeepSeek",
    titleName: "DeepSeek",
    developer: "DeepSeek",
    packageName: "com.deepseek.chat",
    searchTerms: ["DeepSeek", "DeepSeek AI", "com.deepseek.chat"],
    summary: "DeepSeek 是以推理、编程和中文问答见长的 AI 助手，适合学习、写代码、数学推理和知识搜索。",
    featureIntro: "DeepSeek Android 应用适合需要高质量推理和代码辅助的用户。无法使用 Google Play 时，可以通过 APK 文件安装。",
    highlights: ["中文问答和复杂推理", "代码生成、解释和调试", "学习辅导和数学分析", "长文本整理与写作"],
    installNotes: ["在 gptoapk.com 搜索 DeepSeek。", "核对包名 com.deepseek.chat。", "下载 APK 后允许当前浏览器安装未知应用。", "安装完成后登录 DeepSeek 账号开始使用。"],
    faqs: [
      { question: "DeepSeek APK 的包名是什么？", answer: "DeepSeek Android 应用常见包名是 com.deepseek.chat。建议只安装与官方信息一致的 APK。" },
      { question: "DeepSeek APK 可以免费使用吗？", answer: "DeepSeek 通常提供免费使用额度或免费功能，具体模型、额度和高级能力以官方账号政策为准。" },
      { question: "DeepSeek 适合做什么？", answer: "它适合代码、数学、逻辑推理、中文写作、资料整理和学习问答。" },
      { question: "DeepSeek APK 安装失败怎么办？", answer: "先确认 Android 版本、存储空间和安装未知来源权限；如果旧版本冲突，可以备份数据后卸载旧版再安装。" },
    ],
  },
  kimi: {
    slug: "kimi-apk",
    name: "Kimi",
    titleName: "Kimi 智能助手",
    developer: "Moonshot AI",
    packageName: "com.moonshot.kimichat",
    searchTerms: ["Kimi", "Kimi 智能助手", "Moonshot", "com.moonshot.kimichat"],
    summary: "Kimi 是月之暗面推出的 AI 助手，擅长长文档阅读、资料搜索、网页总结和中文办公场景。",
    featureIntro: "Kimi 适合阅读长文、总结资料、生成大纲、处理网页和文档。Android 用户可以通过 APK 安装，在手机上使用 Kimi 的长文本能力。",
    highlights: ["长文档阅读和总结", "中文联网搜索", "论文、报告和网页整理", "写作大纲与内容生成"],
    installNotes: ["在 gptoapk.com 搜索 Kimi 或 Kimi 智能助手。", "确认包名 com.moonshot.kimichat。", "下载后在手机设置中允许安装未知来源应用。", "打开 Kimi 并按官方方式登录。"],
    faqs: [
      { question: "Kimi APK 的包名是什么？", answer: "Kimi Android 应用常见包名是 com.moonshot.kimichat。下载前建议核对包名和开发者 Moonshot AI。" },
      { question: "Kimi 最大优势是什么？", answer: "Kimi 的优势是长文本处理、资料阅读、联网搜索和中文办公写作。" },
      { question: "Kimi APK 支持华为手机吗？", answer: "大多数华为和荣耀设备可以安装 APK。没有 Google Play 的设备也可以通过文件管理器安装。" },
      { question: "Kimi 使用需要付费吗？", answer: "Kimi 的免费额度和付费能力会随官方政策调整，请以应用内提示为准。" },
    ],
  },
  qianwen: {
    slug: "qianwen-apk",
    name: "通义千问",
    titleName: "通义千问 Qwen",
    developer: "Alibaba",
    packageName: "ai.qwenlm.chat.android",
    searchTerms: ["通义千问", "千问", "Qwen", "ai.qwenlm.chat.android"],
    summary: "通义千问是阿里巴巴推出的 AI 助手，覆盖中文问答、写作、办公、学习和多模态能力。",
    featureIntro: "通义千问适合中文 AI 搜索、办公写作、图片理解、学习问答和阿里生态相关场景。Android 用户可以通过 APK 方式安装。",
    highlights: ["中文 AI 问答与搜索", "办公写作和表格思路", "图片理解与多模态能力", "阿里通义大模型生态"],
    installNotes: ["在 gptoapk.com 搜索通义千问、千问或 Qwen。", "确认包名 ai.qwenlm.chat.android。", "下载 APK 并允许安装未知应用。", "安装后使用手机号或官方支持的账号登录。"],
    faqs: [
      { question: "通义千问 APK 的包名是什么？", answer: "通义千问 Android 应用常见包名是 ai.qwenlm.chat.android。" },
      { question: "通义千问和千问是同一个应用吗？", answer: "千问通常指通义千问或 Qwen 品牌下的 AI 助手，下载时应以官方应用名称、包名和开发者信息为准。" },
      { question: "通义千问适合哪些场景？", answer: "适合中文问答、AI 搜索、写作、学习辅导、图片理解和办公效率场景。" },
      { question: "通义千问 APK 更新怎么做？", answer: "下载新版 APK 后直接覆盖安装即可。账号数据通常保存在云端，但建议使用官方账号登录。" },
    ],
  },
};

export function createAiAppMetadata(app: AiAppGuide): Metadata {
  return {
    title: `${app.name} APK 下载与安卓安装教程（中国大陆可用）`,
    description: `${app.summary} 本文提供 ${app.name} Android APK 下载、安装、更新、安全校验和常见问题说明。`,
    alternates: {
      canonical: `${siteUrl}/zh/${app.slug}`,
    },
  };
}

export function AiAppGuidePage({ app }: { app: AiAppGuide }) {
  const pageUrl = `${siteUrl}/zh/${app.slug}`;
  const howToSteps = [
    `打开 gptoapk.com，在搜索框输入 ${app.searchTerms.slice(0, 2).join(" 或 ")}。`,
    `核对应用名称、开发者和包名 ${app.packageName}。`,
    "点击下载 APK，并等待浏览器保存安装包。",
    "在 Android 设置中允许浏览器或文件管理器安装未知来源应用。",
    `打开下载的 APK 文件并安装 ${app.name}。`,
  ];

  const schemaGraph = [
    {
      "@type": "SoftwareApplication",
      name: app.titleName,
      alternateName: app.searchTerms,
      applicationCategory: "AIApplication",
      operatingSystem: "Android",
      softwareVersion: "Latest",
      applicationSubCategory: "AI assistant",
      identifier: app.packageName,
      url: pageUrl,
      downloadUrl: siteUrl,
      author: { "@type": "Organization", name: app.developer },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "HowTo",
      name: `${app.name} APK 下载安装步骤`,
      description: `如何在 Android 手机上下载并安装 ${app.name} APK。`,
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
      headline: `${app.name} APK 下载与安卓安装教程`,
      description: app.summary,
      datePublished: publishedDate,
      dateModified: publishedDate,
      inLanguage: "zh-CN",
      mainEntityOfPage: pageUrl,
      publisher: { "@type": "Organization", name: "gptoapk.com", url: siteUrl },
      author: { "@type": "Organization", name: "gptoapk.com", url: siteUrl },
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
        {app.name} APK 下载与安卓安装教程
      </h1>

      <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        {app.summary} 如果你的手机无法直接访问 Google Play，可以通过 APK 安装包完成安装。本文整理了 {app.name} APK 的搜索关键词、包名、安全检查、安装步骤和常见问题。
      </p>

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

      <h2 className="mb-4 mt-10 text-2xl font-bold">{app.name} 主要功能</h2>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">{app.featureIntro}</p>
      <ul className="mb-8 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
        {app.highlights.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <h2 className="mb-4 mt-10 text-2xl font-bold">从 gptoapk.com 下载 {app.name} APK</h2>
      <ol className="mb-8 list-inside list-decimal space-y-3 text-slate-700 dark:text-slate-300">
        {app.installNotes.map((note) => <li key={note}>{note}</li>)}
      </ol>

      <h2 className="mb-4 mt-10 text-2xl font-bold">Android 安装步骤</h2>
      <ol className="mb-8 list-inside list-decimal space-y-3 text-slate-700 dark:text-slate-300">
        {howToSteps.map((step) => <li key={step}>{step}</li>)}
      </ol>

      <h2 className="mb-4 mt-10 text-2xl font-bold">{app.name} APK 安全检查</h2>
      <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
        下载 APK 后，建议核对应用名、包名、开发者和签名来源。不要安装来源不明、包名不一致或要求异常权限的安装包。gptoapk.com 是独立工具站，不是 {app.developer} 的官方网站；本站目标是帮助用户获取 Google Play 来源的原始 APK 并完成安装。
      </p>

      <h2 className="mb-4 mt-10 text-2xl font-bold">常见问题 FAQ</h2>
      <div className="mb-8 space-y-4">
        {app.faqs.map((faq) => (
          <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-2 font-bold">{faq.question}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="mb-4 text-xl font-bold">相关 AI 应用教程</h2>
        <ul className="space-y-2">
          {Object.values(aiAppGuides)
            .filter((item) => item.slug !== app.slug)
            .map((item) => (
              <li key={item.slug}>
                <Link href={`/zh/${item.slug}`} className="text-blue-600 hover:underline dark:text-blue-400">
                  {item.name} APK 下载教程
                </Link>
              </li>
            ))}
        </ul>
      </div>

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
