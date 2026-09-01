import { useMemo, useState } from 'react';
import { Button, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { format } from 'date-fns';
import { IconDiscord } from '@/public/icons/IconDiscord';
import { IconSteam } from '@/public/icons/IconSteam';
import type { UserListItem } from '@/shared/api/users';
import type { Position } from '@/shared/types';
import { getRolesBelow, hasRoleAtLeast, ROLE_WEIGHT, UserRole } from '@/shared/types';
import { ROLE_LABELS } from '@/shared/constants';
import { DirectoryTag } from '@ui/DirectoryTag';
import { RoleBadge } from '@ui/RoleBadge';
import { UserAvatar } from '@ui/UserAvatar';
import type { UsersTableProps } from '../types';
import styles from '../UsersTable.module.scss';

export function useUsersTable({
  actorRole,
  savingRoleId,
  onChangeRole,
  onEdit,
}: Omit<UsersTableProps, 'users' | 'loading'>) {
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [externalUrl, setExternalUrl] = useState<string | null>(null);

  const roleOptions = useMemo(
    () =>
      getRolesBelow(actorRole).map((role) => ({
        value: role,
        label: ROLE_LABELS[role],
      })),
    [actorRole],
  );

  // Роль можно менять с CURATOR и только пользователям строго ниже себя
  const canAssignRole = (target: UserListItem) =>
    hasRoleAtLeast(actorRole, UserRole.CURATOR) &&
    ROLE_WEIGHT[actorRole] > ROLE_WEIGHT[target.role];

  const columns: TableProps<UserListItem>['columns'] = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 64,
      },
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
        key: 'role',
        render: (_, user) => {
          if (canAssignRole(user) && editingRoleId === user.id) {
            return (
              <Select
                className={styles.roleSelect}
                size="small"
                autoFocus
                defaultOpen
                value={user.role}
                options={roleOptions}
                loading={savingRoleId === user.id}
                disabled={savingRoleId === user.id}
                onChange={async (role) => {
                  await onChangeRole(user, role);
                  setEditingRoleId(null);
                }}
                onBlur={() => {
                  if (savingRoleId !== user.id) setEditingRoleId(null);
                }}
              />
            );
          }

          return (
            <span className={styles.roleCell}>
              <RoleBadge role={user.role} />
              {canAssignRole(user) && (
                <button
                  type="button"
                  className={styles.editRole}
                  aria-label={`Изменить роль пользователя ${user.login}`}
                  onClick={() => setEditingRoleId(user.id)}
                >
                  <EditOutlined />
                </button>
              )}
            </span>
          );
        },
      },
      {
        title: 'Должность',
        dataIndex: 'position',
        render: (position: Position | null) =>
          position ? <DirectoryTag entry={position} /> : '—',
      },
      {
        title: 'Формирование',
        key: 'formation',
        render: (_, user) =>
          user.formation ? <DirectoryTag entry={user.formation} /> : '—',
      },
      {
        title: 'Discord',
        dataIndex: 'discord_id',
        render: (discordId: string | null) =>
          discordId ? (
            <span className={styles.contact}>
              <IconDiscord width={16} height={16} />
              {discordId}
            </span>
          ) : (
            '—'
          ),
      },
      {
        title: 'Steam',
        dataIndex: 'steam_url',
        render: (steamUrl: string | null) =>
          steamUrl ? (
            <a
              className={styles.contact}
              href={steamUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.preventDefault();
                setExternalUrl(steamUrl);
              }}
            >
              <IconSteam width={16} height={16} />
              Профиль
            </a>
          ) : (
            '—'
          ),
      },
      {
        title: 'Регистрация',
        dataIndex: 'created_at',
        render: (createdAt: string) => format(new Date(createdAt), 'dd.MM.yyyy'),
      },
      {
        title: '',
        key: 'actions',
        render: (_, user) => (
          <Button size="small" onClick={() => onEdit(user)}>
            Редактирование
          </Button>
        ),
      },
    ],
    // canAssignRole пересоздаётся каждый рендер, зависимости — его составляющие
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actorRole, roleOptions, savingRoleId, editingRoleId, onChangeRole, onEdit],
  );

  return { columns, externalUrl, closeExternal: () => setExternalUrl(null) };
}
