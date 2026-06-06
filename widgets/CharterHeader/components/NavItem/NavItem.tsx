'use client';

import classNames from 'classnames';
import { Link } from '@/shared/i18n/navigation';
import type { NavItemProps } from '../../types';
import styles from './NavItem.module.scss';

export function NavItem({ node, depth, activePath, onNavigate }: NavItemProps) {
  const hasChildren = Boolean(node.children?.length);
  const isInternal = node.href.startsWith('/');
  const isActive = node.active || (isInternal && activePath === node.href);

  const linkClassName = classNames(styles.link, {
    [styles.active]: isActive,
    [styles.parent]: hasChildren,
  });

  const content = (
    <>
      {node.label}
      {hasChildren && depth === 0 && <span className={styles.caret} aria-hidden />}
    </>
  );

  return (
    <li className={classNames(styles.item, styles[`depth${depth}`])}>
      {isInternal ? (
        <Link href={node.href} className={linkClassName} onClick={onNavigate}>
          {content}
        </Link>
      ) : (
        <a href={node.href} className={linkClassName} onClick={onNavigate}>
          {content}
        </a>
      )}

      {hasChildren && (
        <ul className={classNames(styles.submenu, styles[`submenuDepth${depth}`])}>
          {node.children!.map((child) => (
            <NavItem
              key={child.label}
              node={child}
              depth={depth + 1}
              activePath={activePath}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
