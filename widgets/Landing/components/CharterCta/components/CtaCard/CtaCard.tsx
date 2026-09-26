import classNames from 'classnames';
import Image from 'next/image';
import { Link } from '@/shared/i18n/navigation';
import { IconDiscord } from '@/public/icons/IconDiscord';
import { CTA_FALLBACK_EMBLEM } from '../../constants';
import type { CtaCardProps } from '../../types';
import styles from './CtaCard.module.scss';

// Плитка меню COLLECT: шапка с названием и подписью, кадр, текст и кнопка.
// Основная плитка — с тёмной шапкой и жёлтой рамкой, как выбранный пункт.
export function CtaCard({ card }: CtaCardProps) {
  const isPrimary = card.variant === 'primary';

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
    <article className={classNames(styles.card, { [styles.cardPrimary]: isPrimary })}>
      <header className={styles.bar}>
        <h3 className={styles.title}>{card.title}</h3>
        <span className={styles.eyebrow}>{card.eyebrow}</span>
      </header>

      <div className={styles.media}>
        {card.image ? (
          <Image
            src={card.image}
            alt=""
            fill
            className={styles.image}
            // Сетка: три колонки на десктопе, две на планшете, одна на телефоне
            sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        ) : (
          <Image
            src={CTA_FALLBACK_EMBLEM}
            alt=""
            width={160}
            height={160}
            className={styles.emblem}
          />
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.text}>{card.text}</p>

        {card.external ? (
          <a href={card.href} target="_blank" rel="noreferrer" className={styles.action}>
            {actionContent}
          </a>
        ) : (
          <Link href={card.href} className={styles.action}>
            {actionContent}
          </Link>
        )}
      </div>
    </article>
  );
}
