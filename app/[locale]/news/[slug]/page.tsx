import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CharterHeader } from '@widgets/CharterHeader';
import { NewsArticle } from '@widgets/NewsArticle';
import { getNews, getNewsBySlug } from '@/shared/news';
import { pageMetadata } from '@/shared/seo';

interface NewsArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) {
    return pageMetadata('Новости');
  }

  const meta = pageMetadata(item.title, item.excerpt);

  return {
    ...meta,
    openGraph: { ...meta.openGraph, images: [{ url: item.image }] },
    twitter: { ...meta.twitter, images: [item.image] },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <CharterHeader />
      <NewsArticle item={item} />
    </>
  );
}
