'use client';

import { Table } from 'antd';
import type { DonationListItem } from '@/shared/types';
import { useDonationsTableColumns } from './hooks/useDonationsTableColumns';
import type { DonationsTableProps } from './types';

export function DonationsTable({ items, loading, ...actions }: DonationsTableProps) {
  const columns = useDonationsTableColumns(actions);

  return (
    <Table<DonationListItem>
      rowKey="id"
      columns={columns}
      dataSource={items}
      loading={loading}
      scroll={{ x: 900 }}
      locale={{ emptyText: 'Товаров пока нет' }}
      pagination={{ hideOnSinglePage: true }}
    />
  );
}
