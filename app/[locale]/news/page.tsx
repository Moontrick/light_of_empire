import { CharterHeader } from '@widgets/CharterHeader';
import { NewsFeed } from '@widgets/NewsFeed';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata(
  'Новости',
  'Официальные новости, приказы и хроника Нового Порядка — новости Галактической Империи и Имперской Армии.'
);

export default function NewsPage() {
  return (
    <>
      <CharterHeader />
      <NewsFeed />
    </>
  );
}
