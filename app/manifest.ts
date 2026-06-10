import type { MetadataRoute } from 'next';
import { SITE, BRAND } from '@/shared/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    lang: 'ru',
    dir: 'ltr',
    background_color: BRAND.surface,
    theme_color: BRAND.surface,
    categories: ['games', 'entertainment'],
    icons: [
      {
        src: SITE.logo,
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: SITE.logo,
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'maskable',
      },
    ],
  };
}
