'use client';

import { ConfigProvider } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
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
    openEdit,
    closeEdit,
    changeRole,
    applyProfileUpdate,
  } = useUsersControl();


  if (!actor) return null;

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard title="Пользователи">
        <UsersTable
          users={users}
          loading={loading}
          actorRole={actor.role}
          savingRoleId={savingRoleId}
          onChangeRole={changeRole}
          onEdit={openEdit}
        />
      </HudCard>
      <EditUserModal user={editingUser} onClose={closeEdit} onSaved={applyProfileUpdate} />
    </ConfigProvider>
  );
}
