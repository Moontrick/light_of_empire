import type { NewsBlock } from '@/shared/types';

type HeadingBlock = Extract<NewsBlock, { type: 'heading' }>;

export interface HeadingBlockEditorProps {
  value: HeadingBlock;
  onChange: (block: HeadingBlock) => void;
}
