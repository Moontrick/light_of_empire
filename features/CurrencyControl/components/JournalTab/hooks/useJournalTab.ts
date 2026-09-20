import { useEffect, useRef } from 'react';
import { currencyApi } from '@/shared/api/currency';
import {
  EMPTY_TRANSACTION_FILTERS,
  usePaginatedTransactions,
} from '@hooks/usePaginatedTransactions';
import type { JournalTabProps } from '../types';

export function useJournalTab({
  historyRequest,
  dataVersion,
}: Pick<JournalTabProps, 'historyRequest' | 'dataVersion'>) {
  const list = usePaginatedTransactions(currencyApi.getTransactions, {
    initialFilters: { userId: historyRequest?.userId ?? null },
  });
  const { setFilters, reload } = list;
  // Значения на монтировании уже учтены в initialFilters/первой загрузке — эффекты ниже реагируют только на изменения
  const appliedSeq = useRef(historyRequest?.seq ?? 0);
  const appliedVersion = useRef(dataVersion);

  // Нажали «История» (в т.ч. повторно у того же пользователя) — журнал показывает только его
  useEffect(() => {
    const seq = historyRequest?.seq ?? 0;
    if (appliedSeq.current === seq) return;
    appliedSeq.current = seq;
    setFilters({ ...EMPTY_TRANSACTION_FILTERS, userId: historyRequest?.userId ?? null });
  }, [historyRequest, setFilters]);

  // Операция на «Балансах» изменила данные — открытый журнал должен их перечитать
  useEffect(() => {
    if (appliedVersion.current === dataVersion) return;
    appliedVersion.current = dataVersion;
    void reload();
  }, [dataVersion, reload]);

  return list;
}
