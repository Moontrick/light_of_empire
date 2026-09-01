import type { NewsBlock } from '@/shared/types';

export interface NewsBlocksEditorProps {
  value: NewsBlock[];
  onChange: (blocks: NewsBlock[]) => void;
}
