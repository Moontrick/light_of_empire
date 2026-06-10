import Image from 'next/image';
import { russoOne, manrope } from '@utils/fonts';
import { Link } from '@/shared/i18n/navigation';
import { NewsContent } from './components/NewsContent';
import type { NewsArticleProps } from './types';
import styles from './NewsArticle.module.scss';

export function NewsArticle({ item }: NewsArticleProps) {
  return (
    <main className={`${russoOne.variable} ${manrope.variable} ${styles.root}`}>
      <header className={styles.hero}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="100vw"
          className={styles.heroImage}
          priority
        />
        <span className={styles.heroOverlay} aria-hidden />

        <div className={styles.heroInner}>
          <Link href="/news" className={styles.back}>
            <span aria-hidden>←</span> Все новости
          </Link>

          <div className={styles.meta}>
            <span className={styles.tag}>{item.tag}</span>
            <time dateTime={item.isoDate}>{item.date}</time>
            <span className={styles.dot} aria-hidden />
            <span>{item.readingTime}</span>
          </div>

          <h1 className={styles.title}>{item.title}</h1>
        </div>
      </header>

      <article className={styles.article}>
        <p className={styles.lead}>{item.lead}</p>
        <NewsContent blocks={item.body} />

        <div className={styles.foot}>
          <Link href="/news" className={styles.backBottom}>
            <span aria-hidden>←</span> Вернуться к новостям
          </Link>
        </div>
      </article>
    </main>
  );
}
