export enum CurrencyTransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  PURCHASE = 'PURCHASE',
  REFUND = 'REFUND',
}

// Запись своей истории (/currency/me/transactions) — без user/actor
export interface CurrencyTransaction {
  id: number;
  type: CurrencyTransactionType;
  amount: number;
  balance_after: number;
  message: string;
  created_at: string;
  // Есть у PURCHASE/REFUND — ссылка на заявку
  purchase_id?: number | null;
}

export interface CurrencyParticipant {
  id: number;
  login: string;
  email: string;
}

// Запись общего журнала (/currency/transactions); actor === null — оператор удалён
export interface CurrencyJournalEntry extends CurrencyTransaction {
  user: CurrencyParticipant;
  actor: CurrencyParticipant | null;
}

// Тон суммы в UI: plus — зелёный «+», minus — красный «−», neutral — цвет текста
export type CreditsTone = 'neutral' | 'plus' | 'minus';

// Значения фильтров истории; общие для профиля и админского журнала
export interface TransactionsFilterValues {
  type: CurrencyTransactionType | null;
  from: string | null; // ISO с зоной
  to: string | null;
  userId: number | null;
  actorId: number | null;
}
