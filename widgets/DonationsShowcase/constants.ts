import type { DonationStep } from './types';

export const SHOWCASE_CRUMB_ROOT = 'Магазин';
export const SHOWCASE_CRUMB = 'Донат';
export const SHOWCASE_INTRO =
  'Именные персонажи, личные профессии и привилегии за кредиты Империи. Кредиты начисляет командование — за поддержку сервера и заслуги в строю.';
export const SHOWCASE_HERO_IMAGE = '/images/0b37cdaab49a502abb2c2fd54679fb1a.jpg';

export const SHOWCASE_LOGIN_TITLE = 'Войти';
export const SHOWCASE_LOGIN_SUB = 'Покупки доступны бойцам с аккаунтом';

export const SHOWCASE_FEATURED_EYEBROW = 'Лучший лот';
export const SHOWCASE_FEATURED_ACTION = 'Открыть лот';
export const SHOWCASE_CATALOG_ROOT = 'Витрина';
export const SHOWCASE_CATALOG_TITLE = 'Все товары';

// Главный лот показываем, только когда есть из чего выбирать
export const SHOWCASE_FEATURED_MIN_ITEMS = 3;

export const SHOWCASE_EMPTY = 'Товаров пока нет.';
export const SHOWCASE_ERROR = 'Не удалось загрузить товары.';
export const SHOWCASE_RETRY = 'Повторить';

export const SHOWCASE_STEPS: DonationStep[] = [
  {
    index: '01',
    title: 'Выбери товар',
    text: 'Скины, личные профессии и именные персонажи — всё за кредиты Империи.',
  },
  {
    index: '02',
    title: 'Оставь заявку',
    text: 'Укажи Steam — кредиты спишутся, а заявка уйдёт командованию на выдачу.',
  },
  {
    index: '03',
    title: 'Получи в игре',
    text: 'Командование подтверждает выдачу, статус заявки виден в личном кабинете.',
  },
];
