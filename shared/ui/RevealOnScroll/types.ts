import type { ReactNode } from 'react';

export type RevealOnScrollTag = 'div' | 'li' | 'span';

export interface RevealOnScrollProps {
  children?: ReactNode;
  as?: RevealOnScrollTag;
  className?: string;
  delay?: number;
  // Сдвиг, с которого элемент выезжает. Передавайте 0 элементам, чью позицию
  // задаёт CSS-transform — framer-motion перебивает его своим.
  x?: number;
}
