export const DISCORD_URL = 'https://discord.gg/Bzs8dA6NQ6';

export interface HeroSlide {
  id: string;
  // Подпись сегмента в переключателе под hero
  menuLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  location: { name: string; sub: string };
}

// Быстрые страницы-слайды hero. Фон и контент меняются при переключении.
// Конфиг временный — будем дополнять.
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'home',
    menuLabel: 'Главная',
    eyebrow: '20 лет после провозглашения Империи',
    title: 'The Light of Empire',
    subtitle: 'Новый Порядок',
    description:
      '20 год после 66 приказа. Галактическая Империя устанавливает Новый Порядок — вступай в ряды Имперской Армии и впиши имя в историю галактики.',
    ctaLabel: 'Читать устав',
    ctaHref: '/ustav',
    image: '/images/viktor-blanke-trooper-helmetlookdev-02.jpg',
    location: { name: 'Имперская Армия', sub: '' },
  },
  {
    id: 'ustav',
    menuLabel: 'Устав',
    eyebrow: 'Документация',
    title: 'Устав ИА',
    subtitle: 'Дисциплина · субординация · долг',
    description:
      'Полный свод правил Имперской Армии: структура командования, права и обязанности, дисциплина и специальные службы.',
    ctaLabel: 'Открыть устав',
    ctaHref: '/ustav',
    image: '/images/2d9aca9c6ce189ebb8b59a9088c033d4.jpg',
    location: { name: 'Корусант', sub: 'Галактическое ядро' },
  },
  {
    id: 'chronicle',
    menuLabel: 'Хроника',
    eyebrow: 'История проекта',
    title: '34-я Ударная эскадра «Пепел»',
    subtitle: 'После падения Звезды Смерти',
    description:
      'После уничтожения Звезды Смерти Империя начала операцию «Имперский удар». 34-я Ударная эскадра «Пепел» развернулась у фондорских верфей для наведения порядка во Внешнем кольце.',
    ctaLabel: 'Читать хронику',
    ctaHref: '/chronicle',
    image: '/images/MUt4Z5vhpjztTGkuf5q548-1920-80.jpg',
    location: { name: 'Фондор', sub: 'Верфи Галактической Империи' },
  },
  {
    id: 'isb',
    menuLabel: 'ИББ',
    eyebrow: 'Структуры',
    title: 'ИББ',
    subtitle: 'Имперская служба безопасности',
    description:
      'Надзор за лояльностью личного состава, выявление измены, саботажа и мятежа, проведение трибуналов.',
    ctaLabel: 'Подробнее',
    ctaHref: '/imperskaya-sluzhba-bezopasnosti',
    image: '/images/190363632-1751414660.jpg',
    location: { name: 'Сектор', sub: 'Под наблюдением ИББ' },
  },
  {
    id: 'inquisitorius',
    menuLabel: 'Инквизиторий',
    eyebrow: 'Структуры',
    title: 'Инквизиторий',
    subtitle: 'Охотники на джедаев',
    description:
      'Одарённые Силой агенты лорда Вейдера, направленные на выявление и уничтожение выживших джедаев.',
    ctaLabel: 'Подробнее',
    ctaHref: '/inkvizitoriy',
    image: '/images/4bb9c92166a27b3928297491fbec64af.jpg',
    location: { name: 'Засекречено', sub: 'Инквизиторий' },
  },
];
