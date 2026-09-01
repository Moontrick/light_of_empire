import type { DirectoryEntry } from '@/shared/types';

export interface DirectoryTagProps {
  entry: Pick<DirectoryEntry, 'name' | 'color' | 'styles'>;
  size?: 'md' | 'lg';
}
