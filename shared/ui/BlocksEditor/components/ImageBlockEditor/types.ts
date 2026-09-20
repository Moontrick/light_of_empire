import type { CharterBlock } from '@/shared/types';

export type CharterImageBlock = Extract<CharterBlock, { kind: 'image' }>;

export interface ImageBlockEditorProps {
  value: CharterImageBlock;
  onChange: (block: CharterImageBlock) => void;
}
