import { SvgTypesProps } from '@/shared/types/SvgTypes';

export function IconKredit({
  stroke = 'currentColor',
  width = 14,
  height = 26,
  className
}: SvgTypesProps & {className?: string}) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 14 26" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      aria-hidden="true">
      <path d="M8.25 10.25H8.75L2.25 25.25H5.25L13.25 5.25H5.25H4.75H2.25H1.75H0.25V10.25H1.75H2.25H4.75H5.25H8.25Z" fill={stroke} />
      <path d="M5.25 5.25H13.25L5.25 25.25H2.25L8.75 10.25H8.25H5.25M5.25 5.25V0.25H4.75V5.25M5.25 5.25H4.75M4.75 5.25H2.25M2.25 5.25V0.25H1.75V5.25M2.25 5.25H1.75M1.75 5.25H0.25V10.25H1.75M1.75 10.25V15.25H2.25V10.25M1.75 10.25H2.25M2.25 10.25H4.75M4.75 10.25V15.25H5.25V10.25M4.75 10.25H5.25" stroke={stroke} strokeWidth="0.5"/>
    </svg>
  );
}
