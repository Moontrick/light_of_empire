import type { ReactNode } from 'react';

export type CaseRarity = 'default' | 'rare' | 'epic' | 'legendary';

export interface CaseNodeItemType {
  item: ReactNode;
  // Цвет тира: подсветка и полоса на карточке, цвет иконки
  accent: string;
  rare?: CaseRarity;
  // Подпись приза: в модалке выигрыша и списке призов
  label?: string;
}

// Куда крутить: лента и индекс выигрышного предмета в ней
export interface CaseSpinTarget {
  items: number[];
  winningPosition: number;
}

// Выпавший приз: его значение в ленте и как его рисовать
export interface CaseReward {
  value: number;
  node: CaseNodeItemType;
}

export interface CaseRouletteProps {
  items: number[];
  // Как рисовать предмет по его значению; без карты показываем само число
  itemsNode?: Record<number, CaseNodeItemType> | null;
  // Индекс выигрышного предмета в items
  winningPosition: number;
  // Размер карточки приза, px; высота по умолчанию равна ширине
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  // Длительность основного прокрута, сек
  duration?: number;
  price: number;
  // Блокирует прокрут снаружи, например когда не хватает кредитов
  disabled?: boolean;
  // Вызывается по кнопке до прокрута: получает новую ленту и победителя
  // (например, с бэка). Прокрут идёт по возвращённому значению, а не по пропсам,
  // чтобы не зависеть от того, успел ли родитель перерендериться.
  onStart?: () => Promise<CaseSpinTarget>;
  onFinish?: (item: number) => void;
}

export interface VisualItem {
  value: number;
  visualIndex: number;
}
