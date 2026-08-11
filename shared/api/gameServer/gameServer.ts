import { GameDig } from 'gamedig';
import type { GameDigPlayer } from 'gamedig';

import { SERVER_ADDRESS } from '@/shared/constants';
import type { ServerPlayer, ServerStatus } from './types';

const DEFAULT_HOST = SERVER_ADDRESS;
const DEFAULT_PORT = 27015;

// Полный опрос UDP не должен уходить дольше этого окна, иначе рендер страницы подвиснет.
const SOCKET_TIMEOUT_MS = 2000;
const ATTEMPT_TIMEOUT_MS = 5000;

// Source-серверы режут частые запросы — не опрашиваем чаще, чем раз в это окно.
const CACHE_TTL_MS = 30_000;

// Если сервер недоступен дольше этого времени, отдавать старые данные как "online" уже нельзя.
const STALE_MAX_MS = 5 * 60 * 1000;

const resolveHost = (): string => {
  const host = process.env.GAME_SERVER_HOST;
  return host && host.trim().length > 0 ? host.trim() : DEFAULT_HOST;
};

const resolvePort = (): number => {
  const raw = process.env.GAME_SERVER_PORT;
  if (!raw) return DEFAULT_PORT;

  const parsed = Number.parseInt(raw, 10);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 65535
    ? parsed
    : DEFAULT_PORT;
};

const gameServerHost = resolveHost();
const gameServerPort = resolvePort();

const toTimeSeconds = (raw: Record<string, unknown>): number => {
  const value = raw.time;
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.round(value);
  }
  return 0;
};

const toPlayerList = (players: GameDigPlayer[]): ServerPlayer[] =>
  players.map((player) => ({
    name: player.name,
    timeSeconds: toTimeSeconds(player.raw),
  }));

const buildOfflineStatus = (): ServerStatus => ({
  online: false,
  name: '',
  map: '',
  players: 0,
  maxPlayers: 0,
  bots: 0,
  playerList: [],
  connect: `${gameServerHost}:${gameServerPort}`,
  updatedAt: new Date().toISOString(),
});

const queryLiveServer = async (): Promise<ServerStatus> => {
  const result = await GameDig.query({
    type: 'garrysmod',
    host: gameServerHost,
    port: gameServerPort,
    socketTimeout: SOCKET_TIMEOUT_MS,
    attemptTimeout: ATTEMPT_TIMEOUT_MS,
    maxRetries: 1,
  });

  // GMod-массив players у gamedig иногда неполный/устаревший — количество берём
  // из сырого A2S_INFO (result.numplayers включает ботов, result.raw.numbots — их число),
  // а массив players.length используем только как запасной вариант.
  const rawBots = result.raw.numbots;
  const botsCount = typeof rawBots === 'number' && rawBots >= 0
    ? rawBots
    : result.bots.length;

  const totalConnected = typeof result.numplayers === 'number' && result.numplayers >= botsCount
    ? result.numplayers
    : result.players.length + botsCount;

  return {
    online: true,
    name: result.name,
    map: result.map,
    players: Math.max(0, totalConnected - botsCount),
    maxPlayers: typeof result.maxplayers === 'number' ? result.maxplayers : 0,
    bots: botsCount,
    playerList: toPlayerList(result.players),
    connect: `${gameServerHost}:${gameServerPort}`,
    updatedAt: new Date().toISOString(),
  };
};

let cachedStatus: ServerStatus | null = null;
let cachedAtMs = 0;

let lastGoodStatus: ServerStatus | null = null;
let lastGoodAtMs = 0;

let pendingQuery: Promise<ServerStatus> | null = null;

const fetchAndCache = async (): Promise<ServerStatus> => {
  try {
    const status = await queryLiveServer();
    const now = Date.now();

    lastGoodStatus = status;
    lastGoodAtMs = now;
    cachedStatus = status;
    cachedAtMs = now;

    return status;
  } catch (error) {
    console.error('[gameServer] Failed to query game server status', error);

    const now = Date.now();

    // Отдаём последние известные данные вместо нулей — updatedAt при этом не
    // обновляется, поэтому по нему видно, что данные устарели.
    if (lastGoodStatus && now - lastGoodAtMs <= STALE_MAX_MS) {
      cachedStatus = lastGoodStatus;
      cachedAtMs = now;
      return lastGoodStatus;
    }

    const offline = buildOfflineStatus();
    cachedStatus = offline;
    cachedAtMs = now;
    return offline;
  }
};

export const getServerStatus = async (): Promise<ServerStatus> => {
  const now = Date.now();

  if (cachedStatus && now - cachedAtMs < CACHE_TTL_MS) {
    return cachedStatus;
  }

  if (pendingQuery) {
    return pendingQuery;
  }

  pendingQuery = fetchAndCache().finally(() => {
    pendingQuery = null;
  });

  return pendingQuery;
};
