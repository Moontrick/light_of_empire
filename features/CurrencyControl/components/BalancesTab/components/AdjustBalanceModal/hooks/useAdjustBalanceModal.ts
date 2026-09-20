import { useRef, useState } from 'react';
import { Form } from 'antd';
import { currencyApi } from '@/shared/api/currency';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { ADJUST_ERROR_MESSAGES } from '@features/CurrencyControl/constants';
import type { AdjustBalanceFormValues, AdjustBalanceModalProps } from '../types';

export function useAdjustBalanceModal({ target, onClose, onSaved }: AdjustBalanceModalProps) {
  const [form] = Form.useForm<AdjustBalanceFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const amount = Form.useWatch('amount', form);

  // Пока модалка закрывается (target уже null), заголовок и кнопка не должны переключаться на «Списать»
  const shownTarget = useRef(target);
  if (target) shownTarget.current = target;
  const shown = shownTarget.current;

  // Подсказка по данным из списка; главная проверка — на сервере (баланс мог измениться)
  const insufficient =
    target?.mode === 'debit' && typeof amount === 'number' && amount > target.user.balance;

  const onFinish = async (values: AdjustBalanceFormValues) => {
    if (!target) return;
    const { user, mode } = target;
    const request = mode === 'credit' ? currencyApi.credit : currencyApi.debit;

    setSubmitting(true);
    try {
      const { data } = await request(user.id, {
        amount: values.amount,
        message: values.message.trim(),
      });
      onSaved(user.id, data.balance_after);
      alertHandler.addAlert({
        status: 'success',
        defaultText:
          mode === 'credit'
            ? `Начислено ${values.amount} кредитов пользователю ${user.login}`
            : `Списано ${values.amount} кредитов у пользователя ${user.login}`,
      });
      onClose();
    } catch (error) {
      alertHandler.addAlert({
        defaultText: getApiErrorMessage(error, ADJUST_ERROR_MESSAGES),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { form, submitting, insufficient, onFinish, shown };
}
