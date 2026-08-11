import type { NavNode } from './types';

export const SITE_TITLE = 'LIGHT OF EMPIRE';

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
  { label: 'Уголовный кодекс', href: '/criminal-code' },
  {
    label: 'Структуры',
    href: '/structures',
    children: [
      { label: 'Высшее командование', href: '/high-command' },
      { label: 'ИББ', href: '/isb' },
      { label: 'Военная полиция', href: '/military-police' },
      { label: 'Инквизиторий', href: '/inquisitorius' },
      { label: 'Корпус тёмных штурмовиков', href: '/shadow-troopers' },
    ],
  },
  {
    label: 'Дополнительно',
    href: '/extra',
    children: [
     
      { label: 'Ликбезы', href: '/likbez' },
      { label: 'Отыгровки', href: '/roleplay' },
      { label: 'РП правила', href: '/rp-rules' },
      { label: 'Правила Discord', href: '/discord-rules' },
      // { label: 'Вооружение', href: '#' },
      // {
      //   label: 'Техника',
      //   href: '#',
      //   children: [
      //     { label: 'Имперская техника', href: '#' },
      //     { label: 'Техника противника', href: '#' },
      //   ],
      // },
      // {
      //   label: 'Дроиды',
      //   href: '#',
      //   children: [
      //     { label: 'Имперские дроиды', href: '#' },
      //     { label: 'Дроиды противника', href: '#' },
      //   ],
      // },
    ],
  },
];
