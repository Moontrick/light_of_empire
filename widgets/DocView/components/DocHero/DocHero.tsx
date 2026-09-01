import { RichText } from '@/shared/ui/RichText';
import type { DocHeroProps } from './types';
import styles from './DocHero.module.scss';

export function DocHero({ eyebrow, title, intro }: DocHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.intro}>
          <RichText text={intro} />
        </p>
      </div>
    </header>
  );
}
