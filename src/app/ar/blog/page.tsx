import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "المدونة - أدلة وبرامج تعليمية لمحمل APK | gptoapk.com",
  description:
    "تعلّم كيفية تنزيل ملفات APK من Google Play، وقارن أدوات التنزيل، وافهم بنية ملفات APK، وأتقن تثبيت تطبيقات Android.",
  alternates: {
    canonical: "https://gptoapk.com/ar/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      ar: "https://gptoapk.com/ar/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function ArBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          مدونة محمل APK
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          أدلة ومقالات ونصائح لتنزيل ملفات APK من متجر Google Play.
        </p>
      </div>

      <div className="mb-10 mx-auto max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40 rounded-xl px-6 py-4">
        المقالات الكاملة متاحة حاليًا باللغة الإنجليزية فقط. ستتم إضافة النسخ العربية قريبًا.
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/en/blog/how-to-download-apk-from-google-play" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>6 دقائق</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            How to Download APK from Google Play Store: The Complete Guide (2026)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            دليل خطوة بخطوة لاستخراج ملفات APK من متجر Google Play. تعرّف على عدة طرق: الأدوات الإلكترونية، ADB، وأفضل الممارسات للتنزيلات الآمنة.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Download</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Tutorial</span>
          </div>
        </Link>

        <Link href="/en/blog/apk-downloader-tool-comparison" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>8 دقائق</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            APK Downloader Comparison: Top 5 Tools for Google Play APK Extraction
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            اختبرنا أدوات تنزيل APK الأكثر شهرة جنبًا إلى جنب. قارن بين السرعة والأمان وسهولة الاستخدام للعثور على أفضل أداة.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Tools</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Comparison</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Review</span>
          </div>
        </Link>

        <Link href="/en/blog/what-is-an-apk-file" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 دقائق</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            What Is an APK File? A Complete Guide to Android Package Files
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            كل ما تحتاج معرفته عن ملفات APK — ما الذي بداخلها، وكيف تعمل، وAPK مقابل AAB، ولماذا تعد سلامة الملفات مهمة لأمان Android.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Android</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Beginner Guide</span>
          </div>
        </Link>

        <Link href="/en/blog/how-to-install-apk-on-android" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 دقائق</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            How to Install APK on Android: Complete Step-by-Step Guide
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            جديد على تثبيت APK يدويًا؟ يغطي هذا الدليل كل شيء من تمكين المصادر غير المعروفة إلى إصلاح أخطاء التثبيت الشائعة.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Installation</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Android</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Tutorial</span>
          </div>
        </Link>

        <Link href="/en/blog/google-play-link-to-apk-troubleshooting" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 دقائق</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Google Play Link to APK Failed? Common Problems and Fixes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            دليل كامل لاستكشاف الأخطاء وإصلاحها لتحويل رابط Google Play إلى APK الفاشل: روابط غير صالحة، تنزيلات بطيئة، أخطاء التثبيت والمزيد.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Download</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Troubleshooting</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
          </div>
        </Link>

        <Link href="/en/blog/google-play-link-to-apk-tips" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>6 دقائق</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            No VPN Needed! 3 Pro Tips for Online Google Play Link to APK Converter
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            أتقن تحويل رابط Google Play إلى APK مع 3 نصائح احترافية: استخدام أسماء الحزم، التنزيل من الهاتف، إنشاء روابط مشاركة فورًا.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Tips</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Productivity</span>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <Link href="/ar" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          العودة إلى محمل APK
        </Link>
      </div>
    </div>
  );
}
