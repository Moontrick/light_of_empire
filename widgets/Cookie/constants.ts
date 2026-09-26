import { CookieRow } from "./types";

export const COOKIES: CookieRow[] = [
  { name: 'session_id', type: 'Технический', purpose: 'Идентификация сессии пользователя', duration: 'До закрытия браузера' },
  { name: 'cookie_consent', type: 'Функциональный', purpose: 'Запоминание согласия на cookie', duration: '1 год' },
  { name: '_ga', type: 'Аналитический', purpose: 'Google Analytics — статистика посещений', duration: '2 года' },
  { name: '_gid', type: 'Аналитический', purpose: 'Google Analytics — сессия', duration: '24 часа' },
  { name: '_ym_uid', type: 'Аналитический', purpose: 'Яндекс.Метрика — идентификатор', duration: '1 год' },
  { name: '_fbp', type: 'Маркетинговый', purpose: 'Facebook Pixel — таргетинг рекламы', duration: '3 месяца' },
];

export const SECTIONS = [
  { id: 'general', title: '1. Общие положения' },
  { id: 'what', title: '2. Что такое файлы Cookie' },
  { id: 'types', title: '3. Какие файлы Cookie мы используем' },
  { id: 'list', title: '4. Конкретные файлы Cookie' },
  { id: 'manage', title: '5. Управление файлами Cookie' },
  { id: 'third', title: '6. Cookie третьих лиц' },
  { id: 'legal', title: '7. Правовые основания' },
  { id: 'share', title: '8. Передача данных' },
  { id: 'changes', title: '9. Изменения в Политике' },
//   { id: 'contacts', title: '10. Контакты' },
];
