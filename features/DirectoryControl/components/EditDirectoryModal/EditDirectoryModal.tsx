'use client';

import { Button, Checkbox, ColorPicker, Form, Input, Modal } from 'antd';
import { COLOR_PICKER_PRESETS, NAME_STYLE_PRESETS } from '../../constants';
import { TagPreview } from './components/TagPreview';
import { useEditDirectoryModal } from './hooks/useEditDirectoryModal';
import type { DirectoryFormValues, EditDirectoryModalProps } from './types';

export function EditDirectoryModal(props: EditDirectoryModalProps) {
  const { config, onClose } = props;
  const { form, open, isCreate, submitting, onFinish } = useEditDirectoryModal(props);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      title={isCreate ? config.labels.createTitle : config.labels.editTitle}
      footer={null}
    >
      <Form<DirectoryFormValues>
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
            { required: true, message: 'Укажите название' },
            { min: 2, max: 100, message: 'Название — от 2 до 100 символов' },
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

        <Form.Item name="color" label="Цвет карточки и тега">
          <ColorPicker
            allowClear
            format="hex"
            presets={[{ label: 'Палитра сайта', colors: COLOR_PICKER_PRESETS }]}
          />
        </Form.Item>

        <Form.Item name="stylePresets" label="Стиль названия">
          <Checkbox.Group
            options={NAME_STYLE_PRESETS.map(({ key, label }) => ({
              value: key,
              label,
            }))}
          />
        </Form.Item>

        <TagPreview form={form} />

        <Button type="primary" htmlType="submit" block loading={submitting}>
          {isCreate ? 'Создать' : 'Сохранить'}
        </Button>
      </Form>
    </Modal>
  );
}
