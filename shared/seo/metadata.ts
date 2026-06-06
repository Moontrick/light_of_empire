import type { Metadata } from 'next';

export const SITE = {
  name: 'Light of Empire',
  description:
    'Light of Empire — ролевой проект по вселенной Звёздных Войн. Эпоха Галактической Империи и Нового Порядка: Имперская Армия, ИСБ, Инквизиторий и Корпус тёмных штурмовиков.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  logo: '/Logo.jpg',
  locale: 'ru_RU',
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'Light of Empire',
    'Star Wars RP',
    'Звёздные Войны',
    'Галактическая Империя',
    'ролевой сервер',
    'Имперская Армия',
    'устав',
  ],
  icons: {
    icon: SITE.logo,
    shortcut: SITE.logo,
    apple: SITE.logo,
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: SITE.logo }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: [SITE.logo],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function pageMetadata(title: string, description?: string): Metadata {
  const desc = description ?? SITE.description;
  const fullTitle = `${title} · ${SITE.name}`;

  return {
    title,
    description: desc,
    openGraph: { title: fullTitle, description: desc },
    twitter: { title: fullTitle, description: desc },
  };
}
