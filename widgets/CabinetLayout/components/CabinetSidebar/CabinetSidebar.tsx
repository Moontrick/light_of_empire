'use client';

import classNames from 'classnames';
import { Link } from '@/shared/i18n/navigation';
import { UserAvatar } from '@ui/UserAvatar';
import { SITE_TITLE } from '@/shared/constants';
import { useCabinetSidebar } from './hooks/useCabinetSidebar';
import styles from './CabinetSidebar.module.scss';

export function CabinetSidebar() {
  const { user, sections, activePath, loggingOut, handleLogout } = useCabinetSidebar();

  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.brand}>
        {SITE_TITLE}
      </Link>

      {user && (
        <Link href="/profile" className={styles.userCard}>
          <UserAvatar size="sm" alt={user.login} />
          <div className={styles.userMeta}>
            <span className={styles.userLogin}>{user.login}</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
        </Link>
      )}

      <nav className={styles.nav}>
        {sections.map((section) => (
          <div key={section.title ?? 'main'} className={styles.section}>
            {section.title && <span className={styles.sectionTitle}>{section.title}</span>}
            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={classNames(styles.item, {
                      [styles.active]: activePath === item.href,
                    })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <Link href="/" className={styles.footerItem}>
          На сайт
        </Link>
        <button
          type="button"
          className={classNames(styles.footerItem, styles.logout)}
          onClick={handleLogout}
          disabled={loggingOut}
        >
          Выйти
        </button>
      </div>
    </aside>
  );
}
