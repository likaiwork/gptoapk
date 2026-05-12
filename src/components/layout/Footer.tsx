"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePathRegex, type SiteLocale } from "@/lib/site-locales";

function getCurrentLocale(pathname: string): SiteLocale {
  const match = pathname.match(localePathRegex);
  return (match?.[1] as SiteLocale | undefined) ?? "en";
}

export default function Footer() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  const homeHref = `/${currentLocale}`;
  const blogHref = `/${currentLocale}/blog`;
  const faqHref = `/${currentLocale}/faq`;

  const navLabels: Record<SiteLocale, { home: string; blog: string; faq: string; contact: string; copyright: string; disclaimer: string }> = {
    en: {
      home: "Home",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
      copyright: "© {year} APK Downloader. All rights reserved.",
      disclaimer: "This tool is not affiliated with Google or Google Play in any way.",
    },
    zh: {
      home: "首页",
      blog: "博客",
      faq: "FAQ",
      contact: "联系我们",
      copyright: "© {year} APK Downloader。保留所有权利。",
      disclaimer: "本工具与 Google 或 Google Play 没有任何关联。",
    },
    ja: {
      home: "ホーム",
      blog: "ブログ",
      faq: "FAQ",
      contact: "お問い合わせ",
      copyright: "© {year} APK Downloader. All rights reserved.",
      disclaimer: "このツールは Google または Google Play とは一切関係ありません。",
    },
    pt: {
      home: "Início",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contato",
      copyright: "© {year} APK Downloader. Todos os direitos reservados.",
      disclaimer: "Esta ferramenta não é afiliada ao Google ou ao Google Play de nenhuma forma.",
    },
    es: {
      home: "Inicio",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contacto",
      copyright: "© {year} APK Downloader. Todos los derechos reservados.",
      disclaimer: "Esta herramienta no está afiliada de ninguna manera a Google o Google Play.",
    },
    ru: {
      home: "Главная",
      blog: "Блог",
      faq: "FAQ",
      contact: "Контакты",
      copyright: "© {year} APK Downloader. Все права защищены.",
      disclaimer: "Этот инструмент никак не связан с Google или Google Play.",
    },
    id: {
      home: "Beranda",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontak",
      copyright: "© {year} APK Downloader. Hak cipta dilindungi undang-undang.",
      disclaimer: "Alat ini tidak berafiliasi dengan Google atau Google Play dengan cara apa pun.",
    },
    hi: {
      home: "होम",
      blog: "ब्लॉग",
      faq: "FAQ",
      contact: "संपर्क करें",
      copyright: "© {year} APK Downloader. सर्वाधिकार सुरक्षित।",
      disclaimer: "यह टूल किसी भी रूप में Google या Google Play से संबद्ध नहीं है।",
    },
    ko: {
      home: "홈",
      blog: "블로그",
      faq: "FAQ",
      contact: "문의하기",
      copyright: "© {year} APK Downloader. 모든 권리 보유.",
      disclaimer: "이 도구는 어떠한 방식으로도 Google 또는 Google Play와 제휴 관계가 아닙니다.",
    },
    fr: {
      home: "Accueil",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
      copyright: "© {year} APK Downloader. Tous droits réservés.",
      disclaimer: "Cet outil n'est en aucun cas affilié à Google ou Google Play.",
    },
    de: {
      home: "Startseite",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontakt",
      copyright: "© {year} APK Downloader. Alle Rechte vorbehalten.",
      disclaimer: "Dieses Tool steht in keiner Verbindung zu Google oder Google Play.",
    },
    vi: {
      home: "Trang chủ",
      blog: "Blog",
      faq: "FAQ",
      contact: "Liên hệ",
      copyright: "© {year} APK Downloader. Bảo lưu mọi quyền.",
      disclaimer: "Công cụ này không liên kết với Google hoặc Google Play dưới bất kỳ hình thức nào.",
    },
    ar: {
      home: "الرئيسية",
      blog: "المدونة",
      faq: "الأسئلة الشائعة",
      contact: "اتصل بنا",
      copyright: "© {year} APK Downloader. جميع الحقوق محفوظة.",
      disclaimer: "هذه الأداة غير تابعة لـ Google أو Google Play بأي شكل من الأشكال.",
    },
    tr: {
      home: "Ana Sayfa",
      blog: "Blog",
      faq: "SSS",
      contact: "İletişim",
      copyright: "© {year} APK Downloader. Tüm hakları saklıdır.",
      disclaimer: "Bu araç Google veya Google Play ile herhangi bir şekilde bağlantılı değildir.",
    },
    it: {
      home: "Inizio",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contatti",
      copyright: "© {year} APK Downloader. Tutti i diritti riservati.",
      disclaimer: "Questo strumento non è affiliato a Google o Google Play in alcun modo.",
    },
    nl: {
      home: "Startpagina",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
      copyright: "© {year} APK Downloader. Alle rechten voorbehouden.",
      disclaimer: "Deze tool is op geen enkele manier gelieerd aan Google of Google Play.",
    },
    pl: {
      home: "Strona główna",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontakt",
      copyright: "© {year} APK Downloader. Wszelkie prawa zastrzeżone.",
      disclaimer: "To narzędzie nie jest powiązane z Google ani Google Play w żaden sposób.",
    },
    uk: {
      home: "Головна",
      blog: "Блог",
      faq: "FAQ",
      contact: "Контакти",
      copyright: "© {year} APK Downloader. Усі права захищено.",
      disclaimer: "Цей інструмент не пов’язаний із Google або Google Play жодним чином.",
    },
    th: {
      home: "หน้าแรก",
      blog: "บล็อก",
      faq: "คำถามที่พบบ่อย",
      contact: "ติดต่อ",
      copyright: "© {year} APK Downloader สงวนลิขสิทธิ์",
      disclaimer: "เครื่องมือนี้ไม่มีความเกี่ยวข้องกับ Google หรือ Google Play ไม่ว่าในลักษณะใด",
    },
    ms: {
      home: "Laman utama",
      blog: "Blog",
      faq: "Soalan lazim",
      contact: "Hubungi",
      copyright: "© {year} APK Downloader. Hak cipta terpelihara.",
      disclaimer: "Alat ini tidak berafiliasi dengan Google atau Google Play dalam apa jua cara.",
    },
    sv: {
      home: "Hem",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontakt",
      copyright: "© {year} APK Downloader. Alla rättigheter förbehållna.",
      disclaimer: "Detta verktyg är inte anslutet till Google eller Google Play på något sätt.",
    },
    da: {
      home: "Hjem",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontakt",
      copyright: "© {year} APK Downloader. Alle rettigheder forbeholdes.",
      disclaimer: "Dette værktøj er ikke tilknyttet Google eller Google Play på nogen måde.",
    },
    fi: {
      home: "Etusivu",
      blog: "Blog",
      faq: "UKK",
      contact: "Yhteystiedot",
      copyright: "© {year} APK Downloader. Kaikki oikeudet pidätetään.",
      disclaimer: "Tämä työkalu ei ole millään tavalla sidoksissa Googleen tai Google Playhin.",
    },
    nb: {
      home: "Hjem",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontakt",
      copyright: "© {year} APK Downloader. Alle rettigheter reservert.",
      disclaimer: "Dette verktøyet er ikke tilknyttet Google eller Google Play på noen måte.",
    },
    cs: {
      home: "Domů",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontakt",
      copyright: "© {year} APK Downloader. Všechna práva vyhrazena.",
      disclaimer: "Tento nástroj není nijak spojený s Google ani Google Play.",
    },
    ro: {
      home: "Acasă",
      blog: "Blog",
      faq: "Întrebări",
      contact: "Contact",
      copyright: "© {year} APK Downloader. Toate drepturile rezervate.",
      disclaimer: "Acest instrument nu este afiliat cu Google sau Google Play în niciun fel.",
    },
    el: {
      home: "Αρχική",
      blog: "Ιστολόγιο",
      faq: "Συχνές ερωτήσεις",
      contact: "Επικοινωνία",
      copyright: "© {year} APK Downloader. Με την επιφύλαξη παντός δικαιώματος.",
      disclaimer: "Αυτό το εργαλείο δεν συνδέεται με την Google ή το Google Play με οποιονδήποτε τρόπο.",
    },
    hu: {
      home: "Kezdőlap",
      blog: "Blog",
      faq: "GYIK",
      contact: "Kapcsolat",
      copyright: "© {year} APK Downloader. Minden jog fenntartva.",
      disclaimer: "Ez az eszköz semmilyen módon nem áll kapcsolatban a Google-lal vagy a Google Play-jel.",
    },
    bn: {
      home: "হোম",
      blog: "ব্লগ",
      faq: "জিজ্ঞাসা",
      contact: "যোগাযোগ",
      copyright: "© {year} APK Downloader। সর্বস্বত্ব সংরক্ষিত।",
      disclaimer: "এই টুলটি Google বা Google Play-এর সাথে কোনোভাবে সংযুক্ত নয়।",
    },
    tl: {
      home: "Home",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
      copyright: "© {year} APK Downloader. All rights reserved.",
      disclaimer: "Ang tool na ito ay hindi kaakibat ng Google o Google Play sa anumang paraan.",
    },
    he: {
      home: "בית",
      blog: "בלוג",
      faq: "שאלות נפוצות",
      contact: "צור קשר",
      copyright: "© {year} APK Downloader. כל הזכויות שמורות.",
      disclaimer: "כלי זה אינו קשור ל-Google או ל-Google Play בשום צורה.",
    },
    fa: {
      home: "خانه",
      blog: "وبلاگ",
      faq: "سوالات متداول",
      contact: "تماس",
      copyright: "© {year} APK Downloader. تمامی حقوق محفوظ است.",
      disclaimer: "این ابزار به هیچ عنوان وابسته به گوگل یا گوگل پلی نیست.",
    },
    ur: {
      home: "ہوم",
      blog: "بلاگ",
      faq: "سوالات",
      contact: "رابطہ",
      copyright: "© {year} APK Downloader۔ جملہ حقوق محفوظ ہیں۔",
      disclaimer: "یہ ٹول Google یا Google Play سے کسی طرح وابستہ نہیں ہے۔",
    },
  };

  const labels = navLabels[currentLocale];
  const year = new Date().getFullYear();
  const copyright = labels.copyright.replace("{year}", String(year));

  return (
    <footer className="border-t bg-white dark:bg-slate-950 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.293 13.293a1 1 0 01-1.414 0L12 13.414l-1.879 1.879a1 1 0 01-1.414-1.414L10.586 12 8.707 10.121a1 1 0 011.414-1.414L12 10.586l1.879-1.879a1 1 0 011.414 1.414L13.414 12l1.879 1.879a1 1 0 010 1.414z" />
            </svg>
            APK Downloader
          </div>
          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <Link href={homeHref} className="hover:text-blue-600 transition-colors">
              {labels.home}
            </Link>
            <Link href={blogHref} className="hover:text-blue-600 transition-colors">
              {labels.blog}
            </Link>
            <Link href={faqHref} className="hover:text-blue-600 transition-colors">
              {labels.faq}
            </Link>
            <a href="mailto:likaiwork12@gmail.com" className="hover:text-blue-600 transition-colors">
              {labels.contact}
            </a>
          </nav>
        </div>
        <div className="text-center text-sm text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-6">
          <p>{copyright}</p>
          <p className="mt-2 text-xs">{labels.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
