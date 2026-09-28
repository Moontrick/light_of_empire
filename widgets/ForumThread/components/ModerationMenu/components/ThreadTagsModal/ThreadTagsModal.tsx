'use client';

import { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import { FORUM_THREAD_TAGS_MAX } from '@/shared/constants';
import type { ThreadTagsModalProps } from './types';

export function ThreadTagsModal({ open, loading, tags, initial, onSubmit, onCancel }: ThreadTagsModalProps) {
  const [tagIds, setTagIds] = useState<number[]>(initial);

  // Сеем выбор только при открытии: initial — новый массив на каждый рендер родителя,
  // и зависимость от него сбрасывала бы выбор во время сохранения
  useEffect(() => {
    if (open) setTagIds(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      open={open}
      title="Теги темы"
      okText="Сохранить"
      cancelText="Отмена"
      confirmLoading={loading}
      onOk={() => onSubmit(tagIds)}
      onCancel={onCancel}
      destroyOnHidden
    >
      <Select
        mode="multiple"
        value={tagIds}
        onChange={setTagIds}
        placeholder="Без тегов"
        maxCount={FORUM_THREAD_TAGS_MAX}
        options={tags.map((t) => ({ value: t.id, label: t.name }))}
        style={{ width: '100%' }}
      />
    </Modal>
  );
}
