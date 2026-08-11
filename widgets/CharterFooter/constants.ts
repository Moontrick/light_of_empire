import { IconDiscord } from '@/public/icons/IconDiscord';
import { IconVK } from '@/public/icons/IconVK';
import { IconSteam } from '@/public/icons/IconSteam';
import { IconGarrys } from '@/public/icons/IconGarrys';
import { CONNECT_URL } from '@/shared/constants';
import type { FooterColumnData, FooterSocial } from './types';

export const FOOTER_TITLE = 'LIGHT OF EMPIRE';

export const FOOTER_TAGLINE =
  'Галактическая Империя устанавливает Новый Порядок.';

export const FOOTER_COPYRIGHT = '© 2026 The Light of Empire. Все права защищены.';

export const FOOTER_NOTE = 'By Canto Projects';

const DISCORD_URL = 'https://discord.gg/Bzs8dA6NQ6';
const VK_URL = 'https://vk.ru/thelightofempire';
const STEAM_COLLECTION_URL = 'https://steamcommunity.com/sharedfiles/filedetails/?id=3772309446';

export { SERVER_ADDRESS, SERVER_ADDRESS_IP, CONNECT_URL_IP } from '@/shared/constants';
export { CONNECT_URL };

export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: 'Discord', href: DISCORD_URL, icon: IconDiscord, external: true },
  { label: 'ВКонтакте', href: VK_URL, icon: IconVK, external: true },
  { label: 'Подключиться к серверу', href: CONNECT_URL, icon: IconGarrys },
  { label: 'Коллекция Steam', href: STEAM_COLLECTION_URL, icon: IconSteam, external: true },
];

export const FOOTER_COLUMNS: FooterColumnData[] = [
  {
    title: 'Основное',
    links: [
      { label: 'Главная', href: '/' },
      { label: 'Устав ИА', href: '/ustav' },
      { label: 'Новости', href: '/news' },
      { label: 'Хроника', href: '/chronicle' },
      { label: 'Дополнительно', href: '/extra' },
    ],
  },
  {
    title: 'Документы',
    links: [
      { label: 'Устав ИА', href: '/ustav' },
      { label: 'Уголовный кодекс', href: '/criminal-code' },
      { label: 'Ликбезы', href: '/likbez' },
      { label: 'Отыгровки', href: '/roleplay' },
      { label: 'РП правила', href: '/rp-rules' },
      { label: 'Правила Discord', href: '/discord-rules' },
    ],
  },
  {
    title: 'Структуры',
    links: [
      { label: 'Высшее командование', href: '/high-command' },
      { label: 'ИББ', href: '/isb' },
      { label: 'Военная полиция', href: '/military-police' },
      { label: 'Инквизиторий', href: '/inquisitorius' },
      { label: 'Тёмные штурмовики', href: '/shadow-troopers' },
    ],
  },
  {
    title: 'Сообщество',
    links: [
      { label: 'Discord', href: DISCORD_URL, external: true },
      { label: 'ВКонтакте', href: VK_URL, external: true },
      { label: 'Коллекция Steam', href: STEAM_COLLECTION_URL, external: true },
    ],
  },
];
