import { Tag } from 'antd';
import { CurrencyTransactionType } from '@/shared/types';
import { TRANSACTION_TYPE_LABELS } from '@/shared/constants';
import type { TransactionTypeTagProps } from './types';

const TAG_COLOR: Partial<Record<CurrencyTransactionType, string>> = {
  [CurrencyTransactionType.CREDIT]: 'green',
  [CurrencyTransactionType.DEBIT]: 'red',
  [CurrencyTransactionType.PURCHASE]: 'blue',
  [CurrencyTransactionType.REFUND]: 'cyan',
};

// Неизвестный тип из будущих версий API — серый тег «Операция»
export function TransactionTypeTag({ type }: TransactionTypeTagProps) {
  const label: string | undefined = TRANSACTION_TYPE_LABELS[type];

  return <Tag color={TAG_COLOR[type]}>{label ?? 'Операция'}</Tag>;
}
