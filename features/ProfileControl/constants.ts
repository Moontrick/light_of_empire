// Тексты вызывающей стороны для getApiErrorMessage (статус → сообщение)
export const PASSWORD_ERROR_MESSAGES: Record<number, string> = {
  401: 'Неверный текущий пароль',
  400: 'Новый пароль совпадает со старым',
};

export const RECENT_TRANSACTIONS_LIMIT = 5;
export const RECENT_PURCHASES_LIMIT = 3;
