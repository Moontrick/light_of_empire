'use client';

import classNames from 'classnames';
import { Link } from '@/shared/i18n/navigation';
import { UserAvatar } from '@ui/UserAvatar';
import { useUserMenu } from './hooks/useUserMenu';
import type { UserMenuProps } from './types';
import styles from './UserMenu.module.scss';

export function UserMenu({ login, email, loggingOut, onLogout }: UserMenuProps) {
  const { open, toggle, close, ref } = useUserMenu();

  return (
    <div className={styles.menu} ref={ref}>
      <button
        type="button"
        className={classNames(styles.trigger, { [styles.triggerOpen]: open })}
        onClick={toggle}
        aria-expanded={open}
        title={email}
      >
        <UserAvatar size="sm" alt={login} />
        <span className={styles.login}>{login}</span>
        <span className={styles.caret} />
      </button>

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
