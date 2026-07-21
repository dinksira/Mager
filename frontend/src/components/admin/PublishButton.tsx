'use client';

import { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

export default function PublishButton() {
  const { editedContent, dirty, resetContent } = useEditMode();
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handlePublish = async () => {
    setPublishing(true);
    setToast(null);
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent }),
      });
      if (!res.ok) throw new Error('Save failed');
      resetContent();
      setToast('Published successfully');
    } catch {
      setToast('Failed to publish');
    } finally {
      setPublishing(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (!dirty) return null;

  return (
    <>
      <button
        className="admin-publish-btn"
        onClick={handlePublish}
        disabled={publishing}
      >
        {publishing ? 'Publishing...' : '📦 Publish Changes'}
      </button>
      {toast && <div className="admin-toast">{toast}</div>}
    </>
  );
}
