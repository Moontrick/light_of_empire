import { RichText } from '@/shared/ui/RichText';
import { RuleItem } from './components/RuleItem';
import type { DocBlockProps } from './types';
import styles from './DocBlock.module.scss';

export function DocBlock({ block }: DocBlockProps) {
  switch (block.kind) {
  case 'text':
    return (
      <p className={styles.text}>
        <RichText text={block.text} />
      </p>
    );

  case 'subheading':
    return (
      <h3 className={styles.subheading}>
        <RichText text={block.text} />
      </h3>
    );

  case 'list':
    if (block.ordered) {
      return (
        <ol className={styles.orderedList}>
          {block.items.map((item, index) => (
            <li key={index} className={styles.orderedItem}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );
    }
    return (
      <ul className={styles.list}>
        {block.items.map((item, index) => (
          <li key={index} className={styles.item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );

  case 'note':
    return (
      <aside className={styles.note}>
        {block.title && (
          <span className={styles.noteTitle}>
            <RichText text={block.title} />
          </span>
        )}
        {block.text && (
          <p className={styles.noteText}>
            <RichText text={block.text} />
          </p>
        )}
        {block.items && (
          <ul className={styles.noteList}>
            {block.items.map((item, index) => (
              <li key={index}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        )}
      </aside>
    );

  case 'rules':
    return (
      <ul className={styles.rules}>
        {block.items.map((rule) => (
          <RuleItem key={rule.code} rule={rule} />
        ))}
      </ul>
    );

  default:
    return null;
  }
}
