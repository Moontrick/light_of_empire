import type { DonationDetail, DonationListItem } from '@/shared/types';

export type DonationsListStatus = 'idle' | 'loading' | 'ready' | 'error';
export type DonationDetailStatus = 'idle' | 'loading' | 'ready' | 'notFound' | 'error';

export interface DonationsState {
  items: DonationListItem[];
  listStatus: DonationsListStatus;
  detail: DonationDetail | null;
  detailStatus: DonationDetailStatus;
}
