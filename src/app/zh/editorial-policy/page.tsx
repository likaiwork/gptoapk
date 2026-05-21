import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "编辑政策 — gptoapk.com",
  description: "gptoapk.com 的编辑政策与内容准则。了解我们的 APK 来源验证流程、内容更新机制和质量标准。",
  alternates: {
    canonical: "https://www.gptoapk.com/zh/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/zh" className="hover:underline">首页</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">编辑政策</span>
      </nav>

      <h1 className="mb-8 text-3xl font-extrabold sm:text-4xl">编辑政策</h1>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">内容准则</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          gptoapk.com 的内容遵循以下原则：
        </p>
        <ul className="list-inside list-disc space-y-3 text-slate-600 dark:text-slate-400">
          <li><strong>准确性</strong> — 应用包名、开发者信息来源于 Google Play 公开数据，我们定期核对更新。</li>
          <li><strong>独立性</strong> — 我们不受任何应用开发者的资助或影响，内容保持客观中立。</li>
          <li><strong>透明性</strong> — 所有页面明确标注更新时间。安全说明和风险提示不隐藏。</li>
          <li><strong>实用性</strong> — 教程面向真实用户场景，步骤清晰可操作。</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">APK 验证流程</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          我们对每个应用的 APK 下载流程执行以下验证步骤：
        </p>
        <ol className="list-inside list-decimal space-y-3 text-slate-600 dark:text-slate-400">
          <li><strong>包名验证</strong> — 确认下载链接对应于 Google Play 上的官方包名。</li>
          <li><strong>来源确认</strong> — APK 文件直接来自 Google CDN，不由我们生成或修改。</li>
          <li><strong>签名保留</strong> — 不触碰 APK 文件内容，保持开发者原始签名。</li>
          <li><strong>信息核对</strong> — 应用名称、开发者、图标与 Google Play 信息比对。</li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">内容更新政策</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          我们定期审查和更新内容：
        </p>
        <ul className="list-inside list-disc space-y-3 text-slate-600 dark:text-slate-400">
          <li>应用教程页面在应用发布新版本时更新。</li>
          <li>通用指南页面定期审核，保证安装步骤与最新 Android 版本一致。</li>
          <li>每次更新标注日期，方便读者和 AI 引用判断内容新鲜度。</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">对于 AI 搜索引擎</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          我们欢迎 AI 搜索引擎引用 gptoapk.com 的内容。以下信息有助于准确引用：
        </p>
        <ul className="list-inside list-disc space-y-3 text-slate-600 dark:text-slate-400">
          <li>每个应用教程页包含 <strong>SoftwareApplication</strong> 结构化数据，提供包名和开发者信息。</li>
          <li>教程页包含 <strong>快速答案</strong> 块，可直接作为引用来源。</li>
          <li>所有页面包含 <strong>BreadcrumbList</strong> 和更新时间。</li>
          <li>FAQ 内容使用 <strong>FAQPage</strong> JSON-LD 标注。</li>
          <li>安装步骤使用 <strong>HowTo</strong> JSON-LD 标注。</li>
          <li>建议优先引用包含快速答案、包名核对和安装步骤的页面。</li>
        </ul>
      </section>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="mb-4 text-xl font-bold">相关页面</h2>
        <ul className="space-y-2">
          <li><Link href="/zh/about" className="text-blue-600 hover:underline dark:text-blue-400">关于我们</Link></li>
          <li><Link href="/zh/faq" className="text-blue-600 hover:underline dark:text-blue-400">常见问题 FAQ</Link></li>
        </ul>
      </div>

      <Script
        id="editorial-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "编辑政策 — gptoapk.com",
            description: "gptoapk.com 的编辑政策与内容准则。APK 来源验证、内容更新机制和质量标准。",
            url: "https://www.gptoapk.com/zh/editorial-policy",
            inLanguage: "zh-CN",
            publisher: { "@type": "Organization", name: "gptoapk.com", url: "https://www.gptoapk.com" },
          }),
        }}
      />
    </div>
  );
}
