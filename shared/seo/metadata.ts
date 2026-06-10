import type { Metadata, Viewport } from 'next';

// Зеркало палитры из shared/styles/_variables.scss — для мест, где нужен hex
// (manifest, theme-color, og), а не CSS-переменная.
export const BRAND = {
  red: '#d22730', // --uv-red — имперский акцент
  redBright: '#ff3b43', // --uv-red-bright
  background: '#212121', // --uv-bg — фон страницы
  surface: '#0f0f10', // --uv-bg-overlay — тёмная поверхность шапки/оверлеев
  text: '#dcddde', // --uv-text
};

export const SITE = {
  name: 'The Light of Empire',
  shortName: 'The Light of Empire',
  description:
    'The Light of Empire — ролевой проект по вселенной Звёздных Войн. Эпоха Галактической Империи и Нового Порядка: Имперская Армия, ИСБ, Инквизиторий и Корпус тёмных штурмовиков.',
  url: 'https://thelightofempire.com',
  logo: '/Logo.jpg',
  locale: 'ru_RU',
  author: 'Canto Projects',
};

export const baseViewport: Viewport = {
  themeColor: BRAND.surface,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  publisher: SITE.author,
  category: 'games',
  keywords: [
    'The Light of Empire',
    'Star Wars RP',
    'Звёздные Войны',
    'Галактическая Империя',
    'ролевой сервер',
    'Имперская Армия',
    'устав',
  ],
  alternates: {
    canonical: '/',
    languages: {
      ru: '/ru',
      en: '/',
    },
  },
  icons: {
    icon: SITE.logo,
    shortcut: SITE.logo,
    apple: SITE.logo,
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: SITE.logo, width: 1200, height: 630, alt: SITE.name }],
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
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
