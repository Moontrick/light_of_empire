import type { CaseRarity } from './types';

export const DEFAULT_ITEM_WIDTH = 120;
export const DEFAULT_GAP = 8;
export const DEFAULT_DURATION = 5;

export const ITEMS_BEFORE_WIN = 40;
export const ITEMS_AFTER_WIN = 10;

export const OVERSHOOT_RATIO = 0.15;
export const SPIN_EASE = [0.08, 0.75, 0.15, 1] as const;
export const SETTLE_SPRING = {
  type: 'spring',
  stiffness: 180,
  damping: 22,
  mass: 0.8,
} as const;

export const CASE_RARITY_LABELS: Record<CaseRarity, string> = {
  default: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
};

export const CASE_RARITY_ACCENT: Record<CaseRarity, string> = {
  default: 'var(--uv-tier-blue)',
  rare: 'var(--uv-tier-purple)',
  epic: 'var(--uv-tier-pink)',
  legendary: 'var(--uv-tier-red)',
};
