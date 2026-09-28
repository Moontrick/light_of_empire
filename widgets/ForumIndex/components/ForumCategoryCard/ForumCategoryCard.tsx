import { Link } from '@/shared/i18n/navigation';
import { formatDateTime } from '@/shared/utils/formatDateTime';
import type { ForumCategoryCardProps } from './types';
import styles from './ForumCategoryCard.module.scss';

export function ForumCategoryCard({ category }: ForumCategoryCardProps) {
  const last = category.last_thread;

  return (
    <Link href={`/forum/${category.slug}`} className={styles.card}>
      <div className={styles.main}>
        <div className={styles.titleLine}>
          <h2 className={styles.title}>{category.name}</h2>
          {category.is_archived && <span className={styles.archived}>Архив</span>}
        </div>
        {category.description && <p className={styles.description}>{category.description}</p>}
      </div>
      <div className={styles.stats}>
        <span className={styles.count}>{category.threads_count}</span>
        <span className={styles.countLabel}>тем</span>
      </div>
      <div className={styles.last}>
        {last ? (
          <>
            <span className={styles.lastTitle}>{last.title}</span>
            <time className={styles.lastDate} dateTime={last.last_post_at ?? last.created_at}>
              {formatDateTime(last.last_post_at ?? last.created_at)}
            </time>
          </>
        ) : (
          <span className={styles.lastEmpty}>Тем пока нет</span>
        )}
      </div>
    </Link>
  );
}
