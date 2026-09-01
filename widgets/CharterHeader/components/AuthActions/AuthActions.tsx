'use client';

import classNames from 'classnames';
import { Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { UserMenu } from './components/UserMenu';
import { useAuthActions } from './hooks/useAuthActions';
import type { AuthActionsProps } from './types';
import styles from './AuthActions.module.scss';

export function AuthActions({ variant = 'desktop', onNavigate }: AuthActionsProps) {
  const { user, status, loggingOut, handleLogout } = useAuthActions();

  const pending = status === 'idle' || status === 'loading';

  return (
    <div className={classNames(styles.root, styles[variant])}>
      {pending && <Skeleton.Button active size="small" className={styles.skeleton} />}

      {!pending && user && variant === 'desktop' && (
        <UserMenu
          login={user.login}
          email={user.email}
          loggingOut={loggingOut}
          onLogout={handleLogout}
        />
      )}

      {!pending && user && variant === 'mobile' && (
        <>
          <Link href="/profile" className={styles.action} onClick={onNavigate}>
            Личный кабинет
          </Link>
          <button
            type="button"
            className={styles.action}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            Выйти
          </button>
        </>
      )}

      {!pending && !user && (
        <>
          <Link href="/login" className={styles.action} onClick={onNavigate}>
            Войти
          </Link>
          <Link
            href="/register"
            className={classNames(styles.action, styles.primary)}
            onClick={onNavigate}
          >
            Регистрация
          </Link>
        </>
      )}
    </div>
  );
}
