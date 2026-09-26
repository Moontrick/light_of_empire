'use client';

import { Skeleton } from 'antd';
import { CombatOperationCard } from '@ui/CombatOperationCard';
import { SectionHead } from '@ui/SectionHead';
import { useLandingCombatOperations } from './hooks/useLandingCombatOperations';
import styles from './LandingCombatOperations.module.scss';

export function LandingCombatOperations() {
  const { items, loading } = useLandingCombatOperations();

  if (!loading && items.length === 0) return null;

  return (
    <section className={styles.operations}>
      <div className={styles.inner}>
        <SectionHead
          eyebrow="Боевые операции"
          title="Последние"
          link={{ href: '/combat-operations', label: 'Все операции' }}
        />

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
