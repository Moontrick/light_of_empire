// Тексты вызывающей стороны для getApiErrorMessage (статус → сообщение)
export const AUTH_ERROR_MESSAGES: Record<number, string> = {
  401: 'Неверный email или пароль',
  403: 'Подтвердите почту — мы отправили код',
  409: 'Этот email уже используется',
};

// Для 400 карты нет намеренно: бэк присылает готовый русский текст
// («Неверный код, осталось попыток: 4», «Код истёк, запросите новый» и т.д.)
export const VERIFY_ERROR_MESSAGES: Record<number, string> = {
  404: 'Аккаунт не найден — зарегистрируйтесь заново',
  409: 'Почта уже подтверждена — войдите в аккаунт',
};

export const RESEND_ERROR_MESSAGES: Record<number, string> = {
  404: 'Аккаунт не найден — зарегистрируйтесь заново',
  409: 'Почта уже подтверждена — войдите в аккаунт',
};

export const CODE_LENGTH = 6;
export const RESEND_COOLDOWN_SEC = 60;
