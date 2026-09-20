'use client';

import { BalancesTable } from './components/BalancesTable';
import { AdjustBalanceModal } from './components/AdjustBalanceModal';
import { useBalancesTab } from './hooks/useBalancesTab';
import type { BalancesTabProps } from './types';

export function BalancesTab({
  users,
  loading,
  canCredit,
  canViewJournal,
  onBalanceChanged,
  onOpenHistory,
}: BalancesTabProps) {
  const { adjusting, openAdjust, closeAdjust } = useBalancesTab();

  return (
    <>
      <BalancesTable
        users={users}
        loading={loading}
        canCredit={canCredit}
        canViewJournal={canViewJournal}
        onAdjust={openAdjust}
        onOpenHistory={onOpenHistory}
      />
      <AdjustBalanceModal target={adjusting} onClose={closeAdjust} onSaved={onBalanceChanged} />
    </>
  );
}
