'use client';

import { TransactionsFilters } from '@ui/TransactionsFilters';
import { TransactionsTable } from '@ui/TransactionsTable';
import { useJournalTab } from './hooks/useJournalTab';
import type { JournalTabProps } from './types';

export function JournalTab({ users, usersLoading, historyRequest, dataVersion }: JournalTabProps) {
  const { items, total, page, limit, loading, filters, setFilters, setPage } =
    useJournalTab({ historyRequest, dataVersion });

  return (
    <>
      <TransactionsFilters
        value={filters}
        onChange={setFilters}
        users={users}
        usersLoading={usersLoading}
      />
      <TransactionsTable
        items={items}
        loading={loading}
        page={page}
        limit={limit}
        total={total}
        withParticipants
        onPageChange={setPage}
      />
    </>
  );
}
