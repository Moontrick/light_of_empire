import { SHOWCASE_STEPS } from '../../constants';
import styles from './DonationSteps.module.scss';

// Три шага покупки — как ряд плиток «STARS» с наградами в брифинге миссии
export function DonationSteps() {
  return (
    <ol className={styles.steps}>
      {SHOWCASE_STEPS.map((step) => (
        <li key={step.index} className={styles.step}>
          <span className={styles.index}>{step.index}</span>
          <div className={styles.body}>
            <span className={styles.title}>{step.title}</span>
            <p className={styles.text}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
