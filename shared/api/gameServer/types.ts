export interface ServerPlayer {
  name: string;
  timeSeconds: number;
}

export interface ServerStatus {
  online: boolean;
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  bots: number;
  playerList: ServerPlayer[];
  connect: string;
  updatedAt: string;
}
