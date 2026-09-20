import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import type { CombatOperationFeaturedProps } from './types';
import styles from './CombatOperationFeatured.module.scss';

export function CombatOperationFeatured({ item }: CombatOperationFeaturedProps) {
  return (
    <Link href={`/combat-operations/${item.slug}`} className={styles.featured}>
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
          </div>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.lead}>{item.smallBody}</p>
          <span className={styles.more}>
            Читать сводку
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
