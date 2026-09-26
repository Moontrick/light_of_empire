import { getCoverUrl } from '../getCoverUrl';

// src блока image бывает трёх видов: путь в наш image-service (нужен хост API),
// внешняя ссылка и data-URL в старых записях — последние отдаём как есть
export function resolveImageSrc(src: string | null | undefined): string | null {
  if (!src) return null;
  if (src.startsWith('/api/')) return getCoverUrl(src);
  return src;
}
