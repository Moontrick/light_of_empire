import type { DiscordSettingCode } from '@/shared/api/discordBot';

export interface ChannelConfirmTarget {
  code: DiscordSettingCode;
  channelId: string;
  channelName: string;
}
