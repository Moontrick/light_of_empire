'use client';

import { Button, Form, Input, Modal, Switch } from 'antd';
import { useCategoryFormModal } from './hooks/useCategoryFormModal';
import type { CategoryFormModalProps, CategoryFormValues } from './types';

export function CategoryFormModal(props: CategoryFormModalProps) {
  const { onClose } = props;
  const { form, open, isCreate, submitting, onFinish } = useCategoryFormModal(props);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      title={isCreate ? 'Новый раздел' : 'Редактирование раздела'}
      footer={null}
      destroyOnHidden
    >
      <Form<CategoryFormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Название"
          rules={[
            { required: true, whitespace: true, message: 'Укажите название' },
            { max: 100, message: 'Не длиннее 100 символов' },
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Описание"
          rules={[{ max: 500, message: 'Не длиннее 500 символов' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {!isCreate && (
          <Form.Item name="is_archived" label="В архиве" valuePropName="checked">
            <Switch />
          </Form.Item>
        )}

        <Button type="primary" htmlType="submit" block loading={submitting}>
          {isCreate ? 'Создать' : 'Сохранить'}
        </Button>
      </Form>
    </Modal>
  );
}
