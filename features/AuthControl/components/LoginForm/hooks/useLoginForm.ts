import { useState } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { alertHandler } from '@/shared/utils/alertHandler';
import type { LoginDto } from '@/shared/api/auth';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { AUTH_ERROR_MESSAGES } from '../../../constants';

export function useLoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: LoginDto) => {
    setSubmitting(true);
    try {
      await login(values);
      alertHandler.addAlert({ status: 'success', defaultText: 'С возвращением, солдат' });
      router.replace('/');
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error, AUTH_ERROR_MESSAGES) });
      setSubmitting(false);
    }
  };

  return { onFinish, submitting };
}
