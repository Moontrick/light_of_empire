import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { alertHandler } from '@/shared/utils/alertHandler';
import type { LoginDto } from '@/shared/api/auth';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { AUTH_ERROR_MESSAGES } from '../../../constants';

const isEmailNotVerified = (error: unknown) =>
  isAxiosError(error) && error.response?.status === 403;

export function useLoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const startVerification = useAuthStore((state) => state.startVerification);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: LoginDto) => {
    setSubmitting(true);
    try {
      await login(values);
      alertHandler.addAlert({ status: 'success', defaultText: 'С возвращением, солдат' });
      router.replace('/');
    } catch (error) {
      // 403 — пароль верный, но почта не подтверждена: уводим на экран кода
      if (isEmailNotVerified(error)) {
        alertHandler.addAlert({ status: 'warning', defaultText: AUTH_ERROR_MESSAGES[403] });
        startVerification(values.email);
      } else {
        alertHandler.addAlert({ defaultText: getApiErrorMessage(error, AUTH_ERROR_MESSAGES) });
      }
      setSubmitting(false);
    }
  };

  return { onFinish, submitting };
}
