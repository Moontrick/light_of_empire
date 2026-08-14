import { getNews } from '@/shared/news';
import { NewsTimelineGroup } from './components/NewsTimelineGroup';
import { groupNewsByDate } from './lib/groupNewsByDate';
import styles from './NewsFeed.module.scss';

export function NewsFeed() {
  const groups = groupNewsByDate(getNews());

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
        {groups.map((group) => (
          <NewsTimelineGroup key={group.isoDate} group={group} />
        ))}
      </div>
    </main>
  );
}
