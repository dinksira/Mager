'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface EditedContent {
  [path: string]: string;
}

interface EditModeContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  dirty: boolean;
  editedContent: EditedContent;
  updateContent: (path: string, value: string) => void;
  resetContent: () => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState<EditedContent>({});

  const dirty = Object.keys(editedContent).length > 0;

  const toggleEditMode = useCallback(() => {
    setEditMode(prev => !prev);
  }, []);

  const updateContent = useCallback((path: string, value: string) => {
    setEditedContent(prev => ({ ...prev, [path]: value }));
  }, []);

  const resetContent = useCallback(() => {
    setEditedContent({});
  }, []);

  return (
    <EditModeContext.Provider value={{ editMode, toggleEditMode, dirty, editedContent, updateContent, resetContent }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error('useEditMode must be used within EditModeProvider');
  return ctx;
}
