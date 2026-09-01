import type { CharterRule } from '@/shared/types';

export interface RuleEditorProps {
  value: CharterRule;
  onChange: (rule: CharterRule) => void;
  onDelete: () => void;
  depth: number;
  // скрывает «×» — для единственного правила верхнего уровня (удаляют весь блок через BlockCard)
  canDelete?: boolean;
}
