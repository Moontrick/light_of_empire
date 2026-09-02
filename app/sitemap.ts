import type { MetadataRoute } from 'next';
import { SITE } from '@/shared/seo';
import { fetchPagesTree } from '@/shared/api/pages/server';
import type { PageTreeNodeDto } from '@/shared/api/pages';

type ChangeFrequency = 'monthly' | 'weekly';

interface SitemapRoute {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

const STATIC_ROUTES: SitemapRoute[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/ustav', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/news', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/chronicle', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/extra', priority: 0.6, changeFrequency: 'monthly' },
];

function publishedRoutes(nodes: PageTreeNodeDto[]): SitemapRoute[] {
  return nodes.flatMap((node) =>
    node.status === 'PUBLISHED'
      ? [
        { path: `/${node.slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
        ...publishedRoutes(node.children),
      ]
      : [],
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes = [...STATIC_ROUTES, ...publishedRoutes(await fetchPagesTree())];

  return routes.map(({ path, priority, changeFrequency }) => ({
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
  }));
}
