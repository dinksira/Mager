'use client';

import { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { signOut } from 'next-auth/react';
import LogoutModal from './LogoutModal';

export default function EditModeToggle() {
  const { editMode, toggleEditMode, dirty, hasDraft, loadDraft, discardDraft } = useEditMode();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <div className="admin-bar">
        <div className="admin-bar-inner">
          <div className="admin-bar-left">
            <span className="admin-bar-brand">Admin</span>
            {hasDraft ? (
              <span className="admin-bar-badge admin-bar-draft">
                Unsaved draft
                <button className="admin-bar-draft-restore" onClick={loadDraft} title="Restore draft">
                  Restore
                </button>
                <button className="admin-bar-draft-discard" onClick={discardDraft} title="Discard draft">
                  Discard
                </button>
              </span>
            ) : (
              <span className="admin-bar-badge" data-dirty={dirty}>
                {dirty ? 'Unsaved changes' : 'All saved'}
              </span>
            )}
          </div>
          <div className="admin-bar-right">
            <div className="admin-toggle-wrap">
              <span className={`admin-toggle-label${editMode ? ' active' : ''}`}>
                Edit Mode
              </span>
              <button
                className={`admin-toggle${editMode ? ' on' : ''}`}
                onClick={toggleEditMode}
                aria-label="Toggle edit mode"
              >
                <span className="admin-toggle-knob" />
              </button>
            </div>
            <button
              className="admin-btn admin-btn-logout"
              onClick={() => setShowLogoutModal(true)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <LogoutModal
          onConfirm={() => signOut({ callbackUrl: '/' })}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}
