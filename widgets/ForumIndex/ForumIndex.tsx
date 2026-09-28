'use client';

import { Button, Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { ForumCategoryCard } from './components/ForumCategoryCard';
import { useForumIndex } from './hooks/useForumIndex';
import styles from './ForumIndex.module.scss';

export function ForumIndex() {
  const { categories, loading, error, empty, canCreate, isGuest, retry } = useForumIndex();

  return (
    <main className={styles.root}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>Сообщество</span>
        <h1 className={styles.title}>Форум</h1>
        <p className={styles.intro}>Обсуждения, вопросы и предложения Имперской Армии.</p>
        <div className={styles.actions}>
          {canCreate && (
            <Link href="/forum/new" className={styles.createButton}>
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
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : error ? (
          <div className={styles.error}>
            <p className={styles.errorText}>Не удалось загрузить разделы.</p>
            <Button size="large" onClick={() => void retry()}>
              Повторить
            </Button>
          </div>
        ) : empty ? (
          <p className={styles.empty}>Разделов пока нет.</p>
        ) : (
          <div className={styles.list}>
            {categories.map((category) => (
              <ForumCategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
