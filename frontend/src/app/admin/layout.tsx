import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import AdminClientShell from './AdminClientShell';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}

async function AdminGuard({ children }: { children: ReactNode }) {
  try {
    const session = await auth();
    if (!session) redirect('/login');
  } catch {
    redirect('/login');
  }
  return <AdminClientShell>{children}</AdminClientShell>;
}
