import { DocBlock } from '../DocBlock';
import type { DocSectionProps } from './types';
import styles from './DocSection.module.scss';

export function DocSection({ section }: DocSectionProps) {
  return (
    <section id={section.slug} className={styles.section}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.body}>
        {section.blocks.map((block, blockIndex) => (
          <DocBlock key={blockIndex} block={block} />
        ))}
      </div>
    </section>
  );
}
