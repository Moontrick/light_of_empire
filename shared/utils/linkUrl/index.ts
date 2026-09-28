// Внешняя ссылка открывается в новой вкладке, внутренняя (/path, #anchor) — через next/link
export function isExternalUrl(url: string): boolean {
  return /^(https?:)?\/\//i.test(url.trim());
}

export function isValidLinkUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;
  if (trimmed.startsWith('#')) return true;
  return /^https?:\/\/\S+$/i.test(trimmed);
}
