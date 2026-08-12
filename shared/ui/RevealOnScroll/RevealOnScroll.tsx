'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { RevealOnScrollProps } from './types';

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
} as const;

const VIEWPORT = { once: true, margin: '-80px' } as const;

export function RevealOnScroll({
  children,
  as = 'div',
  className,
  delay = 0,
  x = -16,
}: RevealOnScrollProps) {
  const reduceMotion = useReducedMotion();
  const Tag = MOTION_TAGS[as];

  return (
    <Tag
      // Стартовое opacity:0 уезжает в SSR-разметку. Без JS элемент так и
      // остался бы невидимым — см. noscript-фолбэк по этому атрибуту.
      data-reveal
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
