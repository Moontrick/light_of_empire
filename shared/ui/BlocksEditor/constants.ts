import type { CharterBlock, PenaltyCategory } from '@/shared/types';

export const BLOCK_LABELS: Record<CharterBlock['kind'], string> = {
  text: 'Абзац',
  subheading: 'Подзаголовок',
  list: 'Список',
  note: 'Заметка',
  rules: 'Правила',
};

export const BLOCK_KINDS = Object.keys(BLOCK_LABELS) as CharterBlock['kind'][];

export function createEmptyBlock(kind: CharterBlock['kind']): CharterBlock {
  switch (kind) {
  case 'text':
    return { kind: 'text', text: '' };
  case 'subheading':
    return { kind: 'subheading', text: '' };
  case 'list':
    return { kind: 'list', items: [''] };
  case 'note':
    return { kind: 'note', text: '' };
  case 'rules':
    return { kind: 'rules', items: [{ code: '', text: '' }] };
  }
}

// Подписи категорий наказаний (см. --uv-cat-* в _variables.scss)
export const CATEGORY_LABELS: Record<PenaltyCategory, string> = {
  1: '1 — Расстрел',
  2: '2 — Трибунал',
  3: '3 — КПЗ до 1 часа / разжалование',
  4: '4 — КПЗ до 30 минут',
  5: '5 — КПЗ до 10 минут',
  6: '6 — Арест с беседой',
  7: '7 — Предупреждение',
};
