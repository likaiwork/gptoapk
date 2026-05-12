import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Google Play لنکس سے APK فائلیں حاصل کرنے کا مفت آن لائن ٹول۔ URL یا ایپ ID چسپاں کریں اور ڈاؤن لوڈ لنک بنائیں۔",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "gptoapk.com کیا ہے؟",
      a: "gptoapk.com ایک مفت آن لائن ٹول ہے جو براہ راست Google Play اسٹور سے APK ڈاؤن لوڈ لنک بناتا ہے۔ Google Play URL یا پیکج نام چسپاں کریں اور فوری طور پر براہ راست لنک حاصل کریں۔",
    },
    {
      q: "کیا یہ مفت ہے؟",
      a: "جی ہاں، بالکل مفت۔ کوئی رجسٹریشن، پوشیدہ فیس یا پریمیم پلان نہیں۔",
    },
    {
      q: "یہ کیسے کام کرتا ہے؟",
      a: "جب آپ Google Play لنک چسپاں کرتے ہیں، ہمارا سرور Google CDN سے APK فائل لے کر ڈاؤن لوڈ لنک دیتا ہے۔ ہم فائلیں تبدیل یا محفوظ نہیں کرتے۔",
    },
    {
      q: "کیا gptoapk.com سے ڈاؤن لوڈ محفوظ ہے؟",
      a: "جی ہاں۔ فائلیں براہ راست Google سرورز سے آتی ہیں؛ ہم انہیں چھوتے نہیں، اس لیے اصل APK ملتا ہے۔",
    },
    {
      q: "کیا موبائل پر استعمال ہو سکتا ہے؟",
      a: "جی ہاں۔ موبائل براؤزر میں gptoapk.com کھولیں اور لنک چسپاں کریں — فون اور کمپیوٹر دونوں پر کام کرتا ہے۔",
    },
    {
      q: "کیا پیڈ ایپس پر کام کرتا ہے؟",
      a: "جی ہاں، لیکن ایپ آپ کے Google اکاؤنٹ پر خریدی ہوئی ہونی چاہیے تاکہ لنک درست ہو۔",
    },
    {
      q: "کیا سافٹ ویئر یا ایکسٹینشن درکار ہے؟",
      a: "نہیں۔ سب کچھ براؤزر میں — کوئی اضافی ڈاؤن لوڈ، ایکسٹینشن یا پلگ ان نہیں۔",
    },
    {
      q: "کیا ہر ملک سے استعمال ہو سکتا ہے؟",
      a: "جی ہاں، gptoapk.com دنیا بھر میں کام کرتا ہے۔ کچھ ایپس Play پر علاقائی طور پر محدود ہو سکتی ہیں۔",
    },
    {
      q: "APK اور AAB میں کیا فرق ہے؟",
      a: "APK اینڈرائیڈ انسٹال فارمیٹ ہے۔ AAB Google Play اشاعت فارمیٹ ہے۔ ہم مطابقت پذیر APK فراہم کرتے ہیں چاہے ایپ AAB کے طور پر شائع ہو۔",
    },
    {
      q: "کبھی کبھار 404 کیوں؟",
      a: "ایپ علاقے میں مقفل ہو سکتی ہے، Play سے ہٹائی گئی ہو یا ڈیوائس سے مطابقت نہ رکھتی ہو۔ علاقائی پابندی پر VPN آزمائیں۔",
    },
    {
      q: "کیا Play سے APK ڈاؤن لوڈ قانونی ہے؟",
      a: "ذاتی استعمال، ٹیسٹنگ اور بیک اپ کے لیے عموماً ہاں۔ اجازت کے بغیر پیڈ ایپس یا کاپی رائٹ مواد کی دوبارہ فروخت غیر قانونی ہے۔",
    },
    {
      q: "کیا gptoapk.com Google سے منسلک ہے؟",
      a: "نہیں۔ یہ آزاد ٹول ہے اور Google یا Google Play سے وابستہ نہیں۔",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">اکثر پوچھے گئے سوالات</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">gptoapk.com اور Google Play سے APK ڈاؤن لوڈ کے بارے میں ضروری معلومات۔</p>
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
        <h2 className="text-2xl font-bold mb-3">مزید سوالات؟</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          آزمائیں{" "}
          <Link href="/ur" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          یا دیکھیں{" "}
          <Link href="/ur/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">بلاگ</Link>.
        </p>
      </div>
    </div>
  );
}
