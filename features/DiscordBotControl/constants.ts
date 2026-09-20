import { DiscordSettingCode } from '@/shared/api/discordBot';

export const SETTINGS_ERRORS: Record<number, string> = {
  403: 'Недостаточно прав',
  404: 'Настройка не найдена — обновите страницу',
};

export const CHANNEL_ERRORS: Record<number, string> = {
  400: 'Некорректный ID канала',
  403: 'Недостаточно прав',
  404: 'Канал с таким ID не найден — проверьте, что бот есть на сервере',
};

// Настройки-каналы: перед записью показываем модалку с именем канала.
// channel — родительный падеж для заголовка, subject — что именно туда уходит.
export const CHANNEL_SETTING_LABELS: Partial<
  Record<DiscordSettingCode, { channel: string; subject: string }>
> = {
  [DiscordSettingCode.NEWS_CHANNEL_ID]: { channel: 'канал новостей', subject: 'Новости' },
  [DiscordSettingCode.COMBAT_OPERATIONS_CHANNEL_ID]: {
    channel: 'канал боевых операций',
    subject: 'Боевые операции',
  },
};
