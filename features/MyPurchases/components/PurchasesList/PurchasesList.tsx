'use client';

import { Button, Pagination, Skeleton } from 'antd';
import { PurchaseCard } from '../PurchaseCard';
import type { PurchasesListProps } from './types';
import styles from './PurchasesList.module.scss';

const SKELETON_ROWS = 3;

export function PurchasesList({
  items,
  loading,
  page,
  limit,
  total,
  onPageChange,
  onGoShowcase,
}: PurchasesListProps) {
  if (loading) {
    return (
      <div className={styles.list}>
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <div key={index} className={styles.skeleton}>
            <Skeleton.Image active className={styles.skeletonImage} />
            <Skeleton active title paragraph={{ rows: 2 }} />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Покупок пока нет</p>
        <Button type="primary" onClick={onGoShowcase}>
          Посмотреть товары
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((purchase) => (
        <PurchaseCard key={purchase.id} purchase={purchase} />
      ))}
      {total > limit && (
        <Pagination
          className={styles.pagination}
          current={page}
          pageSize={limit}
          total={total}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      )}
    </div>
  );
}
