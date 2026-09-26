import type { HeroSlide } from '../../../../data';

export interface HeroSwitcherProps {
  slides: HeroSlide[];
  active: number;
  onSelect: (index: number) => void;
}
