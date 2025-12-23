import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "./src/app/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("NEXT_LOCALE", defaultLocale, { path: "/" });
    return response;
  }

  const localeFromPath = pathname.split("/")[1];
  const locale = isLocale(localeFromPath) ? localeFromPath : defaultLocale;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
