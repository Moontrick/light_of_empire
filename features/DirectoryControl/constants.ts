import { formationsApi } from '@/shared/api/formations';
import { positionsApi } from '@/shared/api/positions';
import type { DirectoryConfig, DirectoryKind } from './types';

export const DIRECTORY_CONFIGS: Record<DirectoryKind, DirectoryConfig> = {
  formations: {
    title: 'Формирования',
    api: {
      getList: formationsApi.getFormations,
      create: formationsApi.createFormation,
      update: formationsApi.updateFormation,
      remove: formationsApi.deleteFormation,
    },
    labels: {
      createTitle: 'Новое формирование',
      editTitle: 'Редактирование формирования',
      emptyList: 'Формирований пока нет',
      deleteConfirm: 'Удалить формирование?',
      deleteWarning: 'Его пользователи останутся без формирования',
      created: (name) => `Формирование «${name}» создано`,
      updated: (name) => `Формирование «${name}» обновлено`,
      deleted: (name) => `Формирование «${name}» удалено`,
    },
    errorMessages: {
      409: 'Формирование с таким названием уже существует',
    },
  },
  positions: {
    title: 'Должности',
    api: {
      getList: positionsApi.getPositions,
      create: positionsApi.createPosition,
      update: positionsApi.updatePosition,
      remove: positionsApi.deletePosition,
    },
    labels: {
      createTitle: 'Новая должность',
      editTitle: 'Редактирование должности',
      emptyList: 'Должностей пока нет',
      deleteConfirm: 'Удалить должность?',
      deleteWarning: 'Пользователи с этой должностью останутся без неё',
      created: (name) => `Должность «${name}» создана`,
      updated: (name) => `Должность «${name}» обновлена`,
      deleted: (name) => `Должность «${name}» удалена`,
    },
    errorMessages: {
      409: 'Должность с таким названием уже существует',
    },
  },
};

export interface NameStylePreset {
  key: string;
  label: string;
  css: string;
}

// Пресеты стилизации имени: сериализуются в CSS-строку поля styles
export const NAME_STYLE_PRESETS: NameStylePreset[] = [
  { key: 'bold', label: 'Жирный', css: 'font-weight:700' },
  { key: 'italic', label: 'Курсив', css: 'font-style:italic' },
  { key: 'uppercase', label: 'Капителью', css: 'text-transform:uppercase;letter-spacing:2px' },
  { key: 'glow', label: 'Свечение', css: 'text-shadow:0 0 8px currentColor' },
];

// Быстрый выбор цвета — из палитры сайта (--uv-*)
export const COLOR_PICKER_PRESETS = [
  '#d22730',
  '#c9a44c',
  '#f6b26b',
  '#ffd966',
  '#93c47d',
  '#6fa8dc',
  '#5095eb',
  '#e06666',
  '#d9d9d9',
];
