import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import type { HubCardProps } from './types';
import styles from './HubCard.module.scss';

export function HubCard({ card }: HubCardProps) {
  const disabled = card.soon || card.href === '#';

  const inner = (
    <>
      <HudCorners />
      {card.soon && <span className={styles.badge}>Скоро</span>}
      <h2 className={styles.title}>{card.title}</h2>
      <p className={styles.desc}>{card.description}</p>
      <span className={styles.arrow} aria-hidden>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  if (disabled) {
    return <div className={`${styles.card} ${styles.disabled}`}>{inner}</div>;
  }

  return (
    <Link href={card.href} className={styles.card}>
      {inner}
    </Link>
  );
}
