import type { DonationDetail } from '@/shared/types';

export interface PurchasePanelProps {
  donation: DonationDetail;
  onUnavailable: () => void;
}
