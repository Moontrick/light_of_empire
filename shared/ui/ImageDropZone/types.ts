export interface ImageDropZoneProps {
  // Текущая картинка; зона остаётся активной и поверх превью (перетащить — заменить)
  previewUrl?: string | null;
  previewAlt?: string;
  multiple?: boolean;
  accept?: string;
  processing?: boolean;
  disabled?: boolean;
  // Подсказка в зоне; без неё — текст по умолчанию в зависимости от multiple/previewUrl
  hint?: string;
  onFiles: (files: File[]) => void;
}
