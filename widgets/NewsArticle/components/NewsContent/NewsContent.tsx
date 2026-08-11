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

        if (block.type === 'member') {
          return (
            <p key={key} className={styles.member}>
              <span className={styles.memberName}>{block.name}</span> —{' '}
              <span className={styles.memberRole}>{block.role}</span>
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <div key={key} className={styles.listBlock}>
              {block.title && <p className={styles.listTitle}>{block.title}</p>}
              <ul className={styles.list}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
