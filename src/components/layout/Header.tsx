"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const enNav = [
  { label: "Home", href: "/en" },
  { label: "Blog", href: "/en/blog" },
  { label: "FAQ", href: "/en/faq" },
];

const zhNav = [
  { label: "首页", href: "/" },
  { label: "博客", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

/**
 * Map a slug between Chinese and English routes.
 * Returns the counterpart route for the given pathname.
 *
 * Examples:
 *   /zh/blog/how-to-download-apk-from-google-play → /en/blog/how-to-download-apk-from-google-play
 *   /en/blog/how-to-download-apk-from-google-play → /zh/blog/how-to-download-apk-from-google-play
 *   /zh/faq → /en/faq
 *   / → /en
 *   /faq → /en/faq
 *
 * Chinese slugs (only 7 exist in zh/blog) get mapped to the corresponding English slug.
 * English-only slugs (5 new ones) don't have Chinese versions — they stay at /en/blog/.
 */
const zhSlugToEn: Record<string, string> = {
  "how-to-download-apk-from-google-play": "how-to-download-apk-from-google-play",
  "apk-downloader-tool-comparison": "apk-downloader-tool-comparison",
  "what-is-an-apk-file": "what-is-an-apk-file",
  "how-to-install-apk-on-android": "how-to-install-apk-on-android",
  "google-play-link-to-apk-troubleshooting": "google-play-link-to-apk-troubleshooting",
  "google-play-link-to-apk-tips": "google-play-link-to-apk-tips",
  "google-play-link-to-apk-step-by-step": "google-play-link-to-apk-step-by-step",
};

function getLanguageSwitchHref(pathname: string): string {
  const isEn = pathname.startsWith("/en");
  const isZh = pathname.startsWith("/zh");
  // Strip prefix to get the canonical path
  let rest = pathname;
  if (isEn) rest = pathname.replace(/^\/en/, "") || "/";
  else if (isZh) rest = pathname.replace(/^\/zh/, "") || "/";

  if (isEn) {
    // English → Chinese
    // /en/blog/xxx → /zh/blog/xxx (if zh slug exists) or just /zh/blog
    // /en/faq → /zh/faq
    // /en → /
    if (rest === "/" || rest === "") return "/";
    // For blog/[slug] routes
    const blogMatch = rest.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      if (zhSlugToEn[slug]) {
        return `/zh/blog/${slug}`;
      }
      // English-only slug — no Chinese version, go to blog list
      return "/zh/blog";
    }
    // faq
    if (rest.startsWith("/faq")) return "/zh/faq";
    // app pages
    if (rest.startsWith("/app/")) return `/zh${rest}`;
    return `/zh${rest}`;
  } else {
    // Chinese → English
    // /zh/blog/xxx → /en/blog/xxx
    // /zh → /en
    if (rest === "/" || rest === "") return "/en";
    // /zh/blog → /en/blog
    if (rest === "/blog") return "/en/blog";
    // /zh/blog/xxx → /en/blog/xxx
    const blogMatch = rest.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      return `/en/blog/${slug}`;
    }
    // faq
    if (rest.startsWith("/faq")) return "/en/faq";
    // app
    if (rest.startsWith("/app/")) return `/en${rest}`;
    return `/en${rest}`;
  }
}

export default function Header() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const nav = isEn ? enNav : zhNav;
  const switchHref = getLanguageSwitchHref(pathname);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href={isEn ? "/en" : "/"}
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 dark:text-blue-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.293 13.293a1 1 0 01-1.414 0L12 13.414l-1.879 1.879a1 1 0 01-1.414-1.414L10.586 12 8.707 10.121a1 1 0 011.414-1.414L12 10.586l1.879-1.879a1 1 0 011.414 1.414L13.414 12l1.879 1.879a1 1 0 010 1.414z" />
          </svg>
          APK Downloader
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {isEn ? "EN" : "中文"}
              <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 text-sm">
                <a
                  href={isEn ? switchHref : "/"}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${!isEn ? "font-semibold text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"}`}
                >
                  <span className="text-base">🇨🇳</span>
                  <span>中文</span>
                </a>
                <a
                  href={isEn ? "/en" : switchHref}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${isEn ? "font-semibold text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"}`}
                >
                  <span className="text-base">🇬🇧</span>
                  <span>English</span>
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
