import type { DonationDetail, DonationListItem } from '@/shared/types';

export type DonationsAdminListStatus = 'idle' | 'loading' | 'ready' | 'error';
export type DonationEditableStatus = 'idle' | 'loading' | 'ready' | 'notFound' | 'error';

export interface DonationsAdminState {
  items: DonationListItem[];
  listStatus: DonationsAdminListStatus;
  saving: boolean;
  mutatingId: number | null;
  editable: DonationDetail | null;
  editableStatus: DonationEditableStatus;
}
