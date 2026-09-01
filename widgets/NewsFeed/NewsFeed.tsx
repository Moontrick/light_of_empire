'use client';

import { Button, Skeleton } from 'antd';
import { useNewsFeed } from './hooks/useNewsFeed';
import { NewsTimelineGroup } from './components/NewsTimelineGroup';
import styles from './NewsFeed.module.scss';

export function NewsFeed() {
  const { groups, loading, loadingMore, hasMore, empty, error, loadMore, retry } = useNewsFeed();

  return (
    <main className={styles.root}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>Новости командования</span>
        <h1 className={styles.title}>
          Новости
          <br />
          Империи
        </h1>
        <p className={styles.intro}>
          Официальные новости, приказы и хроника Нового Порядка. Следи за событиями галактики
          и жизнью Имперской Армии.
        </p>
      </header>

      <div className={styles.timeline}>
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : error ? (
          <div className={styles.error}>
            <p className={styles.errorText}>Не удалось загрузить новости.</p>
            <Button size="large" onClick={() => void retry()}>
              Повторить
            </Button>
          </div>
        ) : empty ? (
          <p className={styles.empty}>Новостей пока нет.</p>
        ) : (
          <>
            {groups.map((group) => (
              <NewsTimelineGroup key={group.isoDate} group={group} />
            ))}

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
