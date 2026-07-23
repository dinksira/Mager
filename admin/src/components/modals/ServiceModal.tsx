'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { ServiceData } from '@/data/services';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ServiceData | null;
}

export default function ServiceModal({ isOpen, onClose, data }: ServiceModalProps) {
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
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} id="serviceModal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label={t('common.close')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        {data.icon && <div className="modal-icon" dangerouslySetInnerHTML={{ __html: data.icon }} />}
        <span className="modal-tag">{data.tag ?? ''}</span>
        <h2>{data.title}</h2>
        <p>{data.desc}</p>
        <ul className="modal-features">
          {(data.features ?? []).map((f, i) => (
            <li key={i}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              {f}
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-primary modal-btn" onClick={onClose}>{t('common.getInTouch')}</a>
      </div>
    </div>,
    document.body
  );
}
