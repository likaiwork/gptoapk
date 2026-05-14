import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "APK Installation Guides – How to Install APK Without Google Play",
  description:
    "Step-by-step guides on installing APK files on Android devices without Google Play Store. Huawei, Xiaomi, Samsung guides included.",
  alternates: {
    canonical: "https://gptoapk.com/en/how-to",
    languages: {
      "x-default": "https://gptoapk.com/en/how-to",
    },
  },
};

const guides = [
  {
    title: "How to Install ChatGPT APK Without Google Play",
    slug: "install-chatgpt-apk",
    description:
      "Complete step-by-step guide to download and install ChatGPT APK on any Android device. Works on Huawei, Xiaomi, and phones without Google Play.",
  },
  {
    title: "How to Install APK on Huawei (No GMS)",
    slug: "install-apk-on-huawei",
    description:
      "Detailed guide for Huawei and HarmonyOS users — install APK files without Google Mobile Services.",
    comingSoon: true,
  },
  {
    title: "How to Download APK in China",
    slug: "download-apk-in-china",
    description:
      "Complete guide to downloading APK files in China, including workarounds for restricted app stores and Google Play alternatives.",
    comingSoon: true,
  },
  {
    title: 'How to Fix "App Not Available in Your Country"',
    slug: "fix-app-not-available-in-your-country",
    description:
      "Troubleshoot regional restrictions on Google Play. Learn how to download APK files for apps that are blocked in your country.",
    comingSoon: true,
  },
  {
    title: "How to Install APK on Samsung Devices",
    slug: "install-apk-on-samsung",
    description:
      "Samsung One UI-specific instructions for enabling unknown sources and installing APK files on Galaxy phones and tablets.",
    comingSoon: true,
  },
];

const faqs = [
  {
    q: "Is it safe to install APK files?",
    a: 'Yes, if you download from a trusted source like gptoapk.com that fetches files directly from Google Play. Always avoid modified or cracked APKs from untrusted third-party sites.',
  },
  {
    q: "Why can't I install APK on my phone?",
    a: "Common reasons: you haven't enabled 'Install from unknown sources', the APK is corrupted or incompatible, or there's a signature conflict with an existing app. Check our troubleshooting guides for specific fixes.",
  },
  {
    q: 'Do I need Google Play Services to install APK?',
    a: "No. You can install APK files on any Android device, including Huawei phones without Google Mobile Services. The installation process works through the standard Android package manager.",
  },
  {
    q: "Will sideloaded apps receive updates?",
    a: "Most sideloaded apps won't auto-update through Google Play. You'll need to download the new APK version manually and install it over the existing app (your data will be preserved).",
  },
  {
    q: "Can I install APK on Android TV or Fire TV?",
    a: "Yes, Android TV and Amazon Fire TV devices support APK sideloading. The process may require a file manager app or ADB commands.",
  },
];

export default function HowToPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          APK Installation Guides – How to Install APK Without Google Play
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Step-by-step guides on installing APK files on Android devices without
          Google Play Store. Huawei, Xiaomi, Samsung guides included.
        </p>
      </div>

      {/* Section 1: Popular Guides */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          Popular Installation Guides
        </h2>
        <div className="grid gap-4">
          {guides.map((guide, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
            >
              {guide.comingSoon ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{guide.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {guide.description}
                  </p>
                </div>
              ) : (
                <Link
                  href={`/en/how-to/${guide.slug}`}
                  className="group block"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {guide.description}
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Common Issues */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          Common APK Installation Issues
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold mb-2">
              &quot;Parse Error&quot; when installing APK
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The APK file may be corrupted or incompatible with your Android
              version. Re-download the APK from a trusted source like{" "}
              <Link
                href="/en"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                gptoapk.com
              </Link>{" "}
              and try again. If the issue persists, check that your Android
              version meets the app&apos;s minimum requirements.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold mb-2">
              &quot;App not installed&quot; error
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Usually caused by signature conflicts (the existing app has a
              different signature) or insufficient storage. Try uninstalling the
              existing version first, or free up storage space and retry.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold mb-2">
              Install button is grayed out
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This often happens when pop-up overlays or split-screen mode is
              active. Close all overlays (turn off Digital Wellbeing or
              screen-filter apps temporarily) and try again.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold mb-2">
              &quot;Incompatible device&quot; or architecture error
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Some apps require specific CPU architecture (arm64, armeabi-v7a).
              Use gptoapk.com to download — it fetches the correct variant for
              your device automatically from Google Play.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
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
      <section className="text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">
          Need to download an APK file?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-xl mx-auto">
          Use gptoapk.com — just paste a Google Play URL and download the APK
          directly from Google&apos;s servers. Free, no registration.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Go to APK Downloader
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
