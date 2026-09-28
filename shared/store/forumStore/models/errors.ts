import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { getError } from '@/shared/utils/getError';

// Тексты бэка стабильны (docs/forum-api.md, «Сводка ошибок») — ветвимся по ним
const MESSAGE_TEXTS: Record<string, string> = {
  'Thread was changed concurrently': 'Тему только что изменили. Данные обновлены, повторите действие',
  'Thread is not open for posting': 'Тема закрыта для новых комментариев',
  'Thread is not open for editing': 'Тема закрыта для правок',
  'Invalid transition': 'Такой переход статуса невозможен. Данные обновлены',
  'Category is archived': 'Раздел в архиве, выберите другой',
  'Nothing to update': 'Нет изменений для сохранения',
  'reason is required to lock a thread': 'Укажите причину блокировки',
  'reply_to_id must be a post of the same thread': 'Комментарий для ответа не найден в этой теме',
  'Category is not empty: move or delete its threads first':
    'В разделе есть темы, включая удалённые. Сначала перенесите их',
  'ids must contain every category exactly once': 'Порядок устарел. Обновите страницу',
  'Slug is already taken, please retry': 'Раздел с таким названием уже есть, измените название',
};

// После этих ошибок тему нужно перечитать: её статус изменился с момента загрузки
const RELOAD_MESSAGES = new Set([
  'Thread was changed concurrently',
  'Thread is not open for posting',
  'Thread is not open for editing',
  'Invalid transition',
]);

const STATUS_TEXTS: Record<number, string> = {
  401: 'Войдите, чтобы продолжить',
  403: 'Недостаточно прав',
  404: 'Не найдено. Обновите страницу',
};

export function getForumErrorText(error: unknown): string {
  const raw = getError(error);
  if (raw) {
    if (MESSAGE_TEXTS[raw]) return MESSAGE_TEXTS[raw];
    if (raw.startsWith('Too many images')) return 'Слишком много картинок';
    if (raw.startsWith('Unknown tag ids')) return 'Некоторые теги больше не существуют. Обновите страницу';
    if (raw.startsWith('Image ') && raw.endsWith('is not uploaded')) {
      return 'Одна из картинок не загружена. Прикрепите её заново';
    }
    if (raw.startsWith('Tag "')) return 'Тег с таким названием уже есть';
    if (raw.startsWith('Slug "')) return 'Раздел с таким названием уже есть, измените название';
    if (raw.startsWith('Formation #')) return 'Формирование не найдено. Обновите страницу';
  }
  return getApiErrorMessage(error, STATUS_TEXTS);
}

export function shouldReloadThread(error: unknown): boolean {
  const raw = getError(error);
  return Boolean(raw && RELOAD_MESSAGES.has(raw));
}
