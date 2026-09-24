import { Button, Modal } from 'antd';
import type { CSSProperties } from 'react';
import { CaseItem } from '../CaseItem';
import { CASE_RARITY_LABELS } from '../../constants';
import type { RewardModalProps } from './types';
import styles from './RewardModal.module.scss';

export function RewardModal({ reward, itemWidth, itemHeight, onClose }: RewardModalProps) {
  // Модалка рендерится в портале, поэтому переменные размера с корня рулетки
  // сюда не доходят — задаём заново
  const vars = {
    '--case-item-width': `${itemWidth}px`,
    '--case-item-height': `${itemHeight}px`,
    '--reward-accent': reward?.node.accent ?? 'var(--uv-text-muted)',
  } as CSSProperties;

  return (
    <Modal open={reward !== null} footer={null} onCancel={onClose} centered width={420}>
      {reward && (
        <div className={styles.root} style={vars}>
          <span className={styles.eyebrow}>Ваш приз</span>
          <div className={styles.stage}>
            <span className={styles.glow} aria-hidden />
            <div className={styles.item}>
              <CaseItem value={reward.value} node={reward.node} />
            </div>
          </div>
          {reward.node.label && <h3 className={styles.label}>{reward.node.label}</h3>}
          <span className={styles.rarity}>{CASE_RARITY_LABELS[reward.node.rare ?? 'default']}</span>
          <Button type="primary" size="large" block className={styles.action} onClick={onClose}>
            Забрать
          </Button>
        </div>
      )}
    </Modal>
  );
}
