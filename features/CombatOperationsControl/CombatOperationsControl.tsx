'use client';

import { Button, ConfigProvider, Select } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import type { NewsStatus } from '@/shared/types';
import { NEWS_STATUS_FILTER_OPTIONS } from '@/shared/constants';
import { CombatOperationsTable } from './components/CombatOperationsTable';
import { useCombatOperationsControl } from './hooks/useCombatOperationsControl';
import styles from './CombatOperationsControl.module.scss';

export function CombatOperationsControl() {
  const {
    items,
    total,
    page,
    limit,
    listStatus,
    statusFilter,
    mutatingId,
    canSendToDiscord,
    setStatusFilter,
    fetchList,
    publish,
    archive,
    sendOperationToDiscord,
    cancelOperationDiscordSend,
    goCreate,
    goEdit,
  } = useCombatOperationsControl();

  return (
    <ConfigProvider theme={FORM_THEME}>
      <HudCard
        title="Боевые операции"
        extra={
          <Button type="primary" onClick={goCreate}>
            Создать операцию
          </Button>
        }
      >
        <div className={styles.filters}>
          <Select<NewsStatus | ''>
            className={styles.statusSelect}
            value={statusFilter ?? ''}
            options={NEWS_STATUS_FILTER_OPTIONS}
            onChange={(value) => setStatusFilter(value || null)}
          />
        </div>
        <CombatOperationsTable
          items={items}
          loading={listStatus === 'loading'}
          page={page}
          limit={limit}
          total={total}
          mutatingId={mutatingId}
          canSendToDiscord={canSendToDiscord}
          onPageChange={fetchList}
          onEdit={goEdit}
          onPublish={publish}
          onArchive={archive}
          onSendToDiscord={sendOperationToDiscord}
          onCancelDiscordSend={cancelOperationDiscordSend}
        />
      </HudCard>
    </ConfigProvider>
  );
}
