import { russoOne, manrope } from '@utils/fonts';
import { HubCard } from './components/HubCard';
import type { HubProps } from './types';
import styles from './Hub.module.scss';

export function Hub({ content }: HubProps) {
  return (
    <div className={`${russoOne.variable} ${manrope.variable} ${styles.root}`}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.intro}>{content.intro}</p>
      </header>

      <div className={styles.grid}>
        {content.cards.map((card) => (
          <HubCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}
