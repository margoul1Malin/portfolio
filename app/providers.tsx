'use client';

import { ReactNode } from 'react';
// On retire AnimatePresence qui cause des problèmes de clés dupliquées
// import { AnimatePresence } from 'framer-motion';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Version simplifiée sans AnimatePresence pour éviter les problèmes de clés dupliquées
  return <>{children}</>;
} 