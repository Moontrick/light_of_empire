import { useEffect } from 'react';
import { useAuthStore } from '@store/authStore';

export function useAuthShell() {
  const pending = useAuthStore((state) => state.pendingVerification);
  const cancelVerification = useAuthStore((state) => state.cancelVerification);

  // Экран кода живёт только внутри auth-страниц: ушли со страницы — сбрасываем шаг
  useEffect(() => cancelVerification, [cancelVerification]);

  return { pending, cancelVerification };
}
