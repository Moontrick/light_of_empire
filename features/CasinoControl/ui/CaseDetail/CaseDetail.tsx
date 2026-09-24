'use client';

import { Button } from 'antd';
import type { CSSProperties } from 'react';
import { HudCorners } from '@ui/HudCorners';
import { CASE_RARITY_LABELS } from '@ui/CaseRoulette';
import { CaseItem } from '@/shared/ui/CaseRoulette/components/CaseItem';
import styles from './CaseDetail.module.scss';
import type { CaseDetailProps } from './types';
import { useCaseDetail } from './hooks/useCaseDetail';
import { CasinoRulete } from '../CasinoRulete';

export function CaseDetail({ caseId, balance, onBack }: CaseDetailProps) {
  const detail = useCaseDetail(caseId);

  if (detail === null) return null;

  const accentVar = { '--case-accent': detail.accent } as CSSProperties;

  return (
    <div className={styles.root} style={accentVar}>
      <div className={styles.header}>
        <Button onClick={onBack} className={styles.back}>
          ← Назад
        </Button>
        <div className={styles.headText}>
          <span className={styles.eyebrow}>{detail.rarityLabel} кейс</span>
          <h3 className={styles.title}>{detail.label}</h3>
        </div>
      </div>

      <div className={styles.stage}>
        <HudCorners />
        <img src={detail.img} alt="" className={styles.stageImage} aria-hidden />
        <CasinoRulete
          placeholders={detail.placeholders}
          nodes={detail.nodes}
          price={detail.price}
          balance={balance}
        />
      </div>

      <section className={styles.prizes}>
        <span className={styles.sectionTitle}>Возможные призы</span>
        <div className={styles.prizeGrid}>
          {detail.prizes.map((prize) => (
            <div key={prize.id} className={styles.prize}>
              <div className={styles.prizeItem}>
                <CaseItem node={prize.node} value={prize.id} />
              </div>
              <span className={styles.prizeLabel}>{prize.label}</span>
              <span className={styles.prizeRarity} style={{ color: prize.node.accent }}>
                {CASE_RARITY_LABELS[prize.node.rare ?? 'default']}
              </span>
              <span className={styles.prizeChance}>Шанс {prize.chance.toLocaleString('ru-RU')}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
