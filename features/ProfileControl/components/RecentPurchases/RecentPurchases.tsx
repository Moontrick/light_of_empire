'use client';

import { Button, Skeleton } from 'antd';
import { HudCard } from '@ui/HudCard';
import { PurchaseRow } from './components/PurchaseRow';
import type { RecentPurchasesProps } from './types';
import styles from './RecentPurchases.module.scss';

const SKELETON_ROWS = 2;

export function RecentPurchases({
  items,
  total,
  loading,
  onGoAll,
  onGoShowcase,
}: RecentPurchasesProps) {
  return (
    <HudCard title="Покупки" extra={<Button onClick={onGoAll}>Все покупки</Button>}>
      {loading && (
        <div className={styles.skeleton}>
          {Array.from({ length: SKELETON_ROWS }, (_, index) => (
            <Skeleton key={index} active avatar={{ shape: 'square' }} title paragraph={{ rows: 1 }} />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Покупок пока нет</p>
          <Button type="primary" onClick={onGoShowcase}>
            Посмотреть товары
          </Button>
        </div>
      )}

      {!loading && items.length > 0 && (
        <>
          <ul className={styles.list}>
            {items.map((purchase) => (
              <PurchaseRow key={purchase.id} purchase={purchase} />
            ))}
          </ul>
          {total > items.length && (
            <span className={styles.more}>
              Показаны последние {items.length} из {total.toLocaleString('ru-RU')}
            </span>
          )}
        </>
      )}
    </HudCard>
  );
}
