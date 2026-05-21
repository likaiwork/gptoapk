"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { SiteLocale } from "@/lib/site-locales";

const STORAGE_KEY = "gptoapk-cookie-consent";

type ConsentChoice = "accepted" | "rejected" | null;

type ConsentMessage = { title: string; body: string; accept: string; reject: string; privacy: string };

const messages: Record<SiteLocale, ConsentMessage> = {
  en: {
    title: "We use cookies & ads",
    body: "We use cookies and similar technologies to operate this website, support analytics, and serve personalized ads via Google AdSense. By clicking Accept, you consent to the use of cookies for advertising and analytics. You can change your choice anytime via our Privacy Policy.",
    accept: "Accept All",
    reject: "Reject Non‑Essential",
    privacy: "Privacy Policy",
  },
  zh: {
    title: "我们使用 Cookie 和广告",
    body: "我们使用 Cookie 和类似技术来运行本网站、支持分析和通过 Google AdSense 提供个性化广告。点击「接受」即表示您同意将 Cookie 用于广告和分析目的。您可随时通过隐私政策更改设置。",
    accept: "全部接受",
    reject: "拒绝非必要",
    privacy: "隐私政策",
  },
  ja: {
    title: "Cookie と広告について",
    body: "サイト運営、分析、Google AdSense による広告配信のために Cookie などの技術を使用します。承認すると、広告と分析目的の Cookie 使用に同意したことになります。",
    accept: "すべて許可",
    reject: "必須以外を拒否",
    privacy: "プライバシーポリシー",
  },
  pt: {
    title: "Usamos cookies e anúncios",
    body: "Usamos cookies para operar o site, medir tráfego e exibir anúncios pelo Google AdSense. Ao aceitar, você consente o uso de cookies para publicidade e análise.",
    accept: "Aceitar tudo",
    reject: "Recusar não essenciais",
    privacy: "Política de Privacidade",
  },
  es: {
    title: "Usamos cookies y anuncios",
    body: "Usamos cookies para operar el sitio, medir el tráfico y mostrar anuncios mediante Google AdSense. Al aceptar, consientes el uso de cookies para publicidad y analítica.",
    accept: "Aceptar todo",
    reject: "Rechazar no esenciales",
    privacy: "Política de privacidad",
  },
  ru: {
    title: "Мы используем cookies и рекламу",
    body: "Мы используем cookies для работы сайта, аналитики и показа рекламы через Google AdSense. Нажимая «Принять», вы соглашаетесь на cookies для рекламы и аналитики.",
    accept: "Принять всё",
    reject: "Отклонить необязательные",
    privacy: "Политика конфиденциальности",
  },
  id: {
    title: "Kami menggunakan cookie & iklan",
    body: "Kami menggunakan cookie untuk menjalankan situs, analitik, dan iklan Google AdSense. Dengan menerima, Anda menyetujui cookie untuk iklan dan analitik.",
    accept: "Terima semua",
    reject: "Tolak non-esensial",
    privacy: "Kebijakan Privasi",
  },
  hi: {
    title: "हम cookies और विज्ञापन उपयोग करते हैं",
    body: "हम साइट चलाने, analytics और Google AdSense विज्ञापनों के लिए cookies का उपयोग करते हैं। Accept पर क्लिक करके आप विज्ञापन और analytics cookies से सहमत होते हैं।",
    accept: "सब स्वीकार करें",
    reject: "गैर-जरूरी अस्वीकार करें",
    privacy: "Privacy Policy",
  },
  ko: {
    title: "쿠키와 광고 사용",
    body: "사이트 운영, 분석, Google AdSense 광고 제공을 위해 쿠키를 사용합니다. 동의하면 광고 및 분석 목적의 쿠키 사용에 동의하게 됩니다.",
    accept: "모두 허용",
    reject: "필수 외 거부",
    privacy: "개인정보처리방침",
  },
  fr: {
    title: "Nous utilisons des cookies et des annonces",
    body: "Nous utilisons des cookies pour faire fonctionner le site, mesurer l'audience et afficher des annonces via Google AdSense. En acceptant, vous consentez aux cookies publicitaires et analytiques.",
    accept: "Tout accepter",
    reject: "Refuser le non essentiel",
    privacy: "Politique de confidentialité",
  },
  de: {
    title: "Wir verwenden Cookies und Anzeigen",
    body: "Wir verwenden Cookies für den Betrieb der Website, Analysen und Google AdSense-Anzeigen. Mit Akzeptieren stimmen Sie Cookies für Werbung und Analyse zu.",
    accept: "Alle akzeptieren",
    reject: "Nicht notwendige ablehnen",
    privacy: "Datenschutzerklärung",
  },
  vi: {
    title: "Chúng tôi dùng cookie & quảng cáo",
    body: "Chúng tôi dùng cookie để vận hành trang web, phân tích và hiển thị quảng cáo qua Google AdSense. Khi chấp nhận, bạn đồng ý cookie cho quảng cáo và phân tích.",
    accept: "Chấp nhận tất cả",
    reject: "Từ chối không cần thiết",
    privacy: "Chính sách quyền riêng tư",
  },
  ar: {
    title: "نستخدم ملفات تعريف الارتباط والإعلانات",
    body: "نستخدم ملفات تعريف الارتباط لتشغيل الموقع والتحليلات وعرض إعلانات Google AdSense. بالموافقة، تسمح باستخدامها للإعلانات والتحليلات.",
    accept: "قبول الكل",
    reject: "رفض غير الضروري",
    privacy: "سياسة الخصوصية",
  },
  tr: {
    title: "Çerezler ve reklamlar kullanıyoruz",
    body: "Siteyi çalıştırmak, analiz yapmak ve Google AdSense reklamları göstermek için çerezler kullanıyoruz. Kabul ederek reklam ve analiz çerezlerine izin verirsiniz.",
    accept: "Tümünü kabul et",
    reject: "Zorunlu olmayanları reddet",
    privacy: "Gizlilik Politikası",
  },
  it: {
    title: "Usiamo cookie e annunci",
    body: "Usiamo cookie per gestire il sito, analizzare il traffico e mostrare annunci con Google AdSense. Accettando, acconsenti ai cookie per pubblicità e analisi.",
    accept: "Accetta tutto",
    reject: "Rifiuta non essenziali",
    privacy: "Informativa privacy",
  },
  nl: {
    title: "We gebruiken cookies en advertenties",
    body: "We gebruiken cookies voor de werking van de site, analyse en Google AdSense-advertenties. Door te accepteren stem je in met cookies voor advertenties en analyse.",
    accept: "Alles accepteren",
    reject: "Niet-essentiële weigeren",
    privacy: "Privacybeleid",
  },
  pl: {
    title: "Używamy cookies i reklam",
    body: "Używamy cookies do działania strony, analityki i reklam Google AdSense. Akceptując, zgadzasz się na cookies reklamowe i analityczne.",
    accept: "Akceptuj wszystko",
    reject: "Odrzuć niezbędne",
    privacy: "Polityka prywatności",
  },
  uk: {
    title: "Ми використовуємо cookies і рекламу",
    body: "Ми використовуємо cookies для роботи сайту, аналітики та реклами Google AdSense. Приймаючи, ви погоджуєтесь на cookies для реклами й аналітики.",
    accept: "Прийняти все",
    reject: "Відхилити необов'язкові",
    privacy: "Політика конфіденційності",
  },
  th: {
    title: "เราใช้คุกกี้และโฆษณา",
    body: "เราใช้คุกกี้เพื่อให้เว็บไซต์ทำงาน วิเคราะห์การใช้งาน และแสดงโฆษณาผ่าน Google AdSense เมื่อยอมรับ คุณยินยอมให้ใช้คุกกี้เพื่อโฆษณาและวิเคราะห์",
    accept: "ยอมรับทั้งหมด",
    reject: "ปฏิเสธที่ไม่จำเป็น",
    privacy: "นโยบายความเป็นส่วนตัว",
  },
  ms: {
    title: "Kami menggunakan kuki & iklan",
    body: "Kami menggunakan kuki untuk menjalankan laman, analitik dan iklan Google AdSense. Dengan menerima, anda bersetuju dengan kuki untuk iklan dan analitik.",
    accept: "Terima semua",
    reject: "Tolak bukan penting",
    privacy: "Dasar Privasi",
  },
  sv: {
    title: "Vi använder cookies och annonser",
    body: "Vi använder cookies för webbplatsens drift, analys och Google AdSense-annonser. Genom att acceptera samtycker du till cookies för annonser och analys.",
    accept: "Acceptera alla",
    reject: "Avvisa icke nödvändiga",
    privacy: "Integritetspolicy",
  },
  da: {
    title: "Vi bruger cookies og annoncer",
    body: "Vi bruger cookies til drift, analyse og Google AdSense-annoncer. Ved at acceptere giver du samtykke til cookies til annoncer og analyse.",
    accept: "Acceptér alle",
    reject: "Afvis ikke-nødvendige",
    privacy: "Privatlivspolitik",
  },
  fi: {
    title: "Käytämme evästeitä ja mainoksia",
    body: "Käytämme evästeitä sivuston toimintaan, analytiikkaan ja Google AdSense -mainoksiin. Hyväksymällä sallit mainos- ja analytiikkaevästeet.",
    accept: "Hyväksy kaikki",
    reject: "Hylkää ei-välttämättömät",
    privacy: "Tietosuojakäytäntö",
  },
  nb: {
    title: "Vi bruker informasjonskapsler og annonser",
    body: "Vi bruker informasjonskapsler for drift, analyse og Google AdSense-annonser. Ved å godta samtykker du til kapsler for annonser og analyse.",
    accept: "Godta alle",
    reject: "Avvis ikke-nødvendige",
    privacy: "Personvernerklæring",
  },
  cs: {
    title: "Používáme cookies a reklamy",
    body: "Používáme cookies k provozu webu, analytice a reklamám Google AdSense. Přijetím souhlasíte s cookies pro reklamu a analytiku.",
    accept: "Přijmout vše",
    reject: "Odmítnout nezbytné",
    privacy: "Zásady ochrany osobních údajů",
  },
  ro: {
    title: "Folosim cookie-uri și reclame",
    body: "Folosim cookie-uri pentru funcționarea site-ului, analiză și reclame Google AdSense. Acceptând, consimți la cookie-uri pentru reclame și analiză.",
    accept: "Acceptă tot",
    reject: "Respinge neesențiale",
    privacy: "Politica de confidențialitate",
  },
  el: {
    title: "Χρησιμοποιούμε cookies και διαφημίσεις",
    body: "Χρησιμοποιούμε cookies για λειτουργία, αναλυτικά στοιχεία και διαφημίσεις Google AdSense. Με την αποδοχή συναινείτε σε cookies για διαφημίσεις και αναλύσεις.",
    accept: "Αποδοχή όλων",
    reject: "Απόρριψη μη απαραίτητων",
    privacy: "Πολιτική απορρήτου",
  },
  hu: {
    title: "Cookie-kat és hirdetéseket használunk",
    body: "Cookie-kat használunk a webhely működéséhez, elemzéshez és Google AdSense hirdetésekhez. Elfogadással hozzájárulsz a reklám- és analitikai cookie-khoz.",
    accept: "Összes elfogadása",
    reject: "Nem szükségesek elutasítása",
    privacy: "Adatvédelmi irányelvek",
  },
  bn: {
    title: "আমরা cookies ও বিজ্ঞাপন ব্যবহার করি",
    body: "সাইট চালানো, analytics এবং Google AdSense বিজ্ঞাপনের জন্য আমরা cookies ব্যবহার করি। Accept করলে আপনি বিজ্ঞাপন ও analytics cookies-এ সম্মতি দেন।",
    accept: "সব গ্রহণ করুন",
    reject: "অপ্রয়োজনীয় প্রত্যাখ্যান",
    privacy: "Privacy Policy",
  },
  tl: {
    title: "Gumagamit kami ng cookies at ads",
    body: "Gumagamit kami ng cookies para patakbuhin ang site, analytics, at Google AdSense ads. Sa pag-accept, pumapayag ka sa cookies para sa ads at analytics.",
    accept: "Accept All",
    reject: "Reject Non-essential",
    privacy: "Privacy Policy",
  },
  he: {
    title: "אנו משתמשים בעוגיות ובמודעות",
    body: "אנו משתמשים בעוגיות להפעלת האתר, ניתוח ושימוש ב-Google AdSense. באישור, אתה מסכים לעוגיות לפרסום וניתוח.",
    accept: "אשר הכל",
    reject: "דחה לא חיוניות",
    privacy: "מדיניות פרטיות",
  },
  fa: {
    title: "از کوکی‌ها و تبلیغات استفاده می‌کنیم",
    body: "برای اجرای سایت، تحلیل و نمایش تبلیغات Google AdSense از کوکی استفاده می‌کنیم. با پذیرش، با کوکی‌های تبلیغاتی و تحلیلی موافقت می‌کنید.",
    accept: "پذیرش همه",
    reject: "رد غیرضروری",
    privacy: "سیاست حریم خصوصی",
  },
  ur: {
    title: "ہم cookies اور ads استعمال کرتے ہیں",
    body: "ہم site چلانے، analytics اور Google AdSense ads کے لیے cookies استعمال کرتے ہیں۔ Accept کرنے سے آپ ads اور analytics cookies کی اجازت دیتے ہیں۔",
    accept: "سب قبول کریں",
    reject: "غیر ضروری رد کریں",
    privacy: "Privacy Policy",
  },
};

