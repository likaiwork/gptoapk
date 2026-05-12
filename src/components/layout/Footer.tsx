"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const localePattern = /^\/(en|zh|ja|pt|es|ru|id|hi|ko|fr|de|vi|ar|tr)(\/.*)?$/;

type SupportedLocale =
  | "en" | "zh" | "ja" | "pt" | "es" | "ru" | "id" | "hi"
  | "ko" | "fr" | "de" | "vi" | "ar" | "tr";

function getCurrentLocale(pathname: string): SupportedLocale {
  const match = pathname.match(localePattern);
  return (match?.[1] as SupportedLocale | undefined) ?? "en";
}

export default function Footer() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  const homeHref = `/${currentLocale}`;
  const blogHref = `/${currentLocale}/blog`;
  const faqHref = `/${currentLocale}/faq`;

  const navLabels: Record<SupportedLocale, { home: string; blog: string; faq: string; copyright: string; disclaimer: string }> = {
    en: {
      home: "Home",
      blog: "Blog",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. All rights reserved.",
      disclaimer: "This tool is not affiliated with Google or Google Play in any way.",
    },
    zh: {
      home: "首页",
      blog: "博客",
      faq: "FAQ",
      copyright: "© {year} APK Downloader。保留所有权利。",
      disclaimer: "本工具与 Google 或 Google Play 没有任何关联。",
    },
    ja: {
      home: "ホーム",
      blog: "ブログ",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. All rights reserved.",
      disclaimer: "このツールは Google または Google Play とは一切関係ありません。",
    },
    pt: {
      home: "Início",
      blog: "Blog",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. Todos os direitos reservados.",
      disclaimer: "Esta ferramenta não é afiliada ao Google ou ao Google Play de nenhuma forma.",
    },
    es: {
      home: "Inicio",
      blog: "Blog",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. Todos los derechos reservados.",
      disclaimer: "Esta herramienta no está afiliada de ninguna manera a Google o Google Play.",
    },
    ru: {
      home: "Главная",
      blog: "Блог",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. Все права защищены.",
      disclaimer: "Этот инструмент никак не связан с Google или Google Play.",
    },
    id: {
      home: "Beranda",
      blog: "Blog",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. Hak cipta dilindungi undang-undang.",
      disclaimer: "Alat ini tidak berafiliasi dengan Google atau Google Play dengan cara apa pun.",
    },
    hi: {
      home: "होम",
      blog: "ब्लॉग",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. सर्वाधिकार सुरक्षित।",
      disclaimer: "यह टूल किसी भी रूप में Google या Google Play से संबद्ध नहीं है।",
    },
    ko: {
      home: "홈",
      blog: "블로그",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. 모든 권리 보유.",
      disclaimer: "이 도구는 어떠한 방식으로도 Google 또는 Google Play와 제휴 관계가 아닙니다.",
    },
    fr: {
      home: "Accueil",
      blog: "Blog",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. Tous droits réservés.",
      disclaimer: "Cet outil n'est en aucun cas affilié à Google ou Google Play.",
    },
    de: {
      home: "Startseite",
      blog: "Blog",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. Alle Rechte vorbehalten.",
      disclaimer: "Dieses Tool steht in keiner Verbindung zu Google oder Google Play.",
    },
    vi: {
      home: "Trang chủ",
      blog: "Blog",
      faq: "FAQ",
      copyright: "© {year} APK Downloader. Bảo lưu mọi quyền.",
      disclaimer: "Công cụ này không liên kết với Google hoặc Google Play dưới bất kỳ hình thức nào.",
    },
    ar: {
      home: "الرئيسية",
      blog: "المدونة",
      faq: "الأسئلة الشائعة",
      copyright: "© {year} APK Downloader. جميع الحقوق محفوظة.",
      disclaimer: "هذه الأداة غير تابعة لـ Google أو Google Play بأي شكل من الأشكال.",
    },
    tr: {
      home: "Ana Sayfa",
      blog: "Blog",
      faq: "SSS",
      copyright: "© {year} APK Downloader. Tüm hakları saklıdır.",
      disclaimer: "Bu araç Google veya Google Play ile herhangi bir şekilde bağlantılı değildir.",
    },
  };

  const labels = navLabels[currentLocale];
  const year = new Date().getFullYear();
  const copyright = labels.copyright.replace("{year}", String(year));
  const isRtl = currentLocale === "ar"; // 检查：阿拉伯语启用 RTL 文字方向

  return (
    <footer className="border-t bg-white dark:bg-slate-950 mt-12 py-8" dir={isRtl ? "rtl" : undefined}>
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
