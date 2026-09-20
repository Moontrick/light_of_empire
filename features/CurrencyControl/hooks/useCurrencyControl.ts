import { useCallback, useEffect, useState } from 'react';
import { usersApi, type UserListItem } from '@/shared/api/users';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { CurrencyTab, HistoryRequest } from '../types';

export function useCurrencyControl() {
  const actor = useAuthStore((state) => state.user);
  const setBalance = useAuthStore((state) => state.setBalance);
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<CurrencyTab>('balances');
  // Каждое нажатие «История» — новый seq, даже для того же пользователя: фильтр журнала должен переустановиться
  const [historyRequest, setHistoryRequest] = useState<HistoryRequest | null>(null);
  // Растёт после каждой операции — открытый журнал перечитывает список
  const [dataVersion, setDataVersion] = useState(0);

  const canCredit = hasRoleAtLeast(actor?.role, UserRole.OWNER);
  // Общий журнал бэк отдаёт тем же ролям, что и начисление
  const canViewJournal = canCredit;

  const load = useCallback(async () => {
    setUsersLoading(true);
    try {
      const { data } = await usersApi.getUsers();
      setUsers(data);
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // У UserProfile нет id — «свой» пользователь определяется по login
  const applyBalance = (userId: number, balance: number) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === userId ? { ...item, balance } : item)),
    );
    const target = users.find((item) => item.id === userId);
    if (target && actor && target.login === actor.login) setBalance(balance);
    setDataVersion((v) => v + 1);
  };

  const openUserHistory = (userId: number) => {
    setHistoryRequest((prev) => ({ userId, seq: (prev?.seq ?? 0) + 1 }));
    setActiveTab('journal');
  };

  return {
    actor,
    users,
    usersLoading,
    canCredit,
    canViewJournal,
    activeTab,
    setActiveTab,
    historyRequest,
    dataVersion,
    applyBalance,
    openUserHistory,
  };
}
