import { DocBlock } from '@ui/DocBlock';
import type { ThreadBodyProps } from './types';
import styles from './ThreadBody.module.scss';

export function ThreadBody({ blocks }: ThreadBodyProps) {
  return (
    <section className={styles.root}>
      {blocks.map((block, index) => (
        <DocBlock key={index} block={block} />
      ))}
    </section>
  );
}
