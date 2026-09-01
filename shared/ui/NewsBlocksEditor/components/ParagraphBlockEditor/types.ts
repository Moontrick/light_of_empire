import type { NewsBlock } from '@/shared/types';

type ParagraphBlock = Extract<NewsBlock, { type: 'paragraph' }>;

export interface ParagraphBlockEditorProps {
  value: ParagraphBlock;
  onChange: (block: ParagraphBlock) => void;
}
