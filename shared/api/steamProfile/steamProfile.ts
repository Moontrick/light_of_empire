import type { SteamOnlineState, SteamProfile } from './types';

const STEAM_HOST = 'steamcommunity.com';
const FETCH_TIMEOUT_MS = 8_000;

// Принимаем только steamcommunity.com/id/<vanity> и /profiles/<id64> —
// роут проксирует пользовательский URL, наружу ходим лишь на Steam
export function normalizeSteamProfileUrl(rawUrl: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return null;
  }

  if (parsed.hostname !== STEAM_HOST && parsed.hostname !== `www.${STEAM_HOST}`) {
    return null;
  }

  const match = parsed.pathname.match(/^\/(id|profiles)\/([\w-]+)/);
  if (!match) return null;

  return `https://${STEAM_HOST}/${match[1]}/${match[2]}`;
}

function extractTag(xml: string, tag: string): string | null {
  const match = xml.match(
    new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?</${tag}>`, 's'),
  );
  const value = match?.[1].trim();
  return value ? value : null;
}

function toOnlineState(value: string | null): SteamOnlineState {
  return value === 'online' || value === 'in-game' ? value : 'offline';
}

export async function getSteamProfile(rawUrl: string): Promise<SteamProfile | null> {
  const profileUrl = normalizeSteamProfileUrl(rawUrl);
  if (!profileUrl) return null;

  const response = await fetch(`${profileUrl}/?xml=1`, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    cache: 'no-store',
  });
  if (!response.ok) return null;

  const xml = await response.text();
  const steamId64 = extractTag(xml, 'steamID64');
  const name = extractTag(xml, 'steamID');
  // Нет обязательных полей — Steam вернул <error> (профиль не существует)
  if (!steamId64 || !name) return null;

  return {
    steamId64,
    name,
    avatar: extractTag(xml, 'avatarFull') ?? '',
    onlineState: toOnlineState(extractTag(xml, 'onlineState')),
    profileUrl,
  };
}
