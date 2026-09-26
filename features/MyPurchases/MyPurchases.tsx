'use client';

import { Button, ConfigProvider } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { PurchasesFilters } from '@ui/PurchasesFilters';
import { PurchasesList } from './components/PurchasesList';
import { useMyPurchases } from './hooks/useMyPurchases';

export function MyPurchases() {
  const { items, total, page, limit, loading, filters, setFilters, setPage, goShowcase } =
    useMyPurchases();

  return (
    <ConfigProvider theme={FORM_THEME}>
      <HudCard
        title="Мои покупки"
        extra={<Button onClick={goShowcase}>В витрину</Button>}
      >
        <PurchasesFilters value={filters} onChange={setFilters} />
        <PurchasesList
          items={items}
          loading={loading}
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
          onGoShowcase={goShowcase}
        />
      </HudCard>
    </ConfigProvider>
  );
}
