import type { DonationListItem } from '@/shared/types';

export interface DonationsTableProps {
  items: DonationListItem[];
  loading: boolean;
  mutatingId: number | null;
  onEdit: (id: number) => void;
  onSetActive: (id: number, isActive: boolean) => Promise<boolean>;
}
