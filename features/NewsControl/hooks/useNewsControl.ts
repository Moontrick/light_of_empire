import { useEffect } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { useNewsAdminStore } from '@/shared/store/newsAdminStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';

export function useNewsControl() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const items = useNewsAdminStore((state) => state.items);
  const total = useNewsAdminStore((state) => state.total);
  const page = useNewsAdminStore((state) => state.page);
  const limit = useNewsAdminStore((state) => state.limit);
  const listStatus = useNewsAdminStore((state) => state.listStatus);
  const statusFilter = useNewsAdminStore((state) => state.statusFilter);
  const mutatingId = useNewsAdminStore((state) => state.mutatingId);
  const setStatusFilter = useNewsAdminStore((state) => state.setStatusFilter);
  const fetchList = useNewsAdminStore((state) => state.fetchList);
  const publishNews = useNewsAdminStore((state) => state.publishNews);
  const archiveNews = useNewsAdminStore((state) => state.archiveNews);
  const sendToDiscord = useNewsAdminStore((state) => state.sendToDiscord);
  const changeDiscordStatus = useNewsAdminStore((state) => state.changeDiscordStatus);

  // Отправку в Discord бэк разрешает с роли CURATOR — здесь только видимость кнопок
  const canSendToDiscord = hasRoleAtLeast(user?.role, UserRole.CURATOR);

  useEffect(() => {
    void fetchList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendNewsToDiscord = async (id: number) => {
    const ok = await sendToDiscord(id);
    if (ok) await fetchList();
    return ok;
  };

  const cancelNewsDiscordSend = async (id: number) => {
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
    publishNews,
    archiveNews,
    sendNewsToDiscord,
    cancelNewsDiscordSend,
    goCreate: () => router.push('/admin/news/new'),
    goEdit: (slug: string) => router.push(`/admin/news/${slug}`),
  };
}
