export const POSITIONS_ROUTES = {
  LIST: '/positions',
  CREATE: '/positions',
  UPDATE: (id: number) => `/positions/${id}`,
  DELETE: (id: number) => `/positions/${id}`,
} as const;
