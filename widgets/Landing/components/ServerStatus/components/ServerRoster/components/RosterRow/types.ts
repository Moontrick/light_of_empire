import type { ServerPlayer } from '@/shared/api/gameServer';

export interface RosterRowProps {
  player: ServerPlayer;
  index: number;
  isTop: boolean;
}
