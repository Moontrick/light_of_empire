import type { CreditsTone } from '@/shared/types';

export interface CreditsAmountProps {
  value: number;
  tone?: CreditsTone;
  size?: 'sm' | 'md' | 'lg';
}
