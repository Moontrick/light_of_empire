export enum DiscordSettingCode {
  NEWS_CHANNEL_ID = 'NEWS_CHANNEL_ID',
  EMBED_COLOR = 'EMBED_COLOR',
  BRAND = 'BRAND',
}

export interface DiscordSettingDto {
  code: DiscordSettingCode;
  description: string;
  // null — в БД не задано, действует default_value
  value: string | null;
  // null — встроенного дефолта нет, параметр обязателен
  default_value: string | null;
  is_set: boolean;
  changed_at: string | null;
}

export interface UpdateDiscordSettingDto {
  // null сбрасывает параметр к дефолту
  value: string | null;
}
