import { useMemo, useState } from 'react';
import type { CaseSpinTarget } from '@ui/CaseRoulette';

import { getRandomInt, getRandomIntBetween, pickWeightedIndex } from '@/shared/utils/random';
import { TEST_DROP_TABLE, PLACEHOLDER_LANE, WIN_POSITION_MIN, WIN_POSITION_MAX, LANE_LENGTH } from '../constants';
import type { CasinoRuleteProps } from '../../ui/CasinoRulete/types';

export function useCasinoControl({ placeholders, price, balance }: CasinoRuleteProps) {
  const [lane, setLane] = useState<number[]>(PLACEHOLDER_LANE);
  const [winningPosition, setWinningPosition] = useState(0);

  const DROP_WEIGHTS = useMemo(() => {
    return placeholders.map((entry) => entry.weight);
  }, [placeholders]);

  // Списание пока не делаем: без бэка локальный дебет разошёлся бы с /auth/me
  const shortage = Math.max(0, price - balance);

  // Пока рандом на клиенте; с бэком здесь будет запрос на открытие кейса
  const generateRound = async (): Promise<CaseSpinTarget> => {
    const reward = TEST_DROP_TABLE[pickWeightedIndex(DROP_WEIGHTS)];
    const position = getRandomIntBetween(WIN_POSITION_MIN, WIN_POSITION_MAX);
    const items = Array.from({ length: LANE_LENGTH }, () => getRandomInt(TEST_DROP_TABLE.length));
    items[position] = reward.id;

    setLane(items);
    setWinningPosition(position);

    return { items, winningPosition: position };
  };

  const handleFinish = (item: number) => {
    const entry = TEST_DROP_TABLE.find((candidate) => candidate.id === item);
    // alertHandler.addAlert({
    //   status: 'success',
    //   defaultText: `Выпало: ${entry?.label ?? item}`,
    // });
  };

  return { lane, winningPosition, shortage, generateRound, handleFinish };
}
