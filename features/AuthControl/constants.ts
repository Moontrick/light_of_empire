// Тексты вызывающей стороны для getApiErrorMessage (статус → сообщение)
export const AUTH_ERROR_MESSAGES: Record<number, string> = {
  401: 'Неверный email или пароль',
  409: 'Этот email уже используется',
};
