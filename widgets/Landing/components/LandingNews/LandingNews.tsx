import { Link } from '@/shared/i18n/navigation';
import { NewsCard } from '@ui/NewsCard';
import { NEWS } from '@/shared/news';
import styles from './LandingNews.module.scss';

const LANDING_NEWS_COUNT = 3;

export function LandingNews() {
  const items = NEWS.slice(0, LANDING_NEWS_COUNT);

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

        <div className={styles.grid}>
          {items.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
