import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "ابزار آنلاین رایگان برای دریافت فایل APK از لینک‌های Google Play. URL یا شناسهٔ اپ را بچسبانید و لینک دانلود بسازید.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "gptoapk.com چیست؟",
      a: "gptoapk.com یک ابزار آنلاین رایگان برای ساخت لینک دانلود APK مستقیماً از Google Play Store است. URL گوگل‌پلی یا نام بسته را بچسبانید و بلافاصله لینک مستقیم بگیرید.",
    },
    {
      q: "آیا رایگان است؟",
      a: "بله، کاملاً رایگان. بدون ثبت‌نام، هزینهٔ پنهان یا طرح پریمیوم.",
    },
    {
      q: "چطور کار می‌کند؟",
      a: "وقتی لینک Google Play را می‌چسبانید، سرور ما فایل APK را از CDN گوگل می‌گیرد و لینک دانلود می‌دهد. ما فایل‌ها را تغییر نمی‌دهیم یا ذخیره نمی‌کنیم.",
    },
    {
      q: "دانلود از gptoapk.com امن است؟",
      a: "بله. فایل‌ها مستقیماً از سرورهای گوگل می‌آیند؛ ما آن‌ها را دستکاری نمی‌کنیم و APK اصلی دریافت می‌کنید.",
    },
    {
      q: "در موبایل می‌شود؟",
      a: "بله. gptoapk.com را در مرورگر موبایل باز کنید و لینک را بچسبانید — روی گوشی و کامپیوتر کار می‌کند.",
    },
    {
      q: "برای اپ‌های پولی هم کار می‌کند؟",
      a: "بله، اما باید اپ را با حساب Google خود خریده باشید تا لینک معتبر باشد.",
    },
    {
      q: "نیاز به نرم‌افزار یا افزونه است؟",
      a: "نه. همه‌چیز در مرورگر است — بدون دانلود اضافی، افزونه یا پلاگین.",
    },
    {
      q: "از هر کشوری می‌شود استفاده کرد؟",
      a: "بله، gptoapk.com در سراسر جهان کار می‌کند. برخی اپ‌ها در Play محدودیت منطقه‌ای دارند.",
    },
    {
      q: "تفاوت APK و AAB چیست؟",
      a: "APK فرمت نصب اندروید است. AAB فرمت انتشار در Google Play است. ما APK سازگار ارائه می‌دهیم حتی اگر اپ به‌صورت AAB منتشر شده باشد.",
    },
    {
      q: "چرا گاهی 404 می‌گیرم؟",
      a: "اپ ممکن است منطقه‌ای قفل باشد، از Play حذف شده باشد یا با دستگاه سازگار نباشد. برای محدودیت منطقه VPN امتحان کنید.",
    },
    {
      q: "دانلود APK از Play قانونی است؟",
      a: "معمولاً برای استفادهٔ شخصی، تست و پشتیبان بله. فروش مجدد اپ‌های پولی یا محتوای دارای حق تکثیر بدون اجازه غیرقانونی است.",
    },
    {
      q: "آیا gptoapk.com وابسته به گوگل است؟",
      a: "نه. ابزار مستقل است و به گوگل یا Google Play وابسته نیست.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">سوالات متداول</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">هر آنچه برای استفاده از gptoapk.com و دانلود APK از Google Play لازم است.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
              <span className="font-semibold text-lg pr-4">{faq.q}</span>
              <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">{faq.a}</div>
          </details>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">سوال دیگر دارید؟</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          امتحان کنید{" "}
          <Link href="/fa" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          یا ببینید{" "}
          <Link href="/fa/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">وبلاگ</Link>.
        </p>
      </div>
    </div>
  );
}
