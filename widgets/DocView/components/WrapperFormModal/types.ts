import type { DocContent } from '@/shared/types';

export interface WrapperFormModalProps {
  open: boolean;
  onClose: () => void;
  initial: DocContent | null;
}
