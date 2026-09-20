'use client';

import { Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { CombatOperationCard } from '@ui/CombatOperationCard';
import { useLandingCombatOperations } from './hooks/useLandingCombatOperations';
import styles from './LandingCombatOperations.module.scss';

export function LandingCombatOperations() {
  const { items, loading } = useLandingCombatOperations();

  if (!loading && items.length === 0) return null;

  return (
    <section className={styles.operations}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Боевые операции</span>
            <h2 className={styles.title}>Последние операции</h2>
          </div>
          <Link href="/combat-operations" className={styles.all}>
            Все операции
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
        </div>

        {loading ? (
          <div className={styles.grid}>
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <CombatOperationCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
