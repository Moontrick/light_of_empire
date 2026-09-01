import Image from 'next/image';
import classNames from 'classnames';
import type { UserAvatarProps, UserAvatarSize } from './types';
import styles from './UserAvatar.module.scss';

const SIZE_PX: Record<UserAvatarSize, number> = {
  sm: 36,
  md: 56,
  lg: 96,
};

export function UserAvatar({ size = 'md', alt = 'Аватар' }: UserAvatarProps) {
  const px = SIZE_PX[size];

  return (
    <Image
      src="/Logo2.jpg"
      alt={alt}
      width={px}
      height={px}
      className={classNames(styles.avatar, styles[size])}
    />
  );
}
