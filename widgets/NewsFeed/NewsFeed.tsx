import { getNews } from '@/shared/news';
import { NewsFeatured } from './components/NewsFeatured';
import { NewsRow } from './components/NewsRow';
import styles from './NewsFeed.module.scss';

export function NewsFeed() {
  const [featured, ...rest] = getNews();

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

      {featured && <NewsFeatured item={featured} />}

      <div className={styles.list}>
        {rest.map((item, index) => (
          <NewsRow key={item.slug} item={item} index={index + 2} />
        ))}
      </div>
    </main>
  );
}
