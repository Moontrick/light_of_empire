import type { FooterColumnData, FooterSocial } from './types';

export const FOOTER_TITLE = 'LIGHT OF EMPIRE';

export const FOOTER_TAGLINE =
  'Галактическая Империя устанавливает Новый Порядок.';

export const FOOTER_COPYRIGHT = '© 2026 The Light of Empire. Все права защищены.';

export const FOOTER_NOTE = 'By Canto Projects';

const DISCORD_URL = 'https://discord.gg/Bzs8dA6NQ6';

export const FOOTER_SOCIALS: FooterSocial[] = [{ label: 'Discord', href: DISCORD_URL }];

export const FOOTER_COLUMNS: FooterColumnData[] = [
  {
    title: 'Основное',
    links: [
      { label: 'Главная', href: '/' },
      { label: 'Устав ИА', href: '/ustav' },
      { label: 'Новости', href: '/news' },
      { label: 'Структуры', href: '/structures' },
    ],
  },
  {
    title: 'Структуры',
    links: [
      { label: 'Высшее командование', href: '/high-command' },
      { label: 'ИСБ', href: '/isb' },
      { label: 'Военная полиция', href: '/military-police' },
      { label: 'Инквизиторий', href: '/inquisitorius' },
      { label: 'Тёмные штурмовики', href: '/shadow-troopers' },
    ],
  },
  {
    title: 'Сообщество',
    links: [{ label: 'Discord', href: DISCORD_URL, external: true }],
  },
];
