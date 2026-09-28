'use client';

import { useState } from 'react';
import { Modal, Select } from 'antd';
import type { MoveThreadModalProps } from './types';

export function MoveThreadModal({ open, loading, categories, onSubmit, onCancel }: MoveThreadModalProps) {
  const [categoryId, setCategoryId] = useState<number | undefined>();

  return (
    <Modal
      open={open}
      title="Перенести тему"
      okText="Перенести"
      cancelText="Отмена"
      okButtonProps={{ disabled: categoryId === undefined }}
      confirmLoading={loading}
      onOk={() => categoryId !== undefined && onSubmit(categoryId)}
      onCancel={onCancel}
      afterClose={() => setCategoryId(undefined)}
      destroyOnHidden
    >
      <Select
        value={categoryId}
        onChange={setCategoryId}
        placeholder="Раздел"
        options={categories.map((c) => ({ value: c.id, label: c.name }))}
        style={{ width: '100%' }}
      />
    </Modal>
  );
}
