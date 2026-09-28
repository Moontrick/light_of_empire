export interface ForumThreadProps {
  id: number;
}

export interface ThreadPermissions {
  isAdmin: boolean;
  isAuthor: boolean;
  canEdit: boolean;
  canClose: boolean;
  canReopen: boolean;
  canLock: boolean;
  canUnlock: boolean;
  canDelete: boolean;
  canRestore: boolean;
  // Закрепить, перенести, теги
  canModerate: boolean;
  canComment: boolean;
}
