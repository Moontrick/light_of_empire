'use client';

import { createContext, useContext } from 'react';
import type { DocEditorContextValue } from './types';

const DocEditorContext = createContext<DocEditorContextValue | null>(null);

export const DocEditorProvider = DocEditorContext.Provider;

export function useDocEditor(): DocEditorContextValue {
  const value = useContext(DocEditorContext);
  if (!value) throw new Error('useDocEditor должен вызываться внутри DocEditorProvider');
  return value;
}
