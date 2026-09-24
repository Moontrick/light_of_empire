import type { CaseNodeItemType } from '@ui/CaseRoulette';

export type CaseDetailProps = {
  caseId: number;
  balance: number;
  onBack: () => void;
};

export type CasePrize = {
  id: number;
  label: string;
  node: CaseNodeItemType;
  // Шанс выпадения в процентах, с одним знаком после запятой
  chance: number;
};
