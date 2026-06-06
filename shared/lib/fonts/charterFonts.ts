import { Russo_One, Manrope } from 'next/font/google';

// Заголовки — блочный «имперский» стиль, поддержка кириллицы.
export const russoOne = Russo_One({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--uv-font-russo',
  display: 'swap',
});

// Основной текст — чистый гротеск с хорошей кириллицей.
export const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--uv-font-manrope',
  display: 'swap',
});
