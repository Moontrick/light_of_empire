'use client';

import { Button, Dropdown, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LockReasonModal } from './components/LockReasonModal';
import { MoveThreadModal } from './components/MoveThreadModal';
import { ThreadTagsModal } from './components/ThreadTagsModal';
import { useModerationMenu } from './hooks/useModerationMenu';
import type { ModerationMenuProps } from './types';

export function ModerationMenu(props: ModerationMenuProps) {
  const { thread } = props;
  const {
    items, hasItems, mutating, modal, closeModal,
    lock, move, saveTags, remove, categoryOptions, tagOptions,
  } = useModerationMenu(props);

  if (!hasItems) return null;

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']} disabled={mutating}>
        <Button loading={mutating}>
          Действия <DownOutlined />
        </Button>
      </Dropdown>

      <LockReasonModal open={modal === 'lock'} loading={mutating} onSubmit={(r) => void lock(r)} onCancel={closeModal} />
      <MoveThreadModal
        open={modal === 'move'}
        loading={mutating}
        categories={categoryOptions}
        onSubmit={(id) => void move(id)}
        onCancel={closeModal}
      />
      <ThreadTagsModal
        open={modal === 'tags'}
        loading={mutating}
        tags={tagOptions}
        initial={thread.tags.map((t) => t.id)}
        onSubmit={(ids) => void saveTags(ids)}
        onCancel={closeModal}
      />
      <Modal
        open={modal === 'delete'}
        title="Удалить тему?"
        okText="Удалить"
        cancelText="Отмена"
        okButtonProps={{ danger: true }}
        confirmLoading={mutating}
        onOk={() => void remove()}
        onCancel={closeModal}
      >
        Тема станет невидимой для участников. Восстановить её сможет только администрация.
      </Modal>
    </>
  );
}
