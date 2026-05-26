import { SITE_LOCALES, type SiteLocale } from "./site-locales";

export const PAID_APP_UNSUPPORTED_CODE = "PAID_APP_UNSUPPORTED";
export const PAID_APP_UNSUPPORTED_ADMIN_ERROR =
  "PAID_APP_UNSUPPORTED: Paid apps are not supported for APK download yet.";

export const MIRROR_UNAVAILABLE_CODE = "MIRROR_UNAVAILABLE";
export const MIRROR_UNAVAILABLE_ADMIN_ERROR =
  "MIRROR_UNAVAILABLE: No public APK mirror currently lists this app.";

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

export const mirrorUnavailableMessages: Record<SiteLocale, string> = {
  en: "This app is not available from public APK mirrors. Please install it from Google Play or the developer's official site.",
  zh: "公共 APK 镜像站目前没有该应用，请从 Google Play 或开发者官网安装。",
  ja: "公開 APK ミラーにこのアプリはありません。Google Play または公式サイトからインストールしてください。",
  pt: "Este app não está disponível em espelhos públicos de APK. Instale pelo Google Play ou site oficial.",
  es: "Esta app no está en mirrors públicos de APK. Instálala desde Google Play o el sitio oficial.",
  ru: "Приложение недоступно в публичных APK-зеркалах. Установите из Google Play или с официального сайта.",
  id: "Aplikasi ini tidak ada di mirror APK publik. Pasang dari Google Play atau situs resmi.",
  hi: "यह ऐप सार्वजनिक APK mirrors पर उपलब्ध नहीं है। Google Play या आधिकारिक साइट से इंस्टॉल करें।",
  ko: "공개 APK 미러에 이 앱이 없습니다. Google Play 또는 공식 사이트에서 설치하세요.",
  fr: "Cette app n'est pas disponible sur les miroirs APK publics. Installez-la via Google Play ou le site officiel.",
  de: "Diese App ist in öffentlichen APK-Spiegeln nicht verfügbar. Bitte über Google Play oder die offizielle Website installieren.",
  vi: "Ứng dụng này không có trên mirror APK công khai. Hãy cài từ Google Play hoặc trang chính thức.",
  ar: "التطبيق غير متوفر على مرايا APK العامة. ثبّته من Google Play أو الموقع الرسمي.",
  tr: "Bu uygulama genel APK aynalarında yok. Google Play veya resmi siteden yükleyin.",
  it: "Questa app non è disponibile su mirror APK pubblici. Installala da Google Play o dal sito ufficiale.",
  nl: "Deze app staat niet op openbare APK-mirrors. Installeer via Google Play of de officiële site.",
  pl: "Ta aplikacja nie jest dostępna w publicznych mirrorach APK. Zainstaluj z Google Play lub strony oficjalnej.",
  uk: "Застосунок недоступний у публічних APK-дзеркалах. Встановіть з Google Play або офіційного сайту.",
  th: "แอปนี้ไม่มีใน mirror APK สาธารณะ ติดตั้งจาก Google Play หรือเว็บไซต์ทางการ",
  ms: "Apl ini tiada di cermin APK awam. Pasang dari Google Play atau laman rasmi.",
  sv: "Appen finns inte på offentliga APK-speglar. Installera från Google Play eller officiella webbplatsen.",
  da: "Denne app findes ikke på offentlige APK-spejle. Installer fra Google Play eller det officielle websted.",
  fi: "Sovellusta ei ole julkisissa APK-peileissä. Asenna Google Playsta tai viralliselta sivustolta.",
  nb: "Appen finnes ikke på offentlige APK-speil. Installer fra Google Play eller offisiell nettside.",
  cs: "Aplikace není na veřejných APK zrcadlech. Nainstalujte z Google Play nebo oficiálního webu.",
  ro: "Aplicația nu este pe oglinzi APK publice. Instalați din Google Play sau site-ul oficial.",
  el: "Η εφαρμογή δεν υπάρχει σε δημόσιους καθρέπτες APK. Εγκαταστήστε από Google Play ή επίσημη ιστοσελίδα.",
  hu: "Az alkalmazás nem érhető el nyilvános APK tükrökön. Telepítse a Google Playből vagy a hivatalos oldalról.",
  bn: "এই অ্যাপ পাবলিক APK mirror-এ নেই। Google Play বা অফিসিয়াল সাইট থেকে ইনস্টল করুন।",
  tl: "Wala ang app sa public APK mirrors. I-install mula sa Google Play o opisyal na site.",
  he: "האפליקציה אינה זמינה במראות APK ציבוריות. התקינו מ-Google Play או מהאתר הרשמי.",
  fa: "این برنامه در آینه‌های عمومی APK موجود نیست. از Google Play یا سایت رسمی نصب کنید.",
  ur: "یہ app عوامی APK mirrors پر دستیاب نہیں۔ Google Play یا سرکاری سائٹ سے انسٹال کریں۔",
};

export function getMirrorUnavailableMessage(locale: SiteLocale | null | undefined): string {
  return mirrorUnavailableMessages[locale ?? "en"] ?? mirrorUnavailableMessages.en;
}
