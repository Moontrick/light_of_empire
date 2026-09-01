import type { DirectoryEntry } from '@/shared/types';

export type DirectoryKind = 'formations' | 'positions';

// 'new' — модалка создания; DirectoryEntry — модалка редактирования
export type EditingEntry = DirectoryEntry | 'new' | null;

export interface SaveDirectoryDto {
  name: string;
  description?: string;
  color?: string;
  styles?: string;
}

export interface DirectoryConfig {
  title: string;
  api: {
    getList: () => Promise<{ data: DirectoryEntry[] }>;
    create: (dto: SaveDirectoryDto) => Promise<unknown>;
    update: (id: number, dto: SaveDirectoryDto) => Promise<unknown>;
    remove: (id: number) => Promise<unknown>;
  };
  labels: {
    createTitle: string;
    editTitle: string;
    emptyList: string;
    deleteConfirm: string;
    deleteWarning: string;
    created: (name: string) => string;
    updated: (name: string) => string;
    deleted: (name: string) => string;
  };
  errorMessages: Record<number, string>;
}

export interface DirectoryControlProps {
  kind: DirectoryKind;
}
