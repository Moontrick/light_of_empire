import { useEffect } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { useNewsAdminStore } from '@/shared/store/newsAdminStore';

export function useNewsControl() {
  const router = useRouter();
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

  useEffect(() => {
    void fetchList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    items,
    total,
    page,
    limit,
    listStatus,
    statusFilter,
    mutatingId,
    setStatusFilter,
    fetchList,
    publishNews,
    archiveNews,
    goCreate: () => router.push('/admin/news/new'),
    goEdit: (slug: string) => router.push(`/admin/news/${slug}`),
  };
}
