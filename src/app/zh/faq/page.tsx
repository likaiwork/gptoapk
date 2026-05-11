import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "常见问题 - APK 下载器 | gptoapk.com",
  description: "关于使用 gptoapk.com 从 Google Play 商店下载 APK 的常见问题。了解工作原理、安全性和故障排除技巧。",
  alternates: {
    canonical: "https://gptoapk.com/zh/faq",
    languages: {
      en: "https://gptoapk.com/faq",
      "x-default": "https://gptoapk.com/faq",
    },
  },
};

const faqs = [
  {
    q: "什么是 gptoapk.com？",
    a: "gptoapk.com 是一个免费在线工具，可以让你直接从 Google Play 商店生成 APK 下载链接。只需粘贴 Google Play URL 或包名，立即获得直接下载链接。"
  },
  {
    q: "使用完全免费吗？",
    a: "是的，完全免费。无需注册，无隐藏费用，无高级套餐。"
  },
  {
    q: "它是如何工作的？",
    a: "当你粘贴 Google Play 链接时，我们的服务器直接从 Google 的 CDN 获取 APK 文件，并提供下载链接。我们从不修改或存储文件。"
  },
  {
    q: "从 gptoapk.com 下载 APK 安全吗？",
    a: "绝对安全。文件直接从 Google 服务器获取。我们从不触碰或修改文件，所以你获得的是 100% 原始、签名验证的 APK。"
  },
  {
    q: "可以在手机上使用吗？",
    a: "可以！只需在移动浏览器中打开 gptoapk.com 并粘贴链接即可。手机和电脑都可以使用。"
  },
  {
    q: "付费应用也能下载吗？",
    a: "可以，但你的 Google 账号需要已经购买了该应用才能生成有效的下载链接。"
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
    </div>
  );
}
