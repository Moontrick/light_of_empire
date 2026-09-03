export const NEWS_ROUTES = {
  LIST: '/news',
  CREATE: '/news',
  DETAIL: (slug: string) => `/news/${slug}`,
  UPDATE: (id: number) => `/news/${id}`,
  ARCHIVE: (id: number) => `/news/${id}`,
  SEND_TO_DISCORD: (id: number) => `/news/${id}/send_to_discord`,
  CHANGE_SEND_TO_DISCORD_STATUS: (id: number) => `/news/${id}/change_send_to_discord_status`,
} as const;
