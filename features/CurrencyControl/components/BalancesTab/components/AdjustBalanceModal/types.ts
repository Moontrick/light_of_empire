import type { AdjustTarget } from '@features/CurrencyControl/types';

export interface AdjustBalanceModalProps {
  // null — модалка закрыта
  target: AdjustTarget | null;
  onClose: () => void;
  onSaved: (userId: number, balance: number) => void;
}

export interface AdjustBalanceFormValues {
  amount: number;
  message: string;
}
