import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "在俄罗斯下载 APK – Google Play 替代方案",
  description:
    "Google Play 在俄罗斯无法正常使用？了解如何直接下载 APK 文件。俄罗斯用户的完整指南。",
  alternates: {
    canonical: "https://gptoapk.com/zh/russia",
    languages: {
      en: "https://gptoapk.com/en/russia",
      "x-default": "https://gptoapk.com/en/russia",
    },
  },
};

export default function ZhRussiaPage() {
  const faqs = [
    {
      q: "在俄罗斯还能用 Google Play 吗？",
      a: "Google Play 仍然可以访问，但支付功能受限，部分应用已下架。通过 gptoapk.com 直接下载 APK 是一个可靠的替代方案。",
    },
    {
      q: "在俄罗斯下载 APK 合法吗？",
      a: "从官方来源下载 APK 供个人使用是完全合法的。侧载（Sideloading）在俄罗斯是普遍做法，不违反当地法律。",
    },
    {
      q: "在俄罗斯使用 gptoapk.com 需要 VPN 吗？",
      a: "通常不需要。gptoapk.com 在俄罗斯可以直接访问。如果某个应用本身有地区限制，则可能需要 VPN，但下载工具本身不受限。",
    },
    {
      q: "我可以通过 APK 更新 Telegram 吗？",
      a: "可以。使用 gptoapk.com 可以下载最新版 Telegram APK，绕过 Play Store 的限制。",
    },
    {
      q: "应用显示'您所在的国家/地区不提供此商品'怎么办？",
      a: "这是 Google Play 的区域限制。你可以将 VPN 切换到支持的地区，然后在 gptoapk.com 上粘贴 Play Store 链接来下载 APK。",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          在俄罗斯下载 APK – Google Play 替代方案
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Google Play 在俄罗斯无法正常使用？了解如何直接下载 APK 文件。俄罗斯用户的完整指南。
        </p>
      </div>

      {/* Section 1 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">
          为什么 Google Play 在俄罗斯无法正常使用？
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          自 2022 年以来，Google 大幅缩减了在俄罗斯的服务。虽然 Google Play 商店仍然可以访问，但用户面临诸多限制：
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>
            <strong>支付限制</strong> — 俄罗斯银行卡无法在 Google Play 上付款
          </li>
          <li>
            <strong>应用下架</strong> — 许多应用已从 Google Play 俄罗斯商店移除
          </li>
          <li>
            <strong>更新延迟</strong> — 部分应用无法及时收到更新
          </li>
          <li>
            <strong>区域封锁</strong> — 某些应用在俄罗斯完全不可用
          </li>
        </ul>
        <p className="text-slate-600 dark:text-slate-400">
          这些限制使得数百万俄罗斯 Android 用户通过直接侧载 APK 文件来安装和更新应用。
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">
          俄罗斯最佳 APK 下载工具 (gptoapk.com)
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          <Link
            href="/zh"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            gptoapk.com
          </Link>{" "}
          是俄罗斯用户最佳的 APK 下载工具：
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>无需 Google 账号</li>
          <li>文件直接从 Google 服务器获取，100% 原版安全</li>
          <li>在俄罗斯可直接访问，无需 VPN</li>
          <li>完全免费，无需注册</li>
        </ul>
      </section>

      {/* Section 3: Popular Apps */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">
          俄罗斯最常下载的应用
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-semibold">应用</th>
                <th className="text-left py-3 px-4 font-semibold">包名</th>
                <th className="text-left py-3 px-4 font-semibold">下载</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Telegram", pkg: "org.telegram.messenger" },
                { name: "TikTok", pkg: "com.ss.android.ugc.trill" },
                { name: "WhatsApp", pkg: "com.whatsapp" },
                { name: "YouTube", pkg: "com.google.android.youtube" },
              ].map((app, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="py-3 px-4 font-medium">{app.name}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm font-mono">
                    {app.pkg}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/zh/app/${app.pkg}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                    >
                      下载 APK
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: How to Install */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">
          如何在俄罗斯安装 APK 文件
        </h2>
        <ol className="list-decimal pl-6 space-y-3 text-slate-600 dark:text-slate-400">
          <li>
            打开{" "}
            <Link
              href="/zh"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              gptoapk.com
            </Link>{" "}
            下载 APK 文件
          </li>
          <li>进入设置 → 安全 → 开启"允许安装未知来源应用"</li>
          <li>打开文件管理器，找到下载的 APK 文件并点击</li>
          <li>点击安装按钮即可</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          常见问题
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
                <span className="font-semibold pr-4">{faq.q}</span>
                <svg
                  className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">
          需要下载 APK 文件？
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-xl mx-auto">
          打开 gptoapk.com，粘贴 Google Play 链接即可免费下载 APK，无需注册。
        </p>
        <Link
          href="/zh"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          前往 APK 下载器
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </section>
    </div>
  );
}
