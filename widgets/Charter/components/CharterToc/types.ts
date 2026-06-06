import type { CharterSectionData } from '../../types';

export interface CharterTocProps {
  sections: Pick<CharterSectionData, 'id' | 'title'>[];
}
