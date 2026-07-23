'use client';
import { useState, useRef } from 'react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
  };

  const removeTag = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      addTag(input);
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.includes(',')) {
      const parts = val.split(',');
      addTag(parts[0]);
      setInput(parts.slice(1).join(',').trim());
    } else {
      setInput(val);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text');
    if (/[, \n]/.test(text)) {
      e.preventDefault();
      const tags = text.split(/[, \n]+/).map(s => s.trim()).filter(Boolean);
      const merged = [...value];
      for (const t of tags) {
        if (t && !merged.includes(t)) merged.push(t);
      }
      onChange(merged);
    }
  };

  return (
    <div className="tag-input" onClick={() => inputRef.current?.focus()}>
      {value.map((tag, i) => (
        <span key={i} className="tag">
          {tag}
          <button className="tag-remove" onClick={(e) => { e.stopPropagation(); removeTag(i); }} title="Remove">&times;</button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={value.length === 0 ? (placeholder || 'Type and press space') : ''}
        className="tag-input-field"
      />
    </div>
  );
}
