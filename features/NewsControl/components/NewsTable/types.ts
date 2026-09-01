import type { NewsPost } from '@/shared/types';

export interface NewsTableProps {
  items: NewsPost[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  mutatingId: number | null;
  onPageChange: (page: number) => void;
  onEdit: (slug: string) => void;
  onPublish: (id: number) => Promise<boolean>;
  onArchive: (id: number) => Promise<boolean>;
}
