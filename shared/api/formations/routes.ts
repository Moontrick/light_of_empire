export const FORMATIONS_ROUTES = {
  LIST: '/formations',
  CREATE: '/formations',
  UPDATE: (id: number) => `/formations/${id}`,
  DELETE: (id: number) => `/formations/${id}`,
} as const;
