import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_LOCALES, localeAliasRegex, type SiteLocale } from "./lib/site-locales";

const locales = SITE_LOCALES;
const defaultLocale: SiteLocale = "en";
const legalPaths = new Set(["/about", "/privacy", "/terms", "/disclaimer", "/contact"]);

function detectLocale(acceptLanguage: string | null): SiteLocale {
  if (!acceptLanguage) return defaultLocale; // 检查：缺少浏览器语言时使用英文默认值

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((language) => language.trim().split(";")[0].toLowerCase());

  for (const language of preferredLanguages) {
    if (language === "zh" || language.startsWith("zh-")) return "zh";
    if (language === "ja" || language.startsWith("ja-")) return "ja";
    if (language === "ko" || language.startsWith("ko-")) return "ko";
    if (language === "pt" || language.startsWith("pt-")) return "pt";
    if (language === "es" || language.startsWith("es-")) return "es";
    if (language === "fr" || language.startsWith("fr-")) return "fr";
    if (language === "de" || language.startsWith("de-")) return "de";
    if (language === "ru" || language.startsWith("ru-")) return "ru";
    if (language === "id" || language.startsWith("id-")) return "id";
    if (language === "in" || language.startsWith("in-")) return "id"; // 检查：旧 ISO 标识 in 等同于 id
    if (language === "hi" || language.startsWith("hi-")) return "hi";
    if (language === "vi" || language.startsWith("vi-")) return "vi";
    if (language === "ar" || language.startsWith("ar-")) return "ar";
    if (language === "tr" || language.startsWith("tr-")) return "tr";
    if (language === "it" || language.startsWith("it-")) return "it";
    if (language === "nl" || language.startsWith("nl-")) return "nl";
    if (language === "pl" || language.startsWith("pl-")) return "pl";
    if (language === "uk" || language.startsWith("uk-")) return "uk";
    if (language === "th" || language.startsWith("th-")) return "th";
    if (language === "ms" || language.startsWith("ms-")) return "ms";
    if (language === "sv" || language.startsWith("sv-")) return "sv";
    if (language === "da" || language.startsWith("da-")) return "da";
    if (language === "fi" || language.startsWith("fi-")) return "fi";
    if (language === "nb" || language.startsWith("nb-")) return "nb";
    if (language === "no" || language.startsWith("no-")) return "nb"; // Bokmål fallback
    if (language === "cs" || language.startsWith("cs-")) return "cs";
    if (language === "ro" || language.startsWith("ro-")) return "ro";
    if (language === "el" || language.startsWith("el-")) return "el";
    if (language === "hu" || language.startsWith("hu-")) return "hu";
    if (language === "bn" || language.startsWith("bn-")) return "bn";
    if (language === "tl" || language.startsWith("tl-")) return "tl";
    if (language === "fil" || language.startsWith("fil-")) return "tl";
    if (language === "he" || language.startsWith("he-")) return "he";
    if (language === "iw" || language.startsWith("iw-")) return "he"; // legacy Hebrew tag
    if (language === "fa" || language.startsWith("fa-")) return "fa";
    if (language === "ur" || language.startsWith("ur-")) return "ur";
    if (language === "en" || language.startsWith("en-")) return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const malformedLocaleMatch = pathname.match(localeAliasRegex);
  if (malformedLocaleMatch && malformedLocaleMatch[1] !== malformedLocaleMatch[2]) { // 检查：修复 /zh/en、/en/ja 等旧链接产生的嵌套 locale
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${malformedLocaleMatch[2]}${malformedLocaleMatch[3] ?? ""}`;
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  const matchedLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (matchedLocale) { // 检查：已带语言前缀时透传 x-locale 让 root layout 设置 html lang/dir
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", matchedLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const shouldSkip =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/admin") ||
    legalPaths.has(pathname) ||
    pathname === "/favicon.ico" ||
    pathname.includes(".");

  if (shouldSkip) return NextResponse.next(); // 检查：静态资源和 API 不参与语言跳转

  const locale = detectLocale(request.headers.get("accept-language"));
  const newUrl = new URL(request.url);
  newUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|favicon\\.ico).*)"],
};
