import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "How to Install Claude APK – Complete Guide (Without Google Play)",
  description:
    "Step-by-step guide to download and install Claude APK on any Android device. Works on Huawei, Xiaomi, and phones without Google Play.",
  alternates: {
    canonical: "https://gptoapk.com/en/how-to/install-claude-apk",
    languages: {
      "x-default": "https://gptoapk.com/en/how-to/install-claude-apk",
    },
  },
};

const claudeVersions = [
  { version: "3.5.6", date: "May 2026", note: "Latest — Claude 3.5 Sonnet, improved code generation, file analysis" },
  { version: "3.5.2", date: "April 2026", note: "Performance improvements, artifact sharing" },
  { version: "3.4.9", date: "March 2026", note: "Image analysis, long document support (200K tokens)" },
  { version: "3.4.4", date: "February 2026", note: "Project folders, new memory features" },
  { version: "3.4.0", date: "January 2026", note: "Voice mode, Claude 3.5 Haiku support" },
];

const faqs = [
  {
    q: "Is the Claude APK safe to install?",
    a: "Absolutely. When downloaded from gptoapk.com, the APK comes directly from Google's servers — the exact same file you'd get from the Play Store. It has Anthropic's original digital signature and is verified by Google Play's security scanning.",
  },
  {
    q: "Do I need a Claude subscription to use the app?",
    a: "No. The Claude app is free to download and use. Free users get access to Claude 3.5 Sonnet with limited queries. A Claude Pro subscription ($20/month) unlocks higher usage limits, priority access, and access to Claude Opus.",
  },
  {
    q: "Can I use Claude APK without internet?",
    a: "No, Claude requires an active internet connection to work. All processing happens on Anthropic's servers.",
  },
  {
    q: "Will Claude work on Huawei/HarmonyOS devices?",
    a: "Yes. Since you're installing via APK instead of Google Play, Claude works perfectly on Huawei devices without Google Mobile Services. Just follow the Huawei-specific steps in this guide.",
  },
  {
    q: "How is Claude different from ChatGPT?",
    a: "Claude excels at long document analysis (up to 200K tokens), safer conversations, and code generation with artifacts. ChatGPT is stronger at image generation and has a broader plugin ecosystem.",
  },
];

