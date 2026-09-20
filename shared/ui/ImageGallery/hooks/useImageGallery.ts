import { useState } from 'react';
import type { GalleryImage } from '../types';

export function useImageGallery(images: GalleryImage[]) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Если выбранная картинка исчезла (сменился товар) — показываем первую
  const selected = images.find((image) => image.id === selectedId) ?? images[0] ?? null;

  return { selected, select: setSelectedId };
}
