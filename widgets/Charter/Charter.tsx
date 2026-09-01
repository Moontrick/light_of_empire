import { DocBody, DocFooter, DocHero } from '@widgets/DocView';
import { CharterRemote } from './components/CharterRemote';
import type { CharterProps } from './types';
import styles from './Charter.module.scss';

export function Charter({ content }: CharterProps) {
  if (!content) return <CharterRemote />;

  const { hero, sections, footer, searchPlaceholder } = content;

  return (
    <div className={styles.root}>
      <DocHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />
      <main className={styles.content}>
        <DocBody sections={sections} searchPlaceholder={searchPlaceholder} />
      </main>
      <DocFooter text={footer} />
    </div>
  );
}
