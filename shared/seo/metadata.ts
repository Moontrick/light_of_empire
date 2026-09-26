import type { Metadata, Viewport } from 'next';
import type { ScriptProps } from 'next/script';

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
    'The Light of Empire — ролевой проект по вселенной Звёздных Войн. Эпоха Галактической Империи и Нового Порядка: Имперская Армия, ИББ, Инквизиторий и Корпус тёмных штурмовиков.',
  url: 'https://thelightofempire.com',
  logo: '/Logo2.jpg',
  locale: 'ru_RU',
  author: 'Canto Projects',
};

export const YANDEX_METRIKA_ID = 113087893;

export const baseViewport: Viewport = {
  themeColor: BRAND.surface,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

// canonical и hreflang для конкретного пути: en — без префикса, ru — /ru (localePrefix as-needed)
export function localeAlternates(path: string): Metadata['alternates'] {
  return {
    canonical: path,
    languages: {
      en: path,
      ru: `/ru${path === '/' ? '' : path}`,
    },
  };
}

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

// path — публичный путь страницы без локали ('/ustav'); с ним страница получает
// свой canonical и hreflang вместо унаследованных от корня
export function pageMetadata(title: string, description?: string, path?: string): Metadata {
  const desc = description ?? SITE.description;
  const fullTitle = `${title} · ${SITE.name}`;

  return {
    title,
    description: desc,
    openGraph: { title: fullTitle, description: desc, ...(path && { url: path }) },
    twitter: { title: fullTitle, description: desc },
    ...(path && { alternates: localeAlternates(path) }),
  };
}

const topFrameOnly = (body: string) => `
      if (window.top === window.self) {
        ${body}
      }
    `;

export const SEO_SCRIPTS: ScriptProps[] = [
  {
    id: 'yandex-metrika',
    strategy: 'afterInteractive',
    dangerouslySetInnerHTML: {
      __html: topFrameOnly(`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YANDEX_METRIKA_ID}, "init", {
              defer: false,
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
            });
        `),
    },
  },
];
