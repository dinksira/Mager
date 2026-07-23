'use client';
import { useRef, useEffect, useCallback } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const TOOLBAR_BUTTONS = [
  { cmd: 'bold', icon: '<strong>B</strong>', title: 'Bold' },
  { cmd: 'italic', icon: '<em>I</em>', title: 'Italic' },
  { cmd: 'underline', icon: '<u>U</u>', title: 'Underline' },
  { cmd: 'strikeThrough', icon: '<span style="text-decoration:line-through">S</span>', title: 'Strikethrough' },
  { type: 'divider' as const },
  { cmd: 'insertUnorderedList', icon: `<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><path d="M2 4a1 1 0 100-2 1 1 0 000 2zm3-1h9v2H5V3zm-3 5a1 1 0 100-2 1 1 0 000 2zm3-1h9v2H5V7zm-3 5a1 1 0 100-2 1 1 0 000 2zm3-1h9v2H5v-2z"/></svg>`, title: 'Bullet List' },
  { cmd: 'insertOrderedList', icon: `<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><path d="M2 4a1 1 0 100-2 1 1 0 000 2zm4-1h8v2H6V3zM2 9a1 1 0 100-2 1 1 0 000 2zm4-1h8v2H6V8zm-4 5a1 1 0 100-2 1 1 0 000 2zm4-1h8v2H6v-2z"/></svg>`, title: 'Numbered List' },
  { type: 'divider' as const },
  { cmd: 'formatBlock', arg: 'h4', icon: 'H', title: 'Heading' },
  { cmd: 'formatBlock', arg: 'p', icon: '¶', title: 'Paragraph' },
  { type: 'divider' as const },
  { cmd: 'createLink', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`, title: 'Link' },
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdating = useRef(false);

  const exec = useCallback((cmd: string, arg?: string) => {
    document.execCommand(cmd, false, arg);
    editorRef.current?.focus();
    if (!isUpdating.current) {
      isUpdating.current = true;
      requestAnimationFrame(() => { isUpdating.current = false; });
    }
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el || isUpdating.current) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
  }, [value]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const handler = () => {
      if (!isUpdating.current) onChange(el.innerHTML);
    };
    el.addEventListener('input', handler);
    return () => el.removeEventListener('input', handler);
  }, [onChange]);

  const handleToolbarAction = (btn: typeof TOOLBAR_BUTTONS[0]) => {
    if ('type' in btn) return;
    if (btn.cmd === 'createLink') {
      const url = prompt('Enter link URL:', 'https://');
      if (url) exec('createLink', url);
      return;
    }
    if (btn.cmd === 'formatBlock') {
      document.execCommand('formatBlock', false, btn.arg);
      if (editorRef.current) onChange(editorRef.current.innerHTML);
      editorRef.current?.focus();
      return;
    }
    exec(btn.cmd);
  };

  return (
    <div className="rte-wrapper">
      <div className="rte-toolbar">
        {TOOLBAR_BUTTONS.map((btn, i) =>
          'type' in btn ? (
            <span key={i} className="rte-divider" />
          ) : (
            <button
              key={i}
              className="rte-btn"
              title={btn.title}
              onClick={() => handleToolbarAction(btn)}
              type="button"
              dangerouslySetInnerHTML={{ __html: btn.icon }}
            />
          )
        )}
      </div>
      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder || 'Write your post content here...'}
      />
    </div>
  );
}
