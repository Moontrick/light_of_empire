'use client';

import { Table } from 'antd';
import type { UserListItem } from '@/shared/api/users';
import { useBalancesTableColumns } from './hooks/useBalancesTableColumns';
import type { BalancesTableProps } from './types';

export function BalancesTable({ users, loading, ...actions }: BalancesTableProps) {
  const columns = useBalancesTableColumns(actions);

  return (
    <Table<UserListItem>
      rowKey="id"
      columns={columns}
      dataSource={users}
      loading={loading}
      scroll={{ x: 900 }}
      pagination={{ hideOnSinglePage: true }}
    />
  );
}
