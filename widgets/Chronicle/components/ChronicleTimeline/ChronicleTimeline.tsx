'use client';

import { motion } from 'framer-motion';
import { ChronicleEntry } from '../ChronicleEntry';
import { ChronicleMilestone } from '../ChronicleMilestone';
import { useTimelineProgress } from './hooks/useTimelineProgress';
import type { ChronicleTimelineProps } from './types';
import styles from './ChronicleTimeline.module.scss';

export function ChronicleTimeline({ nodes }: ChronicleTimelineProps) {
  const { ref, scaleY, reduceMotion } = useTimelineProgress();

  return (
    <div ref={ref} className={styles.root}>
      <noscript>
        <style>
          {'[data-reveal]{opacity:1!important;transform:none!important}'}
        </style>
      </noscript>

      <span className={styles.track} aria-hidden>
        <motion.span
          className={styles.progress}
          style={{ scaleY: reduceMotion ? 1 : scaleY }}
        />
      </span>

      <ul className={styles.timeline}>
        {nodes.map((node) =>
          node.kind === 'entry' ? (
            <ChronicleEntry key={node.id} entry={node} />
          ) : (
            <ChronicleMilestone key={node.id} milestone={node} />
          )
        )}
      </ul>
    </div>
  );
}