export default function InstallClaudeApkPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
        <Link
          href="/en"
          className="hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
        <Link
          href="/en/how-to"
          className="hover:text-blue-600 transition-colors"
        >
          How-To Guides
        </Link>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-slate-700 dark:text-slate-300 truncate">
          Install Claude APK
        </span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          How to Install Claude APK – Complete Guide (Without Google Play)
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Step-by-step guide to download and install Claude APK on any Android device. Works on Huawei, Xiaomi, and phones without Google Play.
        </p>
      </div>

      {/* Section 1: What is Claude APK */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">What is Claude APK?</h2>
        <p className="text-slate-600 dark:text-slate-400">
          The Claude APK is the official Android application developed by Anthropic. It gives you access to the full Claude AI experience on your mobile device — including Claude 3.5 Sonnet conversations, long document analysis (up to 200K tokens), code generation with artifacts, image analysis, and voice mode. The APK version is identical to the app available on Google Play Store, but you can install it directly without needing Play Store access.
        </p>
      </section>

      {/* Section 2: Why Download as APK */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Why Download Claude as APK?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
          <li>
            <strong>Regional restrictions</strong> — Claude may not be available in your country&apos;s Play Store. APK download bypasses this limitation.
          </li>
          <li>
            <strong>No Google Play Services</strong> — Huawei &amp; other devices without GMS can install Claude via APK.
          </li>
          <li>
            <strong>Early access</strong> — Get the latest updates immediately without waiting for Play Store rollout.
          </li>
          <li>
            <strong>Backup &amp; archiving</strong> — Keep a copy of a specific version that works well on your device.
          </li>
        </ul>
      </section>

      {/* Section 3: How to Download */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          How to Download Claude APK from gptoapk.com
        </h2>
        <ol className="list-decimal pl-6 space-y-3 text-slate-600 dark:text-slate-400">
          <li>
            <strong>Open gptoapk.com</strong> — Visit{" "}
            <Link
              href="/en"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              gptoapk.com
            </Link>{" "}
            in your browser (Chrome, Edge, or any browser works).
          </li>
          <li>
            <strong>Enter the package name or URL</strong> — Type{" "}
            <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">
              com.anthropic.claude
            </code>{" "}
            into the search box, or paste the Google Play URL for Claude.
          </li>
          <li>
            <strong>Download the APK</strong> — Click generate, then tap the download link. The APK file will be saved to your Downloads folder.
          </li>
        </ol>
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>✅ No registration required.</strong> gptoapk.com is free and doesn&apos;t require any account or payment.
          </p>
        </div>
      </section>

      {/* Section 4: How to Install on Android */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          How to Install Claude APK on Android
        </h2>
        <ol className="list-decimal pl-6 space-y-3 text-slate-600 dark:text-slate-400">
          <li>
            <strong>Enable unknown sources</strong> — Go to Settings → Security → Install unknown apps → Allow your browser or file manager app to install APKs.
          </li>
          <li>
            <strong>Open Downloads</strong> — Open your Files or File Manager app, navigate to the Downloads folder.
          </li>
          <li>
            <strong>Tap the APK file</strong> — Find the{" "}
            <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">
              com.anthropic.claude.apk
            </code>{" "}
            file and tap it.
          </li>
          <li>
            <strong>Confirm installation</strong> — Review the permissions and tap Install. The process takes about 30 seconds.
          </li>
        </ol>
      </section>

      {/* Section 5: Huawei/HarmonyOS */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          How to Install Claude APK on Huawei/HarmonyOS
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Huawei devices without Google Mobile Services require a slightly different procedure:
        </p>
        <ol className="list-decimal pl-6 space-y-3 text-slate-600 dark:text-slate-400">
          <li>Download the Claude APK from gptoapk.com on your Huawei phone browser.</li>
          <li>Go to Settings → Security → More settings → Install external apps.</li>
          <li>Enable &quot;File Manager&quot; or your browser app.</li>
          <li>Open the APK from your Files app. If a &quot;HarmonyOS Protect&quot; warning appears, tap &quot;Continue to install&quot;.</li>
          <li>After installation, sign in or create an Anthropic account.</li>
        </ol>
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>💡 Note:</strong> Claude on Huawei devices works exactly the same as on any other Android phone. No GMS is required for the app to function.
          </p>
        </div>
      </section>

      {/* Section 6: Restricted Regions */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          How to Install Claude APK in Restricted Regions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Claude is not available on Google Play in many regions, but you can still install it via APK. Here&apos;s what you need to know:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>gptoapk.com is accessible worldwide — no VPN needed to reach the download site.</li>
          <li>Download the Claude APK using the package name{" "}
            <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">
              com.anthropic.claude
            </code>.
          </li>
          <li>A VPN or proxy may be required to use the Claude app itself in restricted regions.</li>
          <li>Enable &quot;Install from unknown sources&quot; for your browser or file manager (same as standard Android).</li>
        </ul>
      </section>

      {/* Section 7: Version History */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Claude APK Version History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-semibold">Version</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {claudeVersions.map((v, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="py-3 px-4 font-mono text-sm">{v.version}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm">
                    {v.date}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm">
                    {v.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-3">
          Check gptoapk.com for the latest Claude APK version.
        </p>
      </section>

      {/* Section 8: Safety */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Is Claude APK Safe?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Yes, the Claude APK from gptoapk.com is completely safe. Here&apos;s why:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
          <li>
            <strong>Original developer signature</strong> — The APK is signed with Anthropic&apos;s official digital certificate. The signature matches what you&apos;d get from Google Play.
          </li>
          <li>
            <strong>Direct from Google CDN</strong> — gptoapk.com fetches the file from Google&apos;s servers without modification.
          </li>
          <li>
            <strong>SHA-256 verified</strong> — You can verify the file hash against known values from trusted sources.
          </li>
          <li>
            <strong>VirusTotal clean</strong> — The official Claude APK consistently passes all 70+ antivirus engines on VirusTotal.
          </li>
        </ul>
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
            SHA-256 (example): 7d2e...a3bf — Always verify by downloading from a trusted source.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">
          Frequently Asked Questions
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
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">Need the latest version of the APK?</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — a fast and safe way to download any APK. Simply enter the app name in the search bar.</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Search Now →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    </div>
  );
}
