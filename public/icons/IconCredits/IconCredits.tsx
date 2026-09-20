import type { SvgTypesProps } from '@/shared/types/SvgTypes';

export function IconCredits({
  stroke = 'currentColor',
  width = 18,
  height = 18,
  className,
}: SvgTypesProps & { className?: string }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M17.5 5.5A8 8 0 0 0 7 12a8 8 0 0 0 10.5 6.5"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M4 9.5h11M4 14.5h11" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
