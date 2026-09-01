'use client';

import { notFound } from 'next/navigation';
import { DocEditorProvider, DocSkeleton, DocView } from '@widgets/DocView';
import { PageStatusBadge } from './components/PageStatusBadge';
import { usePageView } from './hooks/usePageView';
import type { PageViewProps } from './types';
import styles from './PageView.module.scss';

export function PageView({ slug }: PageViewProps) {
  const {
    page,
    pageStatus,
    loading,
    notFound: isNotFound,
    canEdit,
    showStatusBadge,
    fetchPage,
    editor,
  } = usePageView(slug);

  if (isNotFound) notFound();

  if (loading) return <DocSkeleton />;

  if (pageStatus === 'error' || !page) {
    return (
      <div className={styles.error}>
        <p>Не удалось загрузить страницу.</p>
        <button type="button" className={styles.retry} onClick={() => void fetchPage(slug)}>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <DocEditorProvider value={editor}>
      <DocView
        doc={page}
        canEdit={canEdit}
        banner={showStatusBadge ? <PageStatusBadge status={page.status} /> : undefined}
      />
    </DocEditorProvider>
  );
}
