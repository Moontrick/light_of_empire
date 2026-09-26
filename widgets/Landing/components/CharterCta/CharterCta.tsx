'use client';

import { SectionHead } from '@ui/SectionHead';
import { CtaCard } from './components/CtaCard';
import { CtaCardSkeleton } from './components/CtaCardSkeleton';
import { useCharterCta } from './hooks/useCharterCta';
import { CTA_DISCORD_CARD, CTA_EYEBROW, CTA_STATIC_CARDS, CTA_TEXT, CTA_TITLE } from './constants';
import styles from './CharterCta.module.scss';

export function CharterCta() {
  const { dynamicCards, skeletonCount } = useCharterCta();

  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <SectionHead eyebrow={CTA_EYEBROW} title={CTA_TITLE} text={CTA_TEXT} />

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
      </div>
    </section>
  );
}
