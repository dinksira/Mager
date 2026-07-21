'use client';

interface TagBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function TagBadge({ children, className }: TagBadgeProps) {
  return <span className={className}>{children}</span>;
}
