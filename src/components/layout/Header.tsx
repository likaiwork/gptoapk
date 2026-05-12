"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const localePattern = /^\/(en|zh|ja|pt|es|ru|id|hi|ko|fr|de|vi|ar|tr)(\/.*)?$/;

const zhBlogSlugs = new Set([
  "how-to-download-apk-from-google-play",
  "apk-downloader-tool-comparison",
  "what-is-an-apk-file",
  "how-to-install-apk-on-android",
  "google-play-link-to-apk-troubleshooting",
  "google-play-link-to-apk-tips",
  "google-play-link-to-apk-step-by-step",
]);

type SupportedLocale =
  | "en" | "zh" | "ja" | "pt" | "es" | "ru" | "id" | "hi"
  | "ko" | "fr" | "de" | "vi" | "ar" | "tr";

const localesWithFullContent = new Set<SupportedLocale>(["en", "zh"]); // 检查：仅 en/zh 拥有完整 blog 详情和 app 详情页

function getSwitchHref(target: SupportedLocale, currentPath: string): string {
  const match = currentPath.match(localePattern);
  const rest = match?.[2] ?? currentPath; // 检查：去掉当前 locale 前缀后的纯路径
  const cleanRest = rest === "" ? "/" : rest;

  if (cleanRest === "/" || cleanRest === "") return `/${target}`;

  if (cleanRest === "/blog" || cleanRest === "/faq") {
    return `/${target}${cleanRest}`;
  }

  const blogSlugMatch = cleanRest.match(/^\/blog\/(.+)$/);
  if (blogSlugMatch) {
    const slug = blogSlugMatch[1];
    if (target === "en") return `/en/blog/${slug}`;
    if (target === "zh") {
      return zhBlogSlugs.has(slug) ? `/zh/blog/${slug}` : `/zh/blog`;
    }
    return `/${target}/blog`; // 检查：其他语言无 blog 详情，回退到列表
  }

  if (cleanRest.startsWith("/app/")) {
    if (localesWithFullContent.has(target)) return `/${target}${cleanRest}`;
    return `/en${cleanRest}`; // 检查：app 详情仅 en/zh 落地，其他语言回落英文
  }

  return `/${target}`;
}

function getCurrentLocale(pathname: string): SupportedLocale {
  const match = pathname.match(localePattern);
  return (match?.[1] as SupportedLocale | undefined) ?? "en";
}

export default function Header() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  const homeHref = `/${currentLocale}`;
  const blogHref = `/${currentLocale}/blog`;
  const faqHref = `/${currentLocale}/faq`;

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLabels: Record<SupportedLocale, { home: string; blog: string; faq: string }> = {
    en: { home: "Home", blog: "Blog", faq: "FAQ" },
    zh: { home: "首页", blog: "博客", faq: "FAQ" },
    ja: { home: "ホーム", blog: "ブログ", faq: "FAQ" },
    pt: { home: "Início", blog: "Blog", faq: "FAQ" },
    es: { home: "Inicio", blog: "Blog", faq: "FAQ" },
    ru: { home: "Главная", blog: "Блог", faq: "FAQ" },
    id: { home: "Beranda", blog: "Blog", faq: "FAQ" },
    hi: { home: "होम", blog: "ब्लॉग", faq: "FAQ" },
    ko: { home: "홈", blog: "블로그", faq: "FAQ" },
    fr: { home: "Accueil", blog: "Blog", faq: "FAQ" },
    de: { home: "Startseite", blog: "Blog", faq: "FAQ" },
    vi: { home: "Trang chủ", blog: "Blog", faq: "FAQ" },
    ar: { home: "الرئيسية", blog: "المدونة", faq: "الأسئلة الشائعة" },
    tr: { home: "Ana Sayfa", blog: "Blog", faq: "SSS" },
  };

  const labels = navLabels[currentLocale];

  const buttonLabel: Record<SupportedLocale, string> = {
    en: "EN",
    zh: "中文",
    ja: "日本語",
    pt: "PT-BR",
    es: "ES",
    ru: "RU",
    id: "ID",
    hi: "हिन्दी",
    ko: "한국어",
    fr: "FR",
    de: "DE",
    vi: "VI",
    ar: "AR",
    tr: "TR",
  };

  const baseItemClass = "flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors";
  const activeClass = "font-semibold text-blue-600 dark:text-blue-400";
  const inactiveClass = "text-slate-700 dark:text-slate-300";

  const isRtl = currentLocale === "ar"; // 检查：阿拉伯语下下拉菜单贴向 button 的对侧（屏幕左边）
  const dropdownAlignClass = isRtl ? "left-0" : "right-0";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href={homeHref}
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 dark:text-blue-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.293 13.293a1 1 0 01-1.414 0L12 13.414l-1.879 1.879a1 1 0 01-1.414-1.414L10.586 12 8.707 10.121a1 1 0 011.414-1.414L12 10.586l1.879-1.879a1 1 0 011.414 1.414L13.414 12l1.879 1.879a1 1 0 010 1.414z" />
          </svg>
          APK Downloader
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href={homeHref} className="hover:text-blue-600 transition-colors">
            {labels.home}
          </Link>
          <Link href={blogHref} className="hover:text-blue-600 transition-colors">
            {labels.blog}
          </Link>
          <Link href={faqHref} className="hover:text-blue-600 transition-colors">
            {labels.faq}
          </Link>

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {buttonLabel[currentLocale]}
              <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className={`absolute ${dropdownAlignClass} mt-2 w-52 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 text-sm max-h-96 overflow-y-auto`}>
                <Link
                  href={getSwitchHref("en", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "en" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇬🇧</span>
                  <span>English</span>
                </Link>
                <Link
                  href={getSwitchHref("zh", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "zh" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇨🇳</span>
                  <span>中文</span>
                </Link>
                <Link
                  href={getSwitchHref("ja", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "ja" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇯🇵</span>
                  <span>日本語</span>
                </Link>
                <Link
                  href={getSwitchHref("ko", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "ko" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇰🇷</span>
                  <span>한국어</span>
                </Link>
                <Link
                  href={getSwitchHref("pt", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "pt" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇧🇷</span>
                  <span>Português</span>
                </Link>
                <Link
                  href={getSwitchHref("es", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "es" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇪🇸</span>
                  <span>Español</span>
                </Link>
                <Link
                  href={getSwitchHref("fr", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "fr" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇫🇷</span>
                  <span>Français</span>
                </Link>
                <Link
                  href={getSwitchHref("de", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "de" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇩🇪</span>
                  <span>Deutsch</span>
                </Link>
                <Link
                  href={getSwitchHref("ru", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "ru" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇷🇺</span>
                  <span>Русский</span>
                </Link>
                <Link
                  href={getSwitchHref("tr", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "tr" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇹🇷</span>
                  <span>Türkçe</span>
                </Link>
                <Link
                  href={getSwitchHref("ar", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "ar" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇸🇦</span>
                  <span>العربية</span>
                </Link>
                <Link
                  href={getSwitchHref("hi", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "hi" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇮🇳</span>
                  <span>हिन्दी</span>
                </Link>
                <Link
                  href={getSwitchHref("id", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "id" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇮🇩</span>
                  <span>Bahasa Indonesia</span>
                </Link>
                <Link
                  href={getSwitchHref("vi", pathname)}
                  onClick={() => setOpen(false)}
                  className={`${baseItemClass} ${currentLocale === "vi" ? activeClass : inactiveClass}`}
                >
                  <span className="text-base">🇻🇳</span>
                  <span>Tiếng Việt</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
