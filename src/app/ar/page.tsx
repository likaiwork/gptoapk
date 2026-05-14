import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function ArHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          محمل APK
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"ابحث باسم التطبيق، أو الصق رابط Google Play، أو أدخل اسم الحزمة للعثور على التطبيق وإنشاء رابط تنزيل APK."}
        </p>
        <div className="mt-8">
          <SearchBox />
        </div>
      </div>

      {/* Features */}
      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">تنزيل سريع</h3>
          <p className="text-slate-600 dark:text-slate-400">لا انتظار، لا اختبارات CAPTCHA. روابط تنزيل مباشرة في ثوانٍ معدودة.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">آمن وموثوق</h3>
          <p className="text-slate-600 dark:text-slate-400">يتم جلب الملفات مباشرة من خوادم Google. بدون أي تعديل، ملفات APK أصلية بنسبة 100%.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">بدون تسجيل</h3>
          <p className="text-slate-600 dark:text-slate-400">مجاني تمامًا — بدون حسابات أو إضافات للمتصفح.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">كيف تنزّل APK من Google Play</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">انسخ رابط Google Play</h3>
              <p className="text-slate-600 dark:text-slate-400">ابحث عن التطبيق في متجر Google Play وانسخ عنوان URL من شريط العنوان.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">الصق وولّد</h3>
              <p className="text-slate-600 dark:text-slate-400">الصق الرابط في الحقل أعلاه وانقر زر &quot;إنشاء الرابط&quot;.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">نزّل ملف APK</h3>
              <p className="text-slate-600 dark:text-slate-400">انقر على رابط التنزيل لحفظ ملف APK وثبته على جهاز Android الخاص بك.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">لماذا تختار gptoapk.com؟</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">مباشرة من Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">الملفات تأتي مباشرة من خوادم Google</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">بدون رفع</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">تمر الملفات عبر خوادمنا دون أن يتم تخزينها أبدًا</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">مجاني 100%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">بدون رسوم خفية أو خطط مدفوعة</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">بدون تسجيل</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">ابدأ التنزيل على الفور</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">أدلة ونصائح تنزيل APK</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          تعرّف أكثر على ملفات APK وكيفية تثبيتها وأفضل الأدوات لاستخراج ملفات APK من Google Play.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/ar/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">كيفية تنزيل APK من Google Play: الدليل الشامل</h3>
            <p className="text-sm text-slate-500 mt-2">دليل شامل يغطي الأدوات الإلكترونية وADB وأفضل الممارسات.</p>
          </Link>
          <Link href="/ar/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">ما هو ملف APK؟</h3>
            <p className="text-sm text-slate-500 mt-2">كل ما تحتاج معرفته عن حزم تثبيت Android.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/ar/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            عرض جميع المقالات ←
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">كيف أنزّل APK من Google Play؟</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">ما عليك سوى لصق رابط Google Play في هذه الصفحة والنقر على &quot;إنشاء الرابط&quot;. سيكون تنزيل APK جاهزًا في ثوانٍ.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">هل تنزيل ملفات APK آمن؟</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">نعم. أداتنا تجلب الملفات مباشرة من خوادم Google. ملفات APK أصلية بنسبة 100% وغير معدّلة.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">هل أحتاج إلى تثبيت أي شيء؟</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">لا. يعمل gptoapk.com بالكامل في المتصفح — بدون امتدادات أو برامج إضافية.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/ar/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            عرض جميع الأسئلة ←
          </Link>
        </div>
      </div>
    </div>
  );
}
