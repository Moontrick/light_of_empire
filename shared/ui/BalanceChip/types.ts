export interface BalanceChipProps {
  balance: number;
  pending: boolean;
  guest: boolean;
  // Текст для гостя; без него чип для гостя не рендерится
  guestText?: string;
}
