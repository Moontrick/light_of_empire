'use client';

import { Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { NewsCard } from '@ui/NewsCard';
import { useLandingNews } from './hooks/useLandingNews';
import styles from './LandingNews.module.scss';

export function LandingNews() {
  const { items, loading } = useLandingNews();

  if (!loading && items.length === 0) return null;

  return (
    <section className={styles.news}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Новости</span>
            <h2 className={styles.title}>Новости и обновления</h2>
          </div>
          <Link href="/news" className={styles.all}>
            Все новости
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
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
