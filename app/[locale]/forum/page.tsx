import { ForumIndex } from '@widgets/ForumIndex';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata(
  'Форум',
  'Форум сообщества Имперской Армии: обсуждения, вопросы и предложения.',
  '/forum',
);

export default function ForumPage() {
  return <ForumIndex />;
}
