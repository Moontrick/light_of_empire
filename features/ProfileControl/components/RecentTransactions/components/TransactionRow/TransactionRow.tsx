import { CreditsAmount } from '@ui/CreditsAmount';
import { TransactionTypeTag } from '@ui/TransactionTypeTag';
import { getTransactionTone } from '@/shared/utils/getTransactionTone';
import { formatDateTime } from '@/shared/utils/formatDateTime';
import type { TransactionRowProps } from './types';
import styles from './TransactionRow.module.scss';

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <li className={styles.row}>
      <div className={styles.main}>
        <TransactionTypeTag type={transaction.type} />
        <span className={styles.message} title={transaction.message}>
          {transaction.message}
        </span>
      </div>
      <div className={styles.aside}>
        <CreditsAmount value={transaction.amount} tone={getTransactionTone(transaction.type)} />
        <time className={styles.date} dateTime={transaction.created_at}>
          {formatDateTime(transaction.created_at)}
        </time>
      </div>
    </li>
  );
}
