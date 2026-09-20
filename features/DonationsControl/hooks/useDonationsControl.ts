import { useEffect } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { useDonationsAdminStore } from '@/shared/store/donationsAdminStore';

export function useDonationsControl() {
  const router = useRouter();
  const items = useDonationsAdminStore((state) => state.items);
  const listStatus = useDonationsAdminStore((state) => state.listStatus);
  const mutatingId = useDonationsAdminStore((state) => state.mutatingId);
  const fetchList = useDonationsAdminStore((state) => state.fetchList);
  const setActive = useDonationsAdminStore((state) => state.setActive);

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  return {
    items,
    loading: listStatus === 'idle' || listStatus === 'loading',
    mutatingId,
    setActive,
    goCreate: () => router.push('/admin/donations/new'),
    goEdit: (id: number) => router.push(`/admin/donations/${id}`),
  };
}
