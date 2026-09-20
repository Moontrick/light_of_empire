// Сколько пунктов верхнего уровня помещается в доступную ширину.
// widths — ширины всех пунктов по порядку, moreWidth — ширина пункта «Прочее».
export function fitNavItems(
  widths: number[],
  gap: number,
  moreWidth: number,
  available: number,
  minVisible: number,
): number {
  const count = widths.length;
  const total = (k: number) =>
    widths.slice(0, k).reduce((sum, width) => sum + width, 0) + Math.max(0, k - 1) * gap;

  if (total(count) <= available) return count;

  // k = count − 1 не подходит: единственный оставшийся пункт buildCompactNav не сворачивает,
  // а целиком список уже не влез
  for (let k = count - 2; k >= minVisible; k -= 1) {
    if (total(k) + gap + moreWidth <= available) return k;
  }

  return Math.min(minVisible, count);
}
