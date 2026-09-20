'use client';

import { Table } from 'antd';
import { ExternalLinkModal } from '@ui/ExternalLinkModal';
import { usePurchasesTableColumns } from './hooks/usePurchasesTableColumns';
import type { PurchasesTableProps, PurchasesTableRow } from './types';

export function PurchasesTable({
  items,
  loading,
  page,
  limit,
  total,
  withParticipants = false,
  onPageChange,
  renderActions,
}: PurchasesTableProps) {
  const { columns, externalUrl, closeExternal } = usePurchasesTableColumns({
    withParticipants,
    renderActions,
  });

  return (
    <>
      <Table<PurchasesTableRow>
        rowKey="id"
        columns={columns}
        dataSource={items}
        loading={loading}
        scroll={{ x: withParticipants ? 1400 : 900 }}
        locale={{ emptyText: 'Заявок пока нет' }}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: onPageChange,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
      />
      <ExternalLinkModal url={externalUrl} onClose={closeExternal} />
    </>
  );
}
