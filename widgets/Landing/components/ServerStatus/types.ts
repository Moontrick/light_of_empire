export interface ServerStatusViewModel {
  isFirstLoad: boolean;
  hasFailed: boolean;
  isOnline: boolean;
  serverName: string;
  map: string;
  players: number;
  maxPlayers: number;
  connectHref: string;
}
