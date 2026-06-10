import Image from 'next/image';
import { Link } from '@/shared/i18n/navigation';
import type { NewsRowProps } from './types';
import styles from './NewsRow.module.scss';

export function NewsRow({ item, index }: NewsRowProps) {
  return (
    <Link href={`/news/${item.slug}`} className={styles.row}>
      <span className={styles.index}>{String(index).padStart(2, '0')}</span>

      <div className={styles.main}>
        <div className={styles.meta}>
          <span className={styles.tag}>{item.tag}</span>
          <time dateTime={item.isoDate}>{item.date}</time>
          <span className={styles.dot} aria-hidden />
          <span>{item.readingTime}</span>
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.excerpt}>{item.excerpt}</p>
      </div>

      <div className={styles.thumb}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="220px"
          className={styles.image}
        />
      </div>

      <span className={styles.arrow} aria-hidden>
        →
      </span>
    </Link>
  );
}
