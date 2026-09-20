import { useMemo } from 'react';
import { Button, Popconfirm, Tag } from 'antd';
import type { TableProps } from 'antd';
import { format } from 'date-fns';
import type { DonationListItem } from '@/shared/types';
import { CreditsAmount } from '@ui/CreditsAmount';
import type { DonationsTableProps } from '../types';
import styles from '../DonationsTable.module.scss';

export function useDonationsTableColumns({
  mutatingId,
  onEdit,
  onSetActive,
}: Omit<DonationsTableProps, 'items' | 'loading'>) {
  return useMemo<TableProps<DonationListItem>['columns']>(
    () => [
      {
        title: 'Товар',
        key: 'title',
        render: (_, item) => (
          <button type="button" className={styles.titleButton} onClick={() => onEdit(item.id)}>
            {item.coverUrl ? (
              <img src={item.coverUrl} alt="" className={styles.cover} />
            ) : (
              <span className={styles.coverFallback} aria-hidden />
            )}
            <span>{item.title}</span>
          </button>
        ),
      },
      {
        title: 'Цена',
        dataIndex: 'price',
        width: 130,
        render: (price: number) => <CreditsAmount value={price} />,
      },
      {
        title: 'Витрина',
        dataIndex: 'isActive',
        width: 120,
        render: (isActive: boolean) =>
          isActive ? <Tag color="green">Активно</Tag> : <Tag>Скрыто</Tag>,
      },
      {
        title: 'Картинок',
        key: 'images',
        width: 110,
        render: (_, item) => item.images.length,
      },
      {
        title: 'Изменён',
        dataIndex: 'changedAt',
        width: 130,
        render: (changedAt: string) => format(new Date(changedAt), 'dd.MM.yyyy'),
      },
      {
        title: '',
        key: 'actions',
        render: (_, item) => (
          <div className={styles.actions}>
            <Button size="small" onClick={() => onEdit(item.id)}>
              Редактировать
            </Button>
            <Popconfirm
              title={item.isActive ? 'Скрыть товар с витрины?' : 'Показать товар на витрине?'}
              okText={item.isActive ? 'Скрыть' : 'Показать'}
              cancelText="Отмена"
              onConfirm={() => void onSetActive(item.id, !item.isActive)}
            >
              <Button size="small" danger={item.isActive} loading={mutatingId === item.id}>
                {item.isActive ? 'Скрыть' : 'Показать'}
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [mutatingId, onEdit, onSetActive],
  );
}
