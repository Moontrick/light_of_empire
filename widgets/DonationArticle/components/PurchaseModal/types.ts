import type { DonationDetail } from '@/shared/types';

export interface PurchaseModalProps {
  donation: DonationDetail;
  open: boolean;
  onClose: () => void;
  // Товар исчез (404) — родитель перечитывает карточку
  onUnavailable: () => void;
}

export interface PurchaseFormValues {
  user_comment?: string;
}
