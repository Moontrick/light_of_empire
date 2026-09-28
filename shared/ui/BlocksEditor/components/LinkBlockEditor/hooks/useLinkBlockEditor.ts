import { isValidLinkUrl } from '@/shared/utils/linkUrl';
import type { LinkBlockEditorProps } from '../types';

export function useLinkBlockEditor({ value, onChange }: LinkBlockEditorProps) {
  const url = value.url;
  const text = value.text ?? '';
  const urlInvalid = url.trim().length > 0 && !isValidLinkUrl(url);

  const setUrl = (nextUrl: string) => onChange({ url: nextUrl, ...(text ? { text } : {}) });
  const setText = (nextText: string) => onChange({ url, ...(nextText ? { text: nextText } : {}) });

  return { url, text, urlInvalid, setUrl, setText };
}
