import type { CharterBlock } from '@/shared/types';

type TextBlock = Extract<CharterBlock, { kind: 'text' }>;

export interface TextBlockEditorProps {
  value: TextBlock;
  onChange: (block: TextBlock) => void;
}
