import type { SvgTypesProps } from '@/shared/types/SvgTypes';

export function IconSmallReward({
  stroke = 'currentColor',
  width = 18,
  height = 18,
  className,
}: SvgTypesProps & { className?: string }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
      <path d="M11.6923 8.8H11.9231L8.92308 16H10.3077L14 6.4H10.3077H10.0769H8.92308H8.69231H8V8.8H8.69231H8.92308H10.0769H10.3077H11.6923Z" fill="#F59E0B"/>
      <path d="M10.3077 6.4H14L10.3077 16H8.92308L11.9231 8.8H11.6923H10.3077M10.3077 6.4V4H10.0769V6.4M10.3077 6.4H10.0769M10.0769 6.4H8.92308M8.92308 6.4V4H8.69231V6.4M8.92308 6.4H8.69231M8.69231 6.4H8V8.8H8.69231M8.69231 8.8V11.2H8.92308V8.8M8.69231 8.8H8.92308M8.92308 8.8H10.0769M10.0769 8.8V11.2H10.3077V8.8M10.0769 8.8H10.3077" stroke="#F59E0B" strokeWidth="0.5"/>
    </svg>

  );
}
