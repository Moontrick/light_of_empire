import { useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { alertHandler } from '@/shared/utils/alertHandler';
import type { RegisterDto } from '@/shared/api/auth';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { AUTH_ERROR_MESSAGES } from '../../../constants';

export function useRegisterForm() {
  const register = useAuthStore((state) => state.register);
  const [submitting, setSubmitting] = useState(false);

  // Успех register переключает AuthShell на экран кода (pendingVerification в сторе);
  // сессия и редирект на главную — после подтверждения почты
  const onFinish = async (values: RegisterDto) => {
    setSubmitting(true);
    try {
      await register(values);
      alertHandler.addAlert({ status: 'success', defaultText: 'Код отправлен на почту' });
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error, AUTH_ERROR_MESSAGES) });
    } finally {
      setSubmitting(false);
    }
  };

  return { onFinish, submitting };
}
