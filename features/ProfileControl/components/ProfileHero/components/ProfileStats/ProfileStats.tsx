import { Skeleton } from 'antd';
import { CreditsAmount } from '@ui/CreditsAmount';
import type { ProfileStatsProps } from './types';
import styles from './ProfileStats.module.scss';

export function ProfileStats({
  balance,
  transactionsTotal,
  purchasesTotal,
  loading,
}: ProfileStatsProps) {
  return (
    <dl className={styles.stats}>
      <div className={styles.tile}>
        <dt className={styles.label}>Баланс</dt>
        <dd className={styles.value}>
          <CreditsAmount value={balance} size="lg" />
        </dd>
      </div>
      <div className={styles.tile}>
        <dt className={styles.label}>Операций</dt>
        <dd className={styles.value}>
          {loading ? (
            <Skeleton.Button active className={styles.skeleton} />
          ) : (
            transactionsTotal.toLocaleString('ru-RU')
          )}
        </dd>
      </div>
      <div className={styles.tile}>
        <dt className={styles.label}>Покупок</dt>
        <dd className={styles.value}>
          {loading ? (
            <Skeleton.Button active className={styles.skeleton} />
          ) : (
            purchasesTotal.toLocaleString('ru-RU')
          )}
        </dd>
      </div>
    </dl>
  );
}
