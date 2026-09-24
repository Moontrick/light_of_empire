import type { SvgTypesProps } from '@/shared/types/SvgTypes';

const STAR_PATH =
  'M24 4C25.2 16 32 22.8 44 24C32 25.2 25.2 32 24 44C22.8 32 16 25.2 4 24C16 22.8 22.8 16 24 4Z';

export function IconCaseStar({
  fill = 'currentColor',
  width = 48,
  height = 48,
  className,
}: SvgTypesProps & { className?: string }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d={STAR_PATH} fill={fill} />
      <path d="M24 4C25.2 16 32 22.8 44 24L24 24V4Z" fill="#fff" fillOpacity="0.3" />
      <path d="M24 44C22.8 32 16 25.2 4 24L24 24V44Z" fill="#000" fillOpacity="0.18" />
      <path
        d={STAR_PATH}
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M39 5C39.4 8 41 9.6 44 10C41 10.4 39.4 12 39 15C38.6 12 37 10.4 34 10C37 9.6 38.6 8 39 5Z"
        fill="#fff"
        fillOpacity="0.85"
      />
      <path
        d="M9 33C9.4 36 11 37.6 14 38C11 38.4 9.4 40 9 43C8.6 40 7 38.4 4 38C7 37.6 8.6 36 9 33Z"
        fill="#fff"
        fillOpacity="0.85"
      />
    </svg>
  );
}
