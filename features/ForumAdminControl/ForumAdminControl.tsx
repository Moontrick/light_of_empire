'use client';

import { ConfigProvider, Tabs } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { CategoriesTab } from './components/CategoriesTab';
import { TagsTab } from './components/TagsTab';
import { useForumAdminControl } from './hooks/useForumAdminControl';
import type { ForumAdminTab } from './types';

export function ForumAdminControl() {
  const { activeTab, setActiveTab } = useForumAdminControl();

  return (
    <ConfigProvider theme={FORM_THEME}>
      <HudCard title="Форум">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as ForumAdminTab)}
          items={[
            { key: 'categories', label: 'Разделы', children: <CategoriesTab /> },
            { key: 'tags', label: 'Теги', children: <TagsTab /> },
          ]}
        />
      </HudCard>
    </ConfigProvider>
  );
}
