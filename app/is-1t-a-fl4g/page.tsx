'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaLock, FaUnlock, FaSkull } from 'react-icons/fa';

export default function SecretFlag() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [showMessage, setShowMessage] = useState('');
  
  // Effet de déchiffrement du flag
  useEffect(() => {
    if (isUnlocked) return;
    
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => prev + 1);
      } else {
        setIsUnlocked(true);
        setShowMessage('FLAG{R0B0TS_TXT_H4CK3R}');
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [progress, isUnlocked]);
  
  // Messages lorsque l'utilisateur survole le flag
  const unlockMessages = [
    "Bien joué, au suivant ?"
  ];
  
  const handleHover = () => {
    if (isUnlocked) {
      setHoverCount(prev => prev + 1);
      if (hoverCount < unlockMessages.length) {
        setShowMessage(unlockMessages[hoverCount]);
      } else {
        // Revenir au flag si tous les messages ont été vus
        setShowMessage('FLAG{R0B0TS_TXT_H4CK3R}');
        setHoverCount(0);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Fond de bruit numérique */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      {/* Grille cyberpunk */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,140,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Effet de scan */}
      <div className="scanline"></div>
      
      {/* Navigation de retour */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/" className="flex items-center text-[#00ff8c] hover:text-white transition-colors duration-300 group">
          <FaArrowLeft className="mr-2 group-hover:translate-x-[-5px] transition-transform duration-300" />
          <span className="text-sm uppercase tracking-wider">retour</span>
        </Link>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="terminal p-8 w-full max-w-md relative z-10"
      >
        <div className="mb-6 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1 text-center text-xs text-gray-500">FLAG_REVEAL.sh</div>
        </div>
        
        <div className="relative mb-8 p-6 border border-[#00ff8c]/20 bg-black/50 rounded-md">
          <div className="absolute top-2 right-2">
            {isUnlocked ? (
              <FaUnlock className="text-[#00ff8c] animate-pulse" />
            ) : (
              <FaLock className="text-red-500" />
            )}
          </div>
          
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 text-[#00ff8c] mr-2">
              <FaSkull />
            </div>
            <div className="text-[#00ff8c] text-sm">FLAG_DECODER</div>
          </div>
          
          {!isUnlocked ? (
            <>
              <div className="mb-4">
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00ff8c] to-[#00ffcc]" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1 text-right">{progress}% completed</div>
              </div>
              <div className="font-mono text-center text-sm text-[#00ff8c] animate-pulse">
                Déchiffrement du flag en cours...
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
              onMouseEnter={handleHover}
            >
              <div className="font-mono text-xl text-[#00ff8c] font-bold tracking-wide mb-2 glow-text">
                {showMessage || 'FLAG{R0B0TS_TXT_H4CK3R}'}
              </div>
              <div className="text-xs text-gray-400 mt-3">
                Félicitations pour avoir découvert cette page secrète!
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="space-y-2 terminal-text text-sm">
          <p className="flex items-center">
            <span className="text-[#00ff8c] mr-2">$</span> 
            <span>Accès secret confirmé</span>
          </p>
          <p className="flex items-center text-gray-400">
            <span className="text-[#00ff8c] mr-2">$</span> 
            <span>Ce flag est l&apos;un des trésors cachés sur ce site</span>
          </p>
          <p className="flex items-center text-gray-400">
            <span className="text-[#00ff8c] mr-2">$</span> 
            <span>Continuez à explorer pour trouver d&apos;autres secrets...</span>
            <span className="ml-1 h-4 w-px bg-[#00ff8c] animate-blink"></span>
          </p>
        </div>
      
      </motion.div>
    </div>
  );
} 