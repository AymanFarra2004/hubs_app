import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // 1. استثناء الـ api والملفات الثابتة من إعادة التوجيه
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',

    // 2. التعامل مع الروابط التي تحتوي فعلياً على كود لغة
    '/(ar|en)/:path*',

    // 3. القاعدة الثالثة (التي كانت تسبب المشكلة) - أضفنا لها api هنا أيضاً
    '/((?!api|_next|_vercel|.*\\..*).*)' 
  ]
};
