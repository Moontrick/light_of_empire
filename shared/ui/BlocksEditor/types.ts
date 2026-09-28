import type { CharterBlock } from '@/shared/types';

export interface BlocksEditorProps {
  value: CharterBlock[];
  onChange: (blocks: CharterBlock[]) => void;
  // Виды блоков в меню «Добавить блок»; по умолчанию все
  allowedKinds?: CharterBlock['kind'][];
}
