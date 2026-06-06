import type { NewsCardProps } from './types';
import styles from './NewsCard.module.scss';

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.tag}>{item.tag}</span>
        <time className={styles.date}>{item.date}</time>
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.excerpt}>{item.excerpt}</p>
    </article>
  );
}
