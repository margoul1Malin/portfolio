'use client';

import { ReactNode } from 'react';
import { useJsDetection } from '../lib/js-detection';

interface StaticFallbackProps {
  staticContent: ReactNode;
  interactiveContent: ReactNode;
  fallbackDelay?: number;
}

const StaticFallback = ({ 
  staticContent, 
  interactiveContent, 
}: StaticFallbackProps) => {
  const { jsAvailable, isClient } = useJsDetection();

  // Si on est côté client et que JS est disponible, afficher la version interactive
  if (isClient && jsAvailable) {
    return <>{interactiveContent}</>;
  }

  // Sinon, afficher la version statique
  return <>{staticContent}</>;
};

export default StaticFallback; 