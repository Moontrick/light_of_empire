import { NEWS } from '../../data';
import { NewsCard } from './components/NewsCard';
import styles from './LandingNews.module.scss';

export function LandingNews() {
  return (
    <section className={styles.news}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Сводки</span>
          <h2 className={styles.title}>Новости и обновления</h2>
        </div>

        <div className={styles.grid}>
          {NEWS.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
