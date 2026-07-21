'use client';

interface ResourceLinkProps {
  href: string;
  icon: string;
  label: string;
  target?: string;
}

export default function ResourceLink({ href, icon, label, target }: ResourceLinkProps) {
  return (
    <a href={href} target={target} className="resource-link" dangerouslySetInnerHTML={{ __html: icon + label }} />
  );
}
