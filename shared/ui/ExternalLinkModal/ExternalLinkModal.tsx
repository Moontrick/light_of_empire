'use client';

import { Modal } from 'antd';
import type { ExternalLinkModalProps } from './types';
import styles from './ExternalLinkModal.module.scss';

export function ExternalLinkModal({ url, onClose }: ExternalLinkModalProps) {
  const handleGo = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  return (
    <Modal
      open={url !== null}
      onCancel={onClose}
      onOk={handleGo}
      centered
      title="Переход на внешний сайт"
      okText="Перейти"
      cancelText="Отмена"
    >
      <p className={styles.text}>
        Вы покидаете сайт и переходите по внешней ссылке. Мы не отвечаем за её
        содержимое.
      </p>
      <div className={styles.url}>{url}</div>
    </Modal>
  );
}
