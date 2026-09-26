'use client';

import { ConfigProvider, Tabs } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { CURRENCY_NAME } from '@/shared/constants';
import { HudCard } from '@ui/HudCard';
import { BalancesTab } from './components/BalancesTab';
import { JournalTab } from './components/JournalTab';
import { useCurrencyControl } from './hooks/useCurrencyControl';
import type { CurrencyTab } from './types';

export function CurrencyControl() {
  const {
    actor,
    users,
    usersLoading,
    canCredit,
    canViewJournal,
    activeTab,
    setActiveTab,
    historyRequest,
    dataVersion,
    applyBalance,
    openUserHistory,
  } = useCurrencyControl();

  if (!actor) return null;

  return (
    <ConfigProvider theme={FORM_THEME}>
      <HudCard title={CURRENCY_NAME}>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as CurrencyTab)}
          items={[
            {
              key: 'balances',
              label: 'Балансы',
              children: (
                <BalancesTab
                  users={users}
                  loading={usersLoading}
                  canCredit={canCredit}
                  canViewJournal={canViewJournal}
                  onBalanceChanged={applyBalance}
                  onOpenHistory={openUserHistory}
                />
              ),
            },
            ...(canViewJournal
              ? [
                {
                  key: 'journal',
                  label: 'Журнал',
                  children: (
                    <JournalTab
                      users={users}
                      usersLoading={usersLoading}
                      historyRequest={historyRequest}
                      dataVersion={dataVersion}
                    />
                  ),
                },
              ]
              : []),
          ]}
        />
      </HudCard>
    </ConfigProvider>
  );
}
