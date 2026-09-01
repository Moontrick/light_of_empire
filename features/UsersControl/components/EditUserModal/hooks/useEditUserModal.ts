import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { usersApi } from '@/shared/api/users';
import { formationsApi } from '@/shared/api/formations';
import { positionsApi } from '@/shared/api/positions';
import type { Formation, Position } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { EditUserFormValues, EditUserModalProps } from '../types';

export function useEditUserModal({ user, onClose, onSaved }: EditUserModalProps) {
  const [form] = Form.useForm<EditUserFormValues>();
  const [formations, setFormations] = useState<Formation[] | null>(null);
  const [positions, setPositions] = useState<Position[] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const open = user !== null;

  useEffect(() => {
    // Справочники грузим один раз при первом открытии
    if (!open || (formations !== null && positions !== null)) return;

    Promise.all([formationsApi.getFormations(), positionsApi.getPositions()])
      .then(([formationsResponse, positionsResponse]) => {
        setFormations(formationsResponse.data);
        setPositions(positionsResponse.data);
      })
      .catch((error) => {
        alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
      });
  }, [open, formations, positions]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        position_id: user.position?.id ?? null,
        formation_id: user.formation?.id ?? null,
      });
    }
  }, [user, form]);

  const onFinish = async (values: EditUserFormValues) => {
    if (!user) return;

    setSubmitting(true);
    try {
      // null отвязывает должность/формирование
      const positionId = values.position_id ?? null;
      const formationId = values.formation_id ?? null;
      await usersApi.updateUserProfile(user.id, {
        position_id: positionId,
        formation_id: formationId,
      });

      onSaved(user.id, {
        position: positions?.find((item) => item.id === positionId) ?? null,
        formation: formations?.find((item) => item.id === formationId) ?? null,
      });
      alertHandler.addAlert({
        status: 'success',
        defaultText: `Анкета пользователя ${user.login} обновлена`,
      });
      onClose();
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    open,
    formations: formations ?? [],
    positions: positions ?? [],
    loadingDictionaries: open && (formations === null || positions === null),
    submitting,
    onFinish,
  };
}
