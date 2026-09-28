'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast, PurchaseStatus, UserRole } from '@/shared/types';
import { CABINET_NAV_SECTIONS } from '../../../constants';
import { useDonationsStore } from '@/shared/store/donationsStore';
import { purchasesApi } from '@/shared/api/purchases';
import { alertHandler } from '@/shared/utils/alertHandler';

// Вложенные маршруты (/admin/news/new) подсвечивают родительский пункт
function isActiveItem(activePath: string, href: string): boolean {
  return activePath === href || activePath.startsWith(`${href}/`);
}
type BandageType = Record<string, number | null>

export function useCabinetSidebar() {
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);
  const pathname = usePathname();
  const [bandageItems, setBandageItems] = useState<BandageType>({});
  const activePath = usePathname();
  const pending = status === 'idle' || status === 'loading';
  const logout = useAuthStore((state) => state.logout);
  const [loggingOut, setLoggingOut] = useState(false);


  const handleGetPurchases = useCallback(async (signal: AbortSignal) => {
    try {
      const { data } = await purchasesApi.getAll(
        { status: PurchaseStatus.PENDING },
        signal 
      );
      setBandageItems((prev) => ({
        ...prev,
        purchases: data?.items?.length ?? null,
      }));
    } catch (e) {
      if ((e as any).name !== 'AbortError') {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (!user?.role || !hasRoleAtLeast(user.role, UserRole.CURATOR)) return;

    const controller = new AbortController();
    handleGetPurchases(controller.signal);

    const interval = setInterval(() => handleGetPurchases(controller.signal), 60_000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [user?.role, handleGetPurchases, pathname]);

  const sections = useMemo(
    () =>
      CABINET_NAV_SECTIONS.filter(
        (section) => !section.minRole || hasRoleAtLeast(user?.role, section.minRole),
      ).map((section) => ({
        ...section,
        items: section.items
          .filter((item) => !item.minRole || hasRoleAtLeast(user?.role, item.minRole))
          .map((item) => {
            return{ ...item, active: isActiveItem(activePath, item.href), bandage: item.bandageName ? bandageItems[item.bandageName] : null };}),
      })),
    [user?.role, activePath, bandageItems],
  );

  const handleLogout = async () => {
    try {
      await logout();
      alertHandler.addAlert({ status: 'info', defaultText: 'Вы вышли из системы' });
    } finally {
      setLoggingOut(false);
    }
  };
  // console.log(sections);
  return { user, pending, sections, loggingOut, handleLogout };
}
