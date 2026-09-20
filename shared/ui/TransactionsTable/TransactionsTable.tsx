'use client';

import { Table } from 'antd';
import { useTransactionsTableColumns } from './hooks/useTransactionsTableColumns';
import type { TransactionsTableProps, TransactionsTableRow } from './types';

export function TransactionsTable({
  items,
  loading,
  page,
  limit,
  total,
  withParticipants = false,
  onPageChange,
}: TransactionsTableProps) {
  const columns = useTransactionsTableColumns(withParticipants);

  return (
    <Table<TransactionsTableRow>
      rowKey="id"
      columns={columns}
      dataSource={items}
      loading={loading}
      scroll={{ x: withParticipants ? 1100 : 760 }}
      locale={{ emptyText: 'Операций пока нет' }}
      pagination={{
        current: page,
        pageSize: limit,
        total,
        onChange: onPageChange,
        hideOnSinglePage: true,
        showSizeChanger: false,
      }}
    />
  );
}
