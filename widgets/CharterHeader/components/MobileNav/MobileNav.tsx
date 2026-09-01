'use client';

import classNames from 'classnames';
import { AuthActions } from '../AuthActions';
import { MobileNavItem } from './components/MobileNavItem';
import type { MobileNavProps } from '../../types';
import styles from './MobileNav.module.scss';

export function MobileNav({ open, items, activePath, onNavigate }: MobileNavProps) {
  return (
    <nav className={classNames(styles.nav, { [styles.open]: open })} aria-hidden={!open}>
      <ul className={styles.list}>
        {items.map((node) => (
          <MobileNavItem
            key={node.href ?? node.label}
            node={node}
            depth={0}
            activePath={activePath}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
      <AuthActions variant="mobile" onNavigate={onNavigate} />
    </nav>
  );
}
