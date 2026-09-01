'use client';

import { Button, ConfigProvider, Form, Input, Modal } from 'antd';
import { DARK_FORM_THEME } from '@/shared/lib/antdTheme';
import { RichTextInput } from '@ui/RichTextInput';
import { useWrapperForm } from './hooks/useWrapperForm';
import type { WrapperFormModalProps } from './types';
import type { WrapperFormValues } from './hooks/useWrapperForm';

export function WrapperFormModal({ open, onClose, initial }: WrapperFormModalProps) {
  const { form, saving, submit } = useWrapperForm(open, initial, onClose);

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <Modal
        open={open}
        onCancel={onClose}
        title="Шапка и подвал"
        footer={null}
        destroyOnHidden
        width={640}
      >
        <Form<WrapperFormValues> form={form} layout="vertical" disabled={saving} onFinish={submit}>
          <Form.Item
            name="hero_eyebrow"
            label="Надзаголовок"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 255, message: 'Не длиннее 255 символов' },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="hero_title"
            label="Заголовок"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 255, message: 'Не длиннее 255 символов' },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="hero_intro"
            label="Вступление"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 4000, message: 'Не длиннее 4000 символов' },
            ]}
          >
            <RichTextInput />
          </Form.Item>

          <Form.Item
            name="footer"
            label="Подвал"
            rules={[
              { required: true, message: 'Обязательное поле' },
              { max: 4000, message: 'Не длиннее 4000 символов' },
            ]}
          >
            <RichTextInput />
          </Form.Item>

          <Form.Item
            name="search_placeholder"
            label="Плейсхолдер поиска (необязательно)"
            rules={[{ max: 255, message: 'Не длиннее 255 символов' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={saving}>
            Сохранить
          </Button>
          <Button block onClick={onClose}>
            Отмена
          </Button>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
