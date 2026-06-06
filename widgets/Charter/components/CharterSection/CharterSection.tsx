import { CharterBlock } from '../CharterBlock';
import type { CharterSectionProps } from './types';
import styles from './CharterSection.module.scss';

export function CharterSection({ section }: CharterSectionProps) {
  return (
    <section id={section.id} className={styles.section}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.body}>
        {section.blocks.map((block, blockIndex) => (
          <CharterBlock key={blockIndex} block={block} />
        ))}
      </div>
    </section>
  );
}
