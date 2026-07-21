'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

interface EditableProps {
  path: string;
  type?: 'text' | 'textarea' | 'image' | 'rich-text';
  children: ReactNode;
  className?: string;
}

export default function Editable({ path, type = 'text', children, className = '' }: EditableProps) {
  const { editMode, updateContent } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  if (!editMode) {
    return <>{children}</>;
  }

  const handleClick = () => {
    const text = typeof children === 'string' ? children : (children as any)?.props?.children || '';
    setValue(String(text).replace(/&rarr;|→/g, '').trim());
    setEditing(true);
  };

  const handleSave = () => {
    updateContent(path, value);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  if (editing) {
    if (type === 'textarea' || type === 'rich-text') {
      return (
        <div className="editable-wrap">
          <textarea
            ref={inputRef as any}
            className="editable-input editable-textarea"
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        </div>
      );
    }
    return (
      <div className="editable-wrap">
        <input
          ref={inputRef as any}
          className="editable-input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }

  return (
    <span className={`editable-target ${className}`} onClick={handleClick} title="Click to edit">
      {children}
      <svg className="editable-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M17 3a2.85 2.85 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
    </span>
  );
}
