import type { CharterBlock } from '@/shared/types';

export interface BlocksEditorProps {
  value: CharterBlock[];
  onChange: (blocks: CharterBlock[]) => void;
}
