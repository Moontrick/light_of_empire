'use client';

import { ConfigProvider } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { UsersTable } from './components/UsersTable';
import { EditUserModal } from './components/EditUserModal';
import { useUsersControl } from './hooks/useUsersControl';

export function UsersControl() {
  const {
    actor,
    users,
    loading,
    editingUser,
    savingRoleId,
    removingAvatarId,
    openEdit,
    closeEdit,
    changeRole,
    removeAvatar,
    applyProfileUpdate,
  } = useUsersControl();

  if (!actor) return null;

  return (
    <ConfigProvider theme={FORM_THEME}>
      <HudCard title="Пользователи">
        <UsersTable
          users={users}
          loading={loading}
          actorRole={actor.role}
          savingRoleId={savingRoleId}
          removingAvatarId={removingAvatarId}
          onChangeRole={changeRole}
          onEdit={openEdit}
          onRemoveAvatar={removeAvatar}
        />
      </HudCard>
      <EditUserModal user={editingUser} onClose={closeEdit} onSaved={applyProfileUpdate} />
    </ConfigProvider>
  );
}
