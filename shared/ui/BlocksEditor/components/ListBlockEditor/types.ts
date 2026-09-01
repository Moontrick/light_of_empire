import type { CharterBlock } from '@/shared/types';

type ListBlock = Extract<CharterBlock, { kind: 'list' }>;

export interface ListBlockEditorProps {
  value: ListBlock;
  onChange: (block: ListBlock) => void;
}
