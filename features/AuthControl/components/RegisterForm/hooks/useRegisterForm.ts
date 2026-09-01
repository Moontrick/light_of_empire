import { useState } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { alertHandler } from '@/shared/utils/alertHandler';
import type { RegisterDto } from '@/shared/api/auth';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { AUTH_ERROR_MESSAGES } from '../../../constants';

export function useRegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: RegisterDto) => {
    setSubmitting(true);
    try {
      await register(values);
      alertHandler.addAlert({
        status: 'success',
        defaultText: 'Добро пожаловать в ряды Империи',
      });
      router.replace('/');
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error, AUTH_ERROR_MESSAGES) });
      setSubmitting(false);
    }
  };

  return { onFinish, submitting };
}
