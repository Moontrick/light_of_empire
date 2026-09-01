'use client';

import { useMemo } from 'react';
import { Button, Popconfirm, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { NewsPost } from '@/shared/types';
import { NewsStatus } from '@/shared/types';
import { formatNewsDate } from '@/shared/utils/formatNewsDate';
import { NEWS_STATUS_LABELS } from '../../constants';
import type { NewsTableProps } from './types';
import styles from './NewsTable.module.scss';

const STATUS_TAG_COLOR: Record<NewsStatus, string> = {
  [NewsStatus.DRAFT]: 'default',
  [NewsStatus.PUBLISHED]: 'green',
  [NewsStatus.ARCHIVED]: 'orange',
};

export function NewsTable({
  items,
  loading,
  page,
  limit,
  total,
  mutatingId,
  onPageChange,
  onEdit,
  onPublish,
  onArchive,
}: NewsTableProps) {
  const columns: TableProps<NewsPost>['columns'] = useMemo(
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
                title="Опубликовать новость?"
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
                title="Убрать новость с сайта?"
                okText="Убрать"
                cancelText="Отмена"
                onConfirm={() => onArchive(item.id)}
              >
                <Button size="small" danger loading={mutatingId === item.id}>
                  В архив
                </Button>
              </Popconfirm>
            )}
          </div>
        ),
      },
    ],
    [mutatingId, onEdit, onPublish, onArchive],
  );

  return (
    <Table<NewsPost>
      rowKey="id"
      columns={columns}
      dataSource={items}
      loading={loading}
      scroll={{ x: 900 }}
      pagination={{
        current: page,
        pageSize: limit,
        total,
        onChange: onPageChange,
      }}
    />
  );
}
