import type { SvgTypesProps } from '@/shared/types/SvgTypes';

export function IconCaseGem({
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
      <path d="M12 12H36L44 22L24 44L4 22L12 12Z" fill={fill} />
      <path d="M17 12H31L35 22H13L17 12Z" fill="#fff" fillOpacity="0.35" />
      <path d="M12 12H17L13 22H4L12 12Z" fill="#fff" fillOpacity="0.2" />
      <path d="M31 12H36L44 22H35L31 12Z" fill="#000" fillOpacity="0.15" />
      <path d="M4 22H13L24 44L4 22Z" fill="#fff" fillOpacity="0.14" />
      <path d="M35 22H44L24 44L35 22Z" fill="#000" fillOpacity="0.22" />
      <path
        d="M12 12H36L44 22L24 44L4 22L12 12Z"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
