import type { CaseType } from '../../hooks/useCaseContent/types';

export type CaseUIProps = {
  cases: CaseType;
  balance: number;
  onOpenModal: (caseId: number) => void;
};
