'use client';

import { Button, Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { ThreadRow } from './components/ThreadRow';
import { ThreadsToolbar } from './components/ThreadsToolbar';
import { useForumCategory } from './hooks/useForumCategory';
import type { ForumCategoryProps } from './types';
import styles from './ForumCategory.module.scss';

export function ForumCategory({ slug }: ForumCategoryProps) {
  const {
    category, categoryNotFound, categoriesLoading, categoriesError, retryCategories,
    tags, threads, loading, loadingMore, error, empty, hasMore,
    search, setSearch, tag, setTag, sort, setSort,
    canCreate, isGuest, loadMore, retry,
  } = useForumCategory(slug);

  if (categoryNotFound) {
    return (
      <main className={styles.root}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Раздел не найден</h1>
          <Link href="/forum" className={styles.back}>
            <span aria-hidden>←</span> К разделам
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.root}>
      <header className={styles.head}>
        <Link href="/forum" className={styles.back}>
          <span aria-hidden>←</span> Все разделы
        </Link>
        {categoriesError ? (
          <div className={styles.headError}>
            <span>Не удалось загрузить раздел.</span>
            <Button onClick={() => void retryCategories()}>Повторить</Button>
          </div>
        ) : categoriesLoading || !category ? (
          <Skeleton active title paragraph={{ rows: 1 }} />
        ) : (
          <>
            <div className={styles.titleLine}>
              <h1 className={styles.title}>{category.name}</h1>
              {category.is_archived && <span className={styles.archived}>Архив</span>}
            </div>
            {category.description && <p className={styles.intro}>{category.description}</p>}
          </>
        )}
        <div className={styles.actions}>
          {canCreate && (
            <Link href={`/forum/new?category=${slug}`} className={styles.createButton}>
              Создать тему
            </Link>
          )}
          {isGuest && (
            <span className={styles.guestHint}>
              <Link href="/login">Войдите</Link>, чтобы создавать темы и отвечать.
            </span>
          )}
        </div>
      </header>

      <div className={styles.content}>
        <ThreadsToolbar
          search={search}
          onSearchChange={setSearch}
          tags={tags}
          tag={tag}
          onTagChange={setTag}
          sort={sort}
          onSortChange={setSort}
        />

        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : error ? (
          <div className={styles.error}>
            <p className={styles.errorText}>Не удалось загрузить темы.</p>
            <Button size="large" onClick={() => void retry()}>
              Повторить
            </Button>
          </div>
        ) : empty ? (
          <p className={styles.empty}>Тем пока нет.</p>
        ) : (
          <>
            <div className={styles.list}>
              {threads.map((thread) => (
                <ThreadRow key={thread.id} thread={thread} />
              ))}
            </div>
            {hasMore && (
              <div className={styles.moreWrap}>
                <Button size="large" loading={loadingMore} onClick={() => void loadMore()}>
                  Показать ещё
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
