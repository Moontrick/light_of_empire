export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeState {
  /** Что выбрал пользователь */
  mode: ThemeMode;
  /** Что реально показано (system → light/dark по ОС) */
  resolved: ResolvedTheme;
}

export const THEME_STORAGE_KEY = 'bf-theme-mode';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// На сервере ОС и localStorage неизвестны
const SERVER_STATE: ThemeState = { mode: 'system', resolved: 'light' };

const listeners = new Set<() => void>();
let mode: ThemeMode | null = null; // null — storage ещё не прочитан
let state: ThemeState = SERVER_STATE;

const isThemeMode = (v: unknown): v is ThemeMode =>
  v === 'light' || v === 'dark' || v === 'system';

function readStoredMode(): ThemeMode {
  try {
    const v = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(v) ? v : 'system';
  } catch {
    return 'system'; // приватный режим, запрет cookies и т.п.
  }
}

function applyToDocument(next: ThemeMode) {
  const root = document.documentElement;
  if (next === 'system') root.removeAttribute('data-mode');
  else root.setAttribute('data-mode', next);
}

export function getThemeSnapshot(): ThemeState {
  if (mode === null) mode = readStoredMode();

  const resolved: ResolvedTheme =
    mode === 'system'
      ? window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
      : mode;

  // Новый объект — только при реальном изменении (требование useSyncExternalStore)
  if (state.mode !== mode || state.resolved !== resolved) {
    state = { mode, resolved };
  }
  return state;
}

export const getServerThemeSnapshot = () => SERVER_STATE;

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);

  const media = window.matchMedia(DARK_QUERY);

  // Синхронизация между вкладками
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== THEME_STORAGE_KEY) return;
    mode = isThemeMode(e.newValue) ? e.newValue : 'system';
    applyToDocument(mode);
    listener();
  };

  media.addEventListener('change', listener); // смена темы ОС
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function setThemeMode(next: ThemeMode) {
  mode = next;
  try {
    if (next === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    /* тема применится, но не сохранится */
  }
  applyToDocument(next);
  listeners.forEach((l) => l());
}