'use client';

import { useState } from 'react';
import AdminShell from '@/components/layout/AdminShell';
import Blog from '@/components/sections/Blog';
import BlogModal from '@/components/modals/BlogModal';
import { blogData } from '@/data/blog';
import { useEditMode } from '@/contexts/EditModeContext';

function getItem(editedContent: any, publishedContent: any, key: string, fallback: any[], i: number) {
  try {
    const raw = editedContent[key] ?? publishedContent[key];
    if (raw) {
      const items = JSON.parse(raw);
      if (items?.[i]) return { ...fallback[i], ...items[i] };
    }
  } catch {}
  return fallback[i];
}

function BlogPageInner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { editedContent, publishedContent } = useEditMode();

  return (
    <>
      <Blog onBlogClick={(i) => { setIndex(i); setModalOpen(true); }} />
      <BlogModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={getItem(editedContent, publishedContent, 'blog.posts', blogData, index)} />
    </>
  );
}

export default function BlogPage() {
  return (
    <AdminShell>
      <BlogPageInner />
    </AdminShell>
  );
}
