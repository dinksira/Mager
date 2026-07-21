'use client';
import { useTranslation } from 'react-i18next';

const statusKeys: Record<string, string> = {
  'status-development': 'ongoing.statusDevelopment',
  'status-testing': 'ongoing.statusTesting',
  'status-planning': 'ongoing.statusPlanning',
};

export default function OngoingCard({ image, title, client, desc, progress, remaining, status, onClick }: { image: string; title: string; client: string; desc: string; progress: string; remaining: string; status: string; onClick: () => void }) {
  const { t } = useTranslation();
  const statusKey = statusKeys[status] || '';

  return (
    <div className="ongoing-card fade-up" onClick={onClick}>
      <div className="ongoing-head">
        <img src={image} alt={title} />
        <div className="overlay"></div>
        <div className="client">{client}</div>
      </div>
      <div className="ongoing-body">
        <h3>{title}</h3>
        <div className="ongoing-meta"><span className={`ongoing-status ${status}`}>{statusKey ? t(statusKey) : status.replace('status-', '')}</span></div>
        <p>{desc}</p>
        <div className="progress-bar"><div className="progress-fill" style={{ width: progress }}></div></div>
        <div className="progress-label"><span>{progress}</span><span>{remaining}</span></div>
      </div>
    </div>
  );
}
