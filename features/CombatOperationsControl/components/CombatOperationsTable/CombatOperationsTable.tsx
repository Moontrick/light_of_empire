'use client';

import { useMemo } from 'react';
import { Button, Popconfirm, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { CombatOperation } from '@/shared/types';
import { NewsStatus } from '@/shared/types';
import { NEWS_STATUS_LABELS } from '@/shared/constants';
import { formatNewsDate } from '@/shared/utils/formatNewsDate';
import { DiscordSendActions } from '@ui/DiscordSendActions';
import type { CombatOperationsTableProps } from './types';
import styles from './CombatOperationsTable.module.scss';

const STATUS_TAG_COLOR: Record<NewsStatus, string> = {
  [NewsStatus.DRAFT]: 'default',
  [NewsStatus.PUBLISHED]: 'green',
  [NewsStatus.ARCHIVED]: 'orange',
};

export function CombatOperationsTable({
  items,
  loading,
  page,
  limit,
  total,
  mutatingId,
  canSendToDiscord,
  onPageChange,
  onEdit,
  onPublish,
  onArchive,
  onSendToDiscord,
  onCancelDiscordSend,
}: CombatOperationsTableProps) {
  const columns: TableProps<CombatOperation>['columns'] = useMemo(
    () => [
      {
        title: 'Заголовок',
        dataIndex: 'title',
        render: (title: string, item) => (
          <button type="button" className={styles.titleLink} onClick={() => onEdit(item.slug)}>
            {title}
          </button>
        ),
      },
      {
        title: 'Рубрика',
        dataIndex: 'tag',
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        render: (status: NewsStatus) => (
          <Tag color={STATUS_TAG_COLOR[status]}>{NEWS_STATUS_LABELS[status]}</Tag>
        ),
      },
      {
        title: 'Discord',
        dataIndex: 'isSendToDiscord',
        render: (sent: boolean) =>
          sent ? <Tag color="blue">Отправлена</Tag> : <Tag>Не отправлена</Tag>,
      },
      {
        title: 'Публикация',
        key: 'publication',
        render: (_, item) => (item.publishedAt ? item.date : '—'),
      },
      {
        title: 'Изменена',
        dataIndex: 'changedAt',
        render: (changedAt: string) => formatNewsDate(changedAt.slice(0, 10)),
      },
      {
        title: '',
        key: 'actions',
        render: (_, item) => (
          <div className={styles.actions}>
            <Button size="small" onClick={() => onEdit(item.slug)}>
              Редактировать
            </Button>
            {(item.status === NewsStatus.DRAFT || item.status === NewsStatus.ARCHIVED) && (
              <Popconfirm
                title="Опубликовать операцию?"
                okText="Опубликовать"
                cancelText="Отмена"
                onConfirm={() => onPublish(item.id)}
              >
                <Button size="small" type="primary" loading={mutatingId === item.id}>
                  Опубликовать
                </Button>
              </Popconfirm>
            )}
            {item.status === NewsStatus.PUBLISHED && (
              <Popconfirm
                title="Убрать операцию с сайта?"
                okText="Убрать"
                cancelText="Отмена"
                onConfirm={() => onArchive(item.id)}
              >
                <Button size="small" danger loading={mutatingId === item.id}>
                  В архив
                </Button>
              </Popconfirm>
            )}
            {canSendToDiscord && (
              <DiscordSendActions
                size="small"
                sent={item.isSendToDiscord}
                loading={mutatingId === item.id}
                onSend={() => void onSendToDiscord(item.id)}
                onCancel={() => void onCancelDiscordSend(item.id)}
              />
            )}
          </div>
        ),
      },
    ],
    [mutatingId, canSendToDiscord, onEdit, onPublish, onArchive, onSendToDiscord, onCancelDiscordSend],
  );

  return (
    <Table<CombatOperation>
      rowKey="id"
      columns={columns}
      dataSource={items}
      loading={loading}
      scroll={{ x: 1100 }}
      pagination={{
        current: page,
        pageSize: limit,
        total,
        onChange: onPageChange,
      }}
    />
  );
}
