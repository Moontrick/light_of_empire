// Целое в [0, max)
export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

// Целое в [min, max)
export function getRandomIntBetween(min: number, max: number): number {
  return min + getRandomInt(max - min);
}

// Индекс, выбранный пропорционально весу; нулевые веса не выпадают
export function pickWeightedIndex(weights: number[]): number {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;

  for (let index = 0; index < weights.length; index += 1) {
    roll -= weights[index];
    if (roll < 0) return index;
  }

  return weights.length - 1;
}
