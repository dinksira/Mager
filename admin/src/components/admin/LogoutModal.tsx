'use client';

import { useEditMode } from '@/contexts/EditModeContext';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  const { dirty } = useEditMode();

  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <div className="admin-modal-icon-wrap">
          <svg className="admin-modal-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef5350" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="admin-modal-title">Leave admin panel?</h2>
        <p className="admin-modal-desc">
          You'll be signed out and redirected to the home page.
          {dirty && ' You have unsaved changes.'}
        </p>
        <div className="admin-modal-actions">
          <button className="admin-modal-btn admin-modal-btn-cancel" onClick={onCancel}>
            Stay
          </button>
          <button className="admin-modal-btn admin-modal-btn-confirm" onClick={onConfirm}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
