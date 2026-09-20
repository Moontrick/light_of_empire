import { useMemo } from 'react';
import type { TableProps } from 'antd';
import { format } from 'date-fns';
import type { CurrencyTransactionType } from '@/shared/types';
import { getTransactionTone } from '@/shared/utils/getTransactionTone';
import { CreditsAmount } from '@ui/CreditsAmount';
import { TransactionTypeTag } from '@ui/TransactionTypeTag';
import { ParticipantCell } from '../components/ParticipantCell';
import type { TransactionsTableRow } from '../types';
import styles from '../TransactionsTable.module.scss';

export function useTransactionsTableColumns(withParticipants: boolean) {
  return useMemo<TableProps<TransactionsTableRow>['columns']>(() => {
    const participantColumns: TableProps<TransactionsTableRow>['columns'] = withParticipants
      ? [
        {
          title: 'Получатель',
          key: 'user',
          render: (_, row) => <ParticipantCell participant={row.user} />,
        },
        {
          title: 'Оператор',
          key: 'actor',
          render: (_, row) => <ParticipantCell participant={row.actor} />,
        },
      ]
      : [];

    return [
      {
        title: 'Дата',
        dataIndex: 'created_at',
        width: 150,
        render: (createdAt: string) => format(new Date(createdAt), 'dd.MM.yyyy HH:mm'),
      },
      {
        title: 'Тип',
        dataIndex: 'type',
        width: 130,
        render: (type: CurrencyTransactionType) => <TransactionTypeTag type={type} />,
      },
      {
        title: 'Сумма',
        key: 'amount',
        width: 130,
        render: (_, row) => (
          <CreditsAmount value={row.amount} tone={getTransactionTone(row.type)} />
        ),
      },
      {
        title: 'Баланс после',
        dataIndex: 'balance_after',
        width: 150,
        render: (balance: number) => <CreditsAmount value={balance} />,
      },
      ...participantColumns,
      {
        title: 'Описание',
        dataIndex: 'message',
        render: (message: string) => <span className={styles.message}>{message}</span>,
      },
    ];
  }, [withParticipants]);
}
