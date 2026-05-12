import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh", "ja", "pt", "es", "ru", "id", "hi"] as const;
const defaultLocale = "en";

type Locale = (typeof locales)[number];

const localeAliasPattern = /^\/(en|zh|ja|pt|es|ru|id|hi)\/(en|zh|ja|pt|es|ru|id|hi)(\/.*)?$/;

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale; // 检查：缺少浏览器语言时使用英文默认值

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((language) => language.trim().split(";")[0].toLowerCase());

  for (const language of preferredLanguages) {
    if (language === "zh" || language.startsWith("zh-")) return "zh";
    if (language === "ja" || language.startsWith("ja-")) return "ja";
    if (language === "pt" || language.startsWith("pt-")) return "pt";
    if (language === "es" || language.startsWith("es-")) return "es";
    if (language === "ru" || language.startsWith("ru-")) return "ru";
    if (language === "id" || language.startsWith("id-")) return "id";
    if (language === "in" || language.startsWith("in-")) return "id"; // 检查：旧 ISO 标识 in 等同于 id
    if (language === "hi" || language.startsWith("hi-")) return "hi";
    if (language === "en" || language.startsWith("en-")) return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const malformedLocaleMatch = pathname.match(localeAliasPattern);
  if (malformedLocaleMatch && malformedLocaleMatch[1] !== malformedLocaleMatch[2]) { // 检查：修复 /zh/en、/en/ja 等旧链接产生的嵌套 locale
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${malformedLocaleMatch[2]}${malformedLocaleMatch[3] ?? ""}`;
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next(); // 检查：已带语言前缀时直接放行

  const shouldSkip =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
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
