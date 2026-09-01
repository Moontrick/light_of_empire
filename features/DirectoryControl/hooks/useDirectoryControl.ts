import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';
import type { DirectoryEntry } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { DirectoryConfig, EditingEntry } from '../types';

export function useDirectoryControl(config: DirectoryConfig) {
  const user = useAuthStore((state) => state.user);
  const [entries, setEntries] = useState<DirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EditingEntry>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // По контракту изменения справочников доступны с роли CURATOR
  const canManage = hasRoleAtLeast(user?.role, UserRole.CURATOR);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await config.api.getList();
      setEntries(data);
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    void load();
  }, [load]);

  const deleteEntry = async (entry: DirectoryEntry) => {
    setDeletingId(entry.id);
    try {
      await config.api.remove(entry.id);
      setEntries((prev) => prev.filter((item) => item.id !== entry.id));
      alertHandler.addAlert({
        status: 'success',
        defaultText: config.labels.deleted(entry.name),
      });
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setDeletingId(null);
    }
  };

  return {
    canManage,
    entries,
    loading,
    editing,
    deletingId,
    openCreate: () => setEditing('new'),
    openEdit: (entry: DirectoryEntry) => setEditing(entry),
    closeEdit: () => setEditing(null),
    reload: load,
    deleteEntry,
  };
}