// Google Consent Mode v2 – update defaults based on user choice
function applyGoogleConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Array<unknown> };
  w.dataLayer = w.dataLayer ?? [];
  function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  }
  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    wait_for_update: 500,
  });
  // Signal consent update so GTM/GA tags pick up the change
  w.dataLayer.push({ event: "cookie_consent_update" });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [locale] = useState<SiteLocale>(() => {
    if (typeof document === "undefined") return "en";
    const lang = document.documentElement.lang.split("-")[0] as SiteLocale;
    return lang in messages ? lang : "en";
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentChoice;
    if (stored) {
      applyGoogleConsent(stored === "accepted");
    } else {
      const showTimer = window.setTimeout(() => setVisible(true), 0);
      // Default deny until user makes a choice
      applyGoogleConsent(false);
      return () => window.clearTimeout(showTimer);
    }

  }, []);

  function handleConsent(value: ConsentChoice) {
    localStorage.setItem(STORAGE_KEY, value ?? "");
    setVisible(false);
    applyGoogleConsent(value === "accepted");
  }

  if (!visible) return null;

  const t = messages[locale] ?? messages.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
            {t.title}
          </h3>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {t.body}{" "}
            <Link
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
            >
              {t.privacy}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleConsent("rejected")}
            className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            {t.reject}
          </button>
          <button
            onClick={() => handleConsent("accepted")}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
