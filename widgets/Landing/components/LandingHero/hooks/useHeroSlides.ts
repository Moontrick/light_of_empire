'use client';

import { useCallback, useState } from 'react';
import { HERO_SLIDES } from '../../../data';

export function useHeroSlides() {
  const [active, setActive] = useState(0);

  const select = useCallback((index: number) => setActive(index), []);

  return { slides: HERO_SLIDES, active, slide: HERO_SLIDES[active], select };
}
