'use client';

interface ModalProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export default function Modal({ id, children, onClose, className }: ModalProps) {
  return (
    <div
      className={`modal-overlay${className ? ` ${className}` : ''}`}
      id={id}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">{children}</div>
    </div>
  );
}
