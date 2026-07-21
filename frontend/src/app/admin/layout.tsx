import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import AdminClientShell from './AdminClientShell';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect('/admin/login');
  return <AdminClientShell>{children}</AdminClientShell>;
}
