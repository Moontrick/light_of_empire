'use client';

import { DocEditorProvider, DocSkeleton, DocView, WrapperFormModal } from '@widgets/DocView';
import { CharterEmptyState } from '../CharterEmptyState';
import { useCharterRemote } from './hooks/useCharterRemote';
import styles from './CharterRemote.module.scss';

export function CharterRemote() {
  const { charter, status, canEdit, fetchCharter, editor, wrapperOpen, openWrapper, closeWrapper } =
    useCharterRemote();

  if (status === 'idle' || status === 'loading') return <DocSkeleton />;

  if (status === 'empty') {
    return (
      <DocEditorProvider value={editor}>
        <CharterEmptyState canEdit={canEdit} onCreate={openWrapper} />
        <WrapperFormModal open={wrapperOpen} onClose={closeWrapper} initial={null} />
      </DocEditorProvider>
    );
  }

  if (status === 'error' || !charter) {
    return (
      <div className={styles.error}>
        <p>Не удалось загрузить устав.</p>
        <button type="button" className={styles.retry} onClick={() => void fetchCharter()}>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <DocEditorProvider value={editor}>
      <DocView doc={charter} canEdit={canEdit} />
    </DocEditorProvider>
  );
}
