import { CurrencyTransactionType } from '@/shared/types';

export const CURRENCY_NAME = 'Кредиты';
export const CURRENCY_MAX_AMOUNT = 1_000_000;
export const CURRENCY_MESSAGE_MAX_LENGTH = 500;

export const TRANSACTION_TYPE_LABELS: Record<CurrencyTransactionType, string> = {
  [CurrencyTransactionType.CREDIT]: 'Начисление',
  [CurrencyTransactionType.DEBIT]: 'Списание',
  [CurrencyTransactionType.PURCHASE]: 'Покупка',
  [CurrencyTransactionType.REFUND]: 'Возврат',
};

// Сервер фильтрует только по CREDIT/DEBIT — PURCHASE в фильтр не добавляем
export const TRANSACTION_TYPE_FILTER_OPTIONS: {
  value: CurrencyTransactionType | '';
  label: string;
}[] = [
  { value: '', label: 'Все операции' },
  { value: CurrencyTransactionType.CREDIT, label: 'Начисления' },
  { value: CurrencyTransactionType.DEBIT, label: 'Списания' },
];
