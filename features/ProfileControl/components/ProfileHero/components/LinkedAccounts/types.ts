import type { AccountField } from '../../../../types';

export interface LinkedAccountsProps {
  discordId: string | null;
  steamUrl: string | null;
  onEdit: (field: AccountField) => void;
}
