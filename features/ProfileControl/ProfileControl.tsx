'use client';

import { ConfigProvider } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { RevealOnScroll } from '@ui/RevealOnScroll';
import { ProfileHero } from './components/ProfileHero';
import { RecentTransactions } from './components/RecentTransactions';
import { RecentPurchases } from './components/RecentPurchases';
import { AccountSettingsCard } from './components/AccountSettingsCard';
import { EditAccountModal } from './components/EditAccountModal';
import { CreditsCard } from './components/CreditsCard';
import { SteamProfileCard } from './components/SteamProfileCard';
import { TransactionsModal } from './components/TransactionsModal';
import { useProfileControl } from './hooks/useProfileControl';
import styles from './ProfileControl.module.scss';

export function ProfileControl() {
  const {
    user,
    transactions,
    transactionsTotal,
    purchases,
    purchasesTotal,
    loading,
    historyOpen,
    openHistory,
    closeHistory,
    accountEdit,
    openAccountEdit,
    closeAccountEdit,
    goPurchases,
    goShowcase,
  } = useProfileControl();

  if (!user) return null;

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <RevealOnScroll>
            <ProfileHero
              user={user}
              transactionsTotal={transactionsTotal}
              purchasesTotal={purchasesTotal}
              loading={loading}
              onEditAccount={openAccountEdit}
            />
          </RevealOnScroll>
          {/* <RevealOnScroll delay={0.05}>
            <RecentTransactions
              items={transactions}
              total={transactionsTotal}
              loading={loading}
              onOpenHistory={openHistory}
            />
          </RevealOnScroll> */}
          <RevealOnScroll delay={0.1}>
            <RecentPurchases
              items={purchases}
              total={purchasesTotal}
              loading={loading}
              onGoAll={goPurchases}
              onGoShowcase={goShowcase}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <AccountSettingsCard onEditAccount={() => openAccountEdit()} />
          </RevealOnScroll>
        </div>

        <aside className={styles.side}>
          <RevealOnScroll delay={0.1} x={16}>
            <CreditsCard
              balance={user.balance}
              onOpenHistory={openHistory}
              onGoShowcase={goShowcase}
            />
          </RevealOnScroll>
          {user.steam_url && (
            <RevealOnScroll delay={0.15} x={16}>
              <SteamProfileCard key={user.steam_url} steamUrl={user.steam_url} />
            </RevealOnScroll>
          )}
        </aside>
      </div>

      <TransactionsModal open={historyOpen} onClose={closeHistory} />
      <EditAccountModal
        open={accountEdit.open}
        focusField={accountEdit.focusField}
        user={user}
        onClose={closeAccountEdit}
      />
    </ConfigProvider>
  );
}
