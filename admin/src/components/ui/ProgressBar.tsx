'use client';

interface ProgressBarProps {
  width: string;
  label?: string;
  remaining?: string;
}

export default function ProgressBar({ width, label, remaining }: ProgressBarProps) {
  return (
    <div>
      <div className="progress-bar"><div className="progress-fill" style={{ width }} /></div>
      <div className="progress-label"><span>{label}</span><span>{remaining}</span></div>
    </div>
  );
}
