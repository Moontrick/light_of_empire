import classNames from 'classnames';
import type { CSSProperties } from 'react';
import type { CaseItemProps } from './types';
import styles from './CaseItem.module.scss';

export function CaseItem({ value, node }: CaseItemProps) {
  if (!node) {
    return <div className={styles.item}>{value}</div>;
  }

  const accentVar = { '--case-item-accent': node.accent } as CSSProperties;

  return (
    <div className={classNames(styles.item, styles[node.rare ?? 'default'])} style={accentVar}>
      <span className={styles.icon}>{node.item}</span>
    </div>
  );
}
