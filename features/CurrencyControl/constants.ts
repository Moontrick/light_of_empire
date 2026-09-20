// Тексты вызывающей стороны для getApiErrorMessage (статус → сообщение)
export const ADJUST_ERROR_MESSAGES: Record<number, string> = {
  404: 'Пользователь не найден',
  409: 'Недостаточно кредитов на балансе',
};
