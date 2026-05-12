import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "כלי מקוון חינמי להורדת קבצי APK מקישורי Google Play. הדביקו כתובת או מזהה אפליקציה ויצרו קישור הורדה.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "מה זה gptoapk.com?",
      a: "gptoapk.com הוא כלי מקוון חינמי ליצירת קישורי הורדת APK ישירות מחנות Google Play. הדביקו כתובת Google Play או שם חבילה וקבלו קישור ישיר מיד.",
    },
    {
      q: "זה בחינם?",
      a: "כן, לגמרי חינם. בלי הרשמה, בלי עמלות נסתרות ובלי תוכניות פרימיום.",
    },
    {
      q: "איך זה עובד?",
      a: "כשמדביקים קישור Google Play, השרת שלנו משיג את קובץ ה-APK מ-CDN של Google ונותן קישור הורדה. אנחנו לא משנים ולא שומרים קבצים.",
    },
    {
      q: "האם זה בטוח להוריד מ-gptoapk.com?",
      a: "כן. הקבצים מגיעים ישירות משרתי Google; אנחנו לא נוגעים בהם ולכן מקבלים APK מקורי.",
    },
    {
      q: "אפשר בנייד?",
      a: "כן. פתחו את gptoapk.com בדפדפן הנייד והדביקו את הקישור — עובד בטלפון ובמחשב.",
    },
    {
      q: "זה עובד לאפליקציות בתשלום?",
      a: "כן, אבל צריך לרכוש את האפליקציה בחשבון Google כדי שהקישור יהיה תקף.",
    },
    {
      q: "צריך להתקין תוכנה או הרחבות?",
      a: "לא. הכל בדפדפן — בלי הורדות נוספות, הרחבות או תוספים.",
    },
    {
      q: "אפשר מכל מדינה?",
      a: "כן, gptoapk.com עובד ברחבי העולם. חלק מהאפליקציות עשויות להיות מוגבלות אזורית ב-Play.",
    },
    {
      q: "מה ההבדל בין APK ל-AAB?",
      a: "APK הוא פורמט ההתקנה לאנדרואיד. AAB הוא פורמט הפרסום של Google Play. אנחנו מספקים APK תואם גם כשהאפליקציה מתפרסמת כ-AAB.",
    },
    {
      q: "למה לפעמים מקבלים 404?",
      a: "האפליקציה עשויה להיות נעולה אזורית, הוסרה מ-Play או לא תואמת למכשיר. נסו VPN אם יש הגבלה אזורית.",
    },
    {
      q: "האם חוקי להוריד APK מה-Play?",
      a: "בדרך כלל כן לשימוש אישי, בדיקות וגיבוי. מכירה מחדש של אפליקציות בתשלום או חומר מוגן זכויות יוצרים בלי רשות אסורה.",
    },
    {
      q: "האם gptoapk.com קשור ל-Google?",
      a: "לא. זה כלי עצמאי ולא קשור ל-Google או ל-Google Play.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">שאלות נפוצות</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">כל מה שצריך לדעת על gptoapk.com והורדת APK מ-Google Play.</p>
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
        <h2 className="text-2xl font-bold mb-3">עוד שאלות?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          נסו את{" "}
          <Link href="/he" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          או עברו ל{" "}
          <Link href="/he/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">בלוג</Link>.
        </p>
      </div>
    </div>
  );
}
