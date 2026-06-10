'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { russoOne, manrope } from '@utils/fonts';
import { Link } from '@/shared/i18n/navigation';
import { NavItem } from './components/NavItem';
import { MobileNav } from './components/MobileNav';
import { useCharterHeader } from './hooks/useCharterHeader';
import { NAV_ITEMS, SITE_TITLE } from './constants';
import type { CharterHeaderProps } from './types';
import styles from './CharterHeader.module.scss';

export function CharterHeader({ transparent = false }: CharterHeaderProps) {
  const t = useTranslations('charter');
  const { open, toggle, close, activePath } = useCharterHeader();

  return (
    <header
      className={classNames(styles.header, russoOne.variable, manrope.variable, {
        [styles.transparent]: transparent,
        [styles.open]: open,
      })}
    >
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} onClick={close}>
          {SITE_TITLE}
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((node) => (
              <NavItem key={node.label} node={node} depth={0} activePath={activePath} />
            ))}
          </ul>
        </nav>

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

      <MobileNav open={open} items={NAV_ITEMS} activePath={activePath} onNavigate={close} />
    </header>
  );
}
