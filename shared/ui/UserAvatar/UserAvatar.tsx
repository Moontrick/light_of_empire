import Image from 'next/image';
import classNames from 'classnames';
import { getCoverUrl } from '@/shared/utils/getCoverUrl';
import type { UserAvatarProps, UserAvatarSize } from './types';
import styles from './UserAvatar.module.scss';

const SIZE_PX: Record<UserAvatarSize, number> = {
  sm: 36,
  md: 56,
  lg: 96,
};

export function UserAvatar({ size = 'md', alt = 'Аватар', src }: UserAvatarProps) {
  const px = SIZE_PX[size];
  const className = classNames(styles.avatar, styles[size]);
  const avatarUrl = getCoverUrl(src ?? null);

  // Домен API не в images.domains — пользовательские аватары отдаём обычным <img>
  if (avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatarUrl} alt={alt} width={px} height={px} className={className} />;
  }

  return <Image src="/Logo2.jpg" alt={alt} width={px} height={px} className={className} />;
}
