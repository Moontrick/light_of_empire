'use client';

import { Button, Skeleton } from 'antd';
import { useCombatOperationsFeed } from './hooks/useCombatOperationsFeed';
import { CombatOperationTimelineGroup } from './components/CombatOperationTimelineGroup';
import styles from './CombatOperationsFeed.module.scss';

export function CombatOperationsFeed() {
  const { groups, loading, loadingMore, hasMore, empty, error, loadMore, retry } =
    useCombatOperationsFeed();

  return (
    <main className={styles.root}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>Сводки командования</span>
        <h1 className={styles.title}>
          Боевые
          <br />
          операции
        </h1>
        <p className={styles.intro}>
          Приказы на выход, сборы и отчёты о проведённых операциях Имперской Армии.
          Следи за расписанием и не пропускай построение.
        </p>
      </header>

      <div className={styles.timeline}>
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : error ? (
          <div className={styles.error}>
            <p className={styles.errorText}>Не удалось загрузить операции.</p>
            <Button size="large" onClick={() => void retry()}>
              Повторить
            </Button>
          </div>
        ) : empty ? (
          <p className={styles.empty}>Операций пока нет.</p>
        ) : (
          <>
            {groups.map((group) => (
              <CombatOperationTimelineGroup key={group.isoDate} group={group} />
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
