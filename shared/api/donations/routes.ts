export const DONATIONS_ROUTES = {
  LIST: '/donations',
  DETAIL: (id: number) => `/donations/${id}`,
  IMAGES: (id: number) => `/donations/${id}/images`,
  IMAGE: (id: number, imageId: number) => `/donations/${id}/images/${imageId}`,
} as const;
