'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { BlogData } from '@/data/blog';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BlogData | null;
}

export default function BlogModal({ isOpen, onClose, data }: BlogModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return createPortal(
    <div className={`modal-overlay blog-modal ${isOpen ? 'open' : ''}`} id="blogModal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label={t('common.close')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div className="blog-hero">
          <img src={data.image} alt={data.title} />
        </div>
        <div className="modal-content">
          <div className="blog-meta">
            <span>{data.date}</span>
          </div>
          <h2>{data.title}</h2>
          <div className="blog-author">
            <img src={data.avatar} alt={data.author} />
            <div>
              <div className="name">{data.author}</div>
              <div className="title">{data.authorRole}</div>
            </div>
          </div>
          <div className="blog-body-text" dangerouslySetInnerHTML={{ __html: data.body }} />
        </div>
      </div>
    </div>,
    document.body
  );
}
