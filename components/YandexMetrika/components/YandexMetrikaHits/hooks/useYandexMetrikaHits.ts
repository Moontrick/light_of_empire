import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { YANDEX_METRIKA_ID } from '@/shared/seo';

declare global {
  interface Window {
    ym?: (id: number, method: string, url?: string) => void;
  }
}

export function useYandexMetrikaHits() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRender = useRef(true);

  useEffect(() => {
    // Первый просмотр счётчик отправляет сам при init — иначе он задвоится
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (typeof window.ym !== 'function') return;

    const query = searchParams.toString();
    window.ym(YANDEX_METRIKA_ID, 'hit', query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);
}
