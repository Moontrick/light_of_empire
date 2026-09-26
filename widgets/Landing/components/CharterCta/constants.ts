import { DISCORD_URL } from '../../data';
import type { CtaCardData } from './types';

export const CTA_EYEBROW = 'Документы';

export const CTA_TITLE = 'Хроника Империи';

export const CTA_TEXT =
  'Всё, что должен знать каждый военнослужащий — от структуры командования и правил отыгровки до летописи военного похода.';

export const CTA_DYNAMIC_COUNT = 2;
export const CTA_DYNAMIC_LABEL = 'Открыть';
export const CTA_DYNAMIC_EYEBROW = 'Документы';

export const CTA_FALLBACK_EMBLEM = '/images/Imperial_Emblem.svg';

export const CTA_STATIC_CARDS: CtaCardData[] = [
  {
    id: 'ustav',
    eyebrow: 'Устав',
    title: 'Воинский устав ИА',
    text: 'Структура командования, права и обязанности, дисциплина и порядок прохождения службы в Имперской Армии.',
    href: '/ustav',
    ctaLabel: 'Открыть устав',
    image: '/images/d1efa08bc7bbacef158020cf5a50e41c.jpg',
    variant: 'primary',
  },
  {
    id: 'chronicle',
    eyebrow: 'Хроника',
    title: 'Хроника военного похода',
    text: 'Летопись 34-й Ударной эскадры «Пепел»: сражение у верфей Фондора, высадка на Сон-Туула и ход операции «Имперский удар».',
    href: '/chronicle',
    ctaLabel: 'Читать хронику',
    image: '/images/andrew-svanberg-hamilton-battlefront-22.jpg',
  },
  {
    id: 'news',
    eyebrow: 'Новости',
    title: 'Новости Империи',
    text: 'Приказы командования, анонсы тестирований, планы развития проекта и состав команды.',
    href: '/news',
    ctaLabel: 'К новостям',
    image: '/images/andrew-svanberg-hamilton-battlefront-24.jpg',
  },
];

export const CTA_DISCORD_CARD: CtaCardData = {
  id: 'discord',
  eyebrow: 'Сообщество',
  title: 'Discord проекта',
  text: 'Основной канал связи: набор в подразделения, новости, общение и координация личного состава.',
  href: DISCORD_URL,
  ctaLabel: 'Discord',
  image: '/images/17-03-09-16-35_0_starwars_battlefront.jpg',
  external: true,
  discord: true,
};
