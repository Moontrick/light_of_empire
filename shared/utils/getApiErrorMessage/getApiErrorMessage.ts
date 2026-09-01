import { isAxiosError } from 'axios';
import { getError, getErrorList } from '../getError';

const GENERIC_ERROR_TEXT = 'Что-то пошло не так. Попробуйте ещё раз';
const TOO_MANY_ATTEMPTS_TEXT = 'Слишком много попыток, подождите';

// messagesByStatus — тексты вызывающей стороны для конкретных статусов
// (например, 401 при входе — «Неверный email или пароль»)
export function getApiErrorMessage(
  error: unknown,
  messagesByStatus?: Record<number, string>,
): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status && messagesByStatus?.[status]) {
      return messagesByStatus[status];
    }

    if (status === 429) {
      return TOO_MANY_ATTEMPTS_TEXT;
    }

    if (status === 422) {
      // Валидация разошлась с клиентской — показываем серверные тексты как есть
      const details = getErrorList(error);
      if (details) return details.join('. ');
    }
  }

  return getError(error) ?? GENERIC_ERROR_TEXT;
}
