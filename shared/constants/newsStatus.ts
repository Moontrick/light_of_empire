import { NewsStatus } from '@/shared/types';

export const NEWS_STATUS_LABELS: Record<NewsStatus, string> = {
  [NewsStatus.DRAFT]: 'Черновик',
  [NewsStatus.PUBLISHED]: 'Опубликована',
  [NewsStatus.ARCHIVED]: 'В архиве',
};

export const NEWS_STATUS_FILTER_OPTIONS: { value: NewsStatus | ''; label: string }[] = [
  { value: '', label: 'Все статусы' },
  { value: NewsStatus.DRAFT, label: NEWS_STATUS_LABELS[NewsStatus.DRAFT] },
  { value: NewsStatus.PUBLISHED, label: NEWS_STATUS_LABELS[NewsStatus.PUBLISHED] },
  { value: NewsStatus.ARCHIVED, label: NEWS_STATUS_LABELS[NewsStatus.ARCHIVED] },
];
