import type { CharterBlock } from '@/shared/types';

type RulesBlock = Extract<CharterBlock, { kind: 'rules' }>;

export interface RulesBlockEditorProps {
  value: RulesBlock;
  onChange: (block: RulesBlock) => void;
}
