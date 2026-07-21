'use client';

export default function TeamCard({ image, name, role, desc }: { image: string; name: string; role: string; desc: string }) {
  return (
    <div className="team-card fade-up">
      <div className="team-avatar"><img src={image} alt={name} /></div>
      <div className="team-info">
        <h4>{name}</h4>
        <div className="role">{role}</div>
        <p>{desc}</p>
        <div className="team-social">
          <a href="#" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.3A1.8 1.8 0 114.7 6.5a1.8 1.8 0 011.8 1.8zM19 19h-3v-4.3c0-1.7-.7-2.2-1.5-2.2s-1.5.7-1.5 2.2V19h-3v-9h3v1.2a3 3 0 012.5-1.3c1.9 0 3.5 1.3 3.5 4.2z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 5.5a8 8 0 01-2.4.7 4.2 4.2 0 001.8-2.3 8.3 8.3 0 01-2.6 1 4.2 4.2 0 00-7.1 3.8A11.9 11.9 0 013 4.5a4.2 4.2 0 001.3 5.6A4.2 4.2 0 012 9.5v.1a4.2 4.2 0 003.4 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.4 8.4 0 012 18.5a11.9 11.9 0 006.3 1.8c7.5 0 11.7-6.2 11.7-11.7v-.5A8.4 8.4 0 0022 5.5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
