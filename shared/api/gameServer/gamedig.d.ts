/**
 * gamedig@5.3.3 ships no type declarations (no *.d.ts in dist/lib, no @types/gamedig).
 * This ambient module describes only the surface this project uses, based on the
 * actual runtime shape read from node_modules/gamedig/lib/Results.js and
 * node_modules/gamedig/protocols/valve.js (the protocol used by type: 'garrysmod').
 */
declare module 'gamedig' {
  export interface GameDigPlayer {
    name: string;
    raw: Record<string, unknown>;
  }

  export interface GameDigQueryOptions {
    type: string;
    host: string;
    port?: number;
    socketTimeout?: number;
    attemptTimeout?: number;
    maxRetries?: number;
  }

  export interface GameDigQueryResult {
    name: string;
    map: string;
    password: boolean;
    numplayers: number;
    maxplayers: number;
    players: GameDigPlayer[];
    bots: GameDigPlayer[];
    connect: string;
    ping: number;
    queryPort: number;
    version: string;
    raw: Record<string, unknown> & { numbots?: number };
  }

  export class GameDig {
    static query(options: GameDigQueryOptions): Promise<GameDigQueryResult>;
  }
}
