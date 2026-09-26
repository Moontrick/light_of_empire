import { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { isAxiosError } from 'axios';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { useCountdown } from '@hooks/useCountdown';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { getError } from '@/shared/utils/getError';
import {
  RESEND_COOLDOWN_SEC,
  RESEND_ERROR_MESSAGES,
  VERIFY_ERROR_MESSAGES,
} from '../../../constants';
import type { VerifyEmailFormProps, VerifyEmailFormValues } from '../types';

const WRONG_CODE_PREFIX = 'Неверный код';

const getStatus = (error: unknown) =>
  isAxiosError(error) ? error.response?.status : undefined;

// 429 на resend-code: «Повторная отправка возможна через N с» — берём N для отсчёта
const getRetryAfterSeconds = (error: unknown): number | null => {
  if (getStatus(error) !== 429) return null;
  const match = getError(error)?.match(/(\d+)\s*с/);
  return match ? Number(match[1]) : RESEND_COOLDOWN_SEC;
};

const formatSeconds = (total: number) => {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

export function useVerifyEmailForm({ pending }: VerifyEmailFormProps) {
  const router = useRouter();
  const [form] = Form.useForm<VerifyEmailFormValues>();
  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const resendCode = useAuthStore((state) => state.resendCode);
  const cancelVerification = useAuthStore((state) => state.cancelVerification);

  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  // Бэк сжёг код (истёк, 5 неверных попыток, уже использован) раньше таймера
  const [codeBurned, setCodeBurned] = useState(false);

  const expiresAt = pending.codeExpiresAt ? Date.parse(pending.codeExpiresAt) : null;
  const secondsLeft = useCountdown(expiresAt);
  const cooldown = useCountdown(cooldownUntil);

  const codeExpired = codeBurned || (expiresAt !== null && secondsLeft === 0);
  const expiresIn = expiresAt !== null && !codeExpired ? formatSeconds(secondsLeft) : null;

  const resend = useCallback(async () => {
    setResending(true);
    try {
      await resendCode(pending.email);
      setCodeBurned(false);
      form.resetFields();
      setCooldownUntil(Date.now() + RESEND_COOLDOWN_SEC * 1000);
      alertHandler.addAlert({ status: 'success', defaultText: 'Новый код отправлен на почту' });
    } catch (error) {
      const retryAfter = getRetryAfterSeconds(error);
      if (retryAfter !== null) {
        setCooldownUntil(Date.now() + retryAfter * 1000);
        alertHandler.addAlert({
          status: 'warning',
          defaultText: getError(error) ?? `Повторная отправка возможна через ${retryAfter} с`,
        });
        return;
      }
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error, RESEND_ERROR_MESSAGES) });
    } finally {
      setResending(false);
    }
  }, [form, pending.email, resendCode]);

  // Пришли со входа (403): срок кода неизвестен — сразу запрашиваем свежий
  useEffect(() => {
    if (pending.codeExpiresAt === null) void resend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyError = (error: unknown) => {
    const status = getStatus(error);
    const message = getApiErrorMessage(error, VERIFY_ERROR_MESSAGES);

    switch (status) {
    case 400:
      form.resetFields();
      if (!message.startsWith(WRONG_CODE_PREFIX)) setCodeBurned(true);
      break;
    case 404:
      cancelVerification();
      break;
    case 409:
      cancelVerification();
      router.replace('/login');
      break;
    case 422:
      form.setFields([{ name: 'code', errors: [message] }]);
      return;
    }

    alertHandler.addAlert({ defaultText: message });
  };

  const onFinish = async ({ code }: VerifyEmailFormValues) => {
    setSubmitting(true);
    try {
      await verifyEmail({ email: pending.email, code });
      alertHandler.addAlert({ status: 'success', defaultText: 'Добро пожаловать в ряды Империи' });
      router.replace('/');
    } catch (error) {
      handleVerifyError(error);
      setSubmitting(false);
    }
  };

  // Input.OTP зовёт onChange только при заполнении всех ячеек — отправляем сразу
  const onCodeComplete = () => {
    if (!submitting && !codeExpired) form.submit();
  };

  return {
    form,
    email: pending.email,
    submitting,
    resending,
    cooldown,
    codeExpired,
    expiresIn,
    onFinish,
    onCodeComplete,
    resend,
  };
}
