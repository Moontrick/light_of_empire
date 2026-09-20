'use client';

import { Modal } from 'antd';
import { CHANNEL_SETTING_LABELS } from '../../constants';
import type { ChannelConfirmModalProps } from './types';
import styles from './ChannelConfirmModal.module.scss';

export function ChannelConfirmModal({ target, confirming, onConfirm, onCancel }: ChannelConfirmModalProps) {
  const labels = target ? CHANNEL_SETTING_LABELS[target.code] : undefined;

  return (
    <Modal
      open={target !== null}
      centered
      title={`Сменить ${labels?.channel ?? 'канал'}?`}
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
            {labels?.subject ?? 'Публикации'} будут публиковаться в канал{' '}
            <span className={styles.channel}>#{target.channelName}</span> (ID {target.channelId}).
          </p>
          <p className={styles.hint}>Вы уверены, что хотите сменить ID канала?</p>
        </>
      )}
    </Modal>
  );
}
