import { baseService } from '../api';
import { DISCORD_BOT_ROUTES } from './routes';
import type { DiscordSettingCode, DiscordSettingDto, UpdateDiscordSettingDto } from './types';

export const discordBotApi = {
  getChannelName: (channelId: string) =>
    baseService.get<string>(DISCORD_BOT_ROUTES.CHANNEL_NAME, { params: { channelId } }),

  getSettings: () => baseService.get<DiscordSettingDto[]>(DISCORD_BOT_ROUTES.SETTINGS),

  updateSetting: (code: DiscordSettingCode, dto: UpdateDiscordSettingDto) =>
    baseService.put<DiscordSettingDto>(DISCORD_BOT_ROUTES.UPDATE_SETTING(code), dto),
};
