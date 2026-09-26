'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { UserAvatar } from '@ui/UserAvatar';
import type { AuthScreenProps } from './types';
import styles from './AuthScreen.module.scss';

const TRANSITION = { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] } as const;

// Содержимое карточки одного шага; AnimatePresence в AuthShell плавно меняет шаги по key
export function AuthScreen({ title, tagline, footer, children }: AuthScreenProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.screen}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
      transition={TRANSITION}
    >
      <div className={styles.logo}>
        <UserAvatar size="lg" alt="Логотип" />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.tagline}>{tagline}</p>
      {children}
      <p className={styles.footer}>{footer}</p>
    </motion.div>
  );
}
