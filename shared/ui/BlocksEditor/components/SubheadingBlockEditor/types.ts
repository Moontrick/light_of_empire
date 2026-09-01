import type { CharterBlock } from '@/shared/types';

type SubheadingBlock = Extract<CharterBlock, { kind: 'subheading' }>;

export interface SubheadingBlockEditorProps {
  value: SubheadingBlock;
  onChange: (block: SubheadingBlock) => void;
}
