'use client';

import { useYandexMetrikaHits } from './hooks/useYandexMetrikaHits';

// Клиентские переходы App Router не перезагружают страницу — просмотры шлём сами
export function YandexMetrikaHits() {
  useYandexMetrikaHits();
  return null;
}
