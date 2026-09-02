import type { HubContent } from '../types';

export const extraContent: HubContent = {
  eyebrow: 'The Light of Empire',
  title: 'Дополнительно',
  intro:
    'Подразделения и службы Империи, памятки по отыгровке и внутренние правила проекта, а также справочники по вооружению, технике и дроидам.',
  cards: [
    {
      title: 'Структуры',
      description: 'Высшее командование, ИББ, военная полиция, Инквизиторий и Корпус тёмных штурмовиков.',
      href: '/struktury',
    },
    {
      title: 'Ликбезы',
      description: 'Памятки бойцу: позывные, откат действий, РП смерть и поддержание отыгровки.',
      href: '/likbezy',
    },
    {
      title: 'Отыгровки',
      description: 'Команды /me, /roll, /do и /advert с примерами использования на сервере.',
      href: '/otygrovki',
    },
    {
      title: 'РП правила',
      description: 'Внутренние правила проекта: отыгровки, чат, ивенты и работа администрации.',
      href: '/vnutrennie-pravila-proekta',
    },
    {
      title: 'Правила Discord',
      description: 'Нормы поведения и требования на Discord-сервере проекта.',
      href: '/pravila-discord-servera',
    },
    {
      title: 'Вооружение',
      description: 'Стандартное и специальное вооружение Имперской Армии.',
      href: '#',
      soon: true,
    },
    {
      title: 'Техника',
      description: 'Имперская техника и техника противника.',
      href: '#',
      soon: true,
    },
    {
      title: 'Дроиды',
      description: 'Имперские и вражеские дроиды.',
      href: '#',
      soon: true,
    },
  ],
};
