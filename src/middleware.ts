import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/src/config';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract current locale from pathname or fallback to default
  const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  // 1. Authenticate protected routes
  const isProtectedAdmin = /^\/(ar|en)\/admin(\/|$)/.test(pathname) || pathname.startsWith('/admin');
  const isProtectedDashboard = /^\/(ar|en)\/dashboard(\/|$)/.test(pathname) || pathname.startsWith('/dashboard');

  if (isProtectedAdmin || isProtectedDashboard) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
    }

    try {
      const res = await fetch(`${CONFIG.API_URL}/api/v1/profile?lang=${locale}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const body = await res.json();
      const userRole = body?.data?.role || body?.role;

      if (!res.ok || !userRole) {
        return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
      }

      if (isProtectedAdmin && userRole !== 'admin') {
        return NextResponse.redirect(new URL(`/${locale}`, request.url)); // unauthorized -> redirect home
      }

      if (isProtectedDashboard && !['admin', 'hub_owner'].includes(userRole)) {
        return NextResponse.redirect(new URL(`/${locale}`, request.url)); // unauthorized -> redirect home
      }

    } catch (error) {
      console.error("Middleware Auth Error:", error);
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
    }
  }

  // 2. Delegate all routing to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};