export function getCoverUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  return `${process.env.NEXT_PUBLIC_BACK_PROD || ''}${imageUrl}`;
}
