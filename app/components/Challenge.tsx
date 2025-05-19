'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUnlock, FaFlag, FaInfo, FaTrophy, FaShieldAlt } from 'react-icons/fa';

const Challenge = () => {
  const [flags, setFlags] = useState<string[]>(['', '', '', '']);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blinkingButton] = useState(5); // Bouton qui clignote (valeur fixe)
  
  // Flag answers - stockés sans le PREFIX "FLAG{" et le SUFFIX "}"
  const correctFlags = [
    'H4CK3R_1N_PR0GR3SS',
    'R0B0TS_TXT_H4CK3R',
    'C00KI3_M0NST3R',
    'C0NS0L3_M4ST3R_H4CK3R'
  ];
  
  // Animation pour le coffre
  const doorVariants = {
    locked: { rotateY: 0 },
    unlocked: { rotateY: -105, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  
  const handleFlagChange = (index: number, value: string) => {
    // Supprimer automatiquement "FLAG{" et "}" si l'utilisateur les entre
    let cleanValue = value;
    if (value.toUpperCase().startsWith('FLAG{')) {
      cleanValue = value.substring(5);
    }
    if (cleanValue.endsWith('}')) {
      cleanValue = cleanValue.substring(0, cleanValue.length - 1);
    }
    
    const newFlags = [...flags];
    newFlags[index] = cleanValue;
    setFlags(newFlags);
    setError('');
  };
  
  const checkFlags = () => {
    setAttempts(prev => prev + 1);
    
    // Vérifier si tous les flags sont remplis
    if (flags.some(flag => !flag.trim())) {
      setError('Tous les flags doivent être remplis');
      animateShake();
      return;
    }
    
    // Vérifier si tous les flags sont corrects (peu importe l'ordre)
    const allCorrect = correctFlags.every(correctFlag => 
      flags.some(flag => flag.trim().toUpperCase() === correctFlag.toUpperCase())
    );
    
    if (allCorrect) {
      setUnlocked(true);
      localStorage.setItem('challenge_unlocked', 'true');
    } else {
      setError('Un ou plusieurs flags sont incorrects');
      animateShake();
    }
  };
  
  const animateShake = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  };
  
  // Vérifier si le défi a déjà été complété
  useEffect(() => {
    const isUnlocked = localStorage.getItem('challenge_unlocked');
    if (isUnlocked === 'true') {
      setUnlocked(true);
    }
  }, []);
  
  return (
    <section id="challenge" className="py-20 relative overflow-hidden">
      {/* Fond dynamique avec motifs cyberpunk */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat"></div>
      </div>
      
      {/* Effet de grille */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,140,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
      
      <div className="scanline"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="terminal-text">./</span>
            <span className="text-gradient">Challenge</span>
          </h2>
          <div className="w-24 h-1 bg-[#00ff8c] mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Quatre secrets sont cachés sur ce site. Pourrez-vous tous les trouver ?
          </p>
          <p className="mt-2 max-w-2xl mx-auto text-[#00ff8c]/50 text-sm">
            Entrez les codes secrets que vous avez découverts dans les FLAGS (sans le préfixe FLAG{'{'} ni le suffixe {'}'})
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Formulaire pour les flags */}
          <motion.div 
            className="md:col-span-5 terminal p-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="flex-1 text-center text-xs text-gray-500">unlock_vault.sh</div>
            </div>
            
            <div className="space-y-4">
              {flags.map((flag, index) => (
                <div key={index} className="mb-4 relative">
                  <div className="flex items-center mb-2">
                    <FaFlag className="text-[#00ff8c] mr-2" />
                    <label className="text-sm font-medium text-gray-300">
                      Clé secrète #{index + 1}
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff8c]/50 font-mono">
                      FLAG{`{`}
                    </span>
                    <input
                      type="text"
                      value={flag}
                      onChange={(e) => handleFlagChange(index, e.target.value)}
                      placeholder={`Code secret #${index + 1}`}
                      className="w-full bg-black/50 border border-[#00ff8c]/50 rounded-md py-3 pl-14 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff8c]/50 font-mono"
                      disabled={unlocked}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00ff8c]/50 font-mono">
                      {`}`}
                    </span>
                  </div>
                </div>
              ))}
              
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-md text-red-400 text-sm flex items-center">
                  <div className="w-2 h-5 bg-red-500 mr-2 animate-pulse"></div>
                  {error}
                </div>
              )}
              
              <div className="flex justify-between items-center mt-6">
                <div className="text-xs text-gray-400 flex items-center">
                  <span className="font-mono">Tentatives: {attempts}</span>
                  {attempts > 5 && <span className="ml-2 text-[#00ff8c]/70 text-xs">(Indice: cherchez dans le code source, les cookies, robots.txt et la console)</span>}
                </div>
                <button
                  onClick={checkFlags}
                  disabled={unlocked}
                  className={`hacker-btn py-2 px-6 rounded-md relative overflow-hidden group ${
                    unlocked ? 'bg-[#00ff8c]/20 text-[#00ff8c]' : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    {unlocked ? <FaUnlock className="mr-2" /> : <FaLock className="mr-2" />}
                    {unlocked ? 'Déverrouillé!' : 'Déverrouiller'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Coffre-fort animé */}
          <motion.div 
            className="md:col-span-7 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={`w-full max-w-md aspect-square relative ${shake ? 'animate-shake' : ''}`}>
              {/* Coffre-fort */}
              <div className="vault-container">
                {/* Fond du coffre */}
                <div className="vault-back">
                  {unlocked && (
                    <div className="vault-content flex flex-col items-center justify-center h-full p-6 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="relative mb-6"
                      >
                        <div className="absolute -inset-6 rounded-full bg-[#00ff8c]/20 animate-pulse"></div>
                        <div className="absolute -inset-3 rounded-full bg-[#00ff8c]/30 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <FaTrophy className="text-[#00ff8c] text-5xl relative z-10" />
                      </motion.div>
                      
                      <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1.7 }}
                        className="text-2xl font-bold text-[#00ff8c] mb-2 glow-text"
                      >
                        FÉLICITATIONS!
                      </motion.h3>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.9 }}
                      >
                        <p className="text-white text-sm mb-4">
                          Bien joué tu as prouvé que tu avais de bonnes bases pour commencer en informatique. Débloques le message secret tu verras il est sympa !
                        </p>
                        
                        <button 
                          onClick={() => setShowSecret(!showSecret)} 
                          className="bg-[#00ff8c]/20 border border-[#00ff8c]/50 text-[#00ff8c] px-4 py-2 rounded-md text-sm flex items-center mx-auto hover:bg-[#00ff8c]/30 transition-colors"
                        >
                          <FaInfo className="mr-2" />
                          {showSecret ? 'Cacher le message' : 'Afficher le message secret'}
                        </button>
                      </motion.div>
                      
                      {showSecret && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-4 bg-black/70 border border-[#00ff8c]/30 rounded-md text-white text-sm font-mono relative"
                        >
                          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,255,140,0.03)] rounded-md"></div>
                          <div className="relative z-10">
                            <div className="flex items-center mb-2">
                              <FaShieldAlt className="text-[#00ff8c] mr-2" />
                              <p className="text-[#00ff8c] font-bold">Message secret débloqué</p>
                            </div>
                            <p className="text-[#00ff8c]/90">{"T'as réussi à avoir un super message secret t'es vraiment trop fort(e) mais y'a rien a gagner en fait mdr. On travaille ensemble ?"}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Porte du coffre */}
                <motion.div 
                  className="vault-door"
                  variants={doorVariants}
                  animate={unlocked ? "unlocked" : "locked"}
                >
                  <div className={`vault-door-content ${unlocked ? 'vault-door-unlocked' : ''}`}>
                    <div className="vault-lock-bars">
                      <div className="vault-lock-bar"></div>
                      <div className="vault-lock-bar"></div>
                      <div className="vault-lock-bar"></div>
                    </div>
                    
                    <div className="vault-dial">
                      <div className="vault-dial-spinner"></div>
                    </div>
                    
                    <div className="vault-logo">
                      <div className="vault-logo-inner">
                        <FaShieldAlt className="text-[#00ff8c]/30 text-2xl" />
                      </div>
                    </div>
                    
                    <div className="vault-handle"></div>
                    
                    <div className="vault-keypad">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <div 
                          key={num} 
                          className={`vault-keypad-button ${num === blinkingButton && unlocked ? 'vault-keypad-button-active' : ''}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Styles CSS intégrés pour le coffre-fort */}
      <style jsx>{`
        @keyframes spinDial {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 140, 0.3); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 140, 0.7); }
        }
        
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .vault-container {
          width: 100%;
          height: 100%;
          position: relative;
          perspective: 1000px;
        }
        
        .vault-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 6px solid #333;
          border-radius: 16px;
          box-shadow: inset 0 0 50px rgba(0, 255, 140, 0.15);
          overflow: hidden;
          padding: 20px;
        }
        
        .vault-back::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 20%, rgba(0, 255, 140, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(0, 255, 140, 0.07) 0%, transparent 40%);
          pointer-events: none;
        }
        
        .vault-door {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-origin: left;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        
        .vault-door-content {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #2a2a2a 0%, #111 100%);
          border: 6px solid #444;
          border-radius: 16px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.8s ease-in-out;
        }
        
        .vault-door-unlocked {
          animation: fadeOut 0.7s forwards;
          animation-delay: 0.8s;
        }
        
        .vault-door-content::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 0%, rgba(0, 255, 140, 0.03) 50%, transparent 100%),
            linear-gradient(-45deg, transparent 0%, rgba(0, 255, 140, 0.03) 50%, transparent 100%);
          pointer-events: none;
        }
        
        .vault-lock-bars {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          padding: 40px 0;
        }
        
        .vault-lock-bar {
          width: 30px;
          height: 8px;
          background: #444;
          border-radius: 4px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
          transform: ${unlocked ? 'translateX(40px)' : 'translateX(0)'};
          transition: transform 0.7s ease-in-out;
        }
        
        .vault-lock-bar:nth-child(1) {
          transition-delay: 0.1s;
        }
        
        .vault-lock-bar:nth-child(2) {
          transition-delay: 0.2s;
        }
        
        .vault-lock-bar:nth-child(3) {
          transition-delay: 0.3s;
        }
        
        .vault-dial {
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, #333 0%, #222 60%, #111 100%);
          border-radius: 50%;
          border: 4px solid #555;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 255, 140, 0.2);
          animation: ${unlocked ? 'glow 2s infinite' : 'none'};
        }
        
        .vault-dial-spinner {
          width: 110px;
          height: 110px;
          background: radial-gradient(circle, #333 0%, #222 70%, #111 100%);
          border-radius: 50%;
          position: relative;
          animation: ${unlocked ? 'spinDial 3s ease-in-out forwards' : 'none'};
        }
        
        .vault-dial-spinner::before,
        .vault-dial-spinner::after {
          content: '';
          position: absolute;
          background: rgba(0, 255, 140, 0.8);
          box-shadow: 0 0 5px rgba(0, 255, 140, 0.8);
        }
        
        .vault-dial-spinner::before {
          top: 8px;
          left: 52px;
          width: 6px;
          height: 15px;
        }
        
        .vault-dial-spinner::after {
          bottom: 8px;
          left: 52px;
          width: 6px;
          height: 15px;
        }
        
        .vault-handle {
          position: absolute;
          bottom: 60px;
          right: 60px;
          width: 36px;
          height: 100px;
          border-radius: 18px;
          background: linear-gradient(90deg, #555 0%, #333 100%);
          border: 3px solid #666;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(0, 0, 0, 0.5);
          transform-origin: center;
          transform: ${unlocked ? 'rotate(90deg)' : 'rotate(0deg)'};
          transition: transform 0.8s ease-in-out 0.7s;
        }
        
        .vault-handle::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 11px;
          width: 14px;
          height: 14px;
          background: #444;
          border-radius: 50%;
          border: 2px solid #666;
        }
        
        .vault-keypad {
          position: absolute;
          bottom: 40px;
          left: 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 5px;
          width: 80px;
          height: 80px;
        }
        
        .vault-keypad-button {
          background: #222;
          border-radius: 3px;
          border: 1px solid #444;
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.8);
        }
        
        .vault-keypad-button-active {
          background: rgba(0, 255, 140, 0.3);
          animation: blink 1s infinite;
        }
        
        .vault-logo {
          position: absolute;
          top: 40px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
        }
        
        .vault-logo-inner {
          width: 60px;
          height: 60px;
          background: #222;
          border-radius: 50%;
          border: 2px solid #444;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .vault-content {
          position: relative;
          z-index: 0;
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(0, 255, 140, 0.7);
        }
      `}</style>
    </section>
  );
};

export default Challenge; 