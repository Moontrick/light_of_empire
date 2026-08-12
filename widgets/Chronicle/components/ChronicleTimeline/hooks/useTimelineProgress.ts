'use client';

import { useRef } from 'react';
import { useReducedMotion, useScroll, useSpring } from 'framer-motion';

// Линия начинает расти, когда верх таймлайна поднимается выше 85% вьюпорта,
// и добирается до конца, когда его низ доходит до 60% — так она успевает
// «дочертиться» до последнего узла, а не упирается в край экрана.
const SPRING = { stiffness: 120, damping: 30, restDelta: 0.001 } as const;

export function useTimelineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 60%'],
  });

  const scaleY = useSpring(scrollYProgress, SPRING);

  return { ref, scaleY, reduceMotion };
}
