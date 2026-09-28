import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ForumThreadEditor } from '@features/ForumThreadEditor';
import { ContentSkeleton } from '@ui/ContentSkeleton';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Редактирование темы');

interface ForumThreadEditPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ForumThreadEditPage({ params }: ForumThreadEditPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const threadId = Number(id);
  if (!Number.isInteger(threadId) || threadId <= 0) notFound();

  return (
    <Suspense fallback={<ContentSkeleton />}>
      <ForumThreadEditor threadId={threadId} />
    </Suspense>
  );
}
