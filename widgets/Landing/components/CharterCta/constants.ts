import { DISCORD_URL } from '../../data';
import type { CtaCardData } from './types';

export const CTA_EYEBROW = 'Документация';

export const CTA_TITLE = 'Воинский устав Имперской Армии';

export const CTA_TEXT =
  'Всё, что должен знать каждый военнослужащий Нового Порядка — от структуры командования до специальных служб.';

export const CTA_CARDS: CtaCardData[] = [
  {
    id: 'ustav',
    eyebrow: 'Устав',
    title: 'Воинский устав ИА',
    text: 'Структура командования, права и обязанности, дисциплина и порядок прохождения службы в Имперской Армии.',
    href: '/ustav',
    ctaLabel: 'Открыть устав',
    variant: 'primary',
  },
  {
    id: 'structures',
    eyebrow: 'Структуры',
    title: 'Подразделения и службы',
    text: 'Высшее командование, ИСБ, военная полиция, Инквизиторий и Корпус тёмных штурмовиков — кто за что отвечает.',
    href: '/structures',
    ctaLabel: 'Смотреть',
  },
  {
    id: 'discord',
    eyebrow: 'Сообщество',
    title: 'Discord проекта',
    text: 'Основной канал связи: набор в подразделения, новости, общение и координация личного состава.',
    href: DISCORD_URL,
    ctaLabel: 'Discord',
    external: true,
    discord: true,
  },
];
