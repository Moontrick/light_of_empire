import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
  localePrefix,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|favicons|images|.*\\..*).*)'],
};
