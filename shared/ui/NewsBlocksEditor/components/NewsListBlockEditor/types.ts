import type { NewsBlock } from '@/shared/types';

type NewsListBlock = Extract<NewsBlock, { type: 'list' }>;

export interface NewsListBlockEditorProps {
  value: NewsListBlock;
  onChange: (block: NewsListBlock) => void;
}
