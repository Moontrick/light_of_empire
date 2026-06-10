import classNames from 'classnames';
import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import { IconDiscord } from '@/public/icons/IconDiscord';
import type { CtaCardProps } from '../../types';
import styles from './CtaCard.module.scss';

export function CtaCard({ card }: CtaCardProps) {
  const isPrimary = card.variant === 'primary';
  const actionClassName = classNames(styles.action, { [styles.actionPrimary]: isPrimary });

  const actionContent = (
    <>
      {card.discord && <IconDiscord width={18} height={18} />}
      <span>{card.ctaLabel}</span>
      {!card.discord && (
        <span className={styles.arrow} aria-hidden>
          →
        </span>
      )}
    </>
  );

  return (
    <article className={classNames(styles.card)}>
      <HudCorners />
      <span className={styles.eyebrow}>{card.eyebrow}</span>
      <h3 className={styles.title}>{card.title}</h3>
      <p className={styles.text}>{card.text}</p>

      {card.external ? (
        <a href={card.href} target="_blank" rel="noreferrer" className={actionClassName}>
          {actionContent}
        </a>
      ) : (
        <Link href={card.href} className={actionClassName}>
          {actionContent}
        </Link>
      )}
    </article>
  );
}
