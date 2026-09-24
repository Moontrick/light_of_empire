import type { CaseRouletteProps } from '../types';

export type UseCaseRouletteParams = Required<
  Pick<
    CaseRouletteProps,
    'items' | 'winningPosition' | 'itemWidth' | 'gap' | 'duration' | 'itemsNode'
  >
> &
  Pick<CaseRouletteProps, 'onStart' | 'onFinish' | 'disabled'>;
