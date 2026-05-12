import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Frequently asked questions about downloading APK from Google Play Store using gptoapk.com. Learn how it works, security, and troubleshooting tips.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "What is gptoapk.com?",
      a: "gptoapk.com is a free online tool that allows you to generate APK download links directly from Google Play Store. Just paste a Google Play URL or package name and get a direct download link instantly."
    },
    {
      q: "Is it free to use?",
      a: "Yes, completely free. No registration, no hidden fees, no premium plans."
    },
    {
      q: "How does it work?",
      a: "When you paste a Google Play link, our server fetches the APK file directly from Google's CDN and provides you with a download link. We never modify or store the files."
    },
    {
      q: "Is it safe to download APK from gptoapk.com?",
      a: "Absolutely. Files are fetched directly from Google's servers. We never touch or modify the files, so you get 100% original, signature-verified APKs."
    },
    {
      q: "Can I download APK on my phone?",
      a: "Yes! Just open gptoapk.com in your mobile browser and paste the link. It works on both phones and computers."
    },
    {
      q: "Does it work for paid apps?",
      a: "Yes, but you need to have purchased the app on your Google account for it to generate a valid download link."
    },
    {
      q: "Do I need to install any software or browser extensions?",
      a: "No. gptoapk.com works entirely in your browser. No downloads, no extensions, no plugins needed."
    },
    {
      q: "Can I download APK files from any country?",
      a: "Yes, gptoapk.com works worldwide. However, some apps may be region-restricted on Google Play."
    },
    {
      q: "What's the difference between APK and AAB?",
      a: "APK is the installable package format for Android. AAB (Android App Bundle) is a publishing format used by Google Play. gptoapk.com handles both — when an app is published as AAB, we still provide you with the compatible APK."
    },
    {
      q: "Why do I get a 404 error on some apps?",
      a: "Some apps may be region-locked, removed from Google Play, or require specific device compatibility. Try a VPN if the app is region-restricted."
    },
    {
      q: "Is downloading APK from Google Play legal?",
      a: "For personal use, app testing, and backup purposes — absolutely. Redistributing paid apps or copyrighted material without permission is illegal."
    },
    {
      q: "Is gptoapk.com affiliated with Google?",
      a: "No. gptoapk.com is an independent tool and is not affiliated with Google or Google Play."
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Everything you need to know about using gptoapk.com to download APK files from Google Play Store.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
              <span className="font-semibold text-lg pr-4">{faq.q}</span>
              <svg
                className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Try our <Link href="/en" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link> and see it in action, or check our <Link href="/en/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">blog</Link> for detailed guides.
        </p>
      </div>
    </div>
  );
}
