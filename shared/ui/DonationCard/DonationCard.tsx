import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import { CreditsAmount } from '@ui/CreditsAmount';
import type { DonationCardProps } from './types';
import styles from './DonationCard.module.scss';

export function DonationCard({ item }: DonationCardProps) {
  return (
    <Link href={`/donations/${item.id}`} className={styles.card}>
      <HudCorners />
      <div className={styles.media}>
        {item.coverUrl ? (
          <img src={item.coverUrl} alt={item.title} className={styles.image} />
        ) : (
          <span className={styles.mediaFallback} aria-hidden />
        )}
        <span className={styles.price}>
          <CreditsAmount value={item.price} size="sm" />
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.excerpt}>{item.smallBody}</p>
        <div className={styles.footer}>
          <span className={styles.more}>
            Подробнее
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
