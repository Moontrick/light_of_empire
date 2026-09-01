import type { CharterContent, CharterSectionData } from './charter';

export interface DocSectionData extends CharterSectionData {
  id: number;
}

export interface DocContent extends Omit<CharterContent, 'sections'> {
  sections: DocSectionData[];
}
