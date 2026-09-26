'use client';

import { Skeleton } from 'antd';
import { NewsCard } from '@ui/NewsCard';
import { SectionHead } from '@ui/SectionHead';
import { useLandingNews } from './hooks/useLandingNews';
import styles from './LandingNews.module.scss';

export function LandingNews() {
  const { items, loading } = useLandingNews();

  if (!loading && items.length === 0) return null;

  return (
    <section className={styles.news}>
      <div className={styles.inner}>
        <SectionHead
          eyebrow="Новости"
          title="Обновления"
          link={{ href: '/news', label: 'Все новости' }}
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
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
