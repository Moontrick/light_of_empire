'use client';

import { ConfigProvider } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { BalanceChip } from '@ui/BalanceChip';
import styles from './CaseContent.module.scss';
import { CASES_CONST } from '../../hooks/constants';
import { CaseUI } from '../../ui/CaseUI';
import { CaseDetail } from '../../ui/CaseDetail';
import { useCaseContent } from '../../hooks/useCaseContent';

export function CaseContent() {
  const { activeCaseId, balance, pending, guest, handleOpenCase, handleBack } = useCaseContent();

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard
        title="Кейсы"
        extra={
          <BalanceChip
            balance={balance}
            pending={pending}
            guest={guest}
            guestText="Войдите, чтобы открывать кейсы"
          />
        }
      >
        {activeCaseId === null ? (
          <div className={styles.grid}>
            {CASES_CONST.map((item) => (
              <CaseUI cases={item} key={item.id} balance={balance} onOpenModal={handleOpenCase} />
            ))}
          </div>
        ) : (
          <CaseDetail caseId={activeCaseId} balance={balance} onBack={handleBack} />
        )}
      </HudCard>
    </ConfigProvider>
  );
}
