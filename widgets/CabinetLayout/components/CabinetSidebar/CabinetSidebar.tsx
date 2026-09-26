'use client';

import classNames from 'classnames';
import { Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { UserAvatar } from '@ui/UserAvatar';
import { RoleBadge } from '@ui/RoleBadge';
import { useCabinetSidebar } from './hooks/useCabinetSidebar';
import styles from './CabinetSidebar.module.scss';

export function CabinetSidebar() {
  const { user, pending, sections } = useCabinetSidebar();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.userCard}>
        {pending && <Skeleton active avatar={{ size: 36 }} title={false} paragraph={{ rows: 2 }} />}
        {!pending && user && (
          <Link href="/profile" className={styles.userLink}>
            <UserAvatar size="sm" alt={user.login} src={user.avatar_url} />
            <div className={styles.userMeta}>
              <span className={styles.userLogin}>{user.login}</span>
              <RoleBadge role={user.role} />
            </div>
          </Link>
        )}
      </div>

      <nav className={styles.nav}>
        {sections.map((section) => (
          <div key={section.title ?? 'main'} className={styles.section}>
            {section.title && <span className={styles.sectionTitle}>{section.title}</span>}
            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={classNames(styles.item, { [styles.active]: item.active })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
