'use client';

import { Modal } from 'antd';
import type { ChannelConfirmModalProps } from './types';
import styles from './ChannelConfirmModal.module.scss';

export function ChannelConfirmModal({ target, confirming, onConfirm, onCancel }: ChannelConfirmModalProps) {
  return (
    <Modal
      open={target !== null}
      centered
      title="Сменить канал новостей?"
      okText="Сменить канал"
      cancelText="Отмена"
      okButtonProps={{ danger: true }}
      confirmLoading={confirming}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      {target && (
        <>
          <p className={styles.text}>
            Новости будут публиковаться в канал{' '}
            <span className={styles.channel}>#{target.channelName}</span> (ID {target.channelId}).
          </p>
          <p className={styles.hint}>Вы уверены, что хотите сменить ID канала?</p>
        </>
      )}
    </Modal>
  );
}
