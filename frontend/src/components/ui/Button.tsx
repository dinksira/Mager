'use client';

import React from 'react';

interface ButtonProps {
  href?: string;
  primary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
}

export default function Button({ href, primary, children, onClick, className, style, target }: ButtonProps) {
  const cls = `btn${primary ? ' btn-primary' : ''}${className ? ` ${className}` : ''}`;

  if (href) {
    return <a href={href} className={cls} style={style} target={target}>{children}</a>;
  }

  return <button className={cls} onClick={onClick} style={style}>{children}</button>;
}
