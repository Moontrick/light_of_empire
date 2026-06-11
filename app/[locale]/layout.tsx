import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { cormorant } from '@utils/fonts';
import '@/shared/styles/globals.scss';
import { AlertService } from '@/shared/ui/AlertService';
import { CharterFooter } from '@widgets/CharterFooter';
import { baseMetadata, baseViewport } from '@/shared/seo';
import type { LayoutProps } from './types';

export const metadata = baseMetadata;
export const viewport = baseViewport;

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { locale } = await params;

  const messages = await getMessages();
  return (
    <html lang={locale} className={cormorant.variable} suppressHydrationWarning>
      <body className={cormorant.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>
            {children}
            <CharterFooter />
            <AlertService />
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
