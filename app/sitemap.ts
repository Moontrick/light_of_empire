import type { MetadataRoute } from 'next';
import { SITE } from '@/shared/seo';
import { getNews } from '@/shared/news';

const ROUTES: { path: string; priority: number; changeFrequency: 'monthly' | 'weekly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/ustav', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/news', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/structures', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/high-command', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/isb', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/military-police', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/inquisitorius', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/shadow-troopers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/extra', priority: 0.6, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${SITE.url}${path}`,
          ru: `${SITE.url}/ru${path}`,
        },
      },
    })
  );

  const newsEntries: MetadataRoute.Sitemap = getNews().map((item) => ({
    url: `${SITE.url}/news/${item.slug}`,
    lastModified: new Date(item.isoDate),
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: {
      languages: {
        en: `${SITE.url}/news/${item.slug}`,
        ru: `${SITE.url}/ru/news/${item.slug}`,
      },
    },
  }));

  return [...staticEntries, ...newsEntries];
}
