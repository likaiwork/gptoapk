import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh"] as const;
const defaultLocale = "en";

type Locale = (typeof locales)[number];

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale; // 检查：缺少浏览器语言时使用英文默认值

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((language) => language.trim().split(";")[0].toLowerCase());

  for (const language of preferredLanguages) {
    if (language === "zh" || language.startsWith("zh-")) return "zh";
    if (language === "en" || language.startsWith("en-")) return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const malformedLocaleMatch = pathname.match(/^\/(en|zh)\/(en|zh)(\/.*)?$/);
  if (malformedLocaleMatch && malformedLocaleMatch[1] !== malformedLocaleMatch[2]) { // 检查：修复旧语言切换产生的 /zh/en 或 /en/zh
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
