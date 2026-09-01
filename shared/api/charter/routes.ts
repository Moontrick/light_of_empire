export const CHARTER_ROUTES = {
  CHARTER: '/charter',
  SECTIONS: '/charter/sections',
  SECTION: (id: number) => `/charter/sections/${id}`,
  SECTIONS_ORDER: '/charter/sections/order',
} as const;
