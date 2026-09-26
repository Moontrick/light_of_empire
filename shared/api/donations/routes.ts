export const DONATIONS_ROUTES = {
  LIST: '/donations',
  DETAIL: (id: number) => `/donations/${id}`,
  // POST multipart (поле image); картинки раздаёт /image-service, GET по этому пути нет
  IMAGES: (id: number) => `/donations/${id}/images`,
  DELETE_IMAGE: (id: number, imageId: number) => `/donations/${id}/images/${imageId}`,
} as const;
