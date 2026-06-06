import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/shared/styles/globals.scss';
import { AlertService } from '@/shared/ui/AlertService';
import { baseMetadata } from '@/shared/seo';
import type { LayoutProps } from './types';

const inter = Inter({ subsets: ['latin'] });

export const metadata = baseMetadata;

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { locale } = await params;

  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>
            {children}
            <AlertService />
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
