const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function formatNewsDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}
