import { useState } from 'react';
import { usersApi, UpdateProfileDto } from '@/shared/api/users';
import { useAuthStore } from '@store/authStore';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';

export function useAccountForm() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: UpdateProfileDto) => {
    setSubmitting(true);
    try {
      // Пустые контакты отправляются пустой строкой — omit оставил бы старое значение
      await usersApi.updateProfile({
        login: values.login,
        discord_id: values.discord_id ?? '',
        steam_url: values.steam_url ?? '',
      });
      await fetchMe();
      alertHandler.addAlert({ status: 'success', defaultText: 'Профиль обновлён' });
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return { onFinish, submitting };
}
