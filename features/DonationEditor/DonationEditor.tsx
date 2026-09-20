'use client';

import { Button, ConfigProvider, Input, InputNumber, Skeleton, Switch } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { DONATION_IMAGES_MAX, DONATION_PRICE_MAX, DONATION_TITLE_MAX } from '@/shared/constants';
import { HudCard } from '@ui/HudCard';
import { NewsBlocksEditor } from '@ui/NewsBlocksEditor';
import { DonationImagesEditor } from './components/DonationImagesEditor';
import { useDonationEditor } from './hooks/useDonationEditor';
import type { DonationEditorProps } from './types';
import styles from './DonationEditor.module.scss';

export function DonationEditor({ id }: DonationEditorProps) {
  const {
    title, setTitle, price, setPrice, isActive, setIsActive, blocks, setBlocks,
    existingImages, pendingImages, processing, deletingId,
    addFiles, removePending, removeExisting,
    editable, loading, notFound, loadError, retry, saving, canSave, save, goBack,
  } = useDonationEditor(id);

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard title={editable ? 'Редактирование товара' : 'Новый товар'}>
        {loading && <Skeleton active paragraph={{ rows: 8 }} />}

        {!loading && notFound && (
          <div className={styles.notFound}>
            <p>Товар не найден</p>
            <Button onClick={goBack}>К списку</Button>
          </div>
        )}

        {!loading && loadError && (
          <div className={styles.notFound}>
            <p>Не удалось загрузить товар</p>
            <Button onClick={retry}>Повторить</Button>
            <Button onClick={goBack}>К списку</Button>
          </div>
        )}

        {!loading && !notFound && !loadError && (
          <div className={styles.form}>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Название товара"
              size="large"
              maxLength={DONATION_TITLE_MAX}
            />

            <div className={styles.row}>
              <InputNumber
                className={styles.price}
                value={price}
                onChange={(value) => setPrice(typeof value === 'number' ? value : null)}
                min={1}
                max={DONATION_PRICE_MAX}
                precision={0}
                placeholder="Цена в кредитах"
              />
              <label className={styles.switch}>
                <Switch checked={isActive} onChange={setIsActive} />
                <span>{isActive ? 'Показывается на витрине' : 'Скрыт с витрины'}</span>
              </label>
            </div>

            <DonationImagesEditor
              existing={existingImages}
              pending={pendingImages}
              max={DONATION_IMAGES_MAX}
              processing={processing}
              deletingId={deletingId}
              onAdd={(files) => void addFiles(files)}
              onRemoveExisting={(imageId) => void removeExisting(imageId)}
              onRemovePending={removePending}
            />

            <NewsBlocksEditor value={blocks} onChange={setBlocks} />

            <div className={styles.actions}>
              <Button type="primary" onClick={() => void save()} loading={saving} disabled={!canSave || saving}>
                Сохранить
              </Button>
              <Button onClick={goBack} disabled={saving}>
                Отмена
              </Button>
            </div>
          </div>
        )}
      </HudCard>
    </ConfigProvider>
  );
}
