export interface ServerStatusViewModel {
  isFirstLoad: boolean;
  hasFailed: boolean;
  isOnline: boolean;
  serverName: string;
  map: string;
  players: number;
  maxPlayers: number;
  fillPercent: number;
  address: string;
  // Пустая строка, если сервер ещё не ответил или прислал битую дату.
  updatedAtLabel: string;
  connectHref: string;
}
