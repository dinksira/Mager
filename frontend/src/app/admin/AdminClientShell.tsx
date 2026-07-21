'use client';

import { ReactNode } from 'react';
import { EditModeProvider } from '@/contexts/EditModeContext';

export default function AdminClientShell({ children }: { children: ReactNode }) {
  return <EditModeProvider>{children}</EditModeProvider>;
}
