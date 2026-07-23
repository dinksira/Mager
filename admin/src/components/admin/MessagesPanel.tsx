'use client';
import { useEffect, useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/contact`)
      .then(r => r.json())
      .then(data => { setMessages(data); setLoading(false); })
      .catch(() => { setError('Failed to load messages'); setLoading(false); });
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) setMessages(prev => prev.filter(m => m.id !== id));
    } catch {
      alert('Failed to delete message');
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) return (
    <div className="mp-status">
      <div className="mp-spinner" />
      <span>Loading messages...</span>
    </div>
  );

  if (error) return (
    <div className="mp-status mp-status-error">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>{error}</span>
    </div>
  );

  const unread = messages.filter(m => !m.read).length;

  return (
    <div className="messages-panel">
      <div className="mp-header">
        <div className="mp-header-left">
          <svg className="mp-header-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <h3 className="mp-title">Messages</h3>
        </div>
        <div className="mp-header-right">
          <span className="mp-total">{messages.length} total</span>
          {unread > 0 && <span className="mp-count">{unread} new</span>}
        </div>
      </div>
      {messages.length === 0 ? (
        <div className="mp-empty">
          <div className="mp-empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <p className="mp-empty-text">No messages yet</p>
          <p className="mp-empty-sub">Visitor submissions will appear here</p>
        </div>
      ) : (
        <div className="mp-list">
          {messages.map(m => {
            const isExpanded = expanded === m.id;
            return (
              <div
                key={m.id}
                className={`mp-item ${!m.read ? 'mp-unread' : ''} ${isExpanded ? 'mp-expanded' : ''}`}
                onClick={() => setExpanded(isExpanded ? null : m.id)}
              >
                <div className="mp-item-top">
                  <div className="mp-avatar" style={{ background: avatarColor(m.name) }}>
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="mp-item-info">
                    <span className="mp-name">{m.name}</span>
                    <span className="mp-email">{m.email}</span>
                  </div>
                  <span className="mp-date">{formatDate(m.createdAt)}</span>
                  <button className="mp-delete" onClick={(e) => handleDelete(m.id, e)} title="Delete">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  </button>
                </div>
                {m.subject && <div className="mp-subject">{m.subject}</div>}
                <div className="mp-preview">
                  {isExpanded ? (
                    <div className="mp-body">{m.message}</div>
                  ) : (
                    <>{m.message.slice(0, 100)}{m.message.length > 100 ? '...' : ''}</>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function avatarColor(name: string): string {
  const colors = [
    'linear-gradient(135deg, #f43f5e, #e11d48)',
    'linear-gradient(135deg, #f97316, #ea580c)',
    'linear-gradient(135deg, #eab308, #ca8a04)',
    'linear-gradient(135deg, #22c55e, #16a34a)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #6366f1, #4f46e5)',
    'linear-gradient(135deg, #a855f7, #9333ea)',
    'linear-gradient(135deg, #ec4899, #db2777)',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
