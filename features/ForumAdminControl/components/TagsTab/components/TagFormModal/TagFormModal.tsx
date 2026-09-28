'use client';

import { Button, ColorPicker, Form, Input, Modal, Select } from 'antd';
import { useTagFormModal } from './hooks/useTagFormModal';
import type { TagFormModalProps, TagFormValues } from './types';

export function TagFormModal(props: TagFormModalProps) {
  const { onClose } = props;
  const { form, open, isCreate, submitting, formationOptions, formationsLoading, onFinish } =
    useTagFormModal(props);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      title={isCreate ? 'Новый тег' : 'Редактирование тега'}
      footer={null}
      destroyOnHidden
    >
      <Form<TagFormValues>
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
            { max: 50, message: 'Не длиннее 50 символов' },
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item name="color" label="Цвет">
          <ColorPicker allowClear format="hex" />
        </Form.Item>

        <Form.Item name="formation_id" label="Формирование">
          <Select
            allowClear
            placeholder="Общий"
            loading={formationsLoading}
            options={formationOptions}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          {isCreate ? 'Создать' : 'Сохранить'}
        </Button>
      </Form>
    </Modal>
  );
}
