'use client';

import { Button } from 'antd';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import { HudCorners } from '@ui/HudCorners';
import { CreditsAmount } from '@ui/CreditsAmount';
import { CASE_RARITY_ACCENT, CASE_RARITY_LABELS } from '@ui/CaseRoulette';
import styles from './CaseUI.module.scss';
import type { CaseUIProps } from './types';

export function CaseUI({ cases, balance, onOpenModal }: CaseUIProps) {
  const shortage = Math.max(0, cases.price - balance);
  const accentVar = { '--case-accent': CASE_RARITY_ACCENT[cases.rare] } as CSSProperties;

  return (
    <div
      className={classNames(styles.card, shortage > 0 && styles.locked)}
      style={accentVar}
      onClick={() => onOpenModal(cases.id)}
    >
      <HudCorners />
      <div className={styles.media}>
        <img src={cases.img} alt={cases.label} className={styles.image} />
      </div>
      <span className={styles.eyebrow}>{CASE_RARITY_LABELS[cases.rare]} кейс</span>
      <h3 className={styles.title}>{cases.label}</h3>
      <div className={styles.footer}>
        <Button
          type="primary"
          size="large"
          block
          className={styles.action}
          disabled={shortage > 0}
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(cases.id);
          }}
        >
          <span>Открыть</span>
          <span className={styles.actionPrice}>
            <CreditsAmount value={cases.price} size="sm" />
          </span>
        </Button>
        {shortage > 0 && (
          <span className={styles.shortage}>Не хватает {shortage.toLocaleString('ru-RU')} кредитов</span>
        )}
      </div>
    </div>
  );
}
