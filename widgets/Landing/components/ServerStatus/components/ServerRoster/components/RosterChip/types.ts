import type { ServerPlayer } from '@/shared/api/gameServer';

export interface RosterChipProps {
  player: ServerPlayer;
  // Дольше всех в сети — выделяем акцентом.
  isTop?: boolean;
}
