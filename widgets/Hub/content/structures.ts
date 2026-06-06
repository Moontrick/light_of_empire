import type { HubContent } from '../types';

export const structuresContent: HubContent = {
  eyebrow: 'Light of Empire',
  title: 'Структуры Империи',
  intro:
    'Командование и специальные службы Галактической Империи — выбери раздел, чтобы изучить устав структуры.',
  cards: [
    {
      title: 'Высшее командование',
      description: 'Имперский совет, кабинет, секториальные ведомства и военные коменданты.',
      href: '/high-command',
    },
    {
      title: 'Имперская служба безопасности',
      description: 'Надзор за лояльностью, выявление измены, проведение трибуналов.',
      href: '/isb',
    },
    {
      title: 'Военная полиция',
      description: 'Порядок на объектах, задержания, расследования и КПЗ.',
      href: '/military-police',
    },
    {
      title: 'Инквизиторий',
      description: 'Одарённые Силой агенты лорда Вейдера — охотники на джедаев.',
      href: '/inquisitorius',
    },
    {
      title: 'Корпус тёмных штурмовиков',
      description: 'Элитные тайные и специальные операции Империи.',
      href: '/shadow-troopers',
    },
  ],
};
