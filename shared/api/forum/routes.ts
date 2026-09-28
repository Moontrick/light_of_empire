export const FORUM_ROUTES = {
  CATEGORIES: '/forum/categories',
  CATEGORY: (id: number) => `/forum/categories/${id}`,
  CATEGORIES_ORDER: '/forum/categories/order',
  TAGS: '/forum/tags',
  TAG: (id: number) => `/forum/tags/${id}`,
  THREADS: '/forum/threads',
  THREAD: (id: number) => `/forum/threads/${id}`,
  THREAD_STATUS: (id: number) => `/forum/threads/${id}/status`,
  THREAD_POSTS: (id: number) => `/forum/threads/${id}/posts`,
  POST: (id: number) => `/forum/posts/${id}`,
} as const;
