import { useState } from 'react';
import { Form } from 'antd';
import { isAxiosError } from 'axios';
import { currencyApi } from '@/shared/api/currency';
import { purchasesApi } from '@/shared/api/purchases';
import { useAuthStore } from '@store/authStore';
import type { Purchase } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { mapPurchaseDto } from '@/shared/utils/mapPurchase';
import { getPurchaseErrorText } from '../../../lib/getPurchaseErrorText';
import type { PurchaseFormValues, PurchaseModalProps } from '../types';

export function usePurchaseModal({ donation, onUnavailable }: PurchaseModalProps) {
  const user = useAuthStore((state) => state.user);
  const setBalance = useAuthStore((state) => state.setBalance);
  const [form] = Form.useForm<PurchaseFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<Purchase | null>(null);

  const balance = user?.balance ?? 0;
  const balanceAfter = Math.max(0, balance - donation.price);

  const refreshBalance = async (fallback: number) => {
    try {
      const { data } = await currencyApi.getMyBalance();
      setBalance(data.balance);
    } catch {
      // Покупка уже прошла — при сбое лёгкого запроса ставим расчётный баланс, /auth/me поправит при заходе в профиль
      setBalance(fallback);
    }
  };

  const onFinish = async (values: PurchaseFormValues) => {
    setSubmitting(true);
    try {
      const comment = values.user_comment?.trim();
      const { data } = await purchasesApi.create({
        donation_id: donation.id,
        ...(comment ? { user_comment: comment } : {}),
      });
      setCreated(mapPurchaseDto(data));
      alertHandler.addAlert({ status: 'success', defaultText: 'Заявка создана' });
      // Заявка уже создана — не держим модалку заблокированной на время обновления баланса
      setSubmitting(false);
      await refreshBalance(balanceAfter);
    } catch (error) {
      alertHandler.addAlert({ defaultText: getPurchaseErrorText(error) });
      if (isAxiosError(error) && error.response?.status === 404) onUnavailable();
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    form.resetFields();
    setCreated(null);
  };

  return { form, submitting, created, balance, balanceAfter, onFinish, reset };
}
