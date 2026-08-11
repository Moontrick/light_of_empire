import type { ServerStatus } from '@/shared/api/gameServer';

export interface UseServerStatusResult {
  status: ServerStatus | null;
  loading: boolean;
  error: string | null;
}
