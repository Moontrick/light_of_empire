'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  setThemeMode,
  subscribeTheme,
} from './themeStore';

export function useTheme() {
  const { mode, resolved } = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  // Из system переключает в явный режим, противоположный текущему виду
  const toggle = useCallback(
    () => setThemeMode(resolved === 'dark' ? 'light' : 'dark'),
    [resolved],
  );

  return {
    mode, // 'light' | 'dark' | 'system' — выбор пользователя
    resolved, // 'light' | 'dark' — что на экране
    isDark: resolved === 'dark',
    setMode: setThemeMode,
    toggle,
  };
}