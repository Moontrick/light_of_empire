'use client';

import { Table } from 'antd';
import type { UserListItem } from '@/shared/api/users';
import { ExternalLinkModal } from '@ui/ExternalLinkModal';
import { useUsersTable } from './hooks/useUsersTable';
import type { UsersTableProps } from './types';

export function UsersTable({ users, loading, ...actions }: UsersTableProps) {
  const { columns, externalUrl, closeExternal } = useUsersTable(actions);

  return (
    <>
      <Table<UserListItem>
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        scroll={{ x: 1100 }}
        pagination={{ hideOnSinglePage: true }}
      />
      <ExternalLinkModal url={externalUrl} onClose={closeExternal} />
    </>
  );
}
