'use client';

import { Button, ConfigProvider, Skeleton } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { ChannelConfirmModal } from './components/ChannelConfirmModal';
import { SettingCard } from './components/SettingCard';
import { useDiscordBotControl } from './hooks/useDiscordBotControl';
import styles from './DiscordBotControl.module.scss';

export function DiscordBotControl() {
  const {
    settings,
    loading,
    loadError,
    savingCode,
    channelConfirm,
    reload,
    saveSetting,
    resetSetting,
    confirmChannelChange,
    cancelChannelChange,
  } = useDiscordBotControl();

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard title="Настройки Discord-бота">
        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : loadError ? (
          <div className={styles.error}>
            <p>Не удалось загрузить настройки.</p>
            <Button onClick={() => void reload()}>Повторить</Button>
          </div>
        ) : (
          <div className={styles.list}>
            {settings.map((setting) => (
              <SettingCard
                key={setting.code}
                setting={setting}
                saving={savingCode === setting.code}
                disabled={savingCode !== null}
                onSave={(value) => void saveSetting(setting.code, value)}
                onReset={() => void resetSetting(setting.code)}
              />
            ))}
          </div>
        )}
      </HudCard>
      <ChannelConfirmModal
        target={channelConfirm}
        confirming={savingCode !== null}
        onConfirm={() => void confirmChannelChange()}
        onCancel={cancelChannelChange}
      />
    </ConfigProvider>
  );
}
