export function formatPlaytime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 60) return '< 1 мин';

  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours === 0) return `${minutes} мин`;

  const restMinutes = minutes % 60;

  return restMinutes === 0 ? `${hours} ч` : `${hours} ч ${restMinutes} мин`;
}
