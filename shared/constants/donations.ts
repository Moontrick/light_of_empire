import { PurchaseStatus } from '@/shared/types';

export const DONATIONS_SECTION_TITLE = 'Донат';
export const DONATION_TITLE_MIN = 2;
export const DONATION_TITLE_MAX = 200;
export const DONATION_PRICE_MAX = 1_000_000;
export const DONATION_IMAGES_MAX = 10;
export const PURCHASE_COMMENT_MAX = 500;

export const PURCHASE_STATUS_LABELS: Record<PurchaseStatus, string> = {
  [PurchaseStatus.PENDING]: 'Обработка',
  [PurchaseStatus.ISSUED]: 'Выдано',
  [PurchaseStatus.REJECTED]: 'Отказано',
};

export const PURCHASE_STATUS_FILTER_OPTIONS: { value: PurchaseStatus | ''; label: string }[] = [
  { value: '', label: 'Все заявки' },
  { value: PurchaseStatus.PENDING, label: 'Обработка' },
  { value: PurchaseStatus.ISSUED, label: 'Выдано' },
  { value: PurchaseStatus.REJECTED, label: 'Отказано' },
];
