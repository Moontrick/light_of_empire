import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import { forumApi } from '@/shared/api/forum';
import type {
  ChangeForumThreadStatusDto,
  CreateForumCategoryDto,
  CreateForumPostDto,
  CreateForumTagDto,
  CreateForumThreadDto,
  ModerateForumThreadDto,
  UpdateForumCategoryDto,
  UpdateForumPostDto,
  UpdateForumTagDto,
  UpdateForumThreadDto,
} from '@/shared/api/forum';
import { FORUM_PAGE_LIMIT } from '@/shared/constants';
import { ForumPostStatus } from '@/shared/types';
import type { ForumCategory, ForumTag, ForumThread } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import type { ForumState, ForumThreadsFilters } from '../types';
import { getForumErrorText, shouldReloadThread } from './errors';

export interface ForumActions {
  fetchCategories: (force?: boolean) => Promise<void>;
  fetchTags: (force?: boolean) => Promise<void>;
  fetchThreads: (filters: ForumThreadsFilters) => Promise<void>;
  loadMoreThreads: () => Promise<void>;
  fetchThread: (id: number) => Promise<void>;
  loadMorePosts: () => Promise<void>;
  resetThread: () => void;
  createThread: (dto: CreateForumThreadDto) => Promise<ForumThread | null>;
  updateThread: (id: number, dto: UpdateForumThreadDto) => Promise<boolean>;
  changeThreadStatus: (id: number, dto: ChangeForumThreadStatusDto) => Promise<boolean>;
  moderateThread: (id: number, dto: ModerateForumThreadDto) => Promise<boolean>;
  createPost: (dto: CreateForumPostDto) => Promise<boolean>;
  updatePost: (id: number, dto: UpdateForumPostDto) => Promise<boolean>;
  deletePost: (id: number) => Promise<boolean>;
  createCategory: (dto: CreateForumCategoryDto) => Promise<boolean>;
  updateCategory: (id: number, dto: UpdateForumCategoryDto) => Promise<boolean>;
  reorderCategories: (ids: number[]) => Promise<boolean>;
  deleteCategory: (id: number) => Promise<boolean>;
  createTag: (dto: CreateForumTagDto) => Promise<boolean>;
  updateTag: (id: number, dto: UpdateForumTagDto) => Promise<boolean>;
  deleteTag: (id: number) => Promise<boolean>;
}

