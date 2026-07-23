'use client';

import { useRef } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

interface EditableImageProps {
  path: string;
  src: string;
  alt: string;
  className?: string;
}

export default function EditableImage({ path, src, alt, className = '' }: EditableImageProps) {
  const { editMode, editedContent, publishedContent, updateContent } = useEditMode();
  const inputRef = useRef<HTMLInputElement>(null);

  const publishedSrc = publishedContent[path];
  const editedSrc = editedContent[path];
  const displaySrc = editedSrc
    ? `${BACKEND_URL}/uploads/${encodeURIComponent(editedSrc)}`
    : publishedSrc
      ? `${BACKEND_URL}/uploads/${encodeURIComponent(publishedSrc)}`
      : src;

  const handleClick = () => {
    if (editMode) inputRef.current?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const r = await fetch(`${BACKEND_URL}/api/content/upload-image`, { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) updateContent(path, d.filename);
    } catch {}
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`editable-image-wrap ${className}`} onClick={handleClick} style={editMode ? { cursor: 'pointer' } : undefined}>
      <img src={displaySrc} alt={alt} draggable={false} />
      {editMode && <div className="editable-image-overlay">Click to replace image</div>}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
    </div>
  );
}
