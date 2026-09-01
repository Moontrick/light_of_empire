import type { NewsBlock } from '@/shared/types';

type ImageBlock = Extract<NewsBlock, { type: 'image' }>;

export interface ImageBlockEditorProps {
  value: ImageBlock;
  onChange: (block: ImageBlock) => void;
}
