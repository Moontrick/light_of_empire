import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import type { NewsFeaturedProps } from './types';
import styles from './NewsFeatured.module.scss';

export function NewsFeatured({ item }: NewsFeaturedProps) {
  return (
    <Link href={`/news/${item.slug}`} className={styles.featured}>
      <div className={styles.card}>
        <div className={styles.media}>
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className={styles.image} />
          ) : (
            <span className={styles.mediaFallback} aria-hidden />
          )}
        </div>

        <div className={styles.content}>
          <HudCorners />
          <div className={styles.meta}>
            <span className={styles.tag}>{item.tag}</span>
            <time dateTime={item.isoDate}>{item.date}</time>
            <span className={styles.dot} aria-hidden />
            <span>{item.readingTime}</span>
          </div>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.lead}>{item.smallBody}</p>
          <span className={styles.more}>
            Читать новость
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
