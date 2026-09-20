'use client';

import { Modal } from 'antd';
import { TransactionsFilters } from '@ui/TransactionsFilters';
import { TransactionsTable } from '@ui/TransactionsTable';
import { useTransactionsModal } from './hooks/useTransactionsModal';
import type { TransactionsModalProps } from './types';
import styles from './TransactionsModal.module.scss';

export function TransactionsModal({ open, onClose }: TransactionsModalProps) {
  const { items, total, page, limit, loading, filters, setFilters, setPage, reset } =
    useTransactionsModal(open);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      afterClose={reset}
      centered
      width={960}
      title="История операций"
      footer={null}
      className={styles.modal}
    >
      <TransactionsFilters value={filters} onChange={setFilters} />
      <TransactionsTable
        items={items}
        loading={loading}
        page={page}
        limit={limit}
        total={total}
        onPageChange={setPage}
      />
    </Modal>
  );
}
