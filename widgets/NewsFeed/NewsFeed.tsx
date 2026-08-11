import { getNews } from '@/shared/news';
import { NewsFeatured } from './components/NewsFeatured';
import { NewsRow } from './components/NewsRow';
import styles from './NewsFeed.module.scss';

export function NewsFeed() {
  const news = getNews();

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

      <div className={styles.list}>
        {news.map((item, index) =>
          index % 3 === 0 ? (
            <NewsFeatured key={item.slug} item={item} />
          ) : (
            <NewsRow key={item.slug} item={item} index={index + 1} />
          ),
        )}
      </div>
    </main>
  );
}
