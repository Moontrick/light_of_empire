import type { SvgTypesProps } from '@/shared/types/SvgTypes';

export function IconCaseShard({
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
      <path d="M24 3L34 18L30 44H18L14 18L24 3Z" fill={fill} />
      <path d="M24 3L14 18L18 44H21.5V16L24 3Z" fill="#fff" fillOpacity="0.28" />
      <path d="M24 3L34 18L30 44H26.5V16L24 3Z" fill="#000" fillOpacity="0.18" />
      <path d="M21.5 16L24 3L26.5 16V44H21.5V16Z" fill="#fff" fillOpacity="0.12" />
      <path
        d="M24 3L34 18L30 44H18L14 18L24 3Z"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
