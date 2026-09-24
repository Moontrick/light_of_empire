import type { UpdateProfileDto } from '@/shared/api/users';

// Поле анкеты, на которое ставим фокус при открытии модалки из hero
export type AccountField = keyof UpdateProfileDto;
