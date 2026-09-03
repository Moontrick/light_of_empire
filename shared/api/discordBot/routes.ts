export const DISCORD_BOT_ROUTES = {
  CHANNEL_NAME: '/discordBot/channel-name',
  SETTINGS: '/discordBot/settings',
  UPDATE_SETTING: (code: string) => `/discordBot/settings/${code}`,
} as const;
