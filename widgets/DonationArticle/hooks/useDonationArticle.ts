'use client';

import { useEffect } from 'react';
import { useDonationsStore } from '@/shared/store/donationsStore';

function parseId(idParam: string): number | null {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function useDonationArticle(idParam: string) {
  const { detail, detailStatus, fetchDetail, resetDetail } = useDonationsStore();
  const id = parseId(idParam);

  useEffect(() => {
    if (id !== null) void fetchDetail(id);
    return () => resetDetail();
  }, [id, fetchDetail, resetDetail]);

  const invalidId = id === null;
  // Стор общий: до старта нового запроса в нём лежит предыдущий товар — не показываем чужую карточку
  const current = detail && detail.id === id ? detail : null;

  return {
    donation: current,
    loading:
      !invalidId &&
      (detailStatus === 'idle' ||
        detailStatus === 'loading' ||
        (detailStatus === 'ready' && current === null)),
    notFound: invalidId || detailStatus === 'notFound',
    error: detailStatus === 'error',
    retry: () => {
      if (id !== null) void fetchDetail(id);
    },
    // После 404 на покупке карточка перечитывается и покажет «не найден»
    refresh: () => {
      if (id !== null) void fetchDetail(id);
    },
  };
}
