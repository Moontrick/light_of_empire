import type { NewsBlock } from '@/shared/types';

type QuoteBlock = Extract<NewsBlock, { type: 'quote' }>;

export interface QuoteBlockEditorProps {
  value: QuoteBlock;
  onChange: (block: QuoteBlock) => void;
}
