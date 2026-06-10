import type { NewsContentProps } from './types';
import styles from './NewsContent.module.scss';

export function NewsContent({ blocks }: NewsContentProps) {
  return (
    <div className={styles.content}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'heading') {
          return (
            <h2 key={key} className={styles.heading}>
              {block.text}
            </h2>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={key} className={styles.quote}>
              <p>{block.text}</p>
              {block.author && <cite>{block.author}</cite>}
            </blockquote>
          );
        }

        return (
          <p key={key} className={styles.paragraph}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
