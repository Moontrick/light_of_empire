'use client';

import { Button, Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { NewsContent } from '@ui/NewsContent';
import { useCombatOperationArticle } from './hooks/useCombatOperationArticle';
import type { CombatOperationArticleProps } from './types';
import styles from './CombatOperationArticle.module.scss';

export function CombatOperationArticle({ slug }: CombatOperationArticleProps) {
  const { article, loading, notFound, error, retry } = useCombatOperationArticle(slug);

  if (loading) {
    return (
      <main className={styles.root}>
        <div className={styles.article}>
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.root}>
        <div className={styles.notFound}>
          <span className={styles.notFoundEyebrow}>The Light of Empire</span>
          <h1 className={styles.notFoundTitle}>Не удалось загрузить операцию</h1>
          <p className={styles.notFoundText}>Проверьте соединение и попробуйте ещё раз.</p>
          <div className={styles.notFoundActions}>
            <Button size="large" onClick={() => void retry()}>
              Повторить
            </Button>
            <Link href="/combat-operations" className={styles.notFoundButton}>
              Все операции
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !article) {
    return (
      <main className={styles.root}>
        <div className={styles.notFound}>
          <span className={styles.notFoundEyebrow}>The Light of Empire</span>
          <h1 className={styles.notFoundTitle}>Операция не найдена</h1>
          <p className={styles.notFoundText}>
            Похоже, эта операция была удалена или ещё не опубликована.
          </p>
          <Link href="/combat-operations" className={styles.notFoundButton}>
            Все операции
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.root}>
      <header className={styles.hero}>
        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.title} className={styles.heroImage} />
        )}
        <span className={styles.heroOverlay} aria-hidden />

        <div className={styles.heroInner}>
          <Link href="/combat-operations" className={styles.back}>
            <span aria-hidden>←</span> Все операции
          </Link>

          <div className={styles.meta}>
            <span className={styles.tag}>{article.tag}</span>
            <time dateTime={article.isoDate}>{article.date}</time>
          </div>

          <h1 className={styles.title}>{article.title}</h1>
        </div>
      </header>

      <article className={styles.article}>
        <NewsContent blocks={article.body} />

        <div className={styles.foot}>
          <Link href="/combat-operations" className={styles.backBottom}>
            <span aria-hidden>←</span> Вернуться к операциям
          </Link>
        </div>
      </article>
    </main>
  );
}
