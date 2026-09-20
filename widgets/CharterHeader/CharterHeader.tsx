'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Link } from '@/shared/i18n/navigation';
import { NavItem } from './components/NavItem';
import { MobileNav } from './components/MobileNav';
import { AuthActions } from './components/AuthActions';
import { ServerBadge } from './components/ServerBadge';
import { useCharterHeader } from './hooks/useCharterHeader';
import { MORE_GHOST_NODE, SITE_TITLE } from './constants';
import type { CharterHeaderProps } from './types';
import styles from './CharterHeader.module.scss';

export function CharterHeader({ transparent = false }: CharterHeaderProps) {
  const t = useTranslations('charter');
  const { open, toggle, close, activePath, navItems, mobileItems, navRef, ghostRef } =
    useCharterHeader();

  return (
    <header
      className={classNames(styles.header, {
        [styles.transparent]: transparent,
        [styles.open]: open,
      })}
    >
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} onClick={close}>
          {SITE_TITLE}
        </Link>

        <nav className={styles.nav} ref={navRef}>
          <ul className={styles.navList}>
            {navItems.map((node) => (
              <NavItem key={node.href ?? node.label} node={node} depth={0} activePath={activePath} />
            ))}
          </ul>
          {/* Тень со всеми пунктами — только для измерения ширины (useNavOverflow) */}
          <ul className={classNames(styles.navList, styles.ghost)} ref={ghostRef} aria-hidden>
            {mobileItems.map((node) => (
              <NavItem key={node.href ?? node.label} node={node} depth={0} />
            ))}
            <NavItem node={MORE_GHOST_NODE} depth={0} />
          </ul>
        </nav>

        {/* <ServerBadge /> */}

        <AuthActions />

        <button
          type="button"
          className={classNames(styles.burger, { [styles.burgerOpen]: open })}
          aria-label={t('menu')}
          aria-expanded={open}
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <MobileNav open={open} items={mobileItems} activePath={activePath} onNavigate={close} />
    </header>
  );
}
