import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { formationsApi } from '@/shared/api/formations';
import { useForumStore } from '@store/forumStore';
import type { Formation } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { toColorString } from '@/shared/utils/toColorString';
import type { TagFormModalProps, TagFormValues } from '../types';

export function useTagFormModal({ editing, onClose }: TagFormModalProps) {
  const [form] = Form.useForm<TagFormValues>();
  const { createTag, updateTag, mutating } = useForumStore();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [formationsLoading, setFormationsLoading] = useState(false);

  const open = editing !== null;
  const isCreate = editing === 'new';

  useEffect(() => {
    if (editing === null) return;
    if (editing === 'new') {
      form.resetFields();
    } else {
      form.setFieldsValue({
        name: editing.name,
        color: editing.color,
        formation_id: editing.formation?.id ?? null,
      });
    }
  }, [editing, form]);

  // Список формирований нужен только в открытой модалке
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setFormationsLoading(true);
    formationsApi
      .getFormations()
      .then(({ data }) => {
        if (!cancelled) setFormations(data);
      })
      .catch((error) => {
        if (!cancelled) alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
      })
      .finally(() => {
        if (!cancelled) setFormationsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const onFinish = async (values: TagFormValues) => {
    const name = values.name.trim();
    const color = toColorString(values.color);
    const formationId = values.formation_id ?? null;

    let ok = false;
    if (isCreate) {
      ok = await createTag({
        name,
        ...(color ? { color } : {}),
        ...(formationId !== null ? { formation_id: formationId } : {}),
      });
    } else if (editing !== null) {
      ok = await updateTag(editing.id, {
        name,
        // null — явная очистка цвета/привязки
        color: color || null,
        formation_id: formationId,
      });
    }

    if (ok) onClose();
  };

  // Пока список формирований грузится, показываем название из самого тега, а не голый id
  const seedFormation = editing !== null && editing !== 'new' ? editing.formation : null;
  const formationOptions =
    formations.length > 0
      ? formations.map((formation) => ({ value: formation.id, label: formation.name }))
      : seedFormation
        ? [{ value: seedFormation.id, label: seedFormation.name }]
        : [];

  return {
    form,
    open,
    isCreate,
    submitting: mutating,
    formationOptions,
    formationsLoading,
    onFinish,
  };
}
