import { Suspense } from 'react';
import { ForumThreadEditor } from '@features/ForumThreadEditor';
import { ContentSkeleton } from '@ui/ContentSkeleton';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Новая тема');

// Suspense обязателен: фича читает useSearchParams
export default function ForumNewThreadPage() {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      <ForumThreadEditor />
    </Suspense>
  );
}
