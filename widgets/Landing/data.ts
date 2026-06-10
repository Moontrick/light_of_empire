export const DISCORD_URL = 'https://discord.gg/Bzs8dA6NQ6';

export interface HeroSlide {
  id: string;
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
    eyebrow: 'Galactic Empire · 2 года После Провозглашения  Империи ',
    title: 'The Light of Empire',
    subtitle: 'The Light of Empire — Новый Порядок',
    description:
      'Год после 66 приказа. Галактическая Империя устанавливает Новый Порядок — вступай в ряды Имперской Армии и впиши имя в историю галактики.',
    ctaLabel: 'Читать устав',
    ctaHref: '/ustav',
    image: '/images/destroer.jpg',
    location: { name: 'Имперский флот', sub: 'Звёздный разрушитель' }

  },
  {
    id: 'ustav',
    eyebrow: 'Документация',
    title: 'Устав ИА',
    subtitle: 'Дисциплина · субординация · долг',
    description:
      'Полный свод правил Имперской Армии: структура командования, права и обязанности, дисциплина и специальные службы.',
    ctaLabel: 'Открыть устав',
    ctaHref: '/ustav',
    image: '/images/ustav.jpg',
    location: { name: 'Корусант', sub: 'Галактическое ядро' },
  },
  {
    id: 'isb',
    eyebrow: 'Структуры',
    title: 'ИСБ',
    subtitle: 'Имперская служба безопасности',
    description:
      'Надзор за лояльностью личного состава, выявление измены, саботажа и мятежа, проведение трибуналов.',
    ctaLabel: 'Подробнее',
    ctaHref: '/isb',
    image: '/images/isb.jpg',
    location: { name: 'Сектор', sub: 'Под наблюдением ИСБ' },
  },
  {
    id: 'inquisitorius',
    eyebrow: 'Структуры',
    title: 'Инквизиторий',
    subtitle: 'Охотники на джедаев',
    description:
      'Одарённые Силой агенты лорда Вейдера, направленные на выявление и уничтожение выживших джедаев.',
    ctaLabel: 'Подробнее',
    ctaHref: '/inquisitorius',
    image: '/images/inc.jpeg',
    location: { name: 'Засекречено', sub: 'Инквизиторий' },
  },
];
