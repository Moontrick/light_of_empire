import type { NewsBlock } from '@/shared/types';

type MemberBlock = Extract<NewsBlock, { type: 'member' }>;

export interface MemberBlockEditorProps {
  value: MemberBlock;
  onChange: (block: MemberBlock) => void;
}
