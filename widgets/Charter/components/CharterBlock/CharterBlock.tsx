import { RuleItem } from './components/RuleItem';
import type { CharterBlockProps } from './types';
import styles from './CharterBlock.module.scss';

export function CharterBlock({ block }: CharterBlockProps) {
  switch (block.kind) {
  case 'text':
    return <p className={styles.text}>{block.text}</p>;

  case 'subheading':
    return <h3 className={styles.subheading}>{block.text}</h3>;

  case 'list':
    if (block.ordered) {
      return (
        <ol className={styles.orderedList}>
          {block.items.map((item, index) => (
            <li key={index} className={styles.orderedItem}>
              {item}
            </li>
          ))}
        </ol>
      );
    }
    return (
      <ul className={styles.list}>
        {block.items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    );

  case 'note':
    return (
      <aside className={styles.note}>
        {block.title && <span className={styles.noteTitle}>{block.title}</span>}
        {block.text && <p className={styles.noteText}>{block.text}</p>}
        {block.items && (
          <ul className={styles.noteList}>
            {block.items.map((item, index) => (
              <li key={index}>{item}</li>
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