// Бэк отдаёт теги по name — после правок держим тот же порядок
function sortTags(tags: ForumTag[]): ForumTag[] {
  return [...tags].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

export const createForumActions: StateCreator<
  ForumState & ForumActions,
  [],
  [],
  ForumActions
> = (set, get) => {
  const showError = (error: unknown) => {
    alertHandler.addAlert({ defaultText: getForumErrorText(error) });
    const thread = get().thread;
    if (thread && shouldReloadThread(error)) void get().fetchThread(thread.id);
  };

  const success = (text: string) => alertHandler.addAlert({ status: 'success', defaultText: text });

  return {
    fetchCategories: async (force = false) => {
      if (!force && get().categoriesStatus === 'ready') return;
      set({ categoriesStatus: 'loading' });
      try {
        const { data } = await forumApi.getCategories();
        set({ categories: data, categoriesStatus: 'ready' });
      } catch (error) {
        set({ categoriesStatus: 'error' });
        showError(error);
      }
    },

    fetchTags: async (force = false) => {
      if (!force && get().tagsStatus === 'ready') return;
      set({ tagsStatus: 'loading' });
      try {
        const { data } = await forumApi.getTags();
        set({ tags: data, tagsStatus: 'ready' });
      } catch (error) {
        set({ tagsStatus: 'error' });
        showError(error);
      }
    },

    fetchThreads: async (filters) => {
      set({ threadsFilters: filters, threadsStatus: 'loading' });
      try {
        const { data } = await forumApi.getThreads({ ...filters, page: 1, limit: FORUM_PAGE_LIMIT });
        // Ответ на устаревшие фильтры игнорируем: пользователь уже поменял их
        if (get().threadsFilters !== filters) return;
        set({
          threads: data.items,
          threadsTotal: data.total,
          threadsPage: data.page,
          threadsStatus: 'ready',
        });
      } catch (error) {
        if (get().threadsFilters !== filters) return;
        set({ threadsStatus: 'error' });
        showError(error);
      }
    },

    loadMoreThreads: async () => {
      const { threadsStatus, threadsFilters, threadsPage, threads } = get();
      if (threadsStatus !== 'ready' || !threadsFilters) return;
      set({ threadsStatus: 'loadingMore' });
      try {
        const { data } = await forumApi.getThreads({
          ...threadsFilters,
          page: threadsPage + 1,
          limit: FORUM_PAGE_LIMIT,
        });
        if (get().threadsFilters !== threadsFilters) return;
        set({
          threads: [...threads, ...data.items],
          threadsTotal: data.total,
          threadsPage: data.page,
          threadsStatus: 'ready',
        });
      } catch (error) {
        if (get().threadsFilters !== threadsFilters) return;
        set({ threadsStatus: 'ready' });
        showError(error);
      }
    },

    fetchThread: async (id) => {
      const requestId = get().threadRequestId + 1;
      set({ threadStatus: 'loading', threadRequestId: requestId });
      try {
        const { data } = await forumApi.getThread(id);
        if (get().threadRequestId !== requestId) return;
        const { posts, ...thread } = data;
        set({
          thread,
          threadStatus: 'ready',
          posts: posts.items,
          postsTotal: posts.total,
          postsPage: posts.page,
          postsStatus: 'ready',
        });
      } catch (error) {
        if (get().threadRequestId !== requestId) return;
        if (isAxiosError(error) && error.response?.status === 404) {
          set({ thread: null, threadStatus: 'notFound', posts: [], postsTotal: 0, postsStatus: 'ready' });
          return;
        }
        // Та же тема уже на экране — оставляем её; postsStatus сбрасываем, чтобы «Показать ещё»
        // не зависло, если перечитывание перебило loadMorePosts
        const sameThread = get().thread?.id === id;
        set(sameThread ? { threadStatus: 'ready', postsStatus: 'ready' } : { threadStatus: 'error' });
        alertHandler.addAlert({ defaultText: getForumErrorText(error) });
      }
    },

    loadMorePosts: async () => {
      const { thread, postsStatus, postsPage, threadRequestId } = get();
      if (!thread || postsStatus !== 'ready') return;
      set({ postsStatus: 'loadingMore' });
      try {
        const { data } = await forumApi.getPosts(thread.id, {
          page: postsPage + 1,
          limit: FORUM_PAGE_LIMIT,
        });
        if (get().threadRequestId !== threadRequestId) return;
        const incoming = new Set(data.items.map((item) => item.id));
        const { posts: current } = get();
        set({
          // Свой свежий комментарий уже добавлен локально; страница с бэка ставит его на место
          posts: [...current.filter((post) => !incoming.has(post.id)), ...data.items],
          postsTotal: data.total,
          postsPage: data.page,
          postsStatus: 'ready',
        });
      } catch (error) {
        if (get().threadRequestId !== threadRequestId) return;
        set({ postsStatus: 'ready' });
        showError(error);
      }
    },

    resetThread: () =>
      set({
        thread: null,
        threadStatus: 'idle',
        posts: [],
        postsTotal: 0,
        postsPage: 1,
        postsStatus: 'idle',
        threadRequestId: get().threadRequestId + 1,
      }),

    createThread: async (dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.createThread(dto);
        // Счётчики и last_thread разделов устарели — /forum перечитает их
        set({ categoriesStatus: 'idle' });
        success('Тема создана');
        return data;
      } catch (error) {
        showError(error);
        return null;
      } finally {
        set({ mutating: false });
      }
    },

    updateThread: async (id, dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.updateThread(id, dto);
        set({ thread: data });
        success('Тема сохранена');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    changeThreadStatus: async (id, dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.changeThreadStatus(id, dto);
        set({ thread: data, categoriesStatus: 'idle' });
        success('Статус темы изменён');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    moderateThread: async (id, dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.moderateThread(id, dto);
        set({ thread: data, categoriesStatus: 'idle' });
        success('Тема обновлена');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    createPost: async (dto) => {
      const { thread } = get();
      if (!thread) return false;
      set({ mutating: true });
      try {
        const { data } = await forumApi.createPost(thread.id, dto);
        const { posts, postsTotal, thread: fresh } = get();
        // Пока ждали ответ, могли уйти в другую тему — чужой список не трогаем
        if (!fresh || fresh.id !== thread.id) return true;
        set({
          posts: [...posts, data],
          postsTotal: postsTotal + 1,
          thread: { ...fresh, posts_count: fresh.posts_count + 1, last_post_at: data.created_at },
        });
        success('Комментарий отправлен');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    updatePost: async (id, dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.updatePost(id, dto);
        set({ posts: get().posts.map((post) => (post.id === id ? data : post)) });
        success('Комментарий сохранён');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    deletePost: async (id) => {
      set({ mutating: true });
      try {
        const threadId = get().thread?.id;
        await forumApi.deletePost(id);
        const { posts, thread } = get();
        // Пока ждали ответ, могли уйти в другую тему — её счётчик не трогаем
        if (!thread || thread.id !== threadId) return true;
        set({
          posts: posts.map((post) =>
            post.id === id ? { ...post, status: ForumPostStatus.DELETED, blocks: [] } : post,
          ),
          thread: thread ? { ...thread, posts_count: Math.max(0, thread.posts_count - 1) } : thread,
        });
        success('Комментарий удалён');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    createCategory: async (dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.createCategory(dto);
        // POST/PUT раздела не отдают счётчики — у нового раздела их и нет
        set({ categories: [...get().categories, { ...data, threads_count: 0, last_thread: null }] });
        success('Раздел создан');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    updateCategory: async (id, dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.updateCategory(id, dto);
        set({
          categories: get().categories.map((category) =>
            category.id === id
              ? { ...data, threads_count: category.threads_count, last_thread: category.last_thread }
              : category,
          ),
        });
        success(
          dto.is_archived === undefined
            ? 'Раздел сохранён'
            : dto.is_archived
              ? 'Раздел отправлен в архив'
              : 'Раздел возвращён из архива',
        );
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    reorderCategories: async (ids) => {
      const previous = get().categories;
      const byId = new Map(previous.map((category) => [category.id, category]));
      const reordered = ids
        .map((id) => byId.get(id))
        .filter((category): category is ForumCategory => Boolean(category));
      // Оптимистично: список переставляется сразу, при ошибке откатывается
      set({ categories: reordered, mutating: true });
      try {
        await forumApi.reorderCategories({ ids });
        success('Порядок сохранён');
        return true;
      } catch (error) {
        set({ categories: previous });
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    deleteCategory: async (id) => {
      set({ mutating: true });
      try {
        await forumApi.deleteCategory(id);
        set({ categories: get().categories.filter((category) => category.id !== id) });
        success('Раздел удалён');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    createTag: async (dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.createTag(dto);
        set({ tags: sortTags([...get().tags, data]) });
        success('Тег создан');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    updateTag: async (id, dto) => {
      set({ mutating: true });
      try {
        const { data } = await forumApi.updateTag(id, dto);
        set({ tags: sortTags(get().tags.map((tag) => (tag.id === id ? data : tag))) });
        success('Тег сохранён');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },

    deleteTag: async (id) => {
      set({ mutating: true });
      try {
        await forumApi.deleteTag(id);
        const { tags, thread } = get();
        set({
          tags: tags.filter((tag) => tag.id !== id),
          // На бэке связки уходят каскадом — открытую тему приводим в то же состояние
          thread: thread ? { ...thread, tags: thread.tags.filter((tag) => tag.id !== id) } : thread,
        });
        success('Тег удалён');
        return true;
      } catch (error) {
        showError(error);
        return false;
      } finally {
        set({ mutating: false });
      }
    },
  };
};
