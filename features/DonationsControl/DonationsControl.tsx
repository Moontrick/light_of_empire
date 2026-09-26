'use client';

import { Button, ConfigProvider } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { DONATIONS_SECTION_TITLE } from '@/shared/constants';
import { HudCard } from '@ui/HudCard';
import { DonationsTable } from './components/DonationsTable';
import { useDonationsControl } from './hooks/useDonationsControl';

export function DonationsControl() {
  const { items, loading, mutatingId, setActive, goCreate, goEdit } = useDonationsControl();

  return (
    <ConfigProvider theme={FORM_THEME}>
      <HudCard
        title={DONATIONS_SECTION_TITLE}
        extra={
          <Button type="primary" onClick={goCreate}>
            Создать товар
          </Button>
        }
      >
        <DonationsTable
          items={items}
          loading={loading}
          mutatingId={mutatingId}
          onEdit={goEdit}
          onSetActive={setActive}
        />
      </HudCard>
    </ConfigProvider>
  );
}
