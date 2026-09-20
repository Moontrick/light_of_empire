import { getError } from '@/shared/utils/getError';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { PURCHASE_MESSAGE_TEXTS, PURCHASE_STATUS_TEXTS } from '../constants';

export function getPurchaseErrorText(error: unknown): string {
  const message = getError(error);
  if (message && PURCHASE_MESSAGE_TEXTS[message]) return PURCHASE_MESSAGE_TEXTS[message];
  return getApiErrorMessage(error, PURCHASE_STATUS_TEXTS);
}
