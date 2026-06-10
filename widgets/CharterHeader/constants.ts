import type { NavNode } from './types';

export const SITE_TITLE = 'LIGHT OF EMPIRE';

export const MOBILE_QUERY = '(max-width: 900px)';

export const NAV_ITEMS: NavNode[] = [
  { label: 'Главная', href: '/' },
  { label: 'Устав ИА', href: '/ustav' },
  { label: 'Новости', href: '/news' },
  {
    label: 'Структуры',
    href: '/structures',
    children: [
      { label: 'Высшее командование', href: '/high-command' },
      { label: 'ИСБ', href: '/isb' },
      { label: 'Военная полиция', href: '/military-police' },
      { label: 'Инквизиторий', href: '/inquisitorius' },
      { label: 'Корпус тёмных штурмовиков', href: '/shadow-troopers' },
    ],
  },
  {
    label: 'Дополнительно',
    href: '/extra',
    children: [
      { label: 'Вооружение', href: '#' },
      {
        label: 'Техника',
        href: '#',
        children: [
          { label: 'Имперская техника', href: '#' },
          { label: 'Техника противника', href: '#' },
        ],
      },
      {
        label: 'Дроиды',
        href: '#',
        children: [
          { label: 'Имперские дроиды', href: '#' },
          { label: 'Дроиды противника', href: '#' },
        ],
      },
    ],
  },
];
