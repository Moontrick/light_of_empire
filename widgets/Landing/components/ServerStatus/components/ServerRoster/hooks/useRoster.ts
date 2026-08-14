'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ServerPlayer } from '@/shared/api/gameServer';
import { ROSTER_VISIBLE_LIMIT } from '../../../constants';

export function useRoster(roster: ServerPlayer[]) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visible = useMemo(
    () => (isExpanded ? roster : roster.slice(0, ROSTER_VISIBLE_LIMIT)),
    [roster, isExpanded]
  );

  const hiddenCount = Math.max(0, roster.length - ROSTER_VISIBLE_LIMIT);
  const toggle = useCallback(() => setIsExpanded((value) => !value), []);

  return { visible, hiddenCount, isExpanded, toggle };
}
