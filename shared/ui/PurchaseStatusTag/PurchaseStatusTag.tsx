import { Tag } from 'antd';
import { PurchaseStatus } from '@/shared/types';
import { PURCHASE_STATUS_LABELS } from '@/shared/constants';
import type { PurchaseStatusTagProps } from './types';

const TAG_COLOR: Partial<Record<PurchaseStatus, string>> = {
  [PurchaseStatus.PENDING]: 'gold',
  [PurchaseStatus.ISSUED]: 'green',
  [PurchaseStatus.REJECTED]: 'red',
};

// Неизвестный статус из будущих версий API — серый тег «Заявка»
export function PurchaseStatusTag({ status }: PurchaseStatusTagProps) {
  const label: string | undefined = PURCHASE_STATUS_LABELS[status];

  return <Tag color={TAG_COLOR[status]}>{label ?? 'Заявка'}</Tag>;
}
