import type { CurrencyParticipant } from '@/shared/types';

export interface ParticipantCellProps {
  // null/undefined — участник удалён или неизвестен
  participant: CurrencyParticipant | null | undefined;
}
