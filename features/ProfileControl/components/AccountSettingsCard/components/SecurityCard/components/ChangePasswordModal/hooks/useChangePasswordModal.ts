import { useState } from 'react';
import { Form } from 'antd';
import { useRouter } from '@/shared/i18n/navigation';
import { usersApi } from '@/shared/api/users';
import { useAuthStore } from '@store/authStore';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { PASSWORD_ERROR_MESSAGES } from '@features/ProfileControl/constants';
import type { ChangePasswordFormValues } from '../types';

export function useChangePasswordModal(onClose: () => void) {
  const router = useRouter();
  const reset = useAuthStore((state) => state.reset);
  const [form] = Form.useForm<ChangePasswordFormValues>();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: ChangePasswordFormValues) => {
    setSubmitting(true);
    try {
      await usersApi.changePassword({
        current_password: values.current_password,
        new_password: values.new_password,
      });
      onClose();
      // Бэкенд отзывает все refresh-сессии — доступ дальше только через новый вход
      alertHandler.addAlert({
        status: 'success',
        defaultText: 'Пароль изменён — войдите заново',
      });
      reset();
      router.replace('/login');
    } catch (error) {
      alertHandler.addAlert({
        defaultText: getApiErrorMessage(error, PASSWORD_ERROR_MESSAGES),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { form, onFinish, submitting };
}
