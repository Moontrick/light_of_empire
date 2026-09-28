'use client';

import { useState } from 'react';
import { Input, Modal } from 'antd';
import { FORUM_REASON_MAX } from '@/shared/constants';
import type { LockReasonModalProps } from './types';

export function LockReasonModal({ open, loading, onSubmit, onCancel }: LockReasonModalProps) {
  const [reason, setReason] = useState('');
  const trimmed = reason.trim();

  return (
    <Modal
      open={open}
      title="Заблокировать тему"
      okText="Заблокировать"
      cancelText="Отмена"
      okButtonProps={{ danger: true, disabled: !trimmed }}
      confirmLoading={loading}
      onOk={() => onSubmit(trimmed)}
      onCancel={onCancel}
      afterClose={() => setReason('')}
      destroyOnHidden
    >
      <Input.TextArea
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="Причина блокировки (обязательно)"
        maxLength={FORUM_REASON_MAX}
        showCount
        autoSize={{ minRows: 3 }}
      />
    </Modal>
  );
}
