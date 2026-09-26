import type { DonationImage } from '@/shared/types';
import type { PendingImage } from '@features/DonationEditor/types';

export interface DonationImagesEditorProps {
  existing: DonationImage[];
  pending: PendingImage[];
  max: number;
  deletingId: number | null;
  onAdd: (files: File[]) => void;
  onRemoveExisting: (imageId: number) => void;
  onRemovePending: (key: string) => void;
}
