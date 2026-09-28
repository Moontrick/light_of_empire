import type { CharterBlock } from '@/shared/types';

export interface CommentComposerReplyTo {
  login: string;
  onClear: () => void;
}

export interface CommentComposerProps {
  value: CharterBlock[];
  onChange: (blocks: CharterBlock[]) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitting?: boolean;
  submitLabel?: string;
  placeholder?: string;
  maxImages?: number;
  // Чип «Ответ на @login» над полем
  replyTo?: CommentComposerReplyTo | null;
}
