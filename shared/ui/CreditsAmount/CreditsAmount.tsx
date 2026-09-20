import classNames from 'classnames';
import { IconCredits } from '@/public/icons/IconCredits';
import type { CreditsAmountProps } from './types';
import styles from './CreditsAmount.module.scss';

const SIGN: Record<NonNullable<CreditsAmountProps['tone']>, string> = {
  neutral: '',
  plus: '+',
  minus: '−',
};

export function CreditsAmount({ value, tone = 'neutral', size = 'md' }: CreditsAmountProps) {
  return (
    <span className={classNames(styles.amount, styles[tone], styles[size])}>
      <IconCredits className={styles.icon} />
      {SIGN[tone]}
      {value.toLocaleString('ru-RU')}
    </span>
  );
}
