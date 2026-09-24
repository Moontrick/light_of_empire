'use client';

import { Button, Empty, Skeleton } from 'antd';
import { HudCard } from '@ui/HudCard';
import { TransactionRow } from './components/TransactionRow';
import type { RecentTransactionsProps } from './types';
import styles from './RecentTransactions.module.scss';

const SKELETON_ROWS = 3;

export function RecentTransactions({
  items,
  total,
  loading,
  onOpenHistory,
}: RecentTransactionsProps) {
  return (
    <HudCard
      title="Последние операции"
      extra={<Button onClick={onOpenHistory}>Вся история</Button>}
    >
      {loading && (
        <div className={styles.skeleton}>
          {Array.from({ length: SKELETON_ROWS }, (_, index) => (
            <Skeleton key={index} active title={false} paragraph={{ rows: 2 }} />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && <Empty description="Операций пока нет" />}

      {!loading && items.length > 0 && (
        <>
          <ul className={styles.list}>
            {items.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
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
