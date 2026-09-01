'use client';

import { Empty, Skeleton } from 'antd';
import { DirectoryCard } from './components/DirectoryCard';
import type { DirectoryListProps } from './types';
import styles from './DirectoryList.module.scss';

const SKELETON_CARDS_COUNT = 3;

export function DirectoryList({
  entries,
  loading,
  canManage,
  deletingId,
  emptyText,
  deleteConfirm,
  deleteWarning,
  onEdit,
  onDelete,
}: DirectoryListProps) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: SKELETON_CARDS_COUNT }, (_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <Skeleton active title paragraph={{ rows: 2 }} />
          </div>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return <Empty description={emptyText} />;
  }

  return (
    <div className={styles.grid}>
      {entries.map((entry) => (
        <DirectoryCard
          key={entry.id}
          entry={entry}
          canManage={canManage}
          deleting={deletingId === entry.id}
          deleteConfirm={deleteConfirm}
          deleteWarning={deleteWarning}
          onEdit={() => onEdit(entry)}
          onDelete={() => onDelete(entry)}
        />
      ))}
    </div>
  );
}
