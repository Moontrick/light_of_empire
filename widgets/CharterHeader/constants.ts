import type { NavNode } from './types';

export { SITE_TITLE } from '@/shared/constants';

export const MOBILE_QUERY = '(max-width: 900px)';

// Пункты приходят с бэка, поэтому сворачивание в «Прочее» считается по факту:
// хук useNavOverflow измеряет ширину и оставляет столько пунктов, сколько влезает,
// но не меньше этого минимума (Главная, Устав ИА).
export const MIN_VISIBLE_COUNT = 2;

export const MORE_LABEL = 'Прочее';

// Клик по самому пункту «Прочее» ведёт на хаб-страницу раздела, а не на первую
// из свёрнутых ссылок — иначе он уводил бы на случайный пункт вроде «Новостей».
export const MORE_HREF = '/extra';

// Узел для измерения ширины «Прочее» в тени меню: children нужны ради карета
export const MORE_GHOST_NODE: NavNode = {
  label: MORE_LABEL,
  href: MORE_HREF,
  children: [{ label: MORE_LABEL }],
};

export const NAV_ITEMS: NavNode[] = [
  { label: 'Главная', href: '/' },
  { label: 'Устав ИА', href: '/ustav' },
  { label: 'Новости', href: '/news' },
  { label: 'Хроника', href: '/chronicle' },
  { label: 'Донат', href: '/donations' },
];
