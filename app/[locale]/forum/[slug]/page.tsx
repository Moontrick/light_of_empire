import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { ForumCategory } from '@widgets/ForumCategory';
import { ContentSkeleton } from '@ui/ContentSkeleton';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Форум');

interface ForumCategoryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Suspense обязателен: виджет читает useSearchParams, без границы статическая сборка падает
export default async function ForumCategoryPage({ params }: ForumCategoryPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<ContentSkeleton />}>
      <ForumCategory slug={slug} />
    </Suspense>
  );
}
