export const PAGES_ROUTES = {
  PAGES: '/pages',
  PAGE: (slug: string) => `/pages/${slug}`,
  PAGE_BY_ID: (id: number) => `/pages/${id}`,
  PAGES_ORDER: '/pages/order',
  PAGE_SECTIONS: (pageId: number) => `/pages/${pageId}/sections`,
  SECTION: (id: number) => `/pages/sections/${id}`,
  SECTIONS_ORDER: (pageId: number) => `/pages/${pageId}/sections/order`,
} as const;
