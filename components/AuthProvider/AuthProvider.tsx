'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@store/authStore';

export function AuthProvider() {
  const initSession = useAuthStore((state) => state.initSession);

  useEffect(() => {
    void initSession();
  }, [initSession]);

  return null;
}
