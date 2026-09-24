'use client';

import { ConfigProvider, Skeleton } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import type { ContentSkeletonProps } from './types';
import styles from './ContentSkeleton.module.scss';

const DEFAULT_CARDS = 2;
const PARAGRAPH_ROWS = 4;

// Заглушка области контента (ожидание сессии, переход между экранами кабинета):
// повторяет ритм карточек HudCard, чтобы страница не «прыгала» после загрузки
export function ContentSkeleton({ cards = DEFAULT_CARDS }: ContentSkeletonProps) {
  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <div className={styles.root} aria-busy>
        {Array.from({ length: cards }, (_, index) => (
          <HudCard key={index}>
            <Skeleton active title paragraph={{ rows: PARAGRAPH_ROWS }} />
          </HudCard>
        ))}
      </div>
    </ConfigProvider>
  );
}
