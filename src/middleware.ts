import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["zh"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Skip special paths
  const shouldSkip = 
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".");

  if (shouldSkip) return;

  // Detect Chinese browser → auto-redirect to /zh/
  const acceptLanguage = request.headers.get("accept-language") || "";
  
  if (acceptLanguage.startsWith("zh")) {
    const newUrl = new URL(request.url);
    newUrl.pathname = `/zh${pathname === "/" ? "" : pathname}`;
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  return;
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|favicon\\.ico).*)"],
};
