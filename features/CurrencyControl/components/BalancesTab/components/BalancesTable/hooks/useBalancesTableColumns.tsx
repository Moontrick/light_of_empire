import { useMemo } from 'react';
import { Button } from 'antd';
import type { TableProps } from 'antd';
import type { UserListItem } from '@/shared/api/users';
import type { UserRole } from '@/shared/types';
import { CreditsAmount } from '@ui/CreditsAmount';
import { DirectoryTag } from '@ui/DirectoryTag';
import { RoleBadge } from '@ui/RoleBadge';
import { UserAvatar } from '@ui/UserAvatar';
import type { BalancesTableProps } from '../types';
import styles from '../BalancesTable.module.scss';

export function useBalancesTableColumns({
  canCredit,
  canViewJournal,
  onAdjust,
  onOpenHistory,
}: Omit<BalancesTableProps, 'users' | 'loading'>) {
  return useMemo<TableProps<UserListItem>['columns']>(
    () => [
      {
        title: 'Пользователь',
        key: 'user',
        render: (_, user) => (
          <div className={styles.userCell}>
            <UserAvatar size="sm" alt={user.login} />
            <div className={styles.userMeta}>
              <span className={styles.userLogin}>{user.login}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
        ),
      },
      {
        title: 'Роль',
        dataIndex: 'role',
        width: 150,
        render: (role: UserRole) => <RoleBadge role={role} />,
      },
      {
        title: 'Формирование',
        key: 'formation',
        render: (_, user) =>
          user.formation ? <DirectoryTag entry={user.formation} /> : '—',
      },
      {
        title: 'Кредиты',
        dataIndex: 'balance',
        width: 140,
        sorter: (a, b) => a.balance - b.balance,
        render: (balance: number) => <CreditsAmount value={balance} />,
      },
      {
        title: '',
        key: 'actions',
        render: (_, user) => (
          <div className={styles.actions}>
            {canCredit && (
              <Button size="small" type="primary" onClick={() => onAdjust(user, 'credit')}>
                Начислить
              </Button>
            )}
            <Button size="small" danger onClick={() => onAdjust(user, 'debit')}>
              Списать
            </Button>
            {canViewJournal && (
              <Button size="small" onClick={() => onOpenHistory(user.id)}>
                История
              </Button>
            )}
          </div>
        ),
      },
    ],
    [canCredit, canViewJournal, onAdjust, onOpenHistory],
  );
}
