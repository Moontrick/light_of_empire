import { RevealOnScroll } from '@/shared/ui/RevealOnScroll';
import type { ChronicleMilestoneProps } from './types';
import styles from './ChronicleMilestone.module.scss';

export function ChronicleMilestone({ milestone }: ChronicleMilestoneProps) {
  return (
    <li className={styles.item}>
      <RevealOnScroll as="span" className={styles.marker} x={0} />

      <RevealOnScroll className={styles.content} delay={0.08}>
        <p className={styles.location}>{milestone.location}</p>
        <p className={styles.text}>{milestone.text}</p>
      </RevealOnScroll>
    </li>
  );
}
