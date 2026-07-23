'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: form.get('email') as string,
      password: form.get('password') as string,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid email or password');
    } else if (res?.ok) {
      router.push('/admin');
    }
  };

  return (
    <>
      <nav>
        <div className="container">
          <a href="/" className="logo">
            <img src="/magerlogo.svg" alt="Mager" className="logo-img" />
            <span className="logo-text">Mager Software PLC</span>
          </a>
          <div className="nav-actions">
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <div className="admin-login">
        <div className="admin-login-card">
          <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>Admin Login</p>
          <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            {error && <p className="admin-login-error">{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
