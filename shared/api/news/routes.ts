export const NEWS_ROUTES = {
  LIST: '/news',
  CREATE: '/news',
  DETAIL: (slug: string) => `/news/${slug}`,
  UPDATE: (id: number) => `/news/${id}`,
  ARCHIVE: (id: number) => `/news/${id}`,
} as const;
