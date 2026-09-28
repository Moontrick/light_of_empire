import type {
  ForumCategory,
  ForumPost,
  ForumTag,
  ForumThread,
  ForumThreadListItem,
  PaginatedResponse,
  StatusResponse,
} from '@/shared/types';
import { baseService } from '../api';
import { FORUM_ROUTES } from './routes';
import type {
  ChangeForumThreadStatusDto,
  CreateForumCategoryDto,
  CreateForumPostDto,
  CreateForumTagDto,
  CreateForumThreadDto,
  ForumCategoryWriteDto,
  ForumPostsParams,
  ForumThreadDetailDto,
  ForumThreadsParams,
  ModerateForumThreadDto,
  ReorderForumCategoriesDto,
  UpdateForumCategoryDto,
  UpdateForumPostDto,
  UpdateForumTagDto,
  UpdateForumThreadDto,
} from './types';

export const forumApi = {
  getCategories: () => baseService.get<ForumCategory[]>(FORUM_ROUTES.CATEGORIES),

  getTags: () => baseService.get<ForumTag[]>(FORUM_ROUTES.TAGS),

  createCategory: (dto: CreateForumCategoryDto) =>
    baseService.post<ForumCategoryWriteDto>(FORUM_ROUTES.CATEGORIES, dto),

  updateCategory: (id: number, dto: UpdateForumCategoryDto) =>
    baseService.put<ForumCategoryWriteDto>(FORUM_ROUTES.CATEGORY(id), dto),

  reorderCategories: (dto: ReorderForumCategoriesDto) =>
    baseService.put<StatusResponse>(FORUM_ROUTES.CATEGORIES_ORDER, dto),

  deleteCategory: (id: number) => baseService.delete<StatusResponse>(FORUM_ROUTES.CATEGORY(id)),

  createTag: (dto: CreateForumTagDto) => baseService.post<ForumTag>(FORUM_ROUTES.TAGS, dto),

  updateTag: (id: number, dto: UpdateForumTagDto) =>
    baseService.put<ForumTag>(FORUM_ROUTES.TAG(id), dto),

  deleteTag: (id: number) => baseService.delete<StatusResponse>(FORUM_ROUTES.TAG(id)),

  getThreads: (params: ForumThreadsParams) =>
    baseService.get<PaginatedResponse<ForumThreadListItem>>(FORUM_ROUTES.THREADS, { params }),

  getThread: (id: number) => baseService.get<ForumThreadDetailDto>(FORUM_ROUTES.THREAD(id)),

  createThread: (dto: CreateForumThreadDto) =>
    baseService.post<ForumThread>(FORUM_ROUTES.THREADS, dto),

  updateThread: (id: number, dto: UpdateForumThreadDto) =>
    baseService.put<ForumThread>(FORUM_ROUTES.THREAD(id), dto),

  changeThreadStatus: (id: number, dto: ChangeForumThreadStatusDto) =>
    baseService.patch<ForumThread>(FORUM_ROUTES.THREAD_STATUS(id), dto),

  moderateThread: (id: number, dto: ModerateForumThreadDto) =>
    baseService.patch<ForumThread>(FORUM_ROUTES.THREAD(id), dto),

  getPosts: (threadId: number, params: ForumPostsParams) =>
    baseService.get<PaginatedResponse<ForumPost>>(FORUM_ROUTES.THREAD_POSTS(threadId), { params }),

  createPost: (threadId: number, dto: CreateForumPostDto) =>
    baseService.post<ForumPost>(FORUM_ROUTES.THREAD_POSTS(threadId), dto),

  updatePost: (id: number, dto: UpdateForumPostDto) =>
    baseService.put<ForumPost>(FORUM_ROUTES.POST(id), dto),

  deletePost: (id: number) => baseService.delete<StatusResponse>(FORUM_ROUTES.POST(id)),
};
