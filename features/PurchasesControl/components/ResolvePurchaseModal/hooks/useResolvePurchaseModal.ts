import { useRef, useState } from 'react';
import { Form } from 'antd';
import { isAxiosError } from 'axios';
import { purchasesApi } from '@/shared/api/purchases';
import { PurchaseStatus } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { RESOLVE_ERROR_MESSAGES } from '@features/PurchasesControl/constants';
import type { ResolveFormValues, ResolvePurchaseModalProps } from '../types';

export function useResolvePurchaseModal({ target, onClose, onResolved }: ResolvePurchaseModalProps) {
  const [form] = Form.useForm<ResolveFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  // Пока модалка закрывается (target уже null), заголовок и кнопка не должны переключаться
  const shownTarget = useRef(target);
  if (target) shownTarget.current = target;

  const isReject = shownTarget.current?.status === PurchaseStatus.REJECTED;

  const onFinish = async (values: ResolveFormValues) => {
    if (!target) return;
    const { purchase, status } = target;
    const comment = values.resolution_comment?.trim();

    setSubmitting(true);
    try {
      await purchasesApi.resolve(purchase.id, {
        status,
        ...(comment ? { resolution_comment: comment } : {}),
      });
      alertHandler.addAlert({
        status: 'success',
        defaultText:
          status === PurchaseStatus.ISSUED
            ? `Заявка №${purchase.id} выдана`
            : `Заявка №${purchase.id} отклонена, кредиты возвращены`,
      });
      onResolved();
      onClose();
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error, RESOLVE_ERROR_MESSAGES) });
      const code = isAxiosError(error) ? error.response?.status : undefined;
      // Заявку уже обработал другой куратор или её нет — закрываем и перечитываем очередь
      if (code === 409 || code === 404) {
        onResolved();
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    submitting,
    shown: shownTarget.current,
    isReject,
    onFinish,
    externalUrl,
    openExternal: (url: string) => setExternalUrl(url),
    closeExternal: () => setExternalUrl(null),
  };
}
