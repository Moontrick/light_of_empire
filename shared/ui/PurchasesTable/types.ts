import type { ReactNode } from 'react';
import type { Purchase, PurchaseParticipant } from '@/shared/types';

// Строка таблицы: своя заявка — без user/processedBy, админская — с ними
export type PurchasesTableRow = Purchase & {
  user?: PurchaseParticipant;
  processedBy?: PurchaseParticipant | null;
};

export interface PurchasesTableProps {
  items: PurchasesTableRow[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  // true — колонки «Покупатель», «Steam», «Обработал» и действия (админка)
  withParticipants?: boolean;
  onPageChange: (page: number) => void;
  renderActions?: (row: PurchasesTableRow) => ReactNode;
}
