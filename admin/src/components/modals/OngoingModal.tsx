'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { OngoingData } from '@/data/ongoing';
import Gallery from '@/components/ui/Gallery';
import TechStack from '@/components/ui/TechStack';
import ProgressBar from '@/components/ui/ProgressBar';

interface OngoingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: OngoingData | null;
}

export default function OngoingModal({ isOpen, onClose, data }: OngoingModalProps) {
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
    <div className={`modal-overlay portfolio-modal ${isOpen ? 'open' : ''}`} id="ongoingModal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label={t('common.close')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <Gallery items={data.images} alt={data.title} />
        <div className="modal-content">
          <span className="modal-tag">{data.tag}</span>
          <h2>{data.title}</h2>
          <p className="client">{data.client}</p>
          <div className="ongoing-meta" dangerouslySetInnerHTML={{ __html: data.status }} />
          <p>{data.desc}</p>
          <TechStack items={data.tech} />
          <div className="modal-progress">
            <ProgressBar width={data.progress} label={data.progress} remaining={data.remaining} />
          </div>
          {data.resources.length > 0 && (
            <div className="modal-resources">
              {data.resources.map((r, i) => (
                <a key={i} href={r.url} target="_blank" dangerouslySetInnerHTML={{ __html: r.icon + r.label }} />
              ))}
            </div>
          )}
          <div className="modal-actions">
            <a href="#contact" className="btn btn-primary modal-btn" onClick={onClose}>{t('common.getInTouch')}</a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
