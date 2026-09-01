import { RichText } from '@/shared/ui/RichText';
import type { RuleItemProps } from './types';
import styles from './RuleItem.module.scss';

export function RuleItem({ rule }: RuleItemProps) {
  const codeClassName = rule.category
    ? `${styles.code} ${styles[`cat${rule.category}`]}`
    : styles.code;

  return (
    <li className={styles.rule}>
      <p className={styles.body}>
        <span className={codeClassName}>{rule.code}</span>
        <span className={styles.text}>
          <RichText text={rule.text} />
        </span>
      </p>

      {rule.penalty && (
        <p className={styles.penalty}>
          <span className={styles.penaltyLabel}>Наказание:</span> <RichText text={rule.penalty} />
        </p>
      )}

      {rule.children && rule.children.length > 0 && (
        <ul className={styles.children}>
          {rule.children.map((child) => (
            <RuleItem key={child.code} rule={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
