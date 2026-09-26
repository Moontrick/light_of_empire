import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { usersApi } from '@/shared/api/users';
import { useAuthStore } from '@store/authStore';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';

const MAX_AVATAR_BYTES = 25 * 1024 * 1024;

// Быстрая проверка до запроса; формат по содержимому и ресайз делает бэк
const getFileProblem = (file: File): string | null => {
  if (!file.type.startsWith('image/')) return 'Можно загрузить только картинку';
  if (file.size > MAX_AVATAR_BYTES) return 'Файл больше 25 МБ';
  return null;
};

export function useAvatarEditor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const [uploading, setUploading] = useState(false);

  const openFileDialog = () => inputRef.current?.click();

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Сбрасываем value, иначе повторный выбор того же файла не вызовет change
    event.target.value = '';
    if (!file) return;

    const problem = getFileProblem(file);
    if (problem) {
      alertHandler.addAlert({ defaultText: problem });
      return;
    }

    setUploading(true);
    try {
      await usersApi.uploadAvatar(file);
      await fetchMe();
      alertHandler.addAlert({ status: 'success', defaultText: 'Аватар обновлён' });
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setUploading(false);
    }
  };

  return { inputRef, uploading, openFileDialog, onFileChange };
}
