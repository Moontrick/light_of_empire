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
    eyebrow: 'Galactic Empire · 18 ДО ДБЯ',
    title: 'Light of Empire',
    subtitle: 'Light of Empire — Новый Порядок',
    description:
      'Год после 66 приказа. Галактическая Империя устанавливает Новый Порядок — вступай в ряды Имперской Армии и впиши имя в историю галактики.',
    ctaLabel: 'Читать устав',
    ctaHref: '/ustav',
    image: '/images/destroer.jpg',
    location: { name: 'Корусант', sub: 'Галактическое ядро' },
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
    location: { name: 'Имперский флот', sub: 'Звёздный разрушитель' },
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
    location: { name: 'Засекречено', sub: 'Приоритет — Инквизиторий' },
  },
];

export interface NewsItem {
  id: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
}

export const NEWS: NewsItem[] = [
  {
    id: 'order-66',
    date: '06.06.2026',
    tag: 'Лор',
    title: 'Год после 66 приказа',
    excerpt:
      'Республика пала. Галактическая Империя устанавливает Новый Порядок и берёт под контроль ключевые сектора.',
  },
  {
    id: 'charter',
    date: '01.06.2026',
    tag: 'Обновление',
    title: 'Новый воинский устав',
    excerpt:
      'Полностью обновлённый устав Имперской Армии: структура командования, ИСБ, Инквизиторий и Корпус тёмных штурмовиков.',
  },
  {
    id: 'recruit',
    date: '28.05.2026',
    tag: 'Набор',
    title: 'Открыт набор в гарнизон',
    excerpt:
      'Имперская Армия принимает новобранцев. Пройди курс молодого бойца и займи своё место в строю.',
  },
];
