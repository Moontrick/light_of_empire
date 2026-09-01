import type { PageTreeNodeDto } from '@/shared/api/pages';

export interface PageFormModalProps {
  open: boolean;
  node: PageTreeNodeDto | null;
  onClose: () => void;
}
