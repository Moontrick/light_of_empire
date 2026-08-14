import type { ServerPlayer } from '@/shared/api/gameServer';

export interface ServerStatusViewModel {
  isFirstLoad: boolean;
  hasFailed: boolean;
  isOnline: boolean;
  serverName: string;
  map: string;
  players: number;
  maxPlayers: number;
  fillPercent: number;
  // Отсортирован по налёту, дольше всех в сети — первым.
  roster: ServerPlayer[];
  address: string;
  // Пустая строка, если сервер ещё не ответил или прислал битую дату.
  updatedAtLabel: string;
  connectHref: string;
}
