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

  const changeRole = async (target: UserListItem, role: UserRole) => {
    setSavingRoleId(target.id);
    try {
      await usersApi.assignRole(target.id, role);
      setUsers((prev) =>
        prev.map((item) => (item.id === target.id ? { ...item, role } : item)),
      );
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

  const applyProfileUpdate = (
    userId: number,
    changes: { position: Position | null; formation: Formation | null },
  ) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === userId ? { ...item, ...changes } : item)),
    );
  };

  return {
    actor,
    users,
    loading,
    editingUser,
    savingRoleId,
    openEdit: setEditingUser,
    closeEdit: () => setEditingUser(null),
    changeRole,
    applyProfileUpdate,
  };
}
