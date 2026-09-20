export const PURCHASES_ROUTES = {
  CREATE: '/purchases',
  MY: '/purchases/me',
  LIST: '/purchases',
  STATUS: (id: number) => `/purchases/${id}/status`,
} as const;
