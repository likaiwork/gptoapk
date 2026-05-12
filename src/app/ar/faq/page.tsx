import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة - محمل APK | gptoapk.com",
  description:
    "الأسئلة الشائعة حول تنزيل ملفات APK من متجر Google Play باستخدام gptoapk.com. كيفية العمل والأمان ونصائح حل المشكلات.",
};

export default function ArFAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          الأسئلة الشائعة
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          كل ما تحتاج معرفته لاستخدام gptoapk.com لتنزيل ملفات APK من متجر Google Play.
        </p>
      </div>

      <div className="space-y-6">
        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">ما هو gptoapk.com؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            gptoapk.com هي أداة مجانية عبر الإنترنت تتيح لك إنشاء روابط تنزيل APK مباشرة من متجر Google Play. ما عليك سوى لصق رابط Google Play أو اسم الحزمة وستحصل على رابط تنزيل مباشر فورًا.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">هل الاستخدام مجاني؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            نعم، مجاني تمامًا. بدون تسجيل، بدون رسوم خفية، بدون خطط مدفوعة.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">كيف يعمل؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            عند لصق رابط Google Play، يجلب خادمنا ملف APK مباشرة من شبكة CDN الخاصة بـ Google ويوفر لك رابط التنزيل. نحن لا نعدّل الملفات أو نخزنها أبدًا.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">هل تنزيل ملفات APK من gptoapk.com آمن؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            بالتأكيد. يتم جلب الملفات مباشرة من خوادم Google. لا نلمس الملفات أو نعدّلها أبدًا، لذا تحصل على ملفات APK أصلية 100% بتوقيع تم التحقق منه.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">هل يمكنني تنزيل APK على هاتفي؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            نعم! ما عليك سوى فتح gptoapk.com في متصفح هاتفك ولصق الرابط. يعمل على كل من الهاتف والكمبيوتر.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">هل يعمل مع التطبيقات المدفوعة؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            نعم، ولكن يجب أن يكون التطبيق مشترى بحساب Google الخاص بك حتى يتم إنشاء رابط تنزيل صالح.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">هل أحتاج إلى تثبيت برنامج أو امتداد متصفح؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            لا. يعمل gptoapk.com بالكامل داخل متصفحك. بدون تنزيلات أو امتدادات أو إضافات.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">هل يمكنني تنزيل ملفات APK من أي بلد؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            نعم، gptoapk.com يعمل في جميع أنحاء العالم. ومع ذلك، قد تكون بعض التطبيقات مقيدة بمنطقة معينة في Google Play.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">ما الفرق بين APK و AAB؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            APK هو تنسيق الحزمة القابلة للتثبيت لـ Android. AAB (حزمة تطبيق Android) هو تنسيق نشر يستخدمه Google Play. يدعم gptoapk.com كليهما — حتى عندما يتم نشر التطبيق بصيغة AAB، فإننا نوفر ملف APK متوافقًا.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">لماذا أحصل على خطأ 404 في بعض التطبيقات؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            قد تكون بعض التطبيقات مقفلة بحسب المنطقة، أو تمت إزالتها من Google Play، أو تتطلب توافق جهاز معين. إذا كان التطبيق مقيدًا حسب المنطقة، فجرّب VPN.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">هل تنزيل ملفات APK من Google Play قانوني؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            للاستخدام الشخصي واختبار التطبيقات والنسخ الاحتياطي — بالتأكيد. إعادة توزيع التطبيقات المدفوعة أو المواد المحمية بحقوق الطبع والنشر دون إذن أمر غير قانوني.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">هل gptoapk.com تابع لـ Google؟</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            لا. gptoapk.com أداة مستقلة وليست تابعة لـ Google أو Google Play بأي شكل من الأشكال.
          </div>
        </details>
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">لا تزال لديك أسئلة؟</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          جرّب <Link href="/ar" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">محمل APK</Link> الخاص بنا وشاهده في العمل، أو راجع <Link href="/ar/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">المدونة</Link> للحصول على أدلة مفصلة.
        </p>
      </div>
    </div>
  );
}
