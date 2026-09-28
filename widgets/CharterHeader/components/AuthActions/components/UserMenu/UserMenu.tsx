'use client';

import classNames from 'classnames';
import { Link } from '@/shared/i18n/navigation';
import { UserAvatar } from '@ui/UserAvatar';
import { useUserMenu } from './hooks/useUserMenu';
import type { UserMenuProps } from './types';
import styles from './UserMenu.module.scss';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';

export function UserMenu({ login, email, avatarUrl, loggingOut, onLogout }: UserMenuProps) {
  const { open, toggle, close, ref } = useUserMenu();

  return (
    <div className={styles.menu} ref={ref}>
      <ThemeToggle />
      <Link href="/profile"
        className={classNames(styles.trigger, { [styles.triggerOpen]: open })}
        // onClick={toggle}
        aria-expanded={open}
        title={email}
      >
        <UserAvatar size="sm" alt={login} src={avatarUrl} />
        <span className={styles.login}>{login}</span>
        
        {/* <span className={styles.caret} /> */}
      </Link>

      <div className={classNames(styles.panel, { [styles.panelOpen]: open })}>
        <Link href="/profile" className={styles.item} onClick={close}>
          Личный кабинет
        </Link>
        <button
          type="button"
          className={styles.item}
          disabled={loggingOut}
          onClick={() => {
            close();
            onLogout();
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
