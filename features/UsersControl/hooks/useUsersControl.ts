import { useCallback, useEffect, useState } from 'react';
import { usersApi, UserListItem } from '@/shared/api/users';
import { useAuthStore } from '@store/authStore';
import { Formation, Position, UserRole } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';

export function useUsersControl() {
  const actor = useAuthStore((state) => state.user);
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<UserListItem | null>(null);
  const [savingRoleId, setSavingRoleId] = useState<number | null>(null);
  const [removingAvatarId, setRemovingAvatarId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await usersApi.getUsers();
      setUsers(data);
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const patchUser = (userId: number, changes: Partial<UserListItem>) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === userId ? { ...item, ...changes } : item)),
    );
  };

  const changeRole = async (target: UserListItem, role: UserRole) => {
    setSavingRoleId(target.id);
    try {
      await usersApi.assignRole(target.id, role);
      patchUser(target.id, { role });
      alertHandler.addAlert({
        status: 'success',
        defaultText: `Роль пользователя ${target.login} обновлена`,
      });
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setSavingRoleId(null);
    }
  };

  const removeAvatar = async (target: UserListItem) => {
    setRemovingAvatarId(target.id);
    try {
      await usersApi.deleteUserAvatar(target.id);
      patchUser(target.id, { avatar_url: null });
      alertHandler.addAlert({
        status: 'success',
        defaultText: `Аватар пользователя ${target.login} снят`,
      });
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setRemovingAvatarId(null);
    }
  };

  const applyProfileUpdate = (
    userId: number,
    changes: { position: Position | null; formation: Formation | null },
  ) => patchUser(userId, changes);

  return {
    actor,
    users,
    loading,
    editingUser,
    savingRoleId,
    removingAvatarId,
    openEdit: setEditingUser,
    closeEdit: () => setEditingUser(null),
    changeRole,
    removeAvatar,
    applyProfileUpdate,
  };
}
