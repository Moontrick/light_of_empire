import type { NavNode } from './types';

export { SITE_TITLE } from '@/shared/constants';

export const MOBILE_QUERY = '(max-width: 900px)';

// Диапазон 901–1200px: бургер ещё не включился (см. MOBILE_QUERY), но полная
// горизонтальная навигация (логотип + 6 пунктов + ServerBadge) уже не помещается.
// 1200px выбран так, чтобы сворачивание срабатывало раньше, чем CSS-точка 1100px
// в CharterHeader.module.scss (там просто уменьшаются отступы .bar) — тем самым
// компактный режим и уменьшение паддингов не конфликтуют, а дополняют друг друга.
export const COMPACT_QUERY = '(max-width: 1200px)';

// Сколько пунктов верхнего уровня остаются видимыми в компактном режиме
// до пункта «Прочее» (Главная, Устав ИА).
export const COMPACT_VISIBLE_COUNT = 2;

export const MORE_LABEL = 'Прочее';

// Клик по самому пункту «Прочее» ведёт на хаб-страницу раздела, а не на первую
// из свёрнутых ссылок — иначе он уводил бы на случайный пункт вроде «Новостей».
export const MORE_HREF = '/extra';

export const NAV_ITEMS: NavNode[] = [
  { label: 'Главная', href: '/' },
  { label: 'Устав ИА', href: '/ustav' },
  { label: 'Новости', href: '/news' },
  { label: 'Хроника', href: '/chronicle' },
];
