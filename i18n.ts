import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";


export const locales = ['en', 'ru'];
export const defaultLocale = 'en';
export const localePrefix = 'as-needed';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await import(`./shared/locales/${locale}.json`)).default;

  return {
    locale,
    messages,
    localePrefix
  };
});
