import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "常见问题 - APK 下载器 | gptoapk.com",
  description: "关于使用 gptoapk.com 从 Google Play 商店下载 APK 的常见问题。了解工作原理、安全性和故障排除技巧。",
  alternates: {
    canonical: "https://gptoapk.com/zh/faq",
    languages: {
      en: "https://gptoapk.com/en/faq",
      zh: "https://gptoapk.com/zh/faq",
      "x-default": "https://gptoapk.com/en/faq",
    },
  },
};

const faqs = [
  {
    q: "什么是 gptoapk.com？",
    a: "gptoapk.com 是一个免费在线工具，可以根据 Google Play URL、包名或应用名称查找应用，并在存在可信公开来源时生成 APK 下载链接。"
  },
  {
    q: "使用完全免费吗？",
    a: "是的，完全免费。无需注册，无隐藏费用，无高级套餐。"
  },
  {
    q: "它是如何工作的？",
    a: "当你粘贴 Google Play 链接时，我们会检查可信来源并准备下载链接。我们不修改 APK，不托管 APK 仓库，也不提供付费应用或破解版下载。"
  },
  {
    q: "从 gptoapk.com 下载 APK 安全吗？",
    a: "我们优先使用可信原始来源，并且不会修改 APK。安装前仍建议核对包名、来源、权限和签名。"
  },
  {
    q: "可以在手机上使用吗？",
    a: "可以！只需在移动浏览器中打开 gptoapk.com 并粘贴链接即可。手机和电脑都可以使用。"
  },
  {
    q: "付费应用也能下载吗？",
    a: "暂时不支持。gptoapk.com 只支持可免费下载或来自可信公开来源的应用，不提供付费应用、破解版或绕过购买限制的下载。"
  },
  {
    q: "需要安装软件或浏览器扩展吗？",
    a: "不需要。gptoapk.com 完全在浏览器中运行。无需下载、无需扩展、无需插件。"
  },
  {
    q: "可以在任何国家使用吗？",
    a: "可以，gptoapk.com 在全球范围都可以使用。不过某些应用在 Google Play 上可能有地区限制。"
  },
];

export default function FAQPageZh() {
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">常见问题</h1>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 group">
            <summary className="font-semibold p-5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between">
              {faq.q}
              <svg className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <Script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
    </div>
  );
}
