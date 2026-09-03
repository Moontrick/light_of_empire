'use client';

import { Button, ConfigProvider, Select } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import type { NewsStatus } from '@/shared/types';
import { NewsTable } from './components/NewsTable';
import { useNewsControl } from './hooks/useNewsControl';
import { NEWS_STATUS_FILTER_OPTIONS } from './constants';
import styles from './NewsControl.module.scss';

export function NewsControl() {
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
    publishNews,
    archiveNews,
    sendNewsToDiscord,
    cancelNewsDiscordSend,
    goCreate,
    goEdit,
  } = useNewsControl();

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard
        title="Новости"
        extra={
          <Button type="primary" onClick={goCreate}>
            Создать новость
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
        <NewsTable
          items={items}
          loading={listStatus === 'loading'}
          page={page}
          limit={limit}
          total={total}
          mutatingId={mutatingId}
          canSendToDiscord={canSendToDiscord}
          onPageChange={fetchList}
          onEdit={goEdit}
          onPublish={publishNews}
          onArchive={archiveNews}
          onSendToDiscord={sendNewsToDiscord}
          onCancelDiscordSend={cancelNewsDiscordSend}
        />
      </HudCard>
    </ConfigProvider>
  );
}
