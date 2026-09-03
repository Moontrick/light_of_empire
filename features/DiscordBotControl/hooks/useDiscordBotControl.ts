import { useCallback, useEffect, useState } from 'react';
import { discordBotApi, DiscordSettingCode } from '@/shared/api/discordBot';
import type { DiscordSettingDto } from '@/shared/api/discordBot';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { CHANNEL_ERRORS, SETTINGS_ERRORS } from '../constants';
import type { ChannelConfirmTarget } from '../types';

export function useDiscordBotControl() {
  const [settings, setSettings] = useState<DiscordSettingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [savingCode, setSavingCode] = useState<DiscordSettingCode | null>(null);
  const [channelConfirm, setChannelConfirm] = useState<ChannelConfirmTarget | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { data } = await discordBotApi.getSettings();
      setSettings(data);
    } catch (error) {
      setLoadError(true);
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error, SETTINGS_ERRORS) });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const applyUpdate = async (code: DiscordSettingCode, value: string | null) => {
    setSavingCode(code);
    try {
      const { data } = await discordBotApi.updateSetting(code, { value });
      setSettings((prev) => prev.map((item) => (item.code === code ? data : item)));
      alertHandler.addAlert({
        status: 'success',
        defaultText: value === null ? 'Настройка сброшена к значению по умолчанию' : 'Настройка сохранена',
      });
      return true;
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error, SETTINGS_ERRORS) });
      return false;
    } finally {
      setSavingCode(null);
    }
  };

  // Смена канала новостей — необратимое для бота действие: сначала показываем,
  // куда именно будут уходить новости, и только после подтверждения пишем настройку
  const requestChannelChange = async (channelId: string) => {
    setSavingCode(DiscordSettingCode.NEWS_CHANNEL_ID);
    try {
      const { data: channelName } = await discordBotApi.getChannelName(channelId);
      setChannelConfirm({ channelId, channelName });
    } catch (error) {
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error, CHANNEL_ERRORS) });
    } finally {
      setSavingCode(null);
    }
  };

  const saveSetting = (code: DiscordSettingCode, value: string) =>
    code === DiscordSettingCode.NEWS_CHANNEL_ID
      ? requestChannelChange(value)
      : applyUpdate(code, value);

  const resetSetting = (code: DiscordSettingCode) => applyUpdate(code, null);

  const confirmChannelChange = async () => {
    if (!channelConfirm) return;
    const ok = await applyUpdate(DiscordSettingCode.NEWS_CHANNEL_ID, channelConfirm.channelId);
    if (ok) setChannelConfirm(null);
  };

  return {
    settings,
    loading,
    loadError,
    savingCode,
    channelConfirm,
    reload: load,
    saveSetting,
    resetSetting,
    confirmChannelChange,
    cancelChannelChange: () => setChannelConfirm(null),
  };
}
