'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useEditMode } from '@/contexts/EditModeContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

interface ImageManagerModalProps {
  open: boolean;
  onClose: () => void;
  onSlidesChange?: (slides: string[]) => void;
}

export default function ImageManagerModal({ open, onClose, onSlidesChange }: ImageManagerModalProps) {
  const { slidesDirty, setSlidesDirty } = useEditMode();
  const [slides, setSlides] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [replacing, setReplacing] = useState<string | null>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    Promise.all([
      fetch(`${BACKEND_URL}/api/slides`).then(r => r.json()).catch(() => []),
      fetch(`${BACKEND_URL}/api/slides/live`).then(r => r.json()).catch(() => []),
    ]).then(([staging, live]) => {
      const seen = new Set<string>();
      const merged: string[] = [];
      for (const s of [...staging, ...live]) {
        if (!seen.has(s)) { seen.add(s); merged.push(s); }
      }
      setSlides(merged);
    });
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const updateSlides = (updated: string[]) => {
    setSlidesDirty(true);
    onSlidesChange?.(updated);
    fetch(`${BACKEND_URL}/api/slides/live`)
      .then(r => r.json()).catch(() => [] as string[])
      .then((live: string[]) => {
        const seen = new Set<string>();
        const merged: string[] = [];
        for (const s of [...updated, ...live]) {
          if (!seen.has(s)) { seen.add(s); merged.push(s); }
        }
        setSlides(merged);
      });
  };

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const fd = new FormData();
    for (const f of files) fd.append('images', f);
    try {
      const r = await fetch(`${BACKEND_URL}/api/slides/upload`, { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) updateSlides(d.slides);
    } catch {}
    setUploading(false);
    if (addInputRef.current) addInputRef.current.value = '';
  };

  const handleReplace = (filename: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReplacing(filename);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const r = await fetch(`${BACKEND_URL}/api/slides/replace/${encodeURIComponent(filename)}`, { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) updateSlides(d.slides);
    } catch {}
    setReplacing(null);
  };

  const handleDelete = async (filename: string) => {
    try {
      const r = await fetch(`${BACKEND_URL}/api/slides/${encodeURIComponent(filename)}`, { method: 'DELETE' });
      const d = await r.json();
      if (d.ok) updateSlides(d.slides);
    } catch {}
  };

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay slides-modal-overlay open" onClick={(e) => { e.stopPropagation(); if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="slides-modal">
          <div className="slides-modal-header">
            <h2>Manage Slideshow Images</h2>
            <button className="slides-modal-close" onClick={(e) => { e.stopPropagation(); onClose(); }} type="button">&times;</button>
          </div>
          <div className="slides-modal-body">
            <div className="slides-grid">
              {slides.map((filename) => (
                <div key={filename} className="slide-card">
                  <img src={`${BACKEND_URL}/uploads/${encodeURIComponent(filename)}`} alt={filename} />
                  <span className="slide-name">{filename}</span>
                  <div className="slide-actions">
                    <label className={`slide-btn slide-replace${replacing === filename ? ' disabled' : ''}`}>
                      {replacing === filename ? 'Replacing...' : 'Replace'}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        disabled={replacing === filename}
                        onChange={handleReplace(filename)}
                      />
                    </label>
                    <button className="slide-btn slide-delete" onClick={() => handleDelete(filename)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="slides-add-area">
              <label className={`slides-add-btn${uploading ? ' disabled' : ''}`}>
                {uploading ? 'Uploading...' : '+ Add Images'}
                <input
                  ref={addInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  disabled={uploading}
                  onChange={handleAdd}
                />
              </label>
            </div>
            {slidesDirty && (
              <div className="slides-publish-banner">
                <span>Changes saved to staging — use the <strong>Publish Changes</strong> button above to go live.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
