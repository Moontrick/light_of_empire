import type { CaseNodeItemType } from '@ui/CaseRoulette';
import { IconCaseShard } from '@/public/icons/IconCaseShard';
import { IconCaseGem } from '@/public/icons/IconCaseGem';
import { IconCaseStar } from '@/public/icons/IconCaseStar';
import { IconCaseCrown } from '@/public/icons/IconCaseCrown';
import { IconSmallReward } from '@/public/casino/small';
import { IconMediumReward } from '@/public/casino/medium';
import { IconLargeReward } from '@/public/casino/large';
import { IconBigReward } from '@/public/casino/big';
import { DropTableEntry } from './useCasinoControl/types';
import { CaseType } from './useCaseContent/types';

// Тестовые данные, пока кейсы не приходят с бэка
export const TEST_DROP_TABLE: DropTableEntry[] = [
  { id: 0, label: '50 кредитов', weight: 70 },
  { id: 1, label: '200 кредитов', weight: 20 },
  { id: 2, label: '1000 кредитов', weight: 9 },
  { id: 3, label: '10000 кредитов', weight: 1 },
];

export const TEST_DROP_TABLE_CREDIT: DropTableEntry[] = [
  { id: 0, label: '250 Кредитов', weight: 70 },
  { id: 1, label: '500 Кредитов', weight: 20 },
  { id: 2, label: '1000 Кредитов', weight: 9 },
  { id: 3, label: '5000 Кредитов', weight: 1 },
];

export const TEST_ITEMS_NODE_CREDIT: Record<number, CaseNodeItemType> = {
  0: { item: <IconSmallReward width={100} height={100}/>, accent: 'var(--uv-tier-blue)', rare: 'default' },
  1: { item: <IconMediumReward  width={100} height={100}/>, accent: 'var(--uv-tier-purple)', rare: 'rare' },
  2: { item: <IconLargeReward  width={100} height={100}/>, accent: 'var(--uv-tier-pink)', rare: 'epic' },
  3: { item: <IconBigReward width={100} height={100} />, accent: 'var(--uv-tier-red)', rare: 'legendary' },
};

export const TEST_ITEMS_NODE: Record<number, CaseNodeItemType> = {
  0: { item: <IconCaseShard width={100} height={100}/>, accent: 'var(--uv-tier-blue)', rare: 'default' },
  1: { item: <IconCaseGem  width={100} height={100}/>, accent: 'var(--uv-tier-purple)', rare: 'rare' },
  2: { item: <IconCaseStar  width={100} height={100}/>, accent: 'var(--uv-tier-pink)', rare: 'epic' },
  3: { item: <IconCaseCrown width={100} height={100} />, accent: 'var(--uv-tier-red)', rare: 'legendary' },
};

export const LANE_LENGTH = 100;
// Победителя ставим не в начало и не в самый хвост, чтобы прокрут был долгим,
// а после него оставались предметы
export const WIN_POSITION_MIN = 50;
export const WIN_POSITION_MAX = LANE_LENGTH - 10;

// Лента до первого прокрута; статичная, чтобы SSR и клиент совпадали
export const PLACEHOLDER_LANE = [
  1, 3, 0, 1, 0, 2, 3, 3, 1, 0, 2, 1, 3, 1, 2, 3, 2, 2, 1, 0, 3, 1, 0, 2, 0, 2, 2, 1, 1, 1, 1, 1, 3,
  2, 3, 2, 0, 2, 3, 2, 2, 1, 2, 0, 1, 0, 1, 0, 3, 1, 3, 2, 1, 1, 1, 2, 0, 0, 2, 0, 2, 3, 3, 1, 0, 0,
  0, 2, 2, 2, 2, 1, 0, 2, 2, 0, 0, 3, 0, 2, 0, 3, 2, 2, 3, 0, 0, 0, 2, 0, 3, 3, 0, 2, 2, 1, 2, 1, 1,
  2,
];


export type CaseMoksType = {
  nodes:  Record<number, CaseNodeItemType>;
  placeholders: DropTableEntry[];
  price: number;
}

export const DATA_SET: Record<number, CaseMoksType> = {
  1: { nodes: TEST_ITEMS_NODE_CREDIT, placeholders: TEST_DROP_TABLE_CREDIT,price: 500 },
  2: { nodes: TEST_ITEMS_NODE, placeholders: TEST_DROP_TABLE, price: 200 },
};

export const CASES_CONST: CaseType[] = [
  {
    id: 1,
    label: 'Кейс пивозавра',
    price: 500,
    img: '/images/case7.png',
    rare: 'legendary'
  },
  {
    id: 2,
    label: 'Кейс подпиваса',
    price: 200,
    rare: 'epic',
    img: '/images/case8.png'
  }
];
