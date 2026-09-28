'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { useForumStore } from '@store/forumStore';
import {
  FORUM_THREAD_IMAGES_MAX,
  FORUM_THREAD_TAGS_MAX,
  FORUM_THREAD_TITLE_MAX,
  FORUM_THREAD_TITLE_MIN,
} from '@/shared/constants';
import { ForumThreadStatus, hasRoleAtLeast, UserRole } from '@/shared/types';
import type { CharterBlock } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { isForumAuthor } from '@/shared/utils/isForumAuthor';

function countImages(blocks: CharterBlock[]): number {
  return blocks.filter((block) => block.kind === 'image' && block.src).length;
}

function blockHasContent(block: CharterBlock): boolean {
  switch (block.kind) {
  case 'text':
  case 'subheading':
    return block.text.trim().length > 0;
  case 'list':
    return block.items.some((item) => item.trim().length > 0);
  case 'note':
    return Boolean(block.title?.trim() || block.text?.trim() || block.items?.some((item) => item.trim()));
  case 'rules':
    return block.items.length > 0;
  case 'image':
    return block.src.trim().length > 0;
  case 'link':
    return block.url.trim().length > 0;
  default:
    return false;
  }
}

export function useForumThreadEditor(threadId?: number) {
  const {
    categories, categoriesStatus, fetchCategories, tags, fetchTags,
    thread, threadStatus, fetchThread, resetThread, createThread, updateThread, mutating,
  } = useForumStore();
  const user = useAuthStore((state) => state.user);
  const authStatus = useAuthStore((state) => state.status);
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetSlug = searchParams.get('category');

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [blocks, setBlocks] = useState<CharterBlock[]>([{ kind: 'text', text: '' }]);

  const editing = threadId !== undefined;
  // Стор может держать тему с предыдущей страницы, пока грузится нужная
  const currentThread = editing && thread?.id === threadId ? thread : null;
  const prefilledForRef = useRef<number | null>(null);

  useEffect(() => {
    void fetchCategories();
    void fetchTags();
  }, [fetchCategories, fetchTags]);

  useEffect(() => {
    if (threadId === undefined) return;
    void fetchThread(threadId);
    return () => resetThread();
  }, [threadId, fetchThread, resetThread]);

  useEffect(() => {
    if (authStatus === 'guest') router.replace('/login');
  }, [authStatus, router]);

  // Предвыбор раздела из ?category=slug при создании
  useEffect(() => {
    if (editing || categoryId !== undefined || !presetSlug) return;
    const preset = categories.find((c) => c.slug === presetSlug && !c.is_archived);
    if (preset) setCategoryId(preset.id);
  }, [editing, categoryId, presetSlug, categories]);

  // Заполняем форму один раз на тему: перечитывание после 409 не должно затирать правки
  useEffect(() => {
    if (!currentThread || prefilledForRef.current === currentThread.id) return;
    setTitle(currentThread.title);
    setBlocks(currentThread.blocks);
    prefilledForRef.current = currentThread.id;
  }, [currentThread]);

  // Чужую или закрытую тему править нельзя — уводим на неё, бэк всё равно ответит 403/404
  useEffect(() => {
    if (!editing || !currentThread || !user) return;
    const isAdmin = hasRoleAtLeast(user.role, UserRole.ADMIN);
    const isAuthor = isForumAuthor(currentThread.author, user);
    const allowed =
      currentThread.status !== ForumThreadStatus.DELETED &&
      (isAdmin || (isAuthor && currentThread.status === ForumThreadStatus.OPEN));
    if (!allowed) {
      alertHandler.addAlert({ defaultText: 'Эту тему нельзя редактировать' });
      router.replace(`/forum/threads/${currentThread.id}`);
    }
  }, [editing, currentThread, user, router]);

  const categoryOptions = useMemo(
    () => categories.filter((c) => !c.is_archived).map((c) => ({ value: c.id, label: c.name })),
    [categories],
  );
  const tagOptions = useMemo(() => tags.map((t) => ({ value: t.id, label: t.name })), [tags]);

  const trimmedTitle = title.trim();
  const titleError =
    trimmedTitle.length > 0 && trimmedTitle.length < FORUM_THREAD_TITLE_MIN
      ? `Минимум ${FORUM_THREAD_TITLE_MIN} символа`
      : trimmedTitle.length > FORUM_THREAD_TITLE_MAX
        ? `Максимум ${FORUM_THREAD_TITLE_MAX} символов`
        : null;
  const imagesCount = countImages(blocks);
  const imagesError = imagesCount > FORUM_THREAD_IMAGES_MAX ? `Не больше ${FORUM_THREAD_IMAGES_MAX} картинок` : null;
  const hasBody = blocks.some(blockHasContent);

  const canSave =
    trimmedTitle.length >= FORUM_THREAD_TITLE_MIN &&
    !titleError &&
    !imagesError &&
    hasBody &&
    (editing || categoryId !== undefined) &&
    tagIds.length <= FORUM_THREAD_TAGS_MAX;

  const save = async () => {
    if (!canSave) return;
    if (editing && currentThread) {
      const ok = await updateThread(currentThread.id, { title: trimmedTitle, blocks });
      if (ok) router.push(`/forum/threads/${currentThread.id}`);
      return;
    }
    if (categoryId === undefined) return;
    const created = await createThread({
      title: trimmedTitle,
      category_id: categoryId,
      blocks,
      ...(tagIds.length > 0 ? { tag_ids: tagIds } : {}),
    });
    if (created) router.push(`/forum/threads/${created.id}`);
  };

  const cancel = () => {
    if (editing && currentThread) router.push(`/forum/threads/${currentThread.id}`);
    else router.push(presetSlug ? `/forum/${presetSlug}` : '/forum');
  };

  const loadingThread =
    editing && !currentThread && threadStatus !== 'notFound' && threadStatus !== 'error';
  const loadingDirectories = categoriesStatus === 'idle' || categoriesStatus === 'loading';

  return {
    editing,
    title, setTitle, titleError,
    categoryId, setCategoryId, categoryOptions,
    tagIds, setTagIds, tagOptions,
    blocks, setBlocks, imagesCount, imagesError,
    loading: loadingThread || loadingDirectories || authStatus === 'idle' || authStatus === 'loading',
    notFound: editing && threadStatus === 'notFound',
    loadError: editing && threadStatus === 'error',
    retry: () => {
      if (threadId !== undefined) void fetchThread(threadId);
    },
    saving: mutating,
    canSave,
    save,
    cancel,
  };
}
