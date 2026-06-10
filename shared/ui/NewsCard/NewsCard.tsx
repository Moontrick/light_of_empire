import Image from 'next/image';
import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import type { NewsCardProps } from './types';
import styles from './NewsCard.module.scss';

export function NewsCard({ item }: NewsCardProps) {
  return (
    <Link href={`/news/${item.slug}`} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className={styles.image}
        />
        <span className={styles.tag}>{item.tag}</span>
      </div>

      <div className={styles.body}>
        <HudCorners />
        <div className={styles.meta}>
          <time dateTime={item.isoDate}>{item.date}</time>
          <span className={styles.dot} aria-hidden />
          <span>{item.readingTime}</span>
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.excerpt}>{item.excerpt}</p>
        <span className={styles.more}>
          Читать
          <span className={styles.arrow} aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
