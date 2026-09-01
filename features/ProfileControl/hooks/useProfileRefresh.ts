import { useEffect } from 'react';
import { useAuthStore } from '@store/authStore';

// Должность/формирование меняет админ — при заходе в профиль перечитываем /auth/me
export function useProfileRefresh() {
  const status = useAuthStore((state) => state.status);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    if (status !== 'authenticated') return;

    fetchMe().catch(() => {
      // Мёртвую сессию (401) интерцептор уже перевёл в гостя — гвард уведёт на вход;
      // при сетевой ошибке показываем данные из стора, а не алерт
    });
  }, [status, fetchMe]);
}
