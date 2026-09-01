import type { PageStatus } from '@/shared/api/pages';
import { PAGE_STATUS_LABELS } from '@/shared/constants';

// DELETED недоступен для ручного выбора — удаление идёт через кнопку с подтверждением
export const PAGE_STATUS_OPTIONS = (Object.keys(PAGE_STATUS_LABELS) as PageStatus[]).map(
  (status) => ({
    value: status,
    label: PAGE_STATUS_LABELS[status],
    disabled: status === 'DELETED',
  }),
);

export const PAGE_STATUS_COLORS: Record<PageStatus, string> = {
  DRAFT: 'default',
  PUBLISHED: 'green',
  HIDDEN: 'orange',
  DELETED: 'red',
};
