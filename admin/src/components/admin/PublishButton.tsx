'use client';

import { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4000';

export default function PublishButton() {
  const { editedContent, dirty, slidesDirty, markPublished, setSlidesDirty } = useEditMode();
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handlePublish = async () => {
    setPublishing(true);
    setToast(null);
    try {
      if (dirty) {
        const res = await fetch('/api/admin/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: editedContent }),
        });
        if (!res.ok) throw new Error('Save failed');
        markPublished();
      }
      if (slidesDirty) {
        const res = await fetch(`${BACKEND_URL}/api/slides/publish`, { method: 'POST' });
        if (!res.ok) throw new Error('Slide publish failed');
        setSlidesDirty(false);
      }
      setToast('Published successfully');
    } catch {
      setToast('Failed to publish');
    } finally {
      setPublishing(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (!dirty && !slidesDirty) return null;

  return (
    <>
      <button
        className="admin-publish-btn"
        onClick={handlePublish}
        disabled={publishing}
      >
        {publishing ? 'Publishing...' : 'Publish Changes'}
      </button>
      {toast && <div className="admin-toast">{toast}</div>}
    </>
  );
}
