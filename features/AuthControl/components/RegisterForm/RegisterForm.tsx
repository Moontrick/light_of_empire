'use client';

import { Button, Form, Input } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import type { RegisterDto } from '@/shared/api/auth';
import { AuthShell } from '../AuthShell';
import { useRegisterForm } from './hooks/useRegisterForm';

export function RegisterForm() {
  const { onFinish, submitting } = useRegisterForm();

  return (
    <AuthShell
      title="Регистрация"
      tagline="Вступай в ряды Империи"
      footer={
        <>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </>
      }
    >
      <Form<RegisterDto>
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          label="Логин"
          rules={[
            { required: true, message: 'Укажите логин' },
            { min: 2, max: 100, message: 'Логин — от 2 до 100 символов' },
          ]}
        >
          <Input autoComplete="username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Укажите email' },
            { type: 'email', message: 'Некорректный email' },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Укажите пароль' },
            { min: 6, max: 72, message: 'Пароль — от 6 до 72 символов' },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          Создать аккаунт
        </Button>
      </Form>
    </AuthShell>
  );
}
