// Тексты вызывающей стороны для getApiErrorMessage (статус → сообщение)
export const PASSWORD_ERROR_MESSAGES: Record<number, string> = {
  401: 'Неверный текущий пароль',
  400: 'Новый пароль совпадает со старым',
};
