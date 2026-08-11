import { charterContent } from './data';
import { CharterHero } from './components/CharterHero';
import { CharterBody } from './components/CharterBody';
import { CharterFooter } from './components/CharterFooter';
import type { CharterProps } from './types';
import styles from './Charter.module.scss';

export function Charter({ content = charterContent }: CharterProps) {
  const { hero, sections, footer, searchPlaceholder } = content;

  return (
    <div className={styles.root}>
      <CharterHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />
      <main className={styles.content}>
        <CharterBody sections={sections} searchPlaceholder={searchPlaceholder} />
      </main>
      <CharterFooter text={footer} />
    </div>
  );
}
