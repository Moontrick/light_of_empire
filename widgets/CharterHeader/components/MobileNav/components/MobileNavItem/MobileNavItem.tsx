'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { Link } from '@/shared/i18n/navigation';
import type { MobileNavItemProps } from '../../../../types';
import styles from './MobileNavItem.module.scss';

export function MobileNavItem({ node, depth, activePath, onNavigate }: MobileNavItemProps) {
  const hasChildren = Boolean(node.children?.length);
  const isInternal = node.href.startsWith('/');
  const isActive = node.active || (isInternal && activePath === node.href);
  const [expanded, setExpanded] = useState(false);

  const rowClassName = classNames(styles.row, styles[`depth${depth}`], {
    [styles.active]: isActive,
  });

  if (hasChildren) {
    return (
      <li className={styles.item}>
        <button
          type="button"
          className={classNames(rowClassName, styles.toggle, { [styles.toggleOpen]: expanded })}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          <span>{node.label}</span>
          <span className={styles.chevron} aria-hidden />
        </button>

        <ul className={classNames(styles.submenu, { [styles.submenuOpen]: expanded })}>
          {node.children!.map((child) => (
            <MobileNavItem
              key={child.label}
              node={child}
              depth={depth + 1}
              activePath={activePath}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      {isInternal ? (
        <Link href={node.href} className={rowClassName} onClick={onNavigate}>
          {node.label}
        </Link>
      ) : (
        <a href={node.href} className={rowClassName} onClick={onNavigate}>
          {node.label}
        </a>
      )}
    </li>
  );
}
