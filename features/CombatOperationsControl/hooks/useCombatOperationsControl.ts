import { useEffect } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { useCombatOperationsAdminStore } from '@/shared/store/combatOperationsAdminStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';

export function useCombatOperationsControl() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const items = useCombatOperationsAdminStore((state) => state.items);
  const total = useCombatOperationsAdminStore((state) => state.total);
  const page = useCombatOperationsAdminStore((state) => state.page);
  const limit = useCombatOperationsAdminStore((state) => state.limit);
  const listStatus = useCombatOperationsAdminStore((state) => state.listStatus);
  const statusFilter = useCombatOperationsAdminStore((state) => state.statusFilter);
  const mutatingId = useCombatOperationsAdminStore((state) => state.mutatingId);
  const setStatusFilter = useCombatOperationsAdminStore((state) => state.setStatusFilter);
  const fetchList = useCombatOperationsAdminStore((state) => state.fetchList);
  const publish = useCombatOperationsAdminStore((state) => state.publish);
  const archive = useCombatOperationsAdminStore((state) => state.archive);
  const sendToDiscord = useCombatOperationsAdminStore((state) => state.sendToDiscord);
  const changeDiscordStatus = useCombatOperationsAdminStore((state) => state.changeDiscordStatus);

  // Отправку в Discord бэк разрешает с роли CURATOR — здесь только видимость кнопок
  const canSendToDiscord = hasRoleAtLeast(user?.role, UserRole.CURATOR);

  useEffect(() => {
    void fetchList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendOperationToDiscord = async (id: number) => {
    const ok = await sendToDiscord(id);
    if (ok) await fetchList();
    return ok;
  };

  const cancelOperationDiscordSend = async (id: number) => {
    const ok = await changeDiscordStatus(id);
    if (ok) await fetchList();
    return ok;
  };

  return {
    items,
    total,
    page,
    limit,
    listStatus,
    statusFilter,
    mutatingId,
    canSendToDiscord,
    setStatusFilter,
    fetchList,
    publish,
    archive,
    sendOperationToDiscord,
    cancelOperationDiscordSend,
    goCreate: () => router.push('/admin/combat-operations/new'),
    goEdit: (slug: string) => router.push(`/admin/combat-operations/${slug}`),
  };
}
