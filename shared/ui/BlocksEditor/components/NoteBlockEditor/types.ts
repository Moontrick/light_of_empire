import type { CharterBlock } from '@/shared/types';

export type NoteBlock = Extract<CharterBlock, { kind: 'note' }>;

export interface NoteBlockEditorProps {
  value: NoteBlock;
  onChange: (block: NoteBlock) => void;
}
