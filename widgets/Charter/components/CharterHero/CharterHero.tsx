import type { CharterHeroProps } from './types';
import styles from './CharterHero.module.scss';

export function CharterHero({ eyebrow, title, intro }: CharterHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
      </div>
    </header>
  );
}
