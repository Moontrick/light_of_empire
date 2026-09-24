import type { SvgTypesProps } from '@/shared/types/SvgTypes';

const CROWN_PATH = 'M8 36L5 13L17 23L24 7L31 23L43 13L40 36H8Z';

export function IconCaseCrown({
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
      <path d={CROWN_PATH} fill={fill} />
      <path d="M8 36L5 13L17 23L24 7V36H8Z" fill="#fff" fillOpacity="0.22" />
      <path d="M24 7L31 23L43 13L40 36H24V7Z" fill="#000" fillOpacity="0.14" />
      <path
        d={CROWN_PATH}
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <rect x="7" y="38" width="34" height="5" fill={fill} />
      <rect x="7" y="38" width="34" height="5" fill="#000" fillOpacity="0.25" />
      <circle cx="24" cy="29" r="3.2" fill="#fff" fillOpacity="0.9" />
      <circle cx="14.5" cy="30" r="2" fill="#fff" fillOpacity="0.7" />
      <circle cx="33.5" cy="30" r="2" fill="#fff" fillOpacity="0.7" />
    </svg>
  );
}
