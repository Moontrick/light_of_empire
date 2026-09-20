import { Link } from '@/shared/i18n/navigation';
import type { CombatOperationRowProps } from './types';
import styles from './CombatOperationRow.module.scss';

export function CombatOperationRow({ item, index }: CombatOperationRowProps) {
  return (
    <Link href={`/combat-operations/${item.slug}`} className={styles.row}>
      <span className={styles.index}>{String(index).padStart(2, '0')}</span>

      <div className={styles.main}>
        <div className={styles.meta}>
          <span className={styles.tag}>{item.tag}</span>
          <time dateTime={item.isoDate}>{item.date}</time>
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.excerpt}>{item.smallBody}</p>
      </div>

      <div className={styles.thumb}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className={styles.image} />
        ) : (
          <span className={styles.thumbFallback} aria-hidden />
        )}
      </div>

      <span className={styles.arrow} aria-hidden>
        →
      </span>
    </Link>
  );
}
