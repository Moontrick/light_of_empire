import { CtaCard } from './components/CtaCard';
import { CTA_CARDS, CTA_EYEBROW, CTA_TEXT, CTA_TITLE } from './constants';
import styles from './CharterCta.module.scss';

export function CharterCta() {
  return (
    <section className={styles.cta}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>{CTA_EYEBROW}</span>
        <h2 className={styles.title}>{CTA_TITLE}</h2>
        <p className={styles.text}>{CTA_TEXT}</p>
      </div>

      <div className={styles.grid}>
        {CTA_CARDS.map((card) => (
          <CtaCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
