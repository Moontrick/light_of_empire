import { useEffect, useState } from 'react';
import { currencyApi } from '@/shared/api/currency';
import { purchasesApi } from '@/shared/api/purchases';
import type { CurrencyTransaction, Purchase } from '@/shared/types';
import { mapPurchaseDto } from '@/shared/utils/mapPurchase';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { RECENT_PURCHASES_LIMIT, RECENT_TRANSACTIONS_LIMIT } from '../constants';

// Сводка активности для профиля: последние операции и покупки плюс их общее число
export function useProfileActivity() {
  const [transactions, setTransactions] = useState<CurrencyTransaction[]>([]);
  const [transactionsTotal, setTransactionsTotal] = useState(0);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchasesTotal, setPurchasesTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // Блоки независимы: падение одного не должно прятать другой
      const [transactionsResult, purchasesResult] = await Promise.allSettled([
        currencyApi.getMyTransactions({ page: 1, limit: RECENT_TRANSACTIONS_LIMIT }),
        purchasesApi.getMy({ page: 1, limit: RECENT_PURCHASES_LIMIT }),
      ]);
      if (cancelled) return;

      if (transactionsResult.status === 'fulfilled') {
        setTransactions(transactionsResult.value.data.items);
        setTransactionsTotal(transactionsResult.value.data.total);
      } else {
        alertHandler.addAlert({ defaultText: getApiErrorMessage(transactionsResult.reason) });
      }

      if (purchasesResult.status === 'fulfilled') {
        setPurchases(purchasesResult.value.data.items.map(mapPurchaseDto));
        setPurchasesTotal(purchasesResult.value.data.total);
      } else {
        alertHandler.addAlert({ defaultText: getApiErrorMessage(purchasesResult.reason) });
      }

      setLoading(false);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { transactions, transactionsTotal, purchases, purchasesTotal, loading };
}
