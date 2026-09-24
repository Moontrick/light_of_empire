import { useMemo } from 'react';
import type { CaseNodeItemType } from '@ui/CaseRoulette';
import { CASE_RARITY_ACCENT, CASE_RARITY_LABELS } from '@ui/CaseRoulette';
import { CASES_CONST, DATA_SET } from '../../../hooks/constants';
import type { CasePrize } from '../types';

export function useCaseDetail(caseId: number) {
  return useMemo(() => {
    const data = DATA_SET[caseId];
    const meta = CASES_CONST.find((item) => item.id === caseId);
    if (!data || !meta) return null;

    const totalWeight = data.placeholders.reduce((sum, entry) => sum + entry.weight, 0);

    // Подписи призов живут в placeholders — переносим их в ноды, чтобы
    // модалка выигрыша и список призов показывали название
    const nodes = data.placeholders.reduce<Record<number, CaseNodeItemType>>((acc, entry) => {
      acc[entry.id] = { ...data.nodes[entry.id], label: entry.label };
      return acc;
    }, {});

    const prizes: CasePrize[] = data.placeholders.map((entry) => ({
      id: entry.id,
      label: entry.label,
      node: nodes[entry.id],
      chance: Math.round((entry.weight / totalWeight) * 1000) / 10,
    }));

    return {
      label: meta.label,
      rarityLabel: CASE_RARITY_LABELS[meta.rare],
      accent: CASE_RARITY_ACCENT[meta.rare],
      img: meta.img,
      price: data.price,
      placeholders: data.placeholders,
      nodes,
      prizes,
    };
  }, [caseId]);
}
