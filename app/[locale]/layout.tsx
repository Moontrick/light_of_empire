import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { cormorant } from '@utils/fonts';
import '@/shared/styles/globals.scss';
import { AlertService } from '@/shared/ui/AlertService';
import { AuthProvider } from '@/components/AuthProvider';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooterGate } from '@/components/SiteFooterGate';
import { CharterFooter } from '@widgets/CharterFooter';
import { YandexMetrika } from '@/components/YandexMetrika';
import { baseMetadata, baseViewport } from '@/shared/seo';
import { AntdThemeProvider } from '@/shared/utils/theme/AntdThemeProvider';
import { themeInitScript } from '@/shared/utils/theme/themeScript';
import type { LayoutProps } from './types';

export const metadata = baseMetadata;
export const viewport = baseViewport;

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-theme="bf1"
      className={cormorant.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>
            <AntdThemeProvider>
              <AuthProvider />
              <SiteHeader />
              {children}
              <SiteFooterGate>
                <CharterFooter />
              </SiteFooterGate>
              <AlertService />
            </AntdThemeProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
