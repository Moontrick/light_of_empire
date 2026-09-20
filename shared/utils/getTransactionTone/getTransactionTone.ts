import { CurrencyTransactionType, type CreditsTone } from '@/shared/types';

// default — неизвестные типы из будущих версий API рисуем без знака и цвета
export function getTransactionTone(type: CurrencyTransactionType): CreditsTone {
  switch (type) {
  case CurrencyTransactionType.CREDIT:
  case CurrencyTransactionType.REFUND:
    return 'plus';
  case CurrencyTransactionType.DEBIT:
  case CurrencyTransactionType.PURCHASE:
    return 'minus';
  default:
    return 'neutral';
  }
}
