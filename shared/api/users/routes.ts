export const USERS_ROUTES = {
  LIST: '/users',
  UPDATE_MY_PROFILE: '/users/me/profile',
  CHANGE_MY_PASSWORD: '/users/me/password',
  ASSIGN_ROLE: (id: number) => `/users/${id}/role`,
  UPDATE_USER_PROFILE: (id: number) => `/users/${id}/profile`,
} as const;
