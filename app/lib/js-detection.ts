'use client';

import { useState, useEffect } from 'react';

export const useJsDetection = () => {
  const [jsAvailable, setJsAvailable] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setJsAvailable(true);
  }, []);

  return {
    jsAvailable: isClient && jsAvailable,
    isClient
  };
}; 