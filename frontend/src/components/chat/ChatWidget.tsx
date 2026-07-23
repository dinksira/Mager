'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! 👋 I'm MagerBot. Ask me anything about Mager Software Solution!" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const userMessages = [...messages, { role: 'user', content: text } as Message];
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: userMessages.slice(1).map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!res.ok) throw new Error('Failed');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                setMessages(prev => {
                  const next = [...prev];
                  const last = next[next.length - 1];
                  if (last.role === 'assistant') {
                    next[next.length - 1] = { ...last, content: last.content + content };
                  }
                  return next;
                });
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className={`cw-fab ${open ? 'cw-fab-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
      >
        {open ? <CloseIcon /> : <BotIcon />}
      </button>

      <div className={`cw-panel ${open ? 'cw-panel-open' : ''}`}>
        <div className="cw-header">
          <div className="cw-header-left">
            <div className="cw-header-avatar"><BotIcon /></div>
            <div>
              <div className="cw-header-title">MagerBot</div>
              <div className="cw-header-status">Online</div>
            </div>
          </div>
          <button className="cw-header-close" onClick={() => setOpen(false)}><CloseIcon /></button>
        </div>

        <div className="cw-messages" ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={`cw-msg cw-msg-${m.role}`}>
              {m.role === 'assistant' && (
                <div className="cw-msg-avatar">
                  <BotIcon />
                </div>
              )}
              <div className="cw-msg-bubble">
                <div className="cw-msg-text">{m.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="cw-msg cw-msg-assistant">
              <div className="cw-msg-avatar"><BotIcon /></div>
              <div className="cw-msg-bubble">
                <div className="cw-dots">
                  <span className="cw-dot" /><span className="cw-dot" /><span className="cw-dot" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="cw-input-area">
          <input
            ref={inputRef}
            className="cw-input"
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button className="cw-send" onClick={handleSend} disabled={!input.trim() || loading}>
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}
