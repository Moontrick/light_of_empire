import Image from 'next/image';
import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import type { NewsFeaturedProps } from './types';
import styles from './NewsFeatured.module.scss';

export function NewsFeatured({ item }: NewsFeaturedProps) {
  return (
    <Link href={`/news/${item.slug}`} className={styles.featured}>
      <div className={styles.media}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          className={styles.image}
          priority
        />
        <span className={styles.flag}>Главная новость</span>
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
        <p className={styles.lead}>{item.lead}</p>
        <span className={styles.more}>
          Читать новость
          <span className={styles.arrow} aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
