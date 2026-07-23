'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';

const DRAFT_KEY = 'mager-admin-draft';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

export interface EditedContent {
  [path: string]: string;
}

interface EditModeContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  dirty: boolean;
  slidesDirty: boolean;
  setSlidesDirty: (d: boolean) => void;
  editedContent: EditedContent;
  publishedContent: EditedContent;
  updateContent: (path: string, value: string) => void;
  markPublished: () => void;
  resetContent: () => void;
  hasDraft: boolean;
  loadDraft: () => void;
  discardDraft: () => void;
  debugState: () => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState<EditedContent>({});
  const [publishedContent, setPublishedContent] = useState<EditedContent>({});
  const [hasDraft, setHasDraft] = useState(false);
  const [slidesDirty, setSlidesDirty] = useState(false);
  const initialized = useRef(false);

  // Load published content from backend on mount
  useEffect(() => {
    async function loadPublished() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/content`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data: EditedContent = await res.json();
        if (Object.keys(data).length > 0) {
          // Only update published content if we don't have local state already
          setPublishedContent(prev => {
            // If we already have published content, merge carefully
            if (Object.keys(prev).length > 0) {
              return { ...data, ...prev };
            }
            return data;
          });
        }
      } catch {
        // Backend unavailable
      }
    }
    
    // Only load if we don't already have published content
    // This prevents overwrites on subsequent renders
    if (Object.keys(publishedContent).length === 0) {
      loadPublished();
    }
  }, []); // Remove publishedContent from deps to prevent unnecessary reloads

  // Check for local draft
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(DRAFT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Object.keys(parsed).length > 0) {
          setHasDraft(true);
          // Optionally auto-restore draft on load
          // setEditedContent(parsed);
        }
      } catch {
        localStorage.removeItem(DRAFT_KEY);
      }
    }
    initialized.current = true;
  }, []);

  // Auto-save edits to localStorage
  useEffect(() => {
    if (!initialized.current) return;
    if (Object.keys(editedContent).length > 0) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(editedContent));
    } else {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, [editedContent]);

  const dirty = Object.keys(editedContent).length > 0;

  const toggleEditMode = useCallback(() => {
    setEditMode(prev => !prev);
  }, []);

  const updateContent = useCallback((path: string, value: string) => {
    setEditedContent(prev => ({ ...prev, [path]: value }));
  }, []);

  const markPublished = useCallback(() => {
    // Merge edited content into published content (don't replace it entirely)
    setPublishedContent(prev => ({ ...prev, ...editedContent }));
    setEditedContent({});
    setHasDraft(false);
    localStorage.removeItem(DRAFT_KEY);
  }, [editedContent]);

  const resetContent = useCallback(() => {
    setEditedContent({});
    setHasDraft(false);
    localStorage.removeItem(DRAFT_KEY);
  }, []);

  const loadDraft = useCallback(() => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setEditedContent(parsed);
        setHasDraft(false);
      }
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  const discardDraft = useCallback(() => {
    setEditedContent({});
    setHasDraft(false);
    localStorage.removeItem(DRAFT_KEY);
  }, []);

  // Debug helper (remove in production)
  const debugState = useCallback(() => {
    console.log('Edit Mode Context State:', {
      editMode,
      dirty,
      editedContentKeys: Object.keys(editedContent),
      publishedContentKeys: Object.keys(publishedContent),
      hasDraft,
      editedContent,
      publishedContent
    });
  }, [editMode, dirty, editedContent, publishedContent, hasDraft]);

  return (
    <EditModeContext.Provider value={{
      editMode, toggleEditMode, dirty,
      slidesDirty, setSlidesDirty,
      editedContent, publishedContent,
      updateContent, markPublished, resetContent,
      hasDraft, loadDraft, discardDraft,
      debugState,
    }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error('useEditMode must be used within EditModeProvider');
  return ctx;
}
