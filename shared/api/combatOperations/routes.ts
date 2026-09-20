export const COMBAT_OPERATIONS_ROUTES = {
  LIST: '/combat-operations',
  CREATE: '/combat-operations',
  DETAIL: (slug: string) => `/combat-operations/${slug}`,
  UPDATE: (id: number) => `/combat-operations/${id}`,
  ARCHIVE: (id: number) => `/combat-operations/${id}`,
  SEND_TO_DISCORD: (id: number) => `/combat-operations/${id}/send_to_discord`,
  CHANGE_SEND_TO_DISCORD_STATUS: (id: number) =>
    `/combat-operations/${id}/change_send_to_discord_status`,
} as const;
