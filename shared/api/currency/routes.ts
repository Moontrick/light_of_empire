export const CURRENCY_ROUTES = {
  ME: '/currency/me',
  MY_TRANSACTIONS: '/currency/me/transactions',
  TRANSACTIONS: '/currency/transactions',
  CREDIT: (id: number) => `/currency/users/${id}/credit`,
  DEBIT: (id: number) => `/currency/users/${id}/debit`,
} as const;
