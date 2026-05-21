import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "关于我们 — gptoapk.com APK 下载工具",
  description: "gptoapk.com 是独立的 APK 下载和安装指南网站。了解我们的来源验证流程、安全标准和编辑准则。",
  alternates: {
    canonical: "https://www.gptoapk.com/zh/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/zh" className="hover:underline">首页</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">关于我们</span>
      </nav>

      <h1 className="mb-8 text-3xl font-extrabold sm:text-4xl">关于 gptoapk.com</h1>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">我们是什么</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          gptoapk.com 是一个独立的 APK 下载和安装指南网站，帮助全球 Android 用户查找并安装来自 Google Play 的原始 APK 文件。
        </p>
        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
          我们将 Google Play 链接或应用包名转换为直接下载链接，让无法访问 Google Play 的用户（如中国大陆、受制裁地区、无 GMS 设备等）也能获取官方 APK 文件。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">APK 来源与安全</h2>
        <ul className="list-inside list-disc space-y-3 text-slate-600 dark:text-slate-400">
          <li><strong>官方来源</strong> — 所有 APK 文件直接从 Google Play 官方 CDN 获取，未经任何修改。</li>
          <li><strong>签名验证</strong> — 我们不会修改 APK 文件，应用保留开发者原始签名。</li>
          <li><strong>不存储文件</strong> — APK 下载链接直接指向 Google 服务器，我们不做中间缓存或存储。</li>
          <li><strong>推荐核对</strong> — 我们建议用户在安装前核对应���名称、开发者、包名和权限与官方信息一致。</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">编辑准则</h2>
        <ul className="list-inside list-disc space-y-3 text-slate-600 dark:text-slate-400">
          <li>所有内容页明确标注更新时间。</li>
          <li>应用信息（包名、开发者）来源于 Google Play 公开数据。</li>
          <li>我们不是所列应用的官方发布者或附属机构。</li>
          <li>教程和指南仅供教育和信息参考。</li>
          <li>我们不对第三方应用的功能、安全或可用性做出任何保证。</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">免责声明</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          gptoapk.com 是独立工具站，与 Google、Meta、字节跳动、OpenAI、Anthropic、Telegram 等公司无关。
          所有商标和产品名称归各自所有者所有。用户在安装任何 APK 前应自行评估安全风险。
        </p>
        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
          我们不提供破解版、修改版或去广告版 APK。我们仅提供 Google Play 来源的原始官方安装包。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">联系方式</h2>
        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
          如有任何问题、建议或内容更正，请联系我们：
          <br />邮箱：<a href="mailto:support@gptoapk.com" className="text-blue-600 hover:underline dark:text-blue-400">support@gptoapk.com</a>
        </p>
      </section>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="mb-4 text-xl font-bold">相关页面</h2>
        <ul className="space-y-2">
          <li><Link href="/zh/editorial-policy" className="text-blue-600 hover:underline dark:text-blue-400">编辑政策</Link></li>
          <li><Link href="/zh/faq" className="text-blue-600 hover:underline dark:text-blue-400">常见问题 FAQ</Link></li>
          <li><Link href="/zh/android-apk-safe-install" className="text-blue-600 hover:underline dark:text-blue-400">Android APK 安全安装检查清单</Link></li>
        </ul>
      </div>

      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "关于 gptoapk.com",
            description: "gptoapk.com 是独立的 APK 下载和安装指南网站，帮助 Android 用户从 Google Play 获取官方 APK 文件。",
            url: "https://www.gptoapk.com/zh/about",
            inLanguage: "zh-CN",
            publisher: { "@type": "Organization", name: "gptoapk.com", url: "https://www.gptoapk.com" },
          }),
        }}
      />
    </div>
  );
}
