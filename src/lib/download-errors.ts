import { SITE_LOCALES, type SiteLocale } from "./site-locales";

export const PAID_APP_UNSUPPORTED_CODE = "PAID_APP_UNSUPPORTED";
export const PAID_APP_UNSUPPORTED_ADMIN_ERROR =
  "PAID_APP_UNSUPPORTED: Paid apps are not supported for APK download yet.";

export const paidAppUnsupportedMessages: Record<SiteLocale, string> = {
  en: "This is a paid app. Paid app downloads are not supported yet.",
  zh: "这是付费应用，暂时不支持付费应用下载。",
  ja: "これは有料アプリです。有料アプリのダウンロードにはまだ対応していません。",
  pt: "Este é um app pago. Downloads de apps pagos ainda não são compatíveis.",
  es: "Esta es una app de pago. Aún no admitimos descargas de apps de pago.",
  ru: "Это платное приложение. Загрузка платных приложений пока не поддерживается.",
  id: "Ini aplikasi berbayar. Unduhan aplikasi berbayar belum didukung.",
  hi: "यह एक पेड ऐप है। पेड ऐप डाउनलोड अभी समर्थित नहीं हैं।",
  ko: "유료 앱입니다. 유료 앱 다운로드는 아직 지원하지 않습니다.",
  fr: "Cette application est payante. Le téléchargement des apps payantes n'est pas encore pris en charge.",
  de: "Dies ist eine kostenpflichtige App. Downloads kostenpflichtiger Apps werden noch nicht unterstützt.",
  vi: "Đây là ứng dụng trả phí. Chúng tôi chưa hỗ trợ tải ứng dụng trả phí.",
  ar: "هذا تطبيق مدفوع. تنزيل التطبيقات المدفوعة غير مدعوم حاليًا.",
  tr: "Bu ücretli bir uygulama. Ücretli uygulama indirme henüz desteklenmiyor.",
  it: "Questa è un'app a pagamento. I download delle app a pagamento non sono ancora supportati.",
  nl: "Dit is een betaalde app. Downloads van betaalde apps worden nog niet ondersteund.",
  pl: "To płatna aplikacja. Pobieranie płatnych aplikacji nie jest jeszcze obsługiwane.",
  uk: "Це платний застосунок. Завантаження платних застосунків поки не підтримується.",
  th: "นี่เป็นแอปแบบชำระเงิน เรายังไม่รองรับการดาวน์โหลดแอปแบบชำระเงิน",
  ms: "Ini aplikasi berbayar. Muat turun aplikasi berbayar belum disokong.",
  sv: "Det här är en betalapp. Nedladdningar av betalappar stöds inte ännu.",
  da: "Dette er en betalingsapp. Downloads af betalingsapps understøttes ikke endnu.",
  fi: "Tämä on maksullinen sovellus. Maksullisten sovellusten latauksia ei vielä tueta.",
  nb: "Dette er en betalingsapp. Nedlasting av betalingsapper støttes ikke ennå.",
  cs: "Toto je placená aplikace. Stahování placených aplikací zatím nepodporujeme.",
  ro: "Aceasta este o aplicație plătită. Descărcările aplicațiilor plătite nu sunt încă acceptate.",
  el: "Αυτή είναι εφαρμογή επί πληρωμή. Οι λήψεις εφαρμογών επί πληρωμή δεν υποστηρίζονται ακόμη.",
  hu: "Ez egy fizetős alkalmazás. A fizetős alkalmazások letöltése még nem támogatott.",
  bn: "এটি একটি পেইড অ্যাপ। পেইড অ্যাপ ডাউনলোড এখনও সমর্থিত নয়।",
  tl: "Bayad na app ito. Hindi pa sinusuportahan ang pag-download ng paid apps.",
  he: "זו אפליקציה בתשלום. הורדת אפליקציות בתשלום עדיין אינה נתמכת.",
  fa: "این یک برنامه پولی است. دانلود برنامه‌های پولی هنوز پشتیبانی نمی‌شود.",
  ur: "یہ ایک paid app ہے۔ paid apps ڈاؤن لوڈ فی الحال supported نہیں ہیں۔",
};

export function normalizeDownloadLocale(value: unknown): SiteLocale | null {
  if (typeof value !== "string") return null;
  const clean = value.trim().toLowerCase().replace("_", "-");
  const base = clean.split("-")[0];
  if (SITE_LOCALES.includes(clean as SiteLocale)) return clean as SiteLocale;
  if (SITE_LOCALES.includes(base as SiteLocale)) return base as SiteLocale;
  return null;
}

export function localeFromAcceptLanguage(value: string | null): SiteLocale {
  if (!value) return "en";

  for (const part of value.split(",")) {
    const locale = normalizeDownloadLocale(part.split(";")[0]);
    if (locale) return locale;
  }

  return "en";
}

export function getPaidAppUnsupportedMessage(locale: SiteLocale | null | undefined): string {
  return paidAppUnsupportedMessages[locale ?? "en"] ?? paidAppUnsupportedMessages.en;
}
