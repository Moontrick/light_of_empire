import type { NewsPost } from '@/shared/types';

export interface NewsTableProps {
  items: NewsPost[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  mutatingId: number | null;
  canSendToDiscord: boolean;
  onPageChange: (page: number) => void;
  onEdit: (slug: string) => void;
  onPublish: (id: number) => Promise<boolean>;
  onArchive: (id: number) => Promise<boolean>;
  onSendToDiscord: (id: number) => Promise<boolean>;
  onCancelDiscordSend: (id: number) => Promise<boolean>;
}
