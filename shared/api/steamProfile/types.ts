export type SteamOnlineState = 'online' | 'in-game' | 'offline';

export interface SteamProfile {
  steamId64: string;
  name: string;
  avatar: string;
  onlineState: SteamOnlineState;
  profileUrl: string;
}
