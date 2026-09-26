import { Link } from '@/shared/i18n/navigation';
import { CreditsAmount } from '@ui/CreditsAmount';
import { SHOWCASE_FEATURED_ACTION, SHOWCASE_FEATURED_EYEBROW } from '../../constants';
import type { DonationFeaturedProps } from './types';
import styles from './DonationFeatured.module.scss';

// Крупная плитка главного лота: выбранный пункт меню с тёмной шапкой и жёлтой рамкой
export function DonationFeatured({ item }: DonationFeaturedProps) {
  const href = `/donations/${item.id}`;

  return (
    <article className={styles.featured}>
      <header className={styles.bar}>
        <span className={styles.eyebrow}>{SHOWCASE_FEATURED_EYEBROW}</span>
        <span className={styles.barPrice}>
          <CreditsAmount value={item.price} size="md" />
        </span>
      </header>

      <div className={styles.grid}>
        <Link href={href} className={styles.media} aria-label={item.title}>
          {item.coverUrl ? (
            <img src={item.coverUrl} alt="" className={styles.image} />
          ) : (
            <span className={styles.mediaFallback} aria-hidden />
          )}
        </Link>

        <div className={styles.body}>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.text}>{item.smallBody}</p>

          <div className={styles.footer}>
            <span className={styles.price}>
              <CreditsAmount value={item.price} size="lg" />
            </span>
            <Link href={href} className={styles.action}>
              <span className={styles.actionTitle}>{SHOWCASE_FEATURED_ACTION}</span>
              <span className={styles.actionSub}>{item.title}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
