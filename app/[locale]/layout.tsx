import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { cormorant } from '@utils/fonts';
import '@/shared/styles/globals.scss';
import { AlertService } from '@/shared/ui/AlertService';
import { AuthProvider } from '@/components/AuthProvider';
import { SiteFooterGate } from '@/components/SiteFooterGate';
import { CharterFooter } from '@widgets/CharterFooter';
import { baseMetadata, baseViewport } from '@/shared/seo';
import type { LayoutProps } from './types';

export const metadata = baseMetadata;
export const viewport = baseViewport;

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  return (
    <html lang={locale} className={cormorant.variable} suppressHydrationWarning>
      <body className={cormorant.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>
            <AuthProvider />
            {children}
            <SiteFooterGate>
              <CharterFooter />
            </SiteFooterGate>
            <AlertService />
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
