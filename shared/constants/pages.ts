import type { PageStatus } from '@/shared/api/pages';

export const PAGE_STATUS_LABELS: Record<PageStatus, string> = {
  DRAFT: 'Черновик',
  PUBLISHED: 'Опубликована',
  HIDDEN: 'Скрыта',
  DELETED: 'Удалена',
};
