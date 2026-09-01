'use client';

import { Button, Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { useNewsArticle } from './hooks/useNewsArticle';
import { NewsContent } from './components/NewsContent';
import type { NewsArticleProps } from './types';
import styles from './NewsArticle.module.scss';

export function NewsArticle({ slug }: NewsArticleProps) {
  const { article, loading, notFound, error, retry } = useNewsArticle(slug);

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
          <h1 className={styles.notFoundTitle}>Не удалось загрузить новость</h1>
          <p className={styles.notFoundText}>Проверьте соединение и попробуйте ещё раз.</p>
          <div className={styles.notFoundActions}>
            <Button size="large" onClick={() => void retry()}>
              Повторить
            </Button>
            <Link href="/news" className={styles.notFoundButton}>
              Все новости
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
          <h1 className={styles.notFoundTitle}>Новость не найдена</h1>
          <p className={styles.notFoundText}>
            Похоже, эта новость была удалена или ещё не опубликована.
          </p>
          <Link href="/news" className={styles.notFoundButton}>
            Все новости
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
          <Link href="/news" className={styles.back}>
            <span aria-hidden>←</span> Все новости
          </Link>

          <div className={styles.meta}>
            <span className={styles.tag}>{article.tag}</span>
            <time dateTime={article.isoDate}>{article.date}</time>
            <span className={styles.dot} aria-hidden />
            <span>{article.readingTime}</span>
          </div>

          <h1 className={styles.title}>{article.title}</h1>
        </div>
      </header>

      <article className={styles.article}>
        {article.lead && <p className={styles.lead}>{article.lead}</p>}
        <NewsContent blocks={article.body} />

        <div className={styles.foot}>
          <Link href="/news" className={styles.backBottom}>
            <span aria-hidden>←</span> Вернуться к новостям
          </Link>
        </div>
      </article>
    </main>
  );
}
