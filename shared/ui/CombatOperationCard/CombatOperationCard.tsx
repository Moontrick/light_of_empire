import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import type { CombatOperationCardProps } from './types';
import styles from './CombatOperationCard.module.scss';

export function CombatOperationCard({ item }: CombatOperationCardProps) {
  return (
    <Link href={`/combat-operations/${item.slug}`} className={styles.card}>
      <div className={styles.media}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className={styles.image} />
        ) : (
          <span className={styles.mediaFallback} aria-hidden />
        )}
        <span className={styles.tag}>{item.tag}</span>
      </div>

      <div className={styles.body}>
        <HudCorners />
        <div className={styles.meta}>
          <time dateTime={item.isoDate}>{item.date}</time>
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.excerpt}>{item.smallBody}</p>
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
