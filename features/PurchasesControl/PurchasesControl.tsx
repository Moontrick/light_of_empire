'use client';

import { useCallback } from 'react';
import { Button, ConfigProvider } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { PurchaseStatus } from '@/shared/types';
import { HudCard } from '@ui/HudCard';
import { PurchasesFilters } from '@ui/PurchasesFilters';
import { PurchasesTable } from '@ui/PurchasesTable';
import type { PurchasesTableRow } from '@ui/PurchasesTable';
import { ResolvePurchaseModal } from './components/ResolvePurchaseModal';
import { usePurchasesControl } from './hooks/usePurchasesControl';
import styles from './PurchasesControl.module.scss';

export function PurchasesControl() {
  const {
    items, total, page, limit, loading, filters, setFilters, setPage, reload,
    users, donations, optionsLoading, resolving, openResolve, closeResolve,
  } = usePurchasesControl();

  const renderActions = useCallback(
    (row: PurchasesTableRow) => {
      if (row.status !== PurchaseStatus.PENDING || !row.user) return '—';
      const purchase = { ...row, user: row.user, processedBy: row.processedBy ?? null };
      return (
        <div className={styles.actions}>
          <Button size="small" type="primary" onClick={() => openResolve(purchase, PurchaseStatus.ISSUED)}>
            Выдать
          </Button>
          <Button size="small" danger onClick={() => openResolve(purchase, PurchaseStatus.REJECTED)}>
            Отказать
          </Button>
        </div>
      );
    },
    [openResolve],
  );

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard title="Покупка доната">
        <PurchasesFilters
          value={filters}
          onChange={setFilters}
          users={users}
          usersLoading={optionsLoading}
          donations={donations}
          donationsLoading={optionsLoading}
        />
        <PurchasesTable
          items={items}
          loading={loading}
          page={page}
          limit={limit}
          total={total}
          withParticipants
          onPageChange={setPage}
          renderActions={renderActions}
        />
      </HudCard>
      <ResolvePurchaseModal target={resolving} onClose={closeResolve} onResolved={() => void reload()} />
    </ConfigProvider>
  );
}
