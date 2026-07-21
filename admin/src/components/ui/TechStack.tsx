'use client';

interface TechStackProps {
  items: string[];
}

export default function TechStack({ items }: TechStackProps) {
  return (
    <div className="tech-list">
      {items.map(t => <span key={t}>{t}</span>)}
    </div>
  );
}
