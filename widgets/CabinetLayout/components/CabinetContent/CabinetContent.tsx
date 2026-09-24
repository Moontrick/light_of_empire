'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from '@/shared/i18n/navigation';
import type { CabinetContentProps } from './types';
import styles from './CabinetContent.module.scss';

const TRANSITION = { duration: 0.25, ease: [0.22, 0.61, 0.36, 1] } as const;

// Ключ по pathname: при смене экрана перемонтируется и въезжает только контент,
// шапка и сайдбар остаются на месте
export function CabinetContent({ children }: CabinetContentProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      className={styles.content}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={TRANSITION}
    >
      {children}
    </motion.div>
  );
}
