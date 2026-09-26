export type UserAvatarSize = 'sm' | 'md' | 'lg';

export interface UserAvatarProps {
  size?: UserAvatarSize;
  alt?: string;
  // Относительный avatar_url с бэка; без него — заглушка-логотип
  src?: string | null;
}
