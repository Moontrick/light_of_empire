import { useMemo, useState } from 'react';
import type { TableProps } from 'antd';
import { format } from 'date-fns';
import { IconSteam } from '@/public/icons/IconSteam';
import { Link } from '@/shared/i18n/navigation';
import type { PurchaseStatus } from '@/shared/types';
import { CreditsAmount } from '@ui/CreditsAmount';
import { PurchaseStatusTag } from '@ui/PurchaseStatusTag';
import type { PurchasesTableProps, PurchasesTableRow } from '../types';
import styles from '../PurchasesTable.module.scss';

const formatDateTime = (value: string | null) =>
  value ? format(new Date(value), 'dd.MM.yyyy HH:mm') : '—';

export function usePurchasesTableColumns({
  withParticipants,
  renderActions,
}: Pick<PurchasesTableProps, 'withParticipants' | 'renderActions'>) {
  const [externalUrl, setExternalUrl] = useState<string | null>(null);

  const columns = useMemo<TableProps<PurchasesTableRow>['columns']>(() => {
    const participantColumns: TableProps<PurchasesTableRow>['columns'] = withParticipants
      ? [
        {
          title: 'Покупатель',
          key: 'user',
          render: (_, row) =>
            row.user ? (
              <div className={styles.person}>
                <span className={styles.personLogin}>{row.user.login}</span>
                <span className={styles.personEmail}>{row.user.email}</span>
              </div>
            ) : (
              '—'
            ),
        },
        {
          title: 'Steam',
          key: 'steam',
          width: 110,
          render: (_, row) => (
            <a
              className={styles.steam}
              href={row.steamUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.preventDefault();
                setExternalUrl(row.steamUrl);
              }}
            >
              <IconSteam width={16} height={16} />
              Профиль
            </a>
          ),
        },
      ]
      : [];

    const processedByColumn: TableProps<PurchasesTableRow>['columns'] = withParticipants
      ? [
        {
          title: 'Обработал',
          key: 'processedBy',
          render: (_, row) => row.processedBy?.login ?? '—',
        },
      ]
      : [];

    const actionsColumn: TableProps<PurchasesTableRow>['columns'] = renderActions
      ? [{ title: '', key: 'actions', render: (_, row) => renderActions(row) }]
      : [];

    return [
      {
        title: 'Товар',
        key: 'donation',
        render: (_, row) => (
          <Link href={`/donations/${row.donation.id}`} className={styles.donation}>
            {row.donation.coverUrl ? (
              <img src={row.donation.coverUrl} alt="" className={styles.cover} />
            ) : (
              <span className={styles.coverFallback} aria-hidden />
            )}
            <span className={styles.donationTitle}>{row.donation.title}</span>
          </Link>
        ),
      },
      ...participantColumns,
      {
        title: 'Цена',
        dataIndex: 'price',
        width: 120,
        render: (price: number) => <CreditsAmount value={price} />,
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        width: 130,
        render: (status: PurchaseStatus) => <PurchaseStatusTag status={status} />,
      },
      {
        title: 'Комментарий',
        dataIndex: 'userComment',
        render: (comment: string | null) => comment ?? '—',
      },
      {
        title: 'Решение',
        dataIndex: 'resolutionComment',
        render: (comment: string | null) => comment ?? '—',
      },
      ...processedByColumn,
      {
        title: 'Создана',
        dataIndex: 'createdAt',
        width: 150,
        render: (value: string) => formatDateTime(value),
      },
      {
        title: 'Обработана',
        dataIndex: 'processedAt',
        width: 150,
        render: (value: string | null) => formatDateTime(value),
      },
      ...actionsColumn,
    ];
  }, [withParticipants, renderActions]);

  return { columns, externalUrl, closeExternal: () => setExternalUrl(null) };
}
