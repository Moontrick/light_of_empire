'use client';

import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import type { CurrencyTransactionType } from '@/shared/types';
import { TRANSACTION_TYPE_FILTER_OPTIONS } from '@/shared/constants';
import { useTransactionsFilters } from './hooks/useTransactionsFilters';
import type { TransactionsFiltersProps } from './types';
import styles from './TransactionsFilters.module.scss';

export function TransactionsFilters(props: TransactionsFiltersProps) {
  const { value, users, usersLoading } = props;
  const { range, userOptions, onRangeChange, onTypeChange, onUserChange, onActorChange } =
    useTransactionsFilters(props);

  return (
    <ConfigProvider locale={ruRU}>
      <div className={styles.filters}>
        <Select<CurrencyTransactionType | ''>
          className={styles.type}
          value={value.type ?? ''}
          options={TRANSACTION_TYPE_FILTER_OPTIONS}
          onChange={onTypeChange}
        />
        <DatePicker.RangePicker
          className={styles.range}
          value={range}
          format="DD.MM.YYYY"
          allowClear
          placeholder={['С даты', 'По дату']}
          onChange={onRangeChange}
        />
        {users && (
          <>
            <Select<number>
              className={styles.user}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="Получатель"
              loading={usersLoading}
              options={userOptions}
              value={value.userId ?? undefined}
              onChange={onUserChange}
            />
            <Select<number>
              className={styles.user}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="Оператор"
              loading={usersLoading}
              options={userOptions}
              value={value.actorId ?? undefined}
              onChange={onActorChange}
            />
          </>
        )}
      </div>
    </ConfigProvider>
  );
}
