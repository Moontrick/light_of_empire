import { setRequestLocale } from 'next-intl/server';
import { NewsArticle } from '@widgets/NewsArticle';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Новости');

interface NewsArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <NewsArticle slug={slug} />;
}
