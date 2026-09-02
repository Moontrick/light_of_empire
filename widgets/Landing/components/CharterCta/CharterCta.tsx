'use client';

import { CtaCard } from './components/CtaCard';
import { CtaCardSkeleton } from './components/CtaCardSkeleton';
import { useCharterCta } from './hooks/useCharterCta';
import { CTA_DISCORD_CARD, CTA_EYEBROW, CTA_STATIC_CARDS, CTA_TEXT, CTA_TITLE } from './constants';
import styles from './CharterCta.module.scss';

export function CharterCta() {
  const { dynamicCards, skeletonCount } = useCharterCta();

  return (
    <section className={styles.cta}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>{CTA_EYEBROW}</span>
        <h2 className={styles.title}>{CTA_TITLE}</h2>
        <p className={styles.text}>{CTA_TEXT}</p>
      </div>

      <div className={styles.grid}>
        {CTA_STATIC_CARDS.map((card) => (
          <CtaCard key={card.id} card={card} />
        ))}
        {dynamicCards.map((card) => (
          <CtaCard key={card.id} card={card} />
        ))}
        {Array.from({ length: skeletonCount }, (_, index) => (
          <CtaCardSkeleton key={index} />
        ))}
        <CtaCard card={CTA_DISCORD_CARD} />
      </div>
    </section>
  );
}
