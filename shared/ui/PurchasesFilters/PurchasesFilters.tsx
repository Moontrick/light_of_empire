'use client';

import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import type { PurchaseStatus } from '@/shared/types';
import { PURCHASE_STATUS_FILTER_OPTIONS } from '@/shared/constants';
import { usePurchasesFilters } from './hooks/usePurchasesFilters';
import type { PurchasesFilterValues, PurchasesFiltersProps } from './types';
import styles from './PurchasesFilters.module.scss';

export const EMPTY_PURCHASE_FILTERS: PurchasesFilterValues = {
  status: null,
  userId: null,
  donationId: null,
  from: null,
  to: null,
};

export function PurchasesFilters(props: PurchasesFiltersProps) {
  const { value, users, usersLoading, donations, donationsLoading } = props;
  const { range, userOptions, donationOptions, onRangeChange, onStatusChange, onUserChange, onDonationChange } =
    usePurchasesFilters(props);

  return (
    <ConfigProvider locale={ruRU}>
      <div className={styles.filters}>
        <Select<PurchaseStatus | ''>
          className={styles.status}
          value={value.status ?? ''}
          options={PURCHASE_STATUS_FILTER_OPTIONS}
          onChange={onStatusChange}
        />
        {users && (
          <Select<number>
            className={styles.entity}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="Покупатель"
            loading={usersLoading}
            options={userOptions}
            value={value.userId ?? undefined}
            onChange={onUserChange}
          />
        )}
        {donations && (
          <Select<number>
            className={styles.entity}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="Товар"
            loading={donationsLoading}
            options={donationOptions}
            value={value.donationId ?? undefined}
            onChange={onDonationChange}
          />
        )}
        {(users || donations) && (
          <DatePicker.RangePicker
            className={styles.range}
            value={range}
            format="DD.MM.YYYY"
            allowClear
            placeholder={['С даты', 'По дату']}
            onChange={onRangeChange}
          />
        )}
      </div>
    </ConfigProvider>
  );
}
