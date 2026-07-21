'use client';

import { useEditMode } from '@/contexts/EditModeContext';
import { signOut } from 'next-auth/react';

export default function EditModeToggle() {
  const { editMode, toggleEditMode, dirty } = useEditMode();

  return (
    <div className="admin-bar">
      <div className="admin-bar-inner">
        <div className="admin-bar-left">
          <span className="admin-bar-brand">Admin</span>
          <span className="admin-bar-badge" data-dirty={dirty}>
            {dirty ? 'Unsaved changes' : 'All saved'}
          </span>
        </div>
        <div className="admin-bar-right">
          <button
            className={`admin-btn ${editMode ? 'admin-btn-active' : ''}`}
            onClick={toggleEditMode}
          >
            {editMode ? '🟢 Edit Mode ON' : '⚪ Edit Mode OFF'}
          </button>
          <button className="admin-btn admin-btn-logout" onClick={() => signOut({ callbackUrl: '/admin/login' })}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
