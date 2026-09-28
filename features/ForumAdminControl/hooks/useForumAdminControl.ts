import { useEffect, useState } from 'react';
import { useForumStore } from '@store/forumStore';
import type { ForumAdminTab } from '../types';

export function useForumAdminControl() {
  const fetchCategories = useForumStore((state) => state.fetchCategories);
  const fetchTags = useForumStore((state) => state.fetchTags);
  const [activeTab, setActiveTab] = useState<ForumAdminTab>('categories');

  // force: списки могли быть закэшированы публичными страницами до правок
  useEffect(() => {
    void fetchCategories(true);
    void fetchTags(true);
  }, [fetchCategories, fetchTags]);

  return { activeTab, setActiveTab };
}
